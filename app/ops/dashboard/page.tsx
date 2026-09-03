'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  BellRing,
  Camera,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  MapPin,
  PhoneCall,
  ShieldCheck,
} from 'lucide-react'
import { opsStats, opsTabs, type OpsTab } from '@/lib/tranzitta/platform'
import { PremiumCard } from '@/components/ui/PremiumShell'

const liveDrivers = [
  { name: 'Chukwuma Eze', vertical: 'Go', status: 'online', area: 'Lekki Phase 1', eta: '3 min', x: 68, y: 38 },
  { name: 'Biodun Akinwale', vertical: 'School', status: 'on_trip', area: 'Ikoyi', eta: '8 min', x: 46, y: 48 },
  { name: 'Taiwo Babatunde', vertical: 'Corporate', status: 'on_trip', area: 'VI', eta: '11 min', x: 57, y: 57 },
  { name: 'Aisha Musa', vertical: 'Airport', status: 'online', area: 'MMIA', eta: '6 min', x: 26, y: 72 },
]

const queueItems = {
  drivers: [
    { title: 'Chukwuma Eze', meta: 'Go, School - police report uploaded - home check pending', level: 'High' },
    { title: 'Biodun Akinwale', meta: 'Go - vehicle inspection complete - camera pending', level: 'Medium' },
    { title: 'Taiwo Babatunde', meta: 'Corporate, Events - ready for final approval', level: 'Ready' },
  ],
  school: [
    { title: 'Emeka Okonkwo - Greenfield Intl School', meta: 'Lekki home cluster - needs driver assignment and monthly fee', level: 'Quote' },
    { title: 'Tolu Adeyemi - Corona School', meta: 'Parent accepted quote - first payment pending', level: 'Payment' },
  ],
  corporate: [
    { title: 'Deloitte Nigeria', meta: '48 staff - AM/PM shuttle - VI route cluster', level: 'Contract' },
    { title: 'Helios Towers', meta: '22 staff - Ikeja route grouping requested', level: 'Rates' },
  ],
  events: [
    { title: 'Adeyemi Wedding', meta: '1 bus + 2 SUVs - 30% deposit quote required', level: 'Quote' },
    { title: 'Dangote AGM', meta: 'Executive sedans - airport hotel loop', level: 'Fleet' },
  ],
  airport: [
    { title: 'LH 568 Arrival', meta: 'International terminal - meet and greet - Ikoyi dropoff', level: 'Today' },
    { title: 'BA 075 Departure', meta: 'Victoria Island pickup - international terminal', level: 'Assign' },
    { title: 'Qatar QR1407 Arrival', meta: 'Flight delay watch - comfort vehicle', level: 'Watch' },
  ],
}

const panicAlerts = [
  { user: 'Amaka Osei', vertical: 'Go', location: 'Lekki Phase 1', status: 'active', age: '2 min', driver: 'Chukwuma Eze' },
  { user: 'James Adeyemi', vertical: 'Corporate', location: 'Victoria Island', status: 'acknowledged', age: '18 min', driver: 'Taiwo Babatunde' },
]

function StatusPill({ children, tone = 'orange' }: { children: React.ReactNode; tone?: 'orange' | 'green' | 'red' | 'blue' | 'dark' }) {
  const colors = {
    orange: ['#FFF0E4', '#B95418'],
    green: ['#EAF4E5', '#1F6B46'],
    red: ['#FEE2E2', '#B91C1C'],
    blue: ['#E0F2FE', '#0369A1'],
    dark: ['#183024', '#FFFFFF'],
  }[tone]

  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-extrabold" style={{ background: colors[0], color: colors[1] }}>
      {children}
    </span>
  )
}

