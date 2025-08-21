/**
 * Zod Security Validation Schemas
 * Comprehensive input validation for all data models in the restaurant dashboard
 */

import { z } from 'zod';
import { SECURITY_PATTERNS } from '../../config/security.config';

// Base validation utilities
const createSecureString = (minLength = 1, maxLength = 255) =>
  z.string()
    .min(minLength, `Must be at least ${minLength} characters`)
    .max(maxLength, `Must be no more than ${maxLength} characters`)
    .refine((val) => {
      // Check for SQL injection patterns
      return !SECURITY_PATTERNS.SQL_INJECTION_PATTERNS.some(pattern => pattern.test(val));
    }, 'Contains potentially harmful content')
    .refine((val) => {
      // Check for XSS patterns
      return !SECURITY_PATTERNS.XSS_PATTERNS.some(pattern => pattern.test(val));
    }, 'Contains potentially harmful content');

const secureEmail = z.string()
  .email('Invalid email format')
  .max(254, 'Email too long')
  .regex(SECURITY_PATTERNS.EMAIL_REGEX, 'Invalid email format')
  .toLowerCase()
  .trim();

const securePassword = z.string()
  .min(12, 'Password must be at least 12 characters')
  .max(128, 'Password too long')
  .regex(SECURITY_PATTERNS.PASSWORD_STRENGTH_REGEX, 
    'Password must contain uppercase, lowercase, number, and special character');

const securePhone = z.string()
  .regex(SECURITY_PATTERNS.PHONE_REGEX, 'Invalid phone number format')
  .optional();

const secureId = z.string()
  .uuid('Invalid ID format')
  .or(z.string().regex(/^[a-zA-Z0-9_-]+$/, 'Invalid ID format'));

const secureUrl = z.string()
  .url('Invalid URL format')
  .refine((url) => {
    const allowedProtocols = ['http:', 'https:'];
    return allowedProtocols.includes(new URL(url).protocol);
  }, 'Only HTTP and HTTPS URLs are allowed');

// User Authentication Schemas
export const LoginSchema = z.object({
  email: secureEmail,
  password: z.string().min(1, 'Password is required').max(128),
  rememberMe: z.boolean().default(false),
  twoFactorCode: z.string().regex(/^\d{6}$/, 'Invalid 2FA code').optional(),
});

