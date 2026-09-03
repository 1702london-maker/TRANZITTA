'use client'

import { motion } from 'framer-motion'
import { Database, Eye, FileLock2, Fingerprint, KeyRound, LockKeyhole, Mail, MessageCircle, ShieldCheck } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const contents = [
  'Who We Are',
  'Information We Collect',
  'How We Use It',
  'Legal Basis',
  'Data Sharing',
  'Data Retention',
  'Your Rights',
  'Cookies',
  'Third-Party Links',
  'Security',
  'Children',
  'Changes',
  'Contact Us',
]

const sections = [
  {
    title: 'Who We Are',
    body: [
      'Tranzitta is a safety-first Nigerian mobility platform for Go, School, Corporate, Events and Airport transport. We operate booking, rider, driver, parent, corporate and operations experiences designed around verified identity, live tracking and accountable transport.',
      'Tranzitta acts as the data controller for personal information collected through our website, apps, booking flows, enquiry forms, support channels and operations dashboards.',
    ],
  },
  {
    title: 'Information We Collect',
    body: ['We collect information you provide directly and information generated while using Tranzitta services.'],
    bullets: [
      'Name, phone number, email address, profile role and login details.',
      'Pickup, destination, flight, school route, corporate shuttle and event transport details.',
      'Driver onboarding information including licence, vehicle, insurance and verification records.',
      'Live location, trip status, GPS snapshots and safety event records during active trips.',
      'Payment, invoice and transaction references processed through approved payment providers.',
    ],
  },
  {
    title: 'How We Use Your Information',
    body: ['We use personal information only for service delivery, platform safety and lawful business operations.'],
    bullets: [
      'To create accounts, verify users and apply role-based access.',
      'To book, dispatch, track and complete rides across Tranzitta verticals.',
      'To operate panic alerts, safety monitoring and incident response.',
      'To process payments, receipts, refunds, invoices and corporate billing.',
      'To improve route reliability, customer support and platform performance.',
    ],
  },
  {
    title: 'Legal Basis for Processing',
    body: ['Depending on your interaction with Tranzitta, we rely on contract, consent, legitimate interest and legal obligation as lawful bases for processing personal data under applicable Nigerian data protection law.'],
  },
  {
    title: 'Data Sharing and Disclosure',
    body: ['We do not sell personal information. We share limited data only where needed to run the service safely.'],
    bullets: [
      'Assigned drivers receive trip details needed to complete a journey.',
      'Parents, schools and corporate administrators receive authorised tracking or account information.',
      'Payment, SMS, maps, hosting and support providers process data on our behalf.',
      'Emergency responders or lawful authorities may receive safety-critical information when required.',
    ],
  },
  {
    title: 'Data Retention',
    body: ['We keep personal information only for as long as needed for service delivery, safety, accounting, dispute handling or legal compliance. When no longer required, data is deleted or anonymised.'],
  },
  {
    title: 'Your Rights',
    body: ['You may request access, correction, deletion, restriction, portability or objection to processing where applicable. You may also withdraw consent for optional communications.'],
  },
  {
    title: 'Cookies',
    body: ['Our website may use essential, analytics and preference cookies to keep the site working, understand usage and remember choices. You can control cookies through your browser settings.'],
  },
  {
    title: 'Third-Party Links',
    body: ['Our website and app may link to third-party services such as payment processors, map providers, social platforms or partner websites. Their own privacy policies apply when you leave Tranzitta.'],
  },
  {
    title: 'Security',
    body: ['We use technical and organisational measures to protect personal information, including encrypted transmission, restricted access, secure payment processing, identity checks and operational audit trails.'],
  },
  {
    title: 'Children',
    body: ['Tranzitta School is managed through parent, guardian or school administrator accounts. We do not knowingly collect personal data directly from children without appropriate adult authorisation.'],
  },
  {
    title: 'Changes',
    body: ['We may update this policy as Tranzitta grows or legal requirements change. The latest version will be posted on this page with an updated date.'],
  },
  {
    title: 'Contact Us',
    body: ['For privacy questions or data-rights requests, contact Tranzitta Privacy Enquiries at booking@tranzitta.africa. We aim to respond within 30 calendar days.'],
  },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
})

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--warm-white)' }}>
        <section className="relative overflow-hidden px-4 pb-20 pt-36" style={{ background: 'linear-gradient(145deg, #FFF0E4 0%, #FFF9F2 48%, #F1F6EA 100%)' }}>
          <PrivacyAnimation />
          <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_0.55fr] lg:items-center">
            <div>
              <motion.p {...fade(0)} className="mb-4 text-xs font-black uppercase tracking-[0.22em] trz-orange">
                Legal
              </motion.p>
              <motion.h1 {...fade(0.06)} className="mb-6 text-5xl font-black leading-tight trz-ink md:text-7xl">
                Privacy <span className="trz-orange">Policy</span>
              </motion.h1>
              <motion.p {...fade(0.12)} className="max-w-2xl text-lg leading-8 trz-muted">
                Tranzitta handles personal information with care, transparency and respect. This policy explains what we collect, why we collect it, how it is used and the rights available to you.
              </motion.p>
              <motion.div {...fade(0.18)} className="mt-8 flex flex-wrap gap-3">
                {['Last updated: 3 September 2026', 'Jurisdiction: Nigeria', 'NDPA / NDPR aligned'].map((item) => (
                  <span key={item} className="rounded-full border bg-white/80 px-4 py-2 text-xs font-bold trz-ink" style={{ borderColor: 'var(--sage-border)' }}>
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>
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
                  <p className="text-xs font-black uppercase tracking-[0.18em] trz-orange">Section {String(index + 1).padStart(2, '0')}</p>
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-black trz-ink">{section.title}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="mb-4 text-base leading-8 trz-muted">{paragraph}</p>
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

        <section className="px-4 py-20" style={{ background: 'var(--sage-light)' }}>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[0.85fr_1fr] md:items-center">
            <motion.div {...fade(0)}>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] trz-orange">Any Questions?</p>
              <h2 className="mb-4 text-4xl font-black trz-ink">We are always available to clarify.</h2>
              <p className="text-base leading-8 trz-muted">If anything in this policy is unclear or you want to discuss how your data is handled, reach out directly.</p>
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

function PrivacyAnimation() {
  const icons = [ShieldCheck, LockKeyhole, Fingerprint, Database, FileLock2, KeyRound, Eye]

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
