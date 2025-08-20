import { setupWorker } from 'msw/browser'
import { apiHandlers } from './api-handlers'

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...apiHandlers)

// Start the worker conditionally for development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  worker.start({
    onUnhandledRequest: 'warn',
  })
}