'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Calculator, PiggyBank, Sunset, GraduationCap, Target, ArrowRight } from 'lucide-react';

const calculators = [
  {
    title: 'SIP Calculator',
    description: 'Plan your monthly investments and see wealth growth over time',
    href: '/calculators/sip',
    icon: <PiggyBank size={28} />,
    color: 'from-primary-600 to-primary-800',
  },
  {
    title: 'Lumpsum Calculator',
    description: 'Calculate returns on your one-time investment',
    href: '/calculators/lumpsum',
    icon: <Calculator size={28} />,
    color: 'from-gold-500 to-gold-700',
  },
  {
    title: 'Retirement Planner',
    description: 'Plan for a comfortable and financially secure retirement',
    href: '/calculators/retirement',
    icon: <Sunset size={28} />,
    color: 'from-indigo-500 to-indigo-700',
  },
  {
    title: 'Education Planner',
    description: "Estimate the future cost of your child's education",
    href: '/calculators/education',
    icon: <GraduationCap size={28} />,
    color: 'from-emerald-500 to-emerald-700',
  },
  {
    title: 'Goal Planner',
    description: 'Track and plan investments for any financial goal',
    href: '/calculators/goal',
    icon: <Target size={28} />,
    color: 'from-orange-500 to-orange-700',
  },
];

export default function CalculatorPreview() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="section-padding bg-white dark:bg-gray-950"
      aria-label="Investment calculators"
    >
      <div className="container-custom">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-primary-700 dark:text-gold-400 text-sm font-semibold tracking-wider uppercase mb-3">
            Plan Your Investments
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-heading">
            Investment{' '}
            <span className="text-gradient">Calculators</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Use our advanced financial calculators to plan your investment journey with precision and clarity.
          </p>
        </motion.div>

        {/* Calculator Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {calculators.map((calc, index) => (
            <motion.div
              key={calc.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={calc.href}
                className="group block bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 h-full border border-gray-100 dark:border-gray-800 card-hover hover:border-primary-200 dark:hover:border-primary-700/50 text-center"
              >
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${calc.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                  {calc.icon}
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 font-heading">
                  {calc.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                  {calc.description}
                </p>
                <span className="inline-flex items-center gap-1 text-primary-600 dark:text-gold-400 text-sm font-semibold group-hover:gap-2 transition-all">
                  Calculate
                  <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
