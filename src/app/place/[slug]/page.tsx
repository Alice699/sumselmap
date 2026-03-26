// src/app/place/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Clock, Phone, Globe, Instagram, Star, ArrowLeft, CheckCircle } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { formatRating } from '@/lib/utils'

interface PlacePageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PlacePageProps) {
  const place = await prisma.place.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  })
  if (!place) return {}
  return {
    title: place.name,
    description: place.description,
  }
}

export default async function PlacePage({ params }: PlacePageProps) {
  const place = await prisma.place.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      tags: true,
      reviews: { orderBy: { createdAt: 'desc' }, take: 5 },
    },
  })

  if (!place) notFound()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Hero image area */}
        <div className="h-72 md:h-96 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          {place.images[0] ? (
            <img src={place.images[0]} alt={place.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl">
              {place.category.icon}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Back button */}
          <div className="absolute top-6 left-6">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Link>
          </div>

          {/* Badges */}
          <div className="absolute top-6 right-6 flex gap-2">
            {place.isVerified && (
              <span className="flex items-center gap-1 bg-green-500 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                <CheckCircle className="w-3 h-3" /> Terverifikasi
              </span>
            )}
          </div>
        </div>

        <div className="container-app py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge bg-red-100 text-red-700">
                    {place.category.icon} {place.category.name}
                  </span>
                  {place.isFeatured && (
                    <span className="badge bg-yellow-100 text-yellow-700">⭐ Unggulan</span>
                  )}
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {place.name}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-gray-800">{formatRating(place.rating)}</span>
                    <span className="text-gray-400 text-sm">({place.totalReviews} ulasan)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    {place.city}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">Tentang Tempat Ini</h2>
                <p className="text-gray-600 leading-relaxed">{place.description}</p>
              </div>

              {/* Tags */}
              {place.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {place.tags.map((tag) => (
                    <span key={tag.id} className="badge bg-gray-100 text-gray-600">
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Reviews */}
              <div>
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">
                  Ulasan ({place.totalReviews})
                </h2>
                {place.reviews.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-2xl text-gray-400">
                    Belum ada ulasan. Jadilah yang pertama!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {place.reviews.map((review) => (
                      <div key={review.id} className="card p-5">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-gray-800">{review.author}</p>
                            <p className="text-xs text-gray-400">
                              {new Date(review.createdAt).toLocaleDateString('id-ID', {
                                year: 'numeric', month: 'long', day: 'numeric',
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar info */}
            <div className="space-y-5">
              <div className="card p-6 space-y-4">
                <h3 className="font-display font-semibold text-gray-900 text-lg">Informasi</h3>

                <InfoRow icon={<MapPin className="w-4 h-4 text-red-500" />} label="Alamat">
                  {place.address}, {place.district}, {place.city}
                </InfoRow>

                {place.openHours && (
                  <InfoRow icon={<Clock className="w-4 h-4 text-red-500" />} label="Jam Buka">
                    {place.openHours}
                  </InfoRow>
                )}

                {place.priceRange && (
                  <InfoRow icon={<span className="text-red-500 text-sm font-bold">Rp</span>} label="Harga">
                    {place.priceRange}
                  </InfoRow>
                )}

                {place.phone && (
                  <InfoRow icon={<Phone className="w-4 h-4 text-red-500" />} label="Telepon">
                    <a href={`tel:${place.phone}`} className="text-red-600 hover:underline">{place.phone}</a>
                  </InfoRow>
                )}

                {place.website && (
                  <InfoRow icon={<Globe className="w-4 h-4 text-red-500" />} label="Website">
                    <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline truncate">
                      {place.website}
                    </a>
                  </InfoRow>
                )}

                {place.instagram && (
                  <InfoRow icon={<Instagram className="w-4 h-4 text-red-500" />} label="Instagram">
                    <a href={`https://instagram.com/${place.instagram}`} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
                      @{place.instagram}
                    </a>
                  </InfoRow>
                )}
              </div>

              {/* Mini map */}
              <div className="card p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Lokasi</h3>
                <a
                  href={`https://www.google.com/maps?q=${place.lat},${place.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-100 rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
                >
                  <img
                    src={`https://static-maps.yandex.ru/1.x/?ll=${place.lng},${place.lat}&size=400,200&z=15&l=map&pt=${place.lng},${place.lat},pm2rdl`}
                    alt="Lokasi di peta"
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x200/f3f4f6/9ca3af?text=📍+${encodeURIComponent(place.name)}`
                    }}
                  />
                </a>
                <a
                  href={`https://www.google.com/maps?q=${place.lat},${place.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full mt-3 text-sm justify-center"
                >
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function InfoRow({ icon, label, children }: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <div className="text-sm text-gray-700">{children}</div>
      </div>
    </div>
  )
}
