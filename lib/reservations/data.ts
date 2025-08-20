import { 
  Table, 
  DiningArea, 
  Reservation, 
  Guest, 
  WaitlistEntry, 
  FloorPlan,
  ReservationStats,
  AvailabilityWindow,
  TableTurnover,
  ReservationFilters,
  WaitlistFilters,
  CreateReservationData,
  UpdateReservationData,
  CreateWaitlistEntryData,
  ApiResponse,
  PaginatedResponse,
  TableStatus,
  ReservationStatus,
  WaitlistStatus,
  VIPStatus
} from './types';

// Mock Data
export const mockTables: Table[] = [
  {
    id: 'table-1',
    number: '1',
    capacity: 2,
    x: 100,
    y: 150,
    width: 80,
    height: 80,
    shape: 'round',
    status: 'available',
    diningAreaId: 'main-dining',
    isCombinable: false,
    estimatedTurnoverTime: 90
  },
  {
    id: 'table-2',
    number: '2',
    capacity: 4,
    x: 200,
    y: 150,
    width: 120,
    height: 80,
    shape: 'rectangular',
    status: 'occupied',
    diningAreaId: 'main-dining',
    isCombinable: true,
    estimatedTurnoverTime: 120
  },
  {
    id: 'table-3',
    number: '3',
    capacity: 4,
    x: 350,
    y: 150,
    width: 120,
    height: 80,
    shape: 'rectangular',
    status: 'reserved',
    diningAreaId: 'main-dining',
    isCombinable: true,
    estimatedTurnoverTime: 120
  },
  {
    id: 'table-4',
    number: '4',
    capacity: 6,
    x: 100,
    y: 300,
    width: 140,
    height: 100,
    shape: 'rectangular',
    status: 'cleaning',
    diningAreaId: 'main-dining',
    isCombinable: false,
    estimatedTurnoverTime: 150
  },
  {
    id: 'table-5',
    number: '5',
    capacity: 2,
    x: 500,
    y: 100,
    width: 80,
    height: 80,
    shape: 'round',
    status: 'available',
    diningAreaId: 'patio',
    isCombinable: false,
    estimatedTurnoverTime: 90
  }
];

export const mockDiningAreas: DiningArea[] = [
  {
    id: 'main-dining',
    name: 'Main Dining Room',
    floor: 1,
    capacity: 60,
    isActive: true,
    tables: mockTables.filter(t => t.diningAreaId === 'main-dining'),
    layout: {
      width: 800,
      height: 600
    }
  },
  {
    id: 'patio',
    name: 'Outdoor Patio',
    floor: 1,
    capacity: 24,
    isActive: true,
    tables: mockTables.filter(t => t.diningAreaId === 'patio'),
    layout: {
      width: 600,
      height: 400
    }
  },
  {
    id: 'private-dining',
    name: 'Private Dining Room',
    floor: 2,
    capacity: 16,
    isActive: true,
    tables: [],
    layout: {
      width: 400,
      height: 300
    }
  }
];

export const mockGuests: Guest[] = [
  {
    id: 'guest-1',
    firstName: 'John',
    lastName: 'Smith',
    phone: '+1234567890',
    email: 'john.smith@email.com',
    dateOfBirth: '1985-06-15',
    preferences: {
      seatingPreference: 'booth',
      dietaryRestrictions: ['gluten-free'],
      favoriteItems: ['Caesar Salad', 'Grilled Salmon']
    },
    visitHistory: [],
    totalVisits: 12,
    totalSpent: 1250.00,
    averageSpend: 104.17,
    lastVisit: '2024-01-10',
    vipStatus: 'frequent',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2024-01-10T20:30:00Z'
  },
  {
    id: 'guest-2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    phone: '+1987654321',
    email: 'sarah.j@email.com',
    anniversary: '2020-03-14',
    preferences: {
      seatingPreference: 'patio',
      allergies: ['nuts'],
      ambiance: 'quiet'
    },
    visitHistory: [],
    totalVisits: 5,
    totalSpent: 425.00,
    averageSpend: 85.00,
    lastVisit: '2024-01-08',
    vipStatus: 'regular',
    createdAt: '2023-06-20T14:00:00Z',
    updatedAt: '2024-01-08T19:45:00Z'
  }
];

