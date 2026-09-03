'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

type Job = {
  id: string; school_name: string; pickup_zone: string; children_count: number;
  term_start: string; term_end: string; morning_time: string; afternoon_time: string;
  vehicle_requirement: string; weekly_wage: number; fuel_covered: boolean; posted_at: string;
}

const MOCK_JOBS: Job[] = [
  { id: 'j1', school_name: 'Greenfield International School', pickup_zone: 'Lekki Phase 1 & 2', children_count: 3, term_start: '2026-09-08', term_end: '2026-11-28', morning_time: '07:00', afternoon_time: '14:00', vehicle_requirement: 'Premium Sedan (max 5 years)', weekly_wage: 20000, fuel_covered: true, posted_at: '2026-09-01' },
  { id: 'j2', school_name: 'Corona School Victoria Island', pickup_zone: 'Ikoyi & Banana Island', children_count: 2, term_start: '2026-09-08', term_end: '2026-11-28', morning_time: '06:45', afternoon_time: '13:30', vehicle_requirement: 'SUV (max 5 years)', weekly_wage: 20000, fuel_covered: true, posted_at: '2026-09-02' },
  { id: 'j3', school_name: 'Atlantic Hall', pickup_zone: 'Epe & Ibeju-Lekki', children_count: 3, term_start: '2026-09-15', term_end: '2026-12-05', morning_time: '05:30', afternoon_time: '15:00', vehicle_requirement: 'Premium Sedan or SUV', weekly_wage: 20000, fuel_covered: true, posted_at: '2026-09-03' },
]

export default function SchoolJobsPage() {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS)
  const [bidding, setBidding] = useState<string | null>(null)
  const [bidMsg, setBidMsg] = useState('')
  const [submitted, setSubmitted] = useState<string[]>([])

  const submitBid = async (jobId: string) => {
    await fetch(`/api/school/jobs/${jobId}/bid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ driver_id: 'demo-driver', message: bidMsg })
    })
    setSubmitted(s => [...s, jobId])
    setBidding(null)
    setBidMsg('')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F4F9F5' }}>
      <header className="sticky top-0 z-50 flex items-center justify-between px-5 h-14 border-b"
        style={{ background: 'rgba(255,255,255,0.96)', borderColor: '#DDE9D2' }}>
        <Image src="/tranzitta-logo.png" alt="Tranzitta" width={110} height={32} className="h-7 w-auto object-contain" />
        <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: '#1F6B46' }}>School Driver Jobs</span>
      </header>

      <div className="max-w-2xl mx-auto w-full px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold" style={{ color: '#183024' }}>School Route Jobs</h1>
          <p className="text-sm mt-1" style={{ color: '#65785F' }}>
            Dedicated term-based routes. Fixed weekly wage of ₦20,000. Fuel covered by Tranzitta.
          </p>
        </div>

        {/* Info strip */}
        <div className="rounded-2xl p-5 mb-6 grid grid-cols-3 gap-4"
          style={{ background: '#183024' }}>
          {[['₦20,000', 'Weekly wage'], ['Fuel included', 'Covered by Tranzitta'], ['1 term', 'Commitment']].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="font-extrabold text-white">{v}</div>
              <div className="text-xs mt-0.5" style={{ color: '#A8C09A' }}>{l}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {jobs.map((job, i) => (
            <motion.div key={job.id} className="bg-white rounded-2xl border overflow-hidden"
              style={{ borderColor: '#DDE9D2' }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <div className="px-5 py-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-extrabold" style={{ color: '#183024' }}>{job.school_name}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#65785F' }}>Pickup zone: {job.pickup_zone}</div>
                  </div>
                  <span className="flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-bold text-white"
                    style={{ background: '#1F6B46' }}>Open</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    ['👶 Children', `${job.children_count} (max 3)`],
                    ['🚗 Vehicle', job.vehicle_requirement],
                    ['🌅 Morning', job.morning_time],
                    ['🌇 Afternoon', job.afternoon_time],
                    ['📅 Term start', job.term_start],
                    ['⛽ Fuel', 'Covered ✓'],
                  ].map(([label, val]) => (
                    <div key={label} className="text-xs">
                      <span style={{ color: '#65785F' }}>{label}:</span>{' '}
                      <span className="font-bold" style={{ color: '#183024' }}>{val}</span>
                    </div>
                  ))}
                </div>

                {submitted.includes(job.id) ? (
                  <div className="w-full py-3 rounded-xl text-xs font-bold text-center" style={{ background: '#F1F6EA', color: '#1F6B46' }}>
                    ✓ Bid submitted — ops will review
                  </div>
                ) : bidding === job.id ? (
                  <div>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl text-sm border outline-none mb-3 resize-none"
                      style={{ borderColor: '#DDE9D2' }} rows={3}
                      placeholder="Tell ops why you're a great fit for this route (vehicle, experience, area knowledge)..."
                      value={bidMsg} onChange={e => setBidMsg(e.target.value)} />
                    <div className="flex gap-2">
                      <button onClick={() => setBidding(null)}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold border"
                        style={{ borderColor: '#DDE9D2', color: '#65785F' }}>Cancel</button>
                      <button onClick={() => submitBid(job.id)}
                        className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white"
                        style={{ background: '#1F6B46' }}>Submit Bid →</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setBidding(job.id)}
                    className="w-full py-3 rounded-xl text-sm font-bold text-white hover:scale-105 transition-transform"
                    style={{ background: '#1F6B46' }}>
                    Bid on This Route →
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs mt-8" style={{ color: '#A8C09A' }}>
          Driver for Tranzitta School? <Link href="/driver" className="font-bold" style={{ color: '#1F6B46' }}>Apply here first →</Link>
        </p>
      </div>
    </div>
  )
}
