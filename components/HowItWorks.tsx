'use client'
import { motion } from 'framer-motion'

const STEPS = [
  { n: '01', title: 'Choose Your Vertical', desc: 'Go for a quick ride, School for your child, Corporate for your company, Events for your big day, or Airport for your flight.' },
  { n: '02', title: 'Book or Enquire', desc: 'Book instantly via voice search or text. School, Corporate and Events go through a quick ops review before activation.' },
  { n: '03', title: 'Your Vetted Driver Arrives', desc: 'All drivers are police-cleared, NIN-verified, with in-car cameras installed. You see their name, photo, plate and live ETA.' },
  { n: '04', title: 'Track Live', desc: 'GPS updates every 10 seconds. Share your live link with family. Panic button available on every screen, every vertical.' },
  { n: '05', title: 'Pay Securely', desc: 'Paystack or Flutterwave. Cash available on Go. School and Corporate auto-invoice monthly. Events use deposit + balance.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 trz-blush-pill">Simple Process</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold trz-ink mb-4">How Tranzitta Works</h2>
        </motion.div>

        <div className="space-y-4">
          {STEPS.map((s, i) => (
            <motion.div key={i}
              className="flex gap-5 trz-card rounded-2xl p-6 glow-card items-start"
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-sm text-white"
                style={{ background: 'linear-gradient(135deg, var(--africa-green), var(--orange-deep))' }}>
                {s.n}
              </div>
              <div>
                <h3 className="font-extrabold trz-ink mb-1">{s.title}</h3>
                <p className="text-sm trz-muted leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
