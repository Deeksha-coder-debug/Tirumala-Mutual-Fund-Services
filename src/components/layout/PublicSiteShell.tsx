import type { ReactNode } from 'react';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import AIChatbot from '@/components/common/AIChatbot';

export default function PublicSiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
      <AIChatbot />
    </>
  );
}
