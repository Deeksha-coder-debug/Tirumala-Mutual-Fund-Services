'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Landmark, Briefcase, TrendingUp, Shield, BarChart3, PieChart } from 'lucide-react';

const PARTNERS = [
  { name: 'HDFC Mutual Fund', icon: Landmark, color: 'text-red-600 dark:text-red-400' },
  { name: 'SBI Mutual Fund', icon: Shield, color: 'text-blue-600 dark:text-blue-400' },
  { name: 'ICICI Prudential', icon: Briefcase, color: 'text-orange-500 dark:text-orange-400' },
  { name: 'Nippon India', icon: TrendingUp, color: 'text-red-500 dark:text-red-400' },
  { name: 'Kotak Mutual Fund', icon: BarChart3, color: 'text-red-700 dark:text-red-400' },
  { name: 'Axis Mutual Fund', icon: PieChart, color: 'text-rose-700 dark:text-rose-400' },
];

export default function Partners() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden transition-colors"
      aria-label="Partner Fund Houses"
    >
      <div className="container-custom">
        <div className="text-center mb-10">
          <p className="text-sm font-bold tracking-wider text-slate-600 dark:text-slate-300 uppercase">
            Empowering your wealth with India&apos;s top AMCs
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
          {/* Fading Edges */}
          <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10" />
          <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10" />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex w-full"
          >
            <motion.div 
              className="flex items-center gap-12 md:gap-24 whitespace-nowrap px-8"
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, index) => {
                const Icon = partner.icon;
                return (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 group cursor-pointer grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  >
                    <Icon className={`w-8 h-8 ${partner.color}`} />
                    <span className="text-xl font-bold text-slate-800 dark:text-slate-100 font-heading">
                      {partner.name}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