export const RegisterSchema = z.object({
  email: secureEmail,
  password: securePassword,
  confirmPassword: z.string(),
  firstName: createSecureString(1, 50),
  lastName: createSecureString(1, 50),
  phone: securePhone,
  acceptTerms: z.boolean().refine(val => val === true, 'Must accept terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const PasswordResetSchema = z.object({
  email: secureEmail,
});

export const PasswordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: securePassword,
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const TwoFactorSetupSchema = z.object({
  secret: z.string().min(16, 'Invalid secret'),
  token: z.string().regex(/^\d{6}$/, 'Invalid verification code'),
});

// User Profile Schemas
export const UserProfileSchema = z.object({
  id: secureId.optional(),
  email: secureEmail,
  firstName: createSecureString(1, 50),
  lastName: createSecureString(1, 50),
  phone: securePhone,
  avatar: secureUrl.optional(),
  timezone: z.string().max(50).optional(),
  locale: z.string().max(10).optional(),
  role: z.enum(['admin', 'manager', 'staff', 'viewer']),
  permissions: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  lastLoginAt: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Restaurant Profile Schemas
export const RestaurantProfileSchema = z.object({
  id: secureId.optional(),
  name: createSecureString(1, 100),
  description: createSecureString(0, 500).optional(),
  address: z.object({
    street: createSecureString(1, 100),
    city: createSecureString(1, 50),
    state: createSecureString(1, 50),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
    country: z.string().length(2, 'Country code must be 2 characters'),
  }),
  phone: securePhone,
  email: secureEmail,
  website: secureUrl.optional(),
  timezone: z.string().max(50),
  currency: z.string().length(3, 'Currency code must be 3 characters'),
  logo: secureUrl.optional(),
});

// Menu Item Schemas
export const MenuItemSchema = z.object({
  id: secureId.optional(),
  name: createSecureString(1, 100),
  description: createSecureString(0, 500).optional(),
  price: z.number().min(0, 'Price must be non-negative').max(9999.99, 'Price too high'),
  category: createSecureString(1, 50),
  subcategory: createSecureString(0, 50).optional(),
  image: secureUrl.optional(),
  allergens: z.array(z.string().max(50)).default([]),
  nutritionalInfo: z.object({
    calories: z.number().min(0).max(9999).optional(),
    protein: z.number().min(0).max(999).optional(),
    carbs: z.number().min(0).max(999).optional(),
    fat: z.number().min(0).max(999).optional(),
  }).optional(),
  availability: z.object({
    isAvailable: z.boolean().default(true),
    availableFrom: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format').optional(),
    availableTo: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format').optional(),
    daysOfWeek: z.array(z.number().min(0).max(6)).default([0, 1, 2, 3, 4, 5, 6]),
  }).default({ isAvailable: true, daysOfWeek: [0, 1, 2, 3, 4, 5, 6] }),
  modifiers: z.array(z.string()).default([]),
  isVisible: z.boolean().default(true),
  sortOrder: z.number().min(0).default(0),
});

// Order Schemas
export const OrderItemSchema = z.object({
  menuItemId: secureId,
  quantity: z.number().min(1, 'Quantity must be at least 1').max(99, 'Quantity too high'),
  price: z.number().min(0, 'Price must be non-negative'),
  modifiers: z.array(z.object({
    id: secureId,
    name: createSecureString(1, 100),
    price: z.number().min(0),
  })).default([]),
  specialInstructions: createSecureString(0, 200).optional(),
});

export const OrderSchema = z.object({
  id: secureId.optional(),
  customerInfo: z.object({
    name: createSecureString(1, 100).optional(),
    email: secureEmail.optional(),
    phone: securePhone.optional(),
  }).optional(),
  items: z.array(OrderItemSchema).min(1, 'Order must have at least one item'),
  subtotal: z.number().min(0, 'Subtotal must be non-negative'),
  tax: z.number().min(0, 'Tax must be non-negative'),
  tip: z.number().min(0, 'Tip must be non-negative'),
  total: z.number().min(0, 'Total must be non-negative'),
  status: z.enum(['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']),
  orderType: z.enum(['dine-in', 'takeout', 'delivery']),
  paymentMethod: z.enum(['cash', 'card', 'mobile']),
  notes: createSecureString(0, 500).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Reservation Schemas
export const ReservationSchema = z.object({
  id: secureId.optional(),
  customerInfo: z.object({
    firstName: createSecureString(1, 50),
    lastName: createSecureString(1, 50),
    email: secureEmail,
    phone: securePhone,
  }),
  partySize: z.number().min(1, 'Party size must be at least 1').max(20, 'Party size too large'),
  reservationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  reservationTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  duration: z.number().min(30, 'Duration must be at least 30 minutes').max(300, 'Duration too long'),
  tableId: secureId.optional(),
  status: z.enum(['pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no-show']),
  specialRequests: createSecureString(0, 500).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Inventory Schemas
export const InventoryItemSchema = z.object({
  id: secureId.optional(),
  name: createSecureString(1, 100),
  description: createSecureString(0, 500).optional(),
  sku: createSecureString(1, 50),
  category: createSecureString(1, 50),
  unit: z.enum(['pieces', 'pounds', 'ounces', 'gallons', 'liters', 'grams', 'kilograms']),
  currentStock: z.number().min(0, 'Stock cannot be negative'),
  minStock: z.number().min(0, 'Minimum stock cannot be negative'),
  maxStock: z.number().min(0, 'Maximum stock cannot be negative'),
  costPerUnit: z.number().min(0, 'Cost must be non-negative'),
  supplier: createSecureString(0, 100).optional(),
  expirationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional(),
  location: createSecureString(0, 100).optional(),
  barcode: z.string().max(50).optional(),
});

// Staff Management Schemas
export const StaffMemberSchema = z.object({
  id: secureId.optional(),
  employeeId: createSecureString(1, 20),
  firstName: createSecureString(1, 50),
  lastName: createSecureString(1, 50),
  email: secureEmail,
  phone: securePhone,
  position: createSecureString(1, 50),
  department: createSecureString(1, 50),
  hireDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  hourlyRate: z.number().min(0, 'Hourly rate must be non-negative').optional(),
  isActive: z.boolean().default(true),
  permissions: z.array(z.string()).default([]),
  schedule: z.array(z.object({
    dayOfWeek: z.number().min(0).max(6),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  })).default([]),
});

// Analytics and Reporting Schemas
export const DateRangeSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid start date format'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid end date format'),
}).refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
  message: 'Start date must be before end date',
  path: ['endDate'],
});

export const ReportConfigSchema = z.object({
  reportType: z.enum(['sales', 'inventory', 'staff', 'customer', 'financial']),
  dateRange: DateRangeSchema,
  filters: z.record(z.string(), z.any()).default({}),
  format: z.enum(['json', 'csv', 'pdf']).default('json'),
  includeCharts: z.boolean().default(false),
});

// Settings Schemas
export const SettingsSchema = z.object({
  general: z.object({
    restaurantName: createSecureString(1, 100),
    timezone: z.string().max(50),
    currency: z.string().length(3),
    dateFormat: z.enum(['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']),
    timeFormat: z.enum(['12h', '24h']),
  }),
  notifications: z.object({
    emailNotifications: z.boolean().default(true),
    smsNotifications: z.boolean().default(false),
    pushNotifications: z.boolean().default(true),
    lowInventoryAlerts: z.boolean().default(true),
    newOrderAlerts: z.boolean().default(true),
    reservationAlerts: z.boolean().default(true),
  }),
  security: z.object({
    twoFactorRequired: z.boolean().default(false),
    sessionTimeout: z.number().min(15).max(1440).default(60), // minutes
    passwordExpiryDays: z.number().min(30).max(365).default(90),
    maxLoginAttempts: z.number().min(3).max(10).default(5),
  }),
  pos: z.object({
    taxRate: z.number().min(0).max(0.5).default(0.08),
    tipSuggestions: z.array(z.number().min(0).max(1)).default([0.15, 0.18, 0.20]),
    autoAcceptOrders: z.boolean().default(false),
    printReceipts: z.boolean().default(true),
  }),
});

// File Upload Schemas
export const FileUploadSchema = z.object({
  filename: createSecureString(1, 255)
    .refine((name) => !name.includes('..'), 'Filename cannot contain relative paths')
    .refine((name) => /^[a-zA-Z0-9._-]+$/.test(name), 'Filename contains invalid characters'),
  size: z.number().min(1, 'File cannot be empty').max(10 * 1024 * 1024, 'File too large'), // 10MB
  mimetype: z.string().refine((type) => [
    'image/jpeg',
    'image/png', 
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ].includes(type), 'File type not allowed'),
});

// API Response Schemas
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.object({
    message: z.string(),
    code: z.string().optional(),
    details: z.any().optional(),
  }).optional(),
  meta: z.object({
    timestamp: z.string(),
    requestId: z.string().optional(),
    version: z.string().optional(),
  }).optional(),
});

