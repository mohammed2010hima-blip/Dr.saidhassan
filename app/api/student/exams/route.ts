import { NextRequest, NextResponse } from 'next/server';
import { requireStudentAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = await requireStudentAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const student = await prisma.student.findUnique({
      where: { id: auth.student.studentId },
    });

    if (!student) {
      return NextResponse.json({ error: 'الطالب غير موجود' }, { status: 404 });
    }

    const exams = await prisma.exam.findMany({
      where: {
        status: 'PUBLISHED',
        AND: [
          {
            OR: [
              { targetStage: 'all' },
              { targetStage: null },
              { targetStage: student.stage },
            ],
          },
          {
            OR: [
              { targetGroup: 'all' },
              { targetGroup: null },
              { targetGroup: student.groupName },
            ],
          },
          {
            OR: [
              { targetSemester: 'all' },
              { targetSemester: null },
              { targetSemester: student.semester },
            ],
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { questions: true } },
        attempts: {
          where: {
            OR: [
              { studentId: student.id },
              { studentPhone: student.phone },
            ],
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    const now = new Date();

    const formatted = exams.map((exam) => {
      const studentAttempts = exam.attempts;
      const latestAttempt = studentAttempts[0];

      let status = 'AVAILABLE';
      let statusText = 'متاح للحل الآن';

      if (exam.startsAt && new Date(exam.startsAt) > now) {
        status = 'UPCOMING';
        statusText = 'سيبدأ قريباً';
      } else if (exam.endsAt && new Date(exam.endsAt) < now) {
        status = 'CLOSED';
        statusText = 'انتهى موعد الامتحان';
      } else if (latestAttempt) {
        if (latestAttempt.isApproved) {
          status = 'APPROVED';
          statusText = 'تم التصحيح والاعتماد';
        } else if (latestAttempt.status === 'SUBMITTED' || latestAttempt.status === 'GRADED') {
          status = 'SUBMITTED';
          statusText = 'تم التسليم وقيد الاعتماد';
        } else if (latestAttempt.status === 'IN_PROGRESS') {
          status = 'IN_PROGRESS';
          statusText = 'قيد الحل (متابعة)';
        }
      }

      const completedAttemptsCount = studentAttempts.filter((a) => a.status !== 'IN_PROGRESS').length;
      const canTakeExam = completedAttemptsCount < (exam.maxAttempts || 1) && status !== 'CLOSED' && status !== 'UPCOMING';

      return {
        id: exam.id,
        code: exam.code,
        title: exam.title,
        description: exam.description,
        durationMinutes: exam.durationMinutes,
        totalPoints: exam.totalPoints,
        questionsCount: exam._count.questions,
        examType: exam.examType,
        startsAt: exam.startsAt,
        endsAt: exam.endsAt,
        maxAttempts: exam.maxAttempts,
        status,
        statusText,
        canTakeExam,
        completedAttemptsCount,
        latestAttemptId: latestAttempt?.id || null,
        isApproved: latestAttempt?.isApproved || false,
      };
    });

    return NextResponse.json({ exams: formatted });
  } catch (error: any) {
    console.error('Fetch student exams error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء جلب الامتحانات' }, { status: 500 });
  }
}
