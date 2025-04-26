import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // We're only protecting the admin routes that aren't the login page
  // The actual auth check happens on the client side in AuthContext
  if (path.startsWith('/admin') && path !== '/admin/login') {
    // Note: This will still allow initial page load, but the client-side
    // auth check will handle redirecting unauthenticated users
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}; 