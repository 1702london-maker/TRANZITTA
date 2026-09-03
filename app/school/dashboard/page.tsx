'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

type Tab = 'home' | 'trips' | 'payments' | 'contacts'

// Mock data — replaced by Supabase fetch in production
const CHILDREN = [
  {
    id: 'c1', name: 'Amara Okonkwo', school: 'Greenfield Int\'l School',
    driver: { name: 'Chukwuma Eze', rating: 4.9, plate: 'LGS-234-AA', vehicle: 'Toyota Camry 2022', police_cleared: true },
    status: 'in_transit', eta: '8 min', term_start: '2026-09-08', term_end: '2026-11-28',
    today_am: { status: 'boarded', time: '7:12am' },
    today_pm: { status: 'scheduled', time: '3:00pm' },
  },
  {
    id: 'c2', name: 'Emeka Okonkwo', school: 'Greenfield Int\'l School',
    driver: { name: 'Chukwuma Eze', rating: 4.9, plate: 'LGS-234-AA', vehicle: 'Toyota Camry 2022', police_cleared: true },
    status: 'at_school', eta: null, term_start: '2026-09-08', term_end: '2026-11-28',
    today_am: { status: 'school_confirmed', time: '8:04am' },
    today_pm: { status: 'scheduled', time: '3:00pm' },
  },
]

const STATUS_COLOR: Record<string, string> = {
  in_transit: '#D96B1F',
  at_school: '#1F6B46',
  boarded: '#1F6B46',
  school_confirmed: '#1F6B46',
  scheduled: '#65785F',
  missed: '#DC2626',
}

const STATUS_LABEL: Record<string, string> = {
  in_transit: 'In Transit',
  at_school: 'At School',
  boarded: 'Boarded',
  school_confirmed: 'Arrived',
  scheduled: 'Scheduled',
}

