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
    const studentId = auth.student.studentId!;

    const attempts = await prisma.examAttempt.findMany({
      where: {
        OR: [
          { studentId },
          { studentPhone: auth.student.phone },
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            code: true,
            totalPoints: true,
            passingPercentage: true,
            durationMinutes: true,
          },
        },
      },
    });

    const formatted = attempts.map((att) => ({
      id: att.id,
      examId: att.exam.id,
      examTitle: att.exam.title,
      examCode: att.exam.code,
      status: att.status,
      isApproved: att.isApproved,
      submittedAt: att.submittedAt || att.createdAt,
      timeSpentSeconds: att.timeSpentSeconds,
      // Hide numeric scores completely until teacher approved the result
      totalScore: att.isApproved ? att.totalScore : null,
      maxScore: att.isApproved ? att.maxScore : null,
      percentage: att.isApproved ? att.percentage : null,
      isPassed: att.isApproved ? att.isPassed : null,
      teacherNotes: att.isApproved ? att.teacherNotes : null,
      canReviewDetails: att.isApproved,
      statusBadge: att.isApproved
        ? { text: 'تم الاعتماد والتصحيح', color: 'emerald' }
        : att.status === 'IN_PROGRESS'
        ? { text: 'قيد الحل', color: 'amber' }
        : { text: 'قيد المراجعة والاعتماد', color: 'blue' },
    }));

    return NextResponse.json({ results: formatted });
  } catch (error: any) {
    console.error('Fetch student results error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء جلب النتائج' }, { status: 500 });
  }
}
