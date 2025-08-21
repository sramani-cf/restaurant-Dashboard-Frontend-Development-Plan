/**
 * Secure NextAuth Configuration
 * Comprehensive authentication setup with security hardening
 */

import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { LoginSchema } from '../../../../lib/security/validation';
import { hashPassword, verifyPassword, generateSecureRandom } from '../../../../lib/security/encryption';
import { createSession, getSession } from '../../../../lib/security/session';
import { applyRateLimit } from '../../../../lib/security/rate-limit';
import { SECURITY_CONFIG, SECURITY_EVENTS } from '../../../../config/security.config';

// Extended User interface for additional security fields
interface SecureUser extends User {
  id: string;
  email: string;
  role: string;
  permissions: string[];
  twoFactorEnabled: boolean;
  twoFactorVerified?: boolean;
  lastLoginAt?: Date;
  loginAttempts?: number;
  accountLocked?: boolean;
  passwordChangeRequired?: boolean;
}

// Extended Session interface
interface SecureSession extends Session {
  user: SecureUser;
  sessionId: string;
  loginTime: number;
  deviceFingerprint?: string;
}

// Extended JWT interface
interface SecureJWT extends JWT {
  id: string;
  role: string;
  permissions: string[];
  sessionId: string;
  twoFactorEnabled: boolean;
  twoFactorVerified: boolean;
  loginTime: number;
  lastActivity: number;
}

/**
 * Simulate user database operations
 * In a real application, these would connect to your actual database
 */
const UserDB = {
  async findByEmail(email: string): Promise<SecureUser | null> {
    // TODO: Replace with actual database query
    // This is a mock implementation for demonstration
    const mockUsers: Record<string, any> = {
      'admin@restaurant.com': {
        id: '1',
        email: 'admin@restaurant.com',
        password: await hashPassword('SecurePassword123!'),
        name: 'Admin User',
        role: 'admin',
        permissions: ['*'],
        twoFactorEnabled: false,
        accountLocked: false,
        loginAttempts: 0,
        passwordChangeRequired: false,
      },
      'manager@restaurant.com': {
        id: '2',
        email: 'manager@restaurant.com',
        password: await hashPassword('ManagerPass456!'),
        name: 'Manager User',
        role: 'manager',
        permissions: ['view_dashboard', 'manage_menu', 'view_reports'],
        twoFactorEnabled: true,
        accountLocked: false,
        loginAttempts: 0,
        passwordChangeRequired: false,
      },
    };

    const userData = mockUsers[email];
    if (!userData) return null;

    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      permissions: userData.permissions,
      twoFactorEnabled: userData.twoFactorEnabled,
      lastLoginAt: userData.lastLoginAt,
      loginAttempts: userData.loginAttempts,
      accountLocked: userData.accountLocked,
      passwordChangeRequired: userData.passwordChangeRequired,
      password: userData.password, // Include for verification
    };
  },

  async updateUser(id: string, updates: Partial<SecureUser>): Promise<void> {
    // TODO: Replace with actual database update
    console.log('Updating user:', id, updates);
  },

  async incrementLoginAttempts(email: string): Promise<void> {
    // TODO: Replace with actual database update
    console.log('Incrementing login attempts for:', email);
  },

  async resetLoginAttempts(email: string): Promise<void> {
    // TODO: Replace with actual database update
    console.log('Resetting login attempts for:', email);
  },

  async lockAccount(email: string): Promise<void> {
    // TODO: Replace with actual database update
    console.log('Locking account:', email);
  },
};

/**
 * Generate device fingerprint from request
 */
function generateDeviceFingerprint(req?: NextRequest): string | undefined {
  if (!req) return undefined;

  const userAgent = req.headers.get('user-agent') || '';
  const acceptLanguage = req.headers.get('accept-language') || '';
  const acceptEncoding = req.headers.get('accept-encoding') || '';
  
  const fingerprint = Buffer.from(`${userAgent}|${acceptLanguage}|${acceptEncoding}`)
    .toString('base64')
    .slice(0, 32);
  
  return fingerprint;
}

/**
 * Log security events
 */
function logSecurityEvent(event: string, details: any): void {
  const logData = {
    event,
    timestamp: new Date().toISOString(),
    ...details,
  };
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Auth Security Event:', logData);
  }
  
  // TODO: Integrate with audit logging system
}

/**
 * NextAuth configuration
 */
