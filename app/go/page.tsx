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
    label: 'Book in Seconds',
    icon: '🚗',
    desc: 'Enter pickup and destination. Tranzitta checks Lagos traffic and sets the controlled fare before drivers can accept.',
    screen: (
      <div className="p-4 space-y-2.5">
        <div className="text-[10px] font-bold uppercase tracking-wide mb-3" style={{ color: '#D96B1F' }}>Book a Ride</div>
        <div className="flex gap-2 mb-3">
          {['🚗 Go', '⭐ Executive'].map((t, i) => (
            <div key={i} className="flex-1 text-center text-[9px] font-bold py-1.5 rounded-lg"
              style={{ background: i === 0 ? '#183024' : '#F1F6EA', color: i === 0 ? 'white' : '#65785F' }}>{t}</div>
          ))}
        </div>
        {[
          { label: 'Pickup', val: '📍 Murtala Mohammed Way, VI', icon: '' },
          { label: 'Destination', val: '🏢 Lekki Phase 1', icon: '' },
          { label: 'Payment', val: '🏦 Driver account / cash verified in-app', icon: '' },
        ].map(f => (
          <div key={f.label} className="rounded-lg px-3 py-2" style={{ background: '#F1F6EA' }}>
            <div className="text-[8px] font-bold uppercase tracking-wide" style={{ color: '#65785F' }}>{f.label}</div>
            <div className="text-[10px] font-bold mt-0.5" style={{ color: '#183024' }}>{f.val}</div>
          </div>
        ))}
        <div className="rounded-xl p-3 border" style={{ background: 'white', borderColor: '#DDE9D2' }}>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-[8px]" style={{ color: '#65785F' }}>Controlled Fare</div>
              <div className="text-[12px] font-black" style={{ color: '#183024' }}>₦4,200</div>
            </div>
            <div className="text-[8px] text-right" style={{ color: '#D96B1F' }}>
              <div className="font-bold">⚡ Surge 1.2x</div>
              <div>Traffic: moderate</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl py-2 text-center text-[10px] font-bold text-white" style={{ background: '#1F6B46' }}>
          Confirm Fare →
        </div>
      </div>
    ),
  },
  {
    label: 'Driver Matched Instantly',
    icon: '📍',
    desc: 'Only subscribed, vetted drivers can see and select the ride. Repeat-driver preference is blocked for Go.',
    screen: (
      <div className="p-4 space-y-2.5">
        <div className="text-[10px] font-bold" style={{ color: '#183024' }}>Driver Matched</div>
        <div className="flex items-center gap-3 rounded-xl p-3 border" style={{ background: 'white', borderColor: '#DDE9D2' }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: '#183024' }}>TK</div>
          <div className="flex-1">
            <div className="text-[10px] font-bold" style={{ color: '#183024' }}>Taiwo Kolawole</div>
            <div className="text-[8px]" style={{ color: '#65785F' }}>Toyota Corolla · ABJ-405-KL</div>
            <div className="text-[8px] font-bold" style={{ color: '#D96B1F' }}>⭐ 4.8 · BVN Verified ✓ · NIN ✓</div>
          </div>
        </div>
        <div className="relative rounded-xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #D4EBDC, #C5E3CF)', height: 80 }}>
          <motion.div className="absolute text-xl" style={{ left: '25%', top: '40%' }}
            animate={{ x: [0, 25, 0] }} transition={{ duration: 3, repeat: Infinity }}>🚗</motion.div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xl">📍</div>
          <div className="absolute bottom-2 left-3 text-[8px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#1F6B46' }}>
            ETA · 4 min
          </div>
        </div>
        <div className="text-[10px] text-center py-2 rounded-xl font-bold" style={{ background: '#FFF0E4', color: '#D96B1F' }}>
          Confirm driver details before boarding
        </div>
      </div>
    ),
  },
  {
    label: 'Mutual Verification',
    icon: '🔒',
    desc: 'Driver checks your face against your profile. You check their plate, photo, name. Trip only starts when both confirm.',
    screen: (
      <div className="p-4 space-y-3">
        <div className="text-[10px] font-bold" style={{ color: '#183024' }}>Verification Required</div>
        <div className="space-y-2">
          {[
            { label: 'Your name', val: 'Adaora Okafor', check: true },
            { label: 'Profile photo', val: 'Matched by driver ✓', check: true },
            { label: 'Driver name', val: 'Taiwo Kolawole', check: true },
            { label: 'Plate number', val: 'ABJ-405-KL', check: true },
            { label: 'Car colour', val: 'Silver Corolla', check: true },
          ].map(r => (
            <div key={r.label} className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ background: '#F1F6EA' }}>
              <span className="text-[8px]" style={{ color: '#65785F' }}>{r.label}</span>
              <span className="text-[9px] font-bold" style={{ color: r.check ? '#1F6B46' : '#D96B1F' }}>
                {r.check ? '✓ ' : ''}{r.val}
              </span>
            </div>
          ))}
        </div>
        <div className="rounded-xl py-2 text-center text-[10px] font-bold text-white" style={{ background: '#183024' }}>
          Confirm — Start Trip →
        </div>
      </div>
    ),
  },
  {
    label: 'Live Tracking & Safety',
    icon: '🛡',
    desc: 'Trip tracked every 10 seconds. Share your journey with trusted contacts. Camera active. Panic button always visible.',
    screen: (
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-bold" style={{ color: '#1F6B46' }}>Trip In Progress</div>
          <div className="text-[8px] px-2 py-0.5 rounded-full text-white" style={{ background: '#1F6B46' }}>● Live</div>
        </div>
        <div className="relative rounded-xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #D4EBDC, #B8DFCA)', height: 90 }}>
          <motion.div className="absolute text-lg" style={{ left: '40%', top: '30%' }}
            animate={{ x: [0, 20, 40] }} transition={{ duration: 6, repeat: Infinity }}>🚗</motion.div>
          <div className="absolute right-5 bottom-3 text-lg">🏢</div>
          <div className="absolute bottom-2 left-3 text-[8px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#1F6B46' }}>
            14 min to destination
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl p-2 text-center" style={{ background: '#F1F6EA' }}>
            <div className="text-[8px]" style={{ color: '#65785F' }}>📷 Camera</div>
            <div className="text-[8px] font-bold" style={{ color: '#1F6B46' }}>Active</div>
          </div>
          <div className="rounded-xl p-2 text-center" style={{ background: '#F1F6EA' }}>
            <div className="text-[8px]" style={{ color: '#65785F' }}>👥 Tracking Shared</div>
            <div className="text-[8px] font-bold" style={{ color: '#1F6B46' }}>2 contacts</div>
          </div>
        </div>
        <div className="rounded-xl py-2 text-center text-[10px] font-bold text-white" style={{ background: '#DC2626' }}>
          🚨 Panic Button
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
  { bad: 'Driver negotiates a side price and pulls the rider off-platform', good: 'Tranzitta controls the fare — driver accepts it or skips it' },
  { bad: "No idea who's actually behind the wheel — any car, anyone", good: 'BVN + NIN + liveness check — identity confirmed before they drive' },
  { bad: 'Fake profiles and ghost accounts on every platform', good: 'Every account verified against BVN — one real person, one real account' },
  { bad: 'False complaints with no evidence — your word against theirs', good: 'In-car camera, GPS logs and payment confirmation resolve disputes with evidence' },
  { bad: 'Platform protects drivers but ignores violent riders', good: 'Hall of Shame — verified photo and name escalated publicly after ops/legal review' },
  { bad: 'Riders and drivers exchange numbers then abandon the platform', good: 'No repeat-driver model — protection only applies to in-app matched trips' },
]

const FEATURES = [
  { icon: '🪪', title: 'BVN + NIN + Liveness', body: 'Every rider verified against their BVN and government ID before their first booking. Face matched live. No mismatches, no fake accounts, no exceptions.' },
  { icon: '🔒', title: 'Mutual Verification', body: 'Driver checks your face before you board. You check their plate, name and photo before getting in. Both confirmed — logged with timestamp — then the trip starts.' },
  { icon: '💸', title: 'Driver Keeps the Fare', body: 'Drivers take the full Tranzitta-controlled fare through their account or cash. Rider and driver both confirm payment in-app before the trip closes.' },
  { icon: '📷', title: 'In-Car Camera', body: 'Insurance-grade camera in every vehicle. Interior recorded for 30 days. Live feed accessible to ops during active trips. Protects driver and rider equally.' },
  { icon: '🧾', title: 'Hall of Shame + Police Escalation', body: 'Payment fraud, violent conduct and off-platform abuse can be escalated to police and public social channels after ops/legal review.' },
  { icon: '⚡', title: 'Traffic-Controlled Fares', body: 'Tranzitta checks traffic, distance, vehicle class and demand to set the fare. Drivers cannot undercut or negotiate inside the system.' },
]

const TIERS = [
  {
    name: 'Tranzitta Go',
    icon: '🚗',
    target: 'General public',
    vehicle: 'Clean, AC, 4-door — max 5 years old',
    pricing: 'Tranzitta-controlled fare with traffic and demand',
    rating: '4.0 minimum',
    dress: 'Smart casual',
    best: ['Daily commuting', 'City-wide rides', 'Fast booking'],
  },
  {
    name: 'Tranzitta Executive',
    icon: '⭐',
    target: 'Corporate & premium',
    vehicle: 'Premium sedan or SUV — luxury spec, max 3 years old',
    pricing: 'Premium Tranzitta-controlled fare — confirmed before booking',
    rating: '4.5 minimum',
    dress: 'Professional — collared shirt minimum',
    best: ['Corporate travel', 'Airport transfers', 'High-value clients'],
  },
]

const FAQS = [
  { q: 'Why is BVN verification required?', a: 'BVN verification confirms your real identity before your first booking. This eliminates fake accounts, protects drivers from anonymous riders, and creates a legally accountable trail for every trip. No ride begins without a verified identity on both sides.' },
  { q: 'Why can I not keep requesting the same driver?', a: 'Tranzitta Go is not built around repeat-driver relationships because that can move riders and drivers outside the safety system. Each ride is matched inside the app, with Tranzitta-controlled pricing, GPS, camera trail, customer service and compliance protection.' },
  { q: 'What is the Hall of Shame?', a: 'The Hall of Shame is Tranzitta’s escalation model for verified fraud, violent conduct or serious abuse after ops/legal review. Because users complete BVN, NIN, photo and identity checks, reports can be supported with real evidence and, where required, police escalation.' },
  { q: 'Can riders pay cash?', a: 'Yes, Tranzitta Go can allow cash or direct driver-account payment, but the fare is still controlled by Tranzitta. The rider must mark paid in the app and the driver must mark received. If both sides do not agree, ops investigates using GPS, camera and trip records.' },
  { q: 'How does the in-car camera protect me?', a: 'The camera records the trip for evidence and customer support. If any dispute, complaint, payment issue or misconduct arises, the footage can be reviewed by ops. It protects riders from false driver complaints and drivers from false rider complaints.' },
  { q: 'What is the difference between Go and Executive?', a: 'Go uses standard clean vehicles with traffic-controlled pricing. Executive uses premium sedans or SUVs with a higher vehicle and driver standard. Both are matched inside the app and both block repeat-driver preference.' },
  { q: 'How does the surge pricing work?', a: 'Surge zones are drawn by ops on a live map — activated by high demand, peak hours, heavy rain, or low driver supply. The surge multiplier is shown clearly before you confirm booking. You must accept the surge fare. It is never applied mid-trip without your knowledge.' },
]

export default function GoPage() {
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
            <div className="flex-1 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold"
                  style={{ background: 'rgba(31,107,70,0.08)', color: '#1F6B46', border: '1px solid rgba(31,107,70,0.18)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Go & Executive · Lagos · Driver Subscription · BVN Verified
                </div>
                <h1 className="text-4xl md:text-6xl font-black leading-[1.05] mb-6" style={{ color: '#183024' }}>
                  The Ride That<br />
                  <span style={{ color: '#D96B1F' }}>Knows Who You Are.</span><br />
                  <span style={{ color: '#1F6B46' }}>Both of You.</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0" style={{ color: '#65785F' }}>
                  Nigeria&apos;s safety-first ride marketplace with mandatory BVN/NIN verification, mutual pre-trip identity confirmation, in-car cameras, app-controlled fares, and payment confirmation on both sides.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link href="/go/book"
                    className="px-8 py-4 rounded-full font-black text-white text-base shadow-xl transition-all hover:scale-105 active:scale-95"
                    style={{ background: '#D96B1F', boxShadow: '0 6px 24px rgba(217,107,31,0.32)' }}>
                    Book a Ride →
                  </Link>
                  <Link href="/go/dashboard"
                    className="px-8 py-4 rounded-full font-bold text-base border-2 transition-all hover:scale-105"
                    style={{ color: '#1F6B46', borderColor: '#1F6B46', background: 'rgba(255,255,255,0.8)' }}>
                    My Rides
                  </Link>
                </div>
                <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
                  {['✓ BVN + NIN', '✓ Driver Subscribed', '✓ In-Car Camera', '✓ Hall of Shame', '✓ No Repeat Driver'].map(t => (
                    <span key={t} className="text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{ background: 'rgba(31,107,70,0.08)', color: '#1F6B46', border: '1px solid rgba(31,107,70,0.16)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

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

        {/* ── BEFORE / AFTER ────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }}>Why Tranzitta Go</div>
              <h2 className="text-4xl font-black" style={{ color: '#183024' }}>Before vs After</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl p-6 border" style={{ background: 'white', borderColor: '#DDE9D2' }}>
                <div className="text-sm font-bold mb-5 flex items-center gap-2" style={{ color: '#DC2626' }}>
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Every Other Platform
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
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Tranzitta Go & Executive
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

        {/* ── TIERS ─────────────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: '#F1F6EA' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#1F6B46' }}>Two Tiers</div>
              <h2 className="text-4xl font-black" style={{ color: '#183024' }}>Go vs Executive</h2>
              <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: '#65785F' }}>
                Both tiers carry the same security, subscription-gated drivers, mutual verification and camera system. The difference is the vehicle grade and fare band.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {TIERS.map((tier, i) => (
                <motion.div key={i} className="rounded-2xl border p-8 bg-white"
                  style={{ borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="text-3xl mb-3">{tier.icon}</div>
                  <div className="font-extrabold text-xl mb-5" style={{ color: '#183024' }}>{tier.name}</div>
                  <div className="space-y-3 mb-6">
                    {[
                      { label: 'Best for', val: tier.target },
                      { label: 'Vehicle', val: tier.vehicle },
                      { label: 'Pricing', val: tier.pricing },
                      { label: 'Driver rating min', val: tier.rating },
                      { label: 'Driver dress', val: tier.dress },
                    ].map(r => (
                      <div key={r.label} className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: '#65785F' }}>{r.label}</span>
                        <span className="text-sm font-semibold" style={{ color: '#183024' }}>{r.val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1.5 mb-6">
                    {tier.best.map((b, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm" style={{ color: '#65785F' }}>
                        <span style={{ color: '#1F6B46' }}>✓</span> {b}
                      </div>
                    ))}
                  </div>
                  <Link href="/go/book"
                    className="block w-full py-3 rounded-xl text-center font-bold text-sm transition-all hover:scale-[1.02]"
                    style={{ background: i === 0 ? '#183024' : '#D96B1F', color: 'white' }}>
                    Book {tier.name} →
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ──────────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }}>Infrastructure</div>
              <h2 className="text-4xl font-black" style={{ color: '#183024' }}>Built for Safety. Built for Trust.</h2>
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

        {/* ── WALL OF SHAME SPOTLIGHT ───────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: '#F1F6EA' }}>
          <div className="max-w-4xl mx-auto">
            <div className="gradient-frame rounded-3xl p-10 md:p-14">
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">⚖️</div>
                <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }}>Zero Tolerance</div>
                <h2 className="text-3xl font-black mb-4" style={{ color: '#183024' }}>The Hall of Shame</h2>
                <p className="text-base max-w-xl mx-auto" style={{ color: '#65785F' }}>
                  Every rider and driver signs a user agreement at signup. Payment fraud, violent conduct, identity abuse and off-platform trips can trigger ops review, police escalation and public social-channel publication where legally cleared.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { trigger: '💸 Payment Fraud', desc: 'Rider and driver confirmations checked against GPS, camera and trip records.' },
                  { trigger: '📵 Off-App Abuse', desc: 'Direct bypass attempts can suspend driver access and rider protection.' },
                  { trigger: '🚨 Violent Conduct', desc: 'Police report, permanent ban and public escalation after review.' },
                ].map((w, i) => (
                  <div key={i} className="rounded-2xl p-5 bg-white border" style={{ borderColor: '#DDE9D2' }}>
                    <div className="font-extrabold text-sm mb-2" style={{ color: '#183024' }}>{w.trigger}</div>
                    <div className="text-xs" style={{ color: '#65785F' }}>{w.desc}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl p-5 border text-sm" style={{ background: 'white', borderColor: '#DDE9D2', color: '#65785F' }}>
                🔐 BVN, NIN, photo and liveness checks mean serious cases are tied to a <strong style={{ color: '#183024' }}>confirmed identity</strong>. Tranzitta ops/legal reviews every public escalation before anything is published.
              </div>
            </div>
          </div>
        </section>

        {/* ── PAYMENT SYSTEM ────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#1F6B46' }}>Payment</div>
              <h2 className="text-4xl font-black" style={{ color: '#183024' }}>Driver Gets the Fare. Tranzitta Controls the Price.</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  method: '🏦 Driver Account',
                  steps: [
                    'Tranzitta calculates the fare using route, demand and traffic',
                    'Driver accepts the ride at the Tranzitta fare',
                    'Rider pays the driver account shown inside the app',
                    'Rider marks paid',
                    'Driver marks received',
                    'Trip closes only when confirmation matches',
                  ],
                },
                {
                  method: '💵 Cash With App Confirmation',
                  steps: [
                    'Cash may be accepted only at the Tranzitta fare',
                    'No negotiation or side pricing',
                    'Rider confirms amount paid in the app',
                    'Driver confirms amount received in the app',
                    'Mismatch opens a customer service case',
                    'Repeated abuse can trigger suspension, police report or Hall of Shame review',
                  ],
                },
              ].map((pm, i) => (
                <motion.div key={i} className="rounded-2xl border p-7 bg-white"
                  style={{ borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="font-extrabold text-lg mb-5" style={{ color: '#183024' }}>{pm.method}</div>
                  <div className="space-y-2.5">
                    {pm.steps.map((s, j) => (
                      <div key={j} className="flex items-start gap-3 text-sm" style={{ color: '#65785F' }}>
                        <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                          style={{ background: '#1F6B46' }}>{j + 1}</div>
                        {s}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: '#F1F6EA' }}>
          <div className="max-w-3xl mx-auto">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }}>Questions</div>
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
        <section className="py-24 px-6" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div className="gradient-frame rounded-3xl p-10 sm:p-14"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-5xl mb-6">🚗</div>
              <h2 className="text-4xl md:text-5xl font-black mb-5" style={{ color: '#183024' }}>
                Your Driver Is<br />
                <span style={{ color: '#D96B1F' }}>Verified. Confirmed. Ready.</span>
              </h2>
              <p className="text-lg mb-10" style={{ color: '#65785F' }}>
                Book your next ride in seconds. Tranzitta controls the fare, subscribed drivers select the ride, and every trip is covered by camera, BVN/NIN verification, payment confirmation and legal accountability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/go/book"
                  className="px-10 py-4 rounded-full font-black text-white text-base shadow-xl transition-all hover:scale-105 active:scale-95"
                  style={{ background: '#D96B1F', boxShadow: '0 6px 24px rgba(217,107,31,0.35)' }}>
                  Book a Ride →
                </Link>
                <Link href="/driver"
                  className="px-10 py-4 rounded-full font-bold text-base border-2 transition-all hover:scale-105"
                  style={{ color: '#1F6B46', borderColor: '#1F6B46', background: 'rgba(255,255,255,0.7)' }}>
                  Drive with Tranzitta
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
