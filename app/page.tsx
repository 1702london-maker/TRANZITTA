import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import StatsStrip from '@/components/StatsStrip'
import MarqueeStrip from '@/components/MarqueeStrip'
import VerticalsGrid from '@/components/VerticalsGrid'
import HowItWorks from '@/components/HowItWorks'
import SafetySection from '@/components/SafetySection'
import DriverCTA from '@/components/DriverCTA'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 0 }}>
        <Hero />
        <StatsStrip />
        <MarqueeStrip />
        <VerticalsGrid />
        <HowItWorks />
        <SafetySection />
        <DriverCTA />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

