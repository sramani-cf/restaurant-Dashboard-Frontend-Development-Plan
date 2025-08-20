/**
 * Input Sanitization Utilities
 * Comprehensive input cleaning and validation to prevent XSS, injection attacks, and data corruption
 */

import DOMPurify from 'dompurify';
import validator from 'validator';
import { SECURITY_PATTERNS } from '../../security.config';

// Sanitization Configuration
const SANITIZATION_CONFIG = {
  // HTML sanitization options
  html: {
    allowedTags: [
      'p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'blockquote',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'span', 'div'
    ],
    allowedAttributes: {
      'a': ['href', 'title', 'target'],
      'span': ['class'],
      'div': ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedClasses: ['highlight', 'text-bold', 'text-italic'],
  },
  
  // File name sanitization
  fileName: {
    maxLength: 255,
    allowedChars: /^[a-zA-Z0-9._-]+$/,
    forbiddenNames: ['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9', 'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'],
  },
  
  // SQL injection patterns (more comprehensive)
  sqlPatterns: [
    /(\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE)?|INSERT|MERGE|SELECT|UPDATE|UNION)\b)/gi,
    /(\b(SCRIPT|JAVASCRIPT|VBSCRIPT|ONLOAD|ONERROR|ONCLICK)\b)/gi,
    /((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/gi,
    /((\%27)|(\'))union/gi,
    /exec(\s|\+)+(s|x)p\w+/gi,
    /UNION(?:\s|\+|\/\*[\s\S]*?\*\/)*SELECT/gi,
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
    /behavior\s*:/gi,
  ],
  
  // Path traversal patterns
  pathTraversalPatterns: [
    /\.\./g,
    /\.\\\./g,
    /\.\//g,
    /~\//g,
    /%2e%2e/gi,
    /%2f/gi,
    /%5c/gi,
  ],
};

/**
 * Sanitize HTML content using DOMPurify
 */
export function sanitizeHTML(input: string, allowedTags?: string[]): string {
  if (typeof input !== 'string') return '';
  
  // Configure DOMPurify
  const config: any = {
    ALLOWED_TAGS: allowedTags || SANITIZATION_CONFIG.html.allowedTags,
    ALLOWED_ATTR: Object.keys(SANITIZATION_CONFIG.html.allowedAttributes).reduce((acc, tag) => {
      const attrs = SANITIZATION_CONFIG.html.allowedAttributes[tag as keyof typeof SANITIZATION_CONFIG.html.allowedAttributes];
      return [...acc, ...attrs];
    }, [] as string[]),
    ALLOWED_URI_REGEXP: new RegExp(`^(${SANITIZATION_CONFIG.html.allowedSchemes.join('|')}):`, 'i'),
  };
  
  return DOMPurify.sanitize(input, config);
}

/**
 * Sanitize plain text by escaping HTML characters
 */
export function sanitizeText(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Remove potential SQL injection patterns
 */
export function sanitizeSQL(input: string): string {
  if (typeof input !== 'string') return '';
  
  let sanitized = input;
  
  // Remove SQL injection patterns
  SANITIZATION_CONFIG.sqlPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });
  
  return sanitized.trim();
}

/**
 * Remove XSS patterns from input
 */
export function sanitizeXSS(input: string): string {
  if (typeof input !== 'string') return '';
  
  let sanitized = input;
  
  // Remove XSS patterns
  SANITIZATION_CONFIG.xssPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });
  
  return sanitized;
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(input: string): string {
  if (typeof input !== 'string') return '';
  
  const email = input.toLowerCase().trim();
  
  // Basic email validation and sanitization
  if (!validator.isEmail(email)) {
    throw new Error('Invalid email format');
  }
  
  // Remove potential XSS from email
  return sanitizeXSS(email);
}

/**
 * Sanitize phone number
 */
export function sanitizePhone(input: string): string {
  if (typeof input !== 'string') return '';
  
  // Remove all non-digit characters except +, -, (, ), and spaces
  const sanitized = input.replace(/[^\d+\-\(\)\s]/g, '');
  
  // Validate format
  if (!SECURITY_PATTERNS.PHONE_REGEX.test(sanitized)) {
    throw new Error('Invalid phone number format');
  }
  
  return sanitized.trim();
}

/**
 * Sanitize file name
 */
export function sanitizeFileName(input: string): string {
  if (typeof input !== 'string') return '';
  
  let fileName = input.trim();
  
  // Check length
  if (fileName.length > SANITIZATION_CONFIG.fileName.maxLength) {
    fileName = fileName.substring(0, SANITIZATION_CONFIG.fileName.maxLength);
  }
  
  // Remove path traversal attempts
  SANITIZATION_CONFIG.pathTraversalPatterns.forEach(pattern => {
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

/**
 * Sanitize file path
 */
export function sanitizeFilePath(input: string): string {
  if (typeof input !== 'string') return '';
  
  let path = input.trim();
  
  // Remove path traversal attempts
  SANITIZATION_CONFIG.pathTraversalPatterns.forEach(pattern => {
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

/**
 * Sanitize URL
 */
export function sanitizeURL(input: string): string {
  if (typeof input !== 'string') return '';
  
  const url = input.trim();
  
  // Validate URL format
  if (!validator.isURL(url, {
    protocols: ['http', 'https'],
    require_protocol: true,
    require_valid_protocol: true,
  })) {
    throw new Error('Invalid URL format');
  }
  
  // Remove XSS attempts
  return sanitizeXSS(url);
}

/**
 * Sanitize numeric input
 */
export function sanitizeNumber(input: string | number, options: {
  min?: number;
  max?: number;
  allowDecimals?: boolean;
} = {}): number {
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

/**
 * Sanitize JSON input
 */
export function sanitizeJSON(input: string): any {
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

/**
 * Recursively sanitize object properties
 */
export function sanitizeObject(obj: any, depth: number = 0): any {
  // Prevent deep recursion attacks
  if (depth > 10) {
    throw new Error('Object nesting too deep');
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item, depth + 1));
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const sanitized: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
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

/**
 * Sanitize search query
 */
export function sanitizeSearchQuery(input: string): string {
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

/**
 * Sanitize form data
 */
export function sanitizeFormData(data: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    const sanitizedKey = sanitizeText(key);
    
    if (typeof value === 'string') {
      // Apply different sanitization based on field type
      switch (sanitizedKey.toLowerCase()) {
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
      sanitized[sanitizedKey] = value.map(item => 
        typeof item === 'string' ? sanitizeText(item) : item
      );
    } else if (typeof value === 'object' && value !== null) {
      sanitized[sanitizedKey] = sanitizeObject(value);
    } else {
      sanitized[sanitizedKey] = value;
    }
  }
  
  return sanitized;
}

/**
 * Comprehensive input sanitization function
 */
export function sanitizeInput(
  input: any,
  type: 'text' | 'html' | 'email' | 'phone' | 'url' | 'filename' | 'number' | 'json' | 'search' = 'text'
): any {
  if (input === null || input === undefined) return input;
  
  switch (type) {
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

/**
 * Validate input against common attack patterns
 */
export function validateInput(input: string): { 
  isValid: boolean; 
  threats: string[]; 
  sanitized: string 
} {
  if (typeof input !== 'string') {
    return { isValid: false, threats: ['invalid_type'], sanitized: '' };
  }
  
  const threats: string[] = [];
  let sanitized = input;
  
  // Check for SQL injection
  if (SECURITY_PATTERNS.SQL_INJECTION_PATTERNS.some(pattern => pattern.test(input))) {
    threats.push('sql_injection');
    sanitized = sanitizeSQL(sanitized);
  }
  
  // Check for XSS
  if (SECURITY_PATTERNS.XSS_PATTERNS.some(pattern => pattern.test(input))) {
    threats.push('xss');
    sanitized = sanitizeXSS(sanitized);
  }
  
  // Check for path traversal
  if (SANITIZATION_CONFIG.pathTraversalPatterns.some(pattern => pattern.test(input))) {
    threats.push('path_traversal');
    sanitized = sanitizeFilePath(sanitized);
  }
  
  return {
    isValid: threats.length === 0,
    threats,
    sanitized,
  };
}

/**
 * Create sanitization middleware for API routes
 */
export function createSanitizationMiddleware() {
  return async (req: Request): Promise<any> => {
    // Sanitize request body if present
    if (req.body) {
      req.body = sanitizeFormData(req.body);
    }
    
    // Sanitize query parameters
    const url = new URL(req.url);
    for (const [key, value] of url.searchParams.entries()) {
      const sanitizedValue = sanitizeText(value);
      url.searchParams.set(key, sanitizedValue);
    }
    
    return req;
  };
}

export default {
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
  createSanitizationMiddleware,
};