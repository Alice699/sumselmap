// src/app/explore/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { LayoutGrid, Map, SlidersHorizontal, Loader2 } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PlaceCard } from '@/components/cards/PlaceCard'
import { PlaceCardSkeleton } from '@/components/ui/Skeleton'
import { SearchBar } from '@/components/ui/SearchBar'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { MapView } from '@/components/map/MapView'
import type { Place } from '@/types'
import { cn } from '@/lib/utils'
import { CITIES } from '@/lib/utils'

type ViewMode = 'grid' | 'map' | 'split'

export default function ExplorePage() {
  const searchParams = useSearchParams()

  const [query,    setQuery]    = useState(searchParams.get('query') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [city,     setCity]     = useState('')
  const [view,     setView]     = useState<ViewMode>('split')

  const [places,  setPlaces]  = useState<Place[]>([])
  const [total,   setTotal]   = useState(0)
  const [page,    setPage]    = useState(1)
  const [loading, setLoading] = useState(true)

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [showFilters,   setShowFilters]   = useState(false)

  const limit = 12

  const fetchPlaces = useCallback(async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/places', {
        params: { query, category, city, page, limit },
      })
      setPlaces(res.data.data)
      setTotal(res.data.total)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [query, category, city, page])

  // Debounced fetch on filter change
  useEffect(() => {
    setPage(1)
  }, [query, category, city])

  useEffect(() => {
    const timeout = setTimeout(fetchPlaces, 300)
    return () => clearTimeout(timeout)
  }, [fetchPlaces])

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Top bar */}
        <div className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
          <div className="container-app py-3 space-y-3">
            {/* Search + view toggle */}
            <div className="flex items-center gap-3">
              <SearchBar
                value={query}
                onChange={setQuery}
                className="flex-1"
              />

              {/* Filter toggle (mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  'md:hidden p-3 rounded-xl border transition-colors',
                  showFilters ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600 border-gray-200'
                )}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>

              {/* View mode */}
              <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                {([
                  { mode: 'grid', icon: LayoutGrid, label: 'Grid' },
                  { mode: 'map',  icon: Map,        label: 'Peta' },
                  { mode: 'split', icon: SlidersHorizontal, label: 'Split' },
                ] as const).map(({ mode, icon: Icon, label }) => (
                  <button
                    key={mode}
                    onClick={() => setView(mode)}
                    title={label}
                    className={cn(
                      'p-2.5 rounded-lg transition-all text-sm font-medium flex items-center gap-1.5',
                      view === mode
                        ? 'bg-white shadow text-red-600'
                        : 'text-gray-500 hover:text-gray-800'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden lg:inline">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filters row */}
            <div className={cn('gap-3', showFilters || 'hidden md:flex', showFilters && 'flex flex-col md:flex-row')}>
              <CategoryFilter selected={category} onChange={setCategory} />

              {/* City filter */}
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="shrink-0 px-3 py-2 text-sm border border-gray-200 rounded-xl bg-white text-gray-700 outline-none focus:border-red-400"
              >
                <option value="">Semua Kota</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Result count */}
            <p className="text-xs text-gray-500">
              {loading ? 'Mencari...' : `${total} tempat ditemukan`}
            </p>
          </div>
        </div>

        {/* Content area */}
        <div className="container-app py-6">
          {view === 'split' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Map */}
              <div className="lg:sticky lg:top-36 h-[calc(100vh-10rem)]">
                <MapView
                  places={places}
                  selectedPlace={selectedPlace}
                  onPlaceSelect={setSelectedPlace}
                  className="h-full"
                />
              </div>

              {/* List */}
              <div className="space-y-4">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => <PlaceCardSkeleton key={i} />)
                  : places.length === 0
                  ? <EmptyState />
                  : places.map((place) => (
                    <div
                      key={place.id}
                      onClick={() => setSelectedPlace(place)}
                      className={cn(
                        'cursor-pointer transition-all',
                        selectedPlace?.id === place.id && 'ring-2 ring-red-500 rounded-2xl'
                      )}
                    >
                      <PlaceCard place={place} />
                    </div>
                  ))
                }
              </div>
            </div>
          ) : view === 'map' ? (
            <MapView
              places={places}
              selectedPlace={selectedPlace}
              onPlaceSelect={setSelectedPlace}
              className="h-[calc(100vh-14rem)]"
            />
          ) : (
            // Grid view
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 9 }).map((_, i) => <PlaceCardSkeleton key={i} />)
                : places.length === 0
                ? <div className="col-span-3"><EmptyState /></div>
                : places.map((place) => <PlaceCard key={place.id} place={place} />)
              }
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="btn-secondary text-sm py-2 px-4 disabled:opacity-40"
              >
                ← Sebelumnya
              </button>
              <span className="text-sm text-gray-600">
                {page} / {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="btn-secondary text-sm py-2 px-4 disabled:opacity-40"
              >
                Berikutnya →
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">🗺️</div>
      <h3 className="font-display text-xl font-semibold text-gray-800 mb-2">
        Tempat tidak ditemukan
      </h3>
      <p className="text-gray-500 text-sm">
        Coba kata kunci lain atau ubah filter pencarian
      </p>
    </div>
  )
}
