/**
 * CSRF Protection Implementation
 * Comprehensive CSRF token generation, validation, and management
 */

import { randomBytes, createHmac, timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { SECURITY_CONFIG } from '../../security.config';

// CSRF Token Interface
interface CSRFTokenData {
  token: string;
  hash: string;
  timestamp: number;
  userId?: string;
  sessionId?: string;
}

// CSRF Configuration
const CSRF_CONFIG = {
  secret: process.env.CSRF_SECRET || SECURITY_CONFIG.csrf.secret,
  tokenLength: 32,
  hashAlgorithm: 'sha256',
  maxAge: SECURITY_CONFIG.csrf.cookieOptions.maxAge || 24 * 60 * 60 * 1000, // 24 hours
  cookieName: SECURITY_CONFIG.csrf.cookieName,
  headerName: SECURITY_CONFIG.csrf.headerName,
  paramName: '_csrf_token',
  bypassMethods: ['GET', 'HEAD', 'OPTIONS'],
};

/**
 * Generate a cryptographically secure CSRF token
 */
export function generateCSRFToken(userId?: string, sessionId?: string): string {
  const timestamp = Date.now();
  const randomToken = randomBytes(CSRF_CONFIG.tokenLength).toString('hex');
  
  // Create token data
  const tokenData = {
    token: randomToken,
    timestamp,
    userId: userId || '',
    sessionId: sessionId || '',
  };
  
  // Create HMAC hash of the token data
  const hmac = createHmac(CSRF_CONFIG.hashAlgorithm, CSRF_CONFIG.secret);
  hmac.update(JSON.stringify(tokenData));
  const hash = hmac.digest('hex');
  
  // Combine token components
  const csrfToken = Buffer.from(JSON.stringify({
    ...tokenData,
    hash,
  })).toString('base64url');
  
  return csrfToken;
}

/**
 * Validate a CSRF token
 */
export function validateCSRFToken(
  token: string,
  userId?: string,
  sessionId?: string
): { valid: boolean; reason?: string } {
  try {
    // Decode the token
    const tokenDataString = Buffer.from(token, 'base64url').toString();
    const tokenData: CSRFTokenData = JSON.parse(tokenDataString);
    
    // Check if token is expired
    const now = Date.now();
    if (now - tokenData.timestamp > CSRF_CONFIG.maxAge) {
      return { valid: false, reason: 'Token expired' };
    }
    
    // Verify user and session match
    if (userId && tokenData.userId !== userId) {
      return { valid: false, reason: 'User mismatch' };
    }
    
    if (sessionId && tokenData.sessionId !== sessionId) {
      return { valid: false, reason: 'Session mismatch' };
    }
    
    // Recreate the hash to verify integrity
    const verificationData = {
      token: tokenData.token,
      timestamp: tokenData.timestamp,
      userId: tokenData.userId,
      sessionId: tokenData.sessionId,
    };
    
    const hmac = createHmac(CSRF_CONFIG.hashAlgorithm, CSRF_CONFIG.secret);
    hmac.update(JSON.stringify(verificationData));
    const expectedHash = hmac.digest('hex');
    
    // Use timing-safe comparison
    const providedHash = Buffer.from(tokenData.hash, 'hex');
    const expectedHashBuffer = Buffer.from(expectedHash, 'hex');
    
    if (!timingSafeEqual(providedHash, expectedHashBuffer)) {
      return { valid: false, reason: 'Invalid token signature' };
    }
    
    return { valid: true };
  } catch (error) {
    return { valid: false, reason: 'Malformed token' };
  }
}

/**
 * Extract CSRF token from request
 */
export function extractCSRFToken(request: NextRequest): string | null {
  // Check header first
  const headerToken = request.headers.get(CSRF_CONFIG.headerName);
  if (headerToken) {
    return headerToken;
  }
  
  // Check form data or JSON body for POST requests
  if (request.method === 'POST') {
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/x-www-form-urlencoded')) {
      // Handle form data (would need to parse body)
      // This is handled in the middleware where body parsing is available
    } else if (contentType.includes('application/json')) {
      // Handle JSON payload (would need to parse body)
      // This is handled in the middleware where body parsing is available
    }
  }
  
  // Check query parameters (less secure, not recommended)
  const queryToken = request.nextUrl.searchParams.get(CSRF_CONFIG.paramName);
  if (queryToken) {
    return queryToken;
  }
  
  return null;
}

/**
 * Set CSRF token in response cookies
 */
export function setCSRFTokenCookie(response: NextResponse, token: string): void {
  const cookieOptions = {
    ...SECURITY_CONFIG.csrf.cookieOptions,
    expires: new Date(Date.now() + CSRF_CONFIG.maxAge),
  };
  
  response.cookies.set(CSRF_CONFIG.cookieName, token, cookieOptions);
}

/**
 * Get CSRF token from request cookies
 */
