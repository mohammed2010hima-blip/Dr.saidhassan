'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Users,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Eye,
  Loader2,
  RotateCw,
  BookOpen,
  Phone,
  ShieldCheck,
  Calendar,
  Layers,
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';

export default function TeacherStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');

  // Breakdown stats
  const [overallTotal, setOverallTotal] = useState(0);
  const [stageBreakdown, setStageBreakdown] = useState<Record<string, number>>({});
  const [groupBreakdown, setGroupBreakdown] = useState<Record<string, number>>({});

  // Dynamic Options
  const [stagesList, setStagesList] = useState<string[]>([]);
  const [groupsList, setGroupsList] = useState<string[]>([]);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStagesModal, setShowStagesModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Form states for Add / Edit
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [stage, setStage] = useState('');
  const [groupName, setGroupName] = useState('');
  const [semester, setSemester] = useState('الفصل الدراسي الأول');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  // Stages Management state
  const [newStageName, setNewStageName] = useState('');
  const [addingStage, setAddingStage] = useState(false);
  const [stagesDetailed, setStagesDetailed] = useState<any[]>([]);

  const { success, error: toastError, info } = useToast();

  const loadData = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (selectedStage !== 'all') params.set('stage', selectedStage);
      if (selectedGroup !== 'all') params.set('group', selectedGroup);
      if (selectedSemester !== 'all') params.set('semester', selectedSemester);

      const [studentsRes, academicRes, stagesRes] = await Promise.all([
        fetch(`/api/teacher/students?${params.toString()}`),
        fetch('/api/public/academic-data'),
        fetch('/api/teacher/stages'),
      ]);

      const studentsData = await studentsRes.json();
      const academicData = await academicRes.json();
      const stagesData = await stagesRes.json();

      if (studentsData.students) {
        setStudents(studentsData.students);
        setOverallTotal(studentsData.overallTotal || studentsData.students.length);
        setStageBreakdown(studentsData.stageBreakdown || {});
        setGroupBreakdown(studentsData.groupBreakdown || {});
      }

      if (academicData.stages) setStagesList(academicData.stages);
      if (academicData.groups) setGroupsList(academicData.groups);
      if (stagesData.stages) setStagesDetailed(stagesData.stages);

      if (isManual) info('تم تحديث قائمة الطلاب 🔄');
    } catch (e) {
      console.error('Failed to load students data', e);
      toastError('فشل تحميل بيانات الطلاب');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedStage, selectedGroup, selectedSemester]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const openAddModal = () => {
    setName('');
    setUsername('');
    setEmail('');
    setPhone('');
    setParentPhone('');
    setStage(stagesList[0] || 'الصف الأول الثانوي');
    setGroupName(groupsList[0] || 'المجموعة الأولى');
    setSemester('الفصل الدراسي الأول');
    setPassword('student123');
    setIsActive(true);
    setShowAddModal(true);
  };

  const openEditModal = (st: any) => {
    setSelectedStudent(st);
    setName(st.name);
    setUsername(st.username);
    setPhone(st.phone);
    setParentPhone(st.parentPhone);
    setStage(st.stage);
    setGroupName(st.groupName);
    setSemester(st.semester || 'الفصل الدراسي الأول');
    setIsActive(st.isActive);
    setPassword('');
    setShowEditModal(true);
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/teacher/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          username,
          email: email || undefined,
          phone,
          parentPhone,
          stage,
          groupName,
          semester,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل إضافة الطالب');

      success('تم إضافة حساب الطالب بنجاح ✅');
      setShowAddModal(false);
      loadData();
    } catch (err: any) {
      toastError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/teacher/students/${selectedStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          username,
          phone,
          parentPhone,
          stage,
          groupName,
          semester,
          isActive,
          newPassword: password || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل تعديل الطالب');

      success('تم تحديث بيانات الطالب بنجاح');
      setShowEditModal(false);
      loadData();
    } catch (err: any) {
      toastError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStudent = async (id: string, stName: string) => {
    if (!confirm(`هل أنت متأكد من حذف حساب الطالب "${stName}" نهائياً من المنصة؟`)) return;

    try {
      const res = await fetch(`/api/teacher/students/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل الحذف');
      success('تم حذف حساب الطالب');
      loadData();
    } catch (err: any) {
      toastError(err.message);
    }
  };

  const handleAddStage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStageName.trim()) return;
    setAddingStage(true);
    try {
      const res = await fetch('/api/teacher/stages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newStageName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل إضافة الصف');
      success('تمت إضافة الصف الدراسي بنجاح');
      setNewStageName('');
      loadData();
    } catch (err: any) {
      toastError(err.message);
    } finally {
      setAddingStage(false);
    }
  };

  const handleDeleteStage = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الصف الدراسي؟')) return;
    try {
      const res = await fetch(`/api/teacher/stages?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل الحذف');
      success('تم حذف الصف الدراسي');
      loadData();
    } catch (err: any) {
      toastError(err.message);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16 font-arabic">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-brand-600" />
            <span>إدارة حسابات الطلاب والصفوف الدراسية</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            متابعة الطلاب المسجلين، فحص درجاتهم وسجل امتحاناتهم، وإدارة المجموعات والصفوف
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowStagesModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-sm transition"
          >
            <Layers className="w-4 h-4 text-slate-500" />
            <span>إدارة الصفوف الدراسية</span>
          </button>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة طالب جديد</span>
          </button>
        </div>
      </div>

      {/* Aggregate Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="block text-xs font-bold text-slate-400">إجمالي الطلاب المسجلين</span>
            <span className="block text-2xl font-black text-slate-900 mt-1">{overallTotal} طالب</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="block text-xs font-bold text-slate-400">الصفوف الدراسية النشطة</span>
            <span className="block text-2xl font-black text-indigo-600 mt-1">{stagesList.length} صفوف</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="block text-xs font-bold text-slate-400">المجموعات الدراسية</span>
            <span className="block text-2xl font-black text-emerald-600 mt-1">{groupsList.length} مجموعات</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="ابحث بالاسم، رقم هاتف الطالب، أو ولي الأمر، أو اسم المستخدم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-24 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <button
              type="submit"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-brand-600 text-white text-[11px] font-bold"
            >
              بحث
            </button>
          </form>

          {/* Stage Filter */}
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="w-full md:w-48 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700"
          >
            <option value="all">جميع الصفوف ({overallTotal})</option>
            {stagesList.map((st) => (
              <option key={st} value={st}>
                {st} ({stageBreakdown[st] || 0})
              </option>
            ))}
          </select>

          {/* Group Filter */}
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-full md:w-48 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700"
          >
            <option value="all">جميع المجموعات</option>
            {groupsList.map((grp) => (
              <option key={grp} value={grp}>
                {grp} ({groupBreakdown[grp] || 0})
              </option>
            ))}
          </select>

          {/* Semester Filter */}
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="w-full md:w-44 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700"
          >
            <option value="all">جميع الفصول</option>
            <option value="الفصل الدراسي الأول">الترم الأول</option>
            <option value="الفصل الدراسي الثاني">الترم الثاني</option>
          </select>

          <button
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 transition"
            title="تحديث"
          >
            <RotateCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Students Table */}
      {loading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
          <p className="text-xs text-slate-400 font-bold">جاري تحميل بيانات الطلاب...</p>
        </div>
      ) : students.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">لا يوجد طلاب مطابقين لخيارات البحث</h3>
          <p className="text-xs text-slate-400 mt-1">قم بتغيير خيارات الفلترة أو أضف طالباً جديداً.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">الطالب</th>
                  <th className="py-3 px-4">أرقام الاتصال</th>
                  <th className="py-3 px-4">الصف والمجموعة</th>
                  <th className="py-3 px-4">الفصل الدراسي</th>
                  <th className="py-3 px-4">الامتحانات المؤداة</th>
                  <th className="py-3 px-4">متوسط الدرجات</th>
                  <th className="py-3 px-4">الحالة</th>
                  <th className="py-3 px-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <Link
                        href={`/teacher/students/${st.id}`}
                        className="font-black text-slate-900 hover:text-brand-600 transition block"
                      >
                        {st.name}
                      </Link>
                      <span className="text-[10px] text-slate-400 font-mono" dir="ltr">
                        @{st.username}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      <div className="flex items-center gap-1.5" dir="ltr">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{st.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5" dir="ltr">
                        <ShieldCheck className="w-3 h-3 text-slate-400" />
                        <span>ولي الأمر: {st.parentPhone}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800 block">{st.stage}</span>
                      <span className="text-[11px] text-brand-600 font-medium block">{st.groupName}</span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {st.semester}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {st.totalAttemptsCount} اختبار ({st.approvedExamsCount} معتمد)
                    </td>

                    <td className="py-3.5 px-4">
                      {st.averageScore ? (
                        <span className="font-black text-emerald-600">{st.averageScore}%</span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          st.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {st.isActive ? 'نشط' : 'معطل'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <Link
                          href={`/teacher/students/${st.id}`}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50 transition"
                          title="عرض ملف الطالب وسجل نتائجه"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => openEditModal(st)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition"
                          title="تعديل البيانات أو تعيين كلمة مرور جديدة"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteStudent(st.id, st.name)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="حذف الطالب"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Add Student */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="إضافة طالب جديد">
        <form onSubmit={handleCreateStudent} className="space-y-4 font-arabic">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">الاسم الرباعي للطالب *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">اسم المستخدم (إنجليزي) *</label>
              <input
                type="text"
                required
                dir="ltr"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-right"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">البريد الإلكتروني (اختياري)</label>
              <input
                type="email"
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-right"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">هاتف الطالب *</label>
              <input
                type="tel"
                required
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-right"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">هاتف ولي الأمر *</label>
              <input
                type="tel"
                required
                dir="ltr"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-right"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الصف الدراسي *</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
              >
                {stagesList.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">المجموعة *</label>
              <select
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
              >
                {groupsList.map((grp) => (
                  <option key={grp} value={grp}>
                    {grp}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الفصل الدراسي *</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
              >
                <option value="الفصل الدراسي الأول">الفصل الدراسي الأول</option>
                <option value="الفصل الدراسي الثاني">الفصل الدراسي الثاني</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">كلمة المرور الابتدائية *</label>
              <input
                type="text"
                required
                dir="ltr"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-right"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition flex items-center justify-center gap-2 mt-4"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            <span>حفظ وإضافة الطالب</span>
          </button>
        </form>
      </Modal>

      {/* Modal: Edit Student */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="تعديل بيانات الطالب">
        <form onSubmit={handleUpdateStudent} className="space-y-4 font-arabic">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">الاسم الرباعي للطالب *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">اسم المستخدم</label>
              <input
                type="text"
                required
                dir="ltr"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-right"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">حالة الحساب</label>
              <select
                value={isActive ? 'true' : 'false'}
                onChange={(e) => setIsActive(e.target.value === 'true')}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
              >
                <option value="true">نشط</option>
                <option value="false">معطل</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">هاتف الطالب</label>
              <input
                type="tel"
                required
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-right"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">هاتف ولي الأمر</label>
              <input
                type="tel"
                required
                dir="ltr"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-right"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الصف الدراسي</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
              >
                {stagesList.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">المجموعة</label>
              <select
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
              >
                {groupsList.map((grp) => (
                  <option key={grp} value={grp}>
                    {grp}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">الفصل الدراسي</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
            >
              <option value="الفصل الدراسي الأول">الفصل الدراسي الأول</option>
              <option value="الفصل الدراسي الثاني">الفصل الدراسي الثاني</option>
            </select>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
            <label className="block text-xs font-bold text-amber-900 mb-1">
              إعادة تعيين كلمة المرور (اتركها فارغة إن لم ترغب في التغيير)
            </label>
            <input
              type="text"
              placeholder="اكتب كلمة مرور جديدة..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white text-xs text-right"
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition flex items-center justify-center gap-2 mt-4"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            <span>حفظ التعديلات</span>
          </button>
        </form>
      </Modal>

      {/* Modal: Manage Academic Stages */}
      <Modal isOpen={showStagesModal} onClose={() => setShowStagesModal(false)} title="إدارة الصفوف الدراسية">
        <div className="space-y-4 font-arabic">
          <form onSubmit={handleAddStage} className="flex gap-2">
            <input
              type="text"
              required
              placeholder="مثال: الصف الثالث الإعدادي"
              value={newStageName}
              onChange={(e) => setNewStageName(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
            />
            <button
              type="submit"
              disabled={addingStage}
              className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة صف</span>
            </button>
          </form>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden max-h-60 overflow-y-auto">
            {stagesDetailed.map((st) => (
              <div key={st.id} className="p-3 flex items-center justify-between text-xs font-bold text-slate-800">
                <span>{st.name}</span>
                <button
                  onClick={() => handleDeleteStage(st.id)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
