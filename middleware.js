import { NextResponse } from 'next/server'
 
const allowedOrigins = ['https://sexnew.xyz']
 
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
 
export function middleware(request) {
  // Check the origin from the request
  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)
 
  // Handle preflighted requests
  const isPreflight = request.method === 'OPTIONS'
 
  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }
 
  // Handle simple requests
  const response = NextResponse.next()
 
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }
 
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  
  // **Bổ sung kiểm tra yêu cầu đăng nhập cho trang admin**
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('tokenadmin');
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return response
}
 
export const config = {
 matcher: ['/api/:path*', '/admin/:path*'],
}