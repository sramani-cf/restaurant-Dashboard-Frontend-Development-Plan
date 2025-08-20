// POS system interfaces and contracts

// Enums for type safety
export enum POSProvider {
  TOAST = 'toast',
  SQUARE = 'square',
  MOCK = 'mock'
}

export enum PaymentMethod {
  CASH = 'cash',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  MOBILE_PAYMENT = 'mobile_payment',
  GIFT_CARD = 'gift_card'
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export enum TransactionStatus {
  COMPLETED = 'completed',
  FAILED = 'failed',
  PENDING = 'pending',
  REFUNDED = 'refunded'
}

export enum EmployeeRole {
  MANAGER = 'manager',
  CASHIER = 'cashier',
  COOK = 'cook',
  WAITER = 'waiter',
  ADMIN = 'admin'
}

// Core data interfaces
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  isAvailable: boolean;
  allergens?: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  modifiers?: MenuModifier[];
  image?: string;
  preparationTime?: number; // in minutes
}

export interface MenuModifier {
  id: string;
  name: string;
  price: number;
  category: string;
  isRequired: boolean;
  options: ModifierOption[];
}

export interface ModifierOption {
  id: string;
  name: string;
  priceAdjustment: number;
  isAvailable: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  unit: string;
  cost: number;
  supplier?: string;
  lastUpdated: Date;
  alertThreshold?: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: EmployeeRole;
  hourlyRate?: number;
  isActive: boolean;
  hireDate: Date;
  lastLogin?: Date;
}

export interface EmployeeShift {
  id: string;
  employeeId: string;
  employee?: Employee;
  startTime: Date;
  endTime?: Date;
  breakDuration?: number; // in minutes
  hoursWorked?: number;
  totalPay?: number;
  status: 'active' | 'completed' | 'cancelled';
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerName?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  tip?: number;
  total: number;
  status: OrderStatus;
  orderType: 'dine_in' | 'takeout' | 'delivery';
  tableNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  fulfillmentTime?: Date;
  estimatedCompletionTime?: Date;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  menuItem?: MenuItem;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  modifiers?: OrderModifier[];
  specialInstructions?: string;
}

export interface OrderModifier {
  modifierId: string;
  optionId: string;
  name: string;
  price: number;
}

export interface Transaction {
  id: string;
  orderId?: string;
  amount: number;
  method: PaymentMethod;
  timestamp: Date;
  status: TransactionStatus;
  reference?: string;
  tip?: number;
  refundAmount?: number;
  refundReason?: string;
  metadata?: Record<string, any>;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
  receipt?: string;
  authCode?: string;
}

export interface SalesData {
  period: 'day' | 'week' | 'month' | 'year';
  startDate: Date;
  endDate: Date;
  totalRevenue: number;
  totalTransactions: number;
  averageOrderValue: number;
  topSellingItems: Array<{
    menuItemId: string;
    name: string;
    quantitySold: number;
    revenue: number;
  }>;
  paymentMethodBreakdown: Array<{
    method: PaymentMethod;
    count: number;
    total: number;
  }>;
  hourlyBreakdown?: Array<{
    hour: number;
    revenue: number;
    transactionCount: number;
  }>;
}

// Error handling interfaces
export interface POSError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
}

export interface POSResponse<T> {
  success: boolean;
  data?: T;
  error?: POSError;
  metadata?: Record<string, any>;
}

// Configuration interfaces
export interface POSConfig {
  provider: POSProvider;
  apiKey?: string;
  apiSecret?: string;
  environment: 'sandbox' | 'production';
  baseUrl?: string;
  timeout?: number;
  retryAttempts?: number;
  webhookUrl?: string;
}

export interface ConnectionStatus {
  isConnected: boolean;
  lastConnectionAttempt?: Date;
  lastSuccessfulConnection?: Date;
  connectionError?: string;
  rateLimitInfo?: {
    limit: number;
    remaining: number;
    resetTime: Date;
  };
}

// Main POS Adapter interface
export interface IPOSAdapter {
  // Connection management
  connect(): Promise<POSResponse<boolean>>;
  disconnect(): Promise<POSResponse<void>>;
  getConnectionStatus(): ConnectionStatus;
  testConnection(): Promise<POSResponse<boolean>>;

  // Sales data retrieval
  getSalesData(
    startDate: Date,
    endDate: Date,
    period?: 'day' | 'week' | 'month'
  ): Promise<POSResponse<SalesData>>;
  
  getTransactions(
    startDate?: Date,
    endDate?: Date,
    limit?: number,
    offset?: number
  ): Promise<POSResponse<Transaction[]>>;

  // Menu item management
  getMenuItems(): Promise<POSResponse<MenuItem[]>>;
  getMenuItem(id: string): Promise<POSResponse<MenuItem>>;
  createMenuItem(item: Omit<MenuItem, 'id'>): Promise<POSResponse<MenuItem>>;
  updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<POSResponse<MenuItem>>;
  deleteMenuItem(id: string): Promise<POSResponse<void>>;
  updateMenuItemAvailability(id: string, isAvailable: boolean): Promise<POSResponse<MenuItem>>;

  // Inventory management
  getInventoryItems(): Promise<POSResponse<InventoryItem[]>>;
  getInventoryItem(id: string): Promise<POSResponse<InventoryItem>>;
  updateInventoryLevel(id: string, quantity: number): Promise<POSResponse<InventoryItem>>;
  getInventoryAlerts(): Promise<POSResponse<InventoryItem[]>>;

  // Employee and shift management
  getEmployees(): Promise<POSResponse<Employee[]>>;
  getEmployee(id: string): Promise<POSResponse<Employee>>;
  getEmployeeShifts(
    employeeId?: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<POSResponse<EmployeeShift[]>>;
  startShift(employeeId: string): Promise<POSResponse<EmployeeShift>>;
  endShift(shiftId: string): Promise<POSResponse<EmployeeShift>>;

  // Order management
  getOrders(
    status?: OrderStatus,
    startDate?: Date,
    endDate?: Date,
    limit?: number
  ): Promise<POSResponse<Order[]>>;
  getOrder(id: string): Promise<POSResponse<Order>>;
  createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<POSResponse<Order>>;
  updateOrderStatus(id: string, status: OrderStatus): Promise<POSResponse<Order>>;
  cancelOrder(id: string, reason?: string): Promise<POSResponse<Order>>;

  // Transaction processing
  processPayment(
    orderId: string,
    amount: number,
    method: PaymentMethod,
    customerInfo?: Record<string, any>
  ): Promise<POSResponse<PaymentResult>>;
  
  refundTransaction(
    transactionId: string,
    amount?: number,
    reason?: string
  ): Promise<POSResponse<Transaction>>;

  // Real-time synchronization
  syncData(): Promise<POSResponse<{
    menuItems: number;
    inventory: number;
    orders: number;
    transactions: number;
  }>>;

  // Webhook management (if supported)
  registerWebhook?(url: string, events: string[]): Promise<POSResponse<{ webhookId: string }>>;
  unregisterWebhook?(webhookId: string): Promise<POSResponse<void>>;
}

// Factory interface
export interface IPOSAdapterFactory {
  createAdapter(config: POSConfig): IPOSAdapter;
  getSupportedProviders(): POSProvider[];
  validateConfig(config: POSConfig): POSResponse<boolean>;
}