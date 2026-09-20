'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, LogIn, Lock, Mail, ArrowRight, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
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
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'فشل تسجيل الدخول، يرجى التأكد من صحة البريد وكلمة المرور');
        setLoading(false);
        return;
      }

      success('تم تسجيل الدخول بنجاح! جاري التوجيه إلى لوحة التحكم...');
      router.push(data.redirectTo || '/teacher/dashboard');
      router.refresh();
    } catch (err: any) {
      setErrorMsg('حدث خطأ في الاتصال بالخادم، يرجى المحاولة مرة أخرى');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden bg-[#140406]">
      {/* Site Background Pattern with Deep Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src="/site-bg.jpg"
          alt="Background Pattern"
          className="w-full h-full object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-[#140406]/85 to-black/95" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/40 to-black/90" />
      </div>

      {/* Decorative glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#E11D48]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Back to Home link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#D8C4AC] hover:text-white mb-6 transition"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى الصفحة الرئيسية للمنصة</span>
        </Link>

        <div className="bg-[#1C0709]/90 dark:bg-black/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#D4AF37]/35 text-white">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <img
              src="/logo.png"
              alt="د. سعيد حسن"
              className="h-16 sm:h-20 w-auto object-contain mx-auto mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            />
            <h1 className="text-2xl font-black font-amiri text-[#F3E5AB]">تسجيل الدخول</h1>
            <p className="text-xs font-semibold text-[#D8C4AC] mt-1.5 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" />
              <span>بوابة المعلم والإدارة المعتمدة</span>
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-bold flex items-center gap-2.5 animate-shake">
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#EEE4DA] mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-11 pl-4 py-3 rounded-xl border border-[#D4AF37]/30 bg-black/40 text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition font-medium"
                  dir="ltr"
                />
                <Mail className="w-5 h-5 text-[#D8C4AC] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#EEE4DA] mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-11 pl-4 py-3 rounded-xl border border-[#D4AF37]/30 bg-black/40 text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition font-medium"
                  dir="ltr"
                />
                <Lock className="w-5 h-5 text-[#D8C4AC] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#E11D48] text-white font-bold text-sm shadow-[0_0_20px_rgba(225,29,72,0.45)] hover:shadow-[0_0_30px_rgba(225,29,72,0.7)] hover:scale-[1.02] transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري التحقق الآمن...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>دخول إلى لوحة التحكم</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
