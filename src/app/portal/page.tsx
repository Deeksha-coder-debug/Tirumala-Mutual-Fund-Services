'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, PieChart, TrendingUp, Users, LogOut, ShieldCheck, 
  Lock, BadgeCheck, Clock, User as UserIcon, AlertTriangle, BarChart3, 
  FileText, MessageSquare
} from 'lucide-react';

function PortalContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'portfolio' | 'sips' | 'investors'>('dashboard');

  useEffect(() => {
    // When on investor portal, ensure light theme styles are applied cleanly
    document.documentElement.classList.remove('dark');
    return () => {
      document.documentElement.classList.add('dark');
    };
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Use session user or fallback demo user for preview
  const user = session?.user || {
    name: 'Talabaktula Sai Deeksha',
    email: 'investor.demo@tirumalamutualfunds.in',
    role: 'ADMIN',
    image: null,
  };

  return (
    <div data-theme="light" className="light-theme min-h-screen bg-slate-50 !text-slate-900 font-sans flex flex-col">
      {/* Top Navbar Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-600 text-sm">
            T
          </div>
          <h1 className="text-lg md:text-xl font-extrabold !text-slate-950 tracking-tight font-heading">
            Tirumala Mutual Fund Services
          </h1>
        </div>

        {/* User Badge & Logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 bg-slate-100 border border-slate-200 rounded-full px-3.5 py-1.5 shadow-sm">
            <span className="text-xs font-semibold !text-slate-700">
              Admin: <strong className="!text-slate-950 font-bold">{user.name}</strong>
            </span>
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || 'User Avatar'}
                width={26}
                height={26}
                className="rounded-full border border-amber-500 object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-amber-500 !text-slate-950 flex items-center justify-center font-bold text-[10px]">
                {user.name?.[0] || 'A'}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              document.cookie = "tmfs_demo_mode=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
              signOut({ callbackUrl: '/' });
            }}
            className="text-xs font-bold !text-slate-700 hover:!text-red-600 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body: Left Sidebar + Workspace Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Vertical Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 flex flex-col justify-between shrink-0 shadow-sm">
          <div className="space-y-1.5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-gold-500 !text-slate-950 shadow-sm'
                  : '!text-slate-700 hover:bg-slate-100 hover:!text-slate-950'
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-slate-950' : 'text-slate-700'}`} />
              <span className={activeTab === 'dashboard' ? '!text-slate-950 font-black' : '!text-slate-700 font-bold'}>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'portfolio'
                  ? 'bg-gold-500 !text-slate-950 shadow-sm'
                  : '!text-slate-700 hover:bg-slate-100 hover:!text-slate-950'
              }`}
            >
              <PieChart className={`w-4 h-4 ${activeTab === 'portfolio' ? 'text-slate-950' : 'text-slate-700'}`} />
              <span className={activeTab === 'portfolio' ? '!text-slate-950 font-black' : '!text-slate-700 font-bold'}>Portfolio</span>
            </button>

            <button
              onClick={() => setActiveTab('sips')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'sips'
                  ? 'bg-gold-500 !text-slate-950 shadow-sm'
                  : '!text-slate-700 hover:bg-slate-100 hover:!text-slate-950'
              }`}
            >
              <TrendingUp className={`w-4 h-4 ${activeTab === 'sips' ? 'text-slate-950' : 'text-slate-700'}`} />
              <span className={activeTab === 'sips' ? '!text-slate-950 font-black' : '!text-slate-700 font-bold'}>SIPs</span>
            </button>

            <button
              onClick={() => setActiveTab('investors')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'investors'
                  ? 'bg-gold-500 !text-slate-950 shadow-sm'
                  : '!text-slate-700 hover:bg-slate-100 hover:!text-slate-950'
              }`}
            >
              <Users className={`w-4 h-4 ${activeTab === 'investors' ? 'text-slate-950' : 'text-slate-700'}`} />
              <span className={activeTab === 'investors' ? '!text-slate-950 font-black' : '!text-slate-700 font-bold'}>Investors</span>
            </button>
          </div>

          <div className="pt-6 border-t border-slate-200 mt-6">
            <Link
              href="/"
              className="w-full bg-primary-950 hover:bg-primary-900 !text-white font-extrabold py-3 px-4 rounded-xl text-xs text-center block transition-all shadow-md"
            >
              Return to Website
            </Link>
          </div>
        </aside>

        {/* Right Workspace Content Area */}
        <main className="flex-1 p-6 md:p-10 max-w-6xl">
          {error === 'unauthorized' && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 !text-amber-800 flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-sm font-semibold !text-amber-900">
                  You don&apos;t have access to that restricted section. Redirected to your Customer Portal.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Header Title */}
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-extrabold !text-slate-950 font-heading tracking-tight">
                    Welcome, {user.name}
                  </h2>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-gold-800 !text-gold-300 uppercase tracking-widest shadow-sm">
                    {user.role}
                  </span>
                </div>
                <p className="!text-slate-600 text-sm mt-1 font-medium">
                  A bird&apos;s eye view of your investor management system and fund operations.
                </p>
              </div>

              {/* 3 Status Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Account Status Card */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                        <BadgeCheck className="w-5 h-5 text-amber-600" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 !text-emerald-800 tracking-wider">
                        ACTIVE
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold !text-slate-950 font-heading">Account Status</h3>
                    <p className="!text-amber-800 text-xs font-bold mt-0.5">Verified Investor Account</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs !text-slate-600 font-semibold">
                    AMFI ARN-144270 Compliant
                  </div>
                </div>

                {/* Portfolio Overview Card */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center">
                        <PieChart className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 !text-blue-800">
                        Coming Soon
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold !text-slate-950 font-heading">Portfolio Overview</h3>
                    <p className="!text-slate-700 text-xs font-medium mt-0.5">Mutual Fund & SIP Holdings</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs !text-slate-600 font-semibold italic">
                    Visualizations loading...
                  </div>
                </div>

                {/* Your Advisor Card */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gold-100 border border-gold-200 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-amber-800" />
                      </div>
                      <button className="text-slate-400 hover:text-slate-600 font-bold text-base px-1">
                        ⋮
                      </button>
                    </div>
                    <h3 className="text-lg font-extrabold !text-slate-950 font-heading">Your Advisor</h3>
                    <p className="!text-amber-900 text-xs font-bold mt-0.5">Mr. Tirumala Talabaktula</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs !text-slate-800 font-bold flex items-center gap-1">
                    📞 +91 87637 32389
                  </div>
                </div>
              </div>

              {/* Large Authentication Banner Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 mt-1">
                      <Lock className="w-4 h-4 text-amber-800" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold !text-slate-950 font-heading">
                        Investor Authentication Connected
                      </h3>
                      <p className="!text-slate-700 text-sm mt-1 max-w-xl font-medium leading-relaxed">
                        Your account holds active permissions to manage wealth assets and view client portfolios.
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/"
                    className="bg-gold-800 hover:bg-primary-950 !text-white font-extrabold py-3 px-6 rounded-xl text-xs transition-all shadow-md shrink-0"
                  >
                    Return to Main Website
                  </Link>
                </div>

                {/* Upcoming Features Grid */}
                <div className="pt-6">
                  <p className="text-[11px] font-extrabold uppercase tracking-widest !text-slate-600 mb-4">
                    UPCOMING FEATURES
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold !text-slate-800">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-slate-700" />
                      <span className="!text-slate-800 font-semibold">Interactive SIP Charts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-700" />
                      <span className="!text-slate-800 font-semibold">Tax Statements</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-slate-700" />
                      <span className="!text-slate-800 font-semibold">Direct Advisor Messaging</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-extrabold !text-slate-950 font-heading">Client Portfolio Overview</h3>
              <p className="!text-slate-700 text-sm font-medium">Real-time mutual fund holdings and AUM breakdown across funds.</p>
              <div className="p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center !text-slate-700 font-bold text-sm">
                AUM Analytics & Live Fund NAV Integration Active
              </div>
            </div>
          )}

          {activeTab === 'sips' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-extrabold !text-slate-950 font-heading">Active SIP Registers</h3>
              <p className="!text-slate-700 text-sm font-medium">Systematic Investment Plan records and monthly mandate schedules.</p>
              <div className="p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center !text-slate-700 font-bold text-sm">
                Automated SIP Mandate Tracker Ready
              </div>
            </div>
          )}

          {activeTab === 'investors' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-extrabold !text-slate-950 font-heading">Registered Investors & Leads</h3>
              <p className="!text-slate-700 text-sm font-medium">Manage client consultations and investor onboarding.</p>
              <div className="p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center !text-slate-700 font-bold text-sm">
                Investor CRM Database Loaded
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function PortalPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PortalContent />
    </Suspense>
  );
}
