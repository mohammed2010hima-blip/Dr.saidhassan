import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dsaidhassan.vercel.app';

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  try {
    const publishedExams = await prisma.exam.findMany({
      where: { status: 'PUBLISHED' },
      select: { code: true, updatedAt: true },
    });

    for (const exam of publishedExams) {
      routes.push({
        url: `${baseUrl}/exam/${exam.code}`,
        lastModified: exam.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  } catch (error) {
    console.error('Sitemap generation error:', error);
  }

  return routes;
}
