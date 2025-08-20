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
  POSProvider
} from '../interfaces';

/**
 * Toast POS Adapter Implementation
 * 
 * This adapter provides integration with Toast POS system using their REST API.
 * Toast POS is popular in the restaurant industry for its comprehensive features.
 * 
 * API Documentation: https://doc.toasttab.com/
 */
export class ToastAdapter implements IPOSAdapter {
  private config: POSConfig;
  private connectionStatus: ConnectionStatus;
  private apiClient: ToastAPIClient;

  constructor(config: POSConfig) {
    if (config.provider !== POSProvider.TOAST) {
      throw new Error('Invalid provider for ToastAdapter');
    }

    this.config = {
      ...config,
      baseUrl: config.baseUrl || (config.environment === 'production' 
        ? 'https://ws-api.toasttab.com' 
        : 'https://ws-sandbox-api.toasttab.com'),
      timeout: config.timeout || 30000,
      retryAttempts: config.retryAttempts || 3
    };

    this.connectionStatus = {
      isConnected: false
    };

    this.apiClient = new ToastAPIClient(this.config);
  }

  // Connection management
  async connect(): Promise<POSResponse<boolean>> {
    try {
      this.connectionStatus.lastConnectionAttempt = new Date();
      
      const testResponse = await this.testConnection();
      if (testResponse.success) {
        this.connectionStatus.isConnected = true;
        this.connectionStatus.lastSuccessfulConnection = new Date();
        this.connectionStatus.connectionError = undefined;
        
        return {
          success: true,
          data: true
        };
      }

      return testResponse;
    } catch (error) {
      const posError: POSError = {
        code: 'TOAST_CONNECTION_ERROR',
        message: 'Failed to connect to Toast POS',
        details: { error: error instanceof Error ? error.message : 'Unknown error' },
        timestamp: new Date()
      };

      this.connectionStatus.connectionError = posError.message;

      return {
        success: false,
        error: posError
      };
    }
  }

