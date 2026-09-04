'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function DriverCTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="gradient-frame rounded-3xl p-10 sm:p-14 text-center"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl trz-blush-card">🚦</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold trz-ink mb-4">Drive With Tranzitta. Keep the Fare.</h2>
          <p className="text-base trz-muted mb-8 max-w-xl mx-auto">
            Pay monthly for marketplace access, accept Tranzitta-controlled fares, and keep what the rider pays while the app protects every trip.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/driver"
              className="px-8 py-3.5 rounded-full font-bold text-white text-sm hover:scale-105 transition-transform"
              style={{ background: 'var(--orange-deep)', boxShadow: '0 4px 18px rgba(217,107,31,0.3)' }}>
              Apply to Drive →
            </Link>
            <Link href="#how-it-works"
              className="px-8 py-3.5 rounded-full font-semibold text-sm border hover:scale-105 transition-transform"
              style={{ color: 'var(--text-main)', borderColor: 'var(--sage-border)' }}>
              See the Process
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm mx-auto">
            {[['₦30k+', 'Monthly access'], ['100%', 'Fare kept'], ['5', 'Verticals to serve']].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="text-xl font-extrabold trz-orange">{v}</div>
                <div className="text-xs trz-muted mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
