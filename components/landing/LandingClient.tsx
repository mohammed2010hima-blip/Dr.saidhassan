'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  FileText,
  Clock,
  ArrowLeft,
  GraduationCap,
  Presentation,
  Moon,
  Sun,
  Menu,
  X,
} from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export interface PublicExam {
  id: string;
  code: string;
  title: string;
  description?: string | null;
  durationMinutes?: number | null;
  questionsCount: number;
  totalPoints: number;
  attemptsCount: number;
  createdAt: string | Date;
}

export interface PlatformSettings {
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
}

export interface CourseItem {
  id: string;
  title: string;
  stage: string;
  description: string;
  badge: string;
  lessonsCount: number;
  duration: string;
  price?: string | null;
  themeColor?: string | null;
  isPublished: boolean;
  orderIndex: number;
  createdAt: string | Date;
}

export interface LandingClientProps {
  initialSettings: PlatformSettings;
  initialExams: PublicExam[];
  initialCourses?: CourseItem[];
}

export function LandingClient({ initialSettings, initialExams, initialCourses = [] }: LandingClientProps) {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  // Data States initialized directly with server-rendered data
  const [exams, setExams] = useState<PublicExam[]>(initialExams);
  const [courses, setCourses] = useState<CourseItem[]>(initialCourses);
  const [settings, setSettings] = useState<PlatformSettings>(initialSettings);
  const [codeQuery, setCodeQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'hero' | 'modules' | 'exams' | 'about'>('hero');

  // Animation Refs
  const navbarRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroPatternRef = useRef<HTMLImageElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const teacherCutoutRef = useRef<HTMLImageElement>(null);
  const heroBioRef = useRef<HTMLDivElement>(null);
  const modulesGridRef = useRef<HTMLDivElement>(null);

  // Active Section Scroll Tracking (ScrollSpy)
  useEffect(() => {
    const sections = ['hero', 'modules', 'exams', 'about'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId as any);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP & Lenis Smooth Scroll Setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // =========================================================================
      // 2. HERO ENTRANCE ANIMATION (Runs immediately on load - No Scroll Needed)
      // =========================================================================
      const introTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      introTl
        // 1. Background Pattern smoothly fades in & scales to natural position
        .fromTo(
          heroPatternRef.current,
          { scale: 1.15, opacity: 0 },
          { scale: 1.0, opacity: 0.9, duration: 1.8, ease: 'power3.out' },
          0
        )
        // 2. Black Navbar slides down from top
        .fromTo(
          navbarRef.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
          0.15
        )
        // 3. Arabic Typography "لـغـة" assembles from right with scale & rotation
        .fromTo(
          word1Ref.current,
          { x: 120, y: 30, opacity: 0, scale: 0.75, rotate: 4 },
          { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0, duration: 1.5, ease: 'power3.out' },
          0.3
        )
        // 4. Arabic Typography "عـربـيـة" assembles from left with scale & rotation
        .fromTo(
          word2Ref.current,
          { x: -120, y: 30, opacity: 0, scale: 0.75, rotate: -4 },
          { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0, duration: 1.5, ease: 'power3.out' },
          0.45
        )
        // 5. Teacher cutout portrait rises cleanly from bottom center
        .fromTo(
          teacherCutoutRef.current,
          { y: 220, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 1.7, ease: 'power3.out' },
          0.6
        )
        // 6. Bio text on the right fades and rises in smoothly
        .fromTo(
          heroBioRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out' },
          0.9
        );

      // =========================================================================
      // 3. CINEMATIC PARALLAX SCROLL EFFECT (Only triggers when user scrolls)
      // =========================================================================
      gsap.to([word1Ref.current, word2Ref.current], {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -220,
        opacity: 0.25,
        scale: 1.05,
        ease: 'none',
      });

      gsap.to(teacherCutoutRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
        scale: 1.04,
        y: 35,
        ease: 'none',
      });

      // Modules Reveal Animation
      if (modulesGridRef.current) {
        gsap.from(modulesGridRef.current.children, {
          scrollTrigger: {
            trigger: modulesGridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 70,
          opacity: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }
    });

    return () => {
      ctx.revert();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen text-[#2A080B] dark:text-[#EEE4DA] font-sans selection:bg-[#E11D48]/30 selection:text-[#800020] transition-colors duration-300">
      {/* =====================================================================
          1. NAVIGATION BAR WITH ACTIVE SECTION TRACKING & LOGO
      ===================================================================== */}
      <header
        ref={navbarRef}
        className="fixed top-0 right-0 left-0 z-50 px-4 sm:px-8 py-3.5 backdrop-blur-2xl bg-black/95 dark:bg-black/98 border-b border-white/10 shadow-2xl transition-all"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Right Side: Arabic Calligraphy Logo */}
          <Link href="/" className="flex items-center gap-3 group" title="الصفحة الرئيسية">
            <img
              src="/logo.png"
              alt="د. سعيد حسن"
              className="h-10 sm:h-12 w-auto object-contain hover:scale-105 transition-transform duration-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            />
          </Link>

          {/* Center: Nav Links with Vertical Separators */}
          <nav className="hidden lg:flex items-center font-bold text-xs sm:text-sm text-white/90" aria-label="روابط الموقع الرئيسية">
            <a
              href="#hero"
              onClick={() => setActiveSection('hero')}
              className={`px-4 py-1 relative transition flex flex-col items-center ${
                activeSection === 'hero' ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              <span>الرئيسية</span>
              {activeSection === 'hero' && (
                <span className="w-full h-0.5 bg-[#E11D48] rounded-full mt-1 shadow-[0_0_8px_#E11D48] animate-fade-in"></span>
              )}
            </a>

            <span className="text-white/25 px-1 font-light" aria-hidden="true">|</span>

            <a
              href="#modules"
              onClick={() => setActiveSection('modules')}
              className={`px-4 py-1 relative transition flex flex-col items-center ${
                activeSection === 'modules' ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              <span>الفروع التعليمية</span>
              {activeSection === 'modules' && (
                <span className="w-full h-0.5 bg-[#E11D48] rounded-full mt-1 shadow-[0_0_8px_#E11D48] animate-fade-in"></span>
              )}
            </a>

            <span className="text-white/25 px-1 font-light" aria-hidden="true">|</span>

            <a
              href="#exams"
              onClick={() => setActiveSection('exams')}
              className={`px-4 py-1 relative transition flex flex-col items-center ${
                activeSection === 'exams' ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span>الامتحانات التفاعلية</span>
                {exams.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#E11D48] text-white font-mono font-bold">
                    {exams.length}
                  </span>
                )}
              </div>
              {activeSection === 'exams' && (
                <span className="w-full h-0.5 bg-[#E11D48] rounded-full mt-1 shadow-[0_0_8px_#E11D48] animate-fade-in"></span>
              )}
            </a>

            <span className="text-white/25 px-1 font-light" aria-hidden="true">|</span>

            <a
              href="#about"
              onClick={() => setActiveSection('about')}
              className={`px-4 py-1 relative transition flex flex-col items-center ${
                activeSection === 'about' ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              <span>عن المعلم</span>
              {activeSection === 'about' && (
                <span className="w-full h-0.5 bg-[#E11D48] rounded-full mt-1 shadow-[0_0_8px_#E11D48] animate-fade-in"></span>
              )}
            </a>
          </nav>

          {/* Left Side: Dark Mode Toggle + Glowing Red Pill CTA Button */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="تبديل المظهر"
              className="p-2 rounded-full bg-white/5 border border-white/15 text-white hover:border-[#E11D48] hover:text-[#E11D48] transition shadow-sm"
              title={theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Glowing Red CTA Button */}
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#DC2626] to-[#E11D48] text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(225,29,72,0.5)] hover:shadow-[0_0_30px_rgba(225,29,72,0.8)] hover:scale-105 transition duration-200"
            >
              <span>ابدأ رحلتك التعليمية الآن</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/10 text-white"
              aria-label="القائمة الجانبية"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-5 rounded-2xl bg-[#0B0405] border border-white/15 shadow-2xl space-y-3 animate-fade-in text-right">
            <a
              href="#hero"
              onClick={() => { setActiveSection('hero'); setMobileMenuOpen(false); }}
              className={`block py-2 text-sm font-bold border-b border-white/10 ${
                activeSection === 'hero' ? 'text-[#E11D48]' : 'text-white'
              }`}
            >
              الرئيسية
            </a>
            <a
              href="#modules"
              onClick={() => { setActiveSection('modules'); setMobileMenuOpen(false); }}
              className={`block py-2 text-sm font-bold border-b border-white/10 ${
                activeSection === 'modules' ? 'text-[#E11D48]' : 'text-white'
              }`}
            >
              الفروع التعليمية
            </a>
            <a
              href="#exams"
              onClick={() => { setActiveSection('exams'); setMobileMenuOpen(false); }}
              className={`block py-2 text-sm font-bold border-b border-white/10 ${
                activeSection === 'exams' ? 'text-[#E11D48]' : 'text-white'
              }`}
            >
              الامتحانات التفاعلية ({exams.length})
            </a>
            <a
              href="#about"
              onClick={() => { setActiveSection('about'); setMobileMenuOpen(false); }}
              className={`block py-2 text-sm font-bold ${
                activeSection === 'about' ? 'text-[#E11D48]' : 'text-white'
              }`}
            >
              عن المعلم
            </a>
          </div>
        )}
      </header>

      {/* =====================================================================
          2. SECTION 1: THE PARALLAX HERO SECTION WITH PATTERN BACKGROUND
      ===================================================================== */}
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-[92vh] sm:min-h-screen pt-24 pb-0 flex flex-col justify-end items-center overflow-hidden bg-[#140406]"
      >
        {/* Layer 0: Background Oriental Pattern Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            ref={heroPatternRef}
            src="/site-bg.jpg"
            alt="خلفية المنصة التعليمية"
            className="w-full h-full object-cover object-center opacity-85 scale-105"
          />
          {/* Luxury Vignette and Tint Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-[#140406]/95" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/30 to-black/85" />
        </div>

        {/* Layer 1: Background Huge Typography "لـغـة عـربـيـة" in Burgundy / Gold */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none pb-20 sm:pb-28">
          <h1 className="text-[clamp(4.5rem,17vw,18rem)] font-amiri font-bold text-[#E11D48]/85 dark:text-[#F3E5AB]/90 text-center leading-none tracking-tight whitespace-nowrap will-change-transform drop-shadow-[0_15px_40px_rgba(0,0,0,0.85)] flex items-center justify-center gap-4 sm:gap-8">
            <span ref={word1Ref} className="inline-block will-change-transform">لـغـة</span>
            <span ref={word2Ref} className="inline-block will-change-transform">عـربـيـة</span>
          </h1>
        </div>

        {/* Layer 2: Centered Teacher Cutout Portrait */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 h-[68vh] sm:h-[78vh] lg:h-[88vh] flex items-end justify-center pointer-events-none">
          {/* Ambient Warm Backlight Glow behind teacher */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full bg-gradient-to-t from-[#E11D48]/35 via-[#D4AF37]/20 to-transparent blur-3xl pointer-events-none -z-10"></div>

          <img
            ref={teacherCutoutRef}
            src={settings.teacherImageUrl || '/teacher.png'}
            alt={settings.teacherName}
            className="h-full w-auto max-w-[95vw] object-contain object-bottom mask-bottom-fade drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] will-change-transform"
          />
        </div>

        {/* Layer 3: Hero Bio Text on Right (Text Only - No Box Background) */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 relative z-30 pb-10 sm:pb-14 flex justify-start items-end pointer-events-none">
          <div
            ref={heroBioRef}
            className="max-w-sm sm:max-w-md lg:max-w-lg text-right pointer-events-auto will-change-transform"
          >
            <p className="text-sm sm:text-base lg:text-lg font-amiri font-bold text-[#F3E5AB] leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
              {settings.teacherBio}
            </p>
          </div>
        </div>

        {/* Soft Bottom Blend Ramp */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F5F1E7] dark:from-[#140406] to-transparent pointer-events-none z-30"></div>
      </section>

      {/* =====================================================================
          3. SECTION 2: COURSE MODULES (النحو - البلاغة - الصرف - الأدب العربي)
      ===================================================================== */}
      <section id="modules" className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto relative z-30">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-amiri font-bold text-[#800020] dark:text-[#F5F1E7] leading-tight mb-3">
            رحلتك نحو الدرجة النهائية في اللغة العربية
          </h2>

          <p className="text-xs sm:text-sm font-semibold text-[#6B4E51] dark:text-[#C8A49F] leading-relaxed">
            منهج متكامل ومفصل يشمل الشرح والتطبيق مع بنوك أسئلة تفاعلية وتصحيح ذكي فوري.
          </p>
        </div>

        {/* Modules Cards Grid (Staggered Entrance Animation) */}
        <div ref={modulesGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses && courses.length > 0 ? (
            courses.map((course, idx) => (
              <div
                key={course.id}
                className="bg-[#FFFDF9] dark:bg-[#1E0709] border border-[#800020]/15 dark:border-[#D4AF37]/25 hover:border-[#D4AF37] rounded-3xl p-7 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-amiri font-bold text-[#D4AF37]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 text-[#800020] dark:text-[#D4AF37] text-[11px] font-bold">
                      {course.badge || course.stage}
                    </span>
                  </div>
                  <h3 className="text-2xl font-amiri font-bold text-[#800020] dark:text-[#F5F1E7] mb-2 group-hover:text-[#D4AF37] transition">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#6B4E51] dark:text-[#C8A49F] font-medium leading-relaxed mb-6">
                    {course.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#800020]/10 dark:border-[#D4AF37]/15 text-xs font-bold text-[#800020] dark:text-[#D4AF37]">
                  <span>{course.lessonsCount} درس • {course.duration}</span>
                  <Link
                    href="/login"
                    className="w-8 h-8 rounded-full bg-[#F5F1E7] dark:bg-[#2C1215] flex items-center justify-center group-hover:bg-[#800020] group-hover:text-[#D4AF37] transition"
                  >
                    ←
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <>
              {/* Card 1: النحو */}
              <div className="bg-[#FFFDF9] dark:bg-[#1E0709] border border-[#800020]/15 dark:border-[#D4AF37]/25 hover:border-[#D4AF37] rounded-3xl p-7 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-amiri font-bold text-[#D4AF37]">٠١</span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 text-[#800020] dark:text-[#D4AF37] text-[11px] font-bold">
                      تأسيس + إعراب
                    </span>
                  </div>
                  <h3 className="text-2xl font-amiri font-bold text-[#800020] dark:text-[#F5F1E7] mb-2 group-hover:text-[#D4AF37] transition">
                    النحو
                  </h3>
                  <p className="text-xs text-[#6B4E51] dark:text-[#C8A49F] font-medium leading-relaxed mb-6">
                    شرح مبسط لقواعد الإعراب، بناء الجملة، التراكيب، مع تدريبات عملية مكثفة على نظام البوكليت الحديث.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#800020]/10 dark:border-[#D4AF37]/15 text-xs font-bold text-[#800020] dark:text-[#D4AF37]">
                  <span>٣٦ محاضرة ومذكرة</span>
                  <span className="w-8 h-8 rounded-full bg-[#F5F1E7] dark:bg-[#2C1215] flex items-center justify-center group-hover:bg-[#800020] group-hover:text-[#D4AF37] transition">←</span>
                </div>
              </div>

              {/* Card 2: البلاغة */}
              <div className="bg-[#FFFDF9] dark:bg-[#1E0709] border border-[#800020]/15 dark:border-[#D4AF37]/25 hover:border-[#D4AF37] rounded-3xl p-7 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-amiri font-bold text-[#D4AF37]">٠٢</span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 text-[#800020] dark:text-[#D4AF37] text-[11px] font-bold">
                      بيان وبديع ومعاني
                    </span>
                  </div>
                  <h3 className="text-2xl font-amiri font-bold text-[#800020] dark:text-[#F5F1E7] mb-2 group-hover:text-[#D4AF37] transition">
                    البلاغة
                  </h3>
                  <p className="text-xs text-[#6B4E51] dark:text-[#C8A49F] font-medium leading-relaxed mb-6">
                    تذوق مواطن الجمال وأسرار الاستعارة والتشبيه والكناية مع تدريبات استخراج الصور البيانية من الأبيات الشعرية.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#800020]/10 dark:border-[#D4AF37]/15 text-xs font-bold text-[#800020] dark:text-[#D4AF37]">
                  <span>٢٤ محاضرة وتطبيق</span>
                  <span className="w-8 h-8 rounded-full bg-[#F5F1E7] dark:bg-[#2C1215] flex items-center justify-center group-hover:bg-[#800020] group-hover:text-[#D4AF37] transition">←</span>
                </div>
              </div>

              {/* Card 3: الصرف */}
              <div className="bg-[#FFFDF9] dark:bg-[#1E0709] border border-[#800020]/15 dark:border-[#D4AF37]/25 hover:border-[#D4AF37] rounded-3xl p-7 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-amiri font-bold text-[#D4AF37]">٠٣</span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 text-[#800020] dark:text-[#D4AF37] text-[11px] font-bold">
                      المشتقات والمصادر
                    </span>
                  </div>
                  <h3 className="text-2xl font-amiri font-bold text-[#800020] dark:text-[#F5F1E7] mb-2 group-hover:text-[#D4AF37] transition">
                    الصرف
                  </h3>
                  <p className="text-xs text-[#6B4E51] dark:text-[#C8A49F] font-medium leading-relaxed mb-6">
                    إتقان الميزان الصرفي، صياغة المشتقات، المصادر، وأحكام الإعلال والإبدال بطريقة سهلة ومبتكرة.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#800020]/10 dark:border-[#D4AF37]/15 text-xs font-bold text-[#800020] dark:text-[#D4AF37]">
                  <span>١٨ محاضرة وبنك أسئلة</span>
                  <span className="w-8 h-8 rounded-full bg-[#F5F1E7] dark:bg-[#2C1215] flex items-center justify-center group-hover:bg-[#800020] group-hover:text-[#D4AF37] transition">←</span>
                </div>
              </div>

              {/* Card 4: الأدب العربي */}
              <div className="bg-[#FFFDF9] dark:bg-[#1E0709] border border-[#800020]/15 dark:border-[#D4AF37]/25 hover:border-[#D4AF37] rounded-3xl p-7 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-amiri font-bold text-[#D4AF37]">٠٤</span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 text-[#800020] dark:text-[#D4AF37] text-[11px] font-bold">
                      مدارس ونصوص متحررة
                    </span>
                  </div>
                  <h3 className="text-2xl font-amiri font-bold text-[#800020] dark:text-[#F5F1E7] mb-2 group-hover:text-[#D4AF37] transition">
                    الأدب العربي
                  </h3>
                  <p className="text-xs text-[#6B4E51] dark:text-[#C8A49F] font-medium leading-relaxed mb-6">
                    شرح وحفظ ممتع لخصائص المدارس الشعرية وتطبيقات عملية على نصوص متحررة مطابقة لنظام الامتحانات.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#800020]/10 dark:border-[#D4AF37]/15 text-xs font-bold text-[#800020] dark:text-[#D4AF37]">
                  <span>٢٠ محاضرة وتدريب</span>
                  <span className="w-8 h-8 rounded-full bg-[#F5F1E7] dark:bg-[#2C1215] flex items-center justify-center group-hover:bg-[#800020] group-hover:text-[#D4AF37] transition">←</span>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* =====================================================================
          4. SECTION 3: INTERACTIVE EXAMS ("الامتحانات التفاعلية")
      ===================================================================== */}
      <section id="exams" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#D4AF37]/25">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-2xl sm:text-4xl font-amiri font-bold text-[#800020] dark:text-[#F5F1E7]">
              اختبر مستواك وتعرف على نتيجتك فوراً
            </h2>
          </div>

          <div className="text-xs font-bold text-[#6B4E51] dark:text-[#C8A49F]">
            تصحيح ذكي فوري بالذكاء الاصطناعي مع تقارير نقاط القوة والضعف
          </div>
        </div>

        {exams.length === 0 ? (
          <div className="p-10 rounded-3xl bg-[#FFFDF9] dark:bg-[#1E0709] border border-[#D4AF37]/20 text-center">
            <GraduationCap className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#800020] dark:text-[#F5F1E7]">لا توجد امتحانات منشورة حالياً</h3>
            <p className="text-xs text-[#6B4E51] dark:text-[#C8A49F] mt-1">سيتم إضافة الامتحانات الدورية قريباً.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-[#FFFDF9] dark:bg-[#1E0709] border border-[#800020]/15 dark:border-[#D4AF37]/20 hover:border-[#D4AF37] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-[#D4AF37]/15 text-[#800020] dark:text-[#D4AF37] text-xs font-bold font-mono rounded-lg border border-[#D4AF37]/30">
                      كود: {exam.code}
                    </span>
                    {exam.durationMinutes && (
                      <span className="flex items-center gap-1 text-xs font-bold text-[#6B4E51] dark:text-[#C8A49F]">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{exam.durationMinutes} دقيقة</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-amiri font-bold text-[#800020] dark:text-[#F5F1E7] mb-2">
                    {exam.title}
                  </h3>

                  {exam.description && (
                    <p className="text-xs text-[#6B4E51] dark:text-[#C8A49F] font-medium line-clamp-2 mb-4 leading-relaxed">
                      {exam.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-[#800020]/10 dark:border-[#D4AF37]/15 flex items-center justify-between">
                  <div className="text-xs font-bold text-[#6B4E51] dark:text-[#C8A49F]">
                    <span>{exam.questionsCount} أسئلة</span> • <span>{exam.totalPoints} درجة</span>
                  </div>

                  <Link
                    href={`/exam/${exam.code}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#800020] to-[#4D0E13] text-[#F3E5AB] font-bold text-xs hover:scale-105 transition shadow-sm"
                  >
                    <span>بدء الامتحان</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =====================================================================
          5. SECTION 4: ABOUT TEACHER ("تعرف على معلمك")
      ===================================================================== */}
      <section id="about" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#D4AF37]/25">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Teacher Image Portrait */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm flex justify-center items-end">
              <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-3xl pointer-events-none"></div>
              <div className="relative w-full h-[380px] sm:h-[440px] flex items-end justify-center">
                <img
                  src={settings.teacherImageUrl || '/teacher.png'}
                  alt={settings.teacherName}
                  className="h-full w-auto object-contain object-bottom mask-bottom-fade drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Bio & Details (Clean Prose - No Box Boundaries) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <h2 className="text-3xl sm:text-5xl font-amiri font-bold text-[#800020] dark:text-[#F5F1E7]">
              {settings.teacherName}
            </h2>

            <p className="text-lg font-bold text-[#D4AF37]">
              {settings.teacherTitle} — خبرة {settings.teacherExperience}
            </p>

            <p className="text-base sm:text-lg text-[#3D1418] dark:text-[#EEE4DA]/90 leading-relaxed font-medium">
              {settings.teacherBio}
            </p>

            {/* Highlights (Clean Elegant List - No Box Containers) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#D4AF37]/25">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                  <Presentation className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#800020] dark:text-[#F5F1E7]">تأهيل وتدريب المعلمين</h4>
                  <p className="text-[#6B4E51] dark:text-[#C8A49F] text-xs font-medium mt-1 leading-relaxed">دورات احترافية لنقل أسرار التدريس الحديث.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#800020] dark:text-[#F5F1E7]">مذكرات وبنوك أسئلة PDF</h4>
                  <p className="text-[#6B4E51] dark:text-[#C8A49F] text-xs font-medium mt-1 leading-relaxed">شروحات وافية وتدريبات شاملة لكل الفروع.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. FOOTER
      ===================================================================== */}
      <footer className="py-10 px-4 sm:px-8 bg-black text-[#F5F1E7] border-t border-white/15">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="د. سعيد حسن"
              className="h-9 sm:h-11 w-auto object-contain"
            />
            <span className="text-xs text-[#D8C4AC]/80 font-medium">جميع الحقوق محفوظة © {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-bold text-[#D8C4AC]">
            <a href="#hero" className="hover:text-white transition">الرئيسية</a>
            <a href="#modules" className="hover:text-white transition">الفروع</a>
            <a href="#exams" className="hover:text-white transition">الامتحانات</a>
            <Link href="/login" className="hover:text-white transition">بوابة المعلم</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
