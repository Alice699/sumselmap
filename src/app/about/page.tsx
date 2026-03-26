// src/app/about/page.tsx
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MapPin, Heart, Code2, Globe } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tentang SumselMap',
  description: 'Kenali lebih dekat proyek SumselMap — direktori bisnis dan wisata Sumatera Selatan.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-red-700 to-red-900 text-white py-20">
          <div className="container-app text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Palembang, Sumatera Selatan
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Tentang SumselMap
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Platform direktori yang dibangun untuk menghubungkan masyarakat dengan
              ribuan tempat menarik di Sumatera Selatan.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="container-app max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: <Heart className="w-6 h-6 text-red-600" />,
                  title: 'Misi',
                  desc: 'Membantu masyarakat Sumatera Selatan menemukan dan mendukung bisnis lokal serta mempromosikan potensi wisata daerah.',
                },
                {
                  icon: <Globe className="w-6 h-6 text-red-600" />,
                  title: 'Visi',
                  desc: 'Menjadi platform direktori terpercaya dan terlengkap untuk Sumatera Selatan yang berdampak nyata bagi ekosistem lokal.',
                },
                {
                  icon: <Code2 className="w-6 h-6 text-red-600" />,
                  title: 'Open Source',
                  desc: 'SumselMap dibangun secara terbuka. Siapa pun bisa berkontribusi, melaporkan bug, atau mengembangkan fitur baru bersama.',
                },
              ].map((item) => (
                <div key={item.title} className="card p-6 text-center">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-display font-semibold text-gray-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="card p-8">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Tech Stack</h2>
              <p className="text-gray-500 mb-6 text-sm">Teknologi modern yang digunakan dalam membangun SumselMap:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Next.js 14',    desc: 'App Router + SSR', emoji: '⚡' },
                  { name: 'TypeScript',    desc: 'Type Safety',       emoji: '🟦' },
                  { name: 'Tailwind CSS',  desc: 'Styling',           emoji: '🎨' },
                  { name: 'Prisma',        desc: 'ORM',               emoji: '🔷' },
                  { name: 'PostgreSQL',    desc: 'Database',          emoji: '🐘' },
                  { name: 'Leaflet.js',    desc: 'Interactive Maps',  emoji: '🗺️' },
                  { name: 'Vercel',        desc: 'Deployment',        emoji: '▲' },
                  { name: 'Neon',          desc: 'Serverless DB',     emoji: '⚗️' },
                ].map((tech) => (
                  <div key={tech.name} className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">{tech.emoji}</div>
                    <p className="font-semibold text-gray-800 text-sm">{tech.name}</p>
                    <p className="text-gray-400 text-xs">{tech.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
