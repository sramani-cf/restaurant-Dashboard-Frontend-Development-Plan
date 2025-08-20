/**
 * KDS Server Actions
 * 
 * Server actions for handling KDS operations like bumping tickets,
 * updating priorities, and managing real-time data updates.
 */

'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  KdsOrder,
  KdsTicket,
  TicketPriority,
  OrderStatus,
  StationId,
  KdsApiResponse
} from '../../lib/kds/types'

/**
 * Bump a ticket (mark as completed at station level)
 */
export async function bumpTicket(ticketId: string): Promise<KdsApiResponse> {
  try {
    // In a real implementation, this would update the database
    // For now, we'll simulate the action
    
    console.log(`Bumping ticket: ${ticketId}`)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // In production, you would:
    // 1. Update the ticket status in the database
    // 2. Notify other KDS displays via WebSocket
    // 3. Update order status if all station tickets are complete
    
    // Revalidate KDS data to trigger re-fetch
    revalidateTag('kds-tickets')
    revalidateTag('kds-orders')
    revalidatePath('/kds')
    
    return {
      success: true,
      data: { ticketId, status: 'completed', bumpedAt: new Date() },
      timestamp: new Date()
    }
  } catch (error) {
    console.error('Error bumping ticket:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to bump ticket',
      timestamp: new Date()
    }
  }
}

/**
 * Recall a completed ticket
 */
export async function recallTicket(ticketId: string): Promise<KdsApiResponse> {
  try {
    console.log(`Recalling ticket: ${ticketId}`)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // In production, you would:
    // 1. Update the ticket status back to preparing
    // 2. Set isRecalled flag
    // 3. Notify kitchen staff
    // 4. Update order status accordingly
    
    revalidateTag('kds-tickets')
    revalidateTag('kds-orders')
    revalidatePath('/kds')
    
    return {
      success: true,
      data: { ticketId, status: 'preparing', recalledAt: new Date() },
      timestamp: new Date()
    }
  } catch (error) {
    console.error('Error recalling ticket:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to recall ticket',
      timestamp: new Date()
    }
  }
}

/**
 * Fire a ticket (mark as urgent/rush)
 */
export async function fireTicket(ticketId: string): Promise<KdsApiResponse> {
  try {
    console.log(`Firing ticket: ${ticketId}`)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // In production, you would:
    // 1. Update the ticket priority to fire/rush
    // 2. Move ticket to top of queue
    // 3. Send urgent notifications
    // 4. Update display colors and animations
    
    revalidateTag('kds-tickets')
    revalidateTag('kds-orders')
    revalidatePath('/kds')
    
    return {
      success: true,
      data: { ticketId, priority: 'fire', firedAt: new Date() },
      timestamp: new Date()
    }
  } catch (error) {
    console.error('Error firing ticket:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fire ticket',
      timestamp: new Date()
    }
  }
}

/**
 * Change ticket priority
 */
