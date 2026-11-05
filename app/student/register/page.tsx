'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  Sparkles,
  User,
  Phone,
  Lock,
  Mail,
  Users,
  BookOpen,
  Calendar,
  ArrowRight,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function StudentRegisterPage() {
  const router = useRouter();
  const { success, error: toastError } = useToast();

  const [stages, setStages] = useState<string[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Form states
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [stage, setStage] = useState('');
  const [groupName, setGroupName] = useState('');
  const [semester, setSemester] = useState('الفصل الدراسي الأول');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch('/api/public/academic-data')
      .then((res) => res.json())
      .then((data) => {
        if (data.stages?.length) {
          setStages(data.stages);
          setStage(data.stages[0]);
        }
        if (data.groups?.length) {
          setGroups(data.groups);
          setGroupName(data.groups[0]);
        }
      })
      .catch((err) => console.error('Failed to load academic data', err))
      .finally(() => setLoadingData(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !username.trim() || !password || !phone.trim() || !parentPhone.trim() || !stage || !groupName) {
      setErrorMsg('يرجى ملء كافة الحقول الإلزامية المطلوبة');
      return;
    }

    if (phone.trim() === parentPhone.trim()) {
      setErrorMsg('رقم هاتف الطالب يجب أن يختلف عن رقم هاتف ولي الأمر');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/student/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          username,
          email: email.trim() || undefined,
          password,
          phone,
          parentPhone,
          stage,
          groupName,
          semester,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'فشل إنشاء الحساب، يرجى المحاولة مرة أخرى');
        setLoading(false);
        return;
      }

      success('تم إنشاء حسابك بنجاح! مرحباً بك في منصتك التعليمية 🎉');
      router.push(data.redirectTo || '/student/dashboard');
      router.refresh();
    } catch (err: any) {
      setErrorMsg('حدث خطأ في الاتصال بالسيرفر، يرجى المحاولة لاحقاً');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 py-10 px-4 sm:px-6 relative flex flex-col justify-center items-center font-arabic selection:bg-brand-600 selection:text-white">
      {/* Background glow effects */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Navigation link */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للرئيسية</span>
          </Link>

          <Link
            href="/student/login"
            className="text-xs font-bold text-brand-300 hover:text-brand-200 transition"
          >
            لديك حساب بالفعل؟ <span className="underline">تسجيل الدخول</span>
          </Link>
        </div>

        <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-brand-500/30 mb-3">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              إنشاء حساب طالب جديد
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1.5">
              انضم إلى منصة د.سعيد حسن للوصول إلى امتحاناتك وكورساتك ونتائجك المعتمدة
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Row 1: Full name & Username */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  الاسم الرباعي للطالب <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="مثال: أحمد محمود علي إبراهيم"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pr-10 pl-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  اسم المستخدم (إنجليزي) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    dir="ltr"
                    placeholder="ahmed_mahmoud"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-right"
                  />
                  <Sparkles className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 2: Phone & Parent Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  رقم هاتف الطالب (واتساب) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="01012345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-right"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  رقم هاتف ولي الأمر <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="01198765432"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-right"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 3: Stage & Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  الصف الدراسي <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full pr-10 pl-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                  >
                    {stages.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <BookOpen className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  المجموعة الدراسية <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full pr-10 pl-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                  >
                    {groups.map((grp) => (
                      <option key={grp} value={grp}>
                        {grp}
                      </option>
                    ))}
                  </select>
                  <Users className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 4: Semester & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  الفصل الدراسي الحالي <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full pr-10 pl-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                  >
                    <option value="الفصل الدراسي الأول">الفصل الدراسي الأول</option>
                    <option value="الفصل الدراسي الثاني">الفصل الدراسي الثاني</option>
                  </select>
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  البريد الإلكتروني <span className="text-slate-400 font-normal">(اختياري)</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    dir="ltr"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-right"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                كلمة المرور (6 خانات على الأقل) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  dir="ltr"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-right"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || loadingData}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-black text-sm shadow-lg shadow-brand-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50 mt-6"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري إنشاء الحساب والتأكيد...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>تأكيد وإنشاء الحساب الدراسي</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              بإنشاء حسابك، توافق على الالتزام بقواعد النزاهة الأكاديمية والامتحانات في منصة د.سعيد حسن
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
