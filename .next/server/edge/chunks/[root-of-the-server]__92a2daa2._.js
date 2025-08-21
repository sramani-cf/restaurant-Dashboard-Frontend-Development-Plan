(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__92a2daa2._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/config/security.config.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Central Security Configuration
 * Provides centralized security settings and constants for the restaurant dashboard
 */ // Helper function to get environment variable with fallback
__turbopack_context__.s([
    "SECURITY_CONFIG",
    ()=>SECURITY_CONFIG,
    "SECURITY_EVENTS",
    ()=>SECURITY_EVENTS,
    "SECURITY_PATTERNS",
    ()=>SECURITY_PATTERNS,
    "default",
    ()=>__TURBOPACK__default__export__
]);
const getEnvVar = (key, fallback)=>{
    const value = process.env[key];
    if (!value && !fallback) {
        console.warn(`Missing environment variable: ${key}`);
    }
    return value || fallback || '';
};
// Helper function to parse boolean environment variables
const getEnvBool = (key, fallback)=>{
    const value = process.env[key];
    if (value === undefined) return fallback;
    return value === 'true' || value === '1';
};
// Helper function to parse number environment variables
const getEnvNumber = (key, fallback)=>{
    const value = process.env[key];
    if (!value) return fallback;
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? fallback : parsed;
};
const SECURITY_CONFIG = {
    // Authentication & Session
    session: {
        cookieName: getEnvVar('SESSION_COOKIE_NAME', 'restaurant-dashboard-session'),
        maxAge: getEnvNumber('SESSION_MAX_AGE_MS', 24 * 60 * 60 * 1000),
        sameSite: 'strict',
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        httpOnly: true,
        path: '/',
        domain: getEnvVar('COOKIE_DOMAIN'),
        secret: getEnvVar('SESSION_SECRET', '')
    },
    // Password Requirements
    password: {
        minLength: getEnvNumber('PASSWORD_MIN_LENGTH', 12),
        requireUppercase: getEnvBool('PASSWORD_REQUIRE_UPPERCASE', true),
        requireLowercase: getEnvBool('PASSWORD_REQUIRE_LOWERCASE', true),
        requireNumbers: getEnvBool('PASSWORD_REQUIRE_NUMBERS', true),
        requireSpecialChars: getEnvBool('PASSWORD_REQUIRE_SPECIAL', true),
        maxLength: getEnvNumber('PASSWORD_MAX_LENGTH', 128),
        preventCommon: getEnvBool('PASSWORD_PREVENT_COMMON', true)
    },
    // Rate Limiting
    rateLimiting: {
        // General API rate limiting
        api: {
            windowMs: getEnvNumber('RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000),
            maxRequests: getEnvNumber('RATE_LIMIT_MAX_REQUESTS', 1000),
            skipSuccessfulRequests: getEnvBool('RATE_LIMIT_SKIP_SUCCESS', false),
            skipFailedRequests: getEnvBool('RATE_LIMIT_SKIP_FAILED', false),
            redisUrl: getEnvVar('RATE_LIMIT_REDIS_URL', 'redis://localhost:6379')
        },
        // Login attempts
        login: {
            windowMs: getEnvNumber('LOGIN_WINDOW_MS', 15 * 60 * 1000),
            maxAttempts: getEnvNumber('LOGIN_MAX_ATTEMPTS', 5),
            blockDuration: getEnvNumber('LOGIN_BLOCK_DURATION_MS', 30 * 60 * 1000)
        },
        // Password reset
        passwordReset: {
            windowMs: getEnvNumber('PASSWORD_RESET_WINDOW_MS', 60 * 60 * 1000),
            maxAttempts: getEnvNumber('PASSWORD_RESET_MAX_ATTEMPTS', 3),
            blockDuration: getEnvNumber('PASSWORD_RESET_BLOCK_MS', 60 * 60 * 1000)
        },
        // Email verification
        emailVerification: {
            windowMs: getEnvNumber('EMAIL_VERIFY_WINDOW_MS', 60 * 60 * 1000),
            maxAttempts: getEnvNumber('EMAIL_VERIFY_MAX_ATTEMPTS', 5),
            blockDuration: getEnvNumber('EMAIL_VERIFY_BLOCK_MS', 60 * 60 * 1000)
        }
    },
    // CSRF Protection
    csrf: {
        secret: getEnvVar('CSRF_SECRET', ''),
        cookieName: '__Host-csrf-token',
        headerName: 'x-csrf-token',
        cookieOptions: {
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: getEnvNumber('CSRF_TOKEN_MAX_AGE_MS', 24 * 60 * 60 * 1000)
        }
    },
    // Encryption
    encryption: {
        algorithm: 'aes-256-gcm',
        keyLength: 32,
        ivLength: 16,
        tagLength: 16,
        saltLength: 64,
        iterations: getEnvNumber('ENCRYPTION_ITERATIONS', 100000),
        key: getEnvVar('ENCRYPTION_KEY', '')
    },
    // JWT Configuration
    jwt: {
        issuer: getEnvVar('JWT_ISSUER', 'restaurant-dashboard'),
        audience: getEnvVar('JWT_AUDIENCE', 'restaurant-dashboard-users'),
        algorithm: 'HS256',
        accessTokenExpiry: getEnvVar('JWT_ACCESS_TOKEN_EXPIRY', '15m'),
        refreshTokenExpiry: getEnvVar('JWT_REFRESH_TOKEN_EXPIRY', '7d'),
        secret: getEnvVar('JWT_SECRET', '')
    },
    // Content Security Policy
    csp: {
        defaultSrc: [
            "'self'"
        ],
        scriptSrc: [
            "'self'",
            ("TURBOPACK compile-time truthy", 1) ? "'unsafe-eval'" : "TURBOPACK unreachable",
            "'unsafe-inline'",
            'https://cdn.jsdelivr.net',
            'https://unpkg.com'
        ].filter(Boolean),
        styleSrc: [
            "'self'",
            "'unsafe-inline'",
            'https://fonts.googleapis.com'
        ],
        imgSrc: [
            "'self'",
            'data:',
            'blob:',
            'https:'
        ],
        fontSrc: [
            "'self'",
            'https://fonts.gstatic.com'
        ],
        connectSrc: [
            "'self'",
            getEnvVar('STRIPE_API_URL', 'https://api.stripe.com'),
            getEnvVar('SQUARE_API_URL', 'https://api.square.com')
        ].filter(Boolean),
        frameSrc: [
            "'self'",
            'https://js.stripe.com'
        ],
        objectSrc: [
            "'none'"
        ],
        baseUri: [
            "'self'"
        ],
        formAction: [
            "'self'"
        ],
        upgradeInsecureRequests: ("TURBOPACK compile-time value", "development") === 'production'
    },
    // Security Headers
    headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
        'Strict-Transport-Security': ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : ''
    },
    // CORS Configuration
    cors: {
        origin: getEnvVar('CORS_ORIGINS', 'http://localhost:3000').split(','),
        methods: [
            'GET',
            'POST',
            'PUT',
            'DELETE',
            'PATCH'
        ],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-CSRF-Token'
        ],
        credentials: true,
        maxAge: getEnvNumber('CORS_MAX_AGE', 86400)
    },
    // File Upload Security
    fileUpload: {
        maxFileSize: getEnvNumber('MAX_FILE_SIZE_BYTES', 10 * 1024 * 1024),
        allowedTypes: [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'application/pdf',
            'text/csv',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ],
        scanForMalware: getEnvBool('SCAN_UPLOADS_FOR_MALWARE', ("TURBOPACK compile-time value", "development") === 'production'),
        quarantineDirectory: getEnvVar('QUARANTINE_DIR', './quarantine'),
        uploadDirectory: getEnvVar('UPLOAD_DIR', './uploads')
    },
    // Audit Logging
    audit: {
        enabled: getEnvBool('AUDIT_LOGGING_ENABLED', true),
        logLevel: getEnvVar('LOG_LEVEL', 'info'),
        destinations: getEnvVar('LOG_DESTINATIONS', 'console,file').split(','),
        sensitiveFields: [
            'password',
            'token',
            'secret',
            'key',
            'creditCard',
            'ssn'
        ],
        retentionDays: getEnvNumber('LOG_RETENTION_DAYS', 90)
    },
    // Two-Factor Authentication
    twoFactor: {
        issuer: getEnvVar('TWO_FACTOR_ISSUER', 'Restaurant Dashboard'),
        window: getEnvNumber('TWO_FACTOR_WINDOW', 2),
        digits: 6,
        period: 30,
        algorithm: 'sha1'
    },
    // IP Whitelisting (for admin functions)
    ipWhitelist: {
        enabled: getEnvBool('IP_WHITELIST_ENABLED', ("TURBOPACK compile-time value", "development") === 'production'),
        adminIPs: getEnvVar('ADMIN_IPS', '').split(',').filter(Boolean),
        developmentBypass: getEnvBool('IP_WHITELIST_DEV_BYPASS', true)
    },
    // Database Security
    database: {
        connectionTimeout: getEnvNumber('DB_CONNECTION_TIMEOUT_MS', 30000),
        maxConnections: getEnvNumber('DB_MAX_CONNECTIONS', 20),
        enableSSL: getEnvBool('DB_ENABLE_SSL', ("TURBOPACK compile-time value", "development") === 'production'),
        certificateValidation: getEnvBool('DB_CERT_VALIDATION', true),
        poolSize: getEnvNumber('DATABASE_POOL_SIZE', 10)
    },
    // API Security
    api: {
        maxRequestSize: getEnvVar('API_MAX_REQUEST_SIZE', '10mb'),
        timeout: getEnvNumber('API_TIMEOUT_MS', 30000),
        enableCompression: getEnvBool('API_ENABLE_COMPRESSION', true),
        validateContentType: getEnvBool('API_VALIDATE_CONTENT_TYPE', true)
    },
    // Redis Configuration
    redis: {
        url: getEnvVar('REDIS_URL', 'redis://localhost:6379'),
        ttl: getEnvNumber('REDIS_TTL_SECONDS', 3600),
        maxRetries: getEnvNumber('REDIS_MAX_RETRIES', 3),
        retryDelay: getEnvNumber('REDIS_RETRY_DELAY_MS', 1000)
    },
    // WebAuthn/Passkeys
    webauthn: {
        rpName: getEnvVar('WEBAUTHN_RP_NAME', 'Restaurant Dashboard'),
        rpId: getEnvVar('WEBAUTHN_RP_ID', 'localhost'),
        origin: getEnvVar('WEBAUTHN_ORIGIN', 'http://localhost:3000'),
        userVerification: 'preferred'
    },
    // Development & Testing
    development: {
        disableSecurityInDev: getEnvBool('DISABLE_SECURITY_IN_DEV', false),
        logSecurityEvents: getEnvBool('LOG_SECURITY_EVENTS', true),
        mockExternalServices: getEnvBool('MOCK_EXTERNAL_SERVICES', ("TURBOPACK compile-time value", "development") === 'test'),
        verboseLogging: getEnvBool('VERBOSE_LOGGING', false)
    }
};
// Validate critical environment variables on startup
const validateSecurityConfig = ()=>{
    const criticalVars = [
        {
            key: 'SESSION_SECRET',
            value: SECURITY_CONFIG.session.secret
        },
        {
            key: 'CSRF_SECRET',
            value: SECURITY_CONFIG.csrf.secret
        },
        {
            key: 'ENCRYPTION_KEY',
            value: SECURITY_CONFIG.encryption.key
        },
        {
            key: 'JWT_SECRET',
            value: SECURITY_CONFIG.jwt.secret
        }
    ];
    const missingVars = criticalVars.filter((v)=>!v.value);
    if (missingVars.length > 0 && ("TURBOPACK compile-time value", "development") === 'production') //TURBOPACK unreachable
    ;
    else if (missingVars.length > 0) {
        console.warn(`⚠️  Missing critical environment variables in development: ${missingVars.map((v)=>v.key).join(', ')}`);
    }
};
// Run validation
if (typeof process !== 'undefined') {
    validateSecurityConfig();
}
const SECURITY_EVENTS = {
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
    API_KEY_REVOKED: 'api_key_revoked'
};
const SECURITY_PATTERNS = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^\+?[\d\s\-\(\)]{10,}$/,
    PASSWORD_STRENGTH_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    SQL_INJECTION_PATTERNS: [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
        /(\b(UNION|OR|AND)\b.*\b(SELECT|INSERT|UPDATE|DELETE)\b)/i,
        /(\'|\"|;|--|\*|\/\*|\*\/)/
    ],
    XSS_PATTERNS: [
        /<script[^>]*>.*?<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<iframe[^>]*>.*?<\/iframe>/gi
    ],
    COMMON_PASSWORDS: [
        'password',
        '123456',
        'password123',
        'admin',
        'letmein',
        'qwerty',
        'abc123',
        'monkey',
        '1234567890',
        'password1'
    ]
};
const __TURBOPACK__default__export__ = SECURITY_CONFIG;
}),
"[project]/lib/security/csrf-edge.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * CSRF Protection Implementation for Edge Runtime
 * Uses Web Crypto API instead of Node.js crypto module
 */ __turbopack_context__.s([
    "createCSRFMiddleware",
    ()=>createCSRFMiddleware,
    "default",
    ()=>__TURBOPACK__default__export__,
    "extractCSRFToken",
    ()=>extractCSRFToken,
    "generateCSRFToken",
    ()=>generateCSRFToken,
    "getCSRFTokenFromCookies",
    ()=>getCSRFTokenFromCookies,
    "provideCSRFToken",
    ()=>provideCSRFToken,
    "setCSRFTokenCookie",
    ()=>setCSRFTokenCookie,
    "validateCSRFToken",
    ()=>validateCSRFToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/security.config.ts [middleware-edge] (ecmascript)");
;
;
// CSRF Configuration
const CSRF_CONFIG = {
    secret: process.env.CSRF_SECRET || __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].csrf.secret || 'default-csrf-secret',
    tokenLength: 32,
    hashAlgorithm: 'SHA-256',
    maxAge: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].csrf.cookieOptions.maxAge || 24 * 60 * 60 * 1000,
    cookieName: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].csrf.cookieName,
    headerName: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].csrf.headerName,
    paramName: '_csrf_token',
    bypassMethods: [
        'GET',
        'HEAD',
        'OPTIONS'
    ]
};
/**
 * Generate random bytes using Web Crypto API
 */ function generateRandomBytes(length) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array).map((b)=>b.toString(16).padStart(2, '0')).join('');
}
/**
 * Create HMAC using Web Crypto API
 */ async function createHMAC(data, secret) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const dataBuffer = encoder.encode(data);
    const key = await crypto.subtle.importKey('raw', keyData, {
        name: 'HMAC',
        hash: 'SHA-256'
    }, false, [
        'sign'
    ]);
    const signature = await crypto.subtle.sign('HMAC', key, dataBuffer);
    return Array.from(new Uint8Array(signature)).map((b)=>b.toString(16).padStart(2, '0')).join('');
}
async function generateCSRFToken(userId, sessionId) {
    const timestamp = Date.now();
    const randomToken = generateRandomBytes(CSRF_CONFIG.tokenLength);
    // Create token data
    const tokenData = {
        token: randomToken,
        timestamp,
        userId: userId || '',
        sessionId: sessionId || ''
    };
    // Create HMAC hash of the token data
    const hash = await createHMAC(JSON.stringify(tokenData), CSRF_CONFIG.secret);
    // Combine token components
    const csrfToken = btoa(JSON.stringify({
        ...tokenData,
        hash
    })).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    return csrfToken;
}
async function validateCSRFToken(token, userId, sessionId) {
    try {
        // Decode the token (handle base64url)
        const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
        const tokenDataString = atob(base64);
        const tokenData = JSON.parse(tokenDataString);
        // Check if token is expired
        const now = Date.now();
        if (now - tokenData.timestamp > CSRF_CONFIG.maxAge) {
            return {
                valid: false,
                reason: 'Token expired'
            };
        }
        // Verify user and session match
        if (userId && tokenData.userId !== userId) {
            return {
                valid: false,
                reason: 'User mismatch'
            };
        }
        if (sessionId && tokenData.sessionId !== sessionId) {
            return {
                valid: false,
                reason: 'Session mismatch'
            };
        }
        // Recreate the hash to verify integrity
        const verificationData = {
            token: tokenData.token,
            timestamp: tokenData.timestamp,
            userId: tokenData.userId,
            sessionId: tokenData.sessionId
        };
        const expectedHash = await createHMAC(JSON.stringify(verificationData), CSRF_CONFIG.secret);
        if (tokenData.hash !== expectedHash) {
            return {
                valid: false,
                reason: 'Invalid token signature'
            };
        }
        return {
            valid: true
        };
    } catch (error) {
        return {
            valid: false,
            reason: 'Malformed token'
        };
    }
}
function extractCSRFToken(request) {
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
function setCSRFTokenCookie(response, token) {
    const cookieOptions = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].csrf.cookieOptions,
        expires: new Date(Date.now() + CSRF_CONFIG.maxAge)
    };
    response.cookies.set(CSRF_CONFIG.cookieName, token, cookieOptions);
}
function getCSRFTokenFromCookies(request) {
    return request.cookies.get(CSRF_CONFIG.cookieName)?.value || null;
}
function createCSRFMiddleware() {
    return async (request)=>{
        const method = request.method.toUpperCase();
        // Skip CSRF check for safe methods
        if (CSRF_CONFIG.bypassMethods.includes(method)) {
            return null; // Continue to next middleware
        }
        // Skip CSRF check for API routes that explicitly opt out
        const pathname = request.nextUrl.pathname;
        if (pathname.startsWith('/api/webhook') || pathname.startsWith('/api/health') || pathname.includes('/api/auth/callback')) {
            return null; // Continue to next middleware
        }
        // Extract user and session information
        const sessionCookie = request.cookies.get('session');
        const userId = request.headers.get('x-user-id');
        const sessionId = sessionCookie?.value;
        // Get CSRF token from request
        const providedToken = extractCSRFToken(request);
        if (!providedToken) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify({
                error: 'CSRF token required',
                message: 'Request must include a valid CSRF token'
            }), {
                status: 403,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        // Validate the token
        const validation = await validateCSRFToken(providedToken, userId || undefined, sessionId);
        if (!validation.valid) {
            console.warn('CSRF token validation failed:', validation.reason, {
                ip: request.ip,
                userAgent: request.headers.get('user-agent'),
                pathname,
                method,
                timestamp: new Date().toISOString()
            });
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify({
                error: 'Invalid CSRF token',
                message: 'The provided CSRF token is invalid or expired'
            }), {
                status: 403,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        return null; // Continue to next middleware
    };
}
async function provideCSRFToken(response, userId, sessionId) {
    const token = await generateCSRFToken(userId, sessionId);
    setCSRFTokenCookie(response, token);
    // Also add token to response headers for client-side access
    response.headers.set('X-CSRF-Token', token);
    return token;
}
const __TURBOPACK__default__export__ = {
    generateCSRFToken,
    validateCSRFToken,
    extractCSRFToken,
    setCSRFTokenCookie,
    getCSRFTokenFromCookies,
    createCSRFMiddleware,
    provideCSRFToken
};
}),
"[project]/ [middleware-edge] (unsupported edge import 'cluster', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`cluster`));
}),
"[project]/ [middleware-edge] (unsupported edge import 'crypto', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`crypto`));
}),
"[project]/lib/security/rate-limit.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Rate Limiting Implementation
 * Comprehensive rate limiting with sliding window algorithm and Redis support
 */ __turbopack_context__.s([
    "applyRateLimit",
    ()=>applyRateLimit,
    "cleanup",
    ()=>cleanup,
    "createDynamicRateLimit",
    ()=>createDynamicRateLimit,
    "createRateLimitMiddleware",
    ()=>createRateLimitMiddleware,
    "createRateLimiter",
    ()=>createRateLimiter,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getRateLimitStatus",
    ()=>getRateLimitStatus,
    "getRateLimiter",
    ()=>getRateLimiter,
    "initializeDefaultRateLimiters",
    ()=>initializeDefaultRateLimiters,
    "resetRateLimit",
    ()=>resetRateLimit,
    "withRateLimit",
    ()=>withRateLimit
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = /*#__PURE__*/ __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rate$2d$limiter$2d$flexible$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/rate-limiter-flexible/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/security.config.ts [middleware-edge] (ecmascript)");
;
;
;
// Global rate limiters
const rateLimiters = new Map();
function createRateLimiter(name, config) {
    const limiterOptions = {
        keyPrefix: `rate_limit_${name}`,
        points: config.maxRequests,
        duration: Math.ceil(config.windowMs / 1000),
        blockDuration: Math.ceil((config.blockDuration || config.windowMs) / 1000),
        execEvenly: true
    };
    // Using memory-only rate limiter for Edge runtime compatibility
    const limiter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rate$2d$limiter$2d$flexible$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["RateLimiterMemory"](limiterOptions);
    const instance = {
        limiter,
        config
    };
    rateLimiters.set(name, instance);
    return instance;
}
function getRateLimiter(name) {
    return rateLimiters.get(name) || null;
}
/**
 * Generate rate limit key from request
 */ function generateKey(req, config) {
    if (config.keyGenerator) {
        return config.keyGenerator(req);
    }
    // Default key generation: IP + User-Agent hash
    const ip = req.ip || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    // For authenticated requests, include user ID
    const userId = req.headers.get('x-user-id') || req.cookies.get('userId')?.value;
    return userId ? `${userId}:${ip}` : `${ip}:${__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(userAgent).toString('base64').slice(0, 20)}`;
}
/**
 * Check if IP is whitelisted
 */ function isWhitelisted(ip, whitelist) {
    if (!whitelist || whitelist.length === 0) return false;
    return whitelist.some((whitelistedIp)=>{
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
 */ function isBlacklisted(ip, blacklist) {
    if (!blacklist || blacklist.length === 0) return false;
    return blacklist.includes(ip);
}
async function applyRateLimit(req, limiterName) {
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
            total: config.maxRequests
        };
    }
    // Check blacklist
    if (isBlacklisted(ip, config.blacklist)) {
        logSecurityEvent(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_EVENTS"].IP_BLOCKED, {
            ip,
            reason: 'blacklisted',
            limiter: limiterName
        });
        return {
            allowed: false,
            reset: new Date(Date.now() + config.blockDuration || config.windowMs),
            remaining: 0,
            total: config.maxRequests
        };
    }
    try {
        const res = await limiter.consume(key);
        return {
            allowed: true,
            reset: new Date(Date.now() + res.msBeforeNext),
            remaining: res.remainingPoints || 0,
            total: config.maxRequests
        };
    } catch (rejRes) {
        const result = rejRes;
        // Log rate limit exceeded
        logSecurityEvent(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_EVENTS"].RATE_LIMIT_EXCEEDED, {
            ip,
            key,
            limiter: limiterName,
            totalHits: result.totalHits,
            remainingPoints: result.remainingPoints,
            msBeforeNext: result.msBeforeNext
        });
        if (config.onLimitReached) {
            config.onLimitReached(req, key);
        }
        return {
            allowed: false,
            reset: new Date(Date.now() + result.msBeforeNext),
            remaining: result.remainingPoints || 0,
            total: config.maxRequests
        };
    }
}
function createRateLimitMiddleware(limiterName) {
    return async (req)=>{
        try {
            const result = await applyRateLimit(req, limiterName);
            if (!result.allowed) {
                const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Too many requests',
                    message: 'Rate limit exceeded. Please try again later.',
                    resetTime: result.reset.toISOString()
                }, {
                    status: 429
                });
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
function initializeDefaultRateLimiters() {
    // General API rate limiting
    createRateLimiter('api', {
        windowMs: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].rateLimiting.api.windowMs,
        maxRequests: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].rateLimiting.api.maxRequests,
        skipSuccessfulRequests: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].rateLimiting.api.skipSuccessfulRequests,
        skipFailedRequests: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].rateLimiting.api.skipFailedRequests
    });
    // Login attempts rate limiting
    createRateLimiter('login', {
        windowMs: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].rateLimiting.login.windowMs,
        maxRequests: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].rateLimiting.login.maxAttempts,
        blockDuration: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].rateLimiting.login.blockDuration,
        keyGenerator: (req)=>{
            // Rate limit by IP + email combination
            const ip = req.ip || 'unknown';
            const email = req.headers.get('x-login-email') || 'unknown';
            return `${ip}:${email}`;
        }
    });
    // Password reset rate limiting
    createRateLimiter('password-reset', {
        windowMs: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].rateLimiting.passwordReset.windowMs,
        maxRequests: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].rateLimiting.passwordReset.maxAttempts,
        blockDuration: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].rateLimiting.passwordReset.blockDuration,
        keyGenerator: (req)=>{
            // Rate limit by email
            const email = req.headers.get('x-reset-email') || req.ip || 'unknown';
            return `password-reset:${email}`;
        }
    });
    // Email verification rate limiting
    createRateLimiter('email-verification', {
        windowMs: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].rateLimiting.emailVerification.windowMs,
        maxRequests: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].rateLimiting.emailVerification.maxAttempts,
        blockDuration: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].rateLimiting.emailVerification.blockDuration,
        keyGenerator: (req)=>{
            const email = req.headers.get('x-verification-email') || req.ip || 'unknown';
            return `email-verification:${email}`;
        }
    });
    // File upload rate limiting
    createRateLimiter('file-upload', {
        windowMs: 60 * 60 * 1000,
        maxRequests: 50,
        blockDuration: 60 * 60 * 1000,
        keyGenerator: (req)=>{
            const userId = req.headers.get('x-user-id') || req.ip || 'unknown';
            return `file-upload:${userId}`;
        }
    });
    // Search/Query rate limiting
    createRateLimiter('search', {
        windowMs: 60 * 1000,
        maxRequests: 30,
        blockDuration: 5 * 60 * 1000
    });
    // Report generation rate limiting
    createRateLimiter('reports', {
        windowMs: 60 * 60 * 1000,
        maxRequests: 10,
        blockDuration: 60 * 60 * 1000,
        keyGenerator: (req)=>{
            const userId = req.headers.get('x-user-id') || req.ip || 'unknown';
            return `reports:${userId}`;
        }
    });
    // Two-factor authentication rate limiting
    createRateLimiter('2fa', {
        windowMs: 15 * 60 * 1000,
        maxRequests: 5,
        blockDuration: 30 * 60 * 1000,
        keyGenerator: (req)=>{
            const userId = req.headers.get('x-user-id') || req.ip || 'unknown';
            return `2fa:${userId}`;
        }
    });
    // Admin actions rate limiting
    createRateLimiter('admin', {
        windowMs: 60 * 60 * 1000,
        maxRequests: 100,
        blockDuration: 60 * 60 * 1000,
        keyGenerator: (req)=>{
            const userId = req.headers.get('x-user-id') || req.ip || 'unknown';
            return `admin:${userId}`;
        }
    });
}
function createDynamicRateLimit(endpoint, config = {}) {
    const defaultConfig = {
        windowMs: 60 * 1000,
        maxRequests: 60,
        ...config
    };
    const limiterName = `dynamic_${endpoint}`;
    return createRateLimiter(limiterName, defaultConfig);
}
async function getRateLimitStatus(req, limiterName) {
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
            total: config.maxRequests
        };
    } catch (error) {
        return {
            remaining: config.maxRequests,
            reset: new Date(Date.now() + config.windowMs),
            total: config.maxRequests
        };
    }
}
async function resetRateLimit(req, limiterName) {
    const limiterInstance = getRateLimiter(limiterName);
    if (!limiterInstance) {
        throw new Error(`Rate limiter '${limiterName}' not found`);
    }
    const { limiter, config } = limiterInstance;
    const key = generateKey(req, config);
    await limiter.delete(key);
}
function withRateLimit(limiterName, handler) {
    return async (req, ...args)=>{
        try {
            const result = await applyRateLimit(req, limiterName);
            if (!result.allowed) {
                const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Too many requests',
                    message: 'Rate limit exceeded. Please try again later.'
                }, {
                    status: 429
                });
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
 */ function logSecurityEvent(event, details) {
    const logData = {
        event,
        timestamp: new Date().toISOString(),
        ...details
    };
    if ("TURBOPACK compile-time truthy", 1) {
        console.log('Rate Limit Event:', logData);
    }
// TODO: Integrate with audit logging system
}
async function cleanup() {
// Cleanup not needed for memory-only rate limiter
// In production with persistent storage, implement cleanup here
}
// Initialize default rate limiters on module load
if ("TURBOPACK compile-time truthy", 1) {
    initializeDefaultRateLimiters();
}
const __TURBOPACK__default__export__ = {
    createRateLimiter,
    getRateLimiter,
    applyRateLimit,
    createRateLimitMiddleware,
    initializeDefaultRateLimiters,
    createDynamicRateLimit,
    getRateLimitStatus,
    resetRateLimit,
    withRateLimit,
    cleanup
};
}),
"[project]/lib/security/session-edge.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Secure Session Management for Edge Runtime
 * Uses Web Crypto API instead of Node.js crypto module
 */ __turbopack_context__.s([
    "SessionUtils",
    ()=>SessionUtils,
    "createHash",
    ()=>createHash,
    "createSession",
    ()=>createSession,
    "createSessionMiddleware",
    ()=>createSessionMiddleware,
    "default",
    ()=>__TURBOPACK__default__export__,
    "destroySession",
    ()=>destroySession,
    "generateSessionId",
    ()=>generateSessionId,
    "getSession",
    ()=>getSession,
    "hasPermission",
    ()=>hasPermission,
    "hasRole",
    ()=>hasRole,
    "refreshSession",
    ()=>refreshSession,
    "validateSession",
    ()=>validateSession,
    "withSession",
    ()=>withSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iron$2d$session$2f$dist$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/iron-session/dist/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/security.config.ts [middleware-edge] (ecmascript)");
;
;
;
// Session Configuration
const sessionOptions = {
    password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long',
    cookieName: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].session.cookieName,
    cookieOptions: {
        secure: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].session.secure,
        httpOnly: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].session.httpOnly,
        maxAge: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].session.maxAge,
        sameSite: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].session.sameSite,
        path: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].session.path,
        domain: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].session.domain
    },
    ttl: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].session.maxAge / 1000
};
function generateSessionId() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array).map((b)=>b.toString(16).padStart(2, '0')).join('');
}
async function createHash(data) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    return Array.from(new Uint8Array(hashBuffer)).map((b)=>b.toString(16).padStart(2, '0')).join('');
}
async function getSession(req, res) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iron$2d$session$2f$dist$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getIronSession"])(req, res, sessionOptions);
    return session;
}
async function createSession(req, res, userData) {
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
        twoFactorVerified: userData.twoFactorVerified || false
    });
    await session.save();
    // Log session creation
    logSessionEvent(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_EVENTS"].SESSION_CREATED, {
        userId: userData.userId,
        sessionId,
        ipAddress: session.ipAddress
    });
    return session;
}
async function validateSession(session) {
    // Check if session exists and is logged in
    if (!session || !session.isLoggedIn) {
        return {
            valid: false,
            reason: 'No active session'
        };
    }
    // Check session timeout
    const now = Date.now();
    const sessionAge = now - session.loginTime;
    const inactivityPeriod = now - session.lastActivity;
    if (sessionAge > __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].session.absoluteTimeout) {
        return {
            valid: false,
            reason: 'Session expired (absolute timeout)'
        };
    }
    if (inactivityPeriod > __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].session.idleTimeout) {
        return {
            valid: false,
            reason: 'Session expired (idle timeout)'
        };
    }
    // Check if account is locked
    if (session.accountLocked) {
        return {
            valid: false,
            reason: 'Account locked'
        };
    }
    // Check if password change is required
    if (session.passwordChangeRequired) {
        return {
            valid: false,
            reason: 'Password change required'
        };
    }
    return {
        valid: true
    };
}
async function refreshSession(session) {
    session.lastActivity = Date.now();
    await session.save();
}
async function destroySession(session) {
    const sessionId = session.sessionId;
    const userId = session.userId;
    session.destroy();
    // Log session destruction
    logSessionEvent(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_EVENTS"].SESSION_DESTROYED, {
        userId,
        sessionId
    });
}
function withSession(handler) {
    return async (req, res)=>{
        const session = await getSession(req, res);
        // Validate session
        const validation = await validateSession(session);
        if (!validation.valid) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify({
                error: 'Unauthorized',
                message: validation.reason
            }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        // Refresh session activity
        await refreshSession(session);
        // Call the handler with session
        return handler(req, res, session);
    };
}
function hasPermission(session, permission) {
    return session.permissions?.includes(permission) || false;
}
function hasRole(session, role) {
    return session.role === role;
}
/**
 * Log session events
 */ function logSessionEvent(event, details) {
    const logData = {
        event,
        timestamp: new Date().toISOString(),
        ...details
    };
    // In production, this would go to a proper logging service
    if ("TURBOPACK compile-time truthy", 1) {
        console.log('Session Event:', logData);
    }
}
const SessionUtils = {
    /**
   * Check if user is logged in
   */ async isLoggedIn () {
        try {
            const response = await fetch('/api/auth/session');
            return response.ok;
        } catch  {
            return false;
        }
    },
    /**
   * Get current session data
   */ async getSessionData () {
        try {
            const response = await fetch('/api/auth/session');
            if (response.ok) {
                return await response.json();
            }
            return null;
        } catch  {
            return null;
        }
    },
    /**
   * Logout
   */ async logout () {
        await fetch('/api/auth/logout', {
            method: 'POST'
        });
    }
};
function createSessionMiddleware() {
    return async (request)=>{
        // This is a simplified version for middleware
        // Actual session handling is done in API routes
        return null;
    };
}
const __TURBOPACK__default__export__ = {
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
    SessionUtils
};
}),
"[project]/lib/security/headers.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Security Headers Configuration
 * Comprehensive security headers to protect against various web vulnerabilities
 */ __turbopack_context__.s([
    "DynamicCSP",
    ()=>DynamicCSP,
    "applySecurityHeaders",
    ()=>applySecurityHeaders,
    "buildCSP",
    ()=>buildCSP,
    "buildCSPWithNonce",
    ()=>buildCSPWithNonce,
    "checkSecurityHeadersCompliance",
    ()=>checkSecurityHeadersCompliance,
    "createSecurityHeadersMiddleware",
    ()=>createSecurityHeadersMiddleware,
    "default",
    ()=>__TURBOPACK__default__export__,
    "dynamicCSP",
    ()=>dynamicCSP,
    "generateNonce",
    ()=>generateNonce,
    "getAPISecurityHeaders",
    ()=>getAPISecurityHeaders,
    "getAdminSecurityHeaders",
    ()=>getAdminSecurityHeaders,
    "getAuthSecurityHeaders",
    ()=>getAuthSecurityHeaders,
    "getBaseSecurityHeaders",
    ()=>getBaseSecurityHeaders,
    "getEnvironmentSecurityHeaders",
    ()=>getEnvironmentSecurityHeaders,
    "getFileUploadSecurityHeaders",
    ()=>getFileUploadSecurityHeaders,
    "handleCSPViolation",
    ()=>handleCSPViolation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/security.config.ts [middleware-edge] (ecmascript)");
;
// Content Security Policy Builder
class CSPBuilder {
    directives = new Map();
    constructor(initialConfig = {}){
        Object.entries(initialConfig).forEach(([directive, values])=>{
            this.directives.set(directive, [
                ...values
            ]);
        });
    }
    addDirective(directive, values) {
        if (this.directives.has(directive)) {
            const existing = this.directives.get(directive);
            this.directives.set(directive, [
                ...existing,
                ...values
            ]);
        } else {
            this.directives.set(directive, [
                ...values
            ]);
        }
        return this;
    }
    removeDirective(directive) {
        this.directives.delete(directive);
        return this;
    }
    build() {
        const policies = [];
        this.directives.forEach((values, directive)=>{
            const uniqueValues = [
                ...new Set(values)
            ];
            policies.push(`${directive} ${uniqueValues.join(' ')}`);
        });
        return policies.join('; ');
    }
}
function getBaseSecurityHeaders() {
    return {
        // Prevent clickjacking attacks
        'X-Frame-Options': __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].headers['X-Frame-Options'],
        // Prevent MIME type sniffing
        'X-Content-Type-Options': __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].headers['X-Content-Type-Options'],
        // Enable XSS protection (legacy browsers)
        'X-XSS-Protection': __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].headers['X-XSS-Protection'],
        // Control referrer information
        'Referrer-Policy': __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].headers['Referrer-Policy'],
        // Control browser features
        'Permissions-Policy': __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].headers['Permissions-Policy'],
        // Force HTTPS in production
        ...("TURBOPACK compile-time value", "development") === 'production' && {
            'Strict-Transport-Security': __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].headers['Strict-Transport-Security']
        },
        // Prevent DNS prefetching
        'X-DNS-Prefetch-Control': 'off',
        // Disable client-side caching of sensitive content
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'Pragma': 'no-cache',
        'Expires': '0',
        // Server information disclosure
        'Server': 'Restaurant-Dashboard',
        // Cross-Origin policies
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Resource-Policy': 'same-site'
    };
}
function buildCSP(customConfig) {
    const baseConfig = {
        'default-src': __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].csp.defaultSrc,
        'script-src': __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].csp.scriptSrc,
        'style-src': __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].csp.styleSrc,
        'img-src': __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].csp.imgSrc,
        'font-src': __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].csp.fontSrc,
        'connect-src': __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].csp.connectSrc,
        'frame-src': __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].csp.frameSrc,
        'object-src': __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].csp.objectSrc,
        'base-uri': __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].csp.baseUri,
        'form-action': __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].csp.formAction,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].csp.upgradeInsecureRequests && {
            'upgrade-insecure-requests': []
        }
    };
    const builder = new CSPBuilder(baseConfig);
    // Add custom configuration if provided
    if (customConfig) {
        Object.entries(customConfig).forEach(([directive, values])=>{
            builder.addDirective(directive, values);
        });
    }
    // Development-specific CSP adjustments
    if ("TURBOPACK compile-time truthy", 1) {
        builder.addDirective('script-src', [
            "'unsafe-eval'"
        ]);
        builder.addDirective('connect-src', [
            'ws://localhost:*',
            'wss://localhost:*'
        ]);
    }
    return builder.build();
}
function getAPISecurityHeaders() {
    return {
        ...getBaseSecurityHeaders(),
        'Content-Type': 'application/json',
        'X-Robots-Tag': 'noindex, nofollow, nosnippet, noarchive'
    };
}
function getFileUploadSecurityHeaders() {
    return {
        ...getBaseSecurityHeaders(),
        'Content-Security-Policy': buildCSP({
            'script-src': [
                "'none'"
            ],
            'object-src': [
                "'none'"
            ]
        }),
        'X-Content-Type-Options': 'nosniff',
        'Content-Disposition': 'attachment'
    };
}
function getAuthSecurityHeaders() {
    return {
        ...getBaseSecurityHeaders(),
        'Content-Security-Policy': buildCSP({
            'form-action': [
                "'self'"
            ],
            'frame-ancestors': [
                "'none'"
            ]
        }),
        'Cache-Control': 'no-store, no-cache, must-revalidate, private, max-age=0'
    };
}
function getAdminSecurityHeaders() {
    return {
        ...getBaseSecurityHeaders(),
        'Content-Security-Policy': buildCSP({
            'script-src': [
                "'self'",
                "'unsafe-inline'"
            ],
            'frame-ancestors': [
                "'none'"
            ]
        }),
        'X-Admin-Route': 'true'
    };
}
function applySecurityHeaders(response, headerType = 'base', customHeaders) {
    let headers;
    switch(headerType){
        case 'api':
            headers = getAPISecurityHeaders();
            break;
        case 'upload':
            headers = getFileUploadSecurityHeaders();
            break;
        case 'auth':
            headers = getAuthSecurityHeaders();
            break;
        case 'admin':
            headers = getAdminSecurityHeaders();
            break;
        default:
            headers = getBaseSecurityHeaders();
    }
    // Add Content Security Policy
    headers['Content-Security-Policy'] = buildCSP();
    // Merge custom headers
    if (customHeaders) {
        headers = {
            ...headers,
            ...customHeaders
        };
    }
    // Apply headers to response
    Object.entries(headers).forEach(([name, value])=>{
        response.headers.set(name, value);
    });
    return response;
}
function createSecurityHeadersMiddleware() {
    return (response, pathname)=>{
        // Determine header type based on pathname
        let headerType = 'base';
        if (pathname.startsWith('/api/')) {
            if (pathname.includes('/upload')) {
                headerType = 'upload';
            } else if (pathname.includes('/auth')) {
                headerType = 'auth';
            } else if (pathname.includes('/admin')) {
                headerType = 'admin';
            } else {
                headerType = 'api';
            }
        } else if (pathname.includes('/admin')) {
            headerType = 'admin';
        } else if (pathname.includes('/auth') || pathname.includes('/login') || pathname.includes('/register')) {
            headerType = 'auth';
        }
        return applySecurityHeaders(response, headerType);
    };
}
function handleCSPViolation(report) {
    // Log the violation
    console.warn('CSP Violation:', {
        documentUri: report['document-uri'],
        violatedDirective: report['violated-directive'],
        blockedUri: report['blocked-uri'],
        sourceFile: report['source-file'],
        lineNumber: report['line-number'],
        timestamp: new Date().toISOString()
    });
    // In production, you might want to:
    // 1. Send to logging service
    // 2. Alert security team for suspicious patterns
    // 3. Update CSP policy if legitimate violations occur frequently
    if (("TURBOPACK compile-time value", "development") === 'production') {
    // TODO: Integrate with monitoring/alerting system
    }
}
function generateNonce() {
    const crypto = __turbopack_context__.r("[project]/ [middleware-edge] (unsupported edge import 'crypto', ecmascript)");
    return crypto.randomBytes(16).toString('base64');
}
function buildCSPWithNonce(nonce, customConfig) {
    const configWithNonce = {
        ...customConfig,
        'script-src': [
            ...customConfig?.['script-src'] || __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].csp.scriptSrc,
            `'nonce-${nonce}'`
        ]
    };
    return buildCSP(configWithNonce);
}
function getEnvironmentSecurityHeaders() {
    const baseHeaders = getBaseSecurityHeaders();
    if ("TURBOPACK compile-time truthy", 1) {
        return {
            ...baseHeaders,
            'Content-Security-Policy': buildCSP({
                'script-src': [
                    "'self'",
                    "'unsafe-eval'",
                    "'unsafe-inline'"
                ],
                'style-src': [
                    "'self'",
                    "'unsafe-inline'"
                ],
                'connect-src': [
                    "'self'",
                    'ws://localhost:*',
                    'wss://localhost:*',
                    'http://localhost:*'
                ]
            })
        };
    }
    //TURBOPACK unreachable
    ;
}
function checkSecurityHeadersCompliance(headers) {
    const requiredHeaders = [
        'X-Frame-Options',
        'X-Content-Type-Options',
        'Referrer-Policy',
        'Content-Security-Policy'
    ];
    const recommendedHeaders = [
        'Strict-Transport-Security',
        'X-XSS-Protection',
        'Permissions-Policy'
    ];
    const passed = [];
    const failed = [];
    const warnings = [];
    // Check required headers
    requiredHeaders.forEach((header)=>{
        if (headers[header]) {
            passed.push(header);
        } else {
            failed.push(header);
        }
    });
    // Check recommended headers
    recommendedHeaders.forEach((header)=>{
        if (headers[header]) {
            passed.push(header);
        } else {
            warnings.push(`Recommended header missing: ${header}`);
        }
    });
    // Calculate score
    const totalChecks = requiredHeaders.length + recommendedHeaders.length;
    const score = Math.round(passed.length / totalChecks * 100);
    return {
        score,
        passed,
        failed,
        warnings
    };
}
class DynamicCSP {
    policies = new Map();
    addPagePolicy(pathname, policy) {
        this.policies.set(pathname, policy);
    }
    getCSPForPath(pathname, customConfig) {
        const pagePolicy = this.policies.get(pathname) || {};
        const mergedConfig = {
            ...customConfig,
            ...pagePolicy
        };
        return buildCSP(mergedConfig);
    }
    removePagePolicy(pathname) {
        this.policies.delete(pathname);
    }
}
const dynamicCSP = new DynamicCSP();
const __TURBOPACK__default__export__ = {
    getBaseSecurityHeaders,
    buildCSP,
    getAPISecurityHeaders,
    getFileUploadSecurityHeaders,
    getAuthSecurityHeaders,
    getAdminSecurityHeaders,
    applySecurityHeaders,
    createSecurityHeadersMiddleware,
    handleCSPViolation,
    generateNonce,
    buildCSPWithNonce,
    getEnvironmentSecurityHeaders,
    checkSecurityHeadersCompliance,
    DynamicCSP,
    dynamicCSP
};
}),
"[project]/lib/security/sanitization.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Input Sanitization Utilities
 * Comprehensive input cleaning and validation to prevent XSS, injection attacks, and data corruption
 */ __turbopack_context__.s([
    "createSanitizationMiddleware",
    ()=>createSanitizationMiddleware,
    "default",
    ()=>__TURBOPACK__default__export__,
    "sanitizeEmail",
    ()=>sanitizeEmail,
    "sanitizeFileName",
    ()=>sanitizeFileName,
    "sanitizeFilePath",
    ()=>sanitizeFilePath,
    "sanitizeFormData",
    ()=>sanitizeFormData,
    "sanitizeHTML",
    ()=>sanitizeHTML,
    "sanitizeInput",
    ()=>sanitizeInput,
    "sanitizeJSON",
    ()=>sanitizeJSON,
    "sanitizeNumber",
    ()=>sanitizeNumber,
    "sanitizeObject",
    ()=>sanitizeObject,
    "sanitizePhone",
    ()=>sanitizePhone,
    "sanitizeSQL",
    ()=>sanitizeSQL,
    "sanitizeSearchQuery",
    ()=>sanitizeSearchQuery,
    "sanitizeText",
    ()=>sanitizeText,
    "sanitizeURL",
    ()=>sanitizeURL,
    "sanitizeXSS",
    ()=>sanitizeXSS,
    "validateInput",
    ()=>validateInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dompurify$2f$dist$2f$purify$2e$es$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dompurify/dist/purify.es.mjs [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$validator$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/validator/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/security.config.ts [middleware-edge] (ecmascript)");
;
;
;
// Sanitization Configuration
const SANITIZATION_CONFIG = {
    // HTML sanitization options
    html: {
        allowedTags: [
            'p',
            'br',
            'strong',
            'em',
            'u',
            'ol',
            'ul',
            'li',
            'blockquote',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'a',
            'span',
            'div'
        ],
        allowedAttributes: {
            'a': [
                'href',
                'title',
                'target'
            ],
            'span': [
                'class'
            ],
            'div': [
                'class'
            ]
        },
        allowedSchemes: [
            'http',
            'https',
            'mailto'
        ],
        allowedClasses: [
            'highlight',
            'text-bold',
            'text-italic'
        ]
    },
    // File name sanitization
    fileName: {
        maxLength: 255,
        allowedChars: /^[a-zA-Z0-9._-]+$/,
        forbiddenNames: [
            'CON',
            'PRN',
            'AUX',
            'NUL',
            'COM1',
            'COM2',
            'COM3',
            'COM4',
            'COM5',
            'COM6',
            'COM7',
            'COM8',
            'COM9',
            'LPT1',
            'LPT2',
            'LPT3',
            'LPT4',
            'LPT5',
            'LPT6',
            'LPT7',
            'LPT8',
            'LPT9'
        ]
    },
    // SQL injection patterns (more comprehensive)
    sqlPatterns: [
        /(\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE)?|INSERT|MERGE|SELECT|UPDATE|UNION)\b)/gi,
        /(\b(SCRIPT|JAVASCRIPT|VBSCRIPT|ONLOAD|ONERROR|ONCLICK)\b)/gi,
        /((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/gi,
        /((\%27)|(\'))union/gi,
        /exec(\s|\+)+(s|x)p\w+/gi,
        /UNION(?:\s|\+|\/\*[\s\S]*?\*\/)*SELECT/gi
    ],
    // XSS patterns (comprehensive)
    xssPatterns: [
        /<script[^>]*>[\s\S]*?<\/script>/gi,
        /<iframe[^>]*>[\s\S]*?<\/iframe>/gi,
        /<object[^>]*>[\s\S]*?<\/object>/gi,
        /<embed[^>]*>/gi,
        /<link[^>]*>/gi,
        /<style[^>]*>[\s\S]*?<\/style>/gi,
        /javascript:/gi,
        /vbscript:/gi,
        /data:text\/html/gi,
        /on\w+\s*=/gi,
        /expression\s*\(/gi,
        /@import/gi,
        /binding\s*:/gi,
        /behavior\s*:/gi
    ],
    // Path traversal patterns
    pathTraversalPatterns: [
        /\.\./g,
        /\.\\\./g,
        /\.\//g,
        /~\//g,
        /%2e%2e/gi,
        /%2f/gi,
        /%5c/gi
    ]
};
function sanitizeHTML(input, allowedTags) {
    if (typeof input !== 'string') return '';
    // Configure DOMPurify
    const config = {
        ALLOWED_TAGS: allowedTags || SANITIZATION_CONFIG.html.allowedTags,
        ALLOWED_ATTR: Object.keys(SANITIZATION_CONFIG.html.allowedAttributes).reduce((acc, tag)=>{
            const attrs = SANITIZATION_CONFIG.html.allowedAttributes[tag];
            return [
                ...acc,
                ...attrs
            ];
        }, []),
        ALLOWED_URI_REGEXP: new RegExp(`^(${SANITIZATION_CONFIG.html.allowedSchemes.join('|')}):`, 'i')
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dompurify$2f$dist$2f$purify$2e$es$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].sanitize(input, config);
}
function sanitizeText(input) {
    if (typeof input !== 'string') return '';
    return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
}
function sanitizeSQL(input) {
    if (typeof input !== 'string') return '';
    let sanitized = input;
    // Remove SQL injection patterns
    SANITIZATION_CONFIG.sqlPatterns.forEach((pattern)=>{
        sanitized = sanitized.replace(pattern, '');
    });
    return sanitized.trim();
}
function sanitizeXSS(input) {
    if (typeof input !== 'string') return '';
    let sanitized = input;
    // Remove XSS patterns
    SANITIZATION_CONFIG.xssPatterns.forEach((pattern)=>{
        sanitized = sanitized.replace(pattern, '');
    });
    return sanitized;
}
function sanitizeEmail(input) {
    if (typeof input !== 'string') return '';
    const email = input.toLowerCase().trim();
    // Basic email validation and sanitization
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$validator$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].isEmail(email)) {
        throw new Error('Invalid email format');
    }
    // Remove potential XSS from email
    return sanitizeXSS(email);
}
function sanitizePhone(input) {
    if (typeof input !== 'string') return '';
    // Remove all non-digit characters except +, -, (, ), and spaces
    const sanitized = input.replace(/[^\d+\-\(\)\s]/g, '');
    // Validate format
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_PATTERNS"].PHONE_REGEX.test(sanitized)) {
        throw new Error('Invalid phone number format');
    }
    return sanitized.trim();
}
function sanitizeFileName(input) {
    if (typeof input !== 'string') return '';
    let fileName = input.trim();
    // Check length
    if (fileName.length > SANITIZATION_CONFIG.fileName.maxLength) {
        fileName = fileName.substring(0, SANITIZATION_CONFIG.fileName.maxLength);
    }
    // Remove path traversal attempts
    SANITIZATION_CONFIG.pathTraversalPatterns.forEach((pattern)=>{
        fileName = fileName.replace(pattern, '');
    });
    // Remove or replace unsafe characters
    fileName = fileName.replace(/[<>:"|?*]/g, '_');
    // Check for forbidden names (Windows reserved names)
    const nameWithoutExt = fileName.split('.')[0].toUpperCase();
    if (SANITIZATION_CONFIG.fileName.forbiddenNames.includes(nameWithoutExt)) {
        fileName = `safe_${fileName}`;
    }
    // Ensure it doesn't start with a dot or dash
    if (fileName.startsWith('.') || fileName.startsWith('-')) {
        fileName = `file_${fileName}`;
    }
    return fileName;
}
function sanitizeFilePath(input) {
    if (typeof input !== 'string') return '';
    let path = input.trim();
    // Remove path traversal attempts
    SANITIZATION_CONFIG.pathTraversalPatterns.forEach((pattern)=>{
        path = path.replace(pattern, '');
    });
    // Normalize path separators
    path = path.replace(/\\/g, '/');
    // Remove multiple consecutive slashes
    path = path.replace(/\/+/g, '/');
    // Remove leading slash if present
    if (path.startsWith('/')) {
        path = path.substring(1);
    }
    return path;
}
function sanitizeURL(input) {
    if (typeof input !== 'string') return '';
    const url = input.trim();
    // Validate URL format
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$validator$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].isURL(url, {
        protocols: [
            'http',
            'https'
        ],
        require_protocol: true,
        require_valid_protocol: true
    })) {
        throw new Error('Invalid URL format');
    }
    // Remove XSS attempts
    return sanitizeXSS(url);
}
function sanitizeNumber(input, options = {}) {
    const { min, max, allowDecimals = true } = options;
    let numStr = typeof input === 'number' ? input.toString() : input;
    if (typeof numStr !== 'string') {
        throw new Error('Invalid number input');
    }
    // Remove non-numeric characters except decimal point and minus sign
    numStr = numStr.replace(/[^\d.-]/g, '');
    if (!allowDecimals) {
        numStr = numStr.replace(/\./g, '');
    }
    const num = parseFloat(numStr);
    if (isNaN(num)) {
        throw new Error('Invalid number format');
    }
    if (min !== undefined && num < min) {
        throw new Error(`Number must be at least ${min}`);
    }
    if (max !== undefined && num > max) {
        throw new Error(`Number must be at most ${max}`);
    }
    return num;
}
function sanitizeJSON(input) {
    if (typeof input !== 'string') return null;
    try {
        // First, sanitize the string for XSS
        const sanitized = sanitizeXSS(input);
        // Parse JSON
        const parsed = JSON.parse(sanitized);
        // Recursively sanitize object values if it's an object
        if (typeof parsed === 'object' && parsed !== null) {
            return sanitizeObject(parsed);
        }
        return parsed;
    } catch (error) {
        throw new Error('Invalid JSON format');
    }
}
function sanitizeObject(obj, depth = 0) {
    // Prevent deep recursion attacks
    if (depth > 10) {
        throw new Error('Object nesting too deep');
    }
    if (Array.isArray(obj)) {
        return obj.map((item)=>sanitizeObject(item, depth + 1));
    }
    if (typeof obj === 'object' && obj !== null) {
        const sanitized = {};
        for (const [key, value] of Object.entries(obj)){
            // Sanitize key
            const sanitizedKey = sanitizeText(key);
            if (typeof value === 'string') {
                sanitized[sanitizedKey] = sanitizeText(value);
            } else if (typeof value === 'object') {
                sanitized[sanitizedKey] = sanitizeObject(value, depth + 1);
            } else {
                sanitized[sanitizedKey] = value;
            }
        }
        return sanitized;
    }
    return obj;
}
function sanitizeSearchQuery(input) {
    if (typeof input !== 'string') return '';
    let query = input.trim();
    // Remove potential SQL injection
    query = sanitizeSQL(query);
    // Remove XSS attempts
    query = sanitizeXSS(query);
    // Limit length
    if (query.length > 100) {
        query = query.substring(0, 100);
    }
    // Remove special regex characters that could cause issues
    query = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return query;
}
function sanitizeFormData(data) {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)){
        const sanitizedKey = sanitizeText(key);
        if (typeof value === 'string') {
            // Apply different sanitization based on field type
            switch(sanitizedKey.toLowerCase()){
                case 'email':
                    sanitized[sanitizedKey] = sanitizeEmail(value);
                    break;
                case 'phone':
                    sanitized[sanitizedKey] = sanitizePhone(value);
                    break;
                case 'url':
                case 'website':
                    sanitized[sanitizedKey] = sanitizeURL(value);
                    break;
                default:
                    sanitized[sanitizedKey] = sanitizeText(value);
            }
        } else if (typeof value === 'number') {
            sanitized[sanitizedKey] = value;
        } else if (typeof value === 'boolean') {
            sanitized[sanitizedKey] = value;
        } else if (Array.isArray(value)) {
            sanitized[sanitizedKey] = value.map((item)=>typeof item === 'string' ? sanitizeText(item) : item);
        } else if (typeof value === 'object' && value !== null) {
            sanitized[sanitizedKey] = sanitizeObject(value);
        } else {
            sanitized[sanitizedKey] = value;
        }
    }
    return sanitized;
}
function sanitizeInput(input, type = 'text') {
    if (input === null || input === undefined) return input;
    switch(type){
        case 'text':
            return sanitizeText(input);
        case 'html':
            return sanitizeHTML(input);
        case 'email':
            return sanitizeEmail(input);
        case 'phone':
            return sanitizePhone(input);
        case 'url':
            return sanitizeURL(input);
        case 'filename':
            return sanitizeFileName(input);
        case 'number':
            return sanitizeNumber(input);
        case 'json':
            return sanitizeJSON(input);
        case 'search':
            return sanitizeSearchQuery(input);
        default:
            return sanitizeText(input);
    }
}
function validateInput(input) {
    if (typeof input !== 'string') {
        return {
            isValid: false,
            threats: [
                'invalid_type'
            ],
            sanitized: ''
        };
    }
    const threats = [];
    let sanitized = input;
    // Check for SQL injection
    if (__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_PATTERNS"].SQL_INJECTION_PATTERNS.some((pattern)=>pattern.test(input))) {
        threats.push('sql_injection');
        sanitized = sanitizeSQL(sanitized);
    }
    // Check for XSS
    if (__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_PATTERNS"].XSS_PATTERNS.some((pattern)=>pattern.test(input))) {
        threats.push('xss');
        sanitized = sanitizeXSS(sanitized);
    }
    // Check for path traversal
    if (SANITIZATION_CONFIG.pathTraversalPatterns.some((pattern)=>pattern.test(input))) {
        threats.push('path_traversal');
        sanitized = sanitizeFilePath(sanitized);
    }
    return {
        isValid: threats.length === 0,
        threats,
        sanitized
    };
}
function createSanitizationMiddleware() {
    return async (req)=>{
        // Sanitize request body if present
        if (req.body) {
            req.body = sanitizeFormData(req.body);
        }
        // Sanitize query parameters
        const url = new URL(req.url);
        for (const [key, value] of url.searchParams.entries()){
            const sanitizedValue = sanitizeText(value);
            url.searchParams.set(key, sanitizedValue);
        }
        return req;
    };
}
const __TURBOPACK__default__export__ = {
    sanitizeHTML,
    sanitizeText,
    sanitizeSQL,
    sanitizeXSS,
    sanitizeEmail,
    sanitizePhone,
    sanitizeFileName,
    sanitizeFilePath,
    sanitizeURL,
    sanitizeNumber,
    sanitizeJSON,
    sanitizeObject,
    sanitizeSearchQuery,
    sanitizeFormData,
    sanitizeInput,
    validateInput,
    createSanitizationMiddleware
};
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Security Middleware
 * Central security middleware that coordinates all security measures
 */ __turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>__TURBOPACK__default__export__,
    "enhancedMiddleware",
    ()=>enhancedMiddleware,
    "middleware",
    ()=>middleware,
    "routeMiddleware",
    ()=>routeMiddleware,
    "withSecurityMiddleware",
    ()=>withSecurityMiddleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
// Temporarily disabled security middleware due to missing dependencies
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2f$csrf$2d$edge$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/security/csrf-edge.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2f$rate$2d$limit$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/security/rate-limit.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2f$session$2d$edge$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/security/session-edge.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2f$headers$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/security/headers.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2f$sanitization$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/security/sanitization.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/security.config.ts [middleware-edge] (ecmascript)");
;
;
;
;
;
;
;
// Middleware configuration
const MIDDLEWARE_CONFIG = {
    // Routes that should bypass certain security checks
    publicRoutes: [
        '/api/health',
        '/api/status'
    ],
    authRoutes: [
        '/api/auth',
        '/auth',
        '/login',
        '/register'
    ],
    staticRoutes: [
        '/_next',
        '/favicon.ico',
        '/robots.txt',
        '/sitemap.xml'
    ],
    // Routes that require authentication
    protectedRoutes: [
        '/dashboard',
        '/admin',
        '/settings',
        '/reports'
    ],
    // API routes that require CSRF protection
    csrfProtectedRoutes: [
        '/api/'
    ],
    // Routes with specific rate limits
    rateLimitedRoutes: {
        '/api/auth/login': 'login',
        '/api/auth/register': 'login',
        '/api/auth/reset-password': 'password-reset',
        '/api/upload': 'file-upload',
        '/api/reports': 'reports',
        '/api/search': 'search'
    }
};
/**
 * Check if route matches pattern
 */ function matchesRoute(pathname, patterns) {
    return patterns.some((pattern)=>{
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
 */ function isPublicRoute(pathname) {
    return matchesRoute(pathname, MIDDLEWARE_CONFIG.publicRoutes) || matchesRoute(pathname, MIDDLEWARE_CONFIG.staticRoutes);
}
/**
 * Check if route is protected (authentication required)
 */ function isProtectedRoute(pathname) {
    return matchesRoute(pathname, MIDDLEWARE_CONFIG.protectedRoutes);
}
/**
 * Check if route requires CSRF protection
 */ function requiresCSRFProtection(pathname) {
    return matchesRoute(pathname, MIDDLEWARE_CONFIG.csrfProtectedRoutes);
}
/**
 * Get rate limiter name for route
 */ function getRateLimiterForRoute(pathname) {
    for (const [route, limiter] of Object.entries(MIDDLEWARE_CONFIG.rateLimitedRoutes)){
        if (pathname.startsWith(route)) {
            return limiter;
        }
    }
    return 'api'; // Default rate limiter
}
/**
 * Security event logging
 */ function logSecurityEvent(event, details) {
    const logData = {
        event,
        timestamp: new Date().toISOString(),
        ...details
    };
    if ("TURBOPACK compile-time truthy", 1) {
        console.log('Security Event:', logData);
    }
// TODO: Integrate with proper logging service
}
/**
 * Validate request for suspicious patterns
 */ function validateRequest(request) {
    const threats = [];
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
        /scanner/i
    ];
    if (maliciousUAPatterns.some((pattern)=>pattern.test(userAgent))) {
        threats.push('suspicious_user_agent');
    }
    // Check for suspicious query parameters
    const url = request.nextUrl;
    for (const [key, value] of url.searchParams.entries()){
        const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2f$sanitization$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["validateInput"])(value);
        if (!validation.isValid) {
            threats.push(...validation.threats.map((threat)=>`query_${threat}`));
        }
    }
    // Check for path traversal in URL
    if (pathname.includes('../') || pathname.includes('..\\') || pathname.includes('%2e%2e')) {
        threats.push('path_traversal');
    }
    // Check for suspicious file extensions
    const suspiciousExtensions = [
        '.php',
        '.asp',
        '.jsp',
        '.cgi',
        '.pl'
    ];
    if (suspiciousExtensions.some((ext)=>pathname.includes(ext))) {
        threats.push('suspicious_file_extension');
    }
    return {
        isValid: threats.length === 0,
        threats
    };
}
async function middleware(request) {
    const startTime = Date.now();
    const pathname = request.nextUrl.pathname;
    const method = request.method;
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    // Create base response
    let response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    try {
        // Skip middleware for static assets and health checks
        if (matchesRoute(pathname, MIDDLEWARE_CONFIG.staticRoutes) || pathname.startsWith('/_next/static/')) {
            return response;
        }
        // Validate request for suspicious patterns
        const requestValidation = validateRequest(request);
        if (!requestValidation.isValid) {
            logSecurityEvent(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_EVENTS"].SUSPICIOUS_ACTIVITY, {
                ip,
                pathname,
                method,
                userAgent: request.headers.get('user-agent'),
                threats: requestValidation.threats
            });
            // Block severely suspicious requests
            if (requestValidation.threats.includes('path_traversal') || requestValidation.threats.includes('suspicious_user_agent')) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"]('Forbidden', {
                    status: 403
                });
            }
        }
        // Apply security headers
        const securityHeadersMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2f$headers$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createSecurityHeadersMiddleware"])();
        response = securityHeadersMiddleware(response, pathname);
        // Apply rate limiting for API routes
        if (pathname.startsWith('/api/')) {
            const rateLimiter = getRateLimiterForRoute(pathname);
            if (rateLimiter) {
                const rateLimitMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2f$rate$2d$limit$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createRateLimitMiddleware"])(rateLimiter);
                const rateLimitResult = await rateLimitMiddleware(request);
                if (rateLimitResult) {
                    return rateLimitResult; // Rate limit exceeded
                }
            }
        }
        // Apply CSRF protection for state-changing requests
        if (requiresCSRFProtection(pathname) && ![
            'GET',
            'HEAD',
            'OPTIONS'
        ].includes(method)) {
            const csrfMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2f$csrf$2d$edge$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createCSRFMiddleware"])();
            const csrfResult = await csrfMiddleware(request);
            if (csrfResult) {
                return csrfResult; // CSRF validation failed
            }
        }
        // Apply session middleware for all routes (handles session validation)
        const sessionMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2f$session$2d$edge$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createSessionMiddleware"])();
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
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(loginUrl);
            }
        }
        // Special handling for admin routes
        if (pathname.startsWith('/admin')) {
            const userRole = request.headers.get('x-user-role');
            if (userRole !== 'admin') {
                logSecurityEvent(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_EVENTS"].PERMISSION_DENIED, {
                    ip,
                    pathname,
                    userRole,
                    requiredRole: 'admin'
                });
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"]('Forbidden - Admin access required', {
                    status: 403
                });
            }
        }
        // Add request timing header for monitoring
        const processingTime = Date.now() - startTime;
        response.headers.set('X-Response-Time', `${processingTime}ms`);
        // Add security-related headers for debugging (development only)
        if ("TURBOPACK compile-time truthy", 1) {
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
            error: error.message
        });
        // Return a safe response even if middleware fails
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"]('Internal Server Error', {
            status: 500
        });
    }
}
async function enhancedMiddleware(request) {
    const response = await middleware(request);
    // Add additional security measures for production
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return response;
}
const config = {
    matcher: [
        /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)  
     * - favicon.ico (favicon file)
     * - public folder files
     */ '/((?!_next/static|_next/image|favicon.ico|public/).*)'
    ]
};
function withSecurityMiddleware(handler) {
    return async (request, ...args)=>{
        // Apply middleware logic
        const middlewareResponse = await middleware(request);
        // If middleware returns a response (error/redirect), return it
        if (middlewareResponse.status !== 200 && middlewareResponse.status !== 304) {
            return middlewareResponse;
        }
        // Continue with original handler
        const handlerResponse = await handler(request, ...args);
        // Apply security headers to handler response
        const securityHeadersMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2f$headers$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createSecurityHeadersMiddleware"])();
        return securityHeadersMiddleware(handlerResponse, request.nextUrl.pathname);
    };
}
const routeMiddleware = {
    /**
   * Middleware for authentication routes
   */ auth: async (request)=>{
        const pathname = request.nextUrl.pathname;
        if (!matchesRoute(pathname, MIDDLEWARE_CONFIG.authRoutes)) {
            return null;
        }
        // Apply stricter rate limiting for auth routes
        const rateLimitMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2f$rate$2d$limit$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createRateLimitMiddleware"])('login');
        return await rateLimitMiddleware(request);
    },
    /**
   * Middleware for file upload routes
   */ upload: async (request)=>{
        if (!request.nextUrl.pathname.includes('/upload')) {
            return null;
        }
        // Check file size limits
        const contentLength = request.headers.get('content-length');
        if (contentLength && parseInt(contentLength) > __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$security$2e$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SECURITY_CONFIG"].fileUpload.maxFileSize) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"]('File too large', {
                status: 413
            });
        }
        return null;
    },
    /**
   * Middleware for admin routes
   */ admin: async (request)=>{
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
            userAgent: request.headers.get('user-agent')
        });
        return null;
    }
};
const __TURBOPACK__default__export__ = middleware;
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__92a2daa2._.js.map