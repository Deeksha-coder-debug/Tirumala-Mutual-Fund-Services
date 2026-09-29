'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Phone, Search } from 'lucide-react';
import { SITE_CONFIG, CONTACT_INFO } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-primary-950 flex items-center justify-center px-6 transition-colors">
      <div className="text-center max-w-xl">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/" className="inline-block">
            <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden ring-2 ring-gold-400/30">
              <Image
                src={SITE_CONFIG.logo}
                alt="TMFS Logo"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          </Link>
        </motion.div>

        {/* 404 Number */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-primary-600 via-gold-500 to-primary-600 bg-clip-text text-transparent font-heading mb-4"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
            Page Not Found
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg mb-10 leading-relaxed">
            The page you are looking for doesn&apos;t exist or has been moved. Let us help you find your way back to building wealth.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2 bg-gradient-to-r from-primary-700 to-primary-800 hover:from-primary-600 hover:to-primary-700 text-white px-7 py-3.5 rounded-full font-semibold shadow-lg shadow-primary-800/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Home size={18} />
            Go Home
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 backdrop-blur-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white px-7 py-3.5 rounded-full font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5"
          >
            <Phone size={18} />
            Contact Us
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm"
        >
          <span className="text-slate-500">Quick links:</span>
          {[
            { label: 'Services', href: '/services' },
            { label: 'Calculators', href: '/calculators/sip' },
            { label: 'Blog', href: '/blog' },
            { label: 'FAQs', href: '/faq' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-primary-600 dark:text-gold-400/80 hover:text-primary-700 dark:hover:text-gold-300 font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
