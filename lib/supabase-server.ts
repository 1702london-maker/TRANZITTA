import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Service-role client for API routes (bypasses RLS for ops actions)
export const supabaseAdmin = () => createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
})

// Anon client for public reads
export const supabaseAnon = () => createClient(url, anonKey)
