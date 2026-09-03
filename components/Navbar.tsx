'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Globe2 } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image src="/tranzitta-logo.png" alt="Tranzitta" width={210} height={64} className="h-12 w-auto object-contain sm:h-14" priority />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/how-it-works" className="nav-link text-sm font-semibold" style={{ color: 'var(--text-main)' }}>How It Works</Link>
          <Link href="#safety" className="nav-link text-sm font-semibold" style={{ color: 'var(--text-main)' }}>Safety</Link>
          <Link href="/driver" className="nav-link text-sm font-semibold" style={{ color: 'var(--text-main)' }}>Drive With Us</Link>
        </div>

        {/* Utility Nav */}
        <div className="hidden lg:flex items-center gap-5">
          <button
            className="flex items-center gap-2 text-sm font-bold transition hover:text-orange-600"
            style={{ color: 'var(--text-main)' }}
            aria-label="Change language"
          >
            <Globe2 size={17} /> EN
          </button>
          <Link href="#contact" className="nav-link text-sm font-semibold" style={{ color: 'var(--text-main)' }}>Contact Us</Link>
          <Link href="/go/login" className="nav-link text-sm font-semibold" style={{ color: 'var(--text-main)' }}>Login</Link>
          <Link href="/go"
            className="px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
            style={{ background: 'var(--orange-deep)', boxShadow: '0 4px 14px rgba(217,107,31,0.28)' }}>
            Sign Up
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
          <Link href="/how-it-works" className="block py-2.5 px-3 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-colors" style={{ color: 'var(--text-main)' }} onClick={() => setMobileOpen(false)}>How It Works</Link>
          <Link href="#safety" className="block py-2.5 px-3 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-colors" style={{ color: 'var(--text-main)' }} onClick={() => setMobileOpen(false)}>Safety</Link>
          <button className="flex w-full items-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-colors" style={{ color: 'var(--text-main)' }}><Globe2 size={16} /> Language: EN</button>
          <Link href="#contact" className="block py-2.5 px-3 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-colors" style={{ color: 'var(--text-main)' }} onClick={() => setMobileOpen(false)}>Contact Us</Link>
          <Link href="/go/login" className="block py-2.5 px-3 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-colors" style={{ color: 'var(--text-main)' }} onClick={() => setMobileOpen(false)}>Login</Link>
          <div className="border-t pt-2 mt-2" style={{ borderColor: 'var(--sage-border)' }}>
            <Link href="/driver" className="block py-2.5 px-3 rounded-xl text-sm font-semibold" style={{ color: 'var(--text-main)' }} onClick={() => setMobileOpen(false)}>Drive With Us</Link>
            <Link href="/go" className="block mt-2 py-3 px-4 rounded-full text-sm font-bold text-white text-center" style={{ background: 'var(--orange-deep)' }} onClick={() => setMobileOpen(false)}>Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
