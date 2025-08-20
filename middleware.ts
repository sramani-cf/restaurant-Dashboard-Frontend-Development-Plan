/**
 * Security Middleware
 * Central security middleware that coordinates all security measures
 */

import { NextRequest, NextResponse } from 'next/server';
// Temporarily disabled security middleware due to missing dependencies
import { createCSRFMiddleware } from './lib/security/csrf-edge';
import { createRateLimitMiddleware } from './lib/security/rate-limit';
import { createSessionMiddleware } from './lib/security/session-edge';
import { createSecurityHeadersMiddleware } from './lib/security/headers';
import { validateInput } from './lib/security/sanitization';
import { SECURITY_CONFIG, SECURITY_EVENTS } from './security.config';

// Middleware configuration
const MIDDLEWARE_CONFIG = {
  // Routes that should bypass certain security checks
  publicRoutes: ['/api/health', '/api/status'],
  authRoutes: ['/api/auth', '/auth', '/login', '/register'],
  staticRoutes: ['/_next', '/favicon.ico', '/robots.txt', '/sitemap.xml'],
  
  // Routes that require authentication
  protectedRoutes: ['/dashboard', '/admin', '/settings', '/reports'],
  
  // API routes that require CSRF protection
  csrfProtectedRoutes: ['/api/'],
  
  // Routes with specific rate limits
  rateLimitedRoutes: {
    '/api/auth/login': 'login',
    '/api/auth/register': 'login',
    '/api/auth/reset-password': 'password-reset',
    '/api/upload': 'file-upload',
    '/api/reports': 'reports',
    '/api/search': 'search',
  },
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
 * Check if route requires CSRF protection
 */
function requiresCSRFProtection(pathname: string): boolean {
  return matchesRoute(pathname, MIDDLEWARE_CONFIG.csrfProtectedRoutes);
}

/**
 * Get rate limiter name for route
 */
function getRateLimiterForRoute(pathname: string): string | null {
  for (const [route, limiter] of Object.entries(MIDDLEWARE_CONFIG.rateLimitedRoutes)) {
    if (pathname.startsWith(route)) {
      return limiter;
    }
  }
  return 'api'; // Default rate limiter
}

/**
 * Security event logging
 */
function logSecurityEvent(event: string, details: any): void {
  const logData = {
    event,
    timestamp: new Date().toISOString(),
    ...details,
  };
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Security Event:', logData);
  }
  
  // TODO: Integrate with proper logging service
}

/**
 * Validate request for suspicious patterns
 */
function validateRequest(request: NextRequest): { isValid: boolean; threats: string[] } {
  const threats: string[] = [];
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || '';
  
  // Check for malicious user agents
  const maliciousUAPatterns = [
    /sqlmap/i,
    /nmap/i,
    /nikto/i,
    /wget/i,
    /curl.*bot/i,
    /python-requests/i,
    /scanner/i,
  ];
  
  if (maliciousUAPatterns.some(pattern => pattern.test(userAgent))) {
    threats.push('suspicious_user_agent');
  }
  
  // Check for suspicious query parameters
  const url = request.nextUrl;
  for (const [key, value] of url.searchParams.entries()) {
    const validation = validateInput(value);
    if (!validation.isValid) {
      threats.push(...validation.threats.map(threat => `query_${threat}`));
    }
  }
  
  // Check for path traversal in URL
  if (pathname.includes('../') || pathname.includes('..\\') || pathname.includes('%2e%2e')) {
    threats.push('path_traversal');
  }
  
  // Check for suspicious file extensions
  const suspiciousExtensions = ['.php', '.asp', '.jsp', '.cgi', '.pl'];
  if (suspiciousExtensions.some(ext => pathname.includes(ext))) {
    threats.push('suspicious_file_extension');
  }
  
  return {
    isValid: threats.length === 0,
    threats,
  };
}

