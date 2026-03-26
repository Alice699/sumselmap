// src/components/map/MapView.tsx
'use client'

import { useEffect, useRef } from 'react'
import type { Place } from '@/types'
import { MAP_CONFIG } from '@/lib/utils'

interface MapViewProps {
  places: Place[]
  selectedPlace?: Place | null
  onPlaceSelect?: (place: Place) => void
  className?: string
}

export function MapView({ places, selectedPlace, onPlaceSelect, className = '' }: MapViewProps) {
  const mapRef     = useRef<HTMLDivElement>(null)
  const leafletRef = useRef<unknown>(null)
  const markersRef = useRef<Map<string, unknown>>(new Map())

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return

    // Lazy-load Leaflet (it's a client-only library)
    import('leaflet').then((L) => {
      if (leafletRef.current) return // already initialized

      // Fix Leaflet default marker icon paths in Next.js
      delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current!, {
        center: MAP_CONFIG.center,
        zoom:   MAP_CONFIG.zoom,
        maxZoom: MAP_CONFIG.maxZoom,
        minZoom: MAP_CONFIG.minZoom,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map)

      leafletRef.current = map
    })

    return () => {
      if (leafletRef.current) {
        (leafletRef.current as { remove: () => void }).remove()
        leafletRef.current = null
      }
    }
  }, [])

  // Sync markers whenever places change
  useEffect(() => {
    if (!leafletRef.current) return

    import('leaflet').then((L) => {
      const map = leafletRef.current as {
        addLayer: (layer: unknown) => void
        removeLayer: (layer: unknown) => void
      }

      // Remove old markers not in current places
      markersRef.current.forEach((marker, id) => {
        if (!places.find((p) => p.id === id)) {
          map.removeLayer(marker)
          markersRef.current.delete(id)
        }
      })

      // Add new markers
      places.forEach((place) => {
        if (markersRef.current.has(place.id)) return

        const icon = L.divIcon({
          className: '',
          html: `
            <div style="
              background:#CC2B2B;
              color:white;
              border-radius:50% 50% 50% 0;
              transform:rotate(-45deg);
              width:36px;height:36px;
              display:flex;align-items:center;justify-content:center;
              font-size:16px;
              box-shadow:0 2px 8px rgba(0,0,0,0.3);
              border:2px solid white;
            ">
              <span style="transform:rotate(45deg)">${place.category.icon}</span>
            </div>
          `,
          iconSize:   [36, 36],
          iconAnchor: [18, 36],
        })

        const marker = L.marker([place.lat, place.lng], { icon })
          .addTo(map as unknown as import('leaflet').Map)
          .bindPopup(`
            <div style="min-width:180px;font-family:sans-serif">
              <strong style="font-size:14px">${place.name}</strong><br/>
              <span style="font-size:12px;color:#666">${place.address}</span><br/>
              <span style="font-size:12px;color:#CC2B2B">⭐ ${place.rating.toFixed(1)}</span>
            </div>
          `)

        if (onPlaceSelect) {
          marker.on('click', () => onPlaceSelect(place))
        }

        markersRef.current.set(place.id, marker)
      })
    })
  }, [places, onPlaceSelect])

  // Pan to selected place
  useEffect(() => {
    if (!selectedPlace || !leafletRef.current) return
    import('leaflet').then(() => {
      const map = leafletRef.current as { setView: (latlng: [number, number], zoom: number) => void }
      map.setView([selectedPlace.lat, selectedPlace.lng], 15)
      const marker = markersRef.current.get(selectedPlace.id) as { openPopup: () => void } | undefined
      marker?.openPopup()
    })
  }, [selectedPlace])

  return (
    <>
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div
        ref={mapRef}
        className={`w-full rounded-2xl overflow-hidden ${className}`}
        style={{ minHeight: 400 }}
      />
    </>
  )
}
