/**
 * Kitchen Display System (KDS) Station Configuration
 * 
 * This file defines the kitchen stations, their capabilities, and routing logic.
 * It includes station definitions, item routing, and station management functions.
 */

import {
  KitchenStation,
  StationId,
  StationViewConfig,
  OrderItem,
  KdsSettings
} from './types'

/**
 * Default Kitchen Station Definitions
 */
export const DEFAULT_STATIONS: Record<StationId, KitchenStation> = {
  grill: {
    id: 'grill',
    name: 'grill',
    displayName: 'Grill',
    color: '#dc2626', // red-600
    icon: '🔥',
    position: 1,
    isActive: true,
    maxCapacity: 12,
    averageCookTime: 8,
    specialInstructions: [
      'Check internal temperature',
      'Let meat rest before plating',
      'Clean grill between orders'
    ]
  },
  fryer: {
    id: 'fryer',
    name: 'fryer',
    displayName: 'Fryer',
    color: '#d97706', // amber-600
    icon: '🍟',
    position: 2,
    isActive: true,
    maxCapacity: 10,
    averageCookTime: 5,
    specialInstructions: [
      'Preheat oil to correct temperature',
      'Do not overcrowd basket',
      'Drain properly before plating'
    ]
  },
  salad: {
    id: 'salad',
    name: 'salad',
    displayName: 'Salad',
    color: '#059669', // green-600
    icon: '🥗',
    position: 3,
    isActive: true,
    maxCapacity: 15,
    averageCookTime: 3,
    specialInstructions: [
      'Check produce freshness',
      'Use separate cutting boards',
      'Keep ingredients cold'
    ]
  },
  expo: {
    id: 'expo',
    name: 'expo',
    displayName: 'Expo',
    color: '#7c3aed', // violet-600
    icon: '🍽️',
    position: 4,
    isActive: true,
    maxCapacity: 20,
    averageCookTime: 2,
    specialInstructions: [
      'Check order completeness',
      'Verify special requests',
      'Ensure proper presentation'
    ]
  },
  pantry: {
    id: 'pantry',
    name: 'pantry',
    displayName: 'Pantry',
    color: '#0369a1', // blue-700
    icon: '🥪',
    position: 5,
    isActive: true,
    maxCapacity: 8,
    averageCookTime: 4,
    specialInstructions: [
      'Check sandwich construction',
      'Toast bread evenly',
      'Use proper portion sizes'
    ]
  },
  dessert: {
    id: 'dessert',
    name: 'dessert',
    displayName: 'Dessert',
    color: '#be185d', // pink-700
    icon: '🍰',
    position: 6,
    isActive: true,
    maxCapacity: 6,
    averageCookTime: 6,
    specialInstructions: [
      'Check dessert temperature',
      'Garnish according to recipe',
      'Handle with care'
    ]
  },
  beverage: {
    id: 'beverage',
    name: 'beverage',
    displayName: 'Beverage',
    color: '#0891b2', // cyan-600
    icon: '🥤',
    position: 7,
    isActive: true,
    maxCapacity: 25,
    averageCookTime: 1,
    specialInstructions: [
      'Use correct glass size',
      'Check ice levels',
      'Garnish appropriately'
    ]
  }
}

/**
 * Menu Item to Station Routing Rules
 * This defines which menu items should be routed to which kitchen stations
 */
