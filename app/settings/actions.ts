'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  getRestaurantProfile,
  updateRestaurantProfile,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getRoles,
  createRole,
  getDevices,
  createDevice,
  getPaymentConfigurations,
  createPaymentConfiguration,
  getIntegrations,
  createIntegration,
  getTaxConfiguration,
  updateTaxConfiguration,
  getGratuityConfiguration,
  updateGratuityConfiguration,
  getSecuritySettings,
  updateSecuritySettings,
  exportSettings,
  importSettings,
  validateSettings,
  logAuditEntry
} from '../../lib/settings/data';

import {
  restaurantProfileSchema,
  userSchema,
  roleSchema,
  deviceSchema,
  paymentConfigSchema,
  integrationSchema,
  taxConfigurationSchema,
  gratuityConfigurationSchema,
  securitySettingsSchema,
  passwordChangeSchema,
  exportOptionsSchema,
  importOptionsSchema,
  createFormValidator
} from '../../lib/settings/validation';

import type {
  RestaurantProfile,
  User,
  Role,
  Device,
  PaymentConfiguration,
  Integration,
  TaxConfiguration,
  GratuityConfiguration,
  SecuritySettings,
  SettingsBackup
} from '../../lib/settings/types';

// Type for action results
type ActionResult<T = any> = {
  success: boolean;
  data?: T;
  errors?: Record<string, string[]>;
  message?: string;
};

// Restaurant Profile Actions
export async function updateRestaurantProfileAction(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult<RestaurantProfile>> {
  try {
    // Extract form data
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      cuisine: formData.getAll('cuisine'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      website: formData.get('website'),
      branding: {
        primaryColor: formData.get('primaryColor'),
        secondaryColor: formData.get('secondaryColor'),
        accentColor: formData.get('accentColor'),
        logoStyle: formData.get('logoStyle'),
        theme: formData.get('theme'),
        fontFamily: formData.get('fontFamily')
      },
      socialMedia: {
        facebook: formData.get('facebook'),
        instagram: formData.get('instagram'),
        twitter: formData.get('twitter'),
        yelp: formData.get('yelp')
      }
    };

    // Validate data
    const validator = createFormValidator(restaurantProfileSchema.partial());
    const validation = validator(data);

    if (!validation.data) {
      return {
        success: false,
        errors: validation.errors,
        message: 'Please fix the validation errors'
      };
    }

    // Update restaurant profile
    const updatedProfile = await updateRestaurantProfile(validation.data);

    // Log audit entry
    await logAuditEntry({
      userId: 'system', // Would get from session
      userEmail: 'system@restaurant.com',
      action: 'update',
      module: 'restaurant_profile',
      resourceId: updatedProfile.id,
      resourceType: 'restaurant',
      metadata: { updatedFields: Object.keys(validation.data) },
      timestamp: new Date(),
      severity: 'medium'
    });

    revalidatePath('/settings');

    return {
      success: true,
      data: updatedProfile,
      message: 'Restaurant profile updated successfully'
    };
  } catch (error) {
    console.error('Error updating restaurant profile:', error);
    return {
      success: false,
      message: 'Failed to update restaurant profile'
    };
  }
}

// User Management Actions
export async function createUserAction(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult<User>> {
  try {
    const data = {
      email: formData.get('email'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      phone: formData.get('phone'),
      roleId: formData.get('roleId'),
      locationAccess: formData.getAll('locationAccess'),
      status: formData.get('status') || 'active'
    };

    const validator = createFormValidator(userSchema);
    const validation = validator(data);

    if (!validation.data) {
      return {
        success: false,
        errors: validation.errors,
        message: 'Please fix the validation errors'
      };
    }

    // Get role for user
    const roles = await getRoles();
    const role = roles.find(r => r.id === validation.data.roleId);
    if (!role) {
      return {
        success: false,
        message: 'Invalid role selected'
      };
    }

    const newUser = await createUser({
      ...validation.data,
      role,
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
          widgets: ['sales', 'orders'],
          layout: 'grid',
          autoRefresh: true,
          refreshInterval: 60
        }
      }
    });

    revalidatePath('/settings/users');

    return {
      success: true,
      data: newUser,
      message: 'User created successfully'
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      success: false,
      message: 'Failed to create user'
    };
  }
}

export async function updateUserAction(
  userId: string,
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult<User>> {
  try {
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      status: formData.get('status'),
      locationAccess: formData.getAll('locationAccess')
    };

    const validator = createFormValidator(userSchema.partial());
    const validation = validator(data);

    if (!validation.data) {
      return {
        success: false,
        errors: validation.errors,
        message: 'Please fix the validation errors'
      };
    }

    const updatedUser = await updateUser(userId, validation.data);

    if (!updatedUser) {
      return {
        success: false,
        message: 'User not found'
      };
    }

    revalidatePath('/settings/users');

    return {
      success: true,
      data: updatedUser,
      message: 'User updated successfully'
    };
  } catch (error) {
    console.error('Error updating user:', error);
    return {
      success: false,
      message: 'Failed to update user'
    };
  }
}

export async function deleteUserAction(userId: string): Promise<ActionResult> {
  try {
    const success = await deleteUser(userId);

    if (!success) {
      return {
        success: false,
        message: 'User not found'
      };
    }

    revalidatePath('/settings/users');

    return {
      success: true,
      message: 'User deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting user:', error);
    return {
      success: false,
      message: 'Failed to delete user'
    };
  }
}

export async function changePasswordAction(
  userId: string,
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const data = {
      currentPassword: formData.get('currentPassword'),
      newPassword: formData.get('newPassword'),
      confirmPassword: formData.get('confirmPassword')
    };

    const validator = createFormValidator(passwordChangeSchema);
    const validation = validator(data);

    if (!validation.data) {
      return {
        success: false,
        errors: validation.errors,
        message: 'Please fix the validation errors'
      };
    }

    // In a real app, you would verify the current password here
    // For this demo, we'll just simulate success

    await logAuditEntry({
      userId,
      userEmail: 'user@restaurant.com',
      action: 'update',
      module: 'users',
      resourceId: userId,
      resourceType: 'user',
      metadata: { action: 'password_change' },
      timestamp: new Date(),
      severity: 'medium'
    });

    return {
      success: true,
      message: 'Password changed successfully'
    };
  } catch (error) {
    console.error('Error changing password:', error);
    return {
      success: false,
      message: 'Failed to change password'
    };
  }
}

