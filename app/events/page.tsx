'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

// ─── Phone demo screens ───────────────────────────────────────────────────────
const FLOW_STEPS = [
  {
    label: 'Submit Enquiry',
    icon: '📋',
    desc: 'Tell us your event — date, guests, pickup & drop-off.',
    screen: (
      <div className="p-4 space-y-3">
        <div className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: '#D96B1F' }}>New Event Enquiry</div>
        {[
          { label: 'Event Name', val: 'Adaeze & Emeka Wedding' },
          { label: 'Event Type', val: '💍 Wedding' },
          { label: 'Date', val: 'Sat 14 Feb 2026' },
          { label: 'Start Time', val: '11:00 AM' },
          { label: 'Guests', val: '48 passengers' },
          { label: 'Pickup', val: 'Eko Hotel, Lagos' },
          { label: 'Drop-off', val: 'Oriental Hotel, Lagos' },
        ].map(f => (
          <div key={f.label} className="rounded-lg px-3 py-2" style={{ background: '#F1F6EA' }}>
            <div className="text-[8px] font-bold uppercase tracking-wide" style={{ color: '#65785F' }}>{f.label}</div>
            <div className="text-[10px] font-bold mt-0.5" style={{ color: '#183024' }}>{f.val}</div>
          </div>
        ))}
        <div className="rounded-xl py-2 text-center text-[10px] font-bold text-white" style={{ background: '#1F6B46' }}>
          Send Enquiry →
        </div>
      </div>
    ),
  },
  {
    label: 'Private Quote',
    icon: '🔐',
    desc: 'Ops maps your route and sends a private bespoke quote — never public.',
    screen: (
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: '#1F6B46' }}>TZ</div>
          <div>
            <div className="text-[9px] font-bold" style={{ color: '#183024' }}>Tranzitta Ops · Private Message</div>
            <div className="text-[8px]" style={{ color: '#65785F' }}>Just now</div>
          </div>
        </div>
        <div className="rounded-xl p-3" style={{ background: '#F1F6EA' }}>
          <div className="text-[9px] font-bold mb-2" style={{ color: '#1F6B46' }}>Your Bespoke Quote</div>
          <div className="text-[8px] space-y-1" style={{ color: '#183024' }}>
            <div>• 3 × SUV Vehicles</div>
            <div>• 6 hours service</div>
            <div>• Eko Hotel → Oriental Hotel</div>
            <div className="pt-1 border-t" style={{ borderColor: '#DDE9D2' }}>
              <div className="font-bold text-[10px]">Quote: Private to you</div>
              <div className="text-[8px] mt-0.5" style={{ color: '#65785F' }}>50% deposit to confirm</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl py-2 text-center text-[10px] font-bold text-white" style={{ background: '#D96B1F' }}>
          Accept & Pay Deposit →
        </div>
      </div>
    ),
  },
  {
    label: 'QR Code Issued',
    icon: '🔑',
    desc: 'Pay deposit, get your QR. Drivers verified — no gate-crashing, no mixups.',
    screen: (
      <div className="p-4 space-y-3 text-center">
        <div className="text-[10px] font-bold" style={{ color: '#1F6B46' }}>Booking Confirmed ✓</div>
        <div className="text-[8px]" style={{ color: '#65785F' }}>Adaeze & Emeka Wedding · 14 Feb</div>
        <div className="mx-auto w-24 h-24 rounded-xl border-2 flex items-center justify-center text-2xl"
          style={{ borderColor: '#1F6B46', background: '#F1F6EA' }}>
          ▩▩▩
        </div>
        <div className="text-[8px]" style={{ color: '#65785F' }}>Present QR to driver at pickup<br />to start your service clock</div>
        <div className="rounded-xl py-2 text-[9px] font-bold border" style={{ borderColor: '#DDE9D2', color: '#183024' }}>
          Transfer QR to Principal Guest →
        </div>
        <div className="flex items-center justify-center gap-4 pt-1">
          <div className="text-center">
            <div className="text-[9px] font-bold" style={{ color: '#183024' }}>Driver</div>
            <div className="text-[8px]" style={{ color: '#65785F' }}>Chukwuma · ⭐ 4.9</div>
          </div>
          <div className="text-center">
            <div className="text-[9px] font-bold" style={{ color: '#183024' }}>Vehicle</div>
            <div className="text-[8px]" style={{ color: '#65785F' }}>Toyota Prado · LGS-412</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Live Event Day',
    icon: '🚐',
    desc: 'Track all vehicles live. Clock starts the moment your QR is scanned.',
    screen: (
      <div className="p-4 space-y-2">
        <div className="text-[10px] font-bold" style={{ color: '#183024' }}>Event Day · Live Tracking</div>
        <div className="text-[8px] mb-2" style={{ color: '#D96B1F' }}>⏱ Clock started · 11:03 AM</div>
        {[
          { name: 'Vehicle 1 — Prado', status: 'En Route to Pickup', eta: '4 min', color: '#D96B1F' },
          { name: 'Vehicle 2 — Prado', status: 'Arrived at Pickup', eta: 'Ready', color: '#1F6B46' },
          { name: 'Vehicle 3 — Camry', status: 'En Route to Pickup', eta: '7 min', color: '#D96B1F' },
        ].map((v, i) => (
          <div key={i} className="rounded-lg p-2 flex items-center justify-between" style={{ background: '#F1F6EA' }}>
            <div>
              <div className="text-[9px] font-bold" style={{ color: '#183024' }}>{v.name}</div>
              <div className="text-[8px]" style={{ color: '#65785F' }}>{v.status}</div>
            </div>
            <div className="text-[9px] font-bold" style={{ color: v.color }}>{v.eta}</div>
          </div>
        ))}
        <div className="rounded-lg py-1.5 text-center text-[9px] font-bold text-white" style={{ background: '#183024' }}>
          📞 Call Ops Line
        </div>
      </div>
    ),
  },
]

function PhoneScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 220, height: 440 }}>
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[36px] border-[6px] shadow-2xl"
        style={{ borderColor: '#183024', background: '#183024' }} />
      {/* Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full" style={{ background: '#0F1F17', zIndex: 10 }} />
      {/* Screen */}
      <div className="absolute inset-[6px] rounded-[30px] overflow-hidden" style={{ background: '#FAFDF7' }}>
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 pt-5 pb-1">
          <span className="text-[8px] font-bold" style={{ color: '#183024' }}>9:41</span>
          <span className="text-[8px]" style={{ color: '#183024' }}>●●●</span>
        </div>
        <div className="overflow-hidden" style={{ height: 380 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── Pain comparison data ────────────────────────────────────────────────────
const PAINS = [
  { bad: 'Random okada drivers at your wedding gate', good: 'Police-vetted, rated, professional fleet' },
  { bad: 'No-show on your event day', good: 'Driver confirmed 48hrs ahead — binding commitment' },
  { bad: 'Guests argue with drivers over fares', good: 'All-inclusive: drivers never discuss pricing' },
  { bad: 'Wrong passengers in your vehicles', good: 'QR scan confirms the right guests board every time' },
  { bad: 'No idea where your vehicles are', good: 'Live tracking for all vehicles throughout event' },
  { bad: 'Last-minute chaos, missed pickups', good: 'Ops on standby — any issue, call, resolved in minutes' },
]

const EVENT_TYPES = [
  { emoji: '💍', label: 'Weddings', desc: 'Full fleet management for your special day' },
  { emoji: '🏢', label: 'Corporate', desc: 'Board meetings, conferences, team events' },
  { emoji: '🎉', label: 'Celebrations', desc: 'Birthdays, graduations, parties' },
  { emoji: '✈️', label: 'Airport Runs', desc: 'Group arrivals and departures, perfectly timed' },
  { emoji: '🎭', label: 'VIP Events', desc: 'Red carpet, galas, premium occasions' },
  { emoji: '📸', label: 'Brand Activations', desc: 'Product launches, shoots, brand days' },
]

const PILLARS = [
  { icon: '🔐', title: 'QR-Verified Boarding', body: 'Every passenger verified at pickup. No QR, no boarding — your guest list, your control.' },
  { icon: '⏱', title: 'Fair Billing — No Surprises', body: 'Clock starts when your QR is scanned. 30-minute grace period. Excess billed transparently.' },
  { icon: '🛡', title: 'Zero-Tolerance Conduct', body: 'Drivers are professional and calm. Any complaint goes to Ops — never to your driver.' },
  { icon: '📍', title: 'Fleet Live Tracking', body: 'All vehicles tracked in real time. Know exactly where every car is throughout your event.' },
  { icon: '💬', title: 'Ops Always On', body: 'Dedicated ops line on event day. Any incident handled within minutes, not hours.' },
  { icon: '🔒', title: 'Pricing is Private', body: 'All quotes are bespoke and confidential. No public pricing — ever. Your event, your terms.' },
]

const FAQS = [
  { q: 'How is pricing determined?', a: 'Every quote is bespoke — based on route distance, hours required, vehicle type, passenger count, date, and any special requirements. Pricing is sent privately to the principal booker only.' },
  { q: 'Can passengers be picked up from multiple locations?', a: 'No. Tranzitta Events operates one pickup location and one drop-off location per booking. This is non-negotiable and ensures punctuality and fleet coordination.' },
  { q: 'What happens if we run over our booked time?', a: 'A 30-minute grace period applies from your agreed start time. After that, excess hours are billed at your agreed hourly rate per full hour. The principal booker is notified immediately when excess billing starts.' },
  { q: 'What if a driver or passenger behaves badly?', a: 'Call Tranzitta Ops immediately. Passengers never confront drivers — and drivers never argue with passengers. Ops mediates everything. Any serious incident is logged permanently.' },
  { q: 'Can I transfer the QR code to another guest?', a: 'Yes. The principal booker can transfer QR authority to one designated principal passenger in-app before the event. The principal booker remains financially responsible regardless.' },
  { q: 'What vehicles are available?', a: 'Sedans, SUVs, and minibuses — quoted per your group size and preferences. Vehicle type is a factor in your bespoke quote.' },
]

export default function EventsPage() {
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
      <main style={{ paddingTop: '2.5rem' }}>

        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-32"
          style={{ background: 'linear-gradient(160deg, #FFF0E4 0%, var(--warm-white) 55%, #EDF6F1 100%)' }}>
          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.34) 0 1px, transparent 1px 120px), linear-gradient(0deg, rgba(255,255,255,0.28) 0 1px, transparent 1px 120px)', maskImage: 'linear-gradient(to bottom, black 0%, transparent 76%)' }} />

          {/* Accent orbs */}
          <motion.div className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #D96B1F, transparent)' }}
            animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 6, repeat: Infinity }} />
          <motion.div className="absolute bottom-10 left-8 w-56 h-56 rounded-full opacity-15 blur-3xl"
            style={{ background: 'radial-gradient(circle, #1F6B46, transparent)' }}
            animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, delay: 2 }} />

          <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            {/* Left — copy */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold"
                  style={{ background: 'rgba(31,107,70,0.08)', color: '#1F6B46', border: '1px solid rgba(31,107,70,0.18)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Bespoke Event Transport · Lagos
                </div>

                <h1 className="text-4xl md:text-6xl font-black leading-[1.05] mb-6" style={{ color: '#183024' }}>
                  Your Event.<br />
                  <span style={{ color: '#D96B1F' }}>Zero Chaos.</span><br />
                  <span style={{ color: '#1F6B46' }}>Every Vehicle.</span>
                </h1>

                <p className="text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0" style={{ color: '#65785F' }}>
                  Premium group transport for weddings, corporate events, and celebrations. Police-vetted drivers. Live fleet tracking. QR-verified boarding. Pricing quoted privately — never public.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link href="/events/enquire"
                    className="px-8 py-4 rounded-full font-black text-white text-base shadow-xl transition-all hover:scale-105 active:scale-95"
                    style={{ background: '#D96B1F', boxShadow: '0 6px 24px rgba(217,107,31,0.32)' }}>
                    Request a Quote →
                  </Link>
                  <a href="https://wa.me/2349000000000?text=Hi%20Tranzitta%20Events%2C%20I%27d%20like%20to%20enquire%20about%20event%20transport"
                    target="_blank" rel="noopener noreferrer"
                    className="px-8 py-4 rounded-full font-bold text-base border-2 transition-all hover:scale-105"
                    style={{ color: '#1F6B46', borderColor: '#1F6B46', background: 'rgba(255,255,255,0.8)' }}>
                    💬 WhatsApp Ops
                  </a>
                </div>

                {/* Trust chips */}
                <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
                  {['✓ Police-Vetted Drivers', '✓ QR Boarding', '✓ Live Tracking', '✓ Ops Always On'].map(t => (
                    <span key={t} className="text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{ background: 'rgba(31,107,70,0.08)', color: '#1F6B46', border: '1px solid rgba(31,107,70,0.16)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right — animated phone */}
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

                {/* Step indicators */}
                <div className="mt-5 flex gap-2 justify-center">
                  {FLOW_STEPS.map((step, i) => (
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
            <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }}>The Process</div>
              <h2 className="text-4xl font-black" style={{ color: '#183024' }}>How Tranzitta Events Works</h2>
              <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: '#65785F' }}>
                From enquiry to event day — a clean, professional process with ops managing everything behind the scenes.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { step: '01', icon: '📋', title: 'Submit Your Enquiry', body: 'Share your event name, type, date, start time, estimated hours, pickup address, drop-off, passenger count, and any special requirements. No pressure — just details.' },
                { step: '02', icon: '🔐', title: 'Receive Your Private Quote', body: 'Ops maps your route, estimates drive time, reviews vehicle requirements, and builds a bespoke quote. Sent privately to you — no public pricing, ever.' },
                { step: '03', icon: '💳', title: 'Pay 50% Deposit', body: 'Accept your quote and pay 50% via Paystack or Flutterwave. Booking confirmed. You receive driver details, your QR code, and a full service rules summary.' },
                { step: '04', icon: '🚐', title: 'Event Day — Ops Handles Everything', body: 'Driver arrives 15 minutes early. You scan QR, clock starts. Track all vehicles live. Any issue — call ops, not the driver. Balance invoice after event completion.' },
              ].map((s, i) => (
                <motion.div key={i} className="rounded-2xl p-8 border"
                  style={{ background: 'white', borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <div className="flex items-start gap-4">
                    <div className="text-2xl font-black opacity-20 w-10" style={{ color: '#1F6B46' }}>{s.step}</div>
                    <div>
                      <div className="text-2xl mb-2">{s.icon}</div>
                      <div className="font-extrabold text-lg mb-2" style={{ color: '#183024' }}>{s.title}</div>
                      <p className="text-sm leading-relaxed" style={{ color: '#65785F' }}>{s.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EVENT TYPES ───────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: '#F1F6EA' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#1F6B46' }}>Every Occasion</div>
              <h2 className="text-4xl font-black" style={{ color: '#183024' }}>We Cover All Events</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {EVENT_TYPES.map((et, i) => (
                <motion.div key={i} className="rounded-2xl p-6 text-center border bg-white"
                  style={{ borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(31,107,70,0.12)' }}>
                  <div className="text-4xl mb-3">{et.emoji}</div>
                  <div className="font-extrabold mb-1" style={{ color: '#183024' }}>{et.label}</div>
                  <div className="text-xs" style={{ color: '#65785F' }}>{et.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PAIN / COMPARISON ─────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }}>Why Tranzitta Events</div>
              <h2 className="text-4xl font-black" style={{ color: '#183024' }}>Before vs After</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl p-6 border" style={{ background: 'white', borderColor: '#DDE9D2' }}>
                <div className="text-sm font-bold mb-5 flex items-center gap-2" style={{ color: '#DC2626' }}>
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Without Tranzitta Events
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
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> With Tranzitta Events
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

        {/* ── PILLARS ───────────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }}>Built Different</div>
              <h2 className="text-4xl font-black" style={{ color: '#183024' }}>Our Non-Negotiables</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PILLARS.map((p, i) => (
                <motion.div key={i} className="rounded-2xl p-7 border"
                  style={{ background: 'white', borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -3, boxShadow: '0 12px 36px rgba(31,107,70,0.10)' }}>
                  <div className="text-3xl mb-4">{p.icon}</div>
                  <div className="font-extrabold mb-2" style={{ color: '#183024' }}>{p.title}</div>
                  <p className="text-sm leading-relaxed" style={{ color: '#65785F' }}>{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QR DEEP DIVE ──────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: '#F1F6EA' }}>
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#1F6B46' }}>Security</div>
              <h2 className="text-4xl font-black" style={{ color: '#183024' }}>The QR System Explained</h2>
              <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: '#65785F' }}>
                Every booking gets a unique QR code. Driver scans it. Clock starts. No ambiguity.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: '📲', title: 'Issued After Deposit', body: 'Once your 50% deposit is confirmed, you receive a unique QR code in-app. Only one QR per booking, at any time.' },
                { icon: '🔄', title: 'Transfer to Principal Guest', body: 'Can\'t attend pickup yourself? Transfer QR authority to one designated guest in-app. You remain financially responsible.' },
                { icon: '⏱', title: 'Scan = Clock Starts', body: 'Driver scans your QR at pickup. That moment is your official start time. 30-min grace included — then excess billing begins.' },
              ].map((q, i) => (
                <motion.div key={i} className="rounded-2xl p-6 text-center bg-white border"
                  style={{ borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-2xl mb-4"
                    style={{ background: '#F1F6EA' }}>{q.icon}</div>
                  <div className="font-extrabold mb-2" style={{ color: '#183024' }}>{q.title}</div>
                  <p className="text-sm" style={{ color: '#65785F' }}>{q.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONDUCT RULES ─────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: '#F1F6EA' }}>
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }}>Standards</div>
              <h2 className="text-4xl font-black" style={{ color: '#183024' }}>Service Rules — Everyone Agrees</h2>
              <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: '#65785F' }}>
                These rules protect drivers, passengers, and Tranzitta equally. Accepted by every client at booking.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { cat: 'Vehicle Rules', rules: ['One pickup location only — no multi-stop collections', 'One drop-off location only', 'No food or drink inside vehicles', 'No littering — cleaning charge applies', 'Seatbelts must be worn at all times', 'Maximum passenger count strictly enforced'] },
                { cat: 'Conduct Rules', rules: ['No arguments with drivers — call ops instead', 'Passenger complaints go to ops, not the driver', 'Any aggressive behaviour by passenger — service may be suspended', 'Driver cannot cancel within 48hrs of event', 'Clock runs from agreed start — not boarding time', '30-minute grace, then excess billing per full hour'] },
              ].map((block, bi) => (
                <motion.div key={bi} className="rounded-2xl p-7 border bg-white"
                  style={{ borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: bi * 0.1 }}>
                  <div className="font-extrabold mb-4" style={{ color: '#D96B1F' }}>{block.cat}</div>
                  <div className="space-y-2.5">
                    {block.rules.map((r, ri) => (
                      <div key={ri} className="flex items-start gap-3 text-sm" style={{ color: '#65785F' }}>
                        <span className="mt-0.5 flex-shrink-0 font-bold" style={{ color: '#1F6B46' }}>•</span>
                        {r}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DRIVER JOBS ───────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-4xl mx-auto">
            <motion.div className="rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 border"
              style={{ background: 'white', borderColor: '#DDE9D2' }}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex-1">
                <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }}>Driver Opportunities</div>
                <h2 className="text-3xl font-black mb-4" style={{ color: '#183024' }}>Earn on Event Days</h2>
                <p className="text-base mb-6" style={{ color: '#65785F' }}>
                  Event jobs pay well. You see the job, the hours, the zone, and the driver pay — then you bid. Ops selects based on your rating, vehicle quality, and vetting score.
                </p>
                <div className="space-y-3 mb-8">
                  {['Clock-run billing protects your income — passengers can\'t cut your hours', 'Driver payment released within 48hrs of event completion', 'Any passenger misconduct is logged — you\'re protected', 'Professional attire required — premium clients, premium rates'].map((b, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm" style={{ color: '#183024' }}>
                      <span style={{ color: '#1F6B46' }}>✓</span> {b}
                    </div>
                  ))}
                </div>
                <Link href="/events/jobs"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
                  style={{ background: '#183024' }}>
                  View Open Event Jobs →
                </Link>
              </div>
              <div className="flex-shrink-0 w-48 h-48 rounded-3xl flex flex-col items-center justify-center gap-2 border-2"
                style={{ borderColor: '#DDE9D2', background: '#F1F6EA' }}>
                <div className="text-5xl">🚐</div>
                <div className="text-sm font-black" style={{ color: '#183024' }}>Bid for Events</div>
                <div className="text-xs text-center px-4" style={{ color: '#65785F' }}>Professional. Protected. Paid.</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: '#F1F6EA' }}>

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
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.2 }}
                        className="overflow-hidden">
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
              <div className="text-5xl mb-6">🎉</div>
              <h2 className="text-4xl md:text-5xl font-black mb-5" style={{ color: '#183024' }}>
                Your Event Deserves<br />
                <span style={{ color: '#D96B1F' }}>Zero Compromise.</span>
              </h2>
              <p className="text-lg mb-10" style={{ color: '#65785F' }}>
                Submit your event enquiry. Ops will map your route and send you a private bespoke quote within hours. No public pricing, no pressure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/events/enquire"
                  className="px-10 py-4 rounded-full font-black text-white text-base shadow-xl transition-all hover:scale-105 active:scale-95"
                  style={{ background: '#D96B1F', boxShadow: '0 6px 24px rgba(217,107,31,0.35)' }}>
                  Request a Quote →
                </Link>
                <Link href="/events/dashboard"
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
