'use client'
import { motion } from 'framer-motion'

const STATS = [
  { value: '15%', label: 'Commission Only', sub: 'vs 25–30% elsewhere' },
  { value: '100%', label: 'Vetted Drivers', sub: 'Police-cleared + NIN verified' },
  { value: '5', label: 'Verticals', sub: 'Go · School · Corporate · Events · Airport' },
  { value: '24/7', label: 'Ops Support', sub: 'Human team, always on' },
  { value: '10s', label: 'GPS Snapshots', sub: 'Live location every 10 seconds' },
]

export default function StatsStrip() {
  return (
    <section className="relative overflow-hidden py-10"
      style={{ background: 'linear-gradient(90deg, var(--text-main) 0%, var(--africa-green) 42%, var(--orange-deep) 100%)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-0 lg:divide-x"
          style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
          {STATS.map((s, i) => (
            <motion.div key={i}
              className="text-center px-4 py-2"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
              <div className="text-3xl font-extrabold text-white">{s.value}</div>
              <div className="text-sm font-bold mt-1" style={{ color: '#FFE2B8' }}>{s.label}</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.58)' }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
