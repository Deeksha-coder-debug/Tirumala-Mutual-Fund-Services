'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Lock, ArrowRight, AlertCircle, Info, Sparkles, UserCheck } from 'lucide-react';
import { Suspense, useState } from 'react';
import { SITE_CONFIG } from '@/lib/constants';

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
    <div className="w-full max-w-md bg-slate-900/95 backdrop-blur-xl border border-gold-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden transition-all duration-300">
      {/* Background Accent Ambient Glows */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge & Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-900 to-slate-900 border border-gold-500/40 mb-4 shadow-xl shadow-gold-500/5 group">
          <ShieldCheck className="w-9 h-9 text-gold-400 group-hover:scale-110 transition-transform duration-300" />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white font-heading tracking-wide">
          Investor Portal Sign In
        </h1>
        <p className="text-slate-300 text-sm mt-2 font-medium">
          Access your personal wealth portfolio & advisory updates
        </p>
      </div>

      {/* Notice Box if OAuth credentials are not set in environment */}
      {error === 'Configuration' && (
        <div className="mb-6 p-4 rounded-2xl bg-slate-800/90 border border-gold-500/40 text-slate-200 text-xs space-y-2 shadow-lg">
          <div className="flex items-center gap-2 text-gold-400 font-bold">
            <Info className="w-4 h-4 shrink-0" />
            <span>OAuth Setup Environment Notice</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Live Google Sign-In requires your <code className="bg-slate-950 px-1.5 py-0.5 rounded text-gold-300 font-mono text-[11px]">AUTH_GOOGLE_ID</code> credentials in <code className="bg-slate-950 px-1.5 py-0.5 rounded text-gold-300 font-mono text-[11px]">.env</code>.
          </p>
        </div>
      )}

      {/* Other Auth Error Alerts */}
      {error && error !== 'Configuration' && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-sm flex items-start gap-2.5 shadow-md">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-xs">Authentication Alert</p>
            <p className="text-xs text-red-200 mt-0.5">
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
          className="w-full h-14 p-1.5 pr-5 rounded-full bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] text-white font-semibold flex items-center justify-between transition-all duration-300 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 group cursor-pointer relative overflow-hidden border border-blue-400/30 disabled:opacity-80"
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
            className="w-full py-3 px-4 rounded-full bg-slate-800/90 hover:bg-slate-800 text-gold-400 hover:text-gold-300 border border-gold-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>Explore Investor Portal (Demo Mode)</span>
          </button>
        )}
      </div>

      {/* Security Badge */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-300 font-medium">
        <Lock className="w-3.5 h-3.5 text-gold-400" />
        <span>Bank-grade 256-bit SSL encrypted authentication</span>
      </div>

      {/* Legal Disclaimer */}
      <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-400">
        By continuing, you agree to our{' '}
        <Link href="/terms" className="text-gold-400 hover:text-gold-300 font-semibold underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-gold-400 hover:text-gold-300 font-semibold underline">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-primary-900/30 via-gold-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Header Logo */}
      <Link href="/" className="mb-8 flex items-center gap-3 group">
        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gold-400/40 bg-white p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
          <Image
            src={SITE_CONFIG.logo}
            alt="TMFS Logo"
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>
        <span className="text-xl font-bold tracking-tight text-white group-hover:text-gold-400 transition-colors font-heading">
          Tirumala Mutual Fund Services
        </span>
      </Link>

      <Suspense
        fallback={
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-slate-300">
            Loading authentication portal...
          </div>
        }
      >
        <LoginContent />
      </Suspense>

      <div className="mt-8 text-xs text-slate-400 font-medium tracking-wide">
        AMFI Registered Mutual Fund Distributor • ARN-144270
      </div>
    </main>
  );
}
