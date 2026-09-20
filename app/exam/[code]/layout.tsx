import type { Metadata } from 'next';
import React from 'react';
import { prisma } from '@/lib/db';

export async function generateMetadata({
  params,
}: {
  params: { code: string };
}): Promise<Metadata> {
  const code = (params.code || '').toUpperCase().trim();

  try {
    const exam = await prisma.exam.findFirst({
      where: { code, status: 'PUBLISHED' },
      select: { title: true, description: true, code: true },
    });

    if (!exam) {
      return {
        title: 'اختبار غير متاح | منصة د. سعيد حسن',
        robots: { index: false, follow: false },
      };
    }

    const title = `امتحان: ${exam.title} (${exam.code}) | منصة د. سعيد حسن`;
    const description =
      exam.description || `اختبار إلكتروني تفاعلي في اللغة العربية مع تصحيح ذكي وفوري بالذكاء الاصطناعي.`;

    return {
      title,
      description,
      alternates: {
        canonical: `/exam/${exam.code}`,
      },
      openGraph: {
        title,
        description,
        url: `/exam/${exam.code}`,
        type: 'website',
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch {
    return {
      title: 'اختبار إلكتروني | منصة د. سعيد حسن',
      robots: { index: false, follow: false },
    };
  }
}

export default function ExamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
