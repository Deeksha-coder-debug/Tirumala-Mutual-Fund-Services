'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Quote,
  ArrowRight,
  Sparkles,
  Building2,
  Phone
} from 'lucide-react';
import { BUSINESS_INFO, CONTACT_INFO } from '@/lib/constants';

export default function AboutContent() {
  return (
    <div className="bg-slate-50 dark:bg-[#060c18] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Institutional Deep Navy & Gold Glow)                      */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#061426] via-[#0b1f3a] to-[#071526] text-white pt-24 pb-20 md:pt-32 md:pb-28 border-b border-gold-500/20">
        {/* Subtle Ambient Lighting Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gold-500/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="container-custom relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Institutional Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/40 text-gold-300 text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-6 shadow-sm"
          >
            <Sparkles size={14} className="text-gold-400 animate-pulse" />
            <span>Tirumala Mutual Fund Services • AMFI Reg. ARN-144270</span>
          </motion.div>

          {/* Majestic Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black font-heading leading-tight tracking-tight max-w-4xl mx-auto text-white"
          >
            Pioneering Disciplined Wealth Creation{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-amber-400 drop-shadow-[0_2px_12px_rgba(214,168,79,0.3)]">
              With Fiduciary Care
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Founded by Sri Tirumala Talabaktula, TMFS is Jeypore and southern Odisha&apos;s trusted mutual fund distribution and private wealth stewardship firm. We translate complex financial markets into clear, goal-aligned portfolios engineered for enduring compound growth.
          </motion.p>

          {/* Top Trust Metrics Strip */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="block text-2xl sm:text-3xl font-black font-body text-gold-400 tabular-nums">₹10+ Cr</span>
              <span className="text-xs sm:text-sm text-slate-300 font-semibold block mt-1">Assets Monitored</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Disciplined investor portfolios</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="block text-2xl sm:text-3xl font-black font-body text-white tabular-nums">ARN-144270</span>
              <span className="text-xs sm:text-sm text-slate-300 font-semibold block mt-1">AMFI Registered</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">SEBI compliance &amp; oversight</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="block text-2xl sm:text-3xl font-black font-body text-gold-400 tabular-nums">100%</span>
              <span className="text-xs sm:text-sm text-slate-300 font-semibold block mt-1">Transparent Advice</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Zero opaque fee structures</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="block text-2xl sm:text-3xl font-black font-body text-white tabular-nums">35+</span>
              <span className="text-xs sm:text-sm text-slate-300 font-semibold block mt-1">Empaneled AMCs</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Top Indian fund houses</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. OUR STORY & THE TMFS ETHOS (Two-Column Editorial Section)               */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 border-b border-slate-200 dark:border-slate-800">
        <div className="container-custom max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Narrative */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-900 dark:text-gold-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Building2 size={14} className="text-gold-500" />
                <span>Our Heritage &amp; Ethos</span>
              </div>
              
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#061426] dark:text-white font-heading leading-tight mb-6">
                Rooted in Jeypore, Trusted Across Odisha &amp; Nationwide
              </h2>

              <div className="space-y-4 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                <p>
                  Established at Indira Chowk in Jeypore (Koraput district), <strong className="font-bold text-[#061426] dark:text-white">Tirumala Mutual Fund Services (TMFS)</strong> was founded with a definitive mission: to deliver ethical, unbiased, institutional-caliber mutual fund advisory to retail families, business owners, and professionals.
                </p>
                <p>
                  We recognized early on that retail investors were routinely misdirected by transactional sales pitches and short-term market speculation. TMFS reversed this approach by anchoring every client engagement to a rigorous, goal-first fiduciary methodology.
                </p>
                <p>
                  Whether you are initiating your very first ₹1,000 monthly SIP, structuring an educational fund for your child, optimizing tax savings under Section 80C, or deploying a multi-crore retirement corpus, TMFS acts as your dedicated lifelong financial co-pilot.
                </p>
              </div>

              {/* Verified Commitment Points */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Statutory AMFI Registered Mutual Fund Distributor
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Direct Counsel From Senior Wealth Advisor
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    100% Unbiased Scheme Allocation Across Top AMCs
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Paperless KYC &amp; Real-Time Portfolio Tracking
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Institutional Creed Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl p-8 bg-gradient-to-br from-[#061426] via-[#091b33] to-[#07182e] border-2 border-gold-500/30 text-white shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <Quote size={44} className="text-gold-400/80 mb-6 stroke-[1.5]" />
                
                <p className="text-lg sm:text-xl font-medium text-slate-200 italic leading-relaxed mb-6">
                  &ldquo;True wealth is never created by chasing the hottest scheme of the week. It is built through disciplined asset allocation, patience across market cycles, and unwavering clarity on life goals.&rdquo;
                </p>

                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-lg font-bold text-white font-heading">
                    Sri Tirumala Talabaktula
                  </h4>
                  <p className="text-xs text-gold-400 font-semibold tracking-wide uppercase mt-0.5">
                    Founder &amp; Principal Wealth Advisor • ARN-144270
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span>Registered Office</span>
                  <span className="font-semibold text-white">MR Towers, Indira Chowk, Jeypore</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MEET THE FOUNDER & PRINCIPAL ADVISOR (Executive Spotlight - No Sig)      */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070f1f]">
        <div className="container-custom max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Founder Executive Portrait Frame */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Glow Backdrop */}
                <div className="absolute inset-0 bg-gold-500/15 dark:bg-gold-500/10 blur-3xl rounded-3xl" />
                
                <div className="relative rounded-3xl overflow-hidden bg-slate-900 border-2 border-gold-500/40 shadow-2xl aspect-[4/5]">
                  <Image
                    src={BUSINESS_INFO.directorImage}
                    alt="Sri Tirumala Talabaktula - Founder & Principal Wealth Advisor at TMFS"
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061426] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-lg">
                    <p className="text-sm font-extrabold text-[#061426] dark:text-white">Sri Tirumala Talabaktula</p>
                    <p className="text-xs text-gold-600 dark:text-gold-400 font-bold">Founder &amp; Principal Wealth Advisor</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">AMFI Certified • ARN-144270</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Leadership Profile Narrative */}
            <div className="lg:col-span-7">
              <span className="inline-block px-3 py-1 rounded-full bg-gold-500/10 dark:bg-gold-500/20 text-gold-700 dark:text-gold-400 border border-gold-500/30 text-xs font-bold uppercase tracking-wider mb-4">
                Leadership Spotlight
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061426] dark:text-white font-heading leading-tight mb-2">
                Sri Tirumala Talabaktula
              </h2>
              <p className="text-base text-gold-600 dark:text-gold-400 font-bold mb-6">
                Founder, Principal Wealth Advisor &amp; AMFI Registered Distributor (ARN-144270)
              </p>

              <div className="space-y-4 text-slate-700 dark:text-slate-300 text-base leading-relaxed font-normal">
                <p>
                  A pioneer in structured financial planning across the Koraput region, Sri Tirumala Talabaktula established Tirumala Mutual Fund Services to democratize institutional-caliber wealth planning for families and ambitious investors.
                </p>
                <p>
                  Having navigated multiple market cycles—bull runs, corrective dips, and macro volatility—his investment advisory focuses on risk mitigation, capital preservation, and compounding discipline. Clients benefit from direct, 1-on-1 access rather than call centers or algorithmic black boxes.
                </p>
                <p>
                  He regularly conducts investor awareness seminars, educating professionals, teachers, business owners, and youth on the transformative power of systematic investing and compounding.
                </p>
              </div>

              {/* Advisory Specializations */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Key Advisory Specializations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Goal-Based SIP Architecture',
                    'Retirement Corpus Engineering',
                    'ELSS Tax-Saving Schemes (80C)',
                    'Lump-sum Deployment Strategies',
                    'Child Education Portfolios',
                    'Capital Gains & Tax Harvesting'
                  ].map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Consultation Action */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#061426] hover:bg-[#0a2540] dark:bg-gold-500 dark:hover:bg-gold-400 text-white dark:text-primary-950 font-extrabold text-sm shadow-md transition-all active:scale-95"
                >
                  <span>Book 1-on-1 Consultation</span>
                  <ArrowRight size={16} />
                </Link>

                <a
                  href={`tel:${CONTACT_INFO.mobile}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-300 dark:border-slate-700 transition-colors"
                >
                  <Phone size={16} className="text-gold-500" />
                  <span>Call: {CONTACT_INFO.mobileFormatted}</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CALL TO ACTION (Start Your Wealth Journey)                              */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24">
        <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#061426] via-[#0b1f3a] to-[#061426] p-8 sm:p-12 md:p-16 text-center text-white border-2 border-gold-500/40 shadow-2xl">
            
            {/* Glow Light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block px-3.5 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/40 text-xs font-extrabold uppercase tracking-widest mb-4">
                Begin Your Wealth Journey
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading leading-tight mb-4 text-white">
                Start Your Wealth Journey
              </h2>

              <p className="text-base sm:text-lg text-slate-300 mb-8 font-normal leading-relaxed">
                Connect with Sri Tirumala Talabaktula for a confidential, objective portfolio health check and personalized investment roadmap.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-primary-950 font-black px-7 py-3.5 rounded-xl text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight size={16} className="stroke-[3]" />
                </Link>

                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-sm border border-white/20 transition-colors"
                >
                  <span>Explore News &amp; NFOs</span>
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-400">
                <span>Office: {CONTACT_INFO.address.full}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
