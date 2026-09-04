'use client'

import { Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import LocationInput from '@/components/go/LocationInput'
import RoutePreviewMap from '@/components/go/RoutePreviewMap'
import { createBrowserSupabase } from '@/lib/supabase'
import { estimateGoFare, type GoTier } from '@/lib/tranzitta/go-fare'

const VEHICLE_TYPES = [
  { id: 'go', label: 'Go Standard', desc: 'Clean AC car - app-controlled fare', icon: '🚗' },
  { id: 'executive', label: 'Executive', desc: 'Premium sedan/SUV - higher driver standard', icon: '🚙' },
]

export default function GoBookPage() {
  return (
    <Suspense fallback={<GoBookShellFallback />}>
      <GoBookFlow />
    </Suspense>
  )
}

function GoBookShellFallback() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center px-4 pb-16 pt-24" style={{ background: 'var(--warm-white)' }}>
        <div className="w-full max-w-6xl">
          <div className="trz-card rounded-2xl p-6 text-center">
            <p className="text-sm font-semibold trz-muted">Loading your route...</p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

function GoBookFlow() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState<'route' | 'locked'>('route')
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [tier, setTier] = useState<GoTier>('go')
  const [paymentMethod, setPaymentMethod] = useState<'driver_account' | 'cash'>('driver_account')
  const [passengers, setPassengers] = useState(1)
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [specialRequirements, setSpecialRequirements] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setPickup(searchParams.get('pickup') || '')
    setDropoff(searchParams.get('dropoff') || '')
  }, [searchParams])

  const hasRoute = pickup.trim().length > 2 && dropoff.trim().length > 2
  const quote = estimateGoFare(pickup, dropoff, tier)
  const nextPath = `/go/book?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}`
  const authHref = `/go/login?next=${encodeURIComponent(nextPath)}`

  const submitRide = async () => {
    setMessage('')
    if (!quote) {
      setMessage('Choose a valid Lagos pickup and destination first.')
      setStep('route')
      return
    }
    if (!contactName.trim() || !contactPhone.trim()) {
      setMessage('Enter your name and phone number so ops and the driver can verify the booking.')
      return
    }

    setSubmitting(true)
    try {
      const supabase = createBrowserSupabase()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = authHref
        return
      }

      const res = await fetch('/api/go/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          tier,
          pickup_address: pickup,
          dropoff_address: dropoff,
          payment_method: paymentMethod,
          controlled_fare: quote.controlledFare,
          estimated_fare: quote.controlledFare,
          surge_multiplier: quote.surgeMultiplier,
          traffic_duration_seconds: quote.trafficDurationSeconds,
          distance_meters: quote.distanceMeters,
          fare_provider: quote.provider,
          passengers,
          contact_name: contactName,
          contact_phone: contactPhone,
          special_requirements: specialRequirements,
        }),
      })
      const body = await res.json().catch(() => null)
      if (!res.ok) throw new Error(body?.error || 'Could not create your ride.')
      window.location.href = `/go/dashboard?trip=${body.id}`
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not book this ride.')
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center px-4 pb-20 pt-24" style={{ background: 'var(--warm-white)' }}>
        <div className="w-full max-w-6xl">
          <div className="mb-8 flex gap-2">
            {['Route', 'Register', 'Match'].map((s, i) => (
              <div key={s} className="flex-1">
                <div className="h-1.5 rounded-full" style={{ background: i <= ['route', 'locked'].indexOf(step) ? 'var(--orange-deep)' : 'var(--sage-border)' }} />
                <p className="mt-2 text-center text-[11px] font-black uppercase tracking-[0.08em] trz-muted">{s}</p>
              </div>
            ))}
          </div>

          {step === 'route' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="grid gap-5 lg:grid-cols-[0.44fr_1fr]">
                <div>
                  <h1 className="mb-2 text-3xl font-black trz-ink">Where to?</h1>
                  <p className="mb-6 text-sm leading-6 trz-muted">Search real Lagos launch locations first. Tranzitta controls the fare; matching subscribed drivers unlock after rider registration.</p>
                  <div className="trz-card mb-4 rounded-2xl p-5">
                    <div className="mb-4">
                      <LocationInput value={pickup} onChange={setPickup} placeholder="Pickup location" tone="pickup" />
                    </div>
                    <LocationInput value={dropoff} onChange={setDropoff} placeholder="Dropoff location" tone="dropoff" />
                  </div>
                  <div className="mb-4 grid grid-cols-2 gap-3">
                    {VEHICLE_TYPES.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setTier(v.id as GoTier)}
                        className="trz-card rounded-2xl p-4 text-left transition hover:-translate-y-0.5"
                        style={{ borderColor: tier === v.id ? 'var(--orange-deep)' : 'var(--sage-border)', background: tier === v.id ? '#FFF0E4' : '#FFFFFF' }}
                      >
                        <span className="text-2xl">{v.icon}</span>
                        <span className="mt-2 block text-sm font-black trz-ink">{v.label}</span>
                        <span className="mt-1 block text-xs trz-muted">{v.desc}</span>
                      </button>
                    ))}
                  </div>
                  {quote ? (
                    <div className="trz-card mb-4 rounded-2xl p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.08em] trz-muted">Controlled fare</p>
                          <p className="mt-1 text-3xl font-black trz-ink">₦{quote.controlledFare.toLocaleString()}</p>
                        </div>
                        <div className="text-right text-xs font-bold trz-muted">
                          <p>{(quote.distanceMeters / 1000).toFixed(1)} km</p>
                          <p>{Math.round(quote.trafficDurationSeconds / 60)} min</p>
                          <p>{quote.trafficLabel}</p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {message ? <p className="mb-4 rounded-2xl px-4 py-3 text-sm font-bold" style={{ background: '#FFF0E4', color: '#8A3B0E' }}>{message}</p> : null}
                  <button
                    onClick={() => setStep('locked')}
                    disabled={!hasRoute}
                    className="w-full rounded-xl py-4 text-sm font-bold text-white transition-transform enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ background: 'var(--orange-deep)' }}
                  >
                    Continue to Driver Matching →
                  </button>
                  <p className="mt-3 text-center text-xs trz-muted">No repeat-driver selection. Every match stays inside Tranzitta for safety, pricing and support.</p>
                </div>
                <RoutePreviewMap pickup={pickup} dropoff={dropoff} />
              </div>
            </motion.div>
          )}

          {step === 'locked' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="mb-2 text-3xl font-black trz-ink">Create your Tranzitta account</h1>
              <p className="mb-6 text-sm trz-muted">For safety, we verify riders before showing subscribed drivers. Fare is set by Tranzitta and both sides confirm payment in-app.</p>
              <div className="grid gap-5 lg:grid-cols-[0.44fr_1fr]">
                <div>
                  <div className="trz-card mb-5 space-y-3 rounded-2xl p-5">
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="trz-muted">Pickup</span>
                      <span className="text-right font-semibold trz-ink">{pickup}</span>
                    </div>
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="trz-muted">Dropoff</span>
                      <span className="text-right font-semibold trz-ink">{dropoff}</span>
                    </div>
                    <div className="border-t pt-3" style={{ borderColor: 'var(--sage-border)' }}>
                      <div className="flex justify-between">
                        <span className="font-semibold trz-ink">Tranzitta Controlled Fare</span>
                        <span className="font-extrabold trz-orange">{quote ? `₦${quote.controlledFare.toLocaleString()}` : 'Pending'}</span>
                      </div>
                      <p className="mt-1 text-xs trz-muted">Driver keeps the fare. Tranzitta controls price and access through driver subscription.</p>
                    </div>
                  </div>
                  <div className="trz-card mb-5 rounded-2xl p-5">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.08em] trz-muted">Rider details</p>
                    <input className="mb-3 w-full trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300" placeholder="Your full name" value={contactName} onChange={(e) => setContactName(e.target.value)} />
                    <input className="mb-3 w-full trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300" placeholder="Phone number" type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
                    <div className="mb-3 flex items-center gap-3">
                      <button onClick={() => setPassengers(Math.max(1, passengers - 1))} className="h-10 w-10 rounded-xl text-lg font-black" style={{ background: '#F1F6EA', color: 'var(--text-main)' }}>-</button>
                      <div className="flex-1 text-center text-sm font-black trz-ink">{passengers} passenger{passengers === 1 ? '' : 's'}</div>
                      <button onClick={() => setPassengers(Math.min(6, passengers + 1))} className="h-10 w-10 rounded-xl text-lg font-black" style={{ background: '#F1F6EA', color: 'var(--text-main)' }}>+</button>
                    </div>
                    <textarea className="w-full trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300" placeholder="Notes for ops or driver, optional" rows={3} value={specialRequirements} onChange={(e) => setSpecialRequirements(e.target.value)} />
                  </div>
                  <div className="trz-card mb-5 rounded-2xl p-5">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.08em] trz-muted">Payment confirmation</p>
                    <div className="mb-4 grid grid-cols-2 gap-2">
                      {[
                        ['driver_account', 'Driver account'],
                        ['cash', 'Cash'],
                      ].map(([id, label]) => (
                        <button
                          key={id}
                          onClick={() => setPaymentMethod(id as 'driver_account' | 'cash')}
                          className="rounded-xl px-3 py-3 text-sm font-black"
                          style={{ background: paymentMethod === id ? '#183024' : '#F1F6EA', color: paymentMethod === id ? '#FFFFFF' : '#65785F' }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <div className="grid gap-2">
                      {['Pay driver account or cash', 'Rider marks paid in the app', 'Driver marks received in the app', 'Ops investigates any mismatch'].map((item, index) => (
                        <div key={item} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold" style={{ background: index === 3 ? '#FFF0E4' : '#F1F6EA', color: 'var(--text-main)' }}>
                          <span className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black text-white" style={{ background: index === 3 ? 'var(--orange-deep)' : 'var(--africa-green)' }}>{index + 1}</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-5 grid grid-cols-1 gap-3">
                    {VEHICLE_TYPES.map((v) => (
                      <button key={v.id} onClick={() => setTier(v.id as GoTier)} className="trz-card flex w-full items-center gap-4 rounded-2xl p-4 text-left transition" style={{ borderColor: tier === v.id ? 'var(--orange-deep)' : 'var(--sage-border)', background: tier === v.id ? '#FFF0E4' : '#FFFFFF' }}>
                        <span className="text-2xl">{v.icon}</span>
                        <div className="flex-1">
                          <div className="font-extrabold trz-ink">{v.label}</div>
                          <div className="text-xs trz-muted">{v.desc}</div>
                        </div>
                        <div className="text-sm font-bold trz-orange">{quote ? `₦${quote.controlledFare.toLocaleString()}` : 'Select route'}</div>
                      </button>
                    ))}
                  </div>
                  {message ? <p className="mb-4 rounded-2xl px-4 py-3 text-sm font-bold" style={{ background: '#FFF0E4', color: '#8A3B0E' }}>{message}</p> : null}
                  <button onClick={submitRide} disabled={submitting} className="block w-full rounded-xl py-4 text-center text-sm font-bold text-white disabled:opacity-60" style={{ background: 'var(--orange-deep)' }}>
                    {submitting ? 'Creating ride...' : 'Confirm Ride in Tranzitta →'}
                  </button>
                  <Link href={authHref} className="mt-3 block w-full rounded-xl py-4 text-center text-sm font-bold text-white" style={{ background: 'var(--text-main)' }}>
                    Login / Create Account
                  </Link>
                  <button onClick={() => setStep('route')} className="mt-3 w-full text-center text-xs trz-muted">← Edit route</button>
                </div>
                <div>
                  <RoutePreviewMap pickup={pickup} dropoff={dropoff} />
                  <div className="trz-blush-pill mt-3 rounded-2xl px-4 py-3 text-sm font-semibold">
                    Exact nearby drivers stay hidden until the rider is verified. Repeat-driver preference is blocked on Go.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <WhatsAppButton />
    </>
  )
}
