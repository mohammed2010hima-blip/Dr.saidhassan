import { NextRequest, NextResponse } from 'next/server';

const SETUP_KEY = process.env.SETUP_SECRET || 'SETUP_2026';

// Full SQL to create all tables
const SETUP_SQL = `
-- Create tables if not exist
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'teacher',
  "geminiApiKey" TEXT,
  "geminiModel" TEXT NOT NULL DEFAULT 'gemini-2.5-flash',
  "platformName" TEXT NOT NULL DEFAULT 'منصة د.سعيد حسن',
  "teacherTitle" TEXT NOT NULL DEFAULT 'أستاذ ومدرس أول اللغة العربية',
  "teacherBio" TEXT NOT NULL DEFAULT 'أسعى إلى تحديث اللغة العربية',
  "teacherExperience" TEXT NOT NULL DEFAULT 'أكثر من 40 عاماً',
  "teacherStudentsCount" TEXT NOT NULL DEFAULT '+10,000 طالب',
  "teacherCoursesCount" TEXT NOT NULL DEFAULT '+50 دورة وملخصات',
  "heroBadge" TEXT NOT NULL DEFAULT 'منصة التعليمية الأولى في اللغة العربية',
  "heroTitle" TEXT NOT NULL DEFAULT 'طريقة تعليمية مختلفة وحلل أفضل نتائج',
  "heroSubtitle" TEXT NOT NULL DEFAULT 'دروس متكاملة، امتحانات تفاعلية',
  "teacherImageUrl" TEXT NOT NULL DEFAULT '/teacher.png',
  "brandTheme" TEXT NOT NULL DEFAULT 'violet',
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "AcademicStage" (
  "id" TEXT PRIMARY KEY,
  "teacherId" TEXT REFERENCES "User"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL UNIQUE,
  "orderIndex" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Student" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "username" TEXT NOT NULL UNIQUE,
  "email" TEXT UNIQUE,
  "passwordHash" TEXT NOT NULL,
  "phone" TEXT NOT NULL UNIQUE,
  "parentPhone" TEXT NOT NULL,
  "stage" TEXT NOT NULL,
  "groupName" TEXT NOT NULL,
  "semester" TEXT NOT NULL DEFAULT 'الفصل الدراسي الأول',
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Notification" (
  "id" TEXT PRIMARY KEY,
  "studentId" TEXT NOT NULL REFERENCES "Student"("id") ON DELETE CASCADE,
  "title" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "type" TEXT NOT NULL DEFAULT 'result',
  "link" TEXT,
  "isRead" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Course" (
  "id" TEXT PRIMARY KEY,
  "teacherId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "title" TEXT NOT NULL,
  "stage" TEXT NOT NULL,
  "description" TEXT,
  "lessonsCount" INTEGER NOT NULL DEFAULT 0,
  "themeColor" TEXT NOT NULL DEFAULT 'violet',
  "isPublished" BOOLEAN NOT NULL DEFAULT FALSE,
  "orderIndex" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Group" (
  "id" TEXT PRIMARY KEY,
  "teacherId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "name" TEXT NOT NULL,
  "stage" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Exam" (
  "id" TEXT PRIMARY KEY,
  "teacherId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "code" TEXT NOT NULL UNIQUE,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "durationMinutes" INTEGER,
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "allowMultipleAttempts" BOOLEAN NOT NULL DEFAULT FALSE,
  "maxAttempts" INTEGER NOT NULL DEFAULT 1,
  "targetStage" TEXT DEFAULT 'all',
  "targetGroup" TEXT DEFAULT 'all',
  "targetSemester" TEXT DEFAULT 'all',
  "startsAt" TIMESTAMPTZ,
  "endsAt" TIMESTAMPTZ,
  "examType" TEXT NOT NULL DEFAULT 'quiz',
  "showResultsDirectly" BOOLEAN NOT NULL DEFAULT FALSE,
  "requirePhone" BOOLEAN NOT NULL DEFAULT TRUE,
  "requireGroup" BOOLEAN NOT NULL DEFAULT TRUE,
  "groupsList" TEXT NOT NULL DEFAULT '[]',
  "totalPoints" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "passingPercentage" DOUBLE PRECISION NOT NULL DEFAULT 50,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Question" (
  "id" TEXT PRIMARY KEY,
  "examId" TEXT NOT NULL REFERENCES "Exam"("id") ON DELETE CASCADE,
  "questionNumber" INTEGER NOT NULL,
  "type" TEXT NOT NULL,
  "questionText" TEXT NOT NULL,
  "points" DOUBLE PRECISION NOT NULL DEFAULT 1,
  "correctOptionId" TEXT,
  "needsReview" BOOLEAN NOT NULL DEFAULT FALSE,
  "orderIndex" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "QuestionOption" (
  "id" TEXT PRIMARY KEY,
  "questionId" TEXT NOT NULL REFERENCES "Question"("id") ON DELETE CASCADE,
  "optionKey" TEXT NOT NULL,
  "text" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "ExamAttempt" (
  "id" TEXT PRIMARY KEY,
  "examId" TEXT NOT NULL REFERENCES "Exam"("id") ON DELETE CASCADE,
  "studentId" TEXT REFERENCES "Student"("id") ON DELETE SET NULL,
  "studentName" TEXT NOT NULL,
  "studentPhone" TEXT NOT NULL,
  "studentGroup" TEXT,
  "extraData" TEXT,
  "startedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "submittedAt" TIMESTAMPTZ,
  "timeSpentSeconds" INTEGER NOT NULL DEFAULT 0,
  "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
  "isApproved" BOOLEAN NOT NULL DEFAULT FALSE,
  "approvedAt" TIMESTAMPTZ,
  "approvedBy" TEXT,
  "teacherNotes" TEXT,
  "mcqScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "essayScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "totalScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "maxScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "percentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "isPassed" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "StudentAnswer" (
  "id" TEXT PRIMARY KEY,
  "attemptId" TEXT NOT NULL REFERENCES "ExamAttempt"("id") ON DELETE CASCADE,
  "questionId" TEXT NOT NULL REFERENCES "Question"("id") ON DELETE CASCADE,
  "selectedOption" TEXT,
  "essayAnswer" TEXT,
  "isCorrect" BOOLEAN,
  "pointsAwarded" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "teacherFeedback" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_student_username ON "Student"("username");
CREATE INDEX IF NOT EXISTS idx_student_phone ON "Student"("phone");
CREATE INDEX IF NOT EXISTS idx_exam_code ON "Exam"("code");
CREATE INDEX IF NOT EXISTS idx_exam_teacher ON "Exam"("teacherId");
CREATE INDEX IF NOT EXISTS idx_attempt_exam ON "ExamAttempt"("examId");
CREATE INDEX IF NOT EXISTS idx_attempt_student ON "ExamAttempt"("studentId");
CREATE INDEX IF NOT EXISTS idx_notification_student ON "Notification"("studentId");

-- Seed default teacher (password: DrSaid2026)
INSERT INTO "User" (
  "id","name","email","passwordHash","role",
  "platformName","teacherTitle","teacherBio","teacherExperience",
  "teacherStudentsCount","teacherCoursesCount",
  "heroBadge","heroTitle","heroSubtitle",
  "teacherImageUrl","brandTheme","geminiModel",
  "createdAt","updatedAt"
) VALUES (
  'teacher_said_hassan_01',
  'الدكتور سعيد حسن',
  'dr.said.hassan@platform.edu',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lh9C',
  'teacher',
  'منصة د.سعيد حسن التعليمية',
  'أستاذ ومدرس أول اللغة العربية',
  'أسعى إلى تحديث اللغة العربية وتقديم أساليب تعليمية متطورة.',
  'أكثر من 40 عاماً',
  '+10,000 طالب',
  '+50 دورة وملخصات',
  'منصة التعليمية الأولى في اللغة العربية',
  'طريقة تعليمية مختلفة وحلل أفضل نتائج',
  'دروس متكاملة، امتحانات تفاعلية ومحادثة مستمرة.',
  '/teacher.png',
  'violet',
  'gemini-2.5-flash',
  NOW(), NOW()
) ON CONFLICT ("email") DO NOTHING;

-- Seed academic stages
INSERT INTO "AcademicStage" ("id","teacherId","name","orderIndex","createdAt") VALUES
  ('stage_s1','teacher_said_hassan_01','الصف الأول الثانوي',1,NOW()),
  ('stage_s2','teacher_said_hassan_01','الصف الثاني الثانوي',2,NOW()),
  ('stage_s3','teacher_said_hassan_01','الصف الثالث الثانوي',3,NOW())
ON CONFLICT ("name") DO NOTHING;
`;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');

  if (key !== SETUP_KEY) {
    return NextResponse.json({ error: 'Unauthorized. Use ?key=SETUP_2026' }, { status: 401 });
  }

  const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '').replace('.supabase.co', '');
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!projectId || !serviceKey) {
    return NextResponse.json({
      error: 'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY',
      hint: 'Set these in Vercel environment variables',
    }, { status: 500 });
  }

  try {
    // Use Supabase's SQL execution via the pg endpoint
    const response = await fetch(
      `https://${projectId}.supabase.co/rest/v1/rpc/exec_sql`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({ sql: SETUP_SQL }),
      }
    );

    if (!response.ok) {
      // Try alternative: direct SQL via postgres endpoint
      const pg = await fetch(
        `https://${projectId}.supabase.co/pg/query`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': serviceKey,
            'Authorization': `Bearer ${serviceKey}`,
          },
          body: JSON.stringify({ query: SETUP_SQL }),
        }
      );

      if (!pg.ok) {
        const pgText = await pg.text();
        return NextResponse.json({
          status: 'error',
          message: 'Could not execute SQL automatically.',
          manualSteps: [
            '1. Go to: https://supabase.com/dashboard/project/' + projectId + '/sql/new',
            '2. Copy the SQL from: /prisma/supabase-setup.sql in your GitHub repo',
            '3. Click Run',
            '4. Come back and visit /api/health to verify',
          ],
          error: pgText,
          sql: SETUP_SQL,
        }, { status: 500 });
      }
    }

    return NextResponse.json({
      status: 'success',
      message: '✅ Database tables created and seeded successfully!',
      login: {
        email: 'dr.said.hassan@platform.edu',
        password: 'DrSaid2026',
        url: '/login',
      },
      nextStep: 'Visit /login and sign in with the credentials above',
    });

  } catch (err: any) {
    return NextResponse.json({
      status: 'error',
      error: err.message,
      manualFix: {
        step1: 'Open Supabase SQL Editor',
        step2: 'Run the SQL from prisma/supabase-setup.sql',
        url: `https://supabase.com/dashboard/project/${projectId}/sql/new`,
      },
    }, { status: 500 });
  }
}
