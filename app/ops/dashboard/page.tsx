'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

type Tab = 'live' | 'panic' | 'drivers' | 'school' | 'corporate' | 'events' | 'compliance' | 'surge'

const MOCK_PANIC = [
  { id: 1, user: 'Amaka Osei', vertical: 'Go', location: 'Lekki Phase 1', time: '2 min ago', status: 'active' },
  { id: 2, user: 'James Adeyemi', vertical: 'Corporate', location: 'Victoria Island', time: '18 min ago', status: 'acknowledged' },
]

const MOCK_DRIVERS = [
  { id: 1, name: 'Chukwuma Eze', status: 'pending', vertical: 'Go, School', submitted: '1h ago' },
  { id: 2, name: 'Biodun Akinwale', status: 'pending', vertical: 'Go', submitted: '3h ago' },
  { id: 3, name: 'Taiwo Babatunde', status: 'approved', vertical: 'Corporate, Events', submitted: '2d ago' },
]

const MOCK_SCHOOL = [
  { id: 1, parent: 'Mrs Okonkwo', child: 'Emeka Okonkwo', school: 'Greenfield Int\'l School', status: 'enquiry', submitted: '2h ago' },
  { id: 2, parent: 'Dr Adeyemi', child: 'Tolu Adeyemi', school: 'Corona School', status: 'quoted', submitted: '1d ago' },
]

const MOCK_STATS = [
  { label: 'Active Drivers', value: '47', color: '#1F6B46' },
  { label: 'Active Trips', value: '23', color: '#D96B1F' },
  { label: 'Panic Alerts', value: '2', color: '#DC2626' },
  { label: 'Pending Drivers', value: '8', color: '#7C3AED' },
  { label: 'School Enquiries', value: '5', color: '#0369A1' },
  { label: 'Today\'s Trips', value: '142', color: '#183024' },
]

