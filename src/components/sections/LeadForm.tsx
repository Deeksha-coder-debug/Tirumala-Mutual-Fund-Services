'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, CheckCircle, Loader2, MessageCircle, Phone, Send } from 'lucide-react';
import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/constants';

export default function LeadForm() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState('success');
        setFormData({
          fullName: '', mobile: '', email: '', message: '',
        });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }

    setTimeout(() => setFormState('idle'), 5000);
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 dark:focus:ring-gold-500/50 dark:focus:border-gold-500 transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500";

  return (
    <section
      ref={ref}
      className="section-padding !pt-6 !pb-16 sm:!pt-8 sm:!pb-20 lg:!pt-8 lg:!pb-24 bg-slate-50 dark:bg-slate-950 transition-colors"
      id="enquiry"
      aria-label="Enquiry form"
    >
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            aria-label="Wealth consultation enquiry"
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-10 shadow-xl border border-slate-200 dark:border-slate-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className={inputClasses}
                />
              </div>

              {/* Mobile */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  placeholder="10-digit mobile number"
                  className={inputClasses}
                />
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={inputClasses}
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your investment goals..."
                  className={`${inputClasses} resize-none`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formState === 'loading'}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-800 to-primary-700 hover:from-primary-700 hover:to-primary-600 text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-primary-800/25 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
              {formState === 'loading' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : formState === 'success' ? (
                <>
                  <CheckCircle size={18} />
                  Thank you! We&apos;ll contact you soon.
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Enquiry
                </>
              )}
            </button>

            {formState === 'error' && (
              <p className="text-red-500 text-sm text-center mt-3 font-medium">
                Something went wrong. Please try again or call us directly.
              </p>
            )}
          </form>

          {/* Consultation actions moved from the banner to follow the form. */}
          <div className="mx-auto mt-6 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <Link
              href="/contact"
              className="group col-span-full flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold-500 px-6 py-3.5 text-center text-sm font-extrabold text-primary-950 shadow-lg shadow-gold-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 sm:text-base"
            >
              Book Free Consultation
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${CONTACT_INFO.mobile}`}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-gold-300 bg-white px-6 py-3.5 text-center text-sm font-bold !text-primary-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-50 hover:!text-primary-950 sm:text-base"
            >
              <Phone size={16} className="text-gold-700" />
              <span style={{ color: '#061426' }}>Call Now</span>
            </a>
            <a
              href={CONTACT_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-green-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-600 sm:text-base"
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
