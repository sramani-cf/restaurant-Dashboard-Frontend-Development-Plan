/**
 * KDS Header Component
 * 
 * Main navigation and control header for the Kitchen Display System:
 * - Station navigation tabs
 * - Real-time metrics display
 * - System status indicators
 * - Quick action controls
 * - Settings and view options
 */

'use client'

import { useState, useEffect } from 'react'
import {
  KdsMetrics,
  StationViewConfig,
  StationId,
  KitchenStation
} from '../../lib/kds/types'
import { timeUtils, cn } from '../../lib/kds/utils'
import { DEFAULT_STATIONS } from '../../lib/kds/stations'

interface KdsHeaderProps {
  currentStation?: StationId
  currentView?: string
  stationViews: StationViewConfig[]
  metrics: KdsMetrics
  stations?: Record<StationId, KitchenStation>
  onStationChange: (stationId: StationId) => void
  onViewChange: (viewId: string) => void
  onSettingsOpen: () => void
  onAllDayToggle?: () => void
  onRefresh?: () => void
  className?: string
  showMetrics?: boolean
  showClock?: boolean
  compactMode?: boolean
}

export function KdsHeader({
  currentStation,
  currentView,
  stationViews,
  metrics,
  stations = DEFAULT_STATIONS,
  onStationChange,
  onViewChange,
  onSettingsOpen,
  onAllDayToggle,
  onRefresh,
  className,
  showMetrics = true,
  showClock = true,
  compactMode = false
}: KdsHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('connected')

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Simulate connection status changes (in real app, this would come from WebSocket)
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly simulate connection issues for demo
      const shouldDisconnect = Math.random() < 0.05 // 5% chance
      if (shouldDisconnect && connectionStatus === 'connected') {
        setConnectionStatus('disconnected')
        setTimeout(() => setConnectionStatus('reconnecting'), 2000)
        setTimeout(() => setConnectionStatus('connected'), 5000)
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [connectionStatus])

  const activeStations = Object.values(stations).filter(s => s.isActive)
  const currentStationData = currentStation ? stations[currentStation] : null

  return (
    <header
      className={cn(
        'kds-header bg-gray-900 border-b-2 border-gray-700',
        'flex items-center justify-between px-6 py-4',
        compactMode ? 'h-16' : 'h-20',
        className
      )}
      role="banner"
    >
      {/* Left Section - Logo & Title */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="text-2xl" role="img" aria-label="Kitchen Display System">
            🍽️
          </div>
          <div>
            <h1 className="text-xl font-bold text-white kds-text-high-contrast">
              Kitchen Display
            </h1>
            {!compactMode && (
              <p className="text-sm text-gray-400">
                {currentStationData ? currentStationData.displayName : 'All Stations'}
              </p>
            )}
          </div>
        </div>

        {/* Quick Metrics */}
        {showMetrics && !compactMode && (
          <div className="flex items-center gap-4 pl-6 border-l border-gray-700">
            <MetricCard
              label="Active"
              value={metrics.totalActiveTickets}
              color="text-blue-400"
            />
            <MetricCard
              label="Avg Time"
              value={`${Math.round(metrics.averageTicketTime)}m`}
              color="text-green-400"
            />
            <MetricCard
              label="Longest"
              value={`${Math.round(metrics.longestWaitTime)}m`}
              color={metrics.longestWaitTime > 20 ? 'text-red-400' : 'text-yellow-400'}
            />
          </div>
        )}
      </div>

      {/* Center Section - Station/View Navigation */}
      <div className="flex items-center gap-2">
        {/* Station Tabs */}
        <div className="flex items-center gap-1" role="tablist" aria-label="Kitchen stations">
          {activeStations.map((station) => (
            <StationTab
              key={station.id}
              station={station}
              isActive={currentStation === station.id}
              ticketCount={metrics.stationMetrics.find(m => m.stationId === station.id)?.pendingOrders || 0}
              onClick={() => onStationChange(station.id)}
              compact={compactMode}
            />
          ))}
          
          {/* All Stations View */}
          <button
            onClick={() => onViewChange('all-stations')}
            className={cn(
              'kds-button px-4 py-2 rounded-lg font-medium transition-all',
              currentView === 'all-stations'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            )}
            role="tab"
            aria-selected={currentView === 'all-stations'}
            aria-label="All stations view"
          >
            All
          </button>
        </div>

        {/* View Selector */}
        {stationViews.length > 1 && (
          <div className="ml-4">
            <select
              value={currentView || ''}
              onChange={(e) => onViewChange(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500"
              aria-label="Select view configuration"
            >
              {stationViews.map((view) => (
                <option key={view.id} value={view.id}>
                  {view.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right Section - Status & Controls */}
      <div className="flex items-center gap-4">
        {/* Connection Status */}
        <ConnectionIndicator status={connectionStatus} compact={compactMode} />

        {/* System Time */}
        {showClock && (
          <div className="text-right">
            <div className="text-lg font-mono font-bold text-white">
              {timeUtils.formatTime(currentTime, false)}
            </div>
            {!compactMode && (
              <div className="text-xs text-gray-400">
                {currentTime.toLocaleDateString()}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pl-4 border-l border-gray-700">
          {/* All Day View Toggle */}
          {onAllDayToggle && (
            <ActionButton
              icon="📊"
              label="All Day"
              onClick={onAllDayToggle}
              compact={compactMode}
            />
          )}

          {/* Refresh */}
          {onRefresh && (
            <ActionButton
              icon="🔄"
              label="Refresh"
              onClick={onRefresh}
              compact={compactMode}
            />
          )}

          {/* Settings */}
          <ActionButton
            icon="⚙️"
            label="Settings"
            onClick={onSettingsOpen}
            compact={compactMode}
          />
        </div>
      </div>
    </header>
  )
}

/**
 * Station Tab Component
 */
function StationTab({
  station,
  isActive,
  ticketCount,
  onClick,
  compact = false
}: {
  station: KitchenStation
  isActive: boolean
  ticketCount: number
  onClick: () => void
  compact?: boolean
}) {
  const isOverCapacity = ticketCount > station.maxCapacity
  const loadPercentage = Math.round((ticketCount / station.maxCapacity) * 100)

  return (
    <button
      onClick={onClick}
      className={cn(
        'kds-button relative flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
        isActive
          ? 'bg-blue-600 text-white'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
        isOverCapacity && 'ring-2 ring-red-500',
        compact ? 'px-3 py-1' : 'px-4 py-2'
      )}
      role="tab"
      aria-selected={isActive}
      aria-label={`${station.displayName} station - ${ticketCount} orders`}
      style={{
        borderBottom: isActive ? `3px solid ${station.color}` : 'none'
      }}
    >
      {/* Station Icon/Name */}
      <div className="flex items-center gap-2">
        <span className={compact ? 'text-sm' : 'text-base'}>
          {station.icon}
        </span>
        <span className={cn(
          'font-medium',
          compact ? 'text-sm' : 'text-base'
        )}>
          {compact ? station.name.substring(0, 4) : station.displayName}
        </span>
      </div>

      {/* Ticket Count Badge */}
      {ticketCount > 0 && (
        <div
          className={cn(
            'absolute -top-2 -right-2 min-w-[1.5rem] h-6 rounded-full flex items-center justify-center text-xs font-bold',
            isOverCapacity
              ? 'bg-red-500 text-white animate-pulse'
              : ticketCount > station.maxCapacity * 0.8
              ? 'bg-yellow-500 text-black'
              : 'bg-green-500 text-white'
          )}
        >
          {ticketCount > 99 ? '99+' : ticketCount}
        </div>
      )}

      {/* Capacity Indicator */}
      {!compact && (
        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full transition-all duration-500',
              loadPercentage > 100 ? 'bg-red-500' :
              loadPercentage > 80 ? 'bg-yellow-500' :
              'bg-green-500'
            )}
            style={{ width: `${Math.min(100, loadPercentage)}%` }}
          />
        </div>
      )}
    </button>
  )
}

/**
 * Connection Status Indicator
 */
function ConnectionIndicator({
  status,
  compact = false
}: {
  status: 'connected' | 'disconnected' | 'reconnecting'
  compact?: boolean
}) {
  const statusConfig = {
    connected: {
      color: 'bg-green-500',
      text: 'Connected',
      icon: '🟢'
    },
    disconnected: {
      color: 'bg-red-500 animate-pulse',
      text: 'Disconnected',
      icon: '🔴'
    },
    reconnecting: {
      color: 'bg-yellow-500 animate-pulse',
      text: 'Reconnecting...',
      icon: '🟡'
    }
  }

  const config = statusConfig[status]

  return (
    <div className="flex items-center gap-2">
      <div className={cn('w-2 h-2 rounded-full', config.color)} />
      {!compact && (
        <span className={cn(
          'text-xs',
          status === 'connected' ? 'text-green-400' :
          status === 'disconnected' ? 'text-red-400' :
          'text-yellow-400'
        )}>
          {config.text}
        </span>
      )}
    </div>
  )
}

/**
 * Metric Card Component
 */
function MetricCard({
  label,
  value,
  color = 'text-white'
}: {
  label: string
  value: string | number
  color?: string
}) {
  return (
    <div className="text-center">
      <div className={cn('text-lg font-bold', color)}>
        {value}
      </div>
      <div className="text-xs text-gray-400 uppercase tracking-wide">
        {label}
      </div>
    </div>
  )
}

/**
 * Action Button Component
 */
function ActionButton({
  icon,
  label,
  onClick,
  compact = false,
  disabled = false
}: {
  icon: string
  label: string
  onClick: () => void
  compact?: boolean
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'kds-button flex flex-col items-center gap-1 px-3 py-2 rounded-lg',
        'bg-gray-800 text-gray-300 hover:bg-gray-700',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-all duration-150',
        compact && 'px-2 py-1'
      )}
      title={label}
      aria-label={label}
    >
      <span className={compact ? 'text-sm' : 'text-base'}>
        {icon}
      </span>
      {!compact && (
        <span className="text-xs font-medium">
          {label}
        </span>
      )}
    </button>
  )
}

/**
 * Alert Banner Component
 * Shows system alerts and notifications
 */
interface AlertBannerProps {
  alerts: Array<{
    id: string
    type: 'info' | 'warning' | 'error'
    message: string
    dismissible?: boolean
  }>
  onDismiss?: (id: string) => void
  className?: string
}

export function AlertBanner({ alerts, onDismiss, className }: AlertBannerProps) {
  if (alerts.length === 0) return null

  return (
    <div className={cn('kds-alert-banner space-y-2', className)}>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={cn(
            'flex items-center justify-between px-4 py-2 rounded-lg',
            alert.type === 'error' && 'bg-red-900 border border-red-500 text-red-100',
            alert.type === 'warning' && 'bg-yellow-900 border border-yellow-500 text-yellow-100',
            alert.type === 'info' && 'bg-blue-900 border border-blue-500 text-blue-100'
          )}
          role="alert"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {alert.type === 'error' && '❌'}
              {alert.type === 'warning' && '⚠️'}
              {alert.type === 'info' && 'ℹ️'}
            </span>
            <span className="text-sm font-medium">
              {alert.message}
            </span>
          </div>
          
          {alert.dismissible && onDismiss && (
            <button
              onClick={() => onDismiss(alert.id)}
              className="text-xs hover:opacity-75 ml-4"
              aria-label="Dismiss alert"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

/**
 * Compact Header Variant
 * Minimal header for smaller screens
 */
interface CompactHeaderProps {
  currentView: string
  stationViews: StationViewConfig[]
  metrics: KdsMetrics
  onViewChange: (viewId: string) => void
  onMenuToggle: () => void
  className?: string
}

export function CompactHeader({
  currentView,
  stationViews,
  metrics,
  onViewChange,
  onMenuToggle,
  className
}: CompactHeaderProps) {
  return (
    <header
      className={cn(
        'kds-compact-header bg-gray-900 border-b border-gray-700',
        'flex items-center justify-between px-4 py-3 h-14',
        className
      )}
    >
      {/* Menu Toggle */}
      <button
        onClick={onMenuToggle}
        className="kds-button p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Current View */}
      <div className="flex items-center gap-2">
        <select
          value={currentView}
          onChange={(e) => onViewChange(e.target.value)}
          className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white"
        >
          {stationViews.map((view) => (
            <option key={view.id} value={view.id}>
              {view.name}
            </option>
          ))}
        </select>
      </div>

      {/* Quick Stats */}
      <div className="flex items-center gap-3 text-xs">
        <span className="text-blue-400">{metrics.totalActiveTickets}</span>
        <span className="text-gray-400">•</span>
        <span className="text-green-400">{Math.round(metrics.averageTicketTime)}m</span>
      </div>
    </header>
  )
}

export default KdsHeader