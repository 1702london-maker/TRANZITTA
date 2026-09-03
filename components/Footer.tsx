'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Apple, Facebook, Instagram, Linkedin, Mail, MapPin, Play } from 'lucide-react'

const LINKS = [
  {
    group: 'Platform',
    items: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Live Tracking', href: '/go/track' },
      { label: 'Driver Safety', href: '#safety' },
      { label: 'Tranzitta Go', href: '/go' },
      { label: 'Tranzitta School', href: '/school' },
    ],
  },
  {
    group: 'Company',
    items: [
      { label: 'About Tranzitta', href: '/' },
      { label: 'Our Fleet', href: '#fleet' },
      { label: 'Corporate', href: '/corporate' },
      { label: 'Events', href: '/events' },
      { label: 'Airport', href: '/airport' },
    ],
  },
  {
    group: 'Support',
    items: [
      { label: 'Book a Ride', href: '/go/book' },
      { label: 'WhatsApp Us', href: '#contact' },
      { label: 'Driver Signup', href: '/driver' },
      { label: 'Ops Login', href: '/ops' },
      { label: 'Safety Policy', href: '#safety' },
    ],
  },
]

function StoreBadge({
  type,
  kicker,
  label,
}: {
  type: 'apple' | 'play'
  kicker: string
  label: string
}) {
  const Icon = type === 'apple' ? Apple : Play
  return (
    <a
      href="#"
      className="inline-flex min-w-[178px] items-center gap-3 rounded-2xl px-5 py-3 text-left text-white shadow-xl transition hover:-translate-y-0.5"
      style={{ background: '#242624' }}
      aria-label={label}
    >
      <Icon size={25} />
      <span>
        <span className="block text-[10px] font-bold uppercase tracking-[0.12em] opacity-75">{kicker}</span>
        <span className="block text-sm font-black">{label}</span>
      </span>
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-20" style={{ background: 'var(--sage-light)' }}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'var(--sage-border)' }} />

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.85fr_0.85fr_0.85fr]">
          <div>
            <Image src="/tranzitta-logo.png" alt="Tranzitta" width={220} height={70} className="mb-6 h-14 w-auto object-contain" />
            <p className="max-w-xs text-base leading-8 trz-muted">
              Safe Nigerian transport across Go, School, Corporate, Events and Airport.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                ['X', 'X'],
                ['Facebook', Facebook],
                ['Instagram', Instagram],
                ['LinkedIn', Linkedin],
              ].map(([label, Icon]) => (
                <a key={String(label)} href="#" aria-label={String(label)} className="flex h-11 w-11 items-center justify-center rounded-full trz-sage-pill transition hover:-translate-y-0.5 hover:text-orange-700">
                  {typeof Icon === 'string' ? <span className="text-lg font-black">𝕏</span> : <Icon size={18} />}
                </a>
              ))}
            </div>
            <div className="mt-7 space-y-4 text-base trz-muted">
              <a href="mailto:booking@tranzitta.africa" className="flex items-center gap-3 hover:text-orange-700">
                <Mail size={18} /> booking@tranzitta.africa
              </a>
              <p className="flex max-w-xs items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0" /> Operating in Lagos. Abuja and Port Harcourt coming soon.
              </p>
            </div>
          </div>

          {LINKS.map((group) => (
            <div key={group.group}>
              <h4 className="mb-4 text-xs font-extrabold uppercase tracking-widest trz-muted">{group.group}</h4>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm font-semibold trz-ink transition hover:text-orange-600">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 pb-20 pt-2">
          <StoreBadge type="apple" kicker="Coming soon on the" label="App Store" />
          <StoreBadge type="play" kicker="Coming soon on" label="Google Play" />
        </div>
      </div>

      <div className="border-t px-4 py-7" style={{ borderColor: 'var(--sage-border)' }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-sm trz-muted sm:flex-row sm:text-left">
          <p>Copyright 2026 Tranzitta Nigeria.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-orange-700">Terms</Link>
            <Link href="#" className="hover:text-orange-700">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
