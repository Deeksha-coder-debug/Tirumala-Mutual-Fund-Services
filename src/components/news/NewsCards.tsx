import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, ShieldAlert, FileText, Download, TrendingUp, Play } from 'lucide-react';
import { NewsItem } from '@/lib/cms-data';
import { formatDisplayDate } from '@/lib/date-utils';

const riskColors = {
  'Low': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'Moderate': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  'High': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'Very High': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export function NfoCard({ item }: { item: NewsItem }) {
  const isClosingSoon = item.closeDate && !isNaN(new Date(item.closeDate).getTime()) && new Date(item.closeDate).getTime() - new Date().getTime() < 3 * 24 * 60 * 60 * 1000;
  const hasVideo = !!item.youtubeUrl || (item.videoUrl && item.videoUrl.includes('youtu'));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full hover:shadow-xl transition-all">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-center gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              {item.category}
            </span>
            {hasVideo && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-full border border-red-200 dark:border-red-900/40">
                <Play size={10} className="fill-red-600" /> Video
              </span>
            )}
          </div>
          {isClosingSoon && (
            <span className="flex items-center gap-1 text-red-600 dark:text-red-400 text-xs font-bold animate-pulse">
              <Clock size={14} /> Closing Soon
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 font-heading">
          {item.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
          {item.excerpt}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
          <div>
            <span className="text-xs text-gray-500 block mb-1">Starting Date</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatDisplayDate(item.launchDate)}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block mb-1">Last Date</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatDisplayDate(item.closeDate)}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block mb-1">Category</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.fundCategory || 'Equity'}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block mb-1">Risk</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${item.riskLevel ? riskColors[item.riskLevel] : 'bg-gray-200 text-gray-700'}`}>
              {item.riskLevel || 'Moderate'}
            </span>
          </div>
        </div>

        <Link 
          href={`/news/${item.slug}`}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary-800 to-primary-700 hover:from-primary-700 hover:to-primary-600 text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-md cursor-pointer"
        >
          View Details & Apply <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export function IpoCard({ item }: { item: NewsItem }) {
  const hasVideo = !!item.youtubeUrl || (item.videoUrl && item.videoUrl.includes('youtu'));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full hover:shadow-xl transition-all">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-center gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="bg-gold-500 text-slate-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              {item.category}
            </span>
            {hasVideo && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-full border border-red-200 dark:border-red-900/40">
                <Play size={10} className="fill-red-600" /> Video
              </span>
            )}
          </div>
          {item.gmp && (
            <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-bold">
              <TrendingUp size={14} /> GMP: {item.gmp}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 font-heading">
          {item.title}
        </h3>
        
        <div className="grid grid-cols-2 gap-3 mb-6 mt-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl flex-1 border border-gray-100 dark:border-gray-800">
          <div>
            <span className="text-xs text-gray-500 block mb-1">Issue Size</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.issueSize || 'TBA'}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block mb-1">Price Band</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.priceBand || 'TBA'}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block mb-1">Starting Date</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatDisplayDate(item.launchDate)}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block mb-1">Last Date</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatDisplayDate(item.closeDate)}</span>
          </div>
        </div>

        <Link 
          href={`/news/${item.slug}`}
          className="flex items-center justify-center gap-2 w-full border-2 border-gold-500 text-gold-700 dark:text-gold-400 hover:bg-gold-500 hover:text-slate-950 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer"
        >
          View Details & Apply <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export function NewsCard({ item }: { item: NewsItem }) {
  const hasVideo = !!item.youtubeUrl || (item.videoUrl && item.videoUrl.includes('youtu'));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full hover:shadow-md transition-all group">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-4 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-primary-700 dark:text-primary-400 font-semibold">
            {item.category}
          </span>
          {hasVideo && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-full border border-red-200 dark:border-red-900/40">
              <Play size={10} className="fill-red-600" /> Video
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formatDisplayDate(item.publishDate)}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {item.readingTime} min
          </span>
        </div>
        
        <Link href={`/news/${item.slug}`} className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 font-heading">
            {item.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-1">
          {item.excerpt}
        </p>

        <Link 
          href={`/news/${item.slug}`}
          className="flex items-center gap-2 text-primary-700 dark:text-gold-400 text-sm font-semibold hover:underline mt-auto cursor-pointer"
        >
          View Details <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
