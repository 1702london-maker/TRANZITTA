'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { createBrowserSupabase } from '@/lib/supabase'

type DriverTrip = {
  id: string
  tier: string | null
  status: string
  pickup_address: string
  dropoff_address: string
  estimated_fare: number | null
  controlled_fare: number | null
  total_fare: number | null
  driver_payment_status?: string | null
  driver_payment_method?: string | null
  contact_name?: string | null
  contact_phone?: string | null
  traffic_duration_seconds?: number | null
  distance_meters?: number | null
  requested_at: string
}

type DriverDashboard = {
  profile: { full_name: string; phone: string; role: string }
  driver: { status: string; rating: number; total_trips: number; subscription_status?: string; subscription_tier?: string; subscription_expires_at?: string | null } | null
  activeTrip: DriverTrip | null
  trips: DriverTrip[]
  openTrips: DriverTrip[]
  earnings: { completed_today: number; today_gross: number; today_net: number; driver_share_rate: number }
}

export default function DriverDashboardPage() {
  const [online, setOnline] = useState(false)
  const [tab, setTab] = useState<'home' | 'trips' | 'earnings'>('home')
  const [dashboard, setDashboard] = useState<DriverDashboard | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    setLoading(true)
    setMessage('')
    const supabase = createBrowserSupabase()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      window.location.href = '/driver/login?next=/driver/dashboard'
      return
    }

    const res = await fetch('/api/driver/dashboard', {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
    const data = await res.json().catch(() => null)
    if (!res.ok) {
      setMessage(data?.error || 'Could not load driver dashboard.')
      setLoading(false)
      return
    }
    setDashboard(data)
    setOnline(data.driver?.status === 'online')
    setLoading(false)
  }

  const toggleOnline = async () => {
    const nextOnline = !online
    setOnline(nextOnline)
    setMessage('')
    const supabase = createBrowserSupabase()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const res = await fetch('/api/driver/status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ status: nextOnline ? 'online' : 'offline', lat: 6.5244, lng: 3.3792 }),
    })
    if (!res.ok) {
      setOnline(!nextOnline)
      const body = await res.json().catch(() => null)
      setMessage(body?.error || 'Could not update driver status.')
    } else {
      await loadDashboard()
    }
  }

  const confirmPaymentReceived = async (trip: DriverTrip) => {
    setMessage('')
    const supabase = createBrowserSupabase()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const fare = Number(trip.total_fare ?? trip.controlled_fare ?? trip.estimated_fare ?? 0)
    const res = await fetch(`/api/go/trips/${trip.id}/payment`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        actor: 'driver',
        method: trip.driver_payment_method || 'driver_account',
        amount: fare,
      }),
    })
    const body = await res.json().catch(() => null)
    if (!res.ok) {
      setMessage(body?.error || 'Could not confirm payment received.')
      return
    }
    await loadDashboard()
  }

  const acceptRide = async (tripId: string) => {
    setMessage('')
    const supabase = createBrowserSupabase()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const res = await fetch(`/api/driver/trips/${tripId}/accept`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
    const body = await res.json().catch(() => null)
    if (!res.ok) {
      setMessage(body?.error || 'Could not accept this ride.')
      return
    }
    await loadDashboard()
  }

  const name = dashboard?.profile.full_name || 'Driver'
  const trips = dashboard?.trips ?? []
  const openTrips = dashboard?.openTrips ?? []
  const activeTrip = dashboard?.activeTrip
  const earnings = dashboard?.earnings

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--warm-white)' }}>
      <header className="trz-dashboard-header border-b sticky top-0 z-50 flex items-center justify-between px-5 h-14" style={{ borderColor: 'var(--sage-border)' }}>
        <Image src="/tranzitta-logo.png" alt="Tranzitta" width={110} height={32} className="h-7 w-auto object-contain" />
        <div className="flex items-center gap-3">
          <button onClick={toggleOnline}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white transition-all"
            style={{ background: online ? '#1F6B46' : '#9CA3AF' }}>
            <span className={`w-2 h-2 rounded-full ${online ? 'bg-white animate-pulse' : 'bg-white/60'}`} />
            {online ? 'Online' : 'Offline'}
          </button>
        </div>
      </header>

      <div className="flex-1 p-5 max-w-lg mx-auto w-full">
        {message ? <div className="mb-4 rounded-2xl px-4 py-3 text-sm font-bold" style={{ background: '#FFF0E4', color: '#8A3B0E' }}>{message}</div> : null}
        {loading ? <div className="trz-card rounded-2xl p-8 text-center text-sm font-bold trz-muted">Loading driver dashboard...</div> : null}
        {tab === 'home' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-extrabold trz-ink mb-1">Good morning, {name.split(' ')[0]}</h2>
            <p className="text-sm trz-muted mb-6">{online ? 'You are available for Tranzitta trips' : 'Tap Online to start receiving trips'}</p>

            <div className="trz-card rounded-2xl p-5 mb-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.08em] trz-muted">Subscription</div>
                  <div className="mt-1 text-lg font-black trz-ink capitalize">{dashboard?.driver?.subscription_status ?? 'inactive'}</div>
                  <div className="mt-1 text-xs trz-muted">No active subscription means no Go marketplace access.</div>
                </div>
                <div className="rounded-2xl px-4 py-3 text-center text-sm font-black text-white" style={{ background: 'var(--orange-deep)' }}>
                  {dashboard?.driver?.subscription_tier?.replace('_', ' ') ?? 'Go Access'}
                </div>
              </div>
            </div>

            <div className="trz-card rounded-2xl p-6 mb-5">
              <div className="text-xs trz-muted mb-1">Fare Kept Today</div>
              <div className="text-4xl font-extrabold trz-ink">₦{(earnings?.today_net ?? 0).toLocaleString()}</div>
              <div className="text-sm trz-muted mt-1">{earnings?.completed_today ?? 0} trips · 100% fare kept · monthly subscription active</div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-5">
              {[[String(dashboard?.driver?.total_trips ?? trips.length), 'Trips'], [String(dashboard?.driver?.rating ?? 'New'), 'Rating'], [online ? 'Live' : 'Off', 'Status']].map(([v, l]) => (
                <div key={l} className="trz-card rounded-xl p-3 text-center">
                  <div className="text-xl font-extrabold trz-orange">{v}</div>
                  <div className="text-xs trz-muted">{l}</div>
                </div>
              ))}
            </div>

            {online ? (
              <div className="trz-card rounded-2xl p-8 text-center border-2 border-dashed" style={{ borderColor: 'var(--africa-green)' }}>
                <div className="text-3xl mb-2 animate-pulse">🚗</div>
                <p className="font-bold trz-ink">{activeTrip ? 'Active trip assigned' : 'Waiting for trips...'}</p>
                <p className="text-xs trz-muted mt-1">{activeTrip ? `${activeTrip.pickup_address} to ${activeTrip.dropoff_address}` : 'Listening for nearby requests'}</p>
              </div>
            ) : (
              <div className="trz-card rounded-2xl p-8 text-center border-2 border-dashed" style={{ borderColor: 'var(--sage-border)' }}>
                <div className="text-3xl mb-2">💤</div>
                <p className="font-bold trz-ink">You are Offline</p>
                <p className="text-xs trz-muted mt-1">Tap Online above to receive trips</p>
              </div>
            )}

            <div className="mt-5">
              <h3 className="mb-3 text-sm font-black trz-ink">Open Go Requests</h3>
              {!online ? (
                <div className="trz-card rounded-2xl p-5 text-sm font-bold trz-muted">Go online to view ride requests.</div>
              ) : openTrips.length === 0 ? (
                <div className="trz-card rounded-2xl p-5 text-sm font-bold trz-muted">No open rider requests right now.</div>
              ) : openTrips.map((trip) => (
                <div key={trip.id} className="trz-card mb-3 rounded-2xl p-4">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black trz-ink">{trip.pickup_address} to {trip.dropoff_address}</p>
                      <p className="mt-1 text-xs trz-muted">{trip.contact_name || 'Verified rider'} · {(trip.distance_meters ? `${(trip.distance_meters / 1000).toFixed(1)} km` : 'Distance pending')}</p>
                    </div>
                    <p className="text-right text-lg font-black trz-orange">₦{Number(trip.controlled_fare ?? trip.estimated_fare ?? 0).toLocaleString()}</p>
                  </div>
                  <button onClick={() => acceptRide(trip.id)} className="w-full rounded-xl py-3 text-sm font-black text-white" style={{ background: 'var(--orange-deep)' }}>
                    Accept Tranzitta Fare
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === 'trips' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-extrabold trz-ink mb-4">Trip History</h2>
            {trips.length === 0 ? (
              <div className="trz-card rounded-2xl p-8 text-center text-sm font-bold trz-muted">No trips assigned yet.</div>
            ) : trips.map(t => (
              <div key={t.id} className="trz-card rounded-2xl p-4 mb-3">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold trz-ink text-sm">{t.pickup_address} to {t.dropoff_address}</div>
                    <div className="text-xs trz-muted mt-0.5">{t.id.slice(0, 8)} · {new Date(t.requested_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-extrabold trz-orange">₦{Number(t.total_fare ?? t.controlled_fare ?? t.estimated_fare ?? 0).toLocaleString()}</div>
                    <div className="text-xs trz-muted capitalize">{t.status}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl px-3 py-2" style={{ background: '#F1F6EA' }}>
                  <span className="text-xs font-bold capitalize trz-muted">{(t.driver_payment_status || 'payment pending').replaceAll('_', ' ')}</span>
                  {t.driver_payment_status !== 'confirmed' ? (
                    <button onClick={() => confirmPaymentReceived(t)} className="rounded-full px-3 py-1.5 text-xs font-black text-white" style={{ background: '#183024' }}>
                      Confirm Received
                    </button>
                  ) : <span className="text-xs font-black" style={{ color: '#1F6B46' }}>Confirmed</span>}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {tab === 'earnings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-extrabold trz-ink mb-4">Fare Records</h2>
            <div className="trz-card rounded-2xl p-6 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm trz-muted">This Week</span>
                <span className="font-extrabold trz-ink">₦{(earnings?.today_net ?? 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm trz-muted">This Month</span>
                <span className="font-extrabold trz-ink">₦{(earnings?.today_gross ?? 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm trz-muted">Pending Confirmation</span>
                <span className="font-extrabold" style={{ color: 'var(--africa-green)' }}>₦{(earnings?.today_net ?? 0).toLocaleString()}</span>
              </div>
            </div>
            <button className="w-full py-3.5 rounded-xl font-bold text-white text-sm" style={{ background: 'var(--orange-deep)' }}>
              Confirm Payment Received →
            </button>
          </motion.div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="border-t flex" style={{ borderColor: 'var(--sage-border)', background: 'var(--warm-white)' }}>
        {([['home', '🏠', 'Home'], ['trips', '🗺️', 'Trips'], ['earnings', '💰', 'Earnings']] as const).map(([id, icon, label]) => (
          <button key={id} onClick={() => setTab(id as any)}
            className="flex-1 py-3 flex flex-col items-center gap-0.5 text-xs font-bold transition-all"
            style={{ color: tab === id ? 'var(--orange-deep)' : 'var(--text-muted)' }}>
            <span>{icon}</span>{label}
          </button>
        ))}
      </div>
    </div>
  )
}
