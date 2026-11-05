'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  MessageSquare,
  Clock,
  Printer,
  Sparkles,
  Loader2,
  BookOpen,
} from 'lucide-react';
import { formatTime, sanitizeRichText } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

export default function StudentAttemptReviewPage() {
  const params = useParams();
  const attemptId = params.attemptId as string;
  const router = useRouter();
  const { error: toastError } = useToast();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/student/results/${attemptId}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.error) {
          toastError(resData.error);
          return;
        }
        setData(resData);
      })
      .catch(() => toastError('فشل تحميل تفاصيل النتيجة'))
      .finally(() => setLoading(false));
  }, [attemptId]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
        <p className="text-xs font-bold text-slate-400">جاري تحميل تفاصيل الامتحان والإجابات...</p>
      </div>
    );
  }

  if (!data?.attempt) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 text-center border border-slate-200/80 dark:border-slate-800">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-800 dark:text-white">النتيجة غير متاحة حالياً</h3>
        <p className="text-xs text-slate-400 mt-1">قد تكون النتيجة قيد المراجعة أو غير مصرح لك بعرضها.</p>
        <Link
          href="/student/results"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لسجل النتائج</span>
        </Link>
      </div>
    );
  }

  const { attempt, questions } = data;

  return (
    <div className="space-y-6 animate-fade-in pb-16 font-arabic max-w-4xl mx-auto">
      {/* Back link */}
      <div className="flex items-center justify-between">
        <Link
          href="/student/results"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لسجل النتائج</span>
        </Link>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Printer className="w-4 h-4" />
          <span>طباعة نموذج الإجابة</span>
        </button>
      </div>

      {/* Summary Score Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-mono font-black px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800">
              {attempt.examCode}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
              {attempt.examTitle}
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-1">
              تاريخ التسليم: {new Date(attempt.submittedAt).toLocaleString('ar-EG')} • وقت الحل:{' '}
              {formatTime(attempt.timeSpentSeconds)}
            </p>
          </div>

          <div className="text-right sm:text-left bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 min-w-[180px]">
            <span className="block text-xs font-bold text-slate-400">الدرجة المعتمدة</span>
            <span className="block text-3xl font-black text-slate-900 dark:text-white mt-0.5">
              {attempt.totalScore}{' '}
              <span className="text-sm font-normal text-slate-400">/ {attempt.maxScore}</span>
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-xs font-black ${
                  attempt.isPassed ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {attempt.percentage}%
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  attempt.isPassed
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                }`}
              >
                {attempt.isPassed ? 'ناجح ومتميز 👏' : 'لم يجتز نسبة النجاح'}
              </span>
            </div>
          </div>
        </div>

        {attempt.teacherNotes && (
          <div className="mt-5 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <span className="font-black block mb-1">توجيه وملاحظة المعلم:</span>
            {attempt.teacherNotes}
          </div>
        )}
      </div>

      {/* Question by Question Review */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-brand-600" />
          <span>مراجعة الأسئلة وتفاصيل إجاباتك</span>
        </h2>

        {questions.map((q: any, idx: number) => {
          const isMcq = q.type === 'mcq';
          const studentAns = q.studentAnswer;
          const isCorrect = studentAns.isCorrect;

          return (
            <div
              key={q.questionId}
              className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border shadow-sm transition ${
                isMcq
                  ? isCorrect
                    ? 'border-emerald-200/80 dark:border-emerald-900/60'
                    : 'border-rose-200/80 dark:border-rose-900/60'
                  : 'border-slate-200/80 dark:border-slate-800'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-black flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {isMcq ? 'اختيار من متعدد' : 'سؤال مقالي'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-600 dark:text-slate-300">
                    {studentAns.pointsAwarded} / {q.points} درجة
                  </span>
                  {isMcq && (
                    <span
                      className={`text-[11px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>إجابة صحيحة</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>إجابة غير صحيحة</span>
                        </>
                      )}
                    </span>
                  )}
                </div>
              </div>

              {/* Question Text with Arabic diacritics & rich formatting */}
              <div
                className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: sanitizeRichText(q.questionText) }}
              />

              {/* MCQ Options Display */}
              {isMcq && (
                <div className="space-y-2 mb-3">
                  {q.options.map((opt: any) => {
                    const isSelectedByStudent =
                      studentAns.selectedOption?.toLowerCase() === opt.key.toLowerCase();
                    const isCorrectAnswer =
                      q.correctOptionId?.toLowerCase() === opt.key.toLowerCase();

                    let optionBg =
                      'bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300';

                    if (isCorrectAnswer) {
                      optionBg =
                        'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (isSelectedByStudent && !isCorrectAnswer) {
                      optionBg =
                        'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200';
                    }

                    return (
                      <div
                        key={opt.key}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between ${optionBg}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-md bg-white/80 dark:bg-slate-900/80 text-xs font-black flex items-center justify-center uppercase">
                            {opt.key}
                          </span>
                          <span
                            dangerouslySetInnerHTML={{ __html: sanitizeRichText(opt.text) }}
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          {isSelectedByStudent && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-200">
                              إجابتك
                            </span>
                          )}
                          {isCorrectAnswer && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 dark:bg-emerald-800 dark:text-emerald-100">
                              الإجابة الصحيحة ✓
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Essay Answer Display */}
              {!isMcq && (
                <div className="space-y-3 mt-3">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[11px] font-bold text-slate-400 block mb-1">
                      إجابتك المسجلة:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                      {studentAns.essayAnswer || 'لم يتم تقديم إجابة'}
                    </p>
                  </div>

                  {studentAns.teacherFeedback && (
                    <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2.5">
                      <MessageSquare className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-black block">تعليق وتصحيح المعلم:</span>
                        <p className="mt-0.5 leading-relaxed">{studentAns.teacherFeedback}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
