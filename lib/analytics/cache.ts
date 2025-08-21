'use server';

import { unstable_cache, revalidateTag } from 'next/cache';
import { 
  Report, 
  CacheConfig, 
  CachedReport,
  ReportType,
  DateRange
} from './types';
import { format, isBefore, startOfDay, endOfDay, isSameDay } from 'date-fns';

// Cache configuration for different report types
export const CACHE_CONFIGS: Record<ReportType, CacheConfig> = {
  'sales-summary': {
    key: 'analytics:sales',
    ttl: 1800, // 30 minutes
    tags: ['analytics', 'sales', 'revenue']
  },
  'menu-engineering': {
    key: 'analytics:menu',
    ttl: 3600, // 1 hour
    tags: ['analytics', 'menu', 'items']
  },
  'labor-analysis': {
    key: 'analytics:labor',
    ttl: 1800, // 30 minutes
    tags: ['analytics', 'labor', 'employees']
  },
  'inventory-control': {
    key: 'analytics:inventory',
    ttl: 3600, // 1 hour
    tags: ['analytics', 'inventory', 'costs']
  },
  'customer-analytics': {
    key: 'analytics:customers',
    ttl: 3600, // 1 hour
    tags: ['analytics', 'customers', 'behavior']
  }
};

// Cache key generation
export function generateCacheKey(
  reportType: ReportType, 
  dateRange: DateRange,
  additionalParams: Record<string, any> = {}
): string {
  const config = CACHE_CONFIGS[reportType];
  const dateKey = `${format(dateRange.from, 'yyyy-MM-dd')}-${format(dateRange.to, 'yyyy-MM-dd')}`;
  const paramsKey = Object.keys(additionalParams).length > 0 
    ? `-${Buffer.from(JSON.stringify(additionalParams)).toString('base64').slice(0, 8)}`
    : '';
  
  return `${config.key}:${dateKey}${paramsKey}`;
}

// Determine if a date range is "closed" (completed) and can be cached longer
export function isClosedPeriod(dateRange: DateRange): boolean {
  const now = new Date();
  const endOfToday = endOfDay(now);
  
  // If the end date is before today, it's a closed period
  return isBefore(dateRange.to, endOfToday);
}

// Get appropriate TTL based on whether the period is closed
export function getAppropriateTTL(reportType: ReportType, dateRange: DateRange): number {
  const baseTTL = CACHE_CONFIGS[reportType].ttl;
  
  if (isClosedPeriod(dateRange)) {
    // Closed periods can be cached much longer
    return baseTTL * 24; // 24x longer (e.g., 30 min -> 12 hours)
  }
  
  // Current/open periods use standard TTL
  return baseTTL;
}

// Enhanced cache wrapper that considers date ranges
export function createAnalyticsCache<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  reportType: ReportType,
  getDateRange: (args: T) => DateRange,
  getAdditionalParams?: (args: T) => Record<string, any>
) {
  return unstable_cache(
    async (...args: T): Promise<R> => {
      return fn(...args);
    },
    // Dynamic key function
    (...args: T) => {
      const dateRange = getDateRange(args);
      const additionalParams = getAdditionalParams?.(args) || {};
      return [generateCacheKey(reportType, dateRange, additionalParams)];
    },
    // Dynamic options function
    (...args: T) => {
      const dateRange = getDateRange(args);
      const config = CACHE_CONFIGS[reportType];
      const ttl = getAppropriateTTL(reportType, dateRange);
      
      return {
        revalidate: ttl,
        tags: [...config.tags, `date:${format(dateRange.from, 'yyyy-MM-dd')}`]
      };
    }
  );
}

// Cache management utilities
export class AnalyticsCache {
  
  // Store a report in cache with metadata
  static async storeReport(report: Report): Promise<void> {
    const cacheKey = generateCacheKey(report.type, report.dateRange);
    const ttl = getAppropriateTTL(report.type, report.dateRange);
    const expiresAt = new Date(Date.now() + ttl * 1000);
    
    const cachedReport: CachedReport = {
      reportId: report.id,
      data: report,
      generatedAt: report.generatedAt,
      expiresAt,
      hash: AnalyticsCache.generateReportHash(report)
    };
    
    // In a real implementation, you'd store this in Redis or similar
    // For now, we'll use the Next.js cache indirectly
    console.log(`Report cached with key: ${cacheKey}, expires: ${expiresAt}`);
  }
  
