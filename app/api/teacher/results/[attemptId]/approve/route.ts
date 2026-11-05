import { NextRequest, NextResponse } from 'next/server';
import { requireTeacherAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const ApproveSchema = z.object({
  teacherNotes: z.string().optional(),
  adjustedTotalScore: z.number().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { attemptId: string } }
) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const parsed = ApproveSchema.safeParse(body);

    const attempt = await prisma.examAttempt.findFirst({
      where: {
        id: params.attemptId,
        exam: { teacherId: auth.user.userId },
      },
      include: {
        exam: true,
      },
    });

    if (!attempt) {
      return NextResponse.json({ error: 'المحاولة غير موجودة' }, { status: 404 });
    }

    let finalTotalScore = attempt.totalScore;
    let finalPercentage = attempt.percentage;
    let finalIsPassed = attempt.isPassed;

    if (parsed.success && parsed.data.adjustedTotalScore !== undefined) {
      finalTotalScore = Math.min(Math.max(0, parsed.data.adjustedTotalScore), attempt.maxScore);
      finalPercentage = attempt.maxScore > 0 ? Math.round((finalTotalScore / attempt.maxScore) * 1000) / 10 : 0;
      finalIsPassed = finalPercentage >= (attempt.exam.passingPercentage || 50);
    }

    // Link studentId if it was missing by finding student with matching phone
    let linkedStudentId = attempt.studentId;
    if (!linkedStudentId && attempt.studentPhone) {
      const student = await prisma.student.findUnique({
        where: { phone: attempt.studentPhone },
      });
      if (student) {
        linkedStudentId = student.id;
      }
    }

    const updatedAttempt = await prisma.examAttempt.update({
      where: { id: params.attemptId },
      data: {
        studentId: linkedStudentId,
        isApproved: true,
        approvedAt: new Date(),
        approvedBy: auth.user.userId,
        status: 'GRADED',
        totalScore: finalTotalScore,
        percentage: finalPercentage,
        isPassed: finalIsPassed,
        teacherNotes: parsed.success ? parsed.data.teacherNotes : attempt.teacherNotes,
      },
    });

    // Send in-platform notification to the student if registered
    if (linkedStudentId) {
      await prisma.notification.create({
        data: {
          studentId: linkedStudentId,
          title: `تم اعتماد نتيجة: ${attempt.exam.title} 🎯`,
          message: `تم اعتماد نتيجتك رسمياً من المعلم. درجتك: ${finalTotalScore} من ${attempt.maxScore} (${finalPercentage}%) - ${finalIsPassed ? 'ناجح ومتميز 👏' : 'يحتاج لمزيد من المراجعة'}.`,
          type: 'result',
          link: `/student/results/${attempt.id}`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'تم اعتماد النتيجة بنجاح وإرسال الإشعار إلى لوحة تحكم الطالب',
      attempt: updatedAttempt,
    });
  } catch (error: any) {
    console.error('Approve Result Error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء اعتماد النتيجة' }, { status: 500 });
  }
}
