import type { Metadata, Viewport } from 'next';
import { Amiri, Cormorant_Garamond, Source_Sans_3 } from 'next/font/google';
import { PostHogProvider } from '@/components/providers/PostHogProvider';
import './globals.css';

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-source-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0A0F1A',
};

export const metadata: Metadata = {
  title: 'Quran Revelation Map — Journey Through Time and Geography',
  description:
    'Experience the chronological revelation of the Quran as an interactive journey across the Arabian Peninsula from 610 to 632 CE. Explore where and when each surah was revealed.',
  keywords: [
    'Quran',
    'Revelation',
    'Map',
    'Interactive',
    'Makkah',
    'Madinah',
    'Islamic History',
    'Chronological',
    'Surahs',
  ],
  authors: [{ name: 'Quran Revelation Map' }],
  openGraph: {
    title: 'Quran Revelation Map',
    description:
      'Experience the chronological revelation of the Quran as an interactive journey across geography and time.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quran Revelation Map',
    description:
      'Experience the chronological revelation of the Quran as an interactive journey across geography and time.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${amiri.variable} ${cormorantGaramond.variable} ${sourceSans.variable} font-sans antialiased`}
      >
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