  async disconnect(): Promise<POSResponse<void>> {
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
    try {
      const response = await this.apiClient.get('/restaurants');
      
      if (response.status === 200) {
        return {
          success: true,
          data: true
        };
      }

      return {
        success: false,
        error: {
          code: 'TOAST_CONNECTION_FAILED',
          message: 'Connection test failed',
          timestamp: new Date()
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_CONNECTION_ERROR',
          message: 'Connection test error',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  // Sales data retrieval
  async getSalesData(
    startDate: Date,
    endDate: Date,
    period: 'day' | 'week' | 'month' = 'day'
  ): Promise<POSResponse<SalesData>> {
    try {
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];

      const [salesResponse, itemsResponse] = await Promise.all([
        this.apiClient.get(`/reporting/sales?startDate=${startDateStr}&endDate=${endDateStr}`),
        this.apiClient.get(`/reporting/itemSales?startDate=${startDateStr}&endDate=${endDateStr}&limit=10`)
      ]);

      const salesData: SalesData = {
        period,
        startDate,
        endDate,
        totalRevenue: salesResponse.data.totalRevenue || 0,
        totalTransactions: salesResponse.data.transactionCount || 0,
        averageOrderValue: salesResponse.data.averageOrderValue || 0,
        topSellingItems: itemsResponse.data.items?.map((item: any) => ({
          menuItemId: item.id,
          name: item.name,
          quantitySold: item.quantity,
          revenue: item.revenue
        })) || [],
        paymentMethodBreakdown: salesResponse.data.paymentMethods?.map((method: any) => ({
          method: this.mapToastPaymentMethod(method.type),
          count: method.count,
          total: method.total
        })) || []
      };

      return {
        success: true,
        data: salesData
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_SALES_DATA_ERROR',
          message: 'Failed to retrieve sales data',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  async getTransactions(
    startDate?: Date,
    endDate?: Date,
    limit: number = 100,
    offset: number = 0
  ): Promise<POSResponse<Transaction[]>> {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      });

      if (startDate) {
        params.append('startDate', startDate.toISOString().split('T')[0]);
      }
      if (endDate) {
        params.append('endDate', endDate.toISOString().split('T')[0]);
      }

      const response = await this.apiClient.get(`/orders?${params.toString()}`);
      
      const transactions: Transaction[] = response.data.map((order: any) => ({
        id: order.guid,
        orderId: order.guid,
        amount: order.totalAmount,
        method: this.mapToastPaymentMethod(order.paymentMethod),
        timestamp: new Date(order.date),
        status: this.mapToastTransactionStatus(order.status),
        reference: order.externalId,
        tip: order.tipAmount,
        metadata: {
          toastOrderId: order.guid,
          restaurantGuid: order.restaurantGuid
        }
      }));

      return {
        success: true,
        data: transactions
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_TRANSACTIONS_ERROR',
          message: 'Failed to retrieve transactions',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  // Menu item management
  async getMenuItems(): Promise<POSResponse<MenuItem[]>> {
    try {
      const response = await this.apiClient.get('/menu/items');
      
      const menuItems: MenuItem[] = response.data.map((item: any) => ({
        id: item.guid,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.menuGroup?.name || 'Other',
        isAvailable: !item.isDisabled,
        allergens: item.allergens || [],
        modifiers: item.modifiers?.map((mod: any) => ({
          id: mod.guid,
          name: mod.name,
          price: mod.price,
          category: mod.category,
          isRequired: mod.required,
          options: mod.options || []
        })) || [],
        image: item.image?.url,
        preparationTime: item.prepTime
      }));

      return {
        success: true,
        data: menuItems
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_MENU_ITEMS_ERROR',
          message: 'Failed to retrieve menu items',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  async getMenuItem(id: string): Promise<POSResponse<MenuItem>> {
    try {
      const response = await this.apiClient.get(`/menu/items/${id}`);
      
      const menuItem: MenuItem = {
        id: response.data.guid,
        name: response.data.name,
        description: response.data.description,
        price: response.data.price,
        category: response.data.menuGroup?.name || 'Other',
        isAvailable: !response.data.isDisabled,
        allergens: response.data.allergens || [],
        modifiers: response.data.modifiers?.map((mod: any) => ({
          id: mod.guid,
          name: mod.name,
          price: mod.price,
          category: mod.category,
          isRequired: mod.required,
          options: mod.options || []
        })) || [],
        image: response.data.image?.url,
        preparationTime: response.data.prepTime
      };

      return {
        success: true,
        data: menuItem
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_MENU_ITEM_ERROR',
          message: 'Failed to retrieve menu item',
          details: { error: error instanceof Error ? error.message : 'Unknown error', id },
          timestamp: new Date()
        }
      };
    }
  }

  async createMenuItem(item: Omit<MenuItem, 'id'>): Promise<POSResponse<MenuItem>> {
    try {
      const toastItem = {
        name: item.name,
        description: item.description,
        price: item.price,
        menuGroupGuid: await this.getMenuGroupGuid(item.category),
        isDisabled: !item.isAvailable,
        allergens: item.allergens,
        prepTime: item.preparationTime
      };

      const response = await this.apiClient.post('/menu/items', toastItem);
      
      const createdItem: MenuItem = {
        ...item,
        id: response.data.guid
      };

      return {
        success: true,
        data: createdItem
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_CREATE_MENU_ITEM_ERROR',
          message: 'Failed to create menu item',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  async updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<POSResponse<MenuItem>> {
    try {
      const toastUpdates: any = {};
      
      if (updates.name) toastUpdates.name = updates.name;
      if (updates.description) toastUpdates.description = updates.description;
      if (updates.price) toastUpdates.price = updates.price;
      if (updates.isAvailable !== undefined) toastUpdates.isDisabled = !updates.isAvailable;
      if (updates.preparationTime) toastUpdates.prepTime = updates.preparationTime;

      const response = await this.apiClient.put(`/menu/items/${id}`, toastUpdates);
      
      const updatedItem = await this.getMenuItem(id);
      return updatedItem;
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_UPDATE_MENU_ITEM_ERROR',
          message: 'Failed to update menu item',
          details: { error: error instanceof Error ? error.message : 'Unknown error', id },
          timestamp: new Date()
        }
      };
    }
  }

  async deleteMenuItem(id: string): Promise<POSResponse<void>> {
    try {
      await this.apiClient.delete(`/menu/items/${id}`);
      
      return {
        success: true,
        data: undefined
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_DELETE_MENU_ITEM_ERROR',
          message: 'Failed to delete menu item',
          details: { error: error instanceof Error ? error.message : 'Unknown error', id },
          timestamp: new Date()
        }
      };
    }
  }

  async updateMenuItemAvailability(id: string, isAvailable: boolean): Promise<POSResponse<MenuItem>> {
    return this.updateMenuItem(id, { isAvailable });
  }

  // Inventory management (simplified - Toast has limited inventory API)
  async getInventoryItems(): Promise<POSResponse<InventoryItem[]>> {
    try {
      // Toast doesn't have a comprehensive inventory API
      // This is a placeholder implementation
      const response = await this.apiClient.get('/menu/items');
      
      const inventoryItems: InventoryItem[] = response.data.map((item: any) => ({
        id: item.guid,
        name: item.name,
        category: item.menuGroup?.name || 'Other',
        currentStock: 100, // Toast doesn't provide this directly
        minimumStock: 10,
        unit: 'each',
        cost: item.price * 0.3, // Estimated cost
        lastUpdated: new Date(),
        alertThreshold: 15
      }));

      return {
        success: true,
        data: inventoryItems
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_INVENTORY_ERROR',
          message: 'Failed to retrieve inventory items',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  async getInventoryItem(id: string): Promise<POSResponse<InventoryItem>> {
    const allItems = await this.getInventoryItems();
    if (!allItems.success) return allItems as any;
    
    const item = allItems.data!.find(item => item.id === id);
    if (!item) {
      return {
        success: false,
        error: {
          code: 'TOAST_INVENTORY_ITEM_NOT_FOUND',
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
    // Toast doesn't support direct inventory updates via API
    return {
      success: false,
      error: {
        code: 'TOAST_INVENTORY_UPDATE_NOT_SUPPORTED',
        message: 'Inventory level updates not supported by Toast API',
        timestamp: new Date()
      }
    };
  }

  async getInventoryAlerts(): Promise<POSResponse<InventoryItem[]>> {
    const allItems = await this.getInventoryItems();
    if (!allItems.success) return allItems as any;
    
    const alertItems = allItems.data!.filter(item => 
      item.currentStock <= (item.alertThreshold || item.minimumStock)
    );

    return {
      success: true,
      data: alertItems
    };
  }

  // Employee and shift management
  async getEmployees(): Promise<POSResponse<Employee[]>> {
    try {
      const response = await this.apiClient.get('/employees');
      
      const employees: Employee[] = response.data.map((emp: any) => ({
        id: emp.guid,
        name: `${emp.firstName} ${emp.lastName}`,
        email: emp.email,
        role: this.mapToastEmployeeRole(emp.role),
        hourlyRate: emp.hourlyWage,
        isActive: emp.isActive,
        hireDate: new Date(emp.hireDate),
        lastLogin: emp.lastLogin ? new Date(emp.lastLogin) : undefined
      }));

      return {
        success: true,
        data: employees
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_EMPLOYEES_ERROR',
          message: 'Failed to retrieve employees',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  async getEmployee(id: string): Promise<POSResponse<Employee>> {
    try {
      const response = await this.apiClient.get(`/employees/${id}`);
      
      const employee: Employee = {
        id: response.data.guid,
        name: `${response.data.firstName} ${response.data.lastName}`,
        email: response.data.email,
        role: this.mapToastEmployeeRole(response.data.role),
        hourlyRate: response.data.hourlyWage,
        isActive: response.data.isActive,
        hireDate: new Date(response.data.hireDate),
        lastLogin: response.data.lastLogin ? new Date(response.data.lastLogin) : undefined
      };

      return {
        success: true,
        data: employee
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_EMPLOYEE_ERROR',
          message: 'Failed to retrieve employee',
          details: { error: error instanceof Error ? error.message : 'Unknown error', id },
          timestamp: new Date()
        }
      };
    }
  }

  async getEmployeeShifts(
    employeeId?: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<POSResponse<EmployeeShift[]>> {
    try {
      const params = new URLSearchParams();
      if (employeeId) params.append('employeeId', employeeId);
      if (startDate) params.append('startDate', startDate.toISOString().split('T')[0]);
      if (endDate) params.append('endDate', endDate.toISOString().split('T')[0]);

      const response = await this.apiClient.get(`/timesheets?${params.toString()}`);
      
      const shifts: EmployeeShift[] = response.data.map((shift: any) => ({
        id: shift.guid,
        employeeId: shift.employeeGuid,
        startTime: new Date(shift.clockInTime),
        endTime: shift.clockOutTime ? new Date(shift.clockOutTime) : undefined,
        breakDuration: shift.breakDuration,
        hoursWorked: shift.hoursWorked,
        totalPay: shift.totalPay,
        status: shift.clockOutTime ? 'completed' : 'active'
      }));

      return {
        success: true,
        data: shifts
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_SHIFTS_ERROR',
          message: 'Failed to retrieve employee shifts',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  async startShift(employeeId: string): Promise<POSResponse<EmployeeShift>> {
    try {
      const shiftData = {
        employeeGuid: employeeId,
        clockInTime: new Date().toISOString()
      };

      const response = await this.apiClient.post('/timesheets', shiftData);
      
      const shift: EmployeeShift = {
        id: response.data.guid,
        employeeId,
        startTime: new Date(response.data.clockInTime),
        status: 'active'
      };

      return {
        success: true,
        data: shift
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_START_SHIFT_ERROR',
          message: 'Failed to start employee shift',
          details: { error: error instanceof Error ? error.message : 'Unknown error', employeeId },
          timestamp: new Date()
        }
      };
    }
  }

  async endShift(shiftId: string): Promise<POSResponse<EmployeeShift>> {
    try {
      const updateData = {
        clockOutTime: new Date().toISOString()
      };

      const response = await this.apiClient.put(`/timesheets/${shiftId}`, updateData);
      
      const shift: EmployeeShift = {
        id: response.data.guid,
        employeeId: response.data.employeeGuid,
        startTime: new Date(response.data.clockInTime),
        endTime: new Date(response.data.clockOutTime),
        hoursWorked: response.data.hoursWorked,
        totalPay: response.data.totalPay,
        status: 'completed'
      };

      return {
        success: true,
        data: shift
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_END_SHIFT_ERROR',
          message: 'Failed to end employee shift',
          details: { error: error instanceof Error ? error.message : 'Unknown error', shiftId },
          timestamp: new Date()
        }
      };
    }
  }

  // Order management
  async getOrders(
    status?: OrderStatus,
    startDate?: Date,
    endDate?: Date,
    limit: number = 100
  ): Promise<POSResponse<Order[]>> {
    try {
      const params = new URLSearchParams({ limit: limit.toString() });
      if (startDate) params.append('startDate', startDate.toISOString().split('T')[0]);
      if (endDate) params.append('endDate', endDate.toISOString().split('T')[0]);
      if (status) params.append('status', this.mapToToastOrderStatus(status));

      const response = await this.apiClient.get(`/orders?${params.toString()}`);
      
      const orders: Order[] = response.data.map((order: any) => this.mapToastOrderToOrder(order));

      return {
        success: true,
        data: orders
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_ORDERS_ERROR',
          message: 'Failed to retrieve orders',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  async getOrder(id: string): Promise<POSResponse<Order>> {
    try {
      const response = await this.apiClient.get(`/orders/${id}`);
      const order = this.mapToastOrderToOrder(response.data);

      return {
        success: true,
        data: order
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_ORDER_ERROR',
          message: 'Failed to retrieve order',
          details: { error: error instanceof Error ? error.message : 'Unknown error', id },
          timestamp: new Date()
        }
      };
    }
  }

  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<POSResponse<Order>> {
    try {
      const toastOrder = this.mapOrderToToastOrder(order);
      const response = await this.apiClient.post('/orders', toastOrder);
      
      const createdOrder: Order = {
        ...order,
        id: response.data.guid,
        createdAt: new Date(response.data.date),
        updatedAt: new Date(response.data.date)
      };

      return {
        success: true,
        data: createdOrder
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_CREATE_ORDER_ERROR',
          message: 'Failed to create order',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<POSResponse<Order>> {
    try {
      const toastStatus = this.mapToToastOrderStatus(status);
      const response = await this.apiClient.put(`/orders/${id}`, { status: toastStatus });
      
      const updatedOrder = await this.getOrder(id);
      return updatedOrder;
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_UPDATE_ORDER_STATUS_ERROR',
          message: 'Failed to update order status',
          details: { error: error instanceof Error ? error.message : 'Unknown error', id, status },
          timestamp: new Date()
        }
      };
    }
  }

  async cancelOrder(id: string, reason?: string): Promise<POSResponse<Order>> {
    try {
      const response = await this.apiClient.put(`/orders/${id}`, { 
        status: 'CANCELLED',
        cancelReason: reason 
      });
      
      const cancelledOrder = await this.getOrder(id);
      return cancelledOrder;
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_CANCEL_ORDER_ERROR',
          message: 'Failed to cancel order',
          details: { error: error instanceof Error ? error.message : 'Unknown error', id, reason },
          timestamp: new Date()
        }
      };
    }
  }

  // Transaction processing
  async processPayment(
    orderId: string,
    amount: number,
    method: PaymentMethod,
    customerInfo?: Record<string, any>
  ): Promise<POSResponse<PaymentResult>> {
    try {
      const paymentData = {
        orderGuid: orderId,
        amount,
        paymentMethod: this.mapToToastPaymentMethod(method),
        customerInfo
      };

      const response = await this.apiClient.post('/payments', paymentData);
      
      const paymentResult: PaymentResult = {
        success: response.data.status === 'APPROVED',
        transactionId: response.data.transactionId,
        authCode: response.data.authCode,
        receipt: response.data.receiptData
      };

      if (!paymentResult.success) {
        paymentResult.error = response.data.declineReason || 'Payment declined';
      }

      return {
        success: true,
        data: paymentResult
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_PROCESS_PAYMENT_ERROR',
          message: 'Failed to process payment',
          details: { error: error instanceof Error ? error.message : 'Unknown error', orderId, amount, method },
          timestamp: new Date()
        }
      };
    }
  }

  async refundTransaction(
    transactionId: string,
    amount?: number,
    reason?: string
  ): Promise<POSResponse<Transaction>> {
    try {
      const refundData = {
        transactionId,
        amount,
        reason
      };

      const response = await this.apiClient.post('/refunds', refundData);
      
      const refundTransaction: Transaction = {
        id: response.data.refundId,
        orderId: response.data.orderGuid,
        amount: -(response.data.amount || 0),
        method: this.mapToastPaymentMethod(response.data.paymentMethod),
        timestamp: new Date(response.data.date),
        status: TransactionStatus.REFUNDED,
        refundAmount: response.data.amount,
        refundReason: reason
      };

      return {
        success: true,
        data: refundTransaction
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_REFUND_ERROR',
          message: 'Failed to process refund',
          details: { error: error instanceof Error ? error.message : 'Unknown error', transactionId, amount, reason },
          timestamp: new Date()
        }
      };
    }
  }

  // Real-time synchronization
  async syncData(): Promise<POSResponse<{ menuItems: number; inventory: number; orders: number; transactions: number; }>> {
    try {
      const [menuItems, orders, transactions] = await Promise.all([
        this.getMenuItems(),
        this.getOrders(),
        this.getTransactions()
      ]);

      let menuItemCount = 0;
      let orderCount = 0;
      let transactionCount = 0;

      if (menuItems.success) menuItemCount = menuItems.data!.length;
      if (orders.success) orderCount = orders.data!.length;
      if (transactions.success) transactionCount = transactions.data!.length;

      return {
        success: true,
        data: {
          menuItems: menuItemCount,
          inventory: 0, // Toast doesn't have comprehensive inventory
          orders: orderCount,
          transactions: transactionCount
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'TOAST_SYNC_ERROR',
          message: 'Failed to sync data',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  // Helper methods for mapping Toast-specific data formats
  private mapToastPaymentMethod(method: string): PaymentMethod {
    const methodMap: Record<string, PaymentMethod> = {
      'CASH': PaymentMethod.CASH,
      'CREDIT_CARD': PaymentMethod.CREDIT_CARD,
      'DEBIT_CARD': PaymentMethod.DEBIT_CARD,
      'MOBILE_PAYMENT': PaymentMethod.MOBILE_PAYMENT,
      'GIFT_CARD': PaymentMethod.GIFT_CARD
    };
    return methodMap[method] || PaymentMethod.CREDIT_CARD;
  }

  private mapToToastPaymentMethod(method: PaymentMethod): string {
    const methodMap: Record<PaymentMethod, string> = {
      [PaymentMethod.CASH]: 'CASH',
      [PaymentMethod.CREDIT_CARD]: 'CREDIT_CARD',
      [PaymentMethod.DEBIT_CARD]: 'DEBIT_CARD',
      [PaymentMethod.MOBILE_PAYMENT]: 'MOBILE_PAYMENT',
      [PaymentMethod.GIFT_CARD]: 'GIFT_CARD'
    };
    return methodMap[method] || 'CREDIT_CARD';
  }

  private mapToastTransactionStatus(status: string): TransactionStatus {
    const statusMap: Record<string, TransactionStatus> = {
      'COMPLETED': TransactionStatus.COMPLETED,
      'FAILED': TransactionStatus.FAILED,
      'PENDING': TransactionStatus.PENDING,
      'REFUNDED': TransactionStatus.REFUNDED
    };
    return statusMap[status] || TransactionStatus.PENDING;
  }

  private mapToastEmployeeRole(role: string): any {
    const roleMap: Record<string, any> = {
      'MANAGER': 'manager',
      'CASHIER': 'cashier',
      'COOK': 'cook',
      'SERVER': 'waiter',
      'ADMIN': 'admin'
    };
    return roleMap[role] || 'cashier';
  }

  private mapToastOrderToOrder(toastOrder: any): Order {
    return {
      id: toastOrder.guid,
      orderNumber: toastOrder.displayNumber,
      customerId: toastOrder.customer?.guid,
      customerName: toastOrder.customer?.name,
      items: toastOrder.selections?.map((selection: any) => ({
        id: selection.guid,
        menuItemId: selection.item.guid,
        quantity: selection.quantity,
        unitPrice: selection.price,
        totalPrice: selection.price * selection.quantity,
        modifiers: selection.modifiers?.map((mod: any) => ({
          modifierId: mod.guid,
          optionId: mod.option?.guid,
          name: mod.name,
          price: mod.price
        })) || [],
        specialInstructions: selection.notes
      })) || [],
      subtotal: toastOrder.subtotal,
      tax: toastOrder.tax,
      tip: toastOrder.tip,
      total: toastOrder.totalAmount,
      status: this.mapToastOrderStatus(toastOrder.status),
      orderType: this.mapToastOrderType(toastOrder.orderType),
      tableNumber: toastOrder.table?.name,
      notes: toastOrder.notes,
      createdAt: new Date(toastOrder.date),
      updatedAt: new Date(toastOrder.lastModified || toastOrder.date),
      fulfillmentTime: toastOrder.fulfillmentTime ? new Date(toastOrder.fulfillmentTime) : undefined,
      estimatedCompletionTime: toastOrder.estimatedCompletionTime ? new Date(toastOrder.estimatedCompletionTime) : undefined
    };
  }

  private mapToastOrderStatus(status: string): OrderStatus {
    const statusMap: Record<string, OrderStatus> = {
      'NEW': OrderStatus.PENDING,
      'OPEN': OrderStatus.CONFIRMED,
      'IN_PROGRESS': OrderStatus.PREPARING,
      'READY': OrderStatus.READY,
      'CLOSED': OrderStatus.DELIVERED,
      'CANCELLED': OrderStatus.CANCELLED
    };
    return statusMap[status] || OrderStatus.PENDING;
  }

  private mapToToastOrderStatus(status: OrderStatus): string {
    const statusMap: Record<OrderStatus, string> = {
      [OrderStatus.PENDING]: 'NEW',
      [OrderStatus.CONFIRMED]: 'OPEN',
      [OrderStatus.PREPARING]: 'IN_PROGRESS',
      [OrderStatus.READY]: 'READY',
      [OrderStatus.DELIVERED]: 'CLOSED',
      [OrderStatus.CANCELLED]: 'CANCELLED'
    };
    return statusMap[status] || 'NEW';
  }

  private mapToastOrderType(type: string): 'dine_in' | 'takeout' | 'delivery' {
    const typeMap: Record<string, 'dine_in' | 'takeout' | 'delivery'> = {
      'DINE_IN': 'dine_in',
      'TO_GO': 'takeout',
      'DELIVERY': 'delivery'
    };
    return typeMap[type] || 'dine_in';
  }

  private mapOrderToToastOrder(order: any): any {
    return {
      displayNumber: order.orderNumber,
      customer: order.customerId ? { guid: order.customerId } : undefined,
      selections: order.items?.map((item: any) => ({
        item: { guid: item.menuItemId },
        quantity: item.quantity,
        price: item.unitPrice,
        notes: item.specialInstructions,
        modifiers: item.modifiers?.map((mod: any) => ({
          guid: mod.modifierId,
          option: { guid: mod.optionId }
        }))
      })),
      orderType: this.mapToToastOrderType(order.orderType),
      table: order.tableNumber ? { name: order.tableNumber } : undefined,
      notes: order.notes
    };
  }

  private mapToToastOrderType(type: 'dine_in' | 'takeout' | 'delivery'): string {
    const typeMap: Record<'dine_in' | 'takeout' | 'delivery', string> = {
      'dine_in': 'DINE_IN',
      'takeout': 'TO_GO',
      'delivery': 'DELIVERY'
    };
    return typeMap[type] || 'DINE_IN';
  }

  private async getMenuGroupGuid(categoryName: string): Promise<string> {
    try {
      const response = await this.apiClient.get('/menu/groups');
      const group = response.data.find((g: any) => g.name === categoryName);
      return group?.guid || 'default-group-guid';
    } catch {
      return 'default-group-guid';
    }
  }
}

/**
 * Toast API Client for handling HTTP requests
 */
class ToastAPIClient {
  private config: POSConfig;
  private baseHeaders: Record<string, string>;

  constructor(config: POSConfig) {
    this.config = config;
    this.baseHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
      'Toast-Restaurant-External-ID': config.apiSecret || ''
    };
  }

  async get(endpoint: string): Promise<any> {
    return this.request('GET', endpoint);
  }

  async post(endpoint: string, data?: any): Promise<any> {
    return this.request('POST', endpoint, data);
  }

  async put(endpoint: string, data?: any): Promise<any> {
    return this.request('PUT', endpoint, data);
  }

  async delete(endpoint: string): Promise<any> {
    return this.request('DELETE', endpoint);
  }

  private async request(method: string, endpoint: string, data?: any): Promise<any> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: this.baseHeaders,
      signal: AbortSignal.timeout(this.config.timeout || 30000)
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    let lastError: Error | null = null;
    const maxRetries = this.config.retryAttempts || 3;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const responseData = await response.json();
        return {
          status: response.status,
          data: responseData
        };
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        if (attempt < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    throw lastError;
  }
}