# Tirumala Mutual Fund Services (TMFS)

This is the repository for the **Tirumala Mutual Fund Services** web platform. It is a premium, high-performance financial advisory web application built using **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT & Jose
- **Forms & Validation**: React Hook Form, Zod
- **Email**: Nodemailer
- **Charts**: Chart.js / React-ChartJS-2

## 🗓️ Development Phases

The project is structured in a phased, milestone-based approach to ensure quality, testing, and continuous delivery.

### Phase 1: Core Foundation & UI ✅ (Current Phase)
- Initialize Next.js 15, TypeScript, Tailwind v4
- Setup global constants, typography, and styling (Luxury Dark Blue & Gold theme)
- Build core layout components (`TopBar`, `Navbar`, `Footer`)
- Develop Homepage sections (Hero, Stats, Services, Testimonials, CTA, Lead Form)
- Develop the "About Us" page structure
- Set up SEO, JSON-LD Schema, and PWA configuration
- Create basic API routing for lead capture

### Phase 2: Calculators & Core Content (Upcoming)
- Implement Financial Calculators (SIP, Lumpsum, Retirement, Education, Goal)
- Build dynamic Service details pages
- Implement responsive data visualizations with Chart.js
- Finalize legal pages (Privacy Policy, Terms, Disclaimer)

### Phase 3: Backend & Database Integration
- Connect MongoDB Atlas
- Finalize Mongoose models (`User`, `Lead`, `Post`, `Gallery`)
- Secure API endpoints using custom JWT authentication
- Implement Nodemailer for automated lead notifications

### Phase 4: Admin Dashboard & CRM
- Build the secure Admin panel layout
- Implement Lead Management CRM (view, edit, export leads)
- Build Content Management System (CMS) for Blog & News
- Add Analytics Dashboard for traffic and lead conversions

### Phase 5: Final Optimization & Deployment
- Comprehensive testing (Lighthouse, Cross-browser, Mobile)
- Performance and SEO optimization
- Final deployment to Vercel

---

## 🛠️ Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd TMFS
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Copy the `.env.example` file to `.env` and fill in your credentials.
   ```bash
   cp .env.example .env
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 🌍 Deployment

This project is optimized for deployment on **Vercel**.

1. Push your code to a Git provider (GitHub, GitLab, or Bitbucket).
2. Import the repository into your Vercel dashboard.
3. Configure the Environment Variables in the Vercel project settings matching your `.env` file.
4. Deploy! Vercel will automatically build and host the application, providing edge caching and image optimization out of the box.

---

## 📞 Contact Information

- **Phone**: +91 87637 32389
- **Email**: tiru.jeypore@gmail.com
- **Address**: MR Towers, Flat No. 105, Indira Chowk, Jeypore, Odisha – 764001 (18°51'10.4"N 82°34'40.6"E)
- **ARN**: ARN-144270 (AMFI Registered Mutual Fund Distributor)
