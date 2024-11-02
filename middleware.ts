import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Your middleware logic here
  // For now, we'll just return the request as is
  return NextResponse.next()
}

// Optionally, you can specify which routes this middleware applies to
export const config = {
  matcher: ['/dashboard/:path*']
}
