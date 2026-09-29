import type { Metadata } from 'next';
import PublicSiteShell from '@/components/layout/PublicSiteShell';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Tirumala Mutual Fund Services, founded by Mr. Tirumala Talabaktula. 15+ years of experience in mutual fund distribution and financial planning in Jeypore, Odisha.',
};

export default function AboutPage() {
  return (
    <PublicSiteShell>
      <main id="main-content">
        <AboutContent />
      </main>
    </PublicSiteShell>
  );
}
