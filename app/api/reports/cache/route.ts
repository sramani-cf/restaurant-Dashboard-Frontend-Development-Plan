import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { 
  AnalyticsCache,
  CacheInvalidationStrategy,
  CacheMetrics
} from '@/lib/analytics/cache';
import { ReportType } from '@/lib/analytics/types';

const CacheActionSchema = z.object({
  action: z.enum(['invalidate', 'warm', 'cleanup', 'stats']),
  reportType: z.enum([
    'sales-summary',
    'menu-engineering',
    'labor-analysis',
    'inventory-control',
    'customer-analytics'
  ]).optional(),
  date: z.string().optional().transform(str => str ? new Date(str) : undefined),
  dataType: z.enum(['sales', 'menu', 'labor', 'inventory', 'customer']).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, reportType, date, dataType } = CacheActionSchema.parse(body);

    switch (action) {
      case 'invalidate':
        if (reportType) {
          await AnalyticsCache.invalidateReportCache(reportType);
          return NextResponse.json({
            success: true,
            message: `Cache invalidated for ${reportType}`,
            timestamp: new Date().toISOString()
          });
        } else if (date) {
          await AnalyticsCache.invalidateDateCache(date);
          return NextResponse.json({
            success: true,
            message: `Cache invalidated for date ${date.toISOString().split('T')[0]}`,
            timestamp: new Date().toISOString()
          });
        } else {
          await AnalyticsCache.invalidateAllCache();
          return NextResponse.json({
            success: true,
            message: 'All analytics cache invalidated',
            timestamp: new Date().toISOString()
          });
        }

      case 'warm':
        await AnalyticsCache.preloadCommonReports();
        return NextResponse.json({
          success: true,
          message: 'Cache warming initiated for common reports',
          timestamp: new Date().toISOString()
        });

      case 'cleanup':
        const cleanedCount = await AnalyticsCache.cleanupExpiredCache();
        return NextResponse.json({
          success: true,
          message: `Cleaned up ${cleanedCount} expired cache entries`,
          cleanedCount,
          timestamp: new Date().toISOString()
        });

      case 'stats':
        const stats = await AnalyticsCache.getCacheStats();
        const metrics = await CacheMetrics.getMetricsSummary();
        return NextResponse.json({
          success: true,
          data: {
            ...stats,
            metrics
          },
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { 
            success: false, 
            error: 'Invalid cache action' 
          },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Cache management error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid request parameters',
          details: error.errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Cache operation failed'
      },
      { status: 500 }
    );
  }
}

// Smart invalidation endpoint
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { dataType, timestamp, affectedDateRange } = body;

    if (!dataType || !timestamp) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'dataType and timestamp are required' 
        },
        { status: 400 }
      );
    }

    await CacheInvalidationStrategy.smartInvalidation(
      dataType,
      new Date(timestamp),
      affectedDateRange ? {
        from: new Date(affectedDateRange.from),
        to: new Date(affectedDateRange.to)
      } : undefined
    );

    return NextResponse.json({
      success: true,
      message: `Smart cache invalidation completed for ${dataType}`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Smart invalidation error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Smart invalidation failed'
      },
      { status: 500 }
    );
  }
}