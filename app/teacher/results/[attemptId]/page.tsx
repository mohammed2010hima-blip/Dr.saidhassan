'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  GraduationCap,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  Save,
  MessageSquare,
  Sparkles,
  Loader2,
  Printer,
  ChevronLeft,
  User,
  Phone,
  Users
} from 'lucide-react';
import { formatTime, sanitizeRichText } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

export default function StudentAttemptDetailPage() {
  const params = useParams();
  const attemptId = params.attemptId as string;
  const router = useRouter();
  const { success, error: toastError } = useToast();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [gradingState, setGradingState] = useState<Record<string, { points: number; feedback: string; saving: boolean }>>({});

  const loadAttempt = () => {
    fetch(`/api/teacher/results/${attemptId}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.error) {
          toastError(resData.error);
          return;
        }
        setData(resData);

        // Initialize grading state for essay questions
        const initialGrading: any = {};
        for (const q of resData.questions) {
          if (q.type === 'essay' && q.studentAnswer.answerId) {
            initialGrading[q.studentAnswer.answerId] = {
              points: q.studentAnswer.pointsAwarded || 0,
              feedback: q.studentAnswer.teacherFeedback || '',
              saving: false,
            };
          }
        }
        setGradingState(initialGrading);
      })
      .catch(() => toastError('فشل تحميل تفاصيل النتيجة'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAttempt();
  }, [attemptId]);

  const handleGradeEssay = async (answerId: string, maxPoints: number) => {
    const item = gradingState[answerId];
    if (!item) return;

    if (item.points < 0 || item.points > maxPoints) {
      toastError(`الدرجة يجب أن تكون بين 0 و ${maxPoints}`);
      return;
    }

    setGradingState((prev) => ({
      ...prev,
      [answerId]: { ...prev[answerId], saving: true },
    }));

    try {
      const res = await fetch(`/api/teacher/results/${attemptId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answerId,
          pointsAwarded: Number(item.points),
          teacherFeedback: item.feedback,
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'فشل حفظ التصحيح');

      success('تم حفظ تصحيح السؤال وتحديث المجموع بنجاح ✓');
      loadAttempt();
    } catch (err: any) {
      toastError(err.message || 'حدث خطأ أثناء حفظ التصحيح');
    } finally {
      setGradingState((prev) => ({
        ...prev,
        [answerId]: { ...prev[answerId], saving: false },
      }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  const { attempt, exam, questions } = data;

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header & Back */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/teacher/results"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 mb-2 transition"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لقائمة النتائج</span>
          </Link>
          <h1 className="text-2xl font-black text-slate-900">
            تفاصيل نتيجة الطالب: {attempt.studentName}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            اختبار: <span className="font-bold text-slate-800">{exam.title}</span> ({exam.code})
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>طباعة تقرير النتيجة</span>
        </button>
      </div>

      {/* Student Profile & Scores Summary Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Info Col 1 */}
        <div className="space-y-3">
          <span className="text-xs font-black text-slate-400 block uppercase">بيانات الطالب</span>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <User className="w-4 h-4 text-slate-400" />
            <span>{attempt.studentName}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 font-mono" dir="ltr">
            <Phone className="w-4 h-4 text-slate-400" />
            <span>{attempt.studentPhone || 'بدون هاتف'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Users className="w-4 h-4 text-slate-400" />
            <span>المجموعة: {attempt.studentGroup}</span>
          </div>
        </div>

        {/* Info Col 2: Time & Submissions */}
        <div className="space-y-3">
          <span className="text-xs font-black text-slate-400 block uppercase">تفاصيل التسليم</span>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>وقت الحل المستغرق: {formatTime(attempt.timeSpentSeconds)}</span>
          </div>
          <div className="text-xs font-medium text-slate-500">
            تاريخ الإرسال: {new Date(attempt.submittedAt).toLocaleString('ar-EG')}
          </div>
          <div>
            {attempt.pendingEssayCount > 0 ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-lg border border-amber-200">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>يوجد {attempt.pendingEssayCount} سؤال مقالي بانتظار تصحيحك</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>تم تصحيح جميع الأسئلة بالكامل</span>
              </span>
            )}
          </div>
        </div>

        {/* Info Col 3: Score Badge */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white flex flex-col justify-between text-center">
          <span className="text-xs font-bold text-slate-300">الدرجة النهائية والنسبة</span>
          <div className="my-2">
            <div className="text-3xl font-black font-mono">
              {attempt.totalScore} / {attempt.maxScore}
            </div>
            <div
              className={`text-lg font-black mt-1 ${
                attempt.percentage >= 50 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {attempt.percentage}% • {attempt.isPassed ? 'ناجح ✓' : 'راسب ✗'}
            </div>
          </div>
          <div className="text-[11px] text-slate-400 font-semibold border-t border-white/10 pt-2 flex justify-around">
            <span>MCQ: {attempt.mcqScore}</span>
            <span>مقالي: {attempt.essayScore}</span>
          </div>
        </div>
      </div>

      {/* Question by Question Detailed Breakdown */}
      <div className="space-y-6">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-brand-600" />
          <span>إجابات الطالب وتفاصيل الأسئلة ({questions.length})</span>
        </h2>

        {questions.map((q: any, idx: number) => {
          const studentAns = q.studentAnswer;
          const isMCQ = q.type === 'mcq';
          const isCorrectMCQ = isMCQ && studentAns.isCorrect;
          const isWrongMCQ = isMCQ && studentAns.isCorrect === false;
          const isPendingEssay = q.type === 'essay' && studentAns.needsGrading;

          return (
            <div
              key={q.questionId}
              className={`bg-white rounded-3xl p-6 sm:p-7 border shadow-sm space-y-4 ${
                isCorrectMCQ
                  ? 'border-emerald-200'
                  : isWrongMCQ
                  ? 'border-rose-200'
                  : isPendingEssay
                  ? 'border-amber-300 ring-2 ring-amber-50'
                  : 'border-slate-200'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {isMCQ ? 'اختيار من متعدد' : 'سؤال مقالي'}
                  </span>

                  {isMCQ && (
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black ${
                        isCorrectMCQ
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isCorrectMCQ ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span>{isCorrectMCQ ? 'إجابة صحيحة' : 'إجابة خاطئة'}</span>
                    </span>
                  )}

                  {!isMCQ && (
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black ${
                        isPendingEssay
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {isPendingEssay ? <AlertCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                      <span>{isPendingEssay ? 'بانتظار تصحيحك' : 'تم التصحيح'}</span>
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-700 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200">
                  الدرجة: {studentAns.pointsAwarded} / {q.maxPoints}
                </div>
              </div>

              {/* Question Text */}
              <div
                className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizeRichText(q.questionText) }}
              />

              {/* MCQ Options Display */}
              {isMCQ && (
                <div className="space-y-2 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt: any) => {
                      const isChosenByStudent = studentAns.selectedOption === opt.key;
                      const isTheCorrectOption = q.correctOptionId === opt.key;

                      let style = 'bg-slate-50 border-slate-200 text-slate-700';
                      if (isTheCorrectOption) {
                        style = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                      }
                      if (isChosenByStudent && !isTheCorrectOption) {
                        style = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                      }

                      return (
                        <div
                          key={opt.key}
                          className={`p-3 rounded-2xl border flex items-center justify-between text-xs transition ${style}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold">
                              {opt.key === 'a'
                                ? 'أ'
                                : opt.key === 'b'
                                ? 'ب'
                                : opt.key === 'c'
                                ? 'ج'
                                : opt.key === 'd'
                                ? 'د'
                                : opt.key.toUpperCase()}
                            </span>
                            <span dangerouslySetInnerHTML={{ __html: sanitizeRichText(opt.text) }} />
                          </div>

                          <div className="flex items-center gap-1.5 font-bold text-[10px]">
                            {isChosenByStudent && (
                              <span className="px-2 py-0.5 rounded bg-slate-900 text-white">
                                إجابة الطالب
                              </span>
                            )}
                            {isTheCorrectOption && (
                              <span className="px-2 py-0.5 rounded bg-emerald-600 text-white">
                                الإجابة الصحيحة ✓
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Essay Student Answer & Interactive Manual Grading Form */}
              {!isMCQ && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">
                      إجابة الطالب كما كتبها:
                    </label>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-wrap">
                      {studentAns.essayAnswer || 'لم يكتب الطالب إجابة لهذا السؤال.'}
                    </div>
                  </div>

                  {/* Grading Panel for Teacher */}
                  {studentAns.answerId && (
                    <div className="p-5 rounded-2xl bg-brand-50/70 border border-brand-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-brand-900 flex items-center gap-1.5">
                          <MessageSquare className="w-4 h-4 text-brand-600" />
                          <span>لوحة تصحيح السؤال المقالي</span>
                        </span>
                        <span className="text-xs font-bold text-slate-600">
                          الحد الأقصى للدرجة: {q.maxPoints}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div className="sm:col-span-1">
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            الدرجة الممنوحة
                          </label>
                          <input
                            type="number"
                            min="0"
                            max={q.maxPoints}
                            value={gradingState[studentAns.answerId]?.points ?? 0}
                            onChange={(e) =>
                              setGradingState((prev) => ({
                                ...prev,
                                [studentAns.answerId]: {
                                  ...prev[studentAns.answerId],
                                  points: Number(e.target.value),
                                },
                              }))
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-center"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            ملاحظات وتعليقات المعلم للطالب
                          </label>
                          <input
                            type="text"
                            placeholder="اكتب ملاحظة أو توجيهاً للطالب حول إجابته..."
                            value={gradingState[studentAns.answerId]?.feedback ?? ''}
                            onChange={(e) =>
                              setGradingState((prev) => ({
                                ...prev,
                                [studentAns.answerId]: {
                                  ...prev[studentAns.answerId],
                                  feedback: e.target.value,
                                },
                              }))
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          disabled={gradingState[studentAns.answerId]?.saving}
                          onClick={() => handleGradeEssay(studentAns.answerId, q.maxPoints)}
                          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition disabled:opacity-50"
                        >
                          {gradingState[studentAns.answerId]?.saving ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Save className="w-3.5 h-3.5" />
                          )}
                          <span>حفظ تصحيح السؤال</span>
                        </button>
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
