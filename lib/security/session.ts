/**
 * Secure Session Management
 * Comprehensive session handling with encryption, validation, and security features
 */

import { getIronSession, IronSession, SessionOptions } from 'iron-session';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomBytes, createHash, timingSafeEqual } from 'crypto';
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
 * Get session from request
 */
export async function getSession(request?: NextRequest): Promise<IronSession<SessionData>> {
  if (request) {
    return getIronSession<SessionData>(request, new NextResponse(), sessionOptions);
  }
  
  // Server-side usage with cookies()
  const cookieStore = cookies();
  return getIronSession<SessionData>(
    { cookies: cookieStore } as any,
    new NextResponse(),
    sessionOptions
  );
}

/**
 * Create a new session
 */
export async function createSession(
  userData: Partial<SessionData>,
  request?: NextRequest,
  response?: NextResponse
): Promise<IronSession<SessionData>> {
  const session = request && response 
    ? await getIronSession<SessionData>(request, response, sessionOptions)
    : await getSession();
  
  const now = Date.now();
  const sessionId = generateSessionId();
  
  // Set session data
  Object.assign(session, {
    ...userData,
    isLoggedIn: true,
    loginTime: now,
    lastActivity: now,
    sessionId,
    twoFactorVerified: userData.twoFactorVerified || false,
    loginAttempts: 0,
    accountLocked: false,
    passwordChangeRequired: userData.passwordChangeRequired || false,
    ipAddress: request?.ip,
    userAgent: request?.headers.get('user-agent'),
    deviceFingerprint: generateDeviceFingerprint(request),
  });
  
  await session.save();
  
  // Log session creation
  logSecurityEvent(SECURITY_EVENTS.SESSION_CREATED, {
    userId: userData.userId,
    sessionId,
    ipAddress: request?.ip,
    userAgent: request?.headers.get('user-agent'),
  });
  
  return session;
}

/**
 * Destroy a session
 */
export async function destroySession(
  session?: IronSession<SessionData>,
  request?: NextRequest,
  response?: NextResponse
): Promise<void> {
  const sessionToDestroy = session || 
    (request && response 
      ? await getIronSession<SessionData>(request, response, sessionOptions)
      : await getSession());
  
  const sessionData = { ...sessionToDestroy };
  
  sessionToDestroy.destroy();
  
  // Log session destruction
  if (sessionData.sessionId) {
    logSecurityEvent(SECURITY_EVENTS.SESSION_DESTROYED, {
      userId: sessionData.userId,
      sessionId: sessionData.sessionId,
      ipAddress: sessionData.ipAddress,
    });
  }
}

/**
 * Validate session security
 */
export async function validateSession(
  session: IronSession<SessionData>,
  request?: NextRequest
): Promise<{ valid: boolean; reason?: string; action?: 'logout' | 'refresh' | 'lock' }> {
  if (!session.isLoggedIn || !session.userId) {
    return { valid: false, reason: 'Not logged in' };
  }
  
  const now = Date.now();
  
  // Check session timeout
  if (session.lastActivity && (now - session.lastActivity) > SECURITY_CONFIG.session.maxAge) {
    logSecurityEvent(SECURITY_EVENTS.SESSION_EXPIRED, {
      userId: session.userId,
      sessionId: session.sessionId,
    });
    return { valid: false, reason: 'Session expired', action: 'logout' };
  }
  
  // Check for account lockout
  if (session.accountLocked) {
    return { valid: false, reason: 'Account locked', action: 'lock' };
  }
  
  // Check IP address consistency (if configured)
  if (process.env.ENFORCE_IP_CONSISTENCY === 'true' && request?.ip && session.ipAddress) {
    if (request.ip !== session.ipAddress) {
      logSecurityEvent(SECURITY_EVENTS.SUSPICIOUS_ACTIVITY, {
        userId: session.userId,
        sessionId: session.sessionId,
        originalIP: session.ipAddress,
        currentIP: request.ip,
        reason: 'IP address mismatch',
      });
      return { valid: false, reason: 'IP address mismatch', action: 'logout' };
    }
  }
  
  // Check device fingerprint consistency
  if (request && session.deviceFingerprint) {
    const currentFingerprint = generateDeviceFingerprint(request);
    if (currentFingerprint !== session.deviceFingerprint) {
      logSecurityEvent(SECURITY_EVENTS.SUSPICIOUS_ACTIVITY, {
        userId: session.userId,
        sessionId: session.sessionId,
        reason: 'Device fingerprint mismatch',
      });
      // Don't automatically logout for device fingerprint mismatch, but log it
    }
  }
  
  // Update last activity
  session.lastActivity = now;
  await session.save();
  
  return { valid: true };
}

/**
 * Refresh session (extend expiration)
 */
export async function refreshSession(
  session: IronSession<SessionData>,
  request?: NextRequest
): Promise<void> {
  const validation = await validateSession(session, request);
  
  if (validation.valid) {
    session.lastActivity = Date.now();
    await session.save();
    
    logSecurityEvent(SECURITY_EVENTS.SESSION_CREATED, {
      userId: session.userId,
      sessionId: session.sessionId,
      type: 'refresh',
    });
  }
}

/**
 * Generate unique session ID
 */
function generateSessionId(): string {
  return randomBytes(32).toString('hex');
}

/**
 * Generate device fingerprint
 */
function generateDeviceFingerprint(request?: NextRequest): string | undefined {
  if (!request) return undefined;
  
  const components = [
    request.headers.get('user-agent') || '',
    request.headers.get('accept-language') || '',
    request.headers.get('accept-encoding') || '',
  ].join('|');
  
  return createHash('sha256').update(components).digest('hex');
}

