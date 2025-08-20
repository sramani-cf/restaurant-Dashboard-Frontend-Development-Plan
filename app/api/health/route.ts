import { NextRequest, NextResponse } from 'next/server';

// Health check data interface
interface HealthCheckData {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  checks: {
    database?: {
      status: 'up' | 'down';
      responseTime: number;
      error?: string;
    };
    cache?: {
      status: 'up' | 'down';
      responseTime: number;
      hitRate?: number;
      error?: string;
    };
    external?: {
      status: 'up' | 'down';
      services: Array<{
        name: string;
        status: 'up' | 'down';
        responseTime: number;
        error?: string;
      }>;
    };
    memory?: {
      used: number;
      free: number;
      total: number;
      usage: string;
    };
    disk?: {
      used: number;
      free: number;
      total: number;
      usage: string;
    };
  };
  performance: {
    avgResponseTime: number;
    requestsPerSecond: number;
    errorRate: number;
  };
}

// Simple in-memory metrics storage (in production, use Redis or similar)
let metrics = {
  requests: 0,
  errors: 0,
  totalResponseTime: 0,
  lastReset: Date.now(),
};

// Database health check
async function checkDatabase(): Promise<HealthCheckData['checks']['database']> {
  const startTime = Date.now();
  
  try {
    // Simulate database ping (replace with actual database check)
    await new Promise(resolve => setTimeout(resolve, 10));
    
    return {
      status: 'up',
      responseTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      status: 'down',
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Cache health check
async function checkCache(): Promise<HealthCheckData['checks']['cache']> {
  const startTime = Date.now();
  
  try {
    // Simulate cache check (replace with actual cache check)
    // For example, Redis ping or in-memory cache validation
    const testKey = 'health-check';
    const testValue = Date.now().toString();
    
    // Simulate cache operations
    await new Promise(resolve => setTimeout(resolve, 5));
    
    return {
      status: 'up',
      responseTime: Date.now() - startTime,
      hitRate: 0.85, // Example hit rate
    };
  } catch (error) {
    return {
      status: 'down',
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// External services health check
async function checkExternalServices(): Promise<HealthCheckData['checks']['external']> {
  const services = [
    { name: 'payment-gateway', url: process.env.PAYMENT_API_URL },
    { name: 'notification-service', url: process.env.NOTIFICATION_API_URL },
    { name: 'analytics-service', url: process.env.ANALYTICS_API_URL },
  ];
  
  const results = await Promise.allSettled(
    services.map(async service => {
      if (!service.url) {
        return {
          name: service.name,
          status: 'down' as const,
          responseTime: 0,
          error: 'Service URL not configured',
        };
      }
      
      const startTime = Date.now();
      
      try {
        // Simple ping to check if service is reachable
        const response = await fetch(`${service.url}/health`, {
          method: 'GET',
          timeout: 5000, // 5 second timeout
        });
        
        return {
          name: service.name,
          status: response.ok ? 'up' as const : 'down' as const,
          responseTime: Date.now() - startTime,
          error: response.ok ? undefined : `HTTP ${response.status}`,
        };
      } catch (error) {
        return {
          name: service.name,
          status: 'down' as const,
          responseTime: Date.now() - startTime,
          error: error instanceof Error ? error.message : 'Network error',
        };
      }
    })
  );
  
  return {
    status: results.every(result => 
      result.status === 'fulfilled' && result.value.status === 'up'
    ) ? 'up' : 'down',
    services: results.map(result => 
      result.status === 'fulfilled' ? result.value : {
        name: 'unknown',
        status: 'down' as const,
        responseTime: 0,
        error: 'Check failed',
      }
    ),
  };
}

// System resource checks
function getMemoryUsage(): HealthCheckData['checks']['memory'] {
  if (typeof process === 'undefined') {
    return {
      used: 0,
      free: 0,
      total: 0,
      usage: '0%',
    };
  }
  
  const memoryUsage = process.memoryUsage();
  const used = memoryUsage.heapUsed;
  const total = memoryUsage.heapTotal;
  const free = total - used;
  const usage = ((used / total) * 100).toFixed(1) + '%';
  
  return {
    used: Math.round(used / 1024 / 1024), // MB
    free: Math.round(free / 1024 / 1024), // MB
    total: Math.round(total / 1024 / 1024), // MB
    usage,
  };
}

// Calculate overall health status
function calculateOverallHealth(checks: HealthCheckData['checks']): HealthCheckData['status'] {
  const criticalServices = [checks.database];
  const importantServices = [checks.cache, checks.external];
  
  // If any critical service is down, system is unhealthy
  if (criticalServices.some(service => service?.status === 'down')) {
    return 'unhealthy';
  }
  
  // If any important service is down, system is degraded
  if (importantServices.some(service => service?.status === 'down')) {
    return 'degraded';
  }
  
  return 'healthy';
}

// Update metrics
function updateMetrics(responseTime: number, hasError: boolean = false) {
  metrics.requests++;
  metrics.totalResponseTime += responseTime;
  if (hasError) {
    metrics.errors++;
  }
}

// Calculate performance metrics
function getPerformanceMetrics() {
  const timeSinceReset = Date.now() - metrics.lastReset;
  const secondsSinceReset = timeSinceReset / 1000;
  
  return {
    avgResponseTime: metrics.requests > 0 ? metrics.totalResponseTime / metrics.requests : 0,
    requestsPerSecond: secondsSinceReset > 0 ? metrics.requests / secondsSinceReset : 0,
    errorRate: metrics.requests > 0 ? (metrics.errors / metrics.requests) * 100 : 0,
  };
}

// GET /api/health - Health check endpoint
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Run health checks in parallel
    const [databaseCheck, cacheCheck, externalCheck] = await Promise.allSettled([
      checkDatabase(),
      checkCache(),
      checkExternalServices(),
    ]);
    
    const checks: HealthCheckData['checks'] = {
      database: databaseCheck.status === 'fulfilled' ? databaseCheck.value : {
        status: 'down',
        responseTime: 0,
        error: 'Health check failed',
      },
      cache: cacheCheck.status === 'fulfilled' ? cacheCheck.value : {
        status: 'down',
        responseTime: 0,
        error: 'Health check failed',
      },
      external: externalCheck.status === 'fulfilled' ? externalCheck.value : {
        status: 'down',
        services: [],
      },
      memory: getMemoryUsage(),
    };
    
    const overallStatus = calculateOverallHealth(checks);
    
    const healthData: HealthCheckData = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      uptime: process.uptime ? process.uptime() : 0,
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks,
      performance: getPerformanceMetrics(),
    };
    
    const responseTime = Date.now() - startTime;
    updateMetrics(responseTime, false);
    
    // Set appropriate HTTP status based on health
    const httpStatus = {
      healthy: 200,
      degraded: 200,
      unhealthy: 503,
    }[overallStatus];
    
    // Add response headers
    const response = NextResponse.json(healthData, { 
      status: httpStatus,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
        'X-Health-Check': 'true',
        'X-Response-Time': `${responseTime}ms`,
      },
    });
    
    return response;
    
  } catch (error) {
    const responseTime = Date.now() - startTime;
    updateMetrics(responseTime, true);
    
    console.error('[Health Check] Error:', error);
    
    const errorResponse: HealthCheckData = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime ? process.uptime() : 0,
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks: {},
      performance: getPerformanceMetrics(),
    };
    
    return NextResponse.json(errorResponse, { 
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
        'X-Health-Check': 'true',
        'X-Response-Time': `${responseTime}ms`,
      },
    });
  }
}

// HEAD /api/health - Lightweight health check
export async function HEAD(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Quick database check only
    const dbCheck = await checkDatabase();
    const isHealthy = dbCheck.status === 'up';
    
    const responseTime = Date.now() - startTime;
    updateMetrics(responseTime, !isHealthy);
    
    return new NextResponse(null, {
      status: isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Health-Status': isHealthy ? 'healthy' : 'unhealthy',
        'X-Response-Time': `${responseTime}ms`,
      },
    });
    
  } catch (error) {
    const responseTime = Date.now() - startTime;
    updateMetrics(responseTime, true);
    
    return new NextResponse(null, {
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Health-Status': 'unhealthy',
        'X-Response-Time': `${responseTime}ms`,
      },
    });
  }
}

// POST /api/health/reset - Reset metrics (admin only)
export async function POST(request: NextRequest) {
  // In production, add authentication check here
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Reset metrics
  metrics = {
    requests: 0,
    errors: 0,
    totalResponseTime: 0,
    lastReset: Date.now(),
  };
  
  return NextResponse.json({
    message: 'Metrics reset successfully',
    timestamp: new Date().toISOString(),
  });
}