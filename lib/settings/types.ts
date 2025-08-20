// Core settings and configuration types for restaurant dashboard

export interface RestaurantProfile {
  id: string;
  name: string;
  description?: string;
  cuisine: string[];
  email: string;
  phone: string;
  website?: string;
  logo?: string;
  coverImage?: string;
  locations: RestaurantLocation[];
  operatingHours: OperatingHours;
  socialMedia: SocialMediaLinks;
  branding: BrandingSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface RestaurantLocation {
  id: string;
  name: string;
  address: Address;
  phone: string;
  email?: string;
  isDefault: boolean;
  operatingHours?: OperatingHours;
  timezone: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  features: LocationFeatures;
  status: 'active' | 'inactive' | 'maintenance';
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OperatingHours {
  [key: string]: DayHours; // monday, tuesday, etc.
}

export interface DayHours {
  isOpen: boolean;
  shifts: TimeSlot[];
}

export interface TimeSlot {
  start: string; // HH:mm format
  end: string; // HH:mm format
  type?: 'regular' | 'happy_hour' | 'special';
}

export interface LocationFeatures {
  delivery: boolean;
  takeout: boolean;
  dineIn: boolean;
  curbsidePickup: boolean;
  catering: boolean;
  reservations: boolean;
}

export interface SocialMediaLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  yelp?: string;
  googleBusiness?: string;
}

export interface BrandingSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoStyle: 'light' | 'dark' | 'color';
  theme: 'light' | 'dark' | 'auto';
  fontFamily: string;
}

// User and Role Management Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  status: UserStatus;
  role: Role;
  locationAccess: string[]; // Array of location IDs
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  preferences: UserPreferences;
  auditLog: AuditLogEntry[];
}

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface Role {
  id: string;
  name: string;
  description?: string;
  type: RoleType;
  permissions: Permission[];
  locationRestrictions?: string[]; // Specific location IDs if applicable
  isCustom: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type RoleType = 'super_admin' | 'admin' | 'manager' | 'staff' | 'custom';

export interface Permission {
  id: string;
  module: PermissionModule;
  action: PermissionAction;
  scope: PermissionScope;
  conditions?: PermissionCondition[];
}

export type PermissionModule = 
  | 'dashboard' 
  | 'menu' 
  | 'orders' 
  | 'pos' 
  | 'analytics' 
  | 'settings'
  | 'users'
  | 'payments'
  | 'inventory'
  | 'marketing'
  | 'integrations';

export type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'export' | 'admin';

export type PermissionScope = 'global' | 'location' | 'own' | 'team';

export interface PermissionCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'in' | 'not_in' | 'greater_than' | 'less_than';
  value: any;
}

export interface UserPreferences {
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  currency: string;
  language: string;
  notifications: NotificationPreferences;
  dashboard: DashboardPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  alerts: {
    newOrders: boolean;
    lowInventory: boolean;
    systemUpdates: boolean;
    paymentIssues: boolean;
    staffAlerts: boolean;
  };
}

export interface DashboardPreferences {
  defaultView: string;
  widgets: string[];
  layout: 'grid' | 'list';
  autoRefresh: boolean;
  refreshInterval: number; // in seconds
}

// Device Management Types
export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  locationId: string;
  status: DeviceStatus;
  ipAddress?: string;
  macAddress?: string;
  serialNumber?: string;
  model?: string;
  manufacturer?: string;
  version?: string;
  lastSeen?: Date;
  configuration: DeviceConfiguration;
  capabilities: DeviceCapabilities;
  createdAt: Date;
  updatedAt: Date;
}

export type DeviceType = 'pos_terminal' | 'kds_screen' | 'printer' | 'tablet' | 'scanner' | 'scale' | 'cash_drawer';

export type DeviceStatus = 'online' | 'offline' | 'maintenance' | 'error' | 'setup';

export interface DeviceConfiguration {
  settings: Record<string, any>;
  permissions: string[];
  integrations: string[];
  autoUpdate: boolean;
  networkConfig: NetworkConfiguration;
}

export interface NetworkConfiguration {
  connectionType: 'wifi' | 'ethernet' | 'cellular';
  ssid?: string;
  staticIp?: boolean;
  ipConfig?: {
    ip: string;
    subnet: string;
    gateway: string;
    dns: string[];
  };
}

export interface DeviceCapabilities {
  touchscreen: boolean;
  printer: boolean;
  scanner: boolean;
  camera: boolean;
  nfc: boolean;
  bluetooth: boolean;
  wifi: boolean;
  ethernet: boolean;
}

