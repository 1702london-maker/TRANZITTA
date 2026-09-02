'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function GoTrackPage() {
  const [panicked, setPanicked] = useState(false)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--warm-white)' }}>
      {/* Map placeholder */}
      <div className="flex-1 trz-map-bg relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2 animate-bounce">🚗</div>
            <p className="text-sm font-semibold trz-ink">Live driver location</p>
            <p className="text-xs trz-muted mt-1">GPS snapshot every 10 seconds · GOOGLE_MAPS_API_KEY required</p>
          </div>
        </div>

        {/* Top bar */}
        <div className="absolute top-4 left-4 right-4 trz-card rounded-2xl p-4 flex items-center gap-4">
          <div className="flex-1">
            <div className="font-extrabold trz-ink">Chukwuma Eze · ⭐ 4.9</div>
            <div className="text-xs trz-muted mt-0.5">Toyota Camry · Lagos AW-341</div>
          </div>
          <a href="tel:+2348012345678" className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
            style={{ background: '#1F6B46' }}>
            📞
          </a>
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="p-5 border-t" style={{ background: 'var(--warm-white)', borderColor: 'var(--sage-border)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-extrabold trz-ink">ETA 8 minutes</div>
            <div className="text-sm trz-muted">Lekki Phase 1 → Victoria Island</div>
          </div>
          <div className="font-extrabold trz-orange text-xl">₦2,750</div>
        </div>

        {!panicked ? (
          <button onClick={() => setPanicked(true)}
            className="w-full py-4 rounded-xl font-extrabold text-white text-base hover:scale-105 transition-transform animate-pulse"
            style={{ background: '#DC2626' }}>
            🆘 PANIC BUTTON
          </button>
        ) : (
          <motion.div className="rounded-xl p-4 text-center" initial={{ scale: 0.9 }} animate={{ scale: 1 }}
            style={{ background: '#DC2626' }}>
            <div className="font-extrabold text-white text-lg mb-1">Alert Sent! 🚨</div>
            <p className="text-white/90 text-sm">Ops team notified · Police alerted · Camera recording</p>
          </motion.div>
        )}
      </div>
      <WhatsAppButton />
    </div>
  )
}
