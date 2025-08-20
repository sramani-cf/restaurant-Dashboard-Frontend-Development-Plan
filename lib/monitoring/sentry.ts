import * as Sentry from '@sentry/nextjs'

// Initialize Sentry for error tracking and performance monitoring
export function initSentry() {
  const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

  if (!SENTRY_DSN) {
    console.warn('Sentry DSN not configured - error tracking disabled')
    return
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.NODE_ENV,
    
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    
    // Release tracking
    release: process.env.NEXT_PUBLIC_APP_VERSION,
    
    // Integrations
    integrations: [
      new Sentry.BrowserTracing({
        // Set sampling rate for performance monitoring
        tracingOrigins: [
          'localhost',
          process.env.NEXT_PUBLIC_APP_URL || '',
          /^\//,
        ],
        // Capture interactions
        routingInstrumentation: Sentry.nextRouterInstrumentation,
      }),
      new Sentry.Replay({
        // Mask sensitive content
        maskAllText: false,
        maskAllInputs: true,
        blockAllMedia: false,
        // Sampling
        sessionSampleRate: 0.1,
        errorSampleRate: 1.0,
      }),
    ],
    
    // Filtering
    beforeSend(event, hint) {
      // Filter out known issues or sensitive data
      if (event.exception) {
        const error = hint.originalException
        
        // Filter out network errors in development
        if (
          process.env.NODE_ENV === 'development' &&
          error && 
          error.message &&
          error.message.includes('NetworkError')
        ) {
          return null
        }
        
        // Filter out specific errors
        const ignoredErrors = [
          'ResizeObserver loop limit exceeded',
          'Non-Error promise rejection captured',
          'Network request failed',
        ]
        
        if (error?.message && ignoredErrors.some(msg => error.message.includes(msg))) {
          return null
        }
      }
      
      // Remove sensitive data
      if (event.request) {
        // Remove auth headers
        if (event.request.headers) {
          delete event.request.headers['Authorization']
          delete event.request.headers['Cookie']
        }
        
        // Remove sensitive query params
        if (event.request.query_string) {
          const sensitiveParams = ['token', 'api_key', 'secret']
          sensitiveParams.forEach(param => {
            const regex = new RegExp(`${param}=[^&]*`, 'gi')
            event.request.query_string = event.request.query_string.replace(regex, `${param}=[FILTERED]`)
          })
        }
      }
      
      return event
    },
    
    // Breadcrumbs
    beforeBreadcrumb(breadcrumb) {
      // Filter out noisy breadcrumbs
      if (breadcrumb.category === 'console' && breadcrumb.level === 'debug') {
        return null
      }
      
      // Add custom breadcrumbs for important actions
      if (breadcrumb.category === 'ui.click') {
        const target = breadcrumb.data?.target
        if (target?.includes('button') || target?.includes('btn')) {
          breadcrumb.message = `User clicked: ${target}`
        }
      }
      
      return breadcrumb
    },
  })
}

// Custom error boundary
export function captureException(error: Error, context?: Record<string, any>) {
  console.error('Error captured:', error)
  
  if (typeof window !== 'undefined' && Sentry.getCurrentHub().getClient()) {
    Sentry.withScope((scope) => {
      if (context) {
        scope.setContext('additional', context)
      }
      Sentry.captureException(error)
    })
  }
}

// Track custom events
export function trackEvent(eventName: string, data?: Record<string, any>) {
  if (typeof window !== 'undefined' && Sentry.getCurrentHub().getClient()) {
    Sentry.addBreadcrumb({
      category: 'custom',
      message: eventName,
      level: 'info',
      data,
    })
  }
}

// User identification
export function identifyUser(user: { id: string; email?: string; role?: string }) {
  if (typeof window !== 'undefined' && Sentry.getCurrentHub().getClient()) {
    Sentry.setUser({
      id: user.id,
      email: user.email,
      role: user.role,
    })
  }
}

// Performance monitoring
export function startTransaction(name: string, op: string = 'navigation') {
  if (typeof window !== 'undefined' && Sentry.getCurrentHub().getClient()) {
    return Sentry.startTransaction({ name, op })
  }
  return null
}

// Add context to errors
export function setContext(key: string, context: Record<string, any>) {
  if (typeof window !== 'undefined' && Sentry.getCurrentHub().getClient()) {
    Sentry.setContext(key, context)
  }
}

// Clear user session
export function clearUser() {
  if (typeof window !== 'undefined' && Sentry.getCurrentHub().getClient()) {
    Sentry.configureScope((scope) => scope.clear())
  }
}