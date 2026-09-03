'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type TabKey = 'bookings' | 'track' | 'history'

const MOCK_ACTIVE = {
  id: 'bk-9831-a',
  direction: 'arrival',
  flight_number: 'QR 1421',
  airline: 'Qatar Airways',
  terminal: 'International',
  destination_zone: 'Zone 3',
  destination_address: 'Victoria Island, Lagos',
  meet_greet: 'inside_terminal',
  status: 'driver_dispatched',
  flight_status: 'on_time',
  scheduled_time: '14:30',
  estimated_time: '14:28',
  driver: {
    name: 'Adewale Ogundimu',
    initials: 'AO',
    vehicle: 'Mercedes E-Class',
    plate: 'LGS-041-AX',
    rating: 4.9,
    eta_min: 8,
  },
  grace_expires: '15:28',
  waiting_started: null as string | null,
  running_meter: false,
}

const MOCK_HISTORY = [
  { id: 'bk-9720', date: '2026-08-15', direction: 'departure', flight: 'BA 075', destination: 'Zone 3 — Ikoyi', status: 'completed' },
  { id: 'bk-9641', date: '2026-07-28', direction: 'arrival', flight: 'ET 910', destination: 'Zone 4 — Lekki', status: 'completed' },
  { id: 'bk-9502', date: '2026-07-02', direction: 'arrival', flight: 'QR 1421', destination: 'Zone 3 — Victoria Island', status: 'completed' },
]

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  booked: { label: 'Confirmed', color: '#65785F' },
  driver_assigned: { label: 'Driver Assigned', color: '#1F6B46' },
  driver_dispatched: { label: 'Driver En Route', color: '#D96B1F' },
  driver_arrived: { label: 'Driver Arrived', color: '#1F6B46' },
  waiting: { label: 'Waiting (Meter Running)', color: '#DC2626' },
  in_progress: { label: 'In Progress', color: '#1F6B46' },
  completed: { label: 'Completed', color: '#65785F' },
}

const FLIGHT_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  on_time: { label: 'On Time ✓', color: '#1F6B46' },
  delayed: { label: 'Delayed', color: '#D96B1F' },
  early: { label: 'Arriving Early', color: '#1F6B46' },
  landed: { label: 'Landed', color: '#1F6B46' },
  cancelled: { label: 'Cancelled', color: '#DC2626' },
}

