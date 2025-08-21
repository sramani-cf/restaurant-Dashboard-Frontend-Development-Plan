/**
 * Data Encryption Utilities
 * Comprehensive encryption/decryption functions for sensitive data
 */

import { 
  createCipher, 
  createDecipher, 
  createHash, 
  randomBytes, 
  pbkdf2Sync, 
  createHmac,
  scryptSync,
  timingSafeEqual
} from 'crypto';
import { SECURITY_CONFIG } from '../../config/security.config';
import bcrypt from 'bcryptjs';

// Encryption Configuration
const ENCRYPTION_CONFIG = {
  algorithm: SECURITY_CONFIG.encryption.algorithm,
  keyLength: SECURITY_CONFIG.encryption.keyLength,
  ivLength: SECURITY_CONFIG.encryption.ivLength,
  tagLength: SECURITY_CONFIG.encryption.tagLength,
  saltLength: SECURITY_CONFIG.encryption.saltLength,
  iterations: SECURITY_CONFIG.encryption.iterations,
  keyDerivationAlgorithm: 'scrypt' as const,
  hmacAlgorithm: 'sha256' as const,
};

// Encrypted Data Interface
interface EncryptedData {
  encrypted: string;
  iv: string;
  salt: string;
  tag: string;
  algorithm: string;
  keyLength: number;
  iterations: number;
}

/**
 * Generate a cryptographically secure key from password and salt
 */
export function deriveKey(password: string, salt: Buffer): Buffer {
  return scryptSync(password, salt, ENCRYPTION_CONFIG.keyLength);
}

/**
 * Generate a random salt
 */
export function generateSalt(): Buffer {
  return randomBytes(ENCRYPTION_CONFIG.saltLength);
}

/**
 * Generate a random initialization vector
 */
export function generateIV(): Buffer {
  return randomBytes(ENCRYPTION_CONFIG.ivLength);
}

/**
 * Encrypt sensitive data using AES-256-GCM
 */
export function encrypt(
  plaintext: string, 
  masterKey: string = process.env.ENCRYPTION_KEY || 'fallback-key'
): EncryptedData {
  try {
    const salt = generateSalt();
    const iv = generateIV();
    const key = deriveKey(masterKey, salt);
    
    const cipher = createCipher(ENCRYPTION_CONFIG.algorithm, key);
    cipher.setAAD(Buffer.from('restaurant-dashboard', 'utf8'));
    
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      salt: salt.toString('hex'),
      tag: tag.toString('hex'),
      algorithm: ENCRYPTION_CONFIG.algorithm,
      keyLength: ENCRYPTION_CONFIG.keyLength,
      iterations: ENCRYPTION_CONFIG.iterations,
    };
  } catch (error) {
    throw new Error('Encryption failed: ' + (error as Error).message);
  }
}

/**
 * Decrypt sensitive data using AES-256-GCM
 */
export function decrypt(
  encryptedData: EncryptedData, 
  masterKey: string = process.env.ENCRYPTION_KEY || 'fallback-key'
): string {
  try {
    const salt = Buffer.from(encryptedData.salt, 'hex');
    const iv = Buffer.from(encryptedData.iv, 'hex');
    const tag = Buffer.from(encryptedData.tag, 'hex');
    const key = deriveKey(masterKey, salt);
    
    const decipher = createDecipher(encryptedData.algorithm, key);
    decipher.setAuthTag(tag);
    decipher.setAAD(Buffer.from('restaurant-dashboard', 'utf8'));
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    throw new Error('Decryption failed: ' + (error as Error).message);
  }
}

/**
 * Hash password using bcrypt with salt
 */
export async function hashPassword(password: string, saltRounds: number = 12): Promise<string> {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw new Error('Password hashing failed: ' + (error as Error).message);
  }
}

/**
 * Verify password against hash using bcrypt
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Password verification failed:', error);
    return false;
  }
}

/**
 * Generate secure hash of data using SHA-256
 */
export function generateHash(data: string, algorithm: string = 'sha256'): string {
  return createHash(algorithm).update(data, 'utf8').digest('hex');
}

/**
 * Generate HMAC signature
 */
export function generateHMAC(
  data: string, 
  secret: string, 
  algorithm: string = ENCRYPTION_CONFIG.hmacAlgorithm
): string {
  return createHmac(algorithm, secret).update(data, 'utf8').digest('hex');
}

/**
 * Verify HMAC signature with timing-safe comparison
 */
