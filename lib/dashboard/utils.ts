import { format, isToday, isYesterday, formatDistanceToNow } from 'date-fns';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function for combining classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency values
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

// Format percentage values
export function formatPercentage(
  value: number,
  decimals: number = 1
): string {
  return `${value.toFixed(decimals)}%`;
}

// Format large numbers with abbreviations
export function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

// Format time ago
export function formatTimeAgo(date: Date): string {
  if (isToday(date)) {
    return `Today at ${format(date, 'h:mm a')}`;
  } else if (isYesterday(date)) {
    return `Yesterday at ${format(date, 'h:mm a')}`;
  }
  return formatDistanceToNow(date, { addSuffix: true });
}

// Format date ranges
export function formatDateRange(from: Date, to: Date): string {
  const fromStr = format(from, 'MMM d');
  const toStr = format(to, 'MMM d, yyyy');
  
  if (from.getFullYear() === to.getFullYear() && from.getMonth() === to.getMonth()) {
    return `${format(from, 'MMM d')} - ${format(to, 'd, yyyy')}`;
  }
  
  return `${fromStr} - ${toStr}`;
}

// Calculate percentage change
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

// Determine change type
export function getChangeType(change: number): 'increase' | 'decrease' | 'neutral' {
  if (change > 2) return 'increase';
  if (change < -2) return 'decrease';
  return 'neutral';
}

// Get change color class
export function getChangeColor(changeType: 'increase' | 'decrease' | 'neutral'): string {
  switch (changeType) {
    case 'increase':
      return 'text-emerald-600';
    case 'decrease':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}

// Get change icon
export function getChangeIcon(changeType: 'increase' | 'decrease' | 'neutral'): string {
  switch (changeType) {
    case 'increase':
      return '↗';
    case 'decrease':
      return '↘';
    default:
      return '→';
  }
}

// Status badge variants
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    // Order statuses
    pending: 'bg-yellow-100 text-yellow-800',
    preparing: 'bg-blue-100 text-blue-800',
    ready: 'bg-green-100 text-green-800',
    served: 'bg-gray-100 text-gray-800',
    completed: 'bg-emerald-100 text-emerald-800',
    cancelled: 'bg-red-100 text-red-800',
    
    // Reservation statuses
    confirmed: 'bg-blue-100 text-blue-800',
    seated: 'bg-green-100 text-green-800',
    no_show: 'bg-red-100 text-red-800',
    
    // Performance statuses
    excellent: 'bg-green-100 text-green-800',
    good: 'bg-blue-100 text-blue-800',
    average: 'bg-yellow-100 text-yellow-800',
    poor: 'bg-red-100 text-red-800',
  };
  
  return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
}

// Priority levels for alerts and notifications
export function getPriorityColor(priority: 'low' | 'medium' | 'high' | 'urgent'): string {
  const priorityColors = {
    low: 'text-gray-600',
    medium: 'text-yellow-600',
    high: 'text-orange-600',
    urgent: 'text-red-600',
  };
  
  return priorityColors[priority];
}

// Chart color schemes
export const chartColors = {
  primary: '#3b82f6',
  secondary: '#10b981',
  tertiary: '#f59e0b',
  quaternary: '#ef4444',
  accent: '#8b5cf6',
};

export const chartColorPalette = [
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#84cc16', // Lime
  '#f97316', // Orange
];

// Generate random color from palette
export function getRandomColor(): string {
  return chartColorPalette[Math.floor(Math.random() * chartColorPalette.length)];
}

// Dashboard grid layouts
export const dashboardLayouts = {
  mobile: {
    gridCols: 'grid-cols-1',
    gap: 'gap-4',
  },
  tablet: {
    gridCols: 'md:grid-cols-2',
    gap: 'gap-6',
  },
  desktop: {
    gridCols: 'lg:grid-cols-3 xl:grid-cols-4',
    gap: 'gap-6',
  },
};

// Responsive breakpoints
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Animation durations
export const animations = {
  fast: 'duration-150',
  normal: 'duration-300',
  slow: 'duration-500',
};

// Common loading states
export function createLoadingArray<T>(length: number, factory: () => T): T[] {
  return Array.from({ length }, factory);
}

// Debounce function for search inputs
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Throttle function for scroll handlers
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Local storage helpers with error handling
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      if (typeof window === 'undefined') return defaultValue;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
    }
  },
  
  remove: (key: string): void => {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  },
};

// URL search params helpers
export const urlParams = {
  get: (key: string, defaultValue?: string): string | null => {
    if (typeof window === 'undefined') return defaultValue || null;
    const params = new URLSearchParams(window.location.search);
    return params.get(key) || defaultValue || null;
  },
  
  set: (params: Record<string, string | null>): void => {
    if (typeof window === 'undefined') return;
    const searchParams = new URLSearchParams(window.location.search);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    });
    
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
  },
};

// Performance monitoring helpers
export const performance = {
  mark: (name: string): void => {
    if (typeof window !== 'undefined' && window.performance?.mark) {
      window.performance.mark(name);
    }
  },
  
  measure: (name: string, startMark: string, endMark?: string): number | null => {
    if (typeof window !== 'undefined' && window.performance?.measure) {
      try {
        window.performance.measure(name, startMark, endMark);
        const entries = window.performance.getEntriesByName(name, 'measure');
        return entries.length > 0 ? entries[entries.length - 1].duration : null;
      } catch (error) {
        console.warn('Performance measurement failed:', error);
        return null;
      }
    }
    return null;
  },
};

// Error boundary helper
export function createErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
}

// Data validation helpers
export function isValidDate(date: any): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

export function isValidNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

export function isValidString(value: any): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}