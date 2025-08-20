'use client';

import { getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from 'web-vitals';

// Types for performance metrics
export interface PerformanceMetrics {
  name: string;
  value: number;
  id: string;
  delta: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  navigationType: 'navigate' | 'reload' | 'back-forward' | 'back-forward-cache' | 'prerender';
  entries?: PerformanceEntry[];
}

export interface NavigationTiming {
  dns: number;
  connection: number;
  request: number;
  response: number;
  domProcessing: number;
  domComplete: number;
  onLoad: number;
  total: number;
}

export interface ResourceTiming {
  name: string;
  size: number;
  duration: number;
  startTime: number;
  type: string;
}

// Configuration for monitoring
interface MonitoringConfig {
  enableConsoleLogging?: boolean;
  enableAnalytics?: boolean;
  sampleRate?: number;
  apiEndpoint?: string;
  debug?: boolean;
}

const defaultConfig: MonitoringConfig = {
  enableConsoleLogging: process.env.NODE_ENV === 'development',
  enableAnalytics: true,
  sampleRate: 1.0,
  apiEndpoint: '/api/analytics/performance',
  debug: false,
};

let config = { ...defaultConfig };

/**
 * Configure performance monitoring
 */
export const configurePerformanceMonitoring = (userConfig: Partial<MonitoringConfig>): void => {
  config = { ...defaultConfig, ...userConfig };
  
  if (config.debug) {
    console.log('[Performance] Configuration updated:', config);
  }
};

/**
 * Initialize Web Vitals monitoring
 */
export const initWebVitals = (): void => {
  if (typeof window === 'undefined') return;
  
  // Sample rate check
  if (Math.random() > config.sampleRate!) return;
  
  const handleMetric = (metric: Metric) => {
    const performanceMetric: PerformanceMetrics = {
      name: metric.name,
      value: metric.value,
      id: metric.id,
      delta: metric.delta,
      rating: metric.rating,
      navigationType: metric.navigationType as any,
      entries: metric.entries,
    };
    
    if (config.enableConsoleLogging) {
      console.log(`[Performance] ${metric.name}:`, performanceMetric);
    }
    
    // Send to analytics
    sendMetricToAnalytics(performanceMetric);
  };

  // Collect Core Web Vitals
  getCLS(handleMetric);
  getFID(handleMetric);
  getFCP(handleMetric);
  getLCP(handleMetric);
  getTTFB(handleMetric);
  
  if (config.debug) {
    console.log('[Performance] Web Vitals monitoring initialized');
  }
};

/**
 * Send metric data to analytics endpoint
 */
const sendMetricToAnalytics = async (metric: PerformanceMetrics): Promise<void> => {
  if (!config.enableAnalytics || !config.apiEndpoint) return;
  
  try {
    const payload = {
      ...metric,
      timestamp: Date.now(),
      url: window.location.pathname,
      userAgent: navigator.userAgent,
      connection: getConnectionInfo(),
      viewport: getViewportInfo(),
      sessionId: getSessionId(),
    };
    
    // Use sendBeacon for reliability, fallback to fetch
    if ('sendBeacon' in navigator) {
      const success = navigator.sendBeacon(
        config.apiEndpoint,
        JSON.stringify(payload)
      );
      
      if (!success && config.debug) {
        console.warn('[Performance] sendBeacon failed, falling back to fetch');
        await fetch(config.apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        });
      }
    } else {
      await fetch(config.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    }
  } catch (error) {
    if (config.debug) {
      console.error('[Performance] Failed to send metric to analytics:', error);
    }
  }
};

/**
 * Get detailed navigation timing information
 */
export const getNavigationTiming = (): NavigationTiming | null => {
  if (typeof window === 'undefined' || !window.performance?.timing) return null;
  
  const timing = window.performance.timing;
  const navigationStart = timing.navigationStart;
  
  return {
    dns: timing.domainLookupEnd - timing.domainLookupStart,
    connection: timing.connectEnd - timing.connectStart,
    request: timing.responseStart - timing.requestStart,
    response: timing.responseEnd - timing.responseStart,
    domProcessing: timing.domContentLoadedEventStart - timing.responseEnd,
    domComplete: timing.domComplete - timing.domContentLoadedEventStart,
    onLoad: timing.loadEventEnd - timing.loadEventStart,
    total: timing.loadEventEnd - navigationStart,
  };
};

/**
 * Get resource timing information
 */
export const getResourceTiming = (): ResourceTiming[] => {
  if (typeof window === 'undefined' || !window.performance?.getEntriesByType) return [];
  
  const resources = window.performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  
  return resources.map(resource => ({
    name: resource.name,
    size: resource.transferSize || 0,
    duration: resource.responseEnd - resource.startTime,
    startTime: resource.startTime,
    type: getResourceType(resource.name),
  }));
};

/**
 * Get memory usage information (Chrome only)
 */
export const getMemoryUsage = (): any => {
  if (typeof window === 'undefined') return null;
  
  const memory = (performance as any)?.memory;
  if (!memory) return null;
  
  return {
    usedJSHeapSize: memory.usedJSHeapSize,
    totalJSHeapSize: memory.totalJSHeapSize,
    jsHeapSizeLimit: memory.jsHeapSizeLimit,
    usedPercentage: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100),
  };
};

/**
 * Monitor route changes performance
 */
