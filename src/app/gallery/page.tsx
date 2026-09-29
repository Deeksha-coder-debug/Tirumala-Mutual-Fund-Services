import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/section-heading';
import GalleryClient from '@/components/gallery/GalleryClient';
import PublicSiteShell from '@/components/layout/PublicSiteShell';
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
    <PublicSiteShell>
      <main id="main-content" className="pt-8 pb-20 min-h-screen bg-slate-50 dark:bg-dark-1 text-slate-900 dark:text-slate-100">
        <div className="container-custom">
          <SectionHeading 
            title="Our Journey & Media" 
            subtitle="Building financial literacy, celebrating milestones, and fostering trust within our investor community."
            titleClassName="!text-primary-950"
            subtitleClassName="!text-slate-700"
          />
          
          <div className="mt-12">
            <GalleryClient items={sortedGallery} />
          </div>
        </div>
      </main>
    </PublicSiteShell>
  );
}
