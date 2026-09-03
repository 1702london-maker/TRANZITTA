'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

/* ─── Vertical tab data ─────────────────────────────── */
type VerticalKey = 'go' | 'school' | 'airport' | 'corporate' | 'events'

const VERTICALS: {
  key: VerticalKey
  icon: string
  label: string
  tagline: string
  colour: string
  pill: string
  steps: { icon: string; title: string; desc: string }[]
  cta: { label: string; href: string }
}[] = [
  {
    key: 'go',
    icon: '🚗',
    label: 'Go & Executive',
    tagline: 'On-demand rides. Mutual verification. Zero cash.',
    colour: '#1F6B46',
    pill: '#F1F6EA',
    steps: [
      { icon: '📱', title: 'Book your ride', desc: 'Open the app. Enter pickup and drop-off. Choose Go (standard) or Executive (premium SUV). See a live fare estimate with any active surge multiplier before you confirm.' },
      { icon: '🪪', title: 'Identity verified before you ride', desc: 'First-time riders complete BVN, NIN and a liveness check. This happens once. Every ride after that is instant. Drivers go through the same process — verified, not anonymous.' },
      { icon: '🔐', title: 'Mutual verification at pickup', desc: 'When your driver arrives, you both verify each other. You confirm the driver\'s name, photo and plate. The driver confirms your photo. No scan, no ride. No exceptions.' },
      { icon: '📍', title: 'Live GPS tracking', desc: 'Your route tracks in real time, GPS updates every 10 seconds. Share your live trip link with anyone. Panic button visible on every screen — one tap alerts ops, police and your trusted contacts.' },
      { icon: '💳', title: 'Pay by card or bank transfer', desc: 'No cash on Executive. Go accepts card hold or bank transfer. Card hold is pre-authorised and only charged at journey end. The amount shown is what you pay — no hidden fees.' },
    ],
    cta: { label: 'Book a Ride →', href: '/go/book' },
  },
  {
    key: 'school',
    icon: '🏫',
    label: 'School',
    tagline: 'Police-vetted driver. QR at every pickup. Max 3 children.',
    colour: '#1F6B46',
    pill: '#F1F6EA',
    steps: [
      { icon: '📝', title: 'Enrol your child', desc: 'Submit an online enquiry with your child\'s name, school, pickup address and morning schedule. Ops contacts you within 24 hours. No pricing shown online — rate is sent privately based on your route.' },
      { icon: '🚗', title: 'Meet your dedicated driver', desc: 'Before Day 1 you receive your driver\'s full profile: name, photo, vehicle, plate number and police clearance certificate. Maximum 3 children per car. Every day, same driver.' },
      { icon: '🔐', title: 'QR verification at every pickup', desc: 'Your child scans the driver\'s QR code before boarding. No scan = no child boards. The system enforces this — it cannot be bypassed or skipped by the driver.' },
      { icon: '📱', title: 'You watch every moment', desc: 'Your phone shows the live map, GPS every 10 seconds, and the exact moment your child boards. When they arrive at school, the teacher confirms — you get a timestamped notification.' },
      { icon: '💳', title: 'Pay term upfront', desc: 'Full term payment secures your child\'s seat. Paystack or Flutterwave. Instant receipt. No cash, ever.' },
    ],
    cta: { label: 'Enrol Your Child →', href: '/school/enrol' },
  },
  {
    key: 'airport',
    icon: '✈️',
    label: 'Airport',
    tagline: 'Track your flight. Driver waits for you. Never miss a flight.',
    colour: '#1F6B46',
    pill: '#F1F6EA',
    steps: [
      { icon: '📅', title: 'Book your transfer', desc: 'Arrivals or departures. Enter your flight number, terminal, and destination zone. Rate is confirmed at booking — never shown publicly. Choose meet-and-greet or self-pickup.' },
      { icon: '✈️', title: 'We track your flight in real time', desc: 'For arrivals, your driver\'s ETA adjusts automatically to your actual landing time. Flight delayed? Driver waits. Early? Driver is already there. You never pay for a driver who left without you.' },
      { icon: '👤', title: 'Verified driver meets you', desc: 'Police-cleared, NIN-verified driver with your name on a board at arrivals. You see their photo, vehicle and plate on your phone before you land. No confusion at the airport.' },
      { icon: '📍', title: 'Track to your destination', desc: 'Live GPS for the entire journey. Share the live link. Panic button always visible. In-car camera active. Driver confirmed at pickup — same as Go, mutual check.' },
      { icon: '💳', title: 'Pay at booking', desc: 'Rate locked when you book. Paystack or Flutterwave. No cash. No airport price negotiation. Receipt sent to your email immediately.' },
    ],
    cta: { label: 'Book Airport Transfer →', href: '/airport/book' },
  },
  {
    key: 'corporate',
    icon: '🏢',
    label: 'Corporate',
    tagline: 'One contract. Dedicated van. All your staff. Monthly advance.',
    colour: '#D96B1F',
    pill: '#FFF0E4',
    steps: [
      { icon: '📝', title: 'Submit a corporate enquiry', desc: 'Provide your company name, RC number, staff count, office address and shift requirements. Ops verifies your CAC registration and calls you within 24 hours. No pricing shown online.' },
      { icon: '🗺️', title: 'Ops builds your routes', desc: 'Your team provides a staff home address list. Ops uses PostGIS proximity clustering to group staff into van routes — minimising total distance, maximising capacity. You review and approve groupings.' },
      { icon: '📄', title: 'Private quote — sign and pay', desc: 'Ops sends a private monthly quote: base rate × shift hours × working days × vans required. AM and PM rates differ — Lagos evening traffic is significantly worse. You sign digitally and pay first month in advance.' },
      { icon: '🚐', title: 'Same driver, every day', desc: 'Approved drivers bid for your route. Ops selects the most consistent driver — committed for the full month. Admin sees every van live, every staff member confirmed, every missed pickup flagged in real time.' },
      { icon: '🧾', title: 'Monthly invoice — base + excess', desc: 'Advance payment covers the base. Any overrun beyond agreed shift hours accumulates as excess — itemised daily, invoiced monthly. Pay directly from the admin dashboard via Paystack or Flutterwave.' },
    ],
    cta: { label: 'Request Corporate Quote →', href: '/corporate/enquire' },
  },
  {
    key: 'events',
    icon: '🎉',
    label: 'Events',
    tagline: 'Bespoke transport for weddings, concerts, conferences and VIP.',
    colour: '#1F6B46',
    pill: '#F1F6EA',
    steps: [
      { icon: '📝', title: 'Submit your event enquiry', desc: 'Tell us about your event: date, type, guest count, pickup locations, any special requirements. We handle weddings, concerts, corporate dinners, airport convoy, stadium fleet and private VIP.' },
      { icon: '📞', title: 'Ops designs your transport plan', desc: 'Ops calls you to build a bespoke transport solution — vehicle mix, timing, pickup sequence, driver allocation. Every event is different. No fixed packages, no published pricing.' },
      { icon: '💼', title: 'Deposit secures your date', desc: 'A deposit locks in your booking and drivers. Balance is due before event day. Your dedicated ops contact manages everything from confirmation to execution.' },
      { icon: '🚗', title: 'Fleet arrives on the day', desc: 'Every driver briefed, every route confirmed, every vehicle inspected. Guest names on a manifest. Real-time dashboard for your event coordinator — live fleet tracking throughout.' },
      { icon: '✅', title: 'Event complete — full report', desc: 'After your event, you receive a complete trip report: every vehicle, every route, all timings, driver ratings. Invoice settled. Nothing left open.' },
    ],
    cta: { label: 'Enquire for Your Event →', href: '/events/enquire' },
  },
]

