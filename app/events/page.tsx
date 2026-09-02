'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const EVENT_TYPES = ['Wedding', 'Corporate Event', 'Conference', 'Party', 'Airport Transfer Group', 'Funeral', 'Other']
const VEHICLE_TYPES = ['Sedan', 'SUV', 'Minibus', 'Bus', 'Mixed Fleet']

export default function EventsPage() {
  const [form, setForm] = useState({ event_name: '', event_type: '', event_date: '', hours: '', guests: '', vehicle_type: '', pickup: '', special: '' })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  return (
    <>
      <StickyBar />
      <Navbar />
      <main style={{ paddingTop: 54 }}>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 py-24 text-center"
          style={{ background: 'linear-gradient(135deg, #F5F3FF 0%, var(--warm-white) 60%, var(--orange-blush) 100%)' }}>
          <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: 'rgba(139,92,246,0.1)', color: '#7C3AED', border: '1px solid rgba(139,92,246,0.18)' }}
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            Events Transport
          </motion.div>
          <motion.h1 className="text-4xl sm:text-5xl font-extrabold trz-ink mb-5 leading-tight max-w-2xl"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            Your Big Day. <span style={{ color: '#7C3AED' }}>Flawlessly Moved.</span>
          </motion.h1>
          <motion.p className="text-base trz-muted mb-8 max-w-xl leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Weddings, conferences, corporate events and more. Sedans, SUVs, minibuses and full-size buses. Bespoke quote, 30% deposit to confirm, balance post-event.
          </motion.p>
          <motion.div className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
            <a href="#enquiry" className="px-7 py-3.5 rounded-full font-bold text-white text-sm hover:scale-105 transition-transform"
              style={{ background: '#7C3AED', boxShadow: '0 4px 18px rgba(124,58,237,0.25)' }}>
              Submit Enquiry →
            </a>
            <Link href="/events/login" className="px-7 py-3.5 rounded-full font-semibold text-sm border hover:scale-105 transition-transform"
              style={{ color: 'var(--text-main)', borderColor: 'var(--sage-border)', background: 'rgba(255,249,242,0.82)' }}>
              Client Login
            </Link>
          </motion.div>
        </section>

        {/* Vehicles */}
        <section className="py-14 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-extrabold trz-ink mb-6 text-center">Fleet Available</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { icon: '🚗', label: 'Sedan', sub: 'Up to 4 guests' },
                { icon: '🚙', label: 'SUV', sub: 'Up to 6 guests' },
                { icon: '🚐', label: 'Minibus', sub: 'Up to 14 guests' },
                { icon: '🚌', label: 'Bus', sub: 'Up to 50 guests' },
                { icon: '🚗🚌', label: 'Mixed Fleet', sub: 'Custom combination' },
              ].map((v, i) => (
                <motion.div key={i} className="trz-card rounded-2xl p-4 text-center glow-card"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                  <div className="text-2xl mb-2">{v.icon}</div>
                  <div className="text-sm font-extrabold trz-ink">{v.label}</div>
                  <div className="text-xs trz-muted mt-1">{v.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry form */}
        <section id="enquiry" className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold trz-ink mb-2 text-center">Event Enquiry</h2>
            <p className="text-sm trz-muted text-center mb-8">We&apos;ll prepare a bespoke quote within 24 hours.</p>
            <form className="trz-card rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={e => e.preventDefault()}>
              <input className="trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-300" placeholder="Event Name (e.g. Bola & Chidi Wedding)"
                value={form.event_name} onChange={e => set('event_name', e.target.value)} />
              <select className="trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-300"
                value={form.event_type} onChange={e => set('event_type', e.target.value)}>
                <option value="">Event Type</option>
                {EVENT_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
              <input type="date" className="trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-300"
                value={form.event_date} onChange={e => set('event_date', e.target.value)} />
              <input className="trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-300" placeholder="Hours needed"
                value={form.hours} onChange={e => set('hours', e.target.value)} type="number" />
              <input className="trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-300" placeholder="Guest count"
                value={form.guests} onChange={e => set('guests', e.target.value)} type="number" />
              <select className="trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-300"
                value={form.vehicle_type} onChange={e => set('vehicle_type', e.target.value)}>
                <option value="">Vehicle preference</option>
                {VEHICLE_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
              <input className="trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-300 sm:col-span-2" placeholder="Pickup location"
                value={form.pickup} onChange={e => set('pickup', e.target.value)} />
              <input className="trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-300 sm:col-span-2" placeholder="Your phone / email" />
              <textarea className="trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-300 sm:col-span-2"
                rows={3} placeholder="Special requirements or additional drop-off points..."
                value={form.special} onChange={e => set('special', e.target.value)} />
              <div className="sm:col-span-2">
                <button type="submit" className="px-8 py-3.5 rounded-full font-bold text-white text-sm hover:scale-105 transition-transform"
                  style={{ background: '#7C3AED' }}>
                  Submit Enquiry →
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
