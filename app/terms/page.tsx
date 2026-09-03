'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, MessageCircle, Phone } from 'lucide-react'

/* ─── animation helpers ─── */
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
})

function Section({ children, alt = false }: { children: React.ReactNode; alt?: boolean }) {
  return (
    <section style={{ background: alt ? '#F1F6EA' : 'var(--warm-white)' }}>
      <div className="mx-auto max-w-4xl px-6 py-20">{children}</div>
    </section>
  )
}

function SectionTag({ n }: { n: string }) {
  return (
    <motion.p
      {...fade(0)}
      className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em]"
      style={{ color: 'var(--orange-deep)' }}
    >
      SECTION {n}
    </motion.p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2 {...fade(0.06)} className="mb-6 text-2xl font-black md:text-3xl" style={{ color: 'var(--text-main)' }}>
      {children}
    </motion.h2>
  )
}

function Para({ children, delay = 0.1 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.p {...fade(delay)} className="mb-4 text-base leading-8" style={{ color: 'var(--text-muted)' }}>
      {children}
    </motion.p>
  )
}

function BulletList({ items, delay = 0.14 }: { items: string[]; delay?: number }) {
  return (
    <motion.ul {...fade(delay)} className="mb-4 space-y-2 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-base leading-7" style={{ color: 'var(--text-muted)' }}>
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--orange-deep)' }} />
          {item}
        </li>
      ))}
    </motion.ul>
  )
}

function CardItem({ label, body }: { label: string; body: string }) {
  return (
    <motion.div
      {...fade(0.08)}
      className="rounded-2xl border p-6"
      style={{ borderColor: 'var(--sage-border)', background: 'var(--warm-white)' }}
    >
      <p className="mb-1 text-sm font-extrabold" style={{ color: 'var(--text-main)' }}>{label}</p>
      <p className="text-sm leading-7" style={{ color: 'var(--text-muted)' }}>{body}</p>
    </motion.div>
  )
}

function Divider() {
  return <div className="h-px w-full" style={{ background: 'var(--sage-border)' }} />
}

