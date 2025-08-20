/**
 * CSRF Protection Implementation for Edge Runtime
 * Uses Web Crypto API instead of Node.js crypto module
 */

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
  secret: process.env.CSRF_SECRET || SECURITY_CONFIG.csrf.secret || 'default-csrf-secret',
  tokenLength: 32,
  hashAlgorithm: 'SHA-256',
  maxAge: SECURITY_CONFIG.csrf.cookieOptions.maxAge || 24 * 60 * 60 * 1000, // 24 hours
  cookieName: SECURITY_CONFIG.csrf.cookieName,
  headerName: SECURITY_CONFIG.csrf.headerName,
  paramName: '_csrf_token',
  bypassMethods: ['GET', 'HEAD', 'OPTIONS'],
};

/**
 * Generate random bytes using Web Crypto API
 */
function generateRandomBytes(length: number): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Create HMAC using Web Crypto API
 */
async function createHMAC(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const dataBuffer = encoder.encode(data);
  
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, dataBuffer);
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Generate a cryptographically secure CSRF token
 */
export async function generateCSRFToken(userId?: string, sessionId?: string): Promise<string> {
  const timestamp = Date.now();
  const randomToken = generateRandomBytes(CSRF_CONFIG.tokenLength);
  
  // Create token data
  const tokenData = {
    token: randomToken,
    timestamp,
    userId: userId || '',
    sessionId: sessionId || '',
  };
  
  // Create HMAC hash of the token data
  const hash = await createHMAC(JSON.stringify(tokenData), CSRF_CONFIG.secret);
  
  // Combine token components
  const csrfToken = btoa(JSON.stringify({
    ...tokenData,
    hash,
  })).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  
  return csrfToken;
}

/**
 * Validate a CSRF token
 */
export async function validateCSRFToken(
  token: string,
  userId?: string,
  sessionId?: string
): Promise<{ valid: boolean; reason?: string }> {
  try {
    // Decode the token (handle base64url)
    const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
    const tokenDataString = atob(base64);
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
    
    const expectedHash = await createHMAC(JSON.stringify(verificationData), CSRF_CONFIG.secret);
    
    if (tokenData.hash !== expectedHash) {
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
    const validation = await validateCSRFToken(providedToken, userId || undefined, sessionId);
    
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
export async function provideCSRFToken(
  response: NextResponse,
  userId?: string,
  sessionId?: string
): Promise<string> {
  const token = await generateCSRFToken(userId, sessionId);
  setCSRFTokenCookie(response, token);
  
  // Also add token to response headers for client-side access
  response.headers.set('X-CSRF-Token', token);
  
  return token;
}

export default {
  generateCSRFToken,
  validateCSRFToken,
  extractCSRFToken,
  setCSRFTokenCookie,
  getCSRFTokenFromCookies,
  createCSRFMiddleware,
  provideCSRFToken,
};