/**
 * Check if user has specific permission
 */
export function hasPermission(session: IronSession<SessionData>, permission: string): boolean {
  if (!session.isLoggedIn) return false;
  
  // Admin users have all permissions
  if (session.role === 'admin') return true;
  
  return session.permissions?.includes(permission) || false;
}

/**
 * Check if user has any of the specified roles
 */
export function hasRole(session: IronSession<SessionData>, roles: string | string[]): boolean {
  if (!session.isLoggedIn) return false;
  
  const roleArray = Array.isArray(roles) ? roles : [roles];
  return roleArray.includes(session.role);
}

/**
 * Update session permissions
 */
export async function updateSessionPermissions(
  session: IronSession<SessionData>,
  permissions: string[]
): Promise<void> {
  session.permissions = permissions;
  await session.save();
}

/**
 * Lock user account
 */
export async function lockAccount(
  session: IronSession<SessionData>,
  reason: string
): Promise<void> {
  session.accountLocked = true;
  session.loginAttempts = (session.loginAttempts || 0) + 1;
  await session.save();
  
  logSecurityEvent(SECURITY_EVENTS.ACCOUNT_LOCKED, {
    userId: session.userId,
    sessionId: session.sessionId,
    reason,
    attempts: session.loginAttempts,
  });
}

/**
 * Unlock user account
 */
export async function unlockAccount(
  session: IronSession<SessionData>
): Promise<void> {
  session.accountLocked = false;
  session.loginAttempts = 0;
  await session.save();
  
  logSecurityEvent(SECURITY_EVENTS.ACCOUNT_UNLOCKED, {
    userId: session.userId,
    sessionId: session.sessionId,
  });
}

/**
 * Require password change
 */
export async function requirePasswordChange(
  session: IronSession<SessionData>
): Promise<void> {
  session.passwordChangeRequired = true;
  await session.save();
}

/**
 * Mark two-factor as verified
 */
export async function markTwoFactorVerified(
  session: IronSession<SessionData>
): Promise<void> {
  session.twoFactorVerified = true;
  await session.save();
  
  logSecurityEvent(SECURITY_EVENTS.TWO_FACTOR_VERIFICATION_SUCCESS, {
    userId: session.userId,
    sessionId: session.sessionId,
  });
}

/**
 * Session middleware for Next.js
 */
export function createSessionMiddleware() {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    try {
      const response = NextResponse.next();
      const session = await getIronSession<SessionData>(request, response, sessionOptions);
      
      if (session.isLoggedIn) {
        const validation = await validateSession(session, request);
        
        if (!validation.valid) {
          // Handle invalid session
          switch (validation.action) {
            case 'logout':
              await destroySession(session, request, response);
              break;
            case 'lock':
              // Redirect to account locked page
              return NextResponse.redirect(new URL('/auth/account-locked', request.url));
            case 'refresh':
              await refreshSession(session, request);
              break;
          }
        }
      }
      
      return response;
    } catch (error) {
      console.error('Session middleware error:', error);
      return null; // Continue to next middleware
    }
  };
}

/**
 * HOC for protecting API routes with session
 */
export function withSessionProtection<T extends any[]>(
  handler: (session: IronSession<SessionData>, ...args: T) => Promise<NextResponse> | NextResponse,
  requiredRole?: string | string[],
  requiredPermission?: string
) {
  return async (request: NextRequest, ...args: any[]): Promise<NextResponse> => {
    try {
      const response = NextResponse.next();
      const session = await getIronSession<SessionData>(request, response, sessionOptions);
      
      // Check if user is logged in
      if (!session.isLoggedIn) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
      
      // Validate session
      const validation = await validateSession(session, request);
      if (!validation.valid) {
        return NextResponse.json(
          { error: 'Session invalid or expired' },
          { status: 401 }
        );
      }
      
      // Check role requirements
      if (requiredRole && !hasRole(session, requiredRole)) {
        logSecurityEvent(SECURITY_EVENTS.PERMISSION_DENIED, {
          userId: session.userId,
          sessionId: session.sessionId,
          requiredRole,
          userRole: session.role,
        });
        
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }
      
      // Check permission requirements
      if (requiredPermission && !hasPermission(session, requiredPermission)) {
        logSecurityEvent(SECURITY_EVENTS.PERMISSION_DENIED, {
          userId: session.userId,
          sessionId: session.sessionId,
          requiredPermission,
          userPermissions: session.permissions,
        });
        
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }
      
      // Call the original handler with session
      return handler(session, request, ...args);
    } catch (error) {
      console.error('Session protection error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

/**
 * Get session data for client-side use (sanitized)
 */
export function getClientSafeSessionData(session: IronSession<SessionData>) {
  if (!session.isLoggedIn) {
    return { isLoggedIn: false };
  }
  
  return {
    isLoggedIn: true,
    userId: session.userId,
    email: session.email,
    role: session.role,
    firstName: session.firstName,
    lastName: session.lastName,
    permissions: session.permissions,
    twoFactorVerified: session.twoFactorVerified,
    passwordChangeRequired: session.passwordChangeRequired,
  };
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
  
  // In production, this would typically go to a proper logging service
  if (process.env.NODE_ENV === 'development') {
    console.log('Security Event:', logData);
  }
  
  // TODO: Integrate with audit logging system
}

export default {
  getSession,
  createSession,
  destroySession,
  validateSession,
  refreshSession,
  hasPermission,
  hasRole,
  updateSessionPermissions,
  lockAccount,
  unlockAccount,
  requirePasswordChange,
  markTwoFactorVerified,
  createSessionMiddleware,
  withSessionProtection,
  getClientSafeSessionData,
};