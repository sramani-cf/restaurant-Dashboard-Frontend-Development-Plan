'use server';

import { unstable_cache } from 'next/cache';
import { formatDistanceToNow, startOfDay, endOfDay, subDays, format } from 'date-fns';

// Types for dashboard data
export interface DashboardKPIs {
  totalRevenue: {
    current: number;
    previous: number;
    change: number;
    changeType: 'increase' | 'decrease' | 'neutral';
  };
  guestCount: {
    current: number;
    previous: number;
    change: number;
    changeType: 'increase' | 'decrease' | 'neutral';
  };
  averageOrderValue: {
    current: number;
    previous: number;
    change: number;
    changeType: 'increase' | 'decrease' | 'neutral';
  };
  primeCost: {
    current: number;
    previous: number;
    change: number;
    changeType: 'increase' | 'decrease' | 'neutral';
    target: number;
  };
  laborCost: {
    current: number;
    previous: number;
    change: number;
    changeType: 'increase' | 'decrease' | 'neutral';
    target: number;
  };
  foodCost: {
    current: number;
    previous: number;
    change: number;
    changeType: 'increase' | 'decrease' | 'neutral';
    target: number;
  };
}

export interface SalesTrendData {
  date: string;
  revenue: number;
  orders: number;
  guests: number;
  averageOrderValue: number;
}

export interface LiveOrder {
  id: string;
  orderNumber: string;
  table: string | null;
  customerName: string | null;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'completed';
  timeOrdered: Date;
  estimatedTime: number; // minutes
}

export interface LiveReservation {
  id: string;
  customerName: string;
  partySize: number;
  reservationTime: Date;
  table: string | null;
  status: 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no_show';
  phoneNumber: string;
  specialRequests?: string;
}

export interface TopProduct {
  id: string;
  name: string;
  category: string;
  quantitySold: number;
  revenue: number;
  marginPercent: number;
}

export interface StaffPerformance {
  id: string;
  name: string;
  role: string;
  salesAmount: number;
  ordersProcessed: number;
  averageOrderValue: number;
  hoursWorked: number;
  efficiency: number;
}

// Mock data generation functions
function generateKPIChange(current: number, variancePercent: number = 15) {
  const variance = (Math.random() - 0.5) * 2 * variancePercent / 100;
  const previous = current * (1 - variance);
  const change = ((current - previous) / previous) * 100;
  const changeType = change > 2 ? 'increase' : change < -2 ? 'decrease' : 'neutral';
  
  return {
    current,
    previous,
    change: Math.abs(change),
    changeType: changeType as 'increase' | 'decrease' | 'neutral'
  };
}

function generateSalesTrendData(days: number): SalesTrendData[] {
  const data: SalesTrendData[] = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Weekend tends to be busier
    const baseRevenue = isWeekend ? 3500 + Math.random() * 2000 : 2000 + Math.random() * 1500;
    const baseOrders = isWeekend ? 40 + Math.random() * 30 : 25 + Math.random() * 20;
    const baseGuests = Math.floor(baseOrders * (1.5 + Math.random() * 1.5));
    
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      revenue: Math.round(baseRevenue),
      orders: Math.floor(baseOrders),
      guests: baseGuests,
      averageOrderValue: Math.round(baseRevenue / baseOrders)
    });
  }
  
  return data;
}