const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        twoFactorCode: { label: '2FA Code', type: 'text' },
        rememberMe: { label: 'Remember Me', type: 'checkbox' },
      },
      
      async authorize(credentials, req) {
        try {
          // Validate input using Zod schema
          const validatedCredentials = LoginSchema.parse({
            email: credentials?.email || '',
            password: credentials?.password || '',
            twoFactorCode: credentials?.twoFactorCode,
            rememberMe: credentials?.rememberMe === 'true',
          });

          const { email, password, twoFactorCode } = validatedCredentials;
          
          // Find user in database
          const user = await UserDB.findByEmail(email);
          if (!user) {
            logSecurityEvent(SECURITY_EVENTS.LOGIN_FAILURE, {
              email,
              reason: 'user_not_found',
              ip: req?.headers?.['x-forwarded-for'] || 'unknown',
            });
            return null;
          }

          // Check if account is locked
          if (user.accountLocked) {
            logSecurityEvent(SECURITY_EVENTS.LOGIN_BLOCKED, {
              email,
              reason: 'account_locked',
              ip: req?.headers?.['x-forwarded-for'] || 'unknown',
            });
            return null;
          }

          // Verify password
          const isValidPassword = await verifyPassword(password, (user as any).password);
          if (!isValidPassword) {
            await UserDB.incrementLoginAttempts(email);
            
            logSecurityEvent(SECURITY_EVENTS.LOGIN_FAILURE, {
              email,
              reason: 'invalid_password',
              ip: req?.headers?.['x-forwarded-for'] || 'unknown',
            });

            // Lock account after max attempts
            if ((user.loginAttempts || 0) >= SECURITY_CONFIG.rateLimiting.login.maxAttempts) {
              await UserDB.lockAccount(email);
              
              logSecurityEvent(SECURITY_EVENTS.ACCOUNT_LOCKED, {
                email,
                reason: 'max_login_attempts',
                attempts: user.loginAttempts,
              });
            }
            
            return null;
          }

          // Check 2FA if enabled
          if (user.twoFactorEnabled) {
            if (!twoFactorCode) {
              // Return partial user info to indicate 2FA is required
              return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                permissions: user.permissions,
                twoFactorEnabled: true,
                twoFactorVerified: false,
              };
            }

            // Verify 2FA code
            const isValid2FA = await verify2FACode(user.id, twoFactorCode);
            if (!isValid2FA) {
              logSecurityEvent(SECURITY_EVENTS.TWO_FACTOR_VERIFICATION_FAILURE, {
                userId: user.id,
                email,
                ip: req?.headers?.['x-forwarded-for'] || 'unknown',
              });
              return null;
            }

            logSecurityEvent(SECURITY_EVENTS.TWO_FACTOR_VERIFICATION_SUCCESS, {
              userId: user.id,
              email,
            });
          }

          // Reset login attempts on successful login
          await UserDB.resetLoginAttempts(email);

          // Update last login time
          await UserDB.updateUser(user.id, {
            lastLoginAt: new Date(),
          });

          logSecurityEvent(SECURITY_EVENTS.LOGIN_SUCCESS, {
            userId: user.id,
            email,
            ip: req?.headers?.['x-forwarded-for'] || 'unknown',
            userAgent: req?.headers?.['user-agent'],
          });

          // Return user object for successful authentication
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            permissions: user.permissions,
            twoFactorEnabled: user.twoFactorEnabled,
            twoFactorVerified: !user.twoFactorEnabled || !!twoFactorCode,
            passwordChangeRequired: user.passwordChangeRequired,
          };

        } catch (error) {
          console.error('Authentication error:', error);
          
          logSecurityEvent('authentication_error', {
            error: (error as Error).message,
            email: credentials?.email,
          });
          
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: SECURITY_CONFIG.session.maxAge / 1000, // Convert to seconds
    updateAge: 15 * 60, // Update session every 15 minutes
  },

  jwt: {
    maxAge: SECURITY_CONFIG.session.maxAge / 1000,
    encode: async ({ token, secret }) => {
      // Custom JWT encoding with additional security
      const { SignJWT } = await import('jose');
      const encodedSecret = new TextEncoder().encode(secret);
      
      return await new SignJWT(token as any)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer(SECURITY_CONFIG.jwt.issuer)
        .setAudience(SECURITY_CONFIG.jwt.audience)
        .setExpirationTime('24h')
        .sign(encodedSecret);
    },
    
    decode: async ({ token, secret }) => {
      // Custom JWT decoding with validation
      if (!token) return null;
      
      try {
        const { jwtVerify } = await import('jose');
        const encodedSecret = new TextEncoder().encode(secret);
        
        const { payload } = await jwtVerify(token, encodedSecret, {
          issuer: SECURITY_CONFIG.jwt.issuer,
          audience: SECURITY_CONFIG.jwt.audience,
        });
        
        return payload as any;
      } catch (error) {
        console.error('JWT decode error:', error);
        return null;
      }
    },
  },

  callbacks: {
    async jwt({ token, user, account, trigger }) {
      // Initial sign in
      if (user) {
        const secureUser = user as SecureUser;
        const secureToken: SecureJWT = {
          ...token,
          id: secureUser.id,
          role: secureUser.role,
          permissions: secureUser.permissions,
          sessionId: generateSecureRandom(32),
          twoFactorEnabled: secureUser.twoFactorEnabled,
          twoFactorVerified: secureUser.twoFactorVerified || false,
          loginTime: Date.now(),
          lastActivity: Date.now(),
        };
        
        return secureToken;
      }

      // Subsequent requests - validate and update token
      const secureToken = token as SecureJWT;
      const now = Date.now();
      
      // Check token expiration
      if (secureToken.loginTime && (now - secureToken.loginTime) > SECURITY_CONFIG.session.maxAge) {
        logSecurityEvent(SECURITY_EVENTS.SESSION_EXPIRED, {
          userId: secureToken.id,
          sessionId: secureToken.sessionId,
        });
        return {}; // Return empty token to force re-authentication
      }

      // Update last activity
      secureToken.lastActivity = now;
      
      return secureToken;
    },

    async session({ session, token }) {
      const secureToken = token as SecureJWT;
      const secureSession: SecureSession = {
        ...session,
        user: {
          ...session.user,
          id: secureToken.id,
          email: secureToken.email || '',
          role: secureToken.role,
          permissions: secureToken.permissions,
          twoFactorEnabled: secureToken.twoFactorEnabled,
          twoFactorVerified: secureToken.twoFactorVerified,
        },
        sessionId: secureToken.sessionId,
        loginTime: secureToken.loginTime,
      };

      return secureSession;
    },

    async signIn({ user, account, profile, credentials }) {
      // Additional sign-in validation can be added here
      return true;
    },

    async redirect({ url, baseUrl }) {
      // Ensure redirects stay within the application
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  cookies: {
    sessionToken: {
      name: SECURITY_CONFIG.session.cookieName,
      options: {
        httpOnly: SECURITY_CONFIG.session.httpOnly,
        sameSite: SECURITY_CONFIG.session.sameSite,
        path: SECURITY_CONFIG.session.path,
        secure: SECURITY_CONFIG.session.secure,
        domain: SECURITY_CONFIG.session.domain,
      },
    },
  },

  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },

  events: {
    async signIn({ user, account, profile, isNewUser }) {
      logSecurityEvent(SECURITY_EVENTS.SESSION_CREATED, {
        userId: user.id,
        method: account?.provider || 'credentials',
        isNewUser,
      });
    },

    async signOut({ session, token }) {
      const secureToken = token as SecureJWT;
      logSecurityEvent(SECURITY_EVENTS.SESSION_DESTROYED, {
        userId: secureToken?.id,
        sessionId: secureToken?.sessionId,
      });
    },

    async session({ session, token }) {
      // Update session activity tracking
      const secureToken = token as SecureJWT;
      if (secureToken?.id) {
        // Could update database with last activity time
      }
    },
  },
};

/**
 * Mock 2FA verification function
 * In a real application, this would verify against stored 2FA secrets
 */
async function verify2FACode(userId: string, code: string): Promise<boolean> {
  // TODO: Implement actual 2FA verification with TOTP
  // This is a mock implementation for demonstration
  
  // Simulate 2FA verification delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Mock verification - in reality, use libraries like 'speakeasy' or 'otplib'
  return code === '123456';
}

/**
 * Enhanced authentication handler with additional security measures
 */
async function authHandler(req: NextRequest) {
  // Apply rate limiting for auth requests
  try {
    const result = await applyRateLimit(req, 'login');
    if (!result.allowed) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many authentication attempts',
          resetTime: result.reset.toISOString(),
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': result.total.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': result.reset.toISOString(),
          },
        }
      );
    }
  } catch (error) {
    console.error('Rate limiting error:', error);
  }

  // Generate device fingerprint for additional security
  const deviceFingerprint = generateDeviceFingerprint(req);
  if (deviceFingerprint) {
    // Store fingerprint for session validation
    req.headers.set('x-device-fingerprint', deviceFingerprint);
  }

  // Continue with NextAuth handler
  return NextAuth(req as any, authOptions);
}

export { authHandler as GET, authHandler as POST };

export default authOptions;