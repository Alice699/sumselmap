// src/hooks/usePlaces.ts
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import type { Place, SearchParams } from '@/types'

interface UsePlacesResult {
  places: Place[]
  total: number
  loading: boolean
  error: string | null
  page: number
  setPage: (page: number) => void
  refetch: () => void
}

export function usePlaces(params: SearchParams = {}): UsePlacesResult {
  const [places, setPlaces]   = useState<Place[]>([])
  const [total, setTotal]     = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)
  const [page, setPage]       = useState(params.page || 1)

  const fetchPlaces = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await axios.get('/api/places', {
        params: { ...params, page },
      })

      setPlaces(res.data.data)
      setTotal(res.data.total)
    } catch (err) {
      setError('Gagal memuat data. Coba lagi.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(params), page]) // eslint-disable-line

  useEffect(() => {
    fetchPlaces()
  }, [fetchPlaces])

  return { places, total, loading, error, page, setPage, refetch: fetchPlaces }
}
