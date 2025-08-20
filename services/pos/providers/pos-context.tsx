'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  IPOSAdapter,
  POSConfig,
  POSProvider,
  ConnectionStatus,
  POSResponse,
  POSError
} from '../interfaces';
import { createPOSAdapter } from './pos-adapter-factory';

/**
 * POS Context Interface
 * 
 * Provides POS adapter and connection state to React components
 */
interface POSContextType {
  // Adapter instance
  adapter: IPOSAdapter | null;
  
  // Connection state
  isConnected: boolean;
  connectionStatus: ConnectionStatus | null;
  isConnecting: boolean;
  connectionError: POSError | null;
  
  // Configuration
  config: POSConfig | null;
  provider: POSProvider | null;
  
  // Actions
  connect: (config: POSConfig) => Promise<void>;
  disconnect: () => Promise<void>;
  reconnect: () => Promise<void>;
  testConnection: () => Promise<boolean>;
  
  // Utility
  isReady: boolean;
  lastSyncTime: Date | null;
}

/**
 * Default context value
 */
const defaultContext: POSContextType = {
  adapter: null,
  isConnected: false,
  connectionStatus: null,
  isConnecting: false,
  connectionError: null,
  config: null,
  provider: null,
  connect: async () => {
    throw new Error('POSProvider not initialized');
  },
  disconnect: async () => {
    throw new Error('POSProvider not initialized');
  },
  reconnect: async () => {
    throw new Error('POSProvider not initialized');
  },
  testConnection: async () => {
    throw new Error('POSProvider not initialized');
  },
  isReady: false,
  lastSyncTime: null
};

/**
 * POS Context
 */
const POSContext = createContext<POSContextType>(defaultContext);

/**
 * POS Provider Props
 */
interface POSProviderProps {
  children: ReactNode;
  autoConnect?: boolean;
  defaultConfig?: POSConfig;
  onConnectionChange?: (isConnected: boolean) => void;
  onError?: (error: POSError) => void;
  reconnectInterval?: number; // in milliseconds
  enableAutoReconnect?: boolean;
}

/**
 * POS Provider Component
 * 
 * Provides POS adapter functionality to the React component tree.
 * Handles connection management, error handling, and state synchronization.
 * 
 * Usage:
 * ```tsx
 * <POSProvider defaultConfig={config} autoConnect>
 *   <App />
 * </POSProvider>
 * ```
 */
