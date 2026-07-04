'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  Repeat, PieChart, Receipt, ArrowDownToLine, ArrowRightLeft,
  Briefcase, Gem, Target, Landmark, Sunset, GraduationCap,
  TrendingUp, ClipboardList, FileText, ShieldCheck, HeartPulse,
  HandCoins, Siren, Building, ArrowRight, Goal,
} from 'lucide-react';
import { SERVICES_DATA } from '@/lib/constants';

const iconMap: Record<string, React.ReactNode> = {
  Repeat: <Repeat size={24} />,
  PieChart: <PieChart size={24} />,
  Receipt: <Receipt size={24} />,
  ArrowDownToLine: <ArrowDownToLine size={24} />,
  ArrowRightLeft: <ArrowRightLeft size={24} />,
  Briefcase: <Briefcase size={24} />,
  Gem: <Gem size={24} />,
  Target: <Target size={24} />,
  Landmark: <Landmark size={24} />,
  Sunset: <Sunset size={24} />,
  GraduationCap: <GraduationCap size={24} />,
  Goal: <Target size={24} />,
  TrendingUp: <TrendingUp size={24} />,
  ClipboardList: <ClipboardList size={24} />,
  FileText: <FileText size={24} />,
  ShieldCheck: <ShieldCheck size={24} />,
  HeartPulse: <HeartPulse size={24} />,
  HandCoins: <HandCoins size={24} />,
  Siren: <Siren size={24} />,
  Building: <Building size={24} />,
};

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  // Show first 8 services on homepage
  const displayServices = SERVICES_DATA.slice(0, 8);

  return (
    <section
      ref={ref}
      className="section-padding bg-gray-50 dark:bg-gray-900/50"
      aria-label="Our services"
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
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-heading">
            Comprehensive{' '}
            <span className="text-gradient">Financial Services</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            From SIPs to retirement planning, we provide end-to-end financial solutions tailored to your goals and risk appetite.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayServices.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group block bg-white dark:bg-gray-900 rounded-2xl p-6 h-full border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:border-primary-200 dark:hover:border-primary-500/50"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center text-primary-700 dark:text-gold-400 mb-5 group-hover:bg-gradient-to-br group-hover:from-primary-700 group-hover:to-primary-800 group-hover:text-white dark:group-hover:from-gold-500 dark:group-hover:to-gold-600 dark:group-hover:text-gray-900 transition-all duration-300">
                  {iconMap[service.icon]}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-heading group-hover:text-primary-700 dark:group-hover:text-gold-400 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                  {service.shortDescription}
                </p>

                {/* Risk Level Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full">
                    Risk: {service.riskLevel}
                  </span>
                  <ArrowRight size={16} className="text-primary-600 dark:text-gold-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary-800 to-primary-700 hover:from-primary-700 hover:to-primary-600 text-white px-8 py-3.5 rounded-full font-semibold shadow-lg shadow-primary-800/25 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            View All 20+ Services
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
