import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tirumalamutualfunds.in'),
  title: {
    default: 'Tirumala Mutual Fund Services | AMFI Registered Mutual Fund Distributor | Jeypore, Odisha',
    template: '%s | Tirumala Mutual Fund Services',
  },
  description: 'Tirumala Mutual Fund Services (ARN-144270) — AMFI Registered Mutual Fund Distributor in Jeypore, Odisha. 15+ years of experience in SIP, Mutual Funds, ELSS, Retirement Planning, and Wealth Creation. Start your investment journey today.',
  keywords: [
    'Mutual Fund Distributor Jeypore', 'AMFI Registered', 'ARN-144270',
    'SIP Investment', 'Mutual Funds', 'ELSS Tax Saving', 'Retirement Planning',
    'Financial Planning Odisha', 'Wealth Management', 'Tirumala Mutual Fund Services',
    'Investment Advisor Jeypore', 'Goal Based Investing',
  ],
  authors: [{ name: 'Tirumala Mutual Fund Services' }],
  creator: 'Tirumala Mutual Fund Services',
  publisher: 'Tirumala Mutual Fund Services',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://tirumalamutualfunds.in',
    siteName: 'Tirumala Mutual Fund Services',
    title: 'Tirumala Mutual Fund Services | Building Wealth. Creating Financial Freedom.',
    description: 'AMFI Registered Mutual Fund Distributor (ARN-144270) with 15+ years experience. SIP, Mutual Funds, ELSS, Retirement Planning & more in Jeypore, Odisha.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Tirumala Mutual Fund Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tirumala Mutual Fund Services',
    description: 'AMFI Registered Mutual Fund Distributor (ARN-144270). 15+ years of trusted financial guidance in Jeypore, Odisha.',
  },
  alternates: { canonical: 'https://tirumalamutualfunds.in' },
  other: {
    'google-site-verification': 'your-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0b1f3a' },
    { media: '(prefers-color-scheme: dark)', color: '#061426' },
  ],
};

// JSON-LD Structured Data
function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Tirumala Mutual Fund Services',
    description: 'AMFI Registered Mutual Fund Distributor providing SIP, Mutual Funds, ELSS, Retirement Planning and comprehensive wealth management services.',
    url: 'https://tirumalamutualfunds.in',
    logo: 'https://tirumalamutualfunds.in/images/logo.jpeg',
    image: 'https://tirumalamutualfunds.in/images/logo.jpeg',
    telephone: ['+918763732389', '+916854357410'],
    email: 'tiru.jeypore@gmail.com',
    foundingDate: '2011',
    founder: {
      '@type': 'Person',
      name: 'Mr. Tirumala Talabaktula',
      jobTitle: 'Managing Director',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'MR Towers, Flat No. 105, Indira Chowk',
      addressLocality: 'Jeypore',
      addressRegion: 'Odisha',
      postalCode: '764001',
      addressCountry: 'IN',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:30',
      closes: '18:00',
    },
    sameAs: [
      'https://www.facebook.com/tirumala.mutual.funds',
      'https://www.instagram.com/tirumala.mutual.funds',
    ],
    areaServed: {
      '@type': 'City',
      name: 'Jeypore',
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'AMFI Registration',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Association of Mutual Funds in India (AMFI)',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

import { Providers } from '@/components/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <JsonLd />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Manrope:wght@400;500;600;700;800&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logo.jpeg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {/* Skip Navigation for Accessibility */}
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
