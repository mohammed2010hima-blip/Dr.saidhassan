import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const checks: Record<string, any> = {
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_URL: process.env.DATABASE_URL ? '✓ set' : '✗ missing',
      DIRECT_URL: process.env.DIRECT_URL ? '✓ set' : '✗ missing (optional)',
      JWT_SECRET: process.env.JWT_SECRET ? '✓ set' : '✗ missing',
      NODE_ENV: process.env.NODE_ENV,
    },
  };

  try {
    // Test DB connection
    await prisma.$queryRaw`SELECT 1`;
    checks.database = '✓ connected';

    // Count users
    const userCount = await prisma.user.count();
    checks.users = userCount;
  } catch (err: any) {
    checks.database = `✗ error: ${err.message}`;
  }

  const allOk = checks.database?.startsWith('✓');
  return NextResponse.json(checks, { status: allOk ? 200 : 500 });
}
