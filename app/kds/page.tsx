/**
 * Kitchen Display System (KDS) Main Page
 * 
 * The main interface for the Kitchen Display System featuring:
 * - Real-time order ticket display
 * - Station-based views and filtering
 * - Touch-optimized controls for kitchen environment
 * - Auto-refreshing data with WebSocket support
 * - Keyboard shortcuts for non-touch operation
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AppShell } from '@/components/layout';
import {
  KdsTicket,
  KdsMetrics,
  AllDayView,
  StationViewConfig,
  StationId,
  TicketPriority,
  KitchenStation
} from '../../lib/kds/types'
import {
  KdsHeader,
  StationView,
  MultiStationView,
  AllDayViewComponent,
  AlertBanner
} from '../../components/kds'
import { 
  DEFAULT_STATIONS,
  DEFAULT_STATION_VIEWS,
  stationUtils 
} from '../../lib/kds/stations'
import kdsApi, { useKdsRealTime } from '../../lib/kds/data'
import { keyboardUtils, soundUtils, performanceUtils } from '../../lib/kds/utils'

export default function KdsPage() {
  // Core state
  const [tickets, setTickets] = useState<KdsTicket[]>([])
  const [metrics, setMetrics] = useState<KdsMetrics | null>(null)
  const [allDayView, setAllDayView] = useState<AllDayView | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // View state
  const [currentView, setCurrentView] = useState<string>('all-stations')
  const [currentStation, setCurrentStation] = useState<StationId | null>(null)
  const [showAllDay, setShowAllDay] = useState(false)
  const [stationViews] = useState<StationViewConfig[]>(DEFAULT_STATION_VIEWS)
  const [stations] = useState<Record<StationId, KitchenStation>>(DEFAULT_STATIONS)
  
  // UI state
  const [alerts, setAlerts] = useState<Array<{
    id: string
    type: 'info' | 'warning' | 'error'
    message: string
    dismissible: boolean
  }>>([])
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Initialize real-time connection
  const { subscribe } = useKdsRealTime()

  // Get current view configuration
  const currentViewConfig = stationViews.find(v => v.id === currentView) || stationViews[0]
  const activeStations = stationUtils.getActiveStations(stations)

  /**
   * Data fetching functions
   */
  const fetchData = useCallback(async () => {
    try {
      setError(null)
      
      // Fetch tickets for current view
      const stationIds = currentViewConfig.stations
      const fetchedTickets = await kdsApi.fetchTickets(stationIds)
      setTickets(fetchedTickets)
      
      // Fetch metrics
      const fetchedMetrics = await kdsApi.fetchMetrics()
      setMetrics(fetchedMetrics)
      
      // Generate all day view if needed
      if (showAllDay) {
        const allDay = await kdsApi.generateAllDayView(stationIds)
        setAllDayView(allDay)
      }
      
      setLastRefresh(new Date())
      
      // Clear any connection error alerts
      setAlerts(prev => prev.filter(alert => alert.id !== 'connection-error'))
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data'
      setError(errorMessage)
      
      // Add connection error alert
      setAlerts(prev => [
        ...prev.filter(alert => alert.id !== 'connection-error'),
        {
          id: 'connection-error',
          type: 'error',
          message: `Connection error: ${errorMessage}`,
          dismissible: true
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }, [currentViewConfig.stations, showAllDay])

  // Debounced refresh function
  const debouncedRefresh = useCallback(
    performanceUtils.debounce(fetchData, 500),
    [fetchData]
  )

  /**
   * Ticket action handlers
   */
  const handleBumpTicket = useCallback(async (ticketId: string) => {
    try {
      await kdsApi.bumpTicket(ticketId)
      soundUtils.playSound('bump', 0.3)
      debouncedRefresh()
    } catch (error) {
      console.error('Failed to bump ticket:', error)
    }
  }, [debouncedRefresh])

  const handleRecallTicket = useCallback(async (ticketId: string) => {
    try {
      await kdsApi.recallTicket(ticketId)
      soundUtils.playSound('urgent', 0.3)
      debouncedRefresh()
    } catch (error) {
      console.error('Failed to recall ticket:', error)
    }
  }, [debouncedRefresh])

  const handleFireTicket = useCallback(async (ticketId: string) => {
    try {
      await kdsApi.fireTicket(ticketId)
      soundUtils.playSound('urgent', 0.5)
      debouncedRefresh()
    } catch (error) {
      console.error('Failed to fire ticket:', error)
    }
  }, [debouncedRefresh])

  const handlePriorityChange = useCallback(async (ticketId: string, priority: TicketPriority) => {
    try {
      await kdsApi.changePriority(ticketId, priority)
      debouncedRefresh()
    } catch (error) {
      console.error('Failed to change priority:', error)
    }
  }, [debouncedRefresh])

  /**
   * View and navigation handlers
   */
  const handleStationChange = useCallback((stationId: StationId) => {
    setCurrentStation(stationId)
    
    // Find or create a view for this station
    let viewForStation = stationViews.find(v => 
      v.stations.length === 1 && v.stations[0] === stationId
    )
    
    if (viewForStation) {
      setCurrentView(viewForStation.id)
    } else {
      setCurrentView('all-stations')
    }
  }, [stationViews])

  const handleViewChange = useCallback((viewId: string) => {
    setCurrentView(viewId)
    
    const view = stationViews.find(v => v.id === viewId)
    if (view && view.stations.length === 1) {
      setCurrentStation(view.stations[0])
    } else {
      setCurrentStation(null)
    }
  }, [stationViews])

  const handleAllDayToggle = useCallback(() => {
    setShowAllDay(prev => !prev)
  }, [])

  const handleSettingsOpen = useCallback(() => {
    setIsSettingsOpen(true)
  }, [])

  const handleAlertDismiss = useCallback((alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }, [])

  /**
   * Keyboard shortcuts
   */
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const handled = keyboardUtils.handleKeyPress(event, {
      'fire-order': () => {
        // Fire the first urgent ticket or first ticket
        const urgentTicket = tickets.find(t => t.urgency === 'urgent')
        const targetTicket = urgentTicket || tickets[0]
        if (targetTicket) {
          handleFireTicket(targetTicket.id)
        }
      },
      'all-day-view': handleAllDayToggle,
      'help': () => {
        // Show keyboard shortcuts
        const hintsElement = document.getElementById('keyboard-hints')
        if (hintsElement) {
          hintsElement.style.opacity = '1'
          setTimeout(() => {
            hintsElement.style.opacity = '0'
          }, 5000)
        }
      },
      'switch-station': () => {
        // Cycle through stations
        const currentIndex = activeStations.findIndex(s => s.id === currentStation)
        const nextIndex = (currentIndex + 1) % activeStations.length
        handleStationChange(activeStations[nextIndex].id)
      }
    })

    if (handled) {
      event.preventDefault()
    }
  }, [tickets, currentStation, activeStations, handleFireTicket, handleAllDayToggle, handleStationChange])

  /**
   * Effects
   */
  
  // Initial data load and URL params
  useEffect(() => {
    const viewFromUrl = searchParams.get('view')
    const stationFromUrl = searchParams.get('station') as StationId
    const allDayFromUrl = searchParams.get('allday') === 'true'
    
    if (viewFromUrl && stationViews.find(v => v.id === viewFromUrl)) {
      setCurrentView(viewFromUrl)
    }
    
    if (stationFromUrl && stations[stationFromUrl]) {
      setCurrentStation(stationFromUrl)
    }
    
    if (allDayFromUrl) {
      setShowAllDay(true)
    }
    
    fetchData()
  }, [])

  // Auto-refresh data every 5 seconds
  useEffect(() => {
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [fetchData])

  // Real-time updates
  useEffect(() => {
    const unsubscribeNewOrder = subscribe('new_order', (data) => {
      soundUtils.playSound('newOrder', 0.4)
      setAlerts(prev => [
        ...prev,
        {
          id: `new-order-${Date.now()}`,
          type: 'info',
          message: `New order received: ${data.orderNumber}`,
          dismissible: true
        }
      ])
      debouncedRefresh()
    })

    const unsubscribeTicketUpdate = subscribe('ticket_update', () => {
      debouncedRefresh()
    })

    const unsubscribeSystemAlert = subscribe('system_alert', (data) => {
      setAlerts(prev => [
        ...prev,
        {
          id: `system-alert-${Date.now()}`,
          type: data.type || 'warning',
          message: data.message,
          dismissible: true
        }
      ])
    })

    return () => {
      unsubscribeNewOrder()
      unsubscribeTicketUpdate()
      unsubscribeSystemAlert()
    }
  }, [subscribe, debouncedRefresh])

  // Keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  // Update URL when view changes
  useEffect(() => {
    const params = new URLSearchParams()
    if (currentView !== 'all-stations') params.set('view', currentView)
    if (currentStation) params.set('station', currentStation)
    if (showAllDay) params.set('allday', 'true')
    
    const newUrl = `/kds${params.toString() ? `?${params.toString()}` : ''}`
    router.replace(newUrl, { scroll: false })
  }, [currentView, currentStation, showAllDay, router])

  /**
   * Loading and error states
   */
  if (isLoading && !tickets.length) {
    return <div>Loading KDS...</div> // This will use the loading.tsx
  }

  if (error && !tickets.length) {
    throw new Error(error) // This will trigger error.tsx
  }

  if (!metrics) {
    return <div>Loading metrics...</div>
  }

  /**
   * Render
   */
  return (
    <div className="h-full flex flex-col bg-black text-white">
      {/* Alert Banner */}
      {alerts.length > 0 && (
        <AlertBanner
          alerts={alerts}
          onDismiss={handleAlertDismiss}
          className="p-4"
        />
      )}

      {/* Header */}
      <KdsHeader
        currentStation={currentStation || undefined}
        currentView={currentView}
        stationViews={stationViews}
        metrics={metrics}
        stations={stations}
        onStationChange={handleStationChange}
        onViewChange={handleViewChange}
        onSettingsOpen={handleSettingsOpen}
        onAllDayToggle={handleAllDayToggle}
        onRefresh={fetchData}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {showAllDay ? (
          /* All Day View */
          allDayView ? (
            <AllDayViewComponent
              allDayView={allDayView}
              stations={stations}
              onRefresh={fetchData}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <div className="text-xl font-bold mb-2">Generating All Day View...</div>
                <div className="text-gray-400">This may take a moment</div>
              </div>
            </div>
          )
        ) : currentStation ? (
          /* Single Station View */
          <StationView
            station={stations[currentStation]}
            tickets={tickets.filter(t => t.station === currentStation)}
            config={currentViewConfig}
            onBump={handleBumpTicket}
            onRecall={handleRecallTicket}
            onFire={handleFireTicket}
            onPriorityChange={handlePriorityChange}
          />
        ) : (
          /* Multi-Station View */
          <MultiStationView
            stations={activeStations.filter(s => 
              currentViewConfig.stations.includes(s.id)
            )}
            tickets={tickets}
            config={currentViewConfig}
            onBump={handleBumpTicket}
            onRecall={handleRecallTicket}
            onFire={handleFireTicket}
            onPriorityChange={handlePriorityChange}
          />
        )}
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <KdsSettingsModal
          onClose={() => setIsSettingsOpen(false)}
          stations={stations}
          stationViews={stationViews}
        />
      )}

      {/* Emergency Actions */}
      <EmergencyActions />
    </div>
  )
}

