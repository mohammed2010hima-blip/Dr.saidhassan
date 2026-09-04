import { NextRequest, NextResponse } from 'next/server';
import { requireTeacherAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const UpdateExamSchema = z.object({
  title: z.string().min(1, 'عنوان الاختبار مطلوب'),
  description: z.string().optional().default(''),
  durationMinutes: z.number().nullable().optional().default(60),
  allowMultipleAttempts: z.boolean().default(false),
  requirePhone: z.boolean().default(true),
  requireGroup: z.boolean().default(true),
  groupsList: z.array(z.string()).default([]),
  passingPercentage: z.number().default(50),
  status: z.enum(['DRAFT', 'PUBLISHED', 'CLOSED']).optional(),
  questions: z.array(
    z.object({
      id: z.string().optional(),
      questionNumber: z.number(),
      type: z.enum(['mcq', 'essay']),
      questionText: z.string().min(1, 'نص السؤال مطلوب'),
      passage: z.string().optional().nullable().default(null),
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

// GET: Get single exam details for editing/review
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const exam = await prisma.exam.findFirst({
    where: { id: params.id, teacherId: auth.user.userId },
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
  });

  if (!exam) {
    return NextResponse.json({ error: 'الاختبار غير موجود' }, { status: 404 });
  }

  let groups: string[] = [];
  try {
    groups = JSON.parse(exam.groupsList || '[]');
  } catch {
    groups = [];
  }

  return NextResponse.json({
    exam: {
      ...exam,
      groupsList: groups,
    },
  });
}

// PUT: Update exam and its questions
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const parsed = UpdateExamSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const data = parsed.data;

    // Check ownership
    const existing = await prisma.exam.findFirst({
      where: { id: params.id, teacherId: auth.user.userId },
    });

    if (!existing) {
      return NextResponse.json({ error: 'الاختبار غير موجود أو ليس لديك صلاحية تعديله' }, { status: 404 });
    }

    const totalPoints = data.questions.reduce((sum, q) => sum + (q.points || 1), 0);

    // Delete existing questions & options first to cleanly rebuild
    await prisma.question.deleteMany({
      where: { examId: params.id },
    });

    const updatedExam = await prisma.exam.update({
      where: { id: params.id },
      data: {
        title: data.title,
        description: data.description,
        durationMinutes: data.durationMinutes,
        status: data.status || existing.status,
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
            passage: q.passage || null,
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
      message: 'تم تحديث الاختبار بنجاح',
      exam: updatedExam,
    });
  } catch (error: any) {
    console.error('Update Exam Error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء تحديث الاختبار' }, { status: 500 });
  }
}

// DELETE: Delete an exam
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const existing = await prisma.exam.findFirst({
    where: { id: params.id, teacherId: auth.user.userId },
  });

  if (!existing) {
    return NextResponse.json({ error: 'الاختبار غير موجود' }, { status: 404 });
  }

  await prisma.exam.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true, message: 'تم حذف الاختبار بنجاح' });
}