// Role Management Actions
export async function createRoleAction(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult<Role>> {
  try {
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      type: formData.get('type') || 'custom',
      permissions: JSON.parse(formData.get('permissions') as string || '[]')
    };

    const validator = createFormValidator(roleSchema);
    const validation = validator(data);

    if (!validation.data) {
      return {
        success: false,
        errors: validation.errors,
        message: 'Please fix the validation errors'
      };
    }

    const newRole = await createRole({
      ...validation.data,
      isCustom: validation.data.type === 'custom'
    });

    revalidatePath('/settings/roles');

    return {
      success: true,
      data: newRole,
      message: 'Role created successfully'
    };
  } catch (error) {
    console.error('Error creating role:', error);
    return {
      success: false,
      message: 'Failed to create role'
    };
  }
}

// Device Management Actions
export async function createDeviceAction(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult<Device>> {
  try {
    const data = {
      name: formData.get('name'),
      type: formData.get('type'),
      locationId: formData.get('locationId'),
      ipAddress: formData.get('ipAddress'),
      macAddress: formData.get('macAddress'),
      serialNumber: formData.get('serialNumber'),
      model: formData.get('model'),
      manufacturer: formData.get('manufacturer'),
      configuration: {
        autoUpdate: formData.get('autoUpdate') === 'true',
        networkConfig: {
          connectionType: formData.get('connectionType') || 'wifi',
          ssid: formData.get('ssid'),
          staticIp: formData.get('staticIp') === 'true'
        }
      }
    };

    const validator = createFormValidator(deviceSchema);
    const validation = validator(data);

    if (!validation.data) {
      return {
        success: false,
        errors: validation.errors,
        message: 'Please fix the validation errors'
      };
    }

    const newDevice = await createDevice({
      ...validation.data,
      status: 'setup',
      capabilities: {
        touchscreen: true,
        printer: false,
        scanner: false,
        camera: false,
        nfc: false,
        bluetooth: true,
        wifi: true,
        ethernet: false
      }
    });

    revalidatePath('/settings/devices');

    return {
      success: true,
      data: newDevice,
      message: 'Device created successfully'
    };
  } catch (error) {
    console.error('Error creating device:', error);
    return {
      success: false,
      message: 'Failed to create device'
    };
  }
}

// Payment Configuration Actions
export async function createPaymentConfigAction(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult<PaymentConfiguration>> {
  try {
    const data = {
      gateway: formData.get('gateway'),
      isActive: formData.get('isActive') === 'true',
      testMode: formData.get('testMode') === 'true',
      credentials: {
        publicKey: formData.get('publicKey'),
        secretKey: formData.get('secretKey'),
        applicationId: formData.get('applicationId'),
        locationId: formData.get('locationId')
      },
      supportedMethods: JSON.parse(formData.get('supportedMethods') as string || '[]'),
      settings: {
        autoCapture: formData.get('autoCapture') === 'true',
        captureDelay: parseInt(formData.get('captureDelay') as string || '0'),
        fraudDetection: {
          enabled: formData.get('fraudDetectionEnabled') === 'true',
          riskThreshold: formData.get('riskThreshold') || 'medium',
          requireCvv: formData.get('requireCvv') === 'true',
          requireZipCode: formData.get('requireZipCode') === 'true',
          blockSuspiciousCards: formData.get('blockSuspiciousCards') === 'true'
        }
      }
    };

    const validator = createFormValidator(paymentConfigSchema);
    const validation = validator(data);

    if (!validation.data) {
      return {
        success: false,
        errors: validation.errors,
        message: 'Please fix the validation errors'
      };
    }

    const newConfig = await createPaymentConfiguration({
      ...validation.data,
      fees: {
        creditCard: { type: 'percentage', amount: 2.9, percentage: 2.9 },
        debitCard: { type: 'percentage', amount: 1.5, percentage: 1.5 },
        digitalWallet: { type: 'percentage', amount: 2.5, percentage: 2.5 },
        custom: {}
      }
    });

    revalidatePath('/settings/payments');

    return {
      success: true,
      data: newConfig,
      message: 'Payment configuration created successfully'
    };
  } catch (error) {
    console.error('Error creating payment configuration:', error);
    return {
      success: false,
      message: 'Failed to create payment configuration'
    };
  }
}

// Integration Actions
export async function createIntegrationAction(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult<Integration>> {
  try {
    const data = {
      name: formData.get('name'),
      type: formData.get('type'),
      provider: formData.get('provider'),
      isActive: formData.get('isActive') === 'true',
      credentials: {
        apiKey: formData.get('apiKey'),
        apiSecret: formData.get('apiSecret'),
        accessToken: formData.get('accessToken'),
        clientId: formData.get('clientId'),
        clientSecret: formData.get('clientSecret')
      },
      syncSettings: {
        frequency: formData.get('frequency') || 'hourly',
        direction: formData.get('direction') || 'bidirectional',
        batchSize: parseInt(formData.get('batchSize') as string || '100'),
        retryAttempts: parseInt(formData.get('retryAttempts') as string || '3'),
        enableRealtime: formData.get('enableRealtime') === 'true'
      }
    };

    const validator = createFormValidator(integrationSchema);
    const validation = validator(data);

    if (!validation.data) {
      return {
        success: false,
        errors: validation.errors,
        message: 'Please fix the validation errors'
      };
    }

    const newIntegration = await createIntegration({
      ...validation.data,
      status: 'pending',
      configuration: {
        settings: {},
        features: [],
        permissions: [],
        rateLimits: {
          requestsPerSecond: 10,
          requestsPerMinute: 100,
          requestsPerHour: 1000,
          requestsPerDay: 10000,
          burstLimit: 50
        },
        dataRetention: 30
      },
      dataMapping: {
        fieldMappings: [],
        transformations: [],
        filters: []
      },
      webhooks: []
    });

    revalidatePath('/settings/integrations');

    return {
      success: true,
      data: newIntegration,
      message: 'Integration created successfully'
    };
  } catch (error) {
    console.error('Error creating integration:', error);
    return {
      success: false,
      message: 'Failed to create integration'
    };
  }
}

// Tax Configuration Actions
export async function updateTaxConfigAction(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult<TaxConfiguration>> {
  try {
    const data = {
      locationId: formData.get('locationId'),
      rules: JSON.parse(formData.get('rules') as string || '[]'),
      reporting: JSON.parse(formData.get('reporting') as string || '{}')
    };

    const validator = createFormValidator(taxConfigurationSchema);
    const validation = validator(data);

    if (!validation.data) {
      return {
        success: false,
        errors: validation.errors,
        message: 'Please fix the validation errors'
      };
    }

    const updatedConfig = await updateTaxConfiguration({
      ...validation.data,
      exemptions: []
    });

    revalidatePath('/settings/taxes');

    return {
      success: true,
      data: updatedConfig,
      message: 'Tax configuration updated successfully'
    };
  } catch (error) {
    console.error('Error updating tax configuration:', error);
    return {
      success: false,
      message: 'Failed to update tax configuration'
    };
  }
}

// Gratuity Configuration Actions
export async function updateGratuityConfigAction(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult<GratuityConfiguration>> {
  try {
    const data = {
      locationId: formData.get('locationId'),
      autoGratuity: JSON.parse(formData.get('autoGratuity') as string || '[]'),
      tipSuggestions: JSON.parse(formData.get('tipSuggestions') as string || '[]'),
      pooling: JSON.parse(formData.get('pooling') as string || '{}'),
      reporting: JSON.parse(formData.get('reporting') as string || '{}')
    };

    const validator = createFormValidator(gratuityConfigurationSchema);
    const validation = validator(data);

    if (!validation.data) {
      return {
        success: false,
        errors: validation.errors,
        message: 'Please fix the validation errors'
      };
    }

    const updatedConfig = await updateGratuityConfiguration({
      ...validation.data,
      distributionRules: []
    });

    revalidatePath('/settings/gratuity');

    return {
      success: true,
      data: updatedConfig,
      message: 'Gratuity configuration updated successfully'
    };
  } catch (error) {
    console.error('Error updating gratuity configuration:', error);
    return {
      success: false,
      message: 'Failed to update gratuity configuration'
    };
  }
}

// Security Settings Actions
export async function updateSecuritySettingsAction(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult<SecuritySettings>> {
  try {
    const data = {
      passwordPolicy: JSON.parse(formData.get('passwordPolicy') as string || '{}'),
      sessionSettings: JSON.parse(formData.get('sessionSettings') as string || '{}'),
      twoFactorAuth: JSON.parse(formData.get('twoFactorAuth') as string || '{}'),
      ipWhitelist: JSON.parse(formData.get('ipWhitelist') as string || '[]'),
      dataEncryption: JSON.parse(formData.get('dataEncryption') as string || '{}')
    };

    const validator = createFormValidator(securitySettingsSchema);
    const validation = validator(data);

    if (!validation.data) {
      return {
        success: false,
        errors: validation.errors,
        message: 'Please fix the validation errors'
      };
    }

    const updatedSettings = await updateSecuritySettings({
      ...validation.data,
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
      }
    });

    revalidatePath('/settings/security');

    return {
      success: true,
      data: updatedSettings,
      message: 'Security settings updated successfully'
    };
  } catch (error) {
    console.error('Error updating security settings:', error);
    return {
      success: false,
      message: 'Failed to update security settings'
    };
  }
}

// Import/Export Actions
export async function exportSettingsAction(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult<{ downloadUrl: string }>> {
  try {
    const data = {
      sections: formData.getAll('sections'),
      includeCredentials: formData.get('includeCredentials') === 'true',
      encryptSensitiveData: formData.get('encryptSensitiveData') === 'true',
      format: formData.get('format') || 'json',
      compression: formData.get('compression') === 'true'
    };

    const validator = createFormValidator(exportOptionsSchema);
    const validation = validator(data);

    if (!validation.data) {
      return {
        success: false,
        errors: validation.errors,
        message: 'Please fix the validation errors'
      };
    }

    const backup = await exportSettings(validation.data);
    
    // In a real app, you would save the backup to a file and return a download URL
    const downloadUrl = `/api/settings/download/${backup.timestamp.getTime()}`;

    await logAuditEntry({
      userId: 'system',
      userEmail: 'system@restaurant.com',
      action: 'export',
      module: 'settings',
      metadata: { 
        sections: validation.data.sections,
        format: validation.data.format
      },
      timestamp: new Date(),
      severity: 'medium'
    });

    return {
      success: true,
      data: { downloadUrl },
      message: 'Settings exported successfully'
    };
  } catch (error) {
    console.error('Error exporting settings:', error);
    return {
      success: false,
      message: 'Failed to export settings'
    };
  }
}

export async function importSettingsAction(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const file = formData.get('file') as File;
    const options = {
      overwrite: formData.get('overwrite') === 'true',
      selectiveSections: formData.getAll('selectiveSections'),
      preserveIds: formData.get('preserveIds') === 'true',
      validateIntegrity: formData.get('validateIntegrity') === 'true',
      createBackup: formData.get('createBackup') === 'true'
    };

    if (!file) {
      return {
        success: false,
        message: 'Please select a file to import'
      };
    }

    // Parse the backup file
    const content = await file.text();
    const backup: SettingsBackup = JSON.parse(content);

    const success = await importSettings(backup, options);

    if (!success) {
      return {
        success: false,
        message: 'Failed to import settings'
      };
    }

    await logAuditEntry({
      userId: 'system',
      userEmail: 'system@restaurant.com',
      action: 'create',
      module: 'settings',
      metadata: { 
        import: true,
        sections: options.selectiveSections,
        overwrite: options.overwrite
      },
      timestamp: new Date(),
      severity: 'high'
    });

    revalidatePath('/settings');

    return {
      success: true,
      message: 'Settings imported successfully'
    };
  } catch (error) {
    console.error('Error importing settings:', error);
    return {
      success: false,
      message: 'Failed to import settings. Please check the file format.'
    };
  }
}

// Validation Action
export async function validateSettingsAction(): Promise<ActionResult<{
  isValid: boolean;
  errors: string[];
  warnings: string[];
}>> {
  try {
    const validation = await validateSettings();

    return {
      success: true,
      data: validation,
      message: validation.isValid ? 'Settings are valid' : 'Settings validation failed'
    };
  } catch (error) {
    console.error('Error validating settings:', error);
    return {
      success: false,
      message: 'Failed to validate settings'
    };
  }
}