'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Why should I invest through a Mutual Fund Distributor (MFD) instead of direct apps?',
    answer: 'While direct apps offer convenience, they do not provide personalized advice, risk profiling, or portfolio rebalancing. As an AMFI-registered MFD with 15+ years of experience, we act as your financial coach. We guide you during market crashes (preventing panic selling) and ensure your portfolio aligns with your changing life goals. The slight difference in expense ratio pays for itself through behavioral coaching and expert fund selection.',
  },
  {
    question: 'How do I start investing if I have never done it before?',
    answer: 'Starting is simple. Book a free consultation with us. We will discuss your current financial situation, understand your goals (like retirement or a house), assess your risk tolerance, and then design a customized portfolio. We handle all the paperwork and KYC processes for you seamlessly.',
  },
  {
    question: 'Are there any hidden fees or charges for your consultation?',
    answer: 'No. Our initial consultation and portfolio review are completely free. We believe in 100% transparency. As a mutual fund distributor, we earn a small commission directly from the Asset Management Companies (AMCs) only when you invest through us. You are not charged any advisory fees out of pocket.',
  },
  {
    question: 'What is the minimum amount required to start a SIP?',
    answer: 'You can start a Systematic Investment Plan (SIP) with an amount as low as ₹500 per month. The key to wealth creation is not how much you start with, but how early you start and how consistent you are.',
  },
  {
    question: 'Is my money safe? Do you hold my funds?',
    answer: 'Yes, your money is 100% safe. We NEVER hold your money. Your investments are made directly to the Asset Management Companies (AMCs) like HDFC, SBI, or ICICI. We simply facilitate the transaction and provide advisory services. Your units are credited directly to your demat or mutual fund folio under your name.',
  },
];

export default function FAQ() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={ref}
      id="faq"
      className="section-padding bg-white dark:bg-slate-950 transition-colors scroll-mt-20 md:scroll-mt-24"
      aria-label="Frequently Asked Questions"
    >
      <div id="faqs" className="-mt-20 pt-20 md:-mt-24 md:pt-24" aria-hidden="true" />
      <div className="container-custom max-w-4xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3.5 py-1 rounded-full bg-primary-50 dark:bg-gold-500/15 border border-primary-200 dark:border-gold-500/30 text-primary-700 dark:text-gold-400 text-xs font-extrabold tracking-wider uppercase mb-4">
            Have Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-heading text-slate-900 dark:text-white">
            Frequently Asked{' '}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg font-medium">
            Clear answers to common questions about investing and our services.
          </p>
        </motion.div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-2xl"
                aria-expanded={openIndex === index}
              >
                <span className="text-base md:text-lg font-bold text-slate-900 dark:text-white font-heading pr-8">
                  {faq.question}
                </span>
                <span 
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    openIndex === index 
                      ? 'bg-primary-600 dark:bg-gold-500 text-white dark:text-slate-900 rotate-180' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <ChevronDown size={20} />
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="p-6 pt-0 text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 mt-2 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
