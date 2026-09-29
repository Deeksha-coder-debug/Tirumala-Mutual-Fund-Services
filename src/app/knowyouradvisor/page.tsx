import type { Metadata } from 'next';
import PublicSiteShell from '@/components/layout/PublicSiteShell';
import AboutContent from '../about/AboutContent';

export const metadata: Metadata = {
  title: 'About Us | Tirumala Mutual Fund Services | AMFI Registered ARN-144270',
  description: 'Learn about Tirumala Mutual Fund Services (TMFS), founded by Sri Tirumala Talabaktula in Jeypore, Odisha. Premier mutual fund distribution, fiduciary financial planning, and institutional-grade wealth stewardship.',
};

export default function KnowYourAdvisorPage() {
  return (
    <PublicSiteShell>
      <main id="main-content">
        <AboutContent />
      </main>
    </PublicSiteShell>
  );
}
