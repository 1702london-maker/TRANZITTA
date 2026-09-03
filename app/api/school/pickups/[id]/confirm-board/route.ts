import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const db = supabaseAdmin()
  const { data, error } = await db
    .from('school_child_pickups')
    .update({ child_boarded_at: new Date().toISOString(), status: 'boarded' })
    .eq('id', params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, pickup: data })
}
