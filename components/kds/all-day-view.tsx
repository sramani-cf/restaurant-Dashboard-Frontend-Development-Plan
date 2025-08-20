/**
 * KDS All Day View Component
 * 
 * Displays aggregated view of all items needed throughout the day:
 * - Total quantities needed per item
 * - Running totals and completion status
 * - Station-specific breakdowns
 * - Prep planning and scheduling
 */

'use client'

import { useState, useEffect } from 'react'
import {
  AllDayView,
  AllDayItem,
  StationId,
  KitchenStation
} from '../../lib/kds/types'
import { allDayUtils, formatUtils, cn } from '../../lib/kds/utils'
import { DEFAULT_STATIONS } from '../../lib/kds/stations'

interface AllDayViewProps {
  allDayView: AllDayView
  stations?: Record<StationId, KitchenStation>
  onRefresh: () => void
  onItemClick?: (item: AllDayItem) => void
  className?: string
  groupByStation?: boolean
  showCompleted?: boolean
  showModifiers?: boolean
  sortBy?: 'name' | 'quantity' | 'station' | 'completion'
}

export function AllDayViewComponent({
  allDayView,
  stations = DEFAULT_STATIONS,
  onRefresh,
  onItemClick,
  className,
  groupByStation = true,
  showCompleted = true,
  showModifiers = true,
  sortBy = 'quantity'
}: AllDayViewProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStation, setSelectedStation] = useState<StationId | 'all'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  // Filter items based on search and station selection
  const filteredItems = allDayView.items.filter(item => {
    if (!showCompleted && item.pendingQuantity === 0) return false
    if (selectedStation !== 'all' && item.station !== selectedStation) return false
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'quantity':
        return b.totalQuantity - a.totalQuantity
      case 'station':
        return a.station.localeCompare(b.station)
      case 'completion':
        const aCompletion = allDayUtils.getCompletionPercentage(a)
        const bCompletion = allDayUtils.getCompletionPercentage(b)
        return aCompletion - bCompletion
      default:
        return 0
    }
  })

  // Group items by station if requested
  const groupedItems = groupByStation
    ? sortedItems.reduce((groups, item) => {
        if (!groups[item.station]) {
          groups[item.station] = []
        }
        groups[item.station].push(item)
        return groups
      }, {} as Record<StationId, AllDayItem[]>)
    : { all: sortedItems }

  // Calculate totals
  const totals = {
    totalItems: allDayView.items.length,
    totalQuantity: allDayView.items.reduce((sum, item) => sum + item.totalQuantity, 0),
    completedQuantity: allDayView.items.reduce((sum, item) => sum + item.completedQuantity, 0),
    pendingQuantity: allDayView.items.reduce((sum, item) => sum + item.pendingQuantity, 0)
  }

  const overallCompletion = totals.totalQuantity > 0 
    ? Math.round((totals.completedQuantity / totals.totalQuantity) * 100)
    : 0

  return (
    <div className={cn('kds-all-day-view h-full flex flex-col', className)}>
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white kds-text-high-contrast">
              All Day View
            </h2>
            <p className="text-gray-400">
              Total orders: {allDayView.totalOrders} • Completed: {allDayView.completedOrders}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-lg font-bold text-white">
                {overallCompletion}% Complete
              </div>
              <div className="text-sm text-gray-400">
                {totals.completedQuantity} of {totals.totalQuantity} items
              </div>
            </div>
            <button
              onClick={onRefresh}
              className="kds-button bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
            />
          </div>

          {/* Station Filter */}
          <select
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value as StationId | 'all')}
            className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="all">All Stations</option>
            {Object.values(stations).map((station) => (
              <option key={station.id} value={station.id}>
                {station.displayName}
              </option>
            ))}
          </select>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="quantity">By Quantity</option>
            <option value="name">By Name</option>
            <option value="station">By Station</option>
            <option value="completion">By Completion</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-gray-600 rounded overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'px-3 py-2 text-sm font-medium',
                viewMode === 'grid' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              )}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={cn(
                'px-3 py-2 text-sm font-medium',
                viewMode === 'table' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              )}
            >
              Table
            </button>
          </div>

          {/* Options */}
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
              className="rounded"
            />
            Show Completed
          </label>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-800 p-3 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallCompletion}%` }}
            />
          </div>
          <div className="text-sm text-gray-300 min-w-[120px] text-right">
            {totals.completedQuantity} / {totals.totalQuantity} items
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {viewMode === 'grid' ? (
          <GridView
            groupedItems={groupedItems}
            stations={stations}
            showModifiers={showModifiers}
            onItemClick={onItemClick}
          />
        ) : (
          <TableView
            items={sortedItems}
            stations={stations}
            showModifiers={showModifiers}
            onItemClick={onItemClick}
          />
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 border-t border-gray-700 p-3 flex items-center justify-between text-sm text-gray-400">
        <div>
          Showing {sortedItems.length} of {allDayView.items.length} items
        </div>
        <div>
          Last updated: {allDayView.lastUpdated.toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}

/**
 * Grid View Component
 */
function GridView({
  groupedItems,
  stations,
  showModifiers,
  onItemClick
}: {
  groupedItems: Record<string, AllDayItem[]>
  stations: Record<StationId, KitchenStation>
  showModifiers: boolean
  onItemClick?: (item: AllDayItem) => void
}) {
  return (
    <div className="p-4 space-y-6">
      {Object.entries(groupedItems).map(([stationId, items]) => {
        const station = stations[stationId as StationId]
        
        return (
          <div key={stationId} className="space-y-3">
            {/* Station Header */}
            {station && stationId !== 'all' && (
              <div className="flex items-center gap-2 pb-2 border-b border-gray-700">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: station.color }}
                />
                <h3 className="text-lg font-bold text-white">
                  {station.displayName}
                </h3>
                <div className="text-sm text-gray-400">
                  ({items.length} items)
                </div>
              </div>
            )}

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {items.map((item) => (
                <AllDayItemCard
                  key={`${item.itemId}-${item.station}`}
                  item={item}
                  station={stations[item.station]}
                  showModifiers={showModifiers}
                  onClick={() => onItemClick?.(item)}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/**
 * Table View Component
 */
function TableView({
  items,
  stations,
  showModifiers,
  onItemClick
}: {
  items: AllDayItem[]
  stations: Record<StationId, KitchenStation>
  showModifiers: boolean
  onItemClick?: (item: AllDayItem) => void
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-white">
        <thead className="bg-gray-800 border-b border-gray-700">
          <tr>
            <th className="text-left p-3 font-medium">Item</th>
            <th className="text-left p-3 font-medium">Station</th>
            <th className="text-center p-3 font-medium">Total</th>
            <th className="text-center p-3 font-medium">Completed</th>
            <th className="text-center p-3 font-medium">Pending</th>
            <th className="text-center p-3 font-medium">Progress</th>
            {showModifiers && (
              <th className="text-left p-3 font-medium">Modifiers</th>
            )}
            <th className="text-left p-3 font-medium">Allergens</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {items.map((item) => {
            const station = stations[item.station]
            const completion = allDayUtils.getCompletionPercentage(item)
            
            return (
              <tr
                key={`${item.itemId}-${item.station}`}
                className={cn(
                  'hover:bg-gray-800 transition-colors',
                  onItemClick && 'cursor-pointer'
                )}
                onClick={() => onItemClick?.(item)}
              >
                <td className="p-3">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-400">
                    Avg time: {item.averageCookTime}min
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: station?.color || '#6b7280' }}
                    />
                    <span>{station?.displayName || item.station}</span>
                  </div>
                </td>
                <td className="p-3 text-center font-bold">
                  {item.totalQuantity}
                </td>
                <td className="p-3 text-center text-green-400">
                  {item.completedQuantity}
                </td>
                <td className="p-3 text-center text-blue-400">
                  {item.pendingQuantity}
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-300',
                          completion === 100 ? 'bg-green-500' :
                          completion >= 50 ? 'bg-blue-500' :
                          'bg-gray-400'
                        )}
                        style={{ width: `${completion}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 min-w-[3rem] text-right">
                      {completion}%
                    </span>
                  </div>
                </td>
                {showModifiers && (
                  <td className="p-3 text-xs text-gray-400">
                    {Object.entries(item.modifiers).length > 0 ? (
                      <div className="max-w-[200px] truncate">
                        {Object.entries(item.modifiers)
                          .map(([name, qty]) => `${name} (${qty})`)
                          .join(', ')}
                      </div>
                    ) : (
                      <span className="text-gray-500">None</span>
                    )}
                  </td>
                )}
                <td className="p-3 text-xs">
                  {item.allergens.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {item.allergens.map((allergen) => (
                        <span
                          key={allergen}
                          className="bg-red-900 text-red-200 px-1 py-0.5 rounded text-xs font-medium"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500">None</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/**
 * All Day Item Card Component
 */
function AllDayItemCard({
  item,
  station,
  showModifiers,
  onClick
}: {
  item: AllDayItem
  station?: KitchenStation
  showModifiers: boolean
  onClick?: () => void
}) {
  const completion = allDayUtils.getCompletionPercentage(item)
  const isCompleted = completion === 100

  return (
    <div
      className={cn(
        'bg-gray-900 border-2 border-gray-700 rounded-lg p-4 space-y-3',
        'transition-all duration-200',
        onClick && 'cursor-pointer hover:border-gray-600',
        isCompleted && 'opacity-75 border-green-700'
      )}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-bold text-white text-lg kds-text-kitchen">
            {item.name}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            {station && (
              <>
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: station.color }}
                />
                <span className="text-sm text-gray-400">
                  {station.displayName}
                </span>
              </>
            )}
          </div>
        </div>
        
        {isCompleted && (
          <div className="text-green-400 text-xl">✓</div>
        )}
      </div>

      {/* Quantities */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-2xl font-bold text-white">
            {item.totalQuantity}
          </div>
          <div className="text-xs text-gray-400 uppercase">Total</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-400">
            {item.completedQuantity}
          </div>
          <div className="text-xs text-gray-400 uppercase">Done</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-400">
            {item.pendingQuantity}
          </div>
          <div className="text-xs text-gray-400 uppercase">Pending</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Progress</span>
          <span className="text-white font-medium">{completion}%</span>
        </div>
        <div className="bg-gray-700 rounded-full h-2">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              completion === 100 ? 'bg-green-500' :
              completion >= 50 ? 'bg-blue-500' :
              'bg-gray-400'
            )}
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      {/* Modifiers */}
      {showModifiers && Object.keys(item.modifiers).length > 0 && (
        <div className="pt-2 border-t border-gray-700">
          <div className="text-xs text-gray-400 mb-1 uppercase">Modifiers:</div>
          <div className="flex flex-wrap gap-1">
            {Object.entries(item.modifiers).map(([name, qty]) => (
              <span
                key={name}
                className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
              >
                {name} ({qty})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Allergens */}
      {item.allergens.length > 0 && (
        <div className="pt-2 border-t border-gray-700">
          <div className="text-xs text-red-300 mb-1 uppercase font-bold">⚠️ Allergens:</div>
          <div className="flex flex-wrap gap-1">
            {item.allergens.map((allergen) => (
              <span
                key={allergen}
                className="bg-red-900 text-red-200 px-2 py-1 rounded text-xs font-medium"
              >
                {allergen}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-2 border-t border-gray-700 text-xs text-gray-400 flex justify-between">
        <span>Cook time: {item.averageCookTime}min</span>
        <span>
          {item.pendingQuantity > 0 ? 
            `${item.pendingQuantity} to go` : 
            'All complete'
          }
        </span>
      </div>
    </div>
  )
}

/**
 * All Day Summary Component
 * Quick overview of all day totals
 */
interface AllDaySummaryProps {
  allDayView: AllDayView
  stations: Record<StationId, KitchenStation>
  className?: string
}

export function AllDaySummary({ allDayView, stations, className }: AllDaySummaryProps) {
  const totals = {
    totalItems: allDayView.items.length,
    totalQuantity: allDayView.items.reduce((sum, item) => sum + item.totalQuantity, 0),
    completedQuantity: allDayView.items.reduce((sum, item) => sum + item.completedQuantity, 0),
    pendingQuantity: allDayView.items.reduce((sum, item) => sum + item.pendingQuantity, 0)
  }

  const completion = totals.totalQuantity > 0 
    ? Math.round((totals.completedQuantity / totals.totalQuantity) * 100)
    : 0

  const stationBreakdown = Object.values(stations).map(station => ({
    station,
    items: allDayView.items.filter(item => item.station === station.id),
    totalQty: allDayView.items
      .filter(item => item.station === station.id)
      .reduce((sum, item) => sum + item.totalQuantity, 0),
    pendingQty: allDayView.items
      .filter(item => item.station === station.id)
      .reduce((sum, item) => sum + item.pendingQuantity, 0)
  })).filter(s => s.items.length > 0)

  return (
    <div className={cn('bg-gray-900 border border-gray-700 rounded-lg p-6', className)}>
      <h3 className="text-xl font-bold text-white mb-4">All Day Summary</h3>
      
      {/* Overall Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{totals.totalItems}</div>
          <div className="text-sm text-gray-400">Unique Items</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{totals.totalQuantity}</div>
          <div className="text-sm text-gray-400">Total Quantity</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{totals.completedQuantity}</div>
          <div className="text-sm text-gray-400">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-400">{totals.pendingQuantity}</div>
          <div className="text-sm text-gray-400">Remaining</div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Overall Progress</span>
          <span className="text-sm font-medium text-white">{completion}%</span>
        </div>
        <div className="bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      {/* Station Breakdown */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-400 uppercase">By Station</h4>
        {stationBreakdown.map(({ station, totalQty, pendingQty }) => (
          <div key={station.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: station.color }}
              />
              <span className="text-sm text-white">{station.displayName}</span>
            </div>
            <div className="text-sm text-gray-400">
              {totalQty - pendingQty}/{totalQty} ({pendingQty} pending)
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllDayViewComponent