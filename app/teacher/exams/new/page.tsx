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
  HelpCircle
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

const STAGES = [
  { id: 1, label: 'رفع واستلام ملف الـ PDF' },
  { id: 2, label: 'قراءة محتوى المستند بدقة' },
  { id: 3, label: 'تحليل بنية الأسئلة بالذكاء الاصطناعي' },
  { id: 4, label: 'التعرف على أنواع الأسئلة (MCQ و مقالي)' },
  { id: 5, label: 'استخراج الاختيارات والإجابات المقترحة' },
  { id: 6, label: 'تجهيز مسودة الاختبار التفاعلي' },
  { id: 7, label: 'اكتمل التحليل بنجاح والانتقال للمراجعة' },
];

export default function NewExamPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [needApiKey, setNeedApiKey] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { success, error: toastError } = useToast();

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

    // Simulated progress stage animation intervals
    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => (prev < 6 ? prev + 1 : prev));
    }, 1800);

    try {
      const formData = new FormData();
      formData.append('file', file);

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

      setCurrentStage(7);
      success('تم استخراج الأسئلة بنجاح! جاري إنشاء مسودة الاختبار...');

      // Save as draft exam
      const parsedExam = data.data;
      const createRes = await fetch('/api/teacher/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: parsedExam.exam_title || file.name.replace('.pdf', ''),
          description: parsedExam.description || '',
          durationMinutes: parsedExam.duration_minutes || 60,
          status: 'DRAFT',
          questions: parsedExam.questions.map((q: any, idx: number) => ({
            questionNumber: q.question_number || idx + 1,
            type: q.type,
            questionText: q.question_text,
            points: q.points || 1,
            correctOptionId: q.correct_answer || null,
            needsReview: q.needs_review || false,
            options: (q.options || []).map((opt: any) => ({
              optionKey: opt.id,
              text: opt.text,
            })),
          })),
        }),
      });

      const createData = await createRes.json();
      if (!createRes.ok) {
        throw new Error(createData.error || 'فشل حفظ مسودة الاختبار');
      }

      setTimeout(() => {
        router.push(`/teacher/exams/${createData.exam.id}/review`);
      }, 1000);
    } catch (err: any) {
      clearInterval(stageInterval);
      setErrorMsg(err.message || 'حدث خطأ أثناء معالجة ملف الـ PDF');
      toastError(err.message || 'فشلت معالجة الملف');
      setIsProcessing(false);
      setCurrentStage(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
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
          <h1 className="text-2xl font-black text-slate-900">رفع وتحليل امتحان PDF بالذكاء الاصطناعي</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            يقوم Gemini بقراءة أسئلة الامتحان بالكامل واستخراج الاختيارات وتجهيزها للمراجعة والنشر.
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

      {/* Main Upload Box & Stages */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8">
        {!isProcessing ? (
          <>
            {/* Drag and Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-200 ${
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

              <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <UploadCloud className="w-8 h-8" />
              </div>

              {file ? (
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تم اختيار الملف</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{file.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    حجم الملف: {(file.size / (1024 * 1024)).toFixed(2)} ميجابايت
                  </p>
                  <p className="text-xs text-brand-600 font-bold mt-3">
                    اضغط لتغيير الملف أو اسحب ملفاً آخر
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-base font-bold text-slate-800">
                    اسحب ملف امتحان PDF هنا أو اضغط للاختيار من جهازك
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 font-medium">
                    يدعم الملفات النصية والممسوحة ضوئياً واللغتين العربية والإنجليزية (الحد الأقصى: 25 ميجابايت)
                  </p>
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
                <span>بدء التحليل واستخراج الأسئلة</span>
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
                يرجى الانتظار بضع ثوانٍ ريثما يقوم نموذج Gemini باستخراج جميع الأسئلة بدقة
              </p>
            </div>

            {/* Step-by-step visual indicators */}
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
    </div>
  );
}
