import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET(req: NextRequest) {
  try {
    const publishedExams = await prisma.exam.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        code: true,
        title: true,
        description: true,
        durationMinutes: true,
        totalPoints: true,
        createdAt: true,
        _count: {
          select: {
            questions: true,
            attempts: {
              where: { status: { in: ['SUBMITTED', 'GRADED'] } },
            },
          },
        },
      },
    });

    const exams = publishedExams.map((exam) => ({
      id: exam.id,
      code: exam.code,
      title: exam.title,
      description: exam.description,
      durationMinutes: exam.durationMinutes,
      questionsCount: exam._count.questions,
      totalPoints: exam.totalPoints,
      attemptsCount: exam._count.attempts,
      createdAt: exam.createdAt,
    }));

    return NextResponse.json(
      { exams },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  } catch (error) {
    console.error('Public Exams Error:', error);
    return NextResponse.json(
      { exams: [] },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0',
        },
      }
    );
  }
}
