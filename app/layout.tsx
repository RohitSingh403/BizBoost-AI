import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BizBoost AI - AI-Powered Social Media Content Generator',
  description: 'Create engaging social media content for your business with AI. Generate captions, hashtags, and post ideas in seconds.',
  keywords: 'AI, social media, content generator, business, marketing, Instagram, LinkedIn, Facebook',
  authors: [{ name: 'BizBoost AI' }],
  creator: 'BizBoost AI',
  publisher: 'BizBoost AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bizboost-ai.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'BizBoost AI - AI-Powered Social Media Content Generator',
    description: 'Create engaging social media content for your business with AI. Generate captions, hashtags, and post ideas in seconds.',
    url: 'https://bizboost-ai.vercel.app',
    siteName: 'BizBoost AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BizBoost AI - AI-Powered Social Media Content Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BizBoost AI - AI-Powered Social Media Content Generator',
    description: 'Create engaging social media content for your business with AI. Generate captions, hashtags, and post ideas in seconds.',
    images: ['/og-image.jpg'],
    creator: '@bizboostai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}