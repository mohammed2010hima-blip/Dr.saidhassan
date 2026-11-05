import { NextRequest, NextResponse } from 'next/server';
import { requireStudentAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { attemptId: string } }
) {
  const auth = await requireStudentAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const studentId = auth.student.studentId!;

    const attempt = await prisma.examAttempt.findFirst({
      where: {
        id: params.attemptId,
        OR: [
          { studentId },
          { studentPhone: auth.student.phone },
        ],
      },
      include: {
        exam: {
          include: {
            questions: {
              orderBy: { orderIndex: 'asc' },
              include: {
                options: { orderBy: { optionKey: 'asc' } },
              },
            },
          },
        },
        answers: true,
      },
    });

    if (!attempt) {
      return NextResponse.json(
        { error: 'المحاولة غير موجودة أو غير مصرح لك بعرضها' },
        { status: 404 }
      );
    }

    if (!attempt.isApproved) {
      return NextResponse.json(
        {
          error: 'نتيجة هذا الامتحان قيد التصحيح والاعتماد من المعلم حالياً، وستظهر فور اعتمادها.',
          pendingApproval: true,
        },
        { status: 403 }
      );
    }

    const detailedQuestions = attempt.exam.questions.map((q) => {
      const studentAns = attempt.answers.find((a) => a.questionId === q.id);

      return {
        questionId: q.id,
        questionNumber: q.questionNumber,
        type: q.type,
        questionText: q.questionText,
        points: q.points,
        correctOptionId: q.correctOptionId,
        options: q.options.map((opt) => ({
          key: opt.optionKey,
          text: opt.text,
        })),
        studentAnswer: {
          selectedOption: studentAns?.selectedOption || null,
          essayAnswer: studentAns?.essayAnswer || null,
          isCorrect: studentAns?.isCorrect,
          pointsAwarded: studentAns?.pointsAwarded ?? 0,
          teacherFeedback: studentAns?.teacherFeedback || null,
        },
      };
    });

    return NextResponse.json({
      attempt: {
        id: attempt.id,
        examTitle: attempt.exam.title,
        examCode: attempt.exam.code,
        studentName: attempt.studentName,
        submittedAt: attempt.submittedAt || attempt.createdAt,
        timeSpentSeconds: attempt.timeSpentSeconds,
        totalScore: attempt.totalScore,
        maxScore: attempt.maxScore,
        percentage: attempt.percentage,
        isPassed: attempt.isPassed,
        passingPercentage: attempt.exam.passingPercentage,
        teacherNotes: attempt.teacherNotes,
      },
      questions: detailedQuestions,
    });
  } catch (error: any) {
    console.error('Fetch student attempt detail error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء تحميل النتيجة' }, { status: 500 });
  }
}
