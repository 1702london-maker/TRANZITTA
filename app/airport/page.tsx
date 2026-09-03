'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

// ─── Phone demo flow ──────────────────────────────────────────────────────────
const FLOW_STEPS = [
  {
    label: 'Book in 60 Seconds',
    icon: '✈️',
    desc: 'Enter your flight number. System validates and locks to live flight data instantly.',
    screen: (
      <div className="p-4 space-y-2.5">
        <div className="text-[10px] font-bold uppercase tracking-wide mb-3" style={{ color: '#D96B1F' }}>New Airport Transfer</div>
        <div className="flex gap-2 mb-3">
          {['✈ Arrivals', '🛫 Departures'].map((t, i) => (
            <div key={i} className="flex-1 text-center text-[9px] font-bold py-1.5 rounded-lg"
              style={{ background: i === 0 ? '#1F6B46' : '#F1F6EA', color: i === 0 ? 'white' : '#65785F' }}>{t}</div>
          ))}
        </div>
        {[
          { label: 'Flight Number', val: 'QR 1421' },
          { label: 'Terminal', val: '🌍 International' },
          { label: 'Destination', val: 'Victoria Island, Lagos' },
          { label: 'Luggage', val: '2 large + 1 cabin' },
          { label: 'Meet & Greet', val: 'Inside Terminal' },
        ].map(f => (
          <div key={f.label} className="rounded-lg px-3 py-2" style={{ background: '#F1F6EA' }}>
            <div className="text-[8px] font-bold uppercase tracking-wide" style={{ color: '#65785F' }}>{f.label}</div>
            <div className="text-[10px] font-bold mt-0.5" style={{ color: '#183024' }}>{f.val}</div>
          </div>
        ))}
        <div className="rounded-xl py-2 text-center text-[10px] font-bold text-white" style={{ background: '#1F6B46' }}>
          Book Transfer →
        </div>
      </div>
    ),
  },
  {
    label: 'Flight Tracked Live',
    icon: '📡',
    desc: 'Your flight is monitored in real time. Driver dispatch adjusts automatically if you land early or late.',
    screen: (
      <div className="p-4 space-y-3">
        <div className="text-[10px] font-bold" style={{ color: '#183024' }}>Flight QR 1421 — Live</div>
        <div className="rounded-xl p-3" style={{ background: '#F1F6EA' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-[8px] font-bold uppercase tracking-wide" style={{ color: '#65785F' }}>Status</div>
            <div className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#1F6B46' }}>On Time</div>
          </div>
          {[
            { label: 'Scheduled', val: '14:30' },
            { label: 'Estimated', val: '14:28 ✓' },
            { label: 'Terminal', val: 'International' },
            { label: 'Gate', val: 'A14' },
          ].map(r => (
            <div key={r.label} className="flex justify-between py-1 border-b last:border-0" style={{ borderColor: '#DDE9D2' }}>
              <span className="text-[8px]" style={{ color: '#65785F' }}>{r.label}</span>
              <span className="text-[8px] font-bold" style={{ color: '#183024' }}>{r.val}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3 border" style={{ background: 'white', borderColor: '#DDE9D2' }}>
          <div className="text-[9px] font-bold mb-1" style={{ color: '#1F6B46' }}>Driver dispatched at 14:05</div>
          <div className="text-[8px]" style={{ color: '#65785F' }}>Timed to arrive as you land. Adjusts automatically with flight.</div>
        </div>
      </div>
    ),
  },
  {
    label: 'Driver En Route',
    icon: '🚗',
    desc: 'Track your driver live. See exactly how far away they are as you clear customs.',
    screen: (
      <div className="p-4 space-y-2.5">
        <div className="text-[10px] font-bold mb-1" style={{ color: '#183024' }}>Your Driver</div>
        <div className="flex items-center gap-3 rounded-xl p-3 border" style={{ background: 'white', borderColor: '#DDE9D2' }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: '#183024' }}>AO</div>
          <div className="flex-1">
            <div className="text-[10px] font-bold" style={{ color: '#183024' }}>Adewale Ogundimu</div>
            <div className="text-[8px]" style={{ color: '#65785F' }}>Mercedes E-Class · LGS-041-AX</div>
            <div className="text-[8px] font-bold" style={{ color: '#D96B1F' }}>⭐ 4.9 · Police Cleared ✓</div>
          </div>
        </div>
        <div className="relative rounded-xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #D4EBDC, #C5E3CF)', height: 80 }}>
          <motion.div className="absolute text-xl" style={{ left: '30%', top: '30%' }}
            animate={{ x: [0, 20, 0] }} transition={{ duration: 3, repeat: Infinity }}>🚗</motion.div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xl">✈️</div>
          <div className="absolute bottom-2 left-3 text-[8px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#1F6B46' }}>
            ETA · 6 min
          </div>
        </div>
        <div className="text-[10px] font-bold text-center py-2 rounded-xl" style={{ background: '#FFF0E4', color: '#D96B1F' }}>
          ⏱ 30-min grace starts when driver arrives
        </div>
      </div>
    ),
  },
  {
    label: 'Verified & Departed',
    icon: '✅',
    desc: 'Mutual verification protects both of you. Card charged only after you arrive safely.',
    screen: (
      <div className="p-4 space-y-3 text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mx-auto" style={{ background: '#F1F6EA' }}>✅</div>
        <div className="text-[11px] font-extrabold" style={{ color: '#1F6B46' }}>Trip Started — Verified</div>
        <div className="text-[8px]" style={{ color: '#65785F' }}>Both you and your driver confirmed identities</div>
        <div className="rounded-xl p-3 text-left" style={{ background: '#F1F6EA' }}>
          {[
            { label: 'Destination', val: 'Victoria Island' },
            { label: 'Base Fare', val: 'Zone 3 rate' },
            { label: 'Waiting', val: '0 min (within grace)' },
            { label: 'Payment', val: 'Card hold — charged on arrival' },
          ].map(r => (
            <div key={r.label} className="flex justify-between py-1 border-b last:border-0" style={{ borderColor: '#DDE9D2' }}>
              <span className="text-[8px]" style={{ color: '#65785F' }}>{r.label}</span>
              <span className="text-[8px] font-bold" style={{ color: '#183024' }}>{r.val}</span>
            </div>
          ))}
        </div>
        <div className="text-[9px] font-bold py-2 rounded-xl" style={{ background: '#183024', color: 'white' }}>
          Live Tracking Active →
        </div>
      </div>
    ),
  },
]

function PhoneScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 220, height: 440 }}>
      <div className="absolute inset-0 rounded-[36px] border-[6px] shadow-2xl" style={{ borderColor: '#183024', background: '#183024' }} />
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full" style={{ background: '#0F1F17', zIndex: 10 }} />
      <div className="absolute inset-[6px] rounded-[30px] overflow-hidden" style={{ background: '#FAFDF7' }}>
        <div className="flex items-center justify-between px-4 pt-5 pb-1">
          <span className="text-[8px] font-bold" style={{ color: '#183024' }}>9:41</span>
          <span className="text-[8px]" style={{ color: '#183024' }}>●●●</span>
        </div>
        <div className="overflow-hidden" style={{ height: 380 }}>{children}</div>
      </div>
    </div>
  )
}

