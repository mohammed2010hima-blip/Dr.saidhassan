'use client';

import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Video,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  Award,
  ChevronLeft,
  X,
  Save,
  Palette
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface CourseItem {
  id: string;
  title: string;
  stage: string;
  description: string;
  badge: string;
  lessonsCount: number;
  duration: string;
  price: string;
  themeColor: string;
  isPublished: boolean;
  orderIndex: number;
  createdAt: string;
}

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [stage, setStage] = useState('الصف الثالث الثانوي');
  const [description, setDescription] = useState('');
  const [badge, setBadge] = useState('كورس متكامل');
  const [lessonsCount, setLessonsCount] = useState(24);
  const [duration, setDuration] = useState('شامل المذكرات والـ PDF');
  const [price, setPrice] = useState('متاح الآن');
  const [themeColor, setThemeColor] = useState('violet');
  const [isPublished, setIsPublished] = useState(true);

  const { success, error: toastError } = useToast();

  const loadCourses = () => {
    fetch('/api/teacher/courses')
      .then((res) => res.json())
      .then((data) => {
        if (data.courses) setCourses(data.courses);
      })
      .catch(() => toastError('فشل تحميل الكورسات'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const openCreateModal = () => {
    setEditingCourse(null);
    setTitle('');
    setStage('الصف الثالث الثانوي');
    setDescription('');
    setBadge('كورس متكامل');
    setLessonsCount(24);
    setDuration('شامل المذكرات والـ PDF');
    setPrice('متاح الآن');
    setThemeColor('violet');
    setIsPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (c: CourseItem) => {
    setEditingCourse(c);
    setTitle(c.title);
    setStage(c.stage);
    setDescription(c.description);
    setBadge(c.badge);
    setLessonsCount(c.lessonsCount);
    setDuration(c.duration);
    setPrice(c.price || 'متاح الآن');
    setThemeColor(c.themeColor || 'violet');
    setIsPublished(c.isPublished);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toastError('يرجى ملء عنوان ووصف الكورس');
      return;
    }

    setSaving(true);
    try {
      const url = editingCourse
        ? `/api/teacher/courses/${editingCourse.id}`
        : '/api/teacher/courses';
      const method = editingCourse ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          stage,
          description,
          badge,
          lessonsCount: Number(lessonsCount),
          duration,
          price,
          themeColor,
          isPublished,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل حفظ الكورس');

      success(editingCourse ? 'تم تحديث بيانات الكورس بنجاح ✓' : 'تم إضافة الكورس الجديد بنجاح ✓');
      setModalOpen(false);
      loadCourses();
    } catch (err: any) {
      toastError(err.message || 'حدث خطأ أثناء حفظ الكورس');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من رغبتك في حذف هذا الكورس نهائياً من الموقع؟')) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/teacher/courses/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل حذف الكورس');

      success('تم حذف الكورس بنجاح');
      loadCourses();
    } catch (err: any) {
      toastError(err.message || 'حدث خطأ أثناء الحذف');
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (course: CourseItem) => {
    try {
      const res = await fetch(`/api/teacher/courses/${course.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !course.isPublished }),
      });
      if (res.ok) {
        success(course.isPublished ? 'تم إخفاء الكورس من الصفحة الرئيسية' : 'تم نشر الكورس على الصفحة الرئيسية');
        loadCourses();
      }
    } catch {
      toastError('فشل تغيير حالة النشر');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-brand-600" />
            <span>إدارة الكورسات والمناهج التعليمية</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            تحكم كامل في إضافة، تعديل، وحذف الكورسات المعروضة في الصفحة الرئيسية للمنصة.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-black shadow-md shadow-brand-500/25 transition transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة كورس جديد</span>
        </button>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300 max-w-md mx-auto">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">لا توجد كورسات مضافة حالياً</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            أضف كورساتك الآن لتظهر مباشرة للطلاب في واجهة الموقع.
          </p>
          <button
            onClick={openCreateModal}
            className="px-5 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-brand-700"
          >
            إضافة أول كورس
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md ${
                course.isPublished ? 'border-slate-200' : 'border-amber-200 bg-amber-50/20 opacity-80'
              }`}
            >
              <div>
                {/* Header Card Visual */}
                <div
                  className={`p-6 text-white relative overflow-hidden flex flex-col justify-between h-40 ${
                    course.themeColor === 'gold'
                      ? 'bg-gradient-to-tr from-amber-700 via-amber-600 to-yellow-500'
                      : course.themeColor === 'emerald'
                      ? 'bg-gradient-to-tr from-emerald-800 via-teal-700 to-slate-900'
                      : course.themeColor === 'blue'
                      ? 'bg-gradient-to-tr from-blue-800 via-indigo-700 to-slate-900'
                      : 'bg-gradient-to-tr from-brand-800 via-violet-700 to-indigo-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black">
                      {course.stage}
                    </span>
                    <span className="px-2.5 py-0.5 bg-black/20 rounded-md text-[10px] font-bold">
                      {course.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-white leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                    {course.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                    <span className="flex items-center gap-1 text-brand-600">
                      <Video className="w-3.5 h-3.5" />
                      <span>{course.lessonsCount} درس</span>
                    </span>
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleTogglePublish(course)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold transition ${
                    course.isPublished
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }`}
                >
                  {course.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{course.isPublished ? 'منشور' : 'مسودة'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(course)}
                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition shadow-sm"
                    title="تعديل الكورس"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(course.id)}
                    disabled={deletingId === course.id}
                    className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 transition shadow-sm disabled:opacity-50"
                    title="حذف الكورس"
                  >
                    {deletingId === course.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-fade-in space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-600" />
                <span>{editingCourse ? 'تعديل بيانات الكورس' : 'إضافة كورس تعليمي جديد'}</span>
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">عنوان الكورس</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: كورس النحو الشامل (من الصفر حتى الإتقان)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">المرحلة الدراسية</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                  >
                    <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
                    <option value="الصف الثاني الثانوي">الصف الثاني الثانوي</option>
                    <option value="الصف الثالث الثانوي">الصف الثالث الثانوي (الثانوية العامة)</option>
                    <option value="المرحلة الإعدادية">المرحلة الإعدادية</option>
                    <option value="تأهيل المعلمين">تأهيل وتدريب المعلمين</option>
                    <option value="تأسيس عام">تأسيس عام وبلاغة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">شارة الكورس (Badge)</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="مثال: الثانوية العامة / كورس متكامل"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">وصف الكورس ومحتواه</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="اكتب شرحاً مختصراً عما سيتعلمه الطالب في هذا الكورس..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-medium leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">عدد الدروس</label>
                  <input
                    type="number"
                    value={lessonsCount}
                    onChange={(e) => setLessonsCount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">الملحقات / المدة</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="شامل المذكرات والـ PDF"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">لون بطاقة الكورس</label>
                  <select
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                  >
                    <option value="violet">بنفسجي (Violet)</option>
                    <option value="gold">ذهبي (Gold / Amber)</option>
                    <option value="emerald">زمردي (Emerald)</option>
                    <option value="blue">أزرق نيلي (Indigo)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishCheck"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 text-brand-600 rounded"
                />
                <label htmlFor="publishCheck" className="text-xs font-bold text-slate-700 cursor-pointer">
                  نشر الكورس مباشرة في الصفحة الرئيسية
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 text-xs font-bold hover:bg-slate-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-black shadow-md shadow-brand-500/25 transition disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{editingCourse ? 'تحديث الكورس' : 'حفظ الكورس الجديد'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
