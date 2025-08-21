/**
 * KDS Components Index
 * 
 * Central export point for all Kitchen Display System components.
 * This provides a clean API for importing KDS components throughout the application.
 */

// Core KDS Components
export { default as Ticket } from './ticket'
export { default as Timer, MultiTimer, AlertTimer } from './timer'
export { default as StationView, MultiStationView, StationPerformance } from './station-view'
export { default as KdsHeader, AlertBanner, CompactHeader } from './header'
export { default as AllDayViewComponent, AllDaySummary } from './all-day-view'

// Re-export specific named exports for convenience
export {
  Ticket as KdsTicket,
  Timer as KdsTimer,
  StationView as KdsStationView,
  AllDayViewComponent as KdsAllDayView
}

// Export component prop types for external use
export type {
  // From ticket.tsx
  TicketProps,
  
  // From timer.tsx
  TimerProps,
  MultiTimerProps,
  AlertTimerProps,
  
  // From station-view.tsx
  StationViewProps,
  MultiStationViewProps,
  StationPerformanceProps,
  
  // From header.tsx
  KdsHeaderProps,
  AlertBannerProps,
  CompactHeaderProps,
  
  // From all-day-view.tsx
  AllDayViewProps,
  AllDaySummaryProps
} from '../types'

// Component collections for easier batch imports
export const KdsTicketComponents = {
  Ticket,
  Timer,
  MultiTimer,
  AlertTimer
}

export const KdsStationComponents = {
  StationView,
  MultiStationView,
  StationPerformance
}

export const KdsLayoutComponents = {
  KdsHeader,
  AlertBanner,
  CompactHeader
}

export const KdsViewComponents = {
  AllDayViewComponent,
  AllDaySummary
}

// All components in one collection
export const AllKdsComponents = {
  ...KdsTicketComponents,
  ...KdsStationComponents,
  ...KdsLayoutComponents,
  ...KdsViewComponents
}

/**
 * KDS Component Categories
 * Useful for documentation and component organization
 */
export const KDS_COMPONENT_CATEGORIES = {
  TICKETS: [
    'Ticket',
    'Timer', 
    'MultiTimer',
    'AlertTimer'
  ],
  STATIONS: [
    'StationView',
    'MultiStationView', 
    'StationPerformance'
  ],
  LAYOUT: [
    'KdsHeader',
    'AlertBanner',
    'CompactHeader'
  ],
  VIEWS: [
    'AllDayViewComponent',
    'AllDaySummary'
  ]
} as const

/**
 * Component Display Names
 * For debugging and development tools
 */
export const KDS_COMPONENT_NAMES = {
  Ticket: 'KDS Ticket',
  Timer: 'KDS Timer',
  MultiTimer: 'KDS Multi Timer',
  AlertTimer: 'KDS Alert Timer',
  StationView: 'KDS Station View',
  MultiStationView: 'KDS Multi Station View',
  StationPerformance: 'KDS Station Performance',
  KdsHeader: 'KDS Header',
  AlertBanner: 'KDS Alert Banner',
  CompactHeader: 'KDS Compact Header',
  AllDayViewComponent: 'KDS All Day View',
  AllDaySummary: 'KDS All Day Summary'
} as const

/**
 * Default Props for Components
 * Provides sensible defaults for KDS components
 */
export const KDS_DEFAULT_PROPS = {
  Timer: {
    showSeconds: true,
    showTarget: true,
    warningThreshold: 10,
    urgentThreshold: 15,
    size: 'medium' as const,
    format: 'digital' as const
  },
  StationView: {
    showHeader: true,
    autoScroll: true
  },
  KdsHeader: {
    showMetrics: true,
    showClock: true,
    compactMode: false
  },
  AllDayView: {
    groupByStation: true,
    showCompleted: true,
    showModifiers: true,
    sortBy: 'quantity' as const
  }
} as const

/**
 * Component Version Information
 * Useful for debugging and compatibility checks
 */
export const KDS_COMPONENT_VERSION = '1.0.0'

export const KDS_COMPONENT_INFO = {
  version: KDS_COMPONENT_VERSION,
  buildDate: new Date().toISOString(),
  components: Object.keys(AllKdsComponents).length,
  categories: Object.keys(KDS_COMPONENT_CATEGORIES).length
} as const

/**
 * Utility function to check if a component is a KDS component
 */
export function isKdsComponent(componentName: string): boolean {
  return componentName in AllKdsComponents
}

/**
 * Utility function to get component category
 */
export function getKdsComponentCategory(componentName: string): keyof typeof KDS_COMPONENT_CATEGORIES | null {
  for (const [category, components] of Object.entries(KDS_COMPONENT_CATEGORIES)) {
    if (components.includes(componentName as any)) {
      return category as keyof typeof KDS_COMPONENT_CATEGORIES
    }
  }
  return null
}

/**
 * Utility function to get all components in a category
 */
export function getKdsComponentsByCategory(category: keyof typeof KDS_COMPONENT_CATEGORIES) {
  return KDS_COMPONENT_CATEGORIES[category]
}

/**
 * Development helper to log component information
 */
export function logKdsComponentInfo(): void {
  if (process.env.NODE_ENV === 'development') {
    console.group('KDS Components Information')
    console.log('Version:', KDS_COMPONENT_INFO.version)
    console.log('Build Date:', KDS_COMPONENT_INFO.buildDate)
    console.log('Total Components:', KDS_COMPONENT_INFO.components)
    console.log('Categories:', Object.keys(KDS_COMPONENT_CATEGORIES))
    console.log('Available Components:', Object.keys(AllKdsComponents))
    console.groupEnd()
  }
}

// Initialize component info logging in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Only log once per session
  const hasLogged = sessionStorage.getItem('kds-components-logged')
  if (!hasLogged) {
    logKdsComponentInfo()
    sessionStorage.setItem('kds-components-logged', 'true')
  }
}