import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getStudentSession } from '@/lib/auth';
import { z } from 'zod';

const StartAttemptSchema = z.object({
  examId: z.string(),
  studentName: z.string().min(2, 'يرجى إدخال اسمك الكامل بشكل صحيح'),
  studentPhone: z.string().optional().default(''),
  studentGroup: z.string().optional().default(''),
});

export async function POST(req: NextRequest) {
  try {
    const studentSession = await getStudentSession(req);

    const body = await req.json();
    const parsed = StartAttemptSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { examId, studentName, studentPhone, studentGroup } = parsed.data;

    const exam = await prisma.exam.findUnique({
      where: { id: examId },
    });

    if (!exam) {
      return NextResponse.json({ error: 'عذراً، الامتحان غير موجود' }, { status: 404 });
    }

    if (exam.status !== 'PUBLISHED') {
      return NextResponse.json({ error: 'هذا الاختبار غير متاح للطلاب حالياً' }, { status: 403 });
    }

    const now = new Date();
    if (exam.startsAt && new Date(exam.startsAt) > now) {
      return NextResponse.json({ error: 'لم يبدأ موعد هذا الامتحان بعد.' }, { status: 403 });
    }
    if (exam.endsAt && new Date(exam.endsAt) < now) {
      return NextResponse.json({ error: 'انتهى الموعد المحدد لأداء هذا الامتحان.' }, { status: 403 });
    }

    let resolvedStudentId: string | null = null;
    let finalStudentName = studentName.trim();
    let finalStudentPhone = studentPhone.trim();
    let finalStudentGroup = studentGroup.trim();

    if (studentSession && studentSession.studentId) {
      const student = await prisma.student.findUnique({
        where: { id: studentSession.studentId },
      });

      if (student) {
        resolvedStudentId = student.id;
        finalStudentName = student.name;
        finalStudentPhone = student.phone;
        finalStudentGroup = student.groupName;

        // Verify stage targeting
        if (exam.targetStage && exam.targetStage !== 'all' && exam.targetStage !== student.stage) {
          return NextResponse.json(
            { error: `هذا الاختبار مخصص لطلاب (${exam.targetStage}) فقط ولا يمكنك الدخول إليه من صفك الدراسي الحالي.` },
            { status: 403 }
          );
        }

        // Verify group targeting
        if (exam.targetGroup && exam.targetGroup !== 'all' && exam.targetGroup !== student.groupName) {
          return NextResponse.json(
            { error: `هذا الاختبار مخصص لـ (${exam.targetGroup}) فقط ولا يمكنك الدخول إليه من مجموعتك الحالية.` },
            { status: 403 }
          );
        }

        // Verify semester targeting
        if (exam.targetSemester && exam.targetSemester !== 'all' && exam.targetSemester !== student.semester) {
          return NextResponse.json(
            { error: `هذا الاختبار مخصص لـ (${exam.targetSemester}) فقط.` },
            { status: 403 }
          );
        }
      }
    } else {
      // If student is not logged in, check if their phone belongs to a registered student account
      if (finalStudentPhone) {
        const studentByPhone = await prisma.student.findUnique({
          where: { phone: finalStudentPhone },
        });

        if (studentByPhone) {
          return NextResponse.json(
            {
              error: 'هذا الرقم مرتبط بحساب طالب مسجل، يرجى تسجيل الدخول إلى حسابك أولاً ليتم حفظ الامتحان ونتيجتك في لوحة تحكمك.',
              requiresLogin: true,
            },
            { status: 403 }
          );
        }
      }
    }

    // Required fields check
    if (exam.requirePhone && (!finalStudentPhone || finalStudentPhone.length < 6)) {
      return NextResponse.json({ error: 'رقم الهاتف مطلوب لبدء هذا الاختبار' }, { status: 400 });
    }

    if (exam.requireGroup && !finalStudentGroup) {
      return NextResponse.json({ error: 'يرجى اختيار مجموعتك الدراسية' }, { status: 400 });
    }

    // Check attempt limits
    const maxAllowed = exam.maxAttempts || (exam.allowMultipleAttempts ? 99 : 1);
    const existingAttemptsCount = await prisma.examAttempt.count({
      where: {
        examId,
        status: { in: ['SUBMITTED', 'GRADED'] },
        OR: [
          ...(resolvedStudentId ? [{ studentId: resolvedStudentId }] : []),
          ...(finalStudentPhone ? [{ studentPhone: finalStudentPhone }] : []),
        ],
      },
    });

    if (existingAttemptsCount >= maxAllowed) {
      return NextResponse.json(
        {
          error: `لقد استنفدت الحد الأقصى للمحاولات المسموح بها لهذا الاختبار (${maxAllowed} محاولة).`,
          alreadySubmitted: true,
        },
        { status: 403 }
      );
    }

    // Create new attempt linked to student account
    const attempt = await prisma.examAttempt.create({
      data: {
        examId,
        studentId: resolvedStudentId,
        studentName: finalStudentName,
        studentPhone: finalStudentPhone,
        studentGroup: finalStudentGroup || null,
        startedAt: new Date(),
        status: 'IN_PROGRESS',
        isApproved: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'تم بدء الاختبار بنجاح',
      attemptId: attempt.id,
      startedAt: attempt.startedAt,
    });
  } catch (error: any) {
    console.error('Start Attempt Error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء بدء الاختبار' }, { status: 500 });
  }
}
