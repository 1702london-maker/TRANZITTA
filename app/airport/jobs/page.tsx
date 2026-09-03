'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const JOBS = [
  {
    id: 'aj-001',
    title: 'Airport Transfer — Arrivals',
    date: 'Monday, 8 Sep 2026',
    time: '14:00 – 17:00',
    shift_hours: 3,
    terminal: 'International',
    vehicle: 'Premium Sedan or SUV',
    zone: 'Zone 3 — Victoria Island',
    driver_pay: 'Rate shown on application',
    meet_greet: 'Inside Terminal',
    requirements: ['Rating 4.7+', 'Executive vehicle', 'Police clearance'],
  },
  {
    id: 'aj-002',
    title: 'Airport Transfer — Departures',
    date: 'Tuesday, 9 Sep 2026',
    time: '05:30 – 08:30',
    shift_hours: 3,
    terminal: 'International',
    vehicle: 'Executive SUV',
    zone: 'Zone 4 — Lekki',
    driver_pay: 'Rate shown on application',
    meet_greet: 'Kerbside',
    requirements: ['Rating 4.8+', 'Executive SUV required', 'Police clearance', 'Luggage: 4 large pieces'],
  },
  {
    id: 'aj-003',
    title: 'Airport Transfer — Arrivals',
    date: 'Tuesday, 9 Sep 2026',
    time: '18:30 – 21:30',
    shift_hours: 3,
    terminal: 'Domestic',
    vehicle: 'Premium Sedan',
    zone: 'Zone 1 — Ikeja',
    driver_pay: 'Rate shown on application',
    meet_greet: 'Kerbside',
    requirements: ['Rating 4.7+', 'Executive vehicle', 'Police clearance'],
  },
]

export default function AirportJobsPage() {
  const [appliedId, setAppliedId] = useState<string | null>(null)
  const [bidJobId, setBidJobId] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleApply = async (jobId: string) => {
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 900))
    setAppliedId(jobId)
    setBidJobId(null)
    setMessage('')
    setSubmitting(false)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 pb-24" style={{ paddingTop: 90, background: 'var(--warm-white)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center py-10">
            <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }}>For Drivers</div>
            <h1 className="text-4xl font-black mb-3" style={{ color: '#183024' }}>Airport Jobs</h1>
            <p className="text-base max-w-md mx-auto" style={{ color: '#65785F' }}>
              Executive airport transfers. Fixed fares. Waiting time protected. Minimum 4.7 rating required.
            </p>
          </div>

          {/* Requirements banner */}
          <div className="rounded-2xl border p-5 mb-8" style={{ background: '#F1F6EA', borderColor: '#DDE9D2' }}>
            <div className="text-sm font-extrabold mb-3" style={{ color: '#183024' }}>Requirements for Airport Jobs</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                '⭐ Rating minimum 4.7',
                '🚗 Executive vehicle — max 3 years old',
                '📋 NIN verified on Tranzitta',
                '🛡 Police clearance certificate',
                '📱 Fully charged phone with active data',
                '🪪 Name board (physical or digital)',
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-2 text-xs font-semibold" style={{ color: '#183024' }}>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Job cards */}
          <div className="space-y-5">
            {JOBS.map((job, i) => (
              <motion.div key={job.id} className="rounded-2xl border overflow-hidden"
                style={{ background: 'white', borderColor: '#DDE9D2' }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="px-6 py-4 flex items-start justify-between gap-4 border-b" style={{ borderColor: '#F1F6EA', background: '#FAFDF7' }}>
                  <div>
                    <div className="font-extrabold" style={{ color: '#183024' }}>{job.title}</div>
                    <div className="text-sm" style={{ color: '#65785F' }}>{job.date} · {job.time}</div>
                  </div>
                  <div className="text-xs px-2 py-1 rounded-full font-bold flex-shrink-0" style={{ background: '#F1F6EA', color: '#1F6B46' }}>
                    ✈ {job.terminal}
                  </div>
                </div>
                <div className="px-6 py-4 space-y-2.5">
                  {[
                    { label: 'Shift', val: `${job.shift_hours} hours — ${job.time}` },
                    { label: 'Vehicle', val: job.vehicle },
                    { label: 'Zone', val: job.zone },
                    { label: 'Meet & Greet', val: job.meet_greet },
                    { label: 'Driver Pay', val: job.driver_pay },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between text-sm">
                      <span style={{ color: '#65785F' }}>{r.label}</span>
                      <span className="font-semibold" style={{ color: '#183024' }}>{r.val}</span>
                    </div>
                  ))}
                  <div className="pt-2">
                    <div className="text-xs font-bold mb-1.5" style={{ color: '#65785F' }}>Requirements</div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.requirements.map((r, j) => (
                        <span key={j} className="text-[11px] px-2.5 py-1 rounded-full font-bold"
                          style={{ background: '#F1F6EA', color: '#1F6B46' }}>✓ {r}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-5">
                  {appliedId === job.id ? (
                    <div className="py-3 rounded-xl text-center text-sm font-bold" style={{ background: '#F1F6EA', color: '#1F6B46' }}>
                      ✓ Application submitted — ops will confirm within 2 hours
                    </div>
                  ) : bidJobId === job.id ? (
                    <AnimatePresence>
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
                        <textarea rows={3} placeholder="Optional message to ops (vehicle details, questions)..."
                          value={message} onChange={e => setMessage(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                          style={{ borderColor: '#DDE9D2', background: '#FAFDF7', color: '#183024' }} />
                        <div className="flex gap-2">
                          <button onClick={() => setBidJobId(null)}
                            className="flex-1 py-2.5 rounded-xl font-bold text-sm border-2"
                            style={{ color: '#65785F', borderColor: '#DDE9D2' }}>
                            Cancel
                          </button>
                          <button onClick={() => handleApply(job.id)} disabled={submitting}
                            className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white transition-all"
                            style={{ background: submitting ? '#DDE9D2' : '#D96B1F' }}>
                            {submitting ? 'Applying...' : 'Submit Application'}
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <button onClick={() => setBidJobId(job.id)}
                      className="w-full py-3 rounded-xl font-bold text-white text-sm"
                      style={{ background: '#183024' }}>
                      Apply for This Job →
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-10 p-5 rounded-2xl text-center text-sm" style={{ background: '#F1F6EA', color: '#65785F' }}>
            Airport jobs are the highest-rated vertical on Tranzitta. Waiting time is fully protected — metered and billed per hour. Payment released within 48 hours of trip completion.
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
