// Export all dashboard components
export { KPICards, RevenueCard, GuestCountCard, AOVCard, PrimeCostCard } from './kpi-cards';
export { SalesTrendChart, MiniSalesTrendChart } from './sales-trend-chart';
export { LiveFeeds, LiveOrdersFeed, LiveReservationsFeed, CombinedLiveFeed } from './live-feeds';
export { DateFilter, CompactDateFilter, useDateFilter } from './date-filter';
export { 
  useRealTimeUpdates, 
  RealTimeStatus, 
  ConnectionStatus, 
  MiniRealTimeIndicator 
} from './real-time-updates';

// Re-export types
export type { 
  DashboardKPIs, 
  SalesTrendData, 
  LiveOrder, 
  LiveReservation,
  TopProduct,
  StaffPerformance
} from '@/lib/dashboard/data';