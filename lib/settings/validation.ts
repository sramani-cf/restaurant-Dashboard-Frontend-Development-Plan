// Validation schemas for settings forms using Zod

import { z } from 'zod';

// Base validation schemas
const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
const emailSchema = z.string().email('Invalid email address');
const phoneSchema = z.string().regex(phoneRegex, 'Invalid phone number');
const urlSchema = z.string().url('Invalid URL').optional().or(z.literal(''));
const colorSchema = z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format');

// Address validation
export const addressSchema = z.object({
  street1: z.string().min(1, 'Street address is required'),
  street2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().min(3, 'Postal code is required'),
  country: z.string().min(2, 'Country is required')
});

// Operating hours validation
const timeSlotSchema = z.object({
  start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  type: z.enum(['regular', 'happy_hour', 'special']).optional()
});

const dayHoursSchema = z.object({
  isOpen: z.boolean(),
  shifts: z.array(timeSlotSchema).min(0)
}).refine((data) => {
  if (data.isOpen && data.shifts.length === 0) {
    return false;
  }
  return true;
}, 'At least one time slot required when open');

export const operatingHoursSchema = z.object({
  monday: dayHoursSchema,
  tuesday: dayHoursSchema,
  wednesday: dayHoursSchema,
  thursday: dayHoursSchema,
  friday: dayHoursSchema,
  saturday: dayHoursSchema,
  sunday: dayHoursSchema
});

// Restaurant profile validation
export const restaurantProfileSchema = z.object({
  name: z.string().min(1, 'Restaurant name is required').max(100, 'Name too long'),
  description: z.string().max(500, 'Description too long').optional(),
  cuisine: z.array(z.string()).min(1, 'At least one cuisine type is required'),
  email: emailSchema,
  phone: phoneSchema,
  website: urlSchema,
  logo: z.string().optional(),
  coverImage: z.string().optional(),
  socialMedia: z.object({
    facebook: urlSchema,
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    tiktok: z.string().optional(),
    yelp: urlSchema,
    googleBusiness: urlSchema
  }).optional(),
  branding: z.object({
    primaryColor: colorSchema,
    secondaryColor: colorSchema,
    accentColor: colorSchema,
    logoStyle: z.enum(['light', 'dark', 'color']),
    theme: z.enum(['light', 'dark', 'auto']),
    fontFamily: z.string().min(1, 'Font family is required')
  })
});

// Location validation
export const locationSchema = z.object({
  name: z.string().min(1, 'Location name is required'),
  address: addressSchema,
  phone: phoneSchema,
  email: emailSchema.optional(),
  timezone: z.string().min(1, 'Timezone is required'),
  coordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180)
  }).optional(),
  features: z.object({
    delivery: z.boolean(),
    takeout: z.boolean(),
    dineIn: z.boolean(),
    curbsidePickup: z.boolean(),
    catering: z.boolean(),
    reservations: z.boolean()
  }),
  operatingHours: operatingHoursSchema.optional()
});

// User validation schemas
export const userSchema = z.object({
  email: emailSchema,
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  phone: phoneSchema.optional(),
  roleId: z.string().min(1, 'Role is required'),
  locationAccess: z.array(z.string()).min(1, 'At least one location must be selected'),
  status: z.enum(['active', 'inactive', 'suspended', 'pending'])
});

export const userPreferencesSchema = z.object({
  timezone: z.string().min(1, 'Timezone is required'),
  dateFormat: z.string().min(1, 'Date format is required'),
  timeFormat: z.enum(['12h', '24h']),
  currency: z.string().length(3, 'Currency must be 3 characters'),
  language: z.string().min(2, 'Language code required'),
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean(),
    alerts: z.object({
      newOrders: z.boolean(),
      lowInventory: z.boolean(),
      systemUpdates: z.boolean(),
      paymentIssues: z.boolean(),
      staffAlerts: z.boolean()
    })
  }),
  dashboard: z.object({
    defaultView: z.string(),
    widgets: z.array(z.string()),
    layout: z.enum(['grid', 'list']),
    autoRefresh: z.boolean(),
    refreshInterval: z.number().min(5).max(300)
  })
});

