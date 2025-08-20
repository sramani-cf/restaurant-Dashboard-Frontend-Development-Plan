'use server';

import { 
  RestaurantProfile, 
  User, 
  Role, 
  Device, 
  PaymentConfiguration, 
  Integration, 
  TaxConfiguration, 
  GratuityConfiguration,
  AuditLogEntry,
  SettingsBackup,
  SecuritySettings
} from './types';

// Mock data store - replace with actual database calls
let mockData = {
  restaurant: null as RestaurantProfile | null,
  users: [] as User[],
  roles: [] as Role[],
  devices: [] as Device[],
  payments: [] as PaymentConfiguration[],
  integrations: [] as Integration[],
  taxes: null as TaxConfiguration | null,
  gratuity: null as GratuityConfiguration | null,
  security: null as SecuritySettings | null,
  auditLog: [] as AuditLogEntry[]
};

// Restaurant Profile Functions
export async function getRestaurantProfile(): Promise<RestaurantProfile | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (!mockData.restaurant) {
    // Return default restaurant profile
    return {
      id: '1',
      name: 'Sample Restaurant',
      description: 'A great place to dine',
      cuisine: ['American', 'Italian'],
      email: 'contact@samplerestaurant.com',
      phone: '(555) 123-4567',
      website: 'https://samplerestaurant.com',
      locations: [{
        id: 'loc-1',
        name: 'Main Location',
        address: {
          street1: '123 Main St',
          city: 'Anytown',
          state: 'ST',
          postalCode: '12345',
          country: 'US'
        },
        phone: '(555) 123-4567',
        isDefault: true,
        timezone: 'America/New_York',
        features: {
          delivery: true,
          takeout: true,
          dineIn: true,
          curbsidePickup: false,
          catering: false,
          reservations: true
        },
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }],
      operatingHours: {
        monday: { isOpen: true, shifts: [{ start: '09:00', end: '22:00' }] },
        tuesday: { isOpen: true, shifts: [{ start: '09:00', end: '22:00' }] },
        wednesday: { isOpen: true, shifts: [{ start: '09:00', end: '22:00' }] },
        thursday: { isOpen: true, shifts: [{ start: '09:00', end: '22:00' }] },
        friday: { isOpen: true, shifts: [{ start: '09:00', end: '23:00' }] },
        saturday: { isOpen: true, shifts: [{ start: '10:00', end: '23:00' }] },
        sunday: { isOpen: true, shifts: [{ start: '10:00', end: '21:00' }] }
      },
      socialMedia: {
        facebook: 'https://facebook.com/samplerestaurant',
        instagram: '@samplerestaurant'
      },
      branding: {
        primaryColor: '#D97706',
        secondaryColor: '#F59E0B',
        accentColor: '#EF4444',
        logoStyle: 'color',
        theme: 'light',
        fontFamily: 'Inter'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
  
  return mockData.restaurant;
}

export async function updateRestaurantProfile(profile: Partial<RestaurantProfile>): Promise<RestaurantProfile> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const current = await getRestaurantProfile();
  if (!current) throw new Error('Restaurant profile not found');
  
  mockData.restaurant = {
    ...current,
    ...profile,
    updatedAt: new Date()
  };
  
  // Log audit entry
  await logAuditEntry({
    userId: 'system',
    userEmail: 'system@restaurant.com',
    action: 'update',
    module: 'restaurant_profile',
    resourceId: current.id,
    resourceType: 'restaurant',
    changes: Object.keys(profile).map(key => ({
      field: key,
      oldValue: (current as any)[key],
      newValue: (profile as any)[key],
      valueType: typeof (profile as any)[key]
    })),
    metadata: { source: 'settings_page' },
    timestamp: new Date(),
    severity: 'medium'
  });
  
  return mockData.restaurant;
}

// User Management Functions
export async function getUsers(): Promise<User[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (mockData.users.length === 0) {
    // Return sample users
    mockData.users = [
      {
        id: '1',
        email: 'admin@restaurant.com',
        firstName: 'John',
        lastName: 'Admin',
        status: 'active',
        role: {
          id: 'admin',
          name: 'Administrator',
          type: 'admin',
          permissions: [],
          isCustom: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        locationAccess: ['loc-1'],
        createdAt: new Date(),
        updatedAt: new Date(),
        preferences: {
          timezone: 'America/New_York',
          dateFormat: 'MM/dd/yyyy',
          timeFormat: '12h',
          currency: 'USD',
          language: 'en',
          notifications: {
            email: true,
            sms: false,
            push: true,
            alerts: {
              newOrders: true,
              lowInventory: true,
              systemUpdates: false,
              paymentIssues: true,
              staffAlerts: true
            }
          },
          dashboard: {
            defaultView: 'overview',
            widgets: ['sales', 'orders', 'inventory'],
            layout: 'grid',
            autoRefresh: true,
            refreshInterval: 30
          }
        },
        auditLog: []
      },
      {
        id: '2',
        email: 'manager@restaurant.com',
        firstName: 'Jane',
        lastName: 'Manager',
        status: 'active',
        role: {
          id: 'manager',
          name: 'Manager',
          type: 'manager',
          permissions: [],
          isCustom: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        locationAccess: ['loc-1'],
        createdAt: new Date(),
        updatedAt: new Date(),
        preferences: {
          timezone: 'America/New_York',
          dateFormat: 'MM/dd/yyyy',
          timeFormat: '12h',
          currency: 'USD',
          language: 'en',
          notifications: {
            email: true,
            sms: false,
            push: true,
            alerts: {
              newOrders: true,
              lowInventory: true,
              systemUpdates: false,
              paymentIssues: true,
              staffAlerts: true
            }
          },
          dashboard: {
            defaultView: 'sales',
            widgets: ['sales', 'orders'],
            layout: 'grid',
            autoRefresh: true,
            refreshInterval: 60
          }
        },
        auditLog: []
      }
    ];
  }
  
  return mockData.users;
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await getUsers();
  return users.find(user => user.id === id) || null;
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'auditLog'>): Promise<User> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
    auditLog: []
  };
  
  mockData.users.push(newUser);
  
  await logAuditEntry({
    userId: 'system',
    userEmail: 'system@restaurant.com',
    action: 'create',
    module: 'users',
    resourceId: newUser.id,
    resourceType: 'user',
    metadata: { email: newUser.email, role: newUser.role.name },
    timestamp: new Date(),
    severity: 'medium'
  });
  
  return newUser;
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const userIndex = mockData.users.findIndex(user => user.id === id);
  if (userIndex === -1) return null;
  
  const oldUser = mockData.users[userIndex];
  mockData.users[userIndex] = {
    ...oldUser,
    ...updates,
    updatedAt: new Date()
  };
  
  await logAuditEntry({
    userId: 'system',
    userEmail: 'system@restaurant.com',
    action: 'update',
    module: 'users',
    resourceId: id,
    resourceType: 'user',
    changes: Object.keys(updates).map(key => ({
      field: key,
      oldValue: (oldUser as any)[key],
      newValue: (updates as any)[key],
      valueType: typeof (updates as any)[key]
    })),
    metadata: { userEmail: oldUser.email },
    timestamp: new Date(),
    severity: 'medium'
  });
  
  return mockData.users[userIndex];
}

export async function deleteUser(id: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const userIndex = mockData.users.findIndex(user => user.id === id);
  if (userIndex === -1) return false;
  
  const deletedUser = mockData.users[userIndex];
  mockData.users.splice(userIndex, 1);
  
  await logAuditEntry({
    userId: 'system',
    userEmail: 'system@restaurant.com',
    action: 'delete',
    module: 'users',
    resourceId: id,
    resourceType: 'user',
    metadata: { userEmail: deletedUser.email },
    timestamp: new Date(),
    severity: 'high'
  });
  
  return true;
}

// Role Management Functions
export async function getRoles(): Promise<Role[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (mockData.roles.length === 0) {
    mockData.roles = [
      {
        id: 'super_admin',
        name: 'Super Administrator',
        description: 'Full system access',
        type: 'super_admin',
        permissions: [],
        isCustom: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'admin',
        name: 'Administrator',
        description: 'Administrative access',
        type: 'admin',
        permissions: [],
        isCustom: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'manager',
        name: 'Manager',
        description: 'Management access',
        type: 'manager',
        permissions: [],
        isCustom: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'staff',
        name: 'Staff',
        description: 'Basic staff access',
        type: 'staff',
        permissions: [],
        isCustom: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }
  
  return mockData.roles;
}

export async function createRole(roleData: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Promise<Role> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const newRole: Role = {
    ...roleData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  mockData.roles.push(newRole);
  return newRole;
}

// Device Management Functions
export async function getDevices(): Promise<Device[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (mockData.devices.length === 0) {
    mockData.devices = [
      {
        id: '1',
        name: 'Main POS Terminal',
        type: 'pos_terminal',
        locationId: 'loc-1',
        status: 'online',
        ipAddress: '192.168.1.100',
        serialNumber: 'POS001',
        model: 'iPad Pro',
        manufacturer: 'Apple',
        version: '1.2.3',
        lastSeen: new Date(),
        configuration: {
          settings: {},
          permissions: [],
          integrations: [],
          autoUpdate: true,
          networkConfig: {
            connectionType: 'wifi',
            ssid: 'Restaurant_WiFi',
            staticIp: false
          }
        },
        capabilities: {
          touchscreen: true,
          printer: false,
          scanner: true,
          camera: true,
          nfc: true,
          bluetooth: true,
          wifi: true,
          ethernet: false
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }
  
  return mockData.devices;
}

export async function createDevice(deviceData: Omit<Device, 'id' | 'createdAt' | 'updatedAt'>): Promise<Device> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const newDevice: Device = {
    ...deviceData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  mockData.devices.push(newDevice);
  return newDevice;
}

// Payment Configuration Functions
export async function getPaymentConfigurations(): Promise<PaymentConfiguration[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockData.payments;
}

export async function createPaymentConfiguration(configData: Omit<PaymentConfiguration, 'id' | 'createdAt' | 'updatedAt'>): Promise<PaymentConfiguration> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const newConfig: PaymentConfiguration = {
    ...configData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  mockData.payments.push(newConfig);
  return newConfig;
}

// Integration Functions
export async function getIntegrations(): Promise<Integration[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockData.integrations;
}

export async function createIntegration(integrationData: Omit<Integration, 'id' | 'createdAt' | 'updatedAt'>): Promise<Integration> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const newIntegration: Integration = {
    ...integrationData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  mockData.integrations.push(newIntegration);
  return newIntegration;
}

// Tax Configuration Functions
export async function getTaxConfiguration(): Promise<TaxConfiguration | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockData.taxes;
}

export async function updateTaxConfiguration(taxConfig: Partial<TaxConfiguration>): Promise<TaxConfiguration> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  if (!mockData.taxes) {
    mockData.taxes = {
      id: '1',
      locationId: 'loc-1',
      rules: [],
      exemptions: [],
      reporting: {
        frequency: 'monthly',
        recipients: [],
        format: 'pdf',
        includeExemptions: false,
        breakdownByLocation: false,
        automaticFiling: false
      },
      updatedAt: new Date()
    };
  }
  
  mockData.taxes = {
    ...mockData.taxes,
    ...taxConfig,
    updatedAt: new Date()
  };
  
  return mockData.taxes;
}

// Gratuity Configuration Functions
export async function getGratuityConfiguration(): Promise<GratuityConfiguration | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockData.gratuity;
}

export async function updateGratuityConfiguration(gratuityConfig: Partial<GratuityConfiguration>): Promise<GratuityConfiguration> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  if (!mockData.gratuity) {
    mockData.gratuity = {
      id: '1',
      locationId: 'loc-1',
      autoGratuity: [],
      tipSuggestions: [
        { percentage: 15, isDefault: false, displayOrder: 1 },
        { percentage: 18, isDefault: true, displayOrder: 2 },
        { percentage: 20, isDefault: false, displayOrder: 3 },
        { percentage: 25, isDefault: false, displayOrder: 4 }
      ],
      distributionRules: [],
      pooling: {
        enabled: false,
        poolTypes: [],
        distributionSchedule: {
          frequency: 'weekly',
          automatic: false
        },
        transparencyLevel: 'summary'
      },
      reporting: {
        trackByEmployee: true,
        trackByShift: true,
        trackByServiceType: false,
        includeInPayroll: true,
        taxWithholding: true,
        auditTrail: true
      },
      updatedAt: new Date()
    };
  }
  
  mockData.gratuity = {
    ...mockData.gratuity,
    ...gratuityConfig,
    updatedAt: new Date()
  };
  
  return mockData.gratuity;
}

// Security Settings Functions
export async function getSecuritySettings(): Promise<SecuritySettings | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (!mockData.security) {
    mockData.security = {
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: false,
        preventReuse: 5,
        maxAge: 90,
        complexity: 'medium'
      },
      sessionSettings: {
        maxDuration: 480, // 8 hours
        inactivityTimeout: 30,
        concurrentSessions: 3,
        requireReauth: false,
        extendOnActivity: true
      },
      twoFactorAuth: {
        required: false,
        methods: ['email', 'sms'],
        backupCodes: 10,
        gracePeriod: 7
      },
      ipWhitelist: [],
      apiSecurity: {
        rateLimiting: {
          requestsPerSecond: 10,
          requestsPerMinute: 100,
          requestsPerHour: 1000,
          requestsPerDay: 10000,
          burstLimit: 50
        },
        requireApiKey: true,
        allowedOrigins: ['*'],
        requestSigning: false,
        auditAllRequests: true
      },
      dataEncryption: {
        encryptAtRest: true,
        encryptInTransit: true,
        keyRotationInterval: 90,
        algorithm: 'AES-256',
        backupEncryption: true
      }
    };
  }
  
  return mockData.security;
}

export async function updateSecuritySettings(securitySettings: Partial<SecuritySettings>): Promise<SecuritySettings> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const current = await getSecuritySettings();
  if (!current) throw new Error('Security settings not found');
  
  mockData.security = {
    ...current,
    ...securitySettings
  };
  
  return mockData.security;
}

