'use client';

import { useState } from 'react';
import { Share2, Check, Copy, MessageCircle, Twitter, Linkedin, MoreHorizontal } from 'lucide-react';

interface ShareArticleButtonProps {
  title: string;
  excerpt?: string;
  url?: string;
}

export default function ShareArticleButton({ title, excerpt, url }: ShareArticleButtonProps) {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const getShareUrl = () => {
    if (url) return url;
    if (typeof window !== 'undefined') return window.location.href;
    return 'https://tirumalamutualfund.com';
  };

  const currentUrl = getShareUrl();
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}\n\n${currentUrl}`)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;

  const handleCopyLinkOnly = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt || title,
          url: currentUrl,
        });
        setMenuOpen(false);
      } catch (err) {
        console.log('Share closed:', err);
      }
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        type="button"
        id="share-article-btn"
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-primary-950 text-white hover:bg-primary-900 dark:bg-primary-900 dark:text-white dark:hover:bg-primary-800 font-bold text-xs transition-all shadow-sm cursor-pointer border border-primary-900 active:scale-95"
        title="Share this article"
      >
        {copied ? (
          <>
            <Check size={14} className="text-emerald-400 stroke-[2.5]" />
            <span className="text-emerald-300 font-extrabold">Link Copied!</span>
          </>
        ) : (
          <>
            <Share2 size={14} className="text-gold-400 stroke-[2.2]" />
            <span>Share Article</span>
          </>
        )}
      </button>

      {/* Share Options Popup Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 mb-1">
              Share With Investors
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40 rounded-xl transition-colors"
            >
              <MessageCircle size={16} className="text-emerald-600 dark:text-emerald-400" />
              <span>Share via WhatsApp</span>
            </a>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/40 rounded-xl transition-colors"
            >
              <Linkedin size={16} className="text-blue-600 dark:text-blue-400" />
              <span>Share on LinkedIn</span>
            </a>

            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-sky-700 hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-950/40 rounded-xl transition-colors"
            >
              <Twitter size={16} className="text-sky-500 dark:text-sky-400" />
              <span>Share on X / Twitter</span>
            </a>

            {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <MoreHorizontal size={16} className="text-slate-500" />
                <span>More Share Options...</span>
              </button>
            )}

            <button
              type="button"
              id="copy-article-link-btn"
              onClick={() => {
                handleCopyLinkOnly();
                setMenuOpen(false);
              }}
              className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border-t border-slate-100 dark:border-slate-800 mt-1 cursor-pointer"
            >
              {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} className="text-slate-500" />}
              <span>{copied ? 'Link Copied!' : 'Copy Direct Link'}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
