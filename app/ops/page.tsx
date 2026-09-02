'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function OpsLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, var(--text-main) 0%, var(--africa-green) 60%, var(--orange-deep) 100%)' }}>
      <Link href="/" className="mb-8">
        <Image src="/tranzitta-logo.png" alt="Tranzitta" width={140} height={40} className="h-10 w-auto object-contain brightness-0 invert" />
      </Link>
      <motion.div className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-2xl"
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🛡️</div>
          <h1 className="text-xl font-extrabold trz-ink">Tranzitta Ops</h1>
          <p className="text-sm trz-muted mt-1">Internal operations dashboard</p>
        </div>
        <label className="block text-xs font-semibold trz-muted mb-1.5">Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)}
          className="w-full trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300 mb-3"
          placeholder="ops@tranzitta.africa" type="email" />
        <label className="block text-xs font-semibold trz-muted mb-1.5">Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)}
          className="w-full trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300 mb-5"
          placeholder="••••••••" type="password" />
        <Link href="/ops/dashboard"
          className="block w-full py-3.5 rounded-xl font-bold text-white text-sm text-center hover:scale-105 transition-transform"
          style={{ background: 'var(--orange-deep)' }}>
          Enter Dashboard →
        </Link>
        <p className="text-xs trz-muted text-center mt-4">Ops access only. Unauthorised use is prohibited.</p>
      </motion.div>
    </div>
  )
}
