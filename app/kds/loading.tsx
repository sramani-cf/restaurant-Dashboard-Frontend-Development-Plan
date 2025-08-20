/**
 * KDS Loading State Component
 * 
 * Displays loading state with kitchen-appropriate styling and animations.
 * Shows loading skeletons that match the actual ticket layout.
 */

export default function KdsLoading() {
  return (
    <div className="h-full w-full bg-black text-white">
      {/* Header Loading */}
      <div className="h-20 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {/* Logo/Title skeleton */}
          <div className="w-8 h-8 bg-gray-700 rounded animate-pulse" />
          <div className="w-48 h-8 bg-gray-700 rounded animate-pulse" />
        </div>
        
        {/* Station tabs skeleton */}
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-24 h-10 bg-gray-700 rounded animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
        
        {/* Right side controls skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-32 h-8 bg-gray-700 rounded animate-pulse" />
          <div className="w-10 h-10 bg-gray-700 rounded animate-pulse" />
        </div>
      </div>

      {/* Main Content Loading */}
      <div className="h-[calc(100vh-5rem)] p-4">
        {/* Loading message */}
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-3 text-lg text-gray-300">
            <LoadingSpinner />
            <span>Loading Kitchen Display System...</span>
          </div>
        </div>

        {/* Ticket Grid Skeleton */}
        <div className="grid grid-cols-4 gap-4 h-[calc(100%-6rem)]">
          {[1, 2, 3, 4].map((column) => (
            <div key={column} className="space-y-4">
              <div className="text-center">
                <div className="w-24 h-6 bg-gray-700 rounded mx-auto animate-pulse" />
              </div>
              
              {/* Ticket skeletons per column */}
              {[1, 2, 3].map((ticket) => (
                <TicketSkeleton
                  key={`${column}-${ticket}`}
                  delay={column * 200 + ticket * 100}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Connection status loading */}
      <div className="fixed top-4 left-4 flex items-center gap-2 bg-gray-800 px-3 py-2 rounded border border-gray-600">
        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
        <span className="text-xs text-gray-300">Connecting...</span>
      </div>
    </div>
  )
}

/**
 * Loading Spinner Component
 */
function LoadingSpinner() {
  return (
    <div className="relative">
      <div className="w-6 h-6 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
    </div>
  )
}

/**
 * Ticket Skeleton Component
 */
function TicketSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4 space-y-3 animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Ticket header */}
      <div className="flex items-center justify-between">
        <div className="w-16 h-6 bg-gray-700 rounded" />
        <div className="w-12 h-4 bg-gray-600 rounded" />
      </div>
      
      {/* Order info */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="w-20 h-4 bg-gray-700 rounded" />
          <div className="w-8 h-4 bg-gray-600 rounded" />
        </div>
        <div className="w-32 h-4 bg-gray-700 rounded" />
      </div>
      
      {/* Items */}
      <div className="space-y-2 pt-2 border-t border-gray-700">
        {[1, 2, 3].map((item) => (
          <div key={item} className="space-y-1">
            <div className="flex justify-between">
              <div className="w-24 h-4 bg-gray-700 rounded" />
              <div className="w-6 h-4 bg-gray-600 rounded" />
            </div>
            <div className="w-40 h-3 bg-gray-600 rounded" />
          </div>
        ))}
      </div>
      
      {/* Footer buttons */}
      <div className="flex gap-2 pt-3 border-t border-gray-700">
        <div className="flex-1 h-12 bg-gray-700 rounded" />
        <div className="w-12 h-12 bg-gray-700 rounded" />
        <div className="w-12 h-12 bg-gray-700 rounded" />
      </div>
    </div>
  )
}

/**
 * Progressive Loading States
 */
export function KdsLoadingStates() {
  return (
    <div className="h-full w-full bg-black text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="text-4xl font-bold text-white mb-4">
            Kitchen Display System
          </div>
          
          {/* Progressive loading indicators */}
          <div className="space-y-4">
            <LoadingStep 
              step="Connecting to server..."
              status="loading"
              delay={0}
            />
            <LoadingStep 
              step="Loading kitchen stations..."
              status="pending"
              delay={1000}
            />
            <LoadingStep 
              step="Fetching active orders..."
              status="pending"
              delay={2000}
            />
            <LoadingStep 
              step="Initializing real-time updates..."
              status="pending"
              delay={3000}
            />
            <LoadingStep 
              step="Ready to serve!"
              status="pending"
              delay={4000}
            />
          </div>
          
          {/* Overall progress bar */}
          <div className="w-80 bg-gray-700 rounded-full h-2 mx-auto">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: '0%',
                animation: 'loading-progress 5s ease-out forwards'
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Loading animation styles */}
      <style jsx>{`
        @keyframes loading-progress {
          0% { width: 0%; }
          20% { width: 20%; }
          40% { width: 40%; }
          60% { width: 60%; }
          80% { width: 80%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}

/**
 * Individual loading step component
 */
function LoadingStep({ 
  step, 
  status, 
  delay 
}: { 
  step: string
  status: 'loading' | 'complete' | 'pending'
  delay: number 
}) {
  return (
    <div 
      className={`flex items-center gap-3 transition-opacity duration-500 ${
        status === 'pending' ? 'opacity-50' : 'opacity-100'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {status === 'loading' && (
        <div className="w-5 h-5 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
      )}
      {status === 'complete' && (
        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
      {status === 'pending' && (
        <div className="w-5 h-5 border-2 border-gray-600 rounded-full" />
      )}
      <span className="text-gray-300">{step}</span>
    </div>
  )
}

/**
 * Minimal loading for quick transitions
 */
export function KdsMinimalLoading() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner />
        <div className="mt-4 text-white text-lg">Updating...</div>
      </div>
    </div>
  )
}