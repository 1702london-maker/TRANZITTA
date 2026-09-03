'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

// Animated phone screen component
function PhoneScreen({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ width: 220, height: 440 }}>
      <div className="absolute inset-0 rounded-[36px] border-[6px] shadow-2xl" style={{ borderColor: '#183024', background: '#183024' }} />
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full" style={{ background: '#0F1F17', zIndex: 10 }} />
      <div className="absolute inset-[6px] rounded-[30px] overflow-hidden" style={{ background: '#FAFDF7' }}>
        <div className="flex items-center justify-between px-4 pt-5 pb-1">
          <span className="text-[8px] font-bold" style={{ color: '#183024' }}>9:41</span>
          <span className="text-[8px]" style={{ color: '#183024' }}>●●●</span>
        </div>
        <div className="overflow-hidden" style={{ height: 374 }}>{children}</div>
      </div>
    </div>
  )
}

// Live notification bubble
function NotifBubble({ icon, text, sub, delay = 0 }: { icon: string; text: string; sub: string; delay?: number }) {
  return (
    <motion.div
      className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl shadow-lg"
      style={{ background: 'white', border: '1px solid #E5F0E8', maxWidth: 200 }}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 300 }}>
      <span className="text-xl flex-shrink-0">{icon}</span>
      <div>
        <div className="text-xs font-extrabold leading-tight" style={{ color: '#183024' }}>{text}</div>
        <div className="text-[10px] mt-0.5" style={{ color: '#65785F' }}>{sub}</div>
      </div>
    </motion.div>
  )
}

