// src/components/ui/CategoryFilter.tsx
'use client'

import { cn } from '@/lib/utils'

const CATEGORIES = [
  { label: 'Semua',      slug: '',           icon: '🗺️' },
  { label: 'Wisata',     slug: 'wisata',     icon: '🏛️' },
  { label: 'Kuliner',    slug: 'kuliner',    icon: '🍽️' },
  { label: 'Penginapan', slug: 'penginapan', icon: '🏨' },
  { label: 'Belanja',    slug: 'belanja',    icon: '🛍️' },
  { label: 'Budaya',     slug: 'budaya',     icon: '🎭' },
]

interface CategoryFilterProps {
  selected: string
  onChange: (slug: string) => void
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onChange(cat.slug)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-150 shrink-0',
            selected === cat.slug
              ? 'bg-red-600 text-white shadow-md shadow-red-200'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-red-300 hover:text-red-600'
          )}
        >
          <span>{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>
  )
}
