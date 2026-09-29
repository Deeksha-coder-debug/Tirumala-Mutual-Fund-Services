'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Award, ShieldCheck, MapPin } from 'lucide-react';
import { GalleryItem } from '@/lib/cms-data';
import { Masonry } from '@/components/ui/masonry';
import { Lightbox } from '@/components/gallery/Lightbox';
import { getYoutubeThumbnail, isYoutubeUrl } from '@/lib/youtube';

interface GalleryClientProps {
  items: GalleryItem[];
}

const CATEGORIES = ['All', 'Events', 'Seminars', 'Client Meets', 'Awards', 'Certificates', 'Office', 'Media', 'Videos', 'Posters'];

export default function GalleryClient({ items }: GalleryClientProps) {
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = items.filter(item => {
    if (filter === 'All') return true;
    return item.category === filter;
  });

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };
  
  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
              filter === category 
                ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-gold-500/20' 
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <Masonry breakpointCols={{ default: 3, 1024: 3, 768: 2, 640: 1 }}>
        {filteredItems.map((item, index) => {
          const cardImage = item.imageUrl || getYoutubeThumbnail(item.youtubeUrl || item.videoUrl) || '/images/default.jpg';
          const hasYt = !!item.youtubeUrl || isYoutubeUrl(item.videoUrl);
          const isVideo = item.type === 'video' || hasYt || item.imageUrl?.endsWith('.mp4');

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg hover:shadow-2xl hover:border-gold-500/40 transition-all"
              onClick={() => openLightbox(index)}
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={cardImage}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Video Icon */}
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center ring-1 ring-white/50 group-hover:bg-red-600 transition-colors duration-300 shadow-xl">
                      <Play className="text-white fill-white ml-1" size={24} />
                    </div>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                  <span className="bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded text-xs font-semibold tracking-wide uppercase">
                    {item.category}
                  </span>
                  {hasYt && (
                    <span className="bg-red-600/90 backdrop-blur-md text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                      <Play size={10} className="fill-white" />
                      YouTube
                    </span>
                  )}
                  {item.type === 'video' && item.metrics && (
                    <span className="bg-amber-600/90 backdrop-blur-md text-white px-2.5 py-1 rounded text-xs font-semibold">
                      {item.metrics}
                    </span>
                  )}
                </div>
              </div>

            {/* Content for Premium Cards (Awards/Certificates/Events) */}
            <div className="p-5 absolute bottom-0 left-0 w-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <h3 className="text-white font-bold text-lg leading-tight mb-2">{item.title}</h3>
              <div className="flex items-center gap-4 text-xs text-gray-300">
                {item.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>{item.location}</span>
                  </div>
                )}
                {item.category === 'Awards' && (
                  <div className="flex items-center gap-1 text-gold-400">
                    <Award size={12} />
                    <span>Verified</span>
                  </div>
                )}
                {item.category === 'Certificates' && (
                  <div className="flex items-center gap-1 text-green-400">
                    <ShieldCheck size={12} />
                    <span>Official</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
      </Masonry>

      {/* Lightbox */}
      <Lightbox
        item={lightboxIndex !== null ? filteredItems[lightboxIndex] : null}
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        onNext={nextLightbox}
        onPrev={prevLightbox}
      />
    </div>
  );
}
