'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const PILLARS = [
  {
    icon: '🪪',
    title: 'Identity — driver and rider',
    desc: 'Every driver is NIN-verified against government records, police-cleared, and home-address-confirmed before their first trip. Go and Executive riders complete BVN, NIN and a liveness check — once. Both sides of every ride are verified people, not anonymous accounts.',
  },
  {
    icon: '📹',
    title: 'In-car camera — mandatory',
    desc: 'Every Tranzitta vehicle has a camera installed and tested by ops before going live. Footage is retained for 30 days minimum. Ops can access a live feed during any active trip — across all verticals. No camera, no active status.',
  },
  {
    icon: '🔐',
    title: 'Verification at every pickup',
    desc: 'School uses a mandatory QR scan — no scan, no child boards, no exceptions. Go and Executive use mutual verification — you confirm the driver\'s name, photo and plate; the driver confirms yours. Both checks happen before the trip starts.',
  },
  {
    icon: '📍',
    title: 'GPS every 10 seconds',
    desc: 'Every active trip stores a GPS snapshot every 10 seconds. Share your live tracking link via WhatsApp or SMS. The full route history is stored for every completed trip. There is no gap in coverage.',
  },
  {
    icon: '🆘',
    title: 'Panic button — always visible',
    desc: 'The panic button appears on every screen in every vertical — Go, School, Airport, Corporate, Events. One tap triggers an immediate ops alert, SMS to your trusted contacts, and police escalation if required. Sub-60 second response protocol.',
  },
  {
    icon: '🔄',
    title: 'Liveness re-verification',
    desc: 'Drivers and Go riders repeat a face-match liveness check every 90 days. Ops can trigger an early re-check at any time — on any driver or rider. Any account that fails is suspended immediately pending review.',
  },
]

const DRIVER_CHECKS = [
  { icon: '📋', label: 'Police clearance', detail: 'Certificate verified by ops — not self-reported. Original document reviewed.' },
  { icon: '🪪', label: 'NIN verification', detail: 'National Identity Number matched against government records. Name, photo and date of birth confirmed.' },
  { icon: '🏠', label: 'Home address confirmed', detail: 'Physical address verified before activation. Drivers cannot operate without a confirmed address on file.' },
  { icon: '📸', label: 'Profile photo and liveness', detail: 'Face matched against NIN photo. Liveness check confirms it is a live person, not a still image.' },
  { icon: '🚐', label: 'Vehicle inspection', detail: 'Vehicle age, condition, AC, seatbelts, and camera installation all checked by ops. Corporate and School vans: maximum 5 years old.' },
  { icon: '📹', label: 'Camera installed and tested', detail: 'Camera fitted and confirmed working before first trip. Ops reviews footage quality. No camera = not activated.' },
]

const PER_VERTICAL = [
  {
    icon: '🚗',
    label: 'Go & Executive',
    checks: [
      'BVN + NIN + liveness for all riders — once at signup',
      'Mutual identity check at every pickup — driver and rider',
      'Card hold pre-authorisation — no cash on Executive',
      'Live GPS share link + panic button every screen',
      'Wall of Shame — 3 strikes policy for misconduct',
    ],
  },
  {
    icon: '🏫',
    label: 'School',
    checks: [
      'QR scan before any child boards — system-enforced, cannot be bypassed',
      'Maximum 3 children per vehicle — unbreakable rule',
      'Dedicated driver for the full term — no substitutions without parent notice',
      'Teacher confirms arrival at school gate — timestamped notification',
      'In-car camera active every school run',
    ],
  },
  {
    icon: '✈️',
    label: 'Airport',
    checks: [
      'Driver verified at pickup — name, photo, plate confirmed on your phone',
      'Flight tracked in real time — driver adjusts to actual arrival',
      'Rate locked at booking — no airport-side price negotiation',
      'In-car camera + panic button active throughout transfer',
      'Live GPS from airport to destination',
    ],
  },
  {
    icon: '🏢',
    label: 'Corporate',
    checks: [
      'RC number (CAC) verified for every company before onboarding',
      'Staff manifest per shift — driver confirms each person by name',
      'Admin dashboard shows every van live during shifts',
      'Panic button for driver and all staff on route at all times',
      'Monthly van re-inspection before each new contract period',
    ],
  },
  {
    icon: '🎉',
    label: 'Events',
    checks: [
      'Driver briefed with full guest manifest before event day',
      'Ops-supervised fleet — dedicated contact throughout the event',
      'Live tracking for event coordinator dashboard',
      'In-car camera active on all event vehicles',
      'Full post-event trip report delivered to organiser',
    ],
  },
]

