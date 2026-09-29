import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/section-heading';
import GalleryClient from '@/components/gallery/GalleryClient';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import { CMS_GALLERY } from '@/lib/cms-data';

export const metadata: Metadata = {
  title: 'Gallery & Media | Tirumala Mutual Fund Services',
  description: 'Explore photos and videos from our investor awareness programs, seminars, awards, and media coverage.',
};

export default function GalleryPage() {
  const sortedGallery = [...CMS_GALLERY].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  return (
    <>
      <Navbar />
      <main className="pt-8 pb-20 min-h-screen bg-slate-950 text-slate-100">
        <div className="container-custom">
          <SectionHeading 
            title="Our Journey & Media" 
            subtitle="Building financial literacy, celebrating milestones, and fostering trust within our investor community."
          />
          
          <div className="mt-12">
            <GalleryClient items={sortedGallery} />
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
