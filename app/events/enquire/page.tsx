'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const EVENT_TYPES = ['Wedding', 'Corporate', 'Airport Transfer', 'Celebration', 'Brand Activation', 'VIP Event', 'Other']
const VEHICLE_TYPES = ['Sedan', 'SUV', 'Minibus', 'Mixed Fleet']

const STEPS = ['Event Details', 'Logistics', 'Contacts', 'Review']

export default function EventsEnquirePage() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    event_name: '',
    event_type: '',
    event_date: '',
    start_time: '',
    estimated_hours: '',
    passenger_count: '',
    vehicle_type: '',
    pickup_address: '',
    dropoff_address: '',
    special_requirements: '',
    contact_name: '',
    contact_phone: '',
    contact_email: '',
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit() {
    setLoading(true)
    try {
      await fetch('/api/events/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20" style={{ background: '#FAFDF7' }}>
        <motion.div className="max-w-lg w-full text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
            style={{ background: '#F1F6EA' }}>🎉</div>
          <h1 className="text-3xl font-black mb-4" style={{ color: '#183024' }}>Enquiry Received</h1>
          <p className="text-base mb-4" style={{ color: '#65785F' }}>
            Your event enquiry has been received. Our ops team will map your route, build your bespoke quote, and send it privately to you — typically within a few hours.
          </p>
          <div className="rounded-2xl p-5 mb-6 text-sm" style={{ background: '#F1F6EA', color: '#65785F' }}>
            <strong style={{ color: '#183024' }}>Important:</strong> No pricing is shared publicly — ever. Your quote is private and sent directly to you via in-app message and WhatsApp.
          </div>
          <Link href="/events"
            className="inline-block px-8 py-4 rounded-2xl font-black text-white"
            style={{ background: '#1F6B46' }}>
            ← Back to Events
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#FAFDF7' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b flex items-center justify-between px-5 h-14"
        style={{ background: 'rgba(255,255,255,0.96)', borderColor: '#DDE9D2', backdropFilter: 'blur(12px)' }}>
        <Link href="/events">
          <Image src="/tranzitta-logo.png" alt="Tranzitta" width={110} height={32} className="h-7 w-auto object-contain" />
        </Link>
        <div className="text-sm font-bold" style={{ color: '#183024' }}>Event Enquiry</div>
      </header>

      <div className="max-w-xl mx-auto px-5 py-10">
        {/* Step bar */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: i <= step ? '#1F6B46' : '#DDE9D2', color: i <= step ? 'white' : '#65785F' }}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="text-xs font-bold hidden sm:block" style={{ color: i === step ? '#183024' : '#A8C09A' }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-1" style={{ background: i < step ? '#1F6B46' : '#DDE9D2' }} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
              <h2 className="text-2xl font-black mb-6" style={{ color: '#183024' }}>Event Details</h2>
              <div className="space-y-4">
                <Field label="Event Name *" placeholder="e.g. Adaeze & Emeka Wedding" value={form.event_name} onChange={v => set('event_name', v)} />
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#183024' }}>Event Type *</label>
                  <div className="flex flex-wrap gap-2">
                    {EVENT_TYPES.map(t => (
                      <button key={t} onClick={() => set('event_type', t)}
                        className="px-4 py-2 rounded-xl text-sm font-bold border transition-all"
                        style={{
                          background: form.event_type === t ? '#1F6B46' : 'white',
                          borderColor: form.event_type === t ? '#1F6B46' : '#DDE9D2',
                          color: form.event_type === t ? 'white' : '#183024',
                        }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Event Date *" type="date" value={form.event_date} onChange={v => set('event_date', v)} />
                  <Field label="Start Time *" type="time" value={form.start_time} onChange={v => set('start_time', v)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Est. Hours *" placeholder="e.g. 4" type="number" value={form.estimated_hours} onChange={v => set('estimated_hours', v)} />
                  <Field label="Passengers *" placeholder="e.g. 48" type="number" value={form.passenger_count} onChange={v => set('passenger_count', v)} />
                </div>
              </div>
              <StepButtons step={step} setStep={setStep} canProceed={!!(form.event_name && form.event_type && form.event_date && form.start_time && form.estimated_hours && form.passenger_count)} />
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
              <h2 className="text-2xl font-black mb-6" style={{ color: '#183024' }}>Logistics</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#183024' }}>Vehicle Type Preference</label>
                  <div className="flex flex-wrap gap-2">
                    {VEHICLE_TYPES.map(t => (
                      <button key={t} onClick={() => set('vehicle_type', t)}
                        className="px-4 py-2 rounded-xl text-sm font-bold border transition-all"
                        style={{
                          background: form.vehicle_type === t ? '#1F6B46' : 'white',
                          borderColor: form.vehicle_type === t ? '#1F6B46' : '#DDE9D2',
                          color: form.vehicle_type === t ? 'white' : '#183024',
                        }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <Field label="Pickup Address *" placeholder="Full address — one pickup location only" value={form.pickup_address} onChange={v => set('pickup_address', v)} />
                <div className="rounded-xl px-4 py-2 text-xs" style={{ background: '#FEF3E2', color: '#B85A1A' }}>
                  ⚠ One pickup location only — Tranzitta Events does not do multi-stop collections.
                </div>
                <Field label="Drop-off Address *" placeholder="Full address — one drop-off location only" value={form.dropoff_address} onChange={v => set('dropoff_address', v)} />
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#183024' }}>Special Requirements</label>
                  <textarea rows={3} placeholder="Decorations, waiting at venue, multiple trips, accessibility needs..."
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-2"
                    style={{ borderColor: '#DDE9D2', color: '#183024', background: 'white' }}
                    value={form.special_requirements}
                    onChange={e => set('special_requirements', e.target.value)} />
                </div>
              </div>
              <StepButtons step={step} setStep={setStep} canProceed={!!(form.pickup_address && form.dropoff_address)} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
              <h2 className="text-2xl font-black mb-6" style={{ color: '#183024' }}>Your Contact Details</h2>
              <div className="space-y-4">
                <Field label="Full Name *" placeholder="Principal booker's name" value={form.contact_name} onChange={v => set('contact_name', v)} />
                <Field label="Phone *" placeholder="+234 800 000 0000" type="tel" value={form.contact_phone} onChange={v => set('contact_phone', v)} />
                <Field label="Email" placeholder="Your email address" type="email" value={form.contact_email} onChange={v => set('contact_email', v)} />
                <div className="rounded-xl px-4 py-3 text-xs" style={{ background: '#F1F6EA', color: '#65785F' }}>
                  🔐 Your quote will be sent privately to this contact only. Pricing is never shared publicly or with other guests.
                </div>
              </div>
              <StepButtons step={step} setStep={setStep} canProceed={!!(form.contact_name && form.contact_phone)} />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
              <h2 className="text-2xl font-black mb-6" style={{ color: '#183024' }}>Review & Submit</h2>
              <div className="rounded-2xl border p-6 space-y-4 mb-6" style={{ background: 'white', borderColor: '#DDE9D2' }}>
                {[
                  { label: 'Event', val: `${form.event_name} · ${form.event_type}` },
                  { label: 'Date & Time', val: `${form.event_date} · ${form.start_time}` },
                  { label: 'Duration', val: `${form.estimated_hours} hours · ${form.passenger_count} passengers` },
                  { label: 'Vehicle', val: form.vehicle_type || 'No preference' },
                  { label: 'Pickup', val: form.pickup_address },
                  { label: 'Drop-off', val: form.dropoff_address },
                  { label: 'Contact', val: `${form.contact_name} · ${form.contact_phone}` },
                ].map(row => (
                  <div key={row.label} className="flex gap-4">
                    <div className="text-xs font-bold w-24 flex-shrink-0 mt-0.5" style={{ color: '#65785F' }}>{row.label}</div>
                    <div className="text-sm font-bold flex-1" style={{ color: '#183024' }}>{row.val}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl px-4 py-3 text-sm mb-6" style={{ background: '#F1F6EA', color: '#65785F' }}>
                By submitting, you confirm you have read and understood the Tranzitta Events service rules — one pickup, one drop-off, no food in vehicles, zero-tolerance conduct policy.
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)}
                  className="flex-1 py-4 rounded-2xl font-bold border"
                  style={{ borderColor: '#DDE9D2', color: '#183024' }}>
                  ← Edit
                </button>
                <button onClick={handleSubmit} disabled={loading}
                  className="flex-2 flex-grow-[2] py-4 rounded-2xl font-black text-white transition-all"
                  style={{ background: loading ? '#A8C09A' : '#1F6B46' }}>
                  {loading ? 'Submitting...' : 'Submit Enquiry →'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Field({ label, placeholder, value, onChange, type = 'text' }: {
  label: string; placeholder?: string; value: string; onChange: (v: string) => void; type?: string
}) {
  return (
    <div>
      <label className="block text-sm font-bold mb-2" style={{ color: '#183024' }}>{label}</label>
      <input type={type} placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-2"
        style={{ borderColor: '#DDE9D2', color: '#183024', background: 'white' }} />
    </div>
  )
}

function StepButtons({ step, setStep, canProceed }: { step: number; setStep: (n: number) => void; canProceed: boolean }) {
  return (
    <div className="flex gap-3 mt-8">
      {step > 0 && (
        <button onClick={() => setStep(step - 1)}
          className="flex-1 py-4 rounded-2xl font-bold border"
          style={{ borderColor: '#DDE9D2', color: '#183024' }}>
          ← Back
        </button>
      )}
      {step < 3 && (
        <button onClick={() => setStep(step + 1)} disabled={!canProceed}
          className="flex-grow-[2] flex-1 py-4 rounded-2xl font-black text-white transition-all"
          style={{ background: canProceed ? '#1F6B46' : '#A8C09A' }}>
          Continue →
        </button>
      )}
    </div>
  )
}
