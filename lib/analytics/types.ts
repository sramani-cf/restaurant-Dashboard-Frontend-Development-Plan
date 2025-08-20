'use server';

// Date range type for filtering
export interface DateRange {
  from: Date;
  to: Date;
}

// Common report configuration
export interface ReportConfig {
  dateRange: DateRange;
  comparisonPeriod?: DateRange;
  timezone?: string;
  includeProjections?: boolean;
}

// Base report types
export interface BaseReport {
  id: string;
  name: string;
  description: string;
  generatedAt: Date;
  dateRange: DateRange;
  comparisonPeriod?: DateRange;
}

// Sales Summary Report Types
export interface SalesSummary extends BaseReport {
  type: 'sales-summary';
  data: {
    totalRevenue: MetricValue;
    totalOrders: MetricValue;
    averageOrderValue: MetricValue;
    guestCount: MetricValue;
    revenueByChannel: ChannelBreakdown[];
    revenueByHour: HourlyBreakdown[];
    revenueByDayOfWeek: DayOfWeekBreakdown[];
    topPaymentMethods: PaymentMethodBreakdown[];
    salesTrend: SalesTrendPoint[];
  };
}

// Product Mix/Menu Engineering Report Types
export interface MenuEngineeringReport extends BaseReport {
  type: 'menu-engineering';
  data: {
    overview: MenuOverview;
    categories: CategoryAnalysis[];
    items: MenuItemAnalysis[];
    recommendations: MenuRecommendation[];
  };
}

export interface MenuItemAnalysis {
  id: string;
  name: string;
  category: string;
  classification: 'star' | 'plow-horse' | 'puzzle' | 'dog';
  metrics: {
    quantitySold: number;
    revenue: number;
    popularity: number; // percentile
    profitability: number; // profit margin
    contribution: number; // menu mix percentage
    costPercent: number;
    pricePoint: number;
  };
  trends: {
    popularityTrend: 'increasing' | 'decreasing' | 'stable';
    profitabilityTrend: 'increasing' | 'decreasing' | 'stable';
  };
}

export interface CategoryAnalysis {
  category: string;
  itemCount: number;
  totalRevenue: number;
  averagePopularity: number;
  averageProfitability: number;
  stars: number;
  plowHorses: number;
  puzzles: number;
  dogs: number;
}

export interface MenuOverview {
  totalItems: number;
  activeItems: number;
  averagePrice: number;
  overallMargin: number;
  classifications: {
    stars: number;
    plowHorses: number;
    puzzles: number;
    dogs: number;
  };
}

export interface MenuRecommendation {
  type: 'promote' | 'reposition' | 'engineer' | 'remove';
  itemId: string;
  itemName: string;
  reason: string;
  expectedImpact: string;
  priority: 'high' | 'medium' | 'low';
}

// Labor Report Types
export interface LaborReport extends BaseReport {
  type: 'labor-analysis';
  data: {
    overview: LaborOverview;
    employeePerformance: EmployeePerformance[];
    departmentAnalysis: DepartmentAnalysis[];
    costAnalysis: LaborCostAnalysis;
    scheduleOptimization: ScheduleRecommendation[];
  };
}

export interface EmployeePerformance {
  id: string;
  name: string;
  role: string;
  department: string;
  metrics: {
    hoursWorked: number;
    overtimeHours: number;
    salesGenerated: number;
    ordersProcessed: number;
    avgOrderValue: number;
    efficiency: number;
    customerRating?: number;
  };
  costs: {
    regularPay: number;
    overtimePay: number;
    totalCost: number;
    costPerHour: number;
  };
  performance: {
    salesPerHour: number;
    ordersPerHour: number;
    efficiency: 'excellent' | 'good' | 'average' | 'needs-improvement';
  };
}

export interface DepartmentAnalysis {
  department: string;
  employeeCount: number;
  totalHours: number;
  totalCost: number;
  averageWage: number;
  productivity: number;
  costAsPercentOfSales: number;
}

export interface LaborOverview {
  totalEmployees: number;
  totalHours: number;
  totalLaborCost: number;
  laborCostPercentage: number;
  averageHourlyWage: number;
  overtimePercentage: number;
  productivityIndex: number;
}

export interface LaborCostAnalysis {
  actual: number;
  budgeted: number;
  variance: number;
  variancePercent: number;
  breakdown: {
    regularWages: number;
    overtime: number;
    benefits: number;
    payrollTaxes: number;
  };
}

export interface ScheduleRecommendation {
  department: string;
  shift: string;
  currentStaffing: number;
  recommendedStaffing: number;
  reason: string;
  potentialSavings: number;
}

// Inventory & Cost Control Report Types
export interface InventoryReport extends BaseReport {
  type: 'inventory-control';
  data: {
    overview: InventoryOverview;
    costAnalysis: CostAnalysis;
    wasteAnalysis: WasteAnalysis;
    items: InventoryItemAnalysis[];
    alerts: InventoryAlert[];
  };
}

export interface InventoryOverview {
  totalValue: number;
  turnoverRate: number;
  daysOnHand: number;
  stockoutEvents: number;
  overStockItems: number;
}

export interface CostAnalysis {
  actualFoodCost: number;
  theoreticalFoodCost: number;
  variance: number;
  variancePercent: number;
  costPercentOfSales: number;
  costTrend: 'increasing' | 'decreasing' | 'stable';
}

