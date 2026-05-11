import { NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';

export default auth((req) => {
  const url = req.nextUrl.pathname;
  const isLoggedIn = !!req.auth;

  // Protect admin routes
  if (url.startsWith('/admin') && req.auth?.user?.role !== 'ADMIN' && req.auth?.user?.role !== 'SUPER_ADMIN') {
    return NextResponse.redirect(new URL('/403', req.url));
  }

  // Protect superadmin routes
  if (url.startsWith('/superadmin') && req.auth?.user?.role !== 'SUPER_ADMIN') {
    return NextResponse.redirect(new URL('/403', req.url));
  }

  // Protect org routes
  if (url.startsWith('/org') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Protect user dashboard routes
  if (url.startsWith('/dashboard') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
