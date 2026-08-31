import { NextRequest, NextResponse } from 'next/server';
import { requireTeacherAuth } from '@/lib/auth';
import { StatsService } from '@/services/exam/stats-service';

export async function GET(req: NextRequest) {
  const auth = await requireTeacherAuth(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const stats = await StatsService.getTeacherStats(auth.user.userId);
    return NextResponse.json(stats);
  } catch (error: any) {
    console.error('Analytics Error:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء جلب الإحصائيات' }, { status: 500 });
  }
}