/**
 * Main security middleware function
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  const pathname = request.nextUrl.pathname;
  const method = request.method;
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  
  // Create base response
  let response = NextResponse.next();
  
  try {
    // Skip middleware for static assets and health checks
    if (matchesRoute(pathname, MIDDLEWARE_CONFIG.staticRoutes) || 
        pathname.startsWith('/_next/static/')) {
      return response;
    }
    
    // Validate request for suspicious patterns
    const requestValidation = validateRequest(request);
    if (!requestValidation.isValid) {
      logSecurityEvent(SECURITY_EVENTS.SUSPICIOUS_ACTIVITY, {
        ip,
        pathname,
        method,
        userAgent: request.headers.get('user-agent'),
        threats: requestValidation.threats,
      });
      
      // Block severely suspicious requests
      if (requestValidation.threats.includes('path_traversal') ||
          requestValidation.threats.includes('suspicious_user_agent')) {
        return new NextResponse('Forbidden', { status: 403 });
      }
    }
    
    // Apply security headers
    const securityHeadersMiddleware = createSecurityHeadersMiddleware();
    response = securityHeadersMiddleware(response, pathname);
    
    // Apply rate limiting for API routes
    if (pathname.startsWith('/api/')) {
      const rateLimiter = getRateLimiterForRoute(pathname);
      if (rateLimiter) {
        const rateLimitMiddleware = createRateLimitMiddleware(rateLimiter);
        const rateLimitResult = await rateLimitMiddleware(request);
        if (rateLimitResult) {
          return rateLimitResult; // Rate limit exceeded
        }
      }
    }
    
    // Apply CSRF protection for state-changing requests
    if (requiresCSRFProtection(pathname) && 
        !['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      const csrfMiddleware = createCSRFMiddleware();
      const csrfResult = await csrfMiddleware(request);
      if (csrfResult) {
        return csrfResult; // CSRF validation failed
      }
    }
    
    // Apply session middleware for all routes (handles session validation)
    const sessionMiddleware = createSessionMiddleware();
    const sessionResult = await sessionMiddleware(request);
    if (sessionResult) {
      response = sessionResult;
    }
    
    // Check authentication for protected routes
    if (isProtectedRoute(pathname)) {
      // Check if user is authenticated
      const sessionCookie = request.cookies.get('restaurant-dashboard-session');
      
      if (!sessionCookie) {
        // Redirect to login for protected routes
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('returnTo', pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
    
    // Special handling for admin routes
    if (pathname.startsWith('/admin')) {
      const userRole = request.headers.get('x-user-role');
      
      if (userRole !== 'admin') {
        logSecurityEvent(SECURITY_EVENTS.PERMISSION_DENIED, {
          ip,
          pathname,
          userRole,
          requiredRole: 'admin',
        });
        
        return new NextResponse('Forbidden - Admin access required', { status: 403 });
      }
    }
    
    // Add request timing header for monitoring
    const processingTime = Date.now() - startTime;
    response.headers.set('X-Response-Time', `${processingTime}ms`);
    
    // Add security-related headers for debugging (development only)
    if (process.env.NODE_ENV === 'development') {
      response.headers.set('X-Security-Applied', 'true');
      response.headers.set('X-Request-ID', crypto.randomUUID());
    }
    
    return response;
    
  } catch (error) {
    console.error('Middleware error:', error);
    
    logSecurityEvent('middleware_error', {
      ip,
      pathname,
      method,
      error: (error as Error).message,
    });
    
    // Return a safe response even if middleware fails
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

/**
 * Enhanced middleware with additional security features
 */
export async function enhancedMiddleware(request: NextRequest): Promise<NextResponse> {
  const response = await middleware(request);
  
  // Add additional security measures for production
  if (process.env.NODE_ENV === 'production') {
    // Add security monitoring headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    
    // Remove server information
    response.headers.delete('Server');
    response.headers.delete('X-Powered-By');
  }
  
  return response;
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

/**
 * API route middleware wrapper
 */
export function withSecurityMiddleware<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse> | NextResponse
) {
  return async (request: NextRequest, ...args: any[]): Promise<NextResponse> => {
    // Apply middleware logic
    const middlewareResponse = await middleware(request);
    
    // If middleware returns a response (error/redirect), return it
    if (middlewareResponse.status !== 200 && middlewareResponse.status !== 304) {
      return middlewareResponse;
    }
    
    // Continue with original handler
    const handlerResponse = await handler(request, ...args);
    
    // Apply security headers to handler response
    const securityHeadersMiddleware = createSecurityHeadersMiddleware();
    return securityHeadersMiddleware(handlerResponse, request.nextUrl.pathname);
  };
}

/**
 * Route-specific middleware configurations
 */
export const routeMiddleware = {
  /**
   * Middleware for authentication routes
   */
  auth: async (request: NextRequest): Promise<NextResponse | null> => {
    const pathname = request.nextUrl.pathname;
    
    if (!matchesRoute(pathname, MIDDLEWARE_CONFIG.authRoutes)) {
      return null;
    }
    
    // Apply stricter rate limiting for auth routes
    const rateLimitMiddleware = createRateLimitMiddleware('login');
    return await rateLimitMiddleware(request);
  },
  
  /**
   * Middleware for file upload routes
   */
  upload: async (request: NextRequest): Promise<NextResponse | null> => {
    if (!request.nextUrl.pathname.includes('/upload')) {
      return null;
    }
    
    // Check file size limits
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > SECURITY_CONFIG.fileUpload.maxFileSize) {
      return new NextResponse('File too large', { status: 413 });
    }
    
    return null;
  },
  
  /**
   * Middleware for admin routes
   */
  admin: async (request: NextRequest): Promise<NextResponse | null> => {
    if (!request.nextUrl.pathname.startsWith('/admin')) {
      return null;
    }
    
    // Additional security for admin routes
    const ip = request.ip || 'unknown';
    const userRole = request.headers.get('x-user-role');
    
    logSecurityEvent('admin_access_attempt', {
      ip,
      pathname: request.nextUrl.pathname,
      userRole,
      userAgent: request.headers.get('user-agent'),
    });
    
    return null;
  },
};

export default middleware;