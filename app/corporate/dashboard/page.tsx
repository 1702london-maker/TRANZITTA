'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type TabKey = 'live' | 'staff' | 'routes' | 'excess' | 'invoices'

const MOCK_COMPANY = {
  name: 'Acme Nigeria Limited',
  rc_number: 'RC 1234567',
  admin: 'Adaeze Okonkwo',
  status: 'active',
  staff_count: 20,
  vans: 2,
  am_shift: '6:00 AM – 9:00 AM',
  pm_shift: '5:00 PM – 8:00 PM',
}

const MOCK_VANS = [
  {
    id: 'v1', name: 'Van 1 — Lekki Route', driver: 'Chukwuma Adeola', plate: 'LAG-234-KL',
    rating: 4.9, status: 'in_progress', shift: 'AM', staff_total: 9, staff_boarded: 7,
    eta_office: 8, lat: 6.44, lng: 3.47,
  },
  {
    id: 'v2', name: 'Van 2 — Surulere Route', driver: 'Taiwo Kolawole', plate: 'LAG-891-MN',
    rating: 4.7, status: 'in_progress', shift: 'AM', staff_total: 11, staff_boarded: 9,
    eta_office: 14, lat: 6.50, lng: 3.35,
  },
]

const MOCK_STAFF = [
  { id: 's1', name: 'Chioma Okonkwo', phone: '+234 810 111 2222', area: 'Lekki Phase 1', shift: 'both', van: 'Van 1', status: 'active' },
  { id: 's2', name: 'Emeka Adesanya', phone: '+234 812 333 4444', area: 'Lekki Phase 2', shift: 'both', van: 'Van 1', status: 'active' },
  { id: 's3', name: 'Fatima Bello', phone: '+234 814 555 6666', area: 'Ikate, Lekki', shift: 'am', van: 'Van 1', status: 'active' },
  { id: 's4', name: 'Tobi Kassim', phone: '+234 816 777 8888', area: 'Lekki Phase 1', shift: 'both', van: 'Van 1', status: 'active' },
  { id: 's5', name: 'Amara Eze', phone: '+234 818 999 0000', area: 'Surulere', shift: 'both', van: 'Van 2', status: 'active' },
  { id: 's6', name: 'Biodun Olatunji', phone: '+234 811 222 3333', area: 'Surulere', shift: 'pm', van: 'Van 2', status: 'active' },
  { id: 's7', name: 'Ngozi Nwachukwu', phone: '+234 813 444 5555', area: 'Aguda, Surulere', shift: 'both', van: 'Van 2', status: 'active' },
]

const MOCK_EXCESS = [
  { date: '2026-09-02', van: 'Van 1', shift: 'PM', overrun_min: 28, charge: 9333 },
  { date: '2026-09-04', van: 'Van 2', shift: 'PM', overrun_min: 42, charge: 14000 },
  { date: '2026-09-09', van: 'Van 1', shift: 'AM', overrun_min: 15, charge: 5000 },
  { date: '2026-09-11', van: 'Van 1', shift: 'PM', overrun_min: 35, charge: 11667 },
]

const MOCK_INVOICES = [
  { id: 'INV-001', type: 'monthly_advance', month: 'September 2026', base: 4356000, excess: 0, total: 4356000, status: 'paid', due: '2026-09-01' },
  { id: 'INV-002', type: 'excess', month: 'August 2026 — Excess', base: 0, excess: 287000, total: 287000, status: 'paid', due: '2026-08-31' },
  { id: 'INV-003', type: 'monthly_advance', month: 'October 2026', base: 4356000, excess: 0, total: 4356000, status: 'pending', due: '2026-10-01' },
]

const STATUS_COLOR: Record<string, string> = {
  in_progress: '#D96B1F',
  scheduled: '#65785F',
  completed: '#1F6B46',
}

