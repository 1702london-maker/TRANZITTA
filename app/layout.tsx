import type { Metadata } from 'next'
import './globals.css'
import StickyBar from '@/components/StickyBar'
import FloatingVerticalBar from '@/components/FloatingVerticalBar'

export const metadata: Metadata = {
  title: 'Tranzitta — Nigeria\'s Safety-First Ride Platform',
  description: 'Police-vetted drivers, panic button, live tracking, 15% commission. Go, School, Corporate, Events & Airport pickups across Nigeria.',
  keywords: 'ride hailing nigeria, tranzitta, safe rides lagos, school transport nigeria, corporate transport lagos, airport pickup lagos',
  openGraph: {
    title: 'Tranzitta — Safety-First Rides Across Nigeria',
    description: 'Go. School. Corporate. Events. Airport. One platform. Fully vetted. Always safe.',
    url: 'https://tranzitta.africa',
    siteName: 'Tranzitta',
    locale: 'en_NG',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/tranzitta-logo.png" type="image/png" />
        <meta name="theme-color" content="#D96B1F" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <StickyBar />
        {children}
        <FloatingVerticalBar />
      </body>
    </html>
  )
}
