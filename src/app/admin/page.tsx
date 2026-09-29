'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, PieChart, TrendingUp, Users, Image as ImageIcon, 
  Newspaper, Lock, BadgeCheck, User as UserIcon, Plus, CheckCircle, Trash2, Send,
  BarChart3, FileText, MessageSquare, Bell, Copy, ExternalLink, Calendar, Phone, Mail,
  Sparkles, Check, Filter, X, Edit3, Play, Video
} from 'lucide-react';
import { CMS_GALLERY, CMS_NEWS, GalleryItem, NewsItem } from '@/lib/cms-data';
import FileUploadDropzone from '@/components/admin/FileUploadDropzone';
import { getYoutubeThumbnail, isYoutubeUrl } from '@/lib/youtube';
import { formatDisplayDate } from '@/lib/date-utils';

export default function AdminPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'portfolio' | 'sips' | 'investors' | 'gallery' | 'news' | 'broadcast'>('dashboard');

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    return () => {
      document.documentElement.classList.add('dark');
    };
  }, []);

  // User details
  const user = session?.user || {
    name: 'Demo Administrator',
    email: '',
    role: 'ADMIN',
    image: null,
  };

  // CMS Local State
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(CMS_GALLERY);
  const [newsList, setNewsList] = useState<NewsItem[]>(CMS_NEWS);
  const [successMsg, setSuccessMsg] = useState('');

  // Gallery Form & Edit State
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState<GalleryItem['category']>('Events');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryYoutubeUrl, setNewGalleryYoutubeUrl] = useState('');
  const [newGalleryDesc, setNewGalleryDesc] = useState('');
  const [newGalleryLocation, setNewGalleryLocation] = useState('');

  // News Form & Edit State
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState<NewsItem['category']>('NFO');
  const [newNewsExcerpt, setNewNewsExcerpt] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');
  const [newNewsImageUrl, setNewNewsImageUrl] = useState('');
  const [newNewsYoutubeUrl, setNewNewsYoutubeUrl] = useState('');
  const [newNewsStartDate, setNewNewsStartDate] = useState('');
  const [newNewsCloseDate, setNewNewsCloseDate] = useState('');
  const [newNewsRiskLevel, setNewNewsRiskLevel] = useState<NewsItem['riskLevel']>('Moderate');
  const [newNewsFundCategory, setNewNewsFundCategory] = useState('');
  const [newNewsIssueSize, setNewNewsIssueSize] = useState('');
  const [newNewsPriceBand, setNewNewsPriceBand] = useState('');

  // Customers & Leads State (from /api/leads)
  const [recipients, setRecipients] = useState<any[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  // Broadcast & Messaging State
  const [campaignType, setCampaignType] = useState<'nfo' | 'sip' | 'tax' | 'custom'>('nfo');
  const [broadcastFundName, setBroadcastFundName] = useState('SBI Energy Opportunities Fund NFO');
  const [broadcastCloseDate, setBroadcastCloseDate] = useState('15th October 2026');
  const [broadcastMinSip, setBroadcastMinSip] = useState('500');
  const [broadcastCustomMsg, setBroadcastCustomMsg] = useState('');
  const [broadcastFilter, setBroadcastFilter] = useState<'all' | 'sip' | 'nfo'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Add Client Modal State
  const [showAddClient, setShowAddClient] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientMobile, setNewClientMobile] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientInterest, setNewClientInterest] = useState('Active SIP');
  const [newClientSipDate, setNewClientSipDate] = useState('10');
  const [newClientSipAmount, setNewClientSipAmount] = useState('5,000');
  const [newClientFund, setNewClientFund] = useState('HDFC Top 100 Fund');

  // Load leads and CMS content from API
  useEffect(() => {
    setLoadingLeads(true);
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        if (data.leads && Array.isArray(data.leads)) {
          setRecipients(data.leads);
        }
      })
      .catch((err) => console.error('Failed to load leads:', err))
      .finally(() => setLoadingLeads(false));

    fetch('/api/cms')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (Array.isArray(data.news)) setNewsList(data.news);
          if (Array.isArray(data.gallery)) setGalleryList(data.gallery);
        }
      })
      .catch((err) => console.error('Failed to load CMS content:', err));
  }, []);

  // --- GALLERY HANDLERS (Add, Edit, Save, Delete, Cancel) ---
  const handleStartEditGallery = (item: GalleryItem) => {
    setEditingGalleryId(item.id);
    setNewGalleryTitle(item.title);
    setNewGalleryCategory(item.category);
    setNewGalleryUrl(item.imageUrl || '');
    setNewGalleryYoutubeUrl(item.youtubeUrl || (item.videoUrl && item.videoUrl.includes('youtu') ? item.videoUrl : ''));
    setNewGalleryLocation(item.location || '');
    setNewGalleryDesc(item.description || '');
  };

  const handleCancelEditGallery = () => {
    setEditingGalleryId(null);
    setNewGalleryTitle('');
    setNewGalleryCategory('Events');
    setNewGalleryUrl('');
    setNewGalleryYoutubeUrl('');
    setNewGalleryLocation('');
    setNewGalleryDesc('');
  };

  const handleSaveGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryTitle) return;

    // Use uploaded image, or extract YouTube thumbnail, or default
    const ytThumb = getYoutubeThumbnail(newGalleryYoutubeUrl);
    const effectiveImage = newGalleryUrl || ytThumb || '/images/default.jpg';
    const hasYt = !!newGalleryYoutubeUrl && isYoutubeUrl(newGalleryYoutubeUrl);
    const isVideo = hasYt || newGalleryUrl.endsWith('.mp4') || newGalleryCategory === 'Videos';

    let itemToSave: GalleryItem;

    if (editingGalleryId) {
      const existing = galleryList.find((g) => g.id === editingGalleryId);
      itemToSave = {
        id: editingGalleryId,
        slug: existing?.slug || newGalleryTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: newGalleryTitle,
        category: newGalleryCategory,
        type: isVideo ? 'video' : 'image',
        status: existing?.status || 'published',
        publishDate: existing?.publishDate || new Date().toISOString(),
        location: newGalleryLocation || 'Jeypore, Odisha',
        imageUrl: effectiveImage,
        videoUrl: newGalleryUrl.endsWith('.mp4') ? newGalleryUrl : (hasYt ? newGalleryYoutubeUrl : existing?.videoUrl),
        youtubeUrl: newGalleryYoutubeUrl || undefined,
        description: newGalleryDesc || existing?.description || 'Uploaded via TMFS Director Console.',
        featured: existing?.featured ?? true,
        downloadable: existing?.downloadable ?? true,
      };

      setGalleryList(galleryList.map((g) => (g.id === editingGalleryId ? itemToSave : g)));
      setSuccessMsg(`Gallery item "${newGalleryTitle}" updated successfully!`);
    } else {
      itemToSave = {
        id: `g_${Date.now()}`,
        slug: newGalleryTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: newGalleryTitle,
        category: newGalleryCategory,
        type: isVideo ? 'video' : 'image',
        status: 'published',
        publishDate: new Date().toISOString(),
        location: newGalleryLocation || 'Jeypore, Odisha',
        imageUrl: effectiveImage,
        videoUrl: newGalleryUrl.endsWith('.mp4') ? newGalleryUrl : undefined,
        youtubeUrl: newGalleryYoutubeUrl || undefined,
        description: newGalleryDesc || 'Uploaded via TMFS Director Console.',
        featured: true,
        downloadable: true,
      };

      setGalleryList([itemToSave, ...galleryList]);
      setSuccessMsg('New item added to Gallery successfully!');
    }

    handleCancelEditGallery();
    setTimeout(() => setSuccessMsg(''), 4000);

    // Persist to server storage
    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'gallery', item: itemToSave }),
      });
      const data = await res.json();
      if (data.items) setGalleryList(data.items);
    } catch (err) {
      console.error('Failed to persist gallery item:', err);
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) return;
    setGalleryList((prev) => prev.filter((g) => g.id !== id));
    try {
      const res = await fetch(`/api/cms?type=gallery&id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.items) setGalleryList(data.items);
      setSuccessMsg('Gallery item removed successfully');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Failed to delete gallery item:', err);
    }
  };

  // --- NEWS & NFO HANDLERS (Add, Edit, Save, Delete, Cancel) ---
  const handleStartEditNews = (item: NewsItem) => {
    setEditingNewsId(item.id);
    setNewNewsTitle(item.title);
    setNewNewsCategory(item.category);
    setNewNewsExcerpt(item.excerpt);
    setNewNewsContent(item.content ? item.content.replace(/<[^>]*>/g, '') : '');
    setNewNewsImageUrl(item.imageUrl || '');
    setNewNewsYoutubeUrl(item.youtubeUrl || '');
    setNewNewsStartDate(item.launchDate ? (item.launchDate.includes('T') ? item.launchDate.split('T')[0] : item.launchDate) : '');
    setNewNewsCloseDate(item.closeDate ? (item.closeDate.includes('T') ? item.closeDate.split('T')[0] : item.closeDate) : '');
    setNewNewsRiskLevel(item.riskLevel || 'Moderate');
    setNewNewsFundCategory(item.fundCategory || '');
    setNewNewsIssueSize(item.issueSize || '');
    setNewNewsPriceBand(item.priceBand || '');
  };

  const handleCancelEditNews = () => {
    setEditingNewsId(null);
    setNewNewsTitle('');
    setNewNewsCategory('NFO');
    setNewNewsExcerpt('');
    setNewNewsContent('');
    setNewNewsImageUrl('');
    setNewNewsYoutubeUrl('');
    setNewNewsStartDate('');
    setNewNewsCloseDate('');
    setNewNewsRiskLevel('Moderate');
    setNewNewsFundCategory('');
    setNewNewsIssueSize('');
    setNewNewsPriceBand('');
  };

  const handleSaveNewsItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitle || !newNewsExcerpt) return;

    const ytThumb = getYoutubeThumbnail(newNewsYoutubeUrl);
    const effectiveImage = newNewsImageUrl || ytThumb || undefined;

    let itemToSave: NewsItem;

    if (editingNewsId) {
      const existing = newsList.find((n) => n.id === editingNewsId);
      itemToSave = {
        id: editingNewsId,
        slug: existing?.slug || newNewsTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: newNewsTitle,
        category: newNewsCategory,
        status: existing?.status || 'published',
        publishDate: existing?.publishDate || new Date().toISOString(),
        author: existing?.author || 'Sri Tirumala Talabaktula',
        readingTime: existing?.readingTime || 3,
        excerpt: newNewsExcerpt,
        content: `<p>${newNewsContent || newNewsExcerpt}</p>`,
        tags: existing?.tags || ['TMFS', newNewsCategory],
        imageUrl: effectiveImage || existing?.imageUrl,
        youtubeUrl: newNewsYoutubeUrl || undefined,
        featured: existing?.featured ?? true,
        launchDate: newNewsStartDate || existing?.launchDate,
        closeDate: newNewsCloseDate || existing?.closeDate,
        riskLevel: newNewsRiskLevel || existing?.riskLevel,
        fundCategory: newNewsFundCategory || existing?.fundCategory,
        issueSize: newNewsIssueSize || existing?.issueSize,
        priceBand: newNewsPriceBand || existing?.priceBand,
      };

      setNewsList(newsList.map((n) => (n.id === editingNewsId ? itemToSave : n)));
      setSuccessMsg(`Announcement "${newNewsTitle}" updated successfully!`);
    } else {
      itemToSave = {
        id: `n_${Date.now()}`,
        slug: newNewsTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: newNewsTitle,
        category: newNewsCategory,
        status: 'published',
        publishDate: new Date().toISOString(),
        author: 'Sri Tirumala Talabaktula',
        readingTime: 3,
        excerpt: newNewsExcerpt,
        content: `<p>${newNewsContent || newNewsExcerpt}</p>`,
        tags: ['TMFS', newNewsCategory],
        imageUrl: effectiveImage,
        youtubeUrl: newNewsYoutubeUrl || undefined,
        featured: true,
        launchDate: newNewsStartDate || undefined,
        closeDate: newNewsCloseDate || undefined,
        riskLevel: newNewsCategory === 'NFO' ? newNewsRiskLevel : undefined,
        fundCategory: newNewsCategory === 'NFO' ? (newNewsFundCategory || 'Equity Fund') : undefined,
        issueSize: newNewsCategory === 'IPO' ? newNewsIssueSize : undefined,
        priceBand: newNewsCategory === 'IPO' ? newNewsPriceBand : undefined,
      };

      setNewsList([itemToSave, ...newsList]);
      setSuccessMsg('New Announcement / NFO published successfully!');
    }

    handleCancelEditNews();
    setTimeout(() => setSuccessMsg(''), 4000);

    // Persist to server storage
    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'news', item: itemToSave }),
      });
      const data = await res.json();
      if (data.items) setNewsList(data.items);
    } catch (err) {
      console.error('Failed to persist news item:', err);
    }
  };

  const handleDeleteNewsItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    setNewsList((prev) => prev.filter((n) => n.id !== id));
    try {
      const res = await fetch(`/api/cms?type=news&id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.items) setNewsList(data.items);
      setSuccessMsg('Announcement removed successfully');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Failed to delete news item:', err);
    }
  };

  const handleAddNewClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newClientMobile) return;

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: newClientName,
          mobile: newClientMobile,
          email: newClientEmail,
          investmentInterest: newClientInterest,
          approximateAmount: newClientSipAmount,
          sipDate: newClientSipDate,
          fundName: newClientFund,
        }),
      });
      const data = await res.json();
      if (data.lead) {
        setRecipients([data.lead, ...recipients]);
        setShowAddClient(false);
        setNewClientName('');
        setNewClientMobile('');
        setNewClientEmail('');
        setSuccessMsg(`Client ${newClientName} added to directory!`);
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch {
      alert('Failed to save client');
    }
  };

  // Generate personalized text for a recipient
  const getMessageForRecipient = (r: any) => {
    const name = r.fullName || 'Valued Investor';
    if (campaignType === 'nfo') {
      return `Dear ${name},\n\nGreetings from Tirumala Mutual Fund Services (ARN-144270).\n\n🚀 *New Fund Offer (NFO) Alert:*\n*${broadcastFundName}*\n\n📅 *Closing Date:* ${broadcastCloseDate}\n💰 *Minimum SIP:* ₹${broadcastMinSip}/month\n\nEarly NAV entry allows you to compound wealth steadily over market cycles. To view fund details or start your investment, visit https://tirumalamutualfunds.in/news or reply directly to speak with Sri Tirumala Talabaktula.\n\n_Mutual fund investments are subject to market risks. Read scheme documents carefully._`;
    } else if (campaignType === 'sip') {
      return `Dear ${name},\n\nNamaste from Tirumala Mutual Fund Services (ARN-144270).\n\n⏰ *Monthly SIP Debit Reminder:*\nYour scheduled mutual fund installment of *${r.sipAmount || '₹5,000/month'}* is due on *${r.sipDate ? `${r.sipDate}th of this month` : 'your upcoming debit date'}* for *${r.fundName || 'Active SIP Portfolio'}*.\n\nKindly ensure your registered bank account has sufficient balance to maintain uninterrupted compounding and avoid bank mandate bounce charges.\n\nWarm regards,\n*Tirumala Mutual Fund Services*\nJeypore, Odisha • Call: +91 8763732389`;
    } else if (campaignType === 'tax') {
      return `Dear ${name},\n\nTax-saving season reminder from Tirumala Mutual Fund Services (ARN-144270).\n\n💼 Save up to ₹46,800 in taxes under Section 80C with *ELSS Tax Saver Mutual Funds* (shortest 3-year lock-in with potential for long-term equity growth).\n\nContact Sri Tirumala Talabaktula today for a personalized tax-saving allocation.\nhttps://tirumalamutualfunds.in/#contact`;
    } else {
      return `Dear ${name},\n\n${broadcastCustomMsg || 'Important portfolio advisory update from Tirumala Mutual Fund Services.'}\n\nFor personalized assistance, contact Sri Tirumala Talabaktula, ARN-144270.\nhttps://tirumalamutualfunds.in`;
    }
  };

  // Filter recipients
  const filteredRecipients = recipients.filter((r) => {
    if (broadcastFilter === 'sip') return r.status === 'ACTIVE_SIP' || r.investmentInterest?.includes('SIP');
    if (broadcastFilter === 'nfo') return r.status === 'NFO_SUBSCRIBER' || r.investmentInterest?.includes('NFO');
    return true;
  });

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSendEmailBroadcast = async () => {
    setIsSendingEmail(true);
    try {
      const res = await fetch('/api/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignType,
          fundName: broadcastFundName,
          closeDate: broadcastCloseDate,
          minSip: broadcastMinSip,
          customMessage: broadcastCustomMsg,
          recipients: filteredRecipients,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(`Email campaign prepared & dispatched for ${data.count} recipients!`);
        setTimeout(() => setSuccessMsg(''), 5000);
      }
    } catch {
      alert('Broadcast dispatch failed');
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div data-theme="light" className="light-theme min-h-screen bg-slate-50 !text-slate-900 font-sans flex flex-col">
      {/* Top Navbar Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-600 text-sm">
            T
          </div>
          <h1 className="text-lg md:text-xl font-extrabold !text-slate-950 tracking-tight font-heading">
            Tirumala Mutual Fund Services
          </h1>
        </div>

        {/* User Admin Pill & Logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 bg-slate-100 border border-slate-200 rounded-full px-3.5 py-1.5 shadow-sm">
            <span className="text-xs font-semibold !text-slate-700">
              Admin: <strong className="!text-slate-950 font-bold">{user.name}</strong>
            </span>
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || 'User Avatar'}
                width={26}
                height={26}
                className="rounded-full border border-amber-500 object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-amber-500 !text-slate-950 flex items-center justify-center font-extrabold text-[10px]">
                {user.name?.[0] || 'A'}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              document.cookie = "tmfs_demo_mode=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
              signOut({ callbackUrl: '/' });
            }}
            className="text-xs font-bold !text-slate-700 hover:!text-red-600 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body: Left Sidebar + Workspace Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Vertical Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 flex flex-col justify-between shrink-0 shadow-sm">
          <div className="space-y-1.5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-gold-500 !text-slate-950 shadow-sm'
                  : '!text-slate-700 hover:bg-slate-100 hover:!text-slate-950'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-slate-900" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'portfolio'
                  ? 'bg-gold-500 !text-slate-950 shadow-sm'
                  : '!text-slate-700 hover:bg-slate-100 hover:!text-slate-950'
              }`}
            >
              <PieChart className="w-4 h-4 text-slate-700" />
              <span>Portfolio</span>
            </button>

            <button
              onClick={() => setActiveTab('sips')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'sips'
                  ? 'bg-gold-500 !text-slate-950 shadow-sm'
                  : '!text-slate-700 hover:bg-slate-100 hover:!text-slate-950'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-slate-700" />
              <span>SIPs</span>
            </button>

            <button
              onClick={() => setActiveTab('investors')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'investors'
                  ? 'bg-gold-500 !text-slate-950 shadow-sm'
                  : '!text-slate-700 hover:bg-slate-100 hover:!text-slate-950'
              }`}
            >
              <Users className="w-4 h-4 text-slate-700" />
              <span>Investors & Leads</span>
            </button>

            <button
              onClick={() => setActiveTab('broadcast')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'broadcast'
                  ? 'bg-gold-500 !text-slate-950 shadow-sm'
                  : '!text-slate-700 hover:bg-slate-100 hover:!text-slate-950'
              }`}
            >
              <Send className="w-4 h-4 text-slate-700" />
              <span>Messaging & Alerts</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-gold-500 !text-slate-950 shadow-sm'
                  : '!text-slate-700 hover:bg-slate-100 hover:!text-slate-950'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-slate-700" />
              <span>Gallery Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'news'
                  ? 'bg-gold-500 !text-slate-950 shadow-sm'
                  : '!text-slate-700 hover:bg-slate-100 hover:!text-slate-950'
              }`}
            >
              <Newspaper className="w-4 h-4 text-slate-700" />
              <span>News & NFOs</span>
            </button>
          </div>

          <div className="pt-6 border-t border-slate-200 mt-6">
            <Link
              href="/"
              className="w-full bg-primary-950 hover:bg-primary-900 !text-white font-extrabold py-3 px-4 rounded-xl text-xs text-center block transition-all shadow-md"
            >
              Return to Website
            </Link>
          </div>
        </aside>

        {/* Right Workspace Content Area */}
        <main className="flex-1 p-6 md:p-10 max-w-6xl">
          {/* Toast Alert */}
          {successMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 !text-emerald-900 flex items-center gap-3 shadow-sm">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-sm font-semibold">{successMsg}</span>
            </div>
          )}

          {/* MAIN DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-extrabold !text-slate-950 font-heading tracking-tight">
                    Welcome, {user.name}
                  </h2>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-gold-800 !text-gold-300 uppercase tracking-widest shadow-sm">
                    ADMIN
                  </span>
                </div>
                <p className="!text-slate-600 text-sm mt-1 font-medium">
                  A bird&apos;s eye view of your investor management system and fund operations.
                </p>
              </div>

              {/* 3 Status Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                        <BadgeCheck className="w-5 h-5 text-amber-600" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 !text-emerald-800 tracking-wider">
                        ACTIVE
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold !text-slate-950 font-heading">Account Status</h3>
                    <p className="!text-amber-800 text-xs font-bold mt-0.5">Verified Investor Account</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs !text-slate-600 font-semibold">
                    AMFI ARN-144270 Compliant
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center">
                        <PieChart className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 !text-blue-800">
                        {recipients.length} Clients
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold !text-slate-950 font-heading">Customer Registry</h3>
                    <p className="!text-slate-600 text-xs font-medium mt-0.5">Website Leads & Active Investors</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs !text-slate-500 font-semibold">
                    Automated Ingestion Active
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gold-100 border border-gold-200 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-amber-800" />
                      </div>
                    </div>
                    <h3 className="text-lg font-extrabold !text-slate-950 font-heading">Principal Advisor</h3>
                    <p className="!text-amber-900 text-xs font-bold mt-0.5">Mr. Tirumala Talabaktula</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs !text-slate-700 font-bold flex items-center gap-1">
                    📞 +91 87637 32389
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PORTFOLIO TAB */}
          {activeTab === 'portfolio' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-extrabold !text-slate-950 font-heading">Client Portfolio Overview</h3>
              <p className="!text-slate-700 text-sm font-medium">Real-time mutual fund holdings and AUM breakdown across funds.</p>
              <div className="p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center !text-slate-700 font-bold text-sm">
                AUM Analytics & Live Fund NAV Integration Active
              </div>
            </div>
          )}

          {/* SIPS TAB */}
          {activeTab === 'sips' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-extrabold !text-slate-950 font-heading">Active SIP Registers</h3>
              <p className="!text-slate-700 text-sm font-medium">Systematic Investment Plan records and monthly mandate schedules.</p>
              <div className="p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center !text-slate-700 font-bold text-sm">
                Automated SIP Mandate Tracker Ready
              </div>
            </div>
          )}

          {/* INVESTORS & LEADS TAB */}
          {activeTab === 'investors' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-xl font-extrabold !text-slate-950 font-heading">Registered Investors & Leads</h3>
                  <p className="!text-slate-700 text-sm font-medium">Manage consultation requests and active SIP accounts.</p>
                </div>
                <button
                  onClick={() => setShowAddClient(true)}
                  className="bg-gold-500 hover:bg-gold-400 !text-slate-950 font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Client</span>
                </button>
              </div>

              {loadingLeads ? (
                <div className="p-8 text-center text-sm font-bold text-slate-500">Loading directory...</div>
              ) : recipients.length === 0 ? (
                <div className="p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center text-slate-600 font-medium text-sm">
                  No consultation leads recorded yet. Submissions on the homepage form will appear here automatically.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                        <th className="py-3 px-3 font-bold">Investor Name</th>
                        <th className="py-3 px-3 font-bold">Mobile / WhatsApp</th>
                        <th className="py-3 px-3 font-bold">Email</th>
                        <th className="py-3 px-3 font-bold">Interest / Mandate</th>
                        <th className="py-3 px-3 font-bold">SIP Date</th>
                        <th className="py-3 px-3 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recipients.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3 font-bold !text-slate-950">{lead.fullName}</td>
                          <td className="py-3 px-3 font-mono !text-slate-700">+91 {lead.mobile}</td>
                          <td className="py-3 px-3 !text-slate-600">{lead.email || '—'}</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-800">
                              {lead.investmentInterest || 'Consultation'}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-semibold text-slate-700">
                            {lead.sipDate ? `${lead.sipDate}th of month` : '—'}
                          </td>
                          <td className="py-3 px-3">
                            <a
                              href={`https://wa.me/91${lead.mobile.replace(/[^0-9]/g, '').slice(-10)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold px-2.5 py-1 rounded-lg text-[11px] border border-emerald-200"
                            >
                              <Phone className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* CUSTOMER MESSAGING & AUTOMATED ALERTS TAB */}
          {activeTab === 'broadcast' && (
            <div className="space-y-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-2xl font-extrabold !text-slate-950 font-heading">
                    Customer Messaging & Alerts
                  </h3>
                  <p className="!text-slate-700 text-sm font-medium mt-0.5">
                    Automate notifications to investors about upcoming NFO launches, monthly SIP debits, and tax seasons.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddClient(true)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Investor</span>
                  </button>
                  <button
                    onClick={handleSendEmailBroadcast}
                    disabled={isSendingEmail || filteredRecipients.length === 0}
                    className="bg-primary-950 hover:bg-primary-900 !text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{isSendingEmail ? 'Dispatching...' : `Email All (${filteredRecipients.length})`}</span>
                  </button>
                </div>
              </div>

              {/* Campaign Type Selector Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setCampaignType('nfo')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    campaignType === 'nfo'
                      ? 'border-amber-500 bg-amber-50/50 shadow-sm ring-1 ring-amber-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm !text-slate-900 mb-1">
                    <span className="text-base">🚀</span>
                    <span>Upcoming NFO Alert</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                    Notify clients about new fund offers closing soon with minimum SIP entry.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setCampaignType('sip')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    campaignType === 'sip'
                      ? 'border-amber-500 bg-amber-50/50 shadow-sm ring-1 ring-amber-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm !text-slate-900 mb-1">
                    <span className="text-base">⏰</span>
                    <span>Monthly SIP Debit Reminder</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                    Remind active investors to keep bank balance ready for upcoming monthly installments.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setCampaignType('tax')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    campaignType === 'tax'
                      ? 'border-amber-500 bg-amber-50/50 shadow-sm ring-1 ring-amber-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm !text-slate-900 mb-1">
                    <span className="text-base">💼</span>
                    <span>ELSS Tax Saving Season</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                    Broadcast Section 80C tax-saving allocation tips before financial year-end.
                  </p>
                </button>
              </div>

              {/* Campaign Inputs & Live WhatsApp Chat Bubble Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Inputs */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-xs">
                  <h4 className="font-extrabold !text-slate-950 text-sm font-heading flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Customize Campaign Message</span>
                  </h4>

                  {campaignType === 'nfo' && (
                    <>
                      <div>
                        <label className="block !text-slate-700 font-bold mb-1">NFO Scheme Name *</label>
                        <input
                          type="text"
                          value={broadcastFundName}
                          onChange={(e) => setBroadcastFundName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block !text-slate-700 font-bold mb-1">Closing Date</label>
                          <input
                            type="text"
                            value={broadcastCloseDate}
                            onChange={(e) => setBroadcastCloseDate(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block !text-slate-700 font-bold mb-1">Minimum SIP (₹)</label>
                          <input
                            type="text"
                            value={broadcastMinSip}
                            onChange={(e) => setBroadcastMinSip(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {campaignType === 'sip' && (
                    <div>
                      <p className="text-slate-600 text-xs leading-relaxed font-medium">
                        SIP reminders automatically pull each client&apos;s registered installment amount and upcoming debit date (5th, 10th, 15th, 20th).
                      </p>
                    </div>
                  )}

                  {campaignType === 'custom' && (
                    <div>
                      <label className="block !text-slate-700 font-bold mb-1">Custom Advisory Message</label>
                      <textarea
                        rows={4}
                        value={broadcastCustomMsg}
                        onChange={(e) => setBroadcastCustomMsg(e.target.value)}
                        placeholder="Type message text..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  )}
                </div>

                {/* Live WhatsApp Preview */}
                <div className="bg-[#efeae2] border border-slate-300 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5 text-emerald-800">
                      <MessageSquare className="w-4 h-4" /> Live WhatsApp Preview
                    </span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-slate-200">
                      Personalized per customer
                    </span>
                  </div>

                  {/* Chat Bubble */}
                  <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm border border-slate-200/60 text-xs font-sans whitespace-pre-line text-slate-800 leading-relaxed">
                    {getMessageForRecipient({ fullName: 'Rajesh ji', sipAmount: '₹5,000/month', sipDate: 10, fundName: 'HDFC Top 100' })}
                    <div className="text-right text-[10px] text-slate-400 mt-2 font-mono">10:45 AM ✓✓</div>
                  </div>
                </div>
              </div>

              {/* Recipient Customer Table with 1-Click WhatsApp Trigger */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="text-sm font-extrabold !text-slate-950 font-heading">
                      Customer Recipients ({filteredRecipients.length})
                    </h4>
                    <p className="text-[11px] text-slate-600 font-medium">Click WhatsApp to send personalized message directly to each customer.</p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                    <button
                      onClick={() => setBroadcastFilter('all')}
                      className={`px-3 py-1 rounded-lg transition-all ${broadcastFilter === 'all' ? 'bg-white shadow-xs !text-slate-950' : 'text-slate-600'}`}
                    >
                      All ({recipients.length})
                    </button>
                    <button
                      onClick={() => setBroadcastFilter('sip')}
                      className={`px-3 py-1 rounded-lg transition-all ${broadcastFilter === 'sip' ? 'bg-white shadow-xs !text-slate-950' : 'text-slate-600'}`}
                    >
                      Active SIPs ({recipients.filter(r => r.status === 'ACTIVE_SIP').length})
                    </button>
                    <button
                      onClick={() => setBroadcastFilter('nfo')}
                      className={`px-3 py-1 rounded-lg transition-all ${broadcastFilter === 'nfo' ? 'bg-white shadow-xs !text-slate-950' : 'text-slate-600'}`}
                    >
                      NFO Inquiries ({recipients.filter(r => r.status === 'NFO_SUBSCRIBER').length})
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                        <th className="py-2.5 px-3 font-bold">Customer Name</th>
                        <th className="py-2.5 px-3 font-bold">WhatsApp Mobile</th>
                        <th className="py-2.5 px-3 font-bold">Mandate / Status</th>
                        <th className="py-2.5 px-3 font-bold text-right">1-Click Dispatch</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredRecipients.map((rec) => {
                        const messageText = getMessageForRecipient(rec);
                        const cleanPhone = (rec.mobile || '').replace(/[^0-9]/g, '').slice(-10);
                        const waLink = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(messageText)}`;

                        return (
                          <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-3">
                              <span className="font-bold !text-slate-950 block">{rec.fullName}</span>
                              <span className="text-[11px] text-slate-500">{rec.email || rec.city || 'Jeypore'}</span>
                            </td>
                            <td className="py-3 px-3 font-mono font-medium !text-slate-800">
                              +91 {cleanPhone}
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-semibold !text-slate-800 block text-xs">
                                {rec.fundName || rec.investmentInterest || 'Consultation Lead'}
                              </span>
                              <span className="text-[11px] text-amber-700 font-bold">
                                {rec.sipAmount ? `${rec.sipAmount} (Due: ${rec.sipDate}th)` : rec.status}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <div className="inline-flex items-center gap-2 justify-end">
                                <button
                                  type="button"
                                  onClick={() => handleCopyMessage(rec.id, messageText)}
                                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                  title="Copy text"
                                >
                                  {copiedId === rec.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>

                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 !text-white font-extrabold px-3 py-1.5 rounded-xl text-xs transition-all shadow-sm"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span>Send WhatsApp</span>
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* GALLERY MANAGER TAB */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm h-fit">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-extrabold !text-slate-950 font-heading flex items-center gap-2">
                    {editingGalleryId ? (
                      <>
                        <Edit3 className="w-4 h-4 text-blue-600" />
                        Edit Gallery Item
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-amber-600" />
                        Add Gallery Item
                      </>
                    )}
                  </h3>
                  {editingGalleryId && (
                    <button
                      type="button"
                      onClick={handleCancelEditGallery}
                      className="text-xs text-slate-500 hover:text-slate-800 underline font-semibold cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveGalleryItem} className="space-y-4 text-xs">
                  <div>
                    <label className="block !text-slate-700 font-bold mb-1">Item Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Investor Awareness Program 2026"
                      value={newGalleryTitle}
                      onChange={(e) => setNewGalleryTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block !text-slate-700 font-bold mb-1">Category</label>
                    <select
                      value={newGalleryCategory}
                      onChange={(e) => setNewGalleryCategory(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="Events">Events</option>
                      <option value="Seminars">Seminars</option>
                      <option value="Client Meets">Client Meets</option>
                      <option value="Awards">Awards</option>
                      <option value="Certificates">Certificates</option>
                      <option value="Office">Office</option>
                      <option value="Videos">Videos</option>
                    </select>
                  </div>

                  {/* 1. Cover Photo / Upload Option */}
                  <div>
                    <label className="block !text-slate-700 font-bold mb-1">
                      Upload Media File <span className="text-slate-400 font-normal">(Photo or MP4 Video - Optional)</span>
                    </label>
                    <FileUploadDropzone
                      label="Upload Photo or MP4 Video"
                      currentUrl={newGalleryUrl}
                      onUploadSuccess={(url, info) => {
                        setNewGalleryUrl(url);
                        if (info.type?.startsWith('video')) {
                          setNewGalleryCategory('Videos');
                        }
                      }}
                    />
                  </div>

                  {/* 2. YouTube Video URL Option */}
                  <div>
                    <label className="block !text-slate-700 font-bold mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Play className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                        YouTube Video Link <span className="text-slate-400 font-normal">(Optional)</span>
                      </span>
                      {newGalleryYoutubeUrl && isYoutubeUrl(newGalleryYoutubeUrl) && (
                        <span className="text-[10px] text-emerald-600 font-bold">✓ Valid YouTube URL</span>
                      )}
                    </label>
                    <input
                      type="url"
                      placeholder="e.g. https://www.youtube.com/watch?v=... or https://youtu.be/..."
                      value={newGalleryYoutubeUrl}
                      onChange={(e) => {
                        setNewGalleryYoutubeUrl(e.target.value);
                        if (e.target.value && !newGalleryUrl) {
                          setNewGalleryCategory('Videos');
                        }
                      }}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                    />
                    <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                      💡 Tip: You can provide an uploaded cover photo, a YouTube video link, or both together.
                    </p>
                  </div>

                  <div>
                    <label className="block !text-slate-700 font-bold mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="e.g., Jeypore Town Hall"
                      value={newGalleryLocation}
                      onChange={(e) => setNewGalleryLocation(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block !text-slate-700 font-bold mb-1">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Details about this photo or program..."
                      value={newGalleryDesc}
                      onChange={(e) => setNewGalleryDesc(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="submit"
                      className="flex-1 bg-gold-500 hover:bg-gold-400 !text-slate-950 font-extrabold py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-xs"
                    >
                      {editingGalleryId ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                      <span>{editingGalleryId ? 'Save Changes' : 'Publish to Website Gallery'}</span>
                    </button>
                    {editingGalleryId && (
                      <button
                        type="button"
                        onClick={handleCancelEditGallery}
                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-all"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold !text-slate-950 font-heading">
                    Live Gallery Items ({galleryList.length})
                  </h3>
                  <span className="text-xs text-slate-500">Click &ldquo;Edit&rdquo; to modify any item</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {galleryList.map((item) => {
                    const previewThumb = item.imageUrl || getYoutubeThumbnail(item.youtubeUrl || item.videoUrl);
                    const hasYt = !!item.youtubeUrl || isYoutubeUrl(item.videoUrl);

                    return (
                      <div 
                        key={item.id} 
                        className={`bg-white border rounded-xl p-3 shadow-sm flex flex-col justify-between transition-all ${
                          editingGalleryId === item.id ? 'ring-2 ring-blue-500 border-blue-400' : 'border-slate-200'
                        }`}
                      >
                        <div>
                          <div className="relative h-32 rounded-lg overflow-hidden mb-2.5 bg-slate-100 flex items-center justify-center">
                            {previewThumb ? (
                              item.imageUrl?.endsWith('.mp4') ? (
                                <video src={item.imageUrl} className="w-full h-full object-cover" muted />
                              ) : (
                                <img src={previewThumb} alt={item.title} className="w-full h-full object-cover" />
                              )
                            ) : (
                              <div className="text-slate-400 text-xs font-semibold">No Preview</div>
                            )}

                            {hasYt && (
                              <div className="absolute top-2 right-2 bg-red-600/90 text-white p-1 rounded-full shadow">
                                <Play size={10} className="fill-white ml-0.5" />
                              </div>
                            )}
                          </div>
                          <h4 className="font-bold !text-slate-950 text-xs line-clamp-1">{item.title}</h4>
                          <p className="!text-slate-600 text-[11px] line-clamp-2 mt-0.5">{item.description}</p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] !text-slate-500 font-semibold">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span>{item.category}</span>
                            {item.imageUrl && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-slate-100 text-slate-700 uppercase">
                                Photo
                              </span>
                            )}
                            {hasYt && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-red-100 text-red-700 uppercase">
                                YouTube
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleStartEditGallery(item)}
                              className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                              title="Edit this item"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteGalleryItem(item.id)}
                              className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors cursor-pointer"
                              title="Delete this item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* NEWS & NFO TAB */}
          {activeTab === 'news' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm h-fit">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-extrabold !text-slate-950 font-heading flex items-center gap-2">
                    {editingNewsId ? (
                      <>
                        <Edit3 className="w-4 h-4 text-blue-600" />
                        Edit News or NFO
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-amber-600" />
                        Publish News or NFO
                      </>
                    )}
                  </h3>
                  {editingNewsId && (
                    <button
                      type="button"
                      onClick={handleCancelEditNews}
                      className="text-xs text-slate-500 hover:text-slate-800 underline font-semibold cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveNewsItem} className="space-y-4 text-xs">
                  <div>
                    <label className="block !text-slate-700 font-bold mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., SBI Energy Opportunities Fund NFO"
                      value={newNewsTitle}
                      onChange={(e) => setNewNewsTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block !text-slate-700 font-bold mb-1">Category</label>
                    <select
                      value={newNewsCategory}
                      onChange={(e) => setNewNewsCategory(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="NFO">NFO Announcement</option>
                      <option value="News">Market News</option>
                      <option value="IPO">IPO Updates</option>
                      <option value="Tax Updates">Tax Updates</option>
                      <option value="Investor Education">Investor Education</option>
                    </select>
                  </div>

                  {/* 1. Cover Banner Upload */}
                  <div>
                    <label className="block !text-slate-700 font-bold mb-1">
                      Cover Banner / Poster <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <FileUploadDropzone
                      label="Cover Banner / Poster"
                      currentUrl={newNewsImageUrl}
                      accept="image/*"
                      onUploadSuccess={(url) => setNewNewsImageUrl(url)}
                    />
                  </div>

                  {/* 2. YouTube Video Link */}
                  <div>
                    <label className="block !text-slate-700 font-bold mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Play className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                        YouTube Video Link <span className="text-slate-400 font-normal">(Optional)</span>
                      </span>
                      {newNewsYoutubeUrl && isYoutubeUrl(newNewsYoutubeUrl) && (
                        <span className="text-[10px] text-emerald-600 font-bold">✓ Valid YouTube URL</span>
                      )}
                    </label>
                    <input
                      type="url"
                      placeholder="e.g. https://www.youtube.com/watch?v=... or https://youtu.be/..."
                      value={newNewsYoutubeUrl}
                      onChange={(e) => setNewNewsYoutubeUrl(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Scheme Schedule & Dates (For NFO, IPO, & Announcements) */}
                  <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl space-y-2.5">
                    <div className="flex items-center gap-1.5 text-amber-950 font-bold text-xs">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>{newNewsCategory === 'NFO' ? 'NFO Scheme Schedule' : newNewsCategory === 'IPO' ? 'IPO Bidding Dates' : 'Schedule Dates'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                          Starting Date {newNewsCategory === 'NFO' || newNewsCategory === 'IPO' ? '*' : ''}
                        </label>
                        <input
                          type="date"
                          required={newNewsCategory === 'NFO' || newNewsCategory === 'IPO'}
                          value={newNewsStartDate}
                          onChange={(e) => setNewNewsStartDate(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-950 font-medium focus:outline-none focus:border-amber-500 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-bold mb-1 text-[11px]">
                          Last Date {newNewsCategory === 'NFO' || newNewsCategory === 'IPO' ? '*' : ''}
                        </label>
                        <input
                          type="date"
                          required={newNewsCategory === 'NFO' || newNewsCategory === 'IPO'}
                          value={newNewsCloseDate}
                          onChange={(e) => setNewNewsCloseDate(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-950 font-medium focus:outline-none focus:border-amber-500 text-xs"
                        />
                      </div>
                    </div>

                    {newNewsCategory === 'NFO' && (
                      <div className="grid grid-cols-2 gap-2.5 pt-1 border-t border-amber-200/60">
                        <div>
                          <label className="block text-slate-700 font-bold mb-1 text-[11px]">Risk Meter</label>
                          <select
                            value={newNewsRiskLevel}
                            onChange={(e) => setNewNewsRiskLevel(e.target.value as any)}
                            className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-slate-950 text-xs font-medium focus:outline-none focus:border-amber-500 cursor-pointer"
                          >
                            <option value="Low">Low Risk</option>
                            <option value="Moderate">Moderate Risk</option>
                            <option value="High">High Risk</option>
                            <option value="Very High">Very High Risk</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-1 text-[11px]">Fund Category</label>
                          <input
                            type="text"
                            placeholder="e.g. Contra / Sectoral"
                            value={newNewsFundCategory}
                            onChange={(e) => setNewNewsFundCategory(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-950 font-medium focus:outline-none focus:border-amber-500 text-xs"
                          />
                        </div>
                      </div>
                    )}

                    {newNewsCategory === 'IPO' && (
                      <div className="grid grid-cols-2 gap-2.5 pt-1 border-t border-amber-200/60">
                        <div>
                          <label className="block text-slate-700 font-bold mb-1 text-[11px]">Price Band</label>
                          <input
                            type="text"
                            placeholder="e.g. ₹450 - ₹475"
                            value={newNewsPriceBand}
                            onChange={(e) => setNewNewsPriceBand(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-950 font-medium focus:outline-none focus:border-amber-500 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-1 text-[11px]">Issue Size</label>
                          <input
                            type="text"
                            placeholder="e.g. ₹1,200 Cr"
                            value={newNewsIssueSize}
                            onChange={(e) => setNewNewsIssueSize(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-950 font-medium focus:outline-none focus:border-amber-500 text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block !text-slate-700 font-bold mb-1">Excerpt *</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Short summary..."
                      value={newNewsExcerpt}
                      onChange={(e) => setNewNewsExcerpt(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block !text-slate-700 font-bold mb-1">Full Content</label>
                    <textarea
                      rows={4}
                      placeholder="Details..."
                      value={newNewsContent}
                      onChange={(e) => setNewNewsContent(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="submit"
                      className="flex-1 bg-gold-500 hover:bg-gold-400 !text-slate-950 font-extrabold py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-xs"
                    >
                      {editingNewsId ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                      <span>{editingNewsId ? 'Save Changes' : 'Publish News to Website'}</span>
                    </button>
                    {editingNewsId && (
                      <button
                        type="button"
                        onClick={handleCancelEditNews}
                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-all"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-extrabold !text-slate-950 font-heading">
                    Published News & NFOs ({newsList.length})
                  </h3>
                  <span className="text-xs text-slate-500">Click &ldquo;Edit&rdquo; to modify any item</span>
                </div>

                {newsList.map((item) => {
                  const hasYt = !!item.youtubeUrl || (item.videoUrl && isYoutubeUrl(item.videoUrl));

                  return (
                    <div 
                      key={item.id} 
                      className={`bg-white border rounded-xl p-4 shadow-sm flex items-start justify-between gap-4 transition-all ${
                        editingNewsId === item.id ? 'ring-2 ring-blue-500 border-blue-400' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 !text-amber-900 uppercase">
                            {item.category}
                          </span>
                          {item.imageUrl && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                              Banner
                            </span>
                          )}
                          {hasYt && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-red-100 text-red-700 uppercase flex items-center gap-1">
                              <Play size={9} className="fill-red-700" />
                              YouTube
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold !text-slate-950 text-sm mt-1">{item.title}</h4>
                        <p className="!text-slate-600 text-xs mt-1 font-medium">{item.excerpt}</p>
                        
                        {(item.launchDate || item.closeDate) && (
                          <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-2 font-medium">
                            {item.launchDate && (
                              <span>Starts: <strong className="text-slate-800">{formatDisplayDate(item.launchDate)}</strong></span>
                            )}
                            {item.closeDate && (
                              <span>Closes: <strong className="text-slate-800">{formatDisplayDate(item.closeDate)}</strong></span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <Link
                          href={`/news/${item.slug}`}
                          target="_blank"
                          className="p-1.5 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded transition-colors cursor-pointer"
                          title="View live details page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleStartEditNews(item)}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                          title="Edit this news item"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteNewsItem(item.id)}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors cursor-pointer"
                          title="Delete this news item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Client Modal */}
      {showAddClient && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base !text-slate-950 font-heading">
                Add Investor to Directory
              </h3>
              <button onClick={() => setShowAddClient(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewClient} className="space-y-3 text-xs">
              <div>
                <label className="block !text-slate-700 font-bold mb-1">Investor Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Nayak"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block !text-slate-700 font-bold mb-1">10-Digit Mobile *</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="9876543210"
                    value={newClientMobile}
                    onChange={(e) => setNewClientMobile(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block !text-slate-700 font-bold mb-1">Monthly SIP Date</label>
                  <select
                    value={newClientSipDate}
                    onChange={(e) => setNewClientSipDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                  >
                    <option value="5">5th of month</option>
                    <option value="10">10th of month</option>
                    <option value="15">15th of month</option>
                    <option value="20">20th of month</option>
                    <option value="25">25th of month</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block !text-slate-700 font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="investor@gmail.com"
                  value={newClientEmail}
                  onChange={(e) => setNewClientEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block !text-slate-700 font-bold mb-1">SIP Amount (₹)</label>
                  <input
                    type="text"
                    value={newClientSipAmount}
                    onChange={(e) => setNewClientSipAmount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block !text-slate-700 font-bold mb-1">Fund Name</label>
                  <input
                    type="text"
                    value={newClientFund}
                    onChange={(e) => setNewClientFund(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gold-500 hover:bg-gold-400 !text-slate-950 font-extrabold py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Save to Investor Directory</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
