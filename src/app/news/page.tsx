import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import NewsClient from '@/components/news/NewsClient';
import PublicSiteShell from '@/components/layout/PublicSiteShell';
import { getNewsItems, sortNewsLatestToOldest } from '@/lib/cms-storage';
import { NewsItem } from '@/lib/cms-data';
import { formatDisplayDate } from '@/lib/date-utils';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'News, NFOs & IPOs | Tirumala Mutual Fund Services',
  description: 'Stay updated with the latest market news, New Fund Offers (NFOs), IPO analysis, tax updates, and investment insights.',
};

interface HeadlineBannerData {
  type: 'ongoing-nfo' | 'upcoming-nfo' | 'investment-opportunity';
  badge: string;
  badgeClass: string;
  title: string;
  subtext: string;
  actionText: string;
  slug: string;
}

function getHeadlineBanner(newsList: NewsItem[]): HeadlineBannerData | null {
  if (!newsList || newsList.length === 0) return null;

  const now = new Date();
  const todayTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  // 1. Check for Ongoing NFO:
  // Must be category === 'NFO' and status !== 'draft'
  // Not closed: closeDate >= today (or missing)
  // Started: launchDate <= today (or missing)
  const ongoingNfo = newsList.find(item => {
    if (item.category !== 'NFO' || item.status === 'draft') return false;
    const isClosed = item.closeDate ? new Date(item.closeDate).getTime() < todayTime : false;
    if (isClosed) return false;
    const isStarted = item.launchDate ? new Date(item.launchDate).getTime() <= todayTime + 86400000 : true;
    return isStarted;
  });

  if (ongoingNfo) {
    const closeText = ongoingNfo.closeDate 
      ? `Closes on ${formatDisplayDate(ongoingNfo.closeDate)}` 
      : 'Open for public subscription';
    return {
      type: 'ongoing-nfo',
      badge: '🔥 Ongoing NFO',
      badgeClass: 'bg-red-600 text-white shadow-xs',
      title: ongoingNfo.title,
      subtext: `${closeText} • Capitalize before the subscription closes.`,
      actionText: 'Apply Now',
      slug: ongoingNfo.slug,
    };
  }

  // 2. Check for Upcoming NFO:
  // Category === 'NFO' and launchDate > today
  const upcomingNfo = newsList.find(item => {
    if (item.category !== 'NFO' || item.status === 'draft') return false;
    const isUpcoming = item.launchDate ? new Date(item.launchDate).getTime() > todayTime : false;
    return isUpcoming;
  });

  if (upcomingNfo) {
    const launchText = upcomingNfo.launchDate 
      ? `Opens on ${formatDisplayDate(upcomingNfo.launchDate)}` 
      : 'Opening soon';
    return {
      type: 'upcoming-nfo',
      badge: '🚀 Upcoming NFO',
      badgeClass: 'bg-gold-500 text-primary-950 font-extrabold shadow-xs',
      title: upcomingNfo.title,
      subtext: `${launchText} • Get fund insights and early portfolio allocation strategy.`,
      actionText: 'View Details',
      slug: upcomingNfo.slug,
    };
  }

  // 3. Fallback: Show new changes in investment that attract users
  // (Tax Updates, Market Updates, IPO, Investor Education)
  const investmentUpdate = newsList.find(item => 
    item.status !== 'draft' && (
      item.category === 'Tax Updates' || 
      item.category === 'Market Updates' || 
      item.category === 'IPO' || 
      item.category === 'Investor Education' ||
      item.featured
    )
  ) || newsList[0];

  if (investmentUpdate) {
    let badgeText = '💡 Key Investment Update';
    let badgeClass = 'bg-teal-500 text-primary-950 font-bold';

    if (investmentUpdate.category === 'Tax Updates') {
      badgeText = '💰 Tax Strategy Alert';
      badgeClass = 'bg-emerald-600 text-white font-bold';
    } else if (investmentUpdate.category === 'IPO') {
      badgeText = '💎 Premium IPO Opportunity';
      badgeClass = 'bg-blue-600 text-white font-bold';
    } else if (investmentUpdate.category === 'Market Updates') {
      badgeText = '📈 Market Opportunity';
      badgeClass = 'bg-amber-500 text-primary-950 font-bold';
    }

    return {
      type: 'investment-opportunity',
      badge: badgeText,
      badgeClass,
      title: investmentUpdate.title,
      subtext: investmentUpdate.excerpt || 'Discover actionable opportunities and strategic changes to boost your wealth portfolio.',
      actionText: 'Read Analysis',
      slug: investmentUpdate.slug,
    };
  }

  return null;
}

export default function NewsPage() {
  const newsList = getNewsItems();
  const sortedNews = sortNewsLatestToOldest(newsList);
  const banner = getHeadlineBanner(sortedNews);

  return (
    <PublicSiteShell>
      <main id="main-content" className="pt-8 pb-20 min-h-screen bg-slate-50 dark:bg-dark-1 text-slate-900 dark:text-slate-100">
        {banner && (
          <div className="container-custom mb-10">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-950 via-[#0b213f] to-primary-950 border border-gold-500/40 p-4 sm:p-5 shadow-xl text-white">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide ${banner.badgeClass}`}>
                      {banner.badge}
                    </span>
                    <span className="text-xs text-gold-300/90 font-medium">
                      Featured TMFS Announcement
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-white font-heading truncate">
                    {banner.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5 line-clamp-1">
                    {banner.subtext}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link
                    href={`/news/${banner.slug}`}
                    className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-primary-950 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all shadow-md hover:scale-[1.02] active:scale-95"
                  >
                    <span>{banner.actionText}</span>
                    <ArrowRight size={15} className="stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container-custom">
          <SectionHeading 
            title="News, NFOs & Market Updates" 
            subtitle="Expert financial analysis, mutual fund scheme launches, IPO insights, and tax guidelines."
            titleClassName="!text-primary-950"
            subtitleClassName="!text-slate-700"
          />
          
          <div className="mt-12">
            <NewsClient items={sortedNews} />
          </div>
        </div>
      </main>
    </PublicSiteShell>
  );
}
