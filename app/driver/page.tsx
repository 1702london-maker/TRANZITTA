'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const STEPS = [
  { icon: '📱', title: 'Apply Online', desc: 'Fill your personal details, NIN, home address and the verticals you want to serve.' },
  { icon: '📋', title: 'Upload Documents', desc: 'Driver\'s licence, police clearance, vehicle photos, insurance, roadworthiness cert.' },
  { icon: '🔍', title: 'Ops Review', desc: 'Our team verifies everything including your home address. Usually 24–48 hours.' },
  { icon: '📹', title: 'Camera Installed', desc: 'We confirm in-car camera installation before activating your account.' },
  { icon: '🟢', title: 'Go Online', desc: 'Activate on your chosen verticals. Start earning 85% of every fare.' },
]

export default function DriverPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: '', phone: '', nin: '', address: '', license: '', verticals: [] as string[] })

  const toggleVertical = (v: string) => {
    setForm(f => ({
      ...f, verticals: f.verticals.includes(v) ? f.verticals.filter(x => x !== v) : [...f.verticals, v]
    }))
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 54 }}>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex flex-col lg:flex-row items-center gap-12 px-4 py-24 max-w-7xl mx-auto">
          <div className="flex-1">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 trz-blush-pill"
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Driver Applications Open
            </motion.div>
            <motion.h1 className="text-4xl sm:text-5xl font-extrabold trz-ink mb-5 leading-tight"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              Drive With Tranzitta.<br /><span style={{ color: 'var(--orange-deep)' }}>Keep 85%.</span>
            </motion.h1>
            <motion.p className="text-base trz-muted mb-8 max-w-lg leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              Nigeria&apos;s most driver-friendly platform. 15% commission, not 25–30%. Serve Go, School, Corporate, Events and Airport from one app. We support your vetting process.
            </motion.p>
            <motion.div className="grid grid-cols-3 gap-4 max-w-xs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              {[['85%', 'You keep'], ['5', 'Verticals'], ['24/7', 'Support']].map(([v, l]) => (
                <div key={l} className="trz-card rounded-xl p-3 text-center">
                  <div className="text-xl font-extrabold trz-orange">{v}</div>
                  <div className="text-xs trz-muted">{l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Application form */}
          <motion.div className="w-full max-w-md gradient-frame rounded-2xl p-7"
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="font-extrabold trz-ink mb-5 text-lg">Driver Application</h2>
            <div className="space-y-3 mb-5">
              <input className="w-full trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="Full Legal Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <div className="flex gap-2">
                <span className="trz-input rounded-xl px-3 py-3 text-sm font-bold flex items-center">+234</span>
                <input className="flex-1 trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300"
                  placeholder="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} type="tel" />
              </div>
              <input className="w-full trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="NIN (National ID Number)" value={form.nin} onChange={e => setForm(f => ({ ...f, nin: e.target.value }))} />
              <input className="w-full trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="Home Address (full)" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
              <input className="w-full trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="Driver's Licence Number" value={form.license} onChange={e => setForm(f => ({ ...f, license: e.target.value }))} />
            </div>
            <p className="text-xs font-semibold trz-muted mb-2">Verticals (select all that apply)</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {['Go', 'School', 'Corporate', 'Events', 'Airport'].map(v => (
                <button key={v} onClick={() => toggleVertical(v)}
                  className="px-3 py-1.5 rounded-full text-xs font-bold border transition-all"
                  style={{
                    background: form.verticals.includes(v) ? 'var(--orange-deep)' : 'transparent',
                    color: form.verticals.includes(v) ? 'white' : 'var(--text-muted)',
                    borderColor: form.verticals.includes(v) ? 'var(--orange-deep)' : 'var(--sage-border)',
                  }}>
                  {v}
                </button>
              ))}
            </div>
            <button className="w-full py-3.5 rounded-xl font-bold text-white text-sm hover:scale-105 transition-transform"
              style={{ background: 'var(--orange-deep)' }}>
              Submit Application →
            </button>
            <p className="text-xs trz-muted text-center mt-3">Already applied? <Link href="/driver/dashboard" className="trz-orange font-semibold">Check status</Link></p>
          </motion.div>
        </section>

        {/* Vetting steps */}
        <section className="py-16 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-extrabold trz-ink mb-8 text-center">Our Vetting Process</h2>
            <div className="space-y-4">
              {STEPS.map((s, i) => (
                <motion.div key={i} className="flex gap-5 trz-card rounded-2xl p-5 items-center"
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 trz-blush-card">{s.icon}</div>
                  <div>
                    <h3 className="font-extrabold trz-ink text-sm">{s.title}</h3>
                    <p className="text-xs trz-muted mt-0.5">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
