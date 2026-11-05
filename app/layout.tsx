import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

export const metadata: Metadata = {
  title: 'منصة د.سعيد حسن التعليمية | خبير ومدرس أول اللغة العربية',
  description: 'المنصة التعليمية الأولى في اللغة العربية — دروس متكاملة، امتحانات تفاعلية بالذكاء الاصطناعي، ومتابعة مستمرة للتفوق وبلوغ القمة.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Tajawal:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-navy-50 dark:bg-navy-950 text-navy-900 dark:text-slate-100 font-arabic flex flex-col antialiased selection:bg-violet-650 selection:text-white transition-colors duration-300">
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
