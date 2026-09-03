'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const SAFETY = [
  { icon: '🔐', title: 'QR Verification at Pickup', desc: 'Driver shows child\'s unique QR code. Parent scans to confirm correct driver, correct child, correct vehicle — before any door opens.' },
  { icon: '🏫', title: 'Teacher Confirmation at School', desc: 'School staff ticks receipt of each child on arrival. Parent is notified the second their child walks through the gate.' },
  { icon: '📍', title: 'Live Tracking, Always', desc: 'See your child\'s car on the map in real time from the moment the driver leaves for pickup. ETA to school, ETA home.' },
  { icon: '📹', title: 'In-Car Camera', desc: 'Insurance-grade camera in every vehicle. Footage retained 30 days. Live feed accessible to ops during every active trip.' },
  { icon: '🆘', title: 'Panic Button', desc: 'One tap alerts ops, police and all parents in the vehicle. Response in under 60 seconds. Always on.' },
  { icon: '👥', title: 'Max 3 Children Per Car', desc: 'Never overcrowded. Each child has space, attention and accountability. Your child is not one of fifteen.' },
]

const STEPS = [
  { n: '01', title: 'Enrol Online', desc: 'Add your child\'s details, school and home address. No pricing shown — our ops team reviews each route individually.' },
  { n: '02', title: 'Private Quote', desc: 'We call or message you privately with a bespoke term fee based on your route. Your fare is never shared with other parents.' },
  { n: '03', title: 'Pay Term Fee Upfront', desc: 'Full term payment secures your child\'s place. Paystack or Flutterwave. Receipt issued instantly.' },
  { n: '04', title: 'Meet Your Driver', desc: 'See your assigned driver\'s profile: name, photo, vehicle, plate, police clearance status, rating. Term begins.' },
]

