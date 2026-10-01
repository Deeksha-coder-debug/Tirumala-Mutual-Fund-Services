import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Users, Award, ShieldCheck, Download, Share2, FileText } from 'lucide-react';
import { getGalleryItems } from '@/lib/cms-storage';
import { SectionHeading } from '@/components/ui/section-heading';
import PublicSiteShell from '@/components/layout/PublicSiteShell';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface GalleryItemPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: GalleryItemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const allGallery = getGalleryItems();
  const item = allGallery.find(g => g.slug === slug);
  if (!item) return { title: 'Item Not Found' };
  
  return {
    title: `${item.title} | TMFS Gallery`,
    description: item.description || `View ${item.title} in our gallery.`,
    ...(item.imageUrl ? {
      openGraph: {
        images: [{ url: item.imageUrl }],
      }
    } : {})
  };
}

// Generate static params for all known slugs for optimal performance
export function generateStaticParams() {
  return getGalleryItems().map((item) => ({
    slug: item.slug,
  }));
}

export default async function GalleryItemPage({ params }: GalleryItemPageProps) {
  const { slug } = await params;
  const allGallery = getGalleryItems();
  const item = allGallery.find(g => g.slug === slug);
  
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
              ) : item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                  <span className="text-sm font-semibold">{item.title}</span>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-gold-400 px-3 py-1 rounded-full text-sm font-semibold tracking-wide uppercase">
                  {item.category}
                </span>
                
                {/* Share/Download Actions - Client Side functionality ideally, mocked here */}
                <div className="flex items-center gap-3">
                  {item.pdfUrl && (
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md"
                      title="Download Attached PDF"
                    >
                      <FileText size={14} />
                      <span>Download PDF</span>
                    </a>
                  )}
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

              {/* Dedicated PDF Document Card */}
              {item.pdfUrl && (
                <div className="mt-8 p-6 bg-slate-900 border border-slate-700/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 shrink-0">
                      <FileText size={24} />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">Official Document</span>
                      <h4 className="text-white font-bold text-base leading-snug">{item.pdfName || 'Scheme / Event Document (PDF)'}</h4>
                      <p className="text-slate-400 text-xs mt-0.5">Click download to inspect the full prospectus, circular, or presentation.</p>
                    </div>
                  </div>
                  <a
                    href={item.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 text-slate-950 font-extrabold text-sm hover:brightness-110 shadow-lg transition-all shrink-0 cursor-pointer"
                  >
                    <Download size={16} />
                    <span>Download PDF</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </PublicSiteShell>
  );
}