// Password validation
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
  confirmPassword: z.string().min(1, 'Password confirmation is required')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

// Role validation
export const roleSchema = z.object({
  name: z.string().min(1, 'Role name is required').max(50, 'Role name too long'),
  description: z.string().max(200, 'Description too long').optional(),
  type: z.enum(['super_admin', 'admin', 'manager', 'staff', 'custom']),
  permissions: z.array(z.object({
    module: z.enum(['dashboard', 'menu', 'orders', 'pos', 'analytics', 'settings', 'users', 'payments', 'inventory', 'marketing', 'integrations']),
    action: z.enum(['view', 'create', 'edit', 'delete', 'approve', 'export', 'admin']),
    scope: z.enum(['global', 'location', 'own', 'team'])
  })),
  locationRestrictions: z.array(z.string()).optional()
});

// Device validation
export const deviceSchema = z.object({
  name: z.string().min(1, 'Device name is required'),
  type: z.enum(['pos_terminal', 'kds_screen', 'printer', 'tablet', 'scanner', 'scale', 'cash_drawer']),
  locationId: z.string().min(1, 'Location is required'),
  ipAddress: z.string().ip('Invalid IP address').optional(),
  macAddress: z.string().regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, 'Invalid MAC address').optional(),
  serialNumber: z.string().optional(),
  model: z.string().optional(),
  manufacturer: z.string().optional(),
  configuration: z.object({
    autoUpdate: z.boolean(),
    networkConfig: z.object({
      connectionType: z.enum(['wifi', 'ethernet', 'cellular']),
      ssid: z.string().optional(),
      staticIp: z.boolean()
    })
  })
});

// Payment configuration validation
export const paymentConfigSchema = z.object({
  gateway: z.enum(['stripe', 'square', 'paypal', 'toast', 'clover', 'custom']),
  isActive: z.boolean(),
  testMode: z.boolean(),
  credentials: z.object({
    publicKey: z.string().optional(),
    secretKey: z.string().optional(),
    applicationId: z.string().optional(),
    locationId: z.string().optional(),
    merchantId: z.string().optional()
  }),
  supportedMethods: z.array(z.object({
    type: z.enum(['credit_card', 'debit_card', 'cash', 'gift_card', 'apple_pay', 'google_pay', 'paypal', 'venmo', 'zelle', 'buy_now_pay_later']),
    enabled: z.boolean(),
    minimumAmount: z.number().min(0).optional(),
    maximumAmount: z.number().min(0).optional(),
    processingFee: z.number().min(0).optional()
  })),
  settings: z.object({
    autoCapture: z.boolean(),
    captureDelay: z.number().min(0).max(168), // max 7 days
    fraudDetection: z.object({
      enabled: z.boolean(),
      riskThreshold: z.enum(['low', 'medium', 'high']),
      requireCvv: z.boolean(),
      requireZipCode: z.boolean(),
      blockSuspiciousCards: z.boolean()
    })
  })
}).superRefine((data, ctx) => {
  // Validate that at least one payment method is enabled
  const enabledMethods = data.supportedMethods.filter(m => m.enabled);
  if (enabledMethods.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'At least one payment method must be enabled',
      path: ['supportedMethods']
    });
  }
  
  // Validate credentials based on gateway
  if (data.gateway === 'stripe') {
    if (!data.credentials.publicKey || !data.credentials.secretKey) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Stripe requires public and secret keys',
        path: ['credentials']
      });
    }
  }
});

