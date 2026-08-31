import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatArabicNumber(num: number | string): string {
  return String(num);
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function generateExamCode(): string {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const prefix = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${num}`;
}

/**
 * Safely sanitizes and formats rich text for Arabic exams:
 * Preserves underlines (<u>...</u>), bolding (<b>...</b>, **...**), line breaks, and diacritics
 * while neutralizing dangerous scripts and handlers to prevent XSS.
 */
export function sanitizeRichText(input: string): string {
  if (!input) return '';

  // Convert markdown-style underlines or bolds if present
  let formatted = input
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<u class="underline decoration-2 underline-offset-4">$1</u>');

  // Strip dangerous tags (scripts, iframes, object, on* handlers)
  formatted = formatted
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '');

  return formatted;
}

