'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createBrowserSupabase } from '@/lib/supabase'

type GoTrip = {
  id: string
  tier: string | null
  status: string
  pickup_address: string
  dropoff_address: string
  estimated_fare: number | null
  total_fare: number | null
  surge_multiplier: number | null
  payment_method: string
  payment_status: string
  requested_at: string
  rider_verified_driver: boolean
  driver_verified_rider: boolean
  driver: any
}

type GoDashboard = {
  profile: { full_name: string; phone: string; role: string }
  activeTrip: GoTrip | null
  trips: GoTrip[]
}

const tabs = ['Active', 'Track', 'History', 'Account'] as const

const statusColor: Record<string, string> = {
  requested: '#65785F',
  matched: '#1F6B46',
  driver_en_route: '#D96B1F',
  in_progress: '#1F6B46',
  completed: '#65785F',
  cancelled: '#DC2626',
}

export default function GoDashboardPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Active')
  const [dashboard, setDashboard] = useState<GoDashboard | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadDashboard = async () => {
      const supabase = createBrowserSupabase()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = '/go/login?next=/go/dashboard'
        return
      }

      const res = await fetch('/api/go/dashboard', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) setMessage(data?.error || 'Could not load your Go dashboard.')
      else setDashboard(data)
      setLoading(false)
    }

    loadDashboard()
  }, [])

  const activeTrip = dashboard?.activeTrip ?? null
  const trips = dashboard?.trips ?? []
  const history = trips.filter((trip) => ['completed', 'cancelled'].includes(trip.status))

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-28" style={{ paddingTop: 90, background: 'var(--warm-white)' }}>
        <div className="mx-auto max-w-2xl px-4">
          <div className="py-8 text-center">
            <h1 className="mb-1 text-2xl font-black trz-ink">My Rides</h1>
            <p className="text-sm trz-muted">Live trips, ride history and verified account access.</p>
          </div>

          <div className="mb-6 flex gap-1.5 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 shrink-0 rounded-2xl px-3 py-2.5 text-xs font-black transition sm:text-sm"
                style={{ background: activeTab === tab ? '#183024' : '#F1F6EA', color: activeTab === tab ? '#FFFFFF' : '#65785F' }}
              >
                {tab}
              </button>
            ))}
          </div>

          {message ? <Notice>{message}</Notice> : null}
          {loading ? <Card className="p-8 text-center text-sm font-bold trz-muted">Loading Go dashboard...</Card> : null}

          {activeTab === 'Active' ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {!activeTrip ? (
                <Card className="p-8 text-center">
                  <div className="mb-3 text-4xl">🚗</div>
                  <h2 className="font-black trz-ink">No active ride yet</h2>
                  <p className="mx-auto mt-2 max-w-sm text-sm trz-muted">Book a ride first. Your matched driver, fare hold and verification status will appear here.</p>
                  <Link href="/go/book" className="mt-5 inline-block rounded-xl px-6 py-3 text-sm font-black text-white" style={{ background: '#D96B1F' }}>
                    Book a Ride →
                  </Link>
                </Card>
              ) : (
                <TripCard trip={activeTrip} active />
              )}
            </motion.div>
          ) : null}

          {activeTab === 'Track' ? (
            <motion.div className="space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="relative h-64 overflow-hidden rounded-2xl border" style={{ borderColor: '#DDE9D2', background: 'linear-gradient(135deg, #D4EBDC, #F1F6EA)' }}>
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(31,107,70,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(31,107,70,0.22) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
                <div className="absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-black text-white" style={{ background: '#1F6B46' }}>Lagos live tracking</div>
                {activeTrip ? (
                  <>
                    <motion.div className="absolute text-3xl" style={{ left: '22%', top: '48%' }} animate={{ x: [0, 95, 145] }} transition={{ duration: 9, repeat: Infinity }}>🚗</motion.div>
                    <div className="absolute right-10 top-1/2 text-3xl">📍</div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-center text-sm font-bold trz-muted">No active ride to track.</div>
                )}
              </div>
              {activeTrip ? <TripCard trip={activeTrip} /> : null}
            </motion.div>
          ) : null}

          {activeTab === 'History' ? (
            <motion.div className="space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {history.length === 0 ? <Card className="p-8 text-center text-sm font-bold trz-muted">No completed rides yet.</Card> : history.map((trip) => <TripCard key={trip.id} trip={trip} />)}
            </motion.div>
          ) : null}

          {activeTab === 'Account' ? (
            <motion.div className="space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="p-6">
                <h2 className="mb-1 font-black trz-ink">{dashboard?.profile.full_name || 'Tranzitta Rider'}</h2>
                <p className="mb-5 text-sm trz-muted">{dashboard?.profile.phone || 'Phone pending'}</p>
                {['Role-based login active', 'Trips stored in Supabase', 'Driver matching requires registration'].map((item) => (
                  <div key={item} className="flex items-center justify-between border-b py-3 text-sm last:border-0" style={{ borderColor: '#F1F6EA' }}>
                    <span className="trz-muted">{item}</span>
                    <span className="font-black" style={{ color: '#1F6B46' }}>✓</span>
                  </div>
                ))}
              </Card>
            </motion.div>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  )
}

function TripCard({ trip, active = false }: { trip: GoTrip; active?: boolean }) {
  const driverName = trip.driver?.user?.full_name || 'Driver matching'
  const vehicle = trip.driver?.vehicle ? `${trip.driver.vehicle.make} ${trip.driver.vehicle.model} · ${trip.driver.vehicle.plate_number}` : 'Vehicle appears after matching'

  return (
    <Card className="overflow-hidden">
      <div className="flex items-start justify-between gap-4 border-b px-5 py-4" style={{ borderColor: '#DDE9D2', background: '#F1F6EA' }}>
        <div>
          <p className="text-xs font-black uppercase tracking-wide trz-muted">{trip.tier === 'executive' ? 'Executive' : 'Tranzitta Go'}</p>
          <h2 className="mt-1 font-black trz-ink">{trip.pickup_address} → {trip.dropoff_address}</h2>
        </div>
        <span className="rounded-full px-3 py-1.5 text-xs font-black capitalize text-white" style={{ background: statusColor[trip.status] || '#65785F' }}>
          {trip.status.replaceAll('_', ' ')}
        </span>
      </div>
      <div className="space-y-4 p-5">
        {active ? (
          <div className="flex items-center gap-4 rounded-xl border p-4" style={{ borderColor: '#DDE9D2' }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-black text-white" style={{ background: '#183024' }}>
              {driverName.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-black trz-ink">{driverName}</p>
              <p className="text-sm trz-muted">{vehicle}</p>
            </div>
          </div>
        ) : null}
        <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: '#F1F6EA' }}>
          <div>
            <p className="text-xs capitalize trz-muted">{trip.payment_method}</p>
            <p className="font-black trz-ink">₦{Number(trip.total_fare ?? trip.estimated_fare ?? 0).toLocaleString()}</p>
          </div>
          <p className="text-xs font-bold trz-muted">{new Date(trip.requested_at).toLocaleString()}</p>
        </div>
      </div>
    </Card>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-white ${className}`} style={{ borderColor: '#DDE9D2' }}>{children}</div>
}

function Notice({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 rounded-2xl px-4 py-3 text-sm font-bold" style={{ background: '#FFF0E4', color: '#8A3B0E' }}>{children}</div>
}
