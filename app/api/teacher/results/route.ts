import { NextRequest, NextResponse } from 'next/server';
import { requireTeacherAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { searchParams } = new URL(req.url);
  const examId = searchParams.get('examId');
  const group = searchParams.get('group');
  const search = searchParams.get('search');

  const whereClause: any = {
    exam: { teacherId: auth.user.userId },
    status: { in: ['SUBMITTED', 'GRADED'] },
  };

  if (examId) {
    whereClause.examId = examId;
  }

  if (group && group !== 'all') {
    whereClause.studentGroup = group;
  }

  if (search) {
    whereClause.OR = [
      { studentName: { contains: search } },
      { studentPhone: { contains: search } },
    ];
  }

  const attempts = await prisma.examAttempt.findMany({
    where: whereClause,
    orderBy: { submittedAt: 'desc' },
    include: {
      exam: {
        select: {
          id: true,
          title: true,
          code: true,
          passingPercentage: true,
        },
      },
      _count: {
        select: {
          answers: {
            where: {
              question: { type: 'essay' },
              isCorrect: null, // Pending grading
            },
          },
        },
      },
    },
  });

  const formatted = attempts.map((attempt) => ({
    id: attempt.id,
    studentName: attempt.studentName,
    studentPhone: attempt.studentPhone,
    studentGroup: attempt.studentGroup || 'غير محدد',
    examTitle: attempt.exam.title,
    examCode: attempt.exam.code,
    score: `${attempt.totalScore} / ${attempt.maxScore}`,
    totalScore: attempt.totalScore,
    maxScore: attempt.maxScore,
    percentage: attempt.percentage,
    isPassed: attempt.isPassed,
    timeSpentSeconds: attempt.timeSpentSeconds,
    status: attempt.status,
    needsEssayGrading: attempt._count.answers > 0,
    submittedAt: attempt.submittedAt || attempt.createdAt,
  }));

  return NextResponse.json({
    results: formatted,
    totalCount: formatted.length,
  });
}
