import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    company_name, rc_number, industry, registered_address, office_address,
    city, contact_name, contact_title, contact_email, contact_phone,
    staff_count, shifts, am_start, am_end, pm_start, pm_end, working_days, notes,
  } = body

  if (!company_name || !rc_number || !industry || !office_address || !contact_name || !contact_phone || !contact_email || !staff_count) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const db = supabaseAdmin()

  const { data, error } = await db.from('corporate_enquiries').insert({
    company_name,
    rc_number: rc_number.trim().toUpperCase(),
    industry,
    registered_address: registered_address || null,
    office_address,
    city: city || 'Lagos',
    contact_name,
    contact_title: contact_title || null,
    contact_email,
    contact_phone,
    staff_count: parseInt(staff_count) || 0,
    shifts,
    am_shift_start: (shifts === 'am' || shifts === 'both') ? am_start : null,
    am_shift_end: (shifts === 'am' || shifts === 'both') ? am_end : null,
    pm_shift_start: (shifts === 'pm' || shifts === 'both') ? pm_start : null,
    pm_shift_end: (shifts === 'pm' || shifts === 'both') ? pm_end : null,
    working_days_per_month: parseInt(working_days) || 22,
    notes: notes || null,
    status: 'enquiry',
  }).select('id').single()

  if (error) {
    console.error('corporate_enquiries insert error:', error)
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 })
  }

  void db.from('notifications').insert({
    user_id: null,
    type: 'corporate_enquiry',
    title: 'New Corporate Enquiry',
    body: `${company_name} (RC: ${rc_number}) — ${staff_count} staff — ${shifts.toUpperCase()} shift — ${contact_name} · ${contact_phone}`,
    data: {
      enquiry_id: data.id,
      company_name,
      rc_number,
      staff_count,
      shifts,
      contact_phone,
      contact_email,
    },
  })

  return NextResponse.json({ success: true, id: data.id })
}
