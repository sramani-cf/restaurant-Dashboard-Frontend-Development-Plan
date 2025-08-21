/**
 * Central Security Configuration
 * Provides centralized security settings and constants for the restaurant dashboard
 */

// Helper function to get environment variable with fallback
const getEnvVar = (key: string, fallback?: string): string => {
  const value = process.env[key];
  if (!value && !fallback) {
    console.warn(`Missing environment variable: ${key}`);
  }
  return value || fallback || '';
};

// Helper function to parse boolean environment variables
const getEnvBool = (key: string, fallback: boolean): boolean => {
  const value = process.env[key];
  if (value === undefined) return fallback;
  return value === 'true' || value === '1';
};

// Helper function to parse number environment variables
const getEnvNumber = (key: string, fallback: number): number => {
  const value = process.env[key];
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
};

export const SECURITY_CONFIG = {
  // Authentication & Session
  session: {
    cookieName: getEnvVar('SESSION_COOKIE_NAME', 'restaurant-dashboard-session'),
    maxAge: getEnvNumber('SESSION_MAX_AGE_MS', 24 * 60 * 60 * 1000), // 24 hours
    sameSite: 'strict' as const,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    path: '/',
    domain: getEnvVar('COOKIE_DOMAIN'),
    secret: getEnvVar('SESSION_SECRET', ''),
  },

  // Password Requirements
  password: {
    minLength: getEnvNumber('PASSWORD_MIN_LENGTH', 12),
    requireUppercase: getEnvBool('PASSWORD_REQUIRE_UPPERCASE', true),
    requireLowercase: getEnvBool('PASSWORD_REQUIRE_LOWERCASE', true),
    requireNumbers: getEnvBool('PASSWORD_REQUIRE_NUMBERS', true),
    requireSpecialChars: getEnvBool('PASSWORD_REQUIRE_SPECIAL', true),
    maxLength: getEnvNumber('PASSWORD_MAX_LENGTH', 128),
    preventCommon: getEnvBool('PASSWORD_PREVENT_COMMON', true),
  },

  // Rate Limiting
  rateLimiting: {
    // General API rate limiting
    api: {
      windowMs: getEnvNumber('RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000), // 15 minutes
      maxRequests: getEnvNumber('RATE_LIMIT_MAX_REQUESTS', 1000),
      skipSuccessfulRequests: getEnvBool('RATE_LIMIT_SKIP_SUCCESS', false),
      skipFailedRequests: getEnvBool('RATE_LIMIT_SKIP_FAILED', false),
      redisUrl: getEnvVar('RATE_LIMIT_REDIS_URL', 'redis://localhost:6379'),
    },
    // Login attempts
    login: {
      windowMs: getEnvNumber('LOGIN_WINDOW_MS', 15 * 60 * 1000), // 15 minutes
      maxAttempts: getEnvNumber('LOGIN_MAX_ATTEMPTS', 5),
      blockDuration: getEnvNumber('LOGIN_BLOCK_DURATION_MS', 30 * 60 * 1000), // 30 minutes
    },
    // Password reset
    passwordReset: {
      windowMs: getEnvNumber('PASSWORD_RESET_WINDOW_MS', 60 * 60 * 1000), // 1 hour
      maxAttempts: getEnvNumber('PASSWORD_RESET_MAX_ATTEMPTS', 3),
      blockDuration: getEnvNumber('PASSWORD_RESET_BLOCK_MS', 60 * 60 * 1000), // 1 hour
    },
    // Email verification
    emailVerification: {
      windowMs: getEnvNumber('EMAIL_VERIFY_WINDOW_MS', 60 * 60 * 1000), // 1 hour
      maxAttempts: getEnvNumber('EMAIL_VERIFY_MAX_ATTEMPTS', 5),
      blockDuration: getEnvNumber('EMAIL_VERIFY_BLOCK_MS', 60 * 60 * 1000), // 1 hour
    },
  },

  // CSRF Protection
  csrf: {
    secret: getEnvVar('CSRF_SECRET', ''),
    cookieName: '__Host-csrf-token',
    headerName: 'x-csrf-token',
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: getEnvNumber('CSRF_TOKEN_MAX_AGE_MS', 24 * 60 * 60 * 1000), // 24 hours
    },
  },

  // Encryption
  encryption: {
    algorithm: 'aes-256-gcm',
    keyLength: 32,
    ivLength: 16,
    tagLength: 16,
    saltLength: 64,
    iterations: getEnvNumber('ENCRYPTION_ITERATIONS', 100000),
    key: getEnvVar('ENCRYPTION_KEY', ''),
  },

  // JWT Configuration
  jwt: {
    issuer: getEnvVar('JWT_ISSUER', 'restaurant-dashboard'),
    audience: getEnvVar('JWT_AUDIENCE', 'restaurant-dashboard-users'),
    algorithm: 'HS256' as const,
    accessTokenExpiry: getEnvVar('JWT_ACCESS_TOKEN_EXPIRY', '15m'),
    refreshTokenExpiry: getEnvVar('JWT_REFRESH_TOKEN_EXPIRY', '7d'),
    secret: getEnvVar('JWT_SECRET', ''),
  },

  // Content Security Policy
  csp: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : '',
      "'unsafe-inline'", // Required for styled-components
      'https://cdn.jsdelivr.net',
      'https://unpkg.com',
    ].filter(Boolean),
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
      getEnvVar('STRIPE_API_URL', 'https://api.stripe.com'),
      getEnvVar('SQUARE_API_URL', 'https://api.square.com'),
    ].filter(Boolean),
    frameSrc: [
      "'self'",
      'https://js.stripe.com',
    ],
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
    'Strict-Transport-Security': process.env.NODE_ENV === 'production' 
      ? 'max-age=31536000; includeSubDomains; preload'
      : '',
  },

  // CORS Configuration
  cors: {
    origin: getEnvVar('CORS_ORIGINS', 'http://localhost:3000').split(','),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
    credentials: true,
    maxAge: getEnvNumber('CORS_MAX_AGE', 86400), // 24 hours
  },

  // File Upload Security
  fileUpload: {
    maxFileSize: getEnvNumber('MAX_FILE_SIZE_BYTES', 10 * 1024 * 1024), // 10MB
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
    scanForMalware: getEnvBool('SCAN_UPLOADS_FOR_MALWARE', process.env.NODE_ENV === 'production'),
    quarantineDirectory: getEnvVar('QUARANTINE_DIR', './quarantine'),
    uploadDirectory: getEnvVar('UPLOAD_DIR', './uploads'),
  },

  // Audit Logging
  audit: {
    enabled: getEnvBool('AUDIT_LOGGING_ENABLED', true),
    logLevel: getEnvVar('LOG_LEVEL', 'info'),
    destinations: getEnvVar('LOG_DESTINATIONS', 'console,file').split(','),
    sensitiveFields: ['password', 'token', 'secret', 'key', 'creditCard', 'ssn'],
    retentionDays: getEnvNumber('LOG_RETENTION_DAYS', 90),
  },

  // Two-Factor Authentication
  twoFactor: {
    issuer: getEnvVar('TWO_FACTOR_ISSUER', 'Restaurant Dashboard'),
    window: getEnvNumber('TWO_FACTOR_WINDOW', 2), // Allow 2 steps tolerance
    digits: 6,
    period: 30, // 30 seconds
    algorithm: 'sha1',
  },

  // IP Whitelisting (for admin functions)
  ipWhitelist: {
    enabled: getEnvBool('IP_WHITELIST_ENABLED', process.env.NODE_ENV === 'production'),
    adminIPs: getEnvVar('ADMIN_IPS', '').split(',').filter(Boolean),
    developmentBypass: getEnvBool('IP_WHITELIST_DEV_BYPASS', true),
  },

  // Database Security
  database: {
    connectionTimeout: getEnvNumber('DB_CONNECTION_TIMEOUT_MS', 30000),
    maxConnections: getEnvNumber('DB_MAX_CONNECTIONS', 20),
    enableSSL: getEnvBool('DB_ENABLE_SSL', process.env.NODE_ENV === 'production'),
    certificateValidation: getEnvBool('DB_CERT_VALIDATION', true),
    poolSize: getEnvNumber('DATABASE_POOL_SIZE', 10),
  },

  // API Security
  api: {
    maxRequestSize: getEnvVar('API_MAX_REQUEST_SIZE', '10mb'),
    timeout: getEnvNumber('API_TIMEOUT_MS', 30000),
    enableCompression: getEnvBool('API_ENABLE_COMPRESSION', true),
    validateContentType: getEnvBool('API_VALIDATE_CONTENT_TYPE', true),
  },

  // Redis Configuration
  redis: {
    url: getEnvVar('REDIS_URL', 'redis://localhost:6379'),
    ttl: getEnvNumber('REDIS_TTL_SECONDS', 3600),
    maxRetries: getEnvNumber('REDIS_MAX_RETRIES', 3),
    retryDelay: getEnvNumber('REDIS_RETRY_DELAY_MS', 1000),
  },

  // WebAuthn/Passkeys
  webauthn: {
    rpName: getEnvVar('WEBAUTHN_RP_NAME', 'Restaurant Dashboard'),
    rpId: getEnvVar('WEBAUTHN_RP_ID', 'localhost'),
    origin: getEnvVar('WEBAUTHN_ORIGIN', 'http://localhost:3000'),
    userVerification: 'preferred' as const,
  },

  // Development & Testing
  development: {
    disableSecurityInDev: getEnvBool('DISABLE_SECURITY_IN_DEV', false),
    logSecurityEvents: getEnvBool('LOG_SECURITY_EVENTS', true),
    mockExternalServices: getEnvBool('MOCK_EXTERNAL_SERVICES', process.env.NODE_ENV === 'test'),
    verboseLogging: getEnvBool('VERBOSE_LOGGING', false),
  },
} as const;

