'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Calendar, Calculator, IndianRupee, ShieldCheck,
  TrendingUp, Award, CheckCircle2, ChevronDown, CheckCircle, Trophy
} from 'lucide-react';
import { SITE_CONFIG, BUSINESS_INFO } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Hero() {
  const scrollToContent = () => {
    const el = document.getElementById('stats-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-slate-50 dark:bg-[#0a0f1c] pt-24 pb-12"
      aria-label="Hero section"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft top-left glow */}
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-300/30 dark:bg-primary-800/10 blur-[120px]" />
        {/* Soft bottom-right glow */}
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gold-400/20 dark:bg-gold-900/10 blur-[120px]" />
        
        {/* Faint Grid */}
        <div
          className="absolute inset-0 opacity-5 dark:opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column — Text & CTAs */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start pt-8 lg:pt-0">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="glass" className="mb-6 py-1.5 px-4 rounded-full flex items-center gap-2 border-primary-200 dark:border-primary-500/30 bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-200">
                <CheckCircle2 size={14} className="text-primary-600 dark:text-primary-400" />
                <span className="tracking-wide text-[11px] md:text-xs">Trusted Guidance. Disciplined Investing. Financial Freedom.</span>
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-title text-slate-900 dark:text-white mb-6"
            >
              Building{' '}
              <span className="text-gradient">Wealth.</span>
              <br />
              Creating Financial{' '}
              <span className="text-gradient relative inline-block">
                Freedom.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-body text-slate-600 dark:text-slate-400 mb-10 max-w-xl"
            >
              Helping individuals and families achieve their financial goals through disciplined investing and trusted financial advice. Partner with a dedicated advisor to navigate your investment journey.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto"
            >
              <Button asChild size="lg" className="w-full sm:w-auto text-base rounded-full shadow-lg shadow-primary-900/20 px-8">
                <Link href="/contact" className="flex items-center justify-center gap-2">
                  <Calendar size={18} />
                  Book Free Consultation
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg" className="w-full sm:w-auto text-base rounded-full px-8 hover:bg-white/5 border-white/10">
                <Link href="/calculators/sip" className="flex items-center justify-center gap-2">
                  <Calculator size={18} className="text-slate-600 dark:text-slate-300" />
                  Calculate SIP
                </Link>
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none w-full max-w-3xl"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-gold-500 dark:text-gold-400" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-900 dark:text-white font-medium">AMFI Registered</span>
                  <span className="text-[10px] text-slate-500">{BUSINESS_INFO.arn}</span>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-white/10 hidden sm:block"></div>
              
              <div className="flex items-center gap-2">
                <Award size={16} className="text-gold-500 dark:text-gold-400" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-900 dark:text-white font-medium">SEBI Regulated</span>
                  <span className="text-[10px] text-slate-500">100% Compliant</span>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-white/10 hidden sm:block"></div>

              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-gold-500 dark:text-gold-400" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-900 dark:text-white font-medium">100% Transparent</span>
                  <span className="text-[10px] text-slate-500">No Hidden Charges</span>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-white/10 hidden lg:block"></div>

              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-gold-500 dark:text-gold-400 hidden" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-900 dark:text-white font-medium">15+ Years Experience</span>
                  <span className="text-[10px] text-slate-500">Trusted Guidance</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-600 hover:text-white transition-colors cursor-pointer z-20"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll to content"
      >
        <ChevronDown size={24} />
      </motion.button>
    </section>
  );
}
