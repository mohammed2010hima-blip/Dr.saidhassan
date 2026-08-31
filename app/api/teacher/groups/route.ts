import { NextRequest, NextResponse } from 'next/server';
import { requireTeacherAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const CreateGroupSchema = z.object({
  name: z.string().min(1, 'اسم المجموعة مطلوب'),
});

// GET: List all groups for teacher
export async function GET(req: NextRequest) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const groups = await prisma.group.findMany({
    where: { teacherId: auth.user.userId },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json({ groups });
}

// POST: Add a new group
export async function POST(req: NextRequest) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const parsed = CreateGroupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { name } = parsed.data;

    const existing = await prisma.group.findFirst({
      where: { teacherId: auth.user.userId, name: name.trim() },
    });

    if (existing) {
      return NextResponse.json({ error: 'المجموعة موجودة بالفعل بهذا الاسم' }, { status: 400 });
    }

    const group = await prisma.group.create({
      data: {
        teacherId: auth.user.userId,
        name: name.trim(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'تمت إضافة المجموعة بنجاح',
      group,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'حدث خطأ أثناء إضافة المجموعة' }, { status: 500 });
  }
}

// PUT: Update group name
export async function PUT(req: NextRequest) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const { id, name } = body;

    if (!id || !name || !name.trim()) {
      return NextResponse.json({ error: 'معرف المجموعة واسمها مطلوبان' }, { status: 400 });
    }

    const group = await prisma.group.findFirst({
      where: { id, teacherId: auth.user.userId },
    });

    if (!group) {
      return NextResponse.json({ error: 'المجموعة غير موجودة' }, { status: 404 });
    }

    const updated = await prisma.group.update({
      where: { id },
      data: { name: name.trim() },
    });

    return NextResponse.json({
      success: true,
      message: 'تم تعديل اسم المجموعة بنجاح',
      group: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'حدث خطأ أثناء تعديل المجموعة' }, { status: 500 });
  }
}

// DELETE: Delete group
export async function DELETE(req: NextRequest) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'معرف المجموعة مطلوب' }, { status: 400 });
  }

  await prisma.group.deleteMany({
    where: { id, teacherId: auth.user.userId },
  });

  return NextResponse.json({ success: true, message: 'تم حذف المجموعة بنجاح' });
}

