import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import { asInt, asNumber, asString, readJson, requireFields, serverError } from '@/lib/api'

export async function POST(req: NextRequest) {
  const parsed = await readJson<Record<string, unknown>>(req)
  if (!parsed.ok) return parsed.response

  const body = parsed.data
  const required = requireFields(body, ['event_name', 'event_type', 'event_date', 'pickup_address', 'dropoff_address', 'contact_name', 'contact_phone'])
  if (required) return required.response

  const eventDate = asString(body.event_date)
  const startTime = asString(body.start_time, '00:00') || '00:00'

  const db = supabaseAdmin()

  const { data, error } = await db.from('event_bookings').insert({
    event_name: asString(body.event_name),
    event_type: asString(body.event_type),
    event_date: eventDate,
    agreed_start_time: `${eventDate}T${startTime}:00`,
    estimated_hours: asNumber(body.estimated_hours),
    passenger_count: asInt(body.passenger_count, 0) || null,
    vehicle_type: asString(body.vehicle_type) || null,
    pickup_address: asString(body.pickup_address),
    dropoff_address: asString(body.dropoff_address),
    contact_name: asString(body.contact_name),
    contact_phone: asString(body.contact_phone),
    contact_email: asString(body.contact_email) || null,
    special_requirements: asString(body.special_requirements) || null,
    status: 'enquiry',
  }).select('id').single()

  if (error) {
    console.error('event_bookings insert error:', error)
    return serverError('Failed to save enquiry')
  }

  void db.from('notifications').insert({
    user_id: null,
    type: 'event_enquiry',
    title: 'New Events Enquiry',
    body: `${asString(body.event_name)} (${asString(body.event_type)}) — ${asString(body.contact_name)} · ${asString(body.contact_phone)} — ${eventDate}`,
    data: { enquiry_id: data.id, contact_phone: asString(body.contact_phone), contact_email: asString(body.contact_email) },
  })

  return NextResponse.json({ success: true, id: data.id })
}