export default function OpsDashboardPage() {
  const [tab, setTab] = useState<Tab>('live')
  const [panicActive, setPanicActive] = useState(true)

  const tabs: { id: Tab; label: string; icon: string; badge?: number }[] = [
    { id: 'live', label: 'Live Map', icon: '🗺️' },
    { id: 'panic', label: 'Panic Alerts', icon: '🚨', badge: 2 },
    { id: 'drivers', label: 'Driver Queue', icon: '🧑‍💼', badge: 8 },
    { id: 'school', label: 'School Queue', icon: '🏫', badge: 5 },
    { id: 'corporate', label: 'Corporate', icon: '🏢' },
    { id: 'events', label: 'Events', icon: '🎉' },
    { id: 'compliance', label: 'Compliance', icon: '📋' },
    { id: 'surge', label: 'Surge Zones', icon: '⚡' },
  ]

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--warm-white)' }}>
      {/* Ops header */}
      <header className="trz-dashboard-header border-b sticky top-0 z-50 flex items-center justify-between px-5 h-14" style={{ borderColor: 'var(--sage-border)' }}>
        <div className="flex items-center gap-3">
          <Image src="/tranzitta-logo.png" alt="Tranzitta" width={110} height={32} className="h-7 w-auto object-contain" />
          <span className="text-xs font-bold px-2 py-0.5 rounded-full trz-high-pill">OPS</span>
        </div>
        <div className="flex items-center gap-3">
          {panicActive && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-white animate-pulse"
              style={{ background: '#DC2626' }}>
              🚨 2 Active Panics
            </div>
          )}
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: 'var(--africa-green)' }}>O</div>
        </div>
      </header>

      {/* Stats */}
      <div className="border-b px-5 py-4" style={{ borderColor: 'var(--sage-border)', background: 'rgba(255,249,242,0.7)' }}>
        <div className="flex gap-4 overflow-x-auto">
          {MOCK_STATS.map((s, i) => (
            <div key={i} className="flex-shrink-0 text-center">
              <div className="text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs trz-muted whitespace-nowrap">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div className="border-b px-4 overflow-x-auto flex gap-1 py-2" style={{ borderColor: 'var(--sage-border)', background: 'var(--warm-white)' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all relative flex-shrink-0"
            style={{
              background: tab === t.id ? 'var(--orange-blush)' : 'transparent',
              color: tab === t.id ? 'var(--orange-deep)' : 'var(--text-muted)',
            }}>
            {t.icon} {t.label}
            {t.badge && <span className="ml-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center" style={{ background: '#DC2626', fontSize: 10 }}>{t.badge}</span>}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-5">
        {tab === 'live' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-extrabold trz-ink mb-4">Live Map — All Active Trips</h2>
            <div className="trz-map-bg rounded-2xl flex items-center justify-center" style={{ height: 420 }}>
              <div className="text-center">
                <div className="text-4xl mb-3">🗺️</div>
                <p className="text-sm font-semibold trz-ink">Google Maps Integration</p>
                <p className="text-xs trz-muted mt-1">All active drivers shown in real time via PostGIS · GOOGLE_MAPS_API_KEY required</p>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  {[['🟢', '47 Online'], ['🔵', '23 On Trip'], ['🔴', '2 Panic Active'], ['⚫', '8 Offline']].map(([dot, label]) => (
                    <span key={label} className="text-xs font-semibold px-2.5 py-1 rounded-full trz-card">{dot} {label}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {tab === 'panic' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-extrabold trz-ink">Panic Alerts</h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: '#DC2626' }}>🔴 {MOCK_PANIC.filter(p => p.status === 'active').length} Active</span>
            </div>
            <div className="space-y-3">
              {MOCK_PANIC.map(p => (
                <div key={p.id} className="trz-card rounded-2xl p-5 border-l-4" style={{ borderLeftColor: p.status === 'active' ? '#DC2626' : '#D96B1F' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-extrabold trz-ink">{p.user}</div>
                      <div className="text-xs trz-muted mt-0.5">{p.vertical} · {p.location} · {p.time}</div>
                    </div>
                    <div className="flex gap-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${p.status === 'active' ? 'text-white' : 'trz-blush-pill'}`}
                        style={{ background: p.status === 'active' ? '#DC2626' : undefined }}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ background: '#DC2626' }}>📞 Call User</button>
                    <button className="px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ background: '#7C3AED' }}>📹 Camera Feed</button>
                    <button className="px-4 py-2 rounded-xl text-xs font-bold trz-sage-pill">🚔 Police</button>
                    <button className="px-4 py-2 rounded-xl text-xs font-bold" style={{ background: 'var(--sage-light)', color: 'var(--africa-green)' }}>✓ Resolve</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === 'drivers' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-extrabold trz-ink mb-4">Driver Approval Queue</h2>
            <div className="space-y-3">
              {MOCK_DRIVERS.map(d => (
                <div key={d.id} className="trz-card rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-extrabold trz-ink">{d.name}</div>
                    <div className="text-xs trz-muted mt-0.5">Verticals: {d.vertical} · {d.submitted}</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${d.status === 'pending' ? 'trz-blush-pill' : 'text-white'}`}
                      style={{ background: d.status === 'approved' ? '#1F6B46' : undefined }}>
                      {d.status}
                    </span>
                    {d.status === 'pending' && (
                      <>
                        <button className="px-3 py-1.5 rounded-xl text-xs font-bold text-white" style={{ background: '#1F6B46' }}>✓ Approve</button>
                        <button className="px-3 py-1.5 rounded-xl text-xs font-bold trz-blush-pill">✕ Reject</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === 'school' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-extrabold trz-ink mb-4">School Enquiry Queue</h2>
            <div className="space-y-3">
              {MOCK_SCHOOL.map(s => (
                <div key={s.id} className="trz-card rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-extrabold trz-ink">{s.child}</div>
                      <div className="text-xs trz-muted mt-0.5">Parent: {s.parent} · School: {s.school} · {s.submitted}</div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold trz-blush-pill">{s.status}</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ background: '#1F6B46' }}>Assign Driver & Quote</button>
                    <button className="px-4 py-2 rounded-xl text-xs font-bold trz-sage-pill">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === 'compliance' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-extrabold trz-ink mb-4">Lagos State Compliance Reports</h2>
            <div className="trz-card rounded-2xl p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-semibold trz-muted">Today&apos;s Report</div>
                  <div className="text-lg font-extrabold trz-ink mt-1">02 Sep 2026</div>
                </div>
                <span className="text-xs px-3 py-1.5 rounded-full font-bold text-white" style={{ background: '#DC2626' }}>Pending Submission</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-5">
                {[['142', 'Total Trips'], ['47', 'Active Drivers'], ['Lagos', 'City']].map(([v, l]) => (
                  <div key={l} className="trz-sage-card rounded-xl p-3 text-center">
                    <div className="text-xl font-extrabold trz-ink">{v}</div>
                    <div className="text-xs trz-muted">{l}</div>
                  </div>
                ))}
              </div>
              <button className="px-6 py-3 rounded-xl font-bold text-white text-sm" style={{ background: 'var(--africa-green)' }}>
                Submit to Lagos State API →
              </button>
            </div>
          </motion.div>
        )}

        {tab === 'surge' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-extrabold trz-ink mb-4">Surge Zone Manager</h2>
            <div className="trz-map-bg rounded-2xl flex items-center justify-center mb-4" style={{ height: 340 }}>
              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <p className="text-sm font-semibold trz-ink">Draw Surge Zones on Map</p>
                <p className="text-xs trz-muted mt-1">Google Maps + PostGIS polygon storage · Set multiplier + duration</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input className="trz-input rounded-xl px-4 py-3 text-sm outline-none" placeholder="Zone Name" />
              <input className="trz-input rounded-xl px-4 py-3 text-sm outline-none" placeholder="Multiplier (e.g. 1.5)" type="number" step="0.1" />
              <input className="trz-input rounded-xl px-4 py-3 text-sm outline-none" placeholder="Reason (e.g. rain)" />
              <button className="sm:col-span-3 px-6 py-3 rounded-xl font-bold text-white text-sm" style={{ background: 'var(--orange-deep)' }}>
                Activate Surge Zone →
              </button>
            </div>
          </motion.div>
        )}

        {(tab === 'corporate' || tab === 'events') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-extrabold trz-ink mb-4">{tab === 'corporate' ? 'Corporate' : 'Events'} Enquiry Queue</h2>
            <div className="trz-card rounded-2xl p-8 text-center">
              <div className="text-4xl mb-3">{tab === 'corporate' ? '🏢' : '🎉'}</div>
              <p className="text-sm font-semibold trz-ink">No pending enquiries</p>
              <p className="text-xs trz-muted mt-1">New {tab} enquiries from the web form will appear here</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