export const monitorRouteChange = (routeName: string): () => void => {
  const startTime = performance.now();
  
  if (config.debug) {
    console.log(`[Performance] Route change started: ${routeName}`);
  }
  
  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    const metric: PerformanceMetrics = {
      name: 'route-change',
      value: duration,
      id: `${routeName}-${Date.now()}`,
      delta: duration,
      rating: duration < 100 ? 'good' : duration < 300 ? 'needs-improvement' : 'poor',
      navigationType: 'navigate',
    };
    
    if (config.enableConsoleLogging) {
      console.log(`[Performance] Route change completed: ${routeName} (${duration.toFixed(2)}ms)`);
    }
    
    sendMetricToAnalytics(metric);
  };
};

/**
 * Monitor component render performance
 */
export const monitorComponentRender = (componentName: string): () => void => {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    const metric: PerformanceMetrics = {
      name: 'component-render',
      value: duration,
      id: `${componentName}-${Date.now()}`,
      delta: duration,
      rating: duration < 16 ? 'good' : duration < 50 ? 'needs-improvement' : 'poor',
      navigationType: 'navigate',
    };
    
    if (config.debug && duration > 10) {
      console.log(`[Performance] Slow component render: ${componentName} (${duration.toFixed(2)}ms)`);
    }
    
    if (duration > 10) { // Only send if render time is significant
      sendMetricToAnalytics(metric);
    }
  };
};

/**
 * Monitor API call performance
 */
export const monitorApiCall = async <T>(
  apiCall: () => Promise<T>,
  endpoint: string
): Promise<T> => {
  const startTime = performance.now();
  
  try {
    const result = await apiCall();
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    const metric: PerformanceMetrics = {
      name: 'api-call',
      value: duration,
      id: `${endpoint}-${Date.now()}`,
      delta: duration,
      rating: duration < 200 ? 'good' : duration < 500 ? 'needs-improvement' : 'poor',
      navigationType: 'navigate',
    };
    
    if (config.enableConsoleLogging) {
      console.log(`[Performance] API call: ${endpoint} (${duration.toFixed(2)}ms)`);
    }
    
    sendMetricToAnalytics(metric);
    
    return result;
  } catch (error) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    const metric: PerformanceMetrics = {
      name: 'api-call-error',
      value: duration,
      id: `${endpoint}-error-${Date.now()}`,
      delta: duration,
      rating: 'poor',
      navigationType: 'navigate',
    };
    
    sendMetricToAnalytics(metric);
    throw error;
  }
};

/**
 * Custom performance mark utility
 */
export const performanceMark = (name: string): void => {
  if (typeof window !== 'undefined' && window.performance?.mark) {
    window.performance.mark(name);
    
    if (config.debug) {
      console.log(`[Performance] Mark: ${name}`);
    }
  }
};

/**
 * Custom performance measure utility
 */
export const performanceMeasure = (
  name: string,
  startMark?: string,
  endMark?: string
): number => {
  if (typeof window === 'undefined' || !window.performance?.measure) return 0;
  
  try {
    window.performance.measure(name, startMark, endMark);
    const measures = window.performance.getEntriesByName(name, 'measure');
    const latestMeasure = measures[measures.length - 1];
    
    if (config.debug) {
      console.log(`[Performance] Measure: ${name} (${latestMeasure.duration.toFixed(2)}ms)`);
    }
    
    return latestMeasure.duration;
  } catch (error) {
    if (config.debug) {
      console.error(`[Performance] Failed to measure ${name}:`, error);
    }
    return 0;
  }
};

/**
 * Get performance observer data
 */
export const observePerformance = (
  entryTypes: string[],
  callback: (entries: PerformanceEntry[]) => void
): PerformanceObserver | null => {
  if (typeof window === 'undefined' || !window.PerformanceObserver) return null;
  
  try {
    const observer = new PerformanceObserver((list) => {
      callback(list.getEntries());
    });
    
    observer.observe({ entryTypes });
    return observer;
  } catch (error) {
    if (config.debug) {
      console.error('[Performance] Failed to create performance observer:', error);
    }
    return null;
  }
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

const getConnectionInfo = () => {
  if (typeof window === 'undefined' || !('connection' in navigator)) return null;
  
  const connection = (navigator as any).connection;
  return {
    effectiveType: connection?.effectiveType,
    downlink: connection?.downlink,
    rtt: connection?.rtt,
    saveData: connection?.saveData,
  };
};

const getViewportInfo = () => {
  if (typeof window === 'undefined') return null;
  
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
  };
};

const getSessionId = (): string => {
  if (typeof window === 'undefined') return 'server';
  
  let sessionId = sessionStorage.getItem('performance-session-id');
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('performance-session-id', sessionId);
  }
  return sessionId;
};

const getResourceType = (name: string): string => {
  if (name.includes('.js')) return 'script';
  if (name.includes('.css')) return 'stylesheet';
  if (name.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/)) return 'image';
  if (name.match(/\.(woff|woff2|ttf|otf|eot)$/)) return 'font';
  if (name.includes('/api/')) return 'api';
  return 'other';
};

/**
 * React hook for component performance monitoring
 */
export const usePerformanceMonitor = (componentName: string) => {
  if (typeof window === 'undefined') return { startMeasure: () => {}, endMeasure: () => {} };
  
  let measureEnd: (() => void) | null = null;
  
  const startMeasure = () => {
    measureEnd = monitorComponentRender(componentName);
  };
  
  const endMeasure = () => {
    if (measureEnd) {
      measureEnd();
      measureEnd = null;
    }
  };
  
  return { startMeasure, endMeasure };
};

/**
 * Get current performance metrics summary
 */
export const getPerformanceSummary = () => {
  if (typeof window === 'undefined') return null;
  
  return {
    navigation: getNavigationTiming(),
    resources: getResourceTiming(),
    memory: getMemoryUsage(),
    connection: getConnectionInfo(),
    viewport: getViewportInfo(),
    timestamp: Date.now(),
  };
};