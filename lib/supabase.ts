import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

function publicEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is required`)
  return value
}

export const supabase = () =>
  createClient(publicEnv('NEXT_PUBLIC_SUPABASE_URL'), publicEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'))

export function createBrowserSupabase() {
  return createBrowserClient(publicEnv('NEXT_PUBLIC_SUPABASE_URL'), publicEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'))
}
