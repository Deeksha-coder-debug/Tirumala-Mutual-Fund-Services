'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, Phone, Sun, Moon, Search,
  MessageCircle,
} from 'lucide-react';
import { NAVIGATION, SITE_CONFIG, CONTACT_INFO } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
    document.body.style.overflow = !isMobileOpen ? 'hidden' : '';
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-lg shadow-primary-900/5 py-3'
            : 'bg-transparent py-5'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Tirumala Mutual Fund Services - Home">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ring-gold-400/30 group-hover:ring-gold-400 transition-all duration-300 bg-white">
              <Image
                src={SITE_CONFIG.logo}
                alt="Tirumala Mutual Fund Services Logo"
                fill
                sizes="56px"
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-lg md:text-xl font-bold font-heading leading-tight transition-colors duration-300 ${
                isScrolled ? 'text-primary-900 dark:text-white' : 'text-white'
              }`}>
                Tirumala
              </h1>
              <p className={`text-[10px] md:text-xs tracking-widest font-medium uppercase transition-colors duration-300 ${
                isScrolled ? 'text-gold-600 dark:text-gold-400' : 'text-gold-400'
              }`}>
                Mutual Fund Services
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-6">
            {NAVIGATION.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => 'children' in item && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`py-2 text-[15px] font-medium transition-all duration-300 flex items-center gap-1.5 ${
                    isScrolled
                      ? 'text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-gold-400'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {item.label}
                  {'children' in item && <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-300" />}
                </Link>

                {/* Dropdown Menu */}
                {'children' in item && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full -left-4 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-2xl shadow-primary-900/10 border border-slate-100 dark:border-slate-800 overflow-hidden min-w-[280px] py-3"
                      >
                        <div className="max-h-[70vh] overflow-y-auto">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-6 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-gold-400 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  : 'text-white/80 hover:bg-white/10'
              }`}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* CTA Button — Desktop */}
            <Button asChild size="sm" className="hidden md:flex rounded-full px-6">
              <Link href="/contact">
                Start Investing
              </Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobile}
              className={`xl:hidden p-2 rounded-lg transition-all duration-300 ${
                isScrolled
                  ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden"
              onClick={toggleMobile}
            />

            {/* Mobile Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-slate-950 z-50 xl:hidden shadow-2xl overflow-y-auto"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                <Link href="/" onClick={toggleMobile} className="flex items-center gap-2">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gold-400/30 bg-white p-1">
                    <Image
                      src={SITE_CONFIG.logo}
                      alt="TMFS Logo"
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                  <span className="font-bold text-primary-900 dark:text-white font-heading">TMFS</span>
                </Link>
                <button
                  onClick={toggleMobile}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="p-5 space-y-2" aria-label="Mobile navigation">
                {NAVIGATION.map((item) => (
                  <div key={item.label}>
                    {'children' in item ? (
                      <>
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                          className="w-full flex items-center justify-between px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg font-medium transition-colors"
                        >
                          {item.label}
                          <ChevronDown
                            size={16}
                            className={`transform transition-transform duration-200 ${
                              activeDropdown === item.label ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden ml-4 mt-1 border-l-2 border-slate-100 dark:border-slate-800"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={toggleMobile}
                                  className="block px-6 py-3 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-gold-400 transition-colors"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={toggleMobile}
                        className="block px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg font-medium transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile CTA Section */}
              <div className="p-5 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <Button asChild className="w-full h-12 rounded-xl">
                  <Link href="/contact" onClick={toggleMobile}>
                    <Phone size={16} className="mr-2" />
                    Start Investing
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full h-12 rounded-xl border-green-500 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-950">
                  <a
                    href={CONTACT_INFO.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={toggleMobile}
                  >
                    <MessageCircle size={16} className="mr-2" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
