import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';
import { authConfig } from './auth.config';

// List of Admin/Director emails that automatically receive ADMIN privileges
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'tiru.jeypore@gmail.com,deeksha.jeypore@gmail.com')
  .split(',')
  .map((e) => e.trim().toLowerCase());

// List of Advisor emails that automatically receive ADVISOR privileges
const ADVISOR_EMAILS = (process.env.ADVISOR_EMAILS || '')
  .split(',')
  .map((e) => e.trim().toLowerCase());

// Use Prisma adapter if DATABASE_URL is available
const useDb = !!process.env.DATABASE_URL;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'tmfs-super-secret-key-32-chars-minimum',
  ...(useDb ? { adapter: PrismaAdapter(prisma) } : {}),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const email = user.email?.toLowerCase() || '';

        // Assign Role based on Admin/Advisor lists or default to CUSTOMER
        if (ADMIN_EMAILS.includes(email)) {
          token.role = 'ADMIN';
        } else if (ADVISOR_EMAILS.includes(email)) {
          token.role = 'ADVISOR';
        } else {
          token.role = user.role || 'CUSTOMER';
        }

        // Sync role to database if DB is configured and user ID exists
        if (useDb && user.id && user.email) {
          try {
            await prisma.user.update({
              where: { id: user.id },
              data: { role: token.role as Role },
            });
          } catch (err) {
            console.error('[Auth DB Role Sync Notice]:', err);
          }
        }
      } else if (useDb && token.email && (!token.role || !token.id)) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email },
            select: { id: true, role: true },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role;
          }
        } catch (error) {
          console.error('[Auth JWT DB Error]:', error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = (token.id as string) || token.sub || '';
        session.user.role = (token.role as Role) || 'CUSTOMER';
      }
      return session;
    },
  },
});
