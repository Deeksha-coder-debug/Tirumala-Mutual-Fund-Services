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
      className="section-padding bg-white dark:bg-gray-950"
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
          <span className="inline-block text-primary-700 dark:text-gold-400 text-sm font-semibold tracking-wider uppercase mb-3">
            Why Trust Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-heading">
            Why{' '}
            <span className="text-gradient">Choose Us?</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            With over 15 years of dedicated service, we have built lasting relationships through trust, transparency, and results.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group relative bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-700/50 card-hover"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center text-primary-700 dark:text-gold-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {iconMap[item.icon]}
              </div>

              {/* Content */}
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5 font-heading">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>

              {/* Hover gradient border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-600/0 to-gold-500/0 group-hover:from-primary-600/5 group-hover:to-gold-500/5 pointer-events-none transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
