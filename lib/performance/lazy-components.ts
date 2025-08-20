import { lazy, ComponentType, LazyExoticComponent } from 'react';
import dynamic from 'next/dynamic';

// Loading component for better UX
const LoadingFallback = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    <span className="ml-2 text-muted-foreground">Loading...</span>
  </div>
);

// Error component for lazy loading failures
const ErrorFallback = ({ error, retry }: { error?: Error; retry?: () => void }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <div className="text-destructive mb-2">⚠️ Failed to load component</div>
    {error && (
      <div className="text-sm text-muted-foreground mb-4 max-w-md">
        {error.message}
      </div>
    )}
    {retry && (
      <button 
        onClick={retry}
        className="btn-outline px-4 py-2 rounded"
      >
        Try Again
      </button>
    )}
  </div>
);

/**
 * Enhanced lazy loading wrapper with retry logic and better error handling
 */
export const createLazyComponent = <P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  fallback: ComponentType = LoadingFallback
): LazyExoticComponent<ComponentType<P>> => {
  return lazy(async () => {
    let retries = 3;
    let delay = 1000;

    while (retries > 0) {
      try {
        return await importFn();
      } catch (error) {
        retries--;
        console.error(`[Lazy Loading] Failed to load component, retries left: ${retries}`, error);
        
        if (retries === 0) {
          // Return error component as fallback
          return {
            default: () => <ErrorFallback error={error as Error} />
          };
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      }
    }
    
    throw new Error('Max retries exceeded');
  });
};

/**
 * Next.js dynamic import wrapper with SSR control
 */
export const createDynamicComponent = <P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options: {
    loading?: ComponentType;
    ssr?: boolean;
    suspense?: boolean;
  } = {}
) => {
  return dynamic(importFn, {
    loading: options.loading || LoadingFallback,
    ssr: options.ssr ?? true,
    suspense: options.suspense ?? false,
  });
};

// =============================================================================
// DASHBOARD COMPONENTS - Code split heavy dashboard components
// =============================================================================

// Analytics Components (heavy with charts)
export const LazyAnalyticsPage = createDynamicComponent(
  () => import('@/app/analytics/page'),
  { ssr: false } // Charts don't need SSR
);

export const LazyReportFilters = createDynamicComponent(
  () => import('@/components/analytics/report-filters'),
  { ssr: false }
);

export const LazyExportButton = createDynamicComponent(
  () => import('@/components/analytics/export-button'),
  { ssr: false }
);

// Dashboard Charts (heavy rendering)
export const LazySalesTrendChart = createDynamicComponent(
  () => import('@/components/dashboard/sales-trend-chart'),
  { ssr: false }
);

// =============================================================================
// INVENTORY COMPONENTS - Heavy table components
// =============================================================================

export const LazyInventoryTable = createDynamicComponent(
  () => import('@/components/inventory/inventory-table'),
  { ssr: true } // Keep SSR for SEO
);

export const LazyBarcodeScannerModal = createDynamicComponent(
  () => import('@/components/inventory/barcode-scanner-modal'),
  { ssr: false } // Modal doesn't need SSR
);

export const LazySupplierList = createDynamicComponent(
  () => import('@/components/inventory/supplier-list')
);

// =============================================================================
// KDS COMPONENTS - Real-time heavy components
// =============================================================================

export const LazyKdsPage = createDynamicComponent(
  () => import('@/app/kds/page'),
  { ssr: false } // Real-time data doesn't need SSR
);

export const LazyStationView = createDynamicComponent(
  () => import('@/components/kds/station-view'),
  { ssr: false }
);

export const LazyAllDayView = createDynamicComponent(
  () => import('@/components/kds/all-day-view'),
  { ssr: false }
);

// =============================================================================
// MENU MANAGEMENT - Heavy editor components
// =============================================================================

export const LazyMenuManagementClient = createDynamicComponent(
  () => import('@/components/menu/menu-management-client'),
  { ssr: false } // Heavy editor, no SSR needed
);

export const LazyMenuItemEditor = createDynamicComponent(
  () => import('@/components/menu/menu-item-editor'),
  { ssr: false }
);

export const LazyModifierGroupEditor = createDynamicComponent(
  () => import('@/components/menu/modifier-group-editor'),
  { ssr: false }
);

export const LazyPricingStrategyEditor = createDynamicComponent(
  () => import('@/components/menu/pricing-strategy-editor'),
  { ssr: false }
);

export const LazyChannelVisibilityEditor = createDynamicComponent(
  () => import('@/components/menu/channel-visibility-editor'),
  { ssr: false }
);

// =============================================================================
// RESERVATIONS - Interactive components
// =============================================================================

export const LazyReservationCalendar = createDynamicComponent(
  () => import('@/components/reservations/reservation-calendar'),
  { ssr: false } // Calendar is interactive
);

export const LazyFloorPlanEditor = createDynamicComponent(
  () => import('@/components/reservations/floor-plan-editor'),
  { ssr: false } // Heavy interactive editor
);

export const LazyFloorPlan = createDynamicComponent(
  () => import('@/components/reservations/floor-plan')
);

