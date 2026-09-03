'use client'

import { MapPin, Navigation, ShieldCheck } from 'lucide-react'

export default function RoutePreviewMap({
  pickup,
  dropoff,
  compact = false,
}: {
  pickup: string
  dropoff: string
  compact?: boolean
}) {
  const hasPickup = pickup.trim().length > 2
  const hasDropoff = dropoff.trim().length > 2
  const hasRoute = hasPickup && hasDropoff

  return (
    <div className={`relative overflow-hidden rounded-[26px] border trz-map-bg ${compact ? 'h-[260px]' : 'h-[440px]'}`} style={{ borderColor: 'var(--sage-border)' }}>
      <div className="absolute inset-0 opacity-75" style={{
        background: 'linear-gradient(90deg, rgba(31,107,70,0.08) 1px, transparent 1px 64px), linear-gradient(0deg, rgba(31,107,70,0.08) 1px, transparent 1px 64px)',
      }} />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 720 420" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-20 360 C110 304 166 344 258 274 C350 204 426 234 536 150 C618 88 672 84 750 54" fill="none" stroke="#DDE9D2" strokeWidth="26" strokeLinecap="round" />
        <path d="M-20 360 C110 304 166 344 258 274 C350 204 426 234 536 150 C618 88 672 84 750 54" fill="none" stroke="#FFFFFF" strokeWidth="18" strokeLinecap="round" />
        {hasRoute ? (
          <path d="M142 304 C218 252 294 282 368 218 C442 154 508 176 586 112" fill="none" stroke="#D96B1F" strokeWidth="7" strokeLinecap="round" strokeDasharray="14 12" />
        ) : null}
      </svg>

      <div className="absolute left-[17%] top-[66%] -translate-x-1/2 -translate-y-1/2">
        <div className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl ${hasPickup ? '' : 'opacity-35'}`} style={{ background: '#1F6B46' }}>
          <Navigation size={21} />
        </div>
      </div>
      <div className="absolute left-[81%] top-[28%] -translate-x-1/2 -translate-y-1/2">
        <div className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl ${hasDropoff ? '' : 'opacity-35'}`} style={{ background: '#D96B1F' }}>
          <MapPin size={22} />
        </div>
      </div>

      <div className="absolute left-4 right-4 top-4 flex flex-wrap items-center justify-between gap-3">
        <div className="rounded-2xl bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
          <p className="text-[11px] font-black uppercase tracking-[0.08em] trz-muted">Route Preview</p>
          <p className="mt-1 text-sm font-black trz-ink">{hasRoute ? `${pickup} to ${dropoff}` : 'Choose pickup and destination'}</p>
        </div>
        <div className="rounded-full bg-white/90 px-3 py-2 text-xs font-black trz-orange shadow-sm backdrop-blur">
          {hasRoute ? '12 min ETA preview' : 'Driver match locked'}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-3">
        {[
          ['Fare', hasRoute ? '₦2,400-₦3,100' : 'Preview pending'],
          ['Drivers', hasRoute ? 'Register to unlock' : 'Hidden for safety'],
          ['Safety', 'Panic support active'],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.08em] trz-muted">
              {label === 'Safety' ? <ShieldCheck size={13} /> : null}
              {label}
            </div>
            <div className="mt-1 text-sm font-black trz-ink">{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
