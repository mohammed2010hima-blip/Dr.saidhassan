import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getStudentSession } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { code: string } }) {
  try {
    const code = params.code.trim().toUpperCase();

    const exam = await prisma.exam.findFirst({
      where: {
        code: { equals: code },
      },
      include: {
        questions: {
          orderBy: { orderIndex: 'asc' },
          include: {
            options: {
              orderBy: { optionKey: 'asc' },
              select: {
                id: true,
                optionKey: true,
                text: true,
              },
            },
          },
        },
      },
    });

    if (!exam) {
      return NextResponse.json({ error: 'عذراً، لم يتم العثور على هذا الامتحان' }, { status: 404 });
    }

    if (exam.status === 'DRAFT') {
      return NextResponse.json({ error: 'هذا الاختبار ما زال قيد الإعداد ولم يتم نشره بعد.' }, { status: 403 });
    }

    if (exam.status === 'CLOSED') {
      return NextResponse.json({ error: 'هذا الاختبار مغلق حالياً ولا يستقبل أي محاولات جديدة.' }, { status: 403 });
    }

    const now = new Date();
    if (exam.startsAt && new Date(exam.startsAt) > now) {
      return NextResponse.json({ error: `هذا الاختبار يبدأ في: ${new Date(exam.startsAt).toLocaleString('ar-EG')}` }, { status: 403 });
    }
    if (exam.endsAt && new Date(exam.endsAt) < now) {
      return NextResponse.json({ error: 'انتهت الفترة المحددة لأداء هذا الاختبار.' }, { status: 403 });
    }

    // Check targeting if student is logged in
    const studentSession = await getStudentSession(req);
    let currentStudent = null;

    if (studentSession?.studentId) {
      const student = await prisma.student.findUnique({
        where: { id: studentSession.studentId },
      });

      if (student) {
        currentStudent = {
          id: student.id,
          name: student.name,
          phone: student.phone,
          stage: student.stage,
          groupName: student.groupName,
          semester: student.semester,
        };

        // Enforce grade/stage targeting
        if (exam.targetStage && exam.targetStage !== 'all' && exam.targetStage !== student.stage) {
          return NextResponse.json(
            {
              error: `هذا الاختبار مخصص لـ (${exam.targetStage}) فقط، وأنت مسجل في (${student.stage}). لا يمكنك الوصول إليه.`,
              targetingBlocked: true,
            },
            { status: 403 }
          );
        }

        // Enforce group targeting
        if (exam.targetGroup && exam.targetGroup !== 'all' && exam.targetGroup !== student.groupName) {
          return NextResponse.json(
            {
              error: `هذا الاختبار مخصص لـ (${exam.targetGroup}) فقط، وأنت مسجل في (${student.groupName}).`,
              targetingBlocked: true,
            },
            { status: 403 }
          );
        }

        // Enforce semester targeting
        if (exam.targetSemester && exam.targetSemester !== 'all' && exam.targetSemester !== student.semester) {
          return NextResponse.json(
            {
              error: `هذا الاختبار مخصص لـ (${exam.targetSemester}) فقط.`,
              targetingBlocked: true,
            },
            { status: 403 }
          );
        }
      }
    }

    let groupsList: string[] = [];
    try {
      groupsList = JSON.parse(exam.groupsList || '[]');
    } catch {
      groupsList = [];
    }

    // If no groups specified in exam groupsList, fetch all groups from database
    if (groupsList.length === 0) {
      const dbGroups = await prisma.group.findMany({ select: { name: true } });
      groupsList = dbGroups.map((g) => g.name);
    }

    // Sanitize questions: strip correctOptionId and internal review flags for security
    const sanitizedQuestions = exam.questions.map((q) => ({
      id: q.id,
      questionNumber: q.questionNumber,
      type: q.type,
      questionText: q.questionText,
      points: q.points,
      options: q.options.map((opt) => ({
        key: opt.optionKey,
        text: opt.text,
      })),
    }));

    return NextResponse.json({
      exam: {
        id: exam.id,
        code: exam.code,
        title: exam.title,
        description: exam.description,
        durationMinutes: exam.durationMinutes,
        allowMultipleAttempts: exam.allowMultipleAttempts,
        maxAttempts: exam.maxAttempts,
        targetStage: exam.targetStage,
        targetGroup: exam.targetGroup,
        targetSemester: exam.targetSemester,
        requirePhone: exam.requirePhone,
        requireGroup: exam.requireGroup,
        groupsList,
        totalPoints: exam.totalPoints,
        questionsCount: sanitizedQuestions.length,
      },
      currentStudent,
      questions: sanitizedQuestions,
    });
  } catch (error: any) {
    console.error('Fetch Exam By Code Error:', error);
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 });
  }
}
