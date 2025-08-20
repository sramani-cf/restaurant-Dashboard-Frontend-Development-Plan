// Analytics tracking for user behavior and business metrics

interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
  timestamp?: Date
}

interface UserProperties {
  id: string
  email?: string
  role?: string
  restaurantId?: string
  createdAt?: Date
}

class Analytics {
  private queue: AnalyticsEvent[] = []
  private isInitialized = false
  private userId: string | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.initialize()
    }
  }

  private initialize() {
    // Initialize Google Analytics
    if (process.env.NEXT_PUBLIC_GA_ID) {
      this.initializeGA()
    }

    // Initialize Mixpanel
    if (process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
      this.initializeMixpanel()
    }

    this.isInitialized = true
    this.flushQueue()
  }

  private initializeGA() {
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`
    script.async = true
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', process.env.NEXT_PUBLIC_GA_ID)
  }

  private initializeMixpanel() {
    // Mixpanel initialization would go here
    // This is a placeholder for the actual implementation
  }

  private flushQueue() {
    while (this.queue.length > 0) {
      const event = this.queue.shift()
      if (event) {
        this.sendEvent(event)
      }
    }
  }

  private sendEvent(event: AnalyticsEvent) {
    // Send to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.event, {
        ...event.properties,
        user_id: this.userId,
        timestamp: event.timestamp || new Date(),
      })
    }

    // Send to Mixpanel (if implemented)
    // if (window.mixpanel) {
    //   window.mixpanel.track(event.event, event.properties)
    // }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', event.event, event.properties)
    }
  }

  // Public methods

  track(event: string, properties?: Record<string, any>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: new Date(),
    }

    if (this.isInitialized) {
      this.sendEvent(analyticsEvent)
    } else {
      this.queue.push(analyticsEvent)
    }
  }

  identify(user: UserProperties) {
    this.userId = user.id

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('set', { user_id: user.id })
      window.gtag('event', 'user_identified', {
        user_properties: user,
      })
    }

    // Set user properties in Mixpanel (if implemented)
    // if (window.mixpanel) {
    //   window.mixpanel.identify(user.id)
    //   window.mixpanel.people.set(user)
    // }
  }

  page(name?: string, properties?: Record<string, any>) {
    this.track('page_view', {
      page_name: name || document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      ...properties,
    })
  }

  // Business-specific events

  trackOrder(order: {
    id: string
    total: number
    items: number
    type: string
    paymentMethod?: string
  }) {
    this.track('order_placed', {
      order_id: order.id,
      value: order.total,
      currency: 'USD',
      items_count: order.items,
      order_type: order.type,
      payment_method: order.paymentMethod,
    })
  }

  trackMenuView(item: {
    id: string
    name: string
    category: string
    price: number
  }) {
    this.track('menu_item_viewed', {
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      price: item.price,
    })
  }

  trackMenuUpdate(action: 'add' | 'edit' | 'delete', item: {
    id: string
    name: string
    category: string
  }) {
    this.track(`menu_item_${action}`, {
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
    })
  }

  trackReservation(reservation: {
    id: string
    partySize: number
    dateTime: Date
    status: string
  }) {
    this.track('reservation_created', {
      reservation_id: reservation.id,
      party_size: reservation.partySize,
      reservation_date: reservation.dateTime,
      status: reservation.status,
    })
  }

  trackInventoryAlert(item: {
    id: string
    name: string
    currentQty: number
    minQty: number
  }) {
    this.track('inventory_low_stock', {
      item_id: item.id,
      item_name: item.name,
      current_quantity: item.currentQty,
      minimum_quantity: item.minQty,
      alert_severity: item.currentQty === 0 ? 'critical' : 'warning',
    })
  }

  trackReportGenerated(report: {
    type: string
    dateRange: string
    format: string
  }) {
    this.track('report_generated', {
      report_type: report.type,
      date_range: report.dateRange,
      export_format: report.format,
    })
  }

  trackError(error: {
    message: string
    code?: string
    context?: string
  }) {
    this.track('error_occurred', {
      error_message: error.message,
      error_code: error.code,
      error_context: error.context,
    })
  }

  trackFeatureUsage(feature: string, action: string, metadata?: Record<string, any>) {
    this.track('feature_used', {
      feature_name: feature,
      action: action,
      ...metadata,
    })
  }

  // Performance tracking

  trackPerformance(metric: {
    name: string
    value: number
    unit?: string
  }) {
    this.track('performance_metric', {
      metric_name: metric.name,
      metric_value: metric.value,
      metric_unit: metric.unit || 'ms',
    })
  }

  // Session tracking

  startSession() {
    this.track('session_started', {
      session_id: this.generateSessionId(),
      timestamp: new Date(),
    })
  }

  endSession() {
    this.track('session_ended', {
      timestamp: new Date(),
    })
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
}

// Singleton instance
const analytics = new Analytics()

// Export convenience functions
export const track = analytics.track.bind(analytics)
export const identify = analytics.identify.bind(analytics)
export const page = analytics.page.bind(analytics)
export const trackOrder = analytics.trackOrder.bind(analytics)
export const trackMenuView = analytics.trackMenuView.bind(analytics)
export const trackMenuUpdate = analytics.trackMenuUpdate.bind(analytics)
export const trackReservation = analytics.trackReservation.bind(analytics)
export const trackInventoryAlert = analytics.trackInventoryAlert.bind(analytics)
export const trackReportGenerated = analytics.trackReportGenerated.bind(analytics)
export const trackError = analytics.trackError.bind(analytics)
export const trackFeatureUsage = analytics.trackFeatureUsage.bind(analytics)
export const trackPerformance = analytics.trackPerformance.bind(analytics)
export const startSession = analytics.startSession.bind(analytics)
export const endSession = analytics.endSession.bind(analytics)

export default analytics

// Type declarations for window object
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
    mixpanel?: any
  }
}