export default function CorporateDashboardPage() {
  const [tab, setTab] = useState<TabKey>('live')
  const [riderVerified, setRiderVerified] = useState<Record<string, boolean>>({})

  const totalExcess = MOCK_EXCESS.reduce((s, e) => s + e.charge, 0)

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-28" style={{ paddingTop: 90, background: 'var(--warm-white)' }}>
        <div className="max-w-3xl mx-auto px-4">

          {/* Header */}
          <div className="py-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#D96B1F' }}>Corporate Dashboard</div>
                <h1 className="text-xl font-black" style={{ color: '#183024' }}>{MOCK_COMPANY.name}</h1>
                <p className="text-sm" style={{ color: '#65785F' }}>{MOCK_COMPANY.rc_number} · {MOCK_COMPANY.admin}</p>
              </div>
              <div className="px-3 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: '#1F6B46' }}>
                ● Active
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { label: 'Staff', value: MOCK_COMPANY.staff_count },
                { label: 'Vans', value: MOCK_COMPANY.vans },
                { label: 'Excess MTD', value: `₦${(totalExcess / 1000).toFixed(0)}k` },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl p-3 text-center border" style={{ background: 'white', borderColor: '#DDE9D2' }}>
                  <div className="text-lg font-black" style={{ color: i === 2 ? '#D96B1F' : '#183024' }}>{s.value}</div>
                  <div className="text-[10px]" style={{ color: '#65785F' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1.5 mb-6 overflow-x-auto">
            {([
              { key: 'live', label: '📍 Live' },
              { key: 'staff', label: '👥 Staff' },
              { key: 'routes', label: '🚐 Routes' },
              { key: 'excess', label: '⚡ Excess' },
              { key: 'invoices', label: '🧾 Invoices' },
            ] as { key: TabKey; label: string }[]).map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className="flex-1 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex-shrink-0 whitespace-nowrap px-2"
                style={{ background: tab === t.key ? '#183024' : '#F1F6EA', color: tab === t.key ? 'white' : '#65785F' }}>
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>

              {/* ── LIVE TAB ── */}
              {tab === 'live' && (
                <div className="space-y-4">
                  {/* Mock map */}
                  <div className="rounded-2xl overflow-hidden relative" style={{ height: 180, background: 'linear-gradient(180deg, #D4EBDC, #B8DFCA)' }}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 text-6xl">🗺️</div>
                    <motion.div className="absolute text-2xl" style={{ left: '20%', top: '40%' }}
                      animate={{ x: [0, 40] }} transition={{ duration: 8, repeat: Infinity }}>🚐</motion.div>
                    <motion.div className="absolute text-2xl" style={{ left: '15%', top: '65%' }}
                      animate={{ x: [0, 30] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }}>🚐</motion.div>
                    <div className="absolute right-12 top-1/2 -translate-y-1/2 text-2xl">🏢</div>
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#1F6B46' }}>
                      ● Live — 2 vans active
                    </div>
                    <div className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full"
                      style={{ background: 'white', color: '#65785F' }}>GPS · 10s refresh</div>
                  </div>

                  {/* Van cards */}
                  {MOCK_VANS.map(van => (
                    <div key={van.id} className="rounded-2xl border overflow-hidden" style={{ background: 'white', borderColor: '#DDE9D2' }}>
                      <div className="px-5 py-3 flex items-center justify-between border-b" style={{ borderColor: '#DDE9D2', background: '#F1F6EA' }}>
                        <div>
                          <div className="font-extrabold text-sm" style={{ color: '#183024' }}>{van.name}</div>
                          <div className="text-xs" style={{ color: '#65785F' }}>{van.driver} · {van.plate}</div>
                        </div>
                        <div className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                          style={{ background: STATUS_COLOR[van.status] || '#65785F' }}>
                          {van.shift} · Running
                        </div>
                      </div>
                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-black" style={{ color: '#183024' }}>{van.staff_boarded}/{van.staff_total}</div>
                            <div className="text-xs" style={{ color: '#65785F' }}>staff boarded</div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-black" style={{ color: '#D96B1F' }}>{van.eta_office} min</div>
                            <div className="text-xs" style={{ color: '#65785F' }}>to office</div>
                          </div>
                          <div className="text-right">
                            <div className="font-extrabold" style={{ color: '#1F6B46' }}>⭐ {van.rating}</div>
                            <div className="text-xs" style={{ color: '#65785F' }}>driver rating</div>
                          </div>
                        </div>
                        <div className="h-2 rounded-full" style={{ background: '#F1F6EA' }}>
                          <div className="h-full rounded-full transition-all" style={{ background: '#1F6B46', width: `${(van.staff_boarded / van.staff_total) * 100}%` }} />
                        </div>
                        <button className="w-full py-2 rounded-xl text-xs font-bold border-2 transition-all hover:bg-red-50"
                          style={{ color: '#DC2626', borderColor: '#FCA5A5' }}>
                          🚨 Trigger Panic Alert
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="text-xs text-center py-2" style={{ color: '#65785F' }}>
                    All vans tracked live · Panic alert notifies ops + police immediately
                  </div>
                </div>
              )}

              {/* ── STAFF TAB ── */}
              {tab === 'staff' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-bold" style={{ color: '#183024' }}>{MOCK_STAFF.length} of {MOCK_COMPANY.staff_count} staff</div>
                    <button className="px-4 py-2 rounded-full text-xs font-bold text-white" style={{ background: '#D96B1F' }}>
                      + Add Staff
                    </button>
                  </div>
                  {MOCK_STAFF.map((s, i) => (
                    <motion.div key={s.id} className="rounded-2xl border p-4" style={{ background: 'white', borderColor: '#DDE9D2' }}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-extrabold text-sm" style={{ color: '#183024' }}>{s.name}</div>
                          <div className="text-xs" style={{ color: '#65785F' }}>{s.area} · {s.phone}</div>
                          <div className="text-xs mt-0.5" style={{ color: '#1F6B46' }}>{s.van} · {s.shift.toUpperCase()} shift</div>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-xs px-2 py-1 rounded-lg border" style={{ borderColor: '#DDE9D2', color: '#65785F' }}>Edit</button>
                          <button className="text-xs px-2 py-1 rounded-lg border" style={{ borderColor: '#FCA5A5', color: '#DC2626' }}>Remove</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div className="p-4 rounded-2xl text-xs" style={{ background: '#F1F6EA', color: '#65785F' }}>
                    Adding staff mid-month: ops reviews grouping and assigns to an existing van if capacity allows.
                    Additional van triggers a prorated charge.
                  </div>
                </div>
              )}

              {/* ── ROUTES TAB ── */}
              {tab === 'routes' && (
                <div className="space-y-4">
                  {MOCK_VANS.map((van, i) => (
                    <div key={van.id} className="rounded-2xl border overflow-hidden" style={{ background: 'white', borderColor: '#DDE9D2' }}>
                      <div className="px-5 py-3 border-b" style={{ borderColor: '#DDE9D2', background: '#F1F6EA' }}>
                        <div className="font-extrabold" style={{ color: '#183024' }}>{van.name}</div>
                        <div className="text-xs mt-0.5" style={{ color: '#65785F' }}>{van.driver} · {van.plate} · ⭐ {van.rating}</div>
                      </div>
                      <div className="p-5">
                        <div className="text-xs font-bold mb-3" style={{ color: '#65785F' }}>AM + PM PICKUP SEQUENCE</div>
                        <div className="space-y-2">
                          {MOCK_STAFF.filter(s => s.van === `Van ${i + 1}`).map((s, j) => (
                            <div key={s.id} className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white flex-shrink-0"
                                style={{ background: '#183024' }}>{j + 1}</div>
                              <div className="flex-1 text-xs" style={{ color: '#183024' }}>{s.name}</div>
                              <div className="text-[10px]" style={{ color: '#65785F' }}>{s.area}</div>
                            </div>
                          ))}
                        </div>
                        <button className="mt-4 w-full py-2 rounded-xl text-xs font-bold border-2 transition-all hover:bg-[#F1F6EA]"
                          style={{ color: '#183024', borderColor: '#DDE9D2' }}>
                          🚩 Flag Driver Issue
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── EXCESS TAB ── */}
              {tab === 'excess' && (
                <div className="space-y-4">
                  <div className="rounded-2xl p-5 border" style={{ background: 'white', borderColor: '#DDE9D2' }}>
                    <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#65785F' }}>September 2026 · Running Total</div>
                    <div className="text-3xl font-black" style={{ color: '#D96B1F' }}>₦{totalExcess.toLocaleString()}</div>
                    <div className="text-xs mt-1" style={{ color: '#65785F' }}>Will be added to month-end invoice</div>
                  </div>
                  <div className="space-y-2">
                    {MOCK_EXCESS.map((e, i) => (
                      <motion.div key={i} className="rounded-2xl border p-4" style={{ background: 'white', borderColor: '#DDE9D2' }}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-extrabold text-sm" style={{ color: '#183024' }}>{e.van} · {e.shift} Shift</div>
                            <div className="text-xs" style={{ color: '#65785F' }}>{e.date} · {e.overrun_min} min overrun</div>
                          </div>
                          <div className="font-extrabold" style={{ color: '#D96B1F' }}>₦{e.charge.toLocaleString()}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-4 rounded-2xl text-xs" style={{ background: '#FFF0E4', color: '#65785F' }}>
                    ⚡ Excess charged per hour per van beyond agreed shift window.
                    Surge multiplier applied if route is in active surge zone during overrun.
                  </div>
                </div>
              )}

              {/* ── INVOICES TAB ── */}
              {tab === 'invoices' && (
                <div className="space-y-3">
                  {MOCK_INVOICES.map((inv, i) => (
                    <motion.div key={inv.id} className="rounded-2xl border overflow-hidden" style={{ background: 'white', borderColor: '#DDE9D2' }}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                      <div className="px-5 py-3 flex items-center justify-between border-b" style={{ borderColor: '#DDE9D2', background: '#F1F6EA' }}>
                        <div>
                          <div className="font-extrabold text-sm" style={{ color: '#183024' }}>{inv.month}</div>
                          <div className="text-xs" style={{ color: '#65785F' }}>{inv.id} · Due {inv.due}</div>
                        </div>
                        <div className={`text-xs font-bold px-2.5 py-1 rounded-full`}
                          style={{
                            background: inv.status === 'paid' ? '#F1F6EA' : '#FFF0E4',
                            color: inv.status === 'paid' ? '#1F6B46' : '#D96B1F',
                          }}>
                          {inv.status === 'paid' ? '✓ Paid' : 'Due'}
                        </div>
                      </div>
                      <div className="px-5 py-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-xs" style={{ color: '#65785F' }}>Base amount</span>
                          <span className="text-xs font-bold" style={{ color: '#183024' }}>₦{inv.base.toLocaleString()}</span>
                        </div>
                        {inv.excess > 0 && (
                          <div className="flex justify-between mb-2">
                            <span className="text-xs" style={{ color: '#65785F' }}>Excess charges</span>
                            <span className="text-xs font-bold" style={{ color: '#D96B1F' }}>₦{inv.excess.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="h-px mb-2" style={{ background: '#F1F6EA' }} />
                        <div className="flex justify-between">
                          <span className="text-sm font-extrabold" style={{ color: '#183024' }}>Total</span>
                          <span className="text-sm font-extrabold" style={{ color: '#183024' }}>₦{inv.total.toLocaleString()}</span>
                        </div>
                        {inv.status === 'pending' && (
                          <button className="w-full mt-4 py-2.5 rounded-xl font-bold text-white text-sm"
                            style={{ background: '#D96B1F' }}>
                            Pay via Paystack →
                          </button>
                        )}
                        {inv.status === 'paid' && (
                          <button className="w-full mt-4 py-2 rounded-xl font-bold text-xs border"
                            style={{ color: '#65785F', borderColor: '#DDE9D2' }}>
                            Download Invoice PDF
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
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
