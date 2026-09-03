import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const parentId = req.headers.get('x-parent-id')
  if (!parentId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = supabaseAdmin()
  const { data, error } = await db
    .from('school_children')
    .select(`*, assigned_driver:assigned_driver_id(id, rating, license_number, status), vehicle_group:vehicle_group_id(*)`)
    .eq('id', params.id)
    .eq('parent_id', parentId)
    .single()

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Fetch today's trip status
  const today = new Date().toISOString().split('T')[0]
  const { data: todayTrips } = await db
    .from('school_trips')
    .select('*, pickups:school_child_pickups(*)')
    .eq('child_id', data.id)
    .eq('scheduled_date', today)
    .order('direction', { ascending: true })

  return NextResponse.json({ child: data, today_trips: todayTrips || [] })
}
