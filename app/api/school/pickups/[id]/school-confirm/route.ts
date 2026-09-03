import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { teacher_name } = await req.json()
  const db = supabaseAdmin()

  const { data, error } = await db
    .from('school_child_pickups')
    .update({
      school_confirmed_at: new Date().toISOString(),
      school_confirmed_by: teacher_name || 'School Staff',
      status: 'school_confirmed'
    })
    .eq('id', params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, pickup: data })
}
