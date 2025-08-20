'use client';

import { useEffect } from 'react';
import { initWebVitals, configurePerformanceMonitoring } from '@/lib/performance/monitoring';

interface PerformanceMonitorProps {
  enableAnalytics?: boolean;
  sampleRate?: number;
  debug?: boolean;
}

export function PerformanceMonitor({
  enableAnalytics = true,
  sampleRate = 1.0,
  debug = false,
}: PerformanceMonitorProps = {}) {
  useEffect(() => {
    // Configure performance monitoring
    configurePerformanceMonitoring({
      enableAnalytics,
      sampleRate,
      debug,
      enableConsoleLogging: process.env.NODE_ENV === 'development',
    });

    // Initialize Web Vitals monitoring
    initWebVitals();

    // Monitor page visibility changes for better metrics
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Send any pending metrics when page becomes hidden
        if (navigator.sendBeacon) {
          const metrics = (window as any).performanceMetrics || [];
          if (metrics.length > 0) {
            navigator.sendBeacon('/api/analytics/performance', JSON.stringify(metrics));
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enableAnalytics, sampleRate, debug]);

  // This component doesn't render anything
  return null;
}