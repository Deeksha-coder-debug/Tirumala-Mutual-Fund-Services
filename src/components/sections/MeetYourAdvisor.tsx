'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionHeading } from '@/components/ui/section-heading';
import { Badge } from '@/components/ui/badge';
import { Quote, Award, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { BUSINESS_INFO } from '@/lib/constants';

export default function MeetYourAdvisor() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      id="advisor-section"
      ref={ref}
      className="section-padding bg-white text-slate-900 dark:bg-slate-950 dark:text-white transition-colors pt-20 md:pt-24 pb-20 md:pb-24"
      aria-label="Meet Your Advisor"
    >
      <div className="container-custom max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold-500/10 dark:bg-gold-500/5 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 aspect-[3/2] border-2 border-gold-400/40 dark:border-gold-500/30 shadow-2xl group">
              <Image 
                src={BUSINESS_INFO.directorImage} 
                alt="Tirumala Talabaktula - Founder & Principal Advisor with TMFS in background" 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain sm:object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                priority
              />
            </div>

            {/* Credential Badge below photo so TMFS branding is completely unobscured */}
            <div className="mt-4">
              <div className="bg-white/95 dark:bg-slate-900/95 p-4 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-50 dark:bg-gold-500/20 border border-gold-200 dark:border-gold-500/30 flex items-center justify-center text-gold-600 dark:text-gold-400 shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">AMFI Certified Mutual Fund Distributor</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">ARN-144270 • 15+ Years Wealth Stewardship</p>
                  </div>
                </div>
                <Badge variant="glass" className="hidden sm:inline-flex text-[11px] font-bold text-gold-600 dark:text-gold-400 border-gold-300">
                  Verified
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge variant="glass" className="mb-6 border-gold-200 dark:border-gold-500/30 bg-gold-50 dark:bg-gold-500/10 text-primary-800 dark:text-gold-400">
              Your Financial Partner
            </Badge>
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 font-heading leading-tight">
              Meet The Expert Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-primary-900 dark:from-gold-400 dark:to-gold-600">Your Wealth</span>
            </h2>

            <div className="relative mb-8">
              <Quote size={48} className="absolute -top-4 -left-4 text-slate-200 dark:text-slate-800 -z-10 transform -scale-x-100" />
              <p className="text-lg md:text-xl text-primary-800 dark:text-slate-300 font-medium italic leading-relaxed pl-6 border-l-4 border-gold-500">
                "Our philosophy is simple: Investing shouldn't be gambling. It should be a disciplined, boring process that creates incredibly exciting results over time."
              </p>
            </div>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8 font-normal">
              With over 15 years of experience in the Indian financial markets, our founder has successfully navigated multiple market cycles. We don't just sell mutual funds; we architect financial freedom for our clients through rigorous research, absolute transparency, and long-term behavioral coaching.
            </p>

            <ul className="space-y-4">
              {[
                'Unbiased, research-backed fund selection',
                'Zero hidden fees or opaque structures',
                'Dedicated 1-on-1 portfolio reviews',
                'Behavioral coaching during market volatility'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                  Sri Tirumala Talabaktula
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Founder & Principal Wealth Advisor, TMFS</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
