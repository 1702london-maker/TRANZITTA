'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function AirportPage() {
  const [direction, setDirection] = useState<'arrivals' | 'departures'>('arrivals')
  const [terminal, setTerminal] = useState<'domestic' | 'international'>('international')

  return (
    <>
      <StickyBar />
      <Navbar />
      <main style={{ paddingTop: 54 }}>
        {/* Hero */}
        <section className="relative min-h-[70vh] flex flex-col lg:flex-row items-center gap-12 px-4 py-24 max-w-7xl mx-auto">
          <div className="flex-1">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(3,105,161,0.1)', color: '#0369A1', border: '1px solid rgba(3,105,161,0.18)' }}
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Airport Transfers — Lagos
            </motion.div>
            <motion.h1 className="text-4xl sm:text-5xl font-extrabold trz-ink mb-5 leading-tight"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              Never Miss A Flight.<br /><span style={{ color: '#0369A1' }}>Or A Landing.</span>
            </motion.h1>
            <motion.p className="text-base trz-muted mb-8 max-w-lg leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              Pre-booked airport transfers to and from Murtala Muhammed International Airport. Domestic and International terminals. Meet & greet available. Fixed fare — no surprises.
            </motion.p>
            <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
              <Link href="/airport/book" className="px-7 py-3.5 rounded-full font-bold text-white text-sm hover:scale-105 transition-transform"
                style={{ background: '#0369A1', boxShadow: '0 4px 18px rgba(3,105,161,0.25)' }}>
                Book Transfer →
              </Link>
              <Link href="/airport/login" className="px-7 py-3.5 rounded-full font-semibold text-sm border hover:scale-105 transition-transform"
                style={{ color: 'var(--text-main)', borderColor: 'var(--sage-border)', background: 'rgba(255,249,242,0.82)' }}>
                Sign In
              </Link>
            </motion.div>
          </div>

          {/* Booking widget */}
          <motion.div className="w-full max-w-sm gradient-frame rounded-2xl p-6"
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="font-extrabold trz-ink mb-5 text-lg">Book Airport Transfer</h2>

            {/* Direction toggle */}
            <div className="flex rounded-xl overflow-hidden border mb-4" style={{ borderColor: 'var(--sage-border)' }}>
              {(['arrivals', 'departures'] as const).map(d => (
                <button key={d} onClick={() => setDirection(d)}
                  className="flex-1 py-2.5 text-sm font-bold capitalize transition-all"
                  style={{
                    background: direction === d ? '#0369A1' : 'transparent',
                    color: direction === d ? 'white' : 'var(--text-muted)',
                  }}>
                  {d === 'arrivals' ? '🛬 Arrivals' : '🛫 Departures'}
                </button>
              ))}
            </div>

            {/* Terminal toggle */}
            <div className="flex rounded-xl overflow-hidden border mb-4" style={{ borderColor: 'var(--sage-border)' }}>
              {(['domestic', 'international'] as const).map(t => (
                <button key={t} onClick={() => setTerminal(t)}
                  className="flex-1 py-2 text-xs font-bold capitalize transition-all"
                  style={{
                    background: terminal === t ? '#EDF5E5' : 'transparent',
                    color: terminal === t ? 'var(--africa-green)' : 'var(--text-muted)',
                  }}>
                  {t === 'domestic' ? '🏠 Domestic' : '🌍 International'}
                </button>
              ))}
            </div>

            <div className="space-y-3 mb-4">
              <input className="w-full trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                placeholder={direction === 'arrivals' ? 'Your address (drop-off)' : 'Your address (pickup)'} />
              <input className="w-full trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Flight number (optional)" />
              <input type="datetime-local" className="w-full trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-300" />
            </div>

            <div className="trz-sage-card rounded-xl p-4 mb-4">
              <div className="text-xs trz-muted mb-1">Murtala Muhammed {terminal === 'international' ? 'International' : 'Domestic'} · {direction}</div>
              <div className="text-xl font-extrabold trz-ink">Fixed Fare</div>
              <div className="text-xs trz-muted mt-1">Calculated on booking · Meet & greet optional</div>
            </div>

            <Link href="/airport/login"
              className="block w-full py-3.5 rounded-xl font-bold text-white text-sm text-center hover:scale-105 transition-transform"
              style={{ background: '#0369A1' }}>
              Sign In to Book
            </Link>
          </motion.div>
        </section>

        {/* Features */}
        <section className="py-16 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              { icon: '📌', title: 'Fixed Fare', desc: 'No surge on airport routes. Price set before you book.' },
              { icon: '🤝', title: 'Meet & Greet', desc: 'Driver waits in arrivals hall with your name.' },
              { icon: '🌍', title: 'Both Terminals', desc: 'Domestic and International covered.' },
              { icon: '⏱️', title: 'Flight Delay Grace', desc: 'We monitor delays. No excess charge for flight overruns.' },
            ].map((f, i) => (
              <motion.div key={i} className="trz-card rounded-2xl p-5 glow-card"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-extrabold trz-ink text-sm mb-1">{f.title}</h3>
                <p className="text-xs trz-muted">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
