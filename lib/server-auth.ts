import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import type { UserRole } from '@/lib/auth'

export type AuthContext = {
  userId: string
  email: string | null
  profile: {
    id: string
    full_name: string
    phone: string
    email: string | null
    role: UserRole
    vertical: string
    is_active: boolean
  }
}

export async function requireAuth(req: NextRequest, allowedRoles?: UserRole[]) {
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (!token) {
    return { ok: false as const, response: NextResponse.json({ error: 'Missing bearer token' }, { status: 401 }) }
  }

  const db = supabaseAdmin()
  const { data: userResult, error: userError } = await db.auth.getUser(token)
  if (userError || !userResult.user) {
    return { ok: false as const, response: NextResponse.json({ error: 'Invalid session' }, { status: 401 }) }
  }

  const { data: profile, error: profileError } = await db
    .from('users')
    .select('id,full_name,phone,email,role,vertical,is_active')
    .eq('id', userResult.user.id)
    .maybeSingle()

  if (profileError || !profile) {
    return { ok: false as const, response: NextResponse.json({ error: 'Profile not found' }, { status: 404 }) }
  }

  if (!profile.is_active) {
    return { ok: false as const, response: NextResponse.json({ error: 'Account disabled' }, { status: 403 }) }
  }

  if (allowedRoles?.length && !allowedRoles.includes(profile.role)) {
    return { ok: false as const, response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
  }

  return {
    ok: true as const,
    db,
    context: {
      userId: userResult.user.id,
      email: userResult.user.email ?? null,
      profile,
    } satisfies AuthContext,
  }
}
