import { NextRequest, NextResponse } from 'next/server';
import { requireTeacherAuth, hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const CreateStudentSchema = z.object({
  name: z.string().min(3, 'الاسم مطلوب'),
  username: z.string().min(3, 'اسم المستخدم مطلوب'),
  email: z.string().email().optional().or(z.literal('')),
  password: z.string().min(6, 'كلمة المرور مطلوبة'),
  phone: z.string().min(10, 'رقم هاتف الطالب مطلوب'),
  parentPhone: z.string().min(10, 'رقم هاتف ولي الأمر مطلوب'),
  stage: z.string().min(1, 'الصف الدراسي مطلوب'),
  groupName: z.string().min(1, 'المجموعة الدراسية مطلوبة'),
  semester: z.string().default('الفصل الدراسي الأول'),
});

export async function GET(req: NextRequest) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const stage = searchParams.get('stage');
    const group = searchParams.get('group');
    const semester = searchParams.get('semester');

    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
        { parentPhone: { contains: search } },
        { username: { contains: search } },
      ];
    }

    if (stage && stage !== 'all') {
      whereClause.stage = stage;
    }

    if (group && group !== 'all') {
      whereClause.groupName = group;
    }

    if (semester && semester !== 'all') {
      whereClause.semester = semester;
    }

    const students = await prisma.student.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        attempts: {
          select: {
            id: true,
            totalScore: true,
            maxScore: true,
            percentage: true,
            isPassed: true,
            isApproved: true,
            createdAt: true,
          },
        },
      },
    });

    const formatted = students.map((s) => {
      const approvedAttempts = s.attempts.filter((a) => a.isApproved);
      const avgScore = approvedAttempts.length > 0
        ? Math.round((approvedAttempts.reduce((sum, a) => sum + a.percentage, 0) / approvedAttempts.length) * 10) / 10
        : 0;

      return {
        id: s.id,
        name: s.name,
        username: s.username,
        email: s.email,
        phone: s.phone,
        parentPhone: s.parentPhone,
        stage: s.stage,
        groupName: s.groupName,
        semester: s.semester,
        isActive: s.isActive,
        createdAt: s.createdAt,
        totalAttemptsCount: s.attempts.length,
        approvedExamsCount: approvedAttempts.length,
        averageScore: avgScore,
      };
    });

    // Breakdown aggregations
    const allStudents = await prisma.student.findMany({
      select: { stage: true, groupName: true },
    });

    const stageBreakdown: Record<string, number> = {};
    const groupBreakdown: Record<string, number> = {};

    for (const s of allStudents) {
      stageBreakdown[s.stage] = (stageBreakdown[s.stage] || 0) + 1;
      groupBreakdown[s.groupName] = (groupBreakdown[s.groupName] || 0) + 1;
    }

    return NextResponse.json({
      students: formatted,
      totalCount: formatted.length,
      overallTotal: allStudents.length,
      stageBreakdown,
      groupBreakdown,
    });
  } catch (error: any) {
    console.error('Teacher students fetch error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء جلب قائمة الطلاب' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const parsed = CreateStudentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { name, username, email, password, phone, parentPhone, stage, groupName, semester } = parsed.data;

    const normalizedPhone = phone.trim().replace(/\s+/g, '');
    const normalizedUsername = username.trim().toLowerCase();

    const existing = await prisma.student.findFirst({
      where: {
        OR: [{ phone: normalizedPhone }, { username: normalizedUsername }],
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'يوجد طالب مسجل بالفعل بنفس رقم الهاتف أو اسم المستخدم' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const student = await prisma.student.create({
      data: {
        name: name.trim(),
        username: normalizedUsername,
        email: email ? email.trim().toLowerCase() : null,
        passwordHash,
        phone: normalizedPhone,
        parentPhone: parentPhone.trim().replace(/\s+/g, ''),
        stage: stage.trim(),
        groupName: groupName.trim(),
        semester: semester.trim(),
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'تم إضافة الطالب بنجاح',
      student,
    });
  } catch (error: any) {
    console.error('Teacher add student error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء إضافة الطالب' }, { status: 500 });
  }
}
