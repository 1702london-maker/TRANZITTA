import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import { asInt, asString, readJson, requireFields, serverError } from '@/lib/api'

export async function POST(req: NextRequest) {
  const parsed = await readJson<Record<string, unknown>>(req)
  if (!parsed.ok) return parsed.response

  const body = parsed.data
  const required = requireFields(body, ['direction', 'terminal', 'flight_number', 'flight_date', 'contact_name', 'contact_phone', 'destination_zone', 'destination_address'])
  if (required) return required.response

  const direction = asString(body.direction)
  const flightNumber = asString(body.flight_number).toUpperCase()
  const flightDate = asString(body.flight_date)
  const flightTime = asString(body.flight_time)

  const db = supabaseAdmin()

  const scheduled_flight_time = flightDate && flightTime
    ? `${flightDate}T${flightTime}:00`
    : null

  const { data, error } = await db.from('airport_bookings').insert({
    direction,
    terminal: asString(body.terminal),
    flight_number: flightNumber,
    airline: asString(body.airline) || null,
    scheduled_flight_time,
    destination_zone: asString(body.destination_zone),
    destination_address: asString(body.destination_address),
    pickup_address: direction === 'departure' ? (asString(body.pickup_address) || null) : null,
    luggage_count: asInt(body.luggage_count, 1),
    meet_greet_preference: Boolean(body.meet_greet),
    vehicle_type: asString(body.vehicle_type) || null,
    passenger_count: asInt(body.passengers, 1),
    special_requirements: asString(body.special_requirements) || null,
    contact_name: asString(body.contact_name),
    contact_phone: asString(body.contact_phone),
    contact_email: asString(body.contact_email) || null,
    status: 'booked',
    payment_status: 'pending',
    flight_status: 'on_time',
  }).select('id').single()

  if (error) {
    console.error('airport_bookings insert error:', error)
    return serverError('Failed to create booking')
  }

  void db.from('notifications').insert({
    user_id: null,
    type: 'airport_booking',
    title: 'New Airport Transfer Booking',
    body: `${flightNumber} (${direction}) — ${asString(body.contact_name)} · ${asString(body.contact_phone)} — ${asString(body.destination_zone)}`,
    data: {
      booking_id: data.id,
      flight_number: flightNumber,
      direction,
      terminal: asString(body.terminal),
      destination_zone: asString(body.destination_zone),
      contact_phone: asString(body.contact_phone),
      contact_email: asString(body.contact_email),
    },
  })

  return NextResponse.json({ success: true, id: data.id })
}
