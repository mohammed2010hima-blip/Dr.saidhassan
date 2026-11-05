-- ============================================================
-- Dr. Said Hassan Platform - Supabase PostgreSQL Setup
-- Run this in Supabase SQL Editor to create all tables
-- ============================================================

-- Enable UUID extension (not needed for cuid but good practice)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables (in correct order due to foreign keys)
DROP TABLE IF EXISTS "StudentAnswer" CASCADE;
DROP TABLE IF EXISTS "ExamAttempt" CASCADE;
DROP TABLE IF EXISTS "Notification" CASCADE;
DROP TABLE IF EXISTS "QuestionOption" CASCADE;
DROP TABLE IF EXISTS "Question" CASCADE;
DROP TABLE IF EXISTS "Exam" CASCADE;
DROP TABLE IF EXISTS "Course" CASCADE;
DROP TABLE IF EXISTS "Group" CASCADE;
DROP TABLE IF EXISTS "AcademicStage" CASCADE;
DROP TABLE IF EXISTS "Student" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

-- User (Teachers & Admins)
CREATE TABLE "User" (
  "id"                   TEXT PRIMARY KEY,
  "name"                 TEXT NOT NULL,
  "email"                TEXT NOT NULL UNIQUE,
  "passwordHash"         TEXT NOT NULL,
  "role"                 TEXT NOT NULL DEFAULT 'teacher',
  "geminiApiKey"         TEXT,
  "geminiModel"          TEXT NOT NULL DEFAULT 'gemini-2.5-flash',
  "platformName"         TEXT NOT NULL DEFAULT 'منصة د.سعيد حسن',
  "teacherTitle"         TEXT NOT NULL DEFAULT 'أستاذ ومدرس أول اللغة العربية',
  "teacherBio"           TEXT NOT NULL DEFAULT 'أسعى إلى تحديث اللغة العربية',
  "teacherExperience"    TEXT NOT NULL DEFAULT 'أكثر من 40 عاماً',
  "teacherStudentsCount" TEXT NOT NULL DEFAULT '+10,000 طالب',
  "teacherCoursesCount"  TEXT NOT NULL DEFAULT '+50 دورة وملخصات',
  "heroBadge"            TEXT NOT NULL DEFAULT 'منصة التعليمية الأولى في اللغة العربية',
  "heroTitle"            TEXT NOT NULL DEFAULT 'طريقة تعليمية مختلفة وحلل أفضل نتائج',
  "heroSubtitle"         TEXT NOT NULL DEFAULT 'دروس متكاملة، امتحانات تفاعلية',
  "teacherImageUrl"      TEXT NOT NULL DEFAULT '/teacher.png',
  "brandTheme"           TEXT NOT NULL DEFAULT 'violet',
  "createdAt"            TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt"            TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Academic Stages
CREATE TABLE "AcademicStage" (
  "id"         TEXT PRIMARY KEY,
  "teacherId"  TEXT REFERENCES "User"("id") ON DELETE CASCADE,
  "name"       TEXT NOT NULL UNIQUE,
  "orderIndex" INTEGER NOT NULL DEFAULT 0,
  "createdAt"  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Student Accounts
CREATE TABLE "Student" (
  "id"           TEXT PRIMARY KEY,
  "name"         TEXT NOT NULL,
  "username"     TEXT NOT NULL UNIQUE,
  "email"        TEXT UNIQUE,
  "passwordHash" TEXT NOT NULL,
  "phone"        TEXT NOT NULL UNIQUE,
  "parentPhone"  TEXT NOT NULL,
  "stage"        TEXT NOT NULL,
  "groupName"    TEXT NOT NULL,
  "semester"     TEXT NOT NULL DEFAULT 'الفصل الدراسي الأول',
  "isActive"     BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt"    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt"    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Notifications
CREATE TABLE "Notification" (
  "id"        TEXT PRIMARY KEY,
  "studentId" TEXT NOT NULL REFERENCES "Student"("id") ON DELETE CASCADE,
  "title"     TEXT NOT NULL,
  "message"   TEXT NOT NULL,
  "type"      TEXT NOT NULL DEFAULT 'result',
  "link"      TEXT,
  "isRead"    BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Courses
CREATE TABLE "Course" (
  "id"           TEXT PRIMARY KEY,
  "teacherId"    TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "title"        TEXT NOT NULL,
  "stage"        TEXT NOT NULL,
  "description"  TEXT,
  "lessonsCount" INTEGER NOT NULL DEFAULT 0,
  "themeColor"   TEXT NOT NULL DEFAULT 'violet',
  "isPublished"  BOOLEAN NOT NULL DEFAULT FALSE,
  "orderIndex"   INTEGER NOT NULL DEFAULT 0,
  "createdAt"    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt"    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Groups
CREATE TABLE "Group" (
  "id"        TEXT PRIMARY KEY,
  "teacherId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "name"      TEXT NOT NULL,
  "stage"     TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Exams
CREATE TABLE "Exam" (
  "id"                    TEXT PRIMARY KEY,
  "teacherId"             TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "code"                  TEXT NOT NULL UNIQUE,
  "title"                 TEXT NOT NULL,
  "description"           TEXT,
  "durationMinutes"       INTEGER,
  "status"                TEXT NOT NULL DEFAULT 'DRAFT',
  "allowMultipleAttempts" BOOLEAN NOT NULL DEFAULT FALSE,
  "maxAttempts"           INTEGER NOT NULL DEFAULT 1,
  "targetStage"           TEXT DEFAULT 'all',
  "targetGroup"           TEXT DEFAULT 'all',
  "targetSemester"        TEXT DEFAULT 'all',
  "startsAt"              TIMESTAMP WITH TIME ZONE,
  "endsAt"                TIMESTAMP WITH TIME ZONE,
  "examType"              TEXT NOT NULL DEFAULT 'quiz',
  "showResultsDirectly"   BOOLEAN NOT NULL DEFAULT FALSE,
  "requirePhone"          BOOLEAN NOT NULL DEFAULT TRUE,
  "requireGroup"          BOOLEAN NOT NULL DEFAULT TRUE,
  "groupsList"            TEXT NOT NULL DEFAULT '[]',
  "totalPoints"           DOUBLE PRECISION NOT NULL DEFAULT 0,
  "passingPercentage"     DOUBLE PRECISION NOT NULL DEFAULT 50,
  "createdAt"             TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt"             TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Questions
CREATE TABLE "Question" (
  "id"             TEXT PRIMARY KEY,
  "examId"         TEXT NOT NULL REFERENCES "Exam"("id") ON DELETE CASCADE,
  "questionNumber" INTEGER NOT NULL,
  "type"           TEXT NOT NULL,
  "questionText"   TEXT NOT NULL,
  "points"         DOUBLE PRECISION NOT NULL DEFAULT 1,
  "correctOptionId" TEXT,
  "needsReview"    BOOLEAN NOT NULL DEFAULT FALSE,
  "orderIndex"     INTEGER NOT NULL DEFAULT 0
);

-- MCQ Options
CREATE TABLE "QuestionOption" (
  "id"         TEXT PRIMARY KEY,
  "questionId" TEXT NOT NULL REFERENCES "Question"("id") ON DELETE CASCADE,
  "optionKey"  TEXT NOT NULL,
  "text"       TEXT NOT NULL
);

-- Exam Attempts
CREATE TABLE "ExamAttempt" (
  "id"               TEXT PRIMARY KEY,
  "examId"           TEXT NOT NULL REFERENCES "Exam"("id") ON DELETE CASCADE,
  "studentId"        TEXT REFERENCES "Student"("id") ON DELETE SET NULL,
  "studentName"      TEXT NOT NULL,
  "studentPhone"     TEXT NOT NULL,
  "studentGroup"     TEXT,
  "extraData"        TEXT,
  "startedAt"        TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "submittedAt"      TIMESTAMP WITH TIME ZONE,
  "timeSpentSeconds" INTEGER NOT NULL DEFAULT 0,
  "status"           TEXT NOT NULL DEFAULT 'IN_PROGRESS',
  "isApproved"       BOOLEAN NOT NULL DEFAULT FALSE,
  "approvedAt"       TIMESTAMP WITH TIME ZONE,
  "approvedBy"       TEXT,
  "teacherNotes"     TEXT,
  "mcqScore"         DOUBLE PRECISION NOT NULL DEFAULT 0,
  "essayScore"       DOUBLE PRECISION NOT NULL DEFAULT 0,
  "totalScore"       DOUBLE PRECISION NOT NULL DEFAULT 0,
  "maxScore"         DOUBLE PRECISION NOT NULL DEFAULT 0,
  "percentage"       DOUBLE PRECISION NOT NULL DEFAULT 0,
  "isPassed"         BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt"        TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Student Answers
CREATE TABLE "StudentAnswer" (
  "id"             TEXT PRIMARY KEY,
  "attemptId"      TEXT NOT NULL REFERENCES "ExamAttempt"("id") ON DELETE CASCADE,
  "questionId"     TEXT NOT NULL REFERENCES "Question"("id") ON DELETE CASCADE,
  "selectedOption" TEXT,
  "essayAnswer"    TEXT,
  "isCorrect"      BOOLEAN,
  "pointsAwarded"  DOUBLE PRECISION NOT NULL DEFAULT 0,
  "teacherFeedback" TEXT,
  "createdAt"      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt"      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_student_username ON "Student"("username");
CREATE INDEX IF NOT EXISTS idx_student_phone ON "Student"("phone");
CREATE INDEX IF NOT EXISTS idx_exam_code ON "Exam"("code");
CREATE INDEX IF NOT EXISTS idx_exam_status ON "Exam"("status");
CREATE INDEX IF NOT EXISTS idx_attempt_exam ON "ExamAttempt"("examId");
CREATE INDEX IF NOT EXISTS idx_attempt_student ON "ExamAttempt"("studentId");
CREATE INDEX IF NOT EXISTS idx_notification_student ON "Notification"("studentId");

-- ============================================================
-- Seed: Default Teacher Account
-- Email: dr.said.hassan@platform.edu
-- Password: DrSaid@2026 (bcrypt hash below)
-- ============================================================
INSERT INTO "User" (
  "id", "name", "email", "passwordHash", "role",
  "platformName", "teacherTitle", "teacherBio", "teacherExperience",
  "teacherStudentsCount", "teacherCoursesCount",
  "heroBadge", "heroTitle", "heroSubtitle",
  "teacherImageUrl", "brandTheme", "geminiModel",
  "createdAt", "updatedAt"
) VALUES (
  'teacher_said_hassan_01',
  'الدكتور سعيد حسن',
  'dr.said.hassan@platform.edu',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'teacher',
  'منصة د.سعيد حسن التعليمية',
  'أستاذ ومدرس أول اللغة العربية',
  'أسعى إلى تحديث اللغة العربية وتقديم أساليب تعليمية متطورة حتى يتمكن لكل من يرغب في تعلم اللغة العربية من الوصول إليها بأسهل طريقة ممكنة.',
  'أكثر من 40 عاماً',
  '+10,000 طالب',
  '+50 دورة وملخصات',
  'منصة التعليمية الأولى في اللغة العربية',
  'طريقة تعليمية مختلفة وحلل أفضل نتائج',
  'دروس متكاملة، امتحانات تفاعلية ومحادثة مستمرة لمساعدتك في تعلم اللغة وتذوق جماليات الكلمة.',
  '/teacher.png',
  'violet',
  'gemini-2.5-flash',
  NOW(),
  NOW()
) ON CONFLICT ("email") DO NOTHING;

-- ============================================================
-- NOTE: Password hash above = "password" (for testing)
-- IMPORTANT: Change password immediately after first login!
-- ============================================================
