import type { Metadata } from 'next'
import React from 'react'
// import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
// import { draftMode } from 'next/headers'
import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { yekanbakh } from './fonts'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" className={`${yekanbakh.variable}`} dir="rtl" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          {/* <AdminBar
            adminBarProps={{
              // preview: isEnabled,
              preview: false,
            }}
          /> */}
          <LivePreviewListener />
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="mt-16 lg:mt-28 flex-1">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
// TODO: Register in X(twitter)
export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    title: 'بنیان فراورش پارسه',
    description:
      'ا یک شرکت دانش بنیان هستیم که در زمینه طراحی و ساخت سیستم های تصفیه آب، تصفیه سیالات معدنی و تصفیه آب خاکستری مبتنی بر غشاهای پلیمری، سرامیکی و روش های اکسیداسیون پیشرفته (AOP) فعالیت می کنیم.',
    // siteId: '1467726470533754880',
    // creator: '@amiraryan1996',
    // creatorId: '1467726470533754880',
    images: ['https://bfptec.ir/website-template-OG.webp'],
  },
  // Google search console url prefix verification
  verification: { google: 'r58d1rlg9oV4V9tIl0T2vsAEiPOpw-S_DoVobWWFUdU' },
  authors: [{ name: 'Amir Aryan', url: 'https://jsclimber.ir' }],
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  creator: 'Amir Aryan',
  publisher: 'Amir Aryan',
}