/* ─── Shared systems ─────────────────────────────────── */
const SAFETY_ITEMS = [
  { icon: '🔐', title: 'QR verification', desc: 'Every pickup on School uses a mandatory QR scan. Every Go and Executive ride uses mutual identity confirmation. No anonymous drivers — ever.' },
  { icon: '📹', title: 'In-car camera', desc: '30-day footage retained across all verticals. Ops can view a live feed during any active trip. Mandatory on School, Corporate and Airport.' },
  { icon: '📍', title: 'GPS every 10 seconds', desc: 'Not a last-known ping. Continuous real-time tracking for every active trip, every vertical. Share your live link with anyone.' },
  { icon: '🆘', title: 'Panic button', desc: 'Visible on every screen in every vertical. One tap alerts ops, police and your trusted contacts. Sub-60 second response protocol.' },
  { icon: '🪪', title: 'Driver vetting — mandatory', desc: 'Police clearance, NIN verification, home address confirmed and liveness check. All drivers. No exceptions. Re-checked at every new contract period.' },
  { icon: '🔄', title: 'Liveness re-verification', desc: 'Drivers and Go riders re-verify identity every 90 days. Face matching against original ID. Ops can trigger early re-verification at any point.' },
]

const PAYMENT_ITEMS = [
  { icon: '💳', label: 'Paystack', desc: 'Card payments, instant receipt, webhook confirmation.' },
  { icon: '🏦', label: 'Flutterwave', desc: 'Bank transfer, USSD, card — all in one.' },
  { icon: '🔒', label: 'Card hold', desc: 'Go rides pre-authorise card — only charged at journey end.' },
  { icon: '📄', label: 'Auto-invoice', desc: 'School and Corporate auto-generate monthly invoices with full breakdown.' },
  { icon: '🧾', label: 'PO support', desc: 'Corporate invoices support purchase order reference numbers for finance teams.' },
  { icon: '❌', label: 'No cash', desc: 'Zero cash on Executive, School, Airport, Corporate and Events. Go allows cash.' },
]

