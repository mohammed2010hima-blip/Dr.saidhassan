import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyPassword, signToken, setStudentAuthCookie } from '@/lib/auth';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { z } from 'zod';

const LoginSchema = z.object({
  identifier: z.string().min(1, 'يرجى إدخال رقم الهاتف أو اسم المستخدم أو البريد'),
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
});

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`student_login:${ip}`, 10, 5 * 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'تم تجاوز الحد الأقصى لمحاولات تسجيل الدخول. يرجى الانتظار 5 دقائق.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { identifier, password } = parsed.data;
    const cleanId = identifier.trim().toLowerCase();
    const phoneClean = identifier.trim().replace(/\s+/g, '');

    // Search by phone, username, or email
    const student = await prisma.student.findFirst({
      where: {
        OR: [
          { phone: phoneClean },
          { username: cleanId },
          { email: cleanId },
        ],
      },
    });

    if (!student) {
      return NextResponse.json(
        { error: 'بيانات الدخول غير صحيحة، يرجى التأكد من رقم الهاتف أو اسم المستخدم وكلمة المرور' },
        { status: 401 }
      );
    }

    if (!student.isActive) {
      return NextResponse.json(
        { error: 'هذا الحساب معطل مؤقتاً، يرجى مراجعة المعلم أو الإدارة لتفعيله' },
        { status: 403 }
      );
    }

    const isValid = await verifyPassword(password, student.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'بيانات الدخول غير صحيحة، يرجى التأكد من كلمة المرور' },
        { status: 401 }
      );
    }

    const token = signToken({
      studentId: student.id,
      role: 'student',
      name: student.name,
      username: student.username,
      phone: student.phone,
      stage: student.stage,
      groupName: student.groupName,
      semester: student.semester,
    });

    const response = NextResponse.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح! جاري توجيهك...',
      student: {
        id: student.id,
        name: student.name,
        username: student.username,
        phone: student.phone,
        stage: student.stage,
        groupName: student.groupName,
        semester: student.semester,
      },
      redirectTo: '/student/dashboard',
    });

    setStudentAuthCookie(response, token);
    return response;
  } catch (error: any) {
    console.error('Student login error:', error);
    return NextResponse.json({ error: 'حدث خطأ في الخادم أثناء تسجيل الدخول' }, { status: 500 });
  }
}
