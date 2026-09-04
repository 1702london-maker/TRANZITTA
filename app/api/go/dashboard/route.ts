import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/server-auth'
import { serverError } from '@/lib/api'

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ['rider', 'parent', 'superadmin'])
  if (!auth.ok) return auth.response

  const { data: trips, error } = await auth.db
    .from('trips')
    .select(`
      id,
      tier,
      status,
      pickup_address,
      dropoff_address,
      estimated_fare,
      controlled_fare,
      total_fare,
      surge_multiplier,
      payment_method,
      payment_status,
      driver_payment_method,
      driver_payment_status,
      traffic_duration_seconds,
      distance_meters,
      requested_at,
      pickup_at,
      dropoff_at,
      rider_verified_driver,
      driver_verified_rider,
      driver:driver_id(
        id,
        rating,
        vehicle:vehicle_id(plate_number, make, model, colour, vehicle_class),
        user:id(full_name, phone)
      )
    `)
    .eq('rider_id', auth.context.userId)
    .order('requested_at', { ascending: false })
    .limit(25)

  if (error) {
    console.error('go dashboard error:', error)
    return serverError('Failed to load Go dashboard')
  }

  return NextResponse.json({
    profile: auth.context.profile,
    activeTrip: trips?.find((trip) => !['completed', 'cancelled'].includes(trip.status)) ?? null,
    trips: trips ?? [],
  })
}
