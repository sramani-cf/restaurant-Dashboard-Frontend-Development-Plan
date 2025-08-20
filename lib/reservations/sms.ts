import { SMSNotification, WaitlistEntry, Reservation, Guest } from './types';

// SMS Templates
const SMS_TEMPLATES = {
  RESERVATION_CONFIRMATION: (guestName: string, date: string, time: string, partySize: number) =>
    `Hi ${guestName}, your reservation for ${partySize} on ${date} at ${time} is confirmed. Reply CANCEL to cancel. - {Restaurant Name}`,
  
  RESERVATION_REMINDER: (guestName: string, time: string, partySize: number) =>
    `Hi ${guestName}, reminder: your table for ${partySize} is reserved for ${time} today. See you soon! - {Restaurant Name}`,
  
  TABLE_READY: (guestName: string, estimatedWait?: number) =>
    `Hi ${guestName}, your table is ready! Please come to the host stand within the next 10 minutes. - {Restaurant Name}`,
  
  WAITLIST_UPDATE: (guestName: string, position: number, estimatedWait: number) =>
    `Hi ${guestName}, you're #${position} on our waitlist. Estimated wait time: ${estimatedWait} minutes. - {Restaurant Name}`,
  
  RESERVATION_CANCELLED: (guestName: string, date: string, time: string) =>
    `Hi ${guestName}, your reservation for ${date} at ${time} has been cancelled. We hope to see you again soon! - {Restaurant Name}`,
  
  NO_SHOW_FOLLOW_UP: (guestName: string) =>
    `Hi ${guestName}, we missed you today! If something came up, please let us know. We'd love to reschedule. - {Restaurant Name}`,
  
  WAITLIST_EXPIRED: (guestName: string) =>
    `Hi ${guestName}, your waitlist spot has expired. Please visit the host stand if you're still interested in dining with us. - {Restaurant Name}`,
  
  SPECIAL_OCCASION: (guestName: string, occasion: string, time: string) =>
    `Hi ${guestName}, we're excited to celebrate your ${occasion} with you today at ${time}! - {Restaurant Name}`,
};

interface SMSConfig {
  restaurantName: string;
  fromNumber: string;
  provider: 'twilio' | 'aws' | 'mock';
  credentials?: {
    accountSid?: string;
    authToken?: string;
    accessKey?: string;
    secretKey?: string;
  };
  enableDeliveryReceipts: boolean;
  enableOptOut: boolean;
  maxRetries: number;
}

// Mock SMS service configuration
const defaultConfig: SMSConfig = {
  restaurantName: 'Bella Vista Restaurant',
  fromNumber: '+1234567890',
  provider: 'mock',
  enableDeliveryReceipts: true,
  enableOptOut: true,
  maxRetries: 3
};

class SMSService {
  private config: SMSConfig;
  private notifications: SMSNotification[] = [];
  
  constructor(config: Partial<SMSConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }
  
