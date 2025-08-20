// Order Management Types

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  COMPLETED = 'completed',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum OrderType {
  DINE_IN = 'dine_in',
  TAKEOUT = 'takeout',
  DELIVERY = 'delivery',
  PICKUP = 'pickup',
  CATERING = 'catering'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded'
}

export enum PaymentMethod {
  CASH = 'cash',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  DIGITAL_WALLET = 'digital_wallet',
  GIFT_CARD = 'gift_card',
  LOYALTY_POINTS = 'loyalty_points',
  CHECK = 'check',
  OTHER = 'other'
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  modifiers: OrderModifier[];
  specialInstructions?: string;
  status: 'pending' | 'preparing' | 'ready' | 'served';
  prepTime?: number;
  station?: string;
}

export interface OrderModifier {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  type: OrderType;
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  tableNumber?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  tip: number;
  discount: number;
  total: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  paymentDetails?: PaymentDetails;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  prepStartedAt?: string;
  readyAt?: string;
  completedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  refundedAt?: string;
  estimatedReadyTime?: string;
  assignedStaff?: StaffMember[];
  deliveryInfo?: DeliveryInfo;
  timeline: OrderTimelineEvent[];
  posOrderId?: string;
  posPaymentId?: string;
  source: 'pos' | 'online' | 'phone' | 'kiosk' | 'third_party';
  thirdPartyProvider?: string;
}

export interface PaymentDetails {
  transactionId: string;
  lastFourDigits?: string;
  cardBrand?: string;
  authorizationCode?: string;
  processorResponse?: string;
  amount: number;
  tip?: number;
  fee?: number;
  refundAmount?: number;
  refundReason?: string;
}

export interface DeliveryInfo {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  instructions?: string;
  driverId?: string;
  driverName?: string;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  deliveryFee: number;
  distance?: number;
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'server' | 'chef' | 'bartender' | 'host' | 'manager' | 'driver';
  assignedAt: string;
}

export interface OrderTimelineEvent {
  id: string;
  timestamp: string;
  event: string;
  description: string;
  user?: string;
  metadata?: Record<string, any>;
}

export interface OrderFilters {
  status?: OrderStatus[];
  type?: OrderType[];
  paymentStatus?: PaymentStatus[];
  dateRange?: {
    start: string;
    end: string;
  };
  customerId?: string;
  tableNumber?: string;
  searchTerm?: string;
  minAmount?: number;
  maxAmount?: number;
  source?: string[];
  assignedStaff?: string[];
}

export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<OrderStatus, number>;
  ordersByType: Record<OrderType, number>;
  todayOrders: number;
  todayRevenue: number;
  pendingOrders: number;
  preparingOrders: number;
  readyOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  refundedAmount: number;
  averagePrepTime: number;
  peakHours: {
    hour: number;
    orders: number;
  }[];
}

export interface RefundRequest {
  orderId: string;
  amount: number;
  reason: string;
  items?: string[]; // Item IDs to refund
  refundMethod: 'original' | 'cash' | 'store_credit';
  notes?: string;
}

export interface OrderUpdate {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  items?: Partial<OrderItem>[];
  notes?: string;
  estimatedReadyTime?: string;
  assignedStaff?: StaffMember[];
  deliveryInfo?: Partial<DeliveryInfo>;
}

export interface CreateOrder {
  type: OrderType;
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  tableNumber?: string;
  items: {
    menuItemId: string;
    quantity: number;
    modifiers?: {
      id: string;
      quantity: number;
    }[];
    specialInstructions?: string;
  }[];
  paymentMethod?: PaymentMethod;
  notes?: string;
  scheduledFor?: string;
  deliveryInfo?: Omit<DeliveryInfo, 'driverId' | 'driverName' | 'actualDeliveryTime'>;
}

export interface OrderListItem {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  type: OrderType;
  customerName?: string;
  tableNumber?: string;
  total: number;
  itemCount: number;
  createdAt: string;
  estimatedReadyTime?: string;
  paymentStatus: PaymentStatus;
  source: string;
}

export interface OrderSummary {
  date: string;
  orderCount: number;
  revenue: number;
  averageOrderValue: number;
  topItems: {
    itemId: string;
    itemName: string;
    quantity: number;
    revenue: number;
  }[];
  hourlyDistribution: {
    hour: number;
    orders: number;
    revenue: number;
  }[];
}

// Action types for order management
export type OrderAction = 
  | { type: 'UPDATE_STATUS'; orderId: string; status: OrderStatus }
  | { type: 'UPDATE_PAYMENT'; orderId: string; paymentStatus: PaymentStatus; paymentDetails?: PaymentDetails }
  | { type: 'ADD_ITEM'; orderId: string; item: Omit<OrderItem, 'id'> }
  | { type: 'REMOVE_ITEM'; orderId: string; itemId: string }
  | { type: 'UPDATE_ITEM'; orderId: string; itemId: string; updates: Partial<OrderItem> }
  | { type: 'ASSIGN_STAFF'; orderId: string; staff: StaffMember }
  | { type: 'REMOVE_STAFF'; orderId: string; staffId: string }
  | { type: 'UPDATE_DELIVERY'; orderId: string; deliveryInfo: Partial<DeliveryInfo> }
  | { type: 'ADD_TIMELINE_EVENT'; orderId: string; event: Omit<OrderTimelineEvent, 'id' | 'timestamp'> }
  | { type: 'PROCESS_REFUND'; orderId: string; refundRequest: RefundRequest }
  | { type: 'CANCEL_ORDER'; orderId: string; reason: string };