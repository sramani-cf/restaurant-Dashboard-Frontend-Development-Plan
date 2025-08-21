/**
 * Rate Limiting Implementation
 * Comprehensive rate limiting with sliding window algorithm and Redis support
 */

import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';
import { SECURITY_CONFIG, SECURITY_EVENTS } from '../../config/security.config';
// Note: Redis support removed for Edge runtime compatibility
// import Redis from 'ioredis';

// Rate Limiter Configuration
interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  blockDuration?: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  keyGenerator?: (req: NextRequest) => string;
  onLimitReached?: (req: NextRequest, identifier: string) => void;
  whitelist?: string[];
  blacklist?: string[];
}

// Rate Limiter Instance
interface RateLimiterInstance {
  limiter: RateLimiterMemory;
  config: RateLimitConfig;
}

// Global rate limiters
const rateLimiters = new Map<string, RateLimiterInstance>();

// Note: Redis connection removed for Edge runtime compatibility
// In production, consider using Upstash Redis or KV storage for Edge-compatible persistence

/**
 * Create a rate limiter instance
 */
export function createRateLimiter(
  name: string,
  config: RateLimitConfig
): RateLimiterInstance {
  const limiterOptions = {
    keyPrefix: `rate_limit_${name}`,
    points: config.maxRequests,
    duration: Math.ceil(config.windowMs / 1000), // Convert to seconds
    blockDuration: Math.ceil((config.blockDuration || config.windowMs) / 1000),
    execEvenly: true, // Spread requests evenly across the duration
  };
  
  // Using memory-only rate limiter for Edge runtime compatibility
  const limiter = new RateLimiterMemory(limiterOptions);
  
  const instance = { limiter, config };
  rateLimiters.set(name, instance);
  
  return instance;
}

/**
 * Get rate limiter instance
 */
export function getRateLimiter(name: string): RateLimiterInstance | null {
  return rateLimiters.get(name) || null;
}

/**
 * Generate rate limit key from request
 */
function generateKey(req: NextRequest, config: RateLimitConfig): string {
  if (config.keyGenerator) {
    return config.keyGenerator(req);
  }
  
  // Default key generation: IP + User-Agent hash
  const ip = req.ip || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  
  // For authenticated requests, include user ID
  const userId = req.headers.get('x-user-id') || req.cookies.get('userId')?.value;
  
  return userId ? `${userId}:${ip}` : `${ip}:${Buffer.from(userAgent).toString('base64').slice(0, 20)}`;
}

/**
 * Check if IP is whitelisted
 */
function isWhitelisted(ip: string, whitelist?: string[]): boolean {
  if (!whitelist || whitelist.length === 0) return false;
  
  return whitelist.some(whitelistedIp => {
    // Support CIDR notation and exact matches
    if (whitelistedIp.includes('/')) {
      // TODO: Implement CIDR matching
      return false;
    }
    return ip === whitelistedIp;
  });
}

/**
 * Check if IP is blacklisted
 */
function isBlacklisted(ip: string, blacklist?: string[]): boolean {
  if (!blacklist || blacklist.length === 0) return false;
  
  return blacklist.includes(ip);
}

/**
 * Apply rate limiting to request
 */
export async function applyRateLimit(
  req: NextRequest,
  limiterName: string
): Promise<{ allowed: boolean; reset: Date; remaining: number; total: number }> {
  const limiterInstance = getRateLimiter(limiterName);
  
  if (!limiterInstance) {
    throw new Error(`Rate limiter '${limiterName}' not found`);
  }
  
  const { limiter, config } = limiterInstance;
  const key = generateKey(req, config);
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
  
  // Check whitelist
  if (isWhitelisted(ip, config.whitelist)) {
    return {
      allowed: true,
      reset: new Date(Date.now() + config.windowMs),
      remaining: config.maxRequests,
      total: config.maxRequests,
    };
  }
  
  // Check blacklist
  if (isBlacklisted(ip, config.blacklist)) {
    logSecurityEvent(SECURITY_EVENTS.IP_BLOCKED, {
      ip,
      reason: 'blacklisted',
      limiter: limiterName,
    });
    
    return {
      allowed: false,
      reset: new Date(Date.now() + config.blockDuration || config.windowMs),
      remaining: 0,
      total: config.maxRequests,
    };
  }
  
  try {
    const res = await limiter.consume(key);
    
    return {
      allowed: true,
      reset: new Date(Date.now() + res.msBeforeNext),
      remaining: res.remainingPoints || 0,
      total: config.maxRequests,
    };
  } catch (rejRes: any) {
    const result = rejRes as RateLimiterRes;
    
    // Log rate limit exceeded
    logSecurityEvent(SECURITY_EVENTS.RATE_LIMIT_EXCEEDED, {
      ip,
      key,
      limiter: limiterName,
      totalHits: result.totalHits,
      remainingPoints: result.remainingPoints,
      msBeforeNext: result.msBeforeNext,
    });
    
    if (config.onLimitReached) {
      config.onLimitReached(req, key);
    }
    
    return {
      allowed: false,
      reset: new Date(Date.now() + result.msBeforeNext),
      remaining: result.remainingPoints || 0,
      total: config.maxRequests,
    };
  }
}