export function verifyHMAC(
  data: string, 
  signature: string, 
  secret: string, 
  algorithm: string = ENCRYPTION_CONFIG.hmacAlgorithm
): boolean {
  const expectedSignature = generateHMAC(data, secret, algorithm);
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');
  const providedBuffer = Buffer.from(signature, 'hex');
  
  // Use timing-safe comparison to prevent timing attacks
  return expectedBuffer.length === providedBuffer.length &&
         timingSafeEqual(expectedBuffer, providedBuffer);
}

/**
 * Encrypt JSON object
 */
export function encryptJSON<T>(
  data: T, 
  masterKey?: string
): EncryptedData {
  const jsonString = JSON.stringify(data);
  return encrypt(jsonString, masterKey);
}

/**
 * Decrypt JSON object
 */
export function decryptJSON<T>(
  encryptedData: EncryptedData, 
  masterKey?: string
): T {
  const jsonString = decrypt(encryptedData, masterKey);
  return JSON.parse(jsonString);
}

/**
 * Encrypt database field (for specific columns)
 */
export function encryptDatabaseField(value: string, fieldName: string): string {
  const fieldKey = process.env[`${fieldName.toUpperCase()}_ENCRYPTION_KEY`] || 
                   process.env.DATABASE_ENCRYPTION_KEY || 
                   process.env.ENCRYPTION_KEY || 
                   'fallback-key';
  
  const encrypted = encrypt(value, fieldKey);
  return Buffer.from(JSON.stringify(encrypted)).toString('base64');
}

/**
 * Decrypt database field
 */
export function decryptDatabaseField(encryptedValue: string, fieldName: string): string {
  const fieldKey = process.env[`${fieldName.toUpperCase()}_ENCRYPTION_KEY`] || 
                   process.env.DATABASE_ENCRYPTION_KEY || 
                   process.env.ENCRYPTION_KEY || 
                   'fallback-key';
  
  const encryptedData: EncryptedData = JSON.parse(
    Buffer.from(encryptedValue, 'base64').toString()
  );
  
  return decrypt(encryptedData, fieldKey);
}

/**
 * Generate cryptographically secure random string
 */
export function generateSecureRandom(length: number = 32, encoding: BufferEncoding = 'hex'): string {
  return randomBytes(Math.ceil(length / 2)).toString(encoding).slice(0, length);
}

/**
 * Generate API key
 */
export function generateAPIKey(prefix: string = 'rsk'): string {
  const randomPart = generateSecureRandom(32);
  const timestamp = Date.now().toString(36);
  return `${prefix}_${timestamp}_${randomPart}`;
}

/**
 * Hash API key for storage
 */
export function hashAPIKey(apiKey: string): string {
  return generateHash(apiKey + process.env.API_KEY_SECRET, 'sha256');
}

/**
 * Verify API key
 */
export function verifyAPIKey(apiKey: string, hashedKey: string): boolean {
  const computedHash = hashAPIKey(apiKey);
  const expectedBuffer = Buffer.from(hashedKey, 'hex');
  const computedBuffer = Buffer.from(computedHash, 'hex');
  
  return expectedBuffer.length === computedBuffer.length &&
         timingSafeEqual(expectedBuffer, computedBuffer);
}

/**
 * Encrypt file content
 */
export function encryptFile(fileBuffer: Buffer, masterKey?: string): EncryptedData {
  const base64Content = fileBuffer.toString('base64');
  return encrypt(base64Content, masterKey);
}

/**
 * Decrypt file content
 */
export function decryptFile(encryptedData: EncryptedData, masterKey?: string): Buffer {
  const base64Content = decrypt(encryptedData, masterKey);
  return Buffer.from(base64Content, 'base64');
}

/**
 * Generate one-time token (for password resets, email verification, etc.)
 */
export function generateOneTimeToken(
  userId: string, 
  purpose: string, 
  expiresIn: number = 60 * 60 * 1000 // 1 hour default
): { token: string; expires: number } {
  const expires = Date.now() + expiresIn;
  const tokenData = {
    userId,
    purpose,
    expires,
    nonce: generateSecureRandom(16),
  };
  
  const token = Buffer.from(JSON.stringify(tokenData)).toString('base64url');
  const signature = generateHMAC(token, process.env.TOKEN_SECRET || 'token-secret');
  
  return {
    token: `${token}.${signature}`,
    expires,
  };
}

/**
 * Verify one-time token
 */
