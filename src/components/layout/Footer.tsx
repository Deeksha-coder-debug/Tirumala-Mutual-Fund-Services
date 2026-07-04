'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, Facebook, Instagram,
  ArrowRight, Heart, ExternalLink,
} from 'lucide-react';
import { SITE_CONFIG, CONTACT_INFO, SOCIAL_LINKS, BUSINESS_INFO, DISCLAIMER_TEXT } from '@/lib/constants';

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'SIP Calculator', href: '/calculators/sip' },
  { label: 'News & NFOs', href: '/news' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const serviceLinks = [
  { label: 'Systematic Investment Plan', href: '/services/sip' },
  { label: 'Mutual Funds', href: '/services/mutual-funds' },
  { label: 'ELSS Tax Saving', href: '/services/elss' },
  { label: 'Retirement Planning', href: '/services/retirement-planning' },
  { label: 'Children\'s Education', href: '/services/education-planning' },
  { label: 'Wealth Creation', href: '/services/wealth-creation' },
  { label: 'Financial Planning', href: '/services/financial-planning' },
  { label: 'Portfolio Review', href: '/services/portfolio-review' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Terms & Conditions', href: '/terms' },
];

export default function Footer() {
  return (
    <footer className="bg-[#050810] text-gray-300 relative overflow-hidden" role="contentinfo">
      {/* Decorative gradient line */}
      <div className="h-1 bg-gradient-to-r from-primary-900 via-gold-500 to-primary-900 shadow-[0_0_20px_rgba(250,204,21,0.5)]" />

      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-gold-400/30 group-hover:ring-gold-400 transition-all duration-300">
                <Image
                  src={SITE_CONFIG.logo}
                  alt="Tirumala Mutual Fund Services Logo"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-bold font-heading text-lg leading-tight">
                  Tirumala
                </h3>
                <p className="text-gold-400 text-xs tracking-wider uppercase">
                  Mutual Fund Services
                </p>
              </div>
            </Link>

            <p className="text-gold-400/80 text-sm font-medium mb-6 italic font-accent">
              &ldquo;{SITE_CONFIG.tagline}&rdquo;
            </p>

            <div className="space-y-3.5">
              <a href={`tel:${CONTACT_INFO.mobile}`} className="flex items-start gap-3 group text-sm hover:text-gold-400 transition-colors">
                <Phone size={16} className="text-gold-400 mt-0.5 shrink-0" />
                <div>
                  <p>{CONTACT_INFO.mobileFormatted}</p>
                  <p className="text-gray-500 text-xs">Landline: {CONTACT_INFO.landline}</p>
                </div>
              </a>
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-3 group text-sm hover:text-gold-400 transition-colors">
                <Mail size={16} className="text-gold-400 shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </a>
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="text-gold-400 mt-0.5 shrink-0" />
                <span>{CONTACT_INFO.address.full}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock size={16} className="text-gold-400 shrink-0" />
                <div>
                  <p>{CONTACT_INFO.officeHours.days}</p>
                  <p className="text-gray-500 text-xs">{CONTACT_INFO.officeHours.time} | {CONTACT_INFO.officeHours.closed}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-8">
              {SOCIAL_LINKS.facebook && (
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#111827] border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-gold-500 hover:text-[#050810] hover:border-gold-500 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
              )}
              {SOCIAL_LINKS.instagram && (
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#111827] border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-gold-500 hover:text-[#050810] hover:border-gold-500 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 font-heading flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gold-500 rounded" />
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-gold-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="text-gold-500/50 group-hover:text-gold-400 group-hover:translate-x-1 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 font-heading flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gold-500 rounded" />
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-gold-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="text-gold-500/50 group-hover:text-gold-400 group-hover:translate-x-1 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & CTA */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 font-heading flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gold-500 rounded" />
              Start Your Wealth Journey
            </h4>
            <p className="text-sm mb-6 text-gray-400 leading-relaxed">
              Take the first step towards financial freedom. Book a free consultation with our experienced financial advisor.
            </p>

            <div className="space-y-3">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary-800 to-primary-700 text-white py-3 rounded-xl font-semibold text-sm hover:from-primary-700 hover:to-primary-600 transition-all duration-300 shadow-lg shadow-primary-800/30"
              >
                Book Free Consultation
              </Link>
              <a
                href={CONTACT_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-700 transition-all duration-300"
              >
                WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT_INFO.mobile}`}
                className="flex items-center justify-center gap-2 w-full border border-gold-500/30 text-gold-400 py-3 rounded-xl font-semibold text-sm hover:bg-gold-500/10 transition-all duration-300"
              >
                <Phone size={14} />
                Call Now
              </a>
            </div>

            {/* Registration Badge */}
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-gold-400 font-bold text-sm mb-1">{BUSINESS_INFO.arn}</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                {BUSINESS_INFO.registration}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {BUSINESS_INFO.sebiStatus}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-5">
          <div className="bg-primary-950/50 rounded-xl p-4 border border-primary-900/20">
            <p className="text-xs text-gray-500 leading-relaxed text-center">
              <span className="text-gold-500 font-semibold">Disclaimer:</span>{' '}
              {DISCLAIMER_TEXT}
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Tirumala Mutual Fund Services. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-gray-500 hover:text-gold-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-900/10 rounded-full blur-[120px] pointer-events-none" />
    </footer>
  );
}
