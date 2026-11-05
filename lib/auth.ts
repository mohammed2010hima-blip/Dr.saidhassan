import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { prisma } from './db';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-jwt-key-2026';
export const TEACHER_COOKIE_NAME = 'auth_token';
export const STUDENT_COOKIE_NAME = 'student_token';

export interface TokenPayload {
  userId?: string;
  studentId?: string;
  email?: string;
  username?: string;
  role: 'teacher' | 'admin' | 'student';
  name: string;
  phone?: string;
  stage?: string;
  groupName?: string;
  semester?: string;
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: TokenPayload, expiresIn: any = '7d'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<TokenPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(TEACHER_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function getStudentSession(req?: NextRequest): Promise<TokenPayload | null> {
  let token: string | undefined;

  if (req) {
    token = req.cookies.get(STUDENT_COOKIE_NAME)?.value;
    if (!token) {
      const authHeader = req.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
  } else {
    const cookieStore = cookies();
    token = cookieStore.get(STUDENT_COOKIE_NAME)?.value;
  }

  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload || payload.role !== 'student') return null;
  return payload;
}

export async function requireTeacherAuth(req?: NextRequest): Promise<{ user: TokenPayload & { userId: string } } | { error: string; status: number }> {
  let token: string | undefined;

  if (req) {
    token = req.cookies.get(TEACHER_COOKIE_NAME)?.value;
    if (!token) {
      const authHeader = req.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
  } else {
    const cookieStore = cookies();
    token = cookieStore.get(TEACHER_COOKIE_NAME)?.value;
  }

  if (!token) {
    return { error: 'غير مصرح لك بالوصول، يرجى تسجيل الدخول كمعلم', status: 401 };
  }

  const payload = verifyToken(token);
  if (!payload || !payload.userId) {
    return { error: 'انتهت صلاحية الجلسة، يرجى تسجيل الدخول مجدداً', status: 401 };
  }

  if (payload.role !== 'teacher' && payload.role !== 'admin') {
    return { error: 'ليس لديك صلاحية الوصول إلى هذه الصفحة', status: 403 };
  }

  return { user: payload as TokenPayload & { userId: string } };
}

export async function requireStudentAuth(req?: NextRequest): Promise<{ student: TokenPayload } | { error: string; status: number }> {
  let token: string | undefined;

  if (req) {
    token = req.cookies.get(STUDENT_COOKIE_NAME)?.value;
    if (!token) {
      const authHeader = req.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
  } else {
    const cookieStore = cookies();
    token = cookieStore.get(STUDENT_COOKIE_NAME)?.value;
  }

  if (!token) {
    return { error: 'يرجى تسجيل الدخول إلى حسابك الطلابي للمتابعة', status: 401 };
  }

  const payload = verifyToken(token);
  if (!payload || payload.role !== 'student' || !payload.studentId) {
    return { error: 'انتهت صلاحية جلسة الطالب، يرجى تسجيل الدخول مجدداً', status: 401 };
  }

  return { student: payload };
}

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: TEACHER_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.set({
    name: TEACHER_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export function setStudentAuthCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: STUDENT_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 14, // 14 days
  });
}

export function clearStudentAuthCookie(response: NextResponse) {
  response.cookies.set({
    name: STUDENT_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}
