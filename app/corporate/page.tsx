'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

function PhoneScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 220, height: 440 }}>
      <div className="absolute inset-0 rounded-[36px] border-[7px] shadow-2xl overflow-hidden"
        style={{ borderColor: '#183024', background: '#183024' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 rounded-b-xl z-10"
          style={{ background: '#0F1F17' }} />
        <div className="absolute inset-0 overflow-hidden rounded-[28px]"
          style={{ marginTop: 18 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function NotifBubble({ icon, text, sub }: { icon: string; text: string; sub: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl shadow-lg"
      style={{ background: 'white', border: '1px solid #DDE9D2', minWidth: 160 }}>
      <span className="text-xl">{icon}</span>
      <div>
        <div className="text-[11px] font-extrabold" style={{ color: '#183024' }}>{text}</div>
        <div className="text-[10px]" style={{ color: '#65785F' }}>{sub}</div>
      </div>
    </div>
  )
}

const DEMO_STEPS = [
  {
    label: 'AM Shift Tracking',
    screen: (
      <div className="h-full" style={{ background: '#F4F9F5' }}>
        <div className="px-3 pt-8 pb-2 border-b" style={{ borderColor: '#DDE9D2' }}>
          <div className="text-[10px] font-bold" style={{ color: '#65785F' }}>Monday · 7:12 AM</div>
          <div className="text-xs font-extrabold" style={{ color: '#183024' }}>Van 1 — Lekki Route 🟠</div>
        </div>
        <div className="mx-3 mt-2 h-24 rounded-xl flex items-center justify-center relative overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #D4EBDC, #C5E3CF)' }}>
          <motion.div className="text-2xl" animate={{ x: [-20, 10, -20] }} transition={{ duration: 4, repeat: Infinity }}>🚐</motion.div>
          <div className="absolute bottom-2 right-4 text-lg">🏢</div>
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-white text-[9px] font-bold" style={{ background: '#1F6B46' }}>8 min to office</div>
        </div>
        <div className="px-3 mt-2 space-y-1.5">
          {[
            { name: 'Chioma O.', status: '✓ Boarded', color: '#1F6B46' },
            { name: 'Emeka A.', status: '✓ Boarded', color: '#1F6B46' },
            { name: 'Fatima B.', status: '✓ Boarded', color: '#1F6B46' },
            { name: 'Tobi K.', status: '○ Missed', color: '#DC2626' },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between px-2.5 py-1.5 rounded-lg"
              style={{ background: 'white', border: '1px solid #DDE9D2' }}>
              <span className="text-[10px] font-bold" style={{ color: '#183024' }}>{s.name}</span>
              <span className="text-[9px] font-bold" style={{ color: s.color }}>{s.status}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: 'Excess Billing Live',
    screen: (
      <div className="h-full" style={{ background: '#F4F9F5' }}>
        <div className="px-3 pt-8 pb-2 border-b" style={{ borderColor: '#DDE9D2' }}>
          <div className="text-[10px] font-bold" style={{ color: '#65785F' }}>PM Shift · Running</div>
          <div className="text-xs font-extrabold" style={{ color: '#183024' }}>Excess Tracker 🔴</div>
        </div>
        <div className="px-3 mt-3 space-y-2">
          <div className="p-3 rounded-xl" style={{ background: '#FFF0E4', border: '1px solid #D96B1F' }}>
            <div className="text-[9px] font-bold mb-1" style={{ color: '#D96B1F' }}>⚡ EXCESS ACTIVE — Van 1</div>
            <div className="text-base font-black" style={{ color: '#183024' }}>+42 min overrun</div>
            <div className="text-[9px]" style={{ color: '#65785F' }}>₦14,000 excess accrued today</div>
          </div>
          <div className="p-3 rounded-xl" style={{ background: 'white', border: '1px solid #DDE9D2' }}>
            <div className="text-[9px] font-bold mb-1" style={{ color: '#65785F' }}>This Month Total</div>
            <div className="text-base font-black" style={{ color: '#183024' }}>₦287,000</div>
            <div className="text-[9px]" style={{ color: '#65785F' }}>3 shifts — excess + surge</div>
          </div>
          <div className="p-3 rounded-xl" style={{ background: '#F1F6EA', border: '1px solid #DDE9D2' }}>
            <div className="text-[9px] font-bold mb-1" style={{ color: '#1F6B46' }}>Van 2 — Surulere Route</div>
            <div className="text-[9px]" style={{ color: '#65785F' }}>On time · No excess today</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Invoice & Payment',
    screen: (
      <div className="h-full" style={{ background: '#F4F9F5' }}>
        <div className="px-3 pt-8 pb-2 border-b" style={{ borderColor: '#DDE9D2' }}>
          <div className="text-[10px] font-bold" style={{ color: '#65785F' }}>September 2026</div>
          <div className="text-xs font-extrabold" style={{ color: '#183024' }}>Monthly Invoice</div>
        </div>
        <div className="px-3 mt-2 space-y-2">
          <div className="p-3 rounded-xl" style={{ background: 'white', border: '1px solid #DDE9D2' }}>
            <div className="flex justify-between mb-1">
              <span className="text-[9px]" style={{ color: '#65785F' }}>2 Vans · 22 days</span>
              <span className="text-[9px] font-bold" style={{ color: '#183024' }}>₦4,356,000</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-[9px]" style={{ color: '#65785F' }}>Excess charges</span>
              <span className="text-[9px] font-bold" style={{ color: '#D96B1F' }}>₦287,000</span>
            </div>
            <div className="h-px my-2" style={{ background: '#DDE9D2' }} />
            <div className="flex justify-between">
              <span className="text-[10px] font-extrabold" style={{ color: '#183024' }}>Total Due</span>
              <span className="text-[10px] font-extrabold" style={{ color: '#183024' }}>₦4,643,000</span>
            </div>
          </div>
          <button className="w-full py-2.5 rounded-xl font-bold text-white text-[11px]"
            style={{ background: '#D96B1F' }}>Pay via Paystack →</button>
          <div className="text-[9px] text-center" style={{ color: '#65785F' }}>Auto-receipt to admin email</div>
        </div>
      </div>
    ),
  },
  {
    label: 'Staff Management',
    screen: (
      <div className="h-full" style={{ background: '#F4F9F5' }}>
        <div className="px-3 pt-8 pb-2 border-b" style={{ borderColor: '#DDE9D2' }}>
          <div className="text-[10px] font-bold" style={{ color: '#65785F' }}>Acme Nigeria Ltd · 20 Staff</div>
          <div className="text-xs font-extrabold" style={{ color: '#183024' }}>Staff & Routes</div>
        </div>
        <div className="px-3 mt-2 space-y-1.5">
          <div className="p-2 rounded-xl" style={{ background: 'white', border: '1px solid #DDE9D2' }}>
            <div className="text-[9px] font-extrabold mb-1" style={{ color: '#183024' }}>🚐 Van 1 — Lekki Route</div>
            <div className="text-[8px]" style={{ color: '#65785F' }}>9 staff · Driver: Chukwuma A.</div>
            <div className="text-[8px] font-bold mt-0.5" style={{ color: '#1F6B46' }}>● Active now</div>
          </div>
          <div className="p-2 rounded-xl" style={{ background: 'white', border: '1px solid #DDE9D2' }}>
            <div className="text-[9px] font-extrabold mb-1" style={{ color: '#183024' }}>🚐 Van 2 — Surulere Route</div>
            <div className="text-[8px]" style={{ color: '#65785F' }}>11 staff · Driver: Taiwo K.</div>
            <div className="text-[8px] font-bold mt-0.5" style={{ color: '#65785F' }}>○ PM shift pending</div>
          </div>
          <div className="p-2 rounded-xl" style={{ background: '#F1F6EA', border: '1px solid #DDE9D2' }}>
            <div className="text-[8px] font-bold" style={{ color: '#1F6B46' }}>+ Add Staff Member</div>
          </div>
        </div>
      </div>
    ),
  },
]

const PAINS = [
  { pain: 'Staff Uber bills submitted monthly — zero audit trail', fix: 'Fixed monthly contract. You pay the van, not 20 Ubers.' },
  { pain: 'Late arrivals every morning — no one knows where the driver is', fix: 'Live tracking from phone. Admin sees every van in real time.' },
  { pain: 'Different driver every day — no consistency, no accountability', fix: 'Same driver. Same van. Same time. Full month, guaranteed.' },
  { pain: 'No way to know who was actually picked up', fix: 'Driver confirms each staff member by name. Admin dashboard updates live.' },
  { pain: 'PM overruns costing money — staff waiting, driver still billing', fix: 'Excess tracked by the minute. Itemised on monthly invoice.' },
  { pain: 'Finance team chasing receipts at month-end', fix: 'Auto-invoice with full breakdown — base, excess, surge. PO reference supported.' },
]

const FAQS = [
  { q: 'Can we run AM only or PM only?', a: 'Yes — you choose AM, PM or both. Each shift is rated separately. AM and PM rates differ because Lagos traffic is significantly worse in the evening.' },
  { q: 'What happens if a staff member is added mid-month?', a: 'Ops reviews the new staff member\'s home location and assigns them to an existing van if capacity allows. If a new van is needed, a prorated charge is added to the next invoice.' },
  { q: 'What if a staff member misses their pickup?', a: 'The driver waits 5 minutes at each pickup. After 5 minutes, they proceed to the next stop. The missed staff member must arrange their own transport — the driver cannot return on the same shift.' },
  { q: 'How is pricing calculated?', a: 'Hourly rate × shift hours × working days × number of vans required. Ops builds the quote based on your staff locations and shift times. It is never published — sent directly to your admin.' },
  { q: 'Do staff need to pay anything?', a: 'No. Staff are passengers — they pay nothing. The company pays the full monthly advance. This is a B2B contract between Tranzitta and your organisation.' },
  { q: 'What if we need to remove a driver?', a: 'You can flag a driver issue directly from the admin dashboard. Ops reviews and arranges a replacement. The driver commits for the full month — a replacement takes 24-48 hours.' },
]

export default function CorporatePage() {
  const [activeStep, setActiveStep] = useState(0)
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const demoRef = useRef<HTMLDivElement>(null)
  const [demoVisible, setDemoVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setDemoVisible(true) }, { threshold: 0.4 })
    if (demoRef.current) obs.observe(demoRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!demoVisible) return
    const t = setInterval(() => setActiveStep(s => (s + 1) % DEMO_STEPS.length), 4000)
    return () => clearInterval(t)
  }, [demoVisible])

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 54 }}>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden px-4 py-24 sm:py-32"
          style={{ background: 'linear-gradient(160deg, #FFF0E4 0%, var(--warm-white) 55%, #EDF6F1 100%)' }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #1F6B46, transparent)' }} />
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6"
                style={{ background: 'rgba(31,107,70,0.08)', color: '#1F6B46', border: '1px solid rgba(31,107,70,0.18)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Tranzitta Corporate · Lagos
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6"
                style={{ color: '#183024' }}>
                Your staff. On time.<br />
                <span style={{ color: '#D96B1F' }}>Every morning.</span><br />
                <span style={{ color: '#1F6B46' }}>Every evening.</span>
              </h1>
              <p className="text-lg leading-relaxed mb-4" style={{ color: '#65785F' }}>
                One contract. Dedicated vans. Same driver, same route, all month.
                AM and PM shifts — live tracking, staff manifest, and full excess billing on every invoice.
              </p>
              <p className="text-base font-semibold mb-8" style={{ color: '#1F6B46' }}>
                Zero Uber receipts. Zero guessing. One number you can plan a budget around.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/corporate/enquire"
                  className="px-8 py-4 rounded-full font-bold text-white text-base hover:scale-105 transition-transform text-center"
                  style={{ background: '#D96B1F', boxShadow: '0 6px 28px rgba(217,107,31,0.32)' }}>
                  Request Corporate Quote →
                </Link>
                <Link href="/corporate/dashboard"
                  className="px-8 py-4 rounded-full font-semibold text-base border-2 hover:scale-105 transition-transform text-center"
                  style={{ color: '#1F6B46', borderColor: '#1F6B46', background: 'rgba(255,255,255,0.8)' }}>
                  Admin Login
                </Link>
              </div>
            </motion.div>

            {/* Hero phone */}
            <motion.div className="flex justify-center relative"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <PhoneScreen>
                <div className="h-full" style={{ background: '#F4F9F5' }}>
                  <div className="px-3 pt-8 pb-2 border-b" style={{ borderColor: '#DDE9D2' }}>
                    <div className="text-[10px] font-bold" style={{ color: '#65785F' }}>Monday · 7:04 AM</div>
                    <div className="text-xs font-extrabold" style={{ color: '#183024' }}>Acme Nigeria · Fleet Live</div>
                  </div>
                  <div className="mx-3 mt-2 h-24 rounded-xl flex items-center justify-center relative overflow-hidden"
                    style={{ background: 'linear-gradient(180deg, #D4EBDC, #C5E3CF)' }}>
                    <motion.div className="absolute text-2xl" style={{ left: '15%' }}
                      animate={{ x: [0, 30, 60] }} transition={{ duration: 8, repeat: Infinity }}>🚐</motion.div>
                    <motion.div className="absolute text-2xl" style={{ left: '40%' }}
                      animate={{ x: [0, 20, 40] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }}>🚐</motion.div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xl">🏢</div>
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-white text-[9px] font-bold"
                      style={{ background: '#1F6B46' }}>2 vans active</div>
                  </div>
                  <div className="px-3 mt-2 space-y-1.5">
                    {[
                      { label: 'Van 1 · Lekki', eta: '12 min', boarded: '7/9' },
                      { label: 'Van 2 · Surulere', eta: '18 min', boarded: '5/11' },
                    ].map((v, i) => (
                      <div key={i} className="flex items-center justify-between px-2.5 py-2 rounded-xl"
                        style={{ background: 'white', border: '1px solid #DDE9D2' }}>
                        <div>
                          <div className="text-[10px] font-extrabold" style={{ color: '#183024' }}>{v.label}</div>
                          <div className="text-[9px]" style={{ color: '#65785F' }}>{v.boarded} boarded</div>
                        </div>
                        <div className="px-2 py-1 rounded-full text-[9px] font-bold text-white" style={{ background: '#D96B1F' }}>
                          {v.eta} to office
                        </div>
                      </div>
                    ))}
                    <motion.div className="flex items-center gap-2 px-2.5 py-2 rounded-xl"
                      style={{ background: '#F1F6EA', border: '1px solid #DDE9D2' }}
                      animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
                      <span className="text-sm">📋</span>
                      <div className="text-[9px] font-bold" style={{ color: '#1F6B46' }}>12/20 staff confirmed boarded</div>
                    </motion.div>
                  </div>
                </div>
              </PhoneScreen>

              <motion.div className="absolute -top-4 -left-8 hidden lg:block"
                animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <NotifBubble icon="🚐" text="Van 1 departing" sub="AM shift · now" />
              </motion.div>
              <motion.div className="absolute -bottom-4 -right-6 hidden lg:block"
                animate={{ y: [0, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }}>
                <NotifBubble icon="✅" text="All staff delivered" sub="8:02 AM · 0 missed" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── PAIN POINTS ── */}
        <section className="py-20 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#D96B1F' }}>The problem with staff transport</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: '#183024' }}>
                The Uber model is not a transport policy.
              </h2>
            </div>
            <div className="space-y-3">
              {PAINS.map((p, i) => (
                <motion.div key={i}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 items-center p-4 rounded-2xl border"
                  style={{ background: 'white', borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }} viewport={{ once: true }}>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 flex-shrink-0 mt-0.5 font-bold">✗</span>
                    <span className="text-sm" style={{ color: '#65785F' }}>{p.pain}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 font-bold" style={{ color: '#1F6B46' }}>✓</span>
                    <span className="text-sm font-semibold" style={{ color: '#183024' }}>{p.fix}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LIVE DEMO ── */}
        <section className="py-24 px-4 overflow-hidden" style={{ background: 'var(--warm-white)' }} ref={demoRef}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1F6B46' }}>Admin dashboard</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: '#183024' }}>
                Everything your ops team needs.
              </h2>
              <p className="text-base mt-3 max-w-xl mx-auto" style={{ color: '#65785F' }}>
                Live fleet tracking, staff boarding confirmations, excess billing in real time, and one-tap invoice payment.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center order-2 lg:order-1">
                <PhoneScreen>
                  <AnimatePresence mode="wait">
                    <motion.div key={activeStep} className="h-full"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}>
                      {DEMO_STEPS[activeStep].screen}
                    </motion.div>
                  </AnimatePresence>
                </PhoneScreen>
              </div>

              <div className="space-y-4 order-1 lg:order-2">
                {DEMO_STEPS.map((step, i) => (
                  <motion.button key={i} onClick={() => setActiveStep(i)}
                    className="w-full text-left p-5 rounded-2xl border-2 transition-all"
                    style={{
                      borderColor: activeStep === i ? '#1F6B46' : '#DDE9D2',
                      background: activeStep === i ? '#F1F6EA' : 'white',
                    }}
                    whileHover={{ scale: 1.01 }}>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-white"
                        style={{ background: activeStep === i ? '#1F6B46' : '#A8C09A' }}>
                        {i + 1}
                      </div>
                      <div className="font-extrabold text-sm" style={{ color: '#183024' }}>{step.label}</div>
                    </div>
                    {activeStep === i && (
                      <motion.div className="mt-3 h-1 rounded-full" style={{ background: '#DDE9D2' }}>
                        <motion.div className="h-full rounded-full" style={{ background: '#1F6B46' }}
                          initial={{ width: '0%' }} animate={{ width: '100%' }}
                          transition={{ duration: 3.8, ease: 'linear' }} />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICE MODEL ── */}
        <section className="py-20 px-4" style={{ background: '#F1F6EA' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1F6B46' }}>How it works</div>
              <h2 className="text-3xl font-extrabold" style={{ color: '#183024' }}>
                One contract. One admin. All your staff.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '🏢', title: 'Company books — not staff', desc: 'One admin account manages transport for your entire workforce. Staff are passengers, not clients.' },
                { icon: '🚐', title: 'Dedicated van per route', desc: 'Staff clustered by home proximity into van routes. Maximum van capacity never exceeded.' },
                { icon: '👤', title: 'Same driver, full month', desc: 'Consistent, reliable driver on your route for the entire month. Ops reviews at month-end.' },
                { icon: '🕐', title: 'AM + PM shifts', desc: 'Separate rates per shift. AM runs staff from home to office — PM runs them back. Different rates because Lagos traffic differs.' },
                { icon: '⚡', title: 'Excess billed by the minute', desc: 'Any overrun beyond agreed shift hours billed at excess rate. Itemised daily, invoiced monthly.' },
                { icon: '💳', title: 'Monthly advance. No cash.', desc: 'Full month payment in advance. Paystack or Flutterwave. Auto-invoice with PO reference support.' },
              ].map((s, i) => (
                <motion.div key={i} className="rounded-2xl p-5 border"
                  style={{ background: 'white', borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }} viewport={{ once: true }}>
                  <div className="text-2xl mb-3">{s.icon}</div>
                  <div className="font-extrabold mb-1.5 text-sm" style={{ color: '#183024' }}>{s.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: '#65785F' }}>{s.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ONBOARDING STEPS ── */}
        <section className="py-20 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1F6B46' }}>Getting started</div>
              <h2 className="text-3xl font-extrabold" style={{ color: '#183024' }}>From enquiry to first shift.</h2>
              <p className="text-sm mt-3 max-w-xl mx-auto" style={{ color: '#65785F' }}>
                No pricing shown online. Ops builds a private quote based on your staff locations and shift requirements.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {[
                { n: '01', icon: '📝', title: 'Submit enquiry', desc: 'Company name, RC number, staff count, office address, shift times.' },
                { n: '02', icon: '📞', title: 'Ops calls you', desc: 'RC verified. Staff address list requested. Ops clusters your team into van routes.' },
                { n: '03', icon: '📄', title: 'Private quote', desc: 'Ops sends your monthly quote — base, vans, rates, excess rate. Never published.' },
                { n: '04', icon: '🚐', title: 'Service begins', desc: 'Sign agreement, pay advance, meet your drivers. First shift starts on agreed date.' },
              ].map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                  <div className="text-3xl font-extrabold mb-3 leading-none" style={{ color: 'rgba(31,107,70,0.1)' }}>{s.n}</div>
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="font-extrabold mb-1.5 text-sm" style={{ color: '#183024' }}>{s.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: '#65785F' }}>{s.desc}</div>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/corporate/enquire"
                className="inline-block px-10 py-4 rounded-full font-bold text-white text-base hover:scale-105 transition-transform"
                style={{ background: '#D96B1F', boxShadow: '0 6px 24px rgba(217,107,31,0.28)' }}>
                Submit Corporate Enquiry →
              </Link>
            </div>
          </div>
        </section>

        {/* ── SAFETY ── */}
        <section className="py-20 px-4" style={{ background: '#F1F6EA' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1F6B46' }}>Safety & compliance</div>
              <h2 className="text-3xl font-extrabold" style={{ color: '#183024' }}>Your staff are not cargo.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '📹', title: 'Mandatory in-car camera', desc: '30-day footage retained. Ops can review live feed on any active corporate shift.' },
                { icon: '🆘', title: 'Panic button — driver and staff', desc: 'Triggers ops alarm, notifies admin, police, and all staff on route. Sub-60s response.' },
                { icon: '🔍', title: 'RC number verification', desc: 'Every company onboarded with verified CAC registration. Ops confirms before service starts.' },
                { icon: '🪪', title: 'Driver NIN + police clearance', desc: 'Mandatory for all corporate van drivers. Verified before first shift. Re-checked monthly.' },
                { icon: '📍', title: 'Live GPS every 10 seconds', desc: 'All corporate vans tracked continuously during shifts. Admin sees every van on the dashboard.' },
                { icon: '📋', title: 'Staff manifest per shift', desc: 'Driver confirms each staff member by name before departure. Missed staff logged and admin notified.' },
              ].map((s, i) => (
                <motion.div key={i} className="rounded-2xl p-5 border"
                  style={{ background: 'white', borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }} viewport={{ once: true }}>
                  <div className="text-2xl mb-3">{s.icon}</div>
                  <div className="font-extrabold mb-1.5 text-sm" style={{ color: '#183024' }}>{s.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: '#65785F' }}>{s.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-center mb-8" style={{ color: '#183024' }}>Questions companies ask.</h2>
            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#DDE9D2' }}>
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm transition-colors hover:bg-[#F1F6EA]"
                    style={{ color: '#183024' }}>
                    <span>{faq.q}</span>
                    <span className="flex-shrink-0 ml-4 text-lg" style={{ color: '#1F6B46' }}>{faqOpen === i ? '−' : '+'}</span>
                  </button>
                  {faqOpen === i && (
                    <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: '#65785F' }}>{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 px-4" style={{ background: '#F1F6EA' }}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="gradient-frame rounded-3xl p-10 sm:p-14">
              <div className="text-4xl mb-5">🏢</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 leading-tight" style={{ color: '#183024' }}>
                Replace 20 Uber receipts<br />with one invoice.
              </h2>
              <p className="text-base mb-2" style={{ color: '#65785F' }}>
                Dedicated vans. Fixed driver. Monthly advance. Live tracking.
              </p>
              <p className="text-base mb-10 font-semibold" style={{ color: '#1F6B46' }}>
                A transport policy your finance team can actually plan around.
              </p>
              <Link href="/corporate/enquire"
                className="inline-block px-10 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform"
                style={{ background: '#D96B1F', color: 'white', boxShadow: '0 6px 24px rgba(217,107,31,0.35)' }}>
                Request Corporate Quote →
              </Link>
              <p className="text-xs mt-4" style={{ color: '#65785F' }}>No pricing shown. Ops calls within 24 hours.</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
