import { NextRequest, NextResponse } from 'next/server';
import { requireTeacherAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { encryptSecret, decryptSecret, maskApiKey } from '@/lib/crypto';
import { GeminiExamParser } from '@/services/ai/gemini-parser';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const SettingsSchema = z.object({
  geminiApiKey: z.string().optional(),
  geminiModel: z.string().optional(),
  platformName: z.string().optional(),
  teacherName: z.string().optional(),
  teacherTitle: z.string().optional(),
  teacherBio: z.string().optional(),
  teacherExperience: z.string().optional(),
  teacherStudentsCount: z.string().optional(),
  teacherCoursesCount: z.string().optional(),
  heroBadge: z.string().optional(),
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
  teacherImageUrl: z.string().optional(),
  brandTheme: z.enum(['violet', 'gold']).optional(),
  action: z.enum(['save', 'test']).default('save'),
});

export async function GET(req: NextRequest) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const user = await prisma.user.findUnique({
    where: { id: auth.user.userId },
  });

  const rawKey = user?.geminiApiKey ? decryptSecret(user.geminiApiKey) : '';
  const maskedKey = maskApiKey(rawKey);

  return NextResponse.json({
    hasApiKey: !!rawKey || !!process.env.GOOGLE_GEMINI_API_KEY,
    maskedApiKey: maskedKey || (process.env.GOOGLE_GEMINI_API_KEY ? '****** (من ملف البيئة)' : ''),
    geminiModel: user?.geminiModel || process.env.DEFAULT_GEMINI_MODEL || 'gemini-2.5-flash',
    platformName: user?.platformName || 'منصة د.سعيد حسن',
    teacherName: user?.name || 'الدكتور سعيد حسن',
    teacherTitle: user?.teacherTitle || 'خبير ومدرس أول اللغة العربية',
    teacherBio: user?.teacherBio || '',
    teacherExperience: user?.teacherExperience || 'أكثر من 40 عاماً',
    teacherStudentsCount: user?.teacherStudentsCount || '+10,000 طالب',
    teacherCoursesCount: user?.teacherCoursesCount || '+50 دورة ومذكرة',
    heroBadge: user?.heroBadge || 'منصتك التعليمية الأولى في اللغة العربية',
    heroTitle: user?.heroTitle || 'تعلم بطريقة مختلفة وحقق أفضل نتائجك',
    heroSubtitle: user?.heroSubtitle || '',
    teacherImageUrl: user?.teacherImageUrl || '/teacher.png',
    brandTheme: user?.brandTheme || 'violet',
    availableModels: [
      { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash (موصى به - أحدث وأكثر استقراراً)' },
      { id: 'gemini-3.6-flash', name: 'Gemini 3.6 Flash (الجيل الأحدث - سريع)' },
      { id: 'gemini-3.5-flash-lite', name: 'Gemini 3.5 Flash-Lite (خفيف وسريع)' },
    ],
  });
}

export async function POST(req: NextRequest) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const parsed = SettingsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const {
      geminiApiKey,
      geminiModel,
      platformName,
      teacherName,
      teacherTitle,
      teacherBio,
      teacherExperience,
      teacherStudentsCount,
      teacherCoursesCount,
      heroBadge,
      heroTitle,
      heroSubtitle,
      teacherImageUrl,
      brandTheme,
      action,
    } = parsed.data;

    // Get current user key if testing without re-entering
    let effectiveKey = geminiApiKey?.trim();
    if (!effectiveKey) {
      const user = await prisma.user.findUnique({ where: { id: auth.user.userId } });
      if (user?.geminiApiKey) {
        effectiveKey = decryptSecret(user.geminiApiKey);
      } else {
        effectiveKey = process.env.GOOGLE_GEMINI_API_KEY || '';
      }
    }

    if (action === 'test') {
      if (!effectiveKey) {
        return NextResponse.json(
          { error: 'يرجى إدخال مفتاح Google Gemini API أولاً لإجراء الاختبار' },
          { status: 400 }
        );
      }

      const parser = new GeminiExamParser(effectiveKey, geminiModel || 'gemini-2.5-flash');
      const testResult = await parser.testConnection();

      return NextResponse.json(testResult);
    }

    // Save action
    const updateData: any = {};
    if (geminiModel) updateData.geminiModel = geminiModel;
    if (geminiApiKey && geminiApiKey.trim() !== '') {
      updateData.geminiApiKey = encryptSecret(geminiApiKey.trim());
    }
    if (platformName !== undefined) updateData.platformName = platformName;
    if (teacherName !== undefined) {
      updateData.name = teacherName;
    }
    if (teacherTitle !== undefined) updateData.teacherTitle = teacherTitle;
    if (teacherBio !== undefined) updateData.teacherBio = teacherBio;
    if (teacherExperience !== undefined) updateData.teacherExperience = teacherExperience;
    if (teacherStudentsCount !== undefined) updateData.teacherStudentsCount = teacherStudentsCount;
    if (teacherCoursesCount !== undefined) updateData.teacherCoursesCount = teacherCoursesCount;
    if (heroBadge !== undefined) updateData.heroBadge = heroBadge;
    if (heroTitle !== undefined) updateData.heroTitle = heroTitle;
    if (heroSubtitle !== undefined) updateData.heroSubtitle = heroSubtitle;
    if (teacherImageUrl !== undefined) updateData.teacherImageUrl = teacherImageUrl;
    if (brandTheme !== undefined) updateData.brandTheme = brandTheme;

    await prisma.user.update({
      where: { id: auth.user.userId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'تم حفظ كافة التعديلات والإعدادات بنجاح',
    });
  } catch (error: any) {
    console.error('Settings error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء معالجة الإعدادات' }, { status: 500 });
  }
}
