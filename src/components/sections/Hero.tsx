'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const scrollToContent = () => {
    const el = document.getElementById('stats-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="flex-grow pt-24 pb-16 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] relative bg-hexagon-pattern text-white px-6 md:px-12"
      aria-label="Hero section"
    >
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/80 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl text-center space-y-6 py-12">
        {/* Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 border border-amber-500/40 backdrop-blur-md shadow-xl"
        >
          <span className="material-symbols-outlined text-amber-400 text-[18px]">diamond</span>
          <span className="text-xs md:text-sm font-bold text-amber-300 tracking-wider uppercase">
            Trusted Guidance • Disciplined Investing • Financial Freedom
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-[64px] md:leading-[72px] font-extrabold text-white font-heading tracking-tight">
            Building <span className="bg-gradient-to-r from-amber-300 via-gold-400 to-amber-500 text-transparent bg-clip-text">Wealth.</span>
            <br />
            Creating Financial
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-indigo-200 to-white text-transparent bg-clip-text">Freedom.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto mt-6 leading-relaxed font-normal">
            Empowering families and investors across Odisha & India to achieve long-term wealth growth through AMFI-registered mutual fund advisory and customized portfolio strategies.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-slate-950 font-extrabold px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-gold-500/20 border border-gold-400/40"
          >
            <span className="material-symbols-outlined text-[20px]">event</span>
            <span>Book Free Consultation</span>
          </Link>

          <Link
            href="/calculators/sip"
            className="w-full sm:w-auto bg-slate-900/90 border border-slate-700 hover:border-gold-400 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 backdrop-blur-md shadow-xl"
          >
            <span className="material-symbols-outlined text-amber-400 text-[20px]">calculate</span>
            <span>Calculate SIP Growth</span>
          </Link>
        </motion.div>
      </div>

      {/* Trust Indicators Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 w-full max-w-5xl mt-12 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-md rounded-2xl p-5 flex items-center gap-3.5 hover:border-gold-500/40 transition-all shadow-lg">
          <div className="w-11 h-11 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <span className="material-symbols-outlined">verified_user</span>
          </div>
          <div>
            <div className="text-sm font-bold text-white">AMFI Registered</div>
            <div className="text-xs text-slate-400">ARN-144270</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-md rounded-2xl p-5 flex items-center gap-3.5 hover:border-gold-500/40 transition-all shadow-lg">
          <div className="w-11 h-11 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <span className="material-symbols-outlined">assured_workload</span>
          </div>
          <div>
            <div className="text-sm font-bold text-white">SEBI Regulated</div>
            <div className="text-xs text-slate-400">100% Compliant</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-md rounded-2xl p-5 flex items-center gap-3.5 hover:border-gold-500/40 transition-all shadow-lg">
          <div className="w-11 h-11 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <span className="material-symbols-outlined">handshake</span>
          </div>
          <div>
            <div className="text-sm font-bold text-white">100% Transparent</div>
            <div className="text-xs text-slate-400">Direct Guidance</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-md rounded-2xl p-5 flex items-center gap-3.5 hover:border-gold-500/40 transition-all shadow-lg">
          <div className="w-11 h-11 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <span className="material-symbols-outlined">workspace_premium</span>
          </div>
          <div>
            <div className="text-sm font-bold text-white">15+ Years Exp.</div>
            <div className="text-xs text-slate-400">Trusted Advisor</div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer z-20"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll down"
      >
        <span className="material-symbols-outlined text-[32px]">keyboard_arrow_down</span>
      </motion.button>
    </section>
  );
}
