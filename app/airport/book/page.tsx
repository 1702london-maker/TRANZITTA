'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function AirportBookPage() {
  const [direction, setDirection] = useState<'arrivals' | 'departures'>('arrivals')
  const [terminal, setTerminal] = useState<'domestic' | 'international'>('international')
  const [meetGreet, setMeetGreet] = useState(false)
  const [step, setStep] = useState<'details' | 'confirm'>('details')

  return (
    <>
      <StickyBar />
      <Navbar />
      <main className="min-h-screen pt-20 pb-16 px-4 flex flex-col items-center" style={{ background: 'var(--warm-white)' }}>
        <div className="w-full max-w-md">
          <div className="flex gap-2 mb-6">
            {['Details', 'Confirm'].map((s, i) => (
              <div key={i} className="flex-1 h-1.5 rounded-full"
                style={{ background: i <= ['details', 'confirm'].indexOf(step) ? '#0369A1' : 'var(--sage-border)' }} />
            ))}
          </div>

          {step === 'details' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-2xl font-extrabold trz-ink mb-6">Book Airport Transfer</h1>

              <div className="flex rounded-xl overflow-hidden border mb-4" style={{ borderColor: 'var(--sage-border)' }}>
                {(['arrivals', 'departures'] as const).map(d => (
                  <button key={d} onClick={() => setDirection(d)}
                    className="flex-1 py-3 text-sm font-bold capitalize transition-all"
                    style={{ background: direction === d ? '#0369A1' : 'transparent', color: direction === d ? 'white' : 'var(--text-muted)' }}>
                    {d === 'arrivals' ? '🛬 Arrivals' : '🛫 Departures'}
                  </button>
                ))}
              </div>

              <div className="flex rounded-xl overflow-hidden border mb-4" style={{ borderColor: 'var(--sage-border)' }}>
                {(['domestic', 'international'] as const).map(t => (
                  <button key={t} onClick={() => setTerminal(t)}
                    className="flex-1 py-2.5 text-xs font-bold capitalize transition-all"
                    style={{ background: terminal === t ? '#EFF6FF' : 'transparent', color: terminal === t ? '#0369A1' : 'var(--text-muted)' }}>
                    {t === 'domestic' ? '🏠 Domestic' : '🌍 International'}
                  </button>
                ))}
              </div>

              <div className="space-y-3 mb-4">
                <input className="w-full trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder={direction === 'arrivals' ? 'Your home/hotel address' : 'Pickup address'} />
                <input className="w-full trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Flight number (e.g. LH 568)" />
                <input type="datetime-local" className="w-full trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-300" />
              </div>

              <label className="flex items-center gap-3 trz-card rounded-xl p-4 mb-5 cursor-pointer">
                <input type="checkbox" checked={meetGreet} onChange={e => setMeetGreet(e.target.checked)} className="w-4 h-4 accent-blue-600" />
                <div>
                  <div className="font-bold trz-ink text-sm">Meet & Greet (+₦3,000)</div>
                  <div className="text-xs trz-muted">Driver waits in arrivals hall with your name on a board</div>
                </div>
              </label>

              <button onClick={() => setStep('confirm')}
                className="w-full py-4 rounded-xl font-bold text-white text-sm"
                style={{ background: '#0369A1' }}>
                See Price & Confirm →
              </button>
            </motion.div>
          )}

          {step === 'confirm' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-2xl font-extrabold trz-ink mb-6">Confirm Transfer</h1>
              <div className="trz-card rounded-2xl p-6 mb-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="trz-muted">Direction</span>
                  <span className="font-semibold trz-ink capitalize">{direction}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="trz-muted">Terminal</span>
                  <span className="font-semibold trz-ink capitalize">{terminal}</span>
                </div>
                {meetGreet && (
                  <div className="flex justify-between text-sm">
                    <span className="trz-muted">Meet & Greet</span>
                    <span className="font-semibold" style={{ color: '#0369A1' }}>Yes (+₦3,000)</span>
                  </div>
                )}
                <div className="border-t pt-3" style={{ borderColor: 'var(--sage-border)' }}>
                  <div className="flex justify-between">
                    <span className="font-semibold trz-ink">Fixed Fare</span>
                    <span className="font-extrabold text-lg" style={{ color: '#0369A1' }}>₦{meetGreet ? '21,500' : '18,500'}</span>
                  </div>
                  <div className="text-xs trz-muted mt-1">No surge · Flight delay grace included</div>
                </div>
              </div>
              <button className="w-full py-4 rounded-xl font-bold text-white text-sm hover:scale-105 transition-transform"
                style={{ background: '#0369A1' }}>
                Pay via Paystack →
              </button>
              <button onClick={() => setStep('details')} className="w-full mt-3 text-xs trz-muted text-center">← Edit Details</button>
            </motion.div>
          )}
        </div>
      </main>
      <WhatsAppButton />
    </>
  )
}
