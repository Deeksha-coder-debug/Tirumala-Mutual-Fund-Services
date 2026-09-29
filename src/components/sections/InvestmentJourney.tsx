'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionHeading } from '@/components/ui/section-heading';
import { UserPlus, Target, FileSearch, LineChart, Handshake } from 'lucide-react';

const JOURNEY_STEPS = [
  {
    title: 'Discovery & Profiling',
    description: 'We understand your financial situation, risk appetite, and life goals to create a customized profile.',
    icon: UserPlus,
  },
  {
    title: 'Goal Mapping',
    description: 'Assigning clear timelines and target amounts to your goals, from buying a house to retirement planning.',
    icon: Target,
  },
  {
    title: 'Portfolio Design',
    description: 'Selecting the optimal mix of mutual funds across equity, debt, and hybrid categories to maximize returns.',
    icon: FileSearch,
  },
  {
    title: 'Execution & Investment',
    description: 'Seamless onboarding and execution of SIPs or Lumpsum investments with zero hidden fees.',
    icon: Handshake,
  },
  {
    title: 'Review & Rebalancing',
    description: 'Continuous monitoring of your portfolio with periodic rebalancing to ensure you stay on track.',
    icon: LineChart,
  },
];

export default function InvestmentJourney() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      id="investment-journey"
      ref={ref}
      className="section-padding bg-white dark:bg-slate-950 transition-colors"
      aria-label="Investment Journey"
    >
      <div className="container-custom max-w-5xl">
        <SectionHeading 
          title="Your Investment Journey" 
          subtitle="A structured, transparent, and proven 5-step process to achieve financial freedom."
        />

        <div className="relative mt-16">
          {/* Vertical Line for Desktop */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 transform md:-translate-x-1/2 z-0 hidden sm:block" />

          <div className="flex flex-col gap-12 relative z-10">
            {JOURNEY_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`flex flex-col sm:flex-row items-start md:items-center gap-6 md:gap-0 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Empty half for alignment on Desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Icon Marker */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-slate-950 shadow-lg shadow-primary-500/10 flex items-center justify-center z-10 hidden sm:flex">
                    <Icon size={20} className="text-primary-600 dark:text-gold-400" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full sm:w-[calc(100%-4rem)] sm:ml-16 md:ml-0 md:w-1/2 flex ${isEven ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'}`}>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 w-full border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-shadow group relative overflow-hidden">
                      {/* Mobile Icon (hidden on desktop) */}
                      <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-gold-500/15 flex items-center justify-center sm:hidden mb-4 text-primary-600 dark:text-gold-400">
                        <Icon size={18} />
                      </div>

                      <div className="absolute top-0 left-0 w-1 h-full bg-primary-600 dark:bg-gold-500 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out" />
                      
                      <div className="flex items-center gap-4 mb-3 relative w-full">
                        <span className="text-primary-100 dark:text-slate-800 font-heading text-4xl font-black opacity-60 absolute right-6 top-6 pointer-events-none select-none">
                          0{index + 1}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading relative z-10">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed relative z-10">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
