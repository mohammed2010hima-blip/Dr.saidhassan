'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  KeyRound,
  Phone,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function StudentForgotPasswordPage() {
  const [phone, setPhone] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();
  const { success } = useToast();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (newPassword !== confirmPassword) {
      setErrorMsg('كلمتا المرور غير متطابقتين');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('كلمة المرور يجب ألا تقل عن 6 خانات');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/student/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          parentPhone,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'فشلت عملية استعادة كلمة المرور');
        setLoading(false);
        return;
      }

      success('تم تحديث كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول.');
      setSuccessMsg(data.message);
      setTimeout(() => {
        router.push('/student/login');
      }, 2000);
    } catch (err: any) {
      setErrorMsg('حدث خطأ في الاتصال بالخادم، يرجى المحاولة لاحقاً');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 p-4 relative overflow-hidden font-arabic selection:bg-brand-600 selection:text-white">
      <div className="w-full max-w-md relative z-10">
        <Link
          href="/student/login"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white mb-6 transition"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لصفحة تسجيل الدخول</span>
        </Link>

        <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-amber-500/30 mb-4">
              <KeyRound className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">استعادة كلمة المرور</h1>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1.5">
              أدخل رقم هاتف الطالب ورقم هاتف ولي الأمر المسجلين لتأكيد الهوية وتعيين كلمة مرور جديدة
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2.5 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2.5 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                رقم هاتف الطالب المسجل
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  dir="ltr"
                  placeholder="01012345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pr-11 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-right"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                رقم هاتف ولي الأمر (للتأكيد الأمني)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  dir="ltr"
                  placeholder="01198765432"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className="w-full pr-11 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-right"
                />
                <ShieldCheck className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                كلمة المرور الجديدة
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  dir="ltr"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pr-11 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-right"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                تأكيد كلمة المرور الجديدة
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  dir="ltr"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pr-11 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-right"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-sm shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري التحقق والتعيين...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>تأكيد تعيين كلمة المرور الجديدة</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
