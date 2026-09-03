import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const parentId = req.headers.get('x-parent-id')
  if (!parentId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = supabaseAdmin()
  const { data, error } = await db
    .from('school_children')
    .select(`*, assigned_driver:assigned_driver_id(id, rating, license_number), vehicle_group:vehicle_group_id(*)`)
    .eq('parent_id', parentId)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Never expose term_fee in list — only in individual child detail
  const safe = (data || []).map(({ term_fee: _tf, qr_code_token: _qr, ...rest }) => rest)
  return NextResponse.json({ children: safe })
}