// Payment Configuration Types
export interface PaymentConfiguration {
  id: string;
  gateway: PaymentGateway;
  isActive: boolean;
  testMode: boolean;
  credentials: PaymentCredentials;
  supportedMethods: PaymentMethod[];
  fees: PaymentFees;
  settings: PaymentSettings;
  webhookUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PaymentGateway = 'stripe' | 'square' | 'paypal' | 'toast' | 'clover' | 'custom';

export interface PaymentCredentials {
  // These should be encrypted in storage
  publicKey?: string;
  secretKey?: string;
  applicationId?: string;
  locationId?: string;
  webhookSecret?: string;
  merchantId?: string;
}

export interface PaymentMethod {
  type: PaymentMethodType;
  enabled: boolean;
  minimumAmount?: number;
  maximumAmount?: number;
  processingFee?: number;
  configuration?: Record<string, any>;
}

export type PaymentMethodType = 
  | 'credit_card' 
  | 'debit_card' 
  | 'cash' 
  | 'gift_card' 
  | 'apple_pay' 
  | 'google_pay' 
  | 'paypal' 
  | 'venmo' 
  | 'zelle'
  | 'buy_now_pay_later';

export interface PaymentFees {
  creditCard: FeeStructure;
  debitCard: FeeStructure;
  digitalWallet: FeeStructure;
  custom: Record<PaymentMethodType, FeeStructure>;
}

export interface FeeStructure {
  type: 'flat' | 'percentage' | 'tiered';
  amount: number;
  percentage?: number;
  tiers?: FeeTier[];
  minimumFee?: number;
  maximumFee?: number;
}

export interface FeeTier {
  minAmount: number;
  maxAmount?: number;
  flatFee: number;
  percentage: number;
}

export interface PaymentSettings {
  autoCapture: boolean;
  captureDelay: number; // hours
  refundPolicy: RefundPolicy;
  chargebackProtection: boolean;
  fraudDetection: FraudDetectionSettings;
  receipts: ReceiptSettings;
}

export interface RefundPolicy {
  allowFullRefunds: boolean;
  allowPartialRefunds: boolean;
  requireApproval: boolean;
  approverRoles: string[];
  timeLimit: number; // days
}

export interface FraudDetectionSettings {
  enabled: boolean;
  riskThreshold: 'low' | 'medium' | 'high';
  requireCvv: boolean;
  requireZipCode: boolean;
  blockSuspiciousCards: boolean;
  dailyLimits: {
    perCard: number;
    perCustomer: number;
    total: number;
  };
}

export interface ReceiptSettings {
  emailReceipts: boolean;
  smsReceipts: boolean;
  printReceipts: boolean;
  template: string;
  includeItemDetails: boolean;
  includeTaxBreakdown: boolean;
  includeQrCode: boolean;
}

// Integration Types
export interface Integration {
  id: string;
  name: string;
  type: IntegrationType;
  provider: string;
  status: IntegrationStatus;
  isActive: boolean;
  configuration: IntegrationConfiguration;
  credentials: IntegrationCredentials;
  dataMapping: DataMapping;
  syncSettings: SyncSettings;
  webhooks: WebhookConfiguration[];
  lastSync?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type IntegrationType = 
  | 'accounting' 
  | 'inventory' 
  | 'delivery' 
  | 'marketing' 
  | 'loyalty' 
  | 'pos' 
  | 'analytics' 
  | 'crm'
  | 'payroll'
  | 'reservation'
  | 'review_management';

export type IntegrationStatus = 'connected' | 'disconnected' | 'error' | 'pending' | 'syncing';

export interface IntegrationConfiguration {
  settings: Record<string, any>;
  features: string[];
  permissions: string[];
  rateLimits: RateLimits;
  dataRetention: number; // days
}

export interface IntegrationCredentials {
  // These should be encrypted
  apiKey?: string;
  apiSecret?: string;
  accessToken?: string;
  refreshToken?: string;
  clientId?: string;
  clientSecret?: string;
  customFields?: Record<string, string>;
}

export interface DataMapping {
  fieldMappings: FieldMapping[];
  transformations: DataTransformation[];
  filters: DataFilter[];
}

export interface FieldMapping {
  sourceField: string;
  targetField: string;
  transformation?: string;
  required: boolean;
  defaultValue?: any;
}

export interface DataTransformation {
  field: string;
  type: 'format' | 'calculate' | 'lookup' | 'custom';
  parameters: Record<string, any>;
}

export interface DataFilter {
  field: string;
  operator: string;
  value: any;
  condition: 'and' | 'or';
}

export interface SyncSettings {
  frequency: SyncFrequency;
  direction: SyncDirection;
  conflictResolution: ConflictResolution;
  batchSize: number;
  retryAttempts: number;
  enableRealtime: boolean;
}

export type SyncFrequency = 'realtime' | 'every_minute' | 'every_5_minutes' | 'every_15_minutes' | 'hourly' | 'daily' | 'weekly' | 'manual';

export type SyncDirection = 'bidirectional' | 'push_only' | 'pull_only';

export type ConflictResolution = 'source_wins' | 'target_wins' | 'manual' | 'merge';

export interface WebhookConfiguration {
  id: string;
  url: string;
  events: string[];
  secret?: string;
  headers?: Record<string, string>;
  retryPolicy: RetryPolicy;
  isActive: boolean;
}

export interface RetryPolicy {
  maxAttempts: number;
  backoffStrategy: 'linear' | 'exponential';
  initialDelay: number; // milliseconds
  maxDelay: number; // milliseconds
}

export interface RateLimits {
  requestsPerSecond: number;
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  burstLimit: number;
}

// Tax and Gratuity Types
export interface TaxConfiguration {
  id: string;
  locationId: string;
  rules: TaxRule[];
  exemptions: TaxExemption[];
  reporting: TaxReporting;
  updatedAt: Date;
}

export interface TaxRule {
  id: string;
  name: string;
  type: TaxType;
  rate: number; // percentage
  applicableItems: TaxApplicability;
  conditions: TaxCondition[];
  compound: boolean;
  includedInPrice: boolean;
  displayOnReceipt: boolean;
  priority: number;
  effectiveFrom: Date;
  effectiveTo?: Date;
  isActive: boolean;
}

export type TaxType = 'sales_tax' | 'vat' | 'service_charge' | 'environmental_fee' | 'delivery_fee' | 'custom';

export interface TaxApplicability {
  categories: string[]; // menu categories
  items: string[]; // specific items
  modifiers: string[]; // modifiers
  excludeCategories: string[];
  excludeItems: string[];
}

export interface TaxCondition {
  field: 'order_total' | 'item_count' | 'customer_type' | 'payment_method' | 'time' | 'day_of_week';
  operator: 'equals' | 'greater_than' | 'less_than' | 'in' | 'between';
  value: any;
}

export interface TaxExemption {
  id: string;
  type: 'customer_based' | 'item_based' | 'location_based';
  criteria: ExemptionCriteria;
  certificate?: string;
  validFrom: Date;
  validTo?: Date;
  isActive: boolean;
}

export interface ExemptionCriteria {
  customerGroups?: string[];
  itemCategories?: string[];
  locations?: string[];
  conditions?: TaxCondition[];
}

export interface TaxReporting {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
  recipients: string[];
  format: 'pdf' | 'csv' | 'json';
  includeExemptions: boolean;
  breakdownByLocation: boolean;
  automaticFiling: boolean;
}

export interface GratuityConfiguration {
  id: string;
  locationId: string;
  autoGratuity: AutoGratuityRule[];
  tipSuggestions: TipSuggestion[];
  distributionRules: TipDistributionRule[];
  pooling: TipPooling;
  reporting: GratuityReporting;
  updatedAt: Date;
}

export interface AutoGratuityRule {
  id: string;
  name: string;
  rate: number; // percentage
  trigger: GratuityTrigger;
  conditions: GratuityCondition[];
  override: boolean; // can be manually removed
  isActive: boolean;
}

export interface GratuityTrigger {
  type: 'party_size' | 'order_total' | 'time_based' | 'service_type';
  threshold: number;
  comparisonOperator: 'greater_than' | 'greater_equal' | 'equals';
}

export interface GratuityCondition {
  field: 'party_size' | 'order_total' | 'service_type' | 'day_of_week' | 'time_of_day';
  operator: string;
  value: any;
}

export interface TipSuggestion {
  percentage: number;
  label?: string;
  isDefault: boolean;
  displayOrder: number;
}

export interface TipDistributionRule {
  id: string;
  name: string;
  roles: string[]; // staff roles eligible
  distribution: DistributionMethod;
  qualificationCriteria: QualificationCriteria;
  isActive: boolean;
}

export interface DistributionMethod {
  type: 'equal_split' | 'percentage_based' | 'hours_worked' | 'sales_based' | 'custom';
  parameters: Record<string, any>;
}

export interface QualificationCriteria {
  minimumHours?: number;
  minimumShifts?: number;
  serviceTypes?: string[];
  performanceMetrics?: PerformanceMetric[];
}

export interface PerformanceMetric {
  metric: string;
  threshold: number;
  weight: number;
}

export interface TipPooling {
  enabled: boolean;
  poolTypes: TipPool[];
  distributionSchedule: DistributionSchedule;
  transparencyLevel: 'full' | 'summary' | 'none';
}

export interface TipPool {
  id: string;
  name: string;
  eligibleRoles: string[];
  contributionRules: ContributionRule[];
  distributionRules: TipDistributionRule[];
}

export interface ContributionRule {
  sourceType: 'credit_tips' | 'cash_tips' | 'service_charges';
  percentage: number;
  exceptions: string[];
}

export interface DistributionSchedule {
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  dayOfWeek?: number; // for weekly
  dayOfMonth?: number; // for monthly
  automatic: boolean;
}

export interface GratuityReporting {
  trackByEmployee: boolean;
  trackByShift: boolean;
  trackByServiceType: boolean;
  includeInPayroll: boolean;
  taxWithholding: boolean;
  auditTrail: boolean;
}

// Audit and Security Types
export interface AuditLogEntry {
  id: string;
  userId: string;
  userEmail: string;
  action: AuditAction;
  module: string;
  resourceId?: string;
  resourceType?: string;
  changes?: AuditChange[];
  metadata: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export type AuditAction = 'create' | 'update' | 'delete' | 'view' | 'export' | 'login' | 'logout' | 'permission_change' | 'config_change';

export interface AuditChange {
  field: string;
  oldValue: any;
  newValue: any;
  valueType: 'string' | 'number' | 'boolean' | 'object' | 'array';
}

export interface SecuritySettings {
  passwordPolicy: PasswordPolicy;
  sessionSettings: SessionSettings;
  twoFactorAuth: TwoFactorAuthSettings;
  ipWhitelist: string[];
  apiSecurity: ApiSecuritySettings;
  dataEncryption: DataEncryptionSettings;
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  preventReuse: number; // number of previous passwords to check
  maxAge: number; // days before password expires
  complexity: 'low' | 'medium' | 'high';
}

export interface SessionSettings {
  maxDuration: number; // minutes
  inactivityTimeout: number; // minutes
  concurrentSessions: number;
  requireReauth: boolean;
  extendOnActivity: boolean;
}

export interface TwoFactorAuthSettings {
  required: boolean;
  methods: ('sms' | 'email' | 'totp' | 'hardware_key')[];
  backupCodes: number;
  gracePeriod: number; // days
}

export interface ApiSecuritySettings {
  rateLimiting: RateLimits;
  requireApiKey: boolean;
  allowedOrigins: string[];
  requestSigning: boolean;
  auditAllRequests: boolean;
}

export interface DataEncryptionSettings {
  encryptAtRest: boolean;
  encryptInTransit: boolean;
  keyRotationInterval: number; // days
  algorithm: string;
  backupEncryption: boolean;
}

// Settings Export/Import Types
export interface SettingsBackup {
  version: string;
  timestamp: Date;
  restaurantId: string;
  sections: SettingsSection[];
  checksum: string;
}

export interface SettingsSection {
  name: string;
  version: string;
  data: any;
  dependencies?: string[];
  encrypted: boolean;
}

export interface ImportOptions {
  overwrite: boolean;
  selectiveSections: string[];
  preserveIds: boolean;
  validateIntegrity: boolean;
  createBackup: boolean;
}

export interface ExportOptions {
  sections: string[];
  includeCredentials: boolean;
  encryptSensitiveData: boolean;
  format: 'json' | 'yaml' | 'csv';
  compression: boolean;
}

// UI State Types
export interface SettingsUIState {
  activeTab: string;
  isDirty: boolean;
  isLoading: boolean;
  lastSaved?: Date;
  errors: Record<string, string[]>;
  warnings: string[];
  unsavedSections: string[];
}

export interface TabConfiguration {
  id: string;
  label: string;
  icon?: string;
  component: string;
  permissions: string[];
  order: number;
  isEnabled: boolean;
  badge?: string | number;
}