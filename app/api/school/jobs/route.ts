import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const db = supabaseAdmin()
  const { data, error } = await db
    .from('school_job_postings')
    .select('id, school_name, pickup_zone, children_count, term_start, term_end, morning_time, afternoon_time, vehicle_requirement, fuel_covered, weekly_wage, posted_at')
    .eq('status', 'open')
    .order('posted_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ jobs: data })
}
