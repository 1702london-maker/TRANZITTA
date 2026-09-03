import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/server-auth'
import { serverError } from '@/lib/api'

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ['corporate_admin', 'ops', 'superadmin'])
  if (!auth.ok) return auth.response

  const { data: client, error: clientError } = await auth.db
    .from('corporate_clients')
    .select('id,company_name,rc_number,industry,address,city,staff_count,contact_name,contact_email,contact_phone,status,hourly_rate_am,hourly_rate_pm,excess_rate,surge_applicable,created_at')
    .eq('admin_user_id', auth.context.userId)
    .maybeSingle()

  if (clientError) {
    console.error('corporate client error:', clientError)
    return serverError('Failed to load corporate profile')
  }

  const [{ data: staff, error: staffError }, { data: bookings, error: bookingsError }] = await Promise.all([
    client
      ? auth.db.from('corporate_staff').select('id,staff_name,home_address,pickup_zone,shift,is_active').eq('corporate_id', client.id).order('staff_name')
      : Promise.resolve({ data: [], error: null }),
    client
      ? auth.db.from('corporate_bookings').select('id,shift,status,scheduled_start,scheduled_end,actual_start,actual_end,hours_booked,hours_used,excess_hours,base_charge,excess_charge,total_charge,surge_multiplier,panic_triggered').eq('corporate_id', client.id).order('scheduled_start', { ascending: false }).limit(30)
      : Promise.resolve({ data: [], error: null }),
  ])

  if (staffError || bookingsError) {
    console.error('corporate dashboard error:', staffError || bookingsError)
    return serverError('Failed to load corporate dashboard')
  }

  const activeBookings = (bookings ?? []).filter((booking) => !['completed', 'cancelled'].includes(booking.status))
  const excessTotal = (bookings ?? []).reduce((sum, booking) => sum + Number(booking.excess_charge ?? 0), 0)
  const invoiceTotal = (bookings ?? []).reduce((sum, booking) => sum + Number(booking.total_charge ?? 0), 0)

  return NextResponse.json({
    profile: auth.context.profile,
    client,
    staff: staff ?? [],
    bookings: bookings ?? [],
    activeBookings,
    totals: {
      active_staff: (staff ?? []).filter((person) => person.is_active).length,
      active_bookings: activeBookings.length,
      excess_total: excessTotal,
      invoice_total: invoiceTotal,
    },
  })
}
