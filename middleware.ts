import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { protectedRoutes } from '@/lib/auth'

type CookieToSet = {
  name: string
  value: string
  options?: Parameters<NextResponse['cookies']['set']>[2]
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const match = protectedRoutes.find((route) => pathname === route.prefix || pathname.startsWith(`${route.prefix}/`))

  if (!match) return NextResponse.next()

  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    },
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    const login = new URL(match.portal === 'ops' ? '/ops' : `/${match.portal}/login`, request.url)
    login.searchParams.set('next', pathname)
    return NextResponse.redirect(login)
  }

  const { data: profile } = await supabase
    .from('users')
    .select('role,is_active')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile?.is_active || !match.roles.includes(profile.role)) {
    const login = new URL(match.portal === 'ops' ? '/ops' : `/${match.portal}/login`, request.url)
    login.searchParams.set('next', pathname)
    login.searchParams.set('error', 'role')
    return NextResponse.redirect(login)
  }

  return response
}

export const config = {
  matcher: [
    '/go/dashboard/:path*',
    '/go/track/:path*',
    '/school/dashboard/:path*',
    '/school/track/:path*',
    '/corporate/dashboard/:path*',
    '/events/dashboard/:path*',
    '/airport/dashboard/:path*',
    '/driver/dashboard/:path*',
    '/ops/dashboard/:path*',
  ],
}
