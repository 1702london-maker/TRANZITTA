import { NextRequest, NextResponse } from 'next/server'
import { asNumber, asString, readJson, requireFields, serverError } from '@/lib/api'
import { requireAuth } from '@/lib/server-auth'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuth(req, ['rider', 'driver', 'ops', 'superadmin'])
  if (!auth.ok) return auth.response

  const parsed = await readJson<Record<string, unknown>>(req)
  if (!parsed.ok) return parsed.response

  const required = requireFields(parsed.data, ['actor', 'method', 'amount'])
  if (required) return required.response

  const actor = asString(parsed.data.actor)
  const method = asString(parsed.data.method)
  const amount = asNumber(parsed.data.amount)

  if (!['rider', 'driver'].includes(actor)) {
    return NextResponse.json({ error: 'Invalid payment confirmation actor' }, { status: 400 })
  }
  if (!['cash', 'bank_transfer', 'driver_account'].includes(method)) {
    return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 })
  }
  if (amount === null || amount < 0) {
    return NextResponse.json({ error: 'Invalid payment amount' }, { status: 400 })
  }

  const { data: trip, error: tripError } = await auth.db
    .from('trips')
    .select('id,rider_id,driver_id,controlled_fare,estimated_fare,driver_payment_status')
    .eq('id', params.id)
    .maybeSingle()

  if (tripError) {
    console.error('payment trip load error:', tripError)
    return serverError('Failed to load trip')
  }
  if (!trip) return NextResponse.json({ error: 'Trip not found' }, { status: 404 })

  const isOps = ['ops', 'superadmin'].includes(auth.context.profile.role)
  const isRider = trip.rider_id === auth.context.userId
  const isDriver = trip.driver_id === auth.context.userId

  if (!isOps && actor === 'rider' && !isRider) {
    return NextResponse.json({ error: 'Only the rider can mark this trip as paid' }, { status: 403 })
  }
  if (!isOps && actor === 'driver' && !isDriver) {
    return NextResponse.json({ error: 'Only the assigned driver can mark this trip as received' }, { status: 403 })
  }

  const existing = await auth.db
    .from('trip_payment_confirmations')
    .select('id,rider_confirmed,driver_confirmed')
    .eq('trip_id', params.id)
    .maybeSingle()

  if (existing.error) {
    console.error('payment confirmation load error:', existing.error)
    return serverError('Failed to load payment confirmation')
  }

  const now = new Date().toISOString()
  const nextConfirmation = {
    trip_id: params.id,
    rider_id: trip.rider_id,
    driver_id: trip.driver_id,
    method,
    amount_naira: amount,
    rider_confirmed: actor === 'rider' ? true : Boolean(existing.data?.rider_confirmed),
    driver_confirmed: actor === 'driver' ? true : Boolean(existing.data?.driver_confirmed),
    rider_confirmed_at: actor === 'rider' ? now : undefined,
    driver_confirmed_at: actor === 'driver' ? now : undefined,
    updated_at: now,
  }
  const bothConfirmed = nextConfirmation.rider_confirmed && nextConfirmation.driver_confirmed

  const upserted = await auth.db
    .from('trip_payment_confirmations')
    .upsert({
      ...nextConfirmation,
      status: bothConfirmed ? 'confirmed' : actor === 'rider' ? 'rider_marked_paid' : 'driver_marked_received',
    }, { onConflict: 'trip_id' })
    .select('id,status,rider_confirmed,driver_confirmed')
    .single()

  if (upserted.error) {
    console.error('payment confirmation upsert error:', upserted.error)
    return serverError('Failed to save payment confirmation')
  }

  const tripUpdate = await auth.db
    .from('trips')
    .update({
      driver_payment_method: method,
      driver_payment_status: bothConfirmed ? 'confirmed' : actor === 'rider' ? 'rider_marked_paid' : 'driver_marked_received',
      rider_marked_paid_at: actor === 'rider' ? now : undefined,
      driver_marked_received_at: actor === 'driver' ? now : undefined,
      payment_confirmed_at: bothConfirmed ? now : undefined,
    })
    .eq('id', params.id)

  if (tripUpdate.error) {
    console.error('trip payment update error:', tripUpdate.error)
    return serverError('Failed to update trip payment status')
  }

  return NextResponse.json({ success: true, payment: upserted.data })
}