function generateLiveOrders(): LiveOrder[] {
  const orderStatuses: LiveOrder['status'][] = ['pending', 'preparing', 'ready', 'served'];
  const menuItems = [
    { name: 'Margherita Pizza', price: 18 },
    { name: 'Caesar Salad', price: 14 },
    { name: 'Grilled Salmon', price: 28 },
    { name: 'Pasta Carbonara', price: 22 },
    { name: 'Beef Burger', price: 16 },
    { name: 'Chicken Wings', price: 12 },
    { name: 'Fish & Chips', price: 19 },
    { name: 'Vegetable Stir Fry', price: 17 }
  ];
  
  const orders: LiveOrder[] = [];
  const numOrders = Math.floor(Math.random() * 8) + 3; // 3-10 orders
  
  for (let i = 0; i < numOrders; i++) {
    const items = [];
    const numItems = Math.floor(Math.random() * 3) + 1; // 1-3 items per order
    let total = 0;
    
    for (let j = 0; j < numItems; j++) {
      const item = menuItems[Math.floor(Math.random() * menuItems.length)];
      const quantity = Math.floor(Math.random() * 2) + 1; // 1-2 quantity
      items.push({
        name: item.name,
        quantity,
        price: item.price
      });
      total += item.price * quantity;
    }
    
    const timeOrdered = new Date(Date.now() - Math.random() * 3600000); // Within last hour
    
    orders.push({
      id: `order-${i + 1}`,
      orderNumber: `#${1000 + i}`,
      table: Math.random() > 0.3 ? `T${Math.floor(Math.random() * 20) + 1}` : null,
      customerName: Math.random() > 0.5 ? `Customer ${i + 1}` : null,
      items,
      total,
      status: orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
      timeOrdered,
      estimatedTime: Math.floor(Math.random() * 30) + 10 // 10-40 minutes
    });
  }
  
  return orders.sort((a, b) => b.timeOrdered.getTime() - a.timeOrdered.getTime());
}

