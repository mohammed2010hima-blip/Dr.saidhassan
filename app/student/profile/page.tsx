'use client';

import React, { useEffect, useState } from 'react';
import {
  User,
  Phone,
  Lock,
  Mail,
  BookOpen,
  Users,
  Calendar,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function StudentProfilePage() {
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Change password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const { success, error: toastError } = useToast();

  useEffect(() => {
    fetch('/api/student/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.student) setStudent(data.student);
      })
      .catch((err) => console.error('Failed to load student profile', err))
      .finally(() => setLoading(false));
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmPassword) {
      setPasswordError('كلمة المرور الجديدة وتأكيدها غير متطابقين');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('كلمة المرور يجب ألا تقل عن 6 خانات');
      return;
    }

    setSavingPassword(true);

    try {
      const res = await fetch('/api/student/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPasswordError(data.error || 'فشل تحديث كلمة المرور');
        setSavingPassword(false);
        return;
      }

      success('تم تحديث كلمة المرور بنجاح 🔐');
      setPasswordSuccess('تم تحديث كلمة المرور بنجاح');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      setPasswordError('حدث خطأ أثناء الاتصال بالخادم');
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
        <p className="text-xs font-bold text-slate-400">جاري تحميل ملفك الشخصي...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-16 font-arabic max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-7 h-7 text-brand-600" />
          <span>الملف الشخصي والبيانات الأكاديمية</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          بيانات حسابك المسجلة في منصة د.سعيد حسن التعليمية
        </p>
      </div>

      {/* Card 1: Personal & Academic Info */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-base font-black text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          المعلومات الأكاديمية والشخصية
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">الاسم الرباعي</span>
            <span className="text-sm font-black text-slate-800 dark:text-slate-100">{student?.name}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">اسم المستخدم</span>
            <span className="text-sm font-mono font-black text-brand-600 dark:text-brand-400">
              {student?.username}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">الصف الدراسي</span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{student?.stage}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">المجموعة الدراسية</span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{student?.groupName}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">الفصل الدراسي</span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{student?.semester}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">البريد الإلكتروني</span>
            <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
              {student?.email || 'غير مسجل'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">رقم هاتف الطالب</span>
            <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-100" dir="ltr">
              {student?.phone}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">رقم هاتف ولي الأمر</span>
            <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-100" dir="ltr">
              {student?.parentPhone}
            </span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 pt-2">
          ملاحظة: لتعديل الصف الدراسي أو المجموعة الدراسية، يرجى إبلاغ المعلم أو الإدارة لتحديث بياناتك في السجلات.
        </p>
      </div>

      {/* Card 2: Change Password Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-base font-black text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <Lock className="w-5 h-5 text-brand-600" />
          <span>تغيير كلمة المرور</span>
        </h2>

        {passwordError && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{passwordError}</span>
          </div>
        )}

        {passwordSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{passwordSuccess}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              كلمة المرور الحالية
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              كلمة المرور الجديدة (6 خانات على الأقل)
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              تأكيد كلمة المرور الجديدة
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            disabled={savingPassword}
            className="py-3 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition disabled:opacity-50"
          >
            {savingPassword ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري الحفظ...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>حفظ كلمة المرور الجديدة</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
