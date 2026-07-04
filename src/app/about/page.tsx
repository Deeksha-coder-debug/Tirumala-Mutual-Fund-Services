import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Tirumala Mutual Fund Services, founded by Mr. Tirumala Talabaktula. 15+ years of experience in mutual fund distribution and financial planning in Jeypore, Odisha.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <AboutContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
