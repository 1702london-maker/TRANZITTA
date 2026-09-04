import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

function publicSupabaseEnv() {
  if (!supabaseUrl) throw new Error('NEXT_PUBLIC_SUPABASE_URL is required')
  if (!supabaseAnonKey) throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is required')
  return { supabaseUrl, supabaseAnonKey }
}

export const supabase = () =>
  createClient(publicSupabaseEnv().supabaseUrl, publicSupabaseEnv().supabaseAnonKey)

export function createBrowserSupabase() {
  const env = publicSupabaseEnv()
  return createBrowserClient(env.supabaseUrl, env.supabaseAnonKey)
}
