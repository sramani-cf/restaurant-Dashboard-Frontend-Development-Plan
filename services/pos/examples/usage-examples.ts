/**
 * POS Integration Usage Examples
 * 
 * This file demonstrates how to use the POS integration layer
 * with different providers and scenarios.
 */

import {
  createPOSAdapter,
  POSConfigBuilder,
  buildPOSConfig,
  POSProvider,
  type IPOSAdapter,
  type POSConfig,
  type MenuItem,
  type Order,
  type SalesData,
  PaymentMethod,
  OrderStatus
} from '../index';

// =============================================================================
// 1. BASIC ADAPTER CREATION
// =============================================================================

/**
 * Example 1: Create a Toast POS adapter
 */
export async function createToastAdapter(): Promise<IPOSAdapter> {
  const config: POSConfig = {
    provider: POSProvider.TOAST,
    apiKey: 'your-toast-access-token',
    apiSecret: 'your-restaurant-external-id',
    environment: 'sandbox',
    timeout: 30000
  };

  const adapter = createPOSAdapter(config);
  
  // Connect to POS
  const connectionResult = await adapter.connect();
  if (!connectionResult.success) {
    throw new Error(`Failed to connect: ${connectionResult.error?.message}`);
  }

  return adapter;
}

/**
 * Example 2: Create a Square POS adapter
 */
export async function createSquareAdapter(): Promise<IPOSAdapter> {
  const config: POSConfig = {
    provider: POSProvider.SQUARE,
    apiKey: 'EAAAEOv6Zi2l7e8j0LSnMR1MyTest', // Sandbox key
    environment: 'sandbox',
    baseUrl: 'https://connect.squareupsandbox.com',
    timeout: 30000,
    retryAttempts: 3
  };

  const adapter = createPOSAdapter(config);
  await adapter.connect();
  
  return adapter;
}

/**
 * Example 3: Create a Mock adapter for development
 */
export async function createMockAdapter(): Promise<IPOSAdapter> {
  const adapter = createPOSAdapter({
    provider: POSProvider.MOCK,
    environment: 'sandbox'
  });

  await adapter.connect();
  return adapter;
}

// =============================================================================
// 2. USING THE CONFIG BUILDER
// =============================================================================

/**
 * Example 4: Using the configuration builder pattern
 */
export function createAdapterWithBuilder(): IPOSAdapter {
  // Method 1: Build config and create adapter separately
  const config = buildPOSConfig()
    .provider(POSProvider.SQUARE)
    .environment('sandbox')
    .credentials('your-api-key')
    .connectionOptions({
      timeout: 45000,
      retryAttempts: 5
    })
    .webhookUrl('https://your-app.com/webhooks/pos')
    .build();

  const adapter = createPOSAdapter(config);

  // Method 2: Build and create in one step
  const adapterDirect = buildPOSConfig()
    .provider(POSProvider.TOAST)
    .environment('production')
    .credentials('api-key', 'restaurant-id')
    .createAdapter();

  return adapter;
}

// =============================================================================
// 3. MENU MANAGEMENT
// =============================================================================

/**
 * Example 5: Menu item operations
 */
export async function menuManagementExample(adapter: IPOSAdapter) {
  try {
    // Get all menu items
    const menuResponse = await adapter.getMenuItems();
    if (!menuResponse.success) {
      throw new Error('Failed to fetch menu items');
    }
    
    const menuItems = menuResponse.data!;
    console.log(`Found ${menuItems.length} menu items`);

    // Find a specific item
    const pizzaItem = menuItems.find(item => 
      item.name.toLowerCase().includes('pizza')
    );

    if (pizzaItem) {
      // Update availability
      const updateResponse = await adapter.updateMenuItemAvailability(
        pizzaItem.id, 
        false
      );
      
      if (updateResponse.success) {
        console.log(`${pizzaItem.name} marked as unavailable`);
      }
    }

    // Create a new menu item
    const newItem: Omit<MenuItem, 'id'> = {
      name: 'Special Burger',
      description: 'Our chef\'s special burger with secret sauce',
      price: 15.99,
      category: 'Entrees',
      isAvailable: true,
      allergens: ['Gluten', 'Dairy'],
      preparationTime: 12,
      modifiers: []
    };

    const createResponse = await adapter.createMenuItem(newItem);
    if (createResponse.success) {
      console.log('New menu item created:', createResponse.data!.id);
    }

  } catch (error) {
    console.error('Menu management error:', error);
  }
}

