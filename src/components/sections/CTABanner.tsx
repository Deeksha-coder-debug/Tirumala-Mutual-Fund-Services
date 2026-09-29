'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles } from 'lucide-react';

export default function CTABanner() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section ref={ref} className="relative overflow-hidden pt-8 pb-4 sm:pt-8 sm:pb-6 lg:pt-12 lg:pb-8" aria-label="Call to action">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950" />
      
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 mb-8">
            <Sparkles size={14} className="text-gold-400" />
            <span className="text-gold-300 text-xs font-bold tracking-wider uppercase">
              Free Financial Consultation
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 font-heading leading-tight">
            Ready to Structure{' '}
            <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
              Your Financial Future?
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-medium">
            Take the first step towards financial freedom. Book a free consultation with our experienced financial advisor and start building your wealth today.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
