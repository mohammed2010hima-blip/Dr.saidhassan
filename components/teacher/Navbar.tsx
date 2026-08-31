'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, LogOut, Bell, User as UserIcon, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface TeacherNavbarProps {
  user?: {
    name: string;
    email: string;
    role: string;
  } | null;
  onOpenMobileMenu?: () => void;
}

export function TeacherNavbar({ user }: TeacherNavbarProps) {
  const router = useRouter();
  const { info } = useToast();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      info('تم تسجيل الخروج بنجاح');
      router.push('/');
      router.refresh();
    } catch {
      router.push('/');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/teacher/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-black text-slate-900">لوحة تحكم المعلم</span>
              <span className="block text-[10px] font-bold text-brand-600">منصة الاختبارات الذكية</span>
            </div>
          </Link>
        </div>

        {/* Actions & User Menu */}
        <div className="flex items-center gap-3">
          <Link
            href="/teacher/exams/new"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>رفع امتحان PDF جديد</span>
          </Link>

          {/* User profile & Logout */}
          <div className="flex items-center gap-2 pr-2 border-r border-slate-200">
            <div className="text-left pl-2 hidden md:block text-right">
              <span className="block text-xs font-bold text-slate-800">{user?.name || 'المعلم'}</span>
              <span className="block text-[10px] text-slate-400 font-medium" dir="ltr">
                {user?.email}
              </span>
            </div>

            <button
              onClick={handleLogout}
              title="تسجيل الخروج"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