export async function changeTicketPriority(
  ticketId: string, 
  priority: TicketPriority
): Promise<KdsApiResponse> {
  try {
    console.log(`Changing ticket ${ticketId} priority to: ${priority}`)
    
    // Validate priority value
    const validPriorities: TicketPriority[] = ['normal', 'urgent', 'rush', 'fire']
    if (!validPriorities.includes(priority)) {
      throw new Error(`Invalid priority: ${priority}`)
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // In production, you would:
    // 1. Update the ticket and order priority
    // 2. Re-sort ticket queue based on new priority
    // 3. Send notifications if priority is high
    // 4. Update kitchen display accordingly
    
    revalidateTag('kds-tickets')
    revalidateTag('kds-orders')
    revalidatePath('/kds')
    
    return {
      success: true,
      data: { ticketId, priority, updatedAt: new Date() },
      timestamp: new Date()
    }
  } catch (error) {
    console.error('Error changing ticket priority:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to change priority',
      timestamp: new Date()
    }
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string, 
  status: OrderStatus
): Promise<KdsApiResponse> {
  try {
    console.log(`Updating order ${orderId} status to: ${status}`)
    
    // Validate status value
    const validStatuses: OrderStatus[] = ['pending', 'preparing', 'ready', 'completed', 'cancelled']
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status: ${status}`)
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // In production, you would:
    // 1. Update order status in database
    // 2. Update all related tickets
    // 3. Send notifications to customer/server
    // 4. Update metrics and analytics
    
    revalidateTag('kds-orders')
    revalidateTag('kds-tickets')
    revalidateTag('kds-metrics')
    revalidatePath('/kds')
    
    return {
      success: true,
      data: { orderId, status, updatedAt: new Date() },
      timestamp: new Date()
    }
  } catch (error) {
    console.error('Error updating order status:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update order status',
      timestamp: new Date()
    }
  }
}

/**
 * Move ticket to different station
 */
export async function moveTicketToStation(
  ticketId: string, 
  targetStation: StationId
): Promise<KdsApiResponse> {
  try {
    console.log(`Moving ticket ${ticketId} to station: ${targetStation}`)
    
    // Validate station ID
    const validStations: StationId[] = ['grill', 'fryer', 'salad', 'expo', 'pantry', 'dessert', 'beverage']
    if (!validStations.includes(targetStation)) {
      throw new Error(`Invalid station: ${targetStation}`)
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 250))
    
    // In production, you would:
    // 1. Update ticket station assignment
    // 2. Notify both old and new stations
    // 3. Update station capacity counts
    // 4. Log the station change for auditing
    
    revalidateTag('kds-tickets')
    revalidateTag('kds-stations')
    revalidatePath('/kds')
    
    return {
      success: true,
      data: { ticketId, station: targetStation, movedAt: new Date() },
      timestamp: new Date()
    }
  } catch (error) {
    console.error('Error moving ticket to station:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to move ticket',
      timestamp: new Date()
    }
  }
}

/**
 * Add special instructions to ticket
 */
export async function addTicketInstructions(
  ticketId: string, 
  instructions: string
): Promise<KdsApiResponse> {
  try {
    console.log(`Adding instructions to ticket ${ticketId}: ${instructions}`)
    
    // Validate instructions
    if (!instructions || instructions.trim().length === 0) {
      throw new Error('Instructions cannot be empty')
    }
    
    if (instructions.length > 500) {
      throw new Error('Instructions too long (max 500 characters)')
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // In production, you would:
    // 1. Add instructions to ticket record
    // 2. Notify kitchen staff of new instructions
    // 3. Highlight ticket with instruction indicator
    // 4. Log instruction addition with timestamp
    
    revalidateTag('kds-tickets')
    revalidatePath('/kds')
    
    return {
      success: true,
      data: { 
        ticketId, 
        instructions: instructions.trim(), 
        addedAt: new Date() 
      },
      timestamp: new Date()
    }
  } catch (error) {
    console.error('Error adding ticket instructions:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add instructions',
      timestamp: new Date()
    }
  }
}

/**
 * Update estimated completion time
 */
export async function updateEstimatedTime(
  ticketId: string, 
  estimatedMinutes: number
): Promise<KdsApiResponse> {
  try {
    console.log(`Updating estimated time for ticket ${ticketId}: ${estimatedMinutes} minutes`)
    
    // Validate estimated time
    if (estimatedMinutes < 0 || estimatedMinutes > 120) {
      throw new Error('Estimated time must be between 0 and 120 minutes')
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const estimatedTime = new Date(Date.now() + estimatedMinutes * 60000)
    
    // In production, you would:
    // 1. Update ticket estimated completion time
    // 2. Recalculate order timing
    // 3. Update customer notifications
    // 4. Adjust station scheduling
    
    revalidateTag('kds-tickets')
    revalidateTag('kds-metrics')
    revalidatePath('/kds')
    
    return {
      success: true,
      data: { 
        ticketId, 
        estimatedMinutes, 
        estimatedTime,
        updatedAt: new Date() 
      },
      timestamp: new Date()
    }
  } catch (error) {
    console.error('Error updating estimated time:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update estimated time',
      timestamp: new Date()
    }
  }
}

/**
 * Batch update multiple tickets
 */
export async function batchUpdateTickets(
  updates: Array<{
    ticketId: string
    action: 'bump' | 'recall' | 'fire'
    data?: any
  }>
): Promise<KdsApiResponse> {
  try {
    console.log(`Batch updating ${updates.length} tickets`)
    
    if (updates.length === 0) {
      throw new Error('No updates provided')
    }
    
    if (updates.length > 50) {
      throw new Error('Too many updates (max 50)')
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const results = []
    
    for (const update of updates) {
      try {
        let result
        switch (update.action) {
          case 'bump':
            result = await bumpTicket(update.ticketId)
            break
          case 'recall':
            result = await recallTicket(update.ticketId)
            break
          case 'fire':
            result = await fireTicket(update.ticketId)
            break
          default:
            throw new Error(`Invalid action: ${update.action}`)
        }
        results.push(result)
      } catch (error) {
        results.push({
          success: false,
          error: error instanceof Error ? error.message : 'Update failed',
          timestamp: new Date()
        })
      }
    }
    
    // Revalidate all KDS data after batch update
    revalidateTag('kds-tickets')
    revalidateTag('kds-orders')
    revalidateTag('kds-metrics')
    revalidatePath('/kds')
    
    const successful = results.filter(r => r.success).length
    const failed = results.length - successful
    
    return {
      success: failed === 0,
      data: { 
        total: results.length, 
        successful, 
        failed, 
        results 
      },
      timestamp: new Date()
    }
  } catch (error) {
    console.error('Error in batch update:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Batch update failed',
      timestamp: new Date()
    }
  }
}

/**
 * Reset KDS display (emergency function)
 */
export async function resetKdsDisplay(): Promise<KdsApiResponse> {
  try {
    console.log('Resetting KDS display')
    
    // Simulate reset delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In production, you would:
    // 1. Clear any stuck states
    // 2. Refresh all data from source
    // 3. Reset WebSocket connections
    // 4. Clear local cache
    // 5. Reinitialize display components
    
    // Revalidate everything
    revalidateTag('kds-tickets')
    revalidateTag('kds-orders')
    revalidateTag('kds-metrics')
    revalidateTag('kds-stations')
    revalidatePath('/kds')
    
    return {
      success: true,
      data: { resetAt: new Date(), message: 'KDS display reset successfully' },
      timestamp: new Date()
    }
  } catch (error) {
    console.error('Error resetting KDS display:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to reset display',
      timestamp: new Date()
    }
  }
}

/**
 * Log KDS action for audit trail
 */
export async function logKdsAction(
  action: string,
  details: Record<string, any>,
  userId?: string
): Promise<void> {
  try {
    // In production, you would log this to an audit system
    console.log('KDS Action:', {
      action,
      details,
      userId: userId || 'anonymous',
      timestamp: new Date(),
      userAgent: 'KDS-Terminal'
    })
    
    // Could also send to analytics or monitoring service
  } catch (error) {
    console.error('Error logging KDS action:', error)
    // Don't throw here - logging failures shouldn't break operations
  }
}

/**
 * Emergency stop all orders (for food safety issues)
 */
export async function emergencyStopAllOrders(
  reason: string
): Promise<KdsApiResponse> {
  try {
    console.log('EMERGENCY STOP - Reason:', reason)
    
    if (!reason || reason.trim().length === 0) {
      throw new Error('Emergency stop reason is required')
    }
    
    // Log the emergency stop
    await logKdsAction('emergency_stop', { reason }, 'system')
    
    // Simulate emergency stop processing
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // In production, you would:
    // 1. Immediately stop all active orders
    // 2. Send alerts to management
    // 3. Display emergency notice on all KDS screens
    // 4. Log detailed incident report
    // 5. Potentially contact health department
    
    revalidateTag('kds-orders')
    revalidateTag('kds-tickets')
    revalidatePath('/kds')
    
    return {
      success: true,
      data: { 
        reason: reason.trim(), 
        stoppedAt: new Date(),
        message: 'Emergency stop activated - all orders halted'
      },
      timestamp: new Date()
    }
  } catch (error) {
    console.error('Error executing emergency stop:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Emergency stop failed',
      timestamp: new Date()
    }
  }
}