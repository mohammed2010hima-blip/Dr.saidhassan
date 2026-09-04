import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

    let groupsList: string[] = [];
    try {
      groupsList = JSON.parse(exam.groupsList || '[]');
    } catch {
      groupsList = [];
    }

    // Sanitize questions: strip correctOptionId and internal review flags for security
    const sanitizedQuestions = exam.questions.map((q) => ({
      id: q.id,
      questionNumber: q.questionNumber,
      type: q.type,
      passage: q.passage || null,
      questionText: q.questionText,
      points: q.points,
      options: q.options.map((opt) => ({
        key: opt.optionKey,
        text: opt.text,
      })),
    }));

    return NextResponse.json(
      {
        exam: {
          id: exam.id,
          code: exam.code,
          title: exam.title,
          description: exam.description,
          durationMinutes: exam.durationMinutes,
          allowMultipleAttempts: exam.allowMultipleAttempts,
          requirePhone: exam.requirePhone,
          requireGroup: exam.requireGroup,
          groupsList,
          totalPoints: exam.totalPoints,
          questionsCount: sanitizedQuestions.length,
        },
        questions: sanitizedQuestions,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      }
    );
  } catch (error: any) {
    console.error('Fetch Exam By Code Error:', error);
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 });
  }
}
