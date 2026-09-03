import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { driver_id, message } = await req.json()
  if (!driver_id) return NextResponse.json({ error: 'Driver ID required' }, { status: 400 })

  const db = supabaseAdmin()

  // Check job is still open
  const { data: job } = await db.from('school_job_postings').select('status').eq('id', params.id).single()
  if (!job || job.status !== 'open') return NextResponse.json({ error: 'Job not open' }, { status: 400 })

  // Check not already bid
  const { data: existing } = await db.from('school_driver_bids')
    .select('id').eq('job_id', params.id).eq('driver_id', driver_id).single()
  if (existing) return NextResponse.json({ error: 'Already bid on this job' }, { status: 409 })

  const { data, error } = await db.from('school_driver_bids').insert({
    job_id: params.id, driver_id, message, status: 'submitted'
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, bid: data })
}
