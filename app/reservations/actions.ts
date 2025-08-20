'use server';

import { revalidatePath } from 'next/cache';
import { 
  createReservation,
  updateReservation,
  cancelReservation,
  addToWaitlist,
  updateWaitlistEntry,
  updateTableStatus,
  getGuests,
  getTables,
  getReservations
} from '@/lib/reservations/data';
import { 
  CreateReservationData,
  UpdateReservationData,
  CreateWaitlistEntryData,
  TableStatus,
  WaitlistStatus,
  ApiResponse,
  Reservation,
  WaitlistEntry,
  Table,
  Guest
} from '@/lib/reservations/types';
import { smsService } from '@/lib/reservations/sms';
import { validateReservationData, validateGuestData } from '@/lib/reservations/utils';

// Reservation Actions
export async function createReservationAction(data: CreateReservationData): Promise<ApiResponse<Reservation>> {
  try {
    // Validate input data
    const validationErrors = validateReservationData(data);
    if (validationErrors.length > 0) {
      return {
        success: false,
        error: validationErrors.join(', ')
      };
    }

    // Create the reservation
    const result = await createReservation(data);
    
    if (result.success && result.data) {
      // Send confirmation SMS if guest info is provided
      if (data.guest?.phone || data.guestId) {
        try {
          let guest: Guest | null = null;
          
          if (data.guestId) {
            const guests = await getGuests();
            guest = guests.find(g => g.id === data.guestId) || null;
          } else if (data.guest) {
            // Create a temporary guest object for SMS
            guest = {
              id: 'temp',
              firstName: data.guest.firstName,
              lastName: data.guest.lastName,
              phone: data.guest.phone,
              email: data.guest.email,
              preferences: {},
              visitHistory: [],
              totalVisits: 0,
              totalSpent: 0,
              averageSpend: 0,
              vipStatus: 'regular',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            } as Guest;
          }
          
          if (guest) {
            await smsService.sendReservationConfirmation(result.data, guest);
          }
        } catch (smsError) {
          console.error('Failed to send reservation confirmation SMS:', smsError);
          // Don't fail the reservation creation if SMS fails
        }
      }
      
      revalidatePath('/reservations');
    }
    
    return result;
  } catch (error) {
    console.error('Create reservation error:', error);
    return {
      success: false,
      error: 'Failed to create reservation. Please try again.'
    };
  }
}

export async function updateReservationAction(
  id: string, 
  data: UpdateReservationData
): Promise<ApiResponse<Reservation>> {
  try {
    const result = await updateReservation(id, data);
    
    if (result.success) {
      revalidatePath('/reservations');
    }
    
    return result;
  } catch (error) {
    console.error('Update reservation error:', error);
    return {
      success: false,
      error: 'Failed to update reservation. Please try again.'
    };
  }
}

export async function cancelReservationAction(id: string, reason?: string): Promise<ApiResponse<void>> {
  try {
    // Get reservation and guest info for SMS notification
    const reservationsResponse = await getReservations();
    const reservation = reservationsResponse.data.find(r => r.id === id);
    
    const result = await cancelReservation(id);
    
    if (result.success && reservation) {
      // Send cancellation notification
      try {
        const guests = await getGuests();
        const guest = guests.find(g => g.id === reservation.guestId);
        
        if (guest) {
          await smsService.sendReservationCancellation(reservation, guest);
        }
      } catch (smsError) {
        console.error('Failed to send cancellation SMS:', smsError);
      }
      
      revalidatePath('/reservations');
    }
    
    return result;
  } catch (error) {
    console.error('Cancel reservation error:', error);
    return {
      success: false,
      error: 'Failed to cancel reservation. Please try again.'
    };
  }
}

export async function seatReservationAction(
  reservationId: string,
  tableId: string
): Promise<ApiResponse<Reservation>> {
  try {
    // Update reservation status to seated
    const result = await updateReservation(reservationId, {
      status: 'seated',
      tableId: tableId
    });
    
    if (result.success) {
      // Update table status to occupied
      await updateTableStatus(tableId, 'occupied');
      revalidatePath('/reservations');
    }
    
    return result;
  } catch (error) {
    console.error('Seat reservation error:', error);
    return {
      success: false,
      error: 'Failed to seat reservation. Please try again.'
    };
  }
}

export async function completeReservationAction(
  reservationId: string,
  tableId?: string
): Promise<ApiResponse<Reservation>> {
  try {
    const result = await updateReservation(reservationId, {
      status: 'completed'
    });
    
    if (result.success && tableId) {
      // Update table status to cleaning
      await updateTableStatus(tableId, 'cleaning');
      revalidatePath('/reservations');
    }
    
    return result;
  } catch (error) {
    console.error('Complete reservation error:', error);
    return {
      success: false,
      error: 'Failed to complete reservation. Please try again.'
    };
  }
}