export default function AirportDashboardPage() {
  const [tab, setTab] = useState<TabKey>('bookings')

  const st = STATUS_LABELS[MOCK_ACTIVE.status]
  const fst = FLIGHT_STATUS_LABELS[MOCK_ACTIVE.flight_status]

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-28" style={{ paddingTop: 90, background: 'var(--warm-white)' }}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center py-8">
            <h1 className="text-2xl font-black mb-1" style={{ color: '#183024' }}>My Airport Transfers</h1>
            <p className="text-sm" style={{ color: '#65785F' }}>Live flight status · Driver tracking · Trip history</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {([
              { key: 'bookings', label: '✈️ Active' },
              { key: 'track', label: '📍 Track' },
              { key: 'history', label: '📋 History' },
            ] as { key: TabKey; label: string }[]).map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className="flex-1 py-2.5 rounded-2xl font-bold text-sm transition-all"
                style={{ background: tab === t.key ? '#183024' : '#F1F6EA', color: tab === t.key ? 'white' : '#65785F' }}>
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>

              {/* BOOKINGS TAB */}
              {tab === 'bookings' && (
                <div className="space-y-4">
                  {/* Active booking card */}
                  <div className="rounded-2xl border overflow-hidden" style={{ background: 'white', borderColor: '#DDE9D2' }}>
                    <div className="px-5 py-4 flex items-center justify-between border-b" style={{ borderColor: '#DDE9D2', background: '#F1F6EA' }}>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wide" style={{ color: '#65785F' }}>Active Transfer</div>
                        <div className="font-extrabold" style={{ color: '#183024' }}>{MOCK_ACTIVE.flight_number} · {MOCK_ACTIVE.airline}</div>
                      </div>
                      <div className="text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{ background: st.color }}>
                        {st.label}
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      {/* Flight status */}
                      <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#F1F6EA' }}>
                        <div>
                          <div className="text-xs font-bold" style={{ color: '#65785F' }}>Flight Status</div>
                          <div className="text-sm font-extrabold" style={{ color: fst.color }}>{fst.label}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs" style={{ color: '#65785F' }}>Estimated</div>
                          <div className="font-black" style={{ color: '#183024' }}>{MOCK_ACTIVE.estimated_time}</div>
                        </div>
                      </div>
                      {/* Trip details */}
                      {[
                        { label: 'Terminal', val: MOCK_ACTIVE.terminal },
                        { label: 'Meet & Greet', val: 'Inside Terminal — Name Board' },
                        { label: 'Destination', val: `${MOCK_ACTIVE.destination_zone} · ${MOCK_ACTIVE.destination_address}` },
                        { label: 'Grace Expires', val: `30 min from driver arrival — ${MOCK_ACTIVE.grace_expires}` },
                      ].map(r => (
                        <div key={r.label} className="flex justify-between text-sm py-1 border-b last:border-0" style={{ borderColor: '#F1F6EA' }}>
                          <span style={{ color: '#65785F' }}>{r.label}</span>
                          <span className="font-semibold text-right max-w-[55%]" style={{ color: '#183024' }}>{r.val}</span>
                        </div>
                      ))}
                    </div>
                    <div className="px-5 pb-5">
                      <button onClick={() => setTab('track')}
                        className="w-full py-3 rounded-xl font-bold text-white text-sm"
                        style={{ background: '#1F6B46' }}>
                        Track Driver Live →
                      </button>
                    </div>
                  </div>
                  <Link href="/airport/book"
                    className="block w-full py-3 rounded-2xl text-center font-bold text-sm border-2 transition-all hover:bg-gray-50"
                    style={{ color: '#183024', borderColor: '#DDE9D2' }}>
                    + Book Another Transfer
                  </Link>
                </div>
              )}

              {/* TRACK TAB */}
              {tab === 'track' && (
                <div className="space-y-4">
                  {/* Driver card */}
                  <div className="rounded-2xl border p-5" style={{ background: 'white', borderColor: '#DDE9D2' }}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-lg"
                        style={{ background: '#183024' }}>{MOCK_ACTIVE.driver.initials}</div>
                      <div>
                        <div className="font-extrabold" style={{ color: '#183024' }}>{MOCK_ACTIVE.driver.name}</div>
                        <div className="text-sm" style={{ color: '#65785F' }}>{MOCK_ACTIVE.driver.vehicle} · {MOCK_ACTIVE.driver.plate}</div>
                        <div className="text-sm font-bold" style={{ color: '#D96B1F' }}>⭐ {MOCK_ACTIVE.driver.rating} · Police Cleared ✓</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1 p-3 rounded-xl text-center" style={{ background: '#F1F6EA' }}>
                        <div className="text-xs font-bold" style={{ color: '#65785F' }}>ETA</div>
                        <div className="text-xl font-black" style={{ color: '#183024' }}>{MOCK_ACTIVE.driver.eta_min} min</div>
                      </div>
                      <div className="flex-1 p-3 rounded-xl text-center" style={{ background: '#F1F6EA' }}>
                        <div className="text-xs font-bold" style={{ color: '#65785F' }}>Waiting Meter</div>
                        <div className="text-xl font-black" style={{ color: MOCK_ACTIVE.running_meter ? '#DC2626' : '#1F6B46' }}>
                          {MOCK_ACTIVE.running_meter ? '▶ Running' : 'Not Started'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live map placeholder */}
                  <div className="rounded-2xl overflow-hidden relative" style={{ height: 220, background: 'linear-gradient(180deg, #D4EBDC, #B8DFCA)' }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl mb-2">🗺️</div>
                        <div className="text-sm font-bold" style={{ color: '#1F6B46' }}>Live Map</div>
                        <div className="text-xs" style={{ color: '#65785F' }}>Driver position updates every 15 seconds</div>
                      </div>
                    </div>
                    {/* Animated driver dot */}
                    <motion.div className="absolute text-2xl" style={{ left: '35%', top: '45%' }}
                      animate={{ x: [0, 30, 0], y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                      🚗
                    </motion.div>
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 text-2xl">✈️</div>
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#1F6B46' }}>
                      En Route
                    </div>
                  </div>

                  {/* Grace period info */}
                  <div className="rounded-2xl p-4 border" style={{ background: '#FFF0E4', borderColor: '#FFD6AA' }}>
                    <div className="text-sm font-bold mb-1" style={{ color: '#D96B1F' }}>⏱ Waiting Grace — 30 Minutes</div>
                    <div className="text-xs" style={{ color: '#65785F' }}>
                      Clock starts when driver arrives at terminal. You have 30 minutes free for customs and luggage before the waiting meter begins.
                    </div>
                  </div>

                  <div className="rounded-2xl p-4 border" style={{ background: 'white', borderColor: '#DDE9D2' }}>
                    <div className="text-xs font-bold mb-2" style={{ color: '#65785F' }}>CONTACT OPS</div>
                    <div className="flex gap-3">
                      <button className="flex-1 py-2.5 rounded-xl font-bold text-white text-sm" style={{ background: '#183024' }}>
                        📞 Call Driver
                      </button>
                      <button className="flex-1 py-2.5 rounded-xl font-bold text-sm border-2" style={{ color: '#183024', borderColor: '#DDE9D2' }}>
                        💬 Message Ops
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* HISTORY TAB */}
              {tab === 'history' && (
                <div className="space-y-3">
                  {MOCK_HISTORY.map((h, i) => (
                    <motion.div key={h.id} className="rounded-2xl border p-5" style={{ background: 'white', borderColor: '#DDE9D2' }}
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-extrabold text-sm" style={{ color: '#183024' }}>
                            {h.direction === 'arrival' ? '✈️ Arrival' : '🛫 Departure'} · {h.flight}
                          </div>
                          <div className="text-xs" style={{ color: '#65785F' }}>{h.date} · {h.destination}</div>
                        </div>
                        <div className="text-xs px-2 py-1 rounded-full" style={{ background: '#F1F6EA', color: '#1F6B46' }}>
                          ✓ Completed
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div className="text-center pt-4">
                    <Link href="/airport/book"
                      className="inline-block px-6 py-3 rounded-full font-bold text-white text-sm"
                      style={{ background: '#D96B1F' }}>
                      Book a Transfer →
                    </Link>
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
