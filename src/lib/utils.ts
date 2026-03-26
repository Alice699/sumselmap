// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .trim()
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function getStars(rating: number): number[] {
  return Array.from({ length: 5 }, (_, i) => i + 1)
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export const CITIES = [
  'Palembang',
  'Prabumulih',
  'Lubuklinggau',
  'Pagar Alam',
  'Baturaja',
  'Lahat',
  'Muara Enim',
  'Sekayu',
] as const

export const MAP_CONFIG = {
  center: [-2.9761, 104.7754] as [number, number],
  zoom: 12,
  maxZoom: 18,
  minZoom: 8,
}
