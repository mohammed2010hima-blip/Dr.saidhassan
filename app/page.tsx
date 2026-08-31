'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  FileText,
  Clock,
  HelpCircle,
  ArrowLeft,
  LogIn,
  Search,
  CheckCircle2,
  Zap,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Award,
  Users,
  ChevronLeft,
  Check,
  Star,
  Presentation,
  Music,
  BookMarked,
  Video,
  Moon,
  Sun,
  Menu,
  X,
  Layers,
  ArrowUpRight,
  Quote,
  Target,
  BarChart3,
  Palette
} from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';

interface PublicExam {
  id: string;
  code: string;
  title: string;
  description?: string;
  durationMinutes?: number;
  questionsCount: number;
  totalPoints: number;
  attemptsCount: number;
  createdAt: string;
}

interface PublicCourse {
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
}

interface PlatformSettings {
  platformName: string;
  teacherName: string;
  teacherTitle: string;
  teacherBio: string;
  teacherExperience: string;
  teacherStudentsCount: string;
  teacherCoursesCount: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  teacherImageUrl: string;
  brandTheme: 'violet' | 'gold';
}

export default function HomePage() {
  const { theme, toggleTheme, brandTheme, setBrandTheme } = useTheme();
  const router = useRouter();

  const [exams, setExams] = useState<PublicExam[]>([]);
  const [courses, setCourses] = useState<PublicCourse[]>([]);
  const [settings, setSettings] = useState<PlatformSettings>({
    platformName: 'منصة د.سعيد حسن',
    teacherName: 'الدكتور سعيد حسن',
    teacherTitle: 'خبير ومدرس أول اللغة العربية',
    teacherBio:
      'أسعى إلى تحبيب اللغة العربية إلى الشباب وتصحيح الأخطاء اللغوية الشائعة حتى يبقى للغة رونقها وفي سبيل ذلك أخصص دورات لتدريب المدرسين الراغبين في ذلك وتأهيلهم وكتب لشرح المناهج بصيغة pdf او word وملفات باور بوينت لكل المراحل وأغانٍ لكل الفروع.',
    teacherExperience: 'أكثر من 40 عاماً',
    teacherStudentsCount: '+10,000 طالب',
    teacherCoursesCount: '+50 دورة ومذكرة',
    heroBadge: 'منصة الدكتور سعيد حسن التعليمية',
    heroTitle: 'تعلم بطريقة مختلفة وحقق أعلى درجاتك في اللغة العربية',
    heroSubtitle:
      'دروس متكاملة، كورسات منظمة، امتحانات تفاعلية بالذكاء الاصطناعي، ومتابعة تساعدك على الوصول لأفضل مستوى.',
    teacherImageUrl: '/teacher.png',
    brandTheme: 'violet',
  });

  const [loadingExams, setLoadingExams] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [codeQuery, setCodeQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isGold = brandTheme === 'gold';

  useEffect(() => {
    // 1. Fetch public settings
    fetch('/api/public/settings', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (data.settings) {
          setSettings(data.settings);
          if (data.settings.brandTheme && !localStorage.getItem('app-brand-theme')) {
            setBrandTheme(data.settings.brandTheme);
          }
        }
      })
      .catch((err) => console.error('Failed settings', err));

    // 2. Fetch public exams
    fetch('/api/public/exams', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (data.exams) setExams(data.exams);
      })
      .catch((err) => console.error('Failed exams', err))
      .finally(() => setLoadingExams(false));

    // 3. Fetch public courses
    fetch('/api/public/courses', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (data.courses) setCourses(data.courses);
      })
      .catch((err) => console.error('Failed courses', err))
      .finally(() => setLoadingCourses(false));
  }, []);

  const handleJoinByCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeQuery.trim()) return;
    router.push(`/exam/${codeQuery.trim().toUpperCase()}`);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white dark:bg-navy-950 text-navy-900 dark:text-slate-100 transition-colors duration-300 selection:bg-brand-500 selection:text-white font-arabic relative overflow-x-hidden ${isGold ? 'theme-gold' : 'theme-violet'}`}>
      
      {/* -------------------------------------------------------------
          1. CLEAN FLOATING LUXURY NAVBAR (PERFECTLY ALIGNED)
      ------------------------------------------------------------- */}
      <div className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <header className="rounded-2xl sm:rounded-full px-5 sm:px-7 py-3.5 glass-panel shadow-lg shadow-black/5 dark:shadow-black/25 flex items-center justify-between transition-all duration-300">
          
          {/* Logo & Brand (Clean & Crisp — Single line title, uncluttered) */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-md transition-transform duration-200 group-hover:scale-105 ${
              isGold
                ? 'bg-gradient-to-tr from-amber-600 to-yellow-500 shadow-amber-500/25'
                : 'bg-gradient-to-tr from-violet-700 to-violet-500 shadow-violet-600/30'
            }`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-base sm:text-lg font-black tracking-tight text-navy-950 dark:text-white">
              {settings.platformName}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-slate-600 dark:text-slate-300">
            <a href="#hero" className={`transition-colors ${isGold ? 'hover:text-amber-500' : 'hover:text-violet-600'}`}>
              الرئيسية
            </a>
            <a href="#about" className={`transition-colors ${isGold ? 'hover:text-amber-500' : 'hover:text-violet-600'}`}>
              عن المدرس
            </a>
            <a href="#stages" className={`transition-colors ${isGold ? 'hover:text-amber-500' : 'hover:text-violet-600'}`}>
              المراحل الدراسية
            </a>
            <a href="#courses" className={`transition-colors ${isGold ? 'hover:text-amber-500' : 'hover:text-violet-600'}`}>
              الكورسات
            </a>
            <a href="#exams" className={`transition-colors flex items-center gap-1.5 ${isGold ? 'hover:text-amber-500' : 'hover:text-violet-600'}`}>
              <span>الامتحانات</span>
              {exams.length > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isGold
                    ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300'
                    : 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300'
                }`}>
                  {exams.length}
                </span>
              )}
            </a>
            <a href="#features" className={`transition-colors ${isGold ? 'hover:text-amber-500' : 'hover:text-violet-600'}`}>
              مميزات المنصة
            </a>
          </nav>

          {/* Right Actions: Theme Mode Toggle & Unified Login */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 sm:p-2.5 rounded-full bg-slate-100 dark:bg-navy-850 hover:bg-slate-200 dark:hover:bg-navy-800 text-slate-600 dark:text-slate-300 transition-colors shadow-sm"
              title={theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Unified Login Button */}
            <Link
              href="/login"
              className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-white text-xs font-black shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 ${
                isGold
                  ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                  : 'bg-navy-950 dark:bg-violet-650 hover:bg-navy-800 dark:hover:bg-violet-700 shadow-black/10'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>تسجيل الدخول</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-navy-850 text-slate-700 dark:text-slate-200"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-5 rounded-2xl glass-panel shadow-2xl space-y-3 animate-fade-in text-right">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-navy-800"
            >
              الرئيسية
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-navy-800"
            >
              عن المدرس
            </a>
            <a
              href="#stages"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-navy-800"
            >
              المراحل الدراسية
            </a>
            <a
              href="#courses"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-navy-800"
            >
              الكورسات والمناهج
            </a>
            <a
              href="#exams"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-navy-800"
            >
              الامتحانات التفاعلية ({exams.length})
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold text-slate-700 dark:text-slate-200"
            >
              مميزات المنصة
            </a>
          </div>
        )}
      </div>

      {/* -------------------------------------------------------------
          2. CINEMATIC HERO SECTION (CLEAN & DIRECT — NO EXTRA BADGES)
      ------------------------------------------------------------- */}
      <section id="hero" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Ambient Lighting */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-30 pointer-events-none -z-10"></div>
        
        {/* Soft Radial Ambient Glow */}
        <div className={`absolute top-10 right-1/3 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none animate-ambient -z-10 ${
          isGold ? 'bg-amber-500/15 dark:bg-amber-500/20' : 'bg-violet-600/15 dark:bg-violet-600/20'
        }`}></div>
        <div className="absolute bottom-10 left-10 w-[420px] h-[420px] bg-blue-600/10 dark:bg-indigo-600/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Decorative Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[140px] sm:text-[220px] lg:text-[280px] font-black text-slate-900/[0.02] dark:text-white/[0.02] select-none pointer-events-none -z-10 font-arabic whitespace-nowrap">
          العربية
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            
            {/* Right Column: Hero Typography & Actions */}
            <div className="lg:col-span-7 space-y-6 text-right z-10">
              
              {/* Bold Direct Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-navy-950 dark:text-white tracking-tight leading-[1.15]">
                تعلم بطريقة{' '}
                <span className={isGold ? 'text-amber-600 dark:text-amber-400' : 'text-violet-650 dark:text-violet-400'}>
                  مختلفة
                </span>{' '}
                وحقق{' '}
                <span className={`bg-clip-text text-transparent ${
                  isGold
                    ? 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700'
                    : 'bg-gradient-to-r from-violet-650 via-purple-600 to-indigo-600'
                }`}>
                  أعلى درجاتك
                </span>{' '}
                في اللغة العربية
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl">
                مع <strong className="text-navy-950 dark:text-white font-black">{settings.teacherName}</strong> — {settings.heroSubtitle}
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#courses"
                  className={`px-7 py-3.5 rounded-full text-white font-black text-xs sm:text-sm shadow-xl transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5 ${
                    isGold
                      ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/30'
                      : 'bg-violet-650 hover:bg-violet-700 shadow-violet-600/25'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>تصفح الكورسات والمناهج</span>
                </a>

                <a
                  href="#exams"
                  className={`px-7 py-3.5 rounded-full bg-white dark:bg-navy-900 hover:bg-slate-50 dark:hover:bg-navy-850 text-navy-950 dark:text-white border border-slate-200 dark:border-navy-700 font-black text-xs sm:text-sm shadow-sm transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5`}
                >
                  <GraduationCap className={`w-4 h-4 ${isGold ? 'text-amber-500' : 'text-violet-650'}`} />
                  <span>ابدأ اختبارًا تفاعلياً</span>
                </a>
              </div>

              {/* Quick Exam Code Input Widget */}
              <div className="pt-2 max-w-md">
                <div className="p-1.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700/80 shadow-md">
                  <form onSubmit={handleJoinByCode} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="أدخل كود الامتحان للبدء فوراً (مثال: ARB-101)..."
                      value={codeQuery}
                      onChange={(e) => setCodeQuery(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm font-semibold text-navy-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-transparent focus:outline-none"
                      dir="auto"
                    />
                    <button
                      type="submit"
                      className={`px-5 py-2.5 rounded-xl text-white text-xs font-black transition flex items-center gap-1 flex-shrink-0 ${
                        isGold ? 'bg-amber-600 hover:bg-amber-700' : 'bg-navy-950 dark:bg-violet-650 hover:bg-navy-800'
                      }`}
                    >
                      <span>دخول</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="pt-3 flex flex-wrap items-center gap-5 text-xs font-bold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>شرح مبسط ومنظم</span>
                </span>
                <span className={`flex items-center gap-1.5 ${isGold ? 'text-amber-600 dark:text-amber-400' : 'text-violet-650 dark:text-violet-400'}`}>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>امتحانات تفاعلية ذكية</span>
                </span>
                <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>متابعة وتصحيح مستمر</span>
                </span>
              </div>
            </div>

            {/* Left Column: Natural Cutout Teacher Visual (Clean & Focused) */}
            <div className="lg:col-span-5 relative flex justify-center items-end mt-8 lg:mt-0">
              <div className="relative w-full max-w-lg flex flex-col items-center justify-end">
                {/* Backlight glow */}
                <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full blur-3xl pointer-events-none -z-10 ${
                  isGold
                    ? 'bg-gradient-to-t from-amber-600/30 via-yellow-500/20 to-transparent'
                    : 'bg-gradient-to-t from-violet-600/30 via-indigo-500/20 to-transparent'
                }`}></div>

                {/* Natural Cutout Teacher Portrait with soft bottom fade mask */}
                <div className="relative w-full h-[450px] sm:h-[540px] lg:h-[600px] flex items-end justify-center">
                  <img
                    src={settings.teacherImageUrl || '/teacher.png'}
                    alt={settings.teacherName}
                    className="h-full w-auto object-contain object-bottom mask-bottom-fade drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] select-none pointer-events-none transition-transform duration-500 hover:scale-[1.01]"
                  />
                </div>

                {/* Floating Glass Badge 1: Rating */}
                <div className="absolute top-12 -right-2 sm:right-2 glass-panel rounded-2xl p-3 sm:p-3.5 shadow-xl flex items-center gap-2.5 animate-float-slow z-20">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-black">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-black text-navy-950 dark:text-white">4.9 / 5.0</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">تقييم ممتاز من الطلاب</span>
                  </div>
                </div>

                {/* Floating Glass Badge 2: Students Count */}
                <div className="absolute bottom-16 -left-2 sm:left-0 glass-panel rounded-2xl p-3 sm:p-3.5 shadow-xl flex items-center gap-2.5 animate-float-delayed z-20">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-black">
                    <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-navy-950 dark:text-white block">{settings.teacherStudentsCount}</span>
                    <span className="text-[10px] font-bold text-slate-400">يثقون بالمنصة ويحققون التفوق</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. ANIMATED METRICS STRIP (STATS TRANSITION)
      ------------------------------------------------------------- */}
      <section className="py-8 relative z-20 -mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl glass-panel shadow-xl shadow-black/5 dark:shadow-black/25 border border-slate-200/80 dark:border-navy-700/60">
            <div className="text-center p-2">
              <span className={`text-2xl sm:text-4xl font-black bg-clip-text text-transparent block ${
                isGold ? 'bg-gradient-to-r from-amber-600 to-yellow-500' : 'bg-gradient-to-r from-violet-650 to-indigo-600'
              }`}>
                {settings.teacherExperience}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 block">
                خبرة وعطاء في التدريس
              </span>
            </div>

            <div className="text-center p-2 border-r border-slate-200/80 dark:border-navy-800">
              <span className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent block">
                {settings.teacherStudentsCount}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 block">
                طالب وطالبة بالمنصة
              </span>
            </div>

            <div className="text-center p-2 border-r border-slate-200/80 dark:border-navy-800">
              <span className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent block">
                {settings.teacherCoursesCount}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 block">
                كورس ومذكرة وبنك أسئلة
              </span>
            </div>

            <div className="text-center p-2 border-r border-slate-200/80 dark:border-navy-800">
              <span className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent block">
                99%
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 block">
                نسبة الرضا والتفوق
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          4. EDITORIAL ABOUT TEACHER ("تعرف على مدرسك")
      ------------------------------------------------------------- */}
      <section id="about" className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Portrait Column */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm flex justify-center items-end">
                <div className={`absolute inset-0 rounded-full blur-2xl ${
                  isGold ? 'bg-amber-500/20' : 'bg-violet-600/20'
                }`}></div>
                <div className="relative w-full h-[400px] sm:h-[460px] flex items-end justify-center">
                  <img
                    src={settings.teacherImageUrl || '/teacher.png'}
                    alt={settings.teacherName}
                    className="h-full w-auto object-contain object-bottom mask-bottom-fade drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black border ${
                isGold
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                  : 'bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800'
              }`}>
                <BookMarked className="w-3.5 h-3.5" />
                <span>تعرف على معلمك</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-navy-950 dark:text-white leading-tight">
                {settings.teacherName}
              </h2>
              <p className={`text-sm sm:text-base font-bold ${isGold ? 'text-amber-600 dark:text-amber-400' : 'text-violet-650 dark:text-violet-400'}`}>
                {settings.teacherTitle}
              </p>

              <div className="p-6 rounded-3xl bg-slate-50/80 dark:bg-navy-900/60 border border-slate-200/80 dark:border-navy-800 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <p>{settings.teacherBio}</p>
              </div>

              {/* 4 Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-sm flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isGold
                      ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400'
                      : 'bg-violet-50 dark:bg-violet-950/80 text-violet-650 dark:text-violet-400'
                  }`}>
                    <Presentation className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy-950 dark:text-white">دورات تأهيل وتدريب المعلمين</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">
                      برامج خاصة لنقل الخبرة واستراتيجيات التدريس الحديثة.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-sm flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy-950 dark:text-white">كتب ومذكرات PDF و Word</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">
                      شروحات وبنوك أسئلة شاملة لكل فروع المنهج.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-sm flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy-950 dark:text-white">عروض PowerPoint تفاعلية</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">
                      عروض بصرية لتبسيط أصعب قواعد النحو والبلاغة.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-sm flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0">
                    <Music className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy-950 dark:text-white">أغانٍ وأناشيد تعليمية</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">
                      أغانٍ مبتكرة لتثبيت القواعد في ذهن الطالب بسهولة.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          5. EDUCATIONAL STAGES SECTION ("المراحل الدراسية")
      ------------------------------------------------------------- */}
      <section id="stages" className="py-20 bg-slate-50/70 dark:bg-navy-900/40 border-y border-slate-200/70 dark:border-navy-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black border mb-3 ${
              isGold
                ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                : 'bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800'
            }`}>
              <GraduationCap className="w-4 h-4" />
              <span>المراحل الدراسية</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-navy-950 dark:text-white">
              اختر مرحلتك الدراسية وانطلق نحو القمة
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-2">
              برامج مخصصة لكل مرحلة تعليمية تضمن التأسيس القوي وحصد الدرجات النهائية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stage 01 */}
            <div className="rounded-3xl p-7 bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-navy-750 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black font-mono text-slate-300 dark:text-navy-700">
                    01
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    isGold ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300' : 'bg-violet-50 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300'
                  }`}>
                    المرحلة الثانوية
                  </span>
                </div>
                <h3 className="text-xl font-black text-navy-950 dark:text-white mb-2">
                  الصف الأول الثانوي
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  تأسيس شامل للنظام الحديث في النحو والبلاغة والأدب والنصوص المتحررة وحل الاختبارات الإلكترونية.
                </p>
              </div>
              <a
                href="#courses"
                className={`mt-6 pt-4 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-xs font-bold ${
                  isGold ? 'text-amber-600 dark:text-amber-400' : 'text-violet-650 dark:text-violet-400'
                }`}
              >
                <span>استكشف المنهج والكورسات</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Stage 02 */}
            <div className="rounded-3xl p-7 bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-navy-750 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black font-mono text-slate-300 dark:text-navy-700">
                    02
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    isGold ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300' : 'bg-violet-50 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300'
                  }`}>
                    المرحلة الثانوية
                  </span>
                </div>
                <h3 className="text-xl font-black text-navy-950 dark:text-white mb-2">
                  الصف الثاني الثانوي
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  تعميق المهارات البلاغية والنحوية المتقدمة، التدريب على أسئلة المستويات العليا، ونماذج امتحانات تفاعلية.
                </p>
              </div>
              <a
                href="#courses"
                className={`mt-6 pt-4 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-xs font-bold ${
                  isGold ? 'text-amber-600 dark:text-amber-400' : 'text-violet-650 dark:text-violet-400'
                }`}
              >
                <span>استكشف المنهج والكورسات</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Stage 03 */}
            <div className={`rounded-3xl p-7 text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group ${
              isGold
                ? 'bg-gradient-to-b from-amber-950 via-navy-900 to-navy-950 border border-amber-700/60'
                : 'bg-gradient-to-b from-violet-950 via-navy-900 to-navy-950 border border-violet-800/60'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-3xl font-black font-mono ${isGold ? 'text-amber-400' : 'text-violet-400'}`}>
                    03
                  </span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold">
                    الشهادة الثانوية
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mb-2">
                  الصف الثالث الثانوي (الثانوية العامة)
                </h3>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  المعسكر الشامل للثانوية العامة: شرح وتدريبات مكثفة على 7 وحدات نحو، بنك أسئلة شامل، وامتحانات إلكترونية تفاعلية.
                </p>
              </div>
              <a
                href="#courses"
                className={`mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold ${
                  isGold ? 'text-amber-300 group-hover:text-white' : 'text-violet-300 group-hover:text-white'
                }`}
              >
                <span>ابدأ كورس الثانوية العامة الآن</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          6. DYNAMIC COURSES & CURRICULA SECTION
      ------------------------------------------------------------- */}
      <section id="courses" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black border mb-3 ${
                isGold
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                  : 'bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800'
              }`}>
                <BookOpen className="w-4 h-4" />
                <span>المحتوى والدروس</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-navy-950 dark:text-white">
                أحدث الكورسات والبرامج التعليمية
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                دروس تفصيلية مدعومة بعروض باور بوينت ومذكرات وامتحانات تقييم مستمرة
              </p>
            </div>

            <a
              href="#exams"
              className={`inline-flex items-center gap-1.5 text-xs font-bold hover:underline ${
                isGold ? 'text-amber-600 dark:text-amber-400' : 'text-violet-650 dark:text-violet-400'
              }`}
            >
              <span>انتقل للاختبارات التفاعلية المباشرة</span>
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>

          {loadingCourses ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 animate-pulse"></div>
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="rounded-3xl p-12 bg-slate-50 dark:bg-navy-900 text-center border border-dashed border-slate-300 dark:border-navy-700 max-w-md mx-auto my-6">
              <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-navy-950 dark:text-white">لا توجد كورسات مضافة حالياً</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                يمكن للمعلم إضافة الكورسات وتعديلها من لوحة التحكم.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-navy-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    <div className={`h-48 p-6 flex flex-col justify-between text-white relative overflow-hidden ${
                      course.themeColor === 'gold' || isGold
                        ? 'bg-gradient-to-tr from-amber-800 via-amber-600 to-yellow-600'
                        : course.themeColor === 'emerald'
                        ? 'bg-gradient-to-tr from-emerald-900 via-teal-900 to-slate-900'
                        : course.themeColor === 'blue'
                        ? 'bg-gradient-to-tr from-blue-900 via-indigo-900 to-slate-900'
                        : 'bg-gradient-to-tr from-violet-900 via-indigo-900 to-purple-800'
                    }`}>
                      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                      <span className="self-start px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold">
                        {course.stage}
                      </span>
                      <div>
                        <span className="text-xs opacity-80 font-semibold block">{course.badge}</span>
                        <h3 className="text-lg font-black text-white mt-1 line-clamp-2">{course.title}</h3>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed line-clamp-3">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-navy-800">
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <Video className="w-4 h-4" />
                          <span>{course.lessonsCount} درس تفاعلي</span>
                        </span>
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50/80 dark:bg-navy-850/80 border-t border-slate-100 dark:border-navy-800">
                    <a
                      href="#exams"
                      className={`w-full py-3 px-4 rounded-xl text-white font-black text-xs shadow-md transition flex items-center justify-center gap-1.5 ${
                        isGold ? 'bg-amber-600 hover:bg-amber-700' : 'bg-violet-650 hover:bg-violet-700'
                      }`}
                    >
                      <span>استكشف الكورس واختبر مستواك</span>
                      <ArrowLeft className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* -------------------------------------------------------------
          7. INTERACTIVE EXAMS SECTION ("اختبر مستواك الآن")
      ------------------------------------------------------------- */}
      <section id="exams" className="py-20 bg-slate-50/70 dark:bg-navy-900/40 border-y border-slate-200/70 dark:border-navy-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-black border border-emerald-200 dark:border-emerald-800 mb-3">
                <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>محرك الاختبارات الذكي</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-navy-950 dark:text-white">
                اختبر مستواك وحوّل ما تعلمته إلى نتيجة حقيقية
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                ادخل للامتحان فوراً باسمك ورقم هاتفك بدون الحاجة لإنشاء حساب وتصل نتيجتك للمعلم مباشرة
              </p>
            </div>

            <div className="text-xs font-bold text-slate-600 dark:text-slate-400 bg-white dark:bg-navy-850 px-4 py-2 rounded-full border border-slate-200 dark:border-navy-750 shadow-sm self-start sm:self-auto">
              {exams.length} اختبار متاح للطلاب الآن
            </div>
          </div>

          {loadingExams ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-56 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 animate-pulse p-6"></div>
              ))}
            </div>
          ) : exams.length === 0 ? (
            <div className="rounded-3xl p-12 bg-white dark:bg-navy-900 text-center border border-dashed border-slate-300 dark:border-navy-700 max-w-md mx-auto my-6">
              <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-navy-950 dark:text-white">لا توجد اختبارات منشورة حالياً</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                يقوم المعلم بتجهيز امتحانات جديدة دورياً، أو يمكنك الدخول بكود الامتحان في الأعلى.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  className={`rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-navy-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                    isGold ? 'hover:border-amber-500/50' : 'hover:border-violet-500/50'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`px-3 py-1 text-xs font-black rounded-lg border font-mono ${
                        isGold
                          ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                          : 'bg-violet-50 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800'
                      }`}>
                        {exam.code}
                      </span>
                      {exam.durationMinutes ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-900">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{exam.durationMinutes} دقيقة</span>
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-navy-800 px-2.5 py-1 rounded-lg">
                          بدون وقت محدد
                        </span>
                      )}
                    </div>

                    <h3 className={`text-base font-bold text-navy-950 dark:text-white transition-colors leading-snug line-clamp-2 ${
                      isGold ? 'group-hover:text-amber-600 dark:group-hover:text-amber-400' : 'group-hover:text-violet-650 dark:group-hover:text-violet-400'
                    }`}>
                      {exam.title}
                    </h3>

                    {exam.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-2 line-clamp-2 leading-relaxed">
                        {exam.description}
                      </p>
                    )}

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-slate-400" />
                        <span>{exam.questionsCount} سؤال</span>
                      </span>
                      <span className="font-bold text-navy-950 dark:text-white">{exam.totalPoints} درجة</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50/80 dark:bg-navy-850/80 border-t border-slate-100 dark:border-navy-800">
                    <Link
                      href={`/exam/${exam.code}`}
                      className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-white font-black text-xs shadow-md transition-all duration-200 ${
                        isGold ? 'bg-amber-600 hover:bg-amber-700' : 'bg-violet-650 hover:bg-violet-700'
                      }`}
                    >
                      <span>ابدأ الاختبار الآن</span>
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* -------------------------------------------------------------
          8. PLATFORM FEATURES GRID
      ------------------------------------------------------------- */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black border mb-3 ${
              isGold
                ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                : 'bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800'
            }`}>
              <ShieldCheck className="w-4 h-4" />
              <span>مميزات المنصة</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-navy-950 dark:text-white">
              كل ما تحتاجه للتفوق في مكان واحد
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-2">
              تجربة تعليمية متكاملة مصممة خصيصاً لتوفير وقتك ومضاعفة نتائجك
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-sm hover:shadow-lg transition-all duration-200 space-y-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                isGold ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-600' : 'bg-violet-50 dark:bg-violet-950/80 text-violet-650'
              }`}>
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-navy-950 dark:text-white">كورسات منظمة</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                مناهج مرتبة خطوة بخطوة تغطي جميع فروع اللغة العربية بدون تشتت أو تعقيد.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-sm hover:shadow-lg transition-all duration-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-navy-950 dark:text-white">امتحانات تفاعلية</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                تصحيح فوري لأسئلة الاختيار من متعدد مع عداد زمني وحفظ تلقائي للإجابات.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-sm hover:shadow-lg transition-all duration-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-navy-950 dark:text-white">متابعة مستوى الطالب</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                تقارير دورية توضح مواطن القوة والضعف والأسئلة التي تحتاج إلى مراجعة.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-sm hover:shadow-lg transition-all duration-200 space-y-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                isGold ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-600' : 'bg-purple-50 dark:bg-purple-950/80 text-purple-600'
              }`}>
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-navy-950 dark:text-white">مدعوم بالذكاء الاصطناعي</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                تحويل ملفات PDF إلى اختبارات إلكترونية تفاعلية بدقة متناهية وسرعة فائقة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          9. HIGH-IMPACT FINAL CTA SECTION
      ------------------------------------------------------------- */}
      <section className={`py-20 lg:py-24 relative overflow-hidden text-white ${
        isGold
          ? 'bg-gradient-to-tr from-navy-950 via-amber-950/90 to-navy-950'
          : 'bg-gradient-to-tr from-navy-950 via-indigo-950 to-violet-950'
      }`}>
        <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          isGold ? 'bg-amber-600/30' : 'bg-violet-600/30'
        }`}></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-black border border-white/10">
            <Sparkles className="w-4 h-4" />
            <span>ابدأ الآن خطوتك الأولى</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            جاهز تبدأ رحلتك نحو القمة في اللغة العربية؟
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            انضم إلى آلاف الطلاب المتميزين وابدأ التعلم بطريقة تفاعلية وممتعة تضمن لك أعلى الدرجات.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#courses"
              className={`px-8 py-4 rounded-full text-white font-black text-sm shadow-2xl transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5 ${
                isGold ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/40' : 'bg-violet-650 hover:bg-violet-700 shadow-violet-600/40'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>تصفح الكورسات والمناهج</span>
            </a>

            <a
              href="#exams"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black text-sm transition-all duration-200 flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>ابدأ اختباراً إلكترونياً</span>
            </a>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          10. LUXURY FOOTER
      ------------------------------------------------------------- */}
      <footer className="bg-navy-950 text-white border-t border-navy-850 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-navy-850">
            {/* Col 1 */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md ${
                  isGold ? 'bg-gradient-to-tr from-amber-600 to-yellow-500' : 'bg-gradient-to-tr from-violet-700 to-violet-500'
                }`}>
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-lg font-black text-white">{settings.platformName}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium max-w-md">
                المنصة التعليمية الأولى في اللغة العربية تحت إشراف {settings.teacherName} — دروس متكاملة، امتحانات تفاعلية بالذكاء الاصطناعي، ومتابعة مستمرة.
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">أقسام المنصة</h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-semibold">
                <li>
                  <a href="#hero" className="hover:text-white transition">
                    الرئيسية
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition">
                    عن المدرس
                  </a>
                </li>
                <li>
                  <a href="#stages" className="hover:text-white transition">
                    المراحل الدراسية
                  </a>
                </li>
                <li>
                  <a href="#courses" className="hover:text-white transition">
                    الكورسات والمناهج
                  </a>
                </li>
                <li>
                  <a href="#exams" className="hover:text-white transition">
                    الامتحانات التفاعلية
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">إدارة المنصة</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium mb-4">
                لوحة تحكم المعلم لرفع ملفات PDF، إدارة الكورسات، وتصحيح الامتحانات.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-black transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>تسجيل الدخول</span>
              </Link>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
            <p>© {new Date().getFullYear()} {settings.platformName}. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-4 text-slate-400 font-semibold">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>منصة تعليمية آمنة وتصحيح ذكي</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
