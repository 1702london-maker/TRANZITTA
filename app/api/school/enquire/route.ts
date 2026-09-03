import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    parent_id, child_name, school_name, school_address,
    pickup_address, morning_ready_time, afternoon_close_time, special_notes
  } = body

  if (!child_name || !school_name || !school_address || !pickup_address) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const db = supabaseAdmin()
  const { data, error } = await db.from('school_enquiries').insert({
    parent_id,
    child_name,
    school_name,
    school_address,
    pickup_address,
    morning_ready_time,
    afternoon_close_time,
    special_notes,
    status: 'submitted'
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Log notification to ops
  await db.from('notifications').insert({
    user_id: null,
    type: 'school_enquiry',
    title: 'New School Enquiry',
    body: `${child_name} — ${school_name} — submitted by parent`,
    data: { enquiry_id: data.id }
  }).catch(() => {})

  return NextResponse.json({ success: true, enquiry: data })
}