export const mockReservations: Reservation[] = [
  {
    id: 'res-1',
    guestId: 'guest-1',
    tableId: 'table-3',
    partySize: 4,
    dateTime: '2024-01-20T19:00:00Z',
    duration: 120,
    status: 'confirmed',
    specialRequests: 'Window seat preferred',
    occasion: 'birthday',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    source: 'online',
    estimatedSpend: 200,
    tags: ['birthday', 'vip']
  },
  {
    id: 'res-2',
    guestId: 'guest-2',
    partySize: 2,
    dateTime: '2024-01-20T20:00:00Z',
    duration: 90,
    status: 'pending',
    occasion: 'anniversary',
    createdAt: '2024-01-18T14:30:00Z',
    updatedAt: '2024-01-18T14:30:00Z',
    source: 'phone',
    estimatedSpend: 150
  }
];

export const mockWaitlist: WaitlistEntry[] = [
  {
    id: 'wait-1',
    guestId: 'guest-1',
    partySize: 3,
    estimatedWaitTime: 25,
    priority: 'normal',
    addedAt: '2024-01-20T18:30:00Z',
    phoneNumber: '+1234567890',
    status: 'waiting',
    quotedWaitTime: 30
  },
  {
    id: 'wait-2',
    guestId: 'guest-2',
    partySize: 2,
    estimatedWaitTime: 15,
    priority: 'vip',
    addedAt: '2024-01-20T18:45:00Z',
    phoneNumber: '+1987654321',
    status: 'notified',
    quotedWaitTime: 20
  }
];

// API Functions
export async function getDiningAreas(): Promise<DiningArea[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockDiningAreas;
}

export async function getTables(diningAreaId?: string): Promise<Table[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return diningAreaId 
    ? mockTables.filter(table => table.diningAreaId === diningAreaId)
    : mockTables;
}

export async function getReservations(filters?: ReservationFilters): Promise<PaginatedResponse<Reservation>> {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  let filteredReservations = [...mockReservations];
  
  if (filters) {
    if (filters.date) {
      filteredReservations = filteredReservations.filter(res => 
        res.dateTime.startsWith(filters.date!)
      );
    }
    
    if (filters.status?.length) {
      filteredReservations = filteredReservations.filter(res => 
        filters.status!.includes(res.status)
      );
    }
    
    if (filters.partySize) {
      const { min, max } = filters.partySize;
      filteredReservations = filteredReservations.filter(res => {
        if (min && res.partySize < min) return false;
        if (max && res.partySize > max) return false;
        return true;
      });
    }
    
    if (filters.source?.length) {
      filteredReservations = filteredReservations.filter(res => 
        filters.source!.includes(res.source)
      );
    }
  }
  
  return {
    data: filteredReservations,
    pagination: {
      page: 1,
      limit: 50,
      total: filteredReservations.length,
      totalPages: 1
    }
  };
}

export async function getWaitlist(filters?: WaitlistFilters): Promise<WaitlistEntry[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  let filteredWaitlist = [...mockWaitlist];
  
  if (filters) {
    if (filters.status?.length) {
      filteredWaitlist = filteredWaitlist.filter(entry => 
        filters.status!.includes(entry.status)
      );
    }
    
    if (filters.priority?.length) {
      filteredWaitlist = filteredWaitlist.filter(entry => 
        filters.priority!.includes(entry.priority)
      );
    }
    
    if (filters.partySize) {
      const { min, max } = filters.partySize;
      filteredWaitlist = filteredWaitlist.filter(entry => {
        if (min && entry.partySize < min) return false;
        if (max && entry.partySize > max) return false;
        return true;
      });
    }
  }
  
  return filteredWaitlist;
}

