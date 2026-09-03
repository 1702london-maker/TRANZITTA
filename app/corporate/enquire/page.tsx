'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type Step = 1 | 2 | 3 | 4

const STEPS = [
  'Company Details',
  'Shift Requirements',
  'Staff Information',
  'Confirm',
]

const INDUSTRIES = [
  'Banking / Finance', 'Technology', 'Oil & Gas', 'FMCG / Retail',
  'Healthcare', 'Telecoms', 'Manufacturing', 'Consulting / Professional Services', 'Other',
]

export default function CorporateEnquirePage() {
  const [step, setStep] = useState<Step>(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    company_name: '',
    rc_number: '',
    industry: '',
    registered_address: '',
    office_address: '',
    city: 'Lagos',
    contact_name: '',
    contact_title: '',
    contact_email: '',
    contact_phone: '',
    staff_count: '',
    shifts: 'both' as 'am' | 'pm' | 'both',
    am_start: '06:00',
    am_end: '09:00',
    pm_start: '17:00',
    pm_end: '20:00',
    working_days: '22',
    notes: '',
  })

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/corporate/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setSubmitted(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-4" style={{ paddingTop: 54, background: 'linear-gradient(160deg, #FFF0E4 0%, var(--warm-white) 55%, #EDF6F1 100%)' }}>
          <motion.div className="max-w-lg w-full text-center"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="gradient-frame rounded-3xl p-10">
              <div className="text-5xl mb-5">🏢</div>
              <h1 className="text-2xl font-extrabold mb-3" style={{ color: '#183024' }}>
                Enquiry received.
              </h1>
              <p className="text-base mb-2" style={{ color: '#65785F' }}>
                Our ops team will call {form.contact_name} at {form.contact_phone} within 24 hours to verify your RC number and discuss your staff transport requirements.
              </p>
              <p className="text-sm font-semibold mb-8" style={{ color: '#1F6B46' }}>
                No pricing shown online. Your quote is built privately.
              </p>
              <Link href="/corporate"
                className="inline-block px-8 py-3 rounded-full font-bold text-white text-sm"
                style={{ background: '#D96B1F' }}>
                Back to Corporate →
              </Link>
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
      <main className="min-h-screen pb-28 px-4" style={{ paddingTop: 80, background: 'linear-gradient(160deg, #FFF0E4 0%, var(--warm-white) 55%, #EDF6F1 100%)' }}>
        <div className="max-w-xl mx-auto">

          <div className="text-center mb-8">
            <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#D96B1F' }}>Corporate Enquiry</div>
            <h1 className="text-2xl font-extrabold" style={{ color: '#183024' }}>Request a Corporate Quote</h1>
            <p className="text-sm mt-2" style={{ color: '#65785F' }}>No pricing shown. Ops builds your quote privately within 24 hours.</p>
          </div>

          {/* Progress */}
          <div className="flex gap-1.5 mb-8">
            {STEPS.map((s, i) => (
              <div key={i} className="flex-1 h-1.5 rounded-full transition-all"
                style={{ background: i < step ? '#1F6B46' : i === step - 1 ? '#D96B1F' : '#DDE9D2' }} />
            ))}
          </div>
          <div className="text-xs font-bold mb-6" style={{ color: '#65785F' }}>
            Step {step} of 4 — {STEPS[step - 1]}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>

              {/* ── STEP 1: Company Details ── */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="gradient-frame rounded-2xl p-6 space-y-4">
                    <div>
                      <label className="text-xs font-bold block mb-1.5" style={{ color: '#183024' }}>Company Name *</label>
                      <input value={form.company_name} onChange={e => set('company_name', e.target.value)}
                        placeholder="Acme Nigeria Limited"
                        className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                        style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1.5" style={{ color: '#183024' }}>RC Number (CAC) *</label>
                      <input value={form.rc_number} onChange={e => set('rc_number', e.target.value)}
                        placeholder="RC 1234567"
                        className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                        style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                      <p className="text-[11px] mt-1" style={{ color: '#65785F' }}>Ops will verify this before proceeding</p>
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1.5" style={{ color: '#183024' }}>Industry *</label>
                      <select value={form.industry} onChange={e => set('industry', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                        style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }}>
                        <option value="">Select industry</option>
                        {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1.5" style={{ color: '#183024' }}>Office Address *</label>
                      <input value={form.office_address} onChange={e => set('office_address', e.target.value)}
                        placeholder="5 Kofo Abayomi Street, Victoria Island, Lagos"
                        className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                        style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold block mb-1.5" style={{ color: '#183024' }}>Contact Name *</label>
                        <input value={form.contact_name} onChange={e => set('contact_name', e.target.value)}
                          placeholder="Adaeze Okonkwo"
                          className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                          style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                      </div>
                      <div>
                        <label className="text-xs font-bold block mb-1.5" style={{ color: '#183024' }}>Title</label>
                        <input value={form.contact_title} onChange={e => set('contact_title', e.target.value)}
                          placeholder="HR Manager"
                          className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                          style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold block mb-1.5" style={{ color: '#183024' }}>Phone *</label>
                        <input value={form.contact_phone} onChange={e => set('contact_phone', e.target.value)}
                          placeholder="+234 810 000 0000"
                          className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                          style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                      </div>
                      <div>
                        <label className="text-xs font-bold block mb-1.5" style={{ color: '#183024' }}>Email *</label>
                        <input value={form.contact_email} onChange={e => set('contact_email', e.target.value)}
                          placeholder="adaeze@acme.ng" type="email"
                          className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                          style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setStep(2)}
                    disabled={!form.company_name || !form.rc_number || !form.industry || !form.office_address || !form.contact_name || !form.contact_phone || !form.contact_email}
                    className="w-full py-4 rounded-full font-bold text-white text-sm disabled:opacity-40 hover:scale-105 transition-transform"
                    style={{ background: '#D96B1F' }}>
                    Continue — Shift Requirements →
                  </button>
                </div>
              )}

              {/* ── STEP 2: Shift Requirements ── */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="gradient-frame rounded-2xl p-6 space-y-5">
                    <div>
                      <label className="text-xs font-bold block mb-2" style={{ color: '#183024' }}>Which shifts do you need? *</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['am', 'pm', 'both'] as const).map(s => (
                          <button key={s} onClick={() => set('shifts', s)}
                            className="py-2.5 rounded-xl text-xs font-bold border-2 transition-all"
                            style={{
                              borderColor: form.shifts === s ? '#1F6B46' : '#DDE9D2',
                              background: form.shifts === s ? '#F1F6EA' : 'white',
                              color: form.shifts === s ? '#1F6B46' : '#65785F',
                            }}>
                            {s === 'am' ? 'AM Only' : s === 'pm' ? 'PM Only' : 'AM + PM'}
                          </button>
                        ))}
                      </div>
                    </div>
                    {(form.shifts === 'am' || form.shifts === 'both') && (
                      <div>
                        <label className="text-xs font-bold block mb-2" style={{ color: '#183024' }}>AM Shift Window</label>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-[11px] mb-1" style={{ color: '#65785F' }}>First pickup from</div>
                            <input type="time" value={form.am_start} onChange={e => set('am_start', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                              style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                          </div>
                          <div>
                            <div className="text-[11px] mb-1" style={{ color: '#65785F' }}>Staff at office by</div>
                            <input type="time" value={form.am_end} onChange={e => set('am_end', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                              style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    {(form.shifts === 'pm' || form.shifts === 'both') && (
                      <div>
                        <label className="text-xs font-bold block mb-2" style={{ color: '#183024' }}>PM Shift Window</label>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-[11px] mb-1" style={{ color: '#65785F' }}>Departure from office</div>
                            <input type="time" value={form.pm_start} onChange={e => set('pm_start', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                              style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                          </div>
                          <div>
                            <div className="text-[11px] mb-1" style={{ color: '#65785F' }}>Last drop-off by</div>
                            <input type="time" value={form.pm_end} onChange={e => set('pm_end', e.target.value)}
                              className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                              style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="text-xs font-bold block mb-1.5" style={{ color: '#183024' }}>Working days per month</label>
                      <input type="number" min="10" max="31" value={form.working_days} onChange={e => set('working_days', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                        style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                    </div>
                    <div className="p-3 rounded-xl text-xs" style={{ background: '#F1F6EA', color: '#65785F' }}>
                      PM rates are higher than AM — Lagos traffic is significantly worse in the evening.
                      Ops will reflect this in your private quote.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)}
                      className="flex-1 py-4 rounded-full font-bold text-sm border-2 transition-all"
                      style={{ color: '#183024', borderColor: '#DDE9D2' }}>← Back</button>
                    <button onClick={() => setStep(3)}
                      className="flex-2 flex-1 py-4 rounded-full font-bold text-white text-sm hover:scale-105 transition-transform"
                      style={{ background: '#D96B1F' }}>
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Staff Info ── */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="gradient-frame rounded-2xl p-6 space-y-4">
                    <div>
                      <label className="text-xs font-bold block mb-1.5" style={{ color: '#183024' }}>Total staff to be transported *</label>
                      <input type="number" min="5" max="500" value={form.staff_count} onChange={e => set('staff_count', e.target.value)}
                        placeholder="e.g. 20"
                        className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                        style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                      <p className="text-[11px] mt-1" style={{ color: '#65785F' }}>
                        Ops uses home addresses to cluster staff into van routes. Address list is requested after RC verification.
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1.5" style={{ color: '#183024' }}>Area(s) where most staff live</label>
                      <input value={form.registered_address} onChange={e => set('registered_address', e.target.value)}
                        placeholder="e.g. Lekki, Surulere, Yaba, Ikeja"
                        className="w-full px-4 py-3 rounded-xl text-sm border outline-none"
                        style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1.5" style={{ color: '#183024' }}>Any additional notes for ops</label>
                      <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                        rows={3} placeholder="E.g. we have 5 staff in Ajah, 3 in Ibeju — any grouping considerations..."
                        className="w-full px-4 py-3 rounded-xl text-sm border outline-none resize-none"
                        style={{ borderColor: '#DDE9D2', background: 'white', color: '#183024' }} />
                    </div>
                    <div className="p-3 rounded-xl space-y-1.5" style={{ background: '#F1F6EA' }}>
                      <div className="text-[11px] font-bold" style={{ color: '#183024' }}>What happens next</div>
                      {['Ops verifies RC number — confirms legitimate business', 'Ops requests full staff home address list from you', 'Staff clustered into van routes using PostGIS proximity grouping', 'Private quote built — number of vans, rates, excess rate'].map((t, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[11px] font-bold mt-0.5" style={{ color: '#1F6B46' }}>✓</span>
                          <span className="text-[11px]" style={{ color: '#65785F' }}>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)}
                      className="flex-1 py-4 rounded-full font-bold text-sm border-2"
                      style={{ color: '#183024', borderColor: '#DDE9D2' }}>← Back</button>
                    <button onClick={() => setStep(4)} disabled={!form.staff_count}
                      className="flex-1 py-4 rounded-full font-bold text-white text-sm disabled:opacity-40 hover:scale-105 transition-transform"
                      style={{ background: '#D96B1F' }}>
                      Review & Confirm →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 4: Confirm ── */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="gradient-frame rounded-2xl p-6 space-y-4">
                    <div className="text-sm font-extrabold mb-1" style={{ color: '#183024' }}>Review your enquiry</div>
                    <div className="space-y-2">
                      {[
                        { label: 'Company', value: form.company_name },
                        { label: 'RC Number', value: form.rc_number },
                        { label: 'Industry', value: form.industry },
                        { label: 'Office Address', value: form.office_address },
                        { label: 'Contact', value: `${form.contact_name}${form.contact_title ? ` · ${form.contact_title}` : ''}` },
                        { label: 'Phone', value: form.contact_phone },
                        { label: 'Email', value: form.contact_email },
                        { label: 'Staff Count', value: `${form.staff_count} staff` },
                        { label: 'Shifts', value: form.shifts === 'both' ? 'AM + PM' : form.shifts.toUpperCase() },
                        ...(form.shifts !== 'pm' ? [{ label: 'AM Window', value: `${form.am_start} – ${form.am_end}` }] : []),
                        ...(form.shifts !== 'am' ? [{ label: 'PM Window', value: `${form.pm_start} – ${form.pm_end}` }] : []),
                        { label: 'Working Days', value: `${form.working_days} days/month` },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-start justify-between py-1.5 border-b last:border-0" style={{ borderColor: '#F1F6EA' }}>
                          <span className="text-xs" style={{ color: '#65785F' }}>{label}</span>
                          <span className="text-xs font-semibold text-right ml-4" style={{ color: '#183024' }}>{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 rounded-xl text-xs" style={{ background: '#F1F6EA', color: '#65785F' }}>
                      Ops will call you within 24 hours to verify RC and build your private quote.
                    </div>
                  </div>
                  {error && <div className="p-3 rounded-xl text-xs text-red-600" style={{ background: '#FEE2E2' }}>{error}</div>}
                  <div className="flex gap-3">
                    <button onClick={() => setStep(3)}
                      className="flex-1 py-4 rounded-full font-bold text-sm border-2"
                      style={{ color: '#183024', borderColor: '#DDE9D2' }}>← Back</button>
                    <button onClick={handleSubmit} disabled={submitting}
                      className="flex-1 py-4 rounded-full font-bold text-white text-sm disabled:opacity-60 hover:scale-105 transition-transform"
                      style={{ background: '#D96B1F' }}>
                      {submitting ? 'Submitting…' : 'Submit Enquiry →'}
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </div>
      </main>
      <Footer />
    </>
  )
}