// Animated flow step phone
function FlowStep({ step, active }: { step: number; active: boolean }) {
  const screens = [
    // Step 0: Driver on the way
    <div key={0} className="h-full flex flex-col" style={{ background: '#F4F9F5' }}>
      <div className="px-3 pt-8 pb-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] font-bold" style={{ color: '#1F6B46' }}>Tranzitta School</span>
      </div>
      {/* Map area */}
      <div className="flex-1 mx-3 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #D4EBDC 0%, #C5E3CF 100%)' }}>
        {/* Road */}
        <div className="absolute w-1 h-full" style={{ background: 'rgba(255,255,255,0.4)', left: '50%' }} />
        {/* Animated car */}
        <motion.div className="text-3xl"
          animate={{ y: active ? [-60, -20] : -60 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}>
          🚗
        </motion.div>
        {/* School marker */}
        <div className="absolute bottom-6 text-xl">🏫</div>
        {/* ETA pill */}
        <motion.div className="absolute top-3 left-3 right-3 flex justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0 }} transition={{ delay: 0.5 }}>
          <div className="px-3 py-1.5 rounded-full text-white text-[10px] font-extrabold"
            style={{ background: '#1F6B46' }}>
            Driver arriving in 8 min
          </div>
        </motion.div>
      </div>
      {/* Bottom */}
      <div className="px-3 py-3">
        <div className="text-[10px] font-extrabold mb-1" style={{ color: '#183024' }}>Chukwuma Eze</div>
        <div className="text-[9px]" style={{ color: '#65785F' }}>Toyota Camry · LGS-234-AA · ⭐ 4.9</div>
        <motion.div className="mt-2 w-full py-1.5 rounded-xl text-[10px] font-bold text-center text-white"
          style={{ background: '#1F6B46' }}
          animate={{ scale: active ? [1, 1.04, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 2 }}>
          Live Track →
        </motion.div>
      </div>
    </div>,

    // Step 1: QR scan
    <div key={1} className="h-full flex flex-col items-center justify-center px-4" style={{ background: '#F4F9F5' }}>
      <motion.div className="text-4xl mb-3"
        animate={{ scale: active ? [1, 1.1, 1] : 1 }}
        transition={{ repeat: Infinity, duration: 1.5 }}>
        📱
      </motion.div>
      <div className="text-xs font-extrabold text-center mb-4" style={{ color: '#183024' }}>Scan Driver&apos;s QR Code</div>
      {/* QR placeholder */}
      <div className="w-28 h-28 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden border-2" style={{ background: 'white', borderColor: '#DDE9D2' }}>
        <div className="text-4xl opacity-20" style={{ color: '#183024' }}>▩</div>
        {/* Scan line */}
        <motion.div className="absolute left-0 right-0 h-0.5"
          style={{ background: 'rgba(31,107,70,0.5)' }}
          animate={{ top: active ? ['10%', '90%', '10%'] : '10%' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
      </div>
      <motion.div
        className="px-4 py-2 rounded-xl text-[10px] font-extrabold text-white"
        style={{ background: '#1F6B46' }}
        initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0 }}
        transition={{ delay: 1 }}>
        ✓ Driver Verified — Correct
      </motion.div>
      <p className="text-[9px] text-center mt-3" style={{ color: '#65785F' }}>
        Amara cannot enter unless you scan first
      </p>
    </div>,

    // Step 2: Confirmed — boarding
    <div key={2} className="h-full flex flex-col" style={{ background: '#F4F9F5' }}>
      <div className="px-3 pt-8 pb-3">
        <div className="text-[10px] font-bold" style={{ color: '#65785F' }}>Today · AM Pickup</div>
        <div className="text-sm font-extrabold mt-1" style={{ color: '#183024' }}>Amara Okonkwo</div>
      </div>
      <div className="flex-1 px-3 space-y-2 overflow-hidden">
        {[
          { icon: '✅', label: 'Driver arrived', time: '7:10am', done: true },
          { icon: '🔐', label: 'QR scanned — verified', time: '7:11am', done: true },
          { icon: '🎒', label: 'Amara boarded', time: '7:12am', done: true, active: true },
          { icon: '🏫', label: 'Arrived at school', time: 'pending', done: false },
        ].map((t, i) => (
          <motion.div key={i} className="flex items-center gap-2.5"
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: active ? 1 : 0, x: active ? 0 : -10 }}
            transition={{ delay: i * 0.2 }}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${t.done ? 'bg-green-500 text-white' : 'border-2'}`}
              style={t.done ? {} : { borderColor: '#DDE9D2' }}>
              {t.done ? '✓' : ''}
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-bold" style={{ color: t.active ? '#1F6B46' : t.done ? '#183024' : '#A8C09A' }}>{t.label}</div>
            </div>
            <div className="text-[9px]" style={{ color: '#A8C09A' }}>{t.time}</div>
          </motion.div>
        ))}
      </div>
      <motion.div className="mx-3 mb-4 p-3 rounded-2xl text-center"
        style={{ background: '#1F6B46' }}
        initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0 }}
        transition={{ delay: 1 }}>
        <div className="text-white text-[10px] font-extrabold">🎒 Amara has boarded safely</div>
        <div className="text-[9px] mt-0.5" style={{ color: '#A8D9BC' }}>Tap to follow live</div>
      </motion.div>
    </div>,

    // Step 3: At school — teacher confirmed
    <div key={3} className="h-full flex flex-col items-center justify-center px-4 text-center" style={{ background: '#F4F9F5' }}>
      <motion.div className="text-5xl mb-4"
        initial={{ scale: 0 }} animate={{ scale: active ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 300, delay: 0.3 }}>
        🏫
      </motion.div>
      <motion.div className="text-sm font-extrabold mb-2" style={{ color: '#183024' }}
        initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0 }} transition={{ delay: 0.5 }}>
        Amara arrived at school
      </motion.div>
      <motion.div className="text-[10px] mb-4" style={{ color: '#65785F' }}
        initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0 }} transition={{ delay: 0.7 }}>
        8:04am · Teacher confirmed receipt
      </motion.div>
      <motion.div className="w-full py-2 rounded-2xl text-center"
        style={{ background: '#F1F6EA', border: '1px solid #DDE9D2' }}
        initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0 }} transition={{ delay: 0.9 }}>
        <div className="text-[10px] font-extrabold" style={{ color: '#1F6B46' }}>✓ School Confirmed</div>
        <div className="text-[9px] mt-0.5" style={{ color: '#65785F' }}>Mrs Adeyemi · Gate teacher</div>
      </motion.div>
      <motion.div className="mt-3 text-[9px]" style={{ color: '#65785F' }}
        initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0 }} transition={{ delay: 1.1 }}>
        Daily summary will be sent at 3:30pm
      </motion.div>
    </div>,
  ]

  return (
    <PhoneScreen>
      <AnimatePresence mode="wait">
        <motion.div key={step} className="h-full"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}>
          {screens[step]}
        </motion.div>
      </AnimatePresence>
    </PhoneScreen>
  )
}

const FLOW_STEPS = [
  { label: '📱 Driver on the way', desc: 'You get a notification the moment the driver leaves. See their car moving live on the map — not just a text saying "on the way."' },
  { label: '🔐 Scan to confirm pickup', desc: 'Driver shows your child\'s QR code. You scan it. System confirms: correct driver, correct child, correct vehicle. No scan = no child enters.' },
  { label: '🎒 Boarding confirmed', desc: 'The second Amara sits in the car, you get a push notification. Exact time. Continue your morning.' },
  { label: '🏫 School arrival confirmed', desc: 'Teacher scans at the gate. You\'re notified the moment your child walks into school. No more calling the school to check.' },
]

const PAINS = [
  { pain: '2–3 hours on a school bus every morning', fix: 'Max 3 children, direct route, no long detours' },
  { pain: 'Not knowing if the bus arrived safely', fix: 'GPS every 10 seconds. Teacher confirmation on arrival.' },
  { pain: 'Child getting in the wrong vehicle', fix: 'QR verification before any door opens. System-enforced.' },
  { pain: '"Driver didn\'t show up" with no warning', fix: 'Backup driver deployed automatically. You\'re notified first.' },
  { pain: 'Your child one of 40 on a school bus', fix: 'Maximum 3 children. Your child has a name, not a seat number.' },
]

export default function SchoolPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const flowRef = useRef(null)
  const flowInView = useInView(flowRef, { once: false, margin: '-20%' })

  // Auto-cycle flow steps
  useEffect(() => {
    if (!flowInView) return
    const t = setInterval(() => setActiveStep(s => (s + 1) % 4), 3500)
    return () => clearInterval(t)
  }, [flowInView])

  const faqs = [
    { q: 'How much does it cost?', a: 'Pricing is bespoke per route — communicated privately after our ops team assesses your journey. We never publish pricing publicly. Enquire below to get your private quote within 24 hours.' },
    { q: 'How many children share the car?', a: 'Maximum three. Never exceeded. We pair children by school and zone with your full consent.' },
    { q: 'What if the driver doesn\'t show?', a: 'A pre-vetted backup driver is deployed and their details sent to you immediately. This has never meant your child missed school.' },
    { q: 'Can my nanny or mother track too?', a: 'Yes. Add trusted contacts who receive live tracking and safety alerts — without seeing any payment information.' },
    { q: 'What if we\'re not ready when driver arrives?', a: '5 minutes grace at no charge. After that, a per-minute excess charge applies and you\'re notified the moment the clock starts.' },
    { q: 'What is the commitment?', a: 'One full school term, paid upfront before service begins. Securing your child\'s place and the driver\'s route.' },
  ]

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 54 }}>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden px-4 py-24 sm:py-32"
          style={{ background: 'linear-gradient(160deg, #FFF0E4 0%, var(--warm-white) 55%, #EDF6F1 100%)' }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #1F6B46, transparent)' }} />
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6"
                style={{ background: 'rgba(31,107,70,0.08)', color: '#1F6B46', border: '1px solid rgba(31,107,70,0.18)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Tranzitta School · Lagos & Abuja
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6"
                style={{ color: '#183024' }}>
                No more school bus.<br />
                <span style={{ color: '#1F6B46' }}>Your child has<br />their own driver.</span>
              </h1>
              <p className="text-lg leading-relaxed mb-4" style={{ color: '#65785F' }}>
                Police-vetted driver. Maximum 3 children per car. QR verification before every pickup.
                Live tracking from your phone. Teacher confirmation when they arrive.
              </p>
              <p className="text-base font-semibold mb-8" style={{ color: '#1F6B46' }}>
                You see every moment. No more guessing. No more waiting for calls.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/school/enrol"
                  className="px-8 py-4 rounded-full font-bold text-white text-base hover:scale-105 transition-transform text-center"
                  style={{ background: '#1F6B46', boxShadow: '0 6px 28px rgba(31,107,70,0.32)' }}>
                  Enrol Your Child →
                </Link>
                <Link href="/school/login"
                  className="px-8 py-4 rounded-full font-semibold text-base border-2 hover:scale-105 transition-transform text-center"
                  style={{ color: '#1F6B46', borderColor: '#1F6B46', background: 'rgba(255,255,255,0.8)' }}>
                  Parent Login
                </Link>
              </div>
            </motion.div>

            {/* Hero phone with live notifications */}
            <motion.div className="flex justify-center relative"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <PhoneScreen>
                <div className="h-full" style={{ background: '#F4F9F5' }}>
                  <div className="px-3 pt-8 pb-2 border-b" style={{ borderColor: '#DDE9D2' }}>
                    <div className="text-[10px] font-bold mb-1" style={{ color: '#65785F' }}>Good morning · Wednesday</div>
                    <div className="text-xs font-extrabold" style={{ color: '#183024' }}>Amara · 🟠 In Transit</div>
                  </div>
                  {/* Mini map */}
                  <div className="mx-3 mt-3 h-28 rounded-2xl flex items-center justify-center relative overflow-hidden"
                    style={{ background: 'linear-gradient(180deg, #D4EBDC, #C5E3CF)' }}>
                    <motion.div className="text-2xl"
                      animate={{ y: [-20, 0, -20] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                      🚗
                    </motion.div>
                    <div className="absolute bottom-2 text-base">🏫</div>
                    <div className="absolute top-2 left-2 right-2 flex justify-center">
                      <div className="px-2 py-1 rounded-full text-white text-[9px] font-bold"
                        style={{ background: '#1F6B46' }}>ETA · 8 min</div>
                    </div>
                  </div>
                  {/* Notification stack */}
                  <div className="px-3 mt-3 space-y-2">
                    <motion.div className="flex items-center gap-2 p-2.5 rounded-xl"
                      style={{ background: 'white', border: '1px solid #DDE9D2' }}
                      animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
                      <span className="text-base">🔐</span>
                      <div>
                        <div className="text-[9px] font-extrabold" style={{ color: '#183024' }}>QR Verified — Chukwuma</div>
                        <div className="text-[8px]" style={{ color: '#65785F' }}>Correct driver · 7:11am</div>
                      </div>
                    </motion.div>
                    <motion.div className="flex items-center gap-2 p-2.5 rounded-xl"
                      style={{ background: '#1F6B46' }}
                      animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}>
                      <span className="text-base">🎒</span>
                      <div>
                        <div className="text-[9px] font-extrabold text-white">Amara has boarded</div>
                        <div className="text-[8px]" style={{ color: '#A8D9BC' }}>7:12am · Tap to track live</div>
                      </div>
                    </motion.div>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl"
                      style={{ background: '#F1F6EA', border: '1px solid #DDE9D2' }}>
                      <span className="text-base">🏫</span>
                      <div>
                        <div className="text-[9px] font-bold" style={{ color: '#A8C09A' }}>School arrival · pending</div>
                        <div className="text-[8px]" style={{ color: '#A8C09A' }}>Will notify on arrival</div>
                      </div>
                    </div>
                  </div>
                </div>
              </PhoneScreen>

              {/* Floating notif */}
              <motion.div className="absolute -top-4 -left-8 hidden lg:block"
                animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <NotifBubble icon="📍" text="Driver on the way" sub="Tap to track live" />
              </motion.div>
              <motion.div className="absolute -bottom-4 -right-6 hidden lg:block"
                animate={{ y: [0, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }}>
                <NotifBubble icon="✅" text="Amara arrived safely" sub="Teacher confirmed · 8:04am" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── PAIN POINTS ── */}
        <section className="py-20 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#D96B1F' }}>The problem with school buses</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: '#183024' }}>
                Lagos parents deserve better.
              </h2>
            </div>
            <div className="space-y-3">
              {PAINS.map((p, i) => (
                <motion.div key={i}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 items-center p-4 rounded-2xl border"
                  style={{ background: 'white', borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 flex-shrink-0 mt-0.5 font-bold">✗</span>
                    <span className="text-sm" style={{ color: '#65785F' }}>{p.pain}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 font-bold" style={{ color: '#1F6B46' }}>✓</span>
                    <span className="text-sm font-semibold" style={{ color: '#183024' }}>{p.fix}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ANIMATED FLOW ── */}
        <section className="py-24 px-4 overflow-hidden" style={{ background: 'var(--warm-white)' }} ref={flowRef}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1F6B46' }}>How it works</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: '#183024' }}>
                Every morning, in your pocket.
              </h2>
              <p className="text-base mt-3 max-w-xl mx-auto" style={{ color: '#65785F' }}>
                This is exactly what you see on your phone from the moment the driver leaves to the moment your child sits down in class.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Phone demo */}
              <div className="flex justify-center order-2 lg:order-1">
                <FlowStep step={activeStep} active={flowInView} />
              </div>

              {/* Steps */}
              <div className="space-y-4 order-1 lg:order-2">
                {FLOW_STEPS.map((step, i) => (
                  <motion.button key={i}
                    onClick={() => setActiveStep(i)}
                    className="w-full text-left p-5 rounded-2xl border-2 transition-all"
                    style={{
                      borderColor: activeStep === i ? '#1F6B46' : '#DDE9D2',
                      background: activeStep === i ? '#F1F6EA' : 'white',
                    }}
                    whileHover={{ scale: 1.01 }}>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-white"
                        style={{ background: activeStep === i ? '#1F6B46' : '#A8C09A' }}>
                        {i + 1}
                      </div>
                      <div>
                        <div className="font-extrabold mb-1 text-sm" style={{ color: '#183024' }}>{step.label}</div>
                        <div className="text-xs leading-relaxed" style={{ color: '#65785F' }}>{step.desc}</div>
                      </div>
                    </div>
                    {activeStep === i && (
                      <motion.div className="mt-3 h-1 rounded-full" style={{ background: '#DDE9D2' }}
                        initial={{ width: '0%' }}>
                        <motion.div className="h-full rounded-full" style={{ background: '#1F6B46' }}
                          initial={{ width: '0%' }} animate={{ width: '100%' }}
                          transition={{ duration: 3.5, ease: 'linear' }} />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SAFETY ── */}
        <section className="py-20 px-4" style={{ background: '#F1F6EA' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1F6B46' }}>Safety systems</div>
              <h2 className="text-3xl font-extrabold" style={{ color: '#183024' }}>Built for parents who worry. Which is all of us.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '🔐', title: 'QR at every pickup', desc: 'No scan = no child boards. Physical confirmation, system-enforced. Impossible to bypass.' },
                { icon: '📍', title: 'GPS every 10 seconds', desc: 'Not a ping. Not a last-known location. Real-time, continuous, visible on your phone.' },
                { icon: '🏫', title: 'Teacher confirms arrival', desc: 'School staff checks the child in at the gate. You get a timestamp notification immediately.' },
                { icon: '📹', title: 'In-car camera', desc: '30-day footage retained. Ops can view live feed during any active trip.' },
                { icon: '🆘', title: 'One-tap panic', desc: 'Alerts ops, police and all parents in the car. Sub-60 second response protocol.' },
                { icon: '👥', title: 'Max 3 children', desc: 'Unbreakable. Your child is not cargo. Three is the maximum, always.' },
              ].map((s, i) => (
                <motion.div key={i} className="bg-white rounded-2xl p-5 border" style={{ borderColor: '#DDE9D2' }}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }} viewport={{ once: true }}>
                  <div className="text-2xl mb-3">{s.icon}</div>
                  <div className="font-extrabold mb-1.5 text-sm" style={{ color: '#183024' }}>{s.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: '#65785F' }}>{s.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW YOU ONBOARD ── */}
        <section className="py-20 px-4" style={{ background: 'var(--warm-white)' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#1F6B46' }}>Getting started</div>
              <h2 className="text-3xl font-extrabold" style={{ color: '#183024' }}>Four steps. No surprises.</h2>
              <p className="text-sm mt-3" style={{ color: '#65785F' }}>No pricing shown online. We quote you privately based on your route.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { n: '01', icon: '📝', title: 'Enrol online', desc: 'Tell us about your child, their school, pickup address and morning schedule.' },
                { n: '02', icon: '📞', title: 'Private quote', desc: 'Our ops team calls you within 24 hours with a bespoke term fee. Your rate is never shared with anyone.' },
                { n: '03', icon: '💳', title: 'Pay term upfront', desc: 'Full term payment secures your child\'s seat. Paystack or Flutterwave. Instant receipt.' },
                { n: '04', icon: '🚗', title: 'Meet your driver', desc: 'See name, photo, vehicle, plate and police clearance before Day 1. Term begins.' },
              ].map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                  <div className="text-3xl font-extrabold mb-3 leading-none" style={{ color: 'rgba(31,107,70,0.1)' }}>{s.n}</div>
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="font-extrabold mb-1.5 text-sm" style={{ color: '#183024' }}>{s.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: '#65785F' }}>{s.desc}</div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/school/enrol"
                className="inline-block px-10 py-4 rounded-full font-bold text-white text-base hover:scale-105 transition-transform"
                style={{ background: '#1F6B46', boxShadow: '0 6px 24px rgba(31,107,70,0.28)' }}>
                Begin Enquiry — No Pricing Shown →
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 px-4" style={{ background: '#F1F6EA' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-center mb-8" style={{ color: '#183024' }}>Questions parents ask.</h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#DDE9D2' }}>
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm hover:bg-green-50 transition-colors"
                    style={{ color: '#183024' }}>
                    <span>{faq.q}</span>
                    <span className="flex-shrink-0 ml-4 text-lg" style={{ color: '#1F6B46' }}>{faqOpen === i ? '−' : '+'}</span>
                  </button>
                  {faqOpen === i && (
                    <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: '#65785F' }}>{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 px-4" style={{ background: '#F1F6EA' }}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="gradient-frame rounded-3xl p-10 sm:p-14">
              <div className="text-4xl mb-5">🚗</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 leading-tight" style={{ color: '#183024' }}>
                Your child deserves a driver<br />who knows their name.
              </h2>
              <p className="text-base mb-2" style={{ color: '#65785F' }}>
                Not a seat on a bus. Not hours of traffic with 40 other children.
              </p>
              <p className="text-base mb-10 font-semibold" style={{ color: '#1F6B46' }}>
                A dedicated, vetted driver. Three children maximum. Every school day.
              </p>
              <Link href="/school/enrol"
                className="inline-block px-10 py-4 rounded-full font-bold text-base hover:scale-105 transition-transform"
                style={{ background: '#D96B1F', color: 'white', boxShadow: '0 6px 24px rgba(217,107,31,0.35)' }}>
                Enrol Your Child →
              </Link>
              <p className="text-xs mt-4" style={{ color: '#65785F' }}>No pricing shown. Private quote within 24 hours.</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
