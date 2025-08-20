import {
  IPOSAdapter,
  POSResponse,
  POSError,
  ConnectionStatus,
  SalesData,
  Transaction,
  MenuItem,
  InventoryItem,
  Employee,
  EmployeeShift,
  Order,
  PaymentResult,
  PaymentMethod,
  OrderStatus,
  TransactionStatus,
  POSConfig,
  POSProvider,
  EmployeeRole,
  OrderItem
} from '../interfaces';

/**
 * Mock POS Adapter Implementation
 * 
 * This adapter provides a mock implementation for development and testing purposes.
 * It generates realistic data and simulates POS operations without requiring
 * actual POS system integration.
 * 
 * Features:
 * - Realistic mock data generation
 * - Simulated latency for API calls
 * - Error simulation for testing error handling
 * - In-memory data storage with persistence simulation
 * - Comprehensive test scenarios
 */
export class MockPOSAdapter implements IPOSAdapter {
  private config: POSConfig;
  private connectionStatus: ConnectionStatus;
  private mockData: MockDataStore;

  constructor(config: POSConfig) {
    if (config.provider !== POSProvider.MOCK) {
      throw new Error('Invalid provider for MockPOSAdapter');
    }

    this.config = {
      ...config,
      timeout: config.timeout || 5000, // Shorter timeout for mock
      retryAttempts: config.retryAttempts || 1
    };

    this.connectionStatus = {
      isConnected: false
    };

    this.mockData = new MockDataStore();
  }

  // Connection management
  async connect(): Promise<POSResponse<boolean>> {
    await this.simulateLatency(500);
    
    this.connectionStatus = {
      isConnected: true,
      lastConnectionAttempt: new Date(),
      lastSuccessfulConnection: new Date()
    };

    return {
      success: true,
      data: true,
      metadata: {
        mockProvider: true,
        connectionTime: 500
      }
    };
  }

  async disconnect(): Promise<POSResponse<void>> {
    await this.simulateLatency(200);
    
    this.connectionStatus.isConnected = false;
    
    return {
      success: true,
      data: undefined
    };
  }

  getConnectionStatus(): ConnectionStatus {
    return { ...this.connectionStatus };
  }

  async testConnection(): Promise<POSResponse<boolean>> {
    await this.simulateLatency(300);
    
    // Simulate occasional connection failures for testing
    if (Math.random() < 0.05) { // 5% failure rate
      return {
        success: false,
        error: {
          code: 'MOCK_CONNECTION_TIMEOUT',
          message: 'Mock connection timeout',
          timestamp: new Date()
        }
      };
    }

    return {
      success: true,
      data: true
    };
  }