// Audit Log Functions
export async function getAuditLog(filters?: {
  userId?: string;
  module?: string;
  action?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}): Promise<AuditLogEntry[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let filtered = [...mockData.auditLog];
  
  if (filters) {
    if (filters.userId) {
      filtered = filtered.filter(entry => entry.userId === filters.userId);
    }
    if (filters.module) {
      filtered = filtered.filter(entry => entry.module === filters.module);
    }
    if (filters.action) {
      filtered = filtered.filter(entry => entry.action === filters.action);
    }
    if (filters.startDate) {
      filtered = filtered.filter(entry => entry.timestamp >= filters.startDate!);
    }
    if (filters.endDate) {
      filtered = filtered.filter(entry => entry.timestamp <= filters.endDate!);
    }
  }
  
  // Sort by timestamp descending
  filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  
  if (filters?.limit) {
    filtered = filtered.slice(0, filters.limit);
  }
  
  return filtered;
}

export async function logAuditEntry(entry: Omit<AuditLogEntry, 'id'>): Promise<AuditLogEntry> {
  const auditEntry: AuditLogEntry = {
    ...entry,
    id: Date.now().toString()
  };
  
  mockData.auditLog.push(auditEntry);
  
  // Keep only last 10000 entries to prevent memory issues
  if (mockData.auditLog.length > 10000) {
    mockData.auditLog = mockData.auditLog.slice(-10000);
  }
  
  return auditEntry;
}

