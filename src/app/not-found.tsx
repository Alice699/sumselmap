// src/app/not-found.tsx
import Link from 'next/link'
import { MapPin } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-6">🗺️</div>
      <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">404 — Halaman Tidak Ditemukan</h1>
      <p className="text-gray-500 text-lg mb-8 max-w-md">
        Sepertinya peta tidak bisa menemukan halaman yang kamu cari. Kembali ke jalan yang benar!
      </p>
      <Link href="/" className="btn-primary px-8 py-3">
        <MapPin className="w-4 h-4" />
        Kembali ke Beranda
      </Link>
    </div>
  )
}
