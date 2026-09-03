'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const JOBS = [
  {
    id: 'j1',
    event_type: 'Wedding',
    event_date: '14 Feb 2026',
    pickup_zone: 'Victoria Island, Lagos',
    dropoff_zone: 'Victoria Island, Lagos',
    hours: 6,
    vehicle_type: 'SUV',
    passengers: 48,
    driver_pay: 45000,
    status: 'open',
  },
  {
    id: 'j2',
    event_type: 'Corporate',
    event_date: '28 Mar 2026',
    pickup_zone: 'Central Abuja',
    dropoff_zone: 'Central Abuja',
    hours: 4,
    vehicle_type: 'Sedan',
    passengers: 22,
    driver_pay: 28000,
    status: 'open',
  },
  {
    id: 'j3',
    event_type: 'Celebration',
    event_date: '1 Apr 2026',
    pickup_zone: 'Lekki Phase 1, Lagos',
    dropoff_zone: 'Ikeja GRA, Lagos',
    hours: 5,
    vehicle_type: 'SUV',
    passengers: 16,
    driver_pay: 35000,
    status: 'open',
  },
]

export default function EventsJobsPage() {
  const [bidding, setBidding] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState<string[]>([])

  function handleBid(jobId: string) {
    setSubmitted(s => [...s, jobId])
    setBidding(null)
    setMessage('')
  }

  return (
    <div className="min-h-screen" style={{ background: '#FAFDF7' }}>
      <header className="sticky top-0 z-50 border-b flex items-center justify-between px-5 h-14"
        style={{ background: 'rgba(255,255,255,0.96)', borderColor: '#DDE9D2', backdropFilter: 'blur(12px)' }}>
        <Link href="/events">
          <Image src="/tranzitta-logo.png" alt="Tranzitta" width={110} height={32} className="h-7 w-auto object-contain" />
        </Link>
        <div className="text-sm font-bold" style={{ color: '#D96B1F' }}>Event Jobs — Drivers</div>
      </header>

      <div className="max-w-xl mx-auto px-5 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-black mb-2" style={{ color: '#183024' }}>Open Event Jobs</h1>
          <p className="text-sm" style={{ color: '#65785F' }}>
            Professional event transport. Clock-run billing protects your income. Payment released within 48hrs.
          </p>
        </div>

        <div className="space-y-4">
          {JOBS.map(job => {
            const done = submitted.includes(job.id)
            return (
              <motion.div key={job.id} className="bg-white rounded-2xl border overflow-hidden"
                style={{ borderColor: '#DDE9D2' }}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <div className="px-5 py-4 border-b" style={{ borderColor: '#F1F6EA' }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-extrabold" style={{ color: '#183024' }}>{job.event_type}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#65785F' }}>{job.event_date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-base" style={{ color: '#1F6B46' }}>₦{job.driver_pay.toLocaleString()}</div>
                      <div className="text-xs" style={{ color: '#65785F' }}>driver pay</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 divide-x divide-[#F1F6EA]">
                  {[
                    { label: 'Vehicle', val: job.vehicle_type },
                    { label: 'Hours', val: `${job.hours}h` },
                    { label: 'Passengers', val: job.passengers },
                  ].map((c, i) => (
                    <div key={i} className="px-4 py-3">
                      <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: '#65785F' }}>{c.label}</div>
                      <div className="text-sm font-bold mt-0.5" style={{ color: '#183024' }}>{c.val}</div>
                    </div>
                  ))}
                </div>

                <div className="px-5 py-3 border-t text-xs" style={{ borderColor: '#F1F6EA', color: '#65785F' }}>
                  📍 {job.pickup_zone} → {job.dropoff_zone}
                </div>

                <div className="px-5 py-3 border-t" style={{ borderColor: '#F1F6EA' }}>
                  {done ? (
                    <div className="text-sm font-bold text-center py-2" style={{ color: '#1F6B46' }}>
                      ✓ Bid submitted — ops will review
                    </div>
                  ) : (
                    <button onClick={() => setBidding(bidding === job.id ? null : job.id)}
                      className="w-full py-3 rounded-xl font-bold text-white text-sm"
                      style={{ background: '#183024' }}>
                      Bid for This Job →
                    </button>
                  )}

                  <AnimatePresence>
                    {bidding === job.id && !done && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="mt-3 overflow-hidden">
                        <textarea rows={3}
                          placeholder="Optional: tell ops why you're a great fit — vehicle condition, event experience..."
                          className="w-full rounded-xl border px-4 py-3 text-sm outline-none mb-3"
                          style={{ borderColor: '#DDE9D2', color: '#183024', background: '#F9FBFA' }}
                          value={message} onChange={e => setMessage(e.target.value)} />
                        <button onClick={() => handleBid(job.id)}
                          className="w-full py-3 rounded-xl font-black text-white text-sm"
                          style={{ background: '#1F6B46' }}>
                          Submit Bid →
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-8 rounded-2xl border p-6" style={{ background: 'white', borderColor: '#DDE9D2' }}>
          <h3 className="font-extrabold mb-3" style={{ color: '#183024' }}>Driver Conduct — Events</h3>
          <div className="space-y-2 text-sm" style={{ color: '#65785F' }}>
            {[
              'Arrive 15 minutes before agreed start time',
              'Professional attire — clean, presentable at all times',
              'Never discuss pricing with passengers',
              'Any passenger complaint — call ops immediately, do not engage',
              'Driver cannot cancel within 48hrs without penalty',
              'Payment released within 48hrs of event sign-off',
            ].map((r, i) => (
              <div key={i} className="flex gap-2"><span style={{ color: '#1F6B46' }}>•</span> {r}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
