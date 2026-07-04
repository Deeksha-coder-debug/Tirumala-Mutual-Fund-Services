'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionHeading } from '@/components/ui/section-heading';
import { Badge } from '@/components/ui/badge';
import { Quote, Award, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function MeetYourAdvisor() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      id="advisor-section"
      ref={ref}
      className="section-padding bg-white dark:bg-[#0a0f1c] transition-colors"
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
            
            <div className="relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 aspect-[4/5] border border-slate-200 dark:border-slate-800 shadow-2xl group">
              <Image 
                src="/images/director.jpeg" 
                alt="Tirumala Talabaktula - Founder & Principal Advisor" 
                fill 
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10" />
              
              {/* Floating Badge Bottom Left */}
              <div className="absolute bottom-6 left-6 z-20">
                <div className="glass-card bg-white/90 dark:bg-[#111827]/90 p-4 rounded-xl shadow-lg border border-white/20 dark:border-slate-700/50 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold-100 dark:bg-gold-500/20 flex items-center justify-center text-gold-600 dark:text-gold-400">
                      <Award size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">AMFI Certified</p>
                      <p className="text-xs text-slate-500">Mutual Fund Distributor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge variant="glass" className="mb-6 border-gold-200 dark:border-gold-500/30 bg-gold-50 dark:bg-gold-500/10 text-gold-700 dark:text-gold-400">
              Your Financial Partner
            </Badge>
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 font-heading leading-tight">
              Meet The Expert Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800 dark:from-gold-400 dark:to-gold-600">Your Wealth</span>
            </h2>

            <div className="relative mb-8">
              <Quote size={48} className="absolute -top-4 -left-4 text-slate-100 dark:text-slate-800 -z-10 transform -scale-x-100" />
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium italic leading-relaxed pl-6 border-l-4 border-gold-500">
                "Our philosophy is simple: Investing shouldn't be gambling. It should be a disciplined, boring process that creates incredibly exciting results over time."
              </p>
            </div>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
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

            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4">
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                  Tirumala Talabaktula
                </h4>
                <p className="text-sm text-slate-500 font-medium">Founder & Principal Advisor, TMFS</p>
              </div>
              <div className="ml-auto hidden sm:block">
                 {/* Signature */}
                 <div className="font-script text-3xl text-slate-400 dark:text-slate-600 opacity-60">
                    T. Talabaktula
                 </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
