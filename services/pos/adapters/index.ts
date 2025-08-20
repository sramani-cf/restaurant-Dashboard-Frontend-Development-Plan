// Export all POS adapters
export { ToastAdapter } from './toast-adapter';
export { SquareAdapter } from './square-adapter';
export { MockPOSAdapter } from './mock-adapter';

// Re-export types for convenience
export type {
  IPOSAdapter,
  POSConfig,
  POSProvider,
  POSResponse,
  ConnectionStatus
} from '../interfaces';