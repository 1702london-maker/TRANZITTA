import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const required = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY']
  const missing = required.filter((name) => !process.env[name])

  if (missing.length > 0) {
    return NextResponse.json({ ok: false, missing }, { status: 500 })
  }

  try {
    const db = supabaseAdmin()
    const { error } = await db.from('users').select('id', { count: 'exact', head: true })

    if (error) {
      return NextResponse.json({ ok: false, database: error.message }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      database: 'connected',
      service: 'tranzitta-backend',
      checked_at: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
