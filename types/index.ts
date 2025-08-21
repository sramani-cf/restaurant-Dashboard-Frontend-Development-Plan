// types/index.ts
// Centralized TypeScript type definitions

// Base types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// User types
export interface User extends BaseEntity {
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  permissions: Permission[];
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF',
  CASHIER = 'CASHIER',
  CHEF = 'CHEF',
  WAITER = 'WAITER',
  HOST = 'HOST'
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
}

// Restaurant types
export interface Restaurant extends BaseEntity {
  name: string;
  address: string;
  phone: string;
  email: string;
  timezone: string;
  currency: string;
  logo?: string;
  settings: RestaurantSettings;
}

export interface RestaurantSettings {
  operatingHours: OperatingHours[];
  taxRate: number;
  gratuityRate: number;
  autoGratuityPartySize: number;
  enableOnlineOrdering: boolean;
  enableReservations: boolean;
  enableWaitlist: boolean;
}

export interface OperatingHours {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

// Order types
export interface Order extends BaseEntity {
  orderNumber: string;
  status: OrderStatus;
  type: OrderType;
  customerId?: string;
  tableNumber?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  gratuity: number;
  discount: number;
  total: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  notes?: string;
  completedAt?: Date;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum OrderType {
  DINE_IN = 'DINE_IN',
  TAKEOUT = 'TAKEOUT',
  DELIVERY = 'DELIVERY',
  PICKUP = 'PICKUP'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PARTIAL = 'PARTIAL',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED'
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  MOBILE = 'MOBILE',
  GIFT_CARD = 'GIFT_CARD',
  COMP = 'COMP'
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  price: number;
  modifiers: OrderItemModifier[];
  specialInstructions?: string;
  status: OrderItemStatus;
}

export interface OrderItemModifier {
  id: string;
  name: string;
  price: number;
}

export enum OrderItemStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  PREPARING = 'PREPARING',
  READY = 'READY',
  SERVED = 'SERVED'
}

// Menu types
export interface MenuItem extends BaseEntity {
  name: string;
  description: string;
  category: string;
  price: number;
  image?: string;
  available: boolean;
  modifierGroups: ModifierGroup[];
  nutritionInfo?: NutritionInfo;
  allergens: string[];
  tags: string[];
  preparationTime: number;
}

export interface ModifierGroup {
  id: string;
  name: string;
  required: boolean;
  minSelections: number;
  maxSelections: number;
  modifiers: Modifier[];
}

export interface Modifier {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sodium: number;
  sugar: number;
  fiber: number;
}

// Inventory types
export interface InventoryItem extends BaseEntity {
  name: string;
  sku: string;
  barcode?: string;
  category: string;
  quantity: number;
  unit: string;
  reorderPoint: number;
  reorderQuantity: number;
  cost: number;
  supplier?: Supplier;
  expirationDate?: Date;
  location?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
}

// Reservation types
export interface Reservation extends BaseEntity {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: Date;
  time: string;
  partySize: number;
  tableId?: string;
  status: ReservationStatus;
  notes?: string;
  specialRequests?: string;
  confirmationCode: string;
}

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SEATED = 'SEATED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW'
}

export interface Table {
  id: string;
  number: string;
  capacity: number;
  status: TableStatus;
  section: string;
  shape: TableShape;
  position: { x: number; y: number };
}

export enum TableStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED',
  CLEANING = 'CLEANING',
  BLOCKED = 'BLOCKED'
}

export enum TableShape {
  SQUARE = 'SQUARE',
  RECTANGLE = 'RECTANGLE',
  CIRCLE = 'CIRCLE',
  OVAL = 'OVAL'
}

// Analytics types
export interface AnalyticsData {
  period: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
  customers: number;
  topSellingItems: TopSellingItem[];
  hourlyDistribution: HourlyDistribution[];
  paymentMethodBreakdown: PaymentBreakdown[];
}

export interface TopSellingItem {
  itemId: string;
  itemName: string;
  quantity: number;
  revenue: number;
}

export interface HourlyDistribution {
  hour: number;
  orders: number;
  revenue: number;
}

export interface PaymentBreakdown {
  method: PaymentMethod;
  count: number;
  total: number;
  percentage: number;
}

// KDS (Kitchen Display System) types
export interface KitchenTicket {
  id: string;
  orderId: string;
  orderNumber: string;
  orderType: OrderType;
  items: KitchenItem[];
  priority: TicketPriority;
  station: KitchenStation;
  status: TicketStatus;
  startTime: Date;
  targetTime: Date;
  completedTime?: Date;
}

export interface KitchenItem {
  id: string;
  name: string;
  quantity: number;
  modifiers: string[];
  specialInstructions?: string;
  status: KitchenItemStatus;
}

export enum TicketPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  RUSH = 'RUSH'
}

export enum KitchenStation {
  GRILL = 'GRILL',
  SAUTE = 'SAUTE',
  FRY = 'FRY',
  SALAD = 'SALAD',
  DESSERT = 'DESSERT',
  EXPO = 'EXPO'
}

export enum TicketStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY',
  COMPLETE = 'COMPLETE',
  RECALLED = 'RECALLED'
}

export enum KitchenItemStatus {
  PENDING = 'PENDING',
  STARTED = 'STARTED',
  DONE = 'DONE'
}

// POS types
export interface POSTransaction {
  id: string;
  orderId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  cardLastFour?: string;
  authorizationCode?: string;
  status: TransactionStatus;
  timestamp: Date;
  employeeId: string;
  terminalId: string;
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  AUTHORIZED = 'AUTHORIZED',
  CAPTURED = 'CAPTURED',
  VOIDED = 'VOIDED',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED'
}

// Common utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncFunction<T = any> = () => Promise<T>;
export type VoidFunction = () => void;

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  hasMore?: boolean;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  value: any;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  validation?: ValidationRule[];
}

export enum FormFieldType {
  TEXT = 'TEXT',
  EMAIL = 'EMAIL',
  PASSWORD = 'PASSWORD',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  TIME = 'TIME',
  DATETIME = 'DATETIME',
  SELECT = 'SELECT',
  MULTISELECT = 'MULTISELECT',
  CHECKBOX = 'CHECKBOX',
  RADIO = 'RADIO',
  TEXTAREA = 'TEXTAREA',
  FILE = 'FILE'
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface ValidationRule {
  type: ValidationType;
  value?: any;
  message: string;
}

export enum ValidationType {
  REQUIRED = 'REQUIRED',
  MIN_LENGTH = 'MIN_LENGTH',
  MAX_LENGTH = 'MAX_LENGTH',
  MIN = 'MIN',
  MAX = 'MAX',
  PATTERN = 'PATTERN',
  EMAIL = 'EMAIL',
  URL = 'URL',
  CUSTOM = 'CUSTOM'
}