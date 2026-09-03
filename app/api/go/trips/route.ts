import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import { asInt, asNumber, asString, readJson, requireFields, serverError } from '@/lib/api'

export async function POST(req: NextRequest) {
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
  if (!['card_hold', 'bank_transfer'].includes(paymentMethod)) {
    return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 })
  }

  const db = supabaseAdmin()

  const { data, error } = await db.from('trips').insert({
    tier,
    pickup_address: asString(body.pickup_address),
    dropoff_address: asString(body.dropoff_address),
    estimated_fare: asNumber(body.estimated_fare),
    surge_multiplier: asNumber(body.surge_multiplier, 1),
    payment_method: paymentMethod,
    passenger_count: asInt(body.passengers, 1),
    special_requirements: asString(body.special_requirements) || null,
    contact_name: asString(body.contact_name),
    contact_phone: asString(body.contact_phone),
    status: 'requested',
    payment_status: paymentMethod === 'card_hold' ? 'holding' : 'transfer_pending',
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
      estimated_fare: asNumber(body.estimated_fare),
      contact_phone: asString(body.contact_phone),
    },
  })

  return NextResponse.json({ success: true, id: data.id })
}
