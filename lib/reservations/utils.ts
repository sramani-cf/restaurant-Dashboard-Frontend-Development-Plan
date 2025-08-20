import { 
  Table, 
  Reservation, 
  Guest, 
  WaitlistEntry, 
  TableStatus,
  ReservationStatus,
  WaitlistStatus,
  TableTurnover,
  AvailabilityWindow,
  FloorPlanElement,
  VIPStatus
} from './types';

// Date and Time Utilities
export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return `${formatDate(dateString)} at ${formatTime(dateString)}`;
}

export function isToday(dateString: string): boolean {
  const today = new Date();
  const date = new Date(dateString);
  return today.toDateString() === date.toDateString();
}

export function isTomorrow(dateString: string): boolean {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = new Date(dateString);
  return tomorrow.toDateString() === date.toDateString();
}

export function getTimeSlots(startHour: number = 17, endHour: number = 23, interval: number = 30): string[] {
  const slots = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      if (hour === endHour && minute > 0) break;
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(timeString);
    }
  }
  return slots;
}

export function addMinutes(dateString: string, minutes: number): string {
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString();
}

export function getDurationInMinutes(startTime: string, endTime: string): number {
  const start = new Date(startTime);
  const end = new Date(endTime);
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60));
}

export function isTimeSlotAvailable(
  targetTime: string,
  duration: number,
  existingReservations: Reservation[],
  tableId?: string
): boolean {
  const targetStart = new Date(targetTime);
  const targetEnd = new Date(targetStart.getTime() + duration * 60000);
  
  return !existingReservations.some(reservation => {
    if (tableId && reservation.tableId !== tableId) return false;
    if (reservation.status === 'cancelled' || reservation.status === 'no-show') return false;
    
    const resStart = new Date(reservation.dateTime);
    const resEnd = new Date(resStart.getTime() + reservation.duration * 60000);
    
    return (targetStart < resEnd && targetEnd > resStart);
  });
}

// Table Management Utilities
export function getTableStatusColor(status: TableStatus): string {
  switch (status) {
    case 'available':
      return '#10B981'; // green
    case 'occupied':
      return '#EF4444'; // red
    case 'reserved':
      return '#F59E0B'; // amber
    case 'cleaning':
      return '#6B7280'; // gray
    case 'maintenance':
      return '#8B5CF6'; // purple
    case 'combined':
      return '#3B82F6'; // blue
    default:
      return '#6B7280';
  }
}

export function getTableStatusLabel(status: TableStatus): string {
  switch (status) {
    case 'available':
      return 'Available';
    case 'occupied':
      return 'Occupied';
    case 'reserved':
      return 'Reserved';
    case 'cleaning':
      return 'Cleaning';
    case 'maintenance':
      return 'Maintenance';
    case 'combined':
      return 'Combined';
    default:
      return 'Unknown';
  }
}

export function canCombineTables(tables: Table[]): boolean {
  if (tables.length < 2) return false;
  
  return tables.every(table => 
    table.isCombinable && 
    table.status === 'available' &&
    table.diningAreaId === tables[0].diningAreaId
  );
}

export function calculateCombinedCapacity(tables: Table[]): number {
  return tables.reduce((total, table) => total + table.capacity, 0);
}

export function findOptimalTable(
  tables: Table[],
  partySize: number,
  preferredArea?: string
): Table | null {
  let availableTables = tables.filter(table => 
    table.status === 'available' && 
    table.capacity >= partySize &&
    (!preferredArea || table.diningAreaId === preferredArea)
  );
  
  if (availableTables.length === 0) {
    // Try to find combinable tables
    const combinableTables = tables.filter(table => 
      table.status === 'available' && 
      table.isCombinable &&
      (!preferredArea || table.diningAreaId === preferredArea)
    );
    
    // Simple combination logic - find two tables that together meet capacity
    for (let i = 0; i < combinableTables.length; i++) {
      for (let j = i + 1; j < combinableTables.length; j++) {
        const combined = [combinableTables[i], combinableTables[j]];
        if (calculateCombinedCapacity(combined) >= partySize) {
          return combinableTables[i]; // Return first table as primary
        }
      }
    }
    
    return null;
  }
  
  // Sort by capacity (prefer table closest to party size)
  availableTables.sort((a, b) => {
    const diffA = Math.abs(a.capacity - partySize);
    const diffB = Math.abs(b.capacity - partySize);
    return diffA - diffB;
  });
  
  return availableTables[0];
}

