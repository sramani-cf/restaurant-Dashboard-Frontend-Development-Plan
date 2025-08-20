import { cache } from 'react';

// Types for cache configuration
interface CacheConfig {
  ttl?: number; // Time to live in milliseconds
  key?: string;
  revalidate?: boolean;
}

// Global cache storage for client-side caching
const clientCache = new Map<string, { value: any; timestamp: number; ttl: number }>();

/**
 * React.cache wrapper for server-side data fetching
 * Automatically deduplicates requests during server rendering
 */
export const createCachedFetch = <T extends any[], R>(
  fetcher: (...args: T) => Promise<R>,
  keyFn?: (...args: T) => string
) => {
  return cache(async (...args: T): Promise<R> => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);
    
    console.log(`[Cache] Fetching data for key: ${key}`);
    
    try {
      const result = await fetcher(...args);
      console.log(`[Cache] Successfully cached data for key: ${key}`);
      return result;
    } catch (error) {
      console.error(`[Cache] Error fetching data for key: ${key}`, error);
      throw error;
    }
  });
};

/**
 * Client-side cache with TTL support
 * Useful for caching API responses on the client
 */
export const clientCacheGet = <T>(key: string): T | null => {
  const cached = clientCache.get(key);
  
  if (!cached) {
    return null;
  }
  
  // Check if cache is expired
  if (Date.now() - cached.timestamp > cached.ttl) {
    clientCache.delete(key);
    return null;
  }
  
  return cached.value as T;
};

export const clientCacheSet = <T>(key: string, value: T, ttl: number = 300000): void => { // 5 minutes default
  clientCache.set(key, {
    value,
    timestamp: Date.now(),
    ttl,
  });
};

export const clientCacheClear = (key?: string): void => {
  if (key) {
    clientCache.delete(key);
  } else {
    clientCache.clear();
  }
};

/**
 * Cached fetch function with request deduplication and TTL
 * Works on both client and server
 */
