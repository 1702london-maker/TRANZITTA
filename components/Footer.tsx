'use client'
import Image from 'next/image'
import Link from 'next/link'

const LINKS = {
  Verticals: [
    { label: 'Tranzitta Go', href: '/go' },
    { label: 'Tranzitta School', href: '/school' },
    { label: 'Tranzitta Corporate', href: '/corporate' },
    { label: 'Tranzitta Events', href: '/events' },
    { label: 'Tranzitta Airport', href: '/airport' },
  ],
  Drivers: [
    { label: 'Apply to Drive', href: '/driver' },
    { label: 'Driver App', href: '/driver/dashboard' },
    { label: 'Earnings', href: '/driver/dashboard' },
    { label: 'Vetting Process', href: '#safety' },
  ],
  Company: [
    { label: 'About Tranzitta', href: '#' },
    { label: 'Safety', href: '#safety' },
    { label: 'Contact', href: '#contact' },
    { label: 'Ops Login', href: '/ops' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--sage-border)', background: 'var(--warm-white)' }}>
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Image src="/tranzitta-logo.png" alt="Tranzitta" width={130} height={38} className="h-9 w-auto mb-4 object-contain" />
            <p className="text-sm trz-muted leading-relaxed mb-4">
              Nigeria&apos;s safety-first ride platform. Police-vetted drivers, panic button, live GPS — across 5 verticals.
            </p>
            <a href="mailto:bookings@tranzitta.africa" className="text-sm font-semibold trz-orange">bookings@tranzitta.africa</a>
          </div>
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-extrabold uppercase tracking-widest trz-muted mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm trz-ink hover:trz-orange transition-colors hover:text-orange-600">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: 'var(--sage-border)' }}>
          <p className="text-xs trz-muted">© 2026 Tranzitta. Operated by Budruum Ltd. All rights reserved.</p>
          <p className="text-xs trz-muted">tranzitta.africa · bookings@tranzitta.africa</p>
        </div>
      </div>
    </footer>
  )
}
