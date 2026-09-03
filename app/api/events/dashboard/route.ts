import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/server-auth'
import { serverError } from '@/lib/api'

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ['events_client', 'ops', 'superadmin'])
  if (!auth.ok) return auth.response

  const { data: bookings, error } = await auth.db
    .from('event_bookings')
    .select('id,event_name,event_type,event_date,agreed_start_time,estimated_hours,passenger_count,vehicles_required,vehicle_type,pickup_address,dropoff_address,contact_name,contact_phone,contact_email,quoted_rate_per_hour,total_quote,deposit_amount,deposit_paid,status,assigned_drivers,created_at')
    .eq('client_id', auth.context.userId)
    .order('event_date', { ascending: false })
    .limit(40)

  if (error) {
    console.error('events dashboard error:', error)
    return serverError('Failed to load events dashboard')
  }

  const activeBookings = (bookings ?? []).filter((booking) => !['completed', 'cancelled'].includes(booking.status))
  const depositDue = (bookings ?? []).reduce((sum, booking) => {
    if (booking.deposit_paid) return sum
    return sum + Number(booking.deposit_amount ?? 0)
  }, 0)

  return NextResponse.json({
    profile: auth.context.profile,
    bookings: bookings ?? [],
    activeBookings,
    totals: {
      active_bookings: activeBookings.length,
      confirmed: (bookings ?? []).filter((booking) => booking.status === 'confirmed').length,
      deposit_due: depositDue,
    },
  })
}
