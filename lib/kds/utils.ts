/**
 * Kitchen Display System (KDS) Utility Functions
 * 
 * This file contains utility functions for the KDS system including:
 * - Time calculations and formatting
 * - Order and ticket processing
 * - Color coding and urgency calculations
 * - Sound management
 * - Keyboard shortcuts
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  KdsOrder,
  KdsTicket,
  TicketUrgency,
  TicketPriority,
  OrderStatus,
  StationId,
  OrderItem,
  AllDayItem,
  KdsSettings
} from './types'

/**
 * Utility function for merging class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Time and Date Utilities
 */
export const timeUtils = {
  /**
   * Calculate elapsed time in seconds from a start date
   */
  getElapsedTime: (startTime: Date): number => {
    return Math.floor((Date.now() - startTime.getTime()) / 1000)
  },

  /**
   * Format elapsed time as MM:SS or HH:MM:SS
   */
  formatElapsedTime: (seconds: number, showHours: boolean = false): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    if (showHours || hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  },

  /**
   * Get time remaining for an estimated ready time
   */
  getTimeRemaining: (estimatedTime: Date): number => {
    return Math.max(0, Math.floor((estimatedTime.getTime() - Date.now()) / 1000))
  },

  /**
   * Format time as HH:MM AM/PM or 24-hour format
   */
  formatTime: (date: Date, use24Hour: boolean = false): string => {
    return date.toLocaleTimeString('en-US', {
      hour12: !use24Hour,
      hour: '2-digit',
      minute: '2-digit',
      ...(use24Hour ? {} : { second: '2-digit' })
    })
  },

  /**
   * Check if a time is within business hours
   */
  isWithinBusinessHours: (date: Date, businessHours: { start: string, end: string }): boolean => {
    const time = date.toTimeString().slice(0, 5)
    return time >= businessHours.start && time <= businessHours.end
  }
}

/**
 * Urgency and Priority Calculations
 */
export const urgencyUtils = {
  /**
   * Calculate ticket urgency based on elapsed time and thresholds
   */
  calculateUrgency: (
    elapsedSeconds: number,
    warningThreshold: number = 10 * 60, // 10 minutes
    urgentThreshold: number = 15 * 60   // 15 minutes
  ): TicketUrgency => {
    if (elapsedSeconds >= urgentThreshold) return 'urgent'
    if (elapsedSeconds >= warningThreshold) return 'warning'
    return 'normal'
  },

  /**
   * Get urgency color class for styling
   */
  getUrgencyColor: (urgency: TicketUrgency): string => {
    switch (urgency) {
      case 'urgent':
        return 'text-red-500 border-red-500 bg-red-500/20'
      case 'warning':
        return 'text-yellow-500 border-yellow-500 bg-yellow-500/20'
      default:
        return 'text-white border-gray-600 bg-gray-900/50'
    }
  },

  /**
   * Get priority color class for styling
   */
  getPriorityColor: (priority: TicketPriority): string => {
    switch (priority) {
      case 'fire':
        return 'text-red-600 bg-red-600/30 border-red-600'
      case 'rush':
        return 'text-orange-500 bg-orange-500/30 border-orange-500'
      case 'urgent':
        return 'text-yellow-500 bg-yellow-500/30 border-yellow-500'
      default:
        return 'text-white bg-gray-800/30 border-gray-600'
    }
  },

  /**
   * Get status color class for styling
   */
  getStatusColor: (status: OrderStatus): string => {
    switch (status) {
      case 'ready':
        return 'text-green-500 bg-green-500/20 border-green-500'
      case 'preparing':
        return 'text-blue-500 bg-blue-500/20 border-blue-500'
      case 'completed':
        return 'text-gray-400 bg-gray-400/20 border-gray-400'
      case 'cancelled':
        return 'text-red-400 bg-red-400/20 border-red-400'
      default:
        return 'text-white bg-gray-800/20 border-gray-600'
    }
  }
}

/**
 * Order and Ticket Processing
 */
