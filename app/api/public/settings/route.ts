import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET(req: NextRequest) {
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
        brandTheme: true,
      },
    });

    return NextResponse.json(
      {
        settings: {
          platformName: teacher?.platformName || 'منصة د.سعيد حسن',
          teacherName: teacher?.name || 'الدكتور سعيد حسن',
          teacherTitle: teacher?.teacherTitle || 'خبير ومدرس أول اللغة العربية',
          teacherBio: teacher?.teacherBio || 'أسعى إلى تحبيب اللغة العربية إلى الشباب وتصحيح الأخطاء اللغوية الشائعة حتى يبقى للغة رونقها وفي سبيل ذلك أخصص دورات لتدريب المدرسين الراغبين في ذلك وتأهيلهم وكتب لشرح المناهج بصيغة pdf او word وملفات باور بوينت لكل المراحل وأغانٍ لكل الفروع.',
          teacherExperience: teacher?.teacherExperience || 'أكثر من 40 عاماً',
          teacherStudentsCount: teacher?.teacherStudentsCount || '+10,000 طالب',
          teacherCoursesCount: teacher?.teacherCoursesCount || '+50 دورة ومذكرة',
          heroBadge: teacher?.heroBadge || 'منصة الدكتور سعيد حسن التعليمية',
          heroTitle: teacher?.heroTitle || 'تعلم بطريقة مختلفة وحقق أعلى درجاتك في اللغة العربية',
          heroSubtitle: teacher?.heroSubtitle || 'دروس متكاملة، كورسات منظمة، امتحانات تفاعلية بالذكاء الاصطناعي، ومتابعة تساعدك على الوصول لأفضل مستوى.',
          teacherImageUrl: teacher?.teacherImageUrl || '/teacher.png',
          brandTheme: teacher?.brandTheme || 'violet',
        },
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  } catch (error) {
    console.error('Failed to get public settings:', error);
    return NextResponse.json(
      {
        settings: {
          platformName: 'منصة د.سعيد حسن',
          teacherName: 'الدكتور سعيد حسن',
          teacherTitle: 'خبير ومدرس أول اللغة العربية',
          teacherBio: 'أسعى إلى تحبيب اللغة العربية إلى الشباب وتصحيح الأخطاء اللغوية الشائعة حتى يبقى للغة رونقها وفي سبيل ذلك أخصص دورات لتدريب المدرسين الراغبين في ذلك وتأهيلهم وكتب لشرح المناهج بصيغة pdf او word وملفات باور بوينت لكل المراحل وأغانٍ لكل الفروع.',
          teacherExperience: 'أكثر من 40 عاماً',
          teacherStudentsCount: '+10,000 طالب',
          teacherCoursesCount: '+50 دورة ومذكرة',
          heroBadge: 'منصة الدكتور سعيد حسن التعليمية',
          heroTitle: 'تعلم بطريقة مختلفة وحقق أعلى درجاتك في اللغة العربية',
          heroSubtitle: 'دروس متكاملة، كورسات منظمة، امتحانات تفاعلية بالذكاء الاصطناعي، ومتابعة تساعدك على الوصول لأفضل مستوى.',
          teacherImageUrl: '/teacher.png',
          brandTheme: 'violet',
        },
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0',
        },
      }
    );
  }
}