export async function markNoShowAction(reservationId: string): Promise<ApiResponse<Reservation>> {
  try {
    const result = await updateReservation(reservationId, {
      status: 'no-show'
    });
    
    if (result.success) {
      // Send follow-up SMS for no-show
      try {
        const reservationsResponse = await getReservations();
        const reservation = reservationsResponse.data.find(r => r.id === reservationId);
        
        if (reservation) {
          const guests = await getGuests();
          const guest = guests.find(g => g.id === reservation.guestId);
          
          if (guest) {
            // Schedule follow-up SMS (could be sent immediately or delayed)
            setTimeout(async () => {
              try {
                await smsService.sendNoShowFollowUp(reservation, guest);
              } catch (error) {
                console.error('No-show follow-up SMS error:', error);
              }
            }, 60000); // Wait 1 minute
          }
        }
      } catch (smsError) {
        console.error('Failed to schedule no-show follow-up:', smsError);
      }
      
      revalidatePath('/reservations');
    }
    
    return result;
  } catch (error) {
    console.error('Mark no-show error:', error);
    return {
      success: false,
      error: 'Failed to mark reservation as no-show. Please try again.'
    };
  }
}

// Waitlist Actions
export async function addToWaitlistAction(data: CreateWaitlistEntryData): Promise<ApiResponse<WaitlistEntry>> {
  try {
    // Validate guest data if provided
    if (data.guest) {
      const validationErrors = validateGuestData(data.guest);
      if (validationErrors.length > 0) {
        return {
          success: false,
          error: validationErrors.join(', ')
        };
      }
    }

    const result = await addToWaitlist(data);
    
    if (result.success) {
      revalidatePath('/reservations');
    }
    
    return result;
  } catch (error) {
    console.error('Add to waitlist error:', error);
    return {
      success: false,
      error: 'Failed to add to waitlist. Please try again.'
    };
  }
}

export async function updateWaitlistEntryAction(
  id: string,
  status: WaitlistStatus
): Promise<ApiResponse<WaitlistEntry>> {
  try {
    const result = await updateWaitlistEntry(id, status);
    
    if (result.success && result.data) {
      // Send SMS notification based on status change
      try {
        const guests = await getGuests();
        const guest = guests.find(g => g.id === result.data!.guestId);
        
        if (guest && status === 'notified') {
          await smsService.sendTableReadyNotification(result.data, guest);
        }
      } catch (smsError) {
        console.error('Failed to send waitlist notification:', smsError);
      }
      
      revalidatePath('/reservations');
    }
    
    return result;
  } catch (error) {
    console.error('Update waitlist entry error:', error);
    return {
      success: false,
      error: 'Failed to update waitlist entry. Please try again.'
    };
  }
}

export async function seatFromWaitlistAction(
  waitlistId: string,
  tableId: string
): Promise<ApiResponse<{ waitlistEntry: WaitlistEntry; reservation: Reservation }>> {
  try {
    // Update waitlist entry to seated
    const waitlistResult = await updateWaitlistEntry(waitlistId, 'seated');
    
    if (waitlistResult.success && waitlistResult.data) {
      // Create a reservation for the waitlist entry
      const reservationData: CreateReservationData = {
        guestId: waitlistResult.data.guestId,
        partySize: waitlistResult.data.partySize,
        dateTime: new Date().toISOString(),
        duration: 120, // Default 2 hours
        source: 'walk-in'
      };
      
      const reservationResult = await createReservation(reservationData);
      
      if (reservationResult.success && reservationResult.data) {
        // Seat the reservation immediately
        await updateReservation(reservationResult.data.id, {
          status: 'seated',
          tableId: tableId
        });
        
        // Update table status
        await updateTableStatus(tableId, 'occupied');
        
        revalidatePath('/reservations');
        
        return {
          success: true,
          data: {
            waitlistEntry: waitlistResult.data,
            reservation: reservationResult.data
          },
          message: 'Guest seated successfully from waitlist'
        };
      }
    }
    
    return {
      success: false,
      error: 'Failed to seat guest from waitlist'
    };
  } catch (error) {
    console.error('Seat from waitlist error:', error);
    return {
      success: false,
      error: 'Failed to seat guest from waitlist. Please try again.'
    };
  }
}

// Table Management Actions
export async function updateTableStatusAction(
  tableId: string,
  status: TableStatus
): Promise<ApiResponse<Table>> {
  try {
    const result = await updateTableStatus(tableId, status);
    
    if (result.success) {
      revalidatePath('/reservations');
    }
    
    return result;
  } catch (error) {
    console.error('Update table status error:', error);
    return {
      success: false,
      error: 'Failed to update table status. Please try again.'
    };
  }
}

