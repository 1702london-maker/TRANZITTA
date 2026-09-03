import { NextRequest, NextResponse } from 'next/server'

export type ApiResult<T> = { ok: true; data: T } | { ok: false; response: NextResponse }

export async function readJson<T = Record<string, unknown>>(req: NextRequest): Promise<ApiResult<T>> {
  try {
    return { ok: true, data: await req.json() }
  } catch {
    return badRequest('Invalid JSON body')
  }
}

export function badRequest(message: string) {
  return { ok: false as const, response: NextResponse.json({ error: message }, { status: 400 }) }
}

export function serverError(message = 'Something went wrong') {
  return NextResponse.json({ error: message }, { status: 500 })
}

export function requireFields(body: Record<string, unknown>, fields: string[]) {
  const missing = fields.filter((field) => {
    const value = body[field]
    return value === undefined || value === null || String(value).trim() === ''
  })

  if (missing.length > 0) {
    return badRequest(`Missing required fields: ${missing.join(', ')}`)
  }

  return null
}

export function asString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value.trim() : fallback
}

export function asNumber(value: unknown, fallback: number | null = null) {
  if (value === undefined || value === null || value === '') return fallback
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export function asInt(value: unknown, fallback = 0) {
  const parsed = asNumber(value, fallback)
  return parsed === null ? fallback : Math.trunc(parsed)
}
