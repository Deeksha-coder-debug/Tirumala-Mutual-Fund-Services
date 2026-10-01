import type { NextAuthConfig } from 'next-auth';

// Explicit list of Admin emails that automatically receive ADMIN privileges
export const ADMIN_EMAILS = Array.from(new Set([
  'tiru.jeypore@gmail.com',
  'deeksha.jeypore@gmail.com',
  ...(process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',').map((e) => e.trim().toLowerCase()) : []),
].filter(Boolean)));

export const ADVISOR_EMAILS = Array.from(new Set([
  ...(process.env.ADVISOR_EMAILS ? process.env.ADVISOR_EMAILS.split(',').map((e) => e.trim().toLowerCase()) : []),
].filter(Boolean)));

export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: { strategy: 'jwt' },
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const email = (user.email || '').toLowerCase().trim();
        if (ADMIN_EMAILS.includes(email)) {
          token.role = 'ADMIN';
        } else if (ADVISOR_EMAILS.includes(email)) {
          token.role = 'ADVISOR';
        } else {
          token.role = user.role || 'CUSTOMER';
        }
      }
      if (token.email) {
        const email = token.email.toLowerCase().trim();
        if (ADMIN_EMAILS.includes(email)) {
          token.role = 'ADMIN';
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token) {
          session.user.id = (token.id as string) || token.sub || '';
          session.user.role = (token.role as any) || 'CUSTOMER';
        }
        const email = session.user.email?.toLowerCase().trim() || '';
        if (ADMIN_EMAILS.includes(email)) {
          session.user.role = 'ADMIN';
        }
      }
      return session;
    },
    authorized({ auth, request: { nextUrl, cookies } }) {
      const isDemo =
        process.env.NODE_ENV !== 'production' &&
        cookies.get('tmfs_demo_mode')?.value === 'true';

      const userEmail = auth?.user?.email?.toLowerCase().trim() || '';
      const isAdmin =
        ADMIN_EMAILS.includes(userEmail) ||
        auth?.user?.role === 'ADMIN' ||
        isDemo;

      const isAdvisor =
        isAdmin ||
        ADVISOR_EMAILS.includes(userEmail) ||
        auth?.user?.role === 'ADVISOR';

      const isLoggedIn = !!auth?.user || isDemo;
      const pathname = nextUrl.pathname;

      const isPortalRoute = pathname.startsWith('/portal');
      const isAdvisorRoute = pathname.startsWith('/advisor');
      const isAdminRoute = pathname.startsWith('/admin');

      if (isPortalRoute || isAdvisorRoute || isAdminRoute) {
        if (!isLoggedIn) return false;
        if (isAdminRoute && !isAdmin) {
          return Response.redirect(new URL('/portal?error=unauthorized', nextUrl));
        }
        if (isAdvisorRoute && !isAdvisor) {
          return Response.redirect(new URL('/portal?error=unauthorized', nextUrl));
        }
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