/**
 * Create rate limiting middleware
 */
export function createRateLimitMiddleware(limiterName: string) {
  return async (req: NextRequest): Promise<NextResponse | null> => {
    try {
      const result = await applyRateLimit(req, limiterName);
      
      if (!result.allowed) {
        const response = NextResponse.json(
          {
            error: 'Too many requests',
            message: 'Rate limit exceeded. Please try again later.',
            resetTime: result.reset.toISOString(),
          },
          { status: 429 }
        );
        
        // Add rate limit headers
        response.headers.set('X-RateLimit-Limit', result.total.toString());
        response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
        response.headers.set('X-RateLimit-Reset', result.reset.toISOString());
        response.headers.set('Retry-After', Math.ceil((result.reset.getTime() - Date.now()) / 1000).toString());
        
        return response;
      }
      
      return null; // Continue to next middleware
    } catch (error) {
      console.error('Rate limiting error:', error);
      return null; // Continue to next middleware on error
    }
  };
}

/**
 * Initialize default rate limiters
 */
export function initializeDefaultRateLimiters(): void {
  // General API rate limiting
  createRateLimiter('api', {
    windowMs: SECURITY_CONFIG.rateLimiting.api.windowMs,
    maxRequests: SECURITY_CONFIG.rateLimiting.api.maxRequests,
    skipSuccessfulRequests: SECURITY_CONFIG.rateLimiting.api.skipSuccessfulRequests,
    skipFailedRequests: SECURITY_CONFIG.rateLimiting.api.skipFailedRequests,
  });
  
  // Login attempts rate limiting
  createRateLimiter('login', {
    windowMs: SECURITY_CONFIG.rateLimiting.login.windowMs,
    maxRequests: SECURITY_CONFIG.rateLimiting.login.maxAttempts,
    blockDuration: SECURITY_CONFIG.rateLimiting.login.blockDuration,
    keyGenerator: (req) => {
      // Rate limit by IP + email combination
      const ip = req.ip || 'unknown';
      const email = req.headers.get('x-login-email') || 'unknown';
      return `${ip}:${email}`;
    },
  });
  
  // Password reset rate limiting
  createRateLimiter('password-reset', {
    windowMs: SECURITY_CONFIG.rateLimiting.passwordReset.windowMs,
    maxRequests: SECURITY_CONFIG.rateLimiting.passwordReset.maxAttempts,
    blockDuration: SECURITY_CONFIG.rateLimiting.passwordReset.blockDuration,
    keyGenerator: (req) => {
      // Rate limit by email
      const email = req.headers.get('x-reset-email') || req.ip || 'unknown';
      return `password-reset:${email}`;
    },
  });
  
  // Email verification rate limiting
  createRateLimiter('email-verification', {
    windowMs: SECURITY_CONFIG.rateLimiting.emailVerification.windowMs,
    maxRequests: SECURITY_CONFIG.rateLimiting.emailVerification.maxAttempts,
    blockDuration: SECURITY_CONFIG.rateLimiting.emailVerification.blockDuration,
    keyGenerator: (req) => {
      const email = req.headers.get('x-verification-email') || req.ip || 'unknown';
      return `email-verification:${email}`;
    },
  });
  
  // File upload rate limiting
  createRateLimiter('file-upload', {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 50, // 50 uploads per hour
    blockDuration: 60 * 60 * 1000, // 1 hour block
    keyGenerator: (req) => {
      const userId = req.headers.get('x-user-id') || req.ip || 'unknown';
      return `file-upload:${userId}`;
    },
  });
  
  // Search/Query rate limiting
  createRateLimiter('search', {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30, // 30 searches per minute
    blockDuration: 5 * 60 * 1000, // 5 minutes block
  });
  
  // Report generation rate limiting
  createRateLimiter('reports', {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10, // 10 reports per hour
    blockDuration: 60 * 60 * 1000, // 1 hour block
    keyGenerator: (req) => {
      const userId = req.headers.get('x-user-id') || req.ip || 'unknown';
      return `reports:${userId}`;
    },
  });
  
  // Two-factor authentication rate limiting
  createRateLimiter('2fa', {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 attempts per 15 minutes
    blockDuration: 30 * 60 * 1000, // 30 minutes block
    keyGenerator: (req) => {
      const userId = req.headers.get('x-user-id') || req.ip || 'unknown';
      return `2fa:${userId}`;
    },
  });
  
  // Admin actions rate limiting
  createRateLimiter('admin', {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 100, // 100 admin actions per hour
    blockDuration: 60 * 60 * 1000, // 1 hour block
    keyGenerator: (req) => {
      const userId = req.headers.get('x-user-id') || req.ip || 'unknown';
      return `admin:${userId}`;
    },
  });
}

