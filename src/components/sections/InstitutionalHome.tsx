'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BadgeCheck, MapPin, ShieldCheck, TrendingUp, UserRound, Lock } from 'lucide-react';
import { BUSINESS_INFO, SITE_CONFIG } from '@/lib/constants';

const EMPANELED_AMCS = [
  'ICICI Prudential Mutual Fund',
  'HDFC Mutual Fund',
  'SBI Mutual Fund',
  'Tata Mutual Fund',
  'Nippon India Mutual Fund',
  'Kotak Mahindra Mutual Fund',
  'Aditya Birla Sun Life Mutual Fund',
  'Axis Mutual Fund',
  'Mirae Asset Mutual Fund',
  'Bandhan Mutual Fund'
];

export default function InstitutionalHome() {
  // SIP Calculator State
  const [monthlyInvestment, setMonthlyInvestment] = useState(15000);
  const [returnRate, setReturnRate] = useState(12);
  const [timeYears, setTimeYears] = useState(15);

  // Calculate SIP values
  const P = monthlyInvestment;
  const r = returnRate / 100 / 12;
  const n = timeYears * 12;
  const totalInvested = P * n;
  const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const wealthGain = Math.max(0, futureValue - totalInvested);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(Math.round(val)).replace('INR', '₹');
  };

  return (
    <div className="w-full bg-slate-50 text-primary-900 font-sans antialiased">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Midnight Institutional Atmosphere)                       */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden border-b border-white/10 bg-primary-950 pt-8 pb-12 text-white md:pt-10 md:pb-14">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(22rem,0.8fr)] xl:gap-16">
            <div className="flex flex-col items-start">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-white/5 px-3.5 py-2">
                <span className="material-symbols-outlined text-[16px] text-gold-400">verified</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300 sm:text-[11px]">
                  AMFI-Registered Mutual Fund Distributor • {BUSINESS_INFO.arn}
                </span>
              </div>

              <h1 className="mb-5 w-full text-left text-[2.35rem] font-light leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl xl:text-[3.9rem]">
                Nurturing Wealth Across Generations with{' '}
                <span className="block font-serif italic text-gold-400">Disciplined Wisdom.</span>
              </h1>
              <p className="mb-7 max-w-2xl text-[15px] leading-7 text-slate-300 sm:text-base">
                For over 15 years, Tirumala Mutual Fund Services has guided families, physicians, and enterprise leaders across Odisha and Pan-India toward enduring financial independence through bespoke mutual fund strategies and disciplined investing.
              </p>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-center text-sm font-bold text-primary-950 shadow-md transition-colors hover:bg-gold-400 sm:w-auto sm:text-[15px]"
                >
                  <span>Schedule a Wealth Consultation</span>
                  <span className="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
                </Link>

                <a
                  href="#sip-calculator"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:border-gold-400/70 hover:bg-white/5 sm:w-auto sm:text-[15px]"
                >
                  <span className="material-symbols-outlined mr-2 text-[18px] text-gold-500">calculate</span>
                  <span>Simulate SIP Growth</span>
                </a>
              </div>
            </div>

            {/* Right Desk Card */}
            <div className="xl:justify-self-end">
              <div
                className="w-full max-w-md rounded-2xl border border-gold-400/25 bg-white p-6 text-left text-primary-950 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.7)] sm:p-7"
              >
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-full border-2 border-gold-400 bg-slate-100 shadow-lg ring-2 ring-gold-400/30">
                      <Image
                        src={BUSINESS_INFO.directorImage}
                        alt="Sri Tirumala Talabaktula - Founder & Principal Advisor"
                        fill
                        sizes="(max-width: 640px) 64px, 80px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-gold-700">
                        Senior Wealth Stewardship
                      </span>
                      <h3 className="whitespace-nowrap font-sans text-base sm:text-lg font-bold leading-snug !text-primary-950">Sri Tirumala Talabaktula</h3>
                      <p className="text-xs text-slate-600">
                        Principal Wealth Strategist<br />
                        Jeypore, Odisha
                      </p>
                    </div>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-200 bg-gold-50 text-gold-700">
                    <BadgeCheck className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-gold-200/70 bg-[#f6f3ea] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-700">Wealth Philosophy</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    &ldquo;Let your money grow alongside your dreams, and pave the way to a golden future.
                    <br />
                    Start small, invest thoughtfully, and take a confident step toward the future you envision.&rdquo;
                  </p>
                </div>

                <div className="mt-5 grid gap-3 text-sm text-slate-700">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
                    <span>Tailored strategy and disciplined portfolio stewardship.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
                    <span>Transparent execution with risk-aware, goal-based planning.</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Stats Bar */}
            <div
              className="mt-2 grid grid-cols-2 gap-x-3 gap-y-6 border-t border-white/15 pt-6 md:grid-cols-4 md:gap-6 md:pt-7 xl:col-span-2"
            >
              <div className="px-2 text-center md:px-4">
                <span className="font-body tabular-nums text-[28px] md:text-[34px] text-gold-500 block font-semibold">15+</span>
                <span className="text-[14px] text-white mt-1 block font-medium">Advisory Heritage</span>
                <p className="text-[13px] text-slate-400 mt-1">Serving Koraput district &amp; nationwide clients</p>
              </div>
              <div className="border-l border-white/10 px-2 text-center md:px-4">
                <span className="font-body tabular-nums text-[28px] md:text-[34px] text-white block font-semibold">₹10+ Cr</span>
                <span className="text-[14px] text-white mt-1 block font-medium">Assets Monitored</span>
                <p className="text-[13px] text-slate-400 mt-1">Disciplined retail &amp; HNI portfolios</p>
              </div>
              <div className="border-l-0 px-2 text-center md:border-l md:border-white/10 md:px-4">
                <span className="font-body tabular-nums text-[28px] md:text-[34px] text-gold-400 block font-semibold">{BUSINESS_INFO.arn}</span>
                <span className="text-[14px] text-white mt-1 block font-medium">AMFI Registered</span>
                <p className="text-[13px] text-slate-400 mt-1">Statutory compliance and SEBI oversight</p>
              </div>
              <div className="border-l border-white/10 px-2 text-center md:px-4">
                <span className="font-body tabular-nums text-[28px] md:text-[34px] text-white block font-semibold">100%</span>
                <span className="text-[14px] text-white mt-1 block font-medium">Transparent Advice</span>
                <p className="text-[13px] text-slate-400 mt-1">Unbiased guidance and no hidden conflicts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE TMFS PHILOSOPHY / WHY TIRUMALA (Warm Ivory Foundation)             */}
      {/* ========================================================================= */}
      <section id="philosophy" className="bg-[#f6f3ea] text-primary-950 border-b border-primary-900/10">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
          <div className="mb-5 text-center">
            <span className="inline-flex items-center gap-2 text-[11px] text-gold-700 uppercase tracking-[0.18em] font-bold">
              <span className="h-px w-7 bg-gold-600" />
              TMFS Philosophy
            </span>
          </div>

          <div className="mx-auto mb-10 max-w-3xl px-3 py-2 text-center sm:mb-14 sm:px-6 sm:py-4 lg:mb-16">
            <h2 className="font-serif text-[2rem] leading-[1.15] !text-gold-800 sm:text-4xl lg:text-[2.8rem]">
              Wealth Advisory Grounded in Integrity and Local Closeness.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl rounded-xl border border-gold-200/70 border-l-2 border-l-gold-500 bg-white/60 px-6 py-6 text-[15px] leading-7 text-slate-700 sm:px-8 sm:py-8 sm:text-base">
              While algorithmic platforms reduce families to demographic data, Tirumala Mutual Fund Services combines institutional portfolio design with the warmth, patience, and confidentiality of your local Jeypore wealth counselor.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 lg:gap-5">
            <article className="flex min-h-[275px] flex-col justify-between rounded-2xl border border-primary-900/10 bg-white p-8 shadow-[0_12px_32px_-26px_rgba(11,31,58,0.5)] transition-transform duration-300 hover:-translate-y-1">
              <div>
                <div className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-700">
                  <span>01 / Discovery</span>
                  <span className="h-px flex-1 bg-gold-200" />
                </div>
                <h3 className="font-serif text-xl font-bold leading-snug !text-primary-950">Personalized Portfolio Blueprint</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  We never recommend standard off-the-shelf fund lists. Every portfolio is engineered around your tax bracket, liquidity demands, horizon requirements, and emotional comfort with equity volatility.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-semibold text-primary-800">
                <UserRound className="h-4 w-4 text-gold-600" aria-hidden="true" />
                <span>Custom Asset Allocation Matrices</span>
              </div>
            </article>

            <article className="flex min-h-[275px] flex-col justify-between rounded-2xl border border-primary-900/10 bg-white p-8 shadow-[0_12px_32px_-26px_rgba(11,31,58,0.5)] transition-transform duration-300 hover:-translate-y-1">
              <div>
                <div className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-700">
                  <span>02 / Stewardship</span>
                  <span className="h-px flex-1 bg-gold-200" />
                </div>
                <h3 className="font-serif text-xl font-bold leading-snug !text-primary-950">Disciplined SIP &amp; Compounding</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Harnessing Rupee Cost Averaging via Systematic Investment Plans (SIP), automated Step-Up mechanisms, and Systematic Transfer Plans (STP) to optimize equity entry during broad market corrections.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-semibold text-primary-800">
                <TrendingUp className="h-4 w-4 text-gold-600" aria-hidden="true" />
                <span>Strategic Step-Up Mechanisms</span>
              </div>
            </article>

            <article className="flex min-h-[275px] flex-col justify-between rounded-2xl border border-primary-900/10 bg-white p-8 shadow-[0_12px_32px_-26px_rgba(11,31,58,0.5)] transition-transform duration-300 hover:-translate-y-1 md:col-span-2 xl:col-span-1">
              <div>
                <div className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-700">
                  <span>03 / Compliance</span>
                  <span className="h-px flex-1 bg-gold-200" />
                </div>
                <h3 className="font-serif text-xl font-bold leading-snug !text-primary-950">Unwavering Regulatory Rigor</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  AMFI registered (ARN-144270) and committed to transparent, compliant processes. Clients receive direct counsel from senior wealth advisor Sri Tirumala Talabaktula with paperless execution.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-semibold text-primary-800">
                <ShieldCheck className="h-4 w-4 text-gold-600" aria-hidden="true" />
                <span>AMFI Registered Stewardship</span>
              </div>
            </article>
          </div>

          <div className="mt-6 flex flex-col gap-5 rounded-2xl bg-primary-950 p-6 text-white sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-400/40 bg-gold-500/10 text-gold-400">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold leading-snug sm:text-xl">
                  Rooted in Southern Odisha <span className="text-gold-400">•</span> Serving Pan-India
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                  Headquartered on NKT Road, Jeypore. Dedicated advisory for Koraput, Rayagada, Sunabeda, and Nabarangpur families.
                </p>
              </div>
            </div>
            <Link href="#enquiry" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-gold-500 px-5 py-3 text-sm font-bold text-primary-950 transition-colors hover:bg-gold-400">
              Visit Our Advisory Salon
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. COMPREHENSIVE WEALTH SOLUTIONS MATRIX                                   */}
      {/* ========================================================================= */}
      <section className="border-b border-slate-200 bg-white py-16 text-slate-900 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-12">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14 lg:mb-16">
            <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-gold-700">Structured Advisory Solutions</span>
            <h2 className="mb-4 font-serif text-3xl leading-tight !text-slate-950 sm:text-4xl lg:text-[40px]">
              Holistic Wealth Solutions for Every Life Stage
            </h2>
            <p className="text-[15px] leading-7 text-slate-600 sm:text-base">
              From your first systematic investment to multi-generational family estate preservation, our mandates are structured for stability and compounding.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 lg:gap-5">
            <div className="group flex min-h-[290px] flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:bg-white hover:shadow-lg sm:p-7">
              <div>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-gold-200 bg-gold-50 text-gold-700">
                  <span className="material-symbols-outlined text-[22px]">show_chart</span>
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold !text-slate-950">Mutual Funds &amp; SIP</h3>
                <p className="mb-5 text-sm leading-6 text-slate-600">
                  Curated portfolios encompassing Large-Cap, Flexi-Cap, Multi-Asset, and Hybrid schemes evaluated across Sharpe Ratio, rolling return consistency, and downside capture metrics.
                </p>
              </div>
              <Link href="/calculators/sip" className="flex items-center gap-2 text-sm font-bold text-primary-800 transition-colors group-hover:text-gold-700">
                <span>Explore Fund Universes</span>
                <span className="material-symbols-outlined text-[16px]">east</span>
              </Link>
            </div>

            <div className="group flex min-h-[290px] flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:bg-white hover:shadow-lg sm:p-7">
              <div>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-gold-200 bg-gold-50 text-gold-700">
                  <span className="material-symbols-outlined text-[22px]">savings</span>
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold !text-slate-950">ELSS &amp; Tax Optimization</h3>
                <p className="mb-5 text-sm leading-6 text-slate-600">
                  Maximise Section 80C deductions up to ₹1.5 Lakh while participating in Indian equity compounding with a short 3-year statutory lock-in, the lowest among all 80C options.
                </p>
              </div>
              <Link href="/calculators/goal" className="flex items-center gap-2 text-sm font-bold text-primary-800 transition-colors group-hover:text-gold-700">
                <span>Plan Tax Savings</span>
                <span className="material-symbols-outlined text-[16px]">east</span>
              </Link>
            </div>

            <div className="group flex min-h-[290px] flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:bg-white hover:shadow-lg sm:p-7">
              <div>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-gold-200 bg-gold-50 text-gold-700">
                  <span className="material-symbols-outlined text-[22px]">hourglass_bottom</span>
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold !text-slate-950">Retirement &amp; SWP Cash Flow</h3>
                <p className="mb-5 text-sm leading-6 text-slate-600">
                  Transform corpus into predictable monthly cash flows through Systematic Withdrawal Plans (SWP), yielding high tax efficiency compared to traditional bank deposits.
                </p>
              </div>
              <Link href="/calculators/retirement" className="flex items-center gap-2 text-sm font-bold text-primary-800 transition-colors group-hover:text-gold-700">
                <span>Calculate SWP Inflows</span>
                <span className="material-symbols-outlined text-[16px]">east</span>
              </Link>
            </div>

            <div className="group flex min-h-[290px] flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:bg-white hover:shadow-lg sm:p-7">
              <div>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-gold-200 bg-gold-50 text-gold-700">
                  <span className="material-symbols-outlined text-[22px]">domain</span>
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold !text-slate-950">Portfolio Management (PMS &amp; AIF)</h3>
                <p className="mb-5 text-sm leading-6 text-slate-600">
                  Specialized mandates for High-Net-Worth families (ticket sizes ₹50L+) focusing on unconstrained stock selection, thematic opportunities, and pre-IPO debt structures.
                </p>
              </div>
              <Link href="/#contact" className="flex items-center gap-2 text-sm font-bold text-primary-800 transition-colors group-hover:text-gold-700">
                <span>HNI Wealth Inquiries</span>
                <span className="material-symbols-outlined text-[16px]">east</span>
              </Link>
            </div>

            <div className="group flex min-h-[290px] flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:bg-white hover:shadow-lg sm:p-7">
              <div>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-gold-200 bg-gold-50 text-gold-700">
                  <span className="material-symbols-outlined text-[22px]">school</span>
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold !text-slate-950">Child Higher Education &amp; Future</h3>
                <p className="mb-5 text-sm leading-6 text-slate-600">
                  Milestone-driven portfolios matching your child’s timeline for undergraduate and overseas postgraduate milestones, incorporating gradual asset de-risking as targets near.
                </p>
              </div>
              <Link href="/calculators/education" className="flex items-center gap-2 text-sm font-bold text-primary-800 transition-colors group-hover:text-gold-700">
                <span>Map Future Milestones</span>
                <span className="material-symbols-outlined text-[16px]">east</span>
              </Link>
            </div>

            <div className="group flex min-h-[290px] flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:bg-white hover:shadow-lg sm:p-7">
              <div>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-gold-200 bg-gold-50 text-gold-700">
                  <span className="material-symbols-outlined text-[22px]">shield</span>
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold !text-slate-950">Fixed Income &amp; Capital Safety</h3>
                <p className="mb-5 text-sm leading-6 text-slate-600">
                  Conservative liquidity allocations across Sovereign Gold Bonds (SGB), AAA-rated Corporate Fixed Deposits, Target Maturity Funds, and emergency treasury reserves.
                </p>
              </div>
              <Link href="/calculators/lumpsum" className="flex items-center gap-2 text-sm font-bold text-primary-800 transition-colors group-hover:text-gold-700">
                <span>Explore Fixed Income</span>
                <span className="material-symbols-outlined text-[16px]">east</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE SIP & WEALTH GROWTH CALCULATOR PREVIEW                      */}
      {/* ========================================================================= */}
      <section className="bg-primary-950 py-16 text-white sm:py-20 lg:py-24" id="sip-calculator">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-12">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <div className="mx-auto mb-4 inline-flex w-fit items-center gap-2 rounded-lg bg-white/10 px-3 py-1 text-gold-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Compound Interest Simulator</span>
            </div>
            <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
              Experience the Power of Disciplined Compounding
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-[15px]">
              Consistent monthly SIPs eliminate market timing anxiety and unlock exponential compounding over 10 to 20-year horizons.
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
            {/* Controls */}
            <div className="flex max-w-2xl flex-col">
              <div className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-7 lg:p-8">
                {/* Investment */}
                <div>
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <label className="text-xs text-slate-300 font-medium">Monthly SIP Investment</label>
                    <span className="font-body tabular-nums text-xl text-gold-500 font-bold">{formatINR(monthlyInvestment)}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-gold-500"
                  />
                  <div className="mt-2 flex justify-between gap-2 text-[10px] font-body tabular-nums text-slate-400 sm:text-[11px]">
                    <span>₹ 1,000</span>
                    <span>₹ 50,000</span>
                    <span>₹ 1,00,000</span>
                  </div>
                </div>

                {/* Return */}
                <div>
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <label className="text-xs text-slate-300 font-medium">Expected Annual Return (CAGR)</label>
                    <span className="font-body tabular-nums text-xl text-white font-bold">{returnRate} %</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="18"
                    step="0.5"
                    value={returnRate}
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-gold-500"
                  />
                  <div className="mt-2 flex justify-between gap-2 text-[10px] font-body tabular-nums text-slate-400 sm:text-[11px]">
                    <span>6% (Debt)</span>
                    <span>12% (Balanced)</span>
                    <span>18% (Equity)</span>
                  </div>
                </div>

                {/* Horizon */}
                <div>
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <label className="text-xs text-slate-300 font-medium">Time Horizon</label>
                    <span className="font-body tabular-nums text-xl text-white font-bold">{timeYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="30"
                    step="1"
                    value={timeYears}
                    onChange={(e) => setTimeYears(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-gold-500"
                  />
                  <div className="mt-2 flex justify-between gap-2 text-[10px] font-body tabular-nums text-slate-400 sm:text-[11px]">
                    <span>3 Yrs</span>
                    <span>15 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Readout Column */}
            <div className="flex flex-col">
              <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl sm:p-7 lg:p-8">
                <div className="mb-6">
                  <span className="text-[11px] text-slate-400 tracking-wider uppercase block mb-1 font-bold">Estimated Maturity Corpus</span>
                  <div className="break-words font-body tabular-nums text-3xl font-bold tracking-tight text-gold-400 sm:text-4xl lg:text-5xl">
                    {formatINR(futureValue)}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Computed via standard compound growth formulas. Non-guaranteed projection for illustration.
                  </p>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 rounded-xl bg-white/5 p-4 sm:grid-cols-2">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase block font-semibold">Invested Capital</span>
                    <span className="font-body tabular-nums text-lg text-white font-bold">{formatINR(totalInvested)}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase block font-semibold">Estimated Wealth Gain</span>
                    <span className="font-body tabular-nums text-lg text-emerald-400 font-bold">{formatINR(wealthGain)}</span>
                  </div>
                </div>

                {/* SVG Curve */}
                <div className="relative mb-6 flex h-36 w-full flex-col justify-end overflow-hidden rounded-xl bg-white/5 p-3">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 120">
                    <path d="M0,110 Q120,100 240,65 T400,10 L400,120 L0,120 Z" fill="rgba(216, 179, 74, 0.25)" />
                    <path d="M0,110 Q120,100 240,65 T400,10" fill="none" stroke="#D6A84F" strokeWidth="3" />
                    <line stroke="#7A8496" strokeDasharray="4" strokeWidth="2" x1="0" x2="400" y1="110" y2="70" />
                  </svg>
                  <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2 font-medium">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-0.5 bg-slate-400" /> Principal
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-0.5 bg-gold-500" /> Total Wealth Accrual
                    </span>
                  </div>
                </div>

                <Link
                  href="/#contact"
                  className="w-full py-3.5 text-center bg-gold-500 text-primary-950 font-bold text-sm rounded-lg hover:bg-gold-600 transition-all shadow-md block"
                >
                  Start Your SIP Journey Today →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. THE ADVISORY JOURNEY (Disciplined 4-Step Process)                       */}
      {/* ========================================================================= */}
      <section className="border-b border-slate-200 bg-[#f6f3ea] py-16 text-slate-900 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-12">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14 lg:mb-16">
            <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-gold-700">Structured Engagement</span>
            <h2 className="mb-4 font-serif text-3xl leading-tight !text-slate-950 sm:text-4xl lg:text-[40px]">
              The Tirumala Advisory Process
            </h2>
            <p className="text-[15px] leading-7 text-slate-600 sm:text-base">
              A four-step consultative framework designed to instill absolute clarity before any rupee is deployed into the market.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:gap-5">
            <div className="flex min-h-[260px] flex-col justify-between rounded-2xl border border-slate-200 border-t-4 border-t-gold-500 bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-6">
                <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-gold-700">PHASE 01</span>
                <h3 className="mb-3 font-serif text-lg font-bold !text-slate-950">Discovery &amp; Goal Mapping</h3>
                <p className="text-sm leading-6 text-slate-600">
                  We catalog family milestones, cash flows, existing real estate/gold exposures, and debt liabilities to establish your actual baseline.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">Phase 1: Diagnosis</div>
            </div>

            <div className="flex min-h-[260px] flex-col justify-between rounded-2xl border border-slate-200 border-t-4 border-t-primary-700 bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-6">
                <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-gold-700">PHASE 02</span>
                <h3 className="mb-3 font-serif text-lg font-bold !text-slate-950">Risk Profiling &amp; Allocation</h3>
                <p className="text-sm leading-6 text-slate-600">
                  We determine your risk-bearing capacity versus behavioral willingness to withstand volatility, creating an optimum Debt-to-Equity ratio.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">Phase 2: Blueprint</div>
            </div>

            <div className="flex min-h-[260px] flex-col justify-between rounded-2xl border border-slate-200 border-t-4 border-t-primary-700 bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-6">
                <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-gold-700">PHASE 03</span>
                <h3 className="mb-3 font-serif text-lg font-bold !text-slate-950">Paperless Execution</h3>
                <p className="text-sm leading-6 text-slate-600">
                  Complete digital onboarding via BSE StAR MF platform, verified KYC, e-mandates, and nomination protocols seamlessly completed.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">Phase 3: Activation</div>
            </div>

            <div className="flex min-h-[260px] flex-col justify-between rounded-2xl border border-slate-200 border-t-4 border-t-primary-700 bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-6">
                <span className="mb-3 block font-mono text-xs font-bold tracking-widest text-gold-700">PHASE 04</span>
                <h3 className="mb-3 font-serif text-lg font-bold !text-slate-950">Rebalancing &amp; Stewardship</h3>
                <p className="text-sm leading-6 text-slate-600">
                  Bi-annual portfolio reviews, capital gain tax adjustments, asset rebalancing back to benchmark weights, and estate nomination audits.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">Phase 4: Governance</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CLIENT VOICES & REGIONAL HERITAGE                                      */}
      {/* ========================================================================= */}
      <section className="border-b border-slate-200 bg-white py-16 text-slate-900 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-12">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 lg:mb-16">
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.18em] text-gold-700">Client Stewardship</span>
            <h2 className="font-serif text-3xl leading-tight !text-slate-950 sm:text-4xl lg:text-[40px]">
              Trusted by Families Across Odisha
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-base">
              Reflections from entrepreneurs, senior clinicians, and executives who have partnered with TMFS for over a decade.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 lg:gap-5">
            <div className="flex min-h-[300px] flex-col justify-between rounded-2xl border border-slate-200 bg-[#f6f3ea]/60 p-6 sm:p-7">
              <div className="mb-6">
                <div className="mb-4 font-serif text-4xl leading-none text-gold-600">“</div>
                <p className="font-serif text-base italic leading-7 text-slate-800 sm:text-[17px]">
                  Running a clinical hospital in Koraput leaves very little bandwidth for stock market tracking. Sri Tirumala’s calm, disciplined SIP framework has compounded our family corpus steadily without a single stressful night.
                </p>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <h4 className="text-[16px] !text-slate-950 font-bold">Dr. S. K. Mohapatra</h4>
                <p className="text-[13px] text-slate-500">Senior Consultant Surgeon • Koraput, Odisha</p>
              </div>
            </div>

            <div className="flex min-h-[300px] flex-col justify-between rounded-2xl border border-slate-200 bg-[#f6f3ea]/60 p-6 sm:p-7">
              <div className="mb-6">
                <div className="mb-4 font-serif text-4xl leading-none text-gold-600">“</div>
                <p className="font-serif text-base italic leading-7 text-slate-800 sm:text-[17px]">
                  What distinguishes Tirumala Mutual Fund Services is their complete lack of aggressive product pushing. They take time to understand business working capital cycles before suggesting liquid and hybrid fund allocations.
                </p>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <h4 className="text-[16px] !text-slate-950 font-bold">Rajesh Pattnaik</h4>
                <p className="text-[13px] text-slate-500">Managing Director, Pattnaik Agro • Jeypore</p>
              </div>
            </div>

            <div className="flex min-h-[300px] flex-col justify-between rounded-2xl border border-slate-200 bg-[#f6f3ea]/60 p-6 sm:p-7 md:col-span-2 xl:col-span-1">
              <div className="mb-6">
                <div className="mb-4 font-serif text-4xl leading-none text-gold-600">“</div>
                <p className="font-serif text-base italic leading-7 text-slate-800 sm:text-[17px]">
                  Transitioning from active service into retirement was seamless with their SWP setup. I receive my monthly pension equivalent without tax erosion, while the core principal continues to combat inflation.
                </p>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <h4 className="text-[16px] !text-slate-950 font-bold">B. N. Tripathy, OAS (Retd.)</h4>
                <p className="text-[13px] text-slate-500">Former Administrator • Rayagada / Bhubaneswar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. EMPANELED MUTUAL FUND HOUSES (Institutional Network)                   */}
      {/* ========================================================================= */}
      <section className="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-[#070f1f] sm:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-12 text-center">
          <span className="inline-flex items-center gap-2 text-[11px] text-gold-700 dark:text-gold-400 uppercase tracking-[0.18em] font-bold mb-2">
            <span className="h-px w-6 bg-gold-600" />
            Institutional Network
            <span className="h-px w-6 bg-gold-600" />
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#061426] dark:text-white mb-4">
            Empaneled With India&apos;s Leading Mutual Fund Houses
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 font-normal">
            We provide seamless access to top-tier fund managers across active equity, index, hybrid, and liquid categories.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {EMPANELED_AMCS.map((amc, i) => (
              <span
                key={i}
                className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-xs hover:border-gold-500/50 hover:shadow-sm transition-all"
              >
                {amc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. REGULATORY RIGOR & STATUTORY COMPLIANCE DISCLOSURE                     */}
      {/* ========================================================================= */}
      <section className="border-t border-slate-200 bg-slate-100/80 py-12 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col md:flex-row items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-gold-400 shrink-0">
              <Lock size={24} />
            </div>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
              <p className="font-bold text-[#061426] dark:text-white mb-1">
                Statutory Compliance &amp; Risk Disclosure
              </p>
              <p>
                Tirumala Mutual Fund Services is an AMFI Registered Mutual Fund Distributor with ARN-144270. Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. Past performance is not an indicator of future returns.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