// =============================================================================
// SETTINGS - Forms and configuration
// =============================================================================

export const LazyPermissionsMatrix = createDynamicComponent(
  () => import('@/components/settings/permissions-matrix'),
  { ssr: false } // Complex interactive matrix
);

export const LazyUsersTable = createDynamicComponent(
  () => import('@/components/settings/users-table')
);

export const LazyDevicesTable = createDynamicComponent(
  () => import('@/components/settings/devices-table')
);

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Preload components based on route patterns
 * Call this in layout or page components to prefetch likely next components
 */
export const preloadComponentsForRoute = (pathname: string): void => {
  // Preload based on current route
  if (pathname.startsWith('/dashboard')) {
    // Preload chart components
    import('@/components/dashboard/sales-trend-chart').catch(() => {});
  } else if (pathname.startsWith('/analytics')) {
    // Preload analytics components
    import('@/components/analytics/report-filters').catch(() => {});
    import('@/components/analytics/export-button').catch(() => {});
  } else if (pathname.startsWith('/inventory')) {
    // Preload inventory components
    import('@/components/inventory/inventory-table').catch(() => {});
    import('@/components/inventory/barcode-scanner-modal').catch(() => {});
  } else if (pathname.startsWith('/kds')) {
    // Preload KDS components
    import('@/components/kds/station-view').catch(() => {});
    import('@/components/kds/all-day-view').catch(() => {});
  } else if (pathname.startsWith('/menu')) {
    // Preload menu components
    import('@/components/menu/menu-management-client').catch(() => {});
    import('@/components/menu/menu-item-editor').catch(() => {});
  } else if (pathname.startsWith('/reservations')) {
    // Preload reservation components
    import('@/components/reservations/reservation-calendar').catch(() => {});
    import('@/components/reservations/floor-plan-editor').catch(() => {});
  } else if (pathname.startsWith('/settings')) {
    // Preload settings components
    import('@/components/settings/permissions-matrix').catch(() => {});
    import('@/components/settings/users-table').catch(() => {});
  }
};

/**
 * Smart component loader that considers connection speed
 */
export const createAdaptiveLoader = <P extends object>(
  lightComponent: () => Promise<{ default: ComponentType<P> }>,
  heavyComponent: () => Promise<{ default: ComponentType<P> }>
) => {
  return createDynamicComponent(() => {
    // Check connection speed if available
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const effectiveType = connection?.effectiveType;
      
      // Use light component for slow connections
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        return lightComponent();
      }
    }
    
    // Check if user prefers reduced data usage
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection?.saveData) {
        return lightComponent();
      }
    }
    
    return heavyComponent();
  }, { ssr: false });
};

/**
 * Bundle splitting utility for component groups
 */
export const createComponentBundle = <T extends Record<string, ComponentType>>(
  components: () => Promise<T>
) => {
  return createDynamicComponent(
    async () => {
      const bundle = await components();
      // Return a component that can render any component from the bundle
      return {
        default: ({ component, ...props }: { component: keyof T } & any) => {
          const Component = bundle[component];
          return Component ? <Component {...props} /> : null;
        }
      };
    },
    { ssr: false }
  );
};

/**
 * Progressive loading for large datasets
 */
export const createProgressiveComponent = <P extends object>(
  baseComponent: ComponentType<P>,
  enhancedComponent: ComponentType<P>,
  condition: () => boolean = () => true
) => {
  return createDynamicComponent(async () => {
    // Load base component first
    const base = { default: baseComponent };
    
    // Conditionally load enhanced version
    if (condition()) {
      try {
        await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
        return { default: enhancedComponent };
      } catch {
        return base;
      }
    }
    
    return base;
  });
};

/**
 * Route-based code splitting configuration
 */
export const ROUTE_COMPONENTS = {
  '/dashboard': {
    main: LazyAnalyticsPage,
    sidebar: LazySalesTrendChart,
    preload: ['/analytics', '/inventory']
  },
  '/analytics': {
    main: LazyAnalyticsPage,
    filters: LazyReportFilters,
    export: LazyExportButton,
    preload: ['/dashboard']
  },
  '/inventory': {
    main: LazyInventoryTable,
    scanner: LazyBarcodeScannerModal,
    suppliers: LazySupplierList,
    preload: ['/menu']
  },
  '/kds': {
    main: LazyKdsPage,
    station: LazyStationView,
    allDay: LazyAllDayView,
    preload: []
  },
  '/menu': {
    main: LazyMenuManagementClient,
    editor: LazyMenuItemEditor,
    modifiers: LazyModifierGroupEditor,
    pricing: LazyPricingStrategyEditor,
    channels: LazyChannelVisibilityEditor,
    preload: ['/inventory']
  },
  '/reservations': {
    main: LazyReservationCalendar,
    floorPlan: LazyFloorPlan,
    editor: LazyFloorPlanEditor,
    preload: ['/dashboard']
  },
  '/settings': {
    permissions: LazyPermissionsMatrix,
    users: LazyUsersTable,
    devices: LazyDevicesTable,
    preload: []
  }
} as const;