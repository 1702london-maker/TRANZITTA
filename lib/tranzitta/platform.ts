import {
  AlertTriangle,
  Building2,
  Bus,
  Car,
  GraduationCap,
  Landmark,
  MapPin,
  Plane,
  ShieldCheck,
  Siren,
  Users,
} from 'lucide-react'

export type VerticalId = 'go' | 'school' | 'corporate' | 'events' | 'airport'

export const verticals = [
  {
    id: 'go',
    name: 'Tranzitta Go',
    eyebrow: 'Everyday safe rides',
    href: '/go',
    loginHref: '/go/login',
    cta: 'Book a Ride',
    accent: '#D96B1F',
    bg: 'var(--orange-blush)',
    icon: Car,
    summary: 'On-demand city rides with vetted drivers, live GPS, panic response, voice search and cash/card payment.',
    metrics: ['5 km driver match radius', '10 sec GPS snapshots', '15% driver commission'],
  },
  {
    id: 'school',
    name: 'Tranzitta School',
    eyebrow: 'Parent-tracked school runs',
    href: '/school',
    loginHref: '/school/login',
    cta: 'Enrol a Child',
    accent: '#1F6B46',
    bg: 'var(--sage-light)',
    icon: GraduationCap,
    summary: 'Dedicated term-time drivers, parent tracking, monthly billing and late-readiness excess charging.',
    metrics: ['AM and PM trips', 'Dedicated driver', 'Monthly billing'],
  },
  {
    id: 'corporate',
    name: 'Tranzitta Corporate',
    eyebrow: 'Staff shuttle command',
    href: '/corporate',
    loginHref: '/corporate/login',
    cta: 'Get a Quote',
    accent: '#183024',
    bg: '#EDF5E5',
    icon: Building2,
    summary: 'Company shuttle dashboards with staff zones, AM/PM bookings, live tracking and invoice workflows.',
    metrics: ['Hourly AM/PM rates', 'Staff zones', 'Monthly invoices'],
  },
  {
    id: 'events',
    name: 'Tranzitta Events',
    eyebrow: 'Occasion transport',
    href: '/events',
    loginHref: '/events/login',
    cta: 'Submit Enquiry',
    accent: '#7C3AED',
    bg: '#F5F3FF',
    icon: Bus,
    summary: 'Bespoke event movement using sedans, SUVs, minibuses and full buses with deposit and balance billing.',
    metrics: ['30% deposit', 'Buses available', 'Live fleet view'],
  },
  {
    id: 'airport',
    name: 'Tranzitta Airport',
    eyebrow: 'Airport pickup and dropoff',
    href: '/airport',
    loginHref: '/airport/login',
    cta: 'Book Airport Transfer',
    accent: '#0369A1',
    bg: '#F0F9FF',
    icon: Plane,
    summary: 'Fixed-fare Lagos airport transfers with flight details, meet-and-greet, terminal handling and driver tracking.',
    metrics: ['Arrivals and departures', 'Meet and greet', 'Fixed fare'],
  },
] as const

export const opsTabs = [
  { id: 'live', label: 'Live Map', icon: MapPin, badge: null },
  { id: 'panic', label: 'Panic Alerts', icon: Siren, badge: 2 },
  { id: 'drivers', label: 'Driver Queue', icon: ShieldCheck, badge: 8 },
  { id: 'school', label: 'School Queue', icon: GraduationCap, badge: 5 },
  { id: 'corporate', label: 'Corporate', icon: Building2, badge: 3 },
  { id: 'events', label: 'Events', icon: Bus, badge: 4 },
  { id: 'airport', label: 'Airport', icon: Plane, badge: 6 },
  { id: 'compliance', label: 'Compliance', icon: Landmark, badge: null },
  { id: 'surge', label: 'Surge Zones', icon: AlertTriangle, badge: 3 },
  { id: 'support', label: 'Call Centre', icon: Users, badge: 12 },
] as const

export type OpsTab = (typeof opsTabs)[number]['id']

export const opsStats = [
  { label: 'Online Drivers', value: '47', delta: '+12%', accent: '#1F6B46' },
  { label: 'Active Trips', value: '23', delta: '5 verticals', accent: '#D96B1F' },
  { label: 'Panic Alerts', value: '2', delta: '1 unacknowledged', accent: '#DC2626' },
  { label: 'Pending Vetting', value: '8', delta: 'Docs waiting', accent: '#7C3AED' },
  { label: 'Airport Today', value: '19', delta: '7 arrivals', accent: '#0369A1' },
  { label: 'Compliance', value: 'Pending', delta: 'Lagos daily API', accent: '#183024' },
] as const

export const safetyStack = [
  'Police clearance and NIN verification',
  'Home address confirmation before approval',
  'Vehicle inspection and camera installation',
  'Panic alert routing to ops, contacts and police',
  'PostGIS location snapshots and live tracking',
  'Lagos State aggregate compliance reporting',
] as const
