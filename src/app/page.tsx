import PublicSiteShell from '@/components/layout/PublicSiteShell';
import InstitutionalHome from '@/components/sections/InstitutionalHome';
import FAQ from '@/components/sections/FAQ';
import CTABanner from '@/components/sections/CTABanner';
import LeadForm from '@/components/sections/LeadForm';

export default function HomePage() {
  return (
    <PublicSiteShell>
      <main id="main-content">
        <InstitutionalHome />
        <FAQ />
        <CTABanner />
        <LeadForm />
      </main>
    </PublicSiteShell>
  );
}