// Pagination Schema
export const PaginationSchema = z.object({
  page: z.number().min(1, 'Page must be at least 1').default(1),
  limit: z.number().min(1, 'Limit must be at least 1').max(100, 'Limit too high').default(10),
  sortBy: z.string().max(50).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

// Search Schema
export const SearchSchema = z.object({
  query: createSecureString(0, 100),
  filters: z.record(z.string(), z.any()).default({}),
  ...PaginationSchema.shape,
});

// Export all schemas for easy access
export const ValidationSchemas = {
  // Auth
  LoginSchema,
  RegisterSchema,
  PasswordResetSchema,
  PasswordChangeSchema,
  TwoFactorSetupSchema,
  
  // Users
  UserProfileSchema,
  
  // Restaurant
  RestaurantProfileSchema,
  
  // Menu
  MenuItemSchema,
  
  // Orders
  OrderSchema,
  OrderItemSchema,
  
  // Reservations
  ReservationSchema,
  
  // Inventory
  InventoryItemSchema,
  
  // Staff
  StaffMemberSchema,
  
  // Analytics
  DateRangeSchema,
  ReportConfigSchema,
  
  // Settings
  SettingsSchema,
  
  // File Upload
  FileUploadSchema,
  
  // API
  ApiResponseSchema,
  PaginationSchema,
  SearchSchema,
};

// Type exports for TypeScript
export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type PasswordResetInput = z.infer<typeof PasswordResetSchema>;
export type PasswordChangeInput = z.infer<typeof PasswordChangeSchema>;
export type TwoFactorSetupInput = z.infer<typeof TwoFactorSetupSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type RestaurantProfile = z.infer<typeof RestaurantProfileSchema>;
export type MenuItem = z.infer<typeof MenuItemSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Reservation = z.infer<typeof ReservationSchema>;
export type InventoryItem = z.infer<typeof InventoryItemSchema>;
export type StaffMember = z.infer<typeof StaffMemberSchema>;
export type DateRange = z.infer<typeof DateRangeSchema>;
export type ReportConfig = z.infer<typeof ReportConfigSchema>;
export type Settings = z.infer<typeof SettingsSchema>;
export type FileUpload = z.infer<typeof FileUploadSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;
export type Search = z.infer<typeof SearchSchema>;

export default ValidationSchemas;