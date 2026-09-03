'use client'

import Link from 'next/link'
import { Building2, Bus, Car, GraduationCap, Plane } from 'lucide-react'

const ITEMS = [
  { label: 'Go', href: '/go', icon: Car },
  { label: 'School', href: '/school', icon: GraduationCap },
  { label: 'Corporate', href: '/corporate', icon: Building2 },
  { label: 'Events', href: '/events', icon: Bus },
  { label: 'Airport', href: '/airport', icon: Plane },
]

export default function FloatingVerticalBar() {
  return (
    <div className="trz-bottom-shell fixed bottom-5 left-0 right-0 hidden justify-center px-4 md:flex">
      <nav className="trz-bottom-bar trz-top-gradient pointer-events-auto">
        {ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="trz-portal-link flex min-w-[96px] flex-col items-center justify-center gap-1 rounded-full text-[11px] font-black uppercase tracking-[0.04em] transition"
            >
              <Icon size={20} strokeWidth={2.4} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
