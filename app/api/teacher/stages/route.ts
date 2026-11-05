import { NextRequest, NextResponse } from 'next/server';
import { requireTeacherAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const StageSchema = z.object({
  name: z.string().min(2, 'اسم الصف الدراسي مطلوب'),
  orderIndex: z.number().default(0),
});

export async function GET(req: NextRequest) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const stages = await prisma.academicStage.findMany({
      orderBy: { orderIndex: 'asc' },
    });
    return NextResponse.json({ stages });
  } catch (error: any) {
    return NextResponse.json({ error: 'فشل جلب الصفوف الدراسية' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const parsed = StageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const stage = await prisma.academicStage.create({
      data: {
        teacherId: auth.user.userId,
        name: parsed.data.name.trim(),
        orderIndex: parsed.data.orderIndex,
      },
    });

    return NextResponse.json({ success: true, message: 'تم إضافة الصف الدراسي بنجاح', stage });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'هذا الصف الدراسي مضاف مسبقاً' }, { status: 409 });
    }
    return NextResponse.json({ error: 'فشل إضافة الصف الدراسي' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'معرف الصف مطلوب' }, { status: 400 });
    }

    await prisma.academicStage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'تم حذف الصف الدراسي بنجاح' });
  } catch (error: any) {
    return NextResponse.json({ error: 'فشل حذف الصف' }, { status: 500 });
  }
}
