/**
 * Secure Session Management for Edge Runtime
 * Uses Web Crypto API instead of Node.js crypto module
 */

import { getIronSession, IronSession, SessionOptions } from 'iron-session';
import { NextRequest, NextResponse } from 'next/server';
import { SECURITY_CONFIG, SECURITY_EVENTS } from '../../config/security.config';

// Session Data Interface
export interface SessionData {
  userId: string;
  email: string;
  role: string;
  permissions: string[];
  firstName: string;
  lastName: string;
  isLoggedIn: boolean;
  loginTime: number;
  lastActivity: number;
  ipAddress?: string;
  userAgent?: string;
  sessionId: string;
  csrfToken?: string;
  twoFactorVerified: boolean;
  deviceFingerprint?: string;
  loginAttempts?: number;
  accountLocked?: boolean;
  passwordChangeRequired?: boolean;
}

// Session Configuration
const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long',
  cookieName: SECURITY_CONFIG.session.cookieName,
  cookieOptions: {
    secure: SECURITY_CONFIG.session.secure,
    httpOnly: SECURITY_CONFIG.session.httpOnly,
    maxAge: SECURITY_CONFIG.session.maxAge,
    sameSite: SECURITY_CONFIG.session.sameSite,
    path: SECURITY_CONFIG.session.path,
    domain: SECURITY_CONFIG.session.domain,
  },
  ttl: SECURITY_CONFIG.session.maxAge / 1000, // Convert to seconds
};

/**
 * Generate random session ID using Web Crypto API
 */
export function generateSessionId(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Create hash using Web Crypto API
 */
export async function createHash(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Get session from request
 */
export async function getSession(
  req: NextRequest,
  res: NextResponse
): Promise<IronSession<SessionData>> {
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  return session;
}

/**
 * Create a new session
 */
export async function createSession(
  req: NextRequest,
  res: NextResponse,
  userData: Partial<SessionData>
): Promise<IronSession<SessionData>> {
  const session = await getSession(req, res);
  
  // Generate session ID
  const sessionId = generateSessionId();
  
  // Set session data
  Object.assign(session, {
    ...userData,
    sessionId,
    isLoggedIn: true,
    loginTime: Date.now(),
    lastActivity: Date.now(),
    ipAddress: req.ip || req.headers.get('x-forwarded-for') || 'unknown',
    userAgent: req.headers.get('user-agent') || 'unknown',
    twoFactorVerified: userData.twoFactorVerified || false,
  });
  
  await session.save();
  
  // Log session creation
  logSessionEvent(SECURITY_EVENTS.SESSION_CREATED, {
    userId: userData.userId,
    sessionId,
    ipAddress: session.ipAddress,
  });
  
  return session;
}

/**
 * Validate session
 */
export async function validateSession(
  session: IronSession<SessionData>
): Promise<{ valid: boolean; reason?: string }> {
  // Check if session exists and is logged in
  if (!session || !session.isLoggedIn) {
    return { valid: false, reason: 'No active session' };
  }
  
  // Check session timeout
  const now = Date.now();
  const sessionAge = now - session.loginTime;
  const inactivityPeriod = now - session.lastActivity;
  
  if (sessionAge > SECURITY_CONFIG.session.absoluteTimeout) {
    return { valid: false, reason: 'Session expired (absolute timeout)' };
  }
  
  if (inactivityPeriod > SECURITY_CONFIG.session.idleTimeout) {
    return { valid: false, reason: 'Session expired (idle timeout)' };
  }
  
  // Check if account is locked
  if (session.accountLocked) {
    return { valid: false, reason: 'Account locked' };
  }
  
  // Check if password change is required
  if (session.passwordChangeRequired) {
    return { valid: false, reason: 'Password change required' };
  }
  
  return { valid: true };
}

/**
 * Refresh session activity
 */
export async function refreshSession(
  session: IronSession<SessionData>
): Promise<void> {
  session.lastActivity = Date.now();
  await session.save();
}

/**
 * Destroy session
 */
export async function destroySession(
  session: IronSession<SessionData>
): Promise<void> {
  const sessionId = session.sessionId;
  const userId = session.userId;
  
  session.destroy();
  
  // Log session destruction
  logSessionEvent(SECURITY_EVENTS.SESSION_DESTROYED, {
    userId,
    sessionId,
  });
}

/**
 * Session middleware for API routes
 */
export function withSession(
  handler: (
    req: NextRequest,
    res: NextResponse,
    session: IronSession<SessionData>
  ) => Promise<NextResponse> | NextResponse
) {
  return async (req: NextRequest, res: NextResponse): Promise<NextResponse> => {
    const session = await getSession(req, res);
    
    // Validate session
    const validation = await validateSession(session);
    if (!validation.valid) {
      return new NextResponse(
        JSON.stringify({
          error: 'Unauthorized',
          message: validation.reason,
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    // Refresh session activity
    await refreshSession(session);
    
    // Call the handler with session
    return handler(req, res, session);
  };
}

/**
 * Check if user has required permission
 */
export function hasPermission(
  session: IronSession<SessionData>,
  permission: string
): boolean {
  return session.permissions?.includes(permission) || false;
}

/**
 * Check if user has required role
 */
export function hasRole(
  session: IronSession<SessionData>,
  role: string
): boolean {
  return session.role === role;
}

/**
 * Log session events
 */
function logSessionEvent(event: string, details: any): void {
  const logData = {
    event,
    timestamp: new Date().toISOString(),
    ...details,
  };
  
  // In production, this would go to a proper logging service
  if (process.env.NODE_ENV === 'development') {
    console.log('Session Event:', logData);
  }
}

/**
 * Session utilities for client-side
 */
export const SessionUtils = {
  /**
   * Check if user is logged in
   */
  async isLoggedIn(): Promise<boolean> {
    try {
      const response = await fetch('/api/auth/session');
      return response.ok;
    } catch {
      return false;
    }
  },
  
  /**
   * Get current session data
   */
  async getSessionData(): Promise<SessionData | null> {
    try {
      const response = await fetch('/api/auth/session');
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch {
      return null;
    }
  },
  
  /**
   * Logout
   */
  async logout(): Promise<void> {
    await fetch('/api/auth/logout', { method: 'POST' });
  },
};

/**
 * Session middleware for Next.js middleware
 */
export function createSessionMiddleware() {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    // This is a simplified version for middleware
    // Actual session handling is done in API routes
    return null;
  };
}

export default {
  getSession,
  createSession,
  validateSession,
  refreshSession,
  destroySession,
  withSession,
  hasPermission,
  hasRole,
  generateSessionId,
  createSessionMiddleware,
  SessionUtils,
};