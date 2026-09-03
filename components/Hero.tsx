'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const PHRASES = [
  { text: 'Ride Safe.', color: '#183024' },
  { text: 'Arrive.', color: '#183024' },
  { text: 'Every Time.', color: '#D96B1F' },
]

const PARTICLES = [
  { left: '8%', top: '22%', size: 4, dur: '5s', del: '0s' },
  { left: '15%', top: '65%', size: 3, dur: '7s', del: '1.2s' },
  { left: '25%', top: '38%', size: 5, dur: '6s', del: '0.5s' },
  { left: '40%', top: '78%', size: 3, dur: '8s', del: '2s' },
  { left: '55%', top: '28%', size: 4, dur: '5.5s', del: '0.8s' },
  { left: '70%', top: '55%', size: 3, dur: '7.5s', del: '1.8s' },
  { left: '82%', top: '32%', size: 5, dur: '6.5s', del: '0.3s' },
  { left: '90%', top: '70%', size: 3, dur: '9s', del: '1.5s' },
]

const TRUST = ['Police-Vetted Drivers', 'Panic Button', 'Live GPS', '15% Commission Only', '5 Verticals']

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `
          linear-gradient(120deg, rgba(255,240,228,0.96) 0%, rgba(255,249,242,0.92) 42%, rgba(241,246,234,0.94) 100%),
          radial-gradient(circle at 18% 22%, rgba(248,200,78,0.24) 0 10%, transparent 28%),
          radial-gradient(circle at 84% 18%, rgba(31,107,70,0.14) 0 12%, transparent 30%),
          repeating-linear-gradient(135deg, rgba(31,107,70,0.045) 0 1px, transparent 1px 22px)
        `,
        paddingTop: 120, paddingBottom: 80,
      }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.34) 0 1px, transparent 1px 120px), linear-gradient(0deg, rgba(255,255,255,0.28) 0 1px, transparent 1px 120px)',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 76%)',
        }} />
        <div style={{
          position: 'absolute', top: 110, right: '6%', width: 220, height: 220,
          border: '1px solid rgba(31,107,70,0.12)', transform: 'rotate(16deg)',
          background: 'rgba(255,255,255,0.16)',
        }} />
        <div style={{
          position: 'absolute', left: '-6%', bottom: 82, width: 360, height: 120,
          background: 'rgba(248,200,78,0.16)', transform: 'rotate(-8deg)',
        }} />
      </div>

      {/* Particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {PARTICLES.map((p, i) => (
            <div key={i} className="absolute rounded-full dot-particle" style={{
              left: p.left, top: p.top, width: p.size, height: p.size,
              background: i % 3 === 0 ? '#F28A3D' : i % 3 === 1 ? '#F8C84E' : '#1F6B46',
              ['--duration' as string]: p.dur, ['--delay' as string]: p.del,
            }} />
          ))}
        </div>
      )}

      {/* Nigerian cityscape */}
      <div className="absolute -bottom-4 sm:bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', display: 'block' }}>
          <rect x="0" y="182" width="1440" height="18" fill="#E5EEDB" />
          <line x1="0" y1="190" x2="1440" y2="190" stroke="#C9DDBE" strokeWidth="1" strokeDasharray="20 10" />
          {/* Lagos */}
          <rect x="18" y="115" width="48" height="85" fill="#E5EEDB" rx="2" /><rect x="28" y="92" width="30" height="108" fill="#EDF5E5" rx="1" /><rect x="68" y="108" width="25" height="92" fill="#DDE9D2" rx="2" /><rect x="95" y="82" width="40" height="118" fill="#E5EEDB" rx="2" /><rect x="102" y="64" width="26" height="136" fill="#EDF5E5" rx="1" />
          <text x="68" y="112" textAnchor="middle" fill="#6F875B" fontSize="7" fontWeight="900" letterSpacing="2" fontFamily="'Plus Jakarta Sans',sans-serif">LAGOS</text>
          {/* Ibadan */}
          <rect x="175" y="108" width="36" height="92" fill="#DDE9D2" rx="2" /><rect x="215" y="88" width="44" height="112" fill="#E5EEDB" rx="2" /><rect x="222" y="70" width="30" height="130" fill="#EDF5E5" rx="1" /><rect x="262" y="102" width="32" height="98" fill="#DDE9D2" rx="2" />
          <text x="220" y="106" textAnchor="middle" fill="#6F875B" fontSize="7" fontWeight="900" letterSpacing="2" fontFamily="'Plus Jakarta Sans',sans-serif">IBADAN</text>
          {/* Abuja */}
          <rect x="335" y="76" width="50" height="124" fill="#EDF5E5" rx="2" /><rect x="345" y="55" width="30" height="145" fill="#E5EEDB" rx="1" /><rect x="390" y="90" width="40" height="110" fill="#DDE9D2" rx="2" /><rect x="434" y="78" width="36" height="122" fill="#E5EEDB" rx="2" />
          <text x="388" y="73" textAnchor="middle" fill="#6F875B" fontSize="7" fontWeight="900" letterSpacing="2" fontFamily="'Plus Jakarta Sans',sans-serif">ABUJA</text>
          {/* Kano */}
          <rect x="515" y="100" width="38" height="100" fill="#E5EEDB" rx="2" /><rect x="558" y="84" width="34" height="116" fill="#EDF5E5" rx="2" /><rect x="565" y="66" width="20" height="134" fill="#DDE9D2" rx="1" />
          <text x="555" y="82" textAnchor="middle" fill="#6F875B" fontSize="7" fontWeight="900" letterSpacing="2" fontFamily="'Plus Jakarta Sans',sans-serif">KANO</text>
          {/* Port Harcourt */}
          <rect x="660" y="88" width="46" height="112" fill="#EDF5E5" rx="2" /><rect x="670" y="66" width="26" height="134" fill="#E5EEDB" rx="1" /><rect x="712" y="76" width="44" height="124" fill="#DDE9D2" rx="2" /><rect x="720" y="52" width="28" height="148" fill="#E5EEDB" rx="1" />
          <text x="710" y="64" textAnchor="middle" fill="#6F875B" fontSize="7" fontWeight="900" letterSpacing="1.5" fontFamily="'Plus Jakarta Sans',sans-serif">PORT HARCOURT</text>
          {/* Enugu */}
          <rect x="840" y="106" width="34" height="94" fill="#E5EEDB" rx="2" /><rect x="878" y="88" width="40" height="112" fill="#EDF5E5" rx="2" /><rect x="885" y="70" width="26" height="130" fill="#DDE9D2" rx="1" />
          <text x="882" y="86" textAnchor="middle" fill="#6F875B" fontSize="7" fontWeight="900" letterSpacing="2" fontFamily="'Plus Jakarta Sans',sans-serif">ENUGU</text>
          {/* Benin */}
          <rect x="998" y="94" width="38" height="106" fill="#DDE9D2" rx="2" /><rect x="1040" y="80" width="36" height="120" fill="#E5EEDB" rx="2" /><rect x="1047" y="62" width="22" height="138" fill="#EDF5E5" rx="1" />
          <text x="1040" y="78" textAnchor="middle" fill="#6F875B" fontSize="7" fontWeight="900" letterSpacing="2" fontFamily="'Plus Jakarta Sans',sans-serif">BENIN</text>
          {/* Kaduna */}
          <rect x="1142" y="104" width="36" height="96" fill="#E5EEDB" rx="2" /><rect x="1182" y="86" width="42" height="114" fill="#EDF5E5" rx="2" /><rect x="1189" y="66" width="28" height="134" fill="#DDE9D2" rx="1" />
          <text x="1185" y="83" textAnchor="middle" fill="#6F875B" fontSize="7" fontWeight="900" letterSpacing="2" fontFamily="'Plus Jakarta Sans',sans-serif">KADUNA</text>
          {/* Jos */}
          <rect x="1295" y="110" width="34" height="90" fill="#EDF5E5" rx="2" /><rect x="1334" y="96" width="40" height="104" fill="#E5EEDB" rx="2" /><rect x="1378" y="106" width="52" height="94" fill="#E5EEDB" rx="2" />
          <text x="1340" y="94" textAnchor="middle" fill="#6F875B" fontSize="7" fontWeight="900" letterSpacing="2" fontFamily="'Plus Jakarta Sans',sans-serif">JOS</text>
        </svg>

        {/* Animated Tranzitta fleet */}
        <div className="absolute fleet-drive fleet-logo-car" style={{ bottom: 15, left: 0 }}>
          <div className="relative h-12 w-12 rounded-[14px] shadow-lg">
            <Image src="/tranzitta-logo.png" alt="" fill sizes="48px" className="object-contain" />
          </div>
        </div>

        <div className="absolute fleet-drive fleet-bus" style={{ bottom: 16, left: 0 }}>
          <svg width="118" height="40" viewBox="0 0 118 40">
            <rect x="3" y="3" width="97" height="26" fill="#F28A3D" rx="6" />
            <rect x="3" y="3" width="97" height="9" fill="#D96B1F" rx="6" />
            <rect x="8" y="7" width="18" height="12" fill="rgba(255,255,255,0.35)" rx="2" />
            <rect x="30" y="7" width="14" height="12" fill="rgba(255,255,255,0.25)" rx="2" />
            <rect x="48" y="7" width="14" height="12" fill="rgba(255,255,255,0.25)" rx="2" />
            <rect x="66" y="7" width="14" height="12" fill="rgba(255,255,255,0.25)" rx="2" />
            <rect x="1" y="23" width="105" height="4" fill="#C45C1B" rx="2" />
            <circle cx="20" cy="31" r="5" fill="#183024" />
            <circle cx="20" cy="31" r="2" fill="#7EA06D" />
            <circle cx="82" cy="31" r="5" fill="#183024" />
            <circle cx="82" cy="31" r="2" fill="#7EA06D" />
            <text x="5" y="21" fill="white" fontSize="5" fontWeight="800">TRANZITTA BUS</text>
          </svg>
        </div>

        <div className="absolute fleet-drive fleet-jeep" style={{ bottom: 17, left: 0 }}>
          <svg width="82" height="34" viewBox="0 0 82 34">
            <rect x="8" y="11" width="64" height="16" fill="#17271E" rx="5" />
            <path d="M20 11h35l9 8H12l8-8Z" fill="#213A2B" />
            <rect x="23" y="13" width="14" height="8" fill="rgba(255,255,255,0.34)" rx="2" />
            <rect x="41" y="13" width="13" height="8" fill="rgba(255,255,255,0.23)" rx="2" />
            <rect x="4" y="18" width="8" height="4" fill="#F5D840" rx="1" />
            <rect x="69" y="18" width="8" height="4" fill="#D96B1F" rx="1" />
            <circle cx="22" cy="28" r="5" fill="#101714" />
            <circle cx="22" cy="28" r="2" fill="#F8C84E" />
            <circle cx="60" cy="28" r="5" fill="#101714" />
            <circle cx="60" cy="28" r="2" fill="#F8C84E" />
            <text x="26" y="26" fill="#FFE2B8" fontSize="5" fontWeight="900">VIP</text>
          </svg>
        </div>

        {/* Animated airplane */}
        <div className="absolute plane-fly" style={{ top: 30, left: 0 }}>
          <svg width="50" height="24" viewBox="0 0 50 24">
            <path d="M45 12 L10 4 L8 8 L20 12 L8 16 L10 20 L45 12Z" fill="#D96B1F" opacity="0.7" />
            <rect x="16" y="10" width="16" height="4" fill="#F28A3D" rx="1" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pb-28 sm:pb-24">
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
          style={{ background: 'rgba(242,138,61,0.13)', color: '#B95418', border: '1px solid rgba(217,107,31,0.16)' }}
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Launching Lagos — Where Uber Left, We Arrived
        </motion.div>

        <h1 className="font-extrabold leading-tight mb-5 flex flex-wrap justify-center gap-x-4 gap-y-1 headline-balance"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)' }}>
          {PHRASES.map((phrase, i) => (
            <motion.span key={i} className="phrase-nowrap" style={{ color: phrase.color }}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
              {phrase.text}
            </motion.span>
          ))}
        </h1>

        <motion.p className="text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed" style={{ color: '#65785F' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5 }}>
          Nigeria&apos;s safety-first ride platform. Police-vetted drivers, in-car cameras, panic button, live GPS. Go, School, Corporate, Events &amp; Airport — one network, five verticals.
        </motion.p>

        <motion.div className="flex flex-wrap gap-3 justify-center mb-10"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.45 }}>
          <motion.a href="/go"
            className="px-7 py-3.5 rounded-full font-bold text-white text-sm"
            style={{ background: '#D96B1F', boxShadow: '0 4px 18px rgba(217,107,31,0.3)' }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(217,107,31,0.4)' }} whileTap={{ scale: 0.97 }}>
            Book a Ride →
          </motion.a>
          <motion.a href="#verticals"
            className="px-7 py-3.5 rounded-full font-semibold text-sm border"
            style={{ color: '#183024', borderColor: '#C9DDBE', background: 'rgba(255,249,242,0.82)' }}
            whileHover={{ scale: 1.02, borderColor: '#D96B1F', color: '#D96B1F' }} whileTap={{ scale: 0.97 }}>
            Explore Verticals
          </motion.a>
          <motion.a href="/driver"
            className="px-7 py-3.5 rounded-full font-semibold text-sm border"
            style={{ color: '#1F6B46', borderColor: '#7EA06D', background: 'rgba(241,246,234,0.82)' }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            Drive With Us
          </motion.a>
        </motion.div>

        <motion.div className="flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          {TRUST.map((t, i) => (
            <span key={i} className="px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: 'rgba(255,255,255,0.58)', color: '#213A2B', border: '1px solid rgba(126,160,109,0.28)' }}>
              ✓ {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