/**
 * Settings Modal Component
 */
function KdsSettingsModal({
  onClose,
  stations,
  stationViews
}: {
  onClose: () => void
  stations: Record<StationId, KitchenStation>
  stationViews: StationViewConfig[]
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-2xl w-full m-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">KDS Settings</h2>
          <button
            onClick={onClose}
            className="kds-button bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            ✕ Close
          </button>
        </div>

        <div className="space-y-6">
          {/* Display Settings */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Display Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-2 text-gray-300">
                <input type="checkbox" defaultChecked />
                Show timer on tickets
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input type="checkbox" defaultChecked />
                Show customer names
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input type="checkbox" defaultChecked />
                Show table numbers
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input type="checkbox" defaultChecked />
                Show allergen warnings
              </label>
            </div>
          </div>

          {/* Sound Settings */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Sound Alerts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-2 text-gray-300">
                <input type="checkbox" defaultChecked />
                New order alerts
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input type="checkbox" defaultChecked />
                Urgent order alerts
              </label>
            </div>
            <div className="mt-3">
              <label className="block text-gray-300 mb-2">Volume</label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="50"
                className="w-full"
              />
            </div>
          </div>

          {/* Station Configuration */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Stations</h3>
            <div className="space-y-2">
              {Object.values(stations).map(station => (
                <div key={station.id} className="flex items-center justify-between p-3 bg-gray-800 rounded">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: station.color }}
                    />
                    <span className="text-white">{station.displayName}</span>
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked={station.isActive}
                    />
                    <span className="text-gray-300">Active</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Emergency Actions Component
 */
function EmergencyActions() {
  const [showEmergency, setShowEmergency] = useState(false)

  if (!showEmergency) {
    return (
      <button
        onClick={() => setShowEmergency(true)}
        className="fixed bottom-4 right-4 bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded text-xs"
      >
        Emergency
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-red-900 border-2 border-red-500 rounded-lg p-4 space-y-2">
      <div className="text-xs text-red-200 font-bold">Emergency Actions</div>
      <div className="flex flex-col gap-2">
        <button
          onClick={async () => {
            if (confirm('Stop all orders? This action cannot be undone.')) {
              // Handle emergency stop
              console.log('EMERGENCY STOP ACTIVATED')
            }
          }}
          className="kds-button bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-xs"
        >
          🛑 STOP ALL
        </button>
        <button
          onClick={() => window.location.reload()}
          className="kds-button bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
        >
          🔄 RESET
        </button>
        <button
          onClick={() => setShowEmergency(false)}
          className="kds-button bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}