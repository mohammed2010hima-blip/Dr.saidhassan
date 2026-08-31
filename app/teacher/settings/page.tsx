'use client';

import React, { useEffect, useState } from 'react';
import {
  Settings,
  Key,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Save,
  Radio,
  ExternalLink,
  Sparkles,
  Lock,
  User,
  Image as ImageIcon,
  BookOpen,
  Award,
  Users,
  Layout,
  Palette,
  Check
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { useTheme } from '@/components/theme/ThemeProvider';

export default function TeacherSettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'theme' | 'gemini'>('profile');
  const { setBrandTheme: setAppBrandTheme } = useTheme();

  // Profile / Landing Page States
  const [platformName, setPlatformName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [teacherTitle, setTeacherTitle] = useState('');
  const [teacherBio, setTeacherBio] = useState('');
  const [teacherExperience, setTeacherExperience] = useState('');
  const [teacherStudentsCount, setTeacherStudentsCount] = useState('');
  const [teacherCoursesCount, setTeacherCoursesCount] = useState('');
  const [heroBadge, setHeroBadge] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [teacherImageUrl, setTeacherImageUrl] = useState('');
  const [brandTheme, setBrandTheme] = useState<'violet' | 'gold'>('violet');

  // Gemini API States
  const [apiKey, setApiKey] = useState('');
  const [maskedApiKey, setMaskedApiKey] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [geminiModel, setGeminiModel] = useState('gemini-2.5-flash');
  const [availableModels, setAvailableModels] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const { success, error: toastError } = useToast();

  const loadSettings = () => {
    fetch('/api/teacher/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toastError(data.error);
          return;
        }
        setHasApiKey(data.hasApiKey);
        setMaskedApiKey(data.maskedApiKey);
        setGeminiModel(data.geminiModel);
        setAvailableModels(data.availableModels || []);
        setPlatformName(data.platformName || '');
        setTeacherName(data.teacherName || '');
        setTeacherTitle(data.teacherTitle || '');
        setTeacherBio(data.teacherBio || '');
        setTeacherExperience(data.teacherExperience || '');
        setTeacherStudentsCount(data.teacherStudentsCount || '');
        setTeacherCoursesCount(data.teacherCoursesCount || '');
        setHeroBadge(data.heroBadge || '');
        setHeroTitle(data.heroTitle || '');
        setHeroSubtitle(data.heroSubtitle || '');
        setTeacherImageUrl(data.teacherImageUrl || '/teacher.png');
        setBrandTheme(data.brandTheme || 'violet');
      })
      .catch(() => toastError('فشل تحميل الإعدادات'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/teacher/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          geminiApiKey: apiKey.trim() || undefined,
          geminiModel,
          platformName,
          teacherName,
          teacherTitle,
          teacherBio,
          teacherExperience,
          teacherStudentsCount,
          teacherCoursesCount,
          heroBadge,
          heroTitle,
          heroSubtitle,
          teacherImageUrl,
          brandTheme,
          action: 'save',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل حفظ الإعدادات');

      // Update global theme context
      setAppBrandTheme(brandTheme);

      success('تم حفظ إعدادات المنصة والثيم بنجاح ✓');
      setApiKey('');
      loadSettings();
    } catch (err: any) {
      toastError(err.message || 'حدث خطأ أثناء حفظ الإعدادات');
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/teacher/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          geminiApiKey: apiKey.trim() || undefined,
          geminiModel,
          action: 'test',
        }),
      });

      const data = await res.json();
      setTestResult(data);

      if (data.success) {
        success('الاتصال بـ Google Gemini API يعمل بنجاح! 🎉');
      } else {
        toastError(data.message || 'فشل اختبار الاتصال بالمفتاح');
      }
    } catch (err: any) {
      setTestResult({ success: false, message: 'حدث خطأ في الاتصال بالخادم' });
      toastError('فشل اختبار الاتصال');
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Settings className="w-7 h-7 text-brand-600" />
          <span>إعدادات المنصة والواجهة والثيم</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          تحكم في بيانات الصفحة الرئيسية، اختيار ثيم الموقع (بنفسجي أو جولد)، ونبذة المدرس، ومفتاح الذكاء الاصطناعي.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'profile'
              ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>بيانات الصفحة الرئيسية ونبذة المدرس</span>
        </button>

        <button
          onClick={() => setActiveTab('theme')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'theme'
              ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>ثيم وألوان الموقع (بنفسجي / جولد)</span>
        </button>

        <button
          onClick={() => setActiveTab('gemini')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'gemini'
              ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Google Gemini API</span>
        </button>
      </div>

      {/* TAB 1: Profile & Landing Page Settings */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-brand-600" />
              <span>المعلومات الشخصية ونصوص الصفحة الرئيسية</span>
            </h2>
            <span className="text-xs text-slate-400 font-semibold">تحديث فوري</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">اسم المنصة</label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                placeholder="منصة د.سعيد حسن"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">اسم المعلم</label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                placeholder="الدكتور سعيد حسن"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">المسمى الوظيفي / المادة</label>
              <input
                type="text"
                value={teacherTitle}
                onChange={(e) => setTeacherTitle(e.target.value)}
                placeholder="خبير ومدرس أول اللغة العربية"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">مسار / رابط صورة المعلم</label>
              <input
                type="text"
                value={teacherImageUrl}
                onChange={(e) => setTeacherImageUrl(e.target.value)}
                placeholder="/teacher.png"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white text-left"
                dir="ltr"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">نبذة عن المعلم (Bio)</label>
              <textarea
                rows={4}
                value={teacherBio}
                onChange={(e) => setTeacherBio(e.target.value)}
                placeholder="اكتب نبذة تعريفية بالمعلم وخبراته..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-medium leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">سنوات الخبرة (نص الإحصائية)</label>
              <input
                type="text"
                value={teacherExperience}
                onChange={(e) => setTeacherExperience(e.target.value)}
                placeholder="أكثر من 40 عاماً"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">عدد الطلاب (نص الإحصائية)</label>
              <input
                type="text"
                value={teacherStudentsCount}
                onChange={(e) => setTeacherStudentsCount(e.target.value)}
                placeholder="+10,000 طالب"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">العنوان الرئيسي (Hero Title)</label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                placeholder="تعلم بطريقة مختلفة وحقق أعلى درجاتك في اللغة العربية"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">النص التعريفي في الواجهة (Hero Subtitle)</label>
              <input
                type="text"
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                placeholder="دروس متكاملة، كورسات منظمة، امتحانات تفاعلية..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-black shadow-md shadow-brand-500/20 transition disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>حفظ التعديلات</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: Theme Selector (Violet vs Gold) */}
      {activeTab === 'theme' && (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Palette className="w-5 h-5 text-brand-600" />
              <span>اختيار الثيم اللوني الأساسي للمنصة</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              اختر اللون الذي يعبر عن هوية المنصة (البنفسجي الملكي Royal Violet أو الذهبي الفاخر Luxury Gold).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Option 1: Royal Violet */}
            <div
              onClick={() => setBrandTheme('violet')}
              className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                brandTheme === 'violet'
                  ? 'border-violet-600 bg-violet-50/50 shadow-lg shadow-violet-500/10 ring-2 ring-violet-500/30'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-700 to-purple-500 flex items-center justify-center text-white shadow-md">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  {brandTheme === 'violet' && (
                    <span className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </span>
                  )}
                </div>

                <h3 className="text-base font-black text-slate-900">الثيم البنفسجي الملكي (Royal Violet)</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                  تصميم عصري وجذاب يمزج بين البنفسجي الإمبراطوري والكحلي الليلي.
                </p>

                {/* Color Swatch */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-[#6D3DF5]"></span>
                  <span className="w-6 h-6 rounded-full bg-[#8B5CF6]"></span>
                  <span className="w-6 h-6 rounded-full bg-[#0B1020]"></span>
                  <span className="text-[11px] font-bold text-slate-400 mr-2">#6D3DF5</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setBrandTheme('violet')}
                className={`mt-6 w-full py-2.5 rounded-xl text-xs font-black transition ${
                  brandTheme === 'violet'
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {brandTheme === 'violet' ? 'الثيم المختار حالياً' : 'تفعيل الثيم البنفسجي'}
              </button>
            </div>

            {/* Option 2: Luxury Gold */}
            <div
              onClick={() => setBrandTheme('gold')}
              className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                brandTheme === 'gold'
                  ? 'border-amber-500 bg-amber-50/50 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/30'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-700 flex items-center justify-center text-white shadow-md">
                    <Award className="w-6 h-6" />
                  </div>
                  {brandTheme === 'gold' && (
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </span>
                  )}
                </div>

                <h3 className="text-base font-black text-slate-900">الثيم الذهبي الفاخر (Luxury Gold)</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                  تصميم فخم وكلاسيكي يمنح إحساس الأناقة الأكاديمية والتميز مع الكحلي الداكن.
                </p>

                {/* Color Swatch */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-[#D97706]"></span>
                  <span className="w-6 h-6 rounded-full bg-[#F59E0B]"></span>
                  <span className="w-6 h-6 rounded-full bg-[#0B1020]"></span>
                  <span className="text-[11px] font-bold text-slate-400 mr-2">#D97706</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setBrandTheme('gold')}
                className={`mt-6 w-full py-2.5 rounded-xl text-xs font-black transition ${
                  brandTheme === 'gold'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {brandTheme === 'gold' ? 'الثيم المختار حالياً' : 'تفعيل الثيم الذهبي'}
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-black shadow-md shadow-brand-500/20 transition disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>حفظ واختيار الثيم</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: Gemini API Settings */}
      {activeTab === 'gemini' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900">مفتاح Google Gemini API Key</h2>
                <span className="text-xs font-semibold text-slate-400">
                  {hasApiKey ? 'المفتاح مسجل ومحمي بتشفير AES-256' : 'لم يتم إدخال مفتاح بعد'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {hasApiKey ? (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-lg border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>المفتاح مفعل</span>
                </span>
              ) : (
                <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-black rounded-lg border border-amber-200 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>مطلوب إدخال المفتاح</span>
                </span>
              )}
            </div>
          </div>

          {/* Test Result Message */}
          {testResult && (
            <div
              className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-2.5 ${
                testResult.success
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                مفتاح API Key {hasApiKey && <span className="text-slate-400 font-normal">(اتركه فارغاً للاحتفاظ بالمفتاح الحالي)</span>}
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder={hasApiKey ? `المفتاح الحالي: ${maskedApiKey}` : 'ألصق مفتاح Google Gemini API هنا... (AIzaSy...)'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white text-left placeholder:text-right font-medium"
                  dir="ltr"
                />
                <Key className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed font-medium">
                يمكنك الحصول على مفتاح مجاني فوراً من منصة{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-600 font-bold hover:underline inline-flex items-center gap-0.5"
                >
                  <span>Google AI Studio</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>

            {/* Model Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                نموذج Gemini الافتراضي المفضل لتحليل المستندات
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {availableModels.map((m) => (
                  <label
                    key={m.id}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                      geminiModel === m.id
                        ? 'border-brand-600 bg-brand-50/70 shadow-sm'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-slate-900 font-mono" dir="ltr">
                        {m.id}
                      </span>
                      <input
                        type="radio"
                        name="modelSelector"
                        checked={geminiModel === m.id}
                        onChange={() => setGeminiModel(m.id)}
                        className="w-4 h-4 text-brand-600"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">{m.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                disabled={testing || (!hasApiKey && !apiKey.trim())}
                onClick={handleTestConnection}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition disabled:opacity-40"
              >
                {testing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-brand-600" />
                    <span>جاري اختبار الاتصال...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>اختبار الاتصال الآن</span>
                  </>
                )}
              </button>

              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-black shadow-md shadow-brand-500/25 transition disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جاري الحفظ...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>حفظ الإعدادات والمفتاح</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
