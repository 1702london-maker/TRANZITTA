'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

type Tab = 'bookings' | 'qr' | 'track'

const BOOKINGS = [
  {
    id: 'eb1',
    event_name: 'Adaeze & Emeka Wedding',
    event_type: 'Wedding',
    event_date: '14 Feb 2026',
    start_time: '11:00 AM',
    estimated_hours: 6,
    passenger_count: 48,
    vehicles: 3,
    vehicle_type: 'SUV',
    pickup: 'Eko Hotel, Victoria Island, Lagos',
    dropoff: 'Oriental Hotel, Victoria Island, Lagos',
    status: 'confirmed',
    deposit_paid: true,
    driver: { name: 'Chukwuma Eze', rating: 4.9, plate: 'LGS-412-AA', vehicle: 'Toyota Prado 2023', police_cleared: true },
    qr_issued: true,
    qr_transferred: false,
  },
  {
    id: 'eb2',
    event_name: 'TechLagos Annual Conference',
    event_type: 'Corporate',
    event_date: '28 Mar 2026',
    start_time: '7:30 AM',
    estimated_hours: 4,
    passenger_count: 22,
    vehicles: 2,
    vehicle_type: 'Sedan',
    pickup: 'Transcorp Hilton, Abuja',
    dropoff: 'Sheraton Hotel, Abuja',
    status: 'enquiry',
    deposit_paid: false,
    driver: null,
    qr_issued: false,
    qr_transferred: false,
  },
]

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  enquiry:     { label: 'Enquiry Received', color: '#D96B1F', bg: '#FEF3E2' },
  quoted:      { label: 'Quote Sent', color: '#1F6B46', bg: '#F1F6EA' },
  confirmed:   { label: 'Confirmed ✓', color: '#1F6B46', bg: '#E6F4ED' },
  in_progress: { label: 'In Progress', color: '#D96B1F', bg: '#FEF3E2' },
  completed:   { label: 'Completed', color: '#65785F', bg: '#F1F6EA' },
  cancelled:   { label: 'Cancelled', color: '#DC2626', bg: '#FEE2E2' },
}

