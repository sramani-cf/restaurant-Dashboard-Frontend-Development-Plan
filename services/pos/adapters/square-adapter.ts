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
 * Square POS Adapter Implementation
 * 
 * This adapter provides integration with Square POS system using their comprehensive API.
 * Square offers robust APIs for payments, inventory, catalog, and team management.
 * 
 * API Documentation: https://developer.squareup.com/docs
 */
export class SquareAdapter implements IPOSAdapter {
  private config: POSConfig;
  private connectionStatus: ConnectionStatus;
  private apiClient: SquareAPIClient;

  constructor(config: POSConfig) {
    if (config.provider !== POSProvider.SQUARE) {
      throw new Error('Invalid provider for SquareAdapter');
    }

    this.config = {
      ...config,
      baseUrl: config.baseUrl || (config.environment === 'production' 
        ? 'https://connect.squareup.com' 
        : 'https://connect.squareupsandbox.com'),
      timeout: config.timeout || 30000,
      retryAttempts: config.retryAttempts || 3
    };

    this.connectionStatus = {
      isConnected: false
    };

    this.apiClient = new SquareAPIClient(this.config);
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
        code: 'SQUARE_CONNECTION_ERROR',
        message: 'Failed to connect to Square POS',
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
      const response = await this.apiClient.get('/v2/locations');
      
      if (response.status === 200 && response.data.locations) {
        return {
          success: true,
          data: true
        };
      }

      return {
        success: false,
        error: {
          code: 'SQUARE_CONNECTION_FAILED',
          message: 'Connection test failed',
          timestamp: new Date()
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_CONNECTION_ERROR',
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
      const startAt = startDate.toISOString();
      const endAt = endDate.toISOString();

      const [ordersResponse, paymentsResponse] = await Promise.all([
        this.apiClient.post('/v2/orders/search', {
          filter: {
            date_time_filter: {
              created_at: {
                start_at: startAt,
                end_at: endAt
              }
            },
            state_filter: {
              states: ['COMPLETED']
            }
          },
          limit: 500
        }),
        this.apiClient.post('/v2/payments/search', {
          filter: {
            date_time_filter: {
              created_at: {
                start_at: startAt,
                end_at: endAt
              }
            }
          },
          limit: 500
        })
      ]);

      const orders = ordersResponse.data.orders || [];
      const payments = paymentsResponse.data.payments || [];

      const totalRevenue = payments.reduce((sum: number, payment: any) => 
        sum + (payment.amount_money?.amount || 0) / 100, 0);

      const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

      // Calculate top-selling items
      const itemSales: Record<string, { name: string; quantity: number; revenue: number }> = {};
      
      orders.forEach((order: any) => {
        order.line_items?.forEach((lineItem: any) => {
          const itemId = lineItem.catalog_object_id || lineItem.variation_name || 'unknown';
          const name = lineItem.name || lineItem.variation_name || 'Unknown Item';
          const quantity = parseInt(lineItem.quantity) || 1;
          const revenue = (lineItem.total_money?.amount || 0) / 100;

          if (!itemSales[itemId]) {
            itemSales[itemId] = { name, quantity: 0, revenue: 0 };
          }
          itemSales[itemId].quantity += quantity;
          itemSales[itemId].revenue += revenue;
        });
      });

      const topSellingItems = Object.entries(itemSales)
        .map(([menuItemId, data]) => ({ menuItemId, ...data }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 10);

      // Calculate payment method breakdown
      const paymentMethodCounts: Record<string, { count: number; total: number }> = {};
      
      payments.forEach((payment: any) => {
        const method = this.mapSquarePaymentMethod(payment.source_type);
        const amount = (payment.amount_money?.amount || 0) / 100;

        if (!paymentMethodCounts[method]) {
          paymentMethodCounts[method] = { count: 0, total: 0 };
        }
        paymentMethodCounts[method].count += 1;
        paymentMethodCounts[method].total += amount;
      });

      const paymentMethodBreakdown = Object.entries(paymentMethodCounts)
        .map(([method, data]) => ({ method: method as PaymentMethod, ...data }));

      const salesData: SalesData = {
        period,
        startDate,
        endDate,
        totalRevenue,
        totalTransactions: payments.length,
        averageOrderValue,
        topSellingItems,
        paymentMethodBreakdown
      };

      return {
        success: true,
        data: salesData
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_SALES_DATA_ERROR',
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
      const searchBody: any = {
        limit,
        filter: {}
      };

      if (startDate || endDate) {
        searchBody.filter.date_time_filter = {
          created_at: {}
        };
        if (startDate) searchBody.filter.date_time_filter.created_at.start_at = startDate.toISOString();
        if (endDate) searchBody.filter.date_time_filter.created_at.end_at = endDate.toISOString();
      }

      const response = await this.apiClient.post('/v2/payments/search', searchBody);
      
      const transactions: Transaction[] = (response.data.payments || []).map((payment: any) => ({
        id: payment.id,
        orderId: payment.order_id,
        amount: (payment.amount_money?.amount || 0) / 100,
        method: this.mapSquarePaymentMethod(payment.source_type),
        timestamp: new Date(payment.created_at),
        status: this.mapSquareTransactionStatus(payment.status),
        reference: payment.reference_id,
        tip: payment.tip_money ? (payment.tip_money.amount / 100) : undefined,
        refundAmount: payment.refunded_money ? (payment.refunded_money.amount / 100) : undefined,
        metadata: {
          squarePaymentId: payment.id,
          locationId: payment.location_id
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
          code: 'SQUARE_TRANSACTIONS_ERROR',
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
      const response = await this.apiClient.get('/v2/catalog/list?types=ITEM');
      
      const menuItems: MenuItem[] = (response.data.objects || []).map((item: any) => {
        const itemData = item.item_data;
        const variation = itemData.variations?.[0]?.item_variation_data;
        
        return {
          id: item.id,
          name: itemData.name,
          description: itemData.description,
          price: variation?.price_money ? (variation.price_money.amount / 100) : 0,
          category: itemData.category_id || 'Other',
          isAvailable: !itemData.is_deleted && variation?.available_for_booking !== false,
          allergens: [],
          modifiers: itemData.modifier_list_info?.map((modInfo: any) => ({
            id: modInfo.modifier_list_id,
            name: modInfo.modifier_list_name || '',
            price: 0,
            category: 'modifier',
            isRequired: modInfo.min_selected_modifiers > 0,
            options: []
          })) || [],
          image: itemData.image_ids?.[0],
          preparationTime: itemData.prep_time_duration ? parseInt(itemData.prep_time_duration) / 60000 : undefined
        };
      });

      return {
        success: true,
        data: menuItems
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_MENU_ITEMS_ERROR',
          message: 'Failed to retrieve menu items',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  async getMenuItem(id: string): Promise<POSResponse<MenuItem>> {
    try {
      const response = await this.apiClient.get(`/v2/catalog/object/${id}`);
      
      const item = response.data.object;
      const itemData = item.item_data;
      const variation = itemData.variations?.[0]?.item_variation_data;
      
      const menuItem: MenuItem = {
        id: item.id,
        name: itemData.name,
        description: itemData.description,
        price: variation?.price_money ? (variation.price_money.amount / 100) : 0,
        category: itemData.category_id || 'Other',
        isAvailable: !itemData.is_deleted && variation?.available_for_booking !== false,
        allergens: [],
        modifiers: itemData.modifier_list_info?.map((modInfo: any) => ({
          id: modInfo.modifier_list_id,
          name: modInfo.modifier_list_name || '',
          price: 0,
          category: 'modifier',
          isRequired: modInfo.min_selected_modifiers > 0,
          options: []
        })) || [],
        image: itemData.image_ids?.[0],
        preparationTime: itemData.prep_time_duration ? parseInt(itemData.prep_time_duration) / 60000 : undefined
      };

      return {
        success: true,
        data: menuItem
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_MENU_ITEM_ERROR',
          message: 'Failed to retrieve menu item',
          details: { error: error instanceof Error ? error.message : 'Unknown error', id },
          timestamp: new Date()
        }
      };
    }
  }

  async createMenuItem(item: Omit<MenuItem, 'id'>): Promise<POSResponse<MenuItem>> {
    try {
      const catalogObject = {
        type: 'ITEM',
        id: `#${Date.now()}`,
        item_data: {
          name: item.name,
          description: item.description,
          category_id: item.category,
          variations: [{
            type: 'ITEM_VARIATION',
            id: `#${Date.now()}-variation`,
            item_variation_data: {
              name: item.name,
              pricing_type: 'FIXED_PRICING',
              price_money: {
                amount: Math.round(item.price * 100),
                currency: 'USD'
              },
              available_for_booking: item.isAvailable
            }
          }]
        }
      };

      const response = await this.apiClient.post('/v2/catalog/batch-upsert', {
        idempotency_key: `create-item-${Date.now()}`,
        batches: [{
          objects: [catalogObject]
        }]
      });

      const createdObject = response.data.objects?.[0];
      const createdItem: MenuItem = {
        ...item,
        id: createdObject?.id || ''
      };

      return {
        success: true,
        data: createdItem
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_CREATE_MENU_ITEM_ERROR',
          message: 'Failed to create menu item',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  async updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<POSResponse<MenuItem>> {
    try {
      // First get the current item
      const currentItem = await this.getMenuItem(id);
      if (!currentItem.success) return currentItem as any;

      const catalogObject = {
        type: 'ITEM',
        id,
        version: await this.getObjectVersion(id),
        item_data: {
          name: updates.name || currentItem.data!.name,
          description: updates.description || currentItem.data!.description,
          variations: [{
            type: 'ITEM_VARIATION',
            id: `${id}-variation`,
            item_variation_data: {
              name: updates.name || currentItem.data!.name,
              pricing_type: 'FIXED_PRICING',
              price_money: {
                amount: Math.round((updates.price || currentItem.data!.price) * 100),
                currency: 'USD'
              },
              available_for_booking: updates.isAvailable !== undefined ? updates.isAvailable : currentItem.data!.isAvailable
            }
          }]
        }
      };

      const response = await this.apiClient.post('/v2/catalog/batch-upsert', {
        idempotency_key: `update-item-${id}-${Date.now()}`,
        batches: [{
          objects: [catalogObject]
        }]
      });

      const updatedItem = await this.getMenuItem(id);
      return updatedItem;
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_UPDATE_MENU_ITEM_ERROR',
          message: 'Failed to update menu item',
          details: { error: error instanceof Error ? error.message : 'Unknown error', id },
          timestamp: new Date()
        }
      };
    }
  }

  async deleteMenuItem(id: string): Promise<POSResponse<void>> {
    try {
      await this.apiClient.delete(`/v2/catalog/object/${id}`);
      
      return {
        success: true,
        data: undefined
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_DELETE_MENU_ITEM_ERROR',
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

  // Inventory management
  async getInventoryItems(): Promise<POSResponse<InventoryItem[]>> {
    try {
      const [catalogResponse, inventoryResponse] = await Promise.all([
        this.apiClient.get('/v2/catalog/list?types=ITEM_VARIATION'),
        this.apiClient.post('/v2/inventory/batch-retrieve-counts', {
          catalog_object_ids: [],
          location_ids: await this.getLocationIds()
        })
      ]);

      const variations = catalogResponse.data.objects || [];
      const inventoryCounts = inventoryResponse.data.counts || [];

      const inventoryMap = new Map(
        inventoryCounts.map((count: any) => [count.catalog_object_id, count])
      );

      const inventoryItems: InventoryItem[] = variations.map((variation: any) => {
        const variationData = variation.item_variation_data;
        const inventoryCount = inventoryMap.get(variation.id);
        
        return {
          id: variation.id,
          name: variationData.name,
          category: 'Food', // Square doesn't provide category at variation level
          currentStock: inventoryCount?.quantity ? parseInt(inventoryCount.quantity) : 0,
          minimumStock: 10, // Default value
          unit: 'each',
          cost: variationData.price_money ? (variationData.price_money.amount / 100) * 0.3 : 0,
          lastUpdated: inventoryCount?.calculated_at ? new Date(inventoryCount.calculated_at) : new Date(),
          alertThreshold: 15
        };
      });

      return {
        success: true,
        data: inventoryItems
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_INVENTORY_ERROR',
          message: 'Failed to retrieve inventory items',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  async getInventoryItem(id: string): Promise<POSResponse<InventoryItem>> {
    try {
      const [catalogResponse, inventoryResponse] = await Promise.all([
        this.apiClient.get(`/v2/catalog/object/${id}`),
        this.apiClient.post('/v2/inventory/batch-retrieve-counts', {
          catalog_object_ids: [id],
          location_ids: await this.getLocationIds()
        })
      ]);

      const variation = catalogResponse.data.object;
      const variationData = variation.item_variation_data;
      const inventoryCount = inventoryResponse.data.counts?.[0];
      
      const inventoryItem: InventoryItem = {
        id: variation.id,
        name: variationData.name,
        category: 'Food',
        currentStock: inventoryCount?.quantity ? parseInt(inventoryCount.quantity) : 0,
        minimumStock: 10,
        unit: 'each',
        cost: variationData.price_money ? (variationData.price_money.amount / 100) * 0.3 : 0,
        lastUpdated: inventoryCount?.calculated_at ? new Date(inventoryCount.calculated_at) : new Date(),
        alertThreshold: 15
      };

      return {
        success: true,
        data: inventoryItem
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_INVENTORY_ITEM_ERROR',
          message: 'Failed to retrieve inventory item',
          details: { error: error instanceof Error ? error.message : 'Unknown error', id },
          timestamp: new Date()
        }
      };
    }
  }

  async updateInventoryLevel(id: string, quantity: number): Promise<POSResponse<InventoryItem>> {
    try {
      const locationIds = await this.getLocationIds();
      
      const response = await this.apiClient.post('/v2/inventory/batch-change', {
        idempotency_key: `inventory-change-${id}-${Date.now()}`,
        changes: [{
          type: 'PHYSICAL_COUNT',
          physical_count: {
            catalog_object_id: id,
            state: 'IN_STOCK',
            location_id: locationIds[0],
            quantity: quantity.toString(),
            occurred_at: new Date().toISOString()
          }
        }]
      });

      const updatedItem = await this.getInventoryItem(id);
      return updatedItem;
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_UPDATE_INVENTORY_ERROR',
          message: 'Failed to update inventory level',
          details: { error: error instanceof Error ? error.message : 'Unknown error', id, quantity },
          timestamp: new Date()
        }
      };
    }
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
      const response = await this.apiClient.get('/v2/team/team-members');
      
      const employees: Employee[] = (response.data.team_members || []).map((member: any) => ({
        id: member.id,
        name: `${member.given_name || ''} ${member.family_name || ''}`.trim(),
        email: member.email_address,
        role: this.mapSquareEmployeeRole(member.status),
        isActive: member.status === 'ACTIVE',
        hireDate: member.created_at ? new Date(member.created_at) : new Date(),
        lastLogin: undefined // Square doesn't provide this
      }));

      return {
        success: true,
        data: employees
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_EMPLOYEES_ERROR',
          message: 'Failed to retrieve employees',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  async getEmployee(id: string): Promise<POSResponse<Employee>> {
    try {
      const response = await this.apiClient.get(`/v2/team/team-members/${id}`);
      
      const member = response.data.team_member;
      const employee: Employee = {
        id: member.id,
        name: `${member.given_name || ''} ${member.family_name || ''}`.trim(),
        email: member.email_address,
        role: this.mapSquareEmployeeRole(member.status),
        isActive: member.status === 'ACTIVE',
        hireDate: member.created_at ? new Date(member.created_at) : new Date(),
        lastLogin: undefined
      };

      return {
        success: true,
        data: employee
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_EMPLOYEE_ERROR',
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
      const searchBody: any = {
        limit: 100,
        query: {
          filter: {}
        }
      };

      if (employeeId) {
        searchBody.query.filter.team_member_ids = [employeeId];
      }

      if (startDate || endDate) {
        searchBody.query.filter.start_at = {};
        if (startDate) searchBody.query.filter.start_at.start_at = startDate.toISOString();
        if (endDate) searchBody.query.filter.start_at.end_at = endDate.toISOString();
      }

      const response = await this.apiClient.post('/v2/labor/shifts/search', searchBody);
      
      const shifts: EmployeeShift[] = (response.data.shifts || []).map((shift: any) => ({
        id: shift.id,
        employeeId: shift.team_member_id,
        startTime: new Date(shift.start_at),
        endTime: shift.end_at ? new Date(shift.end_at) : undefined,
        breakDuration: shift.breaks?.reduce((total: number, brk: any) => {
          const breakStart = new Date(brk.start_at);
          const breakEnd = brk.end_at ? new Date(brk.end_at) : new Date();
          return total + (breakEnd.getTime() - breakStart.getTime()) / (1000 * 60);
        }, 0),
        hoursWorked: shift.declared_cash_tip_money ? parseFloat(shift.declared_cash_tip_money.amount) / 100 : undefined,
        status: shift.end_at ? 'completed' : 'active'
      }));

      return {
        success: true,
        data: shifts
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_SHIFTS_ERROR',
          message: 'Failed to retrieve employee shifts',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  async startShift(employeeId: string): Promise<POSResponse<EmployeeShift>> {
    try {
      const locationIds = await this.getLocationIds();
      
      const shiftData = {
        team_member_id: employeeId,
        location_id: locationIds[0],
        start_at: new Date().toISOString()
      };

      const response = await this.apiClient.post('/v2/labor/shifts', {
        idempotency_key: `start-shift-${employeeId}-${Date.now()}`,
        shift: shiftData
      });
      
      const shift: EmployeeShift = {
        id: response.data.shift.id,
        employeeId,
        startTime: new Date(response.data.shift.start_at),
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
          code: 'SQUARE_START_SHIFT_ERROR',
          message: 'Failed to start employee shift',
          details: { error: error instanceof Error ? error.message : 'Unknown error', employeeId },
          timestamp: new Date()
        }
      };
    }
  }

  async endShift(shiftId: string): Promise<POSResponse<EmployeeShift>> {
    try {
      const currentShift = await this.apiClient.get(`/v2/labor/shifts/${shiftId}`);
      
      const updateData = {
        shift: {
          ...currentShift.data.shift,
          end_at: new Date().toISOString()
        }
      };

      const response = await this.apiClient.put(`/v2/labor/shifts/${shiftId}`, updateData);
      
      const shift: EmployeeShift = {
        id: response.data.shift.id,
        employeeId: response.data.shift.team_member_id,
        startTime: new Date(response.data.shift.start_at),
        endTime: new Date(response.data.shift.end_at),
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
          code: 'SQUARE_END_SHIFT_ERROR',
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
      const searchBody: any = {
        limit,
        filter: {}
      };

      if (startDate || endDate) {
        searchBody.filter.date_time_filter = {
          created_at: {}
        };
        if (startDate) searchBody.filter.date_time_filter.created_at.start_at = startDate.toISOString();
        if (endDate) searchBody.filter.date_time_filter.created_at.end_at = endDate.toISOString();
      }

      if (status) {
        searchBody.filter.state_filter = {
          states: [this.mapToSquareOrderStatus(status)]
        };
      }

      const response = await this.apiClient.post('/v2/orders/search', searchBody);
      
      const orders: Order[] = (response.data.orders || []).map((order: any) => 
        this.mapSquareOrderToOrder(order)
      );

      return {
        success: true,
        data: orders
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_ORDERS_ERROR',
          message: 'Failed to retrieve orders',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  async getOrder(id: string): Promise<POSResponse<Order>> {
    try {
      const response = await this.apiClient.get(`/v2/orders/${id}`);
      const order = this.mapSquareOrderToOrder(response.data.order);

      return {
        success: true,
        data: order
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_ORDER_ERROR',
          message: 'Failed to retrieve order',
          details: { error: error instanceof Error ? error.message : 'Unknown error', id },
          timestamp: new Date()
        }
      };
    }
  }

  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<POSResponse<Order>> {
    try {
      const locationIds = await this.getLocationIds();
      
      const squareOrder = {
        location_id: locationIds[0],
        reference_id: order.orderNumber,
        line_items: order.items.map(item => ({
          catalog_object_id: item.menuItemId,
          quantity: item.quantity.toString(),
          note: item.specialInstructions,
          modifiers: item.modifiers?.map(mod => ({
            catalog_object_id: mod.modifierId
          }))
        }))
      };

      const response = await this.apiClient.post('/v2/orders', {
        idempotency_key: `create-order-${Date.now()}`,
        order: squareOrder
      });
      
      const createdOrder: Order = {
        ...order,
        id: response.data.order.id,
        createdAt: new Date(response.data.order.created_at),
        updatedAt: new Date(response.data.order.updated_at)
      };

      return {
        success: true,
        data: createdOrder
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_CREATE_ORDER_ERROR',
          message: 'Failed to create order',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<POSResponse<Order>> {
    try {
      const squareStatus = this.mapToSquareOrderStatus(status);
      
      const response = await this.apiClient.put(`/v2/orders/${id}`, {
        order: {
          version: await this.getOrderVersion(id),
          state: squareStatus
        }
      });
      
      const updatedOrder = await this.getOrder(id);
      return updatedOrder;
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_UPDATE_ORDER_STATUS_ERROR',
          message: 'Failed to update order status',
          details: { error: error instanceof Error ? error.message : 'Unknown error', id, status },
          timestamp: new Date()
        }
      };
    }
  }

  async cancelOrder(id: string, reason?: string): Promise<POSResponse<Order>> {
    try {
      const response = await this.apiClient.put(`/v2/orders/${id}`, {
        order: {
          version: await this.getOrderVersion(id),
          state: 'CANCELED'
        }
      });
      
      const cancelledOrder = await this.getOrder(id);
      return cancelledOrder;
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_CANCEL_ORDER_ERROR',
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
      const locationIds = await this.getLocationIds();
      
      const paymentData = {
        source_id: this.getSquarePaymentSourceId(method),
        idempotency_key: `payment-${orderId}-${Date.now()}`,
        amount_money: {
          amount: Math.round(amount * 100),
          currency: 'USD'
        },
        order_id: orderId,
        location_id: locationIds[0],
        buyer_email_address: customerInfo?.email
      };

      const response = await this.apiClient.post('/v2/payments', paymentData);
      
      const paymentResult: PaymentResult = {
        success: response.data.payment.status === 'COMPLETED',
        transactionId: response.data.payment.id,
        receipt: response.data.payment.receipt_number,
        authCode: response.data.payment.card_details?.card?.fingerprint
      };

      if (!paymentResult.success) {
        paymentResult.error = 'Payment not completed';
      }

      return {
        success: true,
        data: paymentResult
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_PROCESS_PAYMENT_ERROR',
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
        idempotency_key: `refund-${transactionId}-${Date.now()}`,
        payment_id: transactionId,
        reason
      };

      if (amount) {
        refundData.amount_money = {
          amount: Math.round(amount * 100),
          currency: 'USD'
        };
      }

      const response = await this.apiClient.post('/v2/refunds', refundData);
      
      const refundTransaction: Transaction = {
        id: response.data.refund.id,
        orderId: response.data.refund.order_id,
        amount: -(response.data.refund.amount_money.amount / 100),
        method: PaymentMethod.CREDIT_CARD, // Default
        timestamp: new Date(response.data.refund.created_at),
        status: TransactionStatus.REFUNDED,
        refundAmount: response.data.refund.amount_money.amount / 100,
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
          code: 'SQUARE_REFUND_ERROR',
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
      const [menuItems, inventory, orders, transactions] = await Promise.all([
        this.getMenuItems(),
        this.getInventoryItems(),
        this.getOrders(),
        this.getTransactions()
      ]);

      let menuItemCount = 0;
      let inventoryCount = 0;
      let orderCount = 0;
      let transactionCount = 0;

      if (menuItems.success) menuItemCount = menuItems.data!.length;
      if (inventory.success) inventoryCount = inventory.data!.length;
      if (orders.success) orderCount = orders.data!.length;
      if (transactions.success) transactionCount = transactions.data!.length;

      return {
        success: true,
        data: {
          menuItems: menuItemCount,
          inventory: inventoryCount,
          orders: orderCount,
          transactions: transactionCount
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_SYNC_ERROR',
          message: 'Failed to sync data',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date()
        }
      };
    }
  }

  // Webhook management
  async registerWebhook(url: string, events: string[]): Promise<POSResponse<{ webhookId: string }>> {
    try {
      const webhookData = {
        subscription: {
          name: 'Restaurant Dashboard Webhook',
          event_types: events,
          notification_url: url,
          api_version: '2023-10-18'
        }
      };

      const response = await this.apiClient.post('/v2/webhooks/subscriptions', webhookData);
      
      return {
        success: true,
        data: {
          webhookId: response.data.subscription.id
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_WEBHOOK_REGISTER_ERROR',
          message: 'Failed to register webhook',
          details: { error: error instanceof Error ? error.message : 'Unknown error', url, events },
          timestamp: new Date()
        }
      };
    }
  }

  async unregisterWebhook(webhookId: string): Promise<POSResponse<void>> {
    try {
      await this.apiClient.delete(`/v2/webhooks/subscriptions/${webhookId}`);
      
      return {
        success: true,
        data: undefined
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQUARE_WEBHOOK_UNREGISTER_ERROR',
          message: 'Failed to unregister webhook',
          details: { error: error instanceof Error ? error.message : 'Unknown error', webhookId },
          timestamp: new Date()
        }
      };
    }
  }

  // Helper methods for mapping Square-specific data formats
  private mapSquarePaymentMethod(sourceType: string): PaymentMethod {
    const methodMap: Record<string, PaymentMethod> = {
      'CARD': PaymentMethod.CREDIT_CARD,
      'CASH': PaymentMethod.CASH,
      'EXTERNAL': PaymentMethod.MOBILE_PAYMENT,
      'BANK_ACCOUNT': PaymentMethod.DEBIT_CARD,
      'WALLET': PaymentMethod.MOBILE_PAYMENT,
      'BUY_NOW_PAY_LATER': PaymentMethod.CREDIT_CARD
    };
    return methodMap[sourceType] || PaymentMethod.CREDIT_CARD;
  }

  private getSquarePaymentSourceId(method: PaymentMethod): string {
    // In a real implementation, this would map to actual Square payment source IDs
    const sourceMap: Record<PaymentMethod, string> = {
      [PaymentMethod.CASH]: 'CASH',
      [PaymentMethod.CREDIT_CARD]: 'cnon:card-nonce-ok',
      [PaymentMethod.DEBIT_CARD]: 'cnon:card-nonce-ok',
      [PaymentMethod.MOBILE_PAYMENT]: 'cnon:apple-pay-nonce',
      [PaymentMethod.GIFT_CARD]: 'cnon:gift-card-nonce'
    };
    return sourceMap[method] || 'cnon:card-nonce-ok';
  }

  private mapSquareTransactionStatus(status: string): TransactionStatus {
    const statusMap: Record<string, TransactionStatus> = {
      'APPROVED': TransactionStatus.COMPLETED,
      'PENDING': TransactionStatus.PENDING,
      'COMPLETED': TransactionStatus.COMPLETED,
      'CANCELED': TransactionStatus.FAILED,
      'FAILED': TransactionStatus.FAILED
    };
    return statusMap[status] || TransactionStatus.PENDING;
  }

  private mapSquareEmployeeRole(status: string): any {
    // Square doesn't have detailed role information, so we use status
    const roleMap: Record<string, any> = {
      'ACTIVE': 'cashier',
      'INACTIVE': 'cashier'
    };
    return roleMap[status] || 'cashier';
  }

  private mapSquareOrderToOrder(squareOrder: any): Order {
    return {
      id: squareOrder.id,
      orderNumber: squareOrder.reference_id || squareOrder.id,
      customerId: squareOrder.customer_id,
      items: (squareOrder.line_items || []).map((lineItem: any) => ({
        id: lineItem.uid || lineItem.catalog_object_id,
        menuItemId: lineItem.catalog_object_id,
        quantity: parseInt(lineItem.quantity) || 1,
        unitPrice: lineItem.variation_total_price_money ? (lineItem.variation_total_price_money.amount / 100) : 0,
        totalPrice: lineItem.total_money ? (lineItem.total_money.amount / 100) : 0,
        modifiers: (lineItem.modifiers || []).map((mod: any) => ({
          modifierId: mod.catalog_object_id,
          optionId: mod.catalog_object_id,
          name: mod.name || '',
          price: mod.total_price_money ? (mod.total_price_money.amount / 100) : 0
        })),
        specialInstructions: lineItem.note
      })),
      subtotal: squareOrder.net_amounts?.base_money ? (squareOrder.net_amounts.base_money.amount / 100) : 0,
      tax: squareOrder.net_amounts?.tax_money ? (squareOrder.net_amounts.tax_money.amount / 100) : 0,
      tip: squareOrder.net_amounts?.tip_money ? (squareOrder.net_amounts.tip_money.amount / 100) : 0,
      total: squareOrder.net_amounts?.total_money ? (squareOrder.net_amounts.total_money.amount / 100) : 0,
      status: this.mapSquareOrderStatus(squareOrder.state),
      orderType: 'dine_in', // Square doesn't have explicit order types
      notes: squareOrder.note,
      createdAt: new Date(squareOrder.created_at),
      updatedAt: new Date(squareOrder.updated_at)
    };
  }

  private mapSquareOrderStatus(state: string): OrderStatus {
    const statusMap: Record<string, OrderStatus> = {
      'OPEN': OrderStatus.PENDING,
      'COMPLETED': OrderStatus.DELIVERED,
      'CANCELED': OrderStatus.CANCELLED
    };
    return statusMap[state] || OrderStatus.PENDING;
  }

  private mapToSquareOrderStatus(status: OrderStatus): string {
    const statusMap: Record<OrderStatus, string> = {
      [OrderStatus.PENDING]: 'OPEN',
      [OrderStatus.CONFIRMED]: 'OPEN',
      [OrderStatus.PREPARING]: 'OPEN',
      [OrderStatus.READY]: 'OPEN',
      [OrderStatus.DELIVERED]: 'COMPLETED',
      [OrderStatus.CANCELLED]: 'CANCELED'
    };
    return statusMap[status] || 'OPEN';
  }

  private async getLocationIds(): Promise<string[]> {
    try {
      const response = await this.apiClient.get('/v2/locations');
      return (response.data.locations || []).map((location: any) => location.id);
    } catch {
      return ['main']; // Fallback
    }
  }

  private async getObjectVersion(objectId: string): Promise<number> {
    try {
      const response = await this.apiClient.get(`/v2/catalog/object/${objectId}`);
      return response.data.object.version || 1;
    } catch {
      return 1; // Fallback
    }
  }

  private async getOrderVersion(orderId: string): Promise<number> {
    try {
      const response = await this.apiClient.get(`/v2/orders/${orderId}`);
      return response.data.order.version || 1;
    } catch {
      return 1; // Fallback
    }
  }
}

/**
 * Square API Client for handling HTTP requests
 */
class SquareAPIClient {
  private config: POSConfig;
  private baseHeaders: Record<string, string>;

  constructor(config: POSConfig) {
    this.config = config;
    this.baseHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
      'Square-Version': '2023-10-18'
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