'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const VERTICALS = [
  { label: 'Tranzitta Go', href: '/go', desc: 'Everyday rides' },
  { label: 'Tranzitta School', href: '/school', desc: 'School pickup & drop-off' },
  { label: 'Tranzitta Corporate', href: '/corporate', desc: 'Company shuttles' },
  { label: 'Tranzitta Events', href: '/events', desc: 'Events & buses' },
  { label: 'Tranzitta Airport', href: '/airport', desc: 'Airport transfers' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'trz-nav-panel-scrolled' : 'trz-nav-panel'}`}
      style={{ top: 38 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image src="/tranzitta-logo.png" alt="Tranzitta" width={140} height={40} className="h-9 w-auto object-contain" priority />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="nav-link text-sm font-semibold flex items-center gap-1.5" style={{ color: 'var(--text-main)' }}>
              Verticals
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl shadow-xl border py-2 z-50"
                style={{ background: 'rgba(255,249,242,0.98)', borderColor: 'var(--sage-border)', backdropFilter: 'blur(14px)' }}>
                {VERTICALS.map(v => (
                  <Link key={v.href} href={v.href}
                    className="flex flex-col px-4 py-3 hover:bg-orange-50 transition-colors">
                    <span className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>{v.label}</span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{v.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="#safety" className="nav-link text-sm font-semibold" style={{ color: 'var(--text-main)' }}>Safety</Link>
          <Link href="#how-it-works" className="nav-link text-sm font-semibold" style={{ color: 'var(--text-main)' }}>How It Works</Link>
          <Link href="/driver" className="nav-link text-sm font-semibold" style={{ color: 'var(--text-main)' }}>Drive With Us</Link>
          <Link href="#contact" className="nav-link text-sm font-semibold" style={{ color: 'var(--text-main)' }}>Contact</Link>
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/go"
            className="px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
            style={{ background: 'var(--orange-deep)', boxShadow: '0 4px 14px rgba(217,107,31,0.28)' }}>
            Book a Ride
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            {mobileOpen
              ? <path d="M18 6L6 18M6 6l12 12" stroke="var(--text-main)" strokeWidth="2" strokeLinecap="round" />
              : <path d="M3 12h18M3 6h18M3 18h18" stroke="var(--text-main)" strokeWidth="2" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t px-4 py-4 space-y-2 trz-mobile-menu" style={{ borderColor: 'var(--sage-border)' }}>
          {VERTICALS.map(v => (
            <Link key={v.href} href={v.href}
              className="block py-2.5 px-3 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-colors"
              style={{ color: 'var(--text-main)' }}
              onClick={() => setMobileOpen(false)}>
              {v.label}
            </Link>
          ))}
          <div className="border-t pt-2 mt-2" style={{ borderColor: 'var(--sage-border)' }}>
            <Link href="/driver" className="block py-2.5 px-3 rounded-xl text-sm font-semibold" style={{ color: 'var(--text-main)' }} onClick={() => setMobileOpen(false)}>Drive With Us</Link>
            <Link href="/go" className="block mt-2 py-3 px-4 rounded-full text-sm font-bold text-white text-center" style={{ background: 'var(--orange-deep)' }} onClick={() => setMobileOpen(false)}>Book a Ride</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
