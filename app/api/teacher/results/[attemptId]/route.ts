import { NextRequest, NextResponse } from 'next/server';
import { requireTeacherAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { GradingService } from '@/services/grading/grading-service';
import { z } from 'zod';

const GradeEssaySchema = z.object({
  answerId: z.string(),
  pointsAwarded: z.number().min(0),
  teacherFeedback: z.string().optional(),
});

// GET: Get detailed student attempt
export async function GET(req: NextRequest, { params }: { params: { attemptId: string } }) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const attempt = await prisma.examAttempt.findFirst({
    where: {
      id: params.attemptId,
      exam: { teacherId: auth.user.userId },
    },
    include: {
      exam: {
        include: {
          questions: {
            orderBy: { orderIndex: 'asc' },
            include: {
              options: {
                orderBy: { optionKey: 'asc' },
              },
            },
          },
        },
      },
      answers: {
        include: {
          question: {
            include: {
              options: true,
            },
          },
        },
      },
    },
  });

  if (!attempt) {
    return NextResponse.json({ error: 'المحاولة غير موجودة أو ليس لديك صلاحية عرضها' }, { status: 404 });
  }

  // Map each question with the student's answer
  const detailedQuestions = attempt.exam.questions.map((q) => {
    const studentAnswer = attempt.answers.find((a) => a.questionId === q.id);

    return {
      questionId: q.id,
      questionNumber: q.questionNumber,
      type: q.type,
      questionText: q.questionText,
      maxPoints: q.points,
      options: q.options.map((opt) => ({
        key: opt.optionKey,
        text: opt.text,
      })),
      correctOptionId: q.correctOptionId,
      studentAnswer: {
        answerId: studentAnswer?.id || null,
        selectedOption: studentAnswer?.selectedOption || null,
        essayAnswer: studentAnswer?.essayAnswer || null,
        isCorrect: studentAnswer?.isCorrect,
        pointsAwarded: studentAnswer?.pointsAwarded ?? 0,
        teacherFeedback: studentAnswer?.teacherFeedback || null,
        needsGrading: q.type === 'essay' && studentAnswer?.isCorrect === null,
      },
    };
  });

  const correctCount = attempt.answers.filter((a) => a.isCorrect === true).length;
  const incorrectCount = attempt.answers.filter((a) => a.isCorrect === false).length;
  const pendingEssayCount = detailedQuestions.filter((q) => q.studentAnswer.needsGrading).length;

  return NextResponse.json({
    attempt: {
      id: attempt.id,
      studentName: attempt.studentName,
      studentPhone: attempt.studentPhone,
      studentGroup: attempt.studentGroup || 'غير محدد',
      startedAt: attempt.startedAt,
      submittedAt: attempt.submittedAt,
      timeSpentSeconds: attempt.timeSpentSeconds,
      status: attempt.status,
      mcqScore: attempt.mcqScore,
      essayScore: attempt.essayScore,
      totalScore: attempt.totalScore,
      maxScore: attempt.maxScore,
      percentage: attempt.percentage,
      isPassed: attempt.isPassed,
      correctCount,
      incorrectCount,
      pendingEssayCount,
    },
    exam: {
      id: attempt.exam.id,
      title: attempt.exam.title,
      code: attempt.exam.code,
      passingPercentage: attempt.exam.passingPercentage,
      totalQuestions: attempt.exam.questions.length,
    },
    questions: detailedQuestions,
  });
}

// POST: Grade an essay question
export async function POST(req: NextRequest, { params }: { params: { attemptId: string } }) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const parsed = GradeEssaySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { answerId, pointsAwarded, teacherFeedback } = parsed.data;

    // Verify ownership
    const attempt = await prisma.examAttempt.findFirst({
      where: {
        id: params.attemptId,
        exam: { teacherId: auth.user.userId },
      },
    });

    if (!attempt) {
      return NextResponse.json({ error: 'المحاولة غير موجودة' }, { status: 404 });
    }

    const updatedAttempt = await GradingService.gradeEssayAnswer(
      answerId,
      pointsAwarded,
      teacherFeedback
    );

    return NextResponse.json({
      success: true,
      message: 'تم حفظ تصحيح السؤال المقالي وتحديث الدرجة الإجمالية',
      attempt: updatedAttempt,
    });
  } catch (error: any) {
    console.error('Grade Essay Error:', error);
    return NextResponse.json({ error: error.message || 'حدث خطأ أثناء حفظ التصحيح' }, { status: 500 });
  }
}