export const ITEM_STATION_ROUTING: Record<string, StationId> = {
  // Grill items
  'burger': 'grill',
  'cheeseburger': 'grill',
  'steak': 'grill',
  'chicken breast': 'grill',
  'grilled chicken': 'grill',
  'fish': 'grill',
  'salmon': 'grill',
  'hot dog': 'grill',
  'sausage': 'grill',
  'grilled vegetables': 'grill',

  // Fryer items
  'french fries': 'fryer',
  'fries': 'fryer',
  'onion rings': 'fryer',
  'fried chicken': 'fryer',
  'chicken wings': 'fryer',
  'fish and chips': 'fryer',
  'mozzarella sticks': 'fryer',
  'nachos': 'fryer',
  'tempura': 'fryer',

  // Salad items
  'caesar salad': 'salad',
  'house salad': 'salad',
  'greek salad': 'salad',
  'cobb salad': 'salad',
  'garden salad': 'salad',
  'mixed greens': 'salad',
  'fruit salad': 'salad',

  // Pantry items
  'sandwich': 'pantry',
  'club sandwich': 'pantry',
  'wrap': 'pantry',
  'panini': 'pantry',
  'sub': 'pantry',
  'bagel': 'pantry',
  'toast': 'pantry',
  'cold appetizer': 'pantry',

  // Dessert items
  'cake': 'dessert',
  'pie': 'dessert',
  'ice cream': 'dessert',
  'cheesecake': 'dessert',
  'brownie': 'dessert',
  'cookies': 'dessert',
  'pudding': 'dessert',

  // Beverage items
  'soda': 'beverage',
  'coffee': 'beverage',
  'tea': 'beverage',
  'juice': 'beverage',
  'smoothie': 'beverage',
  'milkshake': 'beverage',
  'cocktail': 'beverage',
  'beer': 'beverage',
  'wine': 'beverage',
  'water': 'beverage'
}

/**
 * Category to Station Mapping
 * Fallback routing based on menu category
 */
export const CATEGORY_STATION_ROUTING: Record<string, StationId> = {
  'appetizers': 'fryer',
  'salads': 'salad',
  'soups': 'pantry',
  'entrees': 'grill',
  'mains': 'grill',
  'burgers': 'grill',
  'sandwiches': 'pantry',
  'sides': 'fryer',
  'desserts': 'dessert',
  'beverages': 'beverage',
  'drinks': 'beverage',
  'hot drinks': 'beverage',
  'cold drinks': 'beverage'
}

/**
 * Default Station View Configurations
 */
export const DEFAULT_STATION_VIEWS: StationViewConfig[] = [
  {
    id: 'all-stations',
    name: 'All Stations',
    stations: ['grill', 'fryer', 'salad', 'expo', 'pantry', 'dessert', 'beverage'],
    columns: 4,
    showTimer: true,
    showCustomer: true,
    showServer: true,
    showTable: true,
    showSource: true,
    showAllergies: true,
    sortBy: 'time',
    maxTicketsPerColumn: 10,
    autoScroll: true,
    soundAlerts: true,
    colorCoding: true
  },
  {
    id: 'hot-stations',
    name: 'Hot Stations',
    stations: ['grill', 'fryer'],
    columns: 2,
    showTimer: true,
    showCustomer: false,
    showServer: false,
    showTable: true,
    showSource: false,
    showAllergies: true,
    sortBy: 'priority',
    maxTicketsPerColumn: 12,
    autoScroll: true,
    soundAlerts: true,
    colorCoding: true
  },
  {
    id: 'cold-stations',
    name: 'Cold Stations',
    stations: ['salad', 'pantry', 'dessert'],
    columns: 3,
    showTimer: true,
    showCustomer: false,
    showServer: false,
    showTable: true,
    showSource: false,
    showAllergies: true,
    sortBy: 'time',
    maxTicketsPerColumn: 8,
    autoScroll: true,
    soundAlerts: false,
    colorCoding: true
  },
  {
    id: 'expo-view',
    name: 'Expo',
    stations: ['expo'],
    columns: 1,
    showTimer: true,
    showCustomer: true,
    showServer: true,
    showTable: true,
    showSource: true,
    showAllergies: true,
    sortBy: 'table',
    maxTicketsPerColumn: 20,
    autoScroll: true,
    soundAlerts: true,
    colorCoding: true
  },
  {
    id: 'grill-only',
    name: 'Grill Station',
    stations: ['grill'],
    columns: 1,
    showTimer: true,
    showCustomer: false,
    showServer: false,
    showTable: true,
    showSource: false,
    showAllergies: true,
    sortBy: 'priority',
    maxTicketsPerColumn: 15,
    autoScroll: true,
    soundAlerts: true,
    colorCoding: true
  }
]

