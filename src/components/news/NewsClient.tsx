'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { NewsItem } from '@/lib/cms-data';
import { NfoCard, IpoCard, NewsCard } from '@/components/news/NewsCards';
import Link from 'next/link';

interface NewsClientProps {
  items: NewsItem[];
}

const CATEGORIES = ['All', 'NFO', 'IPO', 'News', 'Market Updates', 'Tax Updates', 'SEBI Circulars', 'Investor Education'];

export default function NewsClient({ items }: NewsClientProps) {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item => {
    const matchesCategory = filter === 'All' || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category 
                  ? 'bg-primary-700 text-white shadow-md' 
                  : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-72">
          <input 
            type="text" 
            placeholder="Search news, NFOs, tags..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              // Inject a CTA after every 5th item (index 4, 9, 14, etc.)
              const showCTA = (index + 1) % 5 === 0;

              return (
                <React.Fragment key={item.id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    {item.category === 'NFO' ? (
                      <NfoCard item={item} />
                    ) : item.category === 'IPO' ? (
                      <IpoCard item={item} />
                    ) : (
                      <NewsCard item={item} />
                    )}
                  </motion.div>

                  {/* Inline CTA */}
                  {showCTA && (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="md:col-span-2 xl:col-span-3 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 rounded-2xl p-8 my-4 text-center shadow-xl shadow-primary-900/20 text-white relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                      <h3 className="text-2xl font-bold font-heading mb-3 relative z-10">Need Expert Investment Advice?</h3>
                      <p className="text-primary-100 mb-6 max-w-2xl mx-auto relative z-10">Our certified wealth managers are here to help you navigate market opportunities and build a resilient portfolio.</p>
                      <Link href="/contact" className="inline-block bg-gold-500 hover:bg-gold-400 text-gray-900 font-bold py-3 px-8 rounded-xl transition-colors relative z-10">
                        Book a Free Consultation
                      </Link>
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No results found</h3>
          <p className="text-gray-500">Try adjusting your filters or search query.</p>
          <button 
            onClick={() => {setFilter('All'); setSearchQuery('');}}
            className="mt-6 text-primary-600 font-semibold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