export const orderUtils = {
  /**
   * Convert an order to station-specific tickets
   */
  createTicketsFromOrder: (order: KdsOrder): KdsTicket[] => {
    const stationGroups = new Map<StationId, OrderItem[]>()
    
    // Group items by station
    order.items.forEach(item => {
      if (!stationGroups.has(item.station)) {
        stationGroups.set(item.station, [])
      }
      stationGroups.get(item.station)!.push(item)
    })

    // Create tickets for each station
    return Array.from(stationGroups.entries()).map(([station, items], index) => ({
      id: `${order.id}-${station}`,
      orderId: order.id,
      order,
      station,
      status: order.status,
      urgency: 'normal',
      elapsedTime: timeUtils.getElapsedTime(order.createdAt),
      cookTime: Math.max(...items.map(item => item.cookTime)),
      startTime: order.createdAt,
      position: index,
      items,
      isFired: order.priority === 'fire' || order.priority === 'rush'
    }))
  },

  /**
   * Calculate total cook time for an order
   */
  calculateTotalCookTime: (items: OrderItem[]): number => {
    // Group by station and get max cook time per station
    const stationTimes = new Map<StationId, number>()
    
    items.forEach(item => {
      const currentMax = stationTimes.get(item.station) || 0
      stationTimes.set(item.station, Math.max(currentMax, item.cookTime))
    })

    // Return the longest station cook time
    return Math.max(...Array.from(stationTimes.values()))
  },

  /**
   * Get all unique allergens from order items
   */
  getAllergens: (items: OrderItem[]): string[] => {
    const allergens = new Set<string>()
    items.forEach(item => {
      item.allergens?.forEach(allergen => allergens.add(allergen))
      item.modifiers.forEach(modifier => {
        // Add logic to extract allergens from modifiers if needed
      })
    })
    return Array.from(allergens)
  },

  /**
   * Check if order contains high-priority allergens
   */
  hasHighPriorityAllergens: (items: OrderItem[]): boolean => {
    const highPriorityAllergens = ['nuts', 'shellfish', 'eggs', 'dairy', 'gluten']
    const orderAllergens = orderUtils.getAllergens(items)
    return orderAllergens.some(allergen => 
      highPriorityAllergens.includes(allergen.toLowerCase())
    )
  },

  /**
   * Sort tickets by priority and time
   */
  sortTickets: (tickets: KdsTicket[], sortBy: 'time' | 'priority' | 'table' | 'server' = 'time'): KdsTicket[] => {
    return [...tickets].sort((a, b) => {
      // First sort by fire/rush orders
      if (a.isFired && !b.isFired) return -1
      if (!a.isFired && b.isFired) return 1

      switch (sortBy) {
        case 'priority':
          const priorityOrder = { fire: 0, rush: 1, urgent: 2, normal: 3 }
          const aPriority = priorityOrder[a.order.priority]
          const bPriority = priorityOrder[b.order.priority]
          if (aPriority !== bPriority) return aPriority - bPriority
          break

        case 'table':
          if (a.order.tableNumber && b.order.tableNumber) {
            const tableA = typeof a.order.tableNumber === 'string' ? parseInt(a.order.tableNumber) : a.order.tableNumber
            const tableB = typeof b.order.tableNumber === 'string' ? parseInt(b.order.tableNumber) : b.order.tableNumber
            if (tableA !== tableB) return tableA - tableB
          }
          break

        case 'server':
          if (a.order.serverName && b.order.serverName) {
            const serverCompare = a.order.serverName.localeCompare(b.order.serverName)
            if (serverCompare !== 0) return serverCompare
          }
          break
      }

      // Default to time sorting
      return a.startTime.getTime() - b.startTime.getTime()
    })
  }
}

/**
 * All Day View Utilities
 */
export const allDayUtils = {
  /**
   * Generate all day view from current orders
   */
  generateAllDayView: (orders: KdsOrder[], stationIds: StationId[]): AllDayItem[] => {
    const itemMap = new Map<string, AllDayItem>()

    orders.forEach(order => {
      order.items.forEach(item => {
        if (!stationIds.includes(item.station)) return

        const key = `${item.name}-${JSON.stringify(item.modifiers.sort())}`
        
        if (!itemMap.has(key)) {
          itemMap.set(key, {
            itemId: item.id,
            name: item.name,
            station: item.station,
            totalQuantity: 0,
            completedQuantity: 0,
            pendingQuantity: 0,
            averageCookTime: item.cookTime,
            modifiers: {},
            allergens: item.allergens || []
          })
        }

        const allDayItem = itemMap.get(key)!
        allDayItem.totalQuantity += item.quantity

        if (order.status === 'completed') {
          allDayItem.completedQuantity += item.quantity
        } else {
          allDayItem.pendingQuantity += item.quantity
        }

        // Aggregate modifiers
        item.modifiers.forEach(modifier => {
          allDayItem.modifiers[modifier.name] = (allDayItem.modifiers[modifier.name] || 0) + item.quantity
        })
      })
    })

    return Array.from(itemMap.values()).sort((a, b) => {
      // Sort by station, then by pending quantity (highest first)
      if (a.station !== b.station) {
        return stationIds.indexOf(a.station) - stationIds.indexOf(b.station)
      }
      return b.pendingQuantity - a.pendingQuantity
    })
  },

  /**
   * Calculate completion percentage for all day item
   */
  getCompletionPercentage: (item: AllDayItem): number => {
    if (item.totalQuantity === 0) return 0
    return Math.round((item.completedQuantity / item.totalQuantity) * 100)
  }
}

