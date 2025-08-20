export interface Table {
  id: string;
  number: string;
  capacity: number;
  x: number; // Position on floor plan (pixels)
  y: number; // Position on floor plan (pixels)
  width: number;
  height: number;
  shape: 'round' | 'square' | 'rectangular';
  status: TableStatus;
  diningAreaId: string;
  isCombinable: boolean;
  combinedWith?: string[];
  lastCleanedAt?: string;
  estimatedTurnoverTime?: number; // minutes
}

export type TableStatus = 
  | 'available'
  | 'occupied'
  | 'reserved'
  | 'cleaning'
  | 'maintenance'
  | 'combined';

export interface DiningArea {
  id: string;
  name: string;
  floor: number;
  capacity: number;
  isActive: boolean;
  tables: Table[];
  layout: {
    width: number;
    height: number;
    backgroundImage?: string;
  };
}

export interface Reservation {
  id: string;
  guestId: string;
  tableId?: string;
  partySize: number;
  dateTime: string;
  duration: number; // minutes
  status: ReservationStatus;
  specialRequests?: string;
  occasion?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  seatedAt?: string;
  completedAt?: string;
  source: 'phone' | 'online' | 'walk-in' | 'app';
  estimatedSpend?: number;
  tags?: string[];
}

export type ReservationStatus =
  | 'confirmed'
  | 'pending'
  | 'seated'
  | 'completed'
  | 'cancelled'
  | 'no-show';

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  dateOfBirth?: string;
  anniversary?: string;
  preferences: GuestPreferences;
  visitHistory: Visit[];
  totalVisits: number;
  totalSpent: number;
  averageSpend: number;
  lastVisit?: string;
  vipStatus: VIPStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GuestPreferences {
  seatingPreference?: 'booth' | 'table' | 'bar' | 'patio';
  dietaryRestrictions?: string[];
  allergies?: string[];
  favoriteItems?: string[];
  dislikes?: string[];
  temperature?: 'warm' | 'cool';
  lighting?: 'bright' | 'dim';
  ambiance?: 'quiet' | 'lively';
}

export type VIPStatus = 'regular' | 'frequent' | 'vip' | 'celebrity';

export interface Visit {
  id: string;
  reservationId?: string;
  date: string;
  partySize: number;
  tableId: string;
  duration: number;
  totalSpent: number;
  items: string[];
  satisfaction?: number; // 1-5 rating
  feedback?: string;
}

export interface WaitlistEntry {
  id: string;
  guestId: string;
  partySize: number;
  estimatedWaitTime: number; // minutes
  priority: WaitlistPriority;
  addedAt: string;
  notifiedAt?: string;
  seatedAt?: string;
  phoneNumber: string;
  status: WaitlistStatus;
  specialRequests?: string;
  quotedWaitTime: number;
}

export type WaitlistPriority = 'low' | 'normal' | 'high' | 'vip';
export type WaitlistStatus = 'waiting' | 'notified' | 'seated' | 'cancelled' | 'no-show';

export interface FloorPlan {
  id: string;
  name: string;
  diningAreaId: string;
  isActive: boolean;
  layout: {
    width: number;
    height: number;
    backgroundImage?: string;
    scale: number;
  };
  tables: Table[];
  elements: FloorPlanElement[];
  createdAt: string;
  updatedAt: string;
}

export interface FloorPlanElement {
  id: string;
  type: 'wall' | 'door' | 'window' | 'bar' | 'hoststand' | 'restroom' | 'kitchen' | 'decoration';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  color?: string;
  label?: string;
}

export interface ReservationSlot {
  time: string;
  capacity: number;
  booked: number;
  available: number;
  tables: {
    tableId: string;
    status: 'available' | 'reserved' | 'blocked';
    reservationId?: string;
  }[];
}

export interface AvailabilityWindow {
  date: string;
  slots: ReservationSlot[];
  totalCapacity: number;
  totalBooked: number;
  isFullyBooked: boolean;
}

export interface TableTurnover {
  tableId: string;
  date: string;
  turns: {
    reservationId: string;
    startTime: string;
    endTime: string;
    duration: number;
    partySize: number;
    revenue: number;
  }[];
  totalTurns: number;
  averageTurnTime: number;
  totalRevenue: number;
  efficiency: number; // percentage
}

export interface ReservationFilters {
  date?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  status?: ReservationStatus[];
  partySize?: {
    min?: number;
    max?: number;
  };
  source?: ('phone' | 'online' | 'walk-in' | 'app')[];
  diningArea?: string[];
  guest?: string;
  tags?: string[];
}

export interface WaitlistFilters {
  status?: WaitlistStatus[];
  priority?: WaitlistPriority[];
  partySize?: {
    min?: number;
    max?: number;
  };
  estimatedWaitTime?: {
    min?: number;
    max?: number;
  };
}

export interface SMSNotification {
  id: string;
  phoneNumber: string;
  message: string;
  type: 'reservation_reminder' | 'table_ready' | 'waitlist_update' | 'confirmation';
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  sentAt?: string;
  deliveredAt?: string;
  errorMessage?: string;
  reservationId?: string;
  waitlistEntryId?: string;
}

export interface ReservationStats {
  today: {
    totalReservations: number;
    seated: number;
    pending: number;
    noShows: number;
    walkIns: number;
    averagePartySize: number;
    totalCovers: number;
  };
  current: {
    occupiedTables: number;
    availableTables: number;
    waitlistSize: number;
    averageWaitTime: number;
    nextAvailableSlot: string | null;
  };
  forecast: {
    remainingCapacity: number;
    expectedTurnover: number;
    projectedRevenue: number;
  };
}

export interface CreateReservationData {
  guestId?: string;
  guest?: {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
  };
  partySize: number;
  dateTime: string;
  duration?: number;
  specialRequests?: string;
  occasion?: string;
  notes?: string;
  source: 'phone' | 'online' | 'walk-in' | 'app';
  tags?: string[];
}

export interface UpdateReservationData {
  partySize?: number;
  dateTime?: string;
  duration?: number;
  specialRequests?: string;
  occasion?: string;
  notes?: string;
  status?: ReservationStatus;
  tableId?: string;
  tags?: string[];
}

export interface CreateWaitlistEntryData {
  guestId?: string;
  guest?: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  partySize: number;
  specialRequests?: string;
  estimatedWaitTime: number;
  quotedWaitTime: number;
  priority?: WaitlistPriority;
}

export interface FloorPlanDragItem {
  type: 'table' | 'element';
  id: string;
  data: Partial<Table> | Partial<FloorPlanElement>;
}

export interface TableCombination {
  id: string;
  name: string;
  tableIds: string[];
  capacity: number;
  isActive: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Real-time update types
export interface ReservationUpdate {
  type: 'reservation' | 'table' | 'waitlist';
  action: 'create' | 'update' | 'delete';
  data: Reservation | Table | WaitlistEntry;
  timestamp: string;
}

export interface TableStatusUpdate {
  tableId: string;
  status: TableStatus;
  timestamp: string;
  reservationId?: string;
  estimatedAvailableAt?: string;
}