const PANIC_STEPS = [
  { n: '1', icon: '🔴', label: 'You tap panic', sub: 'Any screen, any vertical' },
  { n: '2', icon: '📊', label: 'Ops alerted instantly', sub: 'Live ops dashboard alarm' },
  { n: '3', icon: '📱', label: 'Trusted contacts SMS', sub: 'Your emergency contacts notified' },
  { n: '4', icon: '📞', label: 'Ops calls within 60s', sub: 'Direct response call to you' },
  { n: '5', icon: '📹', label: 'Footage preserved', sub: 'Camera clip locked for review' },
  { n: '6', icon: '🚔', label: 'Police if escalated', sub: 'Ops escalates with location' },
]

const FAQS = [
  { q: 'What happens if my driver fails the liveness check?', a: 'Their account is suspended immediately. They cannot accept new trips until ops completes a manual review. If the failure is confirmed, the account is deactivated and any pending trips are reassigned.' },
  { q: 'Can a driver swap on a School or Corporate route without my knowledge?', a: 'No. On School, any driver change requires parent notification and a new profile sent before the change takes effect. On Corporate, admin is notified and must acknowledge the replacement driver before they operate on the route.' },
  { q: 'Who can see the in-car camera footage?', a: 'Only Tranzitta ops. Footage is never shared with third parties except law enforcement with a valid order. Riders and passengers cannot access footage directly — they must file a formal complaint through ops.' },
  { q: 'What is the Wall of Shame on Go?', a: 'Three verified misconduct reports against any rider result in a permanent ban. This covers no-shows, harassment, damage or policy violations. It exists to protect drivers as much as it protects riders.' },
  { q: 'How quickly does the panic button actually work?', a: 'Ops receives the alert in under 5 seconds. The 60-second target is for an ops agent to have called you back. Police escalation happens when ops cannot reach you or the situation requires it — this decision is made by the ops agent, not automated.' },
  { q: 'What if a driver has an accident during a trip?', a: 'The driver is expected to use the panic button immediately. Ops coordinates emergency response, contacts the rider\'s emergency contacts, and manages all follow-up. Footage is preserved automatically.' },
]

