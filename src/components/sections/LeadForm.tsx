'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

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

  const inputClasses = "w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 dark:focus:ring-gold-500/50 dark:focus:border-gold-500 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500";

  return (
    <section
      ref={ref}
      className="section-padding bg-gray-50 dark:bg-gray-900/50"
      id="enquiry"
      aria-label="Enquiry form"
    >
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Heading */}
          <div className="text-center mb-10">
            <span className="inline-block text-primary-700 dark:text-gold-400 text-sm font-semibold tracking-wider uppercase mb-3">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-heading">
              Begin Your{' '}
              <span className="text-gradient">Investment Journey</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Fill in your details and our financial advisor will get in touch with you within 24 hours.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-10 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
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
                <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
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
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
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
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
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
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-800 to-primary-700 hover:from-primary-700 hover:to-primary-600 text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-primary-800/25 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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
              <p className="text-red-500 text-sm text-center mt-3">
                Something went wrong. Please try again or call us directly.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
