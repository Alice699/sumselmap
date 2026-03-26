// src/components/cards/PlaceCard.tsx
import Link from 'next/link'
import { MapPin, Star, Clock, ExternalLink } from 'lucide-react'
import { cn, truncate, formatRating } from '@/lib/utils'
import type { Place } from '@/types'

interface PlaceCardProps {
  place: Place
  className?: string
}

export function PlaceCard({ place, className }: PlaceCardProps) {
  return (
    <Link
      href={`/place/${place.slug}`}
      className={cn(
        'card group flex flex-col overflow-hidden cursor-pointer',
        className
      )}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {place.images[0] ? (
          <img
            src={place.images[0]}
            alt={place.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-gray-100 to-gray-200">
            {place.category.icon}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {place.isVerified && (
            <span className="badge bg-green-500 text-white">✓ Terverifikasi</span>
          )}
          {place.isFeatured && (
            <span className="badge bg-yellow-400 text-yellow-900">⭐ Unggulan</span>
          )}
        </div>

        {/* Category */}
        <div className="absolute top-3 right-3">
          <span className="badge bg-white/90 backdrop-blur-sm text-gray-700">
            {place.category.icon} {place.category.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-gray-900 text-lg mb-1 group-hover:text-red-600 transition-colors">
          {place.name}
        </h3>

        <p className="text-gray-500 text-sm mb-4 flex-1">
          {truncate(place.description, 100)}
        </p>

        <div className="space-y-2 text-sm">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-gray-500">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="truncate">{place.address}</span>
          </div>

          {/* Open hours */}
          {place.openHours && (
            <div className="flex items-center gap-1.5 text-gray-500">
              <Clock className="w-4 h-4 shrink-0" />
              <span>{place.openHours}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold text-gray-800">{formatRating(place.rating)}</span>
            <span className="text-gray-400 text-xs">({place.totalReviews})</span>
          </div>
          {place.priceRange && (
            <span className="text-xs text-gray-500 font-medium">{place.priceRange}</span>
          )}
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
        </div>
      </div>
    </Link>
  )
}
