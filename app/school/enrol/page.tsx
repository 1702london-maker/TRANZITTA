'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

type Step = 'child' | 'school' | 'pickup' | 'schedule' | 'confirm'
const STEPS: Step[] = ['child', 'school', 'pickup', 'schedule', 'confirm']

const STEP_LABELS: Record<Step, string> = {
  child: 'Child Details',
  school: 'School',
  pickup: 'Pickup Address',
  schedule: 'Schedule',
  confirm: 'Confirmation',
}

export default function SchoolEnrolPage() {
  const [step, setStep] = useState<Step>('child')
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    // Child
    child_name: '', child_age: '', special_notes: '',
    // School
    school_name: '', school_address: '',
    // Pickup
    pickup_address: '',
    // Schedule
    morning_ready_time: '07:00', afternoon_close_time: '14:00',
    // Parent
    parent_name: '', parent_phone: '',
  })

  const stepIndex = STEPS.indexOf(step)
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const next = () => { if (stepIndex < STEPS.length - 1) setStep(STEPS[stepIndex + 1]) }
  const back = () => { if (stepIndex > 0) setStep(STEPS[stepIndex - 1]) }

  const handleSubmit = async () => {
    await fetch('/api/school/enquire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        child_name: form.child_name,
        school_name: form.school_name,
        school_address: form.school_address,
        pickup_address: form.pickup_address,
        morning_ready_time: form.morning_ready_time,
        afternoon_close_time: form.afternoon_close_time,
        special_notes: form.special_notes,
      })
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ background: 'linear-gradient(160deg, #EDF6F1 0%, var(--warm-white) 100%)' }}>
        <motion.div className="text-center max-w-md" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-2xl font-extrabold mb-4" style={{ color: '#183024' }}>Enquiry Received</h1>
          <p className="leading-relaxed mb-2" style={{ color: '#65785F' }}>
            Thank you. Our ops team will review {form.child_name}&apos;s route and contact you privately within 24 hours with a bespoke quote.
          </p>
          <p className="text-sm mb-8" style={{ color: '#65785F' }}>
            No pricing is shared publicly. Your quote is confidential between you and Tranzitta.
          </p>
          <Link href="/school"
            className="inline-block px-8 py-3.5 rounded-full font-bold text-white text-sm"
            style={{ background: '#1F6B46' }}>
            Back to Tranzitta School
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #EDF6F1 0%, var(--warm-white) 100%)' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 h-14 border-b" style={{ borderColor: '#DDE9D2', background: 'rgba(255,255,255,0.85)' }}>
        <Link href="/school">
          <Image src="/tranzitta-logo.png" alt="Tranzitta" width={110} height={32} className="h-7 w-auto object-contain" />
        </Link>
        <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: '#1F6B46' }}>School Enrolment</span>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Progress bar */}
          <div className="flex gap-2 mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex-1">
                <div className="h-1.5 rounded-full transition-all" style={{
                  background: i <= stepIndex ? '#1F6B46' : '#DDE9D2'
                }} />
                <div className="text-[10px] mt-1.5 font-semibold" style={{
                  color: i <= stepIndex ? '#1F6B46' : '#A8C09A'
                }}>{STEP_LABELS[s]}</div>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step}
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              className="bg-white rounded-2xl p-7 border shadow-sm" style={{ borderColor: '#DDE9D2' }}>

              {step === 'child' && (
                <>
                  <h2 className="text-xl font-extrabold mb-6" style={{ color: '#183024' }}>Child Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: '#65785F' }}>Child&apos;s Full Legal Name</label>
                      <input className="w-full px-4 py-3 rounded-xl text-sm border outline-none focus:ring-2"
                        style={{ borderColor: '#DDE9D2', fontFamily: 'inherit' }}
                        placeholder="e.g. Amara Okonkwo"
                        value={form.child_name} onChange={e => set('child_name', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: '#65785F' }}>Age</label>
                      <input className="w-full px-4 py-3 rounded-xl text-sm border outline-none focus:ring-2"
                        style={{ borderColor: '#DDE9D2', fontFamily: 'inherit' }}
                        placeholder="e.g. 8" type="number" min="3" max="18"
                        value={form.child_age} onChange={e => set('child_age', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: '#65785F' }}>Special Needs or Notes <span className="font-normal">(optional)</span></label>
                      <textarea className="w-full px-4 py-3 rounded-xl text-sm border outline-none focus:ring-2 resize-none"
                        style={{ borderColor: '#DDE9D2', fontFamily: 'inherit' }} rows={3}
                        placeholder="Allergies, medical notes, anything the driver should know..."
                        value={form.special_notes} onChange={e => set('special_notes', e.target.value)} />
                    </div>
                  </div>
                </>
              )}

              {step === 'school' && (
                <>
                  <h2 className="text-xl font-extrabold mb-6" style={{ color: '#183024' }}>School Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: '#65785F' }}>School Name</label>
                      <input className="w-full px-4 py-3 rounded-xl text-sm border outline-none focus:ring-2"
                        style={{ borderColor: '#DDE9D2', fontFamily: 'inherit' }}
                        placeholder="e.g. Greenfield International School"
                        value={form.school_name} onChange={e => set('school_name', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: '#65785F' }}>School Full Address</label>
                      <textarea className="w-full px-4 py-3 rounded-xl text-sm border outline-none focus:ring-2 resize-none"
                        style={{ borderColor: '#DDE9D2', fontFamily: 'inherit' }} rows={3}
                        placeholder="Street, area, LGA"
                        value={form.school_address} onChange={e => set('school_address', e.target.value)} />
                    </div>
                  </div>
                </>
              )}

              {step === 'pickup' && (
                <>
                  <h2 className="text-xl font-extrabold mb-6" style={{ color: '#183024' }}>Pickup Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: '#65785F' }}>Home / Pickup Address</label>
                      <textarea className="w-full px-4 py-3 rounded-xl text-sm border outline-none focus:ring-2 resize-none"
                        style={{ borderColor: '#DDE9D2', fontFamily: 'inherit' }} rows={3}
                        placeholder="Full address where driver will pick up each morning"
                        value={form.pickup_address} onChange={e => set('pickup_address', e.target.value)} />
                    </div>
                    <div className="rounded-xl p-4 text-sm" style={{ background: '#F1F6EA', color: '#1F6B46' }}>
                      <strong>Note:</strong> Our ops team uses this address to assess route pairing and journey time. This is never shared with other parents.
                    </div>
                  </div>
                </>
              )}

              {step === 'schedule' && (
                <>
                  <h2 className="text-xl font-extrabold mb-6" style={{ color: '#183024' }}>Daily Schedule</h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: '#65785F' }}>Morning Ready Time</label>
                      <p className="text-xs mb-2" style={{ color: '#A8C09A' }}>When will your child be ready at the gate? Driver arrives at this time.</p>
                      <input type="time" className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                        style={{ borderColor: '#DDE9D2', fontFamily: 'inherit' }}
                        value={form.morning_ready_time} onChange={e => set('morning_ready_time', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: '#65785F' }}>Afternoon School Close Time</label>
                      <p className="text-xs mb-2" style={{ color: '#A8C09A' }}>When does school finish? Driver will arrive to collect at this time.</p>
                      <input type="time" className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                        style={{ borderColor: '#DDE9D2', fontFamily: 'inherit' }}
                        value={form.afternoon_close_time} onChange={e => set('afternoon_close_time', e.target.value)} />
                    </div>
                    <div className="rounded-xl p-4 text-sm" style={{ background: '#FFF0E4', color: '#D96B1F' }}>
                      <strong>Excess charge policy:</strong> Driver waits 5 minutes free. Each minute beyond is billed to your monthly statement. You will be notified when the timer starts.
                    </div>
                  </div>
                </>
              )}

              {step === 'confirm' && (
                <>
                  <h2 className="text-xl font-extrabold mb-6" style={{ color: '#183024' }}>Review & Submit</h2>
                  <div className="space-y-3 mb-6 text-sm">
                    {[
                      ['Child', form.child_name || '—'],
                      ['Age', form.child_age || '—'],
                      ['School', form.school_name || '—'],
                      ['School Address', form.school_address || '—'],
                      ['Pickup Address', form.pickup_address || '—'],
                      ['Morning Ready', form.morning_ready_time],
                      ['Afternoon Close', form.afternoon_close_time],
                    ].map(([label, val]) => (
                      <div key={label} className="flex gap-3">
                        <span className="font-bold w-36 flex-shrink-0" style={{ color: '#65785F' }}>{label}</span>
                        <span style={{ color: '#183024' }}>{val}</span>
                      </div>
                    ))}
                  </div>
                  {form.special_notes && (
                    <div className="rounded-xl p-4 text-sm mb-6" style={{ background: '#F1F6EA', color: '#1F6B46' }}>
                      <strong>Notes:</strong> {form.special_notes}
                    </div>
                  )}
                  <div className="rounded-xl p-4 text-sm mb-4" style={{ background: 'rgba(31,107,70,0.06)', color: '#1F6B46' }}>
                    Our team will review this enquiry and contact you privately within 24 hours. <strong>No pricing is shared publicly.</strong>
                  </div>
                </>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            {stepIndex > 0 && (
              <button onClick={back}
                className="px-6 py-3 rounded-xl font-bold text-sm border"
                style={{ borderColor: '#DDE9D2', color: '#65785F' }}>
                ← Back
              </button>
            )}
            <button
              onClick={step === 'confirm' ? handleSubmit : next}
              className="flex-1 py-3.5 rounded-xl font-bold text-white text-sm hover:scale-105 transition-transform"
              style={{ background: '#1F6B46' }}>
              {step === 'confirm' ? 'Submit Enquiry →' : 'Continue →'}
            </button>
          </div>

          <p className="text-xs text-center mt-4" style={{ color: '#A8C09A' }}>
            Already enrolled? <Link href="/school/login" className="font-bold" style={{ color: '#1F6B46' }}>Parent login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
