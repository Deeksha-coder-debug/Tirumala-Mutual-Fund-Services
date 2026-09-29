import fs from 'fs';
import path from 'path';
import { CMS_GALLERY, CMS_NEWS, GalleryItem, NewsItem } from './cms-data';

const DATA_DIR = path.join(process.cwd(), 'data');
const NEWS_FILE = path.join(DATA_DIR, 'news.json');
const GALLERY_FILE = path.join(DATA_DIR, 'gallery.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// ================= NEWS STORAGE =================
export function sortNewsLatestToOldest(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => {
    const timeA = a.publishDate ? new Date(a.publishDate).getTime() : 0;
    const timeB = b.publishDate ? new Date(b.publishDate).getTime() : 0;
    if (timeB !== timeA) {
      return timeB - timeA;
    }
    const launchA = a.launchDate ? new Date(a.launchDate).getTime() : 0;
    const launchB = b.launchDate ? new Date(b.launchDate).getTime() : 0;
    if (launchB !== launchA) {
      return launchB - launchA;
    }
    return (b.id || '').localeCompare(a.id || '');
  });
}

export function getNewsItems(): NewsItem[] {
  ensureDataDir();
  if (!fs.existsSync(NEWS_FILE)) {
    try {
      const sorted = sortNewsLatestToOldest(CMS_NEWS);
      fs.writeFileSync(NEWS_FILE, JSON.stringify(sorted, null, 2), 'utf-8');
      return sorted;
    } catch (err) {
      console.error('[CMS Storage] Failed to seed news.json:', err);
      return sortNewsLatestToOldest(CMS_NEWS);
    }
  }

  try {
    const raw = fs.readFileSync(NEWS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    const list = Array.isArray(parsed) ? parsed : CMS_NEWS;
    return sortNewsLatestToOldest(list);
  } catch (err) {
    console.error('[CMS Storage] Failed to read news.json, using fallback:', err);
    return sortNewsLatestToOldest(CMS_NEWS);
  }
}

export function saveNewsItems(items: NewsItem[]): boolean {
  ensureDataDir();
  try {
    const sorted = sortNewsLatestToOldest(items);
    fs.writeFileSync(NEWS_FILE, JSON.stringify(sorted, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[CMS Storage] Failed to write news.json:', err);
    return false;
  }
}

// ================= GALLERY STORAGE =================
export function getGalleryItems(): GalleryItem[] {
  ensureDataDir();
  if (!fs.existsSync(GALLERY_FILE)) {
    try {
      fs.writeFileSync(GALLERY_FILE, JSON.stringify(CMS_GALLERY, null, 2), 'utf-8');
      return CMS_GALLERY;
    } catch (err) {
      console.error('[CMS Storage] Failed to seed gallery.json:', err);
      return CMS_GALLERY;
    }
  }

  try {
    const raw = fs.readFileSync(GALLERY_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : CMS_GALLERY;
  } catch (err) {
    console.error('[CMS Storage] Failed to read gallery.json, using fallback:', err);
    return CMS_GALLERY;
  }
}

export function saveGalleryItems(items: GalleryItem[]): boolean {
  ensureDataDir();
  try {
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(items, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[CMS Storage] Failed to write gallery.json:', err);
    return false;
  }
}
