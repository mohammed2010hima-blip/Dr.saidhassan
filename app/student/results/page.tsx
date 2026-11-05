'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  Calendar,
  ChevronLeft,
  Loader2,
  RotateCw,
} from 'lucide-react';
import { formatTime } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

export default function StudentResultsPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { info } = useToast();

  const loadResults = (isManual = false) => {
    if (isManual) setRefreshing(true);
    fetch('/api/student/results')
      .then((res) => res.json())
      .then((data) => {
        if (data.results) setResults(data.results);
        if (isManual) info('تم تحديث نتائجك بنجاح 🔄');
      })
      .catch((err) => console.error('Failed to load results', err))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-arabic">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-7 h-7 text-emerald-600" />
            <span>سجل نتائج امتحاناتي</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            متابعة درجاتك وتقييمات المعلم وملاحظاته على إجاباتك
          </p>
        </div>

        <button
          onClick={() => loadResults(true)}
          disabled={refreshing}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition"
        >
          <RotateCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>تحديث النتائج</span>
        </button>
      </div>

      {loading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
          <p className="text-xs text-slate-400 font-bold">جاري تحميل سجل النتائج...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800">
          <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">لم تقم بأداء أي امتحانات بعد</h3>
          <p className="text-xs text-slate-400 mt-1">
            توجه إلى قسم "امتحاناتي" لبدء حل الاختبارات المتاحة لك.
          </p>
          <Link
            href="/student/exams"
            className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold shadow-sm"
          >
            <span>الانتقال للامتحانات</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 hover:shadow-md transition"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-black px-2.5 py-0.5 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800">
                    {item.examCode}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      item.isApproved
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                    }`}
                  >
                    {item.statusBadge.text}
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {item.examTitle}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(item.submittedAt).toLocaleDateString('ar-EG', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    وقت الحل: {formatTime(item.timeSpentSeconds)}
                  </span>
                </div>

                {item.teacherNotes && (
                  <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200/60 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200">
                    <span className="font-bold">ملاحظات وتوجيه المعلم:</span> {item.teacherNotes}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between md:justify-end gap-5 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                {item.isApproved ? (
                  <div className="text-right md:text-left">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                      {item.totalScore}{' '}
                      <span className="text-sm text-slate-400 font-normal">/ {item.maxScore}</span>
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className={`text-xs font-black ${
                          item.isPassed ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {item.percentage}%
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">
                        ({item.isPassed ? 'ناجح ومتميز 👏' : 'يحتاج لمزيد من المذاكرة'})
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-4 py-2 rounded-xl">
                    قيد مراجعة وتصحيح المعلم ⏳
                  </div>
                )}

                {item.canReviewDetails && (
                  <Link
                    href={`/student/results/${item.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition"
                  >
                    <Eye className="w-4 h-4" />
                    <span>مراجعة الإجابات</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
