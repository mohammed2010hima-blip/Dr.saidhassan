'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  GraduationCap,
  Sparkles,
  LogOut,
  Bell,
  BookOpen,
  Award,
  User,
  Home,
  CheckCircle2,
  Menu,
  X,
  Calendar,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface StudentNavbarProps {
  student?: {
    id: string;
    name: string;
    username: string;
    stage: string;
    groupName: string;
    semester?: string;
    unreadNotificationsCount?: number;
  } | null;
}

export function StudentNavbar({ student }: StudentNavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { info } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(student?.unreadNotificationsCount || 0);

  useEffect(() => {
    // Poll unread notifications every 30 seconds
    const checkNotifications = () => {
      fetch('/api/student/notifications')
        .then((res) => res.json())
        .then((data) => {
          if (data.notifications) {
            const count = data.notifications.filter((n: any) => !n.isRead).length;
            setUnreadCount(count);
          }
        })
        .catch(() => {});
    };

    checkNotifications();
    const interval = setInterval(checkNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/student/auth/logout', { method: 'POST' });
      info('تم تسجيل الخروج بنجاح 👋');
      router.push('/');
      router.refresh();
    } catch {
      router.push('/');
    }
  };

  const navLinks = [
    { label: 'الرئيسية', href: '/student/dashboard', icon: Home },
    { label: 'امتحاناتي', href: '/student/exams', icon: BookOpen },
    { label: 'سجل نتائجي', href: '/student/results', icon: Award },
    { label: 'الملف الشخصي', href: '/student/profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-sm font-arabic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/student/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-black text-slate-900 dark:text-white">بوابة الطالب</span>
              <span className="block text-[10px] font-bold text-brand-600 dark:text-brand-400">
                منصة د.سعيد حسن التعليمية
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Badges & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notification Bell */}
          <Link
            href="/student/notifications"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition relative"
            title="الإشعارات"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Link>

          {/* Student Profile Pill */}
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-800">
            <div className="text-right">
              <span className="block text-xs font-bold text-slate-800 dark:text-slate-100">
                {student?.name || 'الطالب'}
              </span>
              <span className="block text-[10px] text-brand-600 dark:text-brand-400 font-semibold truncate max-w-[140px]">
                {student?.stage}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="تسجيل الخروج"
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition"
          >
            <LogOut className="w-4 h-4" />
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl md:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-3 bg-white dark:bg-slate-900 animate-fade-in space-y-2">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl mb-3">
            <p className="text-xs font-black text-slate-900 dark:text-white">{student?.name}</p>
            <p className="text-[11px] text-brand-600 dark:text-brand-400 font-bold mt-0.5">
              {student?.stage} — {student?.groupName}
            </p>
          </div>
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-black'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