  // Sales data retrieval
  async getSalesData(
    startDate: Date,
    endDate: Date,
    period: 'day' | 'week' | 'month' = 'day'
  ): Promise<POSResponse<SalesData>> {
    await this.simulateLatency(800);

    const orders = this.mockData.getOrdersInDateRange(startDate, endDate);
    const transactions = this.mockData.getTransactionsInDateRange(startDate, endDate);

    const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
    const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

    // Calculate top-selling items
    const itemSales: Record<string, { name: string; quantity: number; revenue: number }> = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        if (!itemSales[item.menuItemId]) {
          itemSales[item.menuItemId] = {
            name: item.menuItem?.name || 'Unknown Item',
            quantity: 0,
            revenue: 0
          };
        }
        itemSales[item.menuItemId].quantity += item.quantity;
        itemSales[item.menuItemId].revenue += item.totalPrice;
      });
    });

    const topSellingItems = Object.entries(itemSales)
      .map(([menuItemId, data]) => ({ menuItemId, ...data }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);

    // Calculate payment method breakdown
    const paymentMethodCounts: Record<string, { count: number; total: number }> = {};
    transactions.forEach(transaction => {
      const method = transaction.method;
      if (!paymentMethodCounts[method]) {
        paymentMethodCounts[method] = { count: 0, total: 0 };
      }
      paymentMethodCounts[method].count += 1;
      paymentMethodCounts[method].total += transaction.amount;
    });

    const paymentMethodBreakdown = Object.entries(paymentMethodCounts)
      .map(([method, data]) => ({ method: method as PaymentMethod, ...data }));

    // Generate hourly breakdown
    const hourlyBreakdown = Array.from({ length: 24 }, (_, hour) => {
      const hourTransactions = transactions.filter(t => t.timestamp.getHours() === hour);
      return {
        hour,
        revenue: hourTransactions.reduce((sum, t) => sum + t.amount, 0),
        transactionCount: hourTransactions.length
      };
    });

    const salesData: SalesData = {
      period,
      startDate,
      endDate,
      totalRevenue,
      totalTransactions: transactions.length,
      averageOrderValue,
      topSellingItems,
      paymentMethodBreakdown,
      hourlyBreakdown
    };

    return {
      success: true,
      data: salesData
    };
  }

  async getTransactions(
    startDate?: Date,
    endDate?: Date,
    limit: number = 100,
    offset: number = 0
  ): Promise<POSResponse<Transaction[]>> {
    await this.simulateLatency(400);

    let transactions = this.mockData.getAllTransactions();

    if (startDate || endDate) {
      transactions = this.mockData.getTransactionsInDateRange(
        startDate || new Date(0),
        endDate || new Date()
      );
    }

    const paginatedTransactions = transactions.slice(offset, offset + limit);

    return {
      success: true,
      data: paginatedTransactions,
      metadata: {
        totalCount: transactions.length,
        offset,
        limit
      }
    };
  }

  // Menu item management
  async getMenuItems(): Promise<POSResponse<MenuItem[]>> {
    await this.simulateLatency(600);

    return {
      success: true,
      data: this.mockData.getAllMenuItems()
    };
  }

  async getMenuItem(id: string): Promise<POSResponse<MenuItem>> {
    await this.simulateLatency(300);

    const item = this.mockData.getMenuItemById(id);
    if (!item) {
      return {
        success: false,
        error: {
          code: 'MOCK_MENU_ITEM_NOT_FOUND',
          message: 'Menu item not found',
          details: { id },
          timestamp: new Date()
        }
      };
    }

    return {
      success: true,
      data: item
    };
  }

  async createMenuItem(item: Omit<MenuItem, 'id'>): Promise<POSResponse<MenuItem>> {
    await this.simulateLatency(700);

    const newItem = this.mockData.createMenuItem(item);

    return {
      success: true,
      data: newItem
    };
  }

  async updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<POSResponse<MenuItem>> {
    await this.simulateLatency(500);

    const updatedItem = this.mockData.updateMenuItem(id, updates);
    if (!updatedItem) {
      return {
        success: false,
        error: {
          code: 'MOCK_MENU_ITEM_NOT_FOUND',
          message: 'Menu item not found for update',
          details: { id },
          timestamp: new Date()
        }
      };
    }

    return {
      success: true,
      data: updatedItem
    };
  }

  async deleteMenuItem(id: string): Promise<POSResponse<void>> {
    await this.simulateLatency(400);

    const deleted = this.mockData.deleteMenuItem(id);
    if (!deleted) {
      return {
        success: false,
        error: {
          code: 'MOCK_MENU_ITEM_NOT_FOUND',
          message: 'Menu item not found for deletion',
          details: { id },
          timestamp: new Date()
        }
      };
    }

    return {
      success: true,
      data: undefined
    };
  }

  async updateMenuItemAvailability(id: string, isAvailable: boolean): Promise<POSResponse<MenuItem>> {
    return this.updateMenuItem(id, { isAvailable });
  }

  // Inventory management
  async getInventoryItems(): Promise<POSResponse<InventoryItem[]>> {
    await this.simulateLatency(700);

    return {
      success: true,
      data: this.mockData.getAllInventoryItems()
    };
  }

  async getInventoryItem(id: string): Promise<POSResponse<InventoryItem>> {
    await this.simulateLatency(300);

    const item = this.mockData.getInventoryItemById(id);
    if (!item) {
      return {
        success: false,
        error: {
          code: 'MOCK_INVENTORY_ITEM_NOT_FOUND',
          message: 'Inventory item not found',
          details: { id },
          timestamp: new Date()
        }
      };
    }

    return {
      success: true,
      data: item
    };
  }

  async updateInventoryLevel(id: string, quantity: number): Promise<POSResponse<InventoryItem>> {
    await this.simulateLatency(400);

    const updatedItem = this.mockData.updateInventoryLevel(id, quantity);
    if (!updatedItem) {
      return {
        success: false,
        error: {
          code: 'MOCK_INVENTORY_ITEM_NOT_FOUND',
          message: 'Inventory item not found for update',
          details: { id, quantity },
          timestamp: new Date()
        }
      };
    }

    return {
      success: true,
      data: updatedItem
    };
  }

  async getInventoryAlerts(): Promise<POSResponse<InventoryItem[]>> {
    await this.simulateLatency(500);

    const alertItems = this.mockData.getAllInventoryItems().filter(item =>
      item.currentStock <= (item.alertThreshold || item.minimumStock)
    );

    return {
      success: true,
      data: alertItems
    };
  }

  // Employee and shift management
  async getEmployees(): Promise<POSResponse<Employee[]>> {
    await this.simulateLatency(500);

    return {
      success: true,
      data: this.mockData.getAllEmployees()
    };
  }

  async getEmployee(id: string): Promise<POSResponse<Employee>> {
    await this.simulateLatency(300);

    const employee = this.mockData.getEmployeeById(id);
    if (!employee) {
      return {
        success: false,
        error: {
          code: 'MOCK_EMPLOYEE_NOT_FOUND',
          message: 'Employee not found',
          details: { id },
          timestamp: new Date()
        }
      };
    }

    return {
      success: true,
      data: employee
    };
  }

  async getEmployeeShifts(
    employeeId?: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<POSResponse<EmployeeShift[]>> {
    await this.simulateLatency(600);

    let shifts = this.mockData.getAllShifts();

    if (employeeId) {
      shifts = shifts.filter(shift => shift.employeeId === employeeId);
    }

    if (startDate || endDate) {
      shifts = shifts.filter(shift => {
        const shiftDate = shift.startTime;
        return (!startDate || shiftDate >= startDate) && (!endDate || shiftDate <= endDate);
      });
    }

    return {
      success: true,
      data: shifts
    };
  }

  async startShift(employeeId: string): Promise<POSResponse<EmployeeShift>> {
    await this.simulateLatency(400);

    const employee = this.mockData.getEmployeeById(employeeId);
    if (!employee) {
      return {
        success: false,
        error: {
          code: 'MOCK_EMPLOYEE_NOT_FOUND',
          message: 'Employee not found for shift start',
          details: { employeeId },
          timestamp: new Date()
        }
      };
    }

    const shift = this.mockData.createShift(employeeId);

    return {
      success: true,
      data: shift
    };
  }

  async endShift(shiftId: string): Promise<POSResponse<EmployeeShift>> {
    await this.simulateLatency(400);

    const updatedShift = this.mockData.endShift(shiftId);
    if (!updatedShift) {
      return {
        success: false,
        error: {
          code: 'MOCK_SHIFT_NOT_FOUND',
          message: 'Shift not found for ending',
          details: { shiftId },
          timestamp: new Date()
        }
      };
    }

    return {
      success: true,
      data: updatedShift
    };
  }

  // Order management
  async getOrders(
    status?: OrderStatus,
    startDate?: Date,
    endDate?: Date,
    limit: number = 100
  ): Promise<POSResponse<Order[]>> {
    await this.simulateLatency(700);

    let orders = this.mockData.getAllOrders();

    if (status) {
      orders = orders.filter(order => order.status === status);
    }

    if (startDate || endDate) {
      orders = orders.filter(order => {
        const orderDate = order.createdAt;
        return (!startDate || orderDate >= startDate) && (!endDate || orderDate <= endDate);
      });
    }

    const limitedOrders = orders.slice(0, limit);

    return {
      success: true,
      data: limitedOrders,
      metadata: {
        totalCount: orders.length,
        filtered: limitedOrders.length
      }
    };
  }

  async getOrder(id: string): Promise<POSResponse<Order>> {
    await this.simulateLatency(300);

    const order = this.mockData.getOrderById(id);
    if (!order) {
      return {
        success: false,
        error: {
          code: 'MOCK_ORDER_NOT_FOUND',
          message: 'Order not found',
          details: { id },
          timestamp: new Date()
        }
      };
    }

    return {
      success: true,
      data: order
    };
  }

  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<POSResponse<Order>> {
    await this.simulateLatency(800);

    const createdOrder = this.mockData.createOrder(order);

    return {
      success: true,
      data: createdOrder
    };
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<POSResponse<Order>> {
    await this.simulateLatency(500);

    const updatedOrder = this.mockData.updateOrderStatus(id, status);
    if (!updatedOrder) {
      return {
        success: false,
        error: {
          code: 'MOCK_ORDER_NOT_FOUND',
          message: 'Order not found for status update',
          details: { id, status },
          timestamp: new Date()
        }
      };
    }

    return {
      success: true,
      data: updatedOrder
    };
  }

  async cancelOrder(id: string, reason?: string): Promise<POSResponse<Order>> {
    await this.simulateLatency(500);

    const cancelledOrder = this.mockData.updateOrderStatus(id, OrderStatus.CANCELLED);
    if (!cancelledOrder) {
      return {
        success: false,
        error: {
          code: 'MOCK_ORDER_NOT_FOUND',
          message: 'Order not found for cancellation',
          details: { id, reason },
          timestamp: new Date()
        }
      };
    }

    return {
      success: true,
      data: cancelledOrder
    };
  }

  // Transaction processing
  async processPayment(
    orderId: string,
    amount: number,
    method: PaymentMethod,
    customerInfo?: Record<string, any>
  ): Promise<POSResponse<PaymentResult>> {
    await this.simulateLatency(1200); // Longer for payment processing

    // Simulate payment failures for testing
    if (Math.random() < 0.1) { // 10% failure rate
      return {
        success: true,
        data: {
          success: false,
          error: 'Insufficient funds or card declined'
        }
      };
    }

    const transaction = this.mockData.createTransaction(orderId, amount, method);
    
    const paymentResult: PaymentResult = {
      success: true,
      transactionId: transaction.id,
      authCode: `AUTH${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      receipt: `Receipt#${transaction.id.substr(-8)}`
    };

    return {
      success: true,
      data: paymentResult
    };
  }

  async refundTransaction(
    transactionId: string,
    amount?: number,
    reason?: string
  ): Promise<POSResponse<Transaction>> {
    await this.simulateLatency(1000);

    const refundTransaction = this.mockData.createRefund(transactionId, amount, reason);
    if (!refundTransaction) {
      return {
        success: false,
        error: {
          code: 'MOCK_TRANSACTION_NOT_FOUND',
          message: 'Transaction not found for refund',
          details: { transactionId, amount, reason },
          timestamp: new Date()
        }
      };
    }

    return {
      success: true,
      data: refundTransaction
    };
  }

  // Real-time synchronization
  async syncData(): Promise<POSResponse<{ menuItems: number; inventory: number; orders: number; transactions: number; }>> {
    await this.simulateLatency(2000); // Longer for sync operation

    const stats = this.mockData.getStats();

    return {
      success: true,
      data: stats,
      metadata: {
        syncTime: new Date(),
        dataVersion: '1.0.0'
      }
    };
  }

  // Webhook management (optional)
  async registerWebhook(url: string, events: string[]): Promise<POSResponse<{ webhookId: string }>> {
    await this.simulateLatency(600);

    const webhookId = `mock-webhook-${Date.now()}`;

    return {
      success: true,
      data: { webhookId },
      metadata: {
        url,
        events,
        registered: true
      }
    };
  }

  async unregisterWebhook(webhookId: string): Promise<POSResponse<void>> {
    await this.simulateLatency(400);

    return {
      success: true,
      data: undefined,
      metadata: {
        webhookId,
        unregistered: true
      }
    };
  }

  // Utility methods
  private async simulateLatency(ms: number): Promise<void> {
    // Add some randomness to simulate real network latency
    const latency = ms + (Math.random() * 200 - 100); // ±100ms variance
    await new Promise(resolve => setTimeout(resolve, Math.max(0, latency)));
  }

  /**
   * Simulate various error conditions for testing
   */
  simulateError(errorType: 'network' | 'auth' | 'rate_limit' | 'server'): POSError {
    const errors = {
      network: {
        code: 'MOCK_NETWORK_ERROR',
        message: 'Simulated network timeout',
        timestamp: new Date()
      },
      auth: {
        code: 'MOCK_AUTH_ERROR',
        message: 'Simulated authentication failure',
        timestamp: new Date()
      },
      rate_limit: {
        code: 'MOCK_RATE_LIMIT',
        message: 'Simulated rate limit exceeded',
        timestamp: new Date()
      },
      server: {
        code: 'MOCK_SERVER_ERROR',
        message: 'Simulated internal server error',
        timestamp: new Date()
      }
    };

    return errors[errorType];
  }

  /**
   * Get mock data store for testing purposes
   */
  getMockDataStore(): MockDataStore {
    return this.mockData;
  }
}

/**
 * Mock Data Store
 * 
 * In-memory data store that generates and manages realistic mock data
 * for all POS entities.
 */
class MockDataStore {
  private menuItems: MenuItem[] = [];
  private inventoryItems: InventoryItem[] = [];
  private employees: Employee[] = [];
  private shifts: EmployeeShift[] = [];
  private orders: Order[] = [];
  private transactions: Transaction[] = [];

  constructor() {
    this.initializeMockData();
  }

  // Getters
  getAllMenuItems(): MenuItem[] {
    return [...this.menuItems];
  }

  getMenuItemById(id: string): MenuItem | undefined {
    return this.menuItems.find(item => item.id === id);
  }

  getAllInventoryItems(): InventoryItem[] {
    return [...this.inventoryItems];
  }

  getInventoryItemById(id: string): InventoryItem | undefined {
    return this.inventoryItems.find(item => item.id === id);
  }

  getAllEmployees(): Employee[] {
    return [...this.employees];
  }

  getEmployeeById(id: string): Employee | undefined {
    return this.employees.find(emp => emp.id === id);
  }

  getAllShifts(): EmployeeShift[] {
    return [...this.shifts];
  }

  getShiftById(id: string): EmployeeShift | undefined {
    return this.shifts.find(shift => shift.id === id);
  }

  getAllOrders(): Order[] {
    return [...this.orders];
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find(order => order.id === id);
  }

  getAllTransactions(): Transaction[] {
    return [...this.transactions];
  }

  getTransactionById(id: string): Transaction | undefined {
    return this.transactions.find(t => t.id === id);
  }

  // Date range queries
  getOrdersInDateRange(startDate: Date, endDate: Date): Order[] {
    return this.orders.filter(order =>
      order.createdAt >= startDate && order.createdAt <= endDate
    );
  }

  getTransactionsInDateRange(startDate: Date, endDate: Date): Transaction[] {
    return this.transactions.filter(transaction =>
      transaction.timestamp >= startDate && transaction.timestamp <= endDate
    );
  }

  // Mutations
  createMenuItem(item: Omit<MenuItem, 'id'>): MenuItem {
    const newItem: MenuItem = {
      ...item,
      id: `menu-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
    };
    this.menuItems.push(newItem);
    
    // Also create corresponding inventory item
    this.createInventoryItemForMenu(newItem);
    
    return newItem;
  }

  updateMenuItem(id: string, updates: Partial<MenuItem>): MenuItem | undefined {
    const index = this.menuItems.findIndex(item => item.id === id);
    if (index === -1) return undefined;

    this.menuItems[index] = { ...this.menuItems[index], ...updates };
    return this.menuItems[index];
  }

  deleteMenuItem(id: string): boolean {
    const index = this.menuItems.findIndex(item => item.id === id);
    if (index === -1) return false;

    this.menuItems.splice(index, 1);
    
    // Also remove corresponding inventory item
    const invIndex = this.inventoryItems.findIndex(item => item.id === id);
    if (invIndex !== -1) {
      this.inventoryItems.splice(invIndex, 1);
    }
    
    return true;
  }

  updateInventoryLevel(id: string, quantity: number): InventoryItem | undefined {
    const item = this.inventoryItems.find(item => item.id === id);
    if (!item) return undefined;

    item.currentStock = quantity;
    item.lastUpdated = new Date();
    
    return item;
  }

  createShift(employeeId: string): EmployeeShift {
    const shift: EmployeeShift = {
      id: `shift-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      employeeId,
      startTime: new Date(),
      status: 'active'
    };
    
    this.shifts.push(shift);
    return shift;
  }

  endShift(shiftId: string): EmployeeShift | undefined {
    const shift = this.shifts.find(s => s.id === shiftId);
    if (!shift) return undefined;

    const hoursWorked = (new Date().getTime() - shift.startTime.getTime()) / (1000 * 60 * 60);
    const employee = this.getEmployeeById(shift.employeeId);
    
    shift.endTime = new Date();
    shift.hoursWorked = hoursWorked;
    shift.totalPay = employee?.hourlyRate ? hoursWorked * employee.hourlyRate : undefined;
    shift.status = 'completed';
    
    return shift;
  }

  createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order {
    const order: Order = {
      ...orderData,
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.orders.push(order);
    return order;
  }

  updateOrderStatus(id: string, status: OrderStatus): Order | undefined {
    const order = this.orders.find(o => o.id === id);
    if (!order) return undefined;

    order.status = status;
    order.updatedAt = new Date();
    
    if (status === OrderStatus.DELIVERED) {
      order.fulfillmentTime = new Date();
    }
    
    return order;
  }

  createTransaction(orderId: string, amount: number, method: PaymentMethod): Transaction {
    const transaction: Transaction = {
      id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      orderId,
      amount,
      method,
      timestamp: new Date(),
      status: TransactionStatus.COMPLETED
    };
    
    this.transactions.push(transaction);
    return transaction;
  }

  createRefund(transactionId: string, amount?: number, reason?: string): Transaction | undefined {
    const originalTransaction = this.getTransactionById(transactionId);
    if (!originalTransaction) return undefined;

    const refundAmount = amount || originalTransaction.amount;
    
    const refundTransaction: Transaction = {
      id: `refund-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      orderId: originalTransaction.orderId,
      amount: -refundAmount,
      method: originalTransaction.method,
      timestamp: new Date(),
      status: TransactionStatus.REFUNDED,
      refundAmount,
      refundReason: reason
    };
    
    this.transactions.push(refundTransaction);
    return refundTransaction;
  }

  getStats(): { menuItems: number; inventory: number; orders: number; transactions: number } {
    return {
      menuItems: this.menuItems.length,
      inventory: this.inventoryItems.length,
      orders: this.orders.length,
      transactions: this.transactions.length
    };
  }

  // Initialize mock data
  private initializeMockData(): void {
    this.createMockMenuItems();
    this.createMockEmployees();
    this.createMockOrders();
    this.createMockTransactions();
    this.createMockShifts();
  }

  private createMockMenuItems(): void {
    const categories = ['Appetizers', 'Entrees', 'Desserts', 'Beverages', 'Sides'];
    const menuItems = [
      // Appetizers
      { name: 'Caesar Salad', category: 'Appetizers', price: 12.99, description: 'Fresh romaine lettuce with parmesan and croutons' },
      { name: 'Buffalo Wings', category: 'Appetizers', price: 14.99, description: 'Spicy chicken wings with blue cheese dip' },
      { name: 'Calamari Rings', category: 'Appetizers', price: 13.99, description: 'Crispy fried squid rings with marinara sauce' },
      
      // Entrees
      { name: 'Grilled Salmon', category: 'Entrees', price: 24.99, description: 'Atlantic salmon with lemon herb seasoning' },
      { name: 'Ribeye Steak', category: 'Entrees', price: 32.99, description: '12oz prime ribeye with garlic butter' },
      { name: 'Chicken Parmesan', category: 'Entrees', price: 19.99, description: 'Breaded chicken breast with marinara and mozzarella' },
      { name: 'Vegetarian Pasta', category: 'Entrees', price: 16.99, description: 'Penne pasta with seasonal vegetables' },
      
      // Desserts
      { name: 'Chocolate Cake', category: 'Desserts', price: 8.99, description: 'Rich chocolate layer cake with frosting' },
      { name: 'Tiramisu', category: 'Desserts', price: 9.99, description: 'Classic Italian coffee-flavored dessert' },
      
      // Beverages
      { name: 'House Wine', category: 'Beverages', price: 7.99, description: 'Red or white wine selection' },
      { name: 'Craft Beer', category: 'Beverages', price: 5.99, description: 'Local brewery selection' },
      { name: 'Soft Drinks', category: 'Beverages', price: 2.99, description: 'Coca-Cola products' },
      
      // Sides
      { name: 'Garlic Bread', category: 'Sides', price: 4.99, description: 'Toasted bread with garlic butter' },
      { name: 'French Fries', category: 'Sides', price: 3.99, description: 'Crispy golden fries' }
    ];

    this.menuItems = menuItems.map((item, index) => ({
      id: `menu-${index + 1}`,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      isAvailable: Math.random() > 0.1, // 90% available
      allergens: this.getRandomAllergens(),
      preparationTime: Math.floor(Math.random() * 20) + 5, // 5-25 minutes
      modifiers: []
    }));

    // Create corresponding inventory items
    this.menuItems.forEach(item => this.createInventoryItemForMenu(item));
  }

  private createInventoryItemForMenu(menuItem: MenuItem): void {
    const inventoryItem: InventoryItem = {
      id: menuItem.id,
      name: menuItem.name,
      category: menuItem.category,
      currentStock: Math.floor(Math.random() * 100) + 20, // 20-120 items
      minimumStock: Math.floor(Math.random() * 10) + 5, // 5-15 minimum
      unit: 'each',
      cost: menuItem.price * (0.2 + Math.random() * 0.3), // 20-50% of selling price
      supplier: this.getRandomSupplier(),
      lastUpdated: new Date(),
      alertThreshold: Math.floor(Math.random() * 5) + 10 // 10-15 alert threshold
    };

    this.inventoryItems.push(inventoryItem);
  }

  private createMockEmployees(): void {
    const employees = [
      { name: 'John Smith', email: 'john.smith@restaurant.com', role: EmployeeRole.MANAGER, hourlyRate: 25.00 },
      { name: 'Sarah Johnson', email: 'sarah.johnson@restaurant.com', role: EmployeeRole.CASHIER, hourlyRate: 15.00 },
      { name: 'Mike Davis', email: 'mike.davis@restaurant.com', role: EmployeeRole.COOK, hourlyRate: 18.00 },
      { name: 'Lisa Wilson', email: 'lisa.wilson@restaurant.com', role: EmployeeRole.WAITER, hourlyRate: 12.00 },
      { name: 'Tom Brown', email: 'tom.brown@restaurant.com', role: EmployeeRole.COOK, hourlyRate: 18.00 },
      { name: 'Emma Taylor', email: 'emma.taylor@restaurant.com', role: EmployeeRole.WAITER, hourlyRate: 12.00 }
    ];

    this.employees = employees.map((emp, index) => ({
      id: `emp-${index + 1}`,
      name: emp.name,
      email: emp.email,
      role: emp.role,
      hourlyRate: emp.hourlyRate,
      isActive: Math.random() > 0.05, // 95% active
      hireDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000), // Within last year
      lastLogin: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined
    }));
  }

  private createMockOrders(): void {
    const orderCount = 50;
    
    for (let i = 0; i < orderCount; i++) {
      const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Last 30 days
      const items = this.generateRandomOrderItems();
      const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
      const tax = subtotal * 0.08; // 8% tax
      const tip = Math.random() > 0.3 ? subtotal * (0.15 + Math.random() * 0.1) : 0; // 15-25% tip

      const order: Order = {
        id: `order-${i + 1}`,
        orderNumber: `ORD-${String(1000 + i).slice(-3)}`,
        customerId: Math.random() > 0.5 ? `customer-${Math.floor(Math.random() * 100)}` : undefined,
        customerName: Math.random() > 0.5 ? this.getRandomCustomerName() : undefined,
        items,
        subtotal,
        tax,
        tip,
        total: subtotal + tax + tip,
        status: this.getRandomOrderStatus(),
        orderType: this.getRandomOrderType(),
        tableNumber: Math.random() > 0.6 ? `Table ${Math.floor(Math.random() * 20) + 1}` : undefined,
        notes: Math.random() > 0.7 ? 'Special instructions for order' : undefined,
        createdAt,
        updatedAt: createdAt,
        fulfillmentTime: Math.random() > 0.5 ? new Date(createdAt.getTime() + Math.random() * 60 * 60 * 1000) : undefined
      };

      this.orders.push(order);
    }
  }

  private createMockTransactions(): void {
    this.orders.forEach(order => {
      if (order.status === OrderStatus.DELIVERED || order.status === OrderStatus.READY) {
        const transaction: Transaction = {
          id: `txn-${order.id}`,
          orderId: order.id,
          amount: order.total,
          method: this.getRandomPaymentMethod(),
          timestamp: order.fulfillmentTime || order.createdAt,
          status: TransactionStatus.COMPLETED,
          reference: `REF-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
        };

        this.transactions.push(transaction);

        // Occasionally add refunds
        if (Math.random() < 0.05) { // 5% chance of refund
          const refundAmount = order.total * (0.5 + Math.random() * 0.5); // 50-100% refund
          const refund: Transaction = {
            id: `refund-${transaction.id}`,
            orderId: order.id,
            amount: -refundAmount,
            method: transaction.method,
            timestamp: new Date(transaction.timestamp.getTime() + Math.random() * 24 * 60 * 60 * 1000),
            status: TransactionStatus.REFUNDED,
            refundAmount,
            refundReason: 'Customer request'
          };

          this.transactions.push(refund);
        }
      }
    });
  }

  private createMockShifts(): void {
    const shiftCount = 30;
    
    for (let i = 0; i < shiftCount; i++) {
      const employee = this.employees[Math.floor(Math.random() * this.employees.length)];
      const startTime = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000); // Last 7 days
      const shiftLength = 4 + Math.random() * 8; // 4-12 hour shifts
      const endTime = new Date(startTime.getTime() + shiftLength * 60 * 60 * 1000);

      const shift: EmployeeShift = {
        id: `shift-${i + 1}`,
        employeeId: employee.id,
        employee,
        startTime,
        endTime: Math.random() > 0.1 ? endTime : undefined, // 90% completed shifts
        breakDuration: Math.floor(Math.random() * 60) + 15, // 15-75 minute breaks
        hoursWorked: shiftLength,
        totalPay: employee.hourlyRate ? shiftLength * employee.hourlyRate : undefined,
        status: Math.random() > 0.1 ? 'completed' : 'active'
      };

      this.shifts.push(shift);
    }
  }

  // Helper methods for random data generation
  private generateRandomOrderItems(): OrderItem[] {
    const itemCount = Math.floor(Math.random() * 5) + 1; // 1-5 items
    const items: OrderItem[] = [];

    for (let i = 0; i < itemCount; i++) {
      const menuItem = this.menuItems[Math.floor(Math.random() * this.menuItems.length)];
      const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 quantity

      items.push({
        id: `item-${i + 1}`,
        menuItemId: menuItem.id,
        menuItem,
        quantity,
        unitPrice: menuItem.price,
        totalPrice: menuItem.price * quantity,
        modifiers: [],
        specialInstructions: Math.random() > 0.8 ? 'No onions' : undefined
      });
    }

    return items;
  }

  private getRandomAllergens(): string[] {
    const allergens = ['Dairy', 'Gluten', 'Nuts', 'Shellfish', 'Soy', 'Eggs'];
    const count = Math.floor(Math.random() * 3); // 0-2 allergens
    const selected = [];

    for (let i = 0; i < count; i++) {
      const allergen = allergens[Math.floor(Math.random() * allergens.length)];
      if (!selected.includes(allergen)) {
        selected.push(allergen);
      }
    }

    return selected;
  }

  private getRandomSupplier(): string {
    const suppliers = ['Fresh Foods Co.', 'Quality Meats Inc.', 'Ocean Harvest', 'Farm Fresh Produce', 'Beverage Distributors'];
    return suppliers[Math.floor(Math.random() * suppliers.length)];
  }

  private getRandomOrderStatus(): OrderStatus {
    const statuses = [OrderStatus.PENDING, OrderStatus.CONFIRMED, OrderStatus.PREPARING, OrderStatus.READY, OrderStatus.DELIVERED, OrderStatus.CANCELLED];
    const weights = [10, 15, 20, 15, 35, 5]; // Weighted distribution
    
    let total = 0;
    const random = Math.random() * 100;
    
    for (let i = 0; i < statuses.length; i++) {
      total += weights[i];
      if (random <= total) {
        return statuses[i];
      }
    }
    
    return OrderStatus.PENDING;
  }

  private getRandomOrderType(): 'dine_in' | 'takeout' | 'delivery' {
    const types: ('dine_in' | 'takeout' | 'delivery')[] = ['dine_in', 'takeout', 'delivery'];
    const weights = [50, 30, 20]; // 50% dine-in, 30% takeout, 20% delivery
    
    let total = 0;
    const random = Math.random() * 100;
    
    for (let i = 0; i < types.length; i++) {
      total += weights[i];
      if (random <= total) {
        return types[i];
      }
    }
    
    return 'dine_in';
  }

  private getRandomPaymentMethod(): PaymentMethod {
    const methods = [PaymentMethod.CASH, PaymentMethod.CREDIT_CARD, PaymentMethod.DEBIT_CARD, PaymentMethod.MOBILE_PAYMENT];
    const weights = [20, 50, 20, 10]; // Credit card most common
    
    let total = 0;
    const random = Math.random() * 100;
    
    for (let i = 0; i < methods.length; i++) {
      total += weights[i];
      if (random <= total) {
        return methods[i];
      }
    }
    
    return PaymentMethod.CREDIT_CARD;
  }

  private getRandomCustomerName(): string {
    const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'Tom', 'Lisa', 'David', 'Emily', 'Chris', 'Anna'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return `${firstName} ${lastName}`;
  }
}