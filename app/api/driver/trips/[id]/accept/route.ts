import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/server-auth'
import { serverError } from '@/lib/api'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuth(req, ['driver', 'superadmin'])
  if (!auth.ok) return auth.response

  const { data: driver, error: driverError } = await auth.db
    .from('drivers')
    .select('subscription_status,subscription_expires_at,status')
    .eq('id', auth.context.userId)
    .maybeSingle()

  if (driverError) {
    console.error('accept driver load error:', driverError)
    return serverError('Failed to verify driver')
  }

  const expiresAt = driver?.subscription_expires_at ? new Date(driver.subscription_expires_at) : null
  const subscriptionActive = driver?.subscription_status === 'active' && (!expiresAt || expiresAt > new Date())
  if (!subscriptionActive) {
    return NextResponse.json({ error: 'Your Tranzitta Go subscription must be active before accepting rides.' }, { status: 403 })
  }

  const { data, error } = await auth.db
    .from('trips')
    .update({
      driver_id: auth.context.userId,
      status: 'matched',
      driver_verified_rider: false,
      rider_verified_driver: false,
    })
    .eq('id', params.id)
    .is('driver_id', null)
    .eq('status', 'requested')
    .select('id,status,driver_id')
    .maybeSingle()

  if (error) {
    console.error('accept trip error:', error)
    return serverError('Failed to accept ride')
  }
  if (!data) return NextResponse.json({ error: 'Ride is no longer available.' }, { status: 409 })

  void auth.db.from('notifications').insert({
    user_id: null,
    type: 'go_trip_matched',
    title: 'Go ride matched',
    body: `Driver ${auth.context.profile.full_name} accepted ride ${params.id.slice(0, 8)}`,
    data: { trip_id: params.id, driver_id: auth.context.userId },
  })

  return NextResponse.json({ success: true, trip: data })
}
