/**
 * Kitchen Display System (KDS) Data Layer
 * 
 * This file handles data fetching, caching, and real-time updates for the KDS system.
 * It provides functions for orders, tickets, metrics, and WebSocket connections.
 */

import {
  KdsOrder,
  KdsTicket,
  KdsMetrics,
  AllDayView,
  StationId,
  TicketPriority,
  OrderStatus,
  KdsApiResponse,
  TicketsResponse,
  OrdersResponse,
  KdsWebSocketMessage,
  StationFilter,
  KdsSettings
} from './types'
import { stationUtils, DEFAULT_STATIONS } from './stations'
import { orderUtils, timeUtils } from './utils'

/**
 * Mock data for development and testing
 */
const MOCK_ORDERS: KdsOrder[] = [
  {
    id: 'order-001',
    orderNumber: '001',
    displayNumber: '#001',
    status: 'preparing',
    priority: 'normal',
    source: 'dine-in',
    customer: { name: 'John Doe', phone: '555-0123' },
    items: [
      {
        id: 'item-001',
        name: 'Cheeseburger',
        quantity: 1,
        price: 12.99,
        category: 'burgers',
        station: 'grill',
        cookTime: 8,
        modifiers: [
          { id: 'mod-1', name: 'No Pickles', price: 0 },
          { id: 'mod-2', name: 'Extra Cheese', price: 1.50 }
        ],
        allergens: ['dairy', 'gluten']
      },
      {
        id: 'item-002',
        name: 'French Fries',
        quantity: 1,
        price: 4.99,
        category: 'sides',
        station: 'fryer',
        cookTime: 5,
        modifiers: [],
        allergens: []
      }
    ],
    totalAmount: 17.98,
    tax: 1.44,
    createdAt: new Date(Date.now() - 8 * 60000), // 8 minutes ago
    allergenWarnings: ['dairy', 'gluten'],
    tableNumber: '12',
    serverName: 'Alice'
  },
  {
    id: 'order-002',
    orderNumber: '002',
    displayNumber: '#002',
    status: 'preparing',
    priority: 'urgent',
    source: 'takeout',
    customer: { name: 'Jane Smith', phone: '555-0456' },
    items: [
      {
        id: 'item-003',
        name: 'Caesar Salad',
        quantity: 1,
        price: 9.99,
        category: 'salads',
        station: 'salad',
        cookTime: 3,
        modifiers: [
          { id: 'mod-3', name: 'Add Chicken', price: 4.00 }
        ],
        allergens: ['dairy'],
        specialInstructions: 'Light dressing'
      }
    ],
    totalAmount: 13.99,
    tax: 1.12,
    createdAt: new Date(Date.now() - 12 * 60000), // 12 minutes ago
    allergenWarnings: ['dairy'],
    specialInstructions: 'Customer is waiting'
  },
  {
    id: 'order-003',
    orderNumber: '003',
    displayNumber: '#003',
    status: 'preparing',
    priority: 'fire',
    source: 'delivery',
    customer: { name: 'Bob Johnson', phone: '555-0789' },
    items: [
      {
        id: 'item-004',
        name: 'Grilled Salmon',
        quantity: 1,
        price: 18.99,
        category: 'entrees',
        station: 'grill',
        cookTime: 10,
        modifiers: [],
        allergens: ['fish'],
        isRush: true
      },
      {
        id: 'item-005',
        name: 'Steamed Vegetables',
        quantity: 1,
        price: 5.99,
        category: 'sides',
        station: 'grill',
        cookTime: 6,
        modifiers: [],
        allergens: []
      }
    ],
    totalAmount: 24.98,
    tax: 2.00,
    createdAt: new Date(Date.now() - 16 * 60000), // 16 minutes ago
    allergenWarnings: ['fish'],
    specialInstructions: 'VIP customer - priority order'
  }
]

/**
 * API Configuration
 */
const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000
}

/**
 * WebSocket Configuration
 */
const WS_CONFIG = {
  url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001/kds',
  reconnectInterval: 5000,
  maxReconnectAttempts: 10,
  heartbeatInterval: 30000
}

/**
 * Data Cache
 */
class KdsDataCache {
  private orders: Map<string, KdsOrder> = new Map()
  private tickets: Map<string, KdsTicket> = new Map()
  private metrics: KdsMetrics | null = null
  private lastUpdate: Date = new Date()
  private readonly maxAge = 5 * 60 * 1000 // 5 minutes

