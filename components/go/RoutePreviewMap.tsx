'use client'

import { MapPin, Navigation, ShieldCheck } from 'lucide-react'
import { findLagosLocation } from '@/lib/tranzitta/lagos-locations'

export default function RoutePreviewMap({
  pickup,
  dropoff,
  compact = false,
}: {
  pickup: string
  dropoff: string
  compact?: boolean
}) {
  const pickupLocation = findLagosLocation(pickup)
  const dropoffLocation = findLagosLocation(dropoff)
  const hasPickup = Boolean(pickupLocation)
  const hasDropoff = Boolean(dropoffLocation)
  const hasRoute = hasPickup && hasDropoff
  const mapSrc = getGoogleMapSrc(
    pickupLocation ? `${pickupLocation.name}, ${pickupLocation.area}, Lagos, Nigeria` : '',
    dropoffLocation ? `${dropoffLocation.name}, ${dropoffLocation.area}, Lagos, Nigeria` : ''
  )

  return (
    <div className={`relative overflow-hidden rounded-[26px] border bg-[#F8FAF3] shadow-sm ${compact ? 'h-[260px]' : 'h-[440px]'}`} style={{ borderColor: 'var(--sage-border)' }}>
      <iframe
        title="Tranzitta Lagos route map"
        src={mapSrc}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="pointer-events-none absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(255,249,242,0.34), rgba(241,246,234,0.12) 38%, rgba(31,107,70,0.12))',
        mixBlendMode: 'multiply',
      }} />

      <div className="absolute left-4 right-4 top-4 flex flex-wrap items-center justify-between gap-3">
        <div className="rounded-2xl bg-white/92 px-4 py-3 shadow-sm backdrop-blur">
          <p className="text-[11px] font-black uppercase tracking-[0.08em] trz-muted">Google Map</p>
          <p className="mt-1 text-sm font-black trz-ink">{hasRoute ? `${pickupLocation!.name} to ${dropoffLocation!.name}` : 'Seeded Lagos locations'}</p>
        </div>
        <div className="rounded-full bg-white/92 px-3 py-2 text-xs font-black trz-orange shadow-sm backdrop-blur">
          {hasRoute ? 'Live directions' : 'Lagos only for launch'}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-3">
        {[
          ['Fare', hasRoute ? 'Controlled by Tranzitta' : 'Preview pending'],
          ['Drivers', hasRoute ? 'Subscribed only' : 'Hidden for safety'],
          ['Safety', 'Panic support active'],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white/92 px-4 py-3 shadow-sm backdrop-blur">
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

function getGoogleMapSrc(pickup: string, dropoff: string) {
  const lagosCenter = 'Lagos, Nigeria'

  if (pickup && dropoff) {
    const params = new URLSearchParams({
      saddr: pickup,
      daddr: dropoff,
      output: 'embed',
    })
    return `https://maps.google.com/maps?${params.toString()}`
  }

  const query = pickup || dropoff || lagosCenter
  const params = new URLSearchParams({
    q: query,
    z: pickup || dropoff ? '14' : '11',
    output: 'embed',
  })
  return `https://maps.google.com/maps?${params.toString()}`
}

function MapPinLine({ tone, label }: { tone: 'pickup' | 'dropoff'; label: string }) {
  const Icon = tone === 'pickup' ? Navigation : MapPin
  return (
    <div className="flex items-center gap-2 text-xs font-black trz-ink">
      <span className="flex h-7 w-7 items-center justify-center rounded-full text-white" style={{ background: tone === 'pickup' ? '#1F6B46' : '#D96B1F' }}>
        <Icon size={14} />
      </span>
      <span className="truncate">{label}</span>
    </div>
  )
}
