import { NextRequest, NextResponse } from 'next/server';
import { requireTeacherAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const CourseSchema = z.object({
  title: z.string().min(1, 'عنوان الكورس مطلوب'),
  stage: z.string().min(1, 'المرحلة الدراسية مطلوبة'),
  description: z.string().min(1, 'وصف الكورس مطلوب'),
  badge: z.string().default('كورس متكامل'),
  lessonsCount: z.number().default(12),
  duration: z.string().default('شامل المذكرات والـ PDF'),
  price: z.string().optional().default('متاح الآن'),
  themeColor: z.string().default('violet'),
  isPublished: z.boolean().default(true),
  orderIndex: z.number().default(0),
});

export async function GET(req: NextRequest) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const courses = await prisma.course.findMany({
      where: { teacherId: auth.user.userId },
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ courses });
  } catch (error: any) {
    return NextResponse.json({ error: 'فشل جلب الكورسات' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const parsed = CourseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const course = await prisma.course.create({
      data: {
        teacherId: auth.user.userId,
        ...parsed.data,
      },
    });

    return NextResponse.json({ success: true, message: 'تم إضافة الكورس بنجاح', course }, { status: 201 });
  } catch (error: any) {
    console.error('Course creation error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء إضافة الكورس' }, { status: 500 });
  }
}
