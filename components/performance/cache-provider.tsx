'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { 
  getCacheStats, 
  clientCacheClear, 
  warmCache,
  preloadData 
} from '@/lib/performance/cache';

// Cache context for managing application-wide caching
interface CacheContextType {
  clearCache: (key?: string) => void;
  getCacheStats: () => any;
  preloadData: (fetcher: () => Promise<any>, key: string, ttl?: number) => void;
  warmCache: (warmers: Array<{ key: string; fetcher: () => Promise<any>; ttl?: number }>) => Promise<void>;
}

const CacheContext = createContext<CacheContextType | undefined>(undefined);

// Hook to use cache context
export const useCache = (): CacheContextType => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache must be used within a CacheProvider');
  }
  return context;
};

interface CacheProviderProps {
  children: ReactNode;
  warmCacheOnMount?: boolean;
}

export function CacheProvider({ 
  children, 
  warmCacheOnMount = true 
}: CacheProviderProps) {
  useEffect(() => {
    if (warmCacheOnMount) {
      // Warm cache with commonly used data on app start
      const commonCacheWarmers = [
        {
          key: 'user-preferences',
          fetcher: async () => {
            // Replace with actual user preferences fetch
            return Promise.resolve({ theme: 'light', language: 'en' });
          },
          ttl: 24 * 60 * 60 * 1000, // 24 hours
        },
        {
          key: 'app-config',
          fetcher: async () => {
            // Replace with actual app configuration fetch
            return Promise.resolve({ 
              features: ['analytics', 'inventory', 'kds'],
              version: '1.0.0' 
            });
          },
          ttl: 60 * 60 * 1000, // 1 hour
        },
      ];

      warmCache(commonCacheWarmers).catch(error => {
        console.warn('Failed to warm cache on mount:', error);
      });
    }

    // Clear expired cache entries periodically
    const cleanupInterval = setInterval(() => {
      // This is handled internally by the cache utilities
      // but we could add additional cleanup logic here
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => {
      clearInterval(cleanupInterval);
    };
  }, [warmCacheOnMount]);

  const cacheContextValue: CacheContextType = {
    clearCache: clientCacheClear,
    getCacheStats,
    preloadData,
    warmCache,
  };

  return (
    <CacheContext.Provider value={cacheContextValue}>
      {children}
    </CacheContext.Provider>
  );
}