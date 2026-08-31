'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Plus,
  Search,
  Share2,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  QrCode as QrIcon,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  Loader2,
  Lock,
  Unlock
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useToast } from '@/components/ui/Toast';
import { Modal } from '@/components/ui/Modal';

interface ExamItem {
  id: string;
  code: string;
  title: string;
  description?: string;
  durationMinutes?: number | null;
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED';
  questionsCount: number;
  attemptsCount: number;
  averageScore: number;
  createdAt: string;
}

export default function TeacherExamsPage() {
  const [exams, setExams] = useState<ExamItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT' | 'CLOSED'>('ALL');
  const [selectedExamForShare, setSelectedExamForShare] = useState<ExamItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const { success, error: toastError, info } = useToast();

  const loadExams = () => {
    setLoading(true);
    fetch('/api/teacher/exams')
      .then((res) => res.json())
      .then((data) => {
        if (data.exams) setExams(data.exams);
      })
      .catch(() => toastError('فشل تحميل الاختبارات'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadExams();
  }, []);

  const handleStatusChange = async (examId: string, newStatus: 'DRAFT' | 'PUBLISHED' | 'CLOSED') => {
    try {
      const res = await fetch(`/api/teacher/exams/${examId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      success(data.message || 'تم تحديث حالة الاختبار');
      loadExams();
    } catch (err: any) {
      toastError(err.message || 'فشل تحديث الحالة');
    }
  };

  const handleDeleteExam = async (examId: string, title: string) => {
    if (!confirm(`هل أنت متأكد من حذف اختبار "${title}" نهائياً مع كافة نتائجه؟`)) return;

    try {
      const res = await fetch(`/api/teacher/exams/${examId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      success('تم حذف الاختبار بنجاح');
      loadExams();
    } catch (err: any) {
      toastError(err.message || 'فشل حذف الاختبار');
    }
  };

  const filteredExams = exams.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getShareUrl = (code: string) =>
    typeof window !== 'undefined' ? `${window.location.origin}/exam/${code}` : `/exam/${code}`;

  const handleCopyLink = (code: string) => {
    navigator.clipboard.writeText(getShareUrl(code));
    setCopiedLink(true);
    success('تم نسخ الرابط!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">إدارة الاختبارات</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            استعرض جميع الاختبارات، وعدل محتواها، أو شارك الروابط مع الطلاب لمتابعة النتائج.
          </p>
        </div>

        <Link
          href="/teacher/exams/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/25 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>رفع امتحان PDF جديد</span>
        </Link>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="البحث باسم الاختبار أو الكود..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {(['ALL', 'PUBLISHED', 'DRAFT', 'CLOSED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st === 'ALL'
                ? 'الكل'
                : st === 'PUBLISHED'
                ? 'المنشورة'
                : st === 'DRAFT'
                ? 'المسودات'
                : 'المغلقة'}
            </button>
          ))}
        </div>
      </div>

      {/* Exams Grid / Table */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-white rounded-3xl border border-slate-200 animate-pulse p-6"></div>
          ))}
        </div>
      ) : filteredExams.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300 max-w-md mx-auto my-8">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">لا توجد اختبارات مطابقة</h3>
          <p className="text-xs text-slate-400 mt-1">جرّب تغيير كلمات البحث أو ارفع امتحاناً جديداً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-black px-2.5 py-1 bg-brand-50 text-brand-700 rounded-lg border border-brand-200 font-mono">
                    {exam.code}
                  </span>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      exam.status === 'PUBLISHED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : exam.status === 'DRAFT'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {exam.status === 'PUBLISHED'
                      ? 'منشور'
                      : exam.status === 'DRAFT'
                      ? 'مسودة'
                      : 'مغلق'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug">
                  {exam.title}
                </h3>

                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs font-semibold text-slate-600">
                  <div>
                    <span className="text-[10px] text-slate-400 block">الأسئلة</span>
                    <span className="font-bold text-slate-900">{exam.questionsCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">الطلاب</span>
                    <span className="font-bold text-slate-900">{exam.attemptsCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">المتوسط</span>
                    <span className="font-bold text-brand-600">{exam.averageScore}%</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/teacher/exams/${exam.id}/review`}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition"
                  >
                    مراجعة وتعديل
                  </Link>

                  <Link
                    href={`/teacher/results?examId=${exam.id}`}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition"
                  >
                    النتائج
                  </Link>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedExamForShare(exam)}
                    title="مشاركة ورابط الاختبار"
                    className="p-2 rounded-xl text-slate-500 hover:text-brand-600 hover:bg-brand-50 transition"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  {exam.status === 'PUBLISHED' ? (
                    <button
                      onClick={() => handleStatusChange(exam.id, 'CLOSED')}
                      title="إغلاق الاختبار"
                      className="p-2 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition"
                    >
                      <Lock className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(exam.id, 'PUBLISHED')}
                      title="نشر الاختبار"
                      className="p-2 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition"
                    >
                      <Unlock className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteExam(exam.id, exam.title)}
                    title="حذف"
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Share / QR Modal */}
      {selectedExamForShare && (
        <Modal
          isOpen={!!selectedExamForShare}
          onClose={() => setSelectedExamForShare(null)}
          title={`مشاركة امتحان: ${selectedExamForShare.title}`}
        >
          <div className="text-center space-y-6">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 inline-block shadow-inner">
              <QRCodeSVG value={getShareUrl(selectedExamForShare.code)} size={180} level="H" />
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 block mb-1">كود الاختبار المباشر</span>
              <div className="text-2xl font-black text-brand-700 tracking-wider font-mono">
                {selectedExamForShare.code}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-500 block mb-2">رابط دخول الطلاب</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={getShareUrl(selectedExamForShare.code)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-mono select-all text-left"
                  dir="ltr"
                />
                <button
                  onClick={() => handleCopyLink(selectedExamForShare.code)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedExamForShare(null)}
                className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-md"
              >
                إغلاق
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
