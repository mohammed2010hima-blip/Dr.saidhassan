'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  LogIn,
  Lock,
  Phone,
  ArrowRight,
  AlertCircle,
  Loader2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function StudentLoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const { success } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/student/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'فشل تسجيل الدخول، يرجى التأكد من البيانات');
        setLoading(false);
        return;
      }

      success(`مرحباً بك مجدداً يا ${data.student?.name || 'بطل'} 👋`);
      router.push(data.redirectTo || '/student/dashboard');
      router.refresh();
    } catch (err: any) {
      setErrorMsg('حدث خطأ في الاتصال بالخادم، يرجى المحاولة مرة أخرى');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 p-4 relative overflow-hidden font-arabic selection:bg-brand-600 selection:text-white">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition"
          >
            <ArrowRight className="w-4 h-4" />
            <span>الرئيسية</span>
          </Link>

          <Link
            href="/login"
            className="text-xs font-bold text-slate-400 hover:text-slate-200 transition"
          >
            أنت معلم؟ <span className="text-brand-300 underline">دخول المعلمين</span>
          </Link>
        </div>

        <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-brand-500/30 mb-4">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">دخول الطلاب</h1>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1.5">
              سجّل دخولك للوصول لامتحاناتك ونتائجك المعتمدة
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2.5 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                رقم الهاتف أو اسم المستخدم أو البريد
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="01012345678 أو اسم المستخدم"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pr-11 pl-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
                <Phone className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  كلمة المرور
                </label>
                <Link
                  href="/student/forgot-password"
                  className="text-[11px] font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-11 pl-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                  dir="ltr"
                />
                <Lock className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-black text-sm shadow-lg shadow-brand-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري تسجيل الدخول...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>دخول إلى لوحة التحكم</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              ليس لديك حساب بعد؟{' '}
              <Link href="/student/register" className="font-bold text-brand-600 hover:underline dark:text-brand-400">
                أنشئ حسابك الدراسي الآن مجاناً
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
