'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function CorporatePage() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main style={{ paddingTop: 54 }}>
        <section className="relative min-h-screen flex flex-col lg:flex-row items-center gap-14 px-4 py-24 max-w-7xl mx-auto">
          <div className="flex-1">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(24,48,36,0.08)', color: '#183024', border: '1px solid rgba(24,48,36,0.14)' }}
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Corporate Shuttles
            </motion.div>
            <motion.h1 className="text-4xl sm:text-5xl font-extrabold trz-ink mb-5 leading-tight"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              Your Staff. Delivered. On Time.
            </motion.h1>
            <motion.p className="text-base trz-muted mb-8 max-w-lg leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              AM and PM staff shuttles, hourly billing, live fleet tracking. Excess charged for overruns. Monthly invoicing with full breakdown and PO reference support.
            </motion.p>
            <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
              <Link href="/corporate/login"
                className="px-7 py-3.5 rounded-full font-bold text-white text-sm hover:scale-105 transition-transform"
                style={{ background: 'var(--text-main)', boxShadow: '0 4px 18px rgba(24,48,36,0.25)' }}>
                Admin Login →
              </Link>
              <a href="mailto:bookings@tranzitta.africa"
                className="px-7 py-3.5 rounded-full font-semibold text-sm border hover:scale-105 transition-transform"
                style={{ color: 'var(--text-main)', borderColor: 'var(--sage-border)', background: 'rgba(255,249,242,0.82)' }}>
                Request a Quote
              </a>
            </motion.div>
          </div>

          {/* Features grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 max-w-lg">
            {[
              { icon: '🕐', title: 'AM + PM Shifts', desc: 'Separate rates per shift. Run both or one.' },
              { icon: '💰', title: 'Hourly Billing', desc: 'Agreed hourly rate. Excess charged at overrun rate.' },
              { icon: '📊', title: 'Admin Dashboard', desc: 'Full trip breakdown, staff list, live map.' },
              { icon: '🧾', title: 'Monthly Invoice', desc: 'Auto-generated with PO reference support.' },
              { icon: '📍', title: 'Live Fleet Track', desc: 'Watch all vehicles in real time.' },
              { icon: '🔴', title: 'Panic Button', desc: 'Staff protected on every trip.' },
            ].map((f, i) => (
              <motion.div key={i} className="trz-card rounded-2xl p-4 glow-card"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }} viewport={{ once: true }}>
                <div className="text-xl mb-2">{f.icon}</div>
                <h3 className="text-xs font-extrabold trz-ink mb-1">{f.title}</h3>
                <p className="text-xs trz-muted">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Enquiry form */}
        <section className="py-16 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold trz-ink mb-6 text-center">Corporate Enquiry</h2>
            <form className="trz-card rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={e => e.preventDefault()}>
              <input className="trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300" placeholder="Company Name" />
              <input className="trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300" placeholder="RC Number (CAC)" />
              <input className="trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300" placeholder="Contact Name" />
              <input className="trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300" placeholder="Contact Phone" />
              <input className="trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300" placeholder="Contact Email" />
              <input className="trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300" placeholder="Staff Count" type="number" />
              <select className="trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300">
                <option value="">Shift requirement</option>
                <option>AM only</option>
                <option>PM only</option>
                <option>AM + PM</option>
              </select>
              <input className="trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300" placeholder="Company Address, Lagos" />
              <textarea className="trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300 sm:col-span-2"
                rows={3} placeholder="Additional requirements..." />
              <div className="sm:col-span-2">
                <button type="submit" className="px-8 py-3.5 rounded-full font-bold text-white text-sm hover:scale-105 transition-transform"
                  style={{ background: 'var(--text-main)' }}>
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
