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
    const notifications = await prisma.notification.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ notifications });
  } catch (error: any) {
    return NextResponse.json({ error: 'فشل جلب الإشعارات' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireStudentAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const studentId = auth.student.studentId!;
    await prisma.notification.updateMany({
      where: { studentId, isRead: false },
      data: { isRead: true },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'فشل تحديث الإشعارات' }, { status: 500 });
  }
}
