import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/server-auth'
import { serverError } from '@/lib/api'

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ['driver', 'ops', 'superadmin'])
  if (!auth.ok) return auth.response

  const { data: driver, error: driverError } = await auth.db
    .from('drivers')
    .select('id,status,subscription_status,subscription_tier,subscription_expires_at,rating,total_trips,last_location_at,verticals,vehicle:vehicle_id(plate_number,make,model,colour,vehicle_class,seats)')
    .eq('id', auth.context.userId)
    .maybeSingle()

  if (driverError) {
    console.error('driver load error:', driverError)
    return serverError('Failed to load driver profile')
  }

  const { data: trips, error: tripsError } = await auth.db
    .from('trips')
    .select('id,tier,status,pickup_address,dropoff_address,estimated_fare,controlled_fare,total_fare,payment_status,driver_payment_status,driver_payment_method,requested_at,pickup_at,dropoff_at,rider_verified_driver,driver_verified_rider,contact_name,contact_phone')
    .eq('driver_id', auth.context.userId)
    .order('requested_at', { ascending: false })
    .limit(30)

  if (tripsError) {
    console.error('driver trips error:', tripsError)
    return serverError('Failed to load driver trips')
  }

  const completedToday = (trips ?? []).filter((trip) => {
    if (trip.status !== 'completed') return false
    const completedAt = trip.dropoff_at ? new Date(trip.dropoff_at) : null
    return completedAt?.toDateString() === new Date().toDateString()
  })
  const todayGross = completedToday.reduce((sum, trip) => sum + Number(trip.total_fare ?? trip.controlled_fare ?? trip.estimated_fare ?? 0), 0)

  return NextResponse.json({
    profile: auth.context.profile,
    driver,
    activeTrip: trips?.find((trip) => !['completed', 'cancelled'].includes(trip.status)) ?? null,
    trips: trips ?? [],
    earnings: {
      completed_today: completedToday.length,
      today_gross: todayGross,
      today_net: todayGross,
      driver_share_rate: 1,
    },
  })
}
