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
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#800020] dark:text-[#F3E5AB]">إدارة الاختبارات</h1>
          <p className="text-xs text-[#660019] dark:text-[#D8C4AC] font-medium mt-1">
            استعرض جميع الاختبارات، وعدل محتواها، أو شارك الروابط مع الطلاب لمتابعة النتائج.
          </p>
        </div>

        <Link
          href="/teacher/exams/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#800020] to-[#E11D48] hover:from-[#660019] hover:to-[#C0153D] text-white text-xs font-black shadow-md shadow-[#800020]/25 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>رفع امتحان PDF جديد</span>
        </Link>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-[#FFFDF9] dark:bg-[#1E0709] rounded-2xl p-4 border border-[#800020]/15 dark:border-[#D4AF37]/25 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="البحث باسم الاختبار أو الكود..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-[#800020]/20 dark:border-white/15 bg-white dark:bg-[#140406] text-xs font-semibold text-[#2A080B] dark:text-[#EEE4DA] focus:outline-none focus:ring-2 focus:ring-[#800020]"
          />
          <Search className="w-4 h-4 text-[#800020]/50 dark:text-[#D4AF37] absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {(['ALL', 'PUBLISHED', 'DRAFT', 'CLOSED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 ${
                statusFilter === st
                  ? 'bg-[#800020] text-white shadow-sm'
                  : 'bg-[#FDF2F4] dark:bg-[#2C1215] text-[#800020] dark:text-[#D4AF37] hover:bg-[#F8CFD5]'
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

      {/* Exams Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-[#FFFDF9] dark:bg-[#1E0709] rounded-3xl border border-[#800020]/15 dark:border-[#D4AF37]/25 animate-pulse p-6"></div>
          ))}
        </div>
      ) : filteredExams.length === 0 ? (
        <div className="bg-[#FFFDF9] dark:bg-[#1E0709] rounded-3xl p-12 text-center border border-dashed border-[#800020]/25 max-w-md mx-auto my-8">
          <FileText className="w-12 h-12 text-[#D4AF37]/50 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#800020] dark:text-[#F3E5AB]">لا توجد اختبارات مطابقة</h3>
          <p className="text-xs text-[#660019]/70 dark:text-[#D8C4AC]/70 mt-1">جرّب تغيير كلمات البحث أو ارفع امتحاناً جديداً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-[#FFFDF9] dark:bg-[#1E0709] rounded-3xl border border-[#800020]/15 dark:border-[#D4AF37]/25 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-black px-2.5 py-1 bg-[#FDF2F4] dark:bg-[#2C1215] text-[#800020] dark:text-[#D4AF37] rounded-lg border border-[#F8CFD5] dark:border-[#D4AF37]/30 font-mono">
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

                <h3 className="text-base font-bold text-[#800020] dark:text-[#F3E5AB] line-clamp-2 leading-snug">
                  {exam.title}
                </h3>

                <div className="mt-4 pt-3 border-t border-[#800020]/10 dark:border-white/10 grid grid-cols-3 gap-2 text-center text-xs font-semibold text-[#660019] dark:text-[#D8C4AC]">
                  <div>
                    <span className="text-[10px] text-[#800020]/60 dark:text-[#D4AF37] block">الأسئلة</span>
                    <span className="font-bold text-[#800020] dark:text-[#F3E5AB]">{exam.questionsCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#800020]/60 dark:text-[#D4AF37] block">الطلاب</span>
                    <span className="font-bold text-[#800020] dark:text-[#F3E5AB]">{exam.attemptsCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#800020]/60 dark:text-[#D4AF37] block">المتوسط</span>
                    <span className="font-bold text-[#800020] dark:text-[#D4AF37]">{exam.averageScore}%</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-[#FDF2F4]/50 dark:bg-[#2C1215]/50 border-t border-[#800020]/10 dark:border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/teacher/exams/${exam.id}/review`}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#140406] border border-[#800020]/20 dark:border-white/15 hover:bg-[#FDF2F4] text-xs font-bold text-[#800020] dark:text-[#F3E5AB] transition"
                  >
                    مراجعة وتعديل
                  </Link>

                  <Link
                    href={`/teacher/results?examId=${exam.id}`}
                    className="px-3 py-1.5 rounded-xl bg-[#800020] hover:bg-[#660019] text-xs font-bold text-white transition"
                  >
                    النتائج
                  </Link>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedExamForShare(exam)}
                    title="مشاركة ورابط الاختبار"
                    className="p-2 rounded-xl text-[#800020] dark:text-[#D4AF37] hover:bg-[#FDF2F4] dark:hover:bg-[#2C1215] transition"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  {exam.status === 'PUBLISHED' ? (
                    <button
                      onClick={() => handleStatusChange(exam.id, 'CLOSED')}
                      title="إغلاق الاختبار"
                      className="p-2 rounded-xl text-amber-700 hover:bg-amber-50 transition"
                    >
                      <Lock className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(exam.id, 'PUBLISHED')}
                      title="نشر الاختبار"
                      className="p-2 rounded-xl text-emerald-700 hover:bg-emerald-50 transition"
                    >
                      <Unlock className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteExam(exam.id, exam.title)}
                    title="حذف"
                    className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition"
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
            <div className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#D4AF37]/30 inline-block shadow-inner">
              <QRCodeSVG value={getShareUrl(selectedExamForShare.code)} size={180} level="H" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#660019] block mb-1">كود الاختبار المباشر</span>
              <div className="text-2xl font-black text-[#800020] tracking-wider font-mono">
                {selectedExamForShare.code}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-[#660019] block mb-2">رابط دخول الطلاب</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={getShareUrl(selectedExamForShare.code)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#800020]/20 bg-[#FDF2F4] text-[#800020] text-xs font-mono select-all text-left"
                  dir="ltr"
                />
                <button
                  onClick={() => handleCopyLink(selectedExamForShare.code)}
                  className="px-4 py-2.5 rounded-xl bg-[#800020] hover:bg-[#660019] text-white text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedExamForShare(null)}
                className="w-full py-3 rounded-xl bg-[#800020] hover:bg-[#660019] text-white font-bold text-xs shadow-md"
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
