/**
 * Simplified Middleware - No Authentication Required
 * All routes are now publicly accessible
 */

import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Simply pass through all requests - no authentication checks
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};

export default middleware;