// Integration validation
export const integrationSchema = z.object({
  name: z.string().min(1, 'Integration name is required'),
  type: z.enum(['accounting', 'inventory', 'delivery', 'marketing', 'loyalty', 'pos', 'analytics', 'crm', 'payroll', 'reservation', 'review_management']),
  provider: z.string().min(1, 'Provider is required'),
  isActive: z.boolean(),
  credentials: z.object({
    apiKey: z.string().optional(),
    apiSecret: z.string().optional(),
    accessToken: z.string().optional(),
    clientId: z.string().optional(),
    clientSecret: z.string().optional()
  }),
  syncSettings: z.object({
    frequency: z.enum(['realtime', 'every_minute', 'every_5_minutes', 'every_15_minutes', 'hourly', 'daily', 'weekly', 'manual']),
    direction: z.enum(['bidirectional', 'push_only', 'pull_only']),
    batchSize: z.number().min(1).max(1000),
    retryAttempts: z.number().min(0).max(10),
    enableRealtime: z.boolean()
  })
}).superRefine((data, ctx) => {
  // Validate credentials based on integration type
  const requiresApiKey = ['accounting', 'inventory', 'delivery', 'marketing'];
  if (requiresApiKey.includes(data.type) && !data.credentials.apiKey) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${data.type} integration requires an API key`,
      path: ['credentials', 'apiKey']
    });
  }
});

// Tax configuration validation
export const taxRuleSchema = z.object({
  name: z.string().min(1, 'Tax rule name is required'),
  type: z.enum(['sales_tax', 'vat', 'service_charge', 'environmental_fee', 'delivery_fee', 'custom']),
  rate: z.number().min(0).max(100, 'Tax rate cannot exceed 100%'),
  compound: z.boolean(),
  includedInPrice: z.boolean(),
  displayOnReceipt: z.boolean(),
  priority: z.number().min(0),
  effectiveFrom: z.date(),
  effectiveTo: z.date().optional(),
  isActive: z.boolean(),
  applicableItems: z.object({
    categories: z.array(z.string()),
    items: z.array(z.string()),
    modifiers: z.array(z.string()),
    excludeCategories: z.array(z.string()),
    excludeItems: z.array(z.string())
  })
}).refine((data) => {
  if (data.effectiveTo && data.effectiveFrom >= data.effectiveTo) {
    return false;
  }
  return true;
}, {
  message: 'Effective end date must be after start date',
  path: ['effectiveTo']
});

export const taxConfigurationSchema = z.object({
  locationId: z.string().min(1, 'Location is required'),
  rules: z.array(taxRuleSchema),
  reporting: z.object({
    frequency: z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'annually']),
    recipients: z.array(emailSchema),
    format: z.enum(['pdf', 'csv', 'json']),
    includeExemptions: z.boolean(),
    breakdownByLocation: z.boolean(),
    automaticFiling: z.boolean()
  })
});

// Gratuity configuration validation
export const tipSuggestionSchema = z.object({
  percentage: z.number().min(0).max(100),
  label: z.string().optional(),
  isDefault: z.boolean(),
  displayOrder: z.number().min(1)
});

export const autoGratuityRuleSchema = z.object({
  name: z.string().min(1, 'Rule name is required'),
  rate: z.number().min(0).max(100, 'Rate cannot exceed 100%'),
  trigger: z.object({
    type: z.enum(['party_size', 'order_total', 'time_based', 'service_type']),
    threshold: z.number().min(0),
    comparisonOperator: z.enum(['greater_than', 'greater_equal', 'equals'])
  }),
  override: z.boolean(),
  isActive: z.boolean()
});

export const gratuityConfigurationSchema = z.object({
  locationId: z.string().min(1, 'Location is required'),
  autoGratuity: z.array(autoGratuityRuleSchema),
  tipSuggestions: z.array(tipSuggestionSchema).min(1, 'At least one tip suggestion is required'),
  pooling: z.object({
    enabled: z.boolean(),
    distributionSchedule: z.object({
      frequency: z.enum(['daily', 'weekly', 'biweekly', 'monthly']),
      dayOfWeek: z.number().min(0).max(6).optional(),
      dayOfMonth: z.number().min(1).max(31).optional(),
      automatic: z.boolean()
    }),
    transparencyLevel: z.enum(['full', 'summary', 'none'])
  }),
  reporting: z.object({
    trackByEmployee: z.boolean(),
    trackByShift: z.boolean(),
    trackByServiceType: z.boolean(),
    includeInPayroll: z.boolean(),
    taxWithholding: z.boolean(),
    auditTrail: z.boolean()
  })
});

// Security settings validation
export const passwordPolicySchema = z.object({
  minLength: z.number().min(6).max(128),
  requireUppercase: z.boolean(),
  requireLowercase: z.boolean(),
  requireNumbers: z.boolean(),
  requireSpecialChars: z.boolean(),
  preventReuse: z.number().min(0).max(50),
  maxAge: z.number().min(0).max(365),
  complexity: z.enum(['low', 'medium', 'high'])
});

export const sessionSettingsSchema = z.object({
  maxDuration: z.number().min(5).max(1440), // 5 minutes to 24 hours
  inactivityTimeout: z.number().min(1).max(240), // 1 minute to 4 hours
  concurrentSessions: z.number().min(1).max(20),
  requireReauth: z.boolean(),
  extendOnActivity: z.boolean()
});

export const securitySettingsSchema = z.object({
  passwordPolicy: passwordPolicySchema,
  sessionSettings: sessionSettingsSchema,
  twoFactorAuth: z.object({
    required: z.boolean(),
    methods: z.array(z.enum(['sms', 'email', 'totp', 'hardware_key'])).min(1),
    backupCodes: z.number().min(0).max(50),
    gracePeriod: z.number().min(0).max(30)
  }),
  ipWhitelist: z.array(z.string().ip()),
  dataEncryption: z.object({
    encryptAtRest: z.boolean(),
    encryptInTransit: z.boolean(),
    keyRotationInterval: z.number().min(1).max(365),
    algorithm: z.string().min(1),
    backupEncryption: z.boolean()
  })
});

// Import/Export validation
export const importOptionsSchema = z.object({
  overwrite: z.boolean(),
  selectiveSections: z.array(z.string()),
  preserveIds: z.boolean(),
  validateIntegrity: z.boolean(),
  createBackup: z.boolean()
});

export const exportOptionsSchema = z.object({
  sections: z.array(z.string()).min(1, 'At least one section must be selected'),
  includeCredentials: z.boolean(),
  encryptSensitiveData: z.boolean(),
  format: z.enum(['json', 'yaml', 'csv']),
  compression: z.boolean()
});

// Validation helper functions
export function validateEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

export function validatePhone(phone: string): boolean {
  return phoneSchema.safeParse(phone).success;
}

export function validateUrl(url: string): boolean {
  return urlSchema.safeParse(url).success;
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const result = passwordSchema.safeParse(password);
  return {
    isValid: result.success,
    errors: result.success ? [] : result.error.errors.map(e => e.message)
  };
}

export function validateTimeSlot(start: string, end: string): boolean {
  const startValid = timeSlotSchema.shape.start.safeParse(start).success;
  const endValid = timeSlotSchema.shape.end.safeParse(end).success;
  
  if (!startValid || !endValid) return false;
  
  // Check that end time is after start time
  const [startHour, startMin] = start.split(':').map(Number);
  const [endHour, endMin] = end.split(':').map(Number);
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  
  return endMinutes > startMinutes;
}

// Form validation helper
export function createFormValidator<T extends z.ZodType>(schema: T) {
  return (data: unknown) => {
    const result = schema.safeParse(data);
    if (result.success) {
      return { data: result.data, errors: {} };
    } else {
      const errors: Record<string, string[]> = {};
      result.error.errors.forEach((error) => {
        const path = error.path.join('.');
        if (!errors[path]) errors[path] = [];
        errors[path].push(error.message);
      });
      return { data: null, errors };
    }
  };
}