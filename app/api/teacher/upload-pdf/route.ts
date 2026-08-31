import { NextRequest, NextResponse } from 'next/server';
import { requireTeacherAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { decryptSecret } from '@/lib/crypto';
import { GeminiExamParser } from '@/services/ai/gemini-parser';
import { checkRateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  // Rate limiting: 10 uploads per minute per teacher
  const rateCheck = checkRateLimit(`upload_pdf:${auth.user.userId}`, 10, 60 * 1000);
  if (!rateCheck.success) {
    return NextResponse.json(
      { error: 'يرجى الانتظار قليلاً قبل رفع ملف آخر (الحد الأقصى 10 عمليات رفع بالدقيقة).' },
      { status: 429 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'يرجى اختيار ملف PDF لرفعه' }, { status: 400 });
    }

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'نوع الملف غير صالح، يجب أن يكون الملف بصيغة PDF' }, { status: 400 });
    }

    // Limit size (e.g. 25MB)
    const MAX_SIZE = 25 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'حجم الملف كبير جداً، الحد الأقصى هو 25 ميجابايت' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Validate PDF magic bytes (%PDF-)
    if (buffer.length < 5 || buffer.toString('utf-8', 0, 5) !== '%PDF-') {
      return NextResponse.json(
        { error: 'الملف المرفوع ليس ملف PDF حقيقي صالح، يرجى التأكد من سلامة الملف.' },
        { status: 400 }
      );
    }

    // Get Teacher's Gemini Key or fallback
    const user = await prisma.user.findUnique({
      where: { id: auth.user.userId },
      select: { geminiApiKey: true, geminiModel: true },
    });

    const apiKey = user?.geminiApiKey
      ? decryptSecret(user.geminiApiKey)
      : process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'لم يتم العثور على مفتاح Google Gemini API. يرجى التوجه لصفحة الإعدادات وإدخال مفتاح الـ API أولاً.',
          needApiKey: true,
        },
        { status: 400 }
      );
    }

    let modelName = user?.geminiModel || process.env.DEFAULT_GEMINI_MODEL || 'gemini-2.5-flash';
    if (modelName === 'gemini-2.0-flash' || modelName === 'gemini-1.5-flash' || modelName === 'gemini-1.5-pro') {
      modelName = 'gemini-2.5-flash';
    }

    const parser = new GeminiExamParser(apiKey, modelName);
    const parsedExam = await parser.parsePDFToExam(buffer, 'application/pdf');

    return NextResponse.json({
      success: true,
      message: 'تم تحليل الامتحان بنجاح واستخراج جميع الأسئلة',
      data: parsedExam,
    });
  } catch (error: any) {
    console.error('PDF Processing Error:', error);
    return NextResponse.json(
      {
        error: error.message || 'حدث خطأ أثناء معالجة ملف الـ PDF عبر الذكاء الاصطناعي',
      },
      { status: 500 }
    );
  }
}