export function estimateTableAvailability(
  table: Table,
  currentReservations: Reservation[],
  averageTurnoverTime?: number
): string | null {
  const currentTime = new Date();
  const turnover = averageTurnoverTime || table.estimatedTurnoverTime || 120;
  
  if (table.status === 'available') return 'Now';
  if (table.status === 'maintenance' || table.status === 'cleaning') return null;
  
  // Find current or next reservation
  const activeReservation = currentReservations.find(res => 
    res.tableId === table.id && 
    res.status === 'seated' &&
    new Date(res.seatedAt || res.dateTime) <= currentTime
  );
  
  if (activeReservation) {
    const seatedTime = new Date(activeReservation.seatedAt || activeReservation.dateTime);
    const estimatedEnd = new Date(seatedTime.getTime() + turnover * 60000);
    
    if (estimatedEnd > currentTime) {
      return formatTime(estimatedEnd.toISOString());
    }
  }
  
  return 'Now';
}

// Reservation Utilities
export function getReservationStatusColor(status: ReservationStatus): string {
  switch (status) {
    case 'confirmed':
      return '#10B981'; // green
    case 'pending':
      return '#F59E0B'; // amber
    case 'seated':
      return '#3B82F6'; // blue
    case 'completed':
      return '#6B7280'; // gray
    case 'cancelled':
      return '#EF4444'; // red
    case 'no-show':
      return '#DC2626'; // dark red
    default:
      return '#6B7280';
  }
}

export function getReservationStatusLabel(status: ReservationStatus): string {
  switch (status) {
    case 'confirmed':
      return 'Confirmed';
    case 'pending':
      return 'Pending';
    case 'seated':
      return 'Seated';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    case 'no-show':
      return 'No Show';
    default:
      return 'Unknown';
  }
}

export function isReservationLate(reservation: Reservation): boolean {
  if (reservation.status !== 'confirmed' && reservation.status !== 'pending') {
    return false;
  }
  
  const now = new Date();
  const reservationTime = new Date(reservation.dateTime);
  const gracePeriod = 15 * 60 * 1000; // 15 minutes in milliseconds
  
  return now.getTime() > (reservationTime.getTime() + gracePeriod);
}

export function getReservationTimeStatus(reservation: Reservation): 'early' | 'on-time' | 'late' | 'very-late' {
  const now = new Date();
  const reservationTime = new Date(reservation.dateTime);
  const diffMinutes = (now.getTime() - reservationTime.getTime()) / (1000 * 60);
  
  if (diffMinutes < -30) return 'early';
  if (diffMinutes >= -30 && diffMinutes <= 15) return 'on-time';
  if (diffMinutes > 15 && diffMinutes <= 45) return 'late';
  return 'very-late';
}

export function calculateExpectedRevenue(reservation: Reservation, averageSpendPerPerson: number = 45): number {
  if (reservation.estimatedSpend) return reservation.estimatedSpend;
  return reservation.partySize * averageSpendPerPerson;
}

// Waitlist Utilities
export function getWaitlistStatusColor(status: WaitlistStatus): string {
  switch (status) {
    case 'waiting':
      return '#F59E0B'; // amber
    case 'notified':
      return '#3B82F6'; // blue
    case 'seated':
      return '#10B981'; // green
    case 'cancelled':
      return '#EF4444'; // red
    case 'no-show':
      return '#DC2626'; // dark red
    default:
      return '#6B7280';
  }
}

export function getWaitlistPriorityColor(priority: string): string {
  switch (priority) {
    case 'vip':
      return '#DC2626'; // red
    case 'high':
      return '#F59E0B'; // amber
    case 'normal':
      return '#10B981'; // green
    case 'low':
      return '#6B7280'; // gray
    default:
      return '#6B7280';
  }
}

export function updateWaitTimes(waitlist: WaitlistEntry[], averageTurnoverTime: number = 90): WaitlistEntry[] {
  return waitlist
    .filter(entry => entry.status === 'waiting')
    .map((entry, index) => {
      const baseWaitTime = (index + 1) * (averageTurnoverTime / 2);
      const priorityMultiplier = entry.priority === 'vip' ? 0.5 : 
                                 entry.priority === 'high' ? 0.75 : 1;
      
      return {
        ...entry,
        estimatedWaitTime: Math.max(5, Math.round(baseWaitTime * priorityMultiplier))
      };
    });
}