export default function SafetyPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [verticalOpen, setVerticalOpen] = useState<number | null>(0)

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
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-8"
              style={{ background: 'radial-gradient(circle, #D96B1F, transparent)' }} />
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6"
              style={{ background: 'rgba(31,107,70,0.08)', color: '#1F6B46', border: '1px solid rgba(31,107,70,0.18)' }}
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Safety — Tranzitta Standard
            </motion.div>
            <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6"
              style={{ color: '#183024' }}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              Not one anonymous<br />
              <span style={{ color: '#D96B1F' }}>driver on this platform.</span><br />
              <span style={{ color: '#1F6B46' }}>Not one untracked trip.</span>
            </motion.h1>
            <motion.p className="text-lg leading-relaxed max-w-2xl mx-auto mb-8"
              style={{ color: '#65785F' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
              Every driver police-cleared, NIN-verified, home address confirmed, face-matched and camera-equipped before their first trip.
              Every rider on Go and Executive identity-verified before they book. Every trip tracked second by second.
            </motion.p>

            {/* Stats strip */}
            <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              {[
                { stat: '6', label: 'Mandatory driver checks' },
                { stat: '10s', label: 'GPS update interval' },
                { stat: '30 days', label: 'Camera footage retention' },
                { stat: '<60s', label: 'Panic response target' },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl p-4 border text-center"
                  style={{ background: 'white', borderColor: '#DDE9D2' }}>
                  <div className="text-xl sm:text-2xl font-black" style={{ color: '#183024' }}>{s.stat}</div>
                  <div className="text-xs mt-1" style={{ color: '#65785F' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── PILLARS ── */}
        <section className="py-20 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#D96B1F' }}>Safety infrastructure</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: '#183024' }}>
                Six layers. Every trip. Every vertical.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PILLARS.map((p, i) => (
                <motion.div key={i} className="rounded-2xl p-6 border"
                  style={{ background: 'white', borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }} viewport={{ once: true }}>
                  <div className="text-3xl mb-4">{p.icon}</div>
                  <div className="font-extrabold mb-2 text-sm" style={{ color: '#183024' }}>{p.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: '#65785F' }}>{p.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PANIC FLOW ── */}
        <section className="py-20 px-4" style={{ background: '#F1F6EA' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#D96B1F' }}>Emergency response</div>
              <h2 className="text-3xl font-extrabold" style={{ color: '#183024' }}>
                What happens when you press panic.
              </h2>
              <p className="text-base mt-3 max-w-xl mx-auto" style={{ color: '#65785F' }}>
                The panic button is visible on every screen in every vertical. One tap. Immediate chain of response.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {PANIC_STEPS.map((s, i) => (
                <motion.div key={i}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                  <div className="relative mb-3">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: i === 0 ? '#FEE2E2' : 'white', border: `1px solid ${i === 0 ? '#FCA5A5' : '#DDE9D2'}` }}>
                      {s.icon}
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white"
                      style={{ background: i === 0 ? '#DC2626' : '#183024' }}>{s.n}</div>
                  </div>
                  <div className="text-xs font-extrabold mb-0.5" style={{ color: '#183024' }}>{s.label}</div>
                  <div className="text-[10px]" style={{ color: '#65785F' }}>{s.sub}</div>
                </motion.div>
              ))}
            </div>

            <div className="gradient-frame rounded-2xl p-6 text-center">
              <div className="text-sm font-bold mb-1" style={{ color: '#183024' }}>
                Camera footage is locked the moment panic is triggered.
              </div>
              <div className="text-xs" style={{ color: '#65785F' }}>
                The clip cannot be deleted by the driver, the rider, or any non-ops account. It is retained indefinitely for any panic-triggered trip.
              </div>
            </div>
          </div>
        </section>

        {/* ── DRIVER VETTING ── */}
        <section className="py-20 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1F6B46' }}>Driver vetting</div>
              <h2 className="text-3xl font-extrabold" style={{ color: '#183024' }}>
                Six checks before a single trip.
              </h2>
              <p className="text-base mt-3 max-w-xl mx-auto" style={{ color: '#65785F' }}>
                Every Tranzitta driver completes all six before ops approves them. There is no shortcut through the process.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DRIVER_CHECKS.map((c, i) => (
                <motion.div key={i} className="flex gap-4 p-5 rounded-2xl border items-start"
                  style={{ background: 'white', borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }} viewport={{ once: true }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: '#F1F6EA' }}>{c.icon}</div>
                  <div>
                    <div className="font-extrabold text-sm mb-1" style={{ color: '#183024' }}>{c.label}</div>
                    <div className="text-xs leading-relaxed" style={{ color: '#65785F' }}>{c.detail}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 p-5 rounded-2xl border text-sm" style={{ background: '#F1F6EA', borderColor: '#DDE9D2', color: '#65785F' }}>
              <span className="font-bold" style={{ color: '#183024' }}>Re-verification every 90 days.</span>{' '}
              Drivers repeat the liveness and NIN check every 90 days. Any driver below 4.2 average rating is suspended automatically.
              Ops can trigger a manual re-check on any driver at any time.
            </div>
          </div>
        </section>

        {/* ── PER VERTICAL ── */}
        <section className="py-20 px-4" style={{ background: '#F1F6EA' }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1F6B46' }}>By vertical</div>
              <h2 className="text-3xl font-extrabold" style={{ color: '#183024' }}>
                Safety by use case.
              </h2>
              <p className="text-base mt-3" style={{ color: '#65785F' }}>
                Each vertical carries additional checks on top of the shared standard.
              </p>
            </div>
            <div className="space-y-2">
              {PER_VERTICAL.map((v, i) => (
                <div key={i} className="rounded-2xl border overflow-hidden" style={{ background: 'white', borderColor: '#DDE9D2' }}>
                  <button onClick={() => setVerticalOpen(verticalOpen === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-[#F1F6EA]">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{v.icon}</span>
                      <span className="font-extrabold text-sm" style={{ color: '#183024' }}>{v.label}</span>
                    </div>
                    <span className="text-lg flex-shrink-0" style={{ color: '#1F6B46' }}>{verticalOpen === i ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {verticalOpen === i && (
                      <motion.div className="px-5 pb-5"
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
                        <div className="space-y-2">
                          {v.checks.map((c, j) => (
                            <div key={j} className="flex items-start gap-2.5">
                              <span className="flex-shrink-0 mt-0.5 font-bold text-sm" style={{ color: '#1F6B46' }}>✓</span>
                              <span className="text-sm" style={{ color: '#65785F' }}>{c}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── REPORTING ── */}
        <section className="py-20 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#D96B1F' }}>Reporting & accountability</div>
              <h2 className="text-3xl font-extrabold" style={{ color: '#183024' }}>
                Every issue has a channel.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: '🚨',
                  title: 'In-trip emergency',
                  desc: 'Use the panic button. Ops is alerted immediately. Do not wait until after the trip.',
                  action: 'In-app panic button',
                },
                {
                  icon: '📝',
                  title: 'Post-trip complaint',
                  desc: 'Contact ops within 48 hours with your trip ID. Billing disputes, driver conduct and vehicle issues all handled by the ops team.',
                  action: 'Contact ops',
                },
                {
                  icon: '🚩',
                  title: 'Driver flag (Corporate / School)',
                  desc: 'Admins and parents can flag a driver directly from the dashboard. Ops reviews within 2 hours and responds before the next scheduled shift.',
                  action: 'Dashboard flag',
                },
              ].map((r, i) => (
                <motion.div key={i} className="rounded-2xl p-6 border"
                  style={{ background: 'white', borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                  <div className="text-3xl mb-3">{r.icon}</div>
                  <div className="font-extrabold mb-1.5 text-sm" style={{ color: '#183024' }}>{r.title}</div>
                  <div className="text-xs leading-relaxed mb-4" style={{ color: '#65785F' }}>{r.desc}</div>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: '#F1F6EA', color: '#1F6B46' }}>{r.action}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 px-4" style={{ background: '#F1F6EA' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-center mb-8" style={{ color: '#183024' }}>Safety questions.</h2>
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
              <div className="text-4xl mb-5">🔐</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 leading-tight" style={{ color: '#183024' }}>
                Every trip backed<br />by the same standard.
              </h2>
              <p className="text-base mb-10" style={{ color: '#65785F' }}>
                Vetted driver. Live tracking. Panic response. Whether it is a school run or an airport transfer.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/go/book"
                  className="inline-block px-8 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform"
                  style={{ background: '#D96B1F', color: 'white', boxShadow: '0 6px 24px rgba(217,107,31,0.35)' }}>
                  Book a Ride →
                </Link>
                <Link href="/how-it-works"
                  className="inline-block px-8 py-4 rounded-full font-semibold text-base border-2 hover:scale-105 transition-transform"
                  style={{ color: '#1F6B46', borderColor: '#1F6B46', background: 'rgba(255,255,255,0.8)' }}>
                  How It Works →
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
