import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dsaidhassan.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/exam/'],
        disallow: ['/teacher/', '/login', '/api/auth/', '/api/teacher/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
