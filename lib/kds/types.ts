/**
 * Kitchen Display System (KDS) Types and Interfaces
 * 
 * This file contains all TypeScript types and interfaces for the KDS system.
 * It defines data structures for orders, tickets, stations, and real-time updates.
 */

// Core KDS Types
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'
export type TicketPriority = 'normal' | 'urgent' | 'rush' | 'fire'
export type StationId = 'grill' | 'fryer' | 'salad' | 'expo' | 'pantry' | 'dessert' | 'beverage'
export type TicketUrgency = 'normal' | 'warning' | 'urgent'
export type OrderSource = 'dine-in' | 'takeout' | 'delivery' | 'online' | 'phone' | 'pos'

// Kitchen Station Configuration
export interface KitchenStation {
  id: StationId
  name: string
  displayName: string
  color: string
  icon: string
  position: number
  isActive: boolean
  maxCapacity: number
  averageCookTime: number // in minutes
  specialInstructions?: string[]
}

// Order Item Types
export interface OrderItemModifier {
  id: string
  name: string
  value?: string
  price: number
  category?: string
  isSpecialRequest?: boolean
}

export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  category: string
  station: StationId
  cookTime: number // in minutes
  modifiers: OrderItemModifier[]
  specialInstructions?: string
  allergens?: string[]
  isRush?: boolean
  isVoid?: boolean
  prepSequence?: number
}

// Customer Information
export interface Customer {
  id?: string
  name?: string
  phone?: string
  email?: string
  loyaltyNumber?: string
  allergies?: string[]
  preferences?: string[]
}

// Order and Ticket Types
export interface KdsOrder {
  id: string
  orderNumber: string
  displayNumber: string // Human-readable order number
  status: OrderStatus
  priority: TicketPriority
  source: OrderSource
  customer: Customer
  items: OrderItem[]
  totalAmount: number
  tax: number
  tip?: number
  createdAt: Date
  estimatedReadyTime?: Date
  actualReadyTime?: Date
  specialInstructions?: string
  allergenWarnings: string[]
  serverName?: string
  tableNumber?: string | number
  deliveryAddress?: string
  isOrderAhead?: boolean
  scheduledTime?: Date
}

export interface KdsTicket {
  id: string
  orderId: string
  order: KdsOrder
  station: StationId
  status: OrderStatus
  urgency: TicketUrgency
  elapsedTime: number // in seconds
  cookTime: number // expected cook time in minutes
  startTime: Date
  completedTime?: Date
  bumpedTime?: Date
  isFired?: boolean
  isRecalled?: boolean
  position: number
  items: OrderItem[]
}

// Station View and Filtering
export interface StationFilter {
  stationId?: StationId
  status?: OrderStatus[]
  priority?: TicketPriority[]
  urgency?: TicketUrgency[]
  source?: OrderSource[]
  showCompleted?: boolean
  timeRange?: {
    start: Date
    end: Date
  }
}

export interface StationViewConfig {
  id: string
  name: string
  stations: StationId[]
  columns: number
  showTimer: boolean
  showCustomer: boolean
  showServer: boolean
  showTable: boolean
  showSource: boolean
  showAllergies: boolean
  sortBy: 'time' | 'priority' | 'table' | 'server'
  maxTicketsPerColumn: number
  autoScroll: boolean
  soundAlerts: boolean
  colorCoding: boolean
}

// All Day View Types
export interface AllDayItem {
  itemId: string
  name: string
  station: StationId
  totalQuantity: number
  completedQuantity: number
  pendingQuantity: number
  averageCookTime: number
  modifiers: {
    [key: string]: number // modifier name -> quantity
  }
  allergens: string[]
}

export interface AllDayView {
  id: string
  name: string
  stations: StationId[]
  items: AllDayItem[]
  totalOrders: number
  completedOrders: number
  lastUpdated: Date
}

// Real-time Updates and Events
export interface KdsEvent {
  id: string
  type: 'order_created' | 'order_updated' | 'ticket_bumped' | 'ticket_recalled' | 'station_changed' | 'priority_changed'
  timestamp: Date
  orderId: string
  ticketId?: string
  stationId?: StationId
  data: Record<string, any>
  userId?: string
}

export interface KdsSettings {
  stationViews: StationViewConfig[]
  defaultStation: StationId
  autoRefreshInterval: number // in seconds
  ticketTimeouts: {
    warning: number // minutes
    urgent: number // minutes
  }
  soundSettings: {
    newOrder: boolean
    urgentOrder: boolean
    orderReady: boolean
    volume: number
  }
  displaySettings: {
    theme: 'dark' | 'light'
    fontSize: 'small' | 'medium' | 'large' | 'extra-large'
    showSeconds: boolean
    show24Hour: boolean
    highlightAllergens: boolean
  }
  kioskMode: boolean
  touchOptimized: boolean
  keyboardShortcuts: boolean
  language: string
}

// Performance Metrics
export interface StationMetrics {
  stationId: StationId
  averageTicketTime: number
  completedOrders: number
  pendingOrders: number
  overdueOrders: number
  efficiency: number // percentage
  lastHourThroughput: number
}

export interface KdsMetrics {
  totalActiveTickets: number
  averageTicketTime: number
  longestWaitTime: number
  stationMetrics: StationMetrics[]
  ordersBySource: Record<OrderSource, number>
  ordersByPriority: Record<TicketPriority, number>
  lastUpdated: Date
}

// API Response Types
export interface KdsApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  timestamp: Date
}

export interface TicketsResponse {
  tickets: KdsTicket[]
  totalCount: number
  hasMore: boolean
  lastUpdated: Date
}

export interface OrdersResponse {
  orders: KdsOrder[]
  totalCount: number
  hasMore: boolean
  lastUpdated: Date
}

// WebSocket Message Types
export interface KdsWebSocketMessage {
  type: 'ticket_update' | 'new_order' | 'order_complete' | 'station_change' | 'system_alert'
  data: any
  timestamp: Date
}

// Component Props Types
export interface KdsTicketProps {
  ticket: KdsTicket
  config: StationViewConfig
  onBump: (ticketId: string) => void
  onRecall: (ticketId: string) => void
  onFire: (ticketId: string) => void
  onPriorityChange: (ticketId: string, priority: TicketPriority) => void
  className?: string
}

export interface StationViewProps {
  station: KitchenStation
  tickets: KdsTicket[]
  config: StationViewConfig
  onBump: (ticketId: string) => void
  onRecall: (ticketId: string) => void
  onFire: (ticketId: string) => void
  onPriorityChange: (ticketId: string, priority: TicketPriority) => void
  className?: string
}

export interface KdsHeaderProps {
  currentStation?: StationId
  stationViews: StationViewConfig[]
  metrics: KdsMetrics
  onStationChange: (stationId: StationId) => void
  onViewChange: (viewId: string) => void
  onSettingsOpen: () => void
  className?: string
}

export interface AllDayViewProps {
  allDayView: AllDayView
  onRefresh: () => void
  className?: string
}

// Error Types
export interface KdsError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: Date
  recoverable: boolean
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>

export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// Form and Input Types
export interface TicketFormData {
  priority: TicketPriority
  specialInstructions?: string
  estimatedTime?: number
}

export interface StationFormData {
  name: string
  displayName: string
  color: string
  isActive: boolean
  maxCapacity: number
  averageCookTime: number
}

// Export all types
export type {
  // Re-export key types for easier imports
  KdsOrder as Order,
  KdsTicket as Ticket,
  KdsSettings as Settings,
  KdsMetrics as Metrics,
  KdsError as Error,
}