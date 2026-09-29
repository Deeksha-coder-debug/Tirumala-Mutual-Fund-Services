import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/section-heading';
import NewsClient from '@/components/news/NewsClient';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import { CMS_NEWS } from '@/lib/cms-data';

export const metadata: Metadata = {
  title: 'News, NFOs & IPOs | Tirumala Mutual Fund Services',
  description: 'Stay updated with the latest market news, New Fund Offers (NFOs), IPO analysis, tax updates, and investment insights.',
};

export default function NewsPage() {
  const sortedNews = [...CMS_NEWS].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  const stickyAnnouncement = sortedNews.find(item => item.featured && item.category === 'NFO');

  return (
    <>
      <Navbar />
      <main className="pt-8 pb-20 min-h-screen bg-slate-950 text-slate-100">
        {stickyAnnouncement && (
          <div className="bg-primary-950/90 border border-gold-500/30 text-white py-3 px-4 text-sm font-medium text-center relative z-10 shadow-md max-w-5xl mx-auto mb-8 rounded-2xl">
            <span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs font-bold mr-2 uppercase animate-pulse">Important NFO</span>
            {stickyAnnouncement.title} closes on {new Date(stickyAnnouncement.closeDate!).toLocaleDateString()}. 
            <a href={`/news/${stickyAnnouncement.slug}`} className="ml-2 text-gold-400 hover:text-gold-300 underline font-bold">Apply Now →</a>
          </div>
        )}

        <div className="container-custom">
          <SectionHeading 
            title="News, NFOs & Market Updates" 
            subtitle="Expert financial analysis, mutual fund scheme launches, IPO insights, and tax guidelines."
          />
          
          <div className="mt-12">
            <NewsClient items={sortedNews} />
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
