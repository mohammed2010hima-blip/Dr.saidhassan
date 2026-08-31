import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const AutosaveSchema = z.object({
  attemptId: z.string(),
  timeSpentSeconds: z.number().default(0),
  answers: z.array(
    z.object({
      questionId: z.string(),
      selectedOption: z.string().optional().nullable(),
      essayAnswer: z.string().optional().nullable(),
    })
  ),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = AutosaveSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'بيانات غير صالحة' }, { status: 400 });
    }

    const { attemptId, timeSpentSeconds, answers } = parsed.data;

    const attempt = await prisma.examAttempt.findUnique({
      where: { id: attemptId },
    });

    if (!attempt) {
      return NextResponse.json({ error: 'المحاولة غير موجودة' }, { status: 404 });
    }

    if (attempt.status !== 'IN_PROGRESS') {
      return NextResponse.json({ message: 'المحاولة تم تسليمها بالفعل' }, { status: 200 });
    }

    // Update time spent
    await prisma.examAttempt.update({
      where: { id: attemptId },
      data: { timeSpentSeconds },
    });

    // Upsert student answers
    for (const ans of answers) {
      const existing = await prisma.studentAnswer.findFirst({
        where: {
          attemptId,
          questionId: ans.questionId,
        },
      });

      if (existing) {
        await prisma.studentAnswer.update({
          where: { id: existing.id },
          data: {
            selectedOption: ans.selectedOption || null,
            essayAnswer: ans.essayAnswer || null,
          },
        });
      } else {
        await prisma.studentAnswer.create({
          data: {
            attemptId,
            questionId: ans.questionId,
            selectedOption: ans.selectedOption || null,
            essayAnswer: ans.essayAnswer || null,
            pointsAwarded: 0,
          },
        });
      }
    }

    return NextResponse.json({ success: true, savedAt: new Date().toISOString() });
  } catch (error: any) {
    console.error('Autosave Error:', error);
    return NextResponse.json({ error: 'فشل الحفظ التلقائي' }, { status: 500 });
  }
}