export function POSProvider({
  children,
  autoConnect = false,
  defaultConfig,
  onConnectionChange,
  onError,
  reconnectInterval = 30000, // 30 seconds
  enableAutoReconnect = true
}: POSProviderProps) {
  // State
  const [adapter, setAdapter] = useState<IPOSAdapter | null>(null);
  const [config, setConfig] = useState<POSConfig | null>(defaultConfig || null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<POSError | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Derived state
  const provider = config?.provider || null;
  const isReady = adapter !== null && isConnected;

  // Auto-reconnect timer
  useEffect(() => {
    if (!enableAutoReconnect || isConnected || !adapter) {
      return;
    }

    const timer = setInterval(async () => {
      if (!isConnected && adapter) {
        console.log('Attempting auto-reconnect to POS...');
        try {
          await connectInternal(adapter);
        } catch (error) {
          console.error('Auto-reconnect failed:', error);
        }
      }
    }, reconnectInterval);

    return () => clearInterval(timer);
  }, [isConnected, adapter, enableAutoReconnect, reconnectInterval]);

  // Auto-connect on mount
  useEffect(() => {
    if (autoConnect && defaultConfig && !adapter) {
      connect(defaultConfig).catch(error => {
        console.error('Auto-connect failed:', error);
      });
    }
  }, [autoConnect, defaultConfig]);

  // Connection status polling
  useEffect(() => {
    if (!adapter) return;

    const pollStatus = () => {
      const status = adapter.getConnectionStatus();
      setConnectionStatus(status);
      
      if (status.isConnected !== isConnected) {
        setIsConnected(status.isConnected);
        onConnectionChange?.(status.isConnected);
      }
    };

    // Poll every 10 seconds
    const timer = setInterval(pollStatus, 10000);
    pollStatus(); // Initial check

    return () => clearInterval(timer);
  }, [adapter, isConnected, onConnectionChange]);

  /**
   * Internal connection logic
   */
  const connectInternal = async (adapterInstance: IPOSAdapter): Promise<void> => {
    const response = await adapterInstance.connect();
    
    if (!response.success) {
      const error = response.error || {
        code: 'CONNECTION_FAILED',
        message: 'Failed to connect to POS system',
        timestamp: new Date()
      };
      setConnectionError(error);
      onError?.(error);
      throw new Error(error.message);
    }

    setConnectionError(null);
    setIsConnected(true);
    setConnectionStatus(adapterInstance.getConnectionStatus());
    setLastSyncTime(new Date());
  };

  /**
   * Connect to POS system
   */
  const connect = async (newConfig: POSConfig): Promise<void> => {
    setIsConnecting(true);
    setConnectionError(null);

    try {
      // Create new adapter if config changed
      if (!adapter || config?.provider !== newConfig.provider) {
        const newAdapter = createPOSAdapter(newConfig);
        setAdapter(newAdapter);
        setConfig(newConfig);
        
        await connectInternal(newAdapter);
      } else {
        // Use existing adapter
        await connectInternal(adapter);
      }
    } catch (error) {
      console.error('POS connection failed:', error);
      setIsConnected(false);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  /**
   * Disconnect from POS system
   */
  const disconnect = async (): Promise<void> => {
    if (!adapter) return;

    try {
      await adapter.disconnect();
      setIsConnected(false);
      setConnectionStatus(null);
      setConnectionError(null);
      onConnectionChange?.(false);
    } catch (error) {
      console.error('POS disconnection failed:', error);
      // Force disconnection even if API call fails
      setIsConnected(false);
      setConnectionStatus(null);
    }
  };

  /**
   * Reconnect to POS system
   */
  const reconnect = async (): Promise<void> => {
    if (!config) {
      throw new Error('No configuration available for reconnection');
    }

    await disconnect();
    await connect(config);
  };

  /**
   * Test POS connection
   */
  const testConnection = async (): Promise<boolean> => {
    if (!adapter) {
      throw new Error('No adapter available for connection test');
    }

    const response = await adapter.testConnection();
    return response.success && (response.data === true);
  };

  // Context value
  const contextValue: POSContextType = {
    adapter,
    isConnected,
    connectionStatus,
    isConnecting,
    connectionError,
    config,
    provider,
    connect,
    disconnect,
    reconnect,
    testConnection,
    isReady,
    lastSyncTime
  };

  return (
    <POSContext.Provider value={contextValue}>
      {children}
    </POSContext.Provider>
  );
}

/**
 * Hook to use POS context
 * 
 * @returns POS context value
 * @throws Error if used outside POSProvider
 */
export function usePOS(): POSContextType {
  const context = useContext(POSContext);
  
  if (!context) {
    throw new Error('usePOS must be used within a POSProvider');
  }
  
  return context;
}

/**
 * Hook for POS adapter with connection check
 * 
 * @returns POS adapter if connected, null otherwise
 */
export function usePOSAdapter(): IPOSAdapter | null {
  const { adapter, isConnected } = usePOS();
  return isConnected ? adapter : null;
}

/**
 * Hook for POS connection status
 * 
 * @returns Connection status information
 */
export function usePOSConnection() {
  const { 
    isConnected, 
    isConnecting, 
    connectionError, 
    connectionStatus,
    connect,
    disconnect,
    reconnect,
    testConnection 
  } = usePOS();

  return {
    isConnected,
    isConnecting,
    connectionError,
    connectionStatus,
    connect,
    disconnect,
    reconnect,
    testConnection
  };
}

/**
 * Hook for POS operations with error handling
 * 
 * @returns Object with safe POS operation methods
 */
export function usePOSOperations() {
  const { adapter, isReady } = usePOS();

  const safeCall = async <T>(
    operation: () => Promise<POSResponse<T>>,
    operationName: string
  ): Promise<T> => {
    if (!isReady || !adapter) {
      throw new Error(`POS not ready for ${operationName}`);
    }

    const response = await operation();
    
    if (!response.success) {
      const error = response.error || {
        code: 'OPERATION_FAILED',
        message: `${operationName} failed`,
        timestamp: new Date()
      };
      throw new Error(`${operationName}: ${error.message}`);
    }

    return response.data!;
  };

  return {
    // Sales and analytics
    getSalesData: async (startDate: Date, endDate: Date, period?: 'day' | 'week' | 'month') =>
      safeCall(() => adapter!.getSalesData(startDate, endDate, period), 'getSalesData'),
    
    getTransactions: async (startDate?: Date, endDate?: Date, limit?: number, offset?: number) =>
      safeCall(() => adapter!.getTransactions(startDate, endDate, limit, offset), 'getTransactions'),

    // Menu management
    getMenuItems: async () =>
      safeCall(() => adapter!.getMenuItems(), 'getMenuItems'),
    
    getMenuItem: async (id: string) =>
      safeCall(() => adapter!.getMenuItem(id), 'getMenuItem'),
    
    updateMenuItemAvailability: async (id: string, isAvailable: boolean) =>
      safeCall(() => adapter!.updateMenuItemAvailability(id, isAvailable), 'updateMenuItemAvailability'),

    // Inventory management
    getInventoryItems: async () =>
      safeCall(() => adapter!.getInventoryItems(), 'getInventoryItems'),
    
    getInventoryAlerts: async () =>
      safeCall(() => adapter!.getInventoryAlerts(), 'getInventoryAlerts'),
    
    updateInventoryLevel: async (id: string, quantity: number) =>
      safeCall(() => adapter!.updateInventoryLevel(id, quantity), 'updateInventoryLevel'),

    // Order management
    getOrders: async (status?: any, startDate?: Date, endDate?: Date, limit?: number) =>
      safeCall(() => adapter!.getOrders(status, startDate, endDate, limit), 'getOrders'),
    
    getOrder: async (id: string) =>
      safeCall(() => adapter!.getOrder(id), 'getOrder'),
    
    updateOrderStatus: async (id: string, status: any) =>
      safeCall(() => adapter!.updateOrderStatus(id, status), 'updateOrderStatus'),

    // Employee management
    getEmployees: async () =>
      safeCall(() => adapter!.getEmployees(), 'getEmployees'),
    
    getEmployeeShifts: async (employeeId?: string, startDate?: Date, endDate?: Date) =>
      safeCall(() => adapter!.getEmployeeShifts(employeeId, startDate, endDate), 'getEmployeeShifts'),

    // Sync
    syncData: async () =>
      safeCall(() => adapter!.syncData(), 'syncData'),

    // Direct adapter access for advanced operations
    adapter: isReady ? adapter : null
  };
}

/**
 * Higher-order component for POS-dependent components
 * 
 * @param WrappedComponent - Component to wrap
 * @returns Component that only renders when POS is ready
 */
export function withPOS<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function POSConnectedComponent(props: P) {
    const { isReady, isConnecting, connectionError } = usePOS();

    if (isConnecting) {
      return <div>Connecting to POS system...</div>;
    }

    if (connectionError) {
      return (
        <div>
          <p>POS Connection Error: {connectionError.message}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      );
    }

    if (!isReady) {
      return <div>POS system not available</div>;
    }

    return <WrappedComponent {...props} />;
  };
}

export default POSContext;