import {
  IPOSAdapter,
  IPOSAdapterFactory,
  POSConfig,
  POSProvider,
  POSResponse,
  POSError
} from '../interfaces';
import { ToastAdapter } from '../adapters/toast-adapter';
import { SquareAdapter } from '../adapters/square-adapter';
import { MockPOSAdapter } from '../adapters/mock-adapter';

/**
 * POS Adapter Factory
 * 
 * This factory implements the Factory Pattern to create appropriate POS adapters
 * based on the provided configuration. It supports easy extension for new POS systems
 * while maintaining type safety and proper error handling.
 * 
 * Usage:
 * ```typescript
 * const factory = new POSAdapterFactory();
 * const adapter = factory.createAdapter({
 *   provider: POSProvider.SQUARE,
 *   apiKey: 'your-api-key',
 *   environment: 'sandbox'
 * });
 * ```
 */
export class POSAdapterFactory implements IPOSAdapterFactory {
  private static instance: POSAdapterFactory;
  private adapters: Map<POSProvider, typeof IPOSAdapter>;

  constructor() {
    this.adapters = new Map();
    this.registerDefaultAdapters();
  }

  /**
   * Get singleton instance of the factory
   */
  static getInstance(): POSAdapterFactory {
    if (!POSAdapterFactory.instance) {
      POSAdapterFactory.instance = new POSAdapterFactory();
    }
    return POSAdapterFactory.instance;
  }

  /**
   * Create a POS adapter based on the provided configuration
   * 
   * @param config - POS configuration containing provider and credentials
   * @returns Configured POS adapter instance
   * @throws Error if provider is not supported or configuration is invalid
   */
  createAdapter(config: POSConfig): IPOSAdapter {
    // Validate configuration first
    const validationResult = this.validateConfig(config);
    if (!validationResult.success) {
      throw new Error(`Invalid POS configuration: ${validationResult.error?.message}`);
    }

    // Create adapter based on provider
    switch (config.provider) {
      case POSProvider.TOAST:
        return new ToastAdapter(config);
      
      case POSProvider.SQUARE:
        return new SquareAdapter(config);
      
      case POSProvider.MOCK:
        return new MockPOSAdapter(config);
      
      default:
        throw new Error(`Unsupported POS provider: ${config.provider}`);
    }
  }

  /**
   * Get list of supported POS providers
   * 
   * @returns Array of supported POS providers
   */
  getSupportedProviders(): POSProvider[] {
    return [
      POSProvider.TOAST,
      POSProvider.SQUARE,
      POSProvider.MOCK
    ];
  }

  /**
   * Validate POS configuration
   * 
   * @param config - Configuration to validate
   * @returns Validation result with success flag and error details
   */
  validateConfig(config: POSConfig): POSResponse<boolean> {
    const errors: string[] = [];

    // Check required fields
    if (!config.provider) {
      errors.push('Provider is required');
    }

    if (!config.environment) {
      errors.push('Environment is required');
    }

    // Validate environment
    if (config.environment && !['sandbox', 'production'].includes(config.environment)) {
      errors.push('Environment must be either "sandbox" or "production"');
    }

    // Validate provider-specific requirements
    if (config.provider && config.provider !== POSProvider.MOCK) {
      if (!config.apiKey) {
        errors.push('API key is required for non-mock providers');
      }

      // Provider-specific validations
      switch (config.provider) {
        case POSProvider.TOAST:
          if (!config.apiSecret) {
            errors.push('API secret (Restaurant External ID) is required for Toast');
          }
          break;
        
        case POSProvider.SQUARE:
          // Square typically only needs API key
          if (config.apiKey && !config.apiKey.startsWith('EAA')) {
            errors.push('Square API key should start with "EAA" for production or sandbox');
          }
          break;
      }
    }

    // Validate timeout if provided
    if (config.timeout !== undefined && (config.timeout < 1000 || config.timeout > 300000)) {
      errors.push('Timeout must be between 1000ms and 300000ms (5 minutes)');
    }

    // Validate retry attempts if provided
    if (config.retryAttempts !== undefined && (config.retryAttempts < 0 || config.retryAttempts > 10)) {
      errors.push('Retry attempts must be between 0 and 10');
    }

    // Validate webhook URL if provided
    if (config.webhookUrl && !this.isValidUrl(config.webhookUrl)) {
      errors.push('Webhook URL must be a valid HTTPS URL');
    }

    if (errors.length > 0) {
      return {
        success: false,
        error: {
          code: 'INVALID_CONFIG',
          message: errors.join(', '),
          details: { errors },
          timestamp: new Date()
        }
      };
    }

    return {
      success: true,
      data: true
    };
  }

  /**
   * Register a custom adapter for a specific provider
   * 
   * @param provider - POS provider
   * @param adapterClass - Adapter class that implements IPOSAdapter
   */
  registerAdapter(provider: POSProvider, adapterClass: typeof IPOSAdapter): void {
    this.adapters.set(provider, adapterClass);
  }

  /**
   * Check if a provider is supported
   * 
   * @param provider - POS provider to check
   * @returns True if provider is supported
   */
  isProviderSupported(provider: POSProvider): boolean {
    return this.getSupportedProviders().includes(provider);
  }

