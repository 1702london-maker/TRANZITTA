import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import { portalConfig, type PortalKey, type UserRole } from '@/lib/auth'
import { asString, readJson, requireFields, serverError } from '@/lib/api'

const roles = new Set<UserRole>(['rider', 'driver', 'parent', 'corporate_admin', 'events_client', 'ops', 'superadmin'])

export async function POST(req: NextRequest) {
  const parsed = await readJson<Record<string, unknown>>(req)
  if (!parsed.ok) return parsed.response

  const required = requireFields(parsed.data, ['full_name', 'phone', 'role'])
  if (required) return required.response

  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (!token) return NextResponse.json({ error: 'Missing bearer token' }, { status: 401 })

  const role = asString(parsed.data.role) as UserRole
  if (!roles.has(role)) return NextResponse.json({ error: 'Invalid role' }, { status: 400 })

  if (role === 'ops' || role === 'superadmin') {
    return NextResponse.json({ error: 'Ops accounts are created internally' }, { status: 403 })
  }

  const portal = asString(parsed.data.portal) as PortalKey
  const vertical = portalConfig[portal]?.vertical ?? 'go'
  const db = supabaseAdmin()

  const { data: userResult, error: userError } = await db.auth.getUser(token)
  if (userError || !userResult.user) return NextResponse.json({ error: 'Invalid session' }, { status: 401 })

  const { error } = await db.from('users').upsert({
    id: userResult.user.id,
    full_name: asString(parsed.data.full_name),
    phone: asString(parsed.data.phone),
    email: userResult.user.email,
    role,
    vertical,
    phone_verified: false,
    is_active: true,
  }, { onConflict: 'id' })

  if (error) {
    console.error('profile upsert error:', error)
    return serverError('Failed to create profile')
  }

  if (role === 'driver') {
    const { error: driverError } = await db.from('drivers').upsert({
      id: userResult.user.id,
      license_number: asString(parsed.data.license_number) || 'PENDING',
      home_address: asString(parsed.data.home_address) || 'Pending verification',
      nin: asString(parsed.data.nin) || 'PENDING',
      verticals: ['go', 'school', 'corporate', 'events', 'airport'],
      status: 'pending',
    }, { onConflict: 'id' })
    if (driverError) console.error('driver upsert error:', driverError)
  }

  if (role === 'parent') {
    const { error: parentError } = await db.from('school_clients').upsert({
      id: userResult.user.id,
      home_address: asString(parsed.data.home_address) || 'Pending route review',
    }, { onConflict: 'id' })
    if (parentError) console.error('school client upsert error:', parentError)
  }

  return NextResponse.json({ success: true, role, vertical })
}

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (!token) return NextResponse.json({ error: 'Missing bearer token' }, { status: 401 })

  const db = supabaseAdmin()
  const { data: userResult, error: userError } = await db.auth.getUser(token)
  if (userError || !userResult.user) return NextResponse.json({ error: 'Invalid session' }, { status: 401 })

  const { data, error } = await db
    .from('users')
    .select('id, full_name, phone, email, role, vertical, is_active')
    .eq('id', userResult.user.id)
    .maybeSingle()

  if (error) return serverError('Failed to load profile')
  return NextResponse.json({ profile: data })
}
