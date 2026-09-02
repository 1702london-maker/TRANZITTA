'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import WhatsAppButton from '@/components/WhatsAppButton'

const VEHICLE_TYPES = [
  { id: 'standard', label: 'Standard', desc: 'Corolla, Civic · 4 seats', price: '₦2,400–₦3,100', icon: '🚗' },
  { id: 'comfort', label: 'Comfort', desc: 'Camry, Accord · 4 seats', price: '₦3,200–₦4,100', icon: '🚙' },
  { id: 'suv', label: 'SUV', desc: 'Highlander, Pilot · 6 seats', price: '₦4,800–₦6,200', icon: '🚙' },
]

export default function GoBookPage() {
  const [step, setStep] = useState<'route' | 'vehicle' | 'confirm'>('route')
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [vehicle, setVehicle] = useState('standard')

  return (
    <>
      <StickyBar />
      <Navbar />
      <main className="min-h-screen flex flex-col items-center pt-20 pb-16 px-4" style={{ background: 'var(--warm-white)' }}>
        <div className="w-full max-w-md">
          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {['Route', 'Vehicle', 'Confirm'].map((s, i) => (
              <div key={i} className="flex-1 h-1.5 rounded-full" style={{
                background: i <= ['route', 'vehicle', 'confirm'].indexOf(step) ? 'var(--orange-deep)' : 'var(--sage-border)'
              }} />
            ))}
          </div>

          {step === 'route' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-2xl font-extrabold trz-ink mb-6">Where to?</h1>
              <div className="trz-card rounded-2xl p-5 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#1F6B46' }} />
                  <input className="flex-1 trz-input rounded-xl px-4 py-3 text-sm outline-none"
                    placeholder="Pickup location" value={pickup} onChange={e => setPickup(e.target.value)} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: 'var(--orange-deep)' }} />
                  <input className="flex-1 trz-input rounded-xl px-4 py-3 text-sm outline-none"
                    placeholder="Dropoff location" value={dropoff} onChange={e => setDropoff(e.target.value)} />
                </div>
              </div>
              <button onClick={() => setStep('vehicle')}
                className="w-full py-4 rounded-xl font-bold text-white text-sm hover:scale-105 transition-transform"
                style={{ background: 'var(--orange-deep)' }}>
                Find Drivers →
              </button>
            </motion.div>
          )}

          {step === 'vehicle' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-2xl font-extrabold trz-ink mb-6">Choose ride</h1>
              <div className="space-y-3 mb-5">
                {VEHICLE_TYPES.map(v => (
                  <button key={v.id} onClick={() => setVehicle(v.id)}
                    className="w-full text-left trz-card rounded-2xl p-4 flex items-center gap-4 transition-all border-2"
                    style={{ borderColor: vehicle === v.id ? 'var(--orange-deep)' : 'transparent' }}>
                    <span className="text-2xl">{v.icon}</span>
                    <div className="flex-1">
                      <div className="font-extrabold trz-ink">{v.label}</div>
                      <div className="text-xs trz-muted">{v.desc}</div>
                    </div>
                    <div className="font-bold trz-orange text-sm">{v.price}</div>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep('confirm')}
                className="w-full py-4 rounded-xl font-bold text-white text-sm"
                style={{ background: 'var(--orange-deep)' }}>
                Confirm Vehicle →
              </button>
            </motion.div>
          )}

          {step === 'confirm' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-2xl font-extrabold trz-ink mb-6">Confirm booking</h1>
              <div className="trz-card rounded-2xl p-6 mb-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="trz-muted">Pickup</span>
                  <span className="font-semibold trz-ink">{pickup || 'Lekki Phase 1'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="trz-muted">Dropoff</span>
                  <span className="font-semibold trz-ink">{dropoff || 'Victoria Island'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="trz-muted">Vehicle</span>
                  <span className="font-semibold trz-ink capitalize">{vehicle}</span>
                </div>
                <div className="border-t pt-3" style={{ borderColor: 'var(--sage-border)' }}>
                  <div className="flex justify-between">
                    <span className="font-semibold trz-ink">Estimated Fare</span>
                    <span className="font-extrabold trz-orange">₦2,750</span>
                  </div>
                </div>
              </div>
              <button className="w-full py-4 rounded-xl font-bold text-white text-sm hover:scale-105 transition-transform"
                style={{ background: 'var(--orange-deep)' }}>
                Book & Pay via Paystack →
              </button>
              <p className="text-xs trz-muted text-center mt-3">Panic button available throughout your trip</p>
            </motion.div>
          )}
        </div>
      </main>
      <WhatsAppButton />
    </>
  )
}
