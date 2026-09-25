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
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#800020] dark:text-[#F3E5AB] flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-[#800020] dark:text-[#D4AF37]" />
            <span>نتائج وتصحيحات الطلاب</span>
          </h1>
          <p className="text-xs text-[#660019] dark:text-[#D8C4AC] font-medium mt-1">
            استعرض نتائج كل طالب بالتفصيل، وحمل ملفات الإجابات، وصحح الأسئلة المقالية.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#D4AF37]/40 bg-[#FFFDF9] dark:bg-[#1E0709] hover:bg-[#FDF2F4] text-xs font-bold text-[#800020] dark:text-[#F3E5AB] transition shadow-sm"
          >
            <RotateCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>تحديث</span>
          </button>

          <button
            onClick={exportCSV}
            disabled={filteredResults.length === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#800020] to-[#E11D48] hover:from-[#660019] hover:to-[#C0153D] text-white text-xs font-bold shadow-md shadow-[#800020]/25 transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>تصدير Excel (CSV)</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#FFFDF9] dark:bg-[#1E0709] rounded-2xl p-4 border border-[#800020]/15 dark:border-[#D4AF37]/25 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="البحث باسم الطالب أو الهاتف..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-[#800020]/20 dark:border-white/15 bg-white dark:bg-[#140406] text-xs font-semibold text-[#2A080B] dark:text-[#EEE4DA] focus:outline-none focus:ring-2 focus:ring-[#800020]"
          />
          <Search className="w-4 h-4 text-[#800020]/50 dark:text-[#D4AF37] absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Exam Filter */}
        <div>
          <select
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-[#800020]/20 dark:border-white/15 bg-white dark:bg-[#140406] text-xs font-bold text-[#800020] dark:text-[#F3E5AB] focus:outline-none focus:ring-2 focus:ring-[#800020]"
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
            className="w-full px-3 py-2.5 rounded-xl border border-[#800020]/20 dark:border-white/15 bg-white dark:bg-[#140406] text-xs font-bold text-[#800020] dark:text-[#F3E5AB] focus:outline-none focus:ring-2 focus:ring-[#800020]"
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
            className="w-full px-3 py-2.5 rounded-xl border border-[#800020]/20 dark:border-white/15 bg-white dark:bg-[#140406] text-xs font-bold text-[#800020] dark:text-[#F3E5AB] focus:outline-none focus:ring-2 focus:ring-[#800020]"
          >
            <option value="all">جميع الحالات</option>
            <option value="pending">بانتظار تصحيح المقالي</option>
            <option value="graded">مكتمل ومصحح</option>
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-[#FFFDF9] dark:bg-[#1E0709] rounded-3xl border border-[#800020]/15 dark:border-[#D4AF37]/25 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <RotateCw className="w-8 h-8 text-[#800020] animate-spin mx-auto mb-3" />
            <p className="text-xs font-bold text-[#660019] dark:text-[#D8C4AC]">جاري تحميل النتائج...</p>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="p-12 text-center max-w-sm mx-auto">
            <Users className="w-12 h-12 text-[#D4AF37]/50 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#800020] dark:text-[#F3E5AB]">لا توجد نتائج مطابقة</h3>
            <p className="text-xs text-[#660019]/70 dark:text-[#D8C4AC]/70 mt-1">
              ستظهر هنا محاولات وإجابات الطلاب بمجرد تسليمهم للاختبار.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-[#FDF2F4] dark:bg-[#2C1215] border-b border-[#800020]/15 dark:border-white/10 text-[#800020] dark:text-[#D4AF37] text-xs font-black">
                  <th className="p-4">اسم الطالب</th>
                  <th className="p-4">رقم الهاتف</th>
                  <th className="p-4">المجموعة</th>
                  <th className="p-4">الاختبار</th>
                  <th className="p-4">الدرجة</th>
                  <th className="p-4">النسبة</th>
                  <th className="p-4">زمن الحل</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-center">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#800020]/10 dark:divide-white/10 text-xs font-medium text-[#2A080B] dark:text-[#EEE4DA]">
                {filteredResults.map((r) => (
                  <tr key={r.id} className="hover:bg-[#FDF2F4]/60 dark:hover:bg-[#2C1215]/60 transition">
                    <td className="p-4 font-bold text-[#800020] dark:text-[#F5EFEB]">{r.studentName}</td>
                    <td className="p-4 font-mono text-[#660019] dark:text-[#D8C4AC]" dir="ltr">
                      {r.studentPhone || '—'}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-[#FDF2F4] dark:bg-[#2C1215] text-[#800020] dark:text-[#D4AF37] rounded-lg font-semibold text-[11px] border border-[#F8CFD5] dark:border-[#D4AF37]/30">
                        {r.studentGroup}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-[#2A080B] dark:text-[#EEE4DA] max-w-xs truncate">
                      {r.examTitle}
                    </td>
                    <td className="p-4 font-black font-mono text-[#800020] dark:text-[#F3E5AB]" dir="ltr">
                      {r.score}
                    </td>
                    <td className="p-4">
                      <span
                        className={`font-black ${
                          r.percentage >= 50 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {r.percentage}%
                      </span>
                    </td>
                    <td className="p-4 text-[#660019] dark:text-[#D8C4AC] font-mono">
                      {formatTime(r.timeSpentSeconds)}
                    </td>
                    <td className="p-4">
                      {r.needsEssayGrading ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 text-[10px] font-bold border border-amber-200">
                          <AlertCircle className="w-3 h-3" />
                          <span>بانتظار تصحيح المقالي</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>مصحح بالكامل</span>
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <Link
                        href={`/teacher/results/${r.id}`}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#FDF2F4] dark:bg-[#2C1215] hover:bg-[#F8CFD5] dark:hover:bg-[#3D1A1E] text-[#800020] dark:text-[#F3E5AB] text-xs font-bold border border-[#F8CFD5] dark:border-[#D4AF37]/30 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>فتح النتيجة والتحميل</span>
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
    <Suspense fallback={<div className="p-12 text-center text-xs font-bold text-[#800020]">جاري تحميل النتائج...</div>}>
      <TeacherResultsContent />
    </Suspense>
  );
}