export default function SchoolDashboardPage() {
  const [tab, setTab] = useState<Tab>('home')
  const [qrOpen, setQrOpen] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F4F9F5' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b flex items-center justify-between px-5 h-14"
        style={{ background: 'rgba(255,255,255,0.96)', borderColor: '#DDE9D2', backdropFilter: 'blur(12px)' }}>
        <Image src="/tranzitta-logo.png" alt="Tranzitta" width={110} height={32} className="h-7 w-auto object-contain" />
        <div className="flex items-center gap-3">
          <div className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: '#1F6B46', color: 'white' }}>
            {CHILDREN.length} children
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: '#1F6B46' }}>M</div>
        </div>
      </header>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">

        {tab === 'home' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-6">
              <h1 className="text-xl font-extrabold" style={{ color: '#183024' }}>Good morning, Mrs Okonkwo</h1>
              <p className="text-sm mt-1" style={{ color: '#65785F' }}>Wednesday · Today&apos;s trips</p>
            </div>

            {/* Children cards */}
            <div className="space-y-4 mb-8">
              {CHILDREN.map(child => (
                <div key={child.id} className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#DDE9D2' }}>
                  <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#F1F6EA' }}>
                    <div>
                      <div className="font-extrabold" style={{ color: '#183024' }}>{child.name}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#65785F' }}>{child.school}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                        style={{ background: STATUS_COLOR[child.status] || '#65785F' }}>
                        {STATUS_LABEL[child.status] || child.status}
                      </span>
                      {child.eta && (
                        <span className="text-xs font-bold" style={{ color: '#D96B1F' }}>· {child.eta}</span>
                      )}
                    </div>
                  </div>

                  {/* Today's trips */}
                  <div className="grid grid-cols-2 divide-x divide-[#F1F6EA]">
                    {[
                      { label: '🌅 AM Pickup', ...child.today_am },
                      { label: '🌇 PM Dropoff', ...child.today_pm },
                    ].map((t, i) => (
                      <div key={i} className="px-4 py-3">
                        <div className="text-xs mb-1" style={{ color: '#65785F' }}>{t.label}</div>
                        <div className="text-xs font-bold" style={{ color: STATUS_COLOR[t.status] || '#65785F' }}>
                          {STATUS_LABEL[t.status] || t.status}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: '#A8C09A' }}>{t.time}</div>
                      </div>
                    ))}
                  </div>

                  <div className="px-5 py-3 flex gap-2 border-t" style={{ borderColor: '#F1F6EA' }}>
                    <Link href={`/school/track/${child.id}`}
                      className="flex-1 text-center py-2 rounded-xl text-xs font-bold text-white"
                      style={{ background: '#1F6B46' }}>
                      📍 Track Live
                    </Link>
                    <button onClick={() => setQrOpen(qrOpen === child.id ? null : child.id)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold border"
                      style={{ borderColor: '#DDE9D2', color: '#183024' }}>
                      🔐 Show QR
                    </button>
                  </div>

                  {/* QR Panel */}
                  {qrOpen === child.id && (
                    <motion.div className="px-5 pb-5" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                      <div className="rounded-2xl p-5 text-center" style={{ background: '#F1F6EA' }}>
                        <div className="text-xs font-bold mb-3" style={{ color: '#1F6B46' }}>Pickup QR — {child.name}</div>
                        {/* QR Code placeholder — in production use qrcode.react */}
                        <div className="w-32 h-32 mx-auto rounded-xl bg-white border-2 flex items-center justify-center text-3xl"
                          style={{ borderColor: '#1F6B46' }}>
                          ▩▩▩
                        </div>
                        <p className="text-xs mt-3" style={{ color: '#65785F' }}>
                          Driver scans this to verify pickup. Do not share publicly.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Driver info */}
            <div className="bg-white rounded-2xl border p-5" style={{ borderColor: '#DDE9D2' }}>
              <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#65785F' }}>Your Assigned Driver</div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ background: '#183024' }}>CE</div>
                <div className="flex-1">
                  <div className="font-extrabold" style={{ color: '#183024' }}>{CHILDREN[0].driver.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#65785F' }}>
                    {CHILDREN[0].driver.vehicle} · {CHILDREN[0].driver.plate}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold" style={{ color: '#D96B1F' }}>⭐ {CHILDREN[0].driver.rating}</span>
                    {CHILDREN[0].driver.police_cleared && (
                      <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ background: '#1F6B46' }}>✓ Police Cleared</span>
                    )}
                  </div>
                </div>
                <a href="tel:+2348000000000" className="w-10 h-10 rounded-full flex items-center justify-center text-lg text-white"
                  style={{ background: '#1F6B46' }}>📞</a>
              </div>
            </div>
          </motion.div>
        )}

        {tab === 'trips' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-extrabold mb-5" style={{ color: '#183024' }}>Trip History</h2>
            {[
              { child: 'Amara', direction: '🌅 AM Pickup', date: 'Today', status: 'Arrived', time: '8:04am' },
              { child: 'Emeka', direction: '🌅 AM Pickup', date: 'Today', status: 'Arrived', time: '8:04am' },
              { child: 'Amara', direction: '🌇 PM Dropoff', date: 'Yesterday', status: 'Completed', time: '3:38pm' },
              { child: 'Emeka', direction: '🌇 PM Dropoff', date: 'Yesterday', status: 'Completed', time: '3:41pm' },
              { child: 'Amara', direction: '🌅 AM Pickup', date: 'Yesterday', status: 'Arrived', time: '7:58am' },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border px-5 py-4 mb-3 flex items-center justify-between"
                style={{ borderColor: '#DDE9D2' }}>
                <div>
                  <div className="font-bold text-sm" style={{ color: '#183024' }}>{t.child} · {t.direction}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#65785F' }}>{t.date} · {t.time}</div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-bold text-white" style={{ background: '#1F6B46' }}>{t.status}</span>
              </div>
            ))}
          </motion.div>
        )}

        {tab === 'payments' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-extrabold mb-5" style={{ color: '#183024' }}>Payments</h2>
            <div className="bg-white rounded-2xl border p-5 mb-4" style={{ borderColor: '#DDE9D2' }}>
              <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#65785F' }}>Current Term</div>
              <div className="text-sm font-bold mb-4" style={{ color: '#183024' }}>Sep – Nov 2026 · 2 children</div>
              <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: '#F1F6EA' }}>
                <span className="text-sm" style={{ color: '#65785F' }}>Term Fee — Amara</span>
                <span className="font-bold text-sm" style={{ color: '#1F6B46' }}>Paid ✓</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: '#F1F6EA' }}>
                <span className="text-sm" style={{ color: '#65785F' }}>Term Fee — Emeka</span>
                <span className="font-bold text-sm" style={{ color: '#1F6B46' }}>Paid ✓</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm" style={{ color: '#65785F' }}>Excess Charges (Sep)</span>
                <span className="font-bold text-sm" style={{ color: '#D96B1F' }}>₦3,200</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl border p-5" style={{ borderColor: '#DDE9D2' }}>
              <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#65785F' }}>Previous Terms</div>
              <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: '#F1F6EA' }}>
                <span className="text-sm" style={{ color: '#183024' }}>Jan – Mar 2026</span>
                <span className="font-bold text-sm" style={{ color: '#1F6B46' }}>Paid ✓</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm" style={{ color: '#183024' }}>Apr – Jun 2026</span>
                <span className="font-bold text-sm" style={{ color: '#1F6B46' }}>Paid ✓</span>
              </div>
            </div>
          </motion.div>
        )}

        {tab === 'contacts' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-extrabold mb-5" style={{ color: '#183024' }}>Trusted Contacts</h2>
            <p className="text-sm mb-5" style={{ color: '#65785F' }}>
              These contacts can track your child&apos;s live trip and receive safety notifications. They cannot see any payment information.
            </p>
            {[
              { name: 'Mrs Chiamaka Okonkwo', relationship: 'Grandmother', phone: '0803 XXX XXXX', can_collect: false },
              { name: 'Nanny Grace', relationship: 'Nanny', phone: '0812 XXX XXXX', can_collect: true },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-2xl border px-5 py-4 mb-3" style={{ borderColor: '#DDE9D2' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold" style={{ color: '#183024' }}>{c.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#65785F' }}>{c.relationship} · {c.phone}</div>
                  </div>
                  {c.can_collect && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold text-white" style={{ background: '#1F6B46' }}>Can Collect</span>
                  )}
                </div>
              </div>
            ))}
            <button className="w-full py-3 rounded-xl font-bold text-white text-sm mt-2" style={{ background: '#1F6B46' }}>
              + Add Trusted Contact
            </button>
          </motion.div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="border-t flex" style={{ borderColor: '#DDE9D2', background: 'rgba(255,255,255,0.97)' }}>
        {([['home', '🏠', 'Home'], ['trips', '📋', 'Trips'], ['payments', '💳', 'Payments'], ['contacts', '👥', 'Contacts']] as const).map(([id, icon, label]) => (
          <button key={id} onClick={() => setTab(id as Tab)}
            className="flex-1 py-3 flex flex-col items-center gap-0.5 text-[11px] font-bold transition-all"
            style={{ color: tab === id ? '#1F6B46' : '#A8C09A' }}>
            <span className="text-base">{icon}</span>{label}
          </button>
        ))}
      </div>
    </div>
  )
}