  // Generate a hash for cache invalidation
  static generateReportHash(report: Report): string {
    const hashData = {
      type: report.type,
      dateRange: report.dateRange,
      // Include key data points that would indicate if regeneration is needed
      generatedAt: report.generatedAt
    };
    
    return Buffer.from(JSON.stringify(hashData)).toString('base64').slice(0, 16);
  }
  
  // Check if cached report is still valid
  static isCacheValid(cachedReport: CachedReport): boolean {
    const now = new Date();
    return isBefore(now, cachedReport.expiresAt);
  }
  
  // Invalidate cache for specific report type
  static async invalidateReportCache(reportType: ReportType): Promise<void> {
    const config = CACHE_CONFIGS[reportType];
    
    // Revalidate all tags associated with this report type
    for (const tag of config.tags) {
      revalidateTag(tag);
    }
    
    console.log(`Cache invalidated for report type: ${reportType}`);
  }
  
  // Invalidate cache for specific date range
  static async invalidateDateCache(date: Date): Promise<void> {
    const dateTag = `date:${format(date, 'yyyy-MM-dd')}`;
    revalidateTag(dateTag);
    
    console.log(`Cache invalidated for date: ${format(date, 'yyyy-MM-dd')}`);
  }
  
  // Invalidate all analytics caches
  static async invalidateAllCache(): Promise<void> {
    revalidateTag('analytics');
    console.log('All analytics cache invalidated');
  }
  
  // Get cache statistics (would typically query Redis or cache store)
  static async getCacheStats(): Promise<{
    totalCachedReports: number;
    cacheHitRate: number;
    avgGenerationTime: number;
    memoryUsage: number;
  }> {
    // Mock implementation - in real scenario, you'd query your cache store
    return {
      totalCachedReports: 42,
      cacheHitRate: 85.3,
      avgGenerationTime: 1250, // ms
      memoryUsage: 15.7 // MB
    };
  }
  
  // Preload frequently accessed reports
  static async preloadCommonReports(): Promise<void> {
    const today = new Date();
    const commonDateRanges = [
      // Today
      { from: startOfDay(today), to: endOfDay(today) },
      // Yesterday
      { 
        from: startOfDay(new Date(today.getTime() - 24 * 60 * 60 * 1000)), 
        to: endOfDay(new Date(today.getTime() - 24 * 60 * 60 * 1000)) 
      },
      // Last 7 days
      { 
        from: startOfDay(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)), 
        to: endOfDay(today) 
      }
    ];
    
    // This would trigger report generation for common date ranges
    console.log(`Preloading ${commonDateRanges.length} common report date ranges`);
  }
  
  // Cache warming for specific report types
  static async warmCache(reportTypes: ReportType[], dateRanges: DateRange[]): Promise<void> {
    console.log(`Warming cache for ${reportTypes.length} report types across ${dateRanges.length} date ranges`);
    
    // In a real implementation, you'd trigger report generation
    // for all combinations of report types and date ranges
    for (const reportType of reportTypes) {
      for (const dateRange of dateRanges) {
        const cacheKey = generateCacheKey(reportType, dateRange);
        console.log(`Would warm cache for: ${cacheKey}`);
      }
    }
  }
  
  // Clean up expired cache entries
  static async cleanupExpiredCache(): Promise<number> {
    // In a real implementation, you'd query your cache store
    // and remove expired entries
    console.log('Cleaning up expired cache entries');
    return 5; // Mock number of cleaned entries
  }
}

// Cache middleware for report generation
export function withCache<T extends any[], R extends Report>(
  reportGenerator: (...args: T) => Promise<R>,
  reportType: ReportType,
  getDateRange: (args: T) => DateRange
) {
  return async (...args: T): Promise<R> => {
    const dateRange = getDateRange(args);
    const cacheKey = generateCacheKey(reportType, dateRange);
    
    console.log(`Generating report with cache key: ${cacheKey}`);
    
    // Generate the report
    const report = await reportGenerator(...args);
    
    // Store in cache
    await AnalyticsCache.storeReport(report);
    
    return report;
  };
}

// Cache invalidation strategies
export class CacheInvalidationStrategy {
  
