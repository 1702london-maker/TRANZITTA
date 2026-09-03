import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    event_name, event_type, event_date, start_time, estimated_hours,
    passenger_count, vehicle_type, pickup_address, dropoff_address,
    special_requirements, contact_name, contact_phone, contact_email,
  } = body

  if (!event_name || !event_type || !event_date || !pickup_address || !dropoff_address || !contact_name || !contact_phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const db = supabaseAdmin()

  const { data, error } = await db.from('event_bookings').insert({
    event_name,
    event_type,
    event_date,
    agreed_start_time: `${event_date}T${start_time || '00:00'}:00`,
    estimated_hours: parseFloat(estimated_hours) || null,
    passenger_count: parseInt(passenger_count) || null,
    vehicle_type: vehicle_type || null,
    pickup_address,
    dropoff_address,
    special_requirements: special_requirements || null,
    status: 'enquiry',
  }).select('id').single()

  if (error) {
    console.error('event_bookings insert error:', error)
    return NextResponse.json({ error: 'Failed to save enquiry' }, { status: 500 })
  }

  void db.from('notifications').insert({
    user_id: null,
    type: 'event_enquiry',
    title: 'New Events Enquiry',
    body: `${event_name} (${event_type}) — ${contact_name} · ${contact_phone} — ${event_date}`,
    data: { enquiry_id: data.id, contact_phone, contact_email },
  })

  return NextResponse.json({ success: true, id: data.id })
}
