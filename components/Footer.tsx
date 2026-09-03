'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Apple, Play, ShieldCheck } from 'lucide-react'

const LINKS = [
  {
    group: 'Platform',
    items: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Safety', href: '/safety' },
      { label: 'Live Tracking', href: '/go/track' },
      { label: 'Drive With Us', href: '/driver' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    group: 'Verticals',
    items: [
      { label: 'Tranzitta Go', href: '/go' },
      { label: 'Tranzitta School', href: '/school' },
      { label: 'Corporate', href: '/corporate' },
      { label: 'Events', href: '/events' },
      { label: 'Airport', href: '/airport' },
    ],
  },
  {
    group: 'Operations',
    items: [
      { label: 'About Tranzitta', href: '/' },
      { label: 'Our Fleet', href: '#fleet' },
      { label: 'Driver App', href: '/driver/dashboard' },
      { label: 'Ops Login', href: '/ops' },
    ],
  },
  {
    group: 'Support',
    items: [
      { label: 'Book a Ride', href: '/go/book' },
      { label: 'WhatsApp Us', href: '#contact' },
      { label: 'Driver Signup', href: '/driver' },
      { label: 'Panic Response', href: '/safety' },
      { label: 'Compliance', href: '/ops/dashboard' },
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
      className="inline-flex min-w-[172px] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition hover:-translate-y-0.5 hover:bg-white"
      style={{ borderColor: 'rgba(255,226,184,0.42)', background: 'rgba(255,255,255,0.08)', color: '#fff' }}
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
    <footer className="relative overflow-hidden pt-16" style={{ background: 'var(--warm-white)' }}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'var(--sage-border)' }} />

      <div className="mx-auto max-w-7xl px-4">
        <div
          className="grid gap-8 rounded-[28px] px-6 py-8 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
          style={{ background: 'linear-gradient(110deg, #183024 0%, #1F6B46 54%, #C46B2B 100%)', boxShadow: '0 22px 60px rgba(24,48,36,0.2)' }}
        >
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#FFE2B8' }}
            >
              <ShieldCheck size={14} /> Safety-first transport in your pocket
            </div>
            <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight text-white sm:text-4xl">
              Download Tranzitta for Go, School, Corporate, Events and Airport.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 trz-muted-on-dark">
              One premium Nigerian mobility network with vetted drivers, live tracking, panic response and human ops support.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <StoreBadge type="apple" kicker="Download on the" label="App Store" />
            <StoreBadge type="play" kicker="Get it on" label="Google Play" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:items-start">
          <div>
            <Image src="/tranzitta-logo.png" alt="Tranzitta" width={190} height={58} className="mb-5 h-12 w-auto object-contain" />
            <p className="max-w-sm text-sm leading-7 trz-muted">
              Nigeria&apos;s safety-first ride platform. Police-vetted drivers, panic button, live GPS and premium fleet coverage across five verticals.
            </p>
            <a href="mailto:bookings@tranzitta.africa" className="mt-4 inline-block text-sm font-black trz-orange">
              bookings@tranzitta.africa
            </a>
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
      </div>

      <div className="trz-top-gradient px-4 py-5 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-xs font-bold opacity-95 sm:flex-row sm:text-left">
          <p>© 2026 Tranzitta. Operated by Budruum Ltd. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#">Terms</Link>
            <Link href="#">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
