import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { z } from 'zod';

const StartAttemptSchema = z.object({
  examId: z.string(),
  studentName: z.string().min(2, 'يرجى إدخال اسمك الكامل بشكل صحيح'),
  studentPhone: z.string().optional().default(''),
  studentGroup: z.string().optional().default(''),
});

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`attempt:${ip}`, 30, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'تم إرسال طلبات كثيرة في وقت قصير. يرجى الانتظار قليلاً.' },
        { status: 429 }
      );
    }
    const body = await req.json();
    const parsed = StartAttemptSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { examId, studentName, studentPhone, studentGroup } = parsed.data;

    const exam = await prisma.exam.findUnique({
      where: { id: examId },
    });

    if (!exam) {
      return NextResponse.json({ error: 'عذراً، الامتحان غير موجود' }, { status: 404 });
    }

    if (exam.status !== 'PUBLISHED') {
      return NextResponse.json({ error: 'هذا الاختبار غير متاح للطلاب حالياً' }, { status: 403 });
    }

    // Required fields check
    if (exam.requirePhone && (!studentPhone || studentPhone.trim().length < 6)) {
      return NextResponse.json({ error: 'رقم الهاتف مطلوب لبدء هذا الاختبار' }, { status: 400 });
    }

    if (exam.requireGroup && (!studentGroup || studentGroup.trim() === '')) {
      return NextResponse.json({ error: 'يرجى اختيار مجموعتك الدراسية' }, { status: 400 });
    }

    // Check duplicate attempts if disabled by teacher
    if (!exam.allowMultipleAttempts && studentPhone) {
      const existingAttempt = await prisma.examAttempt.findFirst({
        where: {
          examId,
          studentPhone: studentPhone.trim(),
          status: { in: ['SUBMITTED', 'GRADED'] },
        },
      });

      if (existingAttempt) {
        return NextResponse.json(
          {
            error: 'لقد قمت بأداء هذا الاختبار من قبل مسبقاً، ولا يسمح بأكثر من محاولة واحدة.',
            alreadySubmitted: true,
          },
          { status: 403 }
        );
      }
    }

    // Create new attempt
    const attempt = await prisma.examAttempt.create({
      data: {
        examId,
        studentName: studentName.trim(),
        studentPhone: studentPhone.trim(),
        studentGroup: studentGroup.trim() || null,
        startedAt: new Date(),
        status: 'IN_PROGRESS',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'تم بدء الاختبار بنجاح',
      attemptId: attempt.id,
      startedAt: attempt.startedAt,
    });
  } catch (error: any) {
    console.error('Start Attempt Error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء بدء الاختبار' }, { status: 500 });
  }
}
