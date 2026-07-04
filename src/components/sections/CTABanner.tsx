'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Phone, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

export default function CTABanner() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" aria-label="Call to action">
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

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 mb-8">
            <Sparkles size={14} className="text-gold-400" />
            <span className="text-gold-300 text-xs font-semibold tracking-wider uppercase">
              Free Financial Consultation
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 font-heading leading-tight">
            Start Your Wealth{' '}
            <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
              Journey Today
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Take the first step towards financial freedom. Book a free consultation with our experienced financial advisor and start building your wealth today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-gray-900 px-8 py-4 rounded-full font-bold shadow-xl shadow-gold-500/25 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-base"
            >
              Book Free Consultation
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href={`tel:${CONTACT_INFO.mobile}`}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/10 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1"
            >
              <Phone size={18} />
              Call Now
            </a>

            <a
              href={CONTACT_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-green-600/25 transition-all duration-300 hover:-translate-y-1"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
