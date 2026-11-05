import React from 'react';
import { getSessionUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { TeacherNavbar } from '@/components/teacher/Navbar';
import { TeacherSidebar } from '@/components/teacher/Sidebar';

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  if (!user || (user.role !== 'teacher' && user.role !== 'admin')) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-arabic">
      <TeacherNavbar user={user} />
      <div className="flex flex-1">
        <TeacherSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
