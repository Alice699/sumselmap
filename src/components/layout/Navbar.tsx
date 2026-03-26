// src/components/layout/Navbar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MapPin, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Beranda',  href: '/' },
  { label: 'Jelajahi', href: '/explore' },
  { label: 'Tentang',  href: '/about' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container-app flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl">
          <MapPin className="w-5 h-5 text-red-600" />
          Sumsel<span className="text-red-600">Map</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-red-600'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/explore" className="btn-primary text-sm py-2 px-4">
            Mulai Eksplorasi
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="container-app py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'text-sm font-medium py-2',
                  pathname === link.href ? 'text-red-600' : 'text-gray-700'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/explore" className="btn-primary text-sm text-center" onClick={() => setOpen(false)}>
              Mulai Eksplorasi
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
