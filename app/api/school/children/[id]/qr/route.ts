import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const parentId = req.headers.get('x-parent-id')
  if (!parentId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = supabaseAdmin()
  const { data, error } = await db
    .from('school_children')
    .select('id, full_name, qr_code_token, school_name')
    .eq('id', params.id)
    .eq('parent_id', parentId)
    .single()

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({
    qr_token: data.qr_code_token,
    child_name: data.full_name,
    school: data.school_name
  })
}

// Driver scans QR — verifies correct child/vehicle/time
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { qr_token, driver_id, trip_id } = await req.json()
  if (!qr_token || !driver_id) return NextResponse.json({ error: 'Missing token' }, { status: 400 })

  const db = supabaseAdmin()
  const { data: child, error } = await db
    .from('school_children')
    .select('id, full_name, qr_code_token, assigned_driver_id, school_name')
    .eq('id', params.id)
    .single()

  if (error || !child) return NextResponse.json({ error: 'Child not found' }, { status: 404 })
  if (child.qr_code_token !== qr_token) return NextResponse.json({ verified: false, error: 'QR mismatch' }, { status: 403 })
  if (child.assigned_driver_id !== driver_id) return NextResponse.json({ verified: false, error: 'Wrong driver' }, { status: 403 })

  // Update pickup record
  if (trip_id) {
    await db.from('school_child_pickups')
      .update({ qr_scanned_at: new Date().toISOString(), status: 'qr_verified' })
      .eq('trip_id', trip_id)
      .eq('child_id', child.id)
  }

  return NextResponse.json({ verified: true, child_name: child.full_name, school: child.school_name })
}
