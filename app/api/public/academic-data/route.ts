import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const stages = await prisma.academicStage.findMany({
      orderBy: { orderIndex: 'asc' },
      select: { id: true, name: true, orderIndex: true },
    });

    const groups = await prisma.group.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true, stage: true },
    });

    const semesters = [
      'الفصل الدراسي الأول',
      'الفصل الدراسي الثاني',
    ];

    return NextResponse.json({
      stages: stages.map((s) => s.name),
      groups: groups.map((g) => g.name),
      stagesDetailed: stages,
      groupsDetailed: groups,
      semesters,
    });
  } catch (error: any) {
    console.error('Academic data fetch error:', error);
    return NextResponse.json({ error: 'فشل جلب البيانات الدراسية' }, { status: 500 });
  }
}
