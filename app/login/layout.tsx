import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'تسجيل دخول المعلم | منصة د. سعيد حسن',
  description: 'بوابة تسجيل دخول المعلم وإدارة الاختبارات والطلاب.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
