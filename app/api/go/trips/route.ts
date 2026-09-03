import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    tier, pickup_address, dropoff_address, estimated_fare,
    surge_multiplier, payment_method, passengers,
    special_requirements, contact_name, contact_phone,
  } = body

  if (!tier || !pickup_address || !dropoff_address || !payment_method || !contact_name || !contact_phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (!['go', 'executive'].includes(tier)) {
    return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
  }
  if (!['card_hold', 'bank_transfer'].includes(payment_method)) {
    return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 })
  }

  const db = supabaseAdmin()

  const { data, error } = await db.from('trips').insert({
    tier,
    pickup_address,
    dropoff_address,
    estimated_fare: estimated_fare ? parseFloat(estimated_fare) : null,
    surge_multiplier: surge_multiplier ? parseFloat(surge_multiplier) : 1,
    payment_method,
    passenger_count: parseInt(passengers) || 1,
    special_requirements: special_requirements || null,
    contact_name,
    contact_phone,
    status: 'requested',
    payment_status: payment_method === 'card_hold' ? 'holding' : 'transfer_pending',
    rider_verified_driver: false,
    driver_verified_rider: false,
    panic_triggered: false,
  }).select('id').single()

  if (error) {
    console.error('trips insert error:', error)
    return NextResponse.json({ error: 'Failed to create trip' }, { status: 500 })
  }

  void db.from('notifications').insert({
    user_id: null,
    type: tier === 'executive' ? 'executive_trip_request' : 'go_trip_request',
    title: `New ${tier === 'executive' ? 'Executive' : 'Go'} Trip`,
    body: `${pickup_address} → ${dropoff_address} — ${contact_name} · ${contact_phone}`,
    data: {
      trip_id: data.id,
      tier,
      payment_method,
      estimated_fare,
      contact_phone,
    },
  })

  return NextResponse.json({ success: true, id: data.id })
}
