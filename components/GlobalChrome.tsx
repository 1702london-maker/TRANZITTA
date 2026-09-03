'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const ROUTES_WITH_LOCAL_CHROME = [
  '/',
  '/airport',
  '/airport/book',
  '/airport/dashboard',
  '/airport/jobs',
  '/corporate',
  '/corporate/dashboard',
  '/corporate/enquire',
  '/driver',
  '/events',
  '/go',
  '/go/book',
  '/how-it-works',
  '/privacy',
  '/safety',
  '/school',
]

function hasLocalChrome(pathname: string) {
  return ROUTES_WITH_LOCAL_CHROME.includes(pathname)
}

export default function GlobalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const useSharedChrome = !hasLocalChrome(pathname)

  if (!useSharedChrome) return <>{children}</>

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  )
}
