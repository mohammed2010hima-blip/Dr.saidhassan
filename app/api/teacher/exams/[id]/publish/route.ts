import { NextRequest, NextResponse } from 'next/server';
import { requireTeacherAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const StatusSchema = z.object({
  status: z.enum(['DRAFT', 'PUBLISHED', 'CLOSED']),
});

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const parsed = StatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'الحالة غير صالحة' }, { status: 400 });
    }

    const { status } = parsed.data;

    const exam = await prisma.exam.findFirst({
      where: { id: params.id, teacherId: auth.user.userId },
      include: { questions: true },
    });

    if (!exam) {
      return NextResponse.json({ error: 'الاختبار غير موجود' }, { status: 404 });
    }

    if (status === 'PUBLISHED' && exam.questions.length === 0) {
      return NextResponse.json({ error: 'لا يمكن نشر اختبار لا يحتوي على أسئلة' }, { status: 400 });
    }

    const updated = await prisma.exam.update({
      where: { id: params.id },
      data: { status },
    });

    let statusText = 'مسودة';
    if (status === 'PUBLISHED') statusText = 'منشور ومتاح للطلاب الآن';
    if (status === 'CLOSED') statusText = 'مغلق ولا يستقبل إجابات';

    return NextResponse.json({
      success: true,
      message: `تم تغيير حالة الاختبار إلى: ${statusText}`,
      status: updated.status,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'حدث خطأ أثناء تحديث حالة الاختبار' }, { status: 500 });
  }
}
