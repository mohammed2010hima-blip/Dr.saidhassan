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
  Download,
  ChevronLeft,
  User,
  Phone,
  Users,
  FileCheck
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
  const [downloading, setDownloading] = useState(false);
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

  // Generate and Download Full Student Answers Report
  const handleDownloadAnswersReport = () => {
    if (!data) return;
    setDownloading(true);

    const escapeHtml = (str: string | null | undefined) => {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const { attempt, exam, questions } = data;

    const questionsHtml = questions
      .map((q: any, idx: number) => {
        const studentAns = q.studentAnswer;
        const isMCQ = q.type === 'mcq';
        const isCorrectMCQ = isMCQ && studentAns.isCorrect;
        const isWrongMCQ = isMCQ && studentAns.isCorrect === false;

        let optionsHtml = '';
        if (isMCQ) {
          optionsHtml = `
            <div style="margin-top: 12px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
              ${q.options
                .map((opt: any) => {
                  const isChosen = studentAns.selectedOption === opt.key;
                  const isCorrect = q.correctOptionId === opt.key;
                  let bg = '#F9F8F6';
                  let border = '#E5E0D8';
                  let badge = '';

                  if (isCorrect) {
                    bg = '#ECFDF5';
                    border = '#10B981';
                    badge = '<span style="background:#10B981; color:#fff; padding:2px 8px; border-radius:6px; font-size:11px; margin-right:auto;">الإجابة النموذجية ✓</span>';
                  }
                  if (isChosen && !isCorrect) {
                    bg = '#FEF2F2';
                    border = '#EF4444';
                    badge = '<span style="background:#EF4444; color:#fff; padding:2px 8px; border-radius:6px; font-size:11px; margin-right:auto;">إجابة الطالب ✗</span>';
                  } else if (isChosen && isCorrect) {
                    badge = '<span style="background:#10B981; color:#fff; padding:2px 8px; border-radius:6px; font-size:11px; margin-right:auto;">إجابة الطالب (صحيحة ✓)</span>';
                  }

                  return `
                    <div style="padding: 10px 14px; background: ${bg}; border: 1.5px solid ${border}; border-radius: 12px; font-size: 13px; display: flex; align-items: center; justify-content: space-between;">
                      <div>
                        <strong style="margin-left: 8px;">[ ${opt.key.toUpperCase()} ]</strong>
                        <span>${escapeHtml(opt.text)}</span>
                      </div>
                      ${badge}
                    </div>
                  `;
                })
                .join('')}
            </div>
          `;
        } else {
          optionsHtml = `
            <div style="margin-top: 12px; padding: 14px; background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 12px;">
              <strong style="display:block; margin-bottom: 6px; color:#475569; font-size: 12px;">إجابة الطالب:</strong>
              <div style="font-size: 14px; color:#0F172A; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(studentAns.essayAnswer) || 'لم تتم كتابة إجابة.'}</div>
              ${
                studentAns.teacherFeedback
                  ? `<div style="margin-top: 10px; padding: 10px; background: #FEF3C7; border-radius: 8px; color: #92400E; font-size: 12px;"><strong>تعليق المعلم:</strong> ${escapeHtml(studentAns.teacherFeedback)}</div>`
                  : ''
              }
            </div>
          `;
        }

        return `
          <div style="margin-bottom: 24px; padding: 18px; border: 1px solid #E2D9CC; border-radius: 16px; background: #FFFDFB; page-break-inside: avoid;">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #F0EAE1; padding-bottom: 10px; margin-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="background: #800020; color: #fff; width: 26px; height: 26px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">${idx + 1}</span>
                <span style="font-size: 12px; font-weight: bold; color: #660019;">${isMCQ ? 'اختيار من متعدد' : 'سؤال مقالي'}</span>
                ${
                  isMCQ
                    ? isCorrectMCQ
                      ? '<span style="background:#D1FAE5; color:#065F46; padding:2px 8px; border-radius:6px; font-size:11px; font-weight:bold;">صحيحة ✓</span>'
                      : '<span style="background:#FEE2E2; color:#991B1B; padding:2px 8px; border-radius:6px; font-size:11px; font-weight:bold;">خاطئة ✗</span>'
                    : ''
                }
              </div>
              <span style="font-size: 12px; font-weight: bold; color: #800020; background: #FDF2F4; padding: 4px 10px; border-radius: 8px; border: 1px solid #F8CFD5;">
                الدرجة: ${studentAns.pointsAwarded} / ${q.maxPoints}
              </span>
            </div>

            ${q.passage ? `<div style="padding: 10px 14px; background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 10px; font-size: 13px; color: #78350F; margin-bottom: 12px; line-height: 1.6; white-space: pre-line;"><strong>القطعة / الأبيات:</strong><br/>${escapeHtml(q.passage)}</div>` : ''}

            <div style="font-size: 15px; font-weight: bold; color: #2A080B; line-height: 1.7; margin-bottom: 8px;">
              ${escapeHtml(q.questionText)}
            </div>

            ${optionsHtml}
          </div>
        `;
      })
      .join('');

    const fullHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>تقرير إجابات الطالب - ${escapeHtml(attempt.studentName)} - ${escapeHtml(exam.title)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@400;600;700;900&display=swap');
    body {
      font-family: 'Cairo', 'Amiri', Tahoma, sans-serif;
      background: #FDFBF7;
      color: #2A080B;
      padding: 30px;
      margin: 0;
      direction: rtl;
    }
    .header-card {
      background: linear-gradient(135deg, #4D0013, #800020);
      color: white;
      padding: 24px 30px;
      border-radius: 20px;
      margin-bottom: 25px;
      box-shadow: 0 8px 25px rgba(128, 0, 32, 0.25);
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin-top: 15px;
      border-top: 1px solid rgba(255,255,255,0.2);
      padding-top: 15px;
      font-size: 13px;
    }
    .score-badge {
      background: #D4AF37;
      color: #2A080B;
      padding: 8px 16px;
      border-radius: 12px;
      font-weight: 900;
      font-size: 18px;
      display: inline-block;
    }
    @media print {
      body { padding: 0; background: #fff; }
      .header-card { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="header-card">
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <div>
        <h1 style="margin: 0; font-size: 22px; font-weight: 900;">منصة د. سعيد حسن التعليمية</h1>
        <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">تقرير إجابات الطالب التفصيلي</p>
      </div>
      <div class="score-badge">
        ${attempt.totalScore} / ${attempt.maxScore} (${attempt.percentage}%) • ${attempt.isPassed ? 'ناجح' : 'راسب'}
      </div>
    </div>

    <div class="info-grid">
      <div><strong>الطالب:</strong> ${escapeHtml(attempt.studentName)}</div>
      <div><strong>الهاتف:</strong> ${escapeHtml(attempt.studentPhone) || 'غير مسجل'}</div>
      <div><strong>المجموعة:</strong> ${escapeHtml(attempt.studentGroup)}</div>
      <div><strong>الاختبار:</strong> ${escapeHtml(exam.title)} (${escapeHtml(exam.code)})</div>
      <div><strong>تاريخ التسليم:</strong> ${new Date(attempt.submittedAt).toLocaleString('ar-EG')}</div>
      <div><strong>الوقت المستغرق:</strong> ${formatTime(attempt.timeSpentSeconds)}</div>
    </div>
  </div>

  <h2 style="font-size: 18px; color: #800020; margin-bottom: 16px; border-bottom: 2px solid #800020; padding-bottom: 8px;">
    تفاصيل الأسئلة وإجابات الطالب (${questions.length} سؤال)
  </h2>

  <div>
    ${questionsHtml}
  </div>

  <div style="text-align: center; margin-top: 40px; padding: 20px; border-top: 1px solid #E2D9CC; font-size: 12px; color: #800020; font-weight: bold;">
    تم استخراج هذا التقرير رسمياً من منصة د. سعيد حسن التعليمية للغة العربية
  </div>
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `تقرير_اجابات_${attempt.studentName.replace(/\s+/g, '_')}_${exam.code}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloading(false);
    success('تم تحميل ملف إجابات الطالب بنجاح ✓');
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#800020] animate-spin" />
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
            className="inline-flex items-center gap-2 text-xs font-bold text-[#800020]/70 hover:text-[#800020] mb-2 transition"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لقائمة النتائج</span>
          </Link>
          <h1 className="text-2xl font-black text-[#800020] dark:text-[#F3E5AB]">
            تفاصيل نتيجة الطالب: {attempt.studentName}
          </h1>
          <p className="text-xs text-[#660019] dark:text-[#D8C4AC] font-medium mt-1">
            اختبار: <span className="font-bold text-[#800020] dark:text-[#F3E5AB]">{exam.title}</span> ({exam.code})
          </p>
        </div>

        {/* Action Buttons: Print & Download Answers File */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <button
            onClick={handleDownloadAnswersReport}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#800020] to-[#E11D48] hover:from-[#660019] hover:to-[#C0153D] text-white text-xs font-black shadow-md shadow-[#800020]/25 transition"
          >
            {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>تحميل ملف إجابات الطالب</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-white dark:bg-[#1E0709] hover:bg-[#FDF2F4] text-[#800020] dark:text-[#F3E5AB] text-xs font-bold transition shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة تقرير النتيجة</span>
          </button>
        </div>
      </div>

      {/* Student Profile & Scores Summary Banner */}
      <div className="bg-[#FFFDF9] dark:bg-[#1E0709] rounded-3xl p-6 sm:p-8 border border-[#800020]/15 dark:border-[#D4AF37]/25 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Info Col 1 */}
        <div className="space-y-3">
          <span className="text-xs font-black text-[#800020]/60 dark:text-[#D4AF37] block uppercase">بيانات الطالب</span>
          <div className="flex items-center gap-2 text-sm font-bold text-[#800020] dark:text-[#F5EFEB]">
            <User className="w-4 h-4 text-[#800020]/50 dark:text-[#D4AF37]" />
            <span>{attempt.studentName}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#660019] dark:text-[#D8C4AC] font-mono" dir="ltr">
            <Phone className="w-4 h-4 text-[#800020]/50 dark:text-[#D4AF37]" />
            <span>{attempt.studentPhone || 'بدون هاتف'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#660019] dark:text-[#D8C4AC]">
            <Users className="w-4 h-4 text-[#800020]/50 dark:text-[#D4AF37]" />
            <span>المجموعة: {attempt.studentGroup}</span>
          </div>
        </div>

        {/* Info Col 2: Time & Submissions */}
        <div className="space-y-3">
          <span className="text-xs font-black text-[#800020]/60 dark:text-[#D4AF37] block uppercase">تفاصيل التسليم</span>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#660019] dark:text-[#D8C4AC]">
            <Clock className="w-4 h-4 text-[#800020]/50 dark:text-[#D4AF37]" />
            <span>وقت الحل المستغرق: {formatTime(attempt.timeSpentSeconds)}</span>
          </div>
          <div className="text-xs font-medium text-[#660019]/80 dark:text-[#D8C4AC]/80">
            تاريخ الإرسال: {new Date(attempt.submittedAt).toLocaleString('ar-EG')}
          </div>
          <div>
            {attempt.pendingEssayCount > 0 ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 text-xs font-bold rounded-lg border border-amber-200">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>يوجد {attempt.pendingEssayCount} سؤال مقالي بانتظار تصحيحك</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>تم تصحيح جميع الأسئلة بالكامل</span>
              </span>
            )}
          </div>
        </div>

        {/* Info Col 3: Score Badge */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#4D0013] via-[#800020] to-[#2A080B] text-white flex flex-col justify-between text-center shadow-lg border border-[#D4AF37]/30">
          <span className="text-xs font-bold text-[#F3E5AB]">الدرجة النهائية والنسبة</span>
          <div className="my-2">
            <div className="text-3xl font-black font-mono text-[#F3E5AB]">
              {attempt.totalScore} / {attempt.maxScore}
            </div>
            <div
              className={`text-lg font-black mt-1 ${
                attempt.percentage >= 50 ? 'text-emerald-300' : 'text-rose-300'
              }`}
            >
              {attempt.percentage}% • {attempt.isPassed ? 'ناجح ✓' : 'راسب ✗'}
            </div>
          </div>
          <div className="text-[11px] text-[#D8C4AC] font-semibold border-t border-white/15 pt-2 flex justify-around">
            <span>MCQ: {attempt.mcqScore}</span>
            <span>مقالي: {attempt.essayScore}</span>
          </div>
        </div>
      </div>

      {/* Question by Question Detailed Breakdown */}
      <div className="space-y-6">
        <h2 className="text-lg font-black text-[#800020] dark:text-[#F3E5AB] flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#800020] dark:text-[#D4AF37]" />
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
              className={`bg-[#FFFDF9] dark:bg-[#1E0709] rounded-3xl p-6 sm:p-7 border shadow-sm space-y-4 transition ${
                isCorrectMCQ
                  ? 'border-emerald-300'
                  : isWrongMCQ
                  ? 'border-rose-300'
                  : isPendingEssay
                  ? 'border-amber-400 ring-2 ring-amber-100'
                  : 'border-[#800020]/15 dark:border-[#D4AF37]/25'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#800020]/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#800020] text-white flex items-center justify-center text-xs font-black">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-[#660019] dark:text-[#D8C4AC]">
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

                <div className="text-xs font-bold text-[#800020] dark:text-[#F3E5AB] bg-[#FDF2F4] dark:bg-[#2C1215] px-3 py-1 rounded-xl border border-[#F8CFD5] dark:border-[#D4AF37]/30">
                  الدرجة: {studentAns.pointsAwarded} / {q.maxPoints}
                </div>
              </div>

              {/* Optional Passage */}
              {q.passage && (
                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-amber-950 dark:text-amber-200 text-xs font-amiri font-bold leading-relaxed whitespace-pre-line">
                  <span className="block text-[11px] font-bold text-amber-800 dark:text-amber-400 mb-1">الفقرة المرفقة / الأبيات:</span>
                  {q.passage}
                </div>
              )}

              {/* Question Text */}
              <div
                className="text-base sm:text-lg font-amiri font-bold text-[#2A080B] dark:text-[#F5EFEB] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizeRichText(q.questionText) }}
              />

              {/* MCQ Options Display */}
              {isMCQ && (
                <div className="space-y-2 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt: any) => {
                      const isChosenByStudent = studentAns.selectedOption === opt.key;
                      const isTheCorrectOption = q.correctOptionId === opt.key;

                      let style = 'bg-[#FFFDF9] dark:bg-[#140406] border-[#800020]/15 dark:border-white/10 text-[#2A080B] dark:text-[#D8C4AC]';
                      if (isTheCorrectOption) {
                        style = 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 text-emerald-950 dark:text-emerald-300 font-bold';
                      }
                      if (isChosenByStudent && !isTheCorrectOption) {
                        style = 'bg-rose-50 dark:bg-rose-950/30 border-rose-400 text-rose-950 dark:text-rose-300 font-bold';
                      }

                      return (
                        <div
                          key={opt.key}
                          className={`p-3 rounded-2xl border flex items-center justify-between text-xs font-amiri font-bold transition ${style}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-white dark:bg-[#2C1215] border border-slate-200 dark:border-white/10 flex items-center justify-center font-bold text-xs">
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

                          <div className="flex items-center gap-1.5 font-sans font-bold text-[10px]">
                            {isChosenByStudent && (
                              <span className="px-2 py-0.5 rounded bg-[#800020] text-white">
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
                    <label className="block text-xs font-bold text-[#800020]/70 dark:text-[#D4AF37] mb-1.5">
                      إجابة الطالب كما كتبها:
                    </label>
                    <div className="p-4 rounded-2xl bg-[#FFFDF9] dark:bg-[#140406] border border-[#800020]/20 dark:border-white/15 text-xs sm:text-sm font-medium text-[#2A080B] dark:text-[#EEE4DA] leading-relaxed whitespace-pre-wrap">
                      {studentAns.essayAnswer || 'لم يكتب الطالب إجابة لهذا السؤال.'}
                    </div>
                  </div>

                  {/* Grading Panel for Teacher */}
                  {studentAns.answerId && (
                    <div className="p-5 rounded-2xl bg-[#FDF2F4] dark:bg-[#2C1215] border border-[#F8CFD5] dark:border-[#D4AF37]/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#800020] dark:text-[#F3E5AB] flex items-center gap-1.5">
                          <MessageSquare className="w-4 h-4 text-[#800020] dark:text-[#D4AF37]" />
                          <span>لوحة تصحيح السؤال المقالي</span>
                        </span>
                        <span className="text-xs font-bold text-[#660019] dark:text-[#D8C4AC]">
                          الحد الأقصى للدرجة: {q.maxPoints}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div className="sm:col-span-1">
                          <label className="block text-[11px] font-bold text-[#800020] dark:text-[#D8C4AC] mb-1">
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
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#140406] text-xs font-bold text-center text-[#2A080B] dark:text-white"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block text-[11px] font-bold text-[#800020] dark:text-[#D8C4AC] mb-1">
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
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#140406] text-xs font-medium text-[#2A080B] dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          disabled={gradingState[studentAns.answerId]?.saving}
                          onClick={() => handleGradeEssay(studentAns.answerId, q.maxPoints)}
                          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#800020] hover:bg-[#660019] text-white text-xs font-bold shadow-sm transition disabled:opacity-50"
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
