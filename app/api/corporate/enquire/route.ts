import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import { asInt, asString, readJson, requireFields, serverError } from '@/lib/api'

export async function POST(req: NextRequest) {
  const parsed = await readJson<Record<string, unknown>>(req)
  if (!parsed.ok) return parsed.response

  const body = parsed.data
  const required = requireFields(body, ['company_name', 'rc_number', 'industry', 'office_address', 'contact_name', 'contact_phone', 'contact_email', 'staff_count'])
  if (required) return required.response

  const shifts = asString(body.shifts)

  const db = supabaseAdmin()

  const { data, error } = await db.from('corporate_enquiries').insert({
    company_name: asString(body.company_name),
    rc_number: asString(body.rc_number).toUpperCase(),
    industry: asString(body.industry),
    registered_address: asString(body.registered_address) || null,
    office_address: asString(body.office_address),
    city: asString(body.city, 'Lagos') || 'Lagos',
    contact_name: asString(body.contact_name),
    contact_title: asString(body.contact_title) || null,
    contact_email: asString(body.contact_email),
    contact_phone: asString(body.contact_phone),
    staff_count: asInt(body.staff_count, 0),
    shifts,
    am_shift_start: (shifts === 'am' || shifts === 'both') ? asString(body.am_start) : null,
    am_shift_end: (shifts === 'am' || shifts === 'both') ? asString(body.am_end) : null,
    pm_shift_start: (shifts === 'pm' || shifts === 'both') ? asString(body.pm_start) : null,
    pm_shift_end: (shifts === 'pm' || shifts === 'both') ? asString(body.pm_end) : null,
    working_days_per_month: asInt(body.working_days, 22),
    notes: asString(body.notes) || null,
    status: 'enquiry',
  }).select('id').single()

  if (error) {
    console.error('corporate_enquiries insert error:', error)
    return serverError('Failed to submit enquiry')
  }

  void db.from('notifications').insert({
    user_id: null,
    type: 'corporate_enquiry',
    title: 'New Corporate Enquiry',
    body: `${asString(body.company_name)} (RC: ${asString(body.rc_number).toUpperCase()}) — ${asInt(body.staff_count, 0)} staff — ${shifts.toUpperCase()} shift — ${asString(body.contact_name)} · ${asString(body.contact_phone)}`,
    data: {
      enquiry_id: data.id,
      company_name: asString(body.company_name),
      rc_number: asString(body.rc_number).toUpperCase(),
      staff_count: asInt(body.staff_count, 0),
      shifts,
      contact_phone: asString(body.contact_phone),
      contact_email: asString(body.contact_email),
    },
  })

  return NextResponse.json({ success: true, id: data.id })
}
