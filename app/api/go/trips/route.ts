import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import { asInt, asNumber, asString, readJson, requireFields, serverError } from '@/lib/api'
import { requireAuth } from '@/lib/server-auth'

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req, ['rider', 'superadmin'])
  if (!auth.ok) return auth.response

  const parsed = await readJson<Record<string, unknown>>(req)
  if (!parsed.ok) return parsed.response

  const body = parsed.data
  const required = requireFields(body, ['tier', 'pickup_address', 'dropoff_address', 'payment_method', 'contact_name', 'contact_phone'])
  if (required) return required.response

  const tier = asString(body.tier)
  const paymentMethod = asString(body.payment_method)

  if (!['go', 'executive'].includes(tier)) {
    return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
  }
  if (!['cash', 'bank_transfer', 'driver_account', 'card_hold'].includes(paymentMethod)) {
    return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 })
  }

  const db = supabaseAdmin()

  const { data, error } = await db.from('trips').insert({
    rider_id: auth.context.userId,
    tier,
    pickup_address: asString(body.pickup_address),
    dropoff_address: asString(body.dropoff_address),
    estimated_fare: asNumber(body.estimated_fare),
    controlled_fare: asNumber(body.controlled_fare, asNumber(body.estimated_fare)),
    fare_provider: asString(body.fare_provider) || 'tranzitta_seeded_lagos',
    traffic_duration_seconds: asInt(body.traffic_duration_seconds, 0) || null,
    distance_meters: asInt(body.distance_meters, 0) || null,
    surge_multiplier: asNumber(body.surge_multiplier, 1),
    payment_method: paymentMethod,
    driver_payment_method: paymentMethod === 'card_hold' ? 'bank_transfer' : paymentMethod,
    driver_payment_status: 'pending',
    driver_keeps_full_fare: true,
    repeat_driver_blocked: true,
    passenger_count: asInt(body.passengers, 1),
    special_requirements: asString(body.special_requirements) || null,
    contact_name: asString(body.contact_name),
    contact_phone: asString(body.contact_phone),
    status: 'requested',
    payment_status: 'pending',
    rider_verified_driver: false,
    driver_verified_rider: false,
    panic_triggered: false,
  }).select('id').single()

  if (error) {
    console.error('trips insert error:', error)
    return serverError('Failed to create trip')
  }

  void db.from('notifications').insert({
    user_id: null,
    type: tier === 'executive' ? 'executive_trip_request' : 'go_trip_request',
    title: `New ${tier === 'executive' ? 'Executive' : 'Go'} Trip`,
    body: `${asString(body.pickup_address)} → ${asString(body.dropoff_address)} — ${asString(body.contact_name)} · ${asString(body.contact_phone)}`,
    data: {
      trip_id: data.id,
      tier,
      payment_method: paymentMethod,
      controlled_fare: asNumber(body.controlled_fare, asNumber(body.estimated_fare)),
      contact_phone: asString(body.contact_phone),
      driver_keeps_full_fare: true,
      repeat_driver_blocked: true,
    },
  })

  return NextResponse.json({ success: true, id: data.id })
}
