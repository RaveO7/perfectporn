// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from 'next/font/google'

import './globals.css'

import Header from '../components/Header'
import MoreEighteen from '@/components/MoreEighteen'
import ModalPub from '@/components/ModalPub';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

import { normalizeUrl } from '@/components/Utils'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.Site_URL as string),
  title: {
    absolute: '',
    default: 'Perfect Porn | The site for fulfilling your Fantasies.',
    template: '%s | Perfect Porn'
  },
  keywords: ['PerfectPorn', 'Perfect Porn', 'Watch Porn', 'Watch Free Porn', 'free porn', 'Free Porn Videos', 'free', 'more eighteen', 'sexe', 'videos sexe', 'porno videos', 'porno video', 'porno', 'pornographie', 'pornographique', 'xxx', 'perfectporn', 'perfect porn'],
  description: 'Explore diverse and high-quality content at Perfect Porn. Your ultimate destination for fulfilling fantasies.',
  applicationName: 'Perfectporn',
  authors: [{ name: "Phoenix", url: normalizeUrl(process.env.Site_URL || '') }],
  publisher: 'Phoenix',
  alternates: { canonical: normalizeUrl(process.env.Site_URL || '') },
  robots: 'max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  verification: { google: "iEbYUqh_jKgVnifPqHYfD2o2pFxUBhWVHjyFuwtl864" },
  openGraph: {
    title: "Perfect Porn - Best Free HD Porn Videos",
    description: "Perfect Porn - The best porn site with all your dream videos. Watch free HD adult content including channels, pornstars, and categories.",
    url: normalizeUrl(process.env.Site_URL || ''),
    siteName: "Perfect Porn",
    locale: "en_US",
    type: "website",
    images: [{
      url: '/opengraph-image.png',
      alt: 'Image of Perfect Porn the site for fulfilling your Fantasies.',
      width: 1200,
      height: 630,
      type: "image/png"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perfect Porn - Best Free HD Porn Videos",
    description: "Perfect Porn - The best porn site with all your dream videos. Watch free HD adult content.",
    images: ['/opengraph-image.png'],
  },
  other: {
    "admaven-placement": "Bqjw7pdY4",
    "6a97888e-site-verification": "07bc72bd8d75f7e97c8be4156fee565a",
  }
}

export const viewport: Viewport = {
  themeColor: 'black',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Next gère automatiquement les meta tags via `export const metadata` */}
      </head>

      <body className={inter.className} suppressHydrationWarning={true}>
        {/* Analytics/components React dans le body — OK */}
        <GoogleAnalytics gaId="G-BCSQYEJTZZ" />
        <SpeedInsights />
        <Analytics />

        <MoreEighteen />
        {/* <ModalPub /> */}

        <main className="flex min-h-screen flex-col items-center">
          <Header />
          <section className="w-full mt-[72px] py-6 lg:px-12 min-h-[calc(100vh-92px)] ">
            {children}
          </section>
          <Footer />
        </main>

        <script data-cfasync="false" src="//dcbbwymp1bhlf.cloudfront.net/?wbbcd=1238383"></script>
      </body>
    </html>
  )
}