function generateLiveReservations(): LiveReservation[] {
  const statuses: LiveReservation['status'][] = ['confirmed', 'seated', 'completed'];
  const customers = [
    'John Smith', 'Sarah Johnson', 'Mike Davis', 'Emily Brown', 'David Wilson',
    'Lisa Garcia', 'Tom Miller', 'Anna Jones', 'Chris Lee', 'Maria Rodriguez'
  ];
  
  const reservations: LiveReservation[] = [];
  const numReservations = Math.floor(Math.random() * 6) + 2; // 2-7 reservations
  
  for (let i = 0; i < numReservations; i++) {
    const now = new Date();
    const reservationTime = new Date(now.getTime() + (Math.random() * 4 - 2) * 3600000); // ±2 hours from now
    
    reservations.push({
      id: `reservation-${i + 1}`,
      customerName: customers[Math.floor(Math.random() * customers.length)],
      partySize: Math.floor(Math.random() * 6) + 2, // 2-7 people
      reservationTime,
      table: Math.random() > 0.4 ? `T${Math.floor(Math.random() * 20) + 1}` : null,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      phoneNumber: `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      specialRequests: Math.random() > 0.7 ? 'Window seat preferred' : undefined
    });
  }
  
  return reservations.sort((a, b) => a.reservationTime.getTime() - b.reservationTime.getTime());
}

// Cache configuration
const CACHE_TAGS = {
  DASHBOARD_KPIS: 'dashboard-kpis',
  SALES_TREND: 'sales-trend',
  LIVE_ORDERS: 'live-orders',
  LIVE_RESERVATIONS: 'live-reservations',
  TOP_PRODUCTS: 'top-products',
  STAFF_PERFORMANCE: 'staff-performance'
} as const;

// Data fetching functions with caching
export const getDashboardKPIs = unstable_cache(
  async (dateRange?: { from: Date; to: Date }): Promise<DashboardKPIs> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const baseRevenue = 15000 + Math.random() * 5000;
    const baseGuests = 180 + Math.random() * 80;
    const baseAOV = 85 + Math.random() * 25;
    
    return {
      totalRevenue: generateKPIChange(baseRevenue),
      guestCount: generateKPIChange(baseGuests),
      averageOrderValue: generateKPIChange(baseAOV),
      primeCost: {
        ...generateKPIChange(62 + Math.random() * 8),
        target: 65
      },
      laborCost: {
        ...generateKPIChange(28 + Math.random() * 5),
        target: 30
      },
      foodCost: {
        ...generateKPIChange(34 + Math.random() * 4),
        target: 35
      }
    };
  },
  [CACHE_TAGS.DASHBOARD_KPIS],
  { 
    revalidate: 300, // 5 minutes
    tags: [CACHE_TAGS.DASHBOARD_KPIS]
  }
);

export const getSalesTrendData = unstable_cache(
  async (days: number = 30): Promise<SalesTrendData[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    return generateSalesTrendData(days);
  },
  [CACHE_TAGS.SALES_TREND],
  { 
    revalidate: 3600, // 1 hour
    tags: [CACHE_TAGS.SALES_TREND]
  }
);

export const getLiveOrders = unstable_cache(
  async (): Promise<LiveOrder[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 50));
    
    return generateLiveOrders();
  },
  [CACHE_TAGS.LIVE_ORDERS],
  { 
    revalidate: 30, // 30 seconds
    tags: [CACHE_TAGS.LIVE_ORDERS]
  }
);

export const getLiveReservations = unstable_cache(
  async (): Promise<LiveReservation[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 50));
    
    return generateLiveReservations();
  },
  [CACHE_TAGS.LIVE_RESERVATIONS],
  { 
    revalidate: 60, // 1 minute
    tags: [CACHE_TAGS.LIVE_RESERVATIONS]
  }
);

export const getTopProducts = unstable_cache(
  async (limit: number = 5): Promise<TopProduct[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const products = [
      { name: 'Margherita Pizza', category: 'Pizza' },
      { name: 'Caesar Salad', category: 'Salad' },
      { name: 'Grilled Salmon', category: 'Seafood' },
      { name: 'Pasta Carbonara', category: 'Pasta' },
      { name: 'Beef Burger', category: 'Burger' },
      { name: 'Chicken Wings', category: 'Appetizer' },
      { name: 'Fish & Chips', category: 'Seafood' },
      { name: 'Tiramisu', category: 'Dessert' }
    ];
    
    return products.slice(0, limit).map((product, index) => ({
      id: `product-${index + 1}`,
      name: product.name,
      category: product.category,
      quantitySold: Math.floor(Math.random() * 50) + 20,
      revenue: Math.floor(Math.random() * 2000) + 800,
      marginPercent: Math.floor(Math.random() * 20) + 60
    }));
  },
  [CACHE_TAGS.TOP_PRODUCTS],
  { 
    revalidate: 1800, // 30 minutes
    tags: [CACHE_TAGS.TOP_PRODUCTS]
  }
);

export const getStaffPerformance = unstable_cache(
  async (limit: number = 5): Promise<StaffPerformance[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const staff = [
      { name: 'Alice Johnson', role: 'Server' },
      { name: 'Bob Smith', role: 'Server' },
      { name: 'Carol Davis', role: 'Bartender' },
      { name: 'David Wilson', role: 'Server' },
      { name: 'Emma Brown', role: 'Host' }
    ];
    
    return staff.slice(0, limit).map((person, index) => {
      const salesAmount = Math.floor(Math.random() * 3000) + 1000;
      const ordersProcessed = Math.floor(Math.random() * 30) + 10;
      const hoursWorked = Math.floor(Math.random() * 6) + 6;
      
      return {
        id: `staff-${index + 1}`,
        name: person.name,
        role: person.role,
        salesAmount,
        ordersProcessed,
        averageOrderValue: Math.round(salesAmount / ordersProcessed),
        hoursWorked,
        efficiency: Math.floor((ordersProcessed / hoursWorked) * 100) / 100
      };
    });
  },
  [CACHE_TAGS.STAFF_PERFORMANCE],
  { 
    revalidate: 1800, // 30 minutes
    tags: [CACHE_TAGS.STAFF_PERFORMANCE]
  }
);

// Parallel data fetching for dashboard
export async function getDashboardData(dateRange?: { from: Date; to: Date }) {
  const [
    kpis,
    salesTrend,
    liveOrders,
    liveReservations,
    topProducts,
    staffPerformance
  ] = await Promise.all([
    getDashboardKPIs(dateRange),
    getSalesTrendData(30),
    getLiveOrders(),
    getLiveReservations(),
    getTopProducts(5),
    getStaffPerformance(5)
  ]);

  return {
    kpis,
    salesTrend,
    liveOrders,
    liveReservations,
    topProducts,
    staffPerformance
  };
}

// Cache revalidation functions
export async function revalidateDashboardData() {
  const { revalidateTag } = await import('next/cache');
  
  Object.values(CACHE_TAGS).forEach(tag => {
    revalidateTag(tag);
  });
}

export async function revalidateLiveData() {
  const { revalidateTag } = await import('next/cache');
  
  revalidateTag(CACHE_TAGS.LIVE_ORDERS);
  revalidateTag(CACHE_TAGS.LIVE_RESERVATIONS);
}