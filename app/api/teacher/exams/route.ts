import { NextRequest, NextResponse } from 'next/server';
import { requireTeacherAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { generateExamCode } from '@/lib/utils';
import { z } from 'zod';

const CreateExamSchema = z.object({
  title: z.string().min(1, 'عنوان الاختبار مطلوب'),
  description: z.string().optional().default(''),
  durationMinutes: z.number().nullable().optional().default(60),
  allowMultipleAttempts: z.boolean().default(false),
  requirePhone: z.boolean().default(true),
  requireGroup: z.boolean().default(true),
  groupsList: z.array(z.string()).default([]),
  passingPercentage: z.number().default(50),
  status: z.enum(['DRAFT', 'PUBLISHED', 'CLOSED']).default('DRAFT'),
  questions: z.array(
    z.object({
      questionNumber: z.number(),
      type: z.enum(['mcq', 'essay']),
      questionText: z.string().min(1, 'نص السؤال مطلوب'),
      points: z.number().default(1),
      correctOptionId: z.string().nullable().optional(),
      needsReview: z.boolean().default(false),
      options: z
        .array(
          z.object({
            optionKey: z.string(),
            text: z.string(),
          })
        )
        .optional()
        .default([]),
    })
  ),
});

// GET: List all exams for the logged in teacher
export async function GET(req: NextRequest) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const exams = await prisma.exam.findMany({
    where: { teacherId: auth.user.userId },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: {
          questions: true,
          attempts: {
            where: { status: { in: ['SUBMITTED', 'GRADED'] } },
          },
        },
      },
      attempts: {
        where: { status: { in: ['SUBMITTED', 'GRADED'] } },
        select: {
          percentage: true,
        },
      },
    },
  });

  const formatted = exams.map((exam) => {
    const validAttempts = exam.attempts;
    const avgScore =
      validAttempts.length > 0
        ? Math.round((validAttempts.reduce((acc, curr) => acc + curr.percentage, 0) / validAttempts.length) * 10) / 10
        : 0;

    return {
      id: exam.id,
      code: exam.code,
      title: exam.title,
      description: exam.description,
      durationMinutes: exam.durationMinutes,
      status: exam.status,
      allowMultipleAttempts: exam.allowMultipleAttempts,
      totalPoints: exam.totalPoints,
      questionsCount: exam._count.questions,
      attemptsCount: exam._count.attempts,
      averageScore: avgScore,
      createdAt: exam.createdAt,
      updatedAt: exam.updatedAt,
    };
  });

  return NextResponse.json({ exams: formatted });
}

// POST: Create a new exam
export async function POST(req: NextRequest) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const parsed = CreateExamSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const data = parsed.data;
    let code = generateExamCode();

    // Ensure unique code
    let exists = await prisma.exam.findUnique({ where: { code } });
    while (exists) {
      code = generateExamCode();
      exists = await prisma.exam.findUnique({ where: { code } });
    }

    const totalPoints = data.questions.reduce((sum, q) => sum + (q.points || 1), 0);

    const newExam = await prisma.exam.create({
      data: {
        teacherId: auth.user.userId,
        code,
        title: data.title,
        description: data.description,
        durationMinutes: data.durationMinutes,
        status: data.status,
        allowMultipleAttempts: data.allowMultipleAttempts,
        requirePhone: data.requirePhone,
        requireGroup: data.requireGroup,
        groupsList: JSON.stringify(data.groupsList),
        totalPoints,
        passingPercentage: data.passingPercentage,
        questions: {
          create: data.questions.map((q, index) => ({
            questionNumber: q.questionNumber || index + 1,
            type: q.type,
            questionText: q.questionText,
            points: q.points,
            correctOptionId: q.correctOptionId || null,
            needsReview: q.needsReview || false,
            orderIndex: index,
            options: {
              create: (q.options || []).map((opt) => ({
                optionKey: opt.optionKey,
                text: opt.text,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: { options: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'تم حفظ الاختبار بنجاح',
      exam: newExam,
    });
  } catch (error: any) {
    console.error('Create Exam Error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء حفظ الاختبار' }, { status: 500 });
  }
}
