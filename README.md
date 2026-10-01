# Tirumala Mutual Fund Services (TMFS)

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://www.prisma.io/)
[![AMFI Registered](https://img.shields.io/badge/AMFI-ARN--144270-d4af37)](https://www.amfiindia.com/)

**Tirumala Mutual Fund Services (TMFS)** is a premier financial advisory and mutual fund distribution platform based in Jeypore, Odisha. Founded by **Sri Tirumala Talabaktula** (AMFI-Registered Mutual Fund Distributor, **ARN-144270**), TMFS provides institutional-grade wealth stewardship, disciplined financial planning, and goal-oriented investment solutions.

- **Assets Under Management (AUM)**: ₹10+ Crore
- **Clientele**: 300+ Families
- **Experience**: 15+ Years in Mutual Fund Distribution & Financial Planning
- **Design Aesthetic**: Institutional Midnight Navy (`#061426`) with Luxury Gold (`#D4AF37`) accents and responsive dark/light theme support.

---

## 🌟 Current Website Features & State

### 1. 🏛️ Institutional Homepage (`/`)
- **Hero & Live AMFI Verification**: Midnight institutional aesthetic with live AMFI ARN-144270 accreditation badges.
- **Embedded Quick SIP Calculator**: Live interactive compounding simulator directly inside the hero section.
- **Key Metrics Strip**: Real-time display of core trust pillars (15+ Years Experience, ₹10+ Cr AUM, 300+ Families, 100% Transparency).
- **Statutory Compliance & Institutional Framework**: Dedicated showcase detailing regulatory adherence, AMFI registration, and client-centric distribution principles.
- **Empaneled AMCs & RTA Ecosystem**: Trusted partnerships with India's leading fund houses (HDFC, ICICI Prudential, SBI, Nippon India, Tata, Kotak, Axis, Bandhan) and operational interfaces with CAMS, KFintech, and MF Central.
- **Wealth Solutions Grid**: Clear overview of offerings across Equity Mutual Funds, Debt Funds, Hybrid Portfolios, ELSS Tax Saving, SWP, and STP.
- **Interactive FAQ Accordion**: Addresses common investor queries regarding mutual fund safety, direct vs. regular plans, and taxation.
- **Lead Booking & Consultation Banner**: High-conversion CTA banner prompting investors to *"Ready to Structure Your Financial Future?"*.

### 2. 👤 Know Your Advisor (`/knowyouradvisor` & `/about`)
- **Meet Sri Tirumala Talabaktula**: Detailed profile highlighting his advisory journey, fiduciary investment philosophy, and long-standing regional leadership in southern Odisha.
- **Core Advisory Disciplines**: In-depth breakdown of portfolio construction, goal-based asset allocation, and risk management strategies.
- **Consultation Call-to-Action**: Clear *"Start Your Wealth Journey"* module for scheduling confidential portfolio health checks.
- **Navigation Integration**: Linked directly in the main navigation bar under **"Advisor"** (`/knowyouradvisor`).

### 3. 🧮 Interactive Financial Calculators (`/calculators/*`)
Full suite of client-side financial forecasting tools featuring interactive sliders, Chart.js compounding curves, and downloadable PDF reports:
- **SIP Calculator (`/calculators/sip`)**: Projects future wealth gains based on monthly investment, time horizon, and expected annual return rate. Includes one-click PDF export via `jsPDF`.
- **Lumpsum Calculator (`/calculators/lumpsum`)**: Simulates one-time investment compounding over customizable durations.
- **Retirement Planner (`/calculators/retirement`)**: Computes required retirement corpus considering current expenses, inflation, and post-retirement life expectancy.
- **Education Planner (`/calculators/education`)**: Models future educational expenditure for children with course duration and inflation adjustments.
- **Goal Planner (`/calculators/goal`)**: Calculates the required monthly SIP needed to achieve a target financial corpus.

### 4. 📰 News, Market Insights & NFOs (`/news`, `/news/[slug]`)
- **Market News Feed**: Public directory of mutual fund market advisories, regulatory updates, and New Fund Offers (NFOs).
- **Dynamic Article Pages (`/news/[slug]`)**: Rich editorial articles with publication dates, categorized tags, and responsive **YouTube video explainer embeds**.
- **Admin-Managed**: Seamlessly updated via the Admin CMS with instant live publishing.

### 5. 🖼️ Investor Awareness & Event Gallery (`/gallery`)
- High-resolution photographic showcase documenting Investor Awareness Programs (IAP), client milestones, and office meetings.
- **Interactive Filtering**: Filter by categories (All, Events, Investor Awareness, Office).
- **Lightbox Viewer**: Responsive modal viewer for inspecting event details and full-size photography.

### 6. 💼 Investor / Client Portal (`/portal`)
- Dedicated dashboard for registered investors.
- Direct operational links to official AMC & RTA service portals: **CAMS**, **KFintech**, **MF Central**, **NSE NMF II**, and **BSE StAR MF**.
- Portfolio summary preview, SIP tracking cards, and direct advisory request triggers.

### 7. 🛡️ Admin CRM & Content Management System (`/admin`, `/login`)
Role-protected administrative command center accessible by authorized personnel (`ADMIN` and `ADVISOR` roles):
- **Lead Management CRM**:
  - Full incoming lead pipeline with real-time capture from website forms.
  - Search by client name, email, phone, or service inquiry.
  - Lifecycle status workflow: `NEW` ➔ `CONTACTED` ➔ `IN_PROGRESS` ➔ `CONVERTED` ➔ `CLOSED`.
  - Internal advisor notes system attached to individual leads.
  - One-click CSV export for external reporting and CRM synchronization.
- **News & NFO CMS Manager**:
  - Create, edit, and delete news articles and NFO announcements.
  - Attach banner images and embed YouTube video URLs with real-time video preview.
- **Gallery Manager**:
  - Add, caption, categorize, and remove event gallery photos.
- **Client Messaging & Broadcasts**:
  - Broadcast notification alerts and operational notices to the portal and site visitors.

### 8. 📍 Office Location & Quick Connect
- **Direct Navigation**: Integrated Google Maps directions to the Jeypore branch office.
- **Instant WhatsApp Link**: One-click direct chat via `+91 87637 32389`.
- **Contact Channels**: Dedicated landline (`06854-357410`), mobile, and email support.

---

## 🛠️ Technology Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** | Modern React server components, TurboPack dev server, edge caching |
| **Frontend Library** | **React 19** | Latest concurrent rendering and state primitives |
| **Language** | **TypeScript 5** | End-to-end static type safety |
| **Styling** | **Tailwind CSS v4** | Utility-first responsive styling with zero-runtime CSS |
| **Animations** | **Framer Motion 11** | Smooth scroll reveals, transitions, and micro-interactions |
| **Icons & Media** | **Lucide React & Swiper** | Clean vector iconography and mobile-friendly carousels |
| **Database & ORM** | **Prisma 7 & PostgreSQL** | Declarative schema, connection pooling (`@prisma/adapter-pg`) |
| **Data Persistence** | **JSON Fallback Layer** | Resilient filesystem data store (`data/leads.json`, `data/news.json`, `data/gallery.json`) |
| **Authentication** | **NextAuth.js v5 (Beta)** | Role-Based Access Control (`CUSTOMER`, `ADVISOR`, `ADMIN`), JWT/Jose session tokens |
| **Forms & Validation** | **React Hook Form & Zod** | Robust client-side validation and schema definitions |
| **Charts & Reporting**| **Chart.js, react-chartjs-2, jsPDF** | Visual compounding curves and client PDF generation |
| **Email & Comms** | **Resend & Nodemailer** | Transactional lead notifications and consultation confirmations |
| **Caching** | **Upstash Redis** | Session and rate-limiting support |

---

## 📂 Project Architecture

```
TMFS/
├── data/                         # Local persistence layer (leads, news, gallery JSON)
│   ├── gallery.json
│   ├── leads.json
│   └── news.json
├── prisma/                       # Database schema & migrations
│   └── schema.prisma             # User, Account, Lead, LeadNote definitions
├── public/                       # Static public assets
│   ├── images/                   # Director portrait, logos, AMC marks
│   └── favicon.ico
├── src/
│   ├── app/                      # Next.js App Router routes & pages
│   │   ├── about/                # Institutional About page
│   │   ├── admin/                # Role-gated Admin CMS & CRM Dashboard
│   │   ├── advisor/              # Advisor Console verification view
│   │   ├── api/                  # API route handlers
│   │   │   ├── auth/             # NextAuth authentication endpoints
│   │   │   ├── broadcast/        # Messaging broadcast API
│   │   │   ├── cms/              # CMS news & gallery CRUD endpoints
│   │   │   ├── leads/            # Lead submission & CRM status management
│   │   │   └── upload/           # Media upload handlers
│   │   ├── calculators/          # Financial calculators suite
│   │   │   ├── education/        # Education Planning calculator
│   │   │   ├── goal/             # Goal Planning calculator
│   │   │   ├── lumpsum/          # Lumpsum compounding calculator
│   │   │   ├── retirement/       # Retirement Planning calculator
│   │   │   └── sip/              # SIP Calculator with Chart.js & PDF export
│   │   ├── contact/              # Contact page
│   │   ├── faq/                  # Standalone FAQ page
│   │   ├── gallery/              # Public Event & Seminar gallery
│   │   ├── knowyouradvisor/      # "Know Your Advisor" public profile
│   │   ├── login/                # Authentication page (Google & Credentials)
│   │   ├── news/                 # News & NFO listings
│   │   │   └── [slug]/           # Dynamic news detail pages with YouTube embed
│   │   ├── portal/               # Investor portal with AMC/RTA integrations
│   │   ├── layout.tsx            # Global Root Layout with dark mode provider
│   │   └── page.tsx              # Institutional Homepage
│   ├── components/               # Modular UI component library
│   │   ├── admin/                # Admin panels (Leads, News, Gallery, Alerts)
│   │   ├── common/               # Shared modals, cards, badges
│   │   ├── layout/               # TopBar, Navbar, Footer, PublicSiteShell
│   │   ├── sections/             # InstitutionalHome, Hero, Services, FAQ, etc.
│   │   └── ui/                   # Reusable base elements (Button, Input, Form)
│   └── lib/                      # Core constants, schemas, and helper utilities
│       ├── constants.ts          # Business info, AMFI ARN, contact, navigation
│       ├── prisma.ts             # Prisma client singleton
│       └── utils.ts              # Currency formatting, cn helper
├── .env.example                  # Environment variable blueprint
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: `v18.18+` or `v20+`
- **npm** (or `pnpm` / `yarn`)
- **PostgreSQL Database** (Optional for local testing; the app includes fallback JSON storage in `data/`)

### 1. Clone the repository
```bash
git clone <repository-url>
cd TMFS
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory by copying `.env.example`:
```bash
cp .env.example .env
```
Fill in the necessary values:
```env
# Database (Neon / PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/tmfs"

# Auth.js / NextAuth
AUTH_SECRET="your-32-char-random-secret"
AUTH_GOOGLE_ID="your-google-oauth-client-id"
AUTH_GOOGLE_SECRET="your-google-oauth-client-secret"
ADMIN_EMAILS="tiru.jeypore@gmail.com,deeksha.jeypore@gmail.com"

# Site URLs
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_NUMBER="918763732389"
```

### 4. Initialize Prisma client
```bash
npx prisma generate
```
*(If connecting to a live PostgreSQL instance, apply the schema with `npx prisma db push`)*.

### 5. Start the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 📦 Build & Production

To verify the production build:
```bash
npm run build
npm run start
```

### Deploying on Vercel
1. Push your latest code to your Git provider (GitHub / GitLab / Bitbucket).
2. Import the project in the [Vercel Dashboard](https://vercel.com).
3. Under **Project Settings ➔ Environment Variables**, populate the production variables from your `.env`.
4. Deploy. Vercel automatically runs `prisma generate` during `prebuild` and provisions edge network caching.

---

## 🏛️ Statutory Compliance & Disclaimer

- **Registration**: AMFI-Registered Mutual Fund Distributor
- **ARN Number**: **ARN-144270**
- **Regulatory Framework**: Operates in accordance with the regulatory code of conduct established by SEBI and AMFI.
- **Statutory Notice**: Mutual Fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. Past performance is not indicative of future returns.

---

## 📞 Contact Information

| Channel | Details |
| :--- | :--- |
| **Principal Advisor** | Sri Tirumala Talabaktula |
| **AMFI Registration** | ARN-144270 |
| **Mobile & WhatsApp** | [+91 87637 32389](https://wa.me/918763732389) |
| **Landline** | 06854-357410 |
| **Email** | tiru.jeypore@gmail.com |
| **Office Address** | MR Towers, Flat No. 105, Indira Chowk, Jeypore, Odisha – 764001 |

| **Working Hours** | Monday – Saturday: 9:30 AM – 6:00 PM (Sunday Closed) |

