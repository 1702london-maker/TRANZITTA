import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import { asString, readJson, requireFields } from '@/lib/api'

export async function POST(req: NextRequest) {
  const parsed = await readJson<Record<string, unknown>>(req)
  if (!parsed.ok) return parsed.response

  const body = parsed.data
  const required = requireFields(body, ['child_name', 'school_name', 'school_address', 'pickup_address'])
  if (required) return required.response

  const db = supabaseAdmin()
  const { data, error } = await db.from('school_enquiries').insert({
    parent_id: asString(body.parent_id) || null,
    child_name: asString(body.child_name),
    school_name: asString(body.school_name),
    school_address: asString(body.school_address),
    pickup_address: asString(body.pickup_address),
    morning_ready_time: asString(body.morning_ready_time) || null,
    afternoon_close_time: asString(body.afternoon_close_time) || null,
    special_notes: asString(body.special_notes) || null,
    status: 'submitted'
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Log notification to ops (fire and forget — ignore errors)
  void db.from('notifications').insert({
    user_id: null,
    type: 'school_enquiry',
    title: 'New School Enquiry',
    body: `${asString(body.child_name)} — ${asString(body.school_name)} — submitted by parent`,
    data: { enquiry_id: data.id }
  })

  return NextResponse.json({ success: true, enquiry: data })
}
