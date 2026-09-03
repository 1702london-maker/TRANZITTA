'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const ZONES = [
  { zone: 'Zone 1', areas: 'Ikeja, Maryland, Oshodi' },
  { zone: 'Zone 2', areas: 'Surulere, Yaba, Mushin' },
  { zone: 'Zone 3', areas: 'Victoria Island, Ikoyi' },
  { zone: 'Zone 4', areas: 'Lekki Phase 1 & 2' },
  { zone: 'Zone 5', areas: 'Ajah, Sangotedo, Lakowe' },
  { zone: 'Zone 6', areas: 'Epe, Ibeju-Lekki' },
  { zone: 'Zone 7', areas: 'Festac, Amuwo-Odofin' },
  { zone: 'Zone 8', areas: 'Apapa, Lagos Island' },
]

const STEPS = ['Direction', 'Flight Details', 'Destination', 'Preferences', 'Confirm']

type FormData = {
  direction: 'arrival' | 'departure' | ''
  terminal: 'international' | 'domestic' | ''
  flight_number: string
  flight_date: string
  flight_time: string
  airline: string
  destination_zone: string
  destination_address: string
  pickup_address: string
  luggage_count: number
  meet_greet: 'kerbside' | 'inside_terminal' | ''
  vehicle_type: 'sedan' | 'suv' | ''
  passengers: number
  special_requirements: string
  contact_name: string
  contact_phone: string
  contact_email: string
}

const INIT: FormData = {
  direction: '',
  terminal: '',
  flight_number: '',
  flight_date: '',
  flight_time: '',
  airline: '',
  destination_zone: '',
  destination_address: '',
  pickup_address: '',
  luggage_count: 1,
  meet_greet: '',
  vehicle_type: '',
  passengers: 1,
  special_requirements: '',
  contact_name: '',
  contact_phone: '',
  contact_email: '',
}

