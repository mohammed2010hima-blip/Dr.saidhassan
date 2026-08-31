const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial clean data for Dr. Said Hassan Platform...');

  // 1. Delete all student records and attempts
  await prisma.studentAnswer.deleteMany({});
  await prisma.examAttempt.deleteMany({});

  // 2. Delete existing questions and exams
  await prisma.questionOption.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.exam.deleteMany({});

  // 3. Delete existing courses and groups
  await prisma.course.deleteMany({});
  await prisma.group.deleteMany({});

  // 4. Create or update teacher account
  const email = 'teacher@example.com';
  const passwordHash = await bcrypt.hash('password123', 10);

  const teacher = await prisma.user.upsert({
    where: { email },
    update: {
      name: 'الدكتور سعيد حسن',
      passwordHash,
      role: 'teacher',
      teacherTitle: 'خبير ومدرس أول اللغة العربية',
      teacherBio: 'خبير ومدرس أول اللغة العربية لأكثر من 40 عاماً في تدريس مناهج الثانوية العامة وإعداد أوائل الجمهورية.',
      teacherExperience: 'أكثر من 40 عاماً',
      teacherStudentsCount: '+10,000 طالب أونلاين',
      teacherCoursesCount: '+50 دورة ومذكرة تفاعلية',
      platformName: 'منصة د.سعيد حسن التعليمية',
      heroBadge: 'منصتك التعليمية الأولى في اللغة العربية',
      heroTitle: 'تعلم بطريقة مختلفة وحقق أفضل نتائجك',
      heroSubtitle: 'دروس متكاملة، امتحانات تفاعلية بالذكاء الاصطناعي، ومتابعة مستمرة لمساعدتك على التفوق وبلوغ القمة.',
      teacherImageUrl: '/teacher.png',
      brandTheme: 'violet',
      geminiModel: 'gemini-2.5-flash',
    },
    create: {
      email,
      name: 'الدكتور سعيد حسن',
      passwordHash,
      role: 'teacher',
      teacherTitle: 'خبير ومدرس أول اللغة العربية',
      teacherBio: 'خبير ومدرس أول اللغة العربية لأكثر من 40 عاماً في تدريس مناهج الثانوية العامة وإعداد أوائل الجمهورية.',
      teacherExperience: 'أكثر من 40 عاماً',
      teacherStudentsCount: '+10,000 طالب أونلاين',
      teacherCoursesCount: '+50 دورة ومذكرة تفاعلية',
      platformName: 'منصة د.سعيد حسن التعليمية',
      heroBadge: 'منصتك التعليمية الأولى في اللغة العربية',
      heroTitle: 'تعلم بطريقة مختلفة وحقق أفضل نتائجك',
      heroSubtitle: 'دروس متكاملة، امتحانات تفاعلية بالذكاء الاصطناعي، ومتابعة مستمرة لمساعدتك على التفوق وبلوغ القمة.',
      teacherImageUrl: '/teacher.png',
      brandTheme: 'violet',
      geminiModel: 'gemini-2.5-flash',
    },
  });

  console.log(`Teacher account ready: ${teacher.email} / password123`);

  // 5. Create default groups
  const defaultGroups = [
    'مجموعة السبت والثلاثاء (المحاضرة العامة)',
    'مجموعة الأحد والأربعاء (شعبة اللغات)',
    'مجموعة المتفوقين والمراجعة المكثفة'
  ];

  for (const groupName of defaultGroups) {
    await prisma.group.create({
      data: {
        teacherId: teacher.id,
        name: groupName,
      },
    });
  }

  // 6. Create default courses
  await prisma.course.createMany({
    data: [
      {
        teacherId: teacher.id,
        title: 'دورة النحو والصرف الشاملة للثانوية العامة',
        stage: 'الصف الثالث الثانوي',
        description: 'تغطية تفصيلية لكل وحدات النحو والصرف وتدريبات مكثفة على نظام البوكليت والأسئلة الحديثة.',
        lessonsCount: 36,
        themeColor: 'violet',
        isPublished: true,
        orderIndex: 1,
      },
      {
        teacherId: teacher.id,
        title: 'دورة البلاغة الشاملة والتطبيقية',
        stage: 'المرحلة الثانوية',
        description: 'فهم وتذوق علم البيان والبديع والمعاني مع حل نماذج امتحانات السنوات السابقة وتحليل النصوص.',
        lessonsCount: 24,
        themeColor: 'gold',
        isPublished: true,
        orderIndex: 2,
      },
      {
        teacherId: teacher.id,
        title: 'معسكر المراجعة النهائية وليالي الامتحان',
        stage: 'الثانوية العامة',
        description: 'حل أكثر من 1500 سؤال متدرج الصعوبة مع نماذج امتحانات متوقعة وحلول نموذجية وتدريبات شاملة.',
        lessonsCount: 18,
        themeColor: 'emerald',
        isPublished: true,
        orderIndex: 3,
      },
    ],
  });

  // 7. Create default sample exam
  const sampleExamCode = 'ARB-101';
  await prisma.exam.create({
    data: {
      teacherId: teacher.id,
      code: sampleExamCode,
      title: 'امتحان اللغة العربية والتعبير (نموذج تفاعلي أول)',
      description: 'اختبار تجريبي شامل يحتوي على أسئلة اختيار من متعدد وأسئلة مقالية لاختبار قدرات الطالب.',
      durationMinutes: 45,
      status: 'PUBLISHED',
      allowMultipleAttempts: true,
      requirePhone: true,
      requireGroup: true,
      groupsList: JSON.stringify(defaultGroups),
      totalPoints: 20,
      passingPercentage: 50,
      questions: {
        create: [
          {
            questionNumber: 1,
            type: 'mcq',
            questionText: 'ما هو إعراب كلمة "العلمُ" في جملة: "العلمُ نورٌ يضيءُ دروبَ الحياة"؟',
            points: 2,
            correctOptionId: 'a',
            needsReview: false,
            orderIndex: 0,
            options: {
              create: [
                { optionKey: 'a', text: 'مبتدأ مرفوع وعلامة رفعه الضمة الظاهرة' },
                { optionKey: 'b', text: 'خبر مرفوع وعلامة رفعه الضمة' },
                { optionKey: 'c', text: 'فاعل مرفوع بالضمة' },
                { optionKey: 'd', text: 'مفعول به منصوب بالفتحة' },
              ],
            },
          },
          {
            questionNumber: 2,
            type: 'mcq',
            questionText: 'أي من الكلمات التالية تعتبر همزتها همزة قطع؟',
            points: 2,
            correctOptionId: 'c',
            needsReview: false,
            orderIndex: 1,
            options: {
              create: [
                { optionKey: 'a', text: 'استخراج' },
                { optionKey: 'b', text: 'ابن' },
                { optionKey: 'c', text: 'أكرمَ' },
                { optionKey: 'd', text: 'انطلاق' },
              ],
            },
          },
          {
            questionNumber: 3,
            type: 'mcq',
            questionText: 'ما هو جمع كلمة "فؤاد" في المعجم العربي؟',
            points: 2,
            correctOptionId: 'b',
            needsReview: false,
            orderIndex: 2,
            options: {
              create: [
                { optionKey: 'a', text: 'فوائد' },
                { optionKey: 'b', text: 'أفئدة' },
                { optionKey: 'c', text: 'فؤود' },
                { optionKey: 'd', text: 'وفود' },
              ],
            },
          },
          {
            questionNumber: 4,
            type: 'essay',
            questionText: 'اكتب فقرة موجزة توضح فيها أثر القراءة في تنمية فكر الفرد ونهضة المجتمع.',
            points: 6,
            correctOptionId: null,
            needsReview: false,
            orderIndex: 3,
          },
          {
            questionNumber: 5,
            type: 'essay',
            questionText: 'اشرح المعنى البلاغي والجمالي لقول الشاعر: "والعلمُ يبني بيوتاً لا عمادَ لها.. والجهلُ يهدمُ بيتَ العِزِّ والشَّرَفِ".',
            points: 8,
            correctOptionId: null,
            needsReview: false,
            orderIndex: 4,
          },
        ],
      },
    },
  });

  console.log('Clean seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
