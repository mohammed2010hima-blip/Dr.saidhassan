import { NextRequest, NextResponse } from 'next/server';
import { requireStudentAuth, verifyPassword, hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'كلمة المرور الحالية مطلوبة'),
  newPassword: z.string().min(6, 'كلمة المرور الجديدة يجب ألا تقل عن 6 خانات'),
});

export async function POST(req: NextRequest) {
  const auth = await requireStudentAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const parsed = ChangePasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { currentPassword, newPassword } = parsed.data;
    const student = await prisma.student.findUnique({
      where: { id: auth.student.studentId },
    });

    if (!student) {
      return NextResponse.json({ error: 'الطالب غير موجود' }, { status: 404 });
    }

    const isValid = await verifyPassword(currentPassword, student.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'كلمة المرور الحالية غير صحيحة' }, { status: 400 });
    }

    const passwordHash = await hashPassword(newPassword);
    await prisma.student.update({
      where: { id: student.id },
      data: { passwordHash },
    });

    return NextResponse.json({
      success: true,
      message: 'تم تحديث كلمة المرور الخاصة بك بنجاح',
    });
  } catch (error: any) {
    console.error('Change student password error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء تغيير كلمة المرور' }, { status: 500 });
  }
}
