/**
 * Security Headers Configuration
 * Comprehensive security headers to protect against various web vulnerabilities
 */

import { NextResponse } from 'next/server';
import { SECURITY_CONFIG } from '../../config/security.config';

// Security Headers Interface
export interface SecurityHeaders {
  [key: string]: string;
}

// Content Security Policy Builder
class CSPBuilder {
  private directives: Map<string, string[]> = new Map();

  constructor(initialConfig: Record<string, string[]> = {}) {
    Object.entries(initialConfig).forEach(([directive, values]) => {
      this.directives.set(directive, [...values]);
    });
  }

  addDirective(directive: string, values: string[]): this {
    if (this.directives.has(directive)) {
      const existing = this.directives.get(directive)!;
      this.directives.set(directive, [...existing, ...values]);
    } else {
      this.directives.set(directive, [...values]);
    }
    return this;
  }

  removeDirective(directive: string): this {
    this.directives.delete(directive);
    return this;
  }

  build(): string {
    const policies: string[] = [];
    
    this.directives.forEach((values, directive) => {
      const uniqueValues = [...new Set(values)];
      policies.push(`${directive} ${uniqueValues.join(' ')}`);
    });

    return policies.join('; ');
  }
}

/**
 * Get base security headers
 */
export function getBaseSecurityHeaders(): SecurityHeaders {
  return {
    // Prevent clickjacking attacks
    'X-Frame-Options': SECURITY_CONFIG.headers['X-Frame-Options'],
    
    // Prevent MIME type sniffing
    'X-Content-Type-Options': SECURITY_CONFIG.headers['X-Content-Type-Options'],
    
    // Enable XSS protection (legacy browsers)
    'X-XSS-Protection': SECURITY_CONFIG.headers['X-XSS-Protection'],
    
    // Control referrer information
    'Referrer-Policy': SECURITY_CONFIG.headers['Referrer-Policy'],
    
    // Control browser features
    'Permissions-Policy': SECURITY_CONFIG.headers['Permissions-Policy'],
    
    // Force HTTPS in production
    ...(process.env.NODE_ENV === 'production' && {
      'Strict-Transport-Security': SECURITY_CONFIG.headers['Strict-Transport-Security'],
    }),
    
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
    'Cross-Origin-Resource-Policy': 'same-site',
  };
}

/**
 * Build Content Security Policy
 */
export function buildCSP(customConfig?: Record<string, string[]>): string {
  const baseConfig = {
    'default-src': SECURITY_CONFIG.csp.defaultSrc,
    'script-src': SECURITY_CONFIG.csp.scriptSrc,
    'style-src': SECURITY_CONFIG.csp.styleSrc,
    'img-src': SECURITY_CONFIG.csp.imgSrc,
    'font-src': SECURITY_CONFIG.csp.fontSrc,
    'connect-src': SECURITY_CONFIG.csp.connectSrc,
    'frame-src': SECURITY_CONFIG.csp.frameSrc,
    'object-src': SECURITY_CONFIG.csp.objectSrc,
    'base-uri': SECURITY_CONFIG.csp.baseUri,
    'form-action': SECURITY_CONFIG.csp.formAction,
    ...(SECURITY_CONFIG.csp.upgradeInsecureRequests && {
      'upgrade-insecure-requests': [],
    }),
  };

  const builder = new CSPBuilder(baseConfig);

  // Add custom configuration if provided
  if (customConfig) {
    Object.entries(customConfig).forEach(([directive, values]) => {
      builder.addDirective(directive, values);
    });
  }

  // Development-specific CSP adjustments
  if (process.env.NODE_ENV === 'development') {
    builder.addDirective('script-src', ["'unsafe-eval'"]);
    builder.addDirective('connect-src', ['ws://localhost:*', 'wss://localhost:*']);
  }

  return builder.build();
}

/**
 * Get security headers for API routes
 */
export function getAPISecurityHeaders(): SecurityHeaders {
  return {
    ...getBaseSecurityHeaders(),
    'Content-Type': 'application/json',
    'X-Robots-Tag': 'noindex, nofollow, nosnippet, noarchive',
  };
}

/**
 * Get security headers for file uploads
 */
export function getFileUploadSecurityHeaders(): SecurityHeaders {
  return {
    ...getBaseSecurityHeaders(),
    'Content-Security-Policy': buildCSP({
      'script-src': ["'none'"],
      'object-src': ["'none'"],
    }),
    'X-Content-Type-Options': 'nosniff',
    'Content-Disposition': 'attachment',
  };
}

/**
 * Get security headers for authentication routes
 */
export function getAuthSecurityHeaders(): SecurityHeaders {
  return {
    ...getBaseSecurityHeaders(),
    'Content-Security-Policy': buildCSP({
      'form-action': ["'self'"],
      'frame-ancestors': ["'none'"],
    }),
    'Cache-Control': 'no-store, no-cache, must-revalidate, private, max-age=0',
  };
}

/**
 * Get security headers for admin routes
 */
export function getAdminSecurityHeaders(): SecurityHeaders {
  return {
    ...getBaseSecurityHeaders(),
    'Content-Security-Policy': buildCSP({
      'script-src': ["'self'", "'unsafe-inline'"], // Admin may need inline scripts
      'frame-ancestors': ["'none'"],
    }),
    'X-Admin-Route': 'true', // Custom header to identify admin routes
  };
}

