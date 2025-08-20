/**
 * KDS Station View Component
 * 
 * Displays tickets for one or more kitchen stations with:
 * - Configurable column layout
 * - Station-specific filtering and sorting
 * - Real-time ticket updates
 * - Touch-optimized interface
 * - Auto-scrolling for new tickets
 */

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  KitchenStation,
  KdsTicket,
  StationViewConfig,
  TicketPriority,
  StationId
} from '../../lib/kds/types'
import { orderUtils, cn } from '../../lib/kds/utils'
import { Ticket } from './ticket'
import { Timer, MultiTimer } from './timer'

interface StationViewProps {
  station: KitchenStation
  tickets: KdsTicket[]
  config: StationViewConfig
  onBump: (ticketId: string) => void
  onRecall: (ticketId: string) => void
  onFire: (ticketId: string) => void
  onPriorityChange: (ticketId: string, priority: TicketPriority) => void
  className?: string
  showHeader?: boolean
  autoScroll?: boolean
}

export function StationView({
  station,
  tickets,
  config,
  onBump,
  onRecall,
  onFire,
  onPriorityChange,
  className,
  showHeader = true,
  autoScroll = true
}: StationViewProps) {
  const [sortBy, setSortBy] = useState(config.sortBy)
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastTicketCountRef = useRef(tickets.length)

  // Filter and sort tickets for this station
  const filteredTickets = tickets
    .filter(ticket => config.stations.includes(ticket.station))
    .filter(ticket => config.showCompleted || ticket.status !== 'completed')

  const sortedTickets = orderUtils.sortTickets(filteredTickets, sortBy)

  // Auto-scroll to new tickets
  useEffect(() => {
    if (autoScroll && config.autoScroll && sortedTickets.length > lastTicketCountRef.current) {
      const container = containerRef.current
      if (container) {
        // Scroll to top for new tickets
        container.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    lastTicketCountRef.current = sortedTickets.length
  }, [sortedTickets.length, autoScroll, config.autoScroll])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!selectedTicket) return

    const currentIndex = sortedTickets.findIndex(t => t.id === selectedTicket)
    let newIndex = currentIndex

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault()
        newIndex = Math.max(0, currentIndex - 1)
        break
      case 'ArrowDown':
        event.preventDefault()
        newIndex = Math.min(sortedTickets.length - 1, currentIndex + 1)
        break
      case 'ArrowLeft':
        event.preventDefault()
        newIndex = Math.max(0, currentIndex - config.maxTicketsPerColumn)
        break
      case 'ArrowRight':
        event.preventDefault()
        newIndex = Math.min(sortedTickets.length - 1, currentIndex + config.maxTicketsPerColumn)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        onBump(selectedTicket)
        break
      case 'f':
      case 'F':
        event.preventDefault()
        onFire(selectedTicket)
        break
      case 'r':
      case 'R':
        event.preventDefault()
        onRecall(selectedTicket)
        break
      case 'Escape':
        event.preventDefault()
        setSelectedTicket(null)
        break
    }

    if (newIndex !== currentIndex && sortedTickets[newIndex]) {
      setSelectedTicket(sortedTickets[newIndex].id)
    }
  }, [selectedTicket, sortedTickets, config.maxTicketsPerColumn, onBump, onFire, onRecall])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Calculate station metrics
  const metrics = {
    total: sortedTickets.length,
    pending: sortedTickets.filter(t => t.status === 'pending').length,
    preparing: sortedTickets.filter(t => t.status === 'preparing').length,
    ready: sortedTickets.filter(t => t.status === 'ready').length,
    completed: sortedTickets.filter(t => t.status === 'completed').length,
    urgent: sortedTickets.filter(t => t.urgency === 'urgent').length,
    overCapacity: sortedTickets.length > station.maxCapacity
  }

  // Split tickets into columns
  const columns = []
  const ticketsPerColumn = Math.ceil(sortedTickets.length / config.columns)
  
  for (let i = 0; i < config.columns; i++) {
    const startIndex = i * ticketsPerColumn
    const endIndex = Math.min(startIndex + ticketsPerColumn, sortedTickets.length)
    const columnTickets = sortedTickets.slice(startIndex, endIndex)
    
    if (columnTickets.length > 0 || i === 0) {
      columns.push(columnTickets)
    }
  }

  return (
    <div
      className={cn(
        'kds-station-view h-full flex flex-col',
        metrics.overCapacity && 'ring-2 ring-red-500',
        className
      )}
      data-station={station.id}
      data-ticket-count={sortedTickets.length}
    >
      {/* Station Header */}
      {showHeader && (
        <StationHeader
          station={station}
          metrics={metrics}
          config={config}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      )}

      {/* Tickets Grid */}
      <div
        ref={containerRef}
        className={cn(
          'flex-1 kds-ticket-grid overflow-y-auto',
          config.autoScroll && 'kds-auto-scroll',
          `kds-ticket-grid-${config.columns}`
        )}
        style={{
          gridTemplateColumns: `repeat(${config.columns}, 1fr)`
        }}
      >
        {columns.map((columnTickets, columnIndex) => (
          <div
            key={columnIndex}
            className="space-y-4"
            data-column={columnIndex}
          >
            {/* Column Header */}
            <div className="text-center">
              <div className="text-sm text-gray-400 font-medium">
                Column {columnIndex + 1}
              </div>
              <div className="text-xs text-gray-500">
                {columnTickets.length} tickets
              </div>
            </div>

            {/* Column Tickets */}
            {columnTickets.map((ticket) => (
              <Ticket
                key={ticket.id}
                ticket={ticket}
                config={config}
                onBump={onBump}
                onRecall={onRecall}
                onFire={onFire}
                onPriorityChange={onPriorityChange}
                className={cn(
                  selectedTicket === ticket.id && 'ring-2 ring-blue-500',
                  'cursor-pointer'
                )}
                onClick={() => setSelectedTicket(ticket.id)}
              />
            ))}

            {/* Empty State for Column */}
            {columnTickets.length === 0 && columnIndex === 0 && (
              <EmptyStationState station={station} />
            )}

            {/* Fill remaining space to maintain column height */}
            {columnTickets.length < config.maxTicketsPerColumn && (
              <div className="flex-1" />
            )}
          </div>
        ))}
      </div>

      {/* Station Footer */}
      <StationFooter
        station={station}
        metrics={metrics}
        config={config}
        ticketCount={sortedTickets.length}
      />
    </div>
  )
}