/**
 * Dynamic rate limiter for specific endpoints
 */
export function createDynamicRateLimit(
  endpoint: string,
  config: Partial<RateLimitConfig> = {}
) {
  const defaultConfig: RateLimitConfig = {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60, // 60 requests per minute
    ...config,
  };
  
  const limiterName = `dynamic_${endpoint}`;
  return createRateLimiter(limiterName, defaultConfig);
}

/**
 * Get rate limit status for a request
 */
export async function getRateLimitStatus(
  req: NextRequest,
  limiterName: string
): Promise<{ remaining: number; reset: Date; total: number }> {
  const limiterInstance = getRateLimiter(limiterName);
  
  if (!limiterInstance) {
    throw new Error(`Rate limiter '${limiterName}' not found`);
  }
  
  const { limiter, config } = limiterInstance;
  const key = generateKey(req, config);
  
  try {
    const res = await limiter.get(key);
    
    return {
      remaining: res?.remainingPoints || config.maxRequests,
      reset: new Date(Date.now() + (res?.msBeforeNext || config.windowMs)),
      total: config.maxRequests,
    };
  } catch (error) {
    return {
      remaining: config.maxRequests,
      reset: new Date(Date.now() + config.windowMs),
      total: config.maxRequests,
    };
  }
}

/**
 * Reset rate limit for a specific key
 */
export async function resetRateLimit(
  req: NextRequest,
  limiterName: string
): Promise<void> {
  const limiterInstance = getRateLimiter(limiterName);
  
  if (!limiterInstance) {
    throw new Error(`Rate limiter '${limiterName}' not found`);
  }
  
  const { limiter, config } = limiterInstance;
  const key = generateKey(req, config);
  
  await limiter.delete(key);
}

/**
 * Higher-order function for API route protection
 */
export function withRateLimit<T extends any[]>(
  limiterName: string,
  handler: (...args: T) => Promise<NextResponse> | NextResponse
) {
  return async (req: NextRequest, ...args: any[]): Promise<NextResponse> => {
    try {
      const result = await applyRateLimit(req, limiterName);
      
      if (!result.allowed) {
        const response = NextResponse.json(
          {
            error: 'Too many requests',
            message: 'Rate limit exceeded. Please try again later.',
          },
          { status: 429 }
        );
        
        response.headers.set('X-RateLimit-Limit', result.total.toString());
        response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
        response.headers.set('X-RateLimit-Reset', result.reset.toISOString());
        
        return response;
      }
      
      // Continue with original handler
      const response = await handler(req, ...args);
      
      // Add rate limit headers to successful responses
      response.headers.set('X-RateLimit-Limit', result.total.toString());
      response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
      response.headers.set('X-RateLimit-Reset', result.reset.toISOString());
      
      return response;
    } catch (error) {
      console.error('Rate limiting error:', error);
      // Continue with original handler on rate limiting error
      return handler(req, ...args);
    }
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
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Rate Limit Event:', logData);
  }
  
  // TODO: Integrate with audit logging system
}

/**
 * Cleanup function for graceful shutdown
 */
export async function cleanup(): Promise<void> {
  // Cleanup not needed for memory-only rate limiter
  // In production with persistent storage, implement cleanup here
}

// Initialize default rate limiters on module load
if (process.env.NODE_ENV !== 'test') {
  initializeDefaultRateLimiters();
}

export default {
  createRateLimiter,
  getRateLimiter,
  applyRateLimit,
  createRateLimitMiddleware,
  initializeDefaultRateLimiters,
  createDynamicRateLimit,
  getRateLimitStatus,
  resetRateLimit,
  withRateLimit,
  cleanup,
};