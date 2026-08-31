'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  GraduationCap,
  Search,
  Filter,
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  RotateCw,
  Eye,
  FileSpreadsheet,
  Users
} from 'lucide-react';
import { formatTime } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

interface StudentResultItem {
  id: string;
  studentName: string;
  studentPhone: string;
  studentGroup: string;
  examTitle: string;
  examCode: string;
  score: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  isPassed: boolean;
  timeSpentSeconds: number;
  status: 'SUBMITTED' | 'GRADED';
  needsEssayGrading: boolean;
  submittedAt: string;
}

function TeacherResultsContent() {
  const searchParams = useSearchParams();
  const examIdParam = searchParams.get('examId');

  const [results, setResults] = useState<StudentResultItem[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExamId, setSelectedExamId] = useState<string>(examIdParam || 'all');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { info } = useToast();

  const loadData = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const [resultsRes, examsRes, groupsRes] = await Promise.all([
        fetch('/api/teacher/results'),
        fetch('/api/teacher/exams'),
        fetch('/api/teacher/groups'),
      ]);

      const resultsData = await resultsRes.json();
      const examsData = await examsRes.json();
      const groupsData = await groupsRes.json();

      if (resultsData.results) setResults(resultsData.results);
      if (examsData.exams) setExams(examsData.exams);
      if (groupsData.groups) setGroups(groupsData.groups.map((g: any) => g.name));

      if (isManual) info('تم تحديث نتائج الطلاب 🔄');
    } catch (e) {
      console.error('Failed to load results', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();

    // Realtime polling
    const interval = setInterval(() => {
      loadData();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const filteredResults = results.filter((r) => {
    const matchesSearch =
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.studentPhone.includes(searchQuery);
    const matchesExam = selectedExamId === 'all' || r.examCode === selectedExamId || r.examTitle === selectedExamId;
    const matchesGroup = selectedGroup === 'all' || r.studentGroup === selectedGroup;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'pending' && r.needsEssayGrading) ||
      (statusFilter === 'graded' && !r.needsEssayGrading);

    return matchesSearch && matchesExam && matchesGroup && matchesStatus;
  });

  const exportCSV = () => {
    if (filteredResults.length === 0) return;
    const headers = ['اسم الطالب', 'رقم الهاتف', 'المجموعة', 'الاختبار', 'الدرجة', 'النسبة', 'الحالة', 'تاريخ التسليم'];
    const rows = filteredResults.map((r) => [
      r.studentName,
      r.studentPhone,
      r.studentGroup,
      r.examTitle,
      r.score,
      `${r.percentage}%`,
      r.needsEssayGrading ? 'بانتظار تصحيح المقالي' : 'مصحح بالكامل',
      new Date(r.submittedAt).toLocaleDateString('ar-EG'),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `نتائج_الطلاب_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-emerald-600" />
            <span>نتائج وتصحيحات الطلاب</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            استعرض نتائج كل طالب بالتفصيل، وصحح الأسئلة المقالية، واطلع على الإحصائيات الفورية.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition"
          >
            <RotateCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>تحديث</span>
          </button>

          <button
            onClick={exportCSV}
            disabled={filteredResults.length === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>تصدير Excel (CSV)</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="البحث باسم الطالب أو الهاتف..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Exam Filter */}
        <div>
          <select
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">جميع الاختبارات</option>
            {exams.map((ex) => (
              <option key={ex.id} value={ex.code}>
                {ex.title} ({ex.code})
              </option>
            ))}
          </select>
        </div>

        {/* Group Filter */}
        <div>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">جميع المجموعات</option>
            {groups.map((g, idx) => (
              <option key={idx} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">جميع الحالات</option>
            <option value="pending">بانتظار تصحيح المقالي</option>
            <option value="graded">مكتمل ومصحح</option>
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <RotateCw className="w-8 h-8 text-brand-600 animate-spin mx-auto mb-3" />
            <p className="text-xs font-bold text-slate-500">جاري تحميل النتائج...</p>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="p-12 text-center max-w-sm mx-auto">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">لا توجد نتائج مطابقة</h3>
            <p className="text-xs text-slate-400 mt-1">
              ستظهر هنا محاولات وإجابات الطلاب بمجرد تسليمهم للاختبار.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-black">
                  <th className="p-4">اسم الطالب</th>
                  <th className="p-4">رقم الهاتف</th>
                  <th className="p-4">المجموعة</th>
                  <th className="p-4">الاختبار</th>
                  <th className="p-4">الدرجة</th>
                  <th className="p-4">النسبة</th>
                  <th className="p-4">زمن الحل</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-center">تفاصيل النتيجة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {filteredResults.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-bold text-slate-900">{r.studentName}</td>
                    <td className="p-4 font-mono text-slate-600" dir="ltr">
                      {r.studentPhone || '—'}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-semibold text-[11px]">
                        {r.studentGroup}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-800 max-w-xs truncate">
                      {r.examTitle}
                    </td>
                    <td className="p-4 font-black font-mono text-slate-900" dir="ltr">
                      {r.score}
                    </td>
                    <td className="p-4">
                      <span
                        className={`font-black ${
                          r.percentage >= 50 ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {r.percentage}%
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 font-mono">
                      {formatTime(r.timeSpentSeconds)}
                    </td>
                    <td className="p-4">
                      {r.needsEssayGrading ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                          <AlertCircle className="w-3 h-3" />
                          <span>بانتظار تصحيح المقالي</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>مصحح</span>
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <Link
                        href={`/teacher/results/${r.id}`}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold border border-brand-200 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>فتح النتيجة والتصحيح</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TeacherResultsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs font-bold text-slate-500">جاري تحميل النتائج...</div>}>
      <TeacherResultsContent />
    </Suspense>
  );
}

