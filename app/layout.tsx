import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

export const viewport: Viewport = {
  themeColor: '#0B0405',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dsaidhassan.vercel.app'),
  title: {
    default: 'منصة د. سعيد حسن التعليمية | لغة عربية للمرحلة الثانوية وتالتة إعدادي',
    template: '%s | منصة د. سعيد حسن',
  },
  description: 'المنصة التعليمية المتكاملة في اللغة العربية لطلاب المرحلة الثانوية (الصف الأول والثاني والثالث الثانوي) والشهادة الإعدادية (الصف الثالث الإعدادي).',
  verification: {
    google: 'google69aa6fa6eeb43cf3',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '512x512', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="512x512" />
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
