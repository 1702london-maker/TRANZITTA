'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createBrowserSupabase } from '@/lib/supabase'

type CorporateDashboard = {
  profile: { full_name: string; phone: string }
  client: any
  staff: any[]
  bookings: any[]
  activeBookings: any[]
  totals: { active_staff: number; active_bookings: number; excess_total: number; invoice_total: number }
}

const tabs = ['Live', 'Staff', 'Bookings', 'Billing'] as const

export default function CorporateDashboardPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Live')
  const [dashboard, setDashboard] = useState<CorporateDashboard | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const load = async () => {
      const supabase = createBrowserSupabase()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = '/corporate/login?next=/corporate/dashboard'
        return
      }

      const res = await fetch('/api/corporate/dashboard', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) setMessage(data?.error || 'Could not load corporate dashboard.')
      else setDashboard(data)
      setLoading(false)
    }

    load()
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-28" style={{ paddingTop: 90, background: 'var(--warm-white)' }}>
        <div className="mx-auto max-w-4xl px-4">
          <div className="py-7">
            <p className="mb-1 text-xs font-black uppercase tracking-widest trz-orange">Corporate Dashboard</p>
            <h1 className="text-2xl font-black trz-ink">{dashboard?.client?.company_name || 'Corporate Portal'}</h1>
            <p className="text-sm trz-muted">{dashboard?.client ? `${dashboard.client.rc_number || 'RC pending'} · ${dashboard.client.city}` : 'Create a corporate enquiry to activate your company workspace.'}</p>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="Active Staff" value={dashboard?.totals.active_staff ?? 0} />
            <Stat label="Active Trips" value={dashboard?.totals.active_bookings ?? 0} />
            <Stat label="Excess" value={`₦${Number(dashboard?.totals.excess_total ?? 0).toLocaleString()}`} orange />
            <Stat label="Billing" value={`₦${Number(dashboard?.totals.invoice_total ?? 0).toLocaleString()}`} />
          </div>

          <div className="mb-6 flex gap-2 overflow-x-auto">
            {tabs.map((item) => (
              <button key={item} onClick={() => setTab(item)} className="flex-1 rounded-2xl px-4 py-2.5 text-sm font-black" style={{ background: tab === item ? '#183024' : '#F1F6EA', color: tab === item ? 'white' : '#65785F' }}>
                {item}
              </button>
            ))}
          </div>

          {message ? <Notice>{message}</Notice> : null}
          {loading ? <Card className="p-8 text-center text-sm font-bold trz-muted">Loading corporate dashboard...</Card> : null}

          {!loading && !dashboard?.client ? (
            <Card className="p-8 text-center">
              <h2 className="font-black trz-ink">Corporate account pending</h2>
              <p className="mx-auto mt-2 max-w-md text-sm trz-muted">Submit your company details first. Ops will review routes, staff count, shuttle needs and rates.</p>
              <Link href="/corporate/enquire" className="mt-5 inline-block rounded-xl px-6 py-3 text-sm font-black text-white" style={{ background: '#D96B1F' }}>
                Start Corporate Enquiry →
              </Link>
            </Card>
          ) : null}

          {dashboard?.client && tab === 'Live' ? (
            <motion.div className="grid gap-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {dashboard.activeBookings.length === 0 ? <Card className="p-8 text-center text-sm font-bold trz-muted">No live corporate shuttle right now.</Card> : dashboard.activeBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)}
            </motion.div>
          ) : null}

          {dashboard?.client && tab === 'Staff' ? (
            <motion.div className="grid gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {dashboard.staff.length === 0 ? <Card className="p-8 text-center text-sm font-bold trz-muted">No staff added yet.</Card> : dashboard.staff.map((person) => (
                <Card key={person.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-black trz-ink">{person.staff_name}</p>
                    <p className="text-xs trz-muted">{person.pickup_zone || person.home_address} · {person.shift}</p>
                  </div>
                  <span className="rounded-full px-3 py-1 text-xs font-black" style={{ background: person.is_active ? '#F1F6EA' : '#FEE2E2', color: person.is_active ? '#1F6B46' : '#DC2626' }}>{person.is_active ? 'Active' : 'Inactive'}</span>
                </Card>
              ))}
            </motion.div>
          ) : null}

          {dashboard?.client && tab === 'Bookings' ? (
            <motion.div className="grid gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {dashboard.bookings.length === 0 ? <Card className="p-8 text-center text-sm font-bold trz-muted">No shuttle bookings yet.</Card> : dashboard.bookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)}
            </motion.div>
          ) : null}

          {dashboard?.client && tab === 'Billing' ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="p-6">
                <p className="text-xs font-black uppercase tracking-widest trz-muted">Current Invoice Estimate</p>
                <h2 className="mt-2 text-4xl font-black trz-ink">₦{Number(dashboard.totals.invoice_total).toLocaleString()}</h2>
                <p className="mt-2 text-sm trz-muted">Includes completed and active corporate booking charges currently stored in Supabase.</p>
                <div className="mt-5 rounded-xl px-4 py-3 text-sm font-bold" style={{ background: '#FFF0E4', color: '#8A3B0E' }}>
                  Excess charges: ₦{Number(dashboard.totals.excess_total).toLocaleString()}
                </div>
              </Card>
            </motion.div>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  )
}

function BookingCard({ booking }: { booking: any }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-black trz-ink">{booking.shift?.toUpperCase()} Shuttle</p>
          <p className="mt-1 text-sm trz-muted">{new Date(booking.scheduled_start).toLocaleString()} to {new Date(booking.scheduled_end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <span className="rounded-full px-3 py-1 text-xs font-black capitalize text-white" style={{ background: booking.panic_triggered ? '#DC2626' : '#1F6B46' }}>{booking.status}</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <Mini label="Hours" value={Number(booking.hours_used ?? booking.hours_booked ?? 0).toFixed(1)} />
        <Mini label="Excess" value={`₦${Number(booking.excess_charge ?? 0).toLocaleString()}`} />
        <Mini label="Total" value={`₦${Number(booking.total_charge ?? 0).toLocaleString()}`} />
      </div>
    </Card>
  )
}

function Stat({ label, value, orange = false }: { label: string; value: React.ReactNode; orange?: boolean }) {
  return <Card className="p-4 text-center"><p className="text-2xl font-black" style={{ color: orange ? '#D96B1F' : '#183024' }}>{value}</p><p className="text-xs trz-muted">{label}</p></Card>
}

function Mini({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="rounded-xl px-3 py-2" style={{ background: '#F1F6EA' }}><p className="text-sm font-black trz-ink">{value}</p><p className="text-[11px] trz-muted">{label}</p></div>
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-white ${className}`} style={{ borderColor: '#DDE9D2' }}>{children}</div>
}

function Notice({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 rounded-2xl px-4 py-3 text-sm font-bold" style={{ background: '#FFF0E4', color: '#8A3B0E' }}>{children}</div>
}