export async function getGuests(search?: string): Promise<Guest[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (search) {
    const searchLower = search.toLowerCase();
    return mockGuests.filter(guest => 
      guest.firstName.toLowerCase().includes(searchLower) ||
      guest.lastName.toLowerCase().includes(searchLower) ||
      guest.phone.includes(search) ||
      guest.email?.toLowerCase().includes(searchLower)
    );
  }
  
  return mockGuests;
}

export async function getGuestById(id: string): Promise<Guest | null> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockGuests.find(guest => guest.id === id) || null;
}

export async function createReservation(data: CreateReservationData): Promise<ApiResponse<Reservation>> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate validation
  if (data.partySize < 1 || data.partySize > 20) {
    return {
      success: false,
      error: 'Party size must be between 1 and 20'
    };
  }
  
  const newReservation: Reservation = {
    id: `res-${Date.now()}`,
    guestId: data.guestId || `guest-${Date.now()}`,
    partySize: data.partySize,
    dateTime: data.dateTime,
    duration: data.duration || 120,
    status: 'confirmed',
    specialRequests: data.specialRequests,
    occasion: data.occasion,
    notes: data.notes,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    source: data.source,
    tags: data.tags
  };
  
  return {
    success: true,
    data: newReservation,
    message: 'Reservation created successfully'
  };
}

export async function updateReservation(id: string, data: UpdateReservationData): Promise<ApiResponse<Reservation>> {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const reservation = mockReservations.find(r => r.id === id);
  if (!reservation) {
    return {
      success: false,
      error: 'Reservation not found'
    };
  }
  
  const updatedReservation: Reservation = {
    ...reservation,
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  return {
    success: true,
    data: updatedReservation,
    message: 'Reservation updated successfully'
  };
}

export async function cancelReservation(id: string): Promise<ApiResponse<void>> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const reservation = mockReservations.find(r => r.id === id);
  if (!reservation) {
    return {
      success: false,
      error: 'Reservation not found'
    };
  }
  
  return {
    success: true,
    message: 'Reservation cancelled successfully'
  };
}

export async function addToWaitlist(data: CreateWaitlistEntryData): Promise<ApiResponse<WaitlistEntry>> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const newWaitlistEntry: WaitlistEntry = {
    id: `wait-${Date.now()}`,
    guestId: data.guestId || `guest-${Date.now()}`,
    partySize: data.partySize,
    estimatedWaitTime: data.estimatedWaitTime,
    priority: data.priority || 'normal',
    addedAt: new Date().toISOString(),
    phoneNumber: data.guest?.phone || '',
    status: 'waiting',
    specialRequests: data.specialRequests,
    quotedWaitTime: data.quotedWaitTime
  };
  
  return {
    success: true,
    data: newWaitlistEntry,
    message: 'Added to waitlist successfully'
  };
}

export async function updateWaitlistEntry(id: string, status: WaitlistStatus): Promise<ApiResponse<WaitlistEntry>> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const entry = mockWaitlist.find(e => e.id === id);
  if (!entry) {
    return {
      success: false,
      error: 'Waitlist entry not found'
    };
  }
  
  const updatedEntry: WaitlistEntry = {
    ...entry,
    status,
    ...(status === 'notified' && { notifiedAt: new Date().toISOString() }),
    ...(status === 'seated' && { seatedAt: new Date().toISOString() })
  };
  
  return {
    success: true,
    data: updatedEntry,
    message: 'Waitlist entry updated successfully'
  };
}

export async function updateTableStatus(tableId: string, status: TableStatus): Promise<ApiResponse<Table>> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const table = mockTables.find(t => t.id === tableId);
  if (!table) {
    return {
      success: false,
      error: 'Table not found'
    };
  }
  
  const updatedTable: Table = {
    ...table,
    status,
    ...(status === 'cleaning' && { lastCleanedAt: new Date().toISOString() })
  };
  
  return {
    success: true,
    data: updatedTable,
    message: 'Table status updated successfully'
  };
}

