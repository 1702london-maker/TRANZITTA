'use client'

import { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Building2, Bus, Car, Eye, EyeOff, Plane, ShieldCheck, Sparkles, UserRoundCheck } from 'lucide-react'
import { createBrowserSupabase } from '@/lib/supabase'
import { portalConfig, type PortalKey } from '@/lib/auth'

const iconMap = {
  car: Car,
  'school-bus': Bus,
  building: Building2,
  party: Sparkles,
  plane: Plane,
  driver: UserRoundCheck,
  shield: ShieldCheck,
}

export default function AuthPortal({ portal }: { portal: PortalKey }) {
  const config = portalConfig[portal]
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [nextPath, setNextPath] = useState(config.dashboardPath)
  const Icon = iconMap[config.icon]

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const next = params.get('next')
    const error = params.get('error')
    if (next?.startsWith('/')) setNextPath(next)
    if (error === 'role') setMessage('This account does not have access to that portal.')
  }, [])

  const syncProfile = async (accessToken: string) => {
    if (!config.allowSignup) return

    const res = await fetch('/api/auth/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        portal,
        full_name: fullName || email.split('@')[0],
        phone,
        role: config.role,
      }),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || 'Could not create your Tranzitta profile.')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const supabase = createBrowserSupabase()

      if (mode === 'signup') {
        if (!config.allowSignup) throw new Error('Ops accounts are created internally.')
        if (!fullName.trim() || !phone.trim()) throw new Error('Enter your name and phone number to create the account.')

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName, phone },
          },
        })

        if (error) throw error
        const token = data.session?.access_token
        if (token) await syncProfile(token)
        setMessage(token ? 'Account ready. Taking you to your portal.' : 'Check your email to confirm your account, then log in.')
        if (token) router.push(nextPath)
        return
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error

      if (data.session?.access_token && config.allowSignup && fullName && phone) {
        await syncProfile(data.session.access_token)
      }

      router.push(nextPath)
      router.refresh()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Authentication failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      className="min-h-screen px-4 py-12"
      style={{ background: 'linear-gradient(135deg, var(--orange-blush) 0%, var(--warm-white) 58%, var(--sage-light) 100%)' }}
    >
      <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-6xl items-center justify-center">
        <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_0.75fr] lg:items-center">
          <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/" className="mb-10 inline-flex">
              <Image src="/tranzitta-logo.png" alt="Tranzitta" width={190} height={54} className="h-12 w-auto object-contain" priority />
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black text-white" style={{ background: config.accent }}>
              <Icon size={16} /> {config.title}
            </div>
            <h1 className="mt-5 max-w-xl text-5xl font-black leading-tight trz-ink md:text-6xl">
              Safety-first access for your Tranzitta portal.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 trz-muted">{config.subtitle}</p>
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              {['Verified users', 'Role-based access', 'Live support'].map((item) => (
                <div key={item} className="rounded-2xl border bg-white/70 px-4 py-3 text-sm font-black trz-ink" style={{ borderColor: 'var(--sage-border)' }}>
                  {item}
                </div>
              ))}
            </div>
          </motion.section>

          <motion.form
            onSubmit={handleSubmit}
            className="rounded-[28px] border bg-white/82 p-6 shadow-2xl backdrop-blur"
            style={{ borderColor: 'var(--sage-border)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] trz-muted">{mode === 'login' ? 'Login' : 'Create account'}</p>
                <h2 className="mt-1 text-2xl font-black trz-ink">{config.title}</h2>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ background: config.accent }}>
                <Icon size={23} />
              </span>
            </div>

            {mode === 'signup' ? (
              <>
                <label className="mb-1.5 block text-xs font-bold trz-muted">Full name</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="mb-3 w-full rounded-xl px-4 py-3 text-sm outline-none trz-input" placeholder="Adaora Okafor" />
                <label className="mb-1.5 block text-xs font-bold trz-muted">Phone number</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mb-3 w-full rounded-xl px-4 py-3 text-sm outline-none trz-input" placeholder="+234 801 234 5678" type="tel" />
              </>
            ) : null}

            <label className="mb-1.5 block text-xs font-bold trz-muted">Email address</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mb-3 w-full rounded-xl px-4 py-3 text-sm outline-none trz-input" placeholder="you@example.com" type="email" required />

            <label className="mb-1.5 block text-xs font-bold trz-muted">Password</label>
            <div className="mb-5 flex items-center rounded-xl trz-input">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none"
                placeholder="Minimum 6 characters"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
              />
              <button type="button" onClick={() => setShowPassword((value) => !value)} className="px-4 trz-muted" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {message ? (
              <div className="mb-4 rounded-2xl px-4 py-3 text-sm font-bold" style={{ background: '#FFF0E4', color: '#8A3B0E' }}>
                {message}
              </div>
            ) : null}

            <button disabled={loading} className="w-full rounded-xl py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60" style={{ background: config.accent }}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Enter Dashboard' : 'Create Account'}
            </button>

            {config.allowSignup ? (
              <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="mt-4 w-full text-center text-xs font-bold trz-muted">
                {mode === 'login' ? 'New here? Create your Tranzitta account' : 'Already registered? Log in'}
              </button>
            ) : (
              <p className="mt-4 text-center text-xs font-bold trz-muted">Ops accounts are provisioned by Tranzitta superadmin.</p>
            )}
          </motion.form>
        </div>
      </div>
    </main>
  )
}