  get(key: string): any {
    return this.orders.get(key) || this.tickets.get(key)
  }

  set(key: string, value: any, type: 'order' | 'ticket' | 'metrics'): void {
    switch (type) {
      case 'order':
        this.orders.set(key, value)
        break
      case 'ticket':
        this.tickets.set(key, value)
        break
      case 'metrics':
        this.metrics = value
        break
    }
    this.lastUpdate = new Date()
  }

  getAll(type: 'orders' | 'tickets'): any[] {
    const map = type === 'orders' ? this.orders : this.tickets
    return Array.from(map.values())
  }

  clear(): void {
    this.orders.clear()
    this.tickets.clear()
    this.metrics = null
    this.lastUpdate = new Date()
  }

  isStale(): boolean {
    return Date.now() - this.lastUpdate.getTime() > this.maxAge
  }
}

const cache = new KdsDataCache()

/**
 * HTTP Client with retry logic
 */
class HttpClient {
  private async fetchWithRetry<T>(
    url: string,
    options: RequestInit = {},
    attempt: number = 1
  ): Promise<T> {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout)

      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      if (attempt < API_CONFIG.retryAttempts) {
        await new Promise(resolve => setTimeout(resolve, API_CONFIG.retryDelay * attempt))
        return this.fetchWithRetry<T>(url, options, attempt + 1)
      }
      throw error
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    const url = `${API_CONFIG.baseUrl}${endpoint}`
    return this.fetchWithRetry<T>(url)
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const url = `${API_CONFIG.baseUrl}${endpoint}`
    return this.fetchWithRetry<T>(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const url = `${API_CONFIG.baseUrl}${endpoint}`
    return this.fetchWithRetry<T>(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    const url = `${API_CONFIG.baseUrl}${endpoint}`
    return this.fetchWithRetry<T>(url, { method: 'DELETE' })
  }
}

const httpClient = new HttpClient()

/**
 * WebSocket Manager
 */
class KdsWebSocketManager {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private heartbeatInterval: NodeJS.Timeout | null = null
  private listeners: Map<string, ((data: any) => void)[]> = new Map()

  connect(): void {
    if (typeof window === 'undefined') return

    try {
      this.ws = new WebSocket(WS_CONFIG.url)
      
      this.ws.onopen = () => {
        console.log('KDS WebSocket connected')
        this.reconnectAttempts = 0
        this.startHeartbeat()
      }

      this.ws.onmessage = (event) => {
        try {
          const message: KdsWebSocketMessage = JSON.parse(event.data)
          this.handleMessage(message)
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      this.ws.onclose = () => {
        console.log('KDS WebSocket disconnected')
        this.stopHeartbeat()
        this.reconnect()
      }

      this.ws.onerror = (error) => {
        console.error('KDS WebSocket error:', error)
      }
    } catch (error) {
      console.error('Error connecting to WebSocket:', error)
      this.reconnect()
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.stopHeartbeat()
  }

  private reconnect(): void {
    if (this.reconnectAttempts >= WS_CONFIG.maxReconnectAttempts) {
      console.error('Max WebSocket reconnection attempts reached')
      return
    }

    this.reconnectAttempts++
    setTimeout(() => {
      console.log(`Attempting to reconnect WebSocket (${this.reconnectAttempts}/${WS_CONFIG.maxReconnectAttempts})`)
      this.connect()
    }, WS_CONFIG.reconnectInterval)
  }

  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }))
      }
    }, WS_CONFIG.heartbeatInterval)
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  private handleMessage(message: KdsWebSocketMessage): void {
    const listeners = this.listeners.get(message.type) || []
    listeners.forEach(listener => listener(message.data))
  }

  subscribe(eventType: string, callback: (data: any) => void): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, [])
    }
    this.listeners.get(eventType)!.push(callback)

    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(eventType)
      if (listeners) {
        const index = listeners.indexOf(callback)
        if (index > -1) {
          listeners.splice(index, 1)
        }
      }
    }
  }
}

const wsManager = new KdsWebSocketManager()

/**
 * Data API Functions
 */
