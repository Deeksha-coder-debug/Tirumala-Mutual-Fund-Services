'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Award, BadgeCheck, Shield, Users, IndianRupee, UserCheck,
  Eye, Scale, Target, TrendingUp, Headphones, RefreshCcw,
} from 'lucide-react';
import { WHY_CHOOSE_US } from '@/lib/constants';

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award size={22} />,
  BadgeCheck: <BadgeCheck size={22} />,
  Shield: <Shield size={22} />,
  Users: <Users size={22} />,
  IndianRupee: <IndianRupee size={22} />,
  UserCheck: <UserCheck size={22} />,
  Eye: <Eye size={22} />,
  Scale: <Scale size={22} />,
  Target: <Target size={22} />,
  TrendingUp: <TrendingUp size={22} />,
  Headphones: <Headphones size={22} />,
  RefreshCcw: <RefreshCcw size={22} />,
};

export default function WhyChooseUs() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="section-padding bg-slate-50 dark:bg-slate-950 transition-colors"
      aria-label="Why choose us"
    >
      <div className="container-custom">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3.5 py-1 rounded-full bg-gold-500/10 dark:bg-gold-500/20 text-gold-700 dark:text-gold-400 border border-gold-500/30 text-xs font-extrabold tracking-wider uppercase mb-3">
            Why Trust Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-heading text-slate-900 dark:text-white">
            Why{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gold-300 dark:to-gold-500 text-transparent bg-clip-text">
              Choose Us?
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg font-medium">
            With over 15 years of dedicated advisory experience in Jeypore and Koraput, we deliver unmatched transparency and disciplined wealth growth.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-gold-500/50 shadow-md hover:shadow-xl transition-all duration-300 card-hover"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 dark:bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-600 dark:text-gold-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {iconMap[item.icon]}
              </div>

              {/* Content */}
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2 font-heading">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
