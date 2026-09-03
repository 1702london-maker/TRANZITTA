import Image from 'next/image'
import Link from 'next/link'
import { Building2, Bus, Car, Plane, ShieldCheck, Sparkles, UserRoundCheck } from 'lucide-react'

const portals = [
  { title: 'Go', href: '/go/login', icon: Car, text: 'Rider login for everyday trips.' },
  { title: 'School / Parent', href: '/school/login', icon: Bus, text: 'Parent access for child tracking.' },
  { title: 'Corporate', href: '/corporate/login', icon: Building2, text: 'Company admin shuttle portal.' },
  { title: 'Events', href: '/events/login', icon: Sparkles, text: 'Event bookings, QR and fleet tracking.' },
  { title: 'Airport', href: '/airport/login', icon: Plane, text: 'Airport transfers and flight-linked rides.' },
  { title: 'Driver', href: '/driver/login', icon: UserRoundCheck, text: 'Driver partner dashboard.' },
  { title: 'Ops', href: '/ops', icon: ShieldCheck, text: 'Internal operations command.' },
]

export default function LoginPage() {
  return (
    <main className="min-h-screen px-4 py-12" style={{ background: 'linear-gradient(135deg, var(--orange-blush) 0%, var(--warm-white) 58%, var(--sage-light) 100%)' }}>
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="inline-flex">
          <Image src="/tranzitta-logo.png" alt="Tranzitta" width={210} height={64} className="h-14 w-auto object-contain" priority />
        </Link>
        <section className="py-14 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] trz-orange">Login</p>
          <h1 className="mx-auto max-w-3xl text-5xl font-black leading-tight trz-ink md:text-7xl">Choose your Tranzitta portal.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 trz-muted">Use the correct portal for your role. Each dashboard is protected and connects to the Supabase backend.</p>
        </section>
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {portals.map(({ title, href, icon: Icon, text }) => (
            <Link key={title} href={href} className="group rounded-[24px] border bg-white/82 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl" style={{ borderColor: 'var(--sage-border)' }}>
              <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-white transition group-hover:scale-105" style={{ background: 'linear-gradient(135deg, var(--africa-green), var(--orange-deep))' }}>
                <Icon size={25} />
              </span>
              <h2 className="text-xl font-black trz-ink">{title}</h2>
              <p className="mt-2 text-sm leading-6 trz-muted">{text}</p>
              <p className="mt-5 text-sm font-black trz-orange">Continue →</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  )
}