/**
 * Sound Management
 */
export const soundUtils = {
  /**
   * Play notification sound
   */
  playSound: (type: 'newOrder' | 'urgent' | 'ready' | 'bump', volume: number = 0.5): void => {
    if (typeof window === 'undefined') return

    try {
      const audio = new Audio()
      
      switch (type) {
        case 'newOrder':
          audio.src = '/sounds/new-order.mp3'
          break
        case 'urgent':
          audio.src = '/sounds/urgent.mp3'
          break
        case 'ready':
          audio.src = '/sounds/ready.mp3'
          break
        case 'bump':
          audio.src = '/sounds/bump.mp3'
          break
      }
      
      audio.volume = Math.max(0, Math.min(1, volume))
      audio.play().catch(() => {
        // Ignore audio play failures (often due to browser autoplay policies)
      })
    } catch (error) {
      // Ignore audio errors
    }
  },

  /**
   * Check if audio is supported
   */
  isAudioSupported: (): boolean => {
    return typeof window !== 'undefined' && 'Audio' in window
  }
}

/**
 * Local Storage Utilities
 */
export const storageUtils = {
  /**
   * Get KDS settings from localStorage
   */
  getSettings: (): Partial<KdsSettings> => {
    if (typeof window === 'undefined') return {}
    
    try {
      const stored = localStorage.getItem('kds-settings')
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  },

  /**
   * Save KDS settings to localStorage
   */
  saveSettings: (settings: Partial<KdsSettings>): void => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem('kds-settings', JSON.stringify(settings))
    } catch {
      // Ignore storage errors
    }
  },

  /**
   * Clear all KDS data from localStorage
   */
  clearStorage: (): void => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.removeItem('kds-settings')
      localStorage.removeItem('kds-cache')
    } catch {
      // Ignore storage errors
    }
  }
}

/**
 * Keyboard Shortcuts
 */
export const keyboardUtils = {
  /**
   * KDS keyboard shortcuts map
   */
  shortcuts: {
    'KeyF': 'fire-order',
    'KeyB': 'bump-ticket',
    'KeyR': 'recall-ticket',
    'KeyS': 'switch-station',
    'KeyA': 'all-day-view',
    'KeyH': 'help',
    'Escape': 'exit-modal',
    'Space': 'toggle-play-pause',
    'ArrowLeft': 'previous-ticket',
    'ArrowRight': 'next-ticket',
    'ArrowUp': 'previous-station',
    'ArrowDown': 'next-station'
  } as const,

  /**
   * Handle keyboard shortcuts
   */
  handleKeyPress: (
    event: KeyboardEvent,
    handlers: Partial<Record<keyof typeof keyboardUtils.shortcuts, () => void>>
  ): boolean => {
    const key = event.code || event.key
    const shortcut = keyboardUtils.shortcuts[key as keyof typeof keyboardUtils.shortcuts]
    
    if (shortcut && handlers[shortcut]) {
      event.preventDefault()
      handlers[shortcut]!()
      return true
    }
    
    return false
  }
}

/**
 * Formatting Utilities
 */
export const formatUtils = {
  /**
   * Format currency values
   */
  formatCurrency: (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  },

  /**
   * Format order numbers for display
   */
  formatOrderNumber: (orderNumber: string, maxLength: number = 6): string => {
    if (orderNumber.length <= maxLength) return orderNumber
    return '#' + orderNumber.slice(-maxLength)
  },

  /**
   * Truncate text with ellipsis
   */
  truncateText: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength - 3) + '...'
  },

  /**
   * Format modifier names for display
   */
  formatModifiers: (modifiers: { name: string; value?: string }[]): string => {
    return modifiers
      .map(mod => mod.value ? `${mod.name}: ${mod.value}` : mod.name)
      .join(', ')
  }
}

/**
 * Performance Utilities
 */
export const performanceUtils = {
  /**
   * Debounce function calls
   */
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  },

  /**
   * Throttle function calls
   */
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }
}

// Export default utilities object
export const kdsUtils = {
  time: timeUtils,
  urgency: urgencyUtils,
  order: orderUtils,
  allDay: allDayUtils,
  sound: soundUtils,
  storage: storageUtils,
  keyboard: keyboardUtils,
  format: formatUtils,
  performance: performanceUtils
}