const PAINS = [
  { bad: 'Random taxi driver quoting triple at arrivals gate', good: 'Fixed zone rate — shown before you book, no surprises' },
  { bad: 'Driver left 2 hours early, already charging waiting', good: 'Driver dispatched at the right time — never early' },
  { bad: 'Flight delayed but your driver has no idea', good: 'Auto-updated — dispatch time adjusts with your flight' },
  { bad: 'No idea where your driver is while clearing customs', good: 'Live tracking from dispatch to your front door' },
  { bad: 'Cash demand at journey end with no receipt', good: 'Card-only — held at booking, charged on arrival, receipt sent' },
  { bad: 'Standard vehicle, no luggage space, shared ride', good: 'Executive grade only. Private. Luggage confirmed at booking.' },
]

const FEATURES = [
  { icon: '📡', title: 'Real-Time Flight Tracking', body: 'We monitor your actual flight status — not the schedule. Driver dispatch adjusts for delays, early landings, and diversions automatically.' },
  { icon: '🚗', title: 'Executive Grade Only', body: 'Premium sedan or SUV. Minimum 3 years old. Spotless interior. Luggage capacity confirmed at booking. Never a standard vehicle.' },
  { icon: '✅', title: 'Mutual Verification', body: 'Passenger confirms driver. Driver confirms passenger. Both identities verified before the trip starts. Zero ambiguity at the terminal.' },
  { icon: '⏱', title: 'Fair Waiting Clock', body: '30-minute grace on arrivals for customs and luggage. 15 minutes on departures. Waiting meter runs live in-app — full transparency, no disputes.' },
  { icon: '🔒', title: 'Fixed Zone Pricing', body: 'Rate is shown when you input your destination. Never algorithmic, never surging. Set by ops. Same rate every time for your zone.' },
  { icon: '🛡', title: 'Meet & Greet Inside', body: 'Request inside terminal service — driver enters arrivals hall with your name on a board. Kerbside also available. Your preference, confirmed at booking.' },
]

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

