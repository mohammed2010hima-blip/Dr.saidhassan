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
    <aside className="w-64 bg-[#140406]/95 text-white border-l border-white/10 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 hidden md:flex flex-shrink-0 backdrop-blur-xl">
      <div className="space-y-1.5">
        <div className="px-3 py-2 text-[11px] font-black text-[#D8C4AC]/70 uppercase tracking-wider">
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
                  ? 'bg-gradient-to-r from-[#800020] to-[#E11D48] text-white border border-[#E11D48]/50 shadow-[0_0_12px_rgba(225,29,72,0.4)]'
                  : item.highlight
                  ? 'text-[#F3E5AB] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30'
                  : 'text-[#D8C4AC] hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-[#D4AF37]' : 'text-[#D8C4AC]'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Gemini AI Status Badge */}
      <div className="bg-gradient-to-br from-[#2A080B] to-black text-white rounded-2xl p-4 shadow-lg border border-[#D4AF37]/30 text-xs relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-bold text-[#F3E5AB]">Google Gemini AI</span>
        </div>
        <p className="text-[11px] text-[#D8C4AC] leading-relaxed font-medium">
          تحليل امتحانات PDF ذكي واستخراج فوري لأسئلة MCQ والمقالي بنقرة واحدة.
        </p>
        <Link
          href="/teacher/settings"
          className="mt-3 block text-center py-1.5 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/40 rounded-lg text-[10px] font-bold text-[#F3E5AB] transition"
        >
          فحص مفتاح الـ API
        </Link>
      </div>
    </aside>
  );
}
