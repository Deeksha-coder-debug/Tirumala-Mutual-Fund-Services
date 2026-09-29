'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, Share2, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { GalleryItem } from '@/lib/cms-data';
import { getYoutubeEmbedUrl, getYoutubeThumbnail } from '@/lib/youtube';

interface LightboxProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({ item, isOpen, onClose, onNext, onPrev }: LightboxProps) {
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown, isOpen]);

  const handleShare = async () => {
    if (!item) return;
    const url = `${window.location.origin}/gallery/${item.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.description,
          url: url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    if (!item || !item.downloadable) return;
    const downloadSrc = item.imageUrl || getYoutubeThumbnail(item.youtubeUrl);
    if (!downloadSrc) return;
    const link = document.createElement('a');
    link.href = downloadSrc;
    link.download = `${item.slug}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen || !item) return null;

  const ytEmbed = getYoutubeEmbedUrl(item.youtubeUrl || item.videoUrl);
  const displayImage = item.imageUrl || getYoutubeThumbnail(item.youtubeUrl) || '/images/default.jpg';
  const isDirectMp4 = item.videoUrl?.endsWith('.mp4') || item.imageUrl?.endsWith('.mp4');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Image Lightbox"
      >
        {/* Controls */}
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all z-10" aria-label="Close">
          <X size={24} />
        </button>

        <div className="absolute top-6 left-6 flex gap-3 z-10">
          <button onClick={handleShare} className="p-2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all" title="Share" aria-label="Share">
            <Share2 size={20} />
          </button>
          {item.downloadable && (
            <button onClick={handleDownload} className="p-2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all" title="Download" aria-label="Download">
              <Download size={20} />
            </button>
          )}
        </div>

        <button onClick={onPrev} className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all z-10" aria-label="Previous">
          <ChevronLeft size={32} />
        </button>

        <button onClick={onNext} className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all z-10" aria-label="Next">
          <ChevronRight size={32} />
        </button>

        {/* Content */}
        <div className="relative w-full max-w-6xl h-[80vh] flex flex-col items-center justify-center p-4">
          <motion.div 
            className="relative w-full h-full flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {ytEmbed ? (
              <div className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                <iframe 
                  src={`${ytEmbed}?autoplay=1&rel=0`} 
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
            ) : isDirectMp4 ? (
              <video 
                src={item.videoUrl || item.imageUrl} 
                controls 
                autoPlay 
                className="w-full max-w-4xl max-h-[70vh] rounded-2xl bg-black shadow-2xl" 
              />
            ) : (
              <div className="relative w-full h-full max-h-full">
                <Image
                  src={displayImage}
                  alt={item.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            )}
          </motion.div>

          {/* Metadata Bar */}
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h3>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-300">
              <span className="bg-primary-600 text-white px-2.5 py-0.5 rounded text-xs font-semibold tracking-wide uppercase">
                {item.category}
              </span>
              {item.location && <span>• {item.location}</span>}
              <span>• {new Date(item.publishDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              {item.metrics && <span className="text-gold-400 font-medium">• {item.metrics}</span>}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
