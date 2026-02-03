import React from "react"
import type { Metadata } from 'next'
import { Noto_Sans_JP, Zen_Kaku_Gothic_New } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _notoSansJP = Noto_Sans_JP({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-jp"
});

const _zenKaku = Zen_Kaku_Gothic_New({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-zen-kaku"
});

export const metadata: Metadata = {
  title: 'さらば青春の光 | Official Fan Site',
  description: '人気お笑いコンビ「さらば青春の光」のファンサイト。最新情報、ライブ情報、メンバー紹介など。',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${_notoSansJP.variable} ${_zenKaku.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