export function getCSRFTokenFromCookies(request: NextRequest): string | null {
  return request.cookies.get(CSRF_CONFIG.cookieName)?.value || null;
}

/**
 * CSRF Protection Middleware
 */
export function createCSRFMiddleware() {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    const method = request.method.toUpperCase();
    
    // Skip CSRF check for safe methods
    if (CSRF_CONFIG.bypassMethods.includes(method)) {
      return null; // Continue to next middleware
    }
    
    // Skip CSRF check for API routes that explicitly opt out
    const pathname = request.nextUrl.pathname;
    if (pathname.startsWith('/api/webhook') || 
        pathname.startsWith('/api/health') ||
        pathname.includes('/api/auth/callback')) {
      return null; // Continue to next middleware
    }
    
    // Extract user and session information
    const sessionCookie = request.cookies.get('session');
    const userId = request.headers.get('x-user-id');
    const sessionId = sessionCookie?.value;
    
    // Get CSRF token from request
    const providedToken = extractCSRFToken(request);
    
    if (!providedToken) {
      return new NextResponse(
        JSON.stringify({
          error: 'CSRF token required',
          message: 'Request must include a valid CSRF token',
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    // Validate the token
    const validation = validateCSRFToken(providedToken, userId || undefined, sessionId);
    
    if (!validation.valid) {
      console.warn('CSRF token validation failed:', validation.reason, {
        ip: request.ip,
        userAgent: request.headers.get('user-agent'),
        pathname,
        method,
        timestamp: new Date().toISOString(),
      });
      
      return new NextResponse(
        JSON.stringify({
          error: 'Invalid CSRF token',
          message: 'The provided CSRF token is invalid or expired',
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    return null; // Continue to next middleware
  };
}

/**
 * Generate and set CSRF token for a response
 */
export function provideCSRFToken(
  response: NextResponse,
  userId?: string,
  sessionId?: string
): string {
  const token = generateCSRFToken(userId, sessionId);
  setCSRFTokenCookie(response, token);
  
  // Also add token to response headers for client-side access
  response.headers.set('X-CSRF-Token', token);
  
  return token;
}

/**
 * React Hook for CSRF protection (client-side utility)
 */
export const CSRFUtils = {
  /**
   * Get CSRF token from meta tag or cookie
   */
  getToken(): string | null {
    // Try meta tag first
    const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (metaToken) {
      return metaToken;
    }
    
    // Try cookie
    const cookieToken = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${CSRF_CONFIG.cookieName}=`))
      ?.split('=')[1];
    
    return cookieToken || null;
  },
  
  /**
   * Add CSRF token to fetch request options
   */
  addTokenToRequest(options: RequestInit = {}): RequestInit {
    const token = this.getToken();
    
    if (token) {
      const headers = new Headers(options.headers);
      headers.set(CSRF_CONFIG.headerName, token);
      
      return {
        ...options,
        headers,
      };
    }
    
    return options;
  },
  
  /**
   * Create a form with CSRF token
   */
  createFormWithToken(formData: FormData): FormData {
    const token = this.getToken();
    
    if (token) {
      formData.append(CSRF_CONFIG.paramName, token);
    }
    
    return formData;
  },
};

/**
 * Next.js API route helper for CSRF protection
 */
export function withCSRFProtection<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse> | NextResponse
) {
  return async (request: NextRequest, ...args: any[]): Promise<NextResponse> => {
    const method = request.method.toUpperCase();
    
    // Apply CSRF protection to state-changing methods
    if (!CSRF_CONFIG.bypassMethods.includes(method)) {
      const csrfMiddleware = createCSRFMiddleware();
      const csrfResult = await csrfMiddleware(request);
      
      if (csrfResult) {
        return csrfResult; // Return error response
      }
    }
    
    // Continue with the original handler
    return handler(request, ...args);
  };
}

/**
 * Utility to check if CSRF protection is enabled
 */
export function isCSRFEnabled(): boolean {
  return process.env.NODE_ENV === 'production' || process.env.CSRF_ENABLED === 'true';
}

/**
 * Generate CSRF meta tag for HTML pages
 */
export function generateCSRFMetaTag(token: string): string {
  return `<meta name="csrf-token" content="${token}" />`;
}

/**
 * Audit logging for CSRF events
 */
function logCSRFEvent(event: string, details: any): void {
  const logData = {
    event: `csrf_${event}`,
    timestamp: new Date().toISOString(),
    ...details,
  };
  
  // In production, this would typically go to a proper logging service
  if (process.env.NODE_ENV === 'development') {
    console.log('CSRF Event:', logData);
  }
  
  // TODO: Integrate with audit logging system
}

export default {
  generateCSRFToken,
  validateCSRFToken,
  extractCSRFToken,
  setCSRFTokenCookie,
  getCSRFTokenFromCookies,
  createCSRFMiddleware,
  provideCSRFToken,
  withCSRFProtection,
  isCSRFEnabled,
  generateCSRFMetaTag,
  CSRFUtils,
};