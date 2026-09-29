import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import InstitutionalHome from '@/components/sections/InstitutionalHome';
import FAQ from '@/components/sections/FAQ';
import CTABanner from '@/components/sections/CTABanner';
import LeadForm from '@/components/sections/LeadForm';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <InstitutionalHome />
        <FAQ />
        <CTABanner />
        <LeadForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
