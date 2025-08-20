// Export POS service and adapters
export * from './interfaces';
export * from './adapters';
export * from './providers';

// Convenience re-exports for common use cases
export { createPOSAdapter, POSConfigBuilder } from './providers';
export { ToastAdapter, SquareAdapter, MockPOSAdapter } from './adapters';
export type { 
  IPOSAdapter, 
  POSConfig, 
  POSProvider, 
  POSResponse,
  MenuItem,
  Order,
  Transaction,
  Employee,
  InventoryItem,
  SalesData 
} from './interfaces';