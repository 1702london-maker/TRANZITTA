'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function CorporateDashboardPage() {
  const [tab, setTab] = useState<'bookings' | 'staff' | 'invoices'>('bookings')

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--warm-white)' }}>
      <header className="border-b sticky top-0 z-50 flex items-center justify-between px-5 h-14" style={{ background: 'var(--warm-white)', borderColor: 'var(--sage-border)' }}>
        <Image src="/tranzitta-logo.png" alt="Tranzitta" width={110} height={32} className="h-7 w-auto object-contain" />
        <span className="text-xs font-bold px-2 py-0.5 rounded-full trz-high-pill">CORPORATE</span>
      </header>

      <div className="flex-1 p-5 max-w-2xl mx-auto w-full">
        <h2 className="font-extrabold trz-ink mb-1">Deloitte Nigeria</h2>
        <p className="text-sm trz-muted mb-5">RC 123456 · 48 staff · AM/PM shifts</p>

        <div className="flex gap-2 mb-5">
          {([['bookings', 'Bookings'], ['staff', 'Staff'], ['invoices', 'Invoices']] as const).map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={{ background: tab === id ? 'var(--text-main)' : 'transparent', color: tab === id ? 'white' : 'var(--text-muted)' }}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'bookings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="trz-card rounded-xl p-4 text-center">
                <div className="text-2xl font-extrabold trz-ink">12</div>
                <div className="text-xs trz-muted">AM Trips Today</div>
              </div>
              <div className="trz-card rounded-xl p-4 text-center">
                <div className="text-2xl font-extrabold trz-orange">12</div>
                <div className="text-xs trz-muted">PM Trips Today</div>
              </div>
            </div>
            {[
              { staff: 'Amaka Osei', shift: 'AM', route: 'Lekki → VI (Deloitte)', status: 'Completed' },
              { staff: 'Kunle Adeyemi', shift: 'PM', route: 'VI (Deloitte) → Ikeja', status: 'Scheduled' },
            ].map((b, i) => (
              <div key={i} className="trz-card rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold trz-ink text-sm">{b.staff}</div>
                  <div className="text-xs trz-muted">{b.shift} · {b.route}</div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-bold text-white"
                  style={{ background: b.status === 'Completed' ? '#1F6B46' : '#D96B1F' }}>
                  {b.status}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {tab === 'staff' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {['Amaka Osei', 'Kunle Adeyemi', 'Chioma Nwachukwu', 'Emeka Obi'].map((name, i) => (
              <div key={i} className="trz-card rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold trz-ink text-sm">{name}</div>
                  <div className="text-xs trz-muted">AM + PM · Active</div>
                </div>
                <button className="text-xs px-3 py-1.5 rounded-xl font-bold trz-blush-pill">Edit</button>
              </div>
            ))}
            <button className="w-full py-3 rounded-xl font-bold text-white text-sm" style={{ background: 'var(--orange-deep)' }}>
              + Add Staff Member
            </button>
          </motion.div>
        )}

        {tab === 'invoices' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {[
              { month: 'September 2026', amount: '₦2,160,000', status: 'Pending' },
              { month: 'August 2026', amount: '₦2,040,000', status: 'Paid' },
            ].map((inv, i) => (
              <div key={i} className="trz-card rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <div className="font-bold trz-ink">{inv.month}</div>
                  <div className="text-sm font-extrabold mt-1 trz-orange">{inv.amount}</div>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-xs px-2.5 py-1 rounded-full font-bold text-white"
                    style={{ background: inv.status === 'Paid' ? '#1F6B46' : '#D96B1F' }}>
                    {inv.status}
                  </span>
                  {inv.status === 'Pending' && (
                    <button className="px-3 py-1.5 rounded-xl text-xs font-bold text-white" style={{ background: 'var(--orange-deep)' }}>Pay</button>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