/**
 * Station Management Functions
 */
export const stationUtils = {
  /**
   * Route a menu item to the appropriate station
   */
  routeItemToStation: (item: OrderItem): StationId => {
    // Check exact item name match first
    const itemKey = item.name.toLowerCase().trim()
    if (ITEM_STATION_ROUTING[itemKey]) {
      return ITEM_STATION_ROUTING[itemKey]
    }

    // Check partial matches
    for (const [key, station] of Object.entries(ITEM_STATION_ROUTING)) {
      if (itemKey.includes(key)) {
        return station
      }
    }

    // Check category routing
    const categoryKey = item.category.toLowerCase().trim()
    if (CATEGORY_STATION_ROUTING[categoryKey]) {
      return CATEGORY_STATION_ROUTING[categoryKey]
    }

    // Check partial category matches
    for (const [key, station] of Object.entries(CATEGORY_STATION_ROUTING)) {
      if (categoryKey.includes(key)) {
        return station
      }
    }

    // Default fallback to expo
    return 'expo'
  },

  /**
   * Get all active stations
   */
  getActiveStations: (stations: Record<StationId, KitchenStation> = DEFAULT_STATIONS): KitchenStation[] => {
    return Object.values(stations)
      .filter(station => station.isActive)
      .sort((a, b) => a.position - b.position)
  },

  /**
   * Get station by ID with fallback
   */
  getStation: (
    id: StationId, 
    stations: Record<StationId, KitchenStation> = DEFAULT_STATIONS
  ): KitchenStation => {
    return stations[id] || DEFAULT_STATIONS.expo
  },

  /**
   * Check if station can accept more orders
   */
  canAcceptOrder: (
    stationId: StationId,
    currentTicketCount: number,
    stations: Record<StationId, KitchenStation> = DEFAULT_STATIONS
  ): boolean => {
    const station = stations[stationId]
    if (!station || !station.isActive) return false
    return currentTicketCount < station.maxCapacity
  },

  /**
   * Get stations that are over capacity
   */
  getOverCapacityStations: (
    ticketCounts: Record<StationId, number>,
    stations: Record<StationId, KitchenStation> = DEFAULT_STATIONS
  ): StationId[] => {
    return Object.entries(ticketCounts)
      .filter(([stationId, count]) => {
        const station = stations[stationId as StationId]
        return station && count > station.maxCapacity
      })
      .map(([stationId]) => stationId as StationId)
  },

  /**
   * Calculate station load percentage
   */
  getStationLoad: (
    stationId: StationId,
    currentTicketCount: number,
    stations: Record<StationId, KitchenStation> = DEFAULT_STATIONS
  ): number => {
    const station = stations[stationId]
    if (!station) return 0
    return Math.min(100, Math.round((currentTicketCount / station.maxCapacity) * 100))
  },

  /**
   * Get recommended station view based on current load
   */
  getRecommendedView: (
    ticketCounts: Record<StationId, number>,
    stations: Record<StationId, KitchenStation> = DEFAULT_STATIONS
  ): string => {
    const overCapacityStations = stationUtils.getOverCapacityStations(ticketCounts, stations)
    
    if (overCapacityStations.length === 0) {
      return 'all-stations'
    }

    // If only hot stations are over capacity, show hot-stations view
    if (overCapacityStations.every(id => ['grill', 'fryer'].includes(id))) {
      return 'hot-stations'
    }

    // If only cold stations are over capacity, show cold-stations view
    if (overCapacityStations.every(id => ['salad', 'pantry', 'dessert'].includes(id))) {
      return 'cold-stations'
    }

    // Otherwise show all stations
    return 'all-stations'
  },

  /**
   * Validate station configuration
   */
  validateStation: (station: Partial<KitchenStation>): string[] => {
    const errors: string[] = []

    if (!station.id) errors.push('Station ID is required')
    if (!station.name) errors.push('Station name is required')
    if (!station.displayName) errors.push('Display name is required')
    if (!station.color) errors.push('Color is required')
    if (typeof station.position !== 'number') errors.push('Position must be a number')
    if (typeof station.maxCapacity !== 'number' || station.maxCapacity < 1) {
      errors.push('Max capacity must be a positive number')
    }
    if (typeof station.averageCookTime !== 'number' || station.averageCookTime < 0) {
      errors.push('Average cook time must be a non-negative number')
    }

    return errors
  },

  /**
   * Create custom station configuration
   */
  createCustomStation: (
    id: StationId,
    config: Partial<KitchenStation>
  ): KitchenStation => {
    const baseStation = DEFAULT_STATIONS[id] || DEFAULT_STATIONS.expo
    return {
      ...baseStation,
      ...config,
      id
    }
  },

  /**
   * Filter stations by criteria
   */
  filterStations: (
    stations: Record<StationId, KitchenStation>,
    filters: {
      active?: boolean
      maxCapacity?: number
      averageCookTime?: number
    }
  ): KitchenStation[] => {
    return Object.values(stations).filter(station => {
      if (filters.active !== undefined && station.isActive !== filters.active) {
        return false
      }
      if (filters.maxCapacity !== undefined && station.maxCapacity < filters.maxCapacity) {
        return false
      }
      if (filters.averageCookTime !== undefined && station.averageCookTime > filters.averageCookTime) {
        return false
      }
      return true
    })
  }
}

