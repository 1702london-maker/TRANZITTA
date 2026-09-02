'use client'
import { motion } from 'framer-motion'

const SAFETY = [
  { icon: '🔵', title: 'Police Clearance', desc: 'Every driver submits a police clearance certificate. Verified by our ops team before activation.' },
  { icon: '🆔', title: 'NIN Verification', desc: 'National Identity Number verified against government records. Home address confirmed by ops.' },
  { icon: '📹', title: 'In-Car Camera', desc: 'Every vehicle has a camera installed and confirmed before going live. Feed accessible to ops during any active trip.' },
  { icon: '🚨', title: 'Panic Button', desc: 'One tap from rider, parent or staff triggers a live alert to our ops team, SMS to trusted contacts, and police escalation if needed.' },
  { icon: '📍', title: 'GPS Every 10s', desc: 'Location snapshots stored every 10 seconds. Share live tracking links with family via WhatsApp or SMS.' },
  { icon: '📋', title: 'Lagos State API', desc: 'Daily compliance reports pushed to Lagos State transport authority. Regulatory armour built in.' },
]

export default function SafetySection() {
  return (
    <section id="safety" className="py-20 px-4" style={{ background: 'var(--warm-white)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 trz-high-pill">Safety First</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold trz-ink mb-4">The Safest Rides In Nigeria</h2>
          <p className="text-base trz-muted max-w-xl mx-auto">
            Every driver, every vehicle, every trip — built around one principle: your safety is non-negotiable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAFETY.map((s, i) => (
            <motion.div key={i}
              className="trz-card rounded-2xl p-6 glow-card"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }} viewport={{ once: true }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 trz-blush-card">{s.icon}</div>
              <h3 className="font-extrabold trz-ink mb-2">{s.title}</h3>
              <p className="text-sm trz-muted leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Panic flow visual */}
        <motion.div className="mt-12 gradient-frame rounded-2xl p-8"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="font-extrabold trz-ink text-xl mb-6 text-center">Panic Button — What Happens</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {[
              { step: '1', label: 'User taps panic', icon: '🔴' },
              { step: '2', label: 'Ops alerted instantly', icon: '📊' },
              { step: '3', label: 'Trusted contacts SMS', icon: '📱' },
              { step: '4', label: 'Ops calls within 60s', icon: '📞' },
              { step: '5', label: 'Police if needed', icon: '🚔' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white"
                    style={{ background: 'var(--orange-deep)' }}>
                    {s.icon}
                  </div>
                  <span className="text-xs font-semibold trz-muted mt-2 text-center max-w-20">{s.label}</span>
                </div>
                {i < 4 && <div className="hidden sm:block w-8 h-0.5" style={{ background: 'var(--sage-border)' }} />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