// =============================================================================
// 4. SALES AND ANALYTICS
// =============================================================================

/**
 * Example 6: Sales data and analytics
 */
export async function salesAnalyticsExample(adapter: IPOSAdapter) {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // Last 7 days
    const endDate = new Date();

    // Get sales data
    const salesResponse = await adapter.getSalesData(startDate, endDate, 'day');
    
    if (salesResponse.success) {
      const salesData: SalesData = salesResponse.data!;
      
      console.log('Sales Analytics:');
      console.log(`Total Revenue: $${salesData.totalRevenue.toFixed(2)}`);
      console.log(`Total Transactions: ${salesData.totalTransactions}`);
      console.log(`Average Order Value: $${salesData.averageOrderValue.toFixed(2)}`);
      
      console.log('\nTop Selling Items:');
      salesData.topSellingItems.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name}: ${item.quantitySold} sold, $${item.revenue.toFixed(2)} revenue`);
      });

      console.log('\nPayment Method Breakdown:');
      salesData.paymentMethodBreakdown.forEach(method => {
        console.log(`${method.method}: ${method.count} transactions, $${method.total.toFixed(2)}`);
      });
    }

    // Get recent transactions
    const transactionsResponse = await adapter.getTransactions(
      startDate,
      endDate,
      50 // limit
    );

    if (transactionsResponse.success) {
      const transactions = transactionsResponse.data!;
      console.log(`\nFound ${transactions.length} transactions`);
      
      // Calculate some metrics
      const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
      const avgTransaction = totalAmount / transactions.length;
      
      console.log(`Average transaction: $${avgTransaction.toFixed(2)}`);
    }

  } catch (error) {
    console.error('Sales analytics error:', error);
  }
}

// =============================================================================
// 5. ORDER MANAGEMENT
// =============================================================================

/**
 * Example 7: Order operations
 */
export async function orderManagementExample(adapter: IPOSAdapter) {
  try {
    // Get pending orders
    const pendingOrdersResponse = await adapter.getOrders(
      OrderStatus.PENDING,
      undefined, // no start date
      undefined, // no end date
      20 // limit
    );

    if (pendingOrdersResponse.success) {
      const pendingOrders = pendingOrdersResponse.data!;
      console.log(`Found ${pendingOrders.length} pending orders`);

      // Process each pending order
      for (const order of pendingOrders) {
        console.log(`Order ${order.orderNumber}: $${order.total.toFixed(2)}`);
        
        // Update order status to confirmed
        const updateResponse = await adapter.updateOrderStatus(
          order.id,
          OrderStatus.CONFIRMED
        );

        if (updateResponse.success) {
          console.log(`Order ${order.orderNumber} confirmed`);
        }
      }
    }

    // Get orders from today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayOrdersResponse = await adapter.getOrders(
      undefined, // all statuses
      today,
      new Date(),
      100
    );

    if (todayOrdersResponse.success) {
      const todayOrders = todayOrdersResponse.data!;
      console.log(`Today's orders: ${todayOrders.length}`);
      
      // Group by status
      const statusCounts = todayOrders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      console.log('Order status breakdown:', statusCounts);
    }

  } catch (error) {
    console.error('Order management error:', error);
  }
}

// =============================================================================
// 6. PAYMENT PROCESSING
// =============================================================================

/**
 * Example 8: Process payments
 */
