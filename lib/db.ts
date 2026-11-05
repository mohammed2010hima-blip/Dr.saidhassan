import { PrismaClient } from '../prisma/generated-client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  // Build DATABASE_URL from Supabase env if not already set
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('file:')) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const dbPassword = process.env.SUPABASE_DB_PASSWORD;

    if (supabaseUrl && dbPassword) {
      // Extract project ID from Supabase URL
      const projectId = supabaseUrl.replace('https://', '').replace('.supabase.co', '');
      // Build connection string for Transaction Pooler (Vercel serverless)
      process.env.DATABASE_URL = `postgresql://postgres.${projectId}:${dbPassword}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1`;
      if (!process.env.DIRECT_URL) {
        process.env.DIRECT_URL = `postgresql://postgres.${projectId}:${dbPassword}@db.${projectId}.supabase.co:5432/postgres`;
      }
    }
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