export function verifyOneTimeToken(
  tokenWithSignature: string,
  expectedUserId?: string,
  expectedPurpose?: string
): { valid: boolean; data?: any; reason?: string } {
  try {
    const [token, signature] = tokenWithSignature.split('.');
    
    if (!token || !signature) {
      return { valid: false, reason: 'Malformed token' };
    }
    
    // Verify signature
    const expectedSignature = generateHMAC(token, process.env.TOKEN_SECRET || 'token-secret');
    if (!verifyHMAC(token, signature, process.env.TOKEN_SECRET || 'token-secret')) {
      return { valid: false, reason: 'Invalid token signature' };
    }
    
    // Parse token data
    const tokenData = JSON.parse(Buffer.from(token, 'base64url').toString());
    
    // Check expiration
    if (Date.now() > tokenData.expires) {
      return { valid: false, reason: 'Token expired' };
    }
    
    // Check user ID if provided
    if (expectedUserId && tokenData.userId !== expectedUserId) {
      return { valid: false, reason: 'User mismatch' };
    }
    
    // Check purpose if provided
    if (expectedPurpose && tokenData.purpose !== expectedPurpose) {
      return { valid: false, reason: 'Purpose mismatch' };
    }
    
    return { valid: true, data: tokenData };
  } catch (error) {
    return { valid: false, reason: 'Token parsing failed' };
  }
}

/**
 * Encrypt sensitive configuration values
 */
export class EncryptedConfig {
  private static encryptValue(key: string, value: string): string {
    const configKey = process.env.CONFIG_ENCRYPTION_KEY || process.env.ENCRYPTION_KEY || 'config-key';
    const encrypted = encrypt(value, configKey + key);
    return Buffer.from(JSON.stringify(encrypted)).toString('base64');
  }
  
  private static decryptValue(key: string, encryptedValue: string): string {
    const configKey = process.env.CONFIG_ENCRYPTION_KEY || process.env.ENCRYPTION_KEY || 'config-key';
    const encryptedData = JSON.parse(Buffer.from(encryptedValue, 'base64').toString());
    return decrypt(encryptedData, configKey + key);
  }
  
  static set(key: string, value: string): string {
    return this.encryptValue(key, value);
  }
  
  static get(key: string, encryptedValue: string): string {
    return this.decryptValue(key, encryptedValue);
  }
}

/**
 * Utility for encrypting PII (Personally Identifiable Information)
 */
export class PIIEncryption {
  private static readonly PII_KEY = process.env.PII_ENCRYPTION_KEY || 
                                   process.env.ENCRYPTION_KEY || 
                                   'pii-encryption-key';
  
  static encryptPII(data: Record<string, any>): Record<string, any> {
    const piiFields = ['email', 'phone', 'address', 'ssn', 'creditCard', 'firstName', 'lastName'];
    const encrypted = { ...data };
    
    for (const field of piiFields) {
      if (encrypted[field]) {
        encrypted[field] = encryptDatabaseField(encrypted[field], field);
      }
    }
    
    return encrypted;
  }
  
  static decryptPII(data: Record<string, any>): Record<string, any> {
    const piiFields = ['email', 'phone', 'address', 'ssn', 'creditCard', 'firstName', 'lastName'];
    const decrypted = { ...data };
    
    for (const field of piiFields) {
      if (decrypted[field] && typeof decrypted[field] === 'string') {
        try {
          decrypted[field] = decryptDatabaseField(decrypted[field], field);
        } catch (error) {
          console.error(`Failed to decrypt PII field ${field}:`, error);
          // Don't throw error, just leave field encrypted
        }
      }
    }
    
    return decrypted;
  }
}

/**
 * Key rotation utilities
 */
export class KeyRotation {
  static rotateEncryptionKey(oldKey: string, newKey: string, encryptedData: EncryptedData): EncryptedData {
    // Decrypt with old key
    const plaintext = decrypt(encryptedData, oldKey);
    // Re-encrypt with new key
    return encrypt(plaintext, newKey);
  }
  
  static rotateMultipleKeys(
    oldKey: string, 
    newKey: string, 
    encryptedItems: EncryptedData[]
  ): EncryptedData[] {
    return encryptedItems.map(item => this.rotateEncryptionKey(oldKey, newKey, item));
  }
}

export default {
  encrypt,
  decrypt,
  hashPassword,
  verifyPassword,
  generateHash,
  generateHMAC,
  verifyHMAC,
  encryptJSON,
  decryptJSON,
  encryptDatabaseField,
  decryptDatabaseField,
  generateSecureRandom,
  generateAPIKey,
  hashAPIKey,
  verifyAPIKey,
  encryptFile,
  decryptFile,
  generateOneTimeToken,
  verifyOneTimeToken,
  EncryptedConfig,
  PIIEncryption,
  KeyRotation,
};