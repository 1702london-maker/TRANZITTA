'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function CorporateLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #EDF5E5 0%, var(--warm-white) 60%)' }}>
      <Link href="/corporate" className="mb-8">
        <Image src="/tranzitta-logo.png" alt="Tranzitta" width={130} height={38} className="h-9 w-auto object-contain" />
      </Link>
      <motion.div className="w-full max-w-sm gradient-frame rounded-2xl p-8"
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🏢</div>
          <h1 className="text-xl font-extrabold trz-ink">Tranzitta Corporate</h1>
          <p className="text-sm trz-muted mt-1">Company admin login</p>
        </div>
        <label className="block text-xs font-semibold trz-muted mb-1.5">Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)}
          className="w-full trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-400 mb-3"
          placeholder="admin@company.com" type="email" />
        <label className="block text-xs font-semibold trz-muted mb-1.5">Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)}
          className="w-full trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-400 mb-5"
          placeholder="••••••••" type="password" />
        <button className="w-full py-3.5 rounded-xl font-bold text-white text-sm hover:scale-105 transition-transform"
          style={{ background: 'var(--text-main)' }}>
          Sign In to Dashboard →
        </button>
        <p className="text-xs trz-muted text-center mt-4">
          Not set up yet? <a href="mailto:bookings@tranzitta.africa" className="font-semibold trz-orange">Contact us</a>
        </p>
      </motion.div>
    </div>
  )
}