/**
 * Station View Management Functions
 */
export const stationViewUtils = {
  /**
   * Get station view by ID
   */
  getStationView: (id: string, views: StationViewConfig[] = DEFAULT_STATION_VIEWS): StationViewConfig | undefined => {
    return views.find(view => view.id === id)
  },

  /**
   * Create custom station view
   */
  createStationView: (config: Partial<StationViewConfig>): StationViewConfig => {
    return {
      id: config.id || `custom-${Date.now()}`,
      name: config.name || 'Custom View',
      stations: config.stations || ['expo'],
      columns: config.columns || 1,
      showTimer: config.showTimer ?? true,
      showCustomer: config.showCustomer ?? false,
      showServer: config.showServer ?? false,
      showTable: config.showTable ?? true,
      showSource: config.showSource ?? false,
      showAllergies: config.showAllergies ?? true,
      sortBy: config.sortBy || 'time',
      maxTicketsPerColumn: config.maxTicketsPerColumn || 10,
      autoScroll: config.autoScroll ?? true,
      soundAlerts: config.soundAlerts ?? true,
      colorCoding: config.colorCoding ?? true
    }
  },

  /**
   * Validate station view configuration
   */
  validateStationView: (view: Partial<StationViewConfig>): string[] => {
    const errors: string[] = []

    if (!view.id) errors.push('View ID is required')
    if (!view.name) errors.push('View name is required')
    if (!view.stations || view.stations.length === 0) {
      errors.push('At least one station must be selected')
    }
    if (typeof view.columns !== 'number' || view.columns < 1 || view.columns > 8) {
      errors.push('Columns must be between 1 and 8')
    }
    if (typeof view.maxTicketsPerColumn !== 'number' || view.maxTicketsPerColumn < 1) {
      errors.push('Max tickets per column must be a positive number')
    }

    return errors
  }
}

/**
 * Export station configurations and utilities
 */
export const stationConfig = {
  stations: DEFAULT_STATIONS,
  views: DEFAULT_STATION_VIEWS,
  routing: {
    items: ITEM_STATION_ROUTING,
    categories: CATEGORY_STATION_ROUTING
  },
  utils: stationUtils,
  viewUtils: stationViewUtils
}