  private generateNotificationId(): string {
    return `sms_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  private formatTemplate(template: string): string {
    return template.replace('{Restaurant Name}', this.config.restaurantName);
  }
  
  private async sendSMS(phoneNumber: string, message: string, type: SMSNotification['type'], relatedId?: string): Promise<SMSNotification> {
    const notification: SMSNotification = {
      id: this.generateNotificationId(),
      phoneNumber,
      message: this.formatTemplate(message),
      type,
      status: 'pending',
      ...(relatedId && { reservationId: relatedId }),
    };
    
    this.notifications.push(notification);
    
    try {
      // Simulate sending SMS
      await this.mockSendSMS(notification);
      
      notification.status = 'sent';
      notification.sentAt = new Date().toISOString();
      
      // Simulate delivery receipt after a delay
      setTimeout(() => {
        if (this.config.enableDeliveryReceipts) {
          notification.status = 'delivered';
          notification.deliveredAt = new Date().toISOString();
        }
      }, Math.random() * 3000 + 1000); // 1-4 seconds
      
      return notification;
      
    } catch (error) {
      notification.status = 'failed';
      notification.errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw error;
    }
  }
  
  private async mockSendSMS(notification: SMSNotification): Promise<void> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
    
    // Simulate occasional failures (5% failure rate)
    if (Math.random() < 0.05) {
      throw new Error('SMS delivery failed');
    }
    
    console.log(`[SMS Mock] Sending to ${notification.phoneNumber}: ${notification.message}`);
  }
  
  // Public methods for different notification types
  async sendReservationConfirmation(
    reservation: Reservation, 
    guest: Guest
  ): Promise<SMSNotification> {
    const date = new Date(reservation.dateTime).toLocaleDateString();
    const time = new Date(reservation.dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    const message = SMS_TEMPLATES.RESERVATION_CONFIRMATION(
      guest.firstName,
      date,
      time,
      reservation.partySize
    );
    
    return this.sendSMS(guest.phone, message, 'confirmation', reservation.id);
  }
  
  async sendReservationReminder(
    reservation: Reservation, 
    guest: Guest
  ): Promise<SMSNotification> {
    const time = new Date(reservation.dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    const message = SMS_TEMPLATES.RESERVATION_REMINDER(
      guest.firstName,
      time,
      reservation.partySize
    );
    
    return this.sendSMS(guest.phone, message, 'reservation_reminder', reservation.id);
  }
  
  async sendTableReadyNotification(
    waitlistEntry: WaitlistEntry, 
    guest: Guest
  ): Promise<SMSNotification> {
    const message = SMS_TEMPLATES.TABLE_READY(guest.firstName);
    
    const notification = await this.sendSMS(guest.phone, message, 'table_ready');
    notification.waitlistEntryId = waitlistEntry.id;
    return notification;
  }
  
  async sendWaitlistUpdate(
    waitlistEntry: WaitlistEntry, 
    guest: Guest, 
    position: number
  ): Promise<SMSNotification> {
    const message = SMS_TEMPLATES.WAITLIST_UPDATE(
      guest.firstName,
      position,
      waitlistEntry.estimatedWaitTime
    );
    
    const notification = await this.sendSMS(guest.phone, message, 'waitlist_update');
    notification.waitlistEntryId = waitlistEntry.id;
    return notification;
  }
  
  async sendReservationCancellation(
    reservation: Reservation, 
    guest: Guest
  ): Promise<SMSNotification> {
    const date = new Date(reservation.dateTime).toLocaleDateString();
    const time = new Date(reservation.dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    const message = SMS_TEMPLATES.RESERVATION_CANCELLED(
      guest.firstName,
      date,
      time
    );
    
    return this.sendSMS(guest.phone, message, 'confirmation', reservation.id);
  }
  
  async sendNoShowFollowUp(
    reservation: Reservation, 
    guest: Guest
  ): Promise<SMSNotification> {
    const message = SMS_TEMPLATES.NO_SHOW_FOLLOW_UP(guest.firstName);
    
    return this.sendSMS(guest.phone, message, 'reservation_reminder', reservation.id);
  }
  
  async sendSpecialOccasionMessage(
    reservation: Reservation, 
    guest: Guest
  ): Promise<SMSNotification> {
    if (!reservation.occasion) {
      throw new Error('No special occasion specified');
    }
    
    const time = new Date(reservation.dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    const message = SMS_TEMPLATES.SPECIAL_OCCASION(
      guest.firstName,
      reservation.occasion,
      time
    );
    
    return this.sendSMS(guest.phone, message, 'reservation_reminder', reservation.id);
  }
  
  async sendCustomMessage(
    phoneNumber: string, 
    message: string, 
    relatedId?: string
  ): Promise<SMSNotification> {
    return this.sendSMS(phoneNumber, message, 'confirmation', relatedId);
  }
  
  // Bulk operations
  async sendBulkReminders(
    reservations: { reservation: Reservation; guest: Guest }[]
  ): Promise<SMSNotification[]> {
    const notifications: SMSNotification[] = [];
    const batchSize = 10; // Send in batches to avoid rate limiting
    
    for (let i = 0; i < reservations.length; i += batchSize) {
      const batch = reservations.slice(i, i + batchSize);
      const batchPromises = batch.map(({ reservation, guest }) =>
        this.sendReservationReminder(reservation, guest)
      );
      
      try {
        const batchResults = await Promise.allSettled(batchPromises);
        batchResults.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            notifications.push(result.value);
          } else {
            console.error(`Failed to send reminder to ${batch[index].guest.phone}:`, result.reason);
          }
        });
        
        // Add delay between batches
        if (i + batchSize < reservations.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error('Batch SMS sending error:', error);
      }
    }
    
    return notifications;
  }
  
  // Notification management
  getNotifications(filters?: {
    phoneNumber?: string;
    type?: SMSNotification['type'];
    status?: SMSNotification['status'];
    dateRange?: { start: string; end: string };
  }): SMSNotification[] {
    let filtered = [...this.notifications];
    
    if (filters) {
      if (filters.phoneNumber) {
        filtered = filtered.filter(n => n.phoneNumber.includes(filters.phoneNumber!));
      }
      
      if (filters.type) {
        filtered = filtered.filter(n => n.type === filters.type);
      }
      
      if (filters.status) {
        filtered = filtered.filter(n => n.status === filters.status);
      }
      
      if (filters.dateRange) {
        const start = new Date(filters.dateRange.start);
        const end = new Date(filters.dateRange.end);
        filtered = filtered.filter(n => {
          const notificationDate = new Date(n.sentAt || Date.now());
          return notificationDate >= start && notificationDate <= end;
        });
      }
    }
    
    return filtered.sort((a, b) => 
      new Date(b.sentAt || b.id).getTime() - new Date(a.sentAt || a.id).getTime()
    );
  }
  
  getNotificationById(id: string): SMSNotification | undefined {
    return this.notifications.find(n => n.id === id);
  }
  
  async retryFailedNotification(id: string): Promise<SMSNotification> {
    const notification = this.getNotificationById(id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    
    if (notification.status !== 'failed') {
      throw new Error('Can only retry failed notifications');
    }
    
    // Create new notification for retry
    return this.sendSMS(
      notification.phoneNumber,
      notification.message,
      notification.type,
      notification.reservationId || notification.waitlistEntryId
    );
  }
  
  // Analytics
  getNotificationStats(dateRange?: { start: string; end: string }) {
    const notifications = this.getNotifications(dateRange ? { dateRange } : undefined);
    
    return {
      total: notifications.length,
      sent: notifications.filter(n => n.status === 'sent' || n.status === 'delivered').length,
      delivered: notifications.filter(n => n.status === 'delivered').length,
      failed: notifications.filter(n => n.status === 'failed').length,
      pending: notifications.filter(n => n.status === 'pending').length,
      deliveryRate: notifications.length > 0 
        ? (notifications.filter(n => n.status === 'delivered').length / notifications.length) * 100 
        : 0,
      byType: {
        confirmation: notifications.filter(n => n.type === 'confirmation').length,
        reminder: notifications.filter(n => n.type === 'reservation_reminder').length,
        tableReady: notifications.filter(n => n.type === 'table_ready').length,
        waitlistUpdate: notifications.filter(n => n.type === 'waitlist_update').length,
      }
    };
  }
  
  // Configuration
  updateConfig(newConfig: Partial<SMSConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
  
  getConfig(): SMSConfig {
    return { ...this.config };
  }
}

// Automated SMS workflows
export class AutomatedSMSWorkflows {
  private smsService: SMSService;
  
  constructor(smsService: SMSService) {
    this.smsService = smsService;
  }
  
  // Send reminder 24 hours before reservation
  async scheduleReservationReminders(reservations: { reservation: Reservation; guest: Guest }[]): Promise<void> {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const tomorrowEnd = new Date(tomorrow);
    tomorrowEnd.setHours(23, 59, 59, 999);
    
    const tomorrowReservations = reservations.filter(({ reservation }) => {
      const resDate = new Date(reservation.dateTime);
      return resDate >= tomorrow && resDate <= tomorrowEnd && reservation.status === 'confirmed';
    });
    
    if (tomorrowReservations.length > 0) {
      console.log(`Sending ${tomorrowReservations.length} reservation reminders`);
      await this.smsService.sendBulkReminders(tomorrowReservations);
    }
  }
  
  // Send special occasion messages
  async sendSpecialOccasionReminders(reservations: { reservation: Reservation; guest: Guest }[]): Promise<void> {
    const specialOccasionReservations = reservations.filter(({ reservation }) => 
      reservation.occasion && reservation.status === 'confirmed'
    );
    
    for (const { reservation, guest } of specialOccasionReservations) {
      try {
        await this.smsService.sendSpecialOccasionMessage(reservation, guest);
      } catch (error) {
        console.error(`Failed to send special occasion message for reservation ${reservation.id}:`, error);
      }
    }
  }
  
  // Update waitlist positions
  async updateWaitlistPositions(waitlistEntries: { entry: WaitlistEntry; guest: Guest }[]): Promise<void> {
    const waitingEntries = waitlistEntries.filter(({ entry }) => entry.status === 'waiting');
    
    for (let i = 0; i < waitingEntries.length; i++) {
      const { entry, guest } = waitingEntries[i];
      const position = i + 1;
      
      // Only send updates if position or wait time changed significantly
      if (Math.abs(entry.estimatedWaitTime - (position * 15)) > 10) {
        try {
          await this.smsService.sendWaitlistUpdate(entry, guest, position);
        } catch (error) {
          console.error(`Failed to send waitlist update for entry ${entry.id}:`, error);
        }
      }
    }
  }
  
  // Follow up on no-shows
  async followUpNoShows(noShowReservations: { reservation: Reservation; guest: Guest }[]): Promise<void> {
    for (const { reservation, guest } of noShowReservations) {
      try {
        await this.smsService.sendNoShowFollowUp(reservation, guest);
      } catch (error) {
        console.error(`Failed to send no-show follow-up for reservation ${reservation.id}:`, error);
      }
    }
  }
}

// Export singleton instance
export const smsService = new SMSService();
export const automatedWorkflows = new AutomatedSMSWorkflows(smsService);

// Export types and utilities
export { SMSService, SMS_TEMPLATES };
export type { SMSConfig };