'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function SchoolDashboardPage() {
  const [tab, setTab] = useState<'children' | 'trips' | 'payments'>('children')

  const children = [
    { name: 'Emeka Okonkwo', school: 'Greenfield Int\'l School', driver: 'Chukwuma Eze', status: 'In Transit', eta: '8 min' },
    { name: 'Adaeze Okonkwo', school: 'Greenfield Int\'l School', driver: 'Biodun Akinwale', status: 'At School', eta: null },
  ]

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--warm-white)' }}>
      <header className="border-b sticky top-0 z-50 flex items-center justify-between px-5 h-14" style={{ background: 'var(--warm-white)', borderColor: 'var(--sage-border)' }}>
        <Image src="/tranzitta-logo.png" alt="Tranzitta" width={110} height={32} className="h-7 w-auto object-contain" />
        <Link href="/school" className="text-xs font-semibold trz-muted">← Back</Link>
      </header>

      <div className="flex-1 p-5 max-w-lg mx-auto w-full">
        <h2 className="font-extrabold trz-ink mb-1">Parent Dashboard</h2>
        <p className="text-sm trz-muted mb-5">Mrs Okonkwo · 2 children</p>

        <div className="flex gap-2 mb-5">
          {([['children', 'Children'], ['trips', 'Trips'], ['payments', 'Payments']] as const).map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={{ background: tab === id ? '#1F6B46' : 'transparent', color: tab === id ? 'white' : 'var(--text-muted)' }}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'children' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {children.map((c, i) => (
              <div key={i} className="trz-card rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-extrabold trz-ink">{c.name}</div>
                    <div className="text-xs trz-muted mt-0.5">{c.school}</div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full font-bold text-white"
                    style={{ background: c.status === 'In Transit' ? '#D96B1F' : '#1F6B46' }}>
                    {c.status}
                  </span>
                </div>
                <div className="text-xs trz-muted">Driver: {c.driver}</div>
                {c.eta && <div className="text-sm font-bold mt-1" style={{ color: '#D96B1F' }}>ETA: {c.eta}</div>}
                <button className="mt-3 px-4 py-2 rounded-xl text-xs font-bold text-white w-full" style={{ background: '#1F6B46' }}>
                  Track on Map
                </button>
              </div>
            ))}
          </motion.div>
        )}

        {tab === 'trips' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {[
              { child: 'Emeka', direction: 'AM Pickup', date: 'Today', status: 'Completed' },
              { child: 'Adaeze', direction: 'AM Pickup', date: 'Today', status: 'Completed' },
              { child: 'Emeka', direction: 'PM Dropoff', date: 'Yesterday', status: 'Completed' },
            ].map((t, i) => (
              <div key={i} className="trz-card rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold trz-ink text-sm">{t.child} · {t.direction}</div>
                  <div className="text-xs trz-muted">{t.date}</div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-bold text-white" style={{ background: '#1F6B46' }}>{t.status}</span>
              </div>
            ))}
          </motion.div>
        )}

        {tab === 'payments' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="trz-card rounded-2xl p-5 mb-4">
              <div className="text-xs trz-muted mb-1">Next Payment Due</div>
              <div className="text-2xl font-extrabold trz-ink">₦45,000</div>
              <div className="text-xs trz-muted mt-1">October 2026 — 2 children</div>
              <button className="mt-4 w-full py-3 rounded-xl font-bold text-white text-sm" style={{ background: '#1F6B46' }}>
                Pay Now →
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
