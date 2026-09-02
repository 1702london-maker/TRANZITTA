'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function DriverDashboardPage() {
  const [online, setOnline] = useState(false)
  const [tab, setTab] = useState<'home' | 'trips' | 'earnings'>('home')

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--warm-white)' }}>
      <header className="trz-dashboard-header border-b sticky top-0 z-50 flex items-center justify-between px-5 h-14" style={{ borderColor: 'var(--sage-border)' }}>
        <Image src="/tranzitta-logo.png" alt="Tranzitta" width={110} height={32} className="h-7 w-auto object-contain" />
        <div className="flex items-center gap-3">
          <button onClick={() => setOnline(o => !o)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white transition-all"
            style={{ background: online ? '#1F6B46' : '#9CA3AF' }}>
            <span className={`w-2 h-2 rounded-full ${online ? 'bg-white animate-pulse' : 'bg-white/60'}`} />
            {online ? 'Online' : 'Offline'}
          </button>
        </div>
      </header>

      <div className="flex-1 p-5 max-w-lg mx-auto w-full">
        {tab === 'home' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-extrabold trz-ink mb-1">Good morning, Chukwuma</h2>
            <p className="text-sm trz-muted mb-6">Tap Online to start receiving trips</p>

            <div className="trz-card rounded-2xl p-6 mb-5">
              <div className="text-xs trz-muted mb-1">Today&apos;s Earnings</div>
              <div className="text-4xl font-extrabold trz-ink">₦18,400</div>
              <div className="text-sm trz-muted mt-1">7 trips · 85% of ₦21,647 collected</div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-5">
              {[['7', 'Trips'], ['4.9', 'Rating'], ['2h', 'Online']].map(([v, l]) => (
                <div key={l} className="trz-card rounded-xl p-3 text-center">
                  <div className="text-xl font-extrabold trz-orange">{v}</div>
                  <div className="text-xs trz-muted">{l}</div>
                </div>
              ))}
            </div>

            {online ? (
              <div className="trz-card rounded-2xl p-8 text-center border-2 border-dashed" style={{ borderColor: 'var(--africa-green)' }}>
                <div className="text-3xl mb-2 animate-pulse">🚗</div>
                <p className="font-bold trz-ink">Waiting for trips…</p>
                <p className="text-xs trz-muted mt-1">Listening for nearby requests</p>
              </div>
            ) : (
              <div className="trz-card rounded-2xl p-8 text-center border-2 border-dashed" style={{ borderColor: 'var(--sage-border)' }}>
                <div className="text-3xl mb-2">💤</div>
                <p className="font-bold trz-ink">You are Offline</p>
                <p className="text-xs trz-muted mt-1">Tap Online above to receive trips</p>
              </div>
            )}
          </motion.div>
        )}

        {tab === 'trips' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-extrabold trz-ink mb-4">Trip History</h2>
            {[
              { id: 'TZ-0001', route: 'Lekki → VI', fare: '₦3,400', time: '09:12', status: 'completed' },
              { id: 'TZ-0002', route: 'Surulere → Ikeja', fare: '₦4,100', time: '11:05', status: 'completed' },
              { id: 'TZ-0003', route: 'MMIA → Ikoyi', fare: '₦8,500', time: '14:45', status: 'completed' },
            ].map(t => (
              <div key={t.id} className="trz-card rounded-2xl p-4 mb-3 flex items-center justify-between">
                <div>
                  <div className="font-bold trz-ink text-sm">{t.route}</div>
                  <div className="text-xs trz-muted mt-0.5">{t.id} · {t.time}</div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold trz-orange">{t.fare}</div>
                  <div className="text-xs trz-muted capitalize">{t.status}</div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {tab === 'earnings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-extrabold trz-ink mb-4">Earnings</h2>
            <div className="trz-card rounded-2xl p-6 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm trz-muted">This Week</span>
                <span className="font-extrabold trz-ink">₦94,200</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm trz-muted">This Month</span>
                <span className="font-extrabold trz-ink">₦386,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm trz-muted">Pending Payout</span>
                <span className="font-extrabold" style={{ color: 'var(--africa-green)' }}>₦18,400</span>
              </div>
            </div>
            <button className="w-full py-3.5 rounded-xl font-bold text-white text-sm" style={{ background: 'var(--orange-deep)' }}>
              Request Payout →
            </button>
          </motion.div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="border-t flex" style={{ borderColor: 'var(--sage-border)', background: 'var(--warm-white)' }}>
        {([['home', '🏠', 'Home'], ['trips', '🗺️', 'Trips'], ['earnings', '💰', 'Earnings']] as const).map(([id, icon, label]) => (
          <button key={id} onClick={() => setTab(id as any)}
            className="flex-1 py-3 flex flex-col items-center gap-0.5 text-xs font-bold transition-all"
            style={{ color: tab === id ? 'var(--orange-deep)' : 'var(--text-muted)' }}>
            <span>{icon}</span>{label}
          </button>
        ))}
      </div>
    </div>
  )
}