export default function AirportBookPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(INIT)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const set = (k: keyof FormData, v: unknown) => setForm(f => ({ ...f, [k]: v }))

  const canNext = (): boolean => {
    if (step === 0) return !!form.direction && !!form.terminal
    if (step === 1) return !!(form.flight_number && form.flight_date && form.flight_time)
    if (step === 2) {
      if (form.direction === 'arrival') return !!(form.destination_zone && form.destination_address)
      return !!(form.pickup_address && form.destination_zone && form.destination_address)
    }
    if (step === 3) return !!(form.meet_greet && form.vehicle_type)
    if (step === 4) return !!(form.contact_name && form.contact_phone && form.contact_email)
    return false
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/airport/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit')
      setBookingId(data.id)
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
              <div className="text-5xl mb-5">✈️</div>
              <h1 className="text-3xl font-black mb-3" style={{ color: '#183024' }}>Transfer Booked</h1>
              <p className="mb-2" style={{ color: '#65785F' }}>
                Your airport transfer has been received. A driver will be assigned and you&apos;ll receive confirmation.
              </p>
              {bookingId && (
                <div className="mt-4 px-4 py-2 rounded-xl text-sm font-bold" style={{ background: '#F1F6EA', color: '#183024' }}>
                  Ref: {bookingId.slice(0, 8).toUpperCase()}
                </div>
              )}
              <div className="mt-5 p-4 rounded-xl text-sm" style={{ background: '#FFF0E4', color: '#D96B1F' }}>
                <strong>Your flight is being tracked live.</strong> Driver dispatch will be timed to your actual landing or departure.
              </div>
              <div className="mt-8 flex gap-3 justify-center">
                <Link href="/airport/dashboard" className="px-6 py-3 rounded-full font-bold text-white" style={{ background: '#1F6B46' }}>
                  View Booking
                </Link>
                <Link href="/airport" className="px-6 py-3 rounded-full font-bold border-2" style={{ color: '#183024', borderColor: '#DDE9D2' }}>
                  Back to Airport
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
            <h1 className="text-3xl font-black mb-2" style={{ color: '#183024' }}>Book Airport Transfer</h1>
            <p className="text-sm" style={{ color: '#65785F' }}>Executive grade only · Fixed zone pricing · Flight-tracked</p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all"
                    style={{
                      background: i < step ? '#1F6B46' : i === step ? '#183024' : '#F1F6EA',
                      color: i <= step ? 'white' : '#65785F',
                    }}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className="text-xs font-bold hidden sm:block" style={{ color: i === step ? '#183024' : '#65785F' }}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className="w-6 h-px flex-shrink-0" style={{ background: i < step ? '#1F6B46' : '#DDE9D2' }} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>

              {/* STEP 0: Direction */}
              {step === 0 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-extrabold" style={{ color: '#183024' }}>Journey Direction</h2>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#65785F' }}>I am</div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { val: 'arrival', label: '✈️ Arriving', desc: 'Coming INTO Lagos from a flight' },
                        { val: 'departure', label: '🛫 Departing', desc: 'Going TO the airport to fly' },
                      ].map(o => (
                        <button key={o.val} onClick={() => set('direction', o.val)}
                          className="p-5 rounded-2xl border-2 text-left transition-all"
                          style={{
                            borderColor: form.direction === o.val ? '#183024' : '#DDE9D2',
                            background: form.direction === o.val ? '#F1F6EA' : 'white',
                          }}>
                          <div className="text-base font-extrabold mb-1" style={{ color: '#183024' }}>{o.label}</div>
                          <div className="text-xs" style={{ color: '#65785F' }}>{o.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#65785F' }}>Terminal</div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { val: 'international', label: '🌍 International' },
                        { val: 'domestic', label: '🏠 Domestic' },
                      ].map(o => (
                        <button key={o.val} onClick={() => set('terminal', o.val)}
                          className="p-4 rounded-2xl border-2 font-bold text-sm transition-all"
                          style={{
                            borderColor: form.terminal === o.val ? '#1F6B46' : '#DDE9D2',
                            background: form.terminal === o.val ? '#F1F6EA' : 'white',
                            color: form.terminal === o.val ? '#1F6B46' : '#183024',
                          }}>
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1: Flight Details */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-extrabold" style={{ color: '#183024' }}>Flight Details</h2>
                  <div className="p-4 rounded-2xl text-sm" style={{ background: '#FFF0E4', color: '#D96B1F' }}>
                    Your flight number is validated against live flight data — driver dispatch is timed automatically.
                  </div>
                  {[
                    { label: 'Flight Number', key: 'flight_number', type: 'text', placeholder: 'e.g. QR 1421, BA 075, ET 910' },
                    { label: 'Airline', key: 'airline', type: 'text', placeholder: 'e.g. Qatar Airways, British Airways' },
                    { label: 'Flight Date', key: 'flight_date', type: 'date', placeholder: '' },
                    { label: form.direction === 'arrival' ? 'Scheduled Arrival Time' : 'Scheduled Departure Time', key: 'flight_time', type: 'time', placeholder: '' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#65785F' }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder}
                        value={form[f.key as keyof FormData] as string}
                        onChange={e => set(f.key as keyof FormData, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                        style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                    </div>
                  ))}
                </div>
              )}

              {/* STEP 2: Destination */}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-extrabold" style={{ color: '#183024' }}>
                    {form.direction === 'arrival' ? 'Destination in Lagos' : 'Pickup & Destination'}
                  </h2>
                  {form.direction === 'departure' && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#65785F' }}>Pickup Address</label>
                      <input type="text" placeholder="Your full home / hotel address"
                        value={form.pickup_address}
                        onChange={e => set('pickup_address', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                        style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#65785F' }}>
                      {form.direction === 'arrival' ? 'Destination Zone' : 'Destination Zone (return journey)'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {ZONES.map(z => (
                        <button key={z.zone} onClick={() => set('destination_zone', z.zone)}
                          className="p-3 rounded-xl border-2 text-left transition-all"
                          style={{
                            borderColor: form.destination_zone === z.zone ? '#D96B1F' : '#DDE9D2',
                            background: form.destination_zone === z.zone ? '#FFF0E4' : 'white',
                          }}>
                          <div className="text-xs font-black" style={{ color: form.destination_zone === z.zone ? '#D96B1F' : '#183024' }}>{z.zone}</div>
                          <div className="text-[10px]" style={{ color: '#65785F' }}>{z.areas}</div>
                        </button>
                      ))}
                    </div>
                    {form.destination_zone && (
                      <div className="mt-3 p-3 rounded-xl text-sm" style={{ background: '#FFF0E4', color: '#D96B1F' }}>
                        Zone rate for {form.destination_zone} will be confirmed at booking — never shared publicly.
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#65785F' }}>Full Destination Address</label>
                    <input type="text" placeholder="Street, area, Lagos"
                      value={form.destination_address}
                      onChange={e => set('destination_address', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                  </div>
                </div>
              )}

              {/* STEP 3: Preferences */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-extrabold" style={{ color: '#183024' }}>Preferences</h2>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#65785F' }}>Meet & Greet</div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { val: 'inside_terminal', label: '🛂 Inside Terminal', desc: 'Driver waits in arrivals with your name board' },
                        { val: 'kerbside', label: '🚗 Kerbside', desc: 'Driver at designated pickup point outside' },
                      ].map(o => (
                        <button key={o.val} onClick={() => set('meet_greet', o.val)}
                          className="p-4 rounded-2xl border-2 text-left transition-all"
                          style={{
                            borderColor: form.meet_greet === o.val ? '#1F6B46' : '#DDE9D2',
                            background: form.meet_greet === o.val ? '#F1F6EA' : 'white',
                          }}>
                          <div className="text-sm font-extrabold mb-1" style={{ color: '#183024' }}>{o.label}</div>
                          <div className="text-xs" style={{ color: '#65785F' }}>{o.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#65785F' }}>Vehicle Preference</div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { val: 'sedan', label: '🚙 Premium Sedan', desc: 'Up to 2 large + 2 cabin bags' },
                        { val: 'suv', label: '🚐 Executive SUV', desc: 'Up to 4 large + 4 cabin bags' },
                      ].map(o => (
                        <button key={o.val} onClick={() => set('vehicle_type', o.val)}
                          className="p-4 rounded-2xl border-2 text-left transition-all"
                          style={{
                            borderColor: form.vehicle_type === o.val ? '#183024' : '#DDE9D2',
                            background: form.vehicle_type === o.val ? '#F1F6EA' : 'white',
                          }}>
                          <div className="text-sm font-extrabold mb-1" style={{ color: '#183024' }}>{o.label}</div>
                          <div className="text-xs" style={{ color: '#65785F' }}>{o.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#65785F' }}>Passengers</label>
                      <input type="number" min={1} max={6} value={form.passengers}
                        onChange={e => set('passengers', parseInt(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                        style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#65785F' }}>Luggage Pieces</label>
                      <input type="number" min={0} max={10} value={form.luggage_count}
                        onChange={e => set('luggage_count', parseInt(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                        style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#65785F' }}>Special Requirements (optional)</label>
                    <textarea placeholder="Child seat, accessibility needs, extra stops, etc." rows={3}
                      value={form.special_requirements}
                      onChange={e => set('special_requirements', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                      style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                  </div>
                </div>
              )}

              {/* STEP 4: Confirm */}
              {step === 4 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-extrabold" style={{ color: '#183024' }}>Your Details</h2>
                  {[
                    { label: 'Full Name', key: 'contact_name', type: 'text', placeholder: 'As it appears on your ID' },
                    { label: 'Phone Number', key: 'contact_phone', type: 'tel', placeholder: '+234 ...' },
                    { label: 'Email Address', key: 'contact_email', type: 'email', placeholder: 'For booking confirmation' },
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
                  {/* Summary */}
                  <div className="rounded-2xl border p-5 space-y-2 mt-2" style={{ background: '#F1F6EA', borderColor: '#DDE9D2' }}>
                    <div className="text-sm font-bold mb-3" style={{ color: '#183024' }}>Booking Summary</div>
                    {[
                      { label: 'Direction', val: form.direction === 'arrival' ? '✈️ Arrival' : '🛫 Departure' },
                      { label: 'Terminal', val: form.terminal === 'international' ? '🌍 International' : '🏠 Domestic' },
                      { label: 'Flight', val: `${form.flight_number} — ${form.airline}` },
                      { label: 'Date / Time', val: `${form.flight_date} at ${form.flight_time}` },
                      { label: 'Zone', val: form.destination_zone },
                      { label: 'Vehicle', val: form.vehicle_type === 'sedan' ? 'Premium Sedan' : 'Executive SUV' },
                      { label: 'Meet & Greet', val: form.meet_greet === 'inside_terminal' ? 'Inside Terminal' : 'Kerbside' },
                      { label: 'Luggage', val: `${form.luggage_count} piece(s) · ${form.passengers} passenger(s)` },
                    ].map(r => (
                      <div key={r.label} className="flex justify-between text-sm">
                        <span style={{ color: '#65785F' }}>{r.label}</span>
                        <span className="font-semibold" style={{ color: '#183024' }}>{r.val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl p-4 text-xs" style={{ background: '#FFF0E4', color: '#D96B1F' }}>
                    🔐 Zone rate is private to your booking — never shared publicly. A card hold will be placed and charged on trip completion.
                  </div>
                  {error && <div className="rounded-xl p-3 text-sm" style={{ background: '#FEE2E2', color: '#DC2626' }}>{error}</div>}
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex justify-between gap-4">
            {step > 0 ? (
              <button onClick={() => setStep(s => s - 1)}
                className="px-6 py-3 rounded-full font-bold border-2 text-sm"
                style={{ color: '#65785F', borderColor: '#DDE9D2' }}>
                ← Back
              </button>
            ) : (
              <Link href="/airport" className="px-6 py-3 rounded-full font-bold border-2 text-sm"
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
                {submitting ? 'Submitting...' : 'Confirm Booking →'}
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
