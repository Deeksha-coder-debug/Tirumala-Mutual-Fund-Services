'use client';

import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Users, TrendingUp, ShieldCheck, Star, CheckCircle2 } from 'lucide-react';
import { STATS } from '@/lib/constants';

const iconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy size={22} />,
  Users: <Users size={22} />,
  TrendingUp: <TrendingUp size={22} />,
  Shield: <ShieldCheck size={22} />,
};

export default function Stats() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      id="stats-section"
      ref={ref}
      className="relative bg-white dark:bg-slate-950 py-24 overflow-hidden transition-colors"
      aria-label="Why choose us"
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-primary-100/40 dark:bg-primary-900/20 blur-[150px] rounded-full" />
      </div>

      <div className="container-custom relative z-10 mx-auto max-w-6xl flex flex-col items-center">
        
        {/* Custom Glowing Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-50 dark:bg-gold-500/15 border border-gold-200 dark:border-gold-500/30 mb-6">
            <Star size={14} className="text-gold-500 dark:text-gold-400" />
            <span className="text-gold-700 dark:text-gold-400 text-xs font-extrabold tracking-widest uppercase">
              Proven Track Record
            </span>
            <Star size={14} className="text-gold-500 dark:text-gold-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 font-heading leading-tight">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-600 dark:from-gold-400 dark:to-gold-600">Choose Us?</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-medium">
            A track record built on trust, absolute transparency, and proven wealth creation strategies.
          </p>
        </motion.div>
        
        {/* Stats Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full max-w-6xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
        >
          {/* Subtle gold glow behind container */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent opacity-80" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 p-2 sm:p-4">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                className={`relative flex flex-col items-center text-center p-8 group ${
                  index !== STATS.length - 1 ? 'lg:border-r border-slate-200 dark:border-slate-800' : ''
                } ${index === 1 ? 'md:border-r border-slate-200 dark:border-slate-800 lg:border-r' : ''}`}
              >
                {/* Icon in glowing circle */}
                <div className="w-14 h-14 rounded-2xl bg-gold-50 dark:bg-gold-500/15 border border-gold-200 dark:border-gold-500/30 flex items-center justify-center text-gold-600 dark:text-gold-400 mb-6 group-hover:-translate-y-1 group-hover:shadow-lg transition-all duration-300">
                  {iconMap[stat.icon]}
                </div>

                {/* Counter */}
                <div className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white font-body tabular-nums tracking-tight mb-2 flex items-center justify-center">
                  {stat.prefix && <span className="text-gold-500 mr-1 text-3xl md:text-4xl">{stat.prefix}</span>}
                  {inView ? (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      useEasing
                    />
                  ) : (
                    '0'
                  )}
                  <span className="text-slate-900 dark:text-white ml-1">{stat.suffix}</span>
                </div>

                {/* Label */}
                <p className="text-sm md:text-base text-slate-800 dark:text-slate-200 font-bold mb-2 text-center">
                  {stat.label}
                </p>

                {/* Extra descriptive text */}
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[180px] text-center">
                  {index === 0 && 'Delivering trusted financial guidance since 2008.'}
                  {index === 1 && 'Serving families & individuals across India.'}
                  {index === 2 && 'Growing significant wealth together over time.'}
                  {index === 3 && 'Zero hidden charges. Complete clarity.'}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom Live Trust Bar */}
          <div className="bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 py-5 px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Left Side: Rating */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/15 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/30">
                <span className="text-sm text-emerald-700 dark:text-emerald-400 font-extrabold">4.9/5</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="flex text-gold-400 gap-1">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <span className="text-xs text-slate-700 dark:text-slate-300 uppercase tracking-widest font-bold mt-1 sm:mt-0">
                  Client Satisfaction
                </span>
              </div>
            </div>

            {/* Right Side: Trust Signals */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-gold-500" />
                <span className="text-xs md:text-sm text-slate-800 dark:text-slate-200 font-bold">15+ Years Exp.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-gold-500" />
                <span className="text-xs md:text-sm text-slate-800 dark:text-slate-200 font-bold">300+ Families Served</span>
              </div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
