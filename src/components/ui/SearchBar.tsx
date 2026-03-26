// src/components/ui/SearchBar.tsx
'use client'

import { Search, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Cari tempat, kuliner, wisata...',
  className,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)

  // Keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div
      className={cn(
        'flex items-center gap-3 bg-white rounded-2xl border transition-all duration-200 px-4',
        focused ? 'border-red-400 ring-2 ring-red-100 shadow-md' : 'border-gray-200 shadow-sm',
        className
      )}
    >
      <Search className="w-4 h-4 text-gray-400 shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
      />
      {value && (
        <button onClick={() => onChange('')} className="p-0.5 rounded-full text-gray-400 hover:text-gray-700">
          <X className="w-4 h-4" />
        </button>
      )}
      <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-400 bg-gray-100 rounded-lg font-mono">
        ⌘K
      </kbd>
    </div>
  )
}
