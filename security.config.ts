/**
 * Central Security Configuration
 * Provides centralized security settings and constants for the restaurant dashboard
 */

export const SECURITY_CONFIG = {
  // Authentication & Session
  session: {
    cookieName: 'restaurant-dashboard-session',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'strict' as const,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    path: '/',
    domain: process.env.COOKIE_DOMAIN,
  },

  // Password Requirements
  password: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    maxLength: 128,
    preventCommon: true,
  },

  // Rate Limiting
  rateLimiting: {
    // General API rate limiting
    api: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 1000,
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
    },
    // Login attempts
    login: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxAttempts: 5,
      blockDuration: 30 * 60 * 1000, // 30 minutes
    },
    // Password reset
    passwordReset: {
      windowMs: 60 * 60 * 1000, // 1 hour
      maxAttempts: 3,
      blockDuration: 60 * 60 * 1000, // 1 hour
    },
    // Email verification
    emailVerification: {
      windowMs: 60 * 60 * 1000, // 1 hour
      maxAttempts: 5,
      blockDuration: 60 * 60 * 1000, // 1 hour
    },
  },

  // CSRF Protection
  csrf: {
    secret: process.env.CSRF_SECRET || 'your-csrf-secret-here',
    cookieName: '__Host-csrf-token',
    headerName: 'x-csrf-token',
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  },

  // Encryption
  encryption: {
    algorithm: 'aes-256-gcm',
    keyLength: 32,
    ivLength: 16,
    tagLength: 16,
    saltLength: 64,
    iterations: 100000,
  },

  // JWT Configuration
  jwt: {
    issuer: 'restaurant-dashboard',
    audience: 'restaurant-dashboard-users',
    algorithm: 'HS256' as const,
    accessTokenExpiry: '15m',
    refreshTokenExpiry: '7d',
  },

  // Content Security Policy
  csp: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "'unsafe-eval'", // Required for Next.js development
      "'unsafe-inline'", // Required for styled-components
      'https://va.vercel-scripts.com',
      'https://vercel.live',
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      'https://fonts.googleapis.com',
    ],
    imgSrc: [
      "'self'",
      'data:',
      'blob:',
      'https:',
    ],
    fontSrc: [
      "'self'",
      'https://fonts.gstatic.com',
    ],
    connectSrc: [
      "'self'",
      'https://va.vercel-scripts.com',
      'https://vercel.live',
    ],
    frameSrc: ["'none'"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'"],
    upgradeInsecureRequests: process.env.NODE_ENV === 'production',
  },

  // Security Headers
  headers: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  },

  // CORS Configuration
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
    credentials: true,
    maxAge: 86400, // 24 hours
  },

  // File Upload Security
  fileUpload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    scanForMalware: process.env.NODE_ENV === 'production',
    quarantineDirectory: './quarantine',
    uploadDirectory: './uploads',
  },

  // Audit Logging
  audit: {
    enabled: true,
    logLevel: process.env.LOG_LEVEL || 'info',
    destinations: ['console', 'file'],
    sensitiveFields: ['password', 'token', 'secret', 'key'],
    retentionDays: 90,
  },

  // Two-Factor Authentication
  twoFactor: {
    issuer: 'Restaurant Dashboard',
    window: 2, // Allow 2 steps tolerance
    digits: 6,
    period: 30, // 30 seconds
    algorithm: 'sha1',
  },

  // IP Whitelisting (for admin functions)
  ipWhitelist: {
    enabled: process.env.NODE_ENV === 'production',
    adminIPs: process.env.ADMIN_IPS?.split(',') || [],
    developmentBypass: true,
  },

  // Database Security
  database: {
    connectionTimeout: 30000,
    maxConnections: 20,
    enableSSL: process.env.NODE_ENV === 'production',
    certificateValidation: true,
  },

  // API Security
  api: {
    maxRequestSize: '10mb',
    timeout: 30000,
    enableCompression: true,
    validateContentType: true,
  },

  // Development & Testing
  development: {
    disableSecurityInDev: false,
    logSecurityEvents: true,
    mockExternalServices: process.env.NODE_ENV === 'test',
  },
} as const;

// Environment-specific overrides
if (process.env.NODE_ENV === 'production') {
  // Production-specific security enhancements
  SECURITY_CONFIG.session.secure = true;
  SECURITY_CONFIG.csp.upgradeInsecureRequests = true;
  SECURITY_CONFIG.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
}

export type SecurityConfig = typeof SECURITY_CONFIG;

// Security event types for audit logging
export const SECURITY_EVENTS = {
  LOGIN_SUCCESS: 'login_success',
  LOGIN_FAILURE: 'login_failure',
  LOGIN_BLOCKED: 'login_blocked',
  PASSWORD_CHANGE: 'password_change',
  PASSWORD_RESET_REQUEST: 'password_reset_request',
  PASSWORD_RESET_SUCCESS: 'password_reset_success',
  ACCOUNT_LOCKED: 'account_locked',
  ACCOUNT_UNLOCKED: 'account_unlocked',
  PERMISSION_DENIED: 'permission_denied',
  CSRF_TOKEN_INVALID: 'csrf_token_invalid',
  RATE_LIMIT_EXCEEDED: 'rate_limit_exceeded',
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  FILE_UPLOAD_BLOCKED: 'file_upload_blocked',
  IP_BLOCKED: 'ip_blocked',
  SESSION_CREATED: 'session_created',
  SESSION_DESTROYED: 'session_destroyed',
  SESSION_EXPIRED: 'session_expired',
  TWO_FACTOR_ENABLED: 'two_factor_enabled',
  TWO_FACTOR_DISABLED: 'two_factor_disabled',
  TWO_FACTOR_VERIFICATION_SUCCESS: 'two_factor_verification_success',
  TWO_FACTOR_VERIFICATION_FAILURE: 'two_factor_verification_failure',
} as const;

export type SecurityEvent = typeof SECURITY_EVENTS[keyof typeof SECURITY_EVENTS];

// Common security patterns
export const SECURITY_PATTERNS = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]{10,}$/,
  PASSWORD_STRENGTH_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  SQL_INJECTION_PATTERNS: [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
    /(\b(UNION|OR|AND)\b.*\b(SELECT|INSERT|UPDATE|DELETE)\b)/i,
    /(\'|\"|;|--|\*|\/\*|\*\/)/,
  ],
  XSS_PATTERNS: [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
  ],
} as const;

export default SECURITY_CONFIG;