export function canSeatWaitlistEntry(entry: WaitlistEntry, availableTables: Table[]): boolean {
  return availableTables.some(table => 
    table.status === 'available' && 
    table.capacity >= entry.partySize
  );
}

// Guest Utilities
export function getGuestVIPStatusColor(status: VIPStatus): string {
  switch (status) {
    case 'celebrity':
      return '#DC2626'; // red
    case 'vip':
      return '#F59E0B'; // amber
    case 'frequent':
      return '#3B82F6'; // blue
    case 'regular':
      return '#6B7280'; // gray
    default:
      return '#6B7280';
  }
}

export function getGuestVIPStatusLabel(status: VIPStatus): string {
  switch (status) {
    case 'celebrity':
      return 'Celebrity';
    case 'vip':
      return 'VIP';
    case 'frequent':
      return 'Frequent Guest';
    case 'regular':
      return 'Regular';
    default:
      return 'Guest';
  }
}

export function calculateGuestLTV(guest: Guest): number {
  if (guest.totalVisits === 0) return 0;
  
  const monthsSinceFirstVisit = guest.visitHistory.length > 0 
    ? getDurationInMinutes(guest.createdAt, new Date().toISOString()) / (60 * 24 * 30)
    : 1;
  
  const visitsPerMonth = guest.totalVisits / Math.max(monthsSinceFirstVisit, 1);
  const projectedAnnualVisits = visitsPerMonth * 12;
  
  return projectedAnnualVisits * guest.averageSpend * 3; // 3-year projection
}

export function getGuestTags(guest: Guest): string[] {
  const tags = [];
  
  if (guest.vipStatus !== 'regular') {
    tags.push(getGuestVIPStatusLabel(guest.vipStatus));
  }
  
  if (guest.totalVisits > 50) tags.push('Loyal Customer');
  if (guest.averageSpend > 100) tags.push('High Spender');
  if (guest.preferences.dietaryRestrictions?.length) tags.push('Dietary Restrictions');
  if (guest.preferences.allergies?.length) tags.push('Allergies');
  if (guest.dateOfBirth) tags.push('Birthday on File');
  if (guest.anniversary) tags.push('Anniversary on File');
  
  const daysSinceLastVisit = guest.lastVisit 
    ? getDurationInMinutes(guest.lastVisit, new Date().toISOString()) / (60 * 24)
    : Infinity;
  
  if (daysSinceLastVisit > 90) tags.push('Needs Follow-up');
  if (daysSinceLastVisit <= 7) tags.push('Recent Visitor');
  
  return tags;
}

// Floor Plan Utilities
export function isPointInTable(x: number, y: number, table: Table): boolean {
  return x >= table.x && 
         x <= table.x + table.width && 
         y >= table.y && 
         y <= table.y + table.height;
}

export function getTableCenter(table: Table): { x: number; y: number } {
  return {
    x: table.x + table.width / 2,
    y: table.y + table.height / 2
  };
}

