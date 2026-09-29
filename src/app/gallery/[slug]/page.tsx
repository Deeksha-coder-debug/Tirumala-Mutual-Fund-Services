import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Users, Award, ShieldCheck, Download, Share2 } from 'lucide-react';
import { CMS_GALLERY } from '@/lib/cms-data';
import { SectionHeading } from '@/components/ui/section-heading';
import PublicSiteShell from '@/components/layout/PublicSiteShell';

interface GalleryItemPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: GalleryItemPageProps): Promise<Metadata> {
  const item = CMS_GALLERY.find(g => g.slug === params.slug);
  if (!item) return { title: 'Item Not Found' };
  
  return {
    title: `${item.title} | TMFS Gallery`,
    description: item.description || `View ${item.title} in our gallery.`,
    openGraph: {
      images: [{ url: item.imageUrl }],
    }
  };
}

// Generate static params for all known slugs for optimal performance
export function generateStaticParams() {
  return CMS_GALLERY.map((item) => ({
    slug: item.slug,
  }));
}

export default function GalleryItemPage({ params }: GalleryItemPageProps) {
  const item = CMS_GALLERY.find(g => g.slug === params.slug);
  
  if (!item) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': item.type === 'video' ? 'VideoObject' : 'ImageObject',
    name: item.title,
    description: item.description,
    contentUrl: item.type === 'video' ? item.videoUrl : item.imageUrl,
    uploadDate: item.publishDate,
    thumbnailUrl: item.imageUrl,
  };

  return (
    <PublicSiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content" className="pt-8 pb-16 min-h-screen bg-slate-50 dark:bg-dark-1">
        <div className="container-custom max-w-5xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <Link href="/" className="hover:text-primary-600 dark:hover:text-gold-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/gallery" className="hover:text-primary-600 dark:hover:text-gold-400 transition-colors">Gallery</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-gray-200 font-medium truncate">{item.title}</span>
          </nav>

          <Link href="/gallery" className="inline-flex items-center gap-2 text-primary-700 dark:text-gold-400 font-medium hover:underline mb-8">
            <ArrowLeft size={16} />
            Back to Gallery
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* Media Area */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              {item.type === 'video' && item.videoUrl ? (
                <iframe 
                  src={item.videoUrl.replace('watch?v=', 'embed/')} 
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              ) : (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-gold-400 px-3 py-1 rounded-full text-sm font-semibold tracking-wide uppercase">
                  {item.category}
                </span>
                
                {/* Share/Download Actions - Client Side functionality ideally, mocked here */}
                <div className="flex gap-3">
                  {item.downloadable && (
                    <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-gold-400 transition-colors">
                      <Download size={16} />
                      Download
                    </button>
                  )}
                  <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-gold-400 transition-colors">
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 font-heading">
                {item.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary-600 dark:text-gold-400" />
                  {new Date(item.publishDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                {item.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary-600 dark:text-gold-400" />
                    {item.location}
                  </div>
                )}
                {item.metrics && (
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-primary-600 dark:text-gold-400" />
                    {item.metrics}
                  </div>
                )}
              </div>

              {item.description && (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </PublicSiteShell>
  );
}
