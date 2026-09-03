'use client'

import Link from 'next/link'

const ITEMS = [
  { label: 'Go', href: '/go', vehicle: 'car' },
  { label: 'School', href: '/school', vehicle: 'school-bus' },
  { label: 'Corporate', href: '/corporate', vehicle: 'coach' },
  { label: 'Events', href: '/events', vehicle: 'luxury-van' },
  { label: 'Airport', href: '/airport', vehicle: 'prado' },
]

export default function FloatingVerticalBar() {
  return (
    <div className="trz-bottom-shell fixed bottom-5 left-0 right-0 hidden justify-center px-4 md:flex">
      <nav className="trz-bottom-bar trz-top-gradient pointer-events-auto">
        {ITEMS.map((item) => {
          return (
            <Link
              key={item.href}
              href={item.href}
              className="trz-portal-link flex min-w-[104px] flex-col items-center justify-center gap-1 rounded-full text-[11px] font-black uppercase tracking-[0.04em] transition"
            >
              <VehicleIcon type={item.vehicle} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

function VehicleIcon({ type }: { type: string }) {
  if (type === 'school-bus') {
    return (
      <svg width="31" height="23" viewBox="0 0 31 23" aria-hidden="true">
        <rect x="2" y="4" width="25" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M5 8h19M8 4V2h12v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="6" y="8" width="5" height="4" rx="1" fill="currentColor" opacity=".55" />
        <rect x="13" y="8" width="5" height="4" rx="1" fill="currentColor" opacity=".55" />
        <rect x="20" y="8" width="4" height="4" rx="1" fill="currentColor" opacity=".55" />
        <circle cx="9" cy="19" r="2" fill="currentColor" />
        <circle cx="23" cy="19" r="2" fill="currentColor" />
      </svg>
    )
  }
  if (type === 'coach') {
    return (
      <svg width="36" height="23" viewBox="0 0 36 23" aria-hidden="true">
        <rect x="2" y="5" width="31" height="13" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M7 9h21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="7" y="10" width="5" height="4" rx="1" fill="currentColor" opacity=".5" />
        <rect x="14" y="10" width="5" height="4" rx="1" fill="currentColor" opacity=".5" />
        <rect x="21" y="10" width="5" height="4" rx="1" fill="currentColor" opacity=".5" />
        <circle cx="10" cy="19" r="2" fill="currentColor" />
        <circle cx="27" cy="19" r="2" fill="currentColor" />
      </svg>
    )
  }
  if (type === 'luxury-van') {
    return (
      <svg width="34" height="23" viewBox="0 0 34 23" aria-hidden="true">
        <path d="M3 17V9.5c0-2.2 1.8-4 4-4h13.8c1.5 0 2.9.7 3.8 1.9L31 16v1H3Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M9 9h8M20 9h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="10" cy="18" r="2.3" fill="currentColor" />
        <circle cx="25" cy="18" r="2.3" fill="currentColor" />
      </svg>
    )
  }
  if (type === 'prado') {
    return (
      <svg width="34" height="23" viewBox="0 0 34 23" aria-hidden="true">
        <path d="M4 16v-5l6-6h13l6 6v5H4Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M11 9h7M21 9h4M5 15h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="10" cy="18" r="2.5" fill="currentColor" />
        <circle cx="25" cy="18" r="2.5" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg width="31" height="23" viewBox="0 0 31 23" aria-hidden="true">
      <path d="M4 16v-4.5c0-1.1.9-2 2-2h3.5l3-4h7l3 4H25c1.1 0 2 .9 2 2V16H4Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 9.5h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="17" r="2.5" fill="currentColor" />
      <circle cx="23" cy="17" r="2.5" fill="currentColor" />
    </svg>
  )
}
