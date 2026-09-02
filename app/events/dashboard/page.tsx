'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function EventsDashboardPage() {
  const [tab, setTab] = useState<'bookings' | 'fleet'>('bookings')

  const bookings = [
    { id: 'EVT-001', name: 'Adeyemi Wedding', date: '12 Oct 2026', vehicles: 'Bus + 2 SUVs', deposit: 'Paid', balance: 'Due 10 Oct' },
    { id: 'EVT-002', name: 'Dangote AGM', date: '20 Oct 2026', vehicles: '3 Sedans', deposit: 'Pending', balance: '—' },
  ]

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--warm-white)' }}>
      <header className="border-b sticky top-0 z-50 flex items-center justify-between px-5 h-14" style={{ background: 'var(--warm-white)', borderColor: 'var(--sage-border)' }}>
        <Image src="/tranzitta-logo.png" alt="Tranzitta" width={110} height={32} className="h-7 w-auto object-contain" />
        <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#7C3AED' }}>EVENTS</span>
      </header>

      <div className="flex-1 p-5 max-w-2xl mx-auto w-full">
        <h2 className="font-extrabold trz-ink mb-5">Events Portal</h2>

        <div className="flex gap-2 mb-5">
          {([['bookings', 'My Bookings'], ['fleet', 'Fleet']] as const).map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={{ background: tab === id ? '#7C3AED' : 'transparent', color: tab === id ? 'white' : 'var(--text-muted)' }}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'bookings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {bookings.map((b, i) => (
              <div key={i} className="trz-card rounded-2xl p-5 border-l-4" style={{ borderLeftColor: '#7C3AED' }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-extrabold trz-ink">{b.name}</div>
                    <div className="text-xs trz-muted mt-0.5">{b.id} · {b.date} · {b.vehicles}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-full font-bold text-white"
                    style={{ background: b.deposit === 'Paid' ? '#1F6B46' : '#D96B1F' }}>
                    Deposit: {b.deposit}
                  </span>
                  {b.balance !== '—' && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold trz-blush-pill">Balance: {b.balance}</span>
                  )}
                </div>
                {b.deposit === 'Pending' && (
                  <button className="mt-3 w-full py-2.5 rounded-xl font-bold text-white text-xs" style={{ background: '#7C3AED' }}>
                    Pay 30% Deposit →
                  </button>
                )}
              </div>
            ))}
            <Link href="/events" className="block w-full py-3 rounded-xl font-bold text-white text-sm text-center" style={{ background: 'var(--orange-deep)' }}>
              + New Event Booking
            </Link>
          </motion.div>
        )}

        {tab === 'fleet' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { type: 'Sedan', count: 8, icon: '🚗' },
                { type: 'SUV', count: 5, icon: '🚙' },
                { type: 'Minibus', count: 3, icon: '🚐' },
                { type: 'Bus', count: 2, icon: '🚌' },
              ].map((v, i) => (
                <div key={i} className="trz-card rounded-2xl p-5 text-center">
                  <div className="text-3xl mb-2">{v.icon}</div>
                  <div className="font-extrabold trz-ink">{v.type}</div>
                  <div className="text-xl font-extrabold mt-1" style={{ color: '#7C3AED' }}>{v.count}</div>
                  <div className="text-xs trz-muted">available</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
