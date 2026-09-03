'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function GoPage() {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [listening, setListening] = useState(false)
  const bookingHref = `/go/book?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}`

  return (
    <>
      <StickyBar />
      <Navbar />
      <main style={{ paddingTop: 54 }}>
        {/* Hero */}
        <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 px-4 py-24"
          style={{ background: 'linear-gradient(120deg, var(--orange-blush) 0%, var(--warm-white) 60%, var(--sage-light) 100%)' }}>
          <div className="max-w-lg">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 trz-blush-pill"
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live in Lagos
            </motion.div>
            <motion.h1 className="text-4xl sm:text-5xl font-extrabold trz-ink mb-5 leading-tight"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              Your Ride.<br /><span style={{ color: 'var(--orange-deep)' }}>Your Safety.</span><br />Your Choice.
            </motion.h1>
            <motion.p className="text-base trz-muted mb-8 leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              Book in seconds. Track live. Panic button always on. Police-vetted drivers across Lagos — Abuja and Port Harcourt coming soon.
            </motion.p>
            <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <Link href={bookingHref} className="px-7 py-3.5 rounded-full font-bold text-white text-sm hover:scale-105 transition-transform"
                style={{ background: 'var(--orange-deep)', boxShadow: '0 4px 18px rgba(217,107,31,0.3)' }}>
                Book Now →
              </Link>
              <Link href="/go/login" className="px-7 py-3.5 rounded-full font-semibold text-sm border hover:scale-105 transition-transform"
                style={{ color: 'var(--text-main)', borderColor: 'var(--sage-border)', background: 'rgba(255,249,242,0.82)' }}>
                Sign In
              </Link>
            </motion.div>
          </div>

          {/* Booking widget */}
          <motion.div className="w-full max-w-sm gradient-frame rounded-2xl p-6"
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="font-extrabold trz-ink mb-5 text-lg">Where to?</h2>
            <div className="space-y-3 mb-5">
              <div className="relative">
                <div className="w-3 h-3 rounded-full absolute left-3.5 top-1/2 -translate-y-1/2" style={{ background: 'var(--africa-green)' }} />
                <input value={pickup} onChange={e => setPickup(e.target.value)}
                  className="w-full trz-input rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300"
                  placeholder="Pickup location" />
              </div>
              <div className="relative">
                <div className="w-3 h-3 rounded-full absolute left-3.5 top-1/2 -translate-y-1/2" style={{ background: 'var(--orange-deep)' }} />
                <input value={dropoff} onChange={e => setDropoff(e.target.value)}
                  className="w-full trz-input rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300"
                  placeholder="Where are you going?" />
              </div>
            </div>
            <div className="flex gap-2 mb-5">
              <button onClick={() => setListening(!listening)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                style={{ background: listening ? 'var(--orange-deep)' : 'var(--sage-light)', color: listening ? 'white' : 'var(--text-main)' }}>
                🎤 {listening ? 'Listening…' : 'Voice Search'}
              </button>
            </div>
            {/* Fare estimate mock */}
            <div className="trz-sage-card rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold trz-muted">Estimated Fare</span>
                <span className="text-xs px-2 py-0.5 rounded-full trz-blush-pill font-bold">No surge</span>
              </div>
              <div className="text-2xl font-extrabold trz-ink">₦2,400 – ₦3,100</div>
              <div className="text-xs trz-muted mt-1">Fare preview only · sign up to view matched drivers</div>
            </div>
            <Link href={bookingHref}
              className="block w-full py-3.5 rounded-xl font-bold text-white text-sm text-center hover:scale-105 transition-transform"
              style={{ background: 'var(--orange-deep)' }}>
              Continue to Driver Matching
            </Link>
            <p className="mt-3 text-center text-xs trz-muted">Matching drivers are shown after registration.</p>
          </motion.div>
        </section>

        {/* Features */}
        <section className="py-16 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🚨', title: 'Panic Button', desc: 'Always visible. Ops responds in 60 seconds.' },
              { icon: '📍', title: 'Live GPS', desc: 'Share tracking link with family via WhatsApp.' },
              { icon: '📹', title: 'In-Car Camera', desc: 'Every vehicle is camera-equipped.' },
              { icon: '🎤', title: 'Voice Search', desc: 'Yoruba-inflected English and Pidgin supported.' },
            ].map((f, i) => (
              <motion.div key={i} className="trz-card rounded-2xl p-5 glow-card"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-extrabold trz-ink mb-1 text-sm">{f.title}</h3>
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
