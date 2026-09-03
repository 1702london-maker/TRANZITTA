import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import { asNumber, asString, readJson, requireFields } from '@/lib/api'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const parentId = req.headers.get('x-parent-id')
  if (!parentId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = supabaseAdmin()
  const { data, error } = await db
    .from('school_payments')
    .select('id, child_id, term_start, term_end, payment_status, excess_charges, paid_at, invoice_url')
    .eq('parent_id', parentId)
    .order('created_at', { ascending: false })

  // Never return base_term_fee directly — it's the private fare
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ payments: data })
}

export async function POST(req: NextRequest) {
  // Initiate Paystack payment for term fee
  const parsed = await readJson<Record<string, unknown>>(req)
  if (!parsed.ok) return parsed.response

  const body = parsed.data
  const required = requireFields(body, ['child_id', 'parent_id', 'term_start', 'term_end', 'base_term_fee'])
  if (required) return required.response

  const db = supabaseAdmin()

  // Create payment record
  const { data, error } = await db.from('school_payments').insert({
    child_id: asString(body.child_id),
    parent_id: asString(body.parent_id),
    term_start: asString(body.term_start),
    term_end: asString(body.term_end),
    base_term_fee: asNumber(body.base_term_fee),
    amount: asNumber(body.base_term_fee, 0),
    month: asString(body.term_start),
    excess_charges: 0,
    payment_status: 'pending', payment_provider: 'paystack'
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // In production: call Paystack API to init transaction and return authorization_url
  // For now return payment record + Paystack URL placeholder
  return NextResponse.json({
    payment_id: data.id,
    paystack_url: `https://paystack.com/pay/tranzitta-school-${data.id}`
  })
}
