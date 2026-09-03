# Tranzitta Build Map

Tranzitta is a five-vertical safety-first transport platform for Nigeria. The product expands the Tranzita visual language into a broader ride-hailing operating system while keeping the same premium warmth: orange, cream, sage, Nigerian mobility cues, animated vehicles, safety proof, and trust-led copy.

## Verticals

- Tranzitta Go: public ride-hailing with fare estimates, live driver matching, panic support and Paystack/Flutterwave/cash payment.
- Tranzitta School: parent portal for child enrolment, dedicated school drivers, live parent tracking, monthly billing and excess waiting charges.
- Tranzitta Corporate: company staff shuttle dashboard with AM/PM bookings, staff zones, hourly rates, excess billing and monthly invoices.
- Tranzitta Events: bespoke event transport with sedans, SUVs, minibuses and buses, deposit collection and post-event balance billing.
- Tranzitta Airport: the fifth vertical, covering arrivals and departures, fixed fares, flight details, terminal handling, meet-and-greet and driver tracking.

## Backend Foundation

The Supabase migration in `supabase/migrations/20260902235000_tranzitta_platform_foundation.sql` defines:

- Core auth profile table with roles: rider, driver, parent, corporate_admin, events_client, ops and superadmin.
- PostGIS-backed drivers, trips, surge zones, panic alerts and location snapshots.
- Driver vetting and vehicles, including police report, NIN, home verification, inspection and camera installation fields.
- School, Corporate, Events and Airport booking/payment/enquiry tables.
- Compliance reports for aggregated Lagos State reporting.
- RLS policies that separate users, drivers, parents, corporate admins, event clients, airport clients and ops.
- Private storage buckets for driver documents, vehicle documents, camera footage and invoices.

## External Services

- Supabase project: `tbrxwotiespamwclyehh`
- Maps: Google Maps for UI, PostGIS for matching and zone persistence.
- Payments: Paystack and Flutterwave.
- SMS and panic alerts: Twilio.
- Voice search: OpenAI Whisper.
- Hosting: Vercel.

## Current Implementation Status

- The Next.js route shell exists for all five verticals, Driver and Ops.
- The visual system is already aligned with Tranzita: warm background, orange/sage palette, marquee motion, animated city/vehicle elements and safety-first messaging.
- The Ops dashboard has been upgraded into a premium command centre interface, still using frontend data fixtures until Supabase reads/writes are connected.
- The backend schema has been added as a migration but has not yet been applied to the remote Supabase project in this pass.

## Next Build Steps

1. Apply and verify the Supabase migration against project `tbrxwotiespamwclyehh`.
2. Add environment variables and server/client Supabase helpers for Next.js SSR auth.
3. Implement phone OTP login and role-based routing per vertical.
4. Replace dashboard fixtures with Supabase queries and realtime subscriptions.
5. Add API route handlers for ride requests, driver onboarding, panic alerts, payments, airport transfers and ops actions.
6. Add PWA metadata/service worker coverage for each vertical and the driver app.
