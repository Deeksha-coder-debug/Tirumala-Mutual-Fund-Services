'use client';

import { Phone, Mail, Clock, MapPin, Facebook, Instagram } from 'lucide-react';
import { CONTACT_INFO, SOCIAL_LINKS, BUSINESS_INFO } from '@/lib/constants';

export default function TopBar() {
  return (
    <div className="hidden lg:block bg-primary-900 text-white/90 text-sm border-b border-primary-800/50">
      <div className="container-custom flex items-center justify-between py-2">
        {/* Left — Contact Info */}
        <div className="flex items-center gap-6">
          <a
            href={`tel:${CONTACT_INFO.mobile}`}
            className="flex items-center gap-1.5 hover:text-gold-400 transition-colors duration-300"
            aria-label="Call us"
          >
            <Phone size={13} className="text-gold-400" />
            <span>{CONTACT_INFO.mobileFormatted}</span>
          </a>
          <span className="w-px h-3.5 bg-primary-700" />
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="flex items-center gap-1.5 hover:text-gold-400 transition-colors duration-300"
            aria-label="Email us"
          >
            <Mail size={13} className="text-gold-400" />
            <span>{CONTACT_INFO.email}</span>
          </a>
          <span className="w-px h-3.5 bg-primary-700" />
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-gold-400" />
            <span>{CONTACT_INFO.officeHours.days} | {CONTACT_INFO.officeHours.time}</span>
          </div>
        </div>

        {/* Right — Social Links & ARN */}
        <div className="flex items-center gap-4">
          <span className="text-gold-400 font-semibold text-xs tracking-wider">
            {BUSINESS_INFO.arn}
          </span>
          <span className="w-px h-3.5 bg-primary-700" />
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.facebook && (
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-400 transition-colors duration-300"
                aria-label="Visit our Facebook page"
              >
                <Facebook size={14} />
              </a>
            )}
            {SOCIAL_LINKS.instagram && (
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-400 transition-colors duration-300"
                aria-label="Visit our Instagram page"
              >
                <Instagram size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