/**
 * Station Header Component
 */
function StationHeader({
  station,
  metrics,
  config,
  sortBy,
  onSortChange
}: {
  station: KitchenStation
  metrics: any
  config: StationViewConfig
  sortBy: string
  onSortChange: (sortBy: 'time' | 'priority' | 'table' | 'server') => void
}) {
  const loadPercentage = Math.round((metrics.total / station.maxCapacity) * 100)

  return (
    <div className="kds-no-print bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between">
      {/* Station Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: station.color }}
          />
          <div>
            <h2 className="text-xl font-bold text-white kds-text-high-contrast">
              {station.displayName}
            </h2>
            <div className="text-sm text-gray-400">
              {metrics.total}/{station.maxCapacity} orders
              {loadPercentage > 100 && (
                <span className="ml-2 text-red-400 font-bold">
                  OVER CAPACITY
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3">
          {metrics.urgent > 0 && (
            <div className="flex items-center gap-1 text-red-400 font-bold">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>{metrics.urgent} urgent</span>
            </div>
          )}
          <div className="text-sm text-gray-400">
            <span className="text-blue-400">{metrics.preparing}</span> preparing •{' '}
            <span className="text-green-400">{metrics.ready}</span> ready
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white"
          >
            <option value="time">Time</option>
            <option value="priority">Priority</option>
            <option value="table">Table</option>
            <option value="server">Server</option>
          </select>
        </div>

        {/* Capacity Indicator */}
        <div className="flex items-center gap-2">
          <div className="w-16 bg-gray-700 rounded-full h-2">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                loadPercentage > 100 ? 'bg-red-500' :
                loadPercentage > 80 ? 'bg-yellow-500' :
                'bg-green-500'
              )}
              style={{ width: `${Math.min(100, loadPercentage)}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 min-w-[3rem]">
            {loadPercentage}%
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * Station Footer Component
 */
function StationFooter({
  station,
  metrics,
  config,
  ticketCount
}: {
  station: KitchenStation
  metrics: any
  config: StationViewConfig
  ticketCount: number
}) {
  return (
    <div className="kds-no-print bg-gray-900 border-t border-gray-700 p-2 flex items-center justify-between text-sm text-gray-400">
      <div className="flex items-center gap-4">
        <div>Average time: {station.averageCookTime}min</div>
        <div>Capacity: {ticketCount}/{station.maxCapacity}</div>
      </div>
      
      <div className="flex items-center gap-4">
        <div>Last updated: {new Date().toLocaleTimeString()}</div>
        <div className="flex items-center gap-1">
          <div className={cn(
            'w-2 h-2 rounded-full',
            metrics.total > 0 ? 'bg-green-500' : 'bg-gray-500'
          )} />
          <span>Station {station.isActive ? 'Active' : 'Inactive'}</span>
        </div>
      </div>
    </div>
  )
}

/**
 * Empty Station State Component
 */
function EmptyStationState({ station }: { station: KitchenStation }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-6xl mb-4" role="img" aria-label="Empty state">
        {station.icon}
      </div>
      <div className="text-xl font-bold text-gray-300 mb-2">
        No orders for {station.displayName}
      </div>
      <div className="text-gray-500 max-w-md">
        New orders will appear here automatically. The station is ready and waiting for incoming tickets.
      </div>
      <div className="mt-4 text-sm text-gray-400">
        Capacity: 0/{station.maxCapacity} • Average time: {station.averageCookTime} minutes
      </div>
    </div>
  )
}

/**
 * Multi-Station View Component
 * Shows multiple stations in a single view
 */
interface MultiStationViewProps {
  stations: KitchenStation[]
  tickets: KdsTicket[]
  config: StationViewConfig
  onBump: (ticketId: string) => void
  onRecall: (ticketId: string) => void
  onFire: (ticketId: string) => void
  onPriorityChange: (ticketId: string, priority: TicketPriority) => void
  className?: string
}

export function MultiStationView({
  stations,
  tickets,
  config,
  onBump,
  onRecall,
  onFire,
  onPriorityChange,
  className
}: MultiStationViewProps) {
  return (
    <div className={cn('kds-multi-station-view grid gap-4', className)}>
      {stations.map((station) => {
        const stationTickets = tickets.filter(ticket => 
          ticket.station === station.id
        )

        return (
          <StationView
            key={station.id}
            station={station}
            tickets={stationTickets}
            config={{
              ...config,
              stations: [station.id],
              columns: Math.max(1, Math.floor(config.columns / stations.length))
            }}
            onBump={onBump}
            onRecall={onRecall}
            onFire={onFire}
            onPriorityChange={onPriorityChange}
            showHeader={stations.length > 1}
          />
        )
      })}
    </div>
  )
}

/**
 * Station Performance Component
 * Shows real-time performance metrics
 */
interface StationPerformanceProps {
  station: KitchenStation
  tickets: KdsTicket[]
  className?: string
}

export function StationPerformance({
  station,
  tickets,
  className
}: StationPerformanceProps) {
  const metrics = {
    total: tickets.length,
    avgTime: tickets.reduce((acc, t) => acc + t.elapsedTime, 0) / tickets.length || 0,
    efficiency: Math.round((tickets.filter(t => t.elapsedTime <= station.averageCookTime * 60).length / tickets.length || 0) * 100),
    overdue: tickets.filter(t => t.elapsedTime > station.averageCookTime * 60).length
  }

  return (
    <div className={cn('bg-gray-900 border border-gray-700 rounded p-4', className)}>
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-3 h-3 rounded"
          style={{ backgroundColor: station.color }}
        />
        <h3 className="font-bold text-white">{station.displayName}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-400">Active Orders</div>
          <div className="text-lg font-bold text-white">{metrics.total}</div>
        </div>
        
        <div>
          <div className="text-gray-400">Avg Time</div>
          <div className="text-lg font-bold text-white">
            {Math.round(metrics.avgTime / 60)}min
          </div>
        </div>
        
        <div>
          <div className="text-gray-400">Efficiency</div>
          <div className={cn(
            'text-lg font-bold',
            metrics.efficiency >= 90 ? 'text-green-400' :
            metrics.efficiency >= 70 ? 'text-yellow-400' :
            'text-red-400'
          )}>
            {metrics.efficiency}%
          </div>
        </div>
        
        <div>
          <div className="text-gray-400">Overdue</div>
          <div className={cn(
            'text-lg font-bold',
            metrics.overdue === 0 ? 'text-green-400' : 'text-red-400'
          )}>
            {metrics.overdue}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StationView