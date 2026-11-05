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

    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      return NextResponse.json({ error: 'حساب الطالب غير موجود' }, { status: 404 });
    }

    // 1. Fetch targeted published exams for this student
    const targetedExams = await prisma.exam.findMany({
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
      select: {
        id: true,
        code: true,
        title: true,
        description: true,
        durationMinutes: true,
        totalPoints: true,
        examType: true,
        startsAt: true,
        endsAt: true,
        maxAttempts: true,
        targetStage: true,
        targetGroup: true,
        targetSemester: true,
        _count: { select: { questions: true } },
      },
    });

    // 2. Fetch all attempts made by this student
    const attempts = await prisma.examAttempt.findMany({
      where: {
        OR: [
          { studentId },
          { studentPhone: student.phone },
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
          },
        },
      },
    });

    // 3. Match exams with student attempt status
    const formattedExams = targetedExams.map((exam) => {
      const studentAttempts = attempts.filter((a) => a.examId === exam.id);
      const latestAttempt = studentAttempts[0];

      let status = 'AVAILABLE'; // AVAILABLE, IN_PROGRESS, SUBMITTED, APPROVED, CLOSED
      let statusLabel = 'متاح للحل الآن';

      const now = new Date();
      if (exam.startsAt && new Date(exam.startsAt) > now) {
        status = 'UPCOMING';
        statusLabel = 'سيبدأ قريباً';
      } else if (exam.endsAt && new Date(exam.endsAt) < now) {
        status = 'CLOSED';
        statusLabel = 'انتهى موعد الامتحان';
      } else if (latestAttempt) {
        if (latestAttempt.isApproved) {
          status = 'APPROVED';
          statusLabel = 'تم التصحيح والاعتماد';
        } else if (latestAttempt.status === 'SUBMITTED' || latestAttempt.status === 'GRADED') {
          status = 'SUBMITTED';
          statusLabel = 'تم التسليم وقيد الاعتماد';
        } else if (latestAttempt.status === 'IN_PROGRESS') {
          status = 'IN_PROGRESS';
          statusLabel = 'قيد الحل (متابعة)';
        }
      }

      const attemptsCount = studentAttempts.filter((a) => a.status !== 'IN_PROGRESS').length;
      const canTakeExam = attemptsCount < (exam.maxAttempts || 1) && status !== 'CLOSED' && status !== 'UPCOMING';

      return {
        id: exam.id,
        code: exam.code,
        title: exam.title,
        description: exam.description,
        durationMinutes: exam.durationMinutes,
        questionsCount: exam._count.questions,
        totalPoints: exam.totalPoints,
        examType: exam.examType,
        startsAt: exam.startsAt,
        endsAt: exam.endsAt,
        maxAttempts: exam.maxAttempts,
        status,
        statusLabel,
        canTakeExam,
        attemptsCount,
        latestAttemptId: latestAttempt?.id || null,
        latestAttemptScore: latestAttempt?.isApproved ? latestAttempt.totalScore : null,
      };
    });

    // 4. Calculate stats (Score is only visible if isApproved is true!)
    const approvedAttempts = attempts.filter((a) => a.isApproved);
    const pendingApprovalAttempts = attempts.filter((a) => !a.isApproved && (a.status === 'SUBMITTED' || a.status === 'GRADED'));

    const avgScore = approvedAttempts.length > 0
      ? Math.round((approvedAttempts.reduce((sum, a) => sum + a.percentage, 0) / approvedAttempts.length) * 10) / 10
      : 0;

    // 5. Recent notifications
    const notifications = await prisma.notification.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });

    const unreadNotificationsCount = await prisma.notification.count({
      where: { studentId, isRead: false },
    });

    // 6. Recent results list (Only showing scores for approved ones, or pending label)
    const recentResults = attempts.slice(0, 5).map((att) => ({
      id: att.id,
      examId: att.examId,
      examTitle: att.exam.title,
      examCode: att.exam.code,
      submittedAt: att.submittedAt || att.createdAt,
      timeSpentSeconds: att.timeSpentSeconds,
      isApproved: att.isApproved,
      // Strictly do not reveal final score until teacher approved it
      totalScore: att.isApproved ? att.totalScore : null,
      maxScore: att.isApproved ? att.maxScore : null,
      percentage: att.isApproved ? att.percentage : null,
      isPassed: att.isApproved ? att.isPassed : null,
      statusLabel: att.isApproved ? 'معتمدة ومصححة' : 'قيد المراجعة والاعتماد',
    }));

    return NextResponse.json({
      student: {
        id: student.id,
        name: student.name,
        username: student.username,
        email: student.email,
        phone: student.phone,
        parentPhone: student.parentPhone,
        stage: student.stage,
        groupName: student.groupName,
        semester: student.semester,
      },
      stats: {
        totalAssignedExams: targetedExams.length,
        completedExamsCount: approvedAttempts.length,
        pendingApprovalCount: pendingApprovalAttempts.length,
        averageScore: avgScore,
        unreadNotificationsCount,
      },
      availableExams: formattedExams,
      recentResults,
      notifications,
    });
  } catch (error: any) {
    console.error('Student dashboard fetch error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء تحميل بيانات لوحة التحكم' }, { status: 500 });
  }
}
