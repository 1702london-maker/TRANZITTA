'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const VERTICALS = [
  {
    id: 'go',
    title: 'Tranzitta Go',
    sub: 'Everyday rides',
    desc: 'Request a ride in seconds. Voice search, fare estimate, live driver tracking, panic button. Police-vetted drivers. 15% commission.',
    icon: '🚗',
    href: '/go',
    color: '#D96B1F',
    bg: 'var(--orange-blush)',
    cta: 'Book a Ride',
    tags: ['Per trip', 'Surge pricing', 'Cash & card'],
  },
  {
    id: 'school',
    title: 'Tranzitta School',
    sub: 'School pickup & drop-off',
    desc: 'Dedicated term-time driver for your child. Live parent tracking, excess billing for late readiness, monthly invoicing.',
    icon: '🏫',
    href: '/school',
    color: '#1F6B46',
    bg: 'var(--sage-light)',
    cta: 'Enrol a Child',
    tags: ['Monthly fee', 'AM + PM trips', 'Excess billing'],
  },
  {
    id: 'corporate',
    title: 'Tranzitta Corporate',
    sub: 'Company shuttles',
    desc: 'AM and PM staff shuttles. Hourly billing, excess rate for overruns. Admin dashboard, live fleet tracking, monthly invoice.',
    icon: '🏢',
    href: '/corporate',
    color: '#183024',
    bg: '#EDF5E5',
    cta: 'Get a Quote',
    tags: ['Hourly billing', 'AM + PM shifts', 'Staff management'],
  },
  {
    id: 'events',
    title: 'Tranzitta Events',
    sub: 'Weddings, conferences & more',
    desc: 'Bespoke event transport. Sedans, SUVs, minibuses and buses. 30% deposit, balance post-event. Full fleet tracking.',
    icon: '🎉',
    href: '/events',
    color: '#8B5CF6',
    bg: '#F5F3FF',
    cta: 'Submit Enquiry',
    tags: ['Bespoke quote', 'Bus available', 'Deposit + balance'],
  },
  {
    id: 'airport',
    title: 'Tranzitta Airport',
    sub: 'Arrivals & departures',
    desc: 'Pre-booked airport transfers to and from Murtala Muhammed. Domestic + International terminals. Meet & greet available.',
    icon: '✈️',
    href: '/airport',
    color: '#0369A1',
    bg: '#F0F9FF',
    cta: 'Book Transfer',
    tags: ['Fixed fare', 'Meet & greet', 'Domestic + International'],
  },
]

export default function VerticalsGrid() {
  return (
    <section id="verticals" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 trz-blush-pill">Five Verticals. One Network.</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold trz-ink mb-4">Choose Your Journey</h2>
          <p className="text-base trz-muted max-w-xl mx-auto">
            Whether you&apos;re commuting, sending your child to school, running a corporate shuttle or flying out of Lagos — Tranzitta covers it all.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VERTICALS.map((v, i) => (
            <motion.div key={v.id}
              className="flip-card rounded-2xl cursor-pointer"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
              <div className="flip-card-inner rounded-2xl" style={{ minHeight: 280 }}>
                {/* Front */}
                <div className="flip-card-face trz-card rounded-2xl p-6 flex flex-col justify-between glow-card">
                  <div>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
                      style={{ background: v.bg }}>
                      {v.icon}
                    </div>
                    <h3 className="text-lg font-extrabold trz-ink mb-1">{v.title}</h3>
                    <p className="text-xs font-semibold mb-3" style={{ color: v.color }}>{v.sub}</p>
                    <p className="text-sm trz-muted leading-relaxed">{v.desc}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {v.tags.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full font-medium trz-sage-pill">{t}</span>
                    ))}
                  </div>
                </div>
                {/* Back */}
                <div className="flip-card-back rounded-2xl flex flex-col items-center justify-center p-6 text-center"
                  style={{ background: `linear-gradient(135deg, ${v.color}15, ${v.color}08)`, border: `2px solid ${v.color}20` }}>
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="text-xl font-extrabold mb-2" style={{ color: v.color }}>{v.title}</h3>
                  <p className="text-sm trz-muted mb-6">{v.sub}</p>
                  <Link href={v.href}
                    className="px-6 py-3 rounded-full font-bold text-white text-sm transition-transform hover:scale-105"
                    style={{ background: v.color }}>
                    {v.cta} →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Driver card */}
          <motion.div
            className="trz-card rounded-2xl p-6 flex flex-col justify-between glow-card sm:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }} viewport={{ once: true }}>
            <div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 trz-blush-card">🚦</div>
              <h3 className="text-lg font-extrabold trz-ink mb-1">Drive With Tranzitta</h3>
              <p className="text-xs font-semibold mb-3 trz-orange">Join the Driver Network</p>
              <p className="text-sm trz-muted leading-relaxed">
                Police-vetted, fully onboarded. Serve Go, School, Corporate, Events or Airport. Keep 85% of every fare.
              </p>
            </div>
            <div className="mt-5">
              <Link href="/driver"
                className="block text-center px-5 py-3 rounded-full font-bold text-sm transition-transform hover:scale-105"
                style={{ background: 'var(--sage-light)', color: 'var(--text-main)', border: '1px solid var(--sage-border)' }}>
                Apply to Drive →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
