import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token    = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const path     = req.nextUrl.pathname
  const isLogin  = path === '/admin/login'
  const isAdmin  = path.startsWith('/admin')

  // Pass pathname as a header so server components can read it
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-pathname', path)

  // Already logged in → skip login page
  if (isLogin && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }

  // Not logged in → redirect to login
  if (isAdmin && !isLogin && !token) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/admin/:path*'],
}
