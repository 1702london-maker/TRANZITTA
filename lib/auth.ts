export type UserRole = 'rider' | 'driver' | 'parent' | 'corporate_admin' | 'events_client' | 'ops' | 'superadmin'

export type PortalKey = 'go' | 'school' | 'corporate' | 'events' | 'airport' | 'driver' | 'ops'
export type PortalIcon = 'car' | 'school-bus' | 'building' | 'party' | 'plane' | 'driver' | 'shield'

export const portalConfig: Record<PortalKey, {
  title: string
  subtitle: string
  role: UserRole
  vertical: 'go' | 'school' | 'corporate' | 'events' | 'airport' | 'all'
  icon: PortalIcon
  accent: string
  loginPath: string
  dashboardPath: string
  allowSignup: boolean
}> = {
  go: {
    title: 'Tranzitta Go',
    subtitle: 'Book rides, track drivers and manage your account.',
    role: 'rider',
    vertical: 'go',
    icon: 'car',
    accent: 'var(--orange-deep)',
    loginPath: '/go/login',
    dashboardPath: '/go/dashboard',
    allowSignup: true,
  },
  school: {
    title: 'Tranzitta School',
    subtitle: 'Parent access for school transport and live child tracking.',
    role: 'parent',
    vertical: 'school',
    icon: 'school-bus',
    accent: 'var(--africa-green)',
    loginPath: '/school/login',
    dashboardPath: '/school/dashboard',
    allowSignup: true,
  },
  corporate: {
    title: 'Tranzitta Corporate',
    subtitle: 'Company admin access for staff shuttles and invoices.',
    role: 'corporate_admin',
    vertical: 'corporate',
    icon: 'building',
    accent: 'var(--text-main)',
    loginPath: '/corporate/login',
    dashboardPath: '/corporate/dashboard',
    allowSignup: true,
  },
  events: {
    title: 'Tranzitta Events',
    subtitle: 'Client access for quotes, deposits and event fleet tracking.',
    role: 'events_client',
    vertical: 'events',
    icon: 'party',
    accent: '#7C3AED',
    loginPath: '/events/login',
    dashboardPath: '/events/dashboard',
    allowSignup: true,
  },
  airport: {
    title: 'Tranzitta Airport',
    subtitle: 'Airport transfer access for bookings and driver tracking.',
    role: 'rider',
    vertical: 'airport',
    icon: 'plane',
    accent: '#0369A1',
    loginPath: '/airport/login',
    dashboardPath: '/airport/dashboard',
    allowSignup: true,
  },
  driver: {
    title: 'Tranzitta Driver',
    subtitle: 'Driver partner access for jobs, trips and verification.',
    role: 'driver',
    vertical: 'all',
    icon: 'driver',
    accent: 'var(--africa-green)',
    loginPath: '/driver/login',
    dashboardPath: '/driver/dashboard',
    allowSignup: true,
  },
  ops: {
    title: 'Tranzitta Ops',
    subtitle: 'Internal operations dashboard for authorised staff only.',
    role: 'ops',
    vertical: 'all',
    icon: 'shield',
    accent: 'var(--orange-deep)',
    loginPath: '/ops',
    dashboardPath: '/ops/dashboard',
    allowSignup: false,
  },
}

export const protectedRoutes: Array<{ prefix: string; portal: PortalKey; roles: UserRole[] }> = [
  { prefix: '/go/dashboard', portal: 'go', roles: ['rider', 'superadmin'] },
  { prefix: '/go/track', portal: 'go', roles: ['rider', 'driver', 'ops', 'superadmin'] },
  { prefix: '/school/dashboard', portal: 'school', roles: ['parent', 'ops', 'superadmin'] },
  { prefix: '/school/track', portal: 'school', roles: ['parent', 'driver', 'ops', 'superadmin'] },
  { prefix: '/corporate/dashboard', portal: 'corporate', roles: ['corporate_admin', 'ops', 'superadmin'] },
  { prefix: '/events/dashboard', portal: 'events', roles: ['events_client', 'ops', 'superadmin'] },
  { prefix: '/airport/dashboard', portal: 'airport', roles: ['rider', 'ops', 'superadmin'] },
  { prefix: '/driver/dashboard', portal: 'driver', roles: ['driver', 'ops', 'superadmin'] },
  { prefix: '/ops/dashboard', portal: 'ops', roles: ['ops', 'superadmin'] },
]