function QueuePanel({ type }: { type: keyof typeof queueItems }) {
  const tone = type === 'airport' ? 'blue' : type === 'drivers' ? 'green' : 'orange'

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black trz-ink capitalize">{type} Queue</h2>
          <p className="text-sm trz-muted">Review, price, assign and notify from one operational lane.</p>
        </div>
        <StatusPill tone={tone as 'orange' | 'green' | 'blue'}>{queueItems[type].length} open</StatusPill>
      </div>
      <div className="grid gap-3">
        {queueItems[type].map((item) => (
          <PremiumCard key={item.title} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-black trz-ink">{item.title}</h3>
                <p className="mt-1 text-sm trz-muted">{item.meta}</p>
              </div>
              <StatusPill tone={tone as 'orange' | 'green' | 'blue'}>{item.level}</StatusPill>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold text-white" style={{ background: 'var(--africa-green)' }}>
                <FileCheck2 size={14} /> Review
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold trz-blush-pill">
                Assign <ChevronRight size={14} />
              </button>
            </div>
          </PremiumCard>
        ))}
      </div>
    </motion.div>
  )
}

export default function OpsDashboardPage() {
  const [tab, setTab] = useState<OpsTab>('live')
  const activePanicCount = useMemo(() => panicAlerts.filter((alert) => alert.status === 'active').length, [])

  return (
    <div className="min-h-screen" style={{ background: 'var(--warm-white)' }}>
      <header className="trz-dashboard-header sticky top-0 z-50 border-b px-4 py-3" style={{ borderColor: 'var(--sage-border)' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/tranzitta-logo.png" alt="Tranzitta" width={138} height={40} className="h-8 w-auto object-contain" priority />
            <StatusPill tone="dark">OPS COMMAND</StatusPill>
          </div>
          <div className="flex items-center gap-2">
            {activePanicCount ? (
              <span className="inline-flex animate-pulse items-center gap-2 rounded-full bg-red-600 px-3 py-2 text-xs font-black text-white">
                <BellRing size={14} /> {activePanicCount} Active Panic
              </span>
            ) : null}
            <div className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-white" style={{ background: 'var(--africa-green)' }}>
              O
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-5">
        <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {opsStats.map((stat) => (
            <PremiumCard key={stat.label} className="p-4">
              <div className="text-2xl font-black" style={{ color: stat.accent }}>{stat.value}</div>
              <div className="mt-1 text-xs font-bold trz-ink">{stat.label}</div>
              <div className="mt-1 text-[11px] trz-muted">{stat.delta}</div>
            </PremiumCard>
          ))}
        </div>

        <div className="mb-5 flex gap-2 overflow-x-auto rounded-[18px] border bg-white/60 p-2" style={{ borderColor: 'var(--sage-border)' }}>
          {opsTabs.map((item) => {
            const Icon = item.icon
            const active = tab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className="relative inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-black transition"
                style={{ background: active ? 'var(--orange-blush)' : 'transparent', color: active ? 'var(--orange-deep)' : 'var(--text-muted)' }}
              >
                <Icon size={15} /> {item.label}
                {item.badge ? <span className="rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] text-white">{item.badge}</span> : null}
              </button>
            )
          })}
        </div>

        {tab === 'live' ? (
          <div className="grid gap-5 lg:grid-cols-[1.5fr_0.8fr]">
            <PremiumCard className="relative min-h-[520px] overflow-hidden p-5 trz-map-bg">
              <div className="absolute inset-0 opacity-70" style={{
                background: 'linear-gradient(90deg, rgba(31,107,70,0.08) 1px, transparent 1px 70px), linear-gradient(0deg, rgba(31,107,70,0.08) 1px, transparent 1px 70px)',
              }} />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black trz-ink">Lagos Live Operations Map</h1>
                  <p className="mt-1 text-sm trz-muted">Drivers, trips, panic zones, airport pickups and surge overlays.</p>
                </div>
                <StatusPill tone="green">Realtime ready</StatusPill>
              </div>
              {liveDrivers.map((driver) => (
                <div
                  key={driver.name}
                  className="absolute z-20 rounded-2xl border bg-white px-3 py-2 shadow-lg"
                  style={{ left: `${driver.x}%`, top: `${driver.y}%`, borderColor: 'var(--sage-border)', transform: 'translate(-50%, -50%)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: driver.status === 'online' ? '#1F6B46' : '#D96B1F' }} />
                    <span className="text-xs font-black trz-ink">{driver.vertical}</span>
                  </div>
                  <div className="mt-1 text-[11px] trz-muted">{driver.area} - {driver.eta}</div>
                </div>
              ))}
              <div className="absolute bottom-5 left-5 right-5 z-10 grid gap-2 sm:grid-cols-4">
                {['47 online', '23 active trips', '6 airport transfers', '3 surge zones'].map((label) => (
                  <div key={label} className="rounded-xl bg-white/82 px-3 py-2 text-center text-xs font-black trz-ink backdrop-blur">
                    {label}
                  </div>
                ))}
              </div>
            </PremiumCard>

            <div className="grid gap-4">
              <PremiumCard className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-black trz-ink">Panic Watch</h2>
                  <StatusPill tone="red">{activePanicCount} active</StatusPill>
                </div>
                {panicAlerts.map((alert) => (
                  <div key={alert.user} className="mb-3 rounded-2xl border p-4 last:mb-0" style={{ borderColor: alert.status === 'active' ? '#FCA5A5' : 'var(--sage-border)', background: alert.status === 'active' ? '#FFF5F5' : '#FFFFFF' }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-black trz-ink">{alert.user}</div>
                        <div className="text-xs trz-muted">{alert.vertical} - {alert.location} - {alert.age}</div>
                      </div>
                      <AlertTriangle size={18} color={alert.status === 'active' ? '#DC2626' : '#D96B1F'} />
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-black text-white"><PhoneCall size={13} /> Call</button>
                      <button className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-black trz-sage-pill"><Camera size={13} /> Camera</button>
                    </div>
                  </div>
                ))}
              </PremiumCard>

              <PremiumCard className="p-5">
                <h2 className="font-black trz-ink">Safety SLA</h2>
                <div className="mt-4 space-y-3">
                  {[
                    ['Panic call response', 'under 60 sec', '#DC2626'],
                    ['GPS snapshots', 'every 10 sec', '#1F6B46'],
                    ['Driver activation', 'ops sign-off only', '#D96B1F'],
                  ].map(([label, value, color]) => (
                    <div key={label} className="flex items-center justify-between gap-4">
                      <span className="text-sm trz-muted">{label}</span>
                      <span className="text-sm font-black" style={{ color }}>{value}</span>
                    </div>
                  ))}
                </div>
              </PremiumCard>
            </div>
          </div>
        ) : null}

        {tab === 'panic' ? (
          <motion.div className="grid gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {panicAlerts.map((alert) => (
              <PremiumCard key={alert.user} className="border-l-4 p-5" style={{ borderLeftColor: alert.status === 'active' ? '#DC2626' : '#D96B1F' }}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black trz-ink">{alert.user}</h2>
                    <p className="mt-1 text-sm trz-muted">{alert.vertical} - {alert.location} - Driver: {alert.driver} - {alert.age}</p>
                  </div>
                  <StatusPill tone={alert.status === 'active' ? 'red' : 'orange'}>{alert.status}</StatusPill>
                </div>
                <div className="mt-5 grid gap-2 sm:grid-cols-5">
                  {['Call User', 'Open Camera', 'SMS Contacts', 'Notify Police', 'Resolve'].map((action, index) => (
                    <button key={action} className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-black text-white" style={{ background: index === 0 ? '#DC2626' : index === 4 ? '#1F6B46' : 'var(--text-main)' }}>
                      {index === 4 ? <CheckCircle2 size={14} /> : <SirenIcon index={index} />} {action}
                    </button>
                  ))}
                </div>
              </PremiumCard>
            ))}
          </motion.div>
        ) : null}

        {(['drivers', 'school', 'corporate', 'events', 'airport'] as const).includes(tab as any) ? <QueuePanel type={tab as keyof typeof queueItems} /> : null}

        {tab === 'compliance' ? (
          <PremiumCard className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black trz-ink">Lagos State Compliance Report</h2>
                <p className="mt-1 text-sm trz-muted">Aggregated daily trip payload, no rider PII, retryable submission log.</p>
              </div>
              <StatusPill tone="orange">Pending today</StatusPill>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-4">
              {[
                ['Total trips', '142'],
                ['Active drivers', '47'],
                ['Cities', 'Lagos'],
                ['PII included', 'No'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl p-4 text-center trz-sage-card">
                  <div className="text-2xl font-black trz-ink">{value}</div>
                  <div className="text-xs trz-muted">{label}</div>
                </div>
              ))}
            </div>
            <button className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-white" style={{ background: 'var(--africa-green)' }}>
              <FileCheck2 size={16} /> Submit Daily Report
            </button>
          </PremiumCard>
        ) : null}

        {tab === 'surge' ? (
          <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
            <PremiumCard className="min-h-[390px] p-5 trz-map-bg">
              <h2 className="text-xl font-black trz-ink">Surge Zone Drawing Surface</h2>
              <p className="mt-1 text-sm trz-muted">PostGIS polygon storage for rain, traffic, airport pressure and event demand.</p>
              <div className="mt-8 grid gap-3">
                {['Lekki rain corridor - 1.6x', 'MMIA arrivals pressure - 1.3x', 'Eko Hotel event close - 1.8x'].map((zone) => (
                  <div key={zone} className="rounded-2xl bg-white/80 p-4 text-sm font-black trz-ink">{zone}</div>
                ))}
              </div>
            </PremiumCard>
            <PremiumCard className="p-5">
              <h3 className="font-black trz-ink">Activate Surge</h3>
              <div className="mt-4 grid gap-3">
                <input className="trz-input rounded-xl px-4 py-3 text-sm outline-none" placeholder="Zone name" />
                <input className="trz-input rounded-xl px-4 py-3 text-sm outline-none" placeholder="Multiplier e.g. 1.5" />
                <input className="trz-input rounded-xl px-4 py-3 text-sm outline-none" placeholder="Reason" />
                <button className="rounded-xl px-4 py-3 text-sm font-black text-white" style={{ background: 'var(--orange-deep)' }}>Activate Zone</button>
              </div>
            </PremiumCard>
          </div>
        ) : null}

        {tab === 'support' ? (
          <PremiumCard className="p-6">
            <h2 className="text-2xl font-black trz-ink">Call Centre Interface</h2>
            <p className="mt-1 text-sm trz-muted">Ticket log, live chat handoff, panic callbacks and customer support across all verticals.</p>
            <div className="mt-6 grid gap-3">
              {['Parent asking for school ETA', 'Airport rider flight delayed', 'Driver document upload failed', 'Corporate admin invoice question'].map((ticket, index) => (
                <div key={ticket} className="flex items-center justify-between rounded-2xl border bg-white p-4" style={{ borderColor: 'var(--sage-border)' }}>
                  <div className="flex items-center gap-3">
                    <Clock3 size={18} color={index === 0 ? '#DC2626' : '#65785F'} />
                    <span className="text-sm font-black trz-ink">{ticket}</span>
                  </div>
                  <StatusPill tone={index === 0 ? 'red' : 'orange'}>{index === 0 ? 'urgent' : 'open'}</StatusPill>
                </div>
              ))}
            </div>
          </PremiumCard>
        ) : null}
      </main>
    </div>
  )
}

function SirenIcon({ index }: { index: number }) {
  if (index === 1) return <Camera size={14} />
  if (index === 2) return <PhoneCall size={14} />
  if (index === 3) return <ShieldCheck size={14} />
  return <AlertTriangle size={14} />
}
