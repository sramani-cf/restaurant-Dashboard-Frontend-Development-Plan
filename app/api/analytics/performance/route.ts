import { NextRequest, NextResponse } from 'next/server';

// Interface for performance metrics
interface PerformanceMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  navigationType: string;
  timestamp: number;
  url: string;
  userAgent: string;
  connection?: {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  };
  viewport?: {
    width: number;
    height: number;
    devicePixelRatio: number;
  };
  sessionId: string;
}

// In-memory store for metrics (in production, use a proper database)
let metricsStore: PerformanceMetric[] = [];
const MAX_METRICS = 10000; // Limit to prevent memory issues

// POST /api/analytics/performance - Collect performance metrics
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    
    let metrics: PerformanceMetric | PerformanceMetric[];
    
    if (contentType?.includes('application/json')) {
      metrics = await request.json();
    } else {
      // Handle sendBeacon data (sent as text)
      const text = await request.text();
      metrics = JSON.parse(text);
    }
    
    // Ensure metrics is an array
    const metricsArray = Array.isArray(metrics) ? metrics : [metrics];
    
    // Validate and store metrics
    const validMetrics = metricsArray.filter(isValidMetric);
    
    // Add to store
    metricsStore.push(...validMetrics);
    
    // Keep store size manageable
    if (metricsStore.length > MAX_METRICS) {
      metricsStore = metricsStore.slice(-MAX_METRICS);
    }
    
    console.log(`[Performance Analytics] Stored ${validMetrics.length} metrics`);
    
    return NextResponse.json({ 
      success: true, 
      stored: validMetrics.length,
      total: metricsStore.length 
    });
    
  } catch (error) {
    console.error('[Performance Analytics] Error storing metrics:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to store metrics',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 400 }
    );
  }
}

