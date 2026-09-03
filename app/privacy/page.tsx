'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ShieldCheck, Mail, MessageCircle, Phone } from 'lucide-react'

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

function RightItem({ label, body }: { label: string; body: string }) {
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
export default function PrivacyPage() {
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
            <span style={{ color: 'var(--text-main)' }}>Privacy</span>{' '}
            <span style={{ color: 'var(--orange-deep)' }}>Policy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}
            className="mb-10 max-w-xl text-lg leading-8"
            style={{ color: 'var(--text-muted)' }}
          >
            Tranzitta is committed to handling your personal information with care, transparency and respect. This policy explains what we collect, why we collect it and how it is used.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { label: 'Last updated: 1 January 2025' },
              { label: 'Jurisdiction: Federal Republic of Nigeria' },
              { label: 'NDPR Compliant' },
            ].map((tag) => (
              <span
                key={tag.label}
                className="rounded-full px-4 py-2 text-xs font-bold"
                style={{ background: '#F1F6EA', color: 'var(--text-main)', border: '1px solid var(--sage-border)' }}
              >
                {tag.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── SECTION 01 — Who We Are ── */}
      <Section>
        <SectionTag n="01" />
        <SectionTitle>Who We Are</SectionTitle>
        <Para>
          Tranzitta ("Tranzitta", "we", "us" or "our") is a Nigerian mobility platform providing safe, structured transport services across the Go, School, Corporate, Events and Airport verticals. We are registered and operating within the Federal Republic of Nigeria, in compliance with the Nigeria Data Protection Regulation (NDPR) issued by the National Information Technology Development Agency (NITDA).
        </Para>
        <Para>
          Tranzitta acts as the data controller for all personal information collected through our website, mobile application, booking system, enquiry forms and direct communications. For all privacy-related correspondence, please contact us using the details provided at the end of this document.
        </Para>
      </Section>

      <Divider />

      {/* ── SECTION 02 — Information We Collect ── */}
      <Section alt>
        <SectionTag n="02" />
        <SectionTitle>Information We Collect</SectionTitle>
        <Para>We collect personal information in the following ways:</Para>

        <motion.p {...fade(0.08)} className="mb-2 text-sm font-extrabold uppercase tracking-widest" style={{ color: 'var(--text-main)' }}>
          Information you provide directly
        </motion.p>
        <BulletList items={[
          'Full name, phone number and email address submitted via our booking or contact forms',
          'Home or office pickup address and destination details provided when booking a ride',
          'School or corporate account details including staff count, shift preferences and route information',
          'Event booking details including passenger count, pickup location and event date',
          'Airport transfer details including flight number, terminal and arrival or departure time',
          'Payment information processed via Paystack — we do not store card details directly',
          'Communications sent to us via email, WhatsApp or the in-app support channel',
          'Driver application details including name, vehicle details, licence number and guarantor information',
        ]} />

        <motion.p {...fade(0.1)} className="mb-2 mt-6 text-sm font-extrabold uppercase tracking-widest" style={{ color: 'var(--text-main)' }}>
          Information collected automatically
        </motion.p>
        <BulletList delay={0.14} items={[
          'Real-time GPS location during active trips for safety, routing and tracking purposes',
          'Trip history including pickup and drop-off locations, timestamps and fare details',
          'Device type, operating system and app version when using the Tranzitta application',
          'IP address and approximate geographic location when visiting our website',
          'Telematics data from driver devices including speed, braking and route adherence',
          'In-app camera activity verified through our liveness re-check system',
          'Cookie and session data as described in Section 08',
        ]} />
      </Section>

      <Divider />

      {/* ── SECTION 03 — How We Use Your Information ── */}
      <Section>
        <SectionTag n="03" />
        <SectionTitle>How We Use Your Information</SectionTitle>
        <Para>
          Personal information collected by Tranzitta is used only for the purposes for which it was provided and for legitimate transport operations. Specifically, we use your information to:
        </Para>
        <BulletList items={[
          'Book, confirm and manage your ride across all five transport verticals',
          'Provide real-time trip tracking to passengers, parents and corporate administrators',
          'Verify driver identity and ensure only vetted, approved drivers operate on the platform',
          'Process payments securely via Paystack and generate invoices for corporate clients',
          'Operate our panic button and emergency response system in the event of an incident',
          'Send booking confirmations, trip receipts and operational notifications via SMS or in-app',
          'Respond to customer support enquiries and resolve disputes',
          'Improve the safety, reliability and quality of the Tranzitta platform',
          'Comply with legal, regulatory and contractual obligations',
        ]} />
        <Para delay={0.18}>
          We do not sell, rent or trade personal information to any third party for marketing purposes. Your data is never used commercially beyond delivering the transport services you have requested.
        </Para>
      </Section>

      <Divider />

      {/* ── SECTION 04 — Legal Basis ── */}
      <Section alt>
        <SectionTag n="04" />
        <SectionTitle>Legal Basis for Processing</SectionTitle>
        <Para>
          Under the Nigeria Data Protection Regulation (NDPR), we are required to identify a lawful basis for processing your personal data. Depending on the nature of your interaction with Tranzitta, we rely on the following legal bases:
        </Para>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { label: 'Contract', body: 'Processing necessary to fulfil the transport service you have booked or to take steps at your request prior to booking.' },
            { label: 'Legitimate Interests', body: 'Processing required for our genuine operational interests — such as driver vetting, route optimisation, and safety monitoring — where those interests are not overridden by your rights.' },
            { label: 'Consent', body: 'Where you have actively opted in — for example, to receive promotional communications or marketing updates. You may withdraw consent at any time.' },
            { label: 'Legal Obligation', body: 'Where we are required to process or retain data to comply with applicable Nigerian law or regulatory direction from NITDA or other competent authorities.' },
          ].map((item) => (
            <RightItem key={item.label} label={item.label} body={item.body} />
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── SECTION 05 — Data Sharing ── */}
      <Section>
        <SectionTag n="05" />
        <SectionTitle>Data Sharing and Disclosure</SectionTitle>
        <Para>
          Tranzitta does not share personal data with third parties except in the following limited circumstances:
        </Para>
        <BulletList items={[
          'Drivers: Passenger name, pickup location and destination are shared with the assigned driver solely to complete your journey.',
          'Corporate Administrators: Where you travel under a corporate account, limited trip data — including timing and pickup/drop-off — is shared with the relevant company administrator.',
          'Parents and Guardians: Where a child travels under the School vertical, real-time location and trip status are shared with the registered parent or guardian.',
          'Service Providers: Trusted third-party tools including Paystack for payment processing, mapping services for route computation, and cloud hosting providers. All providers are contractually bound to handle data securely.',
          'Emergency Services: In the event a panic alert is activated, trip data and location may be shared with emergency responders to protect passenger safety.',
          'Legal Requirements: Where disclosure is required by law, court order or regulatory authority including NITDA.',
          'Business Transfers: In the event of a merger, acquisition or sale of assets, personal data may be transferred to the relevant successor entity under equivalent protections.',
        ]} />
      </Section>

      <Divider />

      {/* ── SECTION 06 — Retention ── */}
      <Section alt>
        <SectionTag n="06" />
        <SectionTitle>Data Retention</SectionTitle>
        <Para>
          We retain personal information only for as long as is necessary to fulfil the purposes for which it was collected, or to comply with legal, regulatory or contractual obligations.
        </Para>
        <BulletList items={[
          'Active passenger trip data is retained for 12 months from the date of travel',
          'In-vehicle dashcam footage is retained for 30 days and then permanently deleted',
          'Corporate account and invoicing records are retained for up to 6 years for accounting and legal purposes',
          'Driver application data for unsuccessful applicants is deleted within 6 months of the decision',
          'Marketing consent records are retained until you unsubscribe or withdraw consent',
          'Website analytics data is retained in anonymised or aggregated form only',
        ]} />
        <Para delay={0.18}>
          When data is no longer required, it is securely deleted or anonymised in a manner that prevents re-identification.
        </Para>
      </Section>

      <Divider />

      {/* ── SECTION 07 — Your Rights ── */}
      <Section>
        <SectionTag n="07" />
        <SectionTitle>Your Rights</SectionTitle>
        <Para>
          Under the Nigeria Data Protection Regulation, you have the following rights in relation to your personal information:
        </Para>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { label: 'Right of Access', body: 'To request a copy of the personal data we hold about you.' },
            { label: 'Right to Rectification', body: 'To request correction of inaccurate or incomplete personal data.' },
            { label: 'Right to Erasure', body: 'To request deletion of your personal data where there is no longer a lawful basis for its retention.' },
            { label: 'Right to Restrict Processing', body: 'To request that we limit the use of your data in certain circumstances.' },
            { label: 'Right to Data Portability', body: 'To receive your data in a structured, commonly used and machine-readable format.' },
            { label: 'Right to Object', body: 'To object to processing based on legitimate interests or for direct marketing purposes.' },
          ].map((item) => (
            <RightItem key={item.label} label={item.label} body={item.body} />
          ))}
        </div>
        <Para delay={0.2} >
          To exercise any of these rights, please contact us at{' '}
          <a href="mailto:booking@tranzitta.africa" className="font-bold hover:underline" style={{ color: 'var(--orange-deep)' }}>
            booking@tranzitta.africa
          </a>
          . We will respond within 30 days. You also have the right to lodge a complaint with the National Information Technology Development Agency (NITDA) at{' '}
          <a href="https://nitda.gov.ng" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline" style={{ color: 'var(--orange-deep)' }}>
            nitda.gov.ng
          </a>.
        </Para>
      </Section>

      <Divider />

      {/* ── SECTION 08 — Cookies ── */}
      <Section alt>
        <SectionTag n="08" />
        <SectionTitle>Cookies</SectionTitle>
        <Para>
          Our website uses cookies — small text files placed on your device — to support the proper functioning of the site and to understand how visitors interact with our content.
        </Para>
        <motion.p {...fade(0.08)} className="mb-2 text-sm font-extrabold uppercase tracking-widest" style={{ color: 'var(--text-main)' }}>
          Types of cookies we use
        </motion.p>
        <BulletList items={[
          'Essential cookies: Required for the website to function correctly. These cannot be disabled.',
          'Analytics cookies: Used to understand how visitors navigate the site and where visitors come from. Data collected is aggregated and does not identify individuals.',
          'Preference cookies: Used to remember choices you have made, such as display settings or a remembered booking state.',
        ]} />
        <Para delay={0.18}>
          You may adjust your cookie preferences through your browser settings at any time. Disabling certain cookies may affect the functionality of the website. We do not use cookies to serve targeted advertising.
        </Para>
      </Section>

      <Divider />

      {/* ── SECTION 09 — Third-Party Links ── */}
      <Section>
        <SectionTag n="09" />
        <SectionTitle>Third-Party Links</SectionTitle>
        <Para>
          Our website and app may contain links to external websites and services operated by third parties — including payment processors, mapping providers and partner services. These links are provided for your convenience.
        </Para>
        <Para>
          Tranzitta is not responsible for the privacy practices, content or security of third-party platforms. We encourage you to review the privacy policies of any external sites you visit. The presence of a link does not constitute an endorsement of the linked site or its operators.
        </Para>
      </Section>

      <Divider />

      {/* ── SECTION 10 — Security ── */}
      <Section alt>
        <SectionTag n="10" />
        <SectionTitle>Security</SectionTitle>
        <Para>
          Tranzitta takes the security of personal information seriously. We implement appropriate technical and organisational measures to protect your data against unauthorised access, loss, alteration or disclosure.
        </Para>
        <BulletList items={[
          'All data transmission on our website and app is encrypted using SSL/TLS',
          'Payment information is handled exclusively by Paystack, which is PCI-DSS certified',
          'Real-time GPS data is transmitted over encrypted channels and stored securely',
          'Driver identity verification uses liveness detection and document validation at onboarding',
          'Access to personal data within our organisation is limited to those with a legitimate operational need',
          'We review our security practices regularly and update them as the threat landscape evolves',
        ]} />
        <Para delay={0.18}>
          While we take all reasonable precautions, no method of electronic transmission or storage is entirely secure. We cannot guarantee absolute security but commit to acting promptly in the event of any breach that affects your rights.
        </Para>
      </Section>

      <Divider />

      {/* ── SECTION 11 — Children ── */}
      <Section>
        <SectionTag n="11" />
        <SectionTitle>Children's Privacy</SectionTitle>
        <Para>
          The Tranzitta School vertical is specifically designed to transport children safely under adult supervision structures — including registered parent or guardian accounts, vetted school drivers, and real-time tracking visible to authorised guardians only.
        </Para>
        <Para>
          We do not knowingly collect personal information directly from children under the age of 13. All School vertical accounts are created and managed by a parent, guardian or school administrator. If you believe that a child's personal data has been submitted without appropriate consent, please contact us immediately at{' '}
          <a href="mailto:booking@tranzitta.africa" className="font-bold hover:underline" style={{ color: 'var(--orange-deep)' }}>
            booking@tranzitta.africa
          </a>{' '}
          and we will take prompt steps to remove that information.
        </Para>
      </Section>

      <Divider />

      {/* ── SECTION 12 — Changes ── */}
      <Section alt>
        <SectionTag n="12" />
        <SectionTitle>Changes to This Policy</SectionTitle>
        <Para>
          We may update this Privacy Policy periodically to reflect changes in our practices, legal obligations or the services we provide. When we do so, the revised version will be published on this page with an updated effective date.
        </Para>
        <Para>
          We encourage you to review this policy from time to time. Continued use of our website or app after any update constitutes your acceptance of the revised terms. Where changes are material, we will endeavour to notify registered users directly via SMS or email.
        </Para>
        <Para>
          This policy was last reviewed and updated on 1 January 2025.
        </Para>
      </Section>

      <Divider />

      {/* ── SECTION 13 — Contact ── */}
      <Section>
        <SectionTag n="13" />
        <SectionTitle>Contact Us</SectionTitle>
        <Para>
          If you have any questions about this Privacy Policy, wish to exercise your data rights or have a concern about how your information has been handled, please contact us using the details below. We will respond to all privacy-related enquiries within 30 days.
        </Para>

        <motion.div
          {...fade(0.1)}
          className="mt-4 rounded-2xl border p-6"
          style={{ borderColor: 'var(--sage-border)', background: '#F1F6EA' }}
        >
          <p className="mb-1 text-sm font-extrabold" style={{ color: 'var(--text-main)' }}>Tranzitta Nigeria — Privacy Enquiries</p>
          <p className="text-sm leading-7" style={{ color: 'var(--text-muted)' }}>
            booking@tranzitta.africa<br />
            Lagos, Nigeria<br />
            NDPR compliance details available on request<br />
            We respond to all enquiries within 30 calendar days
          </p>
        </motion.div>
      </Section>

      {/* ── CTA BAND ── */}
      <section className="gradient-frame py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.p
            {...fade(0)}
            className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em]"
            style={{ color: 'var(--orange-deep)' }}
          >
            ANY QUESTIONS?
          </motion.p>
          <motion.h2 {...fade(0.06)} className="mb-4 text-3xl font-black md:text-4xl" style={{ color: 'var(--text-main)' }}>
            We are always available<br />
            <span style={{ color: 'var(--africa-green)' }}>to clarify.</span>
          </motion.h2>
          <motion.p {...fade(0.12)} className="mx-auto mb-12 max-w-md text-base leading-8" style={{ color: 'var(--text-muted)' }}>
            If anything in this policy is unclear or you would like to discuss how your data is handled, reach out directly and we will respond personally.
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