export async function paymentProcessingExample(adapter: IPOSAdapter, orderId: string) {
  try {
    // Get the order details
    const orderResponse = await adapter.getOrder(orderId);
    if (!orderResponse.success) {
      throw new Error('Order not found');
    }

    const order = orderResponse.data!;
    console.log(`Processing payment for order ${order.orderNumber}: $${order.total}`);

    // Process payment
    const paymentResponse = await adapter.processPayment(
      orderId,
      order.total,
      PaymentMethod.CREDIT_CARD,
      {
        email: 'customer@example.com',
        name: order.customerName || 'Guest'
      }
    );

    if (paymentResponse.success) {
      const result = paymentResponse.data!;
      
      if (result.success) {
        console.log('Payment successful:');
        console.log(`Transaction ID: ${result.transactionId}`);
        console.log(`Auth Code: ${result.authCode}`);
        
        // Update order status to delivered
        await adapter.updateOrderStatus(orderId, OrderStatus.DELIVERED);
      } else {
        console.log('Payment failed:', result.error);
      }
    }

  } catch (error) {
    console.error('Payment processing error:', error);
  }
}

// =============================================================================
// 7. INVENTORY MANAGEMENT
// =============================================================================

/**
 * Example 9: Inventory operations
 */
export async function inventoryManagementExample(adapter: IPOSAdapter) {
  try {
    // Get all inventory items
    const inventoryResponse = await adapter.getInventoryItems();
    if (!inventoryResponse.success) {
      throw new Error('Failed to fetch inventory');
    }

    const inventory = inventoryResponse.data!;
    console.log(`Found ${inventory.length} inventory items`);

    // Check for low stock alerts
    const alertsResponse = await adapter.getInventoryAlerts();
    if (alertsResponse.success) {
      const alerts = alertsResponse.data!;
      
      if (alerts.length > 0) {
        console.log(`\n⚠️  Low stock alerts for ${alerts.length} items:`);
        alerts.forEach(item => {
          console.log(`- ${item.name}: ${item.currentStock} remaining (min: ${item.minimumStock})`);
        });
      } else {
        console.log('✅ All items are adequately stocked');
      }
    }

    // Update inventory levels (if supported)
    const lowStockItem = inventory.find(item => item.currentStock < item.minimumStock);
    if (lowStockItem) {
      console.log(`\nRestocking ${lowStockItem.name}...`);
      
      const updateResponse = await adapter.updateInventoryLevel(
        lowStockItem.id,
        lowStockItem.minimumStock + 50 // Restock to min + 50
      );

      if (updateResponse.success) {
        console.log('✅ Inventory updated successfully');
      } else {
        console.log('❌ Inventory update not supported by this POS system');
      }
    }

  } catch (error) {
    console.error('Inventory management error:', error);
  }
}

// =============================================================================
// 8. EMPLOYEE AND SHIFT MANAGEMENT
// =============================================================================

/**
 * Example 10: Employee and shift operations
 */
export async function employeeManagementExample(adapter: IPOSAdapter) {
  try {
    // Get all employees
    const employeesResponse = await adapter.getEmployees();
    if (!employeesResponse.success) {
      throw new Error('Failed to fetch employees');
    }

    const employees = employeesResponse.data!;
    console.log(`Found ${employees.length} employees`);

    // Find active employees
    const activeEmployees = employees.filter(emp => emp.isActive);
    console.log(`Active employees: ${activeEmployees.length}`);

    // Get current shifts
    const today = new Date();
    const shiftsResponse = await adapter.getEmployeeShifts(
      undefined, // all employees
      today,
      today
    );

    if (shiftsResponse.success) {
      const todayShifts = shiftsResponse.data!;
      const activeShifts = todayShifts.filter(shift => shift.status === 'active');
      
      console.log(`\nToday's shifts: ${todayShifts.length}`);
      console.log(`Currently active: ${activeShifts.length}`);

      if (activeShifts.length > 0) {
        console.log('\nActive shifts:');
        activeShifts.forEach(shift => {
          const employee = employees.find(emp => emp.id === shift.employeeId);
          const duration = ((new Date().getTime() - shift.startTime.getTime()) / (1000 * 60 * 60)).toFixed(1);
          console.log(`- ${employee?.name || 'Unknown'}: ${duration} hours`);
        });
      }
    }

    // Start a shift for the first employee (example)
    if (activeEmployees.length > 0) {
      const employee = activeEmployees[0];
      console.log(`\nStarting shift for ${employee.name}...`);
      
      const startShiftResponse = await adapter.startShift(employee.id);
      if (startShiftResponse.success) {
        const shift = startShiftResponse.data!;
        console.log(`✅ Shift started: ${shift.id}`);
      }
    }

  } catch (error) {
    console.error('Employee management error:', error);
  }
}