  // Invalidate when new sales data is received
  static async onSalesDataUpdate(timestamp: Date): Promise<void> {
    const date = startOfDay(timestamp);
    
    // Invalidate sales and customer reports for the affected date
    await AnalyticsCache.invalidateDateCache(date);
    await AnalyticsCache.invalidateReportCache('sales-summary');
    await AnalyticsCache.invalidateReportCache('customer-analytics');
    
    console.log(`Cache invalidated due to sales data update at ${timestamp}`);
  }
  
  // Invalidate when menu items are modified
  static async onMenuUpdate(): Promise<void> {
    await AnalyticsCache.invalidateReportCache('menu-engineering');
    await AnalyticsCache.invalidateReportCache('sales-summary');
    
    console.log('Cache invalidated due to menu update');
  }
  
  // Invalidate when employee data changes
  static async onEmployeeDataUpdate(): Promise<void> {
    await AnalyticsCache.invalidateReportCache('labor-analysis');
    
    console.log('Cache invalidated due to employee data update');
  }
  
  // Invalidate when inventory is updated
  static async onInventoryUpdate(): Promise<void> {
    await AnalyticsCache.invalidateReportCache('inventory-control');
    
    console.log('Cache invalidated due to inventory update');
  }
  
  // Smart invalidation based on data type and recency
  static async smartInvalidation(
    dataType: 'sales' | 'menu' | 'labor' | 'inventory' | 'customer',
    timestamp: Date,
    affectedDateRange?: DateRange
  ): Promise<void> {
    const now = new Date();
    const isRecent = (now.getTime() - timestamp.getTime()) < 3600000; // Within 1 hour
    
    if (!isRecent) {
      // Older updates might not need immediate cache invalidation
      console.log(`Skipping cache invalidation for older ${dataType} update`);
      return;
    }
    
    switch (dataType) {
      case 'sales':
        await this.onSalesDataUpdate(timestamp);
        break;
      case 'menu':
        await this.onMenuUpdate();
        break;
      case 'labor':
        await this.onEmployeeDataUpdate();
        break;
      case 'inventory':
        await this.onInventoryUpdate();
        break;
      case 'customer':
        await AnalyticsCache.invalidateReportCache('customer-analytics');
        break;
    }
  }
}

// Cache monitoring and metrics
export class CacheMetrics {
  
  static async recordCacheHit(reportType: ReportType, cacheKey: string): Promise<void> {
    // In a real implementation, you'd record this metric
    console.log(`Cache HIT for ${reportType}: ${cacheKey}`);
  }
  
  static async recordCacheMiss(reportType: ReportType, cacheKey: string): Promise<void> {
    // In a real implementation, you'd record this metric
    console.log(`Cache MISS for ${reportType}: ${cacheKey}`);
  }
  
  static async recordGenerationTime(
    reportType: ReportType, 
    generationTime: number
  ): Promise<void> {
    console.log(`Report generation time for ${reportType}: ${generationTime}ms`);
  }
  
  static async getMetricsSummary(): Promise<{
    cacheHitRate: Record<ReportType, number>;
    avgGenerationTime: Record<ReportType, number>;
    totalRequests: Record<ReportType, number>;
  }> {
    // Mock implementation - in real scenario, you'd query your metrics store
    const reportTypes: ReportType[] = [
      'sales-summary', 'menu-engineering', 'labor-analysis', 
      'inventory-control', 'customer-analytics'
    ];
    
    const cacheHitRate: Record<ReportType, number> = {} as any;
    const avgGenerationTime: Record<ReportType, number> = {} as any;
    const totalRequests: Record<ReportType, number> = {} as any;
    
    reportTypes.forEach(type => {
      cacheHitRate[type] = Math.random() * 30 + 70; // 70-100%
      avgGenerationTime[type] = Math.random() * 2000 + 500; // 500-2500ms
      totalRequests[type] = Math.floor(Math.random() * 1000) + 100;
    });
    
    return { cacheHitRate, avgGenerationTime, totalRequests };
  }
}

// Utility functions
export function formatCacheKey(key: string): string {
  return key.replace(/[^a-zA-Z0-9:.-]/g, '_');
}

export function parseCacheKey(key: string): {
  reportType: string;
  dateRange: string;
  params?: string;
} {
  const parts = key.split(':');
  const [prefix, reportType, dateRange, params] = parts;
  
  return {
    reportType,
    dateRange,
    params
  };
}