export function calculateDistance(point1: { x: number; y: number }, point2: { x: number; y: number }): number {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

export function findNearbyTables(table: Table, allTables: Table[], maxDistance: number = 150): Table[] {
  const tableCenter = getTableCenter(table);
  
  return allTables.filter(otherTable => {
    if (otherTable.id === table.id) return false;
    
    const otherCenter = getTableCenter(otherTable);
    const distance = calculateDistance(tableCenter, otherCenter);
    
    return distance <= maxDistance && otherTable.diningAreaId === table.diningAreaId;
  });
}

export function validateTablePosition(table: Table, existingTables: Table[], floorPlan: { width: number; height: number }): string[] {
  const errors = [];
  
  // Check boundaries
  if (table.x < 0 || table.y < 0) {
    errors.push('Table cannot be positioned outside floor plan boundaries');
  }
  
  if (table.x + table.width > floorPlan.width || table.y + table.height > floorPlan.height) {
    errors.push('Table extends beyond floor plan boundaries');
  }
  
  // Check overlaps
  const overlapping = existingTables.find(existingTable => {
    if (existingTable.id === table.id) return false;
    
    return !(table.x + table.width <= existingTable.x ||
             existingTable.x + existingTable.width <= table.x ||
             table.y + table.height <= existingTable.y ||
             existingTable.y + existingTable.height <= table.y);
  });
  
  if (overlapping) {
    errors.push(`Table overlaps with table ${overlapping.number}`);
  }
  
  return errors;
}

// Analytics Utilities
export function calculateTableUtilization(turnover: TableTurnover): number {
  const totalPossibleTurns = 8; // Assuming 8 possible turns per day
  return (turnover.totalTurns / totalPossibleTurns) * 100;
}

export function calculateAverageWaitTime(waitlist: WaitlistEntry[]): number {
  const seatedEntries = waitlist.filter(entry => entry.status === 'seated' && entry.seatedAt);
  
  if (seatedEntries.length === 0) return 0;
  
  const totalWaitTime = seatedEntries.reduce((sum, entry) => {
    const waitTime = getDurationInMinutes(entry.addedAt, entry.seatedAt!);
    return sum + waitTime;
  }, 0);
  
  return totalWaitTime / seatedEntries.length;
}

export function predictPeakTimes(reservations: Reservation[]): { time: string; count: number }[] {
  const timeCounts: { [key: string]: number } = {};
  
  reservations.forEach(reservation => {
    const hour = new Date(reservation.dateTime).getHours();
    const timeSlot = `${hour}:00`;
    timeCounts[timeSlot] = (timeCounts[timeSlot] || 0) + 1;
  });
  
  return Object.entries(timeCounts)
    .map(([time, count]) => ({ time, count }))
    .sort((a, b) => b.count - a.count);
}

// Validation Utilities
export function validateReservationData(data: any): string[] {
  const errors = [];
  
  if (!data.partySize || data.partySize < 1 || data.partySize > 20) {
    errors.push('Party size must be between 1 and 20');
  }
  
  if (!data.dateTime) {
    errors.push('Date and time is required');
  } else {
    const reservationDate = new Date(data.dateTime);
    const now = new Date();
    
    if (reservationDate < now) {
      errors.push('Reservation time cannot be in the past');
    }
    
    const maxAdvanceBooking = new Date();
    maxAdvanceBooking.setDate(maxAdvanceBooking.getDate() + 60);
    
    if (reservationDate > maxAdvanceBooking) {
      errors.push('Reservations cannot be made more than 60 days in advance');
    }
  }
  
  if (data.guest) {
    if (!data.guest.firstName || data.guest.firstName.trim().length < 2) {
      errors.push('First name must be at least 2 characters');
    }
    
    if (!data.guest.lastName || data.guest.lastName.trim().length < 2) {
      errors.push('Last name must be at least 2 characters');
    }
    
    if (!data.guest.phone || !/^\+?[\d\s\-\(\)]+$/.test(data.guest.phone)) {
      errors.push('Valid phone number is required');
    }
    
    if (data.guest.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.guest.email)) {
      errors.push('Valid email address is required');
    }
  }
  
  return errors;
}

export function validateGuestData(data: any): string[] {
  const errors = [];
  
  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters');
  }
  
  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.push('Last name must be at least 2 characters');
  }
  
  if (!data.phone || !/^\+?[\d\s\-\(\)]+$/.test(data.phone)) {
    errors.push('Valid phone number is required');
  }
  
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email address is required');
  }
  
  if (data.dateOfBirth) {
    const birthDate = new Date(data.dateOfBirth);
    const now = new Date();
    const age = now.getFullYear() - birthDate.getFullYear();
    
    if (age < 0 || age > 120) {
      errors.push('Invalid date of birth');
    }
  }
  
  return errors;
}

// Search and Filter Utilities
export function searchGuests(guests: Guest[], query: string): Guest[] {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) return guests;
  
  return guests.filter(guest => 
    guest.firstName.toLowerCase().includes(searchTerm) ||
    guest.lastName.toLowerCase().includes(searchTerm) ||
    guest.phone.includes(searchTerm) ||
    guest.email?.toLowerCase().includes(searchTerm) ||
    `${guest.firstName} ${guest.lastName}`.toLowerCase().includes(searchTerm)
  );
}

export function sortReservations(reservations: Reservation[], sortBy: 'time' | 'name' | 'party' | 'status', order: 'asc' | 'desc' = 'asc'): Reservation[] {
  return [...reservations].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'time':
        comparison = new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
        break;
      case 'party':
        comparison = a.partySize - b.partySize;
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      default:
        comparison = 0;
    }
    
    return order === 'desc' ? -comparison : comparison;
  });
}