/**
 * Apply security headers to NextResponse
 */
export function applySecurityHeaders(
  response: NextResponse,
  headerType: 'base' | 'api' | 'upload' | 'auth' | 'admin' = 'base',
  customHeaders?: SecurityHeaders
): NextResponse {
  let headers: SecurityHeaders;

  switch (headerType) {
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
    headers = { ...headers, ...customHeaders };
  }

  // Apply headers to response
  Object.entries(headers).forEach(([name, value]) => {
    response.headers.set(name, value);
  });

  return response;
}

/**
 * Create security headers middleware
 */
export function createSecurityHeadersMiddleware() {
  return (response: NextResponse, pathname: string): NextResponse => {
    // Determine header type based on pathname
    let headerType: 'base' | 'api' | 'upload' | 'auth' | 'admin' = 'base';

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

/**
 * Validate CSP violation reports
 */
export interface CSPViolationReport {
  'document-uri': string;
  referrer: string;
  'violated-directive': string;
  'effective-directive': string;
  'original-policy': string;
  'blocked-uri': string;
  'line-number': number;
  'column-number': number;
  'source-file': string;
  'status-code': number;
  'script-sample': string;
}

/**
 * Handle CSP violation reports
 */
export function handleCSPViolation(report: CSPViolationReport): void {
  // Log the violation
  console.warn('CSP Violation:', {
    documentUri: report['document-uri'],
    violatedDirective: report['violated-directive'],
    blockedUri: report['blocked-uri'],
    sourceFile: report['source-file'],
    lineNumber: report['line-number'],
    timestamp: new Date().toISOString(),
  });

  // In production, you might want to:
  // 1. Send to logging service
  // 2. Alert security team for suspicious patterns
  // 3. Update CSP policy if legitimate violations occur frequently
  
  if (process.env.NODE_ENV === 'production') {
    // TODO: Integrate with monitoring/alerting system
  }
}

/**
 * Generate nonce for inline scripts (when absolutely necessary)
 */
export function generateNonce(): string {
  const crypto = require('crypto');
  return crypto.randomBytes(16).toString('base64');
}

/**
 * Build CSP with nonce support
 */
export function buildCSPWithNonce(nonce: string, customConfig?: Record<string, string[]>): string {
  const configWithNonce = {
    ...customConfig,
    'script-src': [
      ...(customConfig?.['script-src'] || SECURITY_CONFIG.csp.scriptSrc),
      `'nonce-${nonce}'`,
    ],
  };

  return buildCSP(configWithNonce);
}

/**
 * Security headers for different environments
 */
export function getEnvironmentSecurityHeaders(): SecurityHeaders {
  const baseHeaders = getBaseSecurityHeaders();

  if (process.env.NODE_ENV === 'development') {
    return {
      ...baseHeaders,
      'Content-Security-Policy': buildCSP({
        'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
        'style-src': ["'self'", "'unsafe-inline'"],
        'connect-src': ["'self'", 'ws://localhost:*', 'wss://localhost:*', 'http://localhost:*'],
      }),
    };
  }

  if (process.env.NODE_ENV === 'production') {
    return {
      ...baseHeaders,
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'Content-Security-Policy': buildCSP(),
    };
  }

  return baseHeaders;
}

/**
 * Check security headers compliance
 */
export function checkSecurityHeadersCompliance(headers: Record<string, string>): {
  score: number;
  passed: string[];
  failed: string[];
  warnings: string[];
} {
  const requiredHeaders = [
    'X-Frame-Options',
    'X-Content-Type-Options',
    'Referrer-Policy',
    'Content-Security-Policy',
  ];

  const recommendedHeaders = [
    'Strict-Transport-Security',
    'X-XSS-Protection',
    'Permissions-Policy',
  ];

  const passed: string[] = [];
  const failed: string[] = [];
  const warnings: string[] = [];

  // Check required headers
  requiredHeaders.forEach(header => {
    if (headers[header]) {
      passed.push(header);
    } else {
      failed.push(header);
    }
  });

  // Check recommended headers
  recommendedHeaders.forEach(header => {
    if (headers[header]) {
      passed.push(header);
    } else {
      warnings.push(`Recommended header missing: ${header}`);
    }
  });

  // Calculate score
  const totalChecks = requiredHeaders.length + recommendedHeaders.length;
  const score = Math.round((passed.length / totalChecks) * 100);

  return { score, passed, failed, warnings };
}

/**
 * Dynamic CSP for specific pages/routes
 */
export class DynamicCSP {
  private policies: Map<string, Record<string, string[]>> = new Map();

  addPagePolicy(pathname: string, policy: Record<string, string[]>): void {
    this.policies.set(pathname, policy);
  }

  getCSPForPath(pathname: string, customConfig?: Record<string, string[]>): string {
    const pagePolicy = this.policies.get(pathname) || {};
    const mergedConfig = { ...customConfig, ...pagePolicy };
    return buildCSP(mergedConfig);
  }

  removePagePolicy(pathname: string): void {
    this.policies.delete(pathname);
  }
}

// Export singleton instance
export const dynamicCSP = new DynamicCSP();

export default {
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
  dynamicCSP,
};