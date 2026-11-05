import { NextRequest, NextResponse } from 'next/server';
import { requireTeacherAuth, hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const UpdateStudentSchema = z.object({
  name: z.string().min(2).optional(),
  username: z.string().min(2).optional(),
  phone: z.string().min(8).optional(),
  parentPhone: z.string().min(8).optional(),
  stage: z.string().min(1).optional(),
  groupName: z.string().min(1).optional(),
  semester: z.string().optional(),
  isActive: z.boolean().optional(),
  newPassword: z.string().min(6).optional().or(z.literal('')),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const student = await prisma.student.findUnique({
      where: { id: params.id },
      include: {
        attempts: {
          orderBy: { createdAt: 'desc' },
          include: {
            exam: {
              select: {
                id: true,
                title: true,
                code: true,
                totalPoints: true,
                passingPercentage: true,
              },
            },
          },
        },
      },
    });

    if (!student) {
      return NextResponse.json({ error: 'الطالب غير موجود' }, { status: 404 });
    }

    const approvedAttempts = student.attempts.filter((a) => a.isApproved);
    const avgScore = approvedAttempts.length > 0
      ? Math.round((approvedAttempts.reduce((sum, a) => sum + a.percentage, 0) / approvedAttempts.length) * 10) / 10
      : 0;

    return NextResponse.json({
      student: {
        id: student.id,
        name: student.name,
        username: student.username,
        email: student.email,
        phone: student.phone,
        parentPhone: student.parentPhone,
        stage: student.stage,
        groupName: student.groupName,
        semester: student.semester,
        isActive: student.isActive,
        createdAt: student.createdAt,
        totalAttempts: student.attempts.length,
        approvedAttempts: approvedAttempts.length,
        averageScore: avgScore,
      },
      attempts: student.attempts.map((att) => ({
        id: att.id,
        examId: att.exam.id,
        examTitle: att.exam.title,
        examCode: att.exam.code,
        status: att.status,
        isApproved: att.isApproved,
        totalScore: att.totalScore,
        maxScore: att.maxScore,
        percentage: att.percentage,
        isPassed: att.isPassed,
        timeSpentSeconds: att.timeSpentSeconds,
        submittedAt: att.submittedAt || att.createdAt,
        teacherNotes: att.teacherNotes,
      })),
    });
  } catch (error: any) {
    console.error('Fetch student detail error:', error);
    return NextResponse.json({ error: 'فشل جلب ملف الطالب' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const parsed = UpdateStudentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const data = parsed.data;
    const updateData: any = {};

    if (data.name) updateData.name = data.name.trim();
    if (data.username) updateData.username = data.username.trim().toLowerCase();
    if (data.phone) updateData.phone = data.phone.trim().replace(/\s+/g, '');
    if (data.parentPhone) updateData.parentPhone = data.parentPhone.trim().replace(/\s+/g, '');
    if (data.stage) updateData.stage = data.stage.trim();
    if (data.groupName) updateData.groupName = data.groupName.trim();
    if (data.semester) updateData.semester = data.semester.trim();
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    if (data.newPassword && data.newPassword.trim().length >= 6) {
      updateData.passwordHash = await hashPassword(data.newPassword.trim());
    }

    const updated = await prisma.student.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'تم تحديث بيانات الطالب بنجاح',
      student: updated,
    });
  } catch (error: any) {
    console.error('Update student error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء تحديث بيانات الطالب' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    await prisma.student.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: 'تم حذف حساب الطالب بنجاح' });
  } catch (error: any) {
    console.error('Delete student error:', error);
    return NextResponse.json({ error: 'فشل حذف الطالب' }, { status: 500 });
  }
}
