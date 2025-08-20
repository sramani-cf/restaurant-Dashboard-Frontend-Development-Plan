/**
 * Simplified Security Middleware
 * Basic middleware without external dependencies
 */

import { NextRequest, NextResponse } from 'next/server';

// Middleware configuration
const MIDDLEWARE_CONFIG = {
  // Routes that should bypass certain security checks
  publicRoutes: ['/api/health', '/api/status', '/pos', '/'],
  authRoutes: ['/api/auth', '/auth', '/login', '/register'],
  staticRoutes: ['/_next', '/favicon.ico', '/robots.txt', '/sitemap.xml'],
  
  // Routes that require authentication
  protectedRoutes: ['/dashboard', '/admin', '/settings', '/reports', '/orders'],
};

/**
 * Check if route matches pattern
 */
function matchesRoute(pathname: string, patterns: string[]): boolean {
  return patterns.some(pattern => {
    if (pattern.endsWith('*')) {
      return pathname.startsWith(pattern.slice(0, -1));
    }
    if (pattern.endsWith('/')) {
      return pathname.startsWith(pattern);
    }
    return pathname === pattern || pathname.startsWith(pattern + '/');
  });
}

/**
 * Check if route is public (no authentication required)
 */
function isPublicRoute(pathname: string): boolean {
  return matchesRoute(pathname, MIDDLEWARE_CONFIG.publicRoutes) ||
         matchesRoute(pathname, MIDDLEWARE_CONFIG.staticRoutes);
}

/**
 * Check if route is protected (authentication required)
 */
function isProtectedRoute(pathname: string): boolean {
  return matchesRoute(pathname, MIDDLEWARE_CONFIG.protectedRoutes);
}

/**
 * Main middleware function
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const pathname = request.nextUrl.pathname;
  
  // Create base response
  let response = NextResponse.next();
  
  try {
    // Skip middleware for static assets
    if (matchesRoute(pathname, MIDDLEWARE_CONFIG.staticRoutes) || 
        pathname.startsWith('/_next/static/')) {
      return response;
    }
    
    // Add basic security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Check authentication for protected routes
    if (isProtectedRoute(pathname)) {
      const sessionCookie = request.cookies.get('restaurant-dashboard-session');
      
      if (!sessionCookie) {
        // For now, just allow access to all routes for development
        // In production, you would redirect to login
        // const loginUrl = new URL('/auth/login', request.url);
        // loginUrl.searchParams.set('returnTo', pathname);
        // return NextResponse.redirect(loginUrl);
      }
    }
    
    return response;
    
  } catch (error) {
    console.error('Middleware error:', error);
    
    // Return a safe response even if middleware fails
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

/**
 * Middleware configuration for Next.js
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)  
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};

export default middleware;