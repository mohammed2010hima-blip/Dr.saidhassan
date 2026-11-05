'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  ArrowRight,
  Loader2,
  CheckCheck,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { success, info } = useToast();

  const loadNotifications = () => {
    fetch('/api/student/notifications')
      .then((res) => res.json())
      .then((data) => {
        if (data.notifications) setNotifications(data.notifications);
      })
      .catch((err) => console.error('Failed to load notifications', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await fetch('/api/student/notifications', { method: 'PUT' });
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      success('تم تحديد جميع الإشعارات كمقروءة');
    } catch {
      info('فشل تحديث حالة الإشعارات');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-arabic max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-7 h-7 text-amber-500" />
            <span>مركز الإشعارات والتنبيهات</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            إشعارات اعتماد نتائج الامتحانات والواجبات وتكليفات المعلم
          </p>
        </div>

        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={handleMarkAllRead}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
          >
            <CheckCheck className="w-4 h-4" />
            <span>تحديد الكل كمقروء</span>
          </button>
        )}
      </div>

      {loading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
          <p className="text-xs text-slate-400 font-bold">جاري تحميل الإشعارات...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800">
          <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">لا توجد إشعارات حتى الآن</h3>
          <p className="text-xs text-slate-400 mt-1">
            ستصلك هنا إشعارات فورية عند اعتماد درجاتك أو نشر اختبار جديد لصفك.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border transition flex items-start gap-4 ${
                item.isRead
                  ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800'
                  : 'bg-brand-50/60 dark:bg-brand-950/40 border-brand-200 dark:border-brand-900 shadow-sm'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  item.type === 'result'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                }`}
              >
                {item.type === 'result' ? <Award className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">{item.title}</h3>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {new Date(item.createdAt).toLocaleDateString('ar-EG', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  {item.message}
                </p>

                {item.link && (
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-[11px] font-bold shadow-sm transition"
                  >
                    <span>فتح والانتقال</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
