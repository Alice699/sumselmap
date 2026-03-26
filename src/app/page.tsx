// src/app/page.tsx
import Link from 'next/link'
import { MapPin, Search, Star, TrendingUp, Coffee, Hotel, ShoppingBag, Landmark, Theater } from 'lucide-react'

const CATEGORIES = [
  { name: 'Wisata',     slug: 'wisata',     icon: Landmark,  color: 'bg-blue-100 text-blue-700',   count: 0 },
  { name: 'Kuliner',    slug: 'kuliner',    icon: Coffee,    color: 'bg-red-100 text-red-700',     count: 0 },
  { name: 'Penginapan', slug: 'penginapan', icon: Hotel,     color: 'bg-purple-100 text-purple-700', count: 0 },
  { name: 'Belanja',    slug: 'belanja',    icon: ShoppingBag, color: 'bg-amber-100 text-amber-700', count: 0 },
  { name: 'Budaya',     slug: 'budaya',     icon: Theater,   color: 'bg-green-100 text-green-700', count: 0 },
]

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container-app flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <MapPin className="w-5 h-5 text-red-600" />
            <span>Sumsel<span className="text-red-600">Map</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/explore" className="hover:text-gray-900 transition-colors">Jelajahi</Link>
            <Link href="/about" className="hover:text-gray-900 transition-colors">Tentang</Link>
          </div>
          <Link href="/explore" className="btn-primary text-sm py-2 px-4">
            Mulai Eksplorasi
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-red-800">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
        </div>

        <div className="container-app relative text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Direktori #1 Sumatera Selatan
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Temukan Semua di <br />
            <span className="text-yellow-300">Sumatera Selatan</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Jelajahi ribuan tempat wisata, kuliner, penginapan, dan bisnis
            di Sumatera Selatan. Lengkap dengan peta interaktif.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 bg-white rounded-2xl p-2 shadow-2xl">
              <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Cari tempat, kuliner, wisata..."
                className="flex-1 text-gray-800 placeholder-gray-400 outline-none text-base py-2"
              />
              <Link href="/explore" className="btn-primary shrink-0">
                Cari Sekarang
              </Link>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-8 mt-12 text-white/70 text-sm">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-yellow-300" />
              <span><strong className="text-white">500+</strong> Tempat</span>
            </div>
            <div className="w-px h-4 bg-white/30" />
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-300" />
              <span><strong className="text-white">1.200+</strong> Ulasan</span>
            </div>
            <div className="w-px h-4 bg-white/30" />
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-yellow-300" />
              <span><strong className="text-white">8</strong> Kota</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container-app">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Jelajahi Berdasarkan Kategori
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Temukan apa yang kamu cari dengan mudah
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.slug}
                  href={`/explore?category=${cat.slug}`}
                  className="card p-6 text-center hover:-translate-y-1 transition-transform duration-200 group cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold text-gray-800">{cat.name}</h3>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container-app text-center">
          <h2 className="font-display text-4xl font-bold mb-4">
            Punya bisnis di Sumatera Selatan?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Daftarkan bisnis kamu secara gratis dan jangkau lebih banyak pelanggan di Sumatera Selatan.
          </p>
          <Link href="/daftar-bisnis" className="btn-primary text-base px-8 py-3">
            Daftarkan Bisnis Gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-100">
        <div className="container-app flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2 font-display font-bold text-gray-900">
            <MapPin className="w-4 h-4 text-red-600" />
            SumselMap
          </div>
          <p>© {new Date().getFullYear()} SumselMap. Dibuat dengan ❤️ dari Palembang.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-gray-900 transition-colors">Tentang</Link>
            <Link href="/contact" className="hover:text-gray-900 transition-colors">Kontak</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