const FAQS = [
  { q: 'When does the waiting clock start?', a: 'For arrivals — the clock starts when your driver arrives at the terminal, not when your flight lands. You have a 30-minute grace period covering normal customs clearance and luggage collection. For departures — clock starts when the driver arrives at your pickup address, with a 15-minute grace.' },
  { q: 'What happens if my flight is delayed?', a: "Your driver's dispatch time is automatically adjusted based on your actual flight status. We track real-time data — not the schedule. If delayed by 2+ hours, ops will contact you directly." },
  { q: 'Is pricing shown publicly?', a: 'No. Zone rates are set by ops and shown only when you input your destination at booking. No public pricing is ever displayed. Your rate is private to your booking.' },
  { q: 'Can I track my driver while clearing customs?', a: 'Yes. Once your driver is dispatched, live tracking is active in the app. You can see their exact position and ETA as you exit arrivals.' },
  { q: 'What is inside terminal meet & greet?', a: "Your driver parks, enters the arrivals hall, and waits for you with a name board displaying your name. Kerbside is also available — driver waits at the designated pickup point and you see the exact location in-app." },
  { q: 'What vehicles are available?', a: 'Executive grade only — premium sedan or large SUV. Vehicle is matched to your luggage count at booking. Maximum vehicle age is 3 years. No standard vehicles, ever.' },
]

