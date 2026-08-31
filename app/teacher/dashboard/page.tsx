'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Users,
  GraduationCap,
  TrendingUp,
  UploadCloud,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  RotateCw,
  Bell
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function TeacherDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentExams, setRecentExams] = useState<any[]>([]);
  const [recentResults, setRecentResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { info } = useToast();

  const loadData = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const [statsRes, examsRes, resultsRes] = await Promise.all([
        fetch('/api/teacher/analytics'),
        fetch('/api/teacher/exams'),
        fetch('/api/teacher/results'),
      ]);

      const statsData = await statsRes.json();
      const examsData = await examsRes.json();
      const resultsData = await resultsRes.json();

      if (!statsData.error) setStats(statsData);
      if (examsData.exams) setRecentExams(examsData.exams.slice(0, 5));
      if (resultsData.results) setRecentResults(resultsData.results.slice(0, 6));

      if (isManual) info('تم تحديث البيانات بنجاح 🔄');
    } catch (e) {
      console.error('Failed to load teacher dashboard', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();

    // Auto-poll every 20 seconds for real-time incoming student submissions
    const interval = setInterval(() => {
      loadData();
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header & Quick Action Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-brand-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-300 text-xs font-bold mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>نظام الذكاء الاصطناعي جاهز</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">مرحباً بك في لوحة التحكم 👋</h1>
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1.5 max-w-xl leading-relaxed">
            ارفع ملفات امتحانات الـ PDF لتحويلها مباشرة إلى اختبارات إلكترونية تفاعلية، وتابع نتائج وتصحيحات الطلاب لحظة بلحظة.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 self-start sm:self-auto">
          <button
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition disabled:opacity-50"
            title="تحديث البيانات"
          >
            <RotateCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
          </button>

          <Link
            href="/teacher/exams/new"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-black text-xs sm:text-sm shadow-lg shadow-brand-500/30 transition transform hover:-translate-y-0.5"
          >
            <UploadCloud className="w-5 h-5" />
            <span>رفع امتحان PDF الآن</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Exams */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block">إجمالي الاختبارات</span>
            <span className="text-2xl font-black text-slate-900 mt-0.5 block">
              {stats?.totalExams ?? 0}
            </span>
            <span className="text-[11px] font-semibold text-emerald-600">
              {stats?.activeExams ?? 0} نشط ومنشور
            </span>
          </div>
        </div>

        {/* Card 2: Attempts */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block">إجمالي المحاولات</span>
            <span className="text-2xl font-black text-slate-900 mt-0.5 block">
              {stats?.totalAttempts ?? 0}
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              {stats?.uniqueStudents ?? 0} طالب متميز
            </span>
          </div>
        </div>

        {/* Card 3: Avg Score */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block">متوسط الدرجات</span>
            <span className="text-2xl font-black text-slate-900 mt-0.5 block">
              {stats?.avgScore ?? 0}%
            </span>
            <span className="text-[11px] font-semibold text-purple-600">
              نسبة النجاح: {stats?.passRate ?? 0}%
            </span>
          </div>
        </div>

        {/* Card 4: Avg Time */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block">متوسط زمن الاختبار</span>
            <span className="text-2xl font-black text-slate-900 mt-0.5 block">
              {Math.round((stats?.avgTimeSpent ?? 0) / 60)} دقيقة
            </span>
            <span className="text-[11px] font-semibold text-amber-600">
              أعلى نسبة: {stats?.highestScore ?? 0}%
            </span>
          </div>
        </div>
      </div>

      {/* Two Columns Grid: Recent Exams & Recent Student Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Latest Exams */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-600" />
                <span>آخر الاختبارات المضافة</span>
              </h2>
              <Link
                href="/teacher/exams"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <span>عرض الكل</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse"></div>
                ))}
              </div>
            ) : recentExams.length === 0 ? (
              <div className="text-center py-10">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-500">لا توجد اختبارات مضافة بعد</p>
                <Link
                  href="/teacher/exams/new"
                  className="mt-3 inline-block text-xs font-bold text-brand-600 hover:underline"
                >
                  اضغط هنا لرفع أول امتحان PDF
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="p-4 rounded-2xl border border-slate-100 hover:border-slate-300 bg-slate-50/50 hover:bg-white transition flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black px-2 py-0.5 bg-brand-50 text-brand-700 rounded border border-brand-200">
                          {exam.code}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            exam.status === 'PUBLISHED'
                              ? 'bg-emerald-50 text-emerald-700'
                              : exam.status === 'DRAFT'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {exam.status === 'PUBLISHED' ? 'منشور' : exam.status === 'DRAFT' ? 'مسودة' : 'مغلق'}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                        {exam.title}
                      </h4>
                      <div className="text-[11px] text-slate-400 font-medium mt-1">
                        {exam.questionsCount} سؤال • {exam.attemptsCount} طالب شارك
                      </div>
                    </div>

                    <Link
                      href={`/teacher/exams/${exam.id}/review`}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition flex-shrink-0"
                    >
                      مراجعة
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <Link
              href="/teacher/exams/new"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
            >
              <UploadCloud className="w-4 h-4" />
              <span>رفع ملف امتحان جديد</span>
            </Link>
          </div>
        </div>

        {/* Column 2: Latest Student Submissions */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
                <span>آخر نتائج الطلاب المستلمة</span>
              </h2>
              <Link
                href="/teacher/results"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <span>جميع النتائج</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse"></div>
                ))}
              </div>
            ) : recentResults.length === 0 ? (
              <div className="text-center py-10">
                <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-500">لم يقم أي طالب بأداء الاختبارات بعد</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  شارك رابط الاختبار مع طلابك لتبدأ النتائج بالظهور هنا فورياً
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentResults.map((result) => (
                  <Link
                    key={result.id}
                    href={`/teacher/results/${result.id}`}
                    className="p-4 rounded-2xl border border-slate-100 hover:border-brand-300 bg-slate-50/50 hover:bg-white transition flex items-center justify-between gap-3 block group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition">
                          {result.studentName}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                          {result.studentGroup}
                        </span>
                        {result.needsEssayGrading && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                            بانتظار تصحيح المقالي
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {result.examTitle}
                      </div>
                    </div>

                    <div className="text-left flex-shrink-0">
                      <span className="text-sm font-black text-slate-900 block" dir="ltr">
                        {result.score}
                      </span>
                      <span
                        className={`text-[11px] font-bold ${
                          result.percentage >= 50 ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {result.percentage}%
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <Link
              href="/teacher/results"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
            >
              <span>فتح لوحة نتائج وتصحيحات الطلاب</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
