import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, signToken, setStudentAuthCookie } from '@/lib/auth';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { z } from 'zod';

const RegisterSchema = z.object({
  name: z.string().min(3, 'الاسم الكامل يجب أن يكون 3 أحرف على الأقل'),
  username: z
    .string()
    .min(3, 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل باللغة الإنجليزية أو أرقام')
    .regex(/^[a-zA-Z0-9_.-]+$/, 'اسم المستخدم يجب أن يتكون من حروف وأرقام إنجليزية وشرطات فقط'),
  email: z.string().email('البريد الإلكتروني غير صالح').optional().or(z.literal('')),
  password: z.string().min(6, 'كلمة المرور يجب ألا تقل عن 6 خانات'),
  phone: z.string().min(10, 'يرجى إدخال رقم هاتف صحيح للطالب'),
  parentPhone: z.string().min(10, 'يرجى إدخال رقم هاتف صحيح لولي الأمر'),
  stage: z.string().min(1, 'يرجى اختيار الصف الدراسي'),
  groupName: z.string().min(1, 'يرجى اختيار المجموعة الدراسية'),
  semester: z.string().default('الفصل الدراسي الأول'),
});

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`register:${ip}`, 10, 10 * 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'تم تجاوز الحد الأقصى لمحاولات التسجيل. يرجى الانتظار 10 دقائق.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = RegisterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const {
      name,
      username,
      email,
      password,
      phone,
      parentPhone,
      stage,
      groupName,
      semester,
    } = parsed.data;

    const normalizedPhone = phone.trim().replace(/\s+/g, '');
    const normalizedParentPhone = parentPhone.trim().replace(/\s+/g, '');
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedEmail = email && email.trim() !== '' ? email.trim().toLowerCase() : null;

    if (normalizedPhone === normalizedParentPhone) {
      return NextResponse.json(
        { error: 'رقم هاتف الطالب يجب أن يكون مختلفاً عن رقم هاتف ولي الأمر' },
        { status: 400 }
      );
    }

    // Check duplicate phone
    const existingPhone = await prisma.student.findUnique({
      where: { phone: normalizedPhone },
    });
    if (existingPhone) {
      return NextResponse.json(
        { error: 'رقم هاتف الطالب مسجل بالفعل بحساب آخر، يرجى تسجيل الدخول أو استخدام رقمك الخاص.' },
        { status: 409 }
      );
    }

    // Check duplicate username
    const existingUsername = await prisma.student.findUnique({
      where: { username: normalizedUsername },
    });
    if (existingUsername) {
      return NextResponse.json(
        { error: 'اسم المستخدم هذا محجوز بالفعل، يرجى اختيار اسم مستخدم آخر.' },
        { status: 409 }
      );
    }

    // Check duplicate email if provided
    if (normalizedEmail) {
      const existingEmail = await prisma.student.findUnique({
        where: { email: normalizedEmail },
      });
      if (existingEmail) {
        return NextResponse.json(
          { error: 'البريد الإلكتروني مسجل بالفعل بحساب طالب آخر.' },
          { status: 409 }
        );
      }
    }

    const passwordHash = await hashPassword(password);

    const student = await prisma.student.create({
      data: {
        name: name.trim(),
        username: normalizedUsername,
        email: normalizedEmail,
        passwordHash,
        phone: normalizedPhone,
        parentPhone: normalizedParentPhone,
        stage: stage.trim(),
        groupName: groupName.trim(),
        semester: semester.trim(),
        isActive: true,
      },
    });

    // Create welcome notification
    await prisma.notification.create({
      data: {
        studentId: student.id,
        title: 'أهلاً بك في المنصة 🎓',
        message: `مرحباً بك يا ${student.name} في منصة د.سعيد حسن التعليمية. تم إعداد حسابك لـ (${student.stage} - ${student.groupName}).`,
        type: 'system',
        link: '/student/dashboard',
      },
    });

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
      message: 'تم إنشاء حساب الطالب بنجاح! جاري توجيهك إلى لوحة التحكم...',
      student: {
        id: student.id,
        name: student.name,
        username: student.username,
        stage: student.stage,
        groupName: student.groupName,
        semester: student.semester,
      },
      redirectTo: '/student/dashboard',
    });

    setStudentAuthCookie(response, token);
    return response;
  } catch (error: any) {
    console.error('Student register error:', error);
    return NextResponse.json({ error: 'حدث خطأ في الخادم أثناء التسجيل' }, { status: 500 });
  }
}
