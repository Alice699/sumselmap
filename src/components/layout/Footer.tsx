// src/components/layout/Footer.tsx
import Link from 'next/link'
import { MapPin, Twitter, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl text-white mb-3">
              <MapPin className="w-5 h-5 text-red-500" />
              Sumsel<span className="text-red-500">Map</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Direktori bisnis dan wisata terlengkap untuk Sumatera Selatan. Dibuat dengan cinta dari Palembang 🇮🇩
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Beranda',     href: '/' },
                { label: 'Jelajahi',    href: '/explore' },
                { label: 'Tentang',     href: '/about' },
                { label: 'Daftar Bisnis', href: '/daftar-bisnis' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-white font-semibold mb-4">Kontak</h4>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/_AliceNotFound"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://github.com/Alice699"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Github className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-center">
          © {new Date().getFullYear()} SumselMap — Dibuat oleh{' '}
          <a href="https://github.com/Alice699" className="text-red-400 hover:underline">
            Alice699
          </a>
        </div>
      </div>
    </footer>
  )
}