export const kdsApi = {
  /**
   * Initialize the KDS data layer
   */
  init: (): void => {
    wsManager.connect()
  },

  /**
   * Cleanup resources
   */
  cleanup: (): void => {
    wsManager.disconnect()
    cache.clear()
  },

  /**
   * Fetch all active orders
   */
  fetchOrders: async (filters?: StationFilter): Promise<KdsOrder[]> => {
    try {
      // In production, this would make an API call
      // const response = await httpClient.get<OrdersResponse>('/kds/orders')
      // return response.orders
      
      // For now, return mock data with filtering applied
      let orders = MOCK_ORDERS
      
      if (filters) {
        orders = orders.filter(order => {
          if (filters.stationId && !order.items.some(item => item.station === filters.stationId)) {
            return false
          }
          if (filters.status && !filters.status.includes(order.status)) {
            return false
          }
          if (filters.priority && !filters.priority.includes(order.priority)) {
            return false
          }
          if (filters.source && !filters.source.includes(order.source)) {
            return false
          }
          if (filters.timeRange) {
            const orderTime = order.createdAt.getTime()
            if (orderTime < filters.timeRange.start.getTime() || 
                orderTime > filters.timeRange.end.getTime()) {
              return false
            }
          }
          return true
        })
      }

      // Cache the results
      orders.forEach(order => cache.set(order.id, order, 'order'))
      
      return orders
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
  },

  /**
   * Fetch tickets for specific stations
   */
  fetchTickets: async (stationIds: StationId[]): Promise<KdsTicket[]> => {
    try {
      const orders = await kdsApi.fetchOrders()
      const tickets: KdsTicket[] = []
      
      orders.forEach(order => {
        const orderTickets = orderUtils.createTicketsFromOrder(order)
        const filteredTickets = orderTickets.filter(ticket => 
          stationIds.includes(ticket.station)
        )
        tickets.push(...filteredTickets)
      })

      // Update urgency based on elapsed time
      tickets.forEach(ticket => {
        ticket.elapsedTime = timeUtils.getElapsedTime(ticket.startTime)
        ticket.urgency = ticket.elapsedTime >= 900 ? 'urgent' : 
                        ticket.elapsedTime >= 600 ? 'warning' : 'normal'
      })

      // Cache the results
      tickets.forEach(ticket => cache.set(ticket.id, ticket, 'ticket'))
      
      return orderUtils.sortTickets(tickets)
    } catch (error) {
      console.error('Error fetching tickets:', error)
      throw error
    }
  },

  /**
   * Fetch KDS metrics
   */
  fetchMetrics: async (): Promise<KdsMetrics> => {
    try {
      // In production, this would make an API call
      // const response = await httpClient.get<KdsMetrics>('/kds/metrics')
      // return response
      
      // For now, calculate metrics from mock data
      const orders = await kdsApi.fetchOrders()
      const activeTickets = orders.filter(order => 
        order.status !== 'completed' && order.status !== 'cancelled'
      ).length

      const metrics: KdsMetrics = {
        totalActiveTickets: activeTickets,
        averageTicketTime: 8.5, // minutes
        longestWaitTime: 16, // minutes
        stationMetrics: Object.values(DEFAULT_STATIONS).map(station => ({
          stationId: station.id,
          averageTicketTime: station.averageCookTime,
          completedOrders: Math.floor(Math.random() * 50),
          pendingOrders: Math.floor(Math.random() * 10),
          overdueOrders: Math.floor(Math.random() * 3),
          efficiency: Math.floor(Math.random() * 30) + 70,
          lastHourThroughput: Math.floor(Math.random() * 20) + 10
        })),
        ordersBySource: {
          'dine-in': 45,
          'takeout': 23,
          'delivery': 18,
          'online': 12,
          'phone': 8,
          'pos': 5
        },
        ordersByPriority: {
          'normal': 85,
          'urgent': 12,
          'rush': 5,
          'fire': 2
        },
        lastUpdated: new Date()
      }

      cache.set('metrics', metrics, 'metrics')
      return metrics
    } catch (error) {
      console.error('Error fetching metrics:', error)
      throw error
    }
  },

  /**
   * Generate all day view
   */
  generateAllDayView: async (stationIds: StationId[]): Promise<AllDayView> => {
    try {
      const orders = await kdsApi.fetchOrders()
      const items = orders.reduce((acc, order) => {
        order.items.forEach(item => {
          if (stationIds.includes(item.station)) {
            const key = `${item.name}-${item.station}`
            if (!acc[key]) {
              acc[key] = {
                itemId: item.id,
                name: item.name,
                station: item.station,
                totalQuantity: 0,
                completedQuantity: 0,
                pendingQuantity: 0,
                averageCookTime: item.cookTime,
                modifiers: {},
                allergens: item.allergens || []
              }
            }
            
            acc[key].totalQuantity += item.quantity
            if (order.status === 'completed') {
              acc[key].completedQuantity += item.quantity
            } else {
              acc[key].pendingQuantity += item.quantity
            }
            
            // Aggregate modifiers
            item.modifiers.forEach(mod => {
              acc[key].modifiers[mod.name] = (acc[key].modifiers[mod.name] || 0) + item.quantity
            })
          }
        })
        return acc
      }, {} as Record<string, any>)

      return {
        id: 'all-day-' + Date.now(),
        name: 'All Day View',
        stations: stationIds,
        items: Object.values(items),
        totalOrders: orders.length,
        completedOrders: orders.filter(o => o.status === 'completed').length,
        lastUpdated: new Date()
      }
    } catch (error) {
      console.error('Error generating all day view:', error)
      throw error
    }
  },

  /**
   * Bump a ticket (mark as completed)
   */
  bumpTicket: async (ticketId: string): Promise<void> => {
    try {
      await httpClient.post(`/kds/tickets/${ticketId}/bump`, {})
      
      // Update cache
      const ticket = cache.get(ticketId)
      if (ticket) {
        ticket.status = 'completed'
        ticket.completedTime = new Date()
        cache.set(ticketId, ticket, 'ticket')
      }
    } catch (error) {
      console.error('Error bumping ticket:', error)
      throw error
    }
  },

  /**
   * Recall a completed ticket
   */
  recallTicket: async (ticketId: string): Promise<void> => {
    try {
      await httpClient.post(`/kds/tickets/${ticketId}/recall`, {})
      
      // Update cache
      const ticket = cache.get(ticketId)
      if (ticket) {
        ticket.status = 'preparing'
        ticket.isRecalled = true
        ticket.completedTime = undefined
        cache.set(ticketId, ticket, 'ticket')
      }
    } catch (error) {
      console.error('Error recalling ticket:', error)
      throw error
    }
  },

  /**
   * Fire a ticket (mark as rush)
   */
  fireTicket: async (ticketId: string): Promise<void> => {
    try {
      await httpClient.post(`/kds/tickets/${ticketId}/fire`, {})
      
      // Update cache
      const ticket = cache.get(ticketId)
      if (ticket) {
        ticket.isFired = true
        ticket.order.priority = 'fire'
        cache.set(ticketId, ticket, 'ticket')
      }
    } catch (error) {
      console.error('Error firing ticket:', error)
      throw error
    }
  },

  /**
   * Change ticket priority
   */
  changePriority: async (ticketId: string, priority: TicketPriority): Promise<void> => {
    try {
      await httpClient.put(`/kds/tickets/${ticketId}/priority`, { priority })
      
      // Update cache
      const ticket = cache.get(ticketId)
      if (ticket) {
        ticket.order.priority = priority
        cache.set(ticketId, ticket, 'ticket')
      }
    } catch (error) {
      console.error('Error changing ticket priority:', error)
      throw error
    }
  },

  /**
   * Subscribe to real-time updates
   */
  subscribe: (
    eventType: 'ticket_update' | 'new_order' | 'order_complete' | 'station_change' | 'system_alert',
    callback: (data: any) => void
  ): (() => void) => {
    return wsManager.subscribe(eventType, callback)
  },

  /**
   * Get cached data
   */
  getCached: <T>(key: string): T | undefined => {
    return cache.get(key)
  },

  /**
   * Check if cache is stale
   */
  isCacheStale: (): boolean => {
    return cache.isStale()
  }
}

/**
 * Real-time update hooks
 */
export const useKdsRealTime = () => {
  if (typeof window !== 'undefined') {
    // Initialize WebSocket connection
    kdsApi.init()
    
    // Cleanup on unmount
    window.addEventListener('beforeunload', () => {
      kdsApi.cleanup()
    })
  }

  return {
    subscribe: kdsApi.subscribe,
    disconnect: kdsApi.cleanup
  }
}

/**
 * Export the main API
 */
export { kdsApi as default, wsManager, cache }