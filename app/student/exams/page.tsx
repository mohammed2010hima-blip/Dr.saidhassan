'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  Search,
  Filter,
  Sparkles,
  Award,
  Loader2,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function StudentExamsPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'available' | 'in_progress' | 'submitted' | 'approved'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/student/exams')
      .then((res) => res.json())
      .then((data) => {
        if (data.exams) setExams(data.exams);
      })
      .catch((err) => console.error('Failed to load student exams', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.code.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'all') return true;
    if (activeTab === 'available') return exam.status === 'AVAILABLE' && exam.canTakeExam;
    if (activeTab === 'in_progress') return exam.status === 'IN_PROGRESS';
    if (activeTab === 'submitted') return exam.status === 'SUBMITTED';
    if (activeTab === 'approved') return exam.status === 'APPROVED';

    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-arabic">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-brand-600" />
            <span>امتحاناتي المكلف بها</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            جميع الاختبارات التفاعلية المخصصة لصفك ومجموعتك الدراسية
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="البحث باسم أو كود الامتحان..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 max-w-2xl">
        {[
          { id: 'all', label: 'الكل' },
          { id: 'available', label: 'متاح للحل الآن' },
          { id: 'in_progress', label: 'قيد الحل' },
          { id: 'submitted', label: 'تم التسليم وقيد الاعتماد' },
          { id: 'approved', label: 'معتمدة ومصححة' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-800 text-brand-700 dark:text-brand-300 shadow-sm font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Exams Grid */}
      {loading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
          <p className="text-xs text-slate-400 font-bold">جاري جلب الامتحانات...</p>
        </div>
      ) : filteredExams.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">لا توجد اختبارات في هذا القسم</h3>
          <p className="text-xs text-slate-400 mt-1">تأكد من تحديد قسم آخر أو مراجعة المعلم لتكليفك بامتحان جديد.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExams.map((exam) => {
            const isApproved = exam.status === 'APPROVED';
            const isSubmitted = exam.status === 'SUBMITTED';
            const isInProgress = exam.status === 'IN_PROGRESS';

            return (
              <div
                key={exam.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-black px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800">
                      {exam.code}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        isApproved
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : isSubmitted
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                          : isInProgress
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {exam.statusText}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 dark:text-white mb-2">
                    {exam.title}
                  </h3>

                  {exam.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                      {exam.description}
                    </p>
                  )}

                  <div className="space-y-1.5 text-xs text-slate-500 font-medium mb-6 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">مدة الاختبار:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {exam.durationMinutes ? `${exam.durationMinutes} دقيقة` : 'مفتوح'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">عدد الأسئلة:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {exam.questionsCount} سؤال
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">إجمالي الدرجات:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {exam.totalPoints} درجة
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  {isApproved ? (
                    <Link
                      href={`/student/results/${exam.latestAttemptId}`}
                      className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:hover:bg-emerald-950 text-xs font-bold flex items-center justify-center gap-2 transition"
                    >
                      <Award className="w-4 h-4 text-emerald-600" />
                      <span>عرض النتيجة المعتمدة والتصحيح</span>
                    </Link>
                  ) : isSubmitted ? (
                    <div className="text-center py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-slate-500">
                      تم التسليم — قيد المراجعة والاعتماد ⏳
                    </div>
                  ) : exam.canTakeExam ? (
                    <Link
                      href={`/exam/${exam.code}`}
                      className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
                    >
                      <span>{isInProgress ? 'متابعة حل الامتحان' : 'بدء أداء الامتحان الآن'}</span>
                      <ChevronLeft className="w-4 h-4" />
                    </Link>
                  ) : (
                    <div className="text-center py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-slate-400">
                      {exam.statusText}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
