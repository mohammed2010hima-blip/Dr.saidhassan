import React from 'react';
import { getStudentSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { StudentNavbar } from '@/components/student/Navbar';

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getStudentSession();

  // If on login/register/forgot-password, layout wraps without enforcing session
  let studentData = null;

  if (session?.studentId) {
    studentData = await prisma.student.findUnique({
      where: { id: session.studentId },
      select: {
        id: true,
        name: true,
        username: true,
        stage: true,
        groupName: true,
        semester: true,
        _count: {
          select: {
            notifications: { where: { isRead: false } },
          },
        },
      },
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-arabic text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {studentData && (
        <StudentNavbar
          student={{
            id: studentData.id,
            name: studentData.name,
            username: studentData.username,
            stage: studentData.stage,
            groupName: studentData.groupName,
            semester: studentData.semester,
            unreadNotificationsCount: studentData._count.notifications,
          }}
        />
      )}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
