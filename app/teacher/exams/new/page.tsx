'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Settings,
  HelpCircle,
  FileCheck,
  Plus,
  Trash2,
  Save,
  Send,
  Clock,
  Eye,
  Edit3
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

const STAGES = [
  { id: 1, label: 'رفع واستلام ملف الامتحان ونموذج الإجابة' },
  { id: 2, label: 'قراءة محتوى المستند بدقة وسياق الجمل بالكامل' },
  { id: 3, label: 'الحفاظ على التشكيل، الأبيات الشعرية، والكلمات المحددة' },
  { id: 4, label: 'تحليل بنية الأسئلة بالذكاء الاصطناعي (MCQ ومقالي)' },
  { id: 5, label: 'مطابقة الإجابات النموذجية مع الاختيارات بدقة' },
  { id: 6, label: 'تجهيز شاشة التأكد والمراجعة الفورية' },
];

interface OptionItem {
  optionKey: string;
  text: string;
}

interface ParsedQuestion {
  questionNumber: number;
  type: 'mcq' | 'essay';
  questionText: string;
  passage?: string | null;
  points: number;
  correctOptionId?: string | null;
  needsReview?: boolean;
  options: OptionItem[];
}

export default function NewExamPage() {
  const router = useRouter();
  const { success, error: toastError } = useToast();

  // Mode: 'upload' | 'verifying'
  const [mode, setMode] = useState<'upload' | 'verifying'>('upload');

  // File Upload States
  const [file, setFile] = useState<File | null>(null);
  const [answersFile, setAnswersFile] = useState<File | null>(null);
  const [answersText, setAnswersText] = useState('');
  const [showAnswersSection, setShowAnswersSection] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [needApiKey, setNeedApiKey] = useState(false);

  // Parsed Exam State for Verification Step
  const [examTitle, setExamTitle] = useState('');
  const [examDescription, setExamDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState<number | null>(60);
  const [questions, setQuestions] = useState<ParsedQuestion[]>([]);
  const [savingExam, setSavingExam] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const answersFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.endsWith('.pdf')) {
      setErrorMsg('نوع الملف غير صالح، يرجى اختيار ملف بصيغة PDF');
      return;
    }
    if (selectedFile.size > 25 * 1024 * 1024) {
      setErrorMsg('حجم الملف كبير جداً، الحد الأقصى المسموح به هو 25 ميجابايت');
      return;
    }
    setErrorMsg('');
    setNeedApiKey(false);
    setFile(selectedFile);
  };

  const handleAnswersFileChange = (selectedFile: File) => {
    if (selectedFile.size > 25 * 1024 * 1024) {
      toastError('حجم ملف الإجابات كبير جداً (الحد الأقصى 25 ميجابايت)');
      return;
    }
    setAnswersFile(selectedFile);
    success('تم إرفاق نموذج الإجابات بنجاح');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleStartParsing = async () => {
    if (!file || isProcessing) return;

    setIsProcessing(true);
    setErrorMsg('');
    setCurrentStage(1);

    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => (prev < 5 ? prev + 1 : prev));
    }, 2000);

    try {
      const formData = new FormData();
      formData.append('file', file);
      if (answersFile) {
        formData.append('answersFile', answersFile);
      }
      if (answersText.trim()) {
        formData.append('answersText', answersText.trim());
      }

      const res = await fetch('/api/teacher/upload-pdf', {
        method: 'POST',
        body: formData,
      });

      clearInterval(stageInterval);
      const data = await res.json();

      if (!res.ok) {
        if (data.needApiKey) setNeedApiKey(true);
        throw new Error(data.error || 'فشل تحليل ملف الـ PDF بالذكاء الاصطناعي');
      }

      setCurrentStage(6);

      // Load parsed data into verification step
      const parsed = data.data;
      setExamTitle(parsed.exam_title || file.name.replace('.pdf', ''));
      setExamDescription(parsed.description || '');
      setDurationMinutes(parsed.duration_minutes || 60);

      const parsedQs: ParsedQuestion[] = (parsed.questions || []).map((q: any, idx: number) => ({
        questionNumber: q.question_number || idx + 1,
        type: q.type || 'mcq',
        questionText: q.question_text || '',
        passage: q.passage || null,
        points: q.points || (q.type === 'essay' ? 5 : 1),
        correctOptionId: q.correct_answer || null,
        needsReview: q.needs_review || (q.type === 'mcq' && !q.correct_answer),
        options: (q.options || []).map((opt: any) => ({
          optionKey: opt.id || 'a',
          text: opt.text || '',
        })),
      }));

      setQuestions(parsedQs);
      setIsProcessing(false);
      setMode('verifying');
      success('تم استخراج الأسئلة بنجاح! يمكنك الآن مراجعتها والتأكد من صحتها.');
    } catch (err: any) {
      clearInterval(stageInterval);
      setErrorMsg(err.message || 'حدث خطأ أثناء معالجة ملف الـ PDF');
      toastError(err.message || 'فشلت معالجة الملف');
      setIsProcessing(false);
      setCurrentStage(0);
    }
  };

  // Verification Step helpers
  const handleUpdateQuestion = (index: number, field: keyof ParsedQuestion, value: any) => {
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
    const newQ: ParsedQuestion = {
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

  const handleSaveAndFinish = async (publishImmediately: boolean = false) => {
    if (!examTitle.trim()) {
      toastError('يرجى كتابة عنوان للاختبار');
      return;
    }

    setSavingExam(true);
    try {
      const payload = {
        title: examTitle.trim(),
        description: examDescription.trim(),
        durationMinutes: durationMinutes ? Number(durationMinutes) : null,
        status: publishImmediately ? 'PUBLISHED' : 'DRAFT',
        questions: questions.map((q, idx) => ({
          questionNumber: idx + 1,
          type: q.type,
          questionText: q.questionText,
          passage: q.passage || null,
          points: Number(q.points) || 1,
          correctOptionId: q.type === 'mcq' ? q.correctOptionId : null,
          needsReview: q.needsReview || false,
          options: q.type === 'mcq' ? q.options : [],
        })),
      };

      const res = await fetch('/api/teacher/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'فشل حفظ الاختبار');
      }

      success(publishImmediately ? 'تم اعتماد ونشر الاختبار بنجاح للطلاب! 🎉' : 'تم حفظ مسودة الاختبار بنجاح!');
      setSavingExam(false);
      router.push(`/teacher/exams/${data.exam.id}/review`);
    } catch (err: any) {
      toastError(err.message || 'حدث خطأ أثناء حفظ الاختبار');
      setSavingExam(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/teacher/exams"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 mb-2 transition"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لقائمة الاختبارات</span>
          </Link>
          <h1 className="text-2xl font-black text-slate-900">
            {mode === 'upload'
              ? 'رفع وتحليل امتحان PDF بالذكاء الاصطناعي'
              : 'التحقق من الأسئلة المستخرجة والتأكد من صحتها'}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {mode === 'upload'
              ? 'قراءة الأسئلة وسياق الجملة كاملاً مع التشكيل ونموذج الإجابة بدقة فائقة.'
              : 'راجع نصوص الأسئلة، التشكيل، والاختيارات الصحيحة قبل حفظ أو نشر الاختبار.'}
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
          {needApiKey && (
            <Link
              href="/teacher/settings"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>إدخال مفتاح الـ API الآن</span>
            </Link>
          )}
        </div>
      )}

      {/* =========================================================================
          STEP 1: UPLOAD & ATTACH ANSWER KEY
      ========================================================================= */}
      {mode === 'upload' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
          {!isProcessing ? (
            <>
              {/* Exam PDF Drag and Drop Zone */}
              <div>
                <label className="block text-xs font-black text-slate-800 mb-2">
                  ١. ملف الامتحان الرئيسي (PDF) <span className="text-rose-500">*</span>
                </label>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-200 ${
                    isDragging
                      ? 'border-brand-500 bg-brand-50/50 scale-[1.01]'
                      : file
                      ? 'border-emerald-300 bg-emerald-50/30'
                      : 'border-slate-300 hover:border-brand-400 bg-slate-50/50 hover:bg-white'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChange(e.target.files[0]);
                      }
                    }}
                  />

                  <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <UploadCloud className="w-7 h-7" />
                  </div>

                  {file ? (
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold mb-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>تم اختيار ملف الامتحان بنجاح</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">{file.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        حجم الملف: {(file.size / (1024 * 1024)).toFixed(2)} ميجابايت
                      </p>
                      <p className="text-xs text-brand-600 font-bold mt-2">
                        اضغط لتغيير الملف أو اسحب ملفاً آخر
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">
                        اسحب ملف امتحان PDF هنا أو اضغط للاختيار من جهازك
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-medium">
                        يدعم الملفات النصية والممسوحة ضوئياً واللغتين العربية والإنجليزية (الحد الأقصى: 25 ميجابايت)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Optional: Answer Key Attachment Section */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      <span>٢. نموذج الإجابات / مفتاح الحل (اختياري)</span>
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      ارفع نموذج الإجابة أو اكتب الحل ليقوم الذكاء الاصطناعي بتحديد الإجابة الصحيحة لكل سؤال تلقائياً.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAnswersSection(!showAnswersSection)}
                    className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                  >
                    {showAnswersSection ? 'إخفاء خانة الإجابات' : '+ إضافة نموذج الإجابات'}
                  </button>
                </div>

                {showAnswersSection && (
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 animate-fade-in">
                    {/* Upload answers file */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        أ) رفع ملف نموذج الإجابة (PDF أو صورة JPG/PNG)
                      </label>
                      <input
                        type="file"
                        ref={answersFileInputRef}
                        accept="application/pdf,image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleAnswersFileChange(e.target.files[0]);
                          }
                        }}
                      />
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => answersFileInputRef.current?.click()}
                          className="px-4 py-2 bg-white border border-slate-200 hover:border-emerald-400 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2 shadow-sm transition"
                        >
                          <FileText className="w-4 h-4 text-emerald-600" />
                          <span>{answersFile ? answersFile.name : 'اختيار ملف نموذج الإجابة'}</span>
                        </button>

                        {answersFile && (
                          <button
                            type="button"
                            onClick={() => setAnswersFile(null)}
                            className="text-xs font-bold text-rose-600 hover:underline"
                          >
                            إلغاء الملف
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Or write text answers */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        ب) أو اكتب/الصق الإجابات نصياً هنا (مثال: 1- أ ، 2- ب ، 3- د...)
                      </label>
                      <textarea
                        rows={3}
                        value={answersText}
                        onChange={(e) => setAnswersText(e.target.value)}
                        placeholder="اكتب أرقام الأسئلة وإجاباتها هنا لمطابقتها تلقائياً..."
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>

              {/* Action button */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Link
                  href="/teacher/exams"
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition"
                >
                  إلغاء
                </Link>
                <button
                  type="button"
                  disabled={!file}
                  onClick={handleStartParsing}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-brand-500/25 transition disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>بدء التحليل واستخراج الأسئلة بالتشكيل</span>
                </button>
              </div>
            </>
          ) : (
            /* Live Processing Indicator & Stages */
            <div className="py-6 space-y-8 animate-fade-in text-center max-w-lg mx-auto">
              <div>
                <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4 pulse-glow">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
                <h3 className="text-xl font-black text-slate-900">جاري قراءة وتحليل الامتحان بالذكاء الاصطناعي...</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  يقوم نموذج Gemini بقراءة الأسئلة بالكامل، الحفاظ على التشكيل وسياق الإعراب، ومطابقة الإجابات النموذجية.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-right space-y-3.5">
                {STAGES.map((stage) => {
                  const isPassed = currentStage > stage.id;
                  const isCurrent = currentStage === stage.id;

                  return (
                    <div
                      key={stage.id}
                      className={`flex items-center gap-3 text-xs font-bold transition-all duration-300 ${
                        isPassed
                          ? 'text-emerald-700'
                          : isCurrent
                          ? 'text-brand-700 font-black scale-[1.02]'
                          : 'text-slate-400'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                          isPassed
                            ? 'bg-emerald-100 text-emerald-700'
                            : isCurrent
                            ? 'bg-brand-600 text-white'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {isPassed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : isCurrent ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <span className="text-[10px]">{stage.id}</span>
                        )}
                      </div>
                      <span>{stage.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          STEP 2: QUESTION VERIFICATION & PREVIEW (التأكد من الأسئلة المستخرجة)
      ========================================================================= */}
      {mode === 'verifying' && (
        <div className="space-y-6">
          {/* Verification Banner */}
          <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-black">تم استخراج {questions.length} سؤال بنجاح!</h2>
                <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                  يرجى التأكد من صحة الأسئلة، التشكيل، والإجابات المحددة قبل اعتماد الاختبار ونشره.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setMode('upload')}
                className="px-4 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition"
              >
                الرجوع لرفع ملف آخر
              </button>
            </div>
          </div>

          {/* Exam Basic Meta */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-brand-600" />
              <span>بيانات الاختبار الأساسية</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الامتحان</label>
                <input
                  type="text"
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">المدة بالدقائق</label>
                <div className="relative">
                  <input
                    type="number"
                    value={durationMinutes ?? ''}
                    onChange={(e) => setDurationMinutes(e.target.value ? Number(e.target.value) : null)}
                    placeholder="60"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                  />
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </div>

          {/* Questions Verification List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-600" />
                <span>مراجعة وتأكيد الأسئلة ({questions.length})</span>
              </h3>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAddQuestion('mcq')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold border border-brand-200 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة سؤال اختيار</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAddQuestion('essay')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة سؤال مقالي</span>
                </button>
              </div>
            </div>

            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className={`bg-white rounded-3xl p-6 border shadow-sm transition space-y-4 ${
                  q.needsReview ? 'border-amber-300 ring-2 ring-amber-100' : 'border-slate-200'
                }`}
              >
                {/* Question Top Header */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                      {qIndex + 1}
                    </span>

                    <select
                      value={q.type}
                      onChange={(e) => handleUpdateQuestion(qIndex, 'type', e.target.value as any)}
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
                        className="w-14 px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 text-center font-bold text-xs"
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

                {/* Optional Passage */}
                {q.passage && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-amber-950 space-y-1">
                    <span className="text-[11px] font-bold text-amber-800 block">الفقرة / الأبيات المرفقة:</span>
                    <p className="text-xs font-amiri font-semibold leading-relaxed whitespace-pre-line">
                      {q.passage}
                    </p>
                  </div>
                )}

                {/* Question Text with Tashkeel & HTML underline preview */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    نص السؤال (مع كامل التشكيل وسياق الجملة):
                  </label>
                  <textarea
                    rows={2}
                    value={q.questionText}
                    onChange={(e) => handleUpdateQuestion(qIndex, 'questionText', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-amiri font-bold leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                  ></textarea>
                </div>

                {/* MCQ Options with Radio Selection */}
                {q.type === 'mcq' && (
                  <div className="space-y-2.5 pt-1">
                    <label className="block text-xs font-bold text-slate-600">
                      الاختيارات (اختر الإجابة الصحيحة بالضغط على الدائرة):
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt, optIndex) => {
                        const isCorrect = q.correctOptionId === opt.optionKey;
                        return (
                          <div
                            key={opt.optionKey}
                            className={`flex items-center gap-2.5 p-3 rounded-2xl border transition ${
                              isCorrect
                                ? 'border-emerald-400 bg-emerald-50/60'
                                : 'border-slate-200 bg-slate-50/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`verify_correct_${qIndex}`}
                              checked={isCorrect}
                              onChange={() => {
                                handleUpdateQuestion(qIndex, 'correctOptionId', opt.optionKey);
                                handleUpdateQuestion(qIndex, 'needsReview', false);
                              }}
                              className="w-4 h-4 text-emerald-600 cursor-pointer"
                            />
                            <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
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
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-amiri font-bold focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Verification Bottom Toolbar */}
          <div className="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-slate-200 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setMode('upload')}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition w-full sm:w-auto"
            >
              الرجوع لتعديل الملفات
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                disabled={savingExam}
                onClick={() => handleSaveAndFinish(false)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition disabled:opacity-50 w-full sm:w-auto"
              >
                {savingExam ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>حفظ كمسودة</span>
              </button>

              <button
                type="button"
                disabled={savingExam}
                onClick={() => handleSaveAndFinish(true)}
                className="inline-flex items-center justify-center gap-2 px-7 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white text-xs font-black shadow-md shadow-brand-500/25 transition disabled:opacity-50 w-full sm:w-auto"
              >
                {savingExam ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>اعتماد ونشر الاختبار الآن</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