export default function SchoolPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null)

  const faqs = [
    { q: 'How much does Tranzitta School cost?', a: 'Pricing is bespoke per route and is communicated privately to each parent after a route assessment. No pricing is ever published publicly. Contact us to begin your enquiry.' },
    { q: 'How many children share the vehicle?', a: 'Maximum three children per vehicle — never exceeded. Children are paired by school and pickup proximity with your consent.' },
    { q: 'What if my child\'s driver is sick?', a: 'Tranzitta provides a pre-vetted backup driver with the same vehicle standards. You are notified immediately and the replacement driver\'s details are shared before pickup.' },
    { q: 'What happens if we are not ready when the driver arrives?', a: 'The driver waits 5 minutes at no charge. After 5 minutes, an excess charge per minute applies and you receive a push notification. This protects the driver\'s time and the other children\'s schedules.' },
    { q: 'Can a grandparent or nanny track the trip?', a: 'Yes. You can add trusted contacts who receive live tracking access and all safety notifications — without seeing any payment information.' },
    { q: 'What is the minimum commitment?', a: 'One full school term. Payment is made upfront before service begins.' },
  ]

  return (
    <>
      <StickyBar />
      <Navbar />
      <main style={{ paddingTop: 54 }}>

        {/* HERO */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-28 overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #EDF6F1 0%, var(--warm-white) 50%, #F0F9F4 100%)' }}>
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #1F6B46, transparent)', transform: 'translate(30%, -30%)' }} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8"
              style={{ background: 'radial-gradient(circle, var(--orange), transparent)', transform: 'translate(-30%, 30%)' }} />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold mb-8"
              style={{ background: 'rgba(31,107,70,0.08)', color: '#1F6B46', border: '1px solid rgba(31,107,70,0.18)' }}
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Tranzitta School — Bespoke Child Transport · Lagos
            </motion.div>

            <motion.h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.05] tracking-tight"
              style={{ color: '#183024' }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              Your Child Deserves<br />
              <span style={{ color: '#1F6B46' }}>Their Own Driver.</span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: '#65785F' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
              Chauffeur-grade school transport. Police-vetted, dedicated driver. Maximum three children per vehicle.
              QR verification at every pickup. Live tracking for parents. Every school day, every term.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Link href="/school/enrol"
                className="px-9 py-4 rounded-full font-bold text-white text-base hover:scale-105 transition-transform"
                style={{ background: '#1F6B46', boxShadow: '0 6px 28px rgba(31,107,70,0.32)' }}>
                Enrol Your Child →
              </Link>
              <Link href="/school/login"
                className="px-9 py-4 rounded-full font-semibold text-base border-2 hover:scale-105 transition-transform"
                style={{ color: '#1F6B46', borderColor: '#1F6B46', background: 'rgba(255,255,255,0.8)' }}>
                Parent Login
              </Link>
            </motion.div>

            {/* Trust stats */}
            <motion.div className="flex flex-wrap justify-center gap-10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              {[['3', 'Max children per vehicle'], ['100%', 'Police-vetted drivers'], ['QR', 'Verified every pickup'], ['30 days', 'Camera footage retained']].map(([v, l]) => (
                <div key={l} className="text-center">
                  <div className="text-2xl font-extrabold" style={{ color: '#1F6B46' }}>{v}</div>
                  <div className="text-xs mt-1" style={{ color: '#65785F' }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SAFETY SECTION */}
        <section className="py-24 px-4" style={{ background: '#183024' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#7EA06D' }}>Safety First</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Every safeguard, in every trip.
              </h2>
              <p className="text-base mt-4 max-w-xl mx-auto" style={{ color: '#A8C09A' }}>
                We didn't design around convenience. We designed around your child's safety.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SAFETY.map((s, i) => (
                <motion.div key={i}
                  className="rounded-2xl p-6 border"
                  style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }} viewport={{ once: true }}>
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <h3 className="font-extrabold text-white mb-2">{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#A8C09A' }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#1F6B46' }}>Onboarding</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: '#183024' }}>From enquiry to first pickup.</h2>
              <p className="text-base mt-4 max-w-lg mx-auto" style={{ color: '#65785F' }}>
                No online pricing. No booking form that takes your card before we've spoken.
                We assess your route privately, quote you privately, and only then begin.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((s, i) => (
                <motion.div key={i}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                  <div className="text-4xl font-extrabold mb-4 leading-none" style={{ color: 'rgba(31,107,70,0.12)' }}>{s.n}</div>
                  <h3 className="font-extrabold mb-2" style={{ color: '#183024' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#65785F' }}>{s.desc}</p>
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 text-gray-200 text-2xl">→</div>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/school/enrol"
                className="inline-block px-10 py-4 rounded-full font-bold text-white text-base hover:scale-105 transition-transform"
                style={{ background: '#1F6B46', boxShadow: '0 6px 24px rgba(31,107,70,0.28)' }}>
                Begin Enquiry — No Pricing Shown →
              </Link>
            </div>
          </div>
        </section>

        {/* DAILY FLOW */}
        <section className="py-24 px-4" style={{ background: '#F1F6EA' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#1F6B46' }}>A School Day</div>
              <h2 className="text-3xl font-extrabold" style={{ color: '#183024' }}>What your morning looks like.</h2>
            </div>
            <div className="space-y-0">
              {[
                { time: '6:45am', event: 'Notification: "Driver is on the way"', icon: '🚗', sub: 'You see the car leave in real time on the map' },
                { time: '7:10am', event: 'Driver arrives at your gate', icon: '📍', sub: 'Notification sent. Driver displays Amara\'s QR code' },
                { time: '7:11am', event: 'You scan the QR — system confirms', icon: '✅', sub: 'Correct driver · correct child · correct vehicle' },
                { time: '7:12am', event: '"Amara has boarded — 7:12am"', icon: '🎒', sub: 'Push + SMS. Trip visible live on your app' },
                { time: '8:04am', event: '"Amara has arrived at school safely"', icon: '🏫', sub: 'Teacher confirmed receipt. Timestamp recorded' },
                { time: '2:48pm', event: '"Amara has been collected from school"', icon: '🔔', sub: 'Teacher verified driver QR at gate before release' },
                { time: '3:30pm', event: '"Amara is home"', icon: '🏠', sub: 'Daily summary sent. Trip closed.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start pb-8 relative">
                  <div className="flex flex-col items-center flex-shrink-0 w-16">
                    <div className="text-xl">{item.icon}</div>
                    {i < 6 && <div className="w-0.5 flex-1 mt-2" style={{ background: '#DDE9D2', minHeight: 32 }} />}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <div className="text-xs font-bold mb-1" style={{ color: '#1F6B46' }}>{item.time}</div>
                    <div className="font-extrabold" style={{ color: '#183024' }}>{item.event}</div>
                    <div className="text-sm mt-1" style={{ color: '#65785F' }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold" style={{ color: '#183024' }}>Questions parents ask.</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-2xl border overflow-hidden" style={{ borderColor: '#DDE9D2' }}>
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold hover:bg-green-50 transition-colors"
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

        {/* CTA */}
        <section className="py-24 px-4 text-center" style={{ background: '#1F6B46' }}>
          <div className="max-w-2xl mx-auto">
            <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#A8D9BC' }}>Ready to begin?</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
              Premium transport for your child.<br />Begin your private enquiry.
            </h2>
            <p className="text-base mb-10" style={{ color: '#A8D9BC' }}>
              No pricing shown. No pressure. We assess your route, contact you privately, and only proceed when you are satisfied.
            </p>
            <Link href="/school/enrol"
              className="inline-block px-10 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform"
              style={{ background: 'var(--orange-deep)', color: 'white', boxShadow: '0 6px 24px rgba(217,107,31,0.35)' }}>
              Enrol Your Child →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
