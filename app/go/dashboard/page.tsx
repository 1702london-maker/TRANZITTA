'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type TabKey = 'active' | 'track' | 'history' | 'account'

const MOCK_TRIP = {
  id: 'tr-7821-a',
  tier: 'go',
  status: 'driver_en_route',
  pickup: 'Murtala Mohammed Way, Victoria Island',
  dropoff: 'Lekki Phase 1, Lagos',
  estimated_fare: 4200,
  surge_multiplier: 1.2,
  payment_method: 'card_hold',
  driver: {
    name: 'Taiwo Kolawole',
    initials: 'TK',
    vehicle: 'Toyota Corolla — Silver',
    plate: 'ABJ-405-KL',
    rating: 4.8,
    eta_min: 4,
    verified: true,
  },
  rider_verified: false,
  driver_verified: false,
}

const MOCK_HISTORY = [
  { id: 'tr-7690', date: '2026-08-28', tier: 'executive', from: 'Ikoyi', to: 'Murtala Muhammed Airport', fare: 8500, status: 'completed', rating: 5 },
  { id: 'tr-7512', date: '2026-08-14', tier: 'go', from: 'Yaba', to: 'Victoria Island', fare: 3200, status: 'completed', rating: 4 },
  { id: 'tr-7401', date: '2026-07-30', tier: 'go', from: 'Lekki', to: 'Surulere', fare: 4100, status: 'completed', rating: 5 },
]

const MOCK_ACCOUNT = {
  name: 'Adaora Okafor',
  phone: '+234 810 234 5678',
  bvn_verified: true,
  nin_verified: true,
  liveness_status: 'verified',
  liveness_next_due: '2026-11-15',
  profile_photo: true,
  agreement_signed: true,
  verification_status: 'verified',
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  requested: { label: 'Searching for driver...', color: '#65785F' },
  matched: { label: 'Driver Matched', color: '#1F6B46' },
  driver_en_route: { label: 'Driver En Route', color: '#D96B1F' },
  verified: { label: 'Verified — In Progress', color: '#1F6B46' },
  in_progress: { label: 'In Progress', color: '#1F6B46' },
  completed: { label: 'Completed', color: '#65785F' },
}

