'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Lock, ArrowRight, AlertCircle, Info, Sparkles, UserCheck } from 'lucide-react';
import { Suspense, useState } from 'react';
import { SITE_CONFIG } from '@/lib/constants';
import PublicSiteShell from '@/components/layout/PublicSiteShell';

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get('callbackUrl') || '/portal';
  const error = searchParams.get('error');

  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn('google', { callbackUrl });
    } catch (err) {
      console.error('Sign in error:', err);
      setIsLoading(false);
    }
  };

  // Demo sign in for immediate local testing when OAuth keys are not configured yet
  const handleDemoSignIn = () => {
    setIsLoading(true);
    document.cookie = "tmfs_demo_mode=true; path=/; max-age=86400";
    router.push(callbackUrl);
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
      {/* Header Badge & Title */}
      <div className="text-center mb-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-gold-200 bg-gold-50 text-gold-700">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <h1 className="font-heading text-2xl font-bold !text-primary-950 sm:text-3xl">
          Investor Portal Sign In
        </h1>
        <p className="mt-2 text-sm font-medium text-slate-600">
          Access your personal wealth portfolio & advisory updates
        </p>
      </div>

      {/* Notice Box if OAuth credentials are not set in environment */}
      {error === 'Configuration' && (
        <div className="mb-6 space-y-2 rounded-xl border border-gold-200 bg-[#f6f3ea] p-4 text-xs text-primary-900">
          <div className="flex items-center gap-2 font-bold text-gold-800">
            <Info className="w-4 h-4 shrink-0" />
            <span>Google Sign-In Setup</span>
          </div>
          <p className="leading-relaxed text-slate-700">
            Google could not complete sign-in. Check the server-side OAuth client ID, client secret, and Auth secret. In Google Cloud Console, add this authorized redirect URI for local development:
          </p>
          <code className="block break-all rounded-lg bg-white px-2 py-1.5 font-mono text-[11px] text-primary-800">
            http://localhost:3000/api/auth/callback/google
          </code>
          <p className="leading-relaxed text-slate-600">
            For production, add the matching callback URL using your deployed site&apos;s domain.
          </p>
        </div>
      )}

      {/* Other Auth Error Alerts */}
      {error && error !== 'Configuration' && (
        <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-800">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold">Authentication Alert</p>
            <p className="mt-0.5 text-xs text-red-700">
              {error === 'OAuthAccountNotLinked'
                ? 'An account with this email already exists under a different sign-in method.'
                : 'Authentication attempt could not be completed. Please try again.'}
            </p>
          </div>
        </div>
      )}

      {/* Primary Blue Slider Button with Left Google Badge */}
      <div className="space-y-4">
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="group relative flex h-14 w-full items-center justify-between overflow-hidden rounded-xl border border-primary-800 bg-primary-900 p-1.5 pr-5 font-semibold text-white shadow-md transition-colors hover:bg-primary-800 active:scale-[0.98] disabled:opacity-80"
        >
          {/* Left Circular White Google Badge */}
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </div>

          {/* Middle Sign-In Label */}
          <span className="flex-1 text-center font-bold text-white text-base font-heading tracking-wide">
            {isLoading ? 'Connecting...' : 'Sign in with Google'}
          </span>

          {/* Right Arrow Slider Accent */}
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300 shrink-0">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </button>

        {/* Demo Portal Access Button (For instant local preview) */}
        {process.env.NODE_ENV !== 'production' && (
          <button
            onClick={handleDemoSignIn}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold-300 bg-gold-50 px-4 py-3 text-xs font-bold text-gold-800 transition-colors hover:bg-gold-100 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>Explore Investor Portal (Demo Mode)</span>
          </button>
        )}
      </div>

      {/* Security Badge */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-slate-600">
        <Lock className="h-3.5 w-3.5 text-gold-700" />
        <span>Bank-grade 256-bit SSL encrypted authentication</span>
      </div>

      {/* Legal Disclaimer */}
      <div className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-600">
        By continuing, you agree to our{' '}
        <Link href="/terms" className="font-semibold text-primary-800 underline hover:text-gold-700">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="font-semibold text-primary-800 underline hover:text-gold-700">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <PublicSiteShell>
      <main id="main-content" className="flex min-h-[calc(100vh-68px)] flex-col items-center justify-center bg-[#f6f3ea] px-4 py-12 text-primary-950 md:min-h-[calc(100vh-76px)]">
        {/* Header Logo */}
        <Link href="/" className="group mb-8 flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gold-300 bg-white p-0.5 transition-transform duration-300 group-hover:scale-105">
            <Image
              src={SITE_CONFIG.logo}
              alt="TMFS Logo"
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-primary-950 transition-colors group-hover:text-gold-700">
            Tirumala Mutual Fund Services
          </span>
        </Link>

        <Suspense
          fallback={
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
              Loading authentication portal...
            </div>
          }
        >
          <LoginContent />
        </Suspense>

        <div className="mt-8 text-xs font-medium tracking-wide text-slate-600">
          AMFI Registered Mutual Fund Distributor • ARN-144270
        </div>
      </main>
    </PublicSiteShell>
  );
}
