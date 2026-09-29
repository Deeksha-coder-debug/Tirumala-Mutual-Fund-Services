'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import {
  Menu, X, ChevronDown, ChevronRight, MapPin, Phone, Sun, Moon, ArrowUpRight,
  MessageCircle, User as UserIcon, LogOut, LayoutDashboard, Shield, LogIn
} from 'lucide-react';
import { NAVIGATION, SITE_CONFIG, CONTACT_INFO } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
    document.body.style.overflow = !isMobileOpen ? 'hidden' : '';
  };

  const user = session?.user;
  const userEmail = (user?.email || '').toLowerCase().trim();
  const isAdmin =
    user?.role === 'ADMIN' ||
    userEmail === 'tiru.jeypore@gmail.com' ||
    userEmail === 'deeksha.jeypore@gmail.com';

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 h-[68px] md:h-[76px] transition-colors duration-300 ${
          isScrolled
            ? 'bg-primary-950/95 backdrop-blur-xl shadow-xl shadow-black/30 border-b border-primary-800/80'
            : 'bg-primary-950/90 backdrop-blur-lg border-b border-white/10'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex h-full w-full max-w-none items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Tirumala Mutual Fund Services - Home">
            <div className="relative w-11 h-11 md:w-13 md:h-13 rounded-full overflow-hidden ring-2 ring-gold-400/55 group-hover:ring-gold-400 transition-all duration-300 bg-white p-0.5 shadow-md shadow-gold-500/10 group-hover:shadow-gold-400/30">
              <Image
                src={SITE_CONFIG.logo}
                alt="Tirumala Mutual Fund Services Logo"
                fill
                sizes="52px"
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-black font-heading leading-none text-white drop-shadow-[0_1px_8px_rgba(255,255,255,0.16)] transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(214,168,79,0.4)]">
                Tirumala
              </h1>
              <p className="mt-1 text-[10px] md:text-[11px] tracking-[0.16em] font-extrabold uppercase text-gold-400 transition-all duration-300 group-hover:text-gold-300">
                Mutual Fund Services
              </p>
              <span className="mt-1 block h-0.5 w-8 rounded-full bg-gold-400/80 transition-all duration-300 group-hover:w-full group-hover:bg-gold-400" />
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
                  target={item.href.startsWith('https://') ? '_blank' : undefined}
                  rel={item.href.startsWith('https://') ? 'noopener noreferrer' : undefined}
                  className={`py-2 px-3 -mx-3 rounded-lg text-[15px] font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                    activeDropdown === item.label
                      ? 'bg-gold-500/15 text-gold-300 ring-1 ring-inset ring-gold-400/30 shadow-lg shadow-black/20'
                      : 'text-gold-400 hover:text-gold-300 hover:bg-gold-500/10'
                  }`}
                >
                  {item.label === 'Visit Our Office' && <MapPin size={14} aria-hidden="true" />}
                  {item.label}
                  {'children' in item && <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180 text-teal-600' : 'text-gold-400'}`} />}
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
                        className={`absolute top-full -left-4 mt-2 bg-white rounded-2xl shadow-2xl shadow-primary-950/40 border border-slate-200 overflow-hidden py-3 z-50 ${
                          item.label === 'Services' ? 'w-[560px]' : 'w-[320px]'
                        }`}
                      >
                        <div className="px-5 pb-2 border-b border-white/10">
                          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-700">
                            {item.label}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {item.label === 'Services' ? 'Plan, protect, and grow your wealth.' : 'Choose a tool for your investment goal.'}
                          </p>
                        </div>
                        <div className={`max-h-[70vh] overflow-y-auto p-2 ${item.label === 'Services' ? 'grid grid-cols-2 gap-1' : 'space-y-1'}`}>
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="group flex items-center gap-2 rounded-lg px-3 py-2.5 text-[13px] font-semibold leading-snug !text-gold-700 hover:bg-teal-50 hover:!text-teal-700 transition-colors"
                            >
                              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gold-600/80 transition-transform group-hover:translate-x-0.5 group-hover:text-gold-700" />
                              <span>{child.label}</span>
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
          <div className="flex items-center gap-3.5">

            {/* Auth Session State / CTA Button */}
            {status === 'authenticated' && user ? (
              <div className="hidden md:flex items-center gap-2.5">
                {/* Admin Console Direct Header Button */}
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold-500/15 hover:bg-gold-500/25 border border-gold-500/40 text-gold-400 text-xs font-bold transition-all shadow-sm group"
                  >
                    <Shield className="w-3.5 h-3.5 text-gold-400 group-hover:scale-110 transition-transform" />
                    <span>Admin Console</span>
                  </Link>
                )}

                <div className="relative" onMouseLeave={() => setUserDropdownOpen(false)}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 p-1 pl-3.5 pr-2 rounded-full bg-slate-900/90 border border-gold-500/40 text-white hover:border-gold-400 transition-all cursor-pointer shadow-lg"
                  >
                    <span className="text-xs font-bold max-w-[110px] truncate text-slate-100">
                      {user.name?.split(' ')[0] || 'Account'}
                    </span>
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || 'User'}
                        width={30}
                        height={30}
                        className="rounded-full border border-gold-400 object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 text-xs font-bold">
                        {user.name?.[0] || 'U'}
                      </div>
                    )}
                  </button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 text-slate-200 text-sm"
                      >
                        <div className="px-4 py-3 border-b border-slate-800/80">
                          <p className="font-bold text-white truncate">{user.name}</p>
                          <p className="text-xs text-slate-400 truncate">{user.email}</p>
                          <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gold-500/20 text-gold-400 border border-gold-500/30 uppercase tracking-wider">
                            {isAdmin ? 'ADMIN' : (user.role || 'CUSTOMER')}
                          </span>
                        </div>

                        <Link
                          href="/portal"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-slate-800 text-slate-200 hover:text-gold-400 transition-colors font-medium"
                        >
                          <LayoutDashboard className="w-4 h-4 text-gold-400" />
                          <span>Investor Portal</span>
                        </Link>

                        {(isAdmin || user.role === 'ADVISOR') && (
                          <Link
                            href="/advisor"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-slate-800 text-slate-200 hover:text-blue-400 transition-colors font-medium"
                          >
                            <UserIcon className="w-4 h-4 text-blue-400" />
                            <span>Advisor Console</span>
                          </Link>
                        )}

                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 font-bold transition-colors border-y border-gold-500/20 my-1"
                          >
                            <Shield className="w-4 h-4 text-gold-400" />
                            <span>Admin Console</span>
                          </Link>
                        )}

                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            signOut({ callbackUrl: '/' });
                          }}
                          className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 hover:bg-red-950/50 text-red-400 transition-colors border-t border-slate-800 mt-1 cursor-pointer font-medium"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/login"
                  className={`text-xs font-bold transition-all flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gold-500/30 hover:border-gold-400 cursor-pointer ${
                    isScrolled
                      ? 'bg-slate-900/90 text-gold-400 hover:bg-slate-900 shadow-md'
                      : 'bg-slate-900/60 backdrop-blur-md text-gold-400 hover:bg-slate-900/80 shadow-md'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5 text-gold-400" />
                  <span>Sign In</span>
                </Link>

                <Button
                  asChild
                  size="sm"
                  className="group rounded-full px-5 !border !border-gold-400/70 !bg-gradient-to-r !from-teal-600 !to-teal-500 !text-white shadow-lg shadow-teal-950/40 ring-1 ring-gold-400/20 hover:!from-teal-500 hover:!to-teal-400 hover:shadow-xl hover:shadow-teal-950/50"
                >
                  <Link href="/#contact">
                    Start Investing
                    <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobile}
              className={`xl:hidden p-2 rounded-lg transition-all duration-300 ${
                isScrolled
                  ? 'text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
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
      <div aria-hidden="true" className="h-[68px] md:h-[76px]" />

      {/* Dim the page while a desktop dropdown is open so the menu remains the visual focus. */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveDropdown(null)}
            className="fixed inset-0 z-40 hidden bg-primary-950/40 backdrop-blur-[1px] xl:block"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 xl:hidden"
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
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gold-400/40 bg-white p-0.5">
                    <Image
                      src={SITE_CONFIG.logo}
                      alt="TMFS Logo"
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-white font-heading">TMFS</span>
                </Link>
                <button
                  onClick={toggleMobile}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* User profile card in drawer if logged in */}
              {status === 'authenticated' && user && (
                <div className="m-5 p-4 bg-slate-900 border border-gold-500/30 rounded-2xl text-white shadow-lg">
                  <div className="flex items-center gap-3">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || 'User'}
                        width={40}
                        height={40}
                        className="rounded-full border border-gold-400 object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 font-bold">
                        {user.name?.[0] || 'U'}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <p className="font-bold text-sm truncate">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <Link
                      href="/portal"
                      onClick={toggleMobile}
                      className="font-bold text-gold-400 hover:underline flex items-center gap-1"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      Go to Portal
                    </Link>
                    <button
                      onClick={() => {
                        toggleMobile();
                        signOut({ callbackUrl: '/' });
                      }}
                      className="text-red-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile Links */}
              <nav className="p-5 space-y-2" aria-label="Mobile navigation">
                {NAVIGATION.map((item) => (
                  <div key={item.label}>
                    {'children' in item ? (
                      <>
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                          className="w-full flex items-center justify-between px-4 py-3 text-gold-600 dark:text-gold-400 hover:bg-gold-500/10 hover:text-gold-300 rounded-xl font-semibold transition-colors text-sm"
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
                              className="overflow-hidden ml-4 mt-1 border-l-2 border-slate-200 dark:border-slate-800"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={toggleMobile}
                                  className="block rounded-lg px-4 py-2.5 text-sm font-medium leading-snug text-gold-700 dark:text-gold-400 hover:bg-teal-900/30 hover:text-primary-600 dark:hover:text-gold-300 transition-colors"
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
                        target={item.href.startsWith('https://') ? '_blank' : undefined}
                        rel={item.href.startsWith('https://') ? 'noopener noreferrer' : undefined}
                        onClick={toggleMobile}
                        className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-gold-600 transition-colors hover:bg-gold-500/10 hover:text-gold-300 dark:text-gold-400"
                      >
                        {item.label === 'Visit Our Office' && <MapPin size={16} aria-hidden="true" />}
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile CTA Section */}
              <div className="p-5 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                {status === 'authenticated' && user ? (
                  <div className="space-y-2.5 mb-3 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div className="truncate pr-2">
                        <p className="text-xs font-bold text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      </div>
                      <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black bg-gold-500/20 text-gold-400 border border-gold-500/30 uppercase">
                        {isAdmin ? 'ADMIN' : (user.role || 'CUSTOMER')}
                      </span>
                    </div>

                    <Link
                      href="/portal"
                      onClick={toggleMobile}
                      className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <LayoutDashboard size={14} className="text-gold-400" />
                        <span>Investor Portal</span>
                      </span>
                      <span>→</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={toggleMobile}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 text-slate-950 text-xs font-black shadow-md transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <Shield size={14} className="text-slate-950" />
                          <span>Admin Console</span>
                        </span>
                        <span>→</span>
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        toggleMobile();
                        signOut({ callbackUrl: '/' });
                      }}
                      className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-red-400 hover:text-red-300 pt-1 cursor-pointer"
                    >
                      <LogOut size={13} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <Button asChild variant="outline" className="w-full h-12 rounded-xl border-gold-500/50 text-gold-600 dark:text-gold-400 hover:bg-gold-500/10 font-bold">
                    <Link href="/login" onClick={toggleMobile}>
                      <LogIn size={16} className="mr-2" />
                      Sign In to Portal
                    </Link>
                  </Button>
                )}
                <Button asChild className="w-full h-12 rounded-xl font-bold">
                  <Link href="/#contact" onClick={toggleMobile}>
                    <Phone size={16} className="mr-2" />
                    Start Investing
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full h-12 rounded-xl border-green-500 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-950 font-bold">
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
