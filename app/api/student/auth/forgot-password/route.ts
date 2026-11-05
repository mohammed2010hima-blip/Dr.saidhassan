import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { z } from 'zod';

const ForgotPasswordSchema = z.object({
  phone: z.string().min(10, 'يرجى إدخال رقم هاتف الطالب المسجل'),
  parentPhone: z.string().min(10, 'يرجى إدخال رقم هاتف ولي الأمر المسجل للتحقق'),
  newPassword: z.string().min(6, 'كلمة المرور الجديدة يجب ألا تقل عن 6 خانات'),
});

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`student_reset:${ip}`, 5, 10 * 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'تم تجاوز الحد الأقصى لمحاولات الاستعادة. يرجى الانتظار 10 دقائق.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = ForgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { phone, parentPhone, newPassword } = parsed.data;
    const cleanPhone = phone.trim().replace(/\s+/g, '');
    const cleanParentPhone = parentPhone.trim().replace(/\s+/g, '');

    const student = await prisma.student.findFirst({
      where: {
        phone: cleanPhone,
        parentPhone: cleanParentPhone,
      },
    });

    if (!student) {
      return NextResponse.json(
        {
          error:
            'بيانات التحقق غير متطابقة، يرجى التأكد من إدخال رقم هاتف الطالب ورقم هاتف ولي الأمر المسجلين بالضبط، أو التواصل مع المعلم لإعادة التعيين.',
        },
        { status: 404 }
      );
    }

    const passwordHash = await hashPassword(newPassword);

    await prisma.student.update({
      where: { id: student.id },
      data: { passwordHash },
    });

    // Create security notification
    await prisma.notification.create({
      data: {
        studentId: student.id,
        title: 'تغيير كلمة المرور 🔐',
        message: 'تم تحديث كلمة المرور الخاصة بحسابك بنجاح.',
        type: 'system',
        link: '/student/profile',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'تم تغيير كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.',
    });
  } catch (error: any) {
    console.error('Password reset error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء معالجة إعادة التعيين' }, { status: 500 });
  }
}
