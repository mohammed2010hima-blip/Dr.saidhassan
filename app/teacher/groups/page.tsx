'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  X,
  Check,
  GraduationCap,
  ExternalLink,
  Phone,
  FileText,
  Clock
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { Modal } from '@/components/ui/Modal';
import { formatTime } from '@/lib/utils';

interface GroupItem {
  id: string;
  name: string;
  createdAt: string;
}

interface StudentResultItem {
  id: string;
  studentName: string;
  studentPhone: string;
  studentGroup: string;
  examTitle: string;
  examCode: string;
  score: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  isPassed: boolean;
  timeSpentSeconds: number;
  status: string;
  submittedAt: string;
}

export default function TeacherGroupsPage() {
  const [groups, setGroups] = useState<GroupItem[]>([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);

  // Group Students Details Modal
  const [selectedGroup, setSelectedGroup] = useState<GroupItem | null>(null);
  const [groupStudents, setGroupStudents] = useState<StudentResultItem[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const { success, error: toastError } = useToast();

  const loadGroups = () => {
    fetch('/api/teacher/groups')
      .then((res) => res.json())
      .then((data) => {
        if (data.groups) setGroups(data.groups);
      })
      .catch(() => toastError('فشل تحميل المجموعات'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const handleGroupClick = (group: GroupItem) => {
    setSelectedGroup(group);
    setLoadingStudents(true);
    setGroupStudents([]);

    fetch(`/api/teacher/results?group=${encodeURIComponent(group.name)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setGroupStudents(data.results);
        }
      })
      .catch(() => toastError('فشل تحميل نتائج طلاب المجموعة'))
      .finally(() => setLoadingStudents(false));
  };

  const handleAddGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    setAdding(true);
    try {
      const res = await fetch('/api/teacher/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newGroupName.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل إضافة المجموعة');

      success('تمت إضافة المجموعة بنجاح!');
      setNewGroupName('');
      loadGroups();
    } catch (err: any) {
      toastError(err.message || 'حدث خطأ أثناء إضافة المجموعة');
    } finally {
      setAdding(false);
    }
  };

  const startEdit = (e: React.MouseEvent, g: GroupItem) => {
    e.stopPropagation();
    setEditingId(g.id);
    setEditingName(g.name);
  };

  const cancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
    setEditingName('');
  };

  const handleSaveEdit = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!editingName.trim()) return;

    setSavingEdit(true);
    try {
      const res = await fetch('/api/teacher/groups', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: editingName.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل تعديل المجموعة');

      success('تم تعديل اسم المجموعة بنجاح ✓');
      setEditingId(null);
      loadGroups();
    } catch (err: any) {
      toastError(err.message || 'حدث خطأ أثناء التعديل');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDeleteGroup = async (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    if (!confirm(`هل أنت متأكد من حذف "${name}"؟`)) return;

    try {
      const res = await fetch(`/api/teacher/groups?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      success('تم حذف المجموعة بنجاح');
      loadGroups();
    } catch (err: any) {
      toastError(err.message || 'فشل حذف المجموعة');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Users className="w-7 h-7 text-brand-600" />
          <span>إدارة المجموعات الدراسية ونتائج الطلاب</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          اضغط على أي مجموعة لعرض جميع الطلاب الذين امتحنوا ضمنها ودرجاتهم وتفاصيل إجاباتهم.
        </p>
      </div>

      {/* Add Group Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm">
        <h2 className="text-sm font-black text-slate-900 mb-4">إضافة مجموعة دراسية جديدة</h2>
        <form onSubmit={handleAddGroup} className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            required
            placeholder="اكتب اسم المجموعة (مثلاً: مجموعة المتفوقين أو المجموعة الأولى)..."
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
          />
          <button
            type="submit"
            disabled={adding || !newGroupName.trim()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-black shadow-md shadow-brand-500/20 transition flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-50"
          >
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            <span>إضافة المجموعة</span>
          </button>
        </form>
      </div>

      {/* Groups List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-900">
            المجموعات المتاحة ({groups.length}) - اضغط على المجموعة لعرض طلابها:
          </h2>
        </div>

        {loading ? (
          <div className="py-8 text-center">
            <Loader2 className="w-6 h-6 text-brand-600 animate-spin mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-500">جاري تحميل المجموعات...</p>
          </div>
        ) : groups.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-slate-200 rounded-2xl">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-500">لا توجد مجموعات دراسية مضافة بعد</p>
            <p className="text-[11px] text-slate-400 mt-1">
              أضف مجموعتك الأولى من النموذج أعلاه لتسهيل تنظيم وتوزيع الطلاب.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {groups.map((g) => (
              <div
                key={g.id}
                onClick={() => editingId !== g.id && handleGroupClick(g)}
                className={`p-4 rounded-2xl border transition flex items-center justify-between gap-3 shadow-sm cursor-pointer ${
                  editingId === g.id
                    ? 'border-brand-500 bg-white ring-2 ring-brand-100 cursor-default'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:border-brand-400 hover:shadow-md'
                }`}
              >
                {editingId === g.id ? (
                  <div className="flex items-center gap-2 w-full" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-brand-500 bg-white text-xs font-semibold text-slate-900 focus:outline-none"
                      autoFocus
                    />
                    <button
                      type="button"
                      disabled={savingEdit}
                      onClick={(e) => handleSaveEdit(e, g.id)}
                      className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
                      title="حفظ التعديل"
                    >
                      {savingEdit ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="p-1.5 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition"
                      title="إلغاء"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-slate-800 block">{g.name}</span>
                        <span className="text-[10px] font-semibold text-brand-600">اضغط لعرض الطلاب ↗</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-80 hover:opacity-100 transition">
                      <button
                        type="button"
                        onClick={(e) => startEdit(e, g)}
                        title="تعديل اسم المجموعة"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDeleteGroup(e, g.id, g.name)}
                        title="حذف المجموعة"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Group Students Results Modal */}
      {selectedGroup && (
        <Modal
          isOpen={!!selectedGroup}
          onClose={() => setSelectedGroup(null)}
          title={`طلاب ${selectedGroup.name} الذين أجروا الاختبارات`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500">
                إجمالي الطلاب والمحاولات: <strong className="text-slate-900">{groupStudents.length}</strong>
              </span>
              <Link
                href={`/teacher/results?group=${encodeURIComponent(selectedGroup.name)}`}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
              >
                <span>فتح في صفحة النتائج الكاملة</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loadingStudents ? (
              <div className="py-12 text-center">
                <Loader2 className="w-8 h-8 text-brand-600 animate-spin mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-500">جاري جلب نتائج طلاب المجموعة...</p>
              </div>
            ) : groupStudents.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-slate-200 rounded-2xl">
                <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">لم يقم أي طالب من هذه المجموعة بإجراء اختبار بعد</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  عندما يختار الطلاب &quot;{selectedGroup.name}&quot; أثناء دخول الامتحان، ستظهر نتائجهم هنا مباشرة.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
                {groupStudents.map((res) => (
                  <div
                    key={res.id}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900">{res.studentName}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            res.isPassed
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {res.percentage}% • {res.isPassed ? 'ناجح' : 'راسب'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500 mt-1">
                        <span className="flex items-center gap-1 font-mono" dir="ltr">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{res.studentPhone || 'بدون هاتف'}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-700">
                          <FileText className="w-3 h-3 text-slate-400" />
                          <span>{res.examTitle} ({res.examCode})</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <div className="text-left sm:text-right">
                        <span className="text-xs font-black text-brand-700 block font-mono">
                          {res.score}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {new Date(res.submittedAt).toLocaleDateString('ar-EG')}
                        </span>
                      </div>

                      <Link
                        href={`/teacher/results/${res.id}`}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1 flex-shrink-0"
                      >
                        <span>التفاصيل</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