export async function getReservationStats(): Promise<ReservationStats> {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return {
    today: {
      totalReservations: 45,
      seated: 28,
      pending: 12,
      noShows: 3,
      walkIns: 8,
      averagePartySize: 3.2,
      totalCovers: 144
    },
    current: {
      occupiedTables: 12,
      availableTables: 8,
      waitlistSize: 6,
      averageWaitTime: 22,
      nextAvailableSlot: '2024-01-20T21:30:00Z'
    },
    forecast: {
      remainingCapacity: 45,
      expectedTurnover: 15,
      projectedRevenue: 2800
    }
  };
}

export async function getAvailability(date: string): Promise<AvailabilityWindow> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock availability data
  const slots = [];
  for (let hour = 17; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push({
        time,
        capacity: 80,
        booked: Math.floor(Math.random() * 60),
        available: Math.floor(Math.random() * 20),
        tables: mockTables.map(table => ({
          tableId: table.id,
          status: Math.random() > 0.7 ? 'reserved' : 'available' as 'available' | 'reserved' | 'blocked'
        }))
      });
    }
  }
  
  const totalBooked = slots.reduce((sum, slot) => sum + slot.booked, 0);
  const totalCapacity = slots.length * 80;
  
  return {
    date,
    slots,
    totalCapacity,
    totalBooked,
    isFullyBooked: totalBooked >= totalCapacity * 0.95
  };
}

export async function getTableTurnover(date: string, tableId?: string): Promise<TableTurnover[]> {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const tables = tableId ? [tableId] : mockTables.map(t => t.id);
  
  return tables.map(id => ({
    tableId: id,
    date,
    turns: [
      {
        reservationId: 'res-1',
        startTime: '18:00',
        endTime: '20:00',
        duration: 120,
        partySize: 4,
        revenue: 180
      },
      {
        reservationId: 'res-2',
        startTime: '20:30',
        endTime: '22:15',
        duration: 105,
        partySize: 2,
        revenue: 95
      }
    ],
    totalTurns: 2,
    averageTurnTime: 112.5,
    totalRevenue: 275,
    efficiency: 85
  }));
}

// Real-time data simulation
let subscribers: ((data: any) => void)[] = [];

export function subscribeToUpdates(callback: (data: any) => void) {
  subscribers.push(callback);
  
  return () => {
    subscribers = subscribers.filter(cb => cb !== callback);
  };
}

// Simulate real-time updates
setInterval(() => {
  if (subscribers.length > 0) {
    const updateType = Math.random();
    let update;
    
    if (updateType < 0.4) {
      // Table status update
      const table = mockTables[Math.floor(Math.random() * mockTables.length)];
      const statuses: TableStatus[] = ['available', 'occupied', 'reserved', 'cleaning'];
      update = {
        type: 'table',
        action: 'update',
        data: {
          ...table,
          status: statuses[Math.floor(Math.random() * statuses.length)]
        },
        timestamp: new Date().toISOString()
      };
    } else if (updateType < 0.7) {
      // Reservation update
      const reservation = mockReservations[Math.floor(Math.random() * mockReservations.length)];
      update = {
        type: 'reservation',
        action: 'update',
        data: {
          ...reservation,
          status: 'seated' as ReservationStatus
        },
        timestamp: new Date().toISOString()
      };
    } else {
      // Waitlist update
      const waitlistEntry = mockWaitlist[Math.floor(Math.random() * mockWaitlist.length)];
      update = {
        type: 'waitlist',
        action: 'update',
        data: {
          ...waitlistEntry,
          estimatedWaitTime: Math.max(0, waitlistEntry.estimatedWaitTime - 5)
        },
        timestamp: new Date().toISOString()
      };
    }
    
    subscribers.forEach(callback => callback(update));
  }
}, 30000); // Update every 30 seconds