export default function EventsDashboardPage() {
  const [tab, setTab] = useState<Tab>('bookings')
  const [qrOpen, setQrOpen] = useState<string | null>(null)
  const selected = BOOKINGS[0]

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F4F9F5' }}>
      <header className="sticky top-0 z-50 border-b flex items-center justify-between px-5 h-14"
        style={{ background: 'rgba(255,255,255,0.96)', borderColor: '#DDE9D2', backdropFilter: 'blur(12px)' }}>
        <Image src="/tranzitta-logo.png" alt="Tranzitta" width={110} height={32} className="h-7 w-auto object-contain" />
        <div className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: '#D96B1F' }}>
          Events
        </div>
      </header>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {tab === 'bookings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-xl font-extrabold mb-1" style={{ color: '#183024' }}>My Event Bookings</h1>
            <p className="text-sm mb-6" style={{ color: '#65785F' }}>All pricing is private — your quote only.</p>

            <div className="space-y-4">
              {BOOKINGS.map(bk => {
                const st = STATUS_MAP[bk.status] || STATUS_MAP.enquiry
                return (
                  <div key={bk.id} className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#DDE9D2' }}>
                    <div className="px-5 py-4 border-b" style={{ borderColor: '#F1F6EA' }}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-extrabold" style={{ color: '#183024' }}>{bk.event_name}</div>
                          <div className="text-xs mt-0.5" style={{ color: '#65785F' }}>{bk.event_type} · {bk.event_date} · {bk.start_time}</div>
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                          style={{ background: st.bg, color: st.color }}>
                          {st.label}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 divide-x divide-[#F1F6EA]">
                      {[
                        { label: 'Guests', val: bk.passenger_count },
                        { label: 'Vehicles', val: `${bk.vehicles}× ${bk.vehicle_type}` },
                        { label: 'Hours', val: `${bk.estimated_hours}h` },
                      ].map((c, i) => (
                        <div key={i} className="px-4 py-3">
                          <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: '#65785F' }}>{c.label}</div>
                          <div className="text-sm font-bold mt-0.5" style={{ color: '#183024' }}>{c.val}</div>
                        </div>
                      ))}
                    </div>

                    <div className="px-5 py-3 border-t text-xs" style={{ borderColor: '#F1F6EA', color: '#65785F' }}>
                      📍 {bk.pickup} → {bk.dropoff}
                    </div>

                    {bk.deposit_paid && (
                      <div className="px-5 py-2 border-t flex gap-2" style={{ borderColor: '#F1F6EA' }}>
                        <div className="flex-1 text-xs font-bold" style={{ color: '#1F6B46' }}>✓ Deposit Paid</div>
                        {bk.qr_issued && (
                          <button onClick={() => setQrOpen(qrOpen === bk.id ? null : bk.id)}
                            className="text-xs font-bold px-3 py-1.5 rounded-lg border"
                            style={{ borderColor: '#DDE9D2', color: '#183024' }}>
                            🔐 Show QR
                          </button>
                        )}
                        {bk.status === 'confirmed' && (
                          <button onClick={() => setTab('track')}
                            className="text-xs font-bold px-3 py-1.5 rounded-lg text-white"
                            style={{ background: '#1F6B46' }}>
                            📍 Track Fleet
                          </button>
                        )}
                      </div>
                    )}

                    {qrOpen === bk.id && (
                      <motion.div className="px-5 pb-5" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                        <div className="rounded-2xl p-5 text-center" style={{ background: '#F1F6EA' }}>
                          <div className="text-xs font-bold mb-3" style={{ color: '#1F6B46' }}>Event QR — {bk.event_name}</div>
                          <div className="w-32 h-32 mx-auto rounded-xl bg-white border-2 flex items-center justify-center text-3xl"
                            style={{ borderColor: '#1F6B46' }}>▩▩▩</div>
                          <p className="text-xs mt-3 mb-4" style={{ color: '#65785F' }}>
                            Present to driver at pickup. Scan starts your service clock.
                          </p>
                          <button className="text-xs font-bold px-4 py-2 rounded-xl border"
                            style={{ borderColor: '#DDE9D2', color: '#183024' }}>
                            Transfer QR to Principal Guest →
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {bk.driver && (
                      <div className="px-5 py-4 border-t flex items-center gap-3" style={{ borderColor: '#F1F6EA' }}>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: '#183024' }}>CE</div>
                        <div className="flex-1">
                          <div className="text-sm font-bold" style={{ color: '#183024' }}>{bk.driver.name}</div>
                          <div className="text-xs" style={{ color: '#65785F' }}>{bk.driver.vehicle} · {bk.driver.plate}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold" style={{ color: '#D96B1F' }}>⭐ {bk.driver.rating}</span>
                          {bk.driver.police_cleared && (
                            <span className="text-xs px-2 py-0.5 rounded-full text-white text-[10px]" style={{ background: '#1F6B46' }}>✓ Vetted</span>
                          )}
                        </div>
                      </div>
                    )}

                    {!bk.deposit_paid && bk.status === 'quoted' && (
                      <div className="px-5 py-3 border-t" style={{ borderColor: '#F1F6EA' }}>
                        <button className="w-full py-3 rounded-xl font-black text-white text-sm"
                          style={{ background: 'linear-gradient(135deg, #D96B1F 0%, #B85A1A 100%)' }}>
                          Pay 50% Deposit to Confirm →
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}

              <Link href="/events/enquire"
                className="block w-full py-4 rounded-2xl font-bold border text-center text-sm"
                style={{ borderColor: '#DDE9D2', color: '#1F6B46', background: 'white', borderStyle: 'dashed' }}>
                + New Event Enquiry
              </Link>
            </div>
          </motion.div>
        )}

        {tab === 'track' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center gap-3 mb-5">
              <button onClick={() => setTab('bookings')} className="text-sm font-bold" style={{ color: '#1F6B46' }}>← Bookings</button>
              <div className="text-lg font-extrabold" style={{ color: '#183024' }}>Live Fleet Tracking</div>
            </div>

            <div className="rounded-2xl border mb-4 overflow-hidden" style={{ borderColor: '#DDE9D2' }}>
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#F1F6EA' }}>
                <div>
                  <div className="font-extrabold" style={{ color: '#183024' }}>{selected.event_name}</div>
                  <div className="text-xs" style={{ color: '#65785F' }}>{selected.event_date} · {selected.start_time}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold" style={{ color: '#1F6B46' }}>Live</span>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A3B2C 0%, #183024 100%)', height: 200 }}>
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                {/* Animated vehicles */}
                {[
                  { x: '25%', y: '35%', label: 'V1', color: '#1F6B46' },
                  { x: '55%', y: '55%', label: 'V2', color: '#D96B1F' },
                  { x: '70%', y: '30%', label: 'V3', color: '#D96B1F' },
                ].map((v, i) => (
                  <motion.div key={i} className="absolute"
                    style={{ left: v.x, top: v.y }}
                    animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                      style={{ background: v.color }}>
                      {v.label}
                    </div>
                  </motion.div>
                ))}
                <div className="absolute bottom-3 left-3 text-xs font-bold px-2 py-1 rounded-lg"
                  style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}>
                  Victoria Island, Lagos
                </div>
              </div>

              <div className="space-y-0">
                {[
                  { label: 'Vehicle 1 — Toyota Prado', driver: 'Chukwuma Eze', status: 'En Route to Pickup', eta: '4 min', statusColor: '#D96B1F' },
                  { label: 'Vehicle 2 — Toyota Prado', driver: 'Emeka Obi', status: 'Arrived at Pickup', eta: 'Ready', statusColor: '#1F6B46' },
                  { label: 'Vehicle 3 — Toyota Camry', driver: 'Fatima Bello', status: 'En Route to Pickup', eta: '8 min', statusColor: '#D96B1F' },
                ].map((v, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-4 border-t" style={{ borderColor: '#F1F6EA' }}>
                    <div>
                      <div className="font-bold text-sm" style={{ color: '#183024' }}>{v.label}</div>
                      <div className="text-xs" style={{ color: '#65785F' }}>{v.driver} · {v.status}</div>
                    </div>
                    <div className="text-sm font-bold" style={{ color: v.statusColor }}>{v.eta}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 rounded-2xl border px-5 py-4 bg-white" style={{ borderColor: '#DDE9D2' }}>
                <div className="text-xs font-bold mb-1" style={{ color: '#65785F' }}>Clock Started</div>
                <div className="font-extrabold" style={{ color: '#183024' }}>11:03 AM</div>
                <div className="text-xs mt-0.5" style={{ color: '#D96B1F' }}>QR scanned ✓</div>
              </div>
              <a href="tel:+2349000000000"
                className="flex-1 rounded-2xl flex flex-col items-center justify-center py-4 gap-1 text-white font-bold text-sm"
                style={{ background: '#183024' }}>
                <span className="text-xl">📞</span>
                <span>Call Ops</span>
              </a>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="border-t flex" style={{ borderColor: '#DDE9D2', background: 'rgba(255,255,255,0.97)' }}>
        {([['bookings', '📋', 'Bookings'], ['qr', '🔐', 'My QR'], ['track', '📍', 'Track']] as const).map(([id, icon, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className="flex-1 py-3 flex flex-col items-center gap-0.5 text-[11px] font-bold"
            style={{ color: tab === id ? '#1F6B46' : '#A8C09A' }}>
            <span className="text-base">{icon}</span>{label}
          </button>
        ))}
      </div>
    </div>
  )
}
