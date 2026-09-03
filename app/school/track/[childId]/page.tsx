'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const MOCK_CHILD = { name: 'Amara Okonkwo', school: 'Greenfield Int\'l School', eta: '8 min', driver: 'Chukwuma Eze', plate: 'LGS-234-AA' }

const TIMELINE = [
  { time: '7:00am', event: 'Driver departed for pickups', done: true },
  { time: '7:10am', event: 'Arrived at pickup · QR scanned ✓', done: true },
  { time: '7:12am', event: 'Amara boarded', done: true },
  { time: '7:45am', event: 'Arrived at school · Teacher confirming', done: false, active: true },
  { time: '~8:00am', event: 'Teacher confirmation', done: false },
]

export default function TrackPage({ params }: { params: { childId: string } }) {
  const [panicked, setPanicked] = useState(false)
  const [tick, setTick] = useState(0)

  // Simulate live GPS updates every 10s
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 10000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F4F9F5' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 h-14 border-b"
        style={{ background: 'rgba(255,255,255,0.96)', borderColor: '#DDE9D2' }}>
        <Link href="/school/dashboard" className="text-sm font-bold flex items-center gap-1" style={{ color: '#1F6B46' }}>
          ← Back
        </Link>
        <div className="font-extrabold text-sm" style={{ color: '#183024' }}>Live Tracking · {MOCK_CHILD.name}</div>
        <div className="flex items-center gap-1 text-xs font-bold" style={{ color: '#1F6B46' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Live
        </div>
      </header>

      {/* Map area */}
      <div className="flex-1 relative min-h-64"
        style={{ background: 'linear-gradient(180deg, #E8F5EE 0%, #D4EBDC 100%)' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-3 animate-bounce">🚗</div>
            <p className="text-sm font-bold" style={{ color: '#183024' }}>Live driver location</p>
            <p className="text-xs mt-1" style={{ color: '#65785F' }}>GPS snapshot every 10 seconds</p>
            <p className="text-xs mt-0.5" style={{ color: '#A8C09A' }}>Last update: {tick > 0 ? `${tick * 10}s ago` : 'Just now'}</p>
          </div>
        </div>

        {/* ETA pill */}
        <div className="absolute top-4 left-4 right-4 flex justify-center">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl shadow-lg"
            style={{ background: 'white', border: '1px solid #DDE9D2' }}>
            <div>
              <div className="text-xs" style={{ color: '#65785F' }}>ETA to school</div>
              <div className="text-xl font-extrabold" style={{ color: '#183024' }}>{MOCK_CHILD.eta}</div>
            </div>
            <div className="w-px h-8" style={{ background: '#DDE9D2' }} />
            <div>
              <div className="text-xs" style={{ color: '#65785F' }}>Driver</div>
              <div className="text-sm font-bold" style={{ color: '#183024' }}>{MOCK_CHILD.driver}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="bg-white border-t p-4" style={{ borderColor: '#DDE9D2' }}>
        {/* Timeline */}
        <h3 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#65785F' }}>Trip Timeline</h3>
        <div className="space-y-3 mb-5">
          {TIMELINE.map((t, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${t.active ? 'animate-pulse' : ''}`}
                style={{ background: t.done ? '#1F6B46' : t.active ? '#D96B1F' : '#DDE9D2' }} />
              <div>
                <span className="text-xs font-bold mr-2" style={{ color: '#65785F' }}>{t.time}</span>
                <span className="text-xs" style={{ color: t.active ? '#D96B1F' : t.done ? '#183024' : '#A8C09A' }}>{t.event}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Panic button */}
        {!panicked ? (
          <button onClick={() => setPanicked(true)}
            className="w-full py-4 rounded-2xl font-extrabold text-white text-base"
            style={{ background: '#DC2626', boxShadow: '0 4px 18px rgba(220,38,38,0.3)' }}>
            🆘 PANIC BUTTON
          </button>
        ) : (
          <motion.div className="rounded-2xl p-4 text-center" initial={{ scale: 0.9 }} animate={{ scale: 1 }}
            style={{ background: '#DC2626' }}>
            <div className="font-extrabold text-white text-lg mb-1">Alert Sent 🚨</div>
            <p className="text-white/90 text-sm">Ops alerted · Police notified · Camera feed live · All parents notified</p>
          </motion.div>
        )}

        {/* Share tracking */}
        <p className="text-center text-xs mt-3" style={{ color: '#A8C09A' }}>
          Share live tracking with a trusted contact? <button className="font-bold" style={{ color: '#1F6B46' }}>Generate Link</button>
        </p>
      </div>
    </div>
  )
}
