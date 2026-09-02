'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function GoLoginPage() {
  const [phone, setPhone] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [otp, setOtp] = useState('')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, var(--orange-blush) 0%, var(--warm-white) 60%, var(--sage-light) 100%)' }}>
      <Link href="/" className="mb-8">
        <Image src="/tranzitta-logo.png" alt="Tranzitta" width={130} height={38} className="h-9 w-auto object-contain" />
      </Link>
      <motion.div className="w-full max-w-sm gradient-frame rounded-2xl p-8"
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🚗</div>
          <h1 className="text-xl font-extrabold trz-ink">Tranzitta Go</h1>
          <p className="text-sm trz-muted mt-1">Sign in with your phone number</p>
        </div>
        {step === 'phone' ? (
          <>
            <label className="block text-xs font-semibold trz-muted mb-1.5">Phone Number</label>
            <div className="flex gap-2 mb-4">
              <span className="trz-input rounded-xl px-3 py-3 text-sm font-bold flex items-center">+234</span>
              <input value={phone} onChange={e => setPhone(e.target.value)}
                className="flex-1 trz-input rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="08012345678" type="tel" />
            </div>
            <button onClick={() => setStep('otp')}
              className="w-full py-3.5 rounded-xl font-bold text-white text-sm hover:scale-105 transition-transform"
              style={{ background: 'var(--orange-deep)' }}>
              Send OTP →
            </button>
            <p className="text-xs trz-muted text-center mt-4">New rider? <Link href="/go" className="trz-orange font-semibold">Create account</Link></p>
          </>
        ) : (
          <>
            <p className="text-sm trz-muted mb-4">Enter the 6-digit code sent to <strong>{phone}</strong></p>
            <input value={otp} onChange={e => setOtp(e.target.value)}
              className="w-full trz-input rounded-xl px-4 py-3 text-sm text-center tracking-widest text-xl font-bold outline-none focus:ring-2 focus:ring-orange-300 mb-4"
              placeholder="— — — — — —" maxLength={6} />
            <button className="w-full py-3.5 rounded-xl font-bold text-white text-sm hover:scale-105 transition-transform"
              style={{ background: 'var(--orange-deep)' }}>
              Verify & Continue →
            </button>
            <button onClick={() => setStep('phone')} className="w-full mt-3 text-xs trz-muted hover:trz-orange text-center">← Back</button>
          </>
        )}
      </motion.div>
      <p className="text-xs trz-muted mt-6 text-center max-w-xs">
        By signing in you agree to Tranzitta&apos;s terms. Powered by Twilio OTP.
      </p>
    </div>
  )
}
