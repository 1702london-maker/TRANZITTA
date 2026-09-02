'use client'
import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4" style={{ background: 'var(--warm-white)' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 trz-blush-pill">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold trz-ink mb-4">We&apos;re Here For You</h2>
          <p className="text-base trz-muted max-w-xl mx-auto">Corporate enquiries, event bookings, school onboarding or driver applications — reach us directly.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            { icon: '📧', label: 'Email', value: 'bookings@tranzitta.africa', href: 'mailto:bookings@tranzitta.africa' },
            { icon: '💬', label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/2341234567890' },
            { icon: '📞', label: 'Call Centre', value: '24/7 support line', href: 'tel:+2341234567890' },
          ].map((c, i) => (
            <motion.a key={i} href={c.href}
              className="trz-card rounded-2xl p-6 text-center glow-card hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <div className="text-3xl mb-3">{c.icon}</div>
              <div className="text-xs font-semibold trz-muted mb-1">{c.label}</div>
              <div className="text-sm font-bold trz-ink">{c.value}</div>
            </motion.a>
          ))}
        </div>

        <motion.div className="trz-card rounded-2xl p-8"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h3 className="font-extrabold trz-ink mb-5">Send an Enquiry</h3>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={e => e.preventDefault()}>
            <input className="trz-input rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-400 outline-none" placeholder="Full Name" />
            <input className="trz-input rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-400 outline-none" placeholder="Phone / Email" />
            <select className="trz-input rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-400 outline-none">
              <option value="">Select vertical</option>
              <option>Tranzitta Go</option>
              <option>Tranzitta School</option>
              <option>Tranzitta Corporate</option>
              <option>Tranzitta Events</option>
              <option>Tranzitta Airport</option>
              <option>Drive With Us</option>
            </select>
            <input className="trz-input rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-400 outline-none" placeholder="Company (optional)" />
            <textarea className="trz-input rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-400 outline-none sm:col-span-2" rows={4} placeholder="Tell us what you need..." />
            <div className="sm:col-span-2">
              <button type="submit"
                className="px-8 py-3.5 rounded-full font-bold text-white text-sm hover:scale-105 transition-transform"
                style={{ background: 'var(--orange-deep)' }}>
                Send Message →
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
