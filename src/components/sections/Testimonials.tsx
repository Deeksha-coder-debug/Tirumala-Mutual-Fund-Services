'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight, Quote, Play } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Business Owner, Jeypore',
    content: 'Mr. Tirumala has been managing my portfolio for over 8 years. His disciplined approach to SIP investments has helped me build significant wealth for my retirement. Truly trustworthy and knowledgeable.',
    rating: 5,
  },
  {
    name: 'Priya Mohanty',
    role: 'Government Employee, Koraput',
    content: "I started my investment journey with TMFS for my children's education planning. The personalized guidance and regular portfolio reviews have given me complete peace of mind about their future.",
    rating: 5,
  },
  {
    name: 'Dr. Suresh Patel',
    role: 'Medical Professional, Jeypore',
    content: 'As a busy professional, I needed someone reliable to handle my investments. Tirumala Mutual Fund Services exceeded my expectations with their transparent advice and consistent follow-ups.',
    rating: 5,
  },
  {
    name: 'Anita Devi',
    role: 'Teacher, Malkangiri',
    content: 'I was new to mutual fund investing and was quite nervous. Mr. Tirumala patiently explained every aspect and designed a plan perfectly suited to my income and goals. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    role: 'Entrepreneur, Rayagada',
    content: "The tax-saving ELSS investments suggested by TMFS have saved me lakhs over the years while simultaneously growing my wealth. Their expertise in financial planning is unmatched in the region.",
    rating: 5,
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      ref={ref}
      className="section-padding bg-slate-50 dark:bg-slate-950 transition-colors"
      aria-label="Client testimonials"
    >
      <div className="container-custom">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3.5 py-1 rounded-full bg-primary-50 dark:bg-gold-500/15 border border-primary-200 dark:border-gold-500/30 text-primary-700 dark:text-gold-400 text-xs font-extrabold tracking-wider uppercase mb-4">
            What Our Clients Say
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-heading text-slate-900 dark:text-white">
            Trusted by{' '}
            <span className="text-gradient">300+ Families</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg font-medium">
            Hear from our satisfied clients who have trusted us with their financial future.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-800 text-center relative"
            >
              {/* Quote Icon */}
              <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-primary-50 dark:bg-gold-500/15 border border-primary-100 dark:border-gold-500/30 flex items-center justify-center">
                <Quote size={24} className="text-primary-600 dark:text-gold-400" />
              </div>

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-gold-400 fill-gold-400" />
                ))}
              </div>

              {/* Content */}
              <p className="font-serif text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed mb-8 italic">
                &ldquo;{testimonials[current].content}&rdquo;
              </p>

              {/* Author */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  {testimonials[current].name}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {testimonials[current].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-primary-50 dark:hover:bg-gold-500/10 hover:text-primary-700 dark:hover:text-gold-400 hover:border-primary-300 dark:hover:border-gold-500/40 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-8 h-2.5 bg-primary-700 dark:bg-gold-400'
                      : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === current ? 'true' : 'false'}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-primary-50 dark:hover:bg-gold-500/10 hover:text-primary-700 dark:hover:text-gold-400 hover:border-primary-300 dark:hover:border-gold-500/40 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Video Testimonials Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-center text-xl font-bold text-slate-900 dark:text-white mb-8 font-heading">
            Video Testimonials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative aspect-video rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center group cursor-pointer overflow-hidden border border-slate-300 dark:border-slate-700"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-primary-800/40 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-14 h-14 rounded-full bg-white/90 dark:bg-slate-900/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg border border-slate-200 dark:border-slate-700">
                  <Play size={22} className="text-primary-700 dark:text-gold-400 ml-1" fill="currentColor" />
                </div>
                <p className="absolute bottom-3 left-3 text-white text-xs font-semibold opacity-80">
                  Coming Soon
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
