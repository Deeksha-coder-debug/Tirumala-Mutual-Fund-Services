// ============================================
// TMFS Mock CMS Data 
// Simulates a Headless CMS (Sanity/Strapi) structure
// ============================================

export type ContentStatus = 'published' | 'draft' | 'scheduled' | 'expired';

export interface GalleryItem {
  id: string;
  slug: string;
  title: string;
  category: 'Events' | 'Seminars' | 'Client Meets' | 'Awards' | 'Certificates' | 'Office' | 'Media' | 'Videos' | 'Posters' | 'Documents';
  type: 'image' | 'video' | 'album' | 'document';
  status: ContentStatus;
  publishDate: string;
  location?: string;
  metrics?: string; // e.g., "250+ Participants"
  imageUrl?: string;
  videoUrl?: string; // MP4 or external video
  youtubeUrl?: string; // YouTube watch or share URL
  pdfUrl?: string; // Uploaded PDF document URL
  pdfName?: string; // PDF display name / label
  description?: string;
  featured?: boolean;
  downloadable?: boolean;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: 'News' | 'NFO' | 'IPO' | 'Market Updates' | 'Investor Education' | 'Tax Updates' | 'SEBI Circulars' | 'Blogs';
  status: ContentStatus;
  publishDate: string;
  author: string;
  readingTime: number; // in minutes
  excerpt: string;
  content: string; // HTML or Markdown string (using HTML for simplicity here)
  tags: string[];
  imageUrl?: string;
  videoUrl?: string;
  youtubeUrl?: string;
  featured?: boolean;
  
  // Specific to NFO / IPO
  launchDate?: string;
  closeDate?: string;
  riskLevel?: 'Low' | 'Moderate' | 'High' | 'Very High';
  fundCategory?: string; // e.g., "Small Cap Fund"
  issueSize?: string;
  priceBand?: string;
  gmp?: string; // Grey Market Premium
  listingDate?: string;

  // Documents
  pdfUrl?: string; // Primary attached PDF document (e.g. SID, KIM, brochure)
  pdfName?: string; // Document label
  documents?: {
    label: string; // e.g., "SID", "KIM", "Factsheet"
    url: string;
  }[];
}

// MOCK DATA: GALLERY
export const CMS_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    slug: 'investor-awareness-jeypore-2026',
    title: 'Financial Literacy & Investor Awareness Program',
    category: 'Seminars',
    type: 'album',
    status: 'published',
    publishDate: '2026-02-15T10:00:00Z',
    location: 'Jeypore Town Hall, Odisha',
    metrics: '250+ Investors Attended',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop',
    description: 'A comprehensive session covering the basics of mutual funds, SIPs, and long-term wealth creation. Speakers included top fund managers and our MD, Mr. Tirumala Talabaktula.',
    featured: true,
    downloadable: true,
  },
  {
    id: 'g2',
    slug: 'best-distributor-award-2025',
    title: 'Best Mutual Fund Distributor - East Zone',
    category: 'Awards',
    type: 'image',
    status: 'published',
    publishDate: '2025-11-20T10:00:00Z',
    location: 'Mumbai',
    imageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=1000&auto=format&fit=crop',
    description: 'Recognized for outstanding AUM growth and investor education initiatives.',
    featured: true,
    downloadable: false,
  },
  {
    id: 'g3',
    slug: 'amfi-registration-certificate',
    title: 'AMFI Registration Certificate (ARN-144270)',
    category: 'Certificates',
    type: 'image',
    status: 'published',
    publishDate: '2011-01-01T10:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1000&auto=format&fit=crop',
    description: 'Official AMFI Registration Certificate confirming our status as a certified Mutual Fund Distributor.',
    downloadable: true,
  },
  {
    id: 'g4',
    slug: 'market-outlook-q1-2026',
    title: 'Q1 2026 Market Outlook Session',
    category: 'Videos',
    type: 'video',
    status: 'published',
    publishDate: '2026-01-10T10:00:00Z',
    location: 'TMFS Office / YouTube Live',
    metrics: '15 min watch',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Mock video link
    description: 'Analyzing the upcoming budget and strategic portfolio alignments for 2026.',
    downloadable: false,
  },
  {
    id: 'g5',
    slug: 'client-meet-and-greet-2025',
    title: 'Annual Client Meet & Greet',
    category: 'Client Meets',
    type: 'image',
    status: 'published',
    publishDate: '2025-12-15T10:00:00Z',
    location: 'Mayfair, Bhubaneswar',
    metrics: '100+ HNI Clients',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop',
    description: 'Celebrating a successful year of wealth creation with our premium clients.',
    downloadable: true,
  }
];

