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

const VEHICLE_TYPES = [
  { id: 'standard', label: 'Go Standard', desc: 'Clean AC car - app-controlled fare', price: '₦2,400-₦3,100', icon: '🚗' },
  { id: 'comfort', label: 'Go Comfort', desc: 'Roomier sedan - verified driver', price: '₦3,200-₦4,100', icon: '🚙' },
  { id: 'suv', label: 'Go SUV', desc: 'SUV/Prado class - premium city trips', price: '₦4,800-₦6,200', icon: '🚙' },
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

  useEffect(() => {
    setPickup(searchParams.get('pickup') || '')
    setDropoff(searchParams.get('dropoff') || '')
  }, [searchParams])

  const hasRoute = pickup.trim().length > 2 && dropoff.trim().length > 2
  const authHref = `/go/login?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}`

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
                        <span className="font-extrabold trz-orange">₦2,400-₦3,100</span>
                      </div>
                      <p className="mt-1 text-xs trz-muted">Driver keeps the fare. Tranzitta controls price and access through driver subscription.</p>
                    </div>
                  </div>
                  <div className="trz-card mb-5 rounded-2xl p-5">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.08em] trz-muted">Payment confirmation</p>
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
                      <div key={v.id} className="trz-card flex w-full items-center gap-4 rounded-2xl p-4 text-left opacity-75">
                        <span className="text-2xl">{v.icon}</span>
                        <div className="flex-1">
                          <div className="font-extrabold trz-ink">{v.label}</div>
                          <div className="text-xs trz-muted">{v.desc}</div>
                        </div>
                        <div className="text-sm font-bold trz-orange">{v.price}</div>
                      </div>
                    ))}
                  </div>
                  <Link href={authHref} className="block w-full rounded-xl py-4 text-center text-sm font-bold text-white" style={{ background: 'var(--orange-deep)' }}>
                    Login to See Matching Drivers →
                  </Link>
                  <Link href={authHref} className="mt-3 block w-full rounded-xl py-4 text-center text-sm font-bold text-white" style={{ background: 'var(--text-main)' }}>
                    Create Account
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
