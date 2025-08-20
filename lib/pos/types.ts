export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  image?: string;
  available: boolean;
  modifiers?: MenuModifier[];
  tags?: string[];
  calories?: number;
  preparationTime?: number;
}

export interface MenuModifier {
  id: string;
  name: string;
  price: number;
  type: 'required' | 'optional';
  options?: ModifierOption[];
  minSelections?: number;
  maxSelections?: number;
}

export interface ModifierOption {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  modifiers: SelectedModifier[];
  specialInstructions?: string;
  subtotal: number;
  tax: number;
  total: number;
}

export interface SelectedModifier {
  modifierId: string;
  modifierName: string;
  selectedOptions: ModifierOption[];
  totalPrice: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: Discount | null;
  tip: Tip | null;
  total: number;
  customerId?: string;
  tableNumber?: string;
  orderType: OrderType;
  createdAt: Date;
  updatedAt: Date;
}

export interface Discount {
  id: string;
  type: 'percentage' | 'fixed';
  value: number;
  code?: string;
  description?: string;
  appliedAmount: number;
}

export interface Tip {
  type: 'percentage' | 'fixed';
  value: number;
  amount: number;
}

export enum OrderType {
  DINE_IN = 'dine_in',
  TAKEOUT = 'takeout',
  DELIVERY = 'delivery',
  PICKUP = 'pickup'
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  loyaltyPoints?: number;
  totalOrders?: number;
  totalSpent?: number;
  notes?: string;
  tags?: string[];
  createdAt: Date;
}

export interface PaymentMethod {
  id: string;
  type: 'cash' | 'card' | 'mobile' | 'gift_card' | 'loyalty';
  name: string;
  icon?: string;
  processingFee?: number;
}

export interface Transaction {
  id: string;
  cartId: string;
  orderId?: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  referenceNumber?: string;
  cardLast4?: string;
  cashTendered?: number;
  changeGiven?: number;
  processedAt: Date;
}

export enum TransactionStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded',
  VOIDED = 'voided'
}

export interface Receipt {
  id: string;
  orderId: string;
  transactionId: string;
  cart: Cart;
  customer?: Customer;
  transaction: Transaction;
  restaurantInfo: RestaurantInfo;
  printedAt?: Date;
  emailedTo?: string;
  smsTo?: string;
}

export interface RestaurantInfo {
  name: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  taxId?: string;
  logo?: string;
  footerMessage?: string;
}

export interface POSSession {
  id: string;
  terminalId: string;
  employeeId: string;
  employeeName: string;
  startTime: Date;
  endTime?: Date;
  status: 'active' | 'paused' | 'closed';
  openingBalance: number;
  currentBalance: number;
  expectedBalance: number;
  salesCount: number;
  refundsCount: number;
  voidCount: number;
}

export interface QuickKey {
  id: string;
  label: string;
  menuItemId?: string;
  action?: 'open_category' | 'apply_discount' | 'open_function';
  color?: string;
  icon?: string;
  position: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  image?: string;
  displayOrder: number;
  items: MenuItem[];
  isActive: boolean;
}

export interface POSConfig {
  terminalId: string;
  terminalName: string;
  defaultOrderType: OrderType;
  requireCustomerInfo: boolean;
  printReceipt: boolean;
  emailReceipt: boolean;
  tipSuggestions: number[];
  taxRate: number;
  quickKeys: QuickKey[];
  paymentMethods: PaymentMethod[];
  printerSettings?: PrinterSettings;
  offlineMode: boolean;
  syncInterval: number;
}

export interface PrinterSettings {
  printerName: string;
  printerType: 'thermal' | 'impact' | 'laser';
  paperWidth: number;
  autoCut: boolean;
  copies: number;
}