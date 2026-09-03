import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    direction, terminal, flight_number, flight_date, flight_time, airline,
    destination_zone, destination_address, pickup_address,
    luggage_count, meet_greet, vehicle_type, passengers,
    special_requirements, contact_name, contact_phone, contact_email,
  } = body

  if (!direction || !terminal || !flight_number || !flight_date || !contact_name || !contact_phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (!destination_zone || !destination_address) {
    return NextResponse.json({ error: 'Destination zone and address required' }, { status: 400 })
  }

  const db = supabaseAdmin()

  const scheduled_flight_time = flight_date && flight_time
    ? `${flight_date}T${flight_time}:00`
    : null

  const { data, error } = await db.from('airport_bookings').insert({
    direction,
    terminal,
    flight_number: flight_number.trim().toUpperCase(),
    airline: airline || null,
    scheduled_flight_time,
    destination_zone,
    destination_address,
    pickup_address: direction === 'departure' ? (pickup_address || null) : null,
    luggage_count: parseInt(luggage_count) || 1,
    meet_greet_preference: meet_greet,
    vehicle_type: vehicle_type || null,
    passenger_count: parseInt(passengers) || 1,
    special_requirements: special_requirements || null,
    contact_name,
    contact_phone,
    contact_email: contact_email || null,
    status: 'booked',
    payment_status: 'pending',
    flight_status: 'on_time',
  }).select('id').single()

  if (error) {
    console.error('airport_bookings insert error:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }

  void db.from('notifications').insert({
    user_id: null,
    type: 'airport_booking',
    title: 'New Airport Transfer Booking',
    body: `${flight_number} (${direction}) — ${contact_name} · ${contact_phone} — ${destination_zone}`,
    data: {
      booking_id: data.id,
      flight_number,
      direction,
      terminal,
      destination_zone,
      contact_phone,
      contact_email,
    },
  })

  return NextResponse.json({ success: true, id: data.id })
}
