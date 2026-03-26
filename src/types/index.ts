// src/types/index.ts

export interface Place {
  id: string
  name: string
  slug: string
  description: string
  address: string
  city: string
  district: string
  lat: number
  lng: number
  phone?: string
  website?: string
  instagram?: string
  openHours?: string
  priceRange?: string
  images: string[]
  rating: number
  totalReviews: number
  isVerified: boolean
  isFeatured: boolean
  category: Category
  categoryId: string
  tags: Tag[]
  reviews?: Review[]
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  color: string
}

export interface Review {
  id: string
  rating: number
  comment: string
  author: string
  placeId: string
  createdAt: Date
}

export interface Tag {
  id: string
  name: string
}

export interface SearchParams {
  query?: string
  category?: string
  city?: string
  page?: number
  limit?: number
}

export interface ApiResponse<T> {
  data: T
  total?: number
  page?: number
  limit?: number
  success: boolean
  message?: string
}