// Validate critical environment variables on startup
const validateSecurityConfig = () => {
  const criticalVars = [
    { key: 'SESSION_SECRET', value: SECURITY_CONFIG.session.secret },
    { key: 'CSRF_SECRET', value: SECURITY_CONFIG.csrf.secret },
    { key: 'ENCRYPTION_KEY', value: SECURITY_CONFIG.encryption.key },
    { key: 'JWT_SECRET', value: SECURITY_CONFIG.jwt.secret },
  ];

  const missingVars = criticalVars.filter(v => !v.value);
  
  if (missingVars.length > 0 && process.env.NODE_ENV === 'production') {
    throw new Error(
      `Missing critical environment variables: ${missingVars.map(v => v.key).join(', ')}`
    );
  } else if (missingVars.length > 0) {
    console.warn(
      `⚠️  Missing critical environment variables in development: ${missingVars.map(v => v.key).join(', ')}`
    );
  }
};

// Run validation
if (typeof process !== 'undefined') {
  validateSecurityConfig();
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
  DATA_EXPORT: 'data_export',
  DATA_IMPORT: 'data_import',
  API_KEY_CREATED: 'api_key_created',
  API_KEY_REVOKED: 'api_key_revoked',
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
  COMMON_PASSWORDS: [
    'password', '123456', 'password123', 'admin', 'letmein',
    'qwerty', 'abc123', 'monkey', '1234567890', 'password1',
  ],
} as const;

export default SECURITY_CONFIG;