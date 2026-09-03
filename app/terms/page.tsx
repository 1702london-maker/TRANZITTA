'use client'

import { motion } from 'framer-motion'
import { FileText, Gavel, HandshakeIcon, Scale, ScrollText, ShieldCheck, Wallet } from 'lucide-react'
import { Mail, MessageCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const contents = [
  'Acceptance of Terms',
  'The Platform',
  'Accounts & Registration',
  'Bookings & Service Use',
  'Payments & Pricing',
  'Cancellations & Refunds',
  'Safety Obligations',
  'Driver-Partner Terms',
  'Intellectual Property',
  'Limitation of Liability',
  'Prohibited Conduct',
  'Governing Law',
  'Contact Us',
]

const sections = [
  {
    title: 'Acceptance of Terms',
    body: [
      'These Terms of Service constitute a legally binding agreement between you and Tranzitta, a Nigerian mobility platform operating within the Federal Republic of Nigeria. By accessing our website, downloading our app, creating an account or using any Tranzitta transport service, you confirm that you have read, understood and agree to be bound by these Terms.',
      'If you do not agree to these Terms, you must not access or use the Tranzitta platform. We reserve the right to update these Terms at any time. Continued use of the platform after any update constitutes your acceptance of the revised Terms.',
    ],
  },
  {
    title: 'The Platform',
    body: ['Tranzitta is a technology-enabled mobility platform connecting passengers with vetted, police-cleared driver-partners across five transport verticals.'],
    bullets: [
      'Tranzitta Go — on-demand rides for individuals across Lagos and expanding cities.',
      'Tranzitta School — dedicated, safe transport for children under vetted school drivers.',
      'Tranzitta Corporate — structured staff commute solutions for businesses and institutions.',
      'Tranzitta Events — group and VIP transport for weddings, concerts, conferences and private events.',
      'Tranzitta Airport — executive airport transfers with real-time flight tracking.',
    ],
  },
  {
    title: 'Accounts & Registration',
    body: ['To access most features of the Tranzitta platform, you must create an account. You agree to provide accurate, current and complete information during registration and to keep your account details up to date.'],
    bullets: [
      'You must be at least 18 years old to create a personal account on Tranzitta.',
      'School vertical accounts must be created by a parent or legal guardian aged 18 or over.',
      'Corporate accounts must be registered by an authorised representative of the relevant business.',
      'You are responsible for maintaining the confidentiality of your login credentials.',
      'You must notify Tranzitta immediately at booking@tranzitta.africa if you suspect unauthorised access to your account.',
    ],
  },
  {
    title: 'Bookings & Service Use',
    body: ['When you book a trip through Tranzitta, you are entering into an agreement with an independent driver-partner for transport services. Tranzitta facilitates that connection and ensures the driver meets our vetting and safety standards.'],
    bullets: [
      'Be ready at the confirmed pickup location at the scheduled time.',
      'Treat driver-partners with respect — abusive or threatening behaviour is grounds for immediate account suspension.',
      'Do not request drivers to break traffic laws or deviate significantly from the agreed journey.',
      'Do not consume alcohol or illegal substances in any Tranzitta vehicle.',
      'Seat belts must be worn at all times where fitted.',
      'For the School vertical, ensure children are ready at the designated pickup point on time.',
    ],
  },
  {
    title: 'Payments & Pricing',
    body: ['All payments are processed securely through Paystack. By using the platform, you authorise Tranzitta to charge the applicable fare, fees and any excess charges to your nominated payment method.'],
    bullets: [
      'Fares are calculated based on distance, trip type, time of day and demand — displayed before you confirm.',
      'Corporate clients are invoiced monthly in arrears and may require advance payment.',
      'Excess charges apply where a driver waits beyond the agreed pickup window.',
      'Event and airport bookings may require a deposit or full payment at time of booking.',
      'All payments are in Nigerian Naira (₦). Tranzitta does not store card details.',
    ],
  },
  {
    title: 'Cancellations & Refunds',
    body: [
      'Go rides cancelled before driver assignment are free. Cancellations after assignment may incur a cancellation fee. No-shows are charged in full.',
      'School transport subscriptions require 30 days notice to cancel. Corporate contracts require 30 days written notice. Event and airport deposits are non-refundable; full cancellations within 48 hours of the booking time are charged in full.',
      'All approved refunds are processed within 5–10 business days to the original payment method.',
    ],
  },
  {
    title: 'Safety Obligations',
    body: ['Safety is the foundation of the Tranzitta platform. By using any Tranzitta service, you acknowledge and agree to the following.'],
    bullets: [
      'The panic button is for genuine emergencies only — misuse is a breach of these Terms.',
      'Tranzitta QR verification must be completed before entering any Tranzitta vehicle where applicable.',
      'Dashcam footage is recorded in all Tranzitta vehicles — by travelling with Tranzitta you consent to this recording.',
      'GPS tracking is active during all trips and shared with your emergency contacts and, where applicable, your corporate or school administrator.',
      'Passengers must not tamper with or obstruct any safety equipment in a Tranzitta vehicle.',
    ],
  },
  {
    title: 'Driver-Partner Terms',
    body: ['Driver-partners are independent contractors vetted, trained and approved by Tranzitta. By operating on the platform, driver-partners agree to the following.'],
    bullets: [
      'Maintain a valid Nigerian driver\'s licence and vehicle roadworthiness certificate at all times.',
      'Complete all required Tranzitta onboarding, training and periodic re-verification steps.',
      'Submit to police clearance checks and identity verification as required.',
      'Operate only the approved and registered vehicle on the platform.',
      'Treat all passengers — including children on the School vertical — with professionalism, care and respect.',
      'Report all incidents, accidents or safety concerns immediately through the driver app.',
    ],
  },
  {
    title: 'Intellectual Property',
    body: ['All content, branding, design, software and materials on the Tranzitta platform are the exclusive intellectual property of Tranzitta and are protected under Nigerian and international law.'],
    bullets: [
      'You may not reproduce, distribute or create derivative works from any Tranzitta content without written permission.',
      'You may not use the Tranzitta name, logo or branding without authorisation.',
      'Unauthorised scraping, data extraction or automated access to the platform is strictly prohibited.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: ['To the fullest extent permitted by Nigerian law, Tranzitta\'s liability to you is limited as follows.'],
    bullets: [
      'Tranzitta is not liable for delays or cancellations caused by circumstances beyond our reasonable control, including traffic, road closures or weather.',
      'Tranzitta is not liable for loss or damage to personal property left in a vehicle.',
      'Where Tranzitta is found liable, our total liability shall not exceed the value of the specific trip or service in dispute.',
      'Nothing in these Terms limits liability for death or personal injury caused by our negligence, or any liability that cannot be excluded under Nigerian law.',
    ],
  },
  {
    title: 'Prohibited Conduct',
    body: ['The following conduct is strictly prohibited and may result in immediate account suspension, permanent ban and referral to law enforcement.'],
    bullets: [
      'Providing false, misleading or fraudulent information during registration or booking.',
      'Abusing, threatening or harassing any driver-partner, passenger or Tranzitta staff member.',
      'Attempting to manipulate fares, promotions or the platform in any unauthorised way.',
      'Using the platform to facilitate any illegal activity, including transportation of prohibited goods.',
      'Creating multiple accounts to circumvent a suspension or ban.',
      'Misusing the panic button or emergency response system for non-emergency purposes.',
    ],
  },
  {
    title: 'Governing Law',
    body: [
      'These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the Nigerian courts.',
      'Before initiating any formal legal proceeding, you agree to first contact Tranzitta at booking@tranzitta.africa to attempt informal resolution. Tranzitta will make reasonable efforts to resolve any complaint within 30 calendar days of receiving formal notification.',
    ],
  },
  {
    title: 'Contact Us',
    body: [
      'If you have any questions about these Terms of Service, wish to raise a dispute or need clarification on your rights or obligations, please contact us at booking@tranzitta.africa.',
      'We respond to all legal enquiries within 30 calendar days. You may also view our Privacy Policy for information on how we handle your personal data.',
    ],
  },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
})

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--warm-white)' }}>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden px-4 pb-20 pt-36" style={{ background: 'linear-gradient(145deg, #FFF0E4 0%, #FFF9F2 48%, #F1F6EA 100%)' }}>
          <TermsAnimation />
          <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_0.55fr] lg:items-center">
            <div>
              <motion.p {...fade(0)} className="mb-4 text-xs font-black uppercase tracking-[0.22em] trz-orange">
                Legal
              </motion.p>
              <motion.h1 {...fade(0.06)} className="mb-6 text-5xl font-black leading-tight trz-ink md:text-7xl">
                Terms of <span className="trz-orange">Service</span>
              </motion.h1>
              <motion.p {...fade(0.12)} className="max-w-2xl text-lg leading-8 trz-muted">
                By using Tranzitta — as a passenger, parent, corporate client, event organiser or driver — you agree to the following terms. Please read them carefully before using our platform.
              </motion.p>
              <motion.div {...fade(0.18)} className="mt-8 flex flex-wrap gap-3">
                {['Last updated: 3 September 2026', 'Jurisdiction: Nigeria', 'Governed by Nigerian Law'].map((item) => (
                  <span key={item} className="rounded-full border bg-white/80 px-4 py-2 text-xs font-bold trz-ink" style={{ borderColor: 'var(--sage-border)' }}>
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Contents card */}
            <motion.div {...fade(0.16)} className="rounded-[28px] border bg-white/70 p-6 shadow-xl backdrop-blur" style={{ borderColor: 'var(--sage-border)' }}>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] trz-muted">Contents</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {contents.map((item, index) => (
                  <a key={item} href={`#section-${index + 1}`} className="rounded-xl px-3 py-2 text-sm font-bold trz-ink transition hover:bg-orange-50 hover:text-orange-700">
                    {String(index + 1).padStart(2, '0')} {item}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SECTIONS ── */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-5xl space-y-8">
            {sections.map((section, index) => (
              <motion.article
                key={section.title}
                id={`section-${index + 1}`}
                {...fade(0)}
                className="grid gap-5 border-b pb-8 md:grid-cols-[160px_1fr]"
                style={{ borderColor: 'var(--sage-border)' }}
              >
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] trz-orange">
                    Section {String(index + 1).padStart(2, '0')}
                  </p>
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-black trz-ink">{section.title}</h2>
                  {section.body.map((paragraph, i) => (
                    <p key={i} className="mb-4 text-base leading-8 trz-muted">{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="space-y-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-sm leading-7 trz-muted">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--orange-deep)' }} />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-4 py-20" style={{ background: 'var(--sage-light)' }}>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[0.85fr_1fr] md:items-center">
            <motion.div {...fade(0)}>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] trz-orange">Any Questions?</p>
              <h2 className="mb-4 text-4xl font-black trz-ink">We are always available to clarify.</h2>
              <p className="text-base leading-8 trz-muted">If anything in these terms is unclear or you want to discuss your rights and obligations, reach out directly.</p>
            </motion.div>
            <motion.div {...fade(0.1)} className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Mail, label: 'Email', value: 'booking@tranzitta.africa', href: 'mailto:booking@tranzitta.africa' },
                { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us instantly', href: '#contact' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="rounded-2xl border bg-white p-6 transition hover:-translate-y-1" style={{ borderColor: 'var(--sage-border)' }}>
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full trz-sage-pill">
                    <Icon size={22} />
                  </span>
                  <p className="font-black trz-ink">{label}</p>
                  <p className="mt-1 text-sm trz-muted">{value}</p>
                </a>
              ))}
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

function TermsAnimation() {
  const icons = [FileText, Gavel, Scale, HandshakeIcon, ScrollText, ShieldCheck, Wallet]

  return (
    <div className="pointer-events-none absolute bottom-10 right-4 top-28 hidden w-[38%] lg:block">
      <motion.div
        className="absolute right-20 top-12 h-64 w-64 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(217,107,31,0.18), rgba(31,107,70,0.06) 58%, transparent 70%)' }}
        animate={{ scale: [1, 1.06, 1], rotate: [0, 4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute flex h-16 w-16 items-center justify-center rounded-2xl border bg-white/80 shadow-lg backdrop-blur"
          style={{
            borderColor: 'var(--sage-border)',
            color: index % 2 ? 'var(--orange-deep)' : 'var(--africa-green)',
            left: `${14 + (index % 3) * 26}%`,
            top: `${8 + index * 11}%`,
          }}
          animate={{ y: [0, -10, 0], rotate: [0, index % 2 ? 5 : -5, 0] }}
          transition={{ duration: 4 + index * 0.35, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon size={27} />
        </motion.div>
      ))}
    </div>
  )
}
