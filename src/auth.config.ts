import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'tmfs-super-secret-key-32-chars-minimum',
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl, cookies } }) {
      const isLoggedIn = !!auth?.user;
      const isDemo = cookies.get('tmfs_demo_mode')?.value === 'true';
      const role = (auth?.user?.role as string | undefined) || (isDemo ? 'ADMIN' : undefined);
      const pathname = nextUrl.pathname;

      const isPortalRoute = pathname.startsWith('/portal');
      const isAdvisorRoute = pathname.startsWith('/advisor');
      const isAdminRoute = pathname.startsWith('/admin');

      if (isPortalRoute || isAdvisorRoute || isAdminRoute) {
        if (!isLoggedIn && !isDemo) return false;
        if (isAdminRoute && role !== 'ADMIN') return Response.redirect(new URL('/portal?error=unauthorized', nextUrl));
        if (isAdvisorRoute && role !== 'ADVISOR' && role !== 'ADMIN') return Response.redirect(new URL('/portal?error=unauthorized', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
