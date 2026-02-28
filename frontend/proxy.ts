import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Paths that require admin access
const ADMIN_PREFIX = '/admin';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(ADMIN_PREFIX)) {
    // Check for Sanctum token stored in cookie
    const token = request.cookies.get('admin_token')?.value;
    const role  = request.cookies.get('admin_role')?.value;

    if (!token) {
      const loginUrl = new URL('/api/debug-login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Block non-admin roles
    const adminRoles = ['super_admin', 'moderator', 'staff'];
    if (role && !adminRoles.includes(role)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
