'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Send,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Save,
  Check,
  ShieldCheck,
  GraduationCap,
  Loader2,
  FileCheck,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Modal } from '@/components/ui/Modal';
import { formatTime, sanitizeRichText } from '@/lib/utils';

interface QuestionOption {
  key: string;
  text: string;
}

interface Question {
  id: string;
  questionNumber: number;
  type: 'mcq' | 'essay';
  questionText: string;
  points: number;
  options: QuestionOption[];
}

interface ExamData {
  id: string;
  code: string;
  title: string;
  description?: string;
  durationMinutes?: number | null;
  allowMultipleAttempts: boolean;
  requirePhone: boolean;
  requireGroup: boolean;
  groupsList: string[];
  totalPoints: number;
  questionsCount: number;
}

interface StudentAnswerState {
  questionId: string;
  selectedOption?: string;
  essayAnswer?: string;
}

export default function StudentExamPage() {
  const params = useParams();
  const router = useRouter();
  const code = (params.code as string)?.toUpperCase();

  // Loading & Exam Info State
  const [exam, setExam] = useState<ExamData | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Gate Form State
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentGroup, setStudentGroup] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [startingAttempt, setStartingAttempt] = useState(false);

  // Active Exam Session State
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, StudentAnswerState>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedAttempt, setCompletedAttempt] = useState<any>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [recoveredDraft, setRecoveredDraft] = useState(false);

  // Helper for localStorage key
  const getDraftKey = (examId: string, phone: string) => `exam_draft_${examId}_${phone.trim()}`;

  // Network Online/Offline Monitoring
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch Exam Data (Loaded ONLY ONCE)
  useEffect(() => {
    if (!code) return;
    fetch(`/api/public/exams/${code}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'فشل تحميل بيانات الاختبار');
        }
        setExam(data.exam);
        setQuestions(data.questions);

        // Check if there is an existing draft saved in LocalStorage for this exam
        try {
          const storedKeys = Object.keys(localStorage);
          const examDraftKey = storedKeys.find((k) => k.startsWith(`exam_draft_${data.exam.id}_`));
          if (examDraftKey) {
            const rawDraft = localStorage.getItem(examDraftKey);
            if (rawDraft) {
              const draft = JSON.parse(rawDraft);
              if (draft.studentName && draft.attemptId && !draft.isCompleted) {
                setStudentName(draft.studentName || '');
                setStudentPhone(draft.studentPhone || '');
                setStudentGroup(draft.studentGroup || '');
                setAttemptId(draft.attemptId);
                setAnswers(draft.answers || {});
                setCurrentQuestionIndex(draft.currentQuestionIndex || 0);
                setTimeSpent(draft.timeSpent || 0);
                if (draft.timeLeftSeconds !== undefined && draft.timeLeftSeconds !== null) {
                  setTimeLeftSeconds(draft.timeLeftSeconds);
                } else if (data.exam.durationMinutes) {
                  const remaining = Math.max(0, (data.exam.durationMinutes * 60) - (draft.timeSpent || 0));
                  setTimeLeftSeconds(remaining);
                }
                setConsentAccepted(true);
                setIsExamStarted(true);
                setRecoveredDraft(true);
              }
            }
          }
        } catch (e) {
          console.warn('LocalStorage draft check error:', e);
        }
      })
      .catch((err: any) => {
        setErrorMsg(err.message || 'حدث خطأ أثناء تحميل الاختبار');
      })
      .finally(() => setLoading(false));
  }, [code]);

  // Instant LocalStorage Autosave (NO NETWORK REQUESTS ON ANSWERS)
  useEffect(() => {
    if (!isExamStarted || !exam || !attemptId || isCompleted) return;

    try {
      const draftData = {
        examId: exam.id,
        examCode: exam.code,
        attemptId,
        studentName,
        studentPhone,
        studentGroup,
        answers,
        currentQuestionIndex,
        timeSpent,
        timeLeftSeconds,
        isCompleted: false,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(getDraftKey(exam.id, studentPhone), JSON.stringify(draftData));
    } catch (e) {
      console.warn('Local autosave error:', e);
    }
  }, [isExamStarted, exam, attemptId, answers, currentQuestionIndex, timeSpent, timeLeftSeconds, isCompleted]);

  // Timer Effect (Updates locally every second)
  useEffect(() => {
    if (!isExamStarted || isCompleted) return;

    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);

      if (timeLeftSeconds !== null) {
        setTimeLeftSeconds((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            clearInterval(timer);
            handleFinalSubmit(true); // Auto-submit on time expiration
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamStarted, isCompleted, timeLeftSeconds]);

  // Start Exam (1 request to create attempt, or restore from local draft)
  const handleStartExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exam) return;

    if (!studentName.trim()) {
      setErrorMsg('يرجى إدخال اسمك بالكامل');
      return;
    }
    if (exam.requirePhone && (!studentPhone.trim() || studentPhone.trim().length < 6)) {
      setErrorMsg('يرجى إدخال رقم هاتف صحيح');
      return;
    }
    if (exam.requireGroup && (!studentGroup || studentGroup.trim() === '')) {
      setErrorMsg('يرجى اختيار المجموعة الدراسية');
      return;
    }
    if (!consentAccepted) {
      setErrorMsg('يرجى الموافقة على تسجيل البيانات لبدء الاختبار');
      return;
    }

    setErrorMsg('');

    // Check if we already have a local attempt draft for this phone
    const existingDraftRaw = localStorage.getItem(getDraftKey(exam.id, studentPhone));
    if (existingDraftRaw) {
      try {
        const draft = JSON.parse(existingDraftRaw);
        if (draft.attemptId && !draft.isCompleted) {
          setAttemptId(draft.attemptId);
          setAnswers(draft.answers || {});
          setCurrentQuestionIndex(draft.currentQuestionIndex || 0);
          setTimeSpent(draft.timeSpent || 0);
          if (draft.timeLeftSeconds !== undefined && draft.timeLeftSeconds !== null) {
            setTimeLeftSeconds(draft.timeLeftSeconds);
          } else if (exam.durationMinutes) {
            setTimeLeftSeconds(Math.max(0, (exam.durationMinutes * 60) - (draft.timeSpent || 0)));
          }
          setIsExamStarted(true);
          setRecoveredDraft(true);
          return;
        }
      } catch {}
    }

    setStartingAttempt(true);

    try {
      const res = await fetch('/api/student/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examId: exam.id,
          studentName,
          studentPhone,
          studentGroup,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'فشل بدء الاختبار');
      }

      setAttemptId(data.attemptId);
      if (exam.durationMinutes) {
        setTimeLeftSeconds(exam.durationMinutes * 60);
      }
      setIsExamStarted(true);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setStartingAttempt(false);
    }
  };

  // Instant local answer selection (Zero HTTP request)
  const handleSelectOption = (questionId: string, optionKey: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        questionId,
        selectedOption: optionKey,
      },
    }));
  };

  // Instant local essay input (Zero HTTP request)
  const handleEssayChange = (questionId: string, text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        questionId,
        essayAnswer: text,
      },
    }));
  };

  // Single-Batch Final Submit Handler ("حفظ وإرسال الإجابات")
  const handleFinalSubmit = async (isAuto: boolean = false) => {
    if (!attemptId || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);
    setShowConfirmModal(false);

    try {
      const answersArray = questions.map((q) => {
        const saved = answers[q.id];
        return {
          questionId: q.id,
          selectedOption: saved?.selectedOption || undefined,
          essayAnswer: saved?.essayAnswer || undefined,
        };
      });

      const res = await fetch('/api/student/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attemptId,
          timeSpentSeconds: timeSpent,
          answers: answersArray,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'فشل تسليم الاختبار إلى السيرفر');
      }

      // Success: Clear local storage draft for this attempt ONLY
      if (exam) {
        localStorage.removeItem(getDraftKey(exam.id, studentPhone));
      }

      setIsCompleted(true);
      setCompletedAttempt(data.attempt);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {}
    } catch (err: any) {
      const errorText = err.message || 'حدث خطأ في الاتصال أثناء تسليم الاختبار. إجاباتك محفوظة على جهازك، يرجى المحاولة مجدداً.';
      setSubmitError(errorText);
      alert(errorText);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-brand-600 animate-spin mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-600">جاري تحميل الاختبار...</p>
        </div>
      </div>
    );
  }

  if (errorMsg && !isExamStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
          <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">تنبيه</h2>
          <p className="text-sm font-semibold text-slate-600 mb-6">{errorMsg}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للصفحة الرئيسية</span>
          </Link>
        </div>
      </div>
    );
  }

  if (!exam) return null;

  // -------------------------------------------------------------
  // SCREEN 3: COMPLETION / SUCCESS SCREEN
  // -------------------------------------------------------------
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50/40 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-2xl text-center animate-fade-in">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-lg border border-emerald-200 mb-3">
            تم التسليم بنجاح ✓
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
            تم إرسال الاختبار بنجاح!
          </h1>

          <p className="text-sm font-medium text-slate-600 leading-relaxed mb-8">
            شكراً لك <span className="font-bold text-slate-900">{studentName}</span>. تم تسجيل جميع إجاباتك وإرسال نتيجتك مباشرة إلى لوحة تحكم المعلم المسؤول.
          </p>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-right space-y-3 mb-8 text-xs font-semibold text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-500">اسم الاختبار:</span>
              <span className="font-bold text-slate-900">{exam.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">اسم الطالب:</span>
              <span className="font-bold text-slate-900">{studentName}</span>
            </div>
            {studentGroup && (
              <div className="flex justify-between">
                <span className="text-slate-500">المجموعة:</span>
                <span className="font-bold text-slate-900">{studentGroup}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-500">زمن الحل المستغرق:</span>
              <span className="font-bold text-slate-900">{formatTime(timeSpent)}</span>
            </div>
          </div>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition"
          >
            <span>العودة للصفحة الرئيسية</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SCREEN 1: GATE / STUDENT INFORMATION SCREEN (ZERO USER ACCOUNT)
  // -------------------------------------------------------------
  if (!isExamStarted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-8 px-4">
        <div className="max-w-xl w-full mx-auto my-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 mb-6 transition"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للامتحانات المتاحة</span>
          </Link>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-black rounded-lg border border-brand-200">
                كود: {exam.code}
              </span>
              {exam.durationMinutes && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{exam.durationMinutes} دقيقة</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 leading-snug">
              {exam.title}
            </h1>

            {exam.description && (
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-6">
                {exam.description}
              </p>
            )}

            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 mb-8 text-xs font-semibold text-slate-700">
              <div>
                <span className="text-slate-400 block mb-1">عدد الأسئلة</span>
                <span className="text-base font-bold text-slate-900">{questions.length} سؤال</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">إجمالي الدرجات</span>
                <span className="text-base font-bold text-slate-900">{exam.totalPoints} درجة</span>
              </div>
            </div>

            <h2 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-brand-600" />
              <span>بيانات الطالب قبل بدء الاختبار</span>
            </h2>

            {errorMsg && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleStartExam} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  الاسم بالكامل <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="اكتب اسمك الثلاثي أو الرباعي..."
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition font-medium"
                />
              </div>

              {exam.requirePhone && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    رقم الهاتف <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="010xxxxxxxx"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition font-medium text-left"
                    dir="ltr"
                  />
                </div>
              )}

              {exam.requireGroup && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    المجموعة الدراسية <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    value={studentGroup}
                    onChange={(e) => setStudentGroup(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition font-medium"
                  >
                    <option value="">اختر المجموعة...</option>
                    {exam.groupsList && exam.groupsList.length > 0 ? (
                      exam.groupsList.map((g, idx) => (
                        <option key={idx} value={g}>
                          {g}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="المجموعة الأولى">المجموعة الأولى</option>
                        <option value="المجموعة الثانية">المجموعة الثانية</option>
                        <option value="مجموعة A">مجموعة A</option>
                      </>
                    )}
                  </select>
                </div>
              )}

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consentAccepted}
                    onChange={(e) => setConsentAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                  />
                  <span className="text-xs font-semibold text-slate-600 leading-relaxed">
                    أوافق على تسجيل بياناتي وإجاباتي ونتيجة الاختبار وإرسالها إلى المعلم المسؤول عن الاختبار.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={startingAttempt}
                className="w-full mt-6 py-4 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-black text-sm shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {startingAttempt ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>جاري تجهيز الامتحان...</span>
                  </>
                ) : (
                  <>
                    <span>بدء الاختبار الآن</span>
                    <ArrowLeft className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SCREEN 2: INTERACTIVE EXAM ENGINE
  // -------------------------------------------------------------
  const currentQ = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  const currentAnswer = answers[currentQ?.id];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      {/* Sticky Exam Header with Timer, Network Status & Progress */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-sm sm:text-base font-black text-slate-900 truncate max-w-xs sm:max-w-md">
              {exam.title}
            </h1>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mt-0.5">
              <span>الطالب: {studentName}</span>

              {/* Offline / Online Status Indicator */}
              {!isOnline ? (
                <span className="text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 text-[11px] font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>انقطع الإنترنت (الإجابات محفوظة محلياً)</span>
                </span>
              ) : (
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px] font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>حفظ تلقائي محلي فوري</span>
                </span>
              )}
            </div>
          </div>

          {/* Timer Display */}
          {timeLeftSeconds !== null ? (
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm font-bold border transition ${
                timeLeftSeconds < 300
                  ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse'
                  : 'bg-amber-50 border-amber-200 text-amber-700'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeftSeconds)}</span>
            </div>
          ) : (
            <div className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              الوقت: مفتوح
            </div>
          )}
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5">
          <div
            className="bg-brand-600 h-1.5 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </header>

      {/* Recovered Draft Notice */}
      {recoveredDraft && (
        <div className="max-w-4xl mx-auto w-full px-4 pt-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-blue-900 text-xs font-bold flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>تم استرجاع مسودة إجاباتك السابقة المحفوظة بأمان على جهازك.</span>
            </div>
            <button
              onClick={() => setRecoveredDraft(false)}
              className="text-blue-700 hover:text-blue-900 text-[11px] underline"
            >
              إخفاء
            </button>
          </div>
        </div>
      )}

      {/* Network Error on Submit Notice */}
      {submitError && (
        <div className="max-w-4xl mx-auto w-full px-4 pt-4">
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 text-xs font-bold flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span>{submitError}</span>
            </div>
            <button
              onClick={() => handleFinalSubmit(false)}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition flex items-center gap-1.5 flex-shrink-0"
            >
              {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5" />}
              <span>إعادة محاولة الإرسال</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Question Container */}
      <main className="max-w-4xl w-full mx-auto px-4 py-8 flex-1 flex flex-col justify-between">
        {currentQ && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md animate-fade-in flex flex-col flex-1">
            {/* Question Header & Points */}
            <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-black rounded-lg border border-brand-200">
                السؤال {currentQuestionIndex + 1} من {questions.length}
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                {currentQ.points} {currentQ.points === 1 ? 'درجة' : 'درجات'}
              </span>
            </div>

            {/* Question Text */}
            <div
              className="text-base sm:text-xl font-bold text-slate-900 leading-relaxed mb-8"
              dangerouslySetInnerHTML={{ __html: sanitizeRichText(currentQ.questionText) }}
            />

            {/* Interactive MCQ Choice Buttons */}
            {currentQ.type === 'mcq' && (
              <div className="space-y-3.5 my-auto">
                {currentQ.options.map((option) => {
                  const isSelected = currentAnswer?.selectedOption === option.key;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => handleSelectOption(currentQ.id, option.key)}
                      className={`w-full p-4 sm:p-5 rounded-2xl border-2 text-right transition-all duration-200 flex items-center justify-between gap-4 group ${
                        isSelected
                          ? 'bg-brand-50/80 border-brand-600 shadow-md shadow-brand-500/10 text-brand-950 font-bold'
                          : 'bg-white hover:bg-slate-50/80 border-slate-200 text-slate-800 font-semibold'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black transition ${
                            isSelected
                              ? 'bg-brand-600 text-white'
                              : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                          }`}
                        >
                          {option.key === 'a'
                            ? 'أ'
                            : option.key === 'b'
                            ? 'ب'
                            : option.key === 'c'
                            ? 'ج'
                            : option.key === 'd'
                            ? 'د'
                            : option.key.toUpperCase()}
                        </span>
                        <span
                          className="text-sm sm:text-base leading-snug"
                          dangerouslySetInnerHTML={{ __html: sanitizeRichText(option.text) }}
                        />
                      </div>

                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                          isSelected ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Essay Question Textarea */}
            {currentQ.type === 'essay' && (
              <div className="my-auto space-y-2">
                <label className="block text-xs font-bold text-slate-500">
                  اكتب إجابتك النموذجية في المربع أدناه:
                </label>
                <textarea
                  rows={7}
                  placeholder="اكتب إجابتك هنا بالتفصيل..."
                  value={currentAnswer?.essayAnswer || ''}
                  onChange={(e) => handleEssayChange(currentQ.id, e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition font-medium leading-relaxed resize-y"
                ></textarea>
              </div>
            )}
          </div>
        )}

        {/* Bottom Navigation Controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
              <span>السؤال السابق</span>
            </button>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
              >
                <span>السؤال التالي</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            ) : null}
          </div>

          {/* Quick Palette Overview */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
            {questions.map((q, idx) => {
              const answered =
                q.type === 'mcq'
                  ? !!answers[q.id]?.selectedOption
                  : !!answers[q.id]?.essayAnswer?.trim();
              const isCurrent = idx === currentQuestionIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                    isCurrent
                      ? 'ring-2 ring-brand-600 bg-brand-600 text-white'
                      : answered
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={() => setShowConfirmModal(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md shadow-emerald-600/20 transition"
          >
            <Send className="w-4 h-4" />
            <span>حفظ وإرسال الإجابات</span>
          </button>
        </div>
      </main>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="تأكيد حفظ وإرسال الإجابات"
      >
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900">
            هل أنت متأكد من حفظ وإرسال جميع إجاباتك؟
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            سيتم إرسال كافة إجاباتك للسيرفر في طلب واحد وحساب نتيجتك وحفظها، ولن تتمكن من تعديل الإجابات بعد الإرسال.
          </p>

          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowConfirmModal(false)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition"
            >
              إلغاء والعودة للأسئلة
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleFinalSubmit(false)}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md transition flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري الإرسال...</span>
                </>
              ) : (
                <span>نعم، حفظ وإرسال الإجابات الآن</span>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


