'use client'

import { useMemo, useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { lagosLocations } from '@/lib/tranzitta/lagos-locations'

export default function LocationInput({
  value,
  onChange,
  placeholder,
  tone = 'pickup',
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
  tone?: 'pickup' | 'dropoff'
}) {
  const [focused, setFocused] = useState(false)
  const suggestions = useMemo(() => {
    const query = value.trim().toLowerCase()
    if (!query) return lagosLocations.slice(0, 6)
    return lagosLocations.filter((item) => `${item.name} ${item.area}`.toLowerCase().includes(query)).slice(0, 6)
  }, [value])

  return (
    <div className="relative">
      <div className="relative">
        <div
          className="absolute left-3.5 top-1/2 flex h-3 w-3 -translate-y-1/2 items-center justify-center rounded-full"
          style={{ background: tone === 'pickup' ? 'var(--africa-green)' : 'var(--orange-deep)' }}
        />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 120)}
          className="w-full trz-input rounded-xl py-3 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-orange-300"
          placeholder={placeholder}
        />
      </div>

      {focused && suggestions.length > 0 ? (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-40 overflow-hidden rounded-2xl border bg-white shadow-xl" style={{ borderColor: 'var(--sage-border)' }}>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.name}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => onChange(suggestion.name)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold transition hover:bg-orange-50"
              style={{ color: 'var(--text-main)' }}
            >
              {tone === 'pickup' ? <Navigation size={15} color="#1F6B46" /> : <MapPin size={15} color="#D96B1F" />}
              <span>
                <span className="block">{suggestion.name}</span>
                <span className="block text-xs font-medium trz-muted">{suggestion.area}, Lagos</span>
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