export default function GoDashboardPage() {
  const [tab, setTab] = useState<TabKey>('active')
  const [trip, setTrip] = useState(MOCK_TRIP)

  const st = STATUS_LABELS[trip.status]

  const confirmDriver = () => {
    setTrip(t => ({ ...t, rider_verified: true }))
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-28" style={{ paddingTop: 90, background: 'var(--warm-white)' }}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center py-8">
            <h1 className="text-2xl font-black mb-1" style={{ color: '#183024' }}>My Rides</h1>
            <p className="text-sm" style={{ color: '#65785F' }}>Live tracking · Trip history · Account verification</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1.5 mb-6 overflow-x-auto">
            {([
              { key: 'active', label: '🚗 Active' },
              { key: 'track', label: '📍 Track' },
              { key: 'history', label: '📋 History' },
              { key: 'account', label: '🪪 Account' },
            ] as { key: TabKey; label: string }[]).map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className="flex-1 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex-shrink-0 whitespace-nowrap px-2"
                style={{ background: tab === t.key ? '#183024' : '#F1F6EA', color: tab === t.key ? 'white' : '#65785F' }}>
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>

              {/* ACTIVE TAB */}
              {tab === 'active' && (
                <div className="space-y-4">
                  <div className="rounded-2xl border overflow-hidden" style={{ background: 'white', borderColor: '#DDE9D2' }}>
                    <div className="px-5 py-4 flex items-center justify-between border-b" style={{ borderColor: '#DDE9D2', background: '#F1F6EA' }}>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wide" style={{ color: '#65785F' }}>
                          {trip.tier === 'go' ? '🚗 Tranzitta Go' : '⭐ Executive'}
                        </div>
                        <div className="font-extrabold" style={{ color: '#183024' }}>{trip.pickup.split(',')[0]} → {trip.dropoff.split(',')[0]}</div>
                      </div>
                      <div className="text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{ background: st.color }}>
                        {st.label}
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      {/* Driver */}
                      <div className="flex items-center gap-4 p-4 rounded-xl border" style={{ borderColor: '#DDE9D2' }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black"
                          style={{ background: '#183024' }}>{trip.driver.initials}</div>
                        <div className="flex-1">
                          <div className="font-extrabold" style={{ color: '#183024' }}>{trip.driver.name}</div>
                          <div className="text-sm" style={{ color: '#65785F' }}>{trip.driver.vehicle} · {trip.driver.plate}</div>
                          <div className="text-sm font-bold" style={{ color: '#D96B1F' }}>⭐ {trip.driver.rating} · BVN Verified ✓</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs" style={{ color: '#65785F' }}>ETA</div>
                          <div className="text-xl font-black" style={{ color: '#183024' }}>{trip.driver.eta_min} min</div>
                        </div>
                      </div>

                      {/* Verification */}
                      <div className="rounded-xl p-4 border" style={{ borderColor: '#DDE9D2', background: '#FAFDF7' }}>
                        <div className="text-sm font-bold mb-3" style={{ color: '#183024' }}>Mutual Verification</div>
                        <div className="space-y-2">
                          {[
                            { label: 'Driver checked your photo', done: trip.driver_verified },
                            { label: 'You confirmed driver details', done: trip.rider_verified },
                          ].map((v, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <span className="text-sm" style={{ color: '#65785F' }}>{v.label}</span>
                              <span className={`text-sm font-bold ${v.done ? '' : 'opacity-40'}`} style={{ color: v.done ? '#1F6B46' : '#65785F' }}>
                                {v.done ? '✓ Done' : '○ Pending'}
                              </span>
                            </div>
                          ))}
                        </div>
                        {!trip.rider_verified && (
                          <button onClick={confirmDriver}
                            className="w-full mt-4 py-2.5 rounded-xl font-bold text-sm text-white"
                            style={{ background: '#183024' }}>
                            Confirm Driver — Plate {trip.driver.plate} →
                          </button>
                        )}
                        {trip.rider_verified && !trip.driver_verified && (
                          <div className="mt-3 text-xs text-center" style={{ color: '#65785F' }}>
                            Waiting for driver to confirm your photo
                          </div>
                        )}
                      </div>

                      {/* Fare */}
                      <div className="flex justify-between items-center px-4 py-3 rounded-xl" style={{ background: '#F1F6EA' }}>
                        <div>
                          <div className="text-xs" style={{ color: '#65785F' }}>Card Hold</div>
                          <div className="font-black" style={{ color: '#183024' }}>₦{trip.estimated_fare.toLocaleString()}</div>
                        </div>
                        {trip.surge_multiplier > 1 && (
                          <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: '#FFF0E4', color: '#D96B1F' }}>
                            ⚡ {trip.surge_multiplier}x Surge
                          </span>
                        )}
                        <div className="text-xs" style={{ color: '#65785F' }}>Actual charged at end</div>
                      </div>

                      <button onClick={() => setTab('track')}
                        className="w-full py-3 rounded-xl font-bold text-white text-sm"
                        style={{ background: '#1F6B46' }}>
                        Track Live →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TRACK TAB */}
              {tab === 'track' && (
                <div className="space-y-4">
                  {/* Live map */}
                  <div className="rounded-2xl overflow-hidden relative" style={{ height: 220, background: 'linear-gradient(180deg, #D4EBDC, #B8DFCA)' }}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <div className="text-6xl">🗺️</div>
                    </div>
                    <motion.div className="absolute text-2xl" style={{ left: '20%', top: '50%' }}
                      animate={{ x: [0, 60, 120] }} transition={{ duration: 10, repeat: Infinity }}>🚗</motion.div>
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 text-2xl">📍</div>
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#1F6B46' }}>
                      ● Live — updates every 10s
                    </div>
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'white', color: '#183024' }}>
                      {trip.driver.eta_min} min ETA
                    </div>
                  </div>

                  {/* Driver brief */}
                  <div className="rounded-2xl border p-5" style={{ background: 'white', borderColor: '#DDE9D2' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-sm" style={{ background: '#183024' }}>
                        {trip.driver.initials}
                      </div>
                      <div>
                        <div className="font-extrabold" style={{ color: '#183024' }}>{trip.driver.name}</div>
                        <div className="text-sm" style={{ color: '#65785F' }}>{trip.driver.plate} · {trip.driver.vehicle}</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 py-2.5 rounded-xl font-bold text-white text-sm" style={{ background: '#183024' }}>
                        📞 Call Driver
                      </button>
                      <button className="flex-1 py-2.5 rounded-xl font-bold text-sm border-2" style={{ color: '#183024', borderColor: '#DDE9D2' }}>
                        👁 Share Trip
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl p-4 text-sm text-center" style={{ background: '#FEE2E2', color: '#DC2626' }}>
                    <div className="font-bold mb-1">🚨 Panic Button</div>
                    <div className="text-xs">Press to alert ops and trusted contacts immediately — camera footage preserved</div>
                  </div>
                </div>
              )}

              {/* HISTORY TAB */}
              {tab === 'history' && (
                <div className="space-y-3">
                  {MOCK_HISTORY.map((h, i) => (
                    <motion.div key={h.id} className="rounded-2xl border p-5" style={{ background: 'white', borderColor: '#DDE9D2' }}
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-extrabold text-sm" style={{ color: '#183024' }}>
                            {h.tier === 'executive' ? '⭐ Executive' : '🚗 Go'} · {h.from} → {h.to}
                          </div>
                          <div className="text-xs" style={{ color: '#65785F' }}>{h.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-black" style={{ color: '#183024' }}>₦{h.fare.toLocaleString()}</div>
                          <div className="text-xs" style={{ color: '#D96B1F' }}>{'⭐'.repeat(h.rating)}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div className="text-center pt-4">
                    <Link href="/go/book"
                      className="inline-block px-6 py-3 rounded-full font-bold text-white text-sm"
                      style={{ background: '#D96B1F' }}>
                      Book Another Ride →
                    </Link>
                  </div>
                </div>
              )}

              {/* ACCOUNT TAB */}
              {tab === 'account' && (
                <div className="space-y-4">
                  <div className="rounded-2xl border p-6" style={{ background: 'white', borderColor: '#DDE9D2' }}>
                    <div className="font-extrabold mb-4" style={{ color: '#183024' }}>{MOCK_ACCOUNT.name}</div>
                    <div className="text-sm mb-6" style={{ color: '#65785F' }}>{MOCK_ACCOUNT.phone}</div>
                    <div className="space-y-3">
                      {[
                        { label: 'BVN Verified', done: MOCK_ACCOUNT.bvn_verified },
                        { label: 'NIN / ID Verified', done: MOCK_ACCOUNT.nin_verified },
                        { label: 'Liveness Check', done: MOCK_ACCOUNT.liveness_status === 'verified' },
                        { label: 'Profile Photo', done: MOCK_ACCOUNT.profile_photo },
                        { label: 'User Agreement Signed', done: MOCK_ACCOUNT.agreement_signed },
                      ].map((v, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: '#F1F6EA' }}>
                          <span className="text-sm" style={{ color: '#65785F' }}>{v.label}</span>
                          <span className="text-sm font-bold" style={{ color: v.done ? '#1F6B46' : '#DC2626' }}>
                            {v.done ? '✓ Verified' : '✗ Required'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border p-5" style={{ background: '#F1F6EA', borderColor: '#DDE9D2' }}>
                    <div className="text-sm font-bold mb-1" style={{ color: '#183024' }}>Liveness Re-check Due</div>
                    <div className="text-sm" style={{ color: '#65785F' }}>
                      {MOCK_ACCOUNT.liveness_next_due} — you&apos;ll be notified 7 days before. Takes under 2 minutes.
                    </div>
                  </div>
                  <div className="rounded-2xl border p-5" style={{ background: 'white', borderColor: '#DDE9D2' }}>
                    <div className="text-sm font-bold mb-2" style={{ color: '#183024' }}>Verification Status</div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold"
                      style={{ background: '#F1F6EA', color: '#1F6B46' }}>
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Fully Verified — Bookings Enabled
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  )
}