const DRIVER_ITEMS = [
  { n: '01', title: 'Application & document check', desc: 'Driver applies with NIN, police clearance, vehicle registration, insurance and profile photo. All documents verified before any test.' },
  { n: '02', title: 'Vehicle inspection', desc: 'Vehicle must meet Tranzitta standards — age limit, AC, cleanliness, seat belts. Corporate and School vans: maximum 5 years old, mandatory camera installed.' },
  { n: '03', title: 'Liveness check', desc: 'Face match against NIN and police ID. Repeated every 90 days for active drivers. Ops can trigger early re-check.' },
  { n: '04', title: 'Home address verification', desc: 'Physical address confirmed before activation. Drivers cannot operate without a verified, registered address on file.' },
  { n: '05', title: 'In-car camera installed', desc: 'Camera installed and tested by Tranzitta ops before first trip. Footage access is ops-only. 30-day retention minimum.' },
  { n: '06', title: 'Ops approval', desc: 'Ops reviews and approves every driver before activation. Drivers with any unresolved rating below threshold are suspended automatically.' },
]

/* ─── Page component ─────────────────────────────────── */
export default function HowItWorksPage() {
  const [active, setActive] = useState<VerticalKey>('go')
  const [faqOpen, setFaqOpen] = useState<number | null>(null)

  const vertical = VERTICALS.find(v => v.key === active)!

  const FAQS = [
    { q: 'Is Tranzitta available outside Lagos?', a: 'Not yet. We are live in Lagos and Abuja for School. Expansion to Port Harcourt and other cities will be announced on our channels first.' },
    { q: 'What if my driver cancels?', a: 'Ops is notified immediately and a replacement driver is dispatched. For School and Corporate — same-day replacement guaranteed. For Go — a new driver is matched within minutes.' },
    { q: 'Can I use Tranzitta without the app?', a: 'You can submit enquiries and book Events, School and Corporate via the web platform without downloading an app. Go and Airport have dedicated booking flows on the website.' },
    { q: 'What happens if a trip goes wrong?', a: 'Use the panic button for immediate response. For billing disputes, contact ops within 48 hours with your trip ID. For driver issues — flag directly from your dashboard and ops will respond within 2 hours.' },
    { q: 'Are drivers employees or contractors?', a: 'Drivers are independent contractors who meet Tranzitta vetting requirements. They are not Tranzitta employees. Tranzitta holds them to service standards through the rating system and ops monitoring.' },
    { q: 'How does surge pricing work?', a: 'Surge multipliers apply during high-demand periods — typically peak hours and bad weather. Go riders see the current multiplier before booking. Corporate and School admins are notified when a surge is active on their route. Airport rates are locked at booking — no surge applied after you confirm.' },
  ]

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 54 }}>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden px-4 py-24 sm:py-32"
          style={{ background: 'linear-gradient(160deg, #FFF0E4 0%, var(--warm-white) 55%, #EDF6F1 100%)' }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #D96B1F, transparent)' }} />
            <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #1F6B46, transparent)' }} />
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6"
              style={{ background: 'rgba(31,107,70,0.08)', color: '#1F6B46', border: '1px solid rgba(31,107,70,0.18)' }}
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Tranzitta · How It Works
            </motion.div>
            <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6"
              style={{ color: '#183024' }}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              One platform.<br />
              <span style={{ color: '#D96B1F' }}>Five ways to move.</span><br />
              <span style={{ color: '#1F6B46' }}>Every journey verified.</span>
            </motion.h1>
            <motion.p className="text-lg leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: '#65785F' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
              Tranzitta covers every transport need in Lagos — from a quick cross-island ride to a full year of school runs, corporate shuttles, airport transfers and event fleets.
              Every vertical. Same standard. Vetted driver. Live tracking. Zero cash optional.
            </motion.p>

            {/* Vertical pills */}
            <motion.div className="flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
              {VERTICALS.map(v => (
                <button key={v.key} onClick={() => setActive(v.key)}
                  className="px-5 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105"
                  style={{
                    background: active === v.key ? '#183024' : 'white',
                    color: active === v.key ? 'white' : '#183024',
                    border: `2px solid ${active === v.key ? '#183024' : '#DDE9D2'}`,
                  }}>
                  {v.icon} {v.label}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── VERTICAL DEEP-DIVE ── */}
        <section className="py-20 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>

                {/* Vertical header */}
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                    style={{ background: vertical.pill, border: `1px solid ${vertical.colour}22` }}>
                    {vertical.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: vertical.colour }}>
                      Tranzitta {vertical.label}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#183024' }}>
                      {vertical.tagline}
                    </h2>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-4">
                  {vertical.steps.map((step, i) => (
                    <motion.div key={i}
                      className="flex gap-5 p-5 rounded-2xl border items-start"
                      style={{ background: 'white', borderColor: '#DDE9D2' }}
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}>
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                        style={{ background: vertical.pill }}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1.5">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white flex-shrink-0"
                            style={{ background: vertical.colour }}>
                            {i + 1}
                          </div>
                          <div className="font-extrabold text-sm" style={{ color: '#183024' }}>{step.title}</div>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: '#65785F' }}>{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Vertical CTA */}
                <div className="mt-8 flex gap-3">
                  <Link href={vertical.cta.href}
                    className="inline-block px-8 py-3.5 rounded-full font-bold text-white text-sm hover:scale-105 transition-transform"
                    style={{ background: '#D96B1F', boxShadow: '0 6px 24px rgba(217,107,31,0.28)' }}>
                    {vertical.cta.label}
                  </Link>
                  <Link href={`/${vertical.key}`}
                    className="inline-block px-8 py-3.5 rounded-full font-semibold text-sm border-2 hover:scale-105 transition-transform"
                    style={{ color: '#1F6B46', borderColor: '#1F6B46', background: 'rgba(255,255,255,0.8)' }}>
                    Learn More →
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── SAFETY SYSTEMS ── */}
        <section className="py-20 px-4" style={{ background: '#F1F6EA' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#D96B1F' }}>Across every vertical</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: '#183024' }}>
                The same safety stack.<br />Every trip.
              </h2>
              <p className="text-base mt-3 max-w-xl mx-auto" style={{ color: '#65785F' }}>
                Whether it is a school run or a VIP airport transfer — every Tranzitta trip runs on the same verification, tracking and response infrastructure.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SAFETY_ITEMS.map((s, i) => (
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

        {/* ── DRIVER VETTING ── */}
        <section className="py-20 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1F6B46' }}>How drivers are approved</div>
              <h2 className="text-3xl font-extrabold" style={{ color: '#183024' }}>
                Not anyone with a car.<br />Someone we have verified.
              </h2>
              <p className="text-base mt-3 max-w-xl mx-auto" style={{ color: '#65785F' }}>
                Every Tranzitta driver passes a six-stage vetting process before they take their first trip. No exceptions.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DRIVER_ITEMS.map((d, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                  <div className="text-3xl font-extrabold mb-2 leading-none" style={{ color: 'rgba(31,107,70,0.1)' }}>{d.n}</div>
                  <div className="font-extrabold mb-1.5 text-sm" style={{ color: '#183024' }}>{d.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: '#65785F' }}>{d.desc}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 gradient-frame rounded-2xl p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { stat: '4.7+', label: 'Minimum rating to stay active' },
                  { stat: '90 days', label: 'Liveness re-verification cycle' },
                  { stat: '0', label: 'Unverified drivers on the platform' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-black" style={{ color: '#183024' }}>{s.stat}</div>
                    <div className="text-xs mt-1" style={{ color: '#65785F' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PAYMENT ── */}
        <section className="py-20 px-4" style={{ background: '#F1F6EA' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1F6B46' }}>Payment</div>
              <h2 className="text-3xl font-extrabold" style={{ color: '#183024' }}>
                Paystack. Flutterwave. No cash where it matters.
              </h2>
              <p className="text-base mt-3 max-w-xl mx-auto" style={{ color: '#65785F' }}>
                Every Tranzitta vertical is built around cashless-first payments — instant receipts, full audit trail, no driver handling money.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {PAYMENT_ITEMS.map((p, i) => (
                <motion.div key={i} className="rounded-2xl p-5 border"
                  style={{ background: 'white', borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }} viewport={{ once: true }}>
                  <div className="text-2xl mb-2">{p.icon}</div>
                  <div className="font-extrabold mb-1 text-sm" style={{ color: '#183024' }}>{p.label}</div>
                  <div className="text-xs leading-relaxed" style={{ color: '#65785F' }}>{p.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CHOOSE YOUR VERTICAL ── */}
        <section className="py-20 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#D96B1F' }}>Which is right for you?</div>
              <h2 className="text-3xl font-extrabold" style={{ color: '#183024' }}>Every need. One platform.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '🚗', label: 'Go & Executive', for: 'I need a ride right now', detail: 'On-demand · BVN verified · Mutual ID check · Surge pricing', href: '/go' },
                { icon: '🏫', label: 'School', for: 'My child needs a daily driver', detail: 'Term-based · QR pickup · Max 3 children · Teacher confirms', href: '/school' },
                { icon: '✈️', label: 'Airport', for: 'I have a flight to catch', detail: 'Live flight tracking · Driver waits · Meet-and-greet available', href: '/airport' },
                { icon: '🏢', label: 'Corporate', for: 'My company needs staff shuttles', detail: 'Monthly advance · Dedicated vans · Excess billing · Admin dashboard', href: '/corporate' },
                { icon: '🎉', label: 'Events', for: 'I have a wedding / event', detail: 'Bespoke fleet · Ops-managed · Deposit + balance · Full report', href: '/events' },
                { icon: '🚐', label: 'Drive with us', for: 'I want to earn as a driver', detail: 'Apply to drive · All verticals · Weekly payout', href: '/driver' },
              ].map((v, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }} viewport={{ once: true }}>
                  <Link href={v.href}
                    className="block rounded-2xl p-5 border hover:scale-[1.02] transition-transform"
                    style={{ background: 'white', borderColor: '#DDE9D2' }}>
                    <div className="text-3xl mb-3">{v.icon}</div>
                    <div className="font-extrabold text-sm mb-1" style={{ color: '#183024' }}>{v.label}</div>
                    <div className="text-xs font-semibold mb-2" style={{ color: '#D96B1F' }}>{v.for}</div>
                    <div className="text-xs leading-relaxed" style={{ color: '#65785F' }}>{v.detail}</div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 px-4" style={{ background: '#F1F6EA' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-center mb-8" style={{ color: '#183024' }}>Common questions.</h2>
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
        <section className="py-24 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="gradient-frame rounded-3xl p-10 sm:p-14">
              <div className="text-4xl mb-5">🚗</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 leading-tight" style={{ color: '#183024' }}>
                Ready to move?
              </h2>
              <p className="text-base mb-10" style={{ color: '#65785F' }}>
                Pick your vertical. Book, enquire or enrol. Every trip tracked, every driver vetted.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/go/book"
                  className="inline-block px-8 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform"
                  style={{ background: '#D96B1F', color: 'white', boxShadow: '0 6px 24px rgba(217,107,31,0.35)' }}>
                  Book a Ride Now →
                </Link>
                <Link href="/corporate/enquire"
                  className="inline-block px-8 py-4 rounded-full font-semibold text-base border-2 hover:scale-105 transition-transform"
                  style={{ color: '#1F6B46', borderColor: '#1F6B46', background: 'rgba(255,255,255,0.8)' }}>
                  Corporate Enquiry →
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