export default function AirportPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const demoRef = useRef<HTMLDivElement>(null)
  const inView = useInView(demoRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setActiveStep(s => (s + 1) % FLOW_STEPS.length), 3500)
    return () => clearInterval(id)
  }, [inView])

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 54 }}>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-32"
          style={{ background: 'linear-gradient(160deg, #FFF0E4 0%, var(--warm-white) 55%, #EDF6F1 100%)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.34) 0 1px, transparent 1px 120px), linear-gradient(0deg, rgba(255,255,255,0.28) 0 1px, transparent 1px 120px)', maskImage: 'linear-gradient(to bottom, black 0%, transparent 76%)' }} />
          <motion.div className="absolute top-16 right-16 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #D96B1F, transparent)' }}
            animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 6, repeat: Infinity }} />
          <motion.div className="absolute bottom-10 left-8 w-48 h-48 rounded-full opacity-15 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #1F6B46, transparent)' }}
            animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, delay: 2 }} />

          <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            {/* Copy */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold"
                  style={{ background: 'rgba(31,107,70,0.08)', color: '#1F6B46', border: '1px solid rgba(31,107,70,0.18)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Airport Transfers · Lagos — Murtala Muhammed
                </div>
                <h1 className="text-4xl md:text-6xl font-black leading-[1.05] mb-6" style={{ color: '#183024' }}>
                  Never Miss.<br />
                  <span style={{ color: '#D96B1F' }}>Never Wait.</span><br />
                  <span style={{ color: '#1F6B46' }}>Always Executive.</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0" style={{ color: '#65785F' }}>
                  Flight-tracked airport transfers to and from Murtala Muhammed International and Domestic terminals. Executive vehicles only. Fixed zone pricing. Driver dispatched at exactly the right time — every time.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link href="/airport/book"
                    className="px-8 py-4 rounded-full font-black text-white text-base shadow-xl transition-all hover:scale-105 active:scale-95"
                    style={{ background: '#D96B1F', boxShadow: '0 6px 24px rgba(217,107,31,0.32)' }}>
                    Book a Transfer →
                  </Link>
                  <Link href="/airport/dashboard"
                    className="px-8 py-4 rounded-full font-bold text-base border-2 transition-all hover:scale-105"
                    style={{ color: '#1F6B46', borderColor: '#1F6B46', background: 'rgba(255,255,255,0.8)' }}>
                    My Bookings
                  </Link>
                </div>
                <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
                  {['✓ Flight-Tracked', '✓ Fixed Zone Pricing', '✓ Executive Only', '✓ Meet & Greet'].map(t => (
                    <span key={t} className="text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{ background: 'rgba(31,107,70,0.08)', color: '#1F6B46', border: '1px solid rgba(31,107,70,0.16)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Animated phone */}
            <motion.div className="flex-shrink-0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <div ref={demoRef}>
                <PhoneScreen>
                  <AnimatePresence mode="wait">
                    <motion.div key={activeStep}
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35 }}>
                      {FLOW_STEPS[activeStep].screen}
                    </motion.div>
                  </AnimatePresence>
                </PhoneScreen>
                <div className="mt-5 flex gap-2 justify-center">
                  {FLOW_STEPS.map((_, i) => (
                    <button key={i} onClick={() => setActiveStep(i)}
                      className="relative h-1.5 rounded-full overflow-hidden transition-all"
                      style={{ width: i === activeStep ? 32 : 12, background: 'rgba(31,107,70,0.15)' }}>
                      {i === activeStep && (
                        <motion.div className="absolute inset-0 rounded-full"
                          style={{ transformOrigin: 'left', background: '#D96B1F' }}
                          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 3.5, ease: 'linear' }} />
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-3 text-center">
                  <div className="text-sm font-bold" style={{ color: '#183024' }}>{FLOW_STEPS[activeStep].icon} {FLOW_STEPS[activeStep].label}</div>
                  <div className="text-xs mt-1" style={{ color: '#65785F' }}>{FLOW_STEPS[activeStep].desc}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }}>Arrivals & Departures</div>
              <h2 className="text-4xl font-black" style={{ color: '#183024' }}>How It Works</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Arrivals */}
              <motion.div className="rounded-2xl border p-7" style={{ background: 'white', borderColor: '#DDE9D2' }}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="text-2xl mb-3">✈️</div>
                <div className="font-extrabold text-lg mb-4" style={{ color: '#183024' }}>Arrivals</div>
                <div className="space-y-3">
                  {[
                    'Book — enter flight number, terminal, destination',
                    'System validates your flight and begins live tracking',
                    'Driver dispatched at optimal time based on actual landing',
                    '30-min grace for customs + luggage after driver arrives',
                    'Meet inside terminal (name board) or kerbside',
                    'Mutual verification — then card charged on arrival',
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm" style={{ color: '#65785F' }}>
                      <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                        style={{ background: '#1F6B46' }}>{i + 1}</div>
                      {s}
                    </div>
                  ))}
                </div>
              </motion.div>
              {/* Departures */}
              <motion.div className="rounded-2xl border p-7" style={{ background: 'white', borderColor: '#DDE9D2' }}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <div className="text-2xl mb-3">🛫</div>
                <div className="font-extrabold text-lg mb-4" style={{ color: '#183024' }}>Departures</div>
                <div className="space-y-3">
                  {[
                    'Book — enter pickup address, departure terminal, flight time',
                    'System recommends safe pickup time via live Waze traffic',
                    'Driver confirmed 24 hours before your departure',
                    'Driver dispatched with live traffic-adjusted timing',
                    '15-min grace at pickup — meter starts if not ready',
                    'Traffic to airport monitored live — ops alerted if at risk',
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm" style={{ color: '#65785F' }}>
                      <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                        style={{ background: '#D96B1F' }}>{i + 1}</div>
                      {s}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── BEFORE / AFTER ────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: '#F1F6EA' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }}>Why Tranzitta Airport</div>
              <h2 className="text-4xl font-black" style={{ color: '#183024' }}>Before vs After</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl p-6 border" style={{ background: 'white', borderColor: '#DDE9D2' }}>
                <div className="text-sm font-bold mb-5 flex items-center gap-2" style={{ color: '#DC2626' }}>
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Without Tranzitta Airport
                </div>
                <div className="space-y-4">
                  {PAINS.map((p, i) => (
                    <motion.div key={i} className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                      <span className="text-red-500 mt-0.5 text-sm flex-shrink-0 font-bold">✗</span>
                      <span className="text-sm" style={{ color: '#65785F' }}>{p.bad}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-6 border" style={{ background: '#F1F6EA', borderColor: '#DDE9D2' }}>
                <div className="text-sm font-bold mb-5 flex items-center gap-2" style={{ color: '#1F6B46' }}>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> With Tranzitta Airport
                </div>
                <div className="space-y-4">
                  {PAINS.map((p, i) => (
                    <motion.div key={i} className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                      <span className="mt-0.5 text-sm flex-shrink-0 font-bold" style={{ color: '#1F6B46' }}>✓</span>
                      <span className="text-sm font-semibold" style={{ color: '#183024' }}>{p.good}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ──────────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#1F6B46' }}>Built Different</div>
              <h2 className="text-4xl font-black" style={{ color: '#183024' }}>What Sets Us Apart</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((f, i) => (
                <motion.div key={i} className="rounded-2xl p-7 border bg-white"
                  style={{ borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -3, boxShadow: '0 12px 36px rgba(31,107,70,0.10)' }}>
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <div className="font-extrabold mb-2" style={{ color: '#183024' }}>{f.title}</div>
                  <p className="text-sm leading-relaxed" style={{ color: '#65785F' }}>{f.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ZONES ─────────────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: '#F1F6EA' }}>
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }}>Pricing Zones</div>
              <h2 className="text-4xl font-black" style={{ color: '#183024' }}>Fixed Zone Pricing</h2>
              <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: '#65785F' }}>
                Rates are set by ops — never algorithmic. Enter your destination at booking to see your zone rate. Never shown publicly.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ZONES.map((z, i) => (
                <motion.div key={i} className="rounded-2xl border p-5 bg-white text-center"
                  style={{ borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <div className="text-xs font-black mb-1" style={{ color: '#D96B1F' }}>{z.zone}</div>
                  <div className="text-xs" style={{ color: '#65785F' }}>{z.areas}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border p-5 text-sm text-center" style={{ background: 'white', borderColor: '#DDE9D2', color: '#65785F' }}>
              🔐 Zone rates are <strong style={{ color: '#183024' }}>private</strong> — shown only when you enter your destination at booking. No public pricing.
            </div>
          </div>
        </section>

        {/* ── WAITING CLOCK ─────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#1F6B46' }}>Billing Transparency</div>
              <h2 className="text-4xl font-black" style={{ color: '#183024' }}>The Waiting Clock — Explained</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { type: '✈️ Arrivals', grace: '30 minutes', from: 'Driver arrives at terminal', after: 'Hourly waiting rate — shown live in app', note: 'Covers customs clearance + luggage collection' },
                { type: '🛫 Departures', grace: '15 minutes', from: 'Driver arrives at pickup address', after: 'Hourly waiting rate — shown live in app', note: 'Passenger is responsible for being ready on time' },
              ].map((c, i) => (
                <motion.div key={i} className="rounded-2xl border p-7 bg-white"
                  style={{ borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="text-2xl mb-3">{c.type}</div>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#1F6B46' }} />
                      <div><div className="text-xs font-bold" style={{ color: '#65785F' }}>Grace period</div><div className="text-sm font-extrabold" style={{ color: '#1F6B46' }}>{c.grace} — free</div></div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#65785F' }} />
                      <div><div className="text-xs font-bold" style={{ color: '#65785F' }}>Clock starts</div><div className="text-sm font-semibold" style={{ color: '#183024' }}>{c.from}</div></div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#D96B1F' }} />
                      <div><div className="text-xs font-bold" style={{ color: '#65785F' }}>After grace</div><div className="text-sm font-semibold" style={{ color: '#D96B1F' }}>{c.after}</div></div>
                    </div>
                    <p className="text-xs mt-2 pt-3 border-t" style={{ color: '#A8C09A', borderColor: '#DDE9D2' }}>{c.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DRIVER JOBS ───────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: '#F1F6EA' }}>
          <div className="max-w-4xl mx-auto">
            <motion.div className="gradient-frame rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex-1">
                <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }}>For Drivers</div>
                <h2 className="text-3xl font-black mb-4" style={{ color: '#183024' }}>The Highest-Rated Vertical</h2>
                <p className="text-base mb-6" style={{ color: '#65785F' }}>
                  Airport runs demand the best. Minimum 4.7 rating. Executive vehicle. Police clearance. NIN verified. In return — premium fares, protected income, and clock-run billing so you&apos;re never short-changed on waiting time.
                </p>
                <div className="space-y-2.5 mb-8">
                  {['Minimum 4.7 rating — highest standard on Tranzitta', 'Executive vehicle required — sedan or large SUV, max 3 years old', 'Inside terminal meet & greet with name board', 'Waiting time billed per hour — fully protected', 'Payment released within 48hrs of trip completion'].map((b, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm" style={{ color: '#183024' }}>
                      <span style={{ color: '#1F6B46' }}>✓</span> {b}
                    </div>
                  ))}
                </div>
                <Link href="/airport/jobs"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white"
                  style={{ background: '#183024' }}>
                  View Open Airport Jobs →
                </Link>
              </div>
              <div className="flex-shrink-0 w-48 h-48 rounded-3xl flex flex-col items-center justify-center gap-2 border-2"
                style={{ borderColor: '#DDE9D2', background: '#F1F6EA' }}>
                <div className="text-5xl">✈️</div>
                <div className="text-sm font-black" style={{ color: '#183024' }}>Airport Drivers</div>
                <div className="text-xs text-center px-4" style={{ color: '#65785F' }}>Executive. Rated. Protected.</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-3xl mx-auto">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#1F6B46' }}>Questions</div>
              <h2 className="text-4xl font-black" style={{ color: '#183024' }}>FAQ</h2>
            </motion.div>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <motion.div key={i} className="rounded-2xl border overflow-hidden bg-white"
                  style={{ borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <button className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-bold" style={{ color: '#183024' }}>{faq.q}</span>
                    <span className="text-xl flex-shrink-0 transition-transform" style={{ color: '#1F6B46', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#65785F' }}>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: '#F1F6EA' }}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div className="gradient-frame rounded-3xl p-10 sm:p-14"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-5xl mb-6">✈️</div>
              <h2 className="text-4xl md:text-5xl font-black mb-5" style={{ color: '#183024' }}>
                Your flight lands.<br />
                <span style={{ color: '#D96B1F' }}>Your driver is already there.</span>
              </h2>
              <p className="text-lg mb-10" style={{ color: '#65785F' }}>
                Book your executive airport transfer in under 60 seconds. Fixed zone price. Live flight tracking. No waiting surprises.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/airport/book"
                  className="px-10 py-4 rounded-full font-black text-white text-base shadow-xl transition-all hover:scale-105 active:scale-95"
                  style={{ background: '#D96B1F', boxShadow: '0 6px 24px rgba(217,107,31,0.35)' }}>
                  Book a Transfer →
                </Link>
                <Link href="/airport/dashboard"
                  className="px-10 py-4 rounded-full font-bold text-base border-2 transition-all hover:scale-105"
                  style={{ color: '#1F6B46', borderColor: '#1F6B46', background: 'rgba(255,255,255,0.7)' }}>
                  My Bookings
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
