import React from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { LandingClient, PlatformSettings, PublicExam } from '@/components/landing/LandingClient';

export const revalidate = 60; // ISR: Revalidate page data every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  let platformName = 'منصة د. سعيد حسن التعليمية';
  let teacherTitle = 'خبير ومدرس أول اللغة العربية للمرحلة الثانوية والشهادة الإعدادية';
  let teacherBio =
    'المنصة التعليمية المتكاملة في اللغة العربية لطلاب المرحلة الثانوية (الصف الأول، الثاني، الثالث الثانوي) والشهادة الإعدادية (الصف الثالث الإعدادي). دروس تفاعلية، امتحانات إلكترونية ذكية، ومذكرات PDF شاملة.';

  try {
    const teacher = await prisma.user.findFirst({
      where: { role: 'teacher' },
      select: {
        platformName: true,
        teacherTitle: true,
        teacherBio: true,
      },
    });

    if (teacher) {
      if (teacher.platformName) platformName = teacher.platformName;
      if (teacher.teacherTitle) teacherTitle = teacher.teacherTitle;
      if (teacher.teacherBio) teacherBio = teacher.teacherBio;
    }
  } catch (e) {
    console.error('Error fetching metadata settings:', e);
  }

  const title = `${platformName} | لغة عربية للثانوية العامة والشهادة الإعدادية`;
  const description = `${teacherBio} - شرح النحو والبلاغة والأدب والنصوص مع امتحانات إلكترونية وتصحيح فوري.`.slice(0, 160);

  return {
    title,
    description,
    keywords: [
      // المرحلة الثانوية
      'لغة عربية تالتة ثانوي',
      'عربي الثانوية العامة',
      'لغة عربية الصف الثالث الثانوي',
      'لغة عربية أولى ثانوي',
      'لغة عربية الصف الأول الثانوي',
      'لغة عربية تانية ثانوي',
      'لغة عربية الصف الثاني الثانوي',
      // الشهادة الإعدادية
      'لغة عربية تالتة إعدادي',
      'عربي الصف الثالث الإعدادي',
      'امتحانات عربي تالتة إعدادي',
      // الفروع والمعلم
      'دكتور سعيد حسن',
      'مذكرات لغة عربية pdf',
      'امتحانات لغة عربية تفاعلية',
      'شرح نحو ثانوية عامة',
      'شرح بلاغة',
      'أدب عربي ونصوص متحررة',
      'منصة تعليمية لغة عربية',
    ],
    authors: [{ name: 'د. سعيد حسن' }],
    creator: 'د. سعيد حسن',
    publisher: 'منصة د. سعيد حسن التعليمية',
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: platformName,
      locale: 'ar_EG',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/teacher.png`,
          width: 800,
          height: 800,
          alt: 'الدكتور سعيد حسن - خبير ومدرس أول اللغة العربية للمرحلة الثانوية والشهادة الإعدادية',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/teacher.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Default Settings Fallback
  let settings: PlatformSettings = {
    platformName: 'منصة د. سعيد حسن التعليمية',
    teacherName: 'الدكتور سعيد حسن',
    teacherTitle: 'خبير ومدرس أول للغة العربية للمرحلة الثانوية والإعدادية',
    teacherBio:
      'أسعى إلى تحبيب اللغة العربية إلى الشباب وتصحيح الأخطاء اللغوية الشائعة حتى يبقى للغة رونقها وفي سبيل ذلك أخصص دورات لتدريب المدرسين الراغبين في ذلك وتأهيلهم وكتب لشرح المناهج بصيغة pdf او word وملفات باور بوينت لكل المراحل وأغانٍ لكل الفروع.',
    teacherExperience: 'أكثر من 40 عاماً',
    teacherStudentsCount: '+10,000 طالب',
    teacherCoursesCount: '+50 دورة ومذكرة',
    heroBadge: 'المنصة التعليمية المتكاملة لكل الصفوف الثانوية والشهادة الإعدادية',
    heroTitle: 'لـغـة عـربـيـة',
    heroSubtitle:
      'دروس متكاملة، كورسات منظمة لجميع المراحل الثانوية وتالتة إعدادي، امتحانات تفاعلية بالذكاء الاصطناعي، ومتابعة مستمرة.',
    teacherImageUrl: '/teacher.png',
  };

  let exams: PublicExam[] = [];
  let courses: any[] = [];

  try {
    const teacher = await prisma.user.findFirst({
      where: { role: 'teacher' },
      select: {
        name: true,
        platformName: true,
        teacherTitle: true,
        teacherBio: true,
        teacherExperience: true,
        teacherStudentsCount: true,
        teacherCoursesCount: true,
        heroBadge: true,
        heroTitle: true,
        heroSubtitle: true,
        teacherImageUrl: true,
      },
    });

    if (teacher) {
      settings = {
        platformName: teacher.platformName || settings.platformName,
        teacherName: teacher.name || settings.teacherName,
        teacherTitle: teacher.teacherTitle || settings.teacherTitle,
        teacherBio: teacher.teacherBio || settings.teacherBio,
        teacherExperience: teacher.teacherExperience || settings.teacherExperience,
        teacherStudentsCount: teacher.teacherStudentsCount || settings.teacherStudentsCount,
        teacherCoursesCount: teacher.teacherCoursesCount || settings.teacherCoursesCount,
        heroBadge: teacher.heroBadge || settings.heroBadge,
        heroTitle: teacher.heroTitle || settings.heroTitle,
        heroSubtitle: teacher.heroSubtitle || settings.heroSubtitle,
        teacherImageUrl: teacher.teacherImageUrl || settings.teacherImageUrl,
      };
    }

    const publishedExams = await prisma.exam.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        code: true,
        title: true,
        description: true,
        durationMinutes: true,
        totalPoints: true,
        createdAt: true,
        _count: {
          select: {
            questions: true,
            attempts: {
              where: { status: { in: ['SUBMITTED', 'GRADED'] } },
            },
          },
        },
      },
    });

    exams = publishedExams.map((exam) => ({
      id: exam.id,
      code: exam.code,
      title: exam.title,
      description: exam.description,
      durationMinutes: exam.durationMinutes,
      questionsCount: exam._count.questions,
      totalPoints: exam.totalPoints,
      attemptsCount: exam._count.attempts,
      createdAt: exam.createdAt.toISOString(),
    }));

    const dbCourses = await prisma.course.findMany({
      where: { isPublished: true },
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
    });
    courses = dbCourses.map((c) => ({
      id: c.id,
      title: c.title,
      stage: c.stage,
      description: c.description,
      badge: c.badge,
      lessonsCount: c.lessonsCount,
      duration: c.duration,
      price: c.price,
      themeColor: c.themeColor,
      isPublished: c.isPublished,
      orderIndex: c.orderIndex,
      createdAt: c.createdAt.toISOString(),
    }));
  } catch (err) {
    console.error('Server Data Fetch Error on Homepage:', err);
  }

  // Schema.org Structured Data (JSON-LD) - Technical SEO for Secondary & 3rd Prep Grades
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Educational Organization
      {
        '@type': 'EducationalOrganization',
        '@id': `${baseUrl}/#organization`,
        name: settings.platformName,
        description: settings.heroSubtitle,
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        founder: {
          '@type': 'Person',
          name: settings.teacherName,
          jobTitle: settings.teacherTitle,
          description: settings.teacherBio,
          image: `${baseUrl}/teacher.png`,
        },
      },
      // 2. Instructor / Teacher Profile
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#teacher`,
        name: settings.teacherName,
        jobTitle: settings.teacherTitle,
        description: settings.teacherBio,
        image: `${baseUrl}/teacher.png`,
        worksFor: {
          '@type': 'EducationalOrganization',
          name: settings.platformName,
        },
      },
      // 3. Courses Schema (Covering 3rd Prep + 1st, 2nd, 3rd Secondary)
      {
        '@type': 'ItemList',
        name: 'المناهج التعليمية في اللغة العربية للمرحلة الثانوية والشهادة الإعدادية',
        itemListElement: [
          {
            '@type': 'Course',
            position: 1,
            name: 'منهج اللغة العربية للثانوية العامة (الصف الثالث الثانوي)',
            description: 'كورس شامل ومكثف لطلاب 3 ثانوي يغطي النحو الكامل، البلاغة، الأدب، النصوص المتحررة، والتطبيقات الحديثة لنظام البوكليت.',
            provider: {
              '@type': 'Person',
              name: settings.teacherName,
            },
            educationalLevel: 'الصف الثالث الثانوي - الثانوية العامة',
          },
          {
            '@type': 'Course',
            position: 2,
            name: 'منهج اللغة العربية للصف الثاني الثانوي',
            description: 'شرح وتدريبات متطورة على دروس النحو والبلاغة والأدب والنصوص للفصلين الدراسيين الأول والثاني.',
            provider: {
              '@type': 'Person',
              name: settings.teacherName,
            },
            educationalLevel: 'الصف الثاني الثانوي',
          },
          {
            '@type': 'Course',
            position: 3,
            name: 'منهج اللغة العربية للصف الأول الثانوي',
            description: 'التأسيس القوي لنظام الثانوية العامة الجديد في النحو والبلاغة والأدب وتطوير مهارات التفكير والاستنباط.',
            provider: {
              '@type': 'Person',
              name: settings.teacherName,
            },
            educationalLevel: 'الصف الأول الثانوي',
          },
          {
            '@type': 'Course',
            position: 4,
            name: 'منهج اللغة العربية للشهادة الإعدادية (الصف الثالث الإعدادي)',
            description: 'شرح متكامل لمنهج اللغة العربية لطلاب 3 إعدادي يشمل النحو، القراءة، القصة، والنصوص مع نماذج امتحانات المحافظات وتصحيح ذكي.',
            provider: {
              '@type': 'Person',
              name: settings.teacherName,
            },
            educationalLevel: 'الصف الثالث الإعدادي - الشهادة الإعدادية',
          },
        ],
      },
      // 4. FAQ Schema for Rich Snippets on Search Engines
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'ما هي الصفوف والمراحل الدراسية المتاحة على منصة د. سعيد حسن؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'تغطي المنصة منهج اللغة العربية كاملاً لجميع صفوف المرحلة الثانوية (الصف الأول الثانوي، الصف الثاني الثانوي، الصف الثالث الثانوي - الثانوية العامة)، بالإضافة إلى مرحلة الشهادة الإعدادية (الصف الثالث الإعدادي).',
            },
          },
          {
            '@type': 'Question',
            name: 'كيف يتم تصحيح الامتحانات الإلكترونية على المنصة؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'توفر المنصة نظام تصحيح فوري وذكي مدعوم بالذكاء الاصطناعي لأسئلة الاختيار من متعدد والأسئلة المقالية، مع استخراج النتيجة الفورية وتقارير تفصيلية بنقاط القوة والموضوعات التي تحتاج إلى مراجعة.',
            },
          },
          {
            '@type': 'Question',
            name: 'هل توفر المنصة مذكرات وبنوك أسئلة بصيغة PDF؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'نعم، توفر المنصة مذكرات تدريبية وبنوك أسئلة شاملة وملفات PDF لكل فرع من فروع اللغة العربية (النحو، البلاغة، الصرف، الأدب والنصوص) لكل مرحلة دراسية.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LandingClient initialSettings={settings} initialExams={exams} initialCourses={courses} />
    </>
  );
}
