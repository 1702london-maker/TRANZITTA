'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createBrowserSupabase } from '@/lib/supabase'

type EventsDashboard = {
  profile: { full_name: string; phone: string }
  bookings: any[]
  activeBookings: any[]
  totals: { active_bookings: number; confirmed: number; deposit_due: number }
}

const tabs = ['Bookings', 'QR', 'Track'] as const

const statusMap: Record<string, { label: string; color: string; bg: string }> = {
  enquiry: { label: 'Enquiry', color: '#D96B1F', bg: '#FFF0E4' },
  quoted: { label: 'Quote Sent', color: '#1F6B46', bg: '#F1F6EA' },
  confirmed: { label: 'Confirmed', color: '#1F6B46', bg: '#E6F4ED' },
  in_progress: { label: 'In Progress', color: '#D96B1F', bg: '#FFF0E4' },
  completed: { label: 'Completed', color: '#65785F', bg: '#F1F6EA' },
  cancelled: { label: 'Cancelled', color: '#DC2626', bg: '#FEE2E2' },
}

export default function EventsDashboardPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Bookings')
  const [dashboard, setDashboard] = useState<EventsDashboard | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const load = async () => {
      const supabase = createBrowserSupabase()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = '/events/login?next=/events/dashboard'
        return
      }

      const res = await fetch('/api/events/dashboard', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) setMessage(data?.error || 'Could not load events dashboard.')
      else setDashboard(data)
      setLoading(false)
    }

    load()
  }, [])

  const selected = dashboard?.activeBookings[0] ?? dashboard?.bookings[0]

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-28" style={{ paddingTop: 90, background: 'var(--warm-white)' }}>
        <div className="mx-auto max-w-3xl px-4">
          <div className="py-7">
            <p className="mb-1 text-xs font-black uppercase tracking-widest trz-orange">Events Dashboard</p>
            <h1 className="text-2xl font-black trz-ink">My Event Bookings</h1>
            <p className="text-sm trz-muted">{dashboard?.profile.full_name || 'Manage event quotes, deposits, QR access and live fleet tracking.'}</p>
          </div>

          <div className="mb-6 grid grid-cols-3 gap-3">
            <Stat label="Active" value={dashboard?.totals.active_bookings ?? 0} />
            <Stat label="Confirmed" value={dashboard?.totals.confirmed ?? 0} />
            <Stat label="Deposit Due" value={`₦${Number(dashboard?.totals.deposit_due ?? 0).toLocaleString()}`} orange />
          </div>

          <div className="mb-6 flex gap-2 overflow-x-auto">
            {tabs.map((item) => (
              <button key={item} onClick={() => setTab(item)} className="flex-1 rounded-2xl px-4 py-2.5 text-sm font-black" style={{ background: tab === item ? '#183024' : '#F1F6EA', color: tab === item ? 'white' : '#65785F' }}>
                {item}
              </button>
            ))}
          </div>

          {message ? <Notice>{message}</Notice> : null}
          {loading ? <Card className="p-8 text-center text-sm font-bold trz-muted">Loading events dashboard...</Card> : null}

          {tab === 'Bookings' ? (
            <motion.div className="grid gap-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {!loading && (dashboard?.bookings.length ?? 0) === 0 ? (
                <Card className="p-8 text-center">
                  <h2 className="font-black trz-ink">No event booking yet</h2>
                  <p className="mx-auto mt-2 max-w-md text-sm trz-muted">Send an enquiry and ops will create a quote, deposit and fleet plan.</p>
                  <Link href="/events/enquire" className="mt-5 inline-block rounded-xl px-6 py-3 text-sm font-black text-white" style={{ background: '#7C3AED' }}>
                    Submit Event Enquiry →
                  </Link>
                </Card>
              ) : dashboard?.bookings.map((booking) => <EventCard key={booking.id} booking={booking} />)}
            </motion.div>
          ) : null}

          {tab === 'QR' ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {selected ? (
                <Card className="p-8 text-center">
                  <p className="text-xs font-black uppercase tracking-widest trz-muted">Event QR</p>
                  <h2 className="mt-2 font-black trz-ink">{selected.event_name}</h2>
                  <div className="mx-auto my-6 flex h-36 w-36 items-center justify-center rounded-2xl border bg-white text-4xl" style={{ borderColor: '#1F6B46' }}>▩▩▩</div>
                  <p className="text-sm trz-muted">QR becomes active after deposit confirmation and driver assignment.</p>
                </Card>
              ) : <Card className="p-8 text-center text-sm font-bold trz-muted">No booking available for QR yet.</Card>}
            </motion.div>
          ) : null}

          {tab === 'Track' ? (
            <motion.div className="space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="relative h-64 overflow-hidden rounded-2xl border" style={{ borderColor: '#DDE9D2', background: 'linear-gradient(135deg, #183024, #1F6B46)' }}>
                <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
                {selected ? (
                  <>
                    <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-black trz-ink">{selected.event_name}</div>
                    <motion.div className="absolute text-3xl" style={{ left: '22%', top: '52%' }} animate={{ x: [0, 78, 132], y: [0, -8, 0] }} transition={{ duration: 8, repeat: Infinity }}>🚐</motion.div>
                    <motion.div className="absolute text-3xl" style={{ left: '35%', top: '42%' }} animate={{ x: [0, 88, 122], y: [0, 6, 0] }} transition={{ duration: 9, repeat: Infinity, delay: 0.5 }}>🚙</motion.div>
                  </>
                ) : <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white/80">No active event fleet to track.</div>}
              </div>
              {selected ? <EventCard booking={selected} /> : null}
            </motion.div>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  )
}

function EventCard({ booking }: { booking: any }) {
  const st = statusMap[booking.status] || statusMap.enquiry

  return (
    <Card className="overflow-hidden">
      <div className="flex items-start justify-between gap-4 border-b px-5 py-4" style={{ borderColor: '#F1F6EA' }}>
        <div>
          <h2 className="font-black trz-ink">{booking.event_name}</h2>
          <p className="mt-1 text-xs trz-muted">{booking.event_type} · {new Date(booking.event_date).toLocaleDateString()}</p>
        </div>
        <span className="rounded-full px-3 py-1 text-xs font-black" style={{ background: st.bg, color: st.color }}>{st.label}</span>
      </div>
      <div className="grid grid-cols-3 divide-x divide-[#F1F6EA]">
        <Mini label="Guests" value={booking.passenger_count ?? 0} />
        <Mini label="Vehicles" value={booking.vehicles_required ?? 1} />
        <Mini label="Quote" value={`₦${Number(booking.total_quote ?? 0).toLocaleString()}`} />
      </div>
      <div className="border-t px-5 py-4 text-sm trz-muted" style={{ borderColor: '#F1F6EA' }}>
        {booking.pickup_address} → {booking.dropoff_address || 'Multi-stop dropoff'}
      </div>
    </Card>
  )
}

function Stat({ label, value, orange = false }: { label: string; value: React.ReactNode; orange?: boolean }) {
  return <Card className="p-4 text-center"><p className="text-2xl font-black" style={{ color: orange ? '#D96B1F' : '#183024' }}>{value}</p><p className="text-xs trz-muted">{label}</p></Card>
}

function Mini({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="px-4 py-3 text-center"><p className="text-sm font-black trz-ink">{value}</p><p className="text-[11px] trz-muted">{label}</p></div>
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-white ${className}`} style={{ borderColor: '#DDE9D2' }}>{children}</div>
}

function Notice({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 rounded-2xl px-4 py-3 text-sm font-bold" style={{ background: '#FFF0E4', color: '#8A3B0E' }}>{children}</div>
}