export async function combineTablesAction(
  tableIds: string[],
  combinationName: string
): Promise<ApiResponse<Table[]>> {
  try {
    if (tableIds.length < 2) {
      return {
        success: false,
        error: 'At least 2 tables are required for combination'
      };
    }

    // Get all tables to validate
    const allTables = await getTables();
    const tablesToCombine = allTables.filter(table => tableIds.includes(table.id));
    
    // Validate tables can be combined
    const canCombine = tablesToCombine.every(table => 
      table.isCombinable && 
      table.status === 'available' &&
      table.diningAreaId === tablesToCombine[0].diningAreaId
    );
    
    if (!canCombine) {
      return {
        success: false,
        error: 'Selected tables cannot be combined. Check that all tables are available and combinable.'
      };
    }

    // Update all tables to combined status
    const updatePromises = tableIds.map(id => updateTableStatus(id, 'combined'));
    const results = await Promise.all(updatePromises);
    
    const updatedTables = results
      .filter(result => result.success && result.data)
      .map(result => result.data!);
    
    if (updatedTables.length === tableIds.length) {
      revalidatePath('/reservations');
      return {
        success: true,
        data: updatedTables,
        message: `Tables combined successfully as "${combinationName}"`
      };
    } else {
      return {
        success: false,
        error: 'Failed to combine some tables'
      };
    }
  } catch (error) {
    console.error('Combine tables error:', error);
    return {
      success: false,
      error: 'Failed to combine tables. Please try again.'
    };
  }
}

export async function separateTablesAction(tableIds: string[]): Promise<ApiResponse<Table[]>> {
  try {
    // Update all tables back to available status
    const updatePromises = tableIds.map(id => updateTableStatus(id, 'available'));
    const results = await Promise.all(updatePromises);
    
    const updatedTables = results
      .filter(result => result.success && result.data)
      .map(result => result.data!);
    
    if (updatedTables.length === tableIds.length) {
      revalidatePath('/reservations');
      return {
        success: true,
        data: updatedTables,
        message: 'Tables separated successfully'
      };
    } else {
      return {
        success: false,
        error: 'Failed to separate some tables'
      };
    }
  } catch (error) {
    console.error('Separate tables error:', error);
    return {
      success: false,
      error: 'Failed to separate tables. Please try again.'
    };
  }
}

// Batch Operations
export async function batchUpdateReservationsAction(
  updates: { id: string; data: Partial<UpdateReservationData> }[]
): Promise<ApiResponse<{ successful: string[]; failed: string[] }>> {
  try {
    const results = await Promise.allSettled(
      updates.map(update => updateReservation(update.id, update.data))
    );
    
    const successful: string[] = [];
    const failed: string[] = [];
    
    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.success) {
        successful.push(updates[index].id);
      } else {
        failed.push(updates[index].id);
      }
    });
    
    if (successful.length > 0) {
      revalidatePath('/reservations');
    }
    
    return {
      success: true,
      data: { successful, failed },
      message: `Updated ${successful.length} reservations successfully`
    };
  } catch (error) {
    console.error('Batch update reservations error:', error);
    return {
      success: false,
      error: 'Failed to update reservations. Please try again.'
    };
  }
}

export async function sendBulkRemindersAction(reservationIds: string[]): Promise<ApiResponse<{ sent: number; failed: number }>> {
  try {
    const reservationsResponse = await getReservations();
    const reservations = reservationsResponse.data.filter(r => reservationIds.includes(r.id));
    const guests = await getGuests();
    
    const reservationGuestPairs = reservations.map(reservation => {
      const guest = guests.find(g => g.id === reservation.guestId);
      return guest ? { reservation, guest } : null;
    }).filter(Boolean) as { reservation: Reservation; guest: Guest }[];
    
    const notifications = await smsService.sendBulkReminders(reservationGuestPairs);
    
    return {
      success: true,
      data: {
        sent: notifications.filter(n => n.status === 'sent').length,
        failed: notifications.filter(n => n.status === 'failed').length
      },
      message: `Sent ${notifications.length} reminder notifications`
    };
  } catch (error) {
    console.error('Send bulk reminders error:', error);
    return {
      success: false,
      error: 'Failed to send reminder notifications. Please try again.'
    };
  }
}

// Real-time Actions
export async function subscribeToRealtimeUpdatesAction() {
  // This would typically set up WebSocket connections or Server-Sent Events
  // For now, we'll use the polling mechanism from the data layer
  
  // The actual real-time subscription would be handled on the client side
  // using the subscribeToUpdates function from the data layer
  
  return {
    success: true,
    message: 'Real-time updates subscription initiated'
  };
}