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
    <header className="sticky top-0 z-30 bg-black/95 dark:bg-black/98 text-white border-b border-white/10 shadow-lg backdrop-blur-xl">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/teacher/dashboard" className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="د. سعيد حسن"
              className="h-9 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]"
            />
          </Link>
        </div>

        {/* Actions & User Menu */}
        <div className="flex items-center gap-3">
          <Link
            href="/teacher/exams/new"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#E11D48] text-white text-xs font-bold shadow-[0_0_15px_rgba(225,29,72,0.4)] hover:scale-105 transition"
          >
            <Plus className="w-4 h-4" />
            <span>رفع امتحان PDF جديد</span>
          </Link>

          {/* User profile & Logout */}
          <div className="flex items-center gap-2 pr-2 border-r border-white/15">
            <div className="text-left pl-2 hidden md:block text-right">
              <span className="block text-xs font-bold text-white">{user?.name || 'المعلم'}</span>
              <span className="block text-[10px] text-[#D8C4AC] font-medium" dir="ltr">
                {user?.email}
              </span>
            </div>

            <button
              onClick={handleLogout}
              title="تسجيل الخروج"
              className="p-2 rounded-xl text-white/70 hover:text-[#E11D48] hover:bg-white/10 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
