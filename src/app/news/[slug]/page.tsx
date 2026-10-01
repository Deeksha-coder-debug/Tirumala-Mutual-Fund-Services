import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Tag, Download, TrendingUp, AlertTriangle, FileText } from 'lucide-react';
import { getNewsItems } from '@/lib/cms-storage';
import { NfoCard, IpoCard, NewsCard } from '@/components/news/NewsCards';
import PublicSiteShell from '@/components/layout/PublicSiteShell';
import { getYoutubeEmbedUrl } from '@/lib/youtube';
import { formatDisplayDate } from '@/lib/date-utils';
import { Play } from 'lucide-react';
import ShareArticleButton from '@/components/news/ShareArticleButton';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface NewsItemPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: NewsItemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const allNews = getNewsItems();
  const item = allNews.find(n => n.slug === slug);
  if (!item) return { title: 'Article Not Found' };
  
  return {
    title: `${item.title} | TMFS Insights`,
    description: item.excerpt,
  };
}

export function generateStaticParams() {
  return getNewsItems().map((item) => ({
    slug: item.slug,
  }));
}

export default async function NewsItemPage({ params }: NewsItemPageProps) {
  const { slug } = await params;
  const allNews = getNewsItems();
  const item = allNews.find(n => n.slug === slug);
  
  if (!item) {
    notFound();
  }

  const embedUrl = getYoutubeEmbedUrl(item.youtubeUrl || item.videoUrl);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    datePublished: item.publishDate,
    author: [{
      '@type': 'Person',
      name: item.author,
    }],
    description: item.excerpt,
  };

  // Find 3 related items (excluding current)
  const relatedItems = allNews.filter(n => n.id !== item.id).slice(0, 3);

  return (
    <PublicSiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content" className="pt-8 pb-16 min-h-screen bg-slate-50 dark:bg-dark-1">
        <div className="container-custom max-w-4xl">
          {/* Breadcrumbs & Navigation */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <nav 
              aria-label="Breadcrumb" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50/90 dark:bg-slate-900 border border-blue-200/80 dark:border-blue-900/60 text-sm font-bold overflow-x-auto whitespace-nowrap shadow-xs"
            >
              <Link 
                href="/" 
                className="text-[#0B1E3D] dark:text-blue-300 hover:text-blue-700 dark:hover:text-gold-400 font-extrabold transition-colors hover:underline"
              >
                Home
              </Link>
              <span className="text-[#0B1E3D]/50 dark:text-blue-400/50 font-black">/</span>
              <Link 
                href="/news" 
                className="text-[#0B1E3D] dark:text-blue-300 hover:text-blue-700 dark:hover:text-gold-400 font-extrabold transition-colors hover:underline"
              >
                News & NFOs
              </Link>
              <span className="text-[#0B1E3D]/50 dark:text-blue-400/50 font-black">/</span>
              <span className="text-[#0B1E3D] dark:text-white font-black truncate max-w-xs sm:max-w-md md:max-w-xl">
                {item.title}
              </span>
            </nav>

            <Link 
              href="/news" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B1E3D] hover:bg-[#071526] text-white font-extrabold text-sm shadow-md transition-all border border-[#0B1E3D] dark:border-blue-500/40 group hover:scale-[1.02] active:scale-95 shrink-0"
            >
              <ArrowLeft size={16} className="text-gold-400 group-hover:-translate-x-1 transition-transform stroke-[2.8]" />
              <span>Back to News</span>
            </Link>
          </div>

          <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-gold-400 px-3 py-1 rounded-full text-sm font-semibold tracking-wide uppercase">
                  {item.category}
                </span>
                <ShareArticleButton title={item.title} excerpt={item.excerpt} />
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 font-heading leading-tight">
                {item.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600 dark:text-gray-400 mb-8 pb-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-primary-600 dark:text-gold-400" />
                  {item.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary-600 dark:text-gold-400" />
                  {formatDisplayDate(item.publishDate)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary-600 dark:text-gold-400" />
                  {item.readingTime} min read
                </div>
              </div>

              {/* YouTube Video Embed Section */}
              {embedUrl && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/60 flex items-center justify-center text-red-600">
                      <Play size={16} className="fill-red-600 ml-0.5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white font-heading">
                        Official Video Walkthrough & Analysis
                      </h3>
                      <p className="text-xs text-gray-500">Watch the detailed fund presentation and scheme insights</p>
                    </div>
                  </div>
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl bg-black">
                    <iframe
                      src={embedUrl}
                      title={`${item.title} - Video Analysis`}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Cover Banner Image (if available) */}
              {item.imageUrl && (
                <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-8 border border-slate-200 dark:border-slate-700 shadow-md bg-slate-100 dark:bg-slate-900">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Lead Summary Excerpt */}
              {item.excerpt && (
                <div className="p-5 mb-8 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border-l-4 border-gold-500 text-slate-800 dark:text-slate-200 font-medium text-base leading-relaxed whitespace-pre-line">
                  {item.excerpt}
                </div>
              )}

              {/* Specific Metadata for NFO / IPO */}
              {(item.category === 'NFO' || item.category === 'IPO') && (
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 mb-10 grid grid-cols-2 md:grid-cols-4 gap-6 border border-gray-100 dark:border-gray-800">
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">Starting Date</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {formatDisplayDate(item.launchDate)}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">Last Date</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {formatDisplayDate(item.closeDate)}
                    </span>
                  </div>
                  {item.fundCategory && (
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">Fund Category</span>
                      <span className="font-bold text-gray-900 dark:text-white">{item.fundCategory}</span>
                    </div>
                  )}
                  {item.riskLevel && (
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">Risk Meter</span>
                      <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1">
                        <AlertTriangle size={14} className="text-orange-500" /> {item.riskLevel}
                      </span>
                    </div>
                  )}
                  {item.issueSize && (
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">Issue Size</span>
                      <span className="font-bold text-gray-900 dark:text-white">{item.issueSize}</span>
                    </div>
                  )}
                  {item.priceBand && (
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">Price Band</span>
                      <span className="font-bold text-gray-900 dark:text-white">{item.priceBand}</span>
                    </div>
                  )}
                  {item.gmp && (
                    <div>
                      <span className="text-xs text-gray-500 block mb-1">Expected GMP</span>
                      <span className="font-bold text-green-600 flex items-center gap-1">
                        <TrendingUp size={14} /> {item.gmp}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Main Content */}
              <div 
                className="prose prose-lg dark:prose-invert max-w-none mb-12 whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />

              {/* Downloads Section */}
              {((item.documents && item.documents.length > 0) || item.pdfUrl) && (() => {
                const combinedDocs = [
                  ...(item.documents || []),
                  ...(item.pdfUrl && (!item.documents || !item.documents.some((d) => d.url === item.pdfUrl))
                    ? [{ label: item.pdfName || 'Scheme Information Document (PDF)', url: item.pdfUrl }]
                    : [])
                ];

                return (
                  <div className="bg-primary-50 dark:bg-gray-900/80 rounded-2xl p-6 md:p-8 mb-12 border border-primary-100 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <FileText className="text-primary-600 dark:text-gold-400" />
                      Download Centre
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {combinedDocs.map((doc, idx) => (
                        <a 
                          key={idx} 
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow group border border-gray-100 dark:border-gray-700"
                        >
                          <span className="font-medium text-gray-800 dark:text-gray-200">{doc.label}</span>
                          <Download size={18} className="text-primary-500 group-hover:text-primary-700 dark:text-gray-400 dark:group-hover:text-gold-400" />
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
                <Tag size={18} className="text-gray-400 mr-2" />
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-md text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Consultation CTA */}
          <div className="mt-12 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 rounded-2xl p-8 text-center shadow-xl shadow-primary-900/20 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-gold-500/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
            <h3 className="text-2xl font-bold font-heading mb-3 relative z-10">Need specific advice on this?</h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto relative z-10">
              Speak to our certified wealth managers to understand how this fits into your personalized financial plan.
            </p>
            <Link href="/#contact" className="inline-block bg-gold-500 hover:bg-gold-400 text-gray-900 font-bold py-3 px-8 rounded-xl transition-colors relative z-10">
              Book a Free Consultation
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedItems.length > 0 && (
          <div className="bg-white dark:bg-gray-900 mt-16 py-16 border-t border-gray-200 dark:border-gray-800">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 font-heading">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedItems.map((related) => (
                  <div key={related.id} className="h-full">
                    {related.category === 'NFO' ? (
                      <NfoCard item={related} />
                    ) : related.category === 'IPO' ? (
                      <IpoCard item={related} />
                    ) : (
                      <NewsCard item={related} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </PublicSiteShell>
  );
}
