'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ArrowRight,
  RotateCw,
  Bell,
  Eye,
  Calendar,
  Users,
  Target,
  Zap,
} from 'lucide-react';
import { formatTime } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

export default function StudentDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { info } = useToast();

  const loadData = (isManual = false) => {
    if (isManual) setRefreshing(true);
    fetch('/api/student/dashboard')
      .then((res) => res.json())
      .then((resData) => {
        if (!resData.error) {
          setData(resData);
          if (isManual) info('تم تحديث بياناتك ونتائجك بنجاح 🔄');
        }
      })
      .catch((err) => console.error('Failed to load student dashboard', err))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    loadData();

    // Auto-poll every 25 seconds for newly published teacher approvals
    const interval = setInterval(() => {
      loadData();
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-slate-500">جاري تحميل لوحة التحكم الخاصة بك...</p>
      </div>
    );
  }

  const student = data?.student;
  const stats = data?.stats;
  const availableExams = data?.availableExams || [];
  const recentResults = data?.recentResults || [];
  const notifications = data?.notifications || [];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1. Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-brand-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-300 text-xs font-bold mb-3 border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مرحباً بك يا بطل المستقبل 👋</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">{student?.name}</h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 text-xs font-bold text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10">
                <BookOpen className="w-3.5 h-3.5 text-brand-300" />
                {student?.stage}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10">
                <Users className="w-3.5 h-3.5 text-indigo-300" />
                {student?.groupName}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10">
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                {student?.semester}
              </span>
            </div>
          </div>

          <button
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition disabled:opacity-50"
          >
            <RotateCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>تحديث البيانات</span>
          </button>
        </div>
      </div>

      {/* 2. Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="block text-xs font-bold text-slate-400">الامتحانات المكلف بها</span>
            <span className="block text-2xl font-black text-slate-900 dark:text-white mt-1">
              {stats?.totalAssignedExams || 0}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="block text-xs font-bold text-slate-400">امتحانات تم اعتمادها</span>
            <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {stats?.completedExamsCount || 0}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="block text-xs font-bold text-slate-400">متوسط درجاتي</span>
            <span className="block text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
              {stats?.averageScore ? `${stats.averageScore}%` : '—'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="block text-xs font-bold text-slate-400">الإشعارات الجديدة</span>
            <span className="block text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
              {stats?.unreadNotificationsCount || 0}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Bell className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3. Available Assigned Exams Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-brand-600" />
              <span>امتحاناتي المتاحة والمكلف بها</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              الاختبارات التفاعلية المخصصة لصفك ({student?.stage}) ومجموعتك الدراسية
            </p>
          </div>
          <Link
            href="/student/exams"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400 flex items-center gap-1"
          >
            <span>عرض جميع الامتحانات</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        {availableExams.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-10 text-center border border-slate-200/80 dark:border-slate-800">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
              لا توجد امتحانات جديدة منشورة لك في الوقت الحالي
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              سيقوم المعلم بإضافة اختبارات جديدة قريباً، وسيصلك إشعار فوري عند نشر أي امتحان.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableExams.slice(0, 6).map((exam: any) => {
              const isApproved = exam.status === 'APPROVED';
              const isSubmitted = exam.status === 'SUBMITTED';
              const isInProgress = exam.status === 'IN_PROGRESS';

              return (
                <div
                  key={exam.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-black px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800 font-mono">
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
                        {exam.statusLabel}
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-slate-900 dark:text-white line-clamp-2 mb-2">
                      {exam.title}
                    </h3>

                    {exam.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                        {exam.description}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {exam.durationMinutes ? `${exam.durationMinutes} دقيقة` : 'مفتوح الوقت'}
                      </span>
                      <span>•</span>
                      <span>{exam.questionsCount} سؤال</span>
                      <span>•</span>
                      <span>{exam.totalPoints} درجة</span>
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
                      <div className="text-center py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500">
                        تم التسليم وقيد الاعتماد من المعلم ⏳
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
                      <div className="text-center py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[11px] font-bold text-slate-400">
                        {exam.statusLabel}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Recent Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>أحدث نتائج الامتحانات</span>
            </h2>
            <Link
              href="/student/results"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400 flex items-center gap-1"
            >
              <span>سجل النتائج الكامل</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          {recentResults.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center border border-slate-200/80 dark:border-slate-800">
              <Award className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-500">لم تقم بتسليم أي امتحانات بعد</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentResults.map((result: any) => (
                  <div key={result.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-brand-600 dark:text-brand-400">
                        {result.examCode}
                      </span>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white mt-0.5">
                        {result.examTitle}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {new Date(result.submittedAt).toLocaleDateString('ar-EG')}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {result.isApproved ? (
                        <div className="text-left">
                          <span className="text-base font-black text-slate-900 dark:text-white">
                            {result.totalScore} / {result.maxScore}
                          </span>
                          <span
                            className={`block text-[10px] font-bold ${
                              result.isPassed ? 'text-emerald-600' : 'text-rose-600'
                            }`}
                          >
                            {result.percentage}% ({result.isPassed ? 'ناجح' : 'راسب'})
                          </span>
                        </div>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                          قيد المراجعة والاعتماد
                        </span>
                      )}

                      {result.isApproved && (
                        <Link
                          href={`/student/results/${result.id}`}
                          className="p-2 rounded-xl text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition"
                          title="عرض تفاصيل الإجابات"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 5. In-Platform Notifications Sidebar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" />
              <span>إشعاراتي</span>
            </h2>
            <Link
              href="/student/notifications"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              الكل
            </Link>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            {notifications.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6 font-medium">لا توجد إشعارات جديدة</p>
            ) : (
              notifications.slice(0, 5).map((notif: any) => (
                <div
                  key={notif.id}
                  className={`p-3 rounded-xl text-xs transition ${
                    notif.isRead
                      ? 'bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300'
                      : 'bg-brand-50/70 dark:bg-brand-950/50 text-slate-900 dark:text-white font-bold border-r-4 border-brand-600'
                  }`}
                >
                  <p className="text-xs font-black">{notif.title}</p>
                  <p className="text-[11px] font-normal text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {notif.message}
                  </p>
                  {notif.link && (
                    <Link
                      href={notif.link}
                      className="inline-block mt-2 text-[10px] font-bold text-brand-600 dark:text-brand-400 hover:underline"
                    >
                      عرض التفاصيل ⬅️
                    </Link>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
