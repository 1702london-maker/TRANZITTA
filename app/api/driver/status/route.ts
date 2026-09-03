import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/server-auth'
import { asNumber, asString, readJson, requireFields, serverError } from '@/lib/api'

export async function PATCH(req: NextRequest) {
  const auth = await requireAuth(req, ['driver', 'ops', 'superadmin'])
  if (!auth.ok) return auth.response

  const parsed = await readJson<Record<string, unknown>>(req)
  if (!parsed.ok) return parsed.response

  const required = requireFields(parsed.data, ['status'])
  if (required) return required.response

  const status = asString(parsed.data.status)
  if (!['offline', 'online'].includes(status)) {
    return NextResponse.json({ error: 'Invalid driver status' }, { status: 400 })
  }

  const lng = asNumber(parsed.data.lng)
  const lat = asNumber(parsed.data.lat)

  let query = auth.db
    .from('drivers')
    .update({
      status,
      last_location_at: lat !== null && lng !== null ? new Date().toISOString() : undefined,
      location: lat !== null && lng !== null ? `POINT(${lng} ${lat})` : undefined,
    })
    .eq('id', auth.context.userId)
    .select('id,status,last_location_at')
    .single()

  const { data, error } = await query
  if (error) {
    console.error('driver status error:', error)
    return serverError('Failed to update driver status')
  }

  if (lat !== null && lng !== null) {
    void auth.db.from('location_snapshots').insert({
      driver_id: auth.context.userId,
      vertical: 'go',
      location: `POINT(${lng} ${lat})`,
    })
  }

  return NextResponse.json({ success: true, driver: data })
}
