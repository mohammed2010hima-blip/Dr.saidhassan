'use client';

import React, { useEffect, useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Clock,
  AlertTriangle,
  FileText,
  RotateCw,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';

export default function TeacherAnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadStats = () => {
    setLoading(true);
    fetch('/api/teacher/analytics')
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setStats(data);
      })
      .catch((err) => console.error('Failed to load analytics', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
      </div>
    );
  }

  const COLORS = ['#f43f5e', '#f59e0b', '#3b82f6', '#10b981'];

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-brand-600" />
            <span>التحليلات والإحصائيات الشاملة</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            مؤشرات أداء الطلاب، توزيع الدرجات، وتحديد نقاط الضعف والأسئلة الأكثر صعوبة.
          </p>
        </div>

        <button
          onClick={loadStats}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition self-start sm:self-auto"
        >
          <RotateCw className="w-4 h-4" />
          <span>تحديث الإحصائيات</span>
        </button>
      </div>

      {/* 4 Big KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">إجمالي الطلاب والمحاولات</span>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{stats?.totalAttempts || 0}</div>
          <span className="text-xs text-slate-500 font-semibold mt-1 block">
            {stats?.uniqueStudents || 0} طالب فريد
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">متوسط الدرجات العام</span>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{stats?.avgScore || 0}%</div>
          <span className="text-xs text-purple-600 font-semibold mt-1 block">
            أعلى درجة: {stats?.highestScore || 0}%
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">نسبة النجاح العامة</span>
            <Award className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600">{stats?.passRate || 0}%</div>
          <span className="text-xs text-slate-500 font-semibold mt-1 block">
            أقل درجة: {stats?.lowestScore || 0}%
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">متوسط زمن الحل</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {Math.round((stats?.avgTimeSpent || 0) / 60)} دقيقة
          </div>
          <span className="text-xs text-slate-500 font-semibold mt-1 block">
            من إجمالي {stats?.totalExams || 0} اختبارات
          </span>
        </div>
      </div>

      {/* Score Distribution Chart & Hardest Questions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Score Distribution Chart */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-black text-slate-900 mb-1">
              توزيع نتائج ونسب الطلاب (Score Distribution)
            </h2>
            <p className="text-xs text-slate-500 font-medium mb-6">
              تصنيف محاولات الطلاب بحسب الفئات المئوية للدرجات.
            </p>

            <div className="h-64 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats?.scoreDistribution || []}
                  margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="range"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                      direction: 'rtl',
                    }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} name="عدد الطلاب">
                    {(stats?.scoreDistribution || []).map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Hardest Questions Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-black text-slate-900 mb-1 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <span>أكثر الأسئلة التي أخطأ فيها الطلاب</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mb-6">
              يساعدك هذا التحليل على تحديد المفاهيم التي تحتاج إلى إعادة شرح وتوضيح للطلاب.
            </p>

            {!stats?.hardestQuestions || stats.hardestQuestions.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-600">لا توجد أخطاء متكررة مسجلة بعد</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  ستظهر هنا الأسئلة ذات أعلى نسب خطأ بمجرد تسليم الطلاب للإجابات.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {stats.hardestQuestions.map((q: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-[10px] font-bold text-rose-700 mb-0.5">
                        امتحان: {q.exam}
                      </div>
                      <div className="text-xs font-bold text-slate-900 line-clamp-1">{q.question}</div>
                      <div className="text-[11px] text-slate-500 font-medium mt-1">
                        {q.incorrectCount} طالب أخطأ من أصل {q.totalAttempts} محاولة
                      </div>
                    </div>

                    <div className="text-left flex-shrink-0">
                      <span className="text-sm font-black text-rose-600 block">{q.failRate}%</span>
                      <span className="text-[10px] font-bold text-slate-400">نسبة الخطأ</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