export interface WasteAnalysis {
  totalWasteValue: number;
  wastePercentOfPurchases: number;
  topWasteItems: WasteItem[];
  wasteByCategory: CategoryWaste[];
  wasteReductions: WasteReduction[];
}

export interface WasteItem {
  itemName: string;
  category: string;
  wasteValue: number;
  wastePercent: number;
  reason: string;
}

export interface CategoryWaste {
  category: string;
  wasteValue: number;
  wastePercent: number;
}

export interface WasteReduction {
  action: string;
  potentialSavings: number;
  implementation: 'immediate' | 'short-term' | 'long-term';
}

export interface InventoryItemAnalysis {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  reorderPoint: number;
  maxStock: number;
  unitCost: number;
  totalValue: number;
  turnoverRate: number;
  daysOnHand: number;
  status: 'optimal' | 'overstock' | 'understock' | 'stockout';
}

export interface InventoryAlert {
  type: 'stockout' | 'overstock' | 'spoilage' | 'variance';
  itemName: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  actionRequired: boolean;
}

// Customer Behavior Analytics Types
export interface CustomerReport extends BaseReport {
  type: 'customer-analytics';
  data: {
    overview: CustomerOverview;
    segments: CustomerSegment[];
    behavior: CustomerBehavior;
    retention: CustomerRetention;
    loyalty: LoyaltyAnalysis;
  };
}

export interface CustomerOverview {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  averageOrderValue: number;
  averageVisitFrequency: number;
  customerLifetimeValue: number;
}

export interface CustomerSegment {
  segment: string;
  customerCount: number;
  percentOfBase: number;
  averageOrderValue: number;
  visitFrequency: number;
  totalRevenue: number;
  characteristics: string[];
}

export interface CustomerBehavior {
  peakHours: HourlyPattern[];
  peakDays: DayOfWeekPattern[];
  orderPatterns: OrderPattern[];
  paymentPreferences: PaymentPreference[];
  channelPreferences: ChannelPreference[];
}

export interface CustomerRetention {
  retentionRate: number;
  churnRate: number;
  averageCustomerLifespan: number;
  retentionBySegment: SegmentRetention[];
  cohortAnalysis: CohortData[];
}

export interface LoyaltyAnalysis {
  loyaltyTiers: LoyaltyTier[];
  rewardRedemption: number;
  loyaltyImpact: LoyaltyImpact;
}

// Supporting Types
export interface MetricValue {
  current: number;
  previous?: number;
  change?: number;
  changePercent?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  target?: number;
  unit?: string;
}

export interface ChannelBreakdown {
  channel: string;
  revenue: number;
  orders: number;
  percentage: number;
}

export interface HourlyBreakdown {
  hour: number;
  revenue: number;
  orders: number;
  averageOrderValue: number;
}

export interface DayOfWeekBreakdown {
  day: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
}

export interface PaymentMethodBreakdown {
  method: string;
  revenue: number;
  transactions: number;
  percentage: number;
}

export interface SalesTrendPoint {
  date: string;
  revenue: number;
  orders: number;
  guests: number;
  averageOrderValue: number;
}

export interface HourlyPattern {
  hour: number;
  customerCount: number;
  percentage: number;
}

export interface DayOfWeekPattern {
  day: string;
  customerCount: number;
  percentage: number;
}

export interface OrderPattern {
  pattern: string;
  frequency: number;
  description: string;
}

export interface PaymentPreference {
  method: string;
  usage: number;
  percentage: number;
}

export interface ChannelPreference {
  channel: string;
  usage: number;
  percentage: number;
}

export interface SegmentRetention {
  segment: string;
  retentionRate: number;
  churnRate: number;
}

export interface CohortData {
  cohort: string;
  period: number;
  customerCount: number;
  retentionRate: number;
}

export interface LoyaltyTier {
  tier: string;
  customerCount: number;
  averageSpend: number;
  benefits: string[];
}

export interface LoyaltyImpact {
  loyalCustomerPercent: number;
  loyalCustomerAOV: number;
  loyalCustomerRevenue: number;
  programROI: number;
}

// Report export types
export interface ExportOptions {
  format: 'csv' | 'pdf' | 'excel';
  includeCharts?: boolean;
  includeRawData?: boolean;
  customFields?: string[];
}

export interface ExportResult {
  success: boolean;
  downloadUrl?: string;
  error?: string;
  fileSize?: number;
}

// Report navigation and UI types
export interface ReportNavItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  category: 'sales' | 'operations' | 'customer' | 'financial';
}

export interface ReportFilter {
  id: string;
  label: string;
  type: 'date' | 'select' | 'multiselect' | 'range';
  options?: FilterOption[];
  defaultValue?: any;
  required?: boolean;
}

export interface FilterOption {
  value: string | number;
  label: string;
}

// Cache types
export interface CacheConfig {
  key: string;
  ttl: number; // seconds
  tags: string[];
}

export interface CachedReport {
  reportId: string;
  data: any;
  generatedAt: Date;
  expiresAt: Date;
  hash: string;
}

// API response types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
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

// Chart data types
export interface ChartData {
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
  data: any[];
  config: ChartConfig;
}

export interface ChartConfig {
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  responsive?: boolean;
}

// Report types union
export type Report = SalesSummary | MenuEngineeringReport | LaborReport | InventoryReport | CustomerReport;
export type ReportType = Report['type'];

// Report data union
export type ReportData = Report['data'];

// Error types
export interface AnalyticsError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}