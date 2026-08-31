import { NextRequest, NextResponse } from 'next/server';
import { requireTeacherAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const CourseUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  stage: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  badge: z.string().optional(),
  lessonsCount: z.number().optional(),
  duration: z.string().optional(),
  price: z.string().optional(),
  themeColor: z.string().optional(),
  isPublished: z.boolean().optional(),
  orderIndex: z.number().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const parsed = CourseUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const course = await prisma.course.findFirst({
      where: { id: params.id, teacherId: auth.user.userId },
    });

    if (!course) {
      return NextResponse.json({ error: 'الكورس غير موجود' }, { status: 404 });
    }

    const updated = await prisma.course.update({
      where: { id: params.id },
      data: parsed.data,
    });

    return NextResponse.json({ success: true, message: 'تم تحديث الكورس بنجاح', course: updated });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ أثناء تحديث الكورس' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const course = await prisma.course.findFirst({
      where: { id: params.id, teacherId: auth.user.userId },
    });

    if (!course) {
      return NextResponse.json({ error: 'الكورس غير موجود' }, { status: 404 });
    }

    await prisma.course.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: 'تم حذف الكورس بنجاح' });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ أثناء حذف الكورس' }, { status: 500 });
  }
}
