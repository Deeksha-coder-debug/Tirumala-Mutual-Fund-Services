'use client';

import MeetYourAdvisor from '@/components/sections/MeetYourAdvisor';
import Stats from '@/components/sections/Stats';
import { SectionHeading } from '@/components/ui/section-heading';

export default function AboutContent() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 dark:bg-dark-1">
      <div className="container-custom max-w-5xl mb-12">
        <SectionHeading 
          title="About Us" 
          subtitle="Building wealth and financial freedom through disciplined investing and trusted financial advice."
        />
        
        <div className="glass-card bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed mb-16">
          <p className="mb-4">
            Tirumala Mutual Fund Services (TMFS) is a premier financial advisory and mutual fund distribution firm based in Jeypore, Odisha. With over 15 years of experience in the financial markets, we have helped hundreds of families and individuals achieve their financial goals through systematic and disciplined investing.
          </p>
          <p className="mb-4">
            We understand that every individual's financial journey is unique. Whether you are planning for your child's education, saving for a dream home, or building a retirement corpus, we provide personalized advice tailored to your risk appetite and timelines.
          </p>
          <p>
            As an AMFI-registered Mutual Fund Distributor, we maintain 100% transparency in our operations. Our core philosophy is simple: we prioritize your financial well-being above all else. When you grow, we grow.
          </p>
        </div>
      </div>

      <MeetYourAdvisor />
      
      <div className="mt-16">
        <Stats />
      </div>
    </div>
  );
}
