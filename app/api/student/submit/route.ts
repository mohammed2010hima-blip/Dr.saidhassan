import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { GradingService } from '@/services/grading/grading-service';
import { z } from 'zod';

const SubmitSchema = z.object({
  attemptId: z.string(),
  timeSpentSeconds: z.number().default(0),
  answers: z.array(
    z.object({
      questionId: z.string(),
      selectedOption: z.string().optional(),
      essayAnswer: z.string().optional(),
    })
  ),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = SubmitSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'بيانات التسليم غير صالحة' }, { status: 400 });
    }

    const { attemptId, timeSpentSeconds, answers } = parsed.data;

    const attempt = await prisma.examAttempt.findUnique({
      where: { id: attemptId },
      include: { exam: true },
    });

    if (!attempt) {
      return NextResponse.json({ error: 'المحاولة غير موجودة' }, { status: 404 });
    }

    if (attempt.status !== 'IN_PROGRESS') {
      return NextResponse.json(
        { error: 'لقد تم إرسال هذا الامتحان مسبقاً ولا يمكن إعادة إرساله.' },
        { status: 400 }
      );
    }

    // Grade and finalize attempt
    const gradedAttempt = await GradingService.gradeAttemptOnSubmission(
      attemptId,
      answers,
      timeSpentSeconds
    );

    return NextResponse.json({
      success: true,
      message: 'تم إرسال الاختبار بنجاح وتسجيل جميع إجاباتك وإرسالها للمعلم.',
      attempt: {
        id: gradedAttempt.id,
        status: gradedAttempt.status,
        submittedAt: gradedAttempt.submittedAt,
        studentName: gradedAttempt.studentName,
        examTitle: attempt.exam.title,
      },
    });
  } catch (error: any) {
    console.error('Submit Exam Error:', error);
    return NextResponse.json(
      { error: error.message || 'حدث خطأ أثناء تسليم الاختبار' },
      { status: 500 }
    );
  }
}
