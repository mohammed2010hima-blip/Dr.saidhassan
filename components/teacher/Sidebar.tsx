'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  UploadCloud,
  GraduationCap,
  Users,
  BarChart3,
  Settings,
  Sparkles,
  BookOpen,
  Palette
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'الرئيسية والإحصائيات', href: '/teacher/dashboard', icon: LayoutDashboard },
  { label: 'جميع الاختبارات', href: '/teacher/exams', icon: FileText },
  { label: 'رفع امتحان PDF جديد', href: '/teacher/exams/new', icon: UploadCloud, highlight: true },
  { label: 'إدارة الكورسات والمناهج', href: '/teacher/courses', icon: BookOpen },
  { label: 'نتائج الطلاب والتصحيح', href: '/teacher/results', icon: GraduationCap },
  { label: 'إدارة المجموعات', href: '/teacher/groups', icon: Users },
  { label: 'التحليلات المتقدمة', href: '/teacher/analytics', icon: BarChart3 },
  { label: 'إعدادات الموقع والثيم وGemini', href: '/teacher/settings', icon: Settings },
];

export function TeacherSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-l border-slate-200/80 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 hidden md:flex flex-shrink-0">
      <div className="space-y-1.5">
        <div className="px-3 py-2 text-[11px] font-black text-slate-400 uppercase tracking-wider">
          القائمة الرئيسية
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/teacher/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                isActive
                  ? 'bg-brand-50 text-brand-700 border border-brand-200/60 shadow-sm'
                  : item.highlight
                  ? 'text-brand-600 hover:bg-brand-50/50'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Gemini AI Status Badge */}
      <div className="bg-gradient-to-br from-brand-900 to-indigo-950 text-white rounded-2xl p-4 shadow-md text-xs relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-brand-300" />
          <span className="font-bold text-white">Google Gemini AI</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
          تحليل امتحانات PDF ذكي وسريع واستخراج فوري لأسئلة MCQ والمقالي.
        </p>
        <Link
          href="/teacher/settings"
          className="mt-3 block text-center py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold text-white transition"
        >
          فحص مفتاح الـ API
        </Link>
      </div>
    </aside>
  );
}