export const cachedFetch = async <T>(
  url: string, 
  options: RequestInit & CacheConfig = {}
): Promise<T> => {
  const { ttl = 300000, key, revalidate = false, ...fetchOptions } = options;
  const cacheKey = key || url;
  
  // For client-side caching
  if (typeof window !== 'undefined') {
    if (!revalidate) {
      const cached = clientCacheGet<T>(cacheKey);
      if (cached) {
        console.log(`[Cache] Using cached data for: ${url}`);
        return cached;
      }
    }
  }
  
  // Configure fetch options for caching
  const enhancedOptions: RequestInit = {
    ...fetchOptions,
    // Use Next.js fetch cache for server-side caching
    next: {
      revalidate: Math.floor(ttl / 1000), // Convert to seconds
      tags: [cacheKey],
      ...fetchOptions.next,
    },
  };
  
  console.log(`[Cache] Fetching from network: ${url}`);
  
  try {
    const response = await fetch(url, enhancedOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Cache on client-side
    if (typeof window !== 'undefined') {
      clientCacheSet(cacheKey, data, ttl);
    }
    
    return data;
  } catch (error) {
    console.error(`[Cache] Fetch error for ${url}:`, error);
    
    // Try to return stale cache on error (client-side only)
    if (typeof window !== 'undefined') {
      const staleCache = clientCache.get(cacheKey);
      if (staleCache) {
        console.log(`[Cache] Returning stale cache for: ${url}`);
        return staleCache.value as T;
      }
    }
    
    throw error;
  }
};

/**
 * Cached API call with automatic retries and exponential backoff
 */
export const cachedApiCall = async <T>(
  endpoint: string,
  options: RequestInit & CacheConfig & { retries?: number; baseDelay?: number } = {}
): Promise<T> => {
  const { retries = 3, baseDelay = 1000, ...restOptions } = options;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
  const url = endpoint.startsWith('/') ? `${baseUrl}${endpoint}` : `${baseUrl}/${endpoint}`;
  
  let lastError: Error;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await cachedFetch<T>(url, restOptions);
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === retries) {
        break;
      }
      
      const delay = baseDelay * Math.pow(2, attempt);
      console.log(`[Cache] Retrying in ${delay}ms (attempt ${attempt + 1}/${retries + 1})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

/**
 * Memoized function creator with TTL
 * Useful for caching expensive computations
 */
export const createMemoized = <T extends any[], R>(
  fn: (...args: T) => R,
  keyFn?: (...args: T) => string,
  ttl: number = 300000
) => {
  const cache = new Map<string, { value: R; timestamp: number }>();
  
  return (...args: T): R => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);
    const cached = cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value;
    }
    
    const value = fn(...args);
    cache.set(key, { value, timestamp: Date.now() });
    
    return value;
  };
};

/**
 * Database query cache using React.cache
 * Automatically handles request deduplication during SSR
 */
export const createCachedDbQuery = <T extends any[], R>(
  query: (...args: T) => Promise<R>,
  tableName: string
) => {
  return cache(async (...args: T): Promise<R> => {
    const queryKey = `${tableName}-${JSON.stringify(args)}`;
    console.log(`[DB Cache] Executing query: ${queryKey}`);
    
    const startTime = performance.now();
    
    try {
      const result = await query(...args);
      const duration = performance.now() - startTime;
      
      console.log(`[DB Cache] Query completed in ${duration.toFixed(2)}ms: ${queryKey}`);
      
      return result;
    } catch (error) {
      console.error(`[DB Cache] Query failed: ${queryKey}`, error);
      throw error;
    }
  });
};

/**
 * Cache invalidation utilities
 */
export const revalidateCache = async (tag: string): Promise<void> => {
  try {
    // This would work with Next.js revalidateTag in a server action
    if (typeof window === 'undefined') {
      const { revalidateTag } = await import('next/cache');
      revalidateTag(tag);
    } else {
      // Client-side: clear related caches
      for (const [key] of clientCache) {
        if (key.includes(tag)) {
          clientCache.delete(key);
        }
      }
    }
    
    console.log(`[Cache] Revalidated cache for tag: ${tag}`);
  } catch (error) {
    console.error(`[Cache] Error revalidating cache for tag: ${tag}`, error);
  }
};

/**
 * Preload data utility - useful for prefetching critical data
 */
export const preloadData = <T>(
  fetcher: () => Promise<T>,
  key: string,
  ttl: number = 300000
): void => {
  if (typeof window !== 'undefined') {
    // Don't preload if already cached
    if (clientCacheGet(key)) {
      return;
    }
    
    fetcher()
      .then(data => {
        clientCacheSet(key, data, ttl);
        console.log(`[Cache] Preloaded data for key: ${key}`);
      })
      .catch(error => {
        console.error(`[Cache] Failed to preload data for key: ${key}`, error);
      });
  }
};

/**
 * Cache warming utility - populates cache with commonly accessed data
 */
export const warmCache = async (
  warmers: Array<{ key: string; fetcher: () => Promise<any>; ttl?: number }>
): Promise<void> => {
  const promises = warmers.map(async ({ key, fetcher, ttl = 300000 }) => {
    try {
      const data = await fetcher();
      if (typeof window !== 'undefined') {
        clientCacheSet(key, data, ttl);
      }
      console.log(`[Cache] Warmed cache for key: ${key}`);
    } catch (error) {
      console.error(`[Cache] Failed to warm cache for key: ${key}`, error);
    }
  });
  
  await Promise.allSettled(promises);
  console.log(`[Cache] Completed cache warming for ${warmers.length} keys`);
};

/**
 * Get cache statistics
 */
export const getCacheStats = () => {
  if (typeof window === 'undefined') {
    return { size: 0, keys: [] };
  }
  
  const stats = {
    size: clientCache.size,
    keys: Array.from(clientCache.keys()),
    totalMemory: JSON.stringify(Array.from(clientCache.values())).length,
  };
  
  return stats;
};