// MOCK DATA: NEWS & NFO
export const CMS_NEWS: NewsItem[] = [
  {
    id: 'n1',
    slug: 'sbi-innovative-opportunities-fund-nfo',
    title: 'SBI Innovative Opportunities Fund',
    category: 'NFO',
    status: 'published',
    publishDate: '2026-07-01T08:00:00Z',
    author: 'TMFS Research Team',
    readingTime: 4,
    excerpt: 'A new thematic fund targeting companies leading in innovation and technological disruption.',
    content: '<p>The SBI Innovative Opportunities Fund aims to generate long-term capital appreciation by investing in equity and equity-related securities of companies that seek to benefit from adoption of innovative strategies.</p><h3>Why Invest?</h3><ul><li>Exposure to disruptive technologies</li><li>Potential for high growth</li><li>Diversification across sectors</li></ul><p>Consult with our advisors to see if this aligns with your risk profile.</p>',
    tags: ['Equity', 'Thematic', 'High Risk', 'SBI Mutual Fund'],
    featured: true,
    launchDate: '2026-07-10T00:00:00Z',
    // Mock a closing date that is a few days in the future for the countdown
    closeDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), 
    riskLevel: 'Very High',
    fundCategory: 'Thematic - Innovation',
    documents: [
      { label: 'Scheme Information Document (SID)', url: '#' },
      { label: 'Key Information Memorandum (KIM)', url: '#' },
      { label: 'Factsheet', url: '#' },
    ]
  },
  {
    id: 'n2',
    slug: 'bajaj-housing-finance-ipo',
    title: 'Bajaj Housing Finance IPO Analysis',
    category: 'IPO',
    status: 'published',
    publishDate: '2026-06-25T08:00:00Z',
    author: 'Tirumala Talabaktula',
    readingTime: 6,
    excerpt: 'Detailed analysis of the highly anticipated Bajaj Housing Finance IPO. Should you subscribe?',
    content: '<p>Bajaj Housing Finance is launching its maiden IPO to raise ₹6,560 crore. As a non-deposit-taking HFC, it boasts strong asset quality and backing from the Bajaj Group.</p><h3>Strengths</h3><ul><li>Strong parentage</li><li>Robust AUM growth</li><li>Low NPAs</li></ul><p><strong>Recommendation:</strong> Subscribe for listing gains and long-term holding.</p>',
    tags: ['IPO', 'Housing Finance', 'Bajaj Group'],
    featured: true,
    launchDate: '2026-07-05T00:00:00Z',
    closeDate: '2026-07-07T00:00:00Z',
    listingDate: '2026-07-12T00:00:00Z',
    issueSize: '₹6,560 Cr',
    priceBand: '₹66 - ₹70',
    gmp: '+ ₹45 (Expected)',
    documents: [
      { label: 'Red Herring Prospectus (RHP)', url: '#' },
    ]
  },
  {
    id: 'n3',
    slug: 'understanding-new-capital-gains-tax',
    title: 'Understanding the New Capital Gains Tax Rules 2026',
    category: 'Tax Updates',
    status: 'published',
    publishDate: '2026-04-10T08:00:00Z',
    author: 'TMFS Advisory',
    readingTime: 5,
    excerpt: 'A complete breakdown of the latest changes to Long Term Capital Gains (LTCG) and Short Term Capital Gains (STCG) on mutual funds.',
    content: '<p>The recent budget has introduced significant changes to how mutual funds are taxed. Here is what you need to know:</p><h3>Equity Funds</h3><p>STCG is now taxed at 20% (up from 15%). LTCG remains at 12.5% but the exemption limit has increased to ₹1.25 Lakh.</p><h3>Debt Funds</h3><p>Debt funds continue to be taxed at your marginal income tax slab rate.</p>',
    tags: ['Taxation', 'Budget 2026', 'LTCG', 'STCG'],
    featured: false,
  },
  {
    id: 'n4',
    slug: 'power-of-compounding-early-start',
    title: 'The Magic of Compounding: Why Starting Early Matters',
    category: 'Investor Education',
    status: 'published',
    publishDate: '2026-03-22T08:00:00Z',
    author: 'Tirumala Talabaktula',
    readingTime: 3,
    excerpt: 'Learn how starting your SIP just 5 years earlier can double your retirement corpus.',
    content: '<p>Albert Einstein famously called compound interest the eighth wonder of the world. In mutual funds, time in the market is vastly more important than timing the market.</p><p>Consider this: An investor starting a ₹5,000 SIP at age 25 will accumulate significantly more by age 60 than someone starting a ₹10,000 SIP at age 35, assuming the same 12% return.</p>',
    tags: ['SIP', 'Compounding', 'Beginners', 'Wealth Creation'],
    featured: false,
  },
  {
    id: 'n5',
    slug: 'sebi-new-guidelines-multicap',
    title: 'SEBI Modifies Asset Allocation Rules for Multi-Cap Funds',
    category: 'SEBI Circulars',
    status: 'published',
    publishDate: '2026-05-18T08:00:00Z',
    author: 'TMFS Compliance',
    readingTime: 2,
    excerpt: 'SEBI has updated the minimum allocation limits across Large, Mid, and Small cap stocks for Multi-Cap mutual funds.',
    content: '<p>To ensure true-to-label categorization, SEBI has mandated that all multi-cap funds must maintain a minimum of 25% allocation each in Large-cap, Mid-cap, and Small-cap stocks at all times.</p>',
    tags: ['SEBI', 'Compliance', 'Multi-Cap'],
    featured: false,
  }
];