/* ═══════════════════════════════════════════════ */
export default function TermsPage() {
  return (
    <main style={{ background: 'var(--warm-white)' }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden pb-20 pt-40"
        style={{ background: 'linear-gradient(160deg, #FFF0E4 0%, var(--warm-white) 55%, #EDF6F1 100%)' }}
      >
        <div className="mx-auto max-w-4xl px-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em]"
            style={{ color: 'var(--orange-deep)' }}
          >
            LEGAL
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
            className="mb-6 text-4xl font-black leading-tight md:text-6xl"
          >
            <span style={{ color: 'var(--text-main)' }}>Terms of</span>{' '}
            <span style={{ color: 'var(--orange-deep)' }}>Service</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}
            className="mb-10 max-w-xl text-lg leading-8"
            style={{ color: 'var(--text-muted)' }}
          >
            By using Tranzitta — as a passenger, parent, corporate client, event organiser or driver — you agree to the following terms. Please read them carefully before using our platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
            className="flex flex-wrap gap-3"
          >
            {[
              'Last updated: 1 January 2025',
              'Jurisdiction: Federal Republic of Nigeria',
              'Governed by Nigerian Law',
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full px-4 py-2 text-xs font-bold"
                style={{ background: '#F1F6EA', color: 'var(--text-main)', border: '1px solid var(--sage-border)' }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── SECTION 01 — Acceptance ── */}
      <Section>
        <SectionTag n="01" />
        <SectionTitle>Acceptance of Terms</SectionTitle>
        <Para>
          These Terms of Service ("Terms") constitute a legally binding agreement between you and Tranzitta ("Tranzitta", "we", "us" or "our"), a Nigerian mobility platform registered and operating within the Federal Republic of Nigeria. By accessing our website, downloading our app, creating an account or using any of our transport services, you confirm that you have read, understood and agree to be bound by these Terms.
        </Para>
        <Para>
          If you do not agree to these Terms, you must not access or use the Tranzitta platform. We reserve the right to update these Terms at any time. Continued use of the platform following any update constitutes your acceptance of the revised Terms.
        </Para>
        <Para>
          These Terms apply to all users of the platform, including passengers, parents and guardians, corporate account holders, event organisers, airport clients, and driver-partners.
        </Para>
      </Section>

      <Divider />

      {/* ── SECTION 02 — The Platform ── */}
      <Section alt>
        <SectionTag n="02" />
        <SectionTitle>The Tranzitta Platform</SectionTitle>
        <Para>
          Tranzitta is a technology-enabled mobility platform that connects passengers with vetted, police-cleared driver-partners across five transport verticals:
        </Para>
        <BulletList items={[
          'Tranzitta Go — on-demand rides for individuals across Lagos and expanding cities',
          'Tranzitta School — dedicated, safe transport for children under vetted school drivers',
          'Tranzitta Corporate — structured staff commute solutions for businesses and institutions',
          'Tranzitta Events — group and VIP transport for weddings, concerts, conferences and private events',
          'Tranzitta Airport — executive airport transfers with real-time flight tracking',
        ]} />
        <Para delay={0.18}>
          Tranzitta acts as a technology intermediary. The transport service is provided by independent driver-partners who have been vetted, trained and approved by Tranzitta but who operate as independent contractors. Tranzitta does not employ drivers directly.
        </Para>
      </Section>

      <Divider />

      {/* ── SECTION 03 — Accounts ── */}
      <Section>
        <SectionTag n="03" />
        <SectionTitle>Accounts and Registration</SectionTitle>
        <Para>
          To access most features of the Tranzitta platform, you must create an account. You agree to provide accurate, current and complete information during registration and to keep your account details up to date at all times.
        </Para>
        <BulletList items={[
          'You must be at least 18 years old to create a personal account on Tranzitta',
          'School vertical accounts must be created by a parent or legal guardian aged 18 or over',
          'Corporate accounts must be registered by an authorised representative of the relevant business',
          'You are responsible for maintaining the confidentiality of your login credentials',
          'You are solely responsible for all activity that occurs under your account',
          'You must notify Tranzitta immediately at booking@tranzitta.africa if you suspect unauthorised access to your account',
        ]} />
        <Para delay={0.18}>
          Tranzitta reserves the right to suspend or terminate any account that provides false information, violates these Terms, or poses a risk to the safety or integrity of the platform.
        </Para>
      </Section>

      <Divider />

      {/* ── SECTION 04 — Bookings ── */}
      <Section alt>
        <SectionTag n="04" />
        <SectionTitle>Bookings and Service Use</SectionTitle>
        <Para>
          When you book a trip through Tranzitta, you are entering into an agreement with an independent driver-partner for the provision of transport services. Tranzitta facilitates that connection and ensures the driver meets our vetting and safety standards.
        </Para>
        <motion.p {...fade(0.08)} className="mb-2 text-sm font-extrabold uppercase tracking-widest" style={{ color: 'var(--text-main)' }}>
          Your responsibilities as a passenger
        </motion.p>
        <BulletList items={[
          'Be ready at the confirmed pickup location at the scheduled time',
          'Treat driver-partners with respect — threatening, abusive or discriminatory behaviour is grounds for immediate account suspension',
          'Do not request drivers to break traffic laws, travel on unsafe routes or deviate significantly from the agreed journey',
          'Do not consume alcohol or illegal substances in the vehicle',
          'Do not bring hazardous materials, weapons or items prohibited by Nigerian law into any Tranzitta vehicle',
          'Seat belts must be worn at all times where fitted',
          'For the School vertical, ensure children are ready at the designated pickup point at the correct time',
        ]} />
        <Para delay={0.2}>
          Tranzitta reserves the right to cancel bookings, remove passengers from vehicles or suspend accounts where these responsibilities are not upheld.
        </Para>
      </Section>

      <Divider />

      {/* ── SECTION 05 — Payments ── */}
      <Section>
        <SectionTag n="05" />
        <SectionTitle>Payments and Pricing</SectionTitle>
        <Para>
          All payments on the Tranzitta platform are processed securely through Paystack. By using the platform, you authorise Tranzitta to charge the applicable fare, fees and any excess charges to your nominated payment method.
        </Para>
        <BulletList items={[
          'Fares are calculated based on distance, trip type, time of day and demand — displayed before you confirm your booking',
          'Corporate clients are invoiced monthly in arrears and may be subject to advance payment requirements',
          'Excess charges apply where a driver waits beyond the agreed pickup window — these are calculated at a per-minute rate and displayed in the app',
          'Event and airport bookings may require a deposit or full payment at the time of booking',
          'All payments are in Nigerian Naira (₦)',
          'Tranzitta does not store card details — all card data is held securely by Paystack under PCI-DSS standards',
        ]} />
        <Para delay={0.2}>
          Fares displayed at booking are estimates. Final fares may differ due to route changes, traffic or waiting time. Any disputes regarding charges must be raised within 7 days of the relevant trip via our support channel.
        </Para>
      </Section>

      <Divider />

      {/* ── SECTION 06 — Cancellations ── */}
      <Section alt>
        <SectionTag n="06" />
        <SectionTitle>Cancellations and Refunds</SectionTitle>
        <Para>
          We understand that plans change. The following cancellation policy applies across all Tranzitta verticals:
        </Para>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { label: 'Tranzitta Go', body: 'Cancellations made before a driver is assigned are free. Cancellations after driver assignment may incur a cancellation fee. No-shows are charged in full.' },
            { label: 'Tranzitta School', body: 'Monthly school transport subscriptions require 30 days notice to cancel. Cancellations within the 30-day period are charged at the full month rate.' },
            { label: 'Tranzitta Corporate', body: 'Corporate contracts require 30 days written notice to terminate. Excess billing is non-refundable once invoiced and paid.' },
            { label: 'Events & Airport', body: 'Deposits are non-refundable. Full cancellations within 48 hours of the event or transfer time are charged in full. Partial refunds may be issued for cancellations made more than 72 hours in advance at Tranzitta\'s discretion.' },
          ].map((item) => (
            <CardItem key={item.label} label={item.label} body={item.body} />
          ))}
        </div>
        <Para delay={0.2}>
          All approved refunds are processed within 5–10 business days to the original payment method. Tranzitta reserves the right to withhold refunds where these Terms have been breached.
        </Para>
      </Section>

      <Divider />

      {/* ── SECTION 07 — Safety ── */}
      <Section>
        <SectionTag n="07" />
        <SectionTitle>Safety Obligations</SectionTitle>
        <Para>
          Safety is the foundation of the Tranzitta platform. By using any Tranzitta service, you acknowledge and agree to the following:
        </Para>
        <BulletList items={[
          'The panic button is for genuine emergencies only — misuse is a breach of these Terms and may result in account termination',
          'Tranzitta QR verification must be completed before entering any Tranzitta vehicle where applicable',
          'Any safety incident, complaint or concern must be reported via the in-app reporting tool or at booking@tranzitta.africa within 24 hours',
          'Dashcam footage is recorded in all Tranzitta vehicles for safety purposes — by travelling with Tranzitta you consent to this recording',
          'GPS tracking is active during all trips — location data is shared with your emergency contacts and, where applicable, with your corporate or school administrator',
          'Passengers must not tamper with, obstruct or disable any safety equipment in a Tranzitta vehicle',
        ]} />
      </Section>

      <Divider />

      {/* ── SECTION 08 — Driver-Partners ── */}
      <Section alt>
        <SectionTag n="08" />
        <SectionTitle>Driver-Partner Terms</SectionTitle>
        <Para>
          Driver-partners are independent contractors who have been vetted, trained and approved by Tranzitta. By operating on the Tranzitta platform, driver-partners agree to:
        </Para>
        <BulletList items={[
          'Maintain a valid Nigerian driver\'s licence and vehicle roadworthiness certificate at all times',
          'Complete all required Tranzitta onboarding, training and periodic re-verification steps',
          'Submit to police clearance checks and identity verification as required by Tranzitta',
          'Operate only the approved and registered vehicle on the platform',
          'Maintain an active dashcam and functioning mobile device during all trips',
          'Treat all passengers — including children on the School vertical — with professionalism, care and respect',
          'Report all incidents, accidents or safety concerns immediately through the driver app',
          'Not permit any unauthorised person to operate the vehicle during an active Tranzitta booking',
        ]} />
        <Para delay={0.2}>
          Tranzitta may suspend or permanently remove any driver-partner from the platform who violates these obligations, receives sustained negative passenger ratings, or poses a risk to passenger safety.
        </Para>
      </Section>

      <Divider />

      {/* ── SECTION 09 — Intellectual Property ── */}
      <Section>
        <SectionTag n="09" />
        <SectionTitle>Intellectual Property</SectionTitle>
        <Para>
          All content, branding, design, software, technology and materials on the Tranzitta platform — including but not limited to the Tranzitta name, logo, app interface and website — are the exclusive intellectual property of Tranzitta and are protected under Nigerian and international intellectual property law.
        </Para>
        <BulletList items={[
          'You may not reproduce, distribute, modify or create derivative works from any Tranzitta content without express written permission',
          'You may not use the Tranzitta name, logo or branding in connection with any product, service or communication that is not authorised by Tranzitta',
          'Feedback or suggestions you submit to Tranzitta may be used by us freely without any obligation to compensate you',
          'Unauthorised scraping, data extraction or automated access to the Tranzitta platform is strictly prohibited',
        ]} />
      </Section>

      <Divider />

      {/* ── SECTION 10 — Liability ── */}
      <Section alt>
        <SectionTag n="10" />
        <SectionTitle>Limitation of Liability</SectionTitle>
        <Para>
          To the fullest extent permitted by Nigerian law, Tranzitta's liability to you in connection with the platform or any transport service is limited as follows:
        </Para>
        <BulletList items={[
          'Tranzitta is not liable for delays, cancellations or failure to complete a trip caused by circumstances beyond our reasonable control, including traffic, road closures, weather or civil disruption',
          'Tranzitta is not liable for loss or damage to personal property left in a vehicle, though we will make reasonable efforts to facilitate its recovery',
          'Tranzitta does not guarantee the continuous, uninterrupted availability of the platform',
          'Where Tranzitta is found liable, our total liability shall not exceed the value of the specific trip or service in dispute',
        ]} />
        <Para delay={0.18}>
          Nothing in these Terms limits Tranzitta's liability for death, personal injury caused by our negligence, or any liability that cannot be excluded under applicable Nigerian law.
        </Para>
      </Section>

      <Divider />

      {/* ── SECTION 11 — Prohibited Conduct ── */}
      <Section>
        <SectionTag n="11" />
        <SectionTitle>Prohibited Conduct</SectionTitle>
        <Para>
          The following conduct is strictly prohibited on the Tranzitta platform and may result in immediate account suspension, permanent ban and, where applicable, referral to law enforcement:
        </Para>
        <BulletList items={[
          'Providing false, misleading or fraudulent information during registration or booking',
          'Abusing, threatening, harassing or discriminating against any driver-partner, passenger or Tranzitta staff member',
          'Attempting to manipulate fares, promotions or the platform in any way not authorised by Tranzitta',
          'Using the platform to facilitate any illegal activity, including the transportation of prohibited goods or persons',
          'Creating multiple accounts to circumvent a suspension or ban',
          'Engaging in any conduct that damages the reputation or operation of the Tranzitta platform',
          'Misusing the panic button or emergency response system for non-emergency purposes',
        ]} />
      </Section>

      <Divider />

      {/* ── SECTION 12 — Governing Law ── */}
      <Section alt>
        <SectionTag n="12" />
        <SectionTitle>Governing Law and Disputes</SectionTitle>
        <Para>
          These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any dispute arising out of or in connection with these Terms or the use of the Tranzitta platform shall be subject to the exclusive jurisdiction of the Nigerian courts.
        </Para>
        <Para>
          Before initiating any formal legal proceeding, you agree to first contact Tranzitta at{' '}
          <a href="mailto:booking@tranzitta.africa" className="font-bold hover:underline" style={{ color: 'var(--orange-deep)' }}>
            booking@tranzitta.africa
          </a>{' '}
          to attempt to resolve the dispute informally. Tranzitta will make reasonable efforts to resolve any complaint or dispute within 30 calendar days of receiving formal notification.
        </Para>
        <Para>
          These Terms were last reviewed and updated on 1 January 2025.
        </Para>
      </Section>

      <Divider />

      {/* ── SECTION 13 — Contact ── */}
      <Section>
        <SectionTag n="13" />
        <SectionTitle>Contact Us</SectionTitle>
        <Para>
          If you have any questions about these Terms of Service, wish to raise a dispute or need clarification on any aspect of your rights or obligations as a Tranzitta user, please contact us using the details below. We will respond to all legal enquiries within 30 calendar days.
        </Para>
        <motion.div
          {...fade(0.1)}
          className="mt-4 rounded-2xl border p-6"
          style={{ borderColor: 'var(--sage-border)', background: '#F1F6EA' }}
        >
          <p className="mb-1 text-sm font-extrabold" style={{ color: 'var(--text-main)' }}>Tranzitta Nigeria — Legal Enquiries</p>
          <p className="text-sm leading-7" style={{ color: 'var(--text-muted)' }}>
            booking@tranzitta.africa<br />
            Lagos, Nigeria<br />
            Company registration details available on request<br />
            We respond to all enquiries within 30 calendar days
          </p>
        </motion.div>
        <Para delay={0.16}>
          You may also view our{' '}
          <Link href="/privacy" className="font-bold hover:underline" style={{ color: 'var(--orange-deep)' }}>
            Privacy Policy
          </Link>{' '}
          for information on how we handle your personal data.
        </Para>
      </Section>

      {/* ── CTA BAND ── */}
      <section className="gradient-frame py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.p {...fade(0)} className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em]" style={{ color: 'var(--orange-deep)' }}>
            ANY QUESTIONS?
          </motion.p>
          <motion.h2 {...fade(0.06)} className="mb-4 text-3xl font-black md:text-4xl" style={{ color: 'var(--text-main)' }}>
            We are always available<br />
            <span style={{ color: 'var(--africa-green)' }}>to clarify.</span>
          </motion.h2>
          <motion.p {...fade(0.12)} className="mx-auto mb-12 max-w-md text-base leading-8" style={{ color: 'var(--text-muted)' }}>
            If anything in these terms is unclear or you would like to discuss your rights and obligations, reach out directly and we will respond personally.
          </motion.p>

          <motion.div {...fade(0.16)} className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Mail, label: 'Email', sub: 'booking@tranzitta.africa', href: 'mailto:booking@tranzitta.africa' },
              { icon: MessageCircle, label: 'WhatsApp', sub: 'Chat with us instantly', href: '#contact' },
              { icon: Phone, label: 'Call Us', sub: 'Speak to our team', href: 'tel:+2349000000000' },
            ].map(({ icon: Icon, label, sub, href }) => (
              <a
                key={label}
                href={href}
                className="flex flex-col items-center gap-3 rounded-2xl border p-7 transition hover:-translate-y-1"
                style={{ borderColor: 'var(--sage-border)', background: 'var(--warm-white)' }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: '#F1F6EA' }}>
                  <Icon size={22} style={{ color: 'var(--africa-green)' }} />
                </span>
                <span className="text-sm font-extrabold" style={{ color: 'var(--text-main)' }}>{label}</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{sub}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

    </main>
  )
}
