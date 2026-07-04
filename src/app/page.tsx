import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Partners from '@/components/sections/Partners';
import MeetYourAdvisor from '@/components/sections/MeetYourAdvisor';
import InvestmentJourney from '@/components/sections/InvestmentJourney';
import Services from '@/components/sections/Services';
import CalculatorPreview from '@/components/sections/CalculatorPreview';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTABanner from '@/components/sections/CTABanner';
import LeadForm from '@/components/sections/LeadForm';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <Partners />
        <MeetYourAdvisor />
        <InvestmentJourney />
        <Services />
        <CalculatorPreview />
        <Testimonials />
        <FAQ />
        <CTABanner />
        <LeadForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
