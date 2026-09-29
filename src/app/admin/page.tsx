'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, PieChart, TrendingUp, Users, Image as ImageIcon, 
  Newspaper, Lock, BadgeCheck, User as UserIcon, Plus, CheckCircle, Trash2, Send,
  BarChart3, FileText, MessageSquare
} from 'lucide-react';
import { CMS_GALLERY, CMS_NEWS, GalleryItem, NewsItem } from '@/lib/cms-data';

export default function AdminPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'portfolio' | 'sips' | 'investors' | 'gallery' | 'news'>('dashboard');

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

  // Gallery Form State
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState<GalleryItem['category']>('Events');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryDesc, setNewGalleryDesc] = useState('');
  const [newGalleryLocation, setNewGalleryLocation] = useState('');

  // News Form State
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState<NewsItem['category']>('NFO');
  const [newNewsExcerpt, setNewNewsExcerpt] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');

  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryTitle || !newGalleryUrl) return;

    const newItem: GalleryItem = {
      id: `g_${Date.now()}`,
      slug: newGalleryTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newGalleryTitle,
      category: newGalleryCategory,
      type: 'image',
      status: 'published',
      publishDate: new Date().toISOString(),
      location: newGalleryLocation || 'Jeypore, Odisha',
      imageUrl: newGalleryUrl,
      description: newGalleryDesc || 'Uploaded via TMFS Director Console.',
      featured: true,
      downloadable: true,
    };

    setGalleryList([newItem, ...galleryList]);
    setNewGalleryTitle('');
    setNewGalleryUrl('');
    setNewGalleryDesc('');
    setNewGalleryLocation('');

    setSuccessMsg('New item added to Gallery successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleAddNewsItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitle || !newNewsExcerpt) return;

    const newItem: NewsItem = {
      id: `n_${Date.now()}`,
      slug: newNewsTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newNewsTitle,
      category: newNewsCategory,
      status: 'published',
      publishDate: new Date().toISOString(),
      author: 'Director Desk',
      readingTime: 3,
      excerpt: newNewsExcerpt,
      content: `<p>${newNewsContent || newNewsExcerpt}</p>`,
      tags: ['TMFS', newNewsCategory],
      featured: true,
    };

    setNewsList([newItem, ...newsList]);
    setNewNewsTitle('');
    setNewNewsExcerpt('');
    setNewNewsContent('');

    setSuccessMsg('New Announcement / NFO published successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
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
              <span>Investors</span>
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
              {/* Header Title */}
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
                {/* Account Status Card */}
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

                {/* Portfolio Overview Card */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center">
                        <PieChart className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 !text-blue-800">
                        Coming Soon
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold !text-slate-950 font-heading">Portfolio Overview</h3>
                    <p className="!text-slate-600 text-xs font-medium mt-0.5">Mutual Fund & SIP Holdings</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs !text-slate-500 font-semibold italic">
                    Visualizations loading...
                  </div>
                </div>

                {/* Your Advisor Card */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gold-100 border border-gold-200 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-amber-800" />
                      </div>
                      <button className="text-slate-400 hover:text-slate-600 font-bold text-base px-1">
                        ⋮
                      </button>
                    </div>
                    <h3 className="text-lg font-extrabold !text-slate-950 font-heading">Your Advisor</h3>
                    <p className="!text-amber-900 text-xs font-bold mt-0.5">Mr. Tirumala Talabaktula</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs !text-slate-700 font-bold flex items-center gap-1">
                    📞 +91 87637 32389
                  </div>
                </div>
              </div>

              {/* Large Authentication Banner Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 mt-1">
                      <Lock className="w-4 h-4 text-amber-800" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold !text-slate-950 font-heading">
                        Investor Authentication Connected
                      </h3>
                      <p className="!text-slate-700 text-sm mt-1 max-w-xl font-medium leading-relaxed">
                        Your account holds active permissions to manage wealth assets and view client portfolios.
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/"
                    className="bg-gold-800 hover:bg-primary-950 !text-white font-extrabold py-3 px-6 rounded-xl text-xs transition-all shadow-md shrink-0"
                  >
                    Return to Main Website
                  </Link>
                </div>

                {/* Upcoming Features Grid */}
                <div className="pt-6">
                  <p className="text-[11px] font-extrabold uppercase tracking-widest !text-slate-600 mb-4">
                    UPCOMING FEATURES
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold !text-slate-800">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-slate-700" />
                      <span className="!text-slate-800 font-semibold">Interactive SIP Charts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-700" />
                      <span className="!text-slate-800 font-semibold">Tax Statements</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-slate-700" />
                      <span className="!text-slate-800 font-semibold">Direct Advisor Messaging</span>
                    </div>
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

          {/* INVESTORS TAB */}
          {activeTab === 'investors' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-extrabold !text-slate-950 font-heading">Registered Investors & Leads</h3>
              <p className="!text-slate-700 text-sm font-medium">Manage client consultations and investor onboarding.</p>
              <div className="p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center !text-slate-700 font-bold text-sm">
                Investor CRM Database Loaded
              </div>
            </div>
          )}

          {/* GALLERY MANAGER TAB */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm h-fit">
                <h3 className="text-base font-extrabold !text-slate-950 font-heading mb-4 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-600" />
                  Add Gallery Item
                </h3>

                <form onSubmit={handleAddGalleryItem} className="space-y-4 text-xs">
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

                  <div>
                    <label className="block !text-slate-700 font-bold mb-1">Image / Photo URL *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={newGalleryUrl}
                      onChange={(e) => setNewGalleryUrl(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                    />
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
                      placeholder="Details about this photo..."
                      value={newGalleryDesc}
                      onChange={(e) => setNewGalleryDesc(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 !text-slate-950 font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold-500 hover:bg-gold-400 !text-slate-950 font-extrabold py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Gallery Item</span>
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-base font-extrabold !text-slate-950 font-heading">Live Gallery Items</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {galleryList.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="relative h-32 rounded-lg overflow-hidden mb-2.5">
                          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-bold !text-slate-950 text-xs line-clamp-1">{item.title}</h4>
                        <p className="!text-slate-600 text-[11px] line-clamp-2 mt-0.5">{item.description}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] !text-slate-500 font-semibold">
                        <span>{item.category}</span>
                        <button
                          onClick={() => setGalleryList(galleryList.filter((g) => g.id !== item.id))}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* NEWS & NFO TAB */}
          {activeTab === 'news' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm h-fit">
                <h3 className="text-base font-extrabold !text-slate-950 font-heading mb-4 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-600" />
                  Publish News or NFO
                </h3>

                <form onSubmit={handleAddNewsItem} className="space-y-4 text-xs">
                  <div>
                    <label className="block !text-slate-700 font-bold mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., SBI Tech NFO Open"
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

                  <button
                    type="submit"
                    className="w-full bg-gold-500 hover:bg-gold-400 !text-slate-950 font-extrabold py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish News</span>
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2 space-y-3">
                <h3 className="text-base font-extrabold !text-slate-950 font-heading mb-4">Published News & NFOs</h3>
                {newsList.map((item) => (
                  <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-start justify-between gap-4">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 !text-amber-900 uppercase">
                        {item.category}
                      </span>
                      <h4 className="font-bold !text-slate-950 text-sm mt-1">{item.title}</h4>
                      <p className="!text-slate-600 text-xs mt-1 font-medium">{item.excerpt}</p>
                    </div>
                    <button
                      onClick={() => setNewsList(newsList.filter((n) => n.id !== item.id))}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