// Settings Backup/Export Functions
export async function exportSettings(options: {
  sections: string[];
  includeCredentials: boolean;
  format: 'json' | 'yaml';
}): Promise<SettingsBackup> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const backup: SettingsBackup = {
    version: '1.0.0',
    timestamp: new Date(),
    restaurantId: 'restaurant-1',
    sections: [],
    checksum: ''
  };
  
  // Add requested sections to backup
  if (options.sections.includes('restaurant')) {
    backup.sections.push({
      name: 'restaurant',
      version: '1.0.0',
      data: mockData.restaurant,
      encrypted: false
    });
  }
  
  if (options.sections.includes('users')) {
    backup.sections.push({
      name: 'users',
      version: '1.0.0',
      data: options.includeCredentials ? mockData.users : 
        mockData.users.map(user => ({ ...user, auditLog: [] })),
      encrypted: options.includeCredentials
    });
  }
  
  // Add other sections as requested...
  
  // Generate checksum
  backup.checksum = generateChecksum(backup);
  
  return backup;
}

export async function importSettings(backup: SettingsBackup, options: {
  overwrite: boolean;
  selectiveSections: string[];
}): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validate checksum
  const expectedChecksum = generateChecksum({ ...backup, checksum: '' });
  if (expectedChecksum !== backup.checksum) {
    throw new Error('Backup integrity check failed');
  }
  
  // Import each section
  for (const section of backup.sections) {
    if (options.selectiveSections.length > 0 && !options.selectiveSections.includes(section.name)) {
      continue;
    }
    
    switch (section.name) {
      case 'restaurant':
        if (options.overwrite || !mockData.restaurant) {
          mockData.restaurant = section.data;
        }
        break;
      case 'users':
        if (options.overwrite) {
          mockData.users = section.data;
        } else {
          // Merge users, avoiding duplicates
          const existingEmails = new Set(mockData.users.map(u => u.email));
          const newUsers = section.data.filter((u: User) => !existingEmails.has(u.email));
          mockData.users.push(...newUsers);
        }
        break;
      // Handle other sections...
    }
  }
  
  return true;
}

// Helper function to generate checksum
function generateChecksum(data: any): string {
  // Simple checksum implementation - in real app, use proper hashing
  return Date.now().toString(36);
}

// Settings validation
export async function validateSettings(): Promise<{
  isValid: boolean;
  errors: string[];
  warnings: string[];
}> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Validate restaurant profile
  const restaurant = await getRestaurantProfile();
  if (!restaurant) {
    errors.push('Restaurant profile is required');
  } else {
    if (!restaurant.name) errors.push('Restaurant name is required');
    if (!restaurant.email) errors.push('Restaurant email is required');
    if (restaurant.locations.length === 0) errors.push('At least one location is required');
  }
  
  // Validate users
  const users = await getUsers();
  if (users.length === 0) {
    warnings.push('No users configured');
  }
  
  const admins = users.filter(u => u.role.type === 'admin' || u.role.type === 'super_admin');
  if (admins.length === 0) {
    errors.push('At least one administrator is required');
  }
  
  // Validate security settings
  const security = await getSecuritySettings();
  if (security) {
    if (security.passwordPolicy.minLength < 6) {
      warnings.push('Password minimum length is less than recommended (8 characters)');
    }
    if (!security.twoFactorAuth.required) {
      warnings.push('Two-factor authentication is not required');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}