import { NextRequest, NextResponse } from 'next/server';
import { requireStudentAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const auth = await requireStudentAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ student: null }, { status: 401 });
  }

  const student = await prisma.student.findUnique({
    where: { id: auth.student.studentId },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      phone: true,
      parentPhone: true,
      stage: true,
      groupName: true,
      semester: true,
      createdAt: true,
      _count: {
        select: {
          notifications: { where: { isRead: false } },
          attempts: true,
        },
      },
    },
  });

  if (!student) {
    return NextResponse.json({ student: null }, { status: 404 });
  }

  return NextResponse.json({
    student: {
      ...student,
      unreadNotificationsCount: student._count.notifications,
      totalAttemptsCount: student._count.attempts,
    },
  });
}
