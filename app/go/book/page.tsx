'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const STEPS = ['Tier', 'Journey', 'Payment', 'Confirm']

type FormData = {
  tier: 'go' | 'executive' | ''
  pickup_address: string
  dropoff_address: string
  estimated_fare: number | null
  surge_multiplier: number
  surge_active: boolean
  payment_method: 'card_hold' | 'bank_transfer' | ''
  passengers: number
  special_requirements: string
  contact_name: string
  contact_phone: string
}

const INIT: FormData = {
  tier: '',
  pickup_address: '',
  dropoff_address: '',
  estimated_fare: null,
  surge_multiplier: 1,
  surge_active: false,
  payment_method: '',
  passengers: 1,
  special_requirements: '',
  contact_name: '',
  contact_phone: '',
}

export default function GoBookPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(INIT)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [tripId, setTripId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [estimating, setEstimating] = useState(false)

  const set = (k: keyof FormData, v: unknown) => setForm(f => ({ ...f, [k]: v }))

  const estimateFare = async () => {
    if (!form.pickup_address || !form.dropoff_address) return
    setEstimating(true)
    await new Promise(r => setTimeout(r, 1200))
    const base = form.tier === 'executive' ? 6500 : 3800
    const surge = form.surge_active ? 1.3 : 1
    set('estimated_fare', Math.round(base * surge))
    set('surge_multiplier', surge)
    setEstimating(false)
  }

  const canNext = (): boolean => {
    if (step === 0) return !!form.tier
    if (step === 1) return !!(form.pickup_address && form.dropoff_address && form.estimated_fare)
    if (step === 2) return !!form.payment_method
    if (step === 3) return !!(form.contact_name && form.contact_phone)
    return false
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/go/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit')
      setTripId(data.id)
      setSubmitted(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-6 py-24" style={{ paddingTop: 90, background: 'var(--warm-white)' }}>
          <motion.div className="max-w-lg w-full text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="gradient-frame rounded-3xl p-10">
              <div className="text-5xl mb-5">🚗</div>
              <h1 className="text-3xl font-black mb-3" style={{ color: '#183024' }}>
                {form.tier === 'executive' ? 'Executive Request Sent' : 'Ride Booked'}
              </h1>
              {form.tier === 'executive' ? (
                <p className="mb-4" style={{ color: '#65785F' }}>
                  Ops are preparing your fare — you&apos;ll receive a confirmed Executive price within 5 minutes. Card will be held on your confirmation.
                </p>
              ) : (
                <p className="mb-4" style={{ color: '#65785F' }}>
                  Matching you with the nearest verified driver. Card hold placed for ₦{form.estimated_fare?.toLocaleString()}.
                </p>
              )}
              {tripId && (
                <div className="mt-2 px-4 py-2 rounded-xl text-sm font-bold" style={{ background: '#F1F6EA', color: '#183024' }}>
                  Trip Ref: {tripId.slice(0, 8).toUpperCase()}
                </div>
              )}
              <div className="mt-5 p-4 rounded-xl text-sm" style={{ background: '#FFF0E4', color: '#D96B1F' }}>
                <strong>Confirm both driver and vehicle before boarding.</strong> Check plate, name and photo in app.
              </div>
              <div className="mt-8 flex gap-3 justify-center">
                <Link href="/go/dashboard" className="px-6 py-3 rounded-full font-bold text-white" style={{ background: '#1F6B46' }}>
                  Track Ride
                </Link>
                <Link href="/go" className="px-6 py-3 rounded-full font-bold border-2" style={{ color: '#183024', borderColor: '#DDE9D2' }}>
                  Back to Go
                </Link>
              </div>
            </div>
          </motion.div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 pb-24" style={{ paddingTop: 90, background: 'var(--warm-white)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black mb-2" style={{ color: '#183024' }}>Book a Ride</h1>
            <p className="text-sm" style={{ color: '#65785F' }}>Zero cash · BVN verified · Mutual confirmation before boarding</p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-10">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all"
                    style={{ background: i < step ? '#1F6B46' : i === step ? '#183024' : '#F1F6EA', color: i <= step ? 'white' : '#65785F' }}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className="text-xs font-bold hidden sm:block" style={{ color: i === step ? '#183024' : '#65785F' }}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className="flex-1 h-px" style={{ background: i < step ? '#1F6B46' : '#DDE9D2' }} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>

              {/* STEP 0: Tier */}
              {step === 0 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-extrabold" style={{ color: '#183024' }}>Choose Your Tier</h2>
                  <div className="space-y-4">
                    {[
                      {
                        val: 'go', icon: '🚗', name: 'Tranzitta Go', rating: '4.0+ rated drivers',
                        vehicle: 'Clean, AC, 4-door — max 5 years old',
                        pricing: 'Live traffic fare — shown before booking',
                        tags: ['Standard Fare', 'Fast Matching', 'Any Distance'],
                      },
                      {
                        val: 'executive', icon: '⭐', name: 'Tranzitta Executive', rating: '4.5+ rated drivers',
                        vehicle: 'Premium sedan or SUV — luxury spec, max 3 years old',
                        pricing: 'Ops-approved fare — confirmed within 5 min',
                        tags: ['Premium Fare', 'Corporate Ready', 'Ops-Assisted Pricing'],
                      },
                    ].map(t => (
                      <button key={t.val} onClick={() => set('tier', t.val)}
                        className="w-full p-6 rounded-2xl border-2 text-left transition-all"
                        style={{
                          borderColor: form.tier === t.val ? '#183024' : '#DDE9D2',
                          background: form.tier === t.val ? '#F1F6EA' : 'white',
                        }}>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{t.icon}</span>
                          <div>
                            <div className="font-extrabold" style={{ color: '#183024' }}>{t.name}</div>
                            <div className="text-xs" style={{ color: '#D96B1F' }}>{t.rating}</div>
                          </div>
                        </div>
                        <div className="text-sm mb-2" style={{ color: '#65785F' }}>{t.vehicle}</div>
                        <div className="text-xs font-semibold mb-3" style={{ color: '#1F6B46' }}>₦ {t.pricing}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {t.tags.map(tag => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                              style={{ background: form.tier === t.val ? '#DDE9D2' : '#F1F6EA', color: '#183024' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 1: Journey */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-extrabold" style={{ color: '#183024' }}>Your Journey</h2>
                  {form.tier === 'executive' && (
                    <div className="p-4 rounded-2xl text-sm" style={{ background: '#FFF0E4', color: '#D96B1F' }}>
                      Executive fare is ops-assisted — your confirmed price will be sent within 5 minutes of booking.
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#65785F' }}>Pickup Address</label>
                    <input type="text" placeholder="Street, area, Lagos"
                      value={form.pickup_address}
                      onChange={e => { set('pickup_address', e.target.value); set('estimated_fare', null) }}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#65785F' }}>Destination</label>
                    <input type="text" placeholder="Street, area, Lagos"
                      value={form.dropoff_address}
                      onChange={e => { set('dropoff_address', e.target.value); set('estimated_fare', null) }}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl border" style={{ borderColor: '#DDE9D2', background: '#F1F6EA' }}>
                    <input type="checkbox" id="surge" checked={form.surge_active}
                      onChange={e => { set('surge_active', e.target.checked); set('estimated_fare', null) }}
                      className="w-4 h-4" />
                    <label htmlFor="surge" className="text-sm" style={{ color: '#65785F' }}>
                      My area is under surge — I&apos;d like to see the surge-inclusive estimate
                    </label>
                  </div>
                  {form.pickup_address && form.dropoff_address && !form.estimated_fare && (
                    <button onClick={estimateFare} disabled={estimating}
                      className="w-full py-3 rounded-xl font-bold text-sm text-white"
                      style={{ background: estimating ? '#DDE9D2' : '#1F6B46' }}>
                      {estimating ? 'Calculating...' : 'Get Fare Estimate →'}
                    </button>
                  )}
                  {form.estimated_fare && (
                    <motion.div className="p-5 rounded-2xl border" style={{ background: 'white', borderColor: '#DDE9D2' }}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wide" style={{ color: '#65785F' }}>Estimated Fare</div>
                          <div className="text-3xl font-black" style={{ color: '#183024' }}>₦{form.estimated_fare.toLocaleString()}</div>
                        </div>
                        {form.surge_active && (
                          <div className="text-right">
                            <div className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: '#FFF0E4', color: '#D96B1F' }}>
                              ⚡ Surge {form.surge_multiplier}x Active
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-xs mt-3" style={{ color: '#65785F' }}>
                        Actual fare charged at trip end based on real distance and time. Card hold placed now.
                      </p>
                    </motion.div>
                  )}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#65785F' }}>Passengers</label>
                    <input type="number" min={1} max={4} value={form.passengers}
                      onChange={e => set('passengers', parseInt(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                  </div>
                </div>
              )}

              {/* STEP 2: Payment */}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-extrabold" style={{ color: '#183024' }}>Payment Method</h2>
                  <div className="p-4 rounded-2xl text-sm border" style={{ background: '#FFF0E4', borderColor: '#FFD6AA', color: '#D96B1F' }}>
                    💸 <strong>No cash. No exceptions.</strong> Card hold or bank transfer only. Full payment trail on every trip.
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        val: 'card_hold', icon: '💳', name: 'Card Hold',
                        desc: 'Card authorised and held for estimated fare now. Charged at actual fare on trip completion. Partial release if lower.',
                      },
                      {
                        val: 'bank_transfer', icon: '🏦', name: 'Bank Transfer',
                        desc: 'Unique virtual account generated for this trip only. Transfer estimated fare — system auto-confirms. Driver moves on confirmation. 10-minute window.',
                      },
                    ].map(pm => (
                      <button key={pm.val} onClick={() => set('payment_method', pm.val)}
                        className="w-full p-6 rounded-2xl border-2 text-left transition-all"
                        style={{
                          borderColor: form.payment_method === pm.val ? '#1F6B46' : '#DDE9D2',
                          background: form.payment_method === pm.val ? '#F1F6EA' : 'white',
                        }}>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{pm.icon}</span>
                          <div className="font-extrabold" style={{ color: '#183024' }}>{pm.name}</div>
                        </div>
                        <p className="text-sm" style={{ color: '#65785F' }}>{pm.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Confirm */}
              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-extrabold" style={{ color: '#183024' }}>Your Details</h2>
                  {[
                    { label: 'Full Name', key: 'contact_name', type: 'text', placeholder: 'Must match your verified account name' },
                    { label: 'Phone Number', key: 'contact_phone', type: 'tel', placeholder: '+234 ...' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#65785F' }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder}
                        value={form[f.key as keyof FormData] as string}
                        onChange={e => set(f.key as keyof FormData, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                        style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#65785F' }}>Special Requirements (optional)</label>
                    <textarea placeholder="Accessibility needs, specific instructions..." rows={3}
                      value={form.special_requirements}
                      onChange={e => set('special_requirements', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                      style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                  </div>
                  <div className="rounded-2xl border p-5 space-y-2" style={{ background: '#F1F6EA', borderColor: '#DDE9D2' }}>
                    <div className="text-sm font-bold mb-3" style={{ color: '#183024' }}>Booking Summary</div>
                    {[
                      { label: 'Tier', val: form.tier === 'go' ? '🚗 Tranzitta Go' : '⭐ Tranzitta Executive' },
                      { label: 'Pickup', val: form.pickup_address },
                      { label: 'Destination', val: form.dropoff_address },
                      { label: 'Estimate', val: form.estimated_fare ? `₦${form.estimated_fare.toLocaleString()}` : 'Ops pricing — within 5 min' },
                      { label: 'Payment', val: form.payment_method === 'card_hold' ? '💳 Card Hold' : '🏦 Bank Transfer' },
                      { label: 'Passengers', val: `${form.passengers}` },
                    ].map(r => (
                      <div key={r.label} className="flex justify-between text-sm">
                        <span style={{ color: '#65785F' }}>{r.label}</span>
                        <span className="font-semibold text-right max-w-[55%]" style={{ color: '#183024' }}>{r.val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl p-4 text-xs border" style={{ background: '#FFF0E4', borderColor: '#FFD6AA', color: '#D96B1F' }}>
                    🔒 By confirming you agree to the zero-cash policy, mutual verification requirement, in-car camera policy, and the Wall of Shame terms signed at account creation.
                  </div>
                  {error && <div className="rounded-xl p-3 text-sm" style={{ background: '#FEE2E2', color: '#DC2626' }}>{error}</div>}
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between gap-4">
            {step > 0 ? (
              <button onClick={() => setStep(s => s - 1)}
                className="px-6 py-3 rounded-full font-bold border-2 text-sm"
                style={{ color: '#65785F', borderColor: '#DDE9D2' }}>
                ← Back
              </button>
            ) : (
              <Link href="/go" className="px-6 py-3 rounded-full font-bold border-2 text-sm"
                style={{ color: '#65785F', borderColor: '#DDE9D2' }}>
                ← Cancel
              </Link>
            )}
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canNext()}
                className="flex-1 py-3 rounded-full font-black text-white transition-all"
                style={{ background: canNext() ? '#183024' : '#DDE9D2', color: canNext() ? 'white' : '#A8C09A' }}>
                Continue →
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={!canNext() || submitting}
                className="flex-1 py-3 rounded-full font-black text-white transition-all"
                style={{ background: canNext() && !submitting ? '#D96B1F' : '#DDE9D2', color: canNext() && !submitting ? 'white' : '#A8C09A', boxShadow: canNext() ? '0 6px 20px rgba(217,107,31,0.28)' : 'none' }}>
                {submitting ? 'Booking...' : 'Confirm Booking →'}
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