  /**
   * Get provider-specific configuration requirements
   * 
   * @param provider - POS provider
   * @returns Configuration requirements for the provider
   */
  getProviderRequirements(provider: POSProvider): {
    required: string[];
    optional: string[];
    description: string;
  } {
    switch (provider) {
      case POSProvider.TOAST:
        return {
          required: ['apiKey', 'apiSecret', 'environment'],
          optional: ['baseUrl', 'timeout', 'retryAttempts', 'webhookUrl'],
          description: 'Toast POS requires API key (access token) and API secret (restaurant external ID)'
        };
      
      case POSProvider.SQUARE:
        return {
          required: ['apiKey', 'environment'],
          optional: ['baseUrl', 'timeout', 'retryAttempts', 'webhookUrl'],
          description: 'Square POS requires API key (access token) from Square Developer Dashboard'
        };
      
      case POSProvider.MOCK:
        return {
          required: ['environment'],
          optional: ['timeout', 'retryAttempts'],
          description: 'Mock POS for development and testing - no credentials required'
        };
      
      default:
        return {
          required: [],
          optional: [],
          description: 'Unknown provider'
        };
    }
  }

  /**
   * Create a test configuration for a provider (useful for development)
   * 
   * @param provider - POS provider
   * @param environment - Environment (sandbox/production)
   * @returns Test configuration
   */
  createTestConfig(provider: POSProvider, environment: 'sandbox' | 'production' = 'sandbox'): POSConfig {
    const baseConfig: POSConfig = {
      provider,
      environment,
      timeout: 30000,
      retryAttempts: 3
    };

    switch (provider) {
      case POSProvider.TOAST:
        return {
          ...baseConfig,
          apiKey: 'test-toast-api-key',
          apiSecret: 'test-restaurant-id'
        };
      
      case POSProvider.SQUARE:
        return {
          ...baseConfig,
          apiKey: environment === 'sandbox' 
            ? 'EAAAEOv6Zi2l7e8j0LSnMR1MyTest' 
            : 'EAAAEO_your_production_key_here'
        };
      
      case POSProvider.MOCK:
        return baseConfig;
      
      default:
        return baseConfig;
    }
  }

  /**
   * Validate and normalize configuration
   * 
   * @param config - Raw configuration
   * @returns Normalized configuration with defaults applied
   */
  normalizeConfig(config: Partial<POSConfig>): POSConfig {
    if (!config.provider) {
      throw new Error('Provider is required');
    }

    const normalized: POSConfig = {
      provider: config.provider,
      environment: config.environment || 'sandbox',
      timeout: config.timeout || 30000,
      retryAttempts: config.retryAttempts || 3,
      ...config
    };

    // Set default base URLs if not provided
    if (!normalized.baseUrl) {
      switch (normalized.provider) {
        case POSProvider.TOAST:
          normalized.baseUrl = normalized.environment === 'production'
            ? 'https://ws-api.toasttab.com'
            : 'https://ws-sandbox-api.toasttab.com';
          break;
        
        case POSProvider.SQUARE:
          normalized.baseUrl = normalized.environment === 'production'
            ? 'https://connect.squareup.com'
            : 'https://connect.squareupsandbox.com';
          break;
        
        case POSProvider.MOCK:
          normalized.baseUrl = 'http://localhost:3000/mock-pos';
          break;
      }
    }

    return normalized;
  }

  /**
   * Register default adapters
   * 
   * @private
   */
  private registerDefaultAdapters(): void {
    // Default adapters are imported and used directly in createAdapter method
    // This method is reserved for future dynamic adapter registration
  }

  /**
   * Validate URL format
   * 
   * @private
   * @param url - URL to validate
   * @returns True if URL is valid
   */
  private isValidUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'https:' || urlObj.protocol === 'http:';
    } catch {
      return false;
    }
  }
}

/**
 * Convenience function to create a POS adapter
 * 
 * @param config - POS configuration
 * @returns Configured POS adapter
 */
export function createPOSAdapter(config: POSConfig): IPOSAdapter {
  const factory = POSAdapterFactory.getInstance();
  return factory.createAdapter(config);
}

/**
 * Convenience function to get supported providers
 * 
 * @returns Array of supported providers
 */
export function getSupportedPOSProviders(): POSProvider[] {
  const factory = POSAdapterFactory.getInstance();
  return factory.getSupportedProviders();
}

/**
 * Convenience function to validate configuration
 * 
 * @param config - Configuration to validate
 * @returns Validation result
 */
export function validatePOSConfig(config: POSConfig): POSResponse<boolean> {
  const factory = POSAdapterFactory.getInstance();
  return factory.validateConfig(config);
}

/**
 * Type-safe configuration builder
 */
export class POSConfigBuilder {
  private config: Partial<POSConfig> = {};

  /**
   * Set the POS provider
   */
  provider(provider: POSProvider): POSConfigBuilder {
    this.config.provider = provider;
    return this;
  }

  /**
   * Set the environment
   */
  environment(env: 'sandbox' | 'production'): POSConfigBuilder {
    this.config.environment = env;
    return this;
  }

  /**
   * Set API credentials
   */
  credentials(apiKey: string, apiSecret?: string): POSConfigBuilder {
    this.config.apiKey = apiKey;
    if (apiSecret) {
      this.config.apiSecret = apiSecret;
    }
    return this;
  }

  /**
   * Set connection options
   */
  connectionOptions(options: {
    timeout?: number;
    retryAttempts?: number;
    baseUrl?: string;
  }): POSConfigBuilder {
    Object.assign(this.config, options);
    return this;
  }

  /**
   * Set webhook URL
   */
  webhookUrl(url: string): POSConfigBuilder {
    this.config.webhookUrl = url;
    return this;
  }

  /**
   * Build the configuration
   */
  build(): POSConfig {
    const factory = POSAdapterFactory.getInstance();
    return factory.normalizeConfig(this.config);
  }

  /**
   * Build and create adapter
   */
  createAdapter(): IPOSAdapter {
    return createPOSAdapter(this.build());
  }
}

/**
 * Convenience function to start building a configuration
 */
export function buildPOSConfig(): POSConfigBuilder {
  return new POSConfigBuilder();
}