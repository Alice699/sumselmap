// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
})

export const metadata: Metadata = {
  title: {
    default: 'SumselMap — Direktori Bisnis & Wisata Sumatera Selatan',
    template: '%s | SumselMap',
  },
  description:
    'Temukan tempat wisata, kuliner, penginapan, dan bisnis terbaik di Sumatera Selatan. Direktori lengkap berbasis peta interaktif.',
  keywords: [
    'Sumatera Selatan',
    'Palembang',
    'wisata Palembang',
    'kuliner Palembang',
    'pempek',
    'direktori bisnis Sumsel',
    'SumselMap',
  ],
  openGraph: {
    title: 'SumselMap — Direktori Bisnis & Wisata Sumatera Selatan',
    description: 'Temukan tempat terbaik di Sumatera Selatan.',
    url: 'https://sumselmap.id',
    siteName: 'SumselMap',
    locale: 'id_ID',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  )
}
