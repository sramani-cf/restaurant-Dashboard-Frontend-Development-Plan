/**
 * KDS Error Boundary Component
 * 
 * Handles errors in the KDS with kitchen-appropriate error displays
 * and recovery options. Critical for operational reliability.
 */

'use client'

import { useEffect } from 'react'

interface KdsErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function KdsError({ error, reset }: KdsErrorProps) {
  useEffect(() => {
    // Log error for debugging
    console.error('KDS Error:', error)
    
    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Send error to monitoring service
      // Example: Sentry, LogRocket, etc.
    }
  }, [error])

  const errorType = getErrorType(error)
  const errorSeverity = getErrorSeverity(error)

  return (
    <div className="h-full w-full bg-black text-white flex flex-col">
      {/* Error header */}
      <div className={`
        h-20 flex items-center justify-between px-6
        ${errorSeverity === 'critical' 
          ? 'bg-red-900 border-b-2 border-red-500' 
          : errorSeverity === 'high'
          ? 'bg-orange-900 border-b-2 border-orange-500'
          : 'bg-gray-900 border-b border-gray-700'
        }
      `}>
        <div className="flex items-center gap-4">
          <ErrorIcon severity={errorSeverity} />
          <div>
            <h1 className="text-xl font-bold">Kitchen Display System</h1>
            <p className="text-sm text-gray-300">Error Detected</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-medium">
              {new Date().toLocaleTimeString()}
            </div>
            <div className="text-xs text-gray-400">
              Status: {errorSeverity.toUpperCase()}
            </div>
          </div>
          <div className={`w-3 h-3 rounded-full ${
            errorSeverity === 'critical' ? 'bg-red-500 animate-pulse' :
            errorSeverity === 'high' ? 'bg-orange-500' :
            'bg-yellow-500'
          }`} />
        </div>
      </div>

      {/* Error content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl text-center space-y-8">
          {/* Error illustration */}
          <div className="text-6xl mb-6">
            {errorSeverity === 'critical' ? '🚨' : 
             errorSeverity === 'high' ? '⚠️' : '❌'}
          </div>
          
          {/* Error title */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              {getErrorTitle(errorType, errorSeverity)}
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              {getErrorMessage(errorType)}
            </p>
          </div>

          {/* Error details (for development) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left bg-gray-900 p-4 rounded border border-gray-700">
              <summary className="cursor-pointer font-medium mb-2">
                Technical Details (Development Mode)
              </summary>
              <pre className="text-sm text-gray-400 overflow-auto">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
                {error.digest && `\n\nDigest: ${error.digest}`}
              </pre>
            </details>
          )}

          {/* Recovery actions */}
          <div className="space-y-4">
            <div className="flex gap-4 justify-center">
              <button
                onClick={reset}
                className="
                  kds-button bg-blue-600 hover:bg-blue-500
                  text-white px-8 py-3 rounded-lg
                  flex items-center gap-2
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
              >
                <RefreshIcon />
                Try Again
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="
                  kds-button bg-gray-700 hover:bg-gray-600
                  text-white px-8 py-3 rounded-lg
                  flex items-center gap-2
                  focus:outline-none focus:ring-2 focus:ring-gray-500
                "
              >
                <ReloadIcon />
                Reload Page
              </button>
            </div>

            {errorSeverity === 'critical' && (
              <div className="space-y-3">
                <div className="text-sm text-red-300 font-medium">
                  Critical Error - Alternative Actions:
                </div>
                <div className="flex gap-3 justify-center text-sm">
                  <button
                    onClick={() => window.location.href = '/dashboard'}
                    className="
                      kds-button bg-red-700 hover:bg-red-600
                      text-white px-4 py-2 rounded
                      focus:outline-none focus:ring-2 focus:ring-red-500
                    "
                  >
                    Return to Dashboard
                  </button>
                  <button
                    onClick={() => window.location.href = '/'}
                    className="
                      kds-button bg-gray-700 hover:bg-gray-600
                      text-white px-4 py-2 rounded
                      focus:outline-none focus:ring-2 focus:ring-gray-500
                    "
                  >
                    Go to Home
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Troubleshooting tips */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 text-left">
            <h3 className="font-bold text-lg mb-3">Troubleshooting Tips:</h3>
            <ul className="space-y-2 text-gray-300">
              {getTroubleshootingTips(errorType).map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support information */}
          <div className="text-center text-gray-400 text-sm">
            <p>If the problem persists, please contact IT support:</p>
            <p className="font-mono bg-gray-800 px-2 py-1 rounded inline-block mt-1">
              support@restaurant.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Error type detection
 */
function getErrorType(error: Error): string {
  const message = error.message.toLowerCase()
  
  if (message.includes('network') || message.includes('fetch')) {
    return 'network'
  }
  if (message.includes('websocket') || message.includes('connection')) {
    return 'connection'
  }
  if (message.includes('permission') || message.includes('unauthorized')) {
    return 'permission'
  }
  if (message.includes('parse') || message.includes('json')) {
    return 'data'
  }
  if (message.includes('timeout')) {
    return 'timeout'
  }
  
  return 'unknown'
}

/**
 * Error severity detection
 */
function getErrorSeverity(error: Error): 'low' | 'medium' | 'high' | 'critical' {
  const message = error.message.toLowerCase()
  
  if (message.includes('critical') || message.includes('fatal') || 
      message.includes('cannot read') || message.includes('undefined')) {
    return 'critical'
  }
  if (message.includes('network') || message.includes('connection') ||
      message.includes('timeout')) {
    return 'high'
  }
  if (message.includes('warning') || message.includes('deprecated')) {
    return 'low'
  }
  
  return 'medium'
}

/**
 * Error title generator
 */
function getErrorTitle(type: string, severity: 'low' | 'medium' | 'high' | 'critical'): string {
  if (severity === 'critical') {
    return 'Critical System Error'
  }
  
  switch (type) {
    case 'network':
      return 'Network Connection Error'
    case 'connection':
      return 'Server Connection Lost'
    case 'permission':
      return 'Access Permission Error'
    case 'data':
      return 'Data Processing Error'
    case 'timeout':
      return 'Request Timeout Error'
    default:
      return 'System Error Occurred'
  }
}

/**
 * Error message generator
 */
function getErrorMessage(type: string): string {
  switch (type) {
    case 'network':
      return 'Unable to connect to the server. Please check your network connection and try again.'
    case 'connection':
      return 'The connection to the kitchen system has been lost. Attempting to reconnect...'
    case 'permission':
      return 'You do not have permission to access this resource. Please contact your manager.'
    case 'data':
      return 'There was a problem processing the order data. The system is attempting to recover.'
    case 'timeout':
      return 'The request took too long to complete. The server might be busy.'
    default:
      return 'An unexpected error has occurred. Our team has been notified and is working to resolve it.'
  }
}

/**
 * Troubleshooting tips generator
 */
function getTroubleshootingTips(type: string): string[] {
  const commonTips = [
    'Check if other kitchen terminals are working',
    'Verify the internet connection is stable',
    'Try refreshing the page (F5 or Ctrl+R)',
  ]
  
  switch (type) {
    case 'network':
      return [
        ...commonTips,
        'Check network cables and WiFi connection',
        'Restart the network router if needed',
        'Contact IT if network issues persist'
      ]
    case 'connection':
      return [
        ...commonTips,
        'Wait 30 seconds for automatic reconnection',
        'Check server status with IT team',
        'Use backup order management if available'
      ]
    case 'permission':
      return [
        'Verify you are logged in with correct account',
        'Contact manager to check user permissions',
        'Try logging out and back in',
        'Clear browser cache and cookies'
      ]
    case 'data':
      return [
        ...commonTips,
        'Check if orders are displaying correctly',
        'Verify all order information is complete',
        'Report data inconsistencies to management'
      ]
    default:
      return commonTips
  }
}

/**
 * Error severity icon
 */
function ErrorIcon({ severity }: { severity: string }) {
  const iconClass = `w-8 h-8 ${
    severity === 'critical' ? 'text-red-400' :
    severity === 'high' ? 'text-orange-400' :
    'text-yellow-400'
  }`

  return (
    <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  )
}

/**
 * Refresh icon
 */
function RefreshIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  )
}

/**
 * Reload icon
 */
function ReloadIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  )
}