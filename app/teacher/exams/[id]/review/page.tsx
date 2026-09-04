'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  Save,
  Share2,
  Send,
  Loader2,
  Copy,
  QrCode as QrIcon,
  Check,
  Edit3
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useToast } from '@/components/ui/Toast';
import { Modal } from '@/components/ui/Modal';

interface OptionItem {
  optionKey: string;
  text: string;
}

interface QuestionItem {
  id?: string;
  questionNumber: number;
  type: 'mcq' | 'essay';
  questionText: string;
  passage?: string | null;
  points: number;
  correctOptionId?: string | null;
  needsReview?: boolean;
  options: OptionItem[];
}

export default function ExamReviewPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id as string;
  const { success, error: toastError, info } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Exam Fields
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState<number | null>(60);
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED' | 'CLOSED'>('DRAFT');
  const [allowMultipleAttempts, setAllowMultipleAttempts] = useState(false);
  const [requirePhone, setRequirePhone] = useState(true);
  const [requireGroup, setRequireGroup] = useState(true);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [groupsList, setGroupsList] = useState<string[]>([]);
  const [availableGroups, setAvailableGroups] = useState<string[]>([]);

  // Publish Success Modal
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Fetch exam details and teacher groups
    Promise.all([
      fetch(`/api/teacher/exams/${examId}`).then((r) => r.json()),
      fetch('/api/teacher/groups').then((r) => r.json()),
    ])
      .then(([examData, groupsData]) => {
        if (examData.error) {
          setErrorMsg(examData.error);
          return;
        }

        const e = examData.exam;
        setCode(e.code);
        setTitle(e.title);
        setDescription(e.description || '');
        setDurationMinutes(e.durationMinutes);
        setStatus(e.status);
        setAllowMultipleAttempts(e.allowMultipleAttempts);
        setRequirePhone(e.requirePhone);
        setRequireGroup(e.requireGroup);
        setGroupsList(e.groupsList || []);

        const mappedQuestions = (e.questions || []).map((q: any, idx: number) => ({
          id: q.id,
          questionNumber: q.questionNumber || idx + 1,
          type: q.type,
          questionText: q.questionText,
          passage: q.passage || null,
          points: q.points,
          correctOptionId: q.correctOptionId,
          needsReview: q.needsReview,
          options: (q.options || []).map((opt: any) => ({
            optionKey: opt.optionKey,
            text: opt.text,
          })),
        }));

        setQuestions(mappedQuestions);

        if (groupsData.groups) {
          setAvailableGroups(groupsData.groups.map((g: any) => g.name));
        }
      })
      .catch((err) => {
        setErrorMsg('فشل تحميل بيانات الاختبار');
      })
      .finally(() => setLoading(false));
  }, [examId]);

  // Question editing helpers
  const handleUpdateQuestion = (index: number, field: string, value: any) => {
    setQuestions((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleUpdateOption = (qIndex: number, optIndex: number, text: string) => {
    setQuestions((prev) => {
      const next = [...prev];
      const opts = [...next[qIndex].options];
      opts[optIndex] = { ...opts[optIndex], text };
      next[qIndex] = { ...next[qIndex], options: opts };
      return next;
    });
  };

  const handleAddQuestion = (type: 'mcq' | 'essay' = 'mcq') => {
    const newQ: QuestionItem = {
      questionNumber: questions.length + 1,
      type,
      questionText: '',
      points: type === 'mcq' ? 1 : 5,
      correctOptionId: type === 'mcq' ? 'a' : null,
      needsReview: false,
      options:
        type === 'mcq'
          ? [
              { optionKey: 'a', text: '' },
              { optionKey: 'b', text: '' },
              { optionKey: 'c', text: '' },
              { optionKey: 'd', text: '' },
            ]
          : [],
    };
    setQuestions((prev) => [...prev, newQ]);
    success('تمت إضافة سؤال جديد');
  };

  const handleDeleteQuestion = (index: number) => {
    if (questions.length <= 1) {
      toastError('يجب أن يحتوي الاختبار على سؤال واحد على الأقل');
      return;
    }
    setQuestions((prev) => {
      const next = prev.filter((_, i) => i !== index);
      return next.map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
    });
  };

  // Save changes
  const handleSave = async (publishImmediately: boolean = false) => {
    if (!title.trim()) {
      toastError('يرجى كتابة عنوان الاختبار');
      return;
    }

    if (publishImmediately) setPublishing(true);
    else setSaving(true);

    try {
      const payload = {
        title,
        description,
        durationMinutes: durationMinutes ? Number(durationMinutes) : null,
        allowMultipleAttempts,
        requirePhone,
        requireGroup,
        groupsList: groupsList.length > 0 ? groupsList : availableGroups,
        status: publishImmediately ? 'PUBLISHED' : status,
        questions: questions.map((q, idx) => ({
          questionNumber: idx + 1,
          type: q.type,
          questionText: q.questionText,
          points: Number(q.points) || 1,
          correctOptionId: q.type === 'mcq' ? q.correctOptionId : null,
          needsReview: q.needsReview || false,
          options: q.type === 'mcq' ? q.options : [],
        })),
      };

      const res = await fetch(`/api/teacher/exams/${examId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'فشل حفظ التعديلات');
      }

      if (publishImmediately) {
        setStatus('PUBLISHED');
        setShowShareModal(true);
        success('تم نشر الاختبار بنجاح للطلاب! 🎉');
      } else {
        success('تم حفظ التعديلات بنجاح');
      }
    } catch (err: any) {
      toastError(err.message || 'حدث خطأ أثناء الحفظ');
    } finally {
      setSaving(false);
      setPublishing(false);
    }
  };

  const examUrl = typeof window !== 'undefined' ? `${window.location.origin}/exam/${code}` : `/exam/${code}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(examUrl);
    setCopiedLink(true);
    success('تم نسخ رابط الاختبار إلى الحافظة!');
    setTimeout(() => setCopiedLink(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
      </div>
    );
  }

  const mcqCount = questions.filter((q) => q.type === 'mcq').length;
  const essayCount = questions.filter((q) => q.type === 'essay').length;
  const totalPoints = questions.reduce((sum, q) => sum + (Number(q.points) || 0), 0);
  const needsReviewCount = questions.filter((q) => q.needsReview).length;

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/teacher/exams"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 mb-2 transition"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لجميع الاختبارات</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900">مراجعة وتعديل الاختبار</h1>
            <span
              className={`px-3 py-1 text-xs font-black rounded-lg ${
                status === 'PUBLISHED'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : status === 'DRAFT'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {status === 'PUBLISHED' ? 'منشور للطلاب' : status === 'DRAFT' ? 'مسودة قيد المراجعة' : 'مغلق'}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          {status === 'PUBLISHED' && (
            <button
              onClick={() => setShowShareModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-brand-200 bg-brand-50 text-brand-700 text-xs font-bold hover:bg-brand-100 transition"
            >
              <Share2 className="w-4 h-4" />
              <span>مشاركة الرابط والـ QR</span>
            </button>
          )}

          <button
            onClick={() => handleSave(false)}
            disabled={saving || publishing}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>حفظ كمسودة</span>
          </button>

          <button
            onClick={() => handleSave(true)}
            disabled={saving || publishing}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-black shadow-md shadow-brand-500/20 transition disabled:opacity-50"
          >
            {publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>نشر الاختبار للطلاب الآن</span>
          </button>
        </div>
      </div>

      {/* Stats and Flags Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 block">إجمالي الأسئلة</span>
          <span className="text-xl font-black text-slate-900 mt-1 block">{questions.length}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 block">اختيار من متعدد (MCQ)</span>
          <span className="text-xl font-black text-brand-600 mt-1 block">{mcqCount}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 block">أسئلة مقالية</span>
          <span className="text-xl font-black text-indigo-600 mt-1 block">{essayCount}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 block">إجمالي الدرجات</span>
          <span className="text-xl font-black text-emerald-600 mt-1 block">{totalPoints}</span>
        </div>
      </div>

      {needsReviewCount > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span>
            تنبيه: يوجد {needsReviewCount} سؤال يحتاج إلى مراجعة وتحديد الإجابة النموذجية قبل نشر الاختبار.
          </span>
        </div>
      )}

      {/* Exam Metadata Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-brand-600" />
          <span>بيانات وإعدادات الاختبار</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">عنوان الاختبار</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              مدة الاختبار بالدقائق (اتركه فارغاً لوقت مفتوح)
            </label>
            <div className="relative">
              <input
                type="number"
                value={durationMinutes ?? ''}
                onChange={(e) => setDurationMinutes(e.target.value ? Number(e.target.value) : null)}
                placeholder="مثلاً: 60"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
              <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              وصف أو تعليمات الاختبار للطلاب
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب تعليمات أو ملحوظات للطلاب تظهر قبل بدء الاختبار..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
            ></textarea>
          </div>

          {/* Additional Options */}
          <div className="flex flex-wrap gap-6 md:col-span-2 pt-2 text-xs font-semibold text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={allowMultipleAttempts}
                onChange={(e) => setAllowMultipleAttempts(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded border-slate-300"
              />
              <span>السماح للطالب بأكثر من محاولة</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={requirePhone}
                onChange={(e) => setRequirePhone(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded border-slate-300"
              />
              <span>رقم الهاتف إجباري</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={requireGroup}
                onChange={(e) => setRequireGroup(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded border-slate-300"
              />
              <span>اختيار المجموعة إجباري</span>
            </label>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-600" />
            <span>قائمة الأسئلة ({questions.length})</span>
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleAddQuestion('mcq')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold border border-brand-200 transition"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة سؤال MCQ</span>
            </button>
            <button
              type="button"
              onClick={() => handleAddQuestion('essay')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة سؤال مقالي</span>
            </button>
          </div>
        </div>

        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className={`bg-white rounded-3xl p-6 sm:p-7 border shadow-sm transition space-y-5 ${
              q.needsReview ? 'border-amber-300 ring-2 ring-amber-100' : 'border-slate-200'
            }`}
          >
            {/* Question Top Bar */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                  {qIndex + 1}
                </span>

                <select
                  value={q.type}
                  onChange={(e) => handleUpdateQuestion(qIndex, 'type', e.target.value)}
                  className="px-3 py-1 rounded-lg border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800"
                >
                  <option value="mcq">اختيار من متعدد (MCQ)</option>
                  <option value="essay">سؤال مقالي (Essay)</option>
                </select>

                {q.needsReview && (
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[11px] font-bold">
                    يحتاج تحديد الإجابة
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs font-bold text-slate-600">
                  <span>الدرجة:</span>
                  <input
                    type="number"
                    min="1"
                    value={q.points}
                    onChange={(e) => handleUpdateQuestion(qIndex, 'points', Number(e.target.value))}
                    className="w-16 px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 text-center font-bold text-xs"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(qIndex)}
                  title="حذف السؤال"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Reading Passage / Context Paragraph */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  قطعة القراءة / الفقرة المرفقة (اختياري - تظهر للطلاب بجانب السؤال)
                </label>
                {q.passage && (
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    مرفق معها فقرة قراءة
                  </span>
                )}
              </div>
              <textarea
                rows={2}
                placeholder="إذا كان السؤال يدور حول قطعة قراءة أو أبيات شعرية أو فقرة نصية، اكتبها هنا لتظهر للطالب أثناء الإجابة..."
                value={q.passage || ''}
                onChange={(e) => handleUpdateQuestion(qIndex, 'passage', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-200/80 bg-amber-50/30 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
              ></textarea>
            </div>

            {/* Question Text */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">نص السؤال</label>
              <textarea
                rows={2}
                value={q.questionText}
                onChange={(e) => handleUpdateQuestion(qIndex, 'questionText', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              ></textarea>
            </div>

            {/* MCQ Options Editor */}
            {q.type === 'mcq' && (
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-slate-600">
                  الاختيارات (حدد الدائرة بجانب الإجابة الصحيحة):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, optIndex) => {
                    const isCorrect = q.correctOptionId === opt.optionKey;
                    return (
                      <div
                        key={opt.optionKey}
                        className={`flex items-center gap-2.5 p-3 rounded-2xl border transition ${
                          isCorrect
                            ? 'border-emerald-400 bg-emerald-50/50'
                            : 'border-slate-200 bg-slate-50/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`correct_${qIndex}`}
                          checked={isCorrect}
                          onChange={() => {
                            handleUpdateQuestion(qIndex, 'correctOptionId', opt.optionKey);
                            handleUpdateQuestion(qIndex, 'needsReview', false);
                          }}
                          className="w-4 h-4 text-emerald-600 cursor-pointer"
                        />
                        <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">
                          {opt.optionKey === 'a'
                            ? 'أ'
                            : opt.optionKey === 'b'
                            ? 'ب'
                            : opt.optionKey === 'c'
                            ? 'ج'
                            : opt.optionKey === 'd'
                            ? 'د'
                            : opt.optionKey.toUpperCase()}
                        </span>
                        <input
                          type="text"
                          value={opt.text}
                          onChange={(e) => handleUpdateOption(qIndex, optIndex, e.target.value)}
                          placeholder={`الاختيار ${optIndex + 1}...`}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Essay Question Notice */}
            {q.type === 'essay' && (
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs font-semibold text-indigo-900">
                سؤال مقالي: يظهر للطالب مربع نص لكتابة الإجابة، ويتم تحويلها لصفحة التصحيح اليدوي في لوحة المعلم بعد التسليم.
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Share / Publish QR Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="مشاركة الاختبار مع الطلاب 🚀"
      >
        <div className="text-center space-y-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 inline-block shadow-inner">
            <QRCodeSVG value={examUrl} size={180} level="H" />
          </div>

          <div>
            <span className="text-xs font-bold text-slate-400 block mb-1">كود الاختبار المباشر</span>
            <div className="text-2xl font-black text-brand-700 tracking-wider font-mono">
              {code}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-500 block mb-2">رابط دخول الطلاب</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={examUrl}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-mono select-all text-left"
                dir="ltr"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'تم النسخ' : 'نسخ'}</span>
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition"
            >
              تم
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
