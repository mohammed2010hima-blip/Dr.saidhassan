'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  GraduationCap,
  Phone,
  Calendar,
  Users,
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  KeyRound,
  Edit2,
  Trash2,
  Loader2,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { formatTime } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';

export default function TeacherStudentDetailPage() {
  const params = useParams();
  const studentId = params.id as string;
  const router = useRouter();
  const { success, error: toastError } = useToast();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Quick reset password modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  const loadStudent = () => {
    fetch(`/api/teacher/students/${studentId}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.error) {
          toastError(resData.error);
          return;
        }
        setData(resData);
      })
      .catch(() => toastError('فشل تحميل ملف الطالب'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadStudent();
  }, [studentId]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toastError('كلمة المرور يجب ألا تقل عن 6 خانات');
      return;
    }
    setSavingPassword(true);
    try {
      const res = await fetch(`/api/teacher/students/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'فشل التعيين');

      success('تم تعيين كلمة مرور جديدة للطالب بنجاح');
      setShowPasswordModal(false);
      setNewPassword('');
    } catch (err: any) {
      toastError(err.message);
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
        <p className="text-xs font-bold text-slate-400">جاري تحميل ملف الطالب...</p>
      </div>
    );
  }

  if (!data?.student) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
        <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-2" />
        <p className="text-sm font-bold text-slate-700">الطالب غير موجود</p>
        <Link
          href="/teacher/students"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لقائمة الطلاب</span>
        </Link>
      </div>
    );
  }

  const { student, attempts } = data;

  return (
    <div className="space-y-6 animate-fade-in pb-16 font-arabic max-w-5xl mx-auto">
      {/* Back button & Action */}
      <div className="flex items-center justify-between">
        <Link
          href="/teacher/students"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لإدارة الطلاب</span>
        </Link>

        <button
          onClick={() => setShowPasswordModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 transition"
        >
          <KeyRound className="w-4 h-4 text-amber-600" />
          <span>تعيين كلمة مرور جديدة للطالب</span>
        </button>
      </div>

      {/* Student Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {student.isActive ? 'حساب نشط' : 'حساب معطل'}
              </span>
              <span className="text-xs font-mono text-slate-400">@{student.username}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900">{student.name}</h1>
            <p className="text-xs text-slate-400 font-medium mt-1">
              تاريخ التسجيل بالمنصة: {new Date(student.createdAt).toLocaleDateString('ar-EG')}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col items-center sm:items-end gap-3 text-left">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center min-w-[140px]">
              <span className="block text-[11px] font-bold text-slate-400">متوسط الدرجات</span>
              <span className="block text-2xl font-black text-emerald-600 mt-0.5">
                {student.averageScore ? `${student.averageScore}%` : '—'}
              </span>
              <span className="block text-[10px] text-slate-400 font-medium">
                {student.approvedAttempts} من {student.totalAttempts} اختبار معتمد
              </span>
            </div>
          </div>
        </div>

        {/* Contact & Academic Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">الصف الدراسي</span>
            <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-brand-600" />
              {student.stage}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">المجموعة الدراسية</span>
            <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-600" />
              {student.groupName}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">هاتف الطالب</span>
            <div className="flex items-center justify-between" dir="ltr">
              <span className="text-xs font-mono font-bold text-slate-800">{student.phone}</span>
              <a
                href={`https://wa.me/2${student.phone.replace(/^0+/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="p-1 text-emerald-600 hover:text-emerald-700"
                title="مراسلة واتساب"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">هاتف ولي الأمر</span>
            <div className="flex items-center justify-between" dir="ltr">
              <span className="text-xs font-mono font-bold text-slate-800">{student.parentPhone}</span>
              <a
                href={`https://wa.me/2${student.parentPhone.replace(/^0+/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="p-1 text-emerald-600 hover:text-emerald-700"
                title="مراسلة واتساب"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Student's Exam History */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-600" />
          <span>سجل امتحانات الطالب ({attempts.length})</span>
        </h2>

        {attempts.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
            <Award className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-500">لم يقم الطالب بأداء أي امتحانات حتى الآن</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
            <table className="w-full text-right border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-500">
                  <th className="py-3 px-4">كود وعنوان الامتحان</th>
                  <th className="py-3 px-4">تاريخ التسليم</th>
                  <th className="py-3 px-4">وقت الحل</th>
                  <th className="py-3 px-4">الدرجة</th>
                  <th className="py-3 px-4">النسبة والحالة</th>
                  <th className="py-3 px-4">حالة الاعتماد</th>
                  <th className="py-3 px-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attempts.map((att: any) => (
                  <tr key={att.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <span className="text-[10px] font-mono text-brand-600 block">{att.examCode}</span>
                      <span>{att.examTitle}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(att.submittedAt).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{formatTime(att.timeSpentSeconds)}</td>
                    <td className="py-3.5 px-4 font-black text-slate-900">
                      {att.totalScore} / {att.maxScore}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`font-black ${att.isPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {att.percentage}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          att.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {att.isApproved ? 'معتمدة' : 'بانتظار الاعتماد'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Link
                        href={`/teacher/results/${att.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>فحص وتصحيح</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Password Reset Modal */}
      <Modal isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} title="تعيين كلمة مرور جديدة">
        <form onSubmit={handleResetPassword} className="space-y-4 font-arabic">
          <p className="text-xs text-slate-500">
            أدخل كلمة المرور الجديدة للطالب <strong>{student.name}</strong>:
          </p>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">كلمة المرور الجديدة</label>
            <input
              type="text"
              required
              placeholder="اكتب كلمة مرور جديدة..."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-right"
              dir="ltr"
            />
          </div>
          <button
            type="submit"
            disabled={savingPassword}
            className="w-full py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition flex items-center justify-center gap-2"
          >
            {savingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
            <span>تأكيد تعيين كلمة المرور</span>
          </button>
        </form>
      </Modal>
    </div>
  );
}
