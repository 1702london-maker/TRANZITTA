'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function SchoolPage() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main style={{ paddingTop: 54 }}>
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 text-center"
          style={{ background: 'linear-gradient(135deg, var(--sage-light) 0%, var(--warm-white) 60%, var(--orange-blush) 100%)' }}>
          <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: 'rgba(31,107,70,0.1)', color: '#1F6B46', border: '1px solid rgba(31,107,70,0.16)' }}
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            School Transport
          </motion.div>
          <motion.h1 className="text-4xl sm:text-5xl font-extrabold trz-ink mb-5 leading-tight max-w-2xl"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            Your Child. Their Dedicated Driver. Every School Day.
          </motion.h1>
          <motion.p className="text-base trz-muted mb-8 max-w-xl leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Police-vetted dedicated driver per child. Live tracking for parents. AM pickup and PM drop-off. Monthly billing with excess charges for late readiness. Term contracts only.
          </motion.p>
          <motion.div className="flex flex-wrap gap-3 justify-center mb-16"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
            <Link href="/school/login"
              className="px-7 py-3.5 rounded-full font-bold text-white text-sm hover:scale-105 transition-transform"
              style={{ background: '#1F6B46', boxShadow: '0 4px 18px rgba(31,107,70,0.25)' }}>
              Parent Login →
            </Link>
            <Link href="#how-school-works"
              className="px-7 py-3.5 rounded-full font-semibold text-sm border hover:scale-105 transition-transform"
              style={{ color: 'var(--text-main)', borderColor: 'var(--sage-border)', background: 'rgba(255,249,242,0.82)' }}>
              How It Works
            </Link>
          </motion.div>

          {/* How it works */}
          <div id="how-school-works" className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
            {[
              { n: '1', icon: '📝', title: 'Enrol Your Child', desc: 'Add child details: school, pickup address, ready times.' },
              { n: '2', icon: '📋', title: 'Ops Reviews', desc: 'We calculate route, assign a driver and quote a monthly fee.' },
              { n: '3', icon: '💳', title: 'Pay & Start', desc: 'Pay first month in advance. Service begins your agreed date.' },
              { n: '4', icon: '📍', title: 'Track Live', desc: 'See your child on the map for every trip, AM and PM.' },
            ].map((s, i) => (
              <motion.div key={i} className="trz-card rounded-2xl p-5 text-left"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <div className="text-xl mb-3">{s.icon}</div>
                <div className="text-xs font-extrabold mb-1" style={{ color: '#1F6B46' }}>Step {s.n}</div>
                <h3 className="font-extrabold trz-ink text-sm mb-1">{s.title}</h3>
                <p className="text-xs trz-muted">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-extrabold trz-ink mb-6 text-center">Transparent Billing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { label: 'Monthly Fee', desc: 'Set by ops based on distance and route complexity. First month paid in advance.', icon: '📅' },
                { label: 'Excess Charges', desc: 'Driver waits up to 5 minutes free. Each minute beyond is billed at a per-minute rate.', icon: '⏱️' },
                { label: 'Auto-Invoice', desc: 'Monthly invoice generated on the 1st. Auto-charge on your saved payment method.', icon: '🧾' },
              ].map((b, i) => (
                <div key={i} className="trz-card rounded-2xl p-5">
                  <div className="text-2xl mb-3">{b.icon}</div>
                  <h3 className="font-extrabold trz-ink text-sm mb-2">{b.label}</h3>
                  <p className="text-xs trz-muted">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
