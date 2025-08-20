/**
 * KDS Ticket Component
 * 
 * Digital representation of an order ticket with:
 * - High-contrast display for kitchen visibility
 * - Touch-optimized buttons for kitchen staff
 * - Real-time timer and urgency indicators
 * - Comprehensive order information display
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  KdsTicket, 
  StationViewConfig,
  TicketPriority 
} from '../../lib/kds/types'
import { 
  timeUtils, 
  urgencyUtils, 
  formatUtils,
  cn 
} from '../../lib/kds/utils'
import { 
  bumpTicket, 
  recallTicket, 
  fireTicket, 
  changeTicketPriority 
} from '../../app/kds/actions'

interface TicketProps {
  ticket: KdsTicket
  config: StationViewConfig
  onBump: (ticketId: string) => void
  onRecall: (ticketId: string) => void
  onFire: (ticketId: string) => void
  onPriorityChange: (ticketId: string, priority: TicketPriority) => void
  className?: string
}

export function Ticket({ 
  ticket, 
  config, 
  onBump, 
  onRecall, 
  onFire, 
  onPriorityChange,
  className 
}: TicketProps) {
  const [elapsedTime, setElapsedTime] = useState(ticket.elapsedTime)
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastAction, setLastAction] = useState<string | null>(null)

  // Update elapsed time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(timeUtils.getElapsedTime(ticket.startTime))
    }, 1000)
    
    return () => clearInterval(interval)
  }, [ticket.startTime])

  // Calculate urgency based on current elapsed time
  const urgency = urgencyUtils.calculateUrgency(elapsedTime)
  const urgencyColor = urgencyUtils.getUrgencyColor(urgency)
  const priorityColor = urgencyUtils.getPriorityColor(ticket.order.priority)
  const statusColor = urgencyUtils.getStatusColor(ticket.status)

  // Handle ticket actions with loading states
  const handleBump = useCallback(async () => {
    setIsProcessing(true)
    setLastAction('bump')
    try {
      await bumpTicket(ticket.id)
      onBump(ticket.id)
    } catch (error) {
      console.error('Failed to bump ticket:', error)
    } finally {
      setIsProcessing(false)
      setLastAction(null)
    }
  }, [ticket.id, onBump])

  const handleRecall = useCallback(async () => {
    setIsProcessing(true)
    setLastAction('recall')
    try {
      await recallTicket(ticket.id)
      onRecall(ticket.id)
    } catch (error) {
      console.error('Failed to recall ticket:', error)
    } finally {
      setIsProcessing(false)
      setLastAction(null)
    }
  }, [ticket.id, onRecall])

  const handleFire = useCallback(async () => {
    setIsProcessing(true)
    setLastAction('fire')
    try {
      await fireTicket(ticket.id)
      onFire(ticket.id)
    } catch (error) {
      console.error('Failed to fire ticket:', error)
    } finally {
      setIsProcessing(false)
      setLastAction(null)
    }
  }, [ticket.id, onFire])

  const handlePriorityChange = useCallback(async (priority: TicketPriority) => {
    setIsProcessing(true)
    setLastAction('priority')
    try {
      await changeTicketPriority(ticket.id, priority)
      onPriorityChange(ticket.id, priority)
    } catch (error) {
      console.error('Failed to change priority:', error)
    } finally {
      setIsProcessing(false)
      setLastAction(null)
    }
  }, [ticket.id, onPriorityChange])

  // Format elapsed time for display
  const formattedElapsedTime = timeUtils.formatElapsedTime(elapsedTime, elapsedTime >= 3600)

  return (
    <div
      className={cn(
        'kds-ticket relative',
        'bg-gray-900 border-2 rounded-lg p-4',
        'transition-all duration-300',
        urgency === 'urgent' && 'kds-urgent',
        urgency === 'warning' && 'kds-warning',
        urgency === 'normal' && 'kds-ticket-normal',
        ticket.isFired && 'ring-2 ring-red-500',
        ticket.isRecalled && 'ring-2 ring-yellow-500',
        ticket.status === 'completed' && 'opacity-75',
        isProcessing && 'pointer-events-none',
        className
      )}
      data-ticket-id={ticket.id}
      data-urgency={urgency}
      tabIndex={0}
      role="button"
      aria-label={`Order ${ticket.order.displayNumber} for ${config.showTable && ticket.order.tableNumber ? `table ${ticket.order.tableNumber}` : ticket.order.customer.name || 'customer'}`}
    >
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-lg">
          <div className="flex items-center gap-2 text-white">
            <LoadingSpinner />
            <span className="text-sm font-medium">
              {lastAction === 'bump' && 'Completing...'}
              {lastAction === 'recall' && 'Recalling...'}
              {lastAction === 'fire' && 'Firing...'}
              {lastAction === 'priority' && 'Updating...'}
            </span>
          </div>
        </div>
      )}

      {/* Ticket Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {/* Order Number */}
          <div className="text-2xl font-bold text-white kds-text-high-contrast">
            {ticket.order.displayNumber}
          </div>
          
          {/* Priority Badge */}
          {ticket.order.priority !== 'normal' && (
            <div className={cn(
              'px-2 py-1 text-xs font-bold rounded uppercase tracking-wide',
              priorityColor
            )}>
              {ticket.order.priority}
            </div>
          )}
          
          {/* Fire Indicator */}
          {ticket.isFired && (
            <div className="text-red-500 animate-pulse" title="FIRED ORDER">
              🔥
            </div>
          )}
        </div>
        
        {/* Timer */}
        <div className="text-right">
          <div className={cn(
            'text-lg font-mono font-bold',
            urgency === 'urgent' ? 'text-red-400' :
            urgency === 'warning' ? 'text-yellow-400' :
            'text-white'
          )}>
            {formattedElapsedTime}
          </div>
          {config.showTimer && (
            <div className="text-xs text-gray-400">
              Target: {ticket.cookTime}min
            </div>
          )}
        </div>
      </div>

      {/* Order Information */}
      <div className="mb-3 space-y-1">
        {/* Customer & Table */}
        <div className="flex justify-between text-sm">
          {config.showCustomer && ticket.order.customer.name && (
            <div className="text-gray-300 truncate">
              Customer: <span className="text-white">{ticket.order.customer.name}</span>
            </div>
          )}
          {config.showTable && ticket.order.tableNumber && (
            <div className="text-gray-300 flex-shrink-0">
              Table: <span className="text-white font-semibold">{ticket.order.tableNumber}</span>
            </div>
          )}
        </div>
        
        {/* Server */}
        {config.showServer && ticket.order.serverName && (
          <div className="text-sm text-gray-300">
            Server: <span className="text-white">{ticket.order.serverName}</span>
          </div>
        )}
        
        {/* Source */}
        {config.showSource && (
          <div className="text-sm text-gray-300">
            Source: <span className="text-white capitalize">{ticket.order.source}</span>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="space-y-2 mb-4">
        {ticket.items.map((item, index) => (
          <div 
            key={`${item.id}-${index}`}
            className="border-t border-gray-700 pt-2 first:border-t-0 first:pt-0"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white kds-text-kitchen">
                    {item.quantity}x {item.name}
                  </span>
                  {item.isRush && (
                    <span className="text-xs bg-red-600 text-white px-1 py-0.5 rounded font-bold">
                      RUSH
                    </span>
                  )}
                </div>
                
                {/* Modifiers */}
                {item.modifiers.length > 0 && (
                  <div className="text-sm text-yellow-200 mt-1 pl-4">
                    {formatUtils.formatModifiers(item.modifiers)}
                  </div>
                )}
                
                {/* Special Instructions */}
                {item.specialInstructions && (
                  <div className="text-sm text-cyan-200 mt-1 pl-4 font-medium">
                    Note: {item.specialInstructions}
                  </div>
                )}
                
                {/* Allergens */}
                {config.showAllergies && item.allergens && item.allergens.length > 0 && (
                  <div className="text-sm text-red-300 mt-1 pl-4 font-bold">
                    ⚠️ Allergens: {item.allergens.join(', ')}
                  </div>
                )}
              </div>
              
              {/* Cook Time */}
              <div className="text-xs text-gray-400 ml-2 flex-shrink-0">
                {item.cookTime}min
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Special Instructions for Order */}
      {ticket.order.specialInstructions && (
        <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded p-2 mb-4">
          <div className="text-xs text-blue-300 font-semibold mb-1">SPECIAL INSTRUCTIONS:</div>
          <div className="text-sm text-white">{ticket.order.specialInstructions}</div>
        </div>
      )}

      {/* Allergen Warnings */}
      {config.showAllergies && ticket.order.allergenWarnings.length > 0 && (
        <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded p-2 mb-4">
          <div className="text-xs text-red-300 font-bold mb-1">⚠️ ALLERGEN WARNINGS:</div>
          <div className="text-sm text-red-200 font-semibold">
            {ticket.order.allergenWarnings.join(', ').toUpperCase()}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        {/* Bump Button */}
        {ticket.status !== 'completed' && (
          <button
            onClick={handleBump}
            disabled={isProcessing}
            className={cn(
              'kds-button flex-1 bg-green-600 hover:bg-green-500',
              'text-white font-bold py-3 px-4 rounded',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'focus:outline-none focus:ring-2 focus:ring-green-400',
              'active:transform active:scale-95'
            )}
            aria-label="Complete this order"
          >
            ✓ BUMP
          </button>
        )}

        {/* Recall Button */}
        {ticket.status === 'completed' && (
          <button
            onClick={handleRecall}
            disabled={isProcessing}
            className={cn(
              'kds-button flex-1 bg-yellow-600 hover:bg-yellow-500',
              'text-white font-bold py-3 px-4 rounded',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'focus:outline-none focus:ring-2 focus:ring-yellow-400',
              'active:transform active:scale-95'
            )}
            aria-label="Recall this completed order"
          >
            ↺ RECALL
          </button>
        )}

        {/* Fire Button */}
        {!ticket.isFired && ticket.status !== 'completed' && (
          <button
            onClick={handleFire}
            disabled={isProcessing}
            className={cn(
              'kds-button bg-red-600 hover:bg-red-500',
              'text-white font-bold py-3 px-3 rounded',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'focus:outline-none focus:ring-2 focus:ring-red-400',
              'active:transform active:scale-95'
            )}
            aria-label="Mark as urgent (fire)"
            title="Fire Order (Mark as Urgent)"
          >
            🔥
          </button>
        )}

        {/* Priority Menu */}
        <PriorityDropdown
          currentPriority={ticket.order.priority}
          onPriorityChange={handlePriorityChange}
          disabled={isProcessing}
        />
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-700 text-xs text-gray-400">
        <div>
          Started: {timeUtils.formatTime(ticket.startTime)}
        </div>
        <div className="flex items-center gap-2">
          {ticket.completedTime && (
            <div>Completed: {timeUtils.formatTime(ticket.completedTime)}</div>
          )}
          <div className={cn(
            'w-2 h-2 rounded-full',
            ticket.status === 'completed' ? 'bg-green-500' :
            ticket.status === 'preparing' ? 'bg-blue-500' :
            'bg-gray-500'
          )} />
        </div>
      </div>
    </div>
  )
}

/**
 * Priority Dropdown Component
 */
function PriorityDropdown({ 
  currentPriority, 
  onPriorityChange, 
  disabled 
}: {
  currentPriority: TicketPriority
  onPriorityChange: (priority: TicketPriority) => void
  disabled: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)

  const priorities: { value: TicketPriority; label: string; color: string }[] = [
    { value: 'normal', label: 'Normal', color: 'bg-gray-600' },
    { value: 'urgent', label: 'Urgent', color: 'bg-yellow-600' },
    { value: 'rush', label: 'Rush', color: 'bg-orange-600' },
    { value: 'fire', label: 'Fire', color: 'bg-red-600' }
  ]

  const currentPriorityData = priorities.find(p => p.value === currentPriority)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'kds-button px-3 py-3 rounded text-white font-medium text-sm',
          currentPriorityData?.color || 'bg-gray-600',
          'hover:opacity-80 disabled:opacity-50',
          'focus:outline-none focus:ring-2 focus:ring-blue-400'
        )}
        aria-label={`Change priority from ${currentPriority}`}
        title="Change Priority"
      >
        ⚡
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 bg-gray-800 border border-gray-600 rounded shadow-lg z-20">
          {priorities.map((priority) => (
            <button
              key={priority.value}
              onClick={() => {
                onPriorityChange(priority.value)
                setIsOpen(false)
              }}
              className={cn(
                'w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700',
                'flex items-center gap-2',
                priority.value === currentPriority && 'bg-gray-700'
              )}
            >
              <div className={cn('w-2 h-2 rounded-full', priority.color)} />
              {priority.label}
              {priority.value === currentPriority && ' ✓'}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Loading Spinner Component
 */
function LoadingSpinner() {
  return (
    <div className="w-4 h-4 border-2 border-gray-300 border-t-white rounded-full animate-spin" />
  )
}

export default Ticket