// GET /api/analytics/performance - Retrieve performance analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '24h';
    const metric = searchParams.get('metric');
    const url = searchParams.get('url');
    const format = searchParams.get('format') || 'summary';
    
    // Calculate time filter
    const now = Date.now();
    const timeframes: Record<string, number> = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
    };
    
    const timeLimit = now - (timeframes[timeframe] || timeframes['24h']);
    
    // Filter metrics
    let filteredMetrics = metricsStore.filter(m => m.timestamp > timeLimit);
    
    if (metric) {
      filteredMetrics = filteredMetrics.filter(m => m.name === metric);
    }
    
    if (url) {
      filteredMetrics = filteredMetrics.filter(m => m.url === url);
    }
    
    if (format === 'raw') {
      return NextResponse.json({
        metrics: filteredMetrics,
        count: filteredMetrics.length,
        timeframe,
      });
    }
    
    // Generate analytics summary
    const analytics = generateAnalyticsSummary(filteredMetrics, timeframe);
    
    return NextResponse.json(analytics);
    
  } catch (error) {
    console.error('[Performance Analytics] Error retrieving metrics:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to retrieve metrics',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/analytics/performance - Clear metrics (admin only)
export async function DELETE(request: NextRequest) {
  try {
    // In production, add proper authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const previousCount = metricsStore.length;
    metricsStore = [];
    
    return NextResponse.json({
      success: true,
      message: `Cleared ${previousCount} metrics`,
      clearedCount: previousCount,
    });
    
  } catch (error) {
    console.error('[Performance Analytics] Error clearing metrics:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to clear metrics',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Utility functions
function isValidMetric(metric: any): metric is PerformanceMetric {
  return (
    typeof metric === 'object' &&
    typeof metric.name === 'string' &&
    typeof metric.value === 'number' &&
    typeof metric.id === 'string' &&
    typeof metric.timestamp === 'number' &&
    typeof metric.url === 'string' &&
    ['good', 'needs-improvement', 'poor'].includes(metric.rating)
  );
}

function generateAnalyticsSummary(metrics: PerformanceMetric[], timeframe: string) {
  if (metrics.length === 0) {
    return {
      summary: {
        totalSamples: 0,
        timeframe,
        webVitals: {},
        performance: {},
        devices: {},
        pages: {},
      }
    };
  }
  
  // Group metrics by type
  const metricsByType = metrics.reduce((acc, metric) => {
    if (!acc[metric.name]) {
      acc[metric.name] = [];
    }
    acc[metric.name].push(metric);
    return acc;
  }, {} as Record<string, PerformanceMetric[]>);
  
  // Calculate Web Vitals summary
  const webVitals = calculateWebVitalsSummary(metricsByType);
  
  // Calculate performance summary
  const performance = calculatePerformanceSummary(metricsByType);
  
  // Calculate device/browser summary
  const devices = calculateDeviceSummary(metrics);
  
  // Calculate page performance summary
  const pages = calculatePageSummary(metrics);
  
  // Calculate trends
  const trends = calculateTrends(metrics);
  
  return {
    summary: {
      totalSamples: metrics.length,
      timeframe,
      webVitals,
      performance,
      devices,
      pages,
      trends,
      generatedAt: new Date().toISOString(),
    }
  };
}

function calculateWebVitalsSummary(metricsByType: Record<string, PerformanceMetric[]>) {
  const vitals = ['CLS', 'FID', 'FCP', 'LCP', 'TTFB'];
  const summary: Record<string, any> = {};
  
  vitals.forEach(vital => {
    const vitalMetrics = metricsByType[vital] || [];
    if (vitalMetrics.length > 0) {
      const values = vitalMetrics.map(m => m.value);
      const ratings = vitalMetrics.map(m => m.rating);
      
      summary[vital] = {
        samples: vitalMetrics.length,
        p75: calculatePercentile(values, 75),
        p90: calculatePercentile(values, 90),
        p95: calculatePercentile(values, 95),
        average: values.reduce((a, b) => a + b, 0) / values.length,
        ratings: {
          good: ratings.filter(r => r === 'good').length,
          'needs-improvement': ratings.filter(r => r === 'needs-improvement').length,
          poor: ratings.filter(r => r === 'poor').length,
        },
      };
    }
  });
  
  return summary;
}

function calculatePerformanceSummary(metricsByType: Record<string, PerformanceMetric[]>) {
  const performanceTypes = ['route-change', 'component-render', 'api-call'];
  const summary: Record<string, any> = {};
  
  performanceTypes.forEach(type => {
    const typeMetrics = metricsByType[type] || [];
    if (typeMetrics.length > 0) {
      const values = typeMetrics.map(m => m.value);
      
      summary[type] = {
        samples: typeMetrics.length,
        average: values.reduce((a, b) => a + b, 0) / values.length,
        p95: calculatePercentile(values, 95),
        slowest: Math.max(...values),
        fastest: Math.min(...values),
      };
    }
  });
  
  return summary;
}

function calculateDeviceSummary(metrics: PerformanceMetric[]) {
  const devices: Record<string, number> = {};
  const connections: Record<string, number> = {};
  const viewports: Record<string, number> = {};
  
  metrics.forEach(metric => {
    // Extract device type from user agent (simplified)
    const isMobile = /Mobile|Android|iPhone|iPad/.test(metric.userAgent);
    const deviceType = isMobile ? 'mobile' : 'desktop';
    devices[deviceType] = (devices[deviceType] || 0) + 1;
    
    // Connection type
    if (metric.connection?.effectiveType) {
      const connType = metric.connection.effectiveType;
      connections[connType] = (connections[connType] || 0) + 1;
    }
    
    // Viewport sizes
    if (metric.viewport) {
      const vpSize = metric.viewport.width < 768 ? 'small' : 
                    metric.viewport.width < 1200 ? 'medium' : 'large';
      viewports[vpSize] = (viewports[vpSize] || 0) + 1;
    }
  });
  
  return { devices, connections, viewports };
}

function calculatePageSummary(metrics: PerformanceMetric[]) {
  const pages: Record<string, any> = {};
  
  metrics.forEach(metric => {
    const url = metric.url;
    if (!pages[url]) {
      pages[url] = {
        samples: 0,
        totalValue: 0,
        ratings: { good: 0, 'needs-improvement': 0, poor: 0 },
      };
    }
    
    pages[url].samples++;
    pages[url].totalValue += metric.value;
    pages[url].ratings[metric.rating]++;
  });
  
  // Calculate averages
  Object.keys(pages).forEach(url => {
    pages[url].average = pages[url].totalValue / pages[url].samples;
  });
  
  return pages;
}

function calculateTrends(metrics: PerformanceMetric[]) {
  // Sort by timestamp
  const sortedMetrics = metrics.sort((a, b) => a.timestamp - b.timestamp);
  
  // Group by hour for trend analysis
  const hourlyData: Record<string, PerformanceMetric[]> = {};
  
  sortedMetrics.forEach(metric => {
    const hour = new Date(metric.timestamp).toISOString().substring(0, 13);
    if (!hourlyData[hour]) {
      hourlyData[hour] = [];
    }
    hourlyData[hour].push(metric);
  });
  
  // Calculate hourly averages for key metrics
  const trends: Record<string, any[]> = {
    LCP: [],
    FID: [],
    CLS: [],
    TTFB: [],
  };
  
  Object.entries(hourlyData).forEach(([hour, hourMetrics]) => {
    ['LCP', 'FID', 'CLS', 'TTFB'].forEach(metric => {
      const metricData = hourMetrics.filter(m => m.name === metric);
      if (metricData.length > 0) {
        const average = metricData.reduce((sum, m) => sum + m.value, 0) / metricData.length;
        trends[metric].push({
          time: hour,
          value: average,
          samples: metricData.length,
        });
      }
    });
  });
  
  return trends;
}

function calculatePercentile(values: number[], percentile: number): number {
  const sorted = values.sort((a, b) => a - b);
  const index = Math.ceil(sorted.length * (percentile / 100)) - 1;
  return sorted[Math.max(0, index)] || 0;
}