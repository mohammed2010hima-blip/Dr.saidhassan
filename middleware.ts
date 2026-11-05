import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Protect all /teacher routes
  if (pathname.startsWith('/teacher')) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Protect /student routes (except public auth pages)
  const publicStudentRoutes = ['/student/login', '/student/register', '/student/forgot-password'];
  const isPublicStudentRoute = publicStudentRoutes.some((route) => pathname.startsWith(route));

  if (pathname.startsWith('/student') && !isPublicStudentRoute) {
    const token = request.cookies.get('student_token')?.value;

    if (!token) {
      const loginUrl = new URL('/student/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/teacher/:path*', '/student/:path*'],
};