// =============================================================================
// 9. ERROR HANDLING AND RETRY LOGIC
// =============================================================================

/**
 * Example 11: Robust error handling
 */
export async function robustPOSOperations(adapter: IPOSAdapter) {
  const maxRetries = 3;
  const retryDelay = 1000; // 1 second

  const retryOperation = async <T>(
    operation: () => Promise<T>,
    operationName: string
  ): Promise<T> => {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`${operationName} - Attempt ${attempt}/${maxRetries}`);
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        console.warn(`${operationName} failed on attempt ${attempt}:`, lastError.message);
        
        if (attempt < maxRetries) {
          console.log(`Retrying in ${retryDelay}ms...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }

    throw new Error(`${operationName} failed after ${maxRetries} attempts: ${lastError?.message}`);
  };

  try {
    // Test connection with retry
    const isConnected = await retryOperation(
      () => adapter.testConnection().then(response => {
        if (!response.success) {
          throw new Error('Connection test failed');
        }
        return response.data!;
      }),
      'Connection Test'
    );

    console.log('Connection status:', isConnected ? 'Connected' : 'Disconnected');

    // Get menu items with retry
    const menuItems = await retryOperation(
      () => adapter.getMenuItems().then(response => {
        if (!response.success) {
          throw new Error(response.error?.message || 'Failed to fetch menu items');
        }
        return response.data!;
      }),
      'Get Menu Items'
    );

    console.log(`Successfully fetched ${menuItems.length} menu items`);

  } catch (error) {
    console.error('All retry attempts failed:', error);
    
    // Implement fallback logic here
    console.log('Implementing fallback strategies...');
    
    // For example, you might:
    // - Switch to a backup data source
    // - Use cached data
    // - Notify administrators
    // - Gracefully degrade functionality
  }
}

// =============================================================================
// 10. DATA SYNCHRONIZATION
// =============================================================================

/**
 * Example 12: Periodic data synchronization
 */
export async function dataSynchronizationExample(adapter: IPOSAdapter) {
  const syncInterval = 5 * 60 * 1000; // 5 minutes

  const performSync = async () => {
    try {
      console.log('Starting data synchronization...');
      
      const syncResponse = await adapter.syncData();
      if (syncResponse.success) {
        const stats = syncResponse.data!;
        console.log('Sync completed:');
        console.log(`- Menu items: ${stats.menuItems}`);
        console.log(`- Inventory: ${stats.inventory}`);
        console.log(`- Orders: ${stats.orders}`);
        console.log(`- Transactions: ${stats.transactions}`);
      } else {
        console.error('Sync failed:', syncResponse.error?.message);
      }
    } catch (error) {
      console.error('Sync error:', error);
    }
  };

  // Initial sync
  await performSync();

  // Set up periodic sync
  const syncTimer = setInterval(performSync, syncInterval);

  // Return cleanup function
  return () => {
    clearInterval(syncTimer);
    console.log('Data synchronization stopped');
  };
}

// =============================================================================
// 11. WEBHOOK MANAGEMENT
// =============================================================================

/**
 * Example 13: Webhook setup (if supported)
 */
export async function webhookSetupExample(adapter: IPOSAdapter) {
  try {
    // Register webhook for order updates
    const webhookUrl = 'https://your-app.com/api/webhooks/pos';
    const events = ['order.created', 'order.updated', 'payment.completed'];

    const webhookResponse = await adapter.registerWebhook?.(webhookUrl, events);
    
    if (webhookResponse?.success) {
      const webhookId = webhookResponse.data!.webhookId;
      console.log(`Webhook registered successfully: ${webhookId}`);
      
      // Store webhook ID for later cleanup
      localStorage.setItem('posWebhookId', webhookId);
      
      return webhookId;
    } else {
      console.log('Webhook registration not supported by this POS system');
    }
  } catch (error) {
    console.error('Webhook setup error:', error);
  }

  return null;
}

/**
 * Example 14: Cleanup webhook on app shutdown
 */
export async function cleanupWebhook(adapter: IPOSAdapter) {
  try {
    const webhookId = localStorage.getItem('posWebhookId');
    
    if (webhookId && adapter.unregisterWebhook) {
      const response = await adapter.unregisterWebhook(webhookId);
      
      if (response.success) {
        console.log('Webhook unregistered successfully');
        localStorage.removeItem('posWebhookId');
      }
    }
  } catch (error) {
    console.error('Webhook cleanup error:', error);
  }
}

// =============================================================================
// COMPREHENSIVE EXAMPLE: RESTAURANT DASHBOARD INTEGRATION
// =============================================================================

/**
 * Complete example showing how to integrate POS into a restaurant dashboard
 */
export class RestaurantDashboardPOS {
  private adapter: IPOSAdapter;
  private syncTimer: NodeJS.Timeout | null = null;

  constructor(config: POSConfig) {
    this.adapter = createPOSAdapter(config);
  }

  async initialize(): Promise<void> {
    console.log('Initializing POS integration...');
    
    // Connect to POS
    const connectionResult = await this.adapter.connect();
    if (!connectionResult.success) {
      throw new Error(`POS connection failed: ${connectionResult.error?.message}`);
    }

    console.log('✅ Connected to POS system');

    // Set up periodic data sync
    this.startDataSync();

    // Set up webhooks if supported
    await this.setupWebhooks();

    console.log('✅ POS integration initialized');
  }

  async getDashboardData() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const [salesData, pendingOrders, inventoryAlerts, activeShifts] = await Promise.all([
      this.adapter.getSalesData(yesterday, today, 'day'),
      this.adapter.getOrders(OrderStatus.PENDING),
      this.adapter.getInventoryAlerts(),
      this.adapter.getEmployeeShifts()
    ]);

    return {
      sales: salesData.success ? salesData.data : null,
      pendingOrders: pendingOrders.success ? pendingOrders.data : [],
      inventoryAlerts: inventoryAlerts.success ? inventoryAlerts.data : [],
      activeShifts: activeShifts.success ? 
        activeShifts.data?.filter(shift => shift.status === 'active') : []
    };
  }

  private startDataSync(): void {
    this.syncTimer = setInterval(async () => {
      try {
        await this.adapter.syncData();
        console.log('📊 Data sync completed');
      } catch (error) {
        console.error('Data sync failed:', error);
      }
    }, 5 * 60 * 1000); // Every 5 minutes
  }

  private async setupWebhooks(): Promise<void> {
    if (!this.adapter.registerWebhook) {
      console.log('ℹ️  Webhooks not supported by this POS system');
      return;
    }

    try {
      const webhookUrl = process.env.WEBHOOK_URL || 'https://your-app.com/api/webhooks/pos';
      const events = ['order.created', 'order.updated', 'payment.completed', 'inventory.updated'];

      const result = await this.adapter.registerWebhook(webhookUrl, events);
      if (result.success) {
        console.log(`✅ Webhooks registered: ${result.data!.webhookId}`);
      }
    } catch (error) {
      console.error('Webhook setup failed:', error);
    }
  }

  async shutdown(): Promise<void> {
    console.log('Shutting down POS integration...');

    // Stop sync timer
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }

    // Clean up webhooks
    await cleanupWebhook(this.adapter);

    // Disconnect from POS
    await this.adapter.disconnect();

    console.log('✅ POS integration shutdown complete');
  }
}

export default RestaurantDashboardPOS;