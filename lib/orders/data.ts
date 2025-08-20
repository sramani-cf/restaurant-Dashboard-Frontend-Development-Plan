// Order data layer with mock data
import {
  Order,
  OrderStatus,
  OrderType,
  PaymentStatus,
  PaymentMethod,
  OrderFilters,
  OrderStats,
  OrderListItem,
  CreateOrder,
  OrderUpdate,
  RefundRequest,
  OrderSummary,
  OrderTimelineEvent
} from './types';

// Mock data generation
const generateMockOrders = (count: number = 100): Order[] => {
  const orders: Order[] = [];
  const now = new Date();
  
  const customerNames = [
    'John Smith', 'Emma Johnson', 'Michael Brown', 'Sarah Davis',
    'Robert Wilson', 'Lisa Anderson', 'David Martinez', 'Jennifer Taylor',
    'Chris Lee', 'Amanda White', 'James Harris', 'Maria Garcia'
  ];
  
  const menuItems = [
    { id: 'item-1', name: 'Classic Burger', price: 12.99, station: 'grill' },
    { id: 'item-2', name: 'Caesar Salad', price: 9.99, station: 'cold' },
    { id: 'item-3', name: 'Margherita Pizza', price: 14.99, station: 'oven' },
    { id: 'item-4', name: 'Grilled Salmon', price: 22.99, station: 'grill' },
    { id: 'item-5', name: 'Chicken Alfredo', price: 16.99, station: 'saute' },
    { id: 'item-6', name: 'Ribeye Steak', price: 32.99, station: 'grill' },
    { id: 'item-7', name: 'Fish Tacos', price: 13.99, station: 'fryer' },
    { id: 'item-8', name: 'Veggie Wrap', price: 10.99, station: 'cold' }
  ];

  const statuses = Object.values(OrderStatus);
  const types = Object.values(OrderType);
  const paymentMethods = Object.values(PaymentMethod);
  
  for (let i = 0; i < count; i++) {
    const createdAt = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const customerName = customerNames[Math.floor(Math.random() * customerNames.length)];
    
    // Generate items
    const itemCount = Math.floor(Math.random() * 4) + 1;
    const items = [];
    let subtotal = 0;
    
    for (let j = 0; j < itemCount; j++) {
      const menuItem = menuItems[Math.floor(Math.random() * menuItems.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const totalPrice = menuItem.price * quantity;
      subtotal += totalPrice;
      
      items.push({
        id: `order-item-${i}-${j}`,
        menuItemId: menuItem.id,
        menuItemName: menuItem.name,
        quantity,
        unitPrice: menuItem.price,
        totalPrice,
        modifiers: [],
        status: status === OrderStatus.COMPLETED ? 'served' as const : 
                status === OrderStatus.READY ? 'ready' as const :
                status === OrderStatus.PREPARING ? 'preparing' as const : 
                'pending' as const,
        prepTime: Math.floor(Math.random() * 20) + 10,
        station: menuItem.station
      });
    }
    
    const tax = subtotal * 0.08;
    const tip = type === OrderType.DINE_IN ? subtotal * (Math.random() * 0.1 + 0.15) : 0;
    const discount = Math.random() > 0.8 ? subtotal * 0.1 : 0;
    const total = subtotal + tax + tip - discount;
    
    // Generate timeline
    const timeline: OrderTimelineEvent[] = [
      {
        id: `timeline-${i}-1`,
        timestamp: createdAt.toISOString(),
        event: 'Order Created',
        description: `Order #${1000 + i} created`,
        user: 'System'
      }
    ];
    
    if (status !== OrderStatus.PENDING) {
      timeline.push({
        id: `timeline-${i}-2`,
        timestamp: new Date(createdAt.getTime() + 60000).toISOString(),
        event: 'Order Confirmed',
        description: 'Order confirmed by kitchen',
        user: 'Kitchen Staff'
      });
    }
    
    if ([OrderStatus.PREPARING, OrderStatus.READY, OrderStatus.COMPLETED, OrderStatus.DELIVERED].includes(status)) {
      timeline.push({
        id: `timeline-${i}-3`,
        timestamp: new Date(createdAt.getTime() + 120000).toISOString(),
        event: 'Preparation Started',
        description: 'Kitchen started preparing order',
        user: 'Chef Mike'
      });
    }
    
    if ([OrderStatus.READY, OrderStatus.COMPLETED, OrderStatus.DELIVERED].includes(status)) {
      timeline.push({
        id: `timeline-${i}-4`,
        timestamp: new Date(createdAt.getTime() + 900000).toISOString(),
        event: 'Order Ready',
        description: 'Order ready for pickup/delivery',
        user: 'Chef Mike'
      });
    }
    
    orders.push({
      id: `order-${i}`,
      orderNumber: `#${1000 + i}`,
      status,
      type,
      customerId: `customer-${Math.floor(Math.random() * 50)}`,
      customerName,
      customerPhone: `555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      customerEmail: `${customerName.toLowerCase().replace(' ', '.')}@email.com`,
      tableNumber: type === OrderType.DINE_IN ? `T${Math.floor(Math.random() * 20) + 1}` : undefined,
      items,
      subtotal,
      tax,
      tip,
      discount,
      total,
      paymentStatus: status === OrderStatus.COMPLETED || status === OrderStatus.DELIVERED ? 
        PaymentStatus.COMPLETED : 
        status === OrderStatus.CANCELLED ? PaymentStatus.FAILED :
        status === OrderStatus.REFUNDED ? PaymentStatus.REFUNDED :
        PaymentStatus.PENDING,
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      paymentDetails: status === OrderStatus.COMPLETED || status === OrderStatus.DELIVERED ? {
        transactionId: `txn-${Date.now()}-${i}`,
        lastFourDigits: String(Math.floor(Math.random() * 10000)).padStart(4, '0'),
        cardBrand: 'Visa',
        authorizationCode: `AUTH${Math.floor(Math.random() * 1000000)}`,
        amount: total,
        tip: tip
      } : undefined,
      notes: Math.random() > 0.7 ? 'No onions please' : undefined,
      createdAt: createdAt.toISOString(),
      updatedAt: new Date(createdAt.getTime() + Math.random() * 3600000).toISOString(),
      confirmedAt: status !== OrderStatus.PENDING ? 
        new Date(createdAt.getTime() + 60000).toISOString() : undefined,
      prepStartedAt: [OrderStatus.PREPARING, OrderStatus.READY, OrderStatus.COMPLETED, OrderStatus.DELIVERED].includes(status) ?
        new Date(createdAt.getTime() + 120000).toISOString() : undefined,
      readyAt: [OrderStatus.READY, OrderStatus.COMPLETED, OrderStatus.DELIVERED].includes(status) ?
        new Date(createdAt.getTime() + 900000).toISOString() : undefined,
      completedAt: [OrderStatus.COMPLETED, OrderStatus.DELIVERED].includes(status) ?
        new Date(createdAt.getTime() + 1200000).toISOString() : undefined,
      deliveredAt: status === OrderStatus.DELIVERED ?
        new Date(createdAt.getTime() + 2400000).toISOString() : undefined,
      cancelledAt: status === OrderStatus.CANCELLED ?
        new Date(createdAt.getTime() + 300000).toISOString() : undefined,
      refundedAt: status === OrderStatus.REFUNDED ?
        new Date(createdAt.getTime() + 86400000).toISOString() : undefined,
      estimatedReadyTime: status === OrderStatus.PREPARING ?
        new Date(Date.now() + 900000).toISOString() : undefined,
      assignedStaff: type === OrderType.DINE_IN ? [{
        id: `staff-${Math.floor(Math.random() * 10)}`,
        name: ['Alice', 'Bob', 'Carol', 'Dave'][Math.floor(Math.random() * 4)],
        role: 'server' as const,
        assignedAt: createdAt.toISOString()
      }] : undefined,
      deliveryInfo: type === OrderType.DELIVERY ? {
        address: `${Math.floor(Math.random() * 9999) + 1} Main St`,
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94101',
        instructions: 'Leave at door',
        driverId: `driver-${Math.floor(Math.random() * 5)}`,
        driverName: ['Tom', 'Jerry', 'Mike'][Math.floor(Math.random() * 3)],
        estimatedDeliveryTime: new Date(createdAt.getTime() + 2400000).toISOString(),
        actualDeliveryTime: status === OrderStatus.DELIVERED ?
          new Date(createdAt.getTime() + 2400000).toISOString() : undefined,
        deliveryFee: 4.99,
        distance: Math.random() * 5 + 1
      } : undefined,
      timeline,
      posOrderId: `pos-${Date.now()}-${i}`,
      source: ['pos', 'online', 'phone', 'kiosk'][Math.floor(Math.random() * 4)] as any,
      thirdPartyProvider: Math.random() > 0.7 ? 'DoorDash' : undefined
    });
  }
  
  return orders;
};

// Cache for mock data
let cachedOrders: Order[] | null = null;

// API Functions
export async function getOrders(filters?: OrderFilters): Promise<Order[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!cachedOrders) {
    cachedOrders = generateMockOrders(100);
  }
  
  let filtered = [...cachedOrders];
  
  if (filters) {
    if (filters.status?.length) {
      filtered = filtered.filter(o => filters.status!.includes(o.status));
    }
    if (filters.type?.length) {
      filtered = filtered.filter(o => filters.type!.includes(o.type));
    }
    if (filters.paymentStatus?.length) {
      filtered = filtered.filter(o => filters.paymentStatus!.includes(o.paymentStatus));
    }
    if (filters.dateRange) {
      const start = new Date(filters.dateRange.start);
      const end = new Date(filters.dateRange.end);
      filtered = filtered.filter(o => {
        const orderDate = new Date(o.createdAt);
        return orderDate >= start && orderDate <= end;
      });
    }
    if (filters.customerId) {
      filtered = filtered.filter(o => o.customerId === filters.customerId);
    }
    if (filters.tableNumber) {
      filtered = filtered.filter(o => o.tableNumber === filters.tableNumber);
    }
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(o => 
        o.orderNumber.toLowerCase().includes(term) ||
        o.customerName?.toLowerCase().includes(term) ||
        o.customerEmail?.toLowerCase().includes(term) ||
        o.customerPhone?.includes(term)
      );
    }
    if (filters.minAmount !== undefined) {
      filtered = filtered.filter(o => o.total >= filters.minAmount!);
    }
    if (filters.maxAmount !== undefined) {
      filtered = filtered.filter(o => o.total <= filters.maxAmount!);
    }
  }
  
  // Sort by creation date, newest first
  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  return filtered;
}

export async function getOrder(id: string): Promise<Order | null> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!cachedOrders) {
    cachedOrders = generateMockOrders(100);
  }
  
  return cachedOrders.find(o => o.id === id) || null;
}

export async function getOrderListItems(filters?: OrderFilters): Promise<OrderListItem[]> {
  const orders = await getOrders(filters);
  
  return orders.map(order => ({
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    type: order.type,
    customerName: order.customerName,
    tableNumber: order.tableNumber,
    total: order.total,
    itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
    createdAt: order.createdAt,
    estimatedReadyTime: order.estimatedReadyTime,
    paymentStatus: order.paymentStatus,
    source: order.source
  }));
}

export async function getOrderStats(dateRange?: { start: string; end: string }): Promise<OrderStats> {
  const orders = await getOrders(dateRange ? { dateRange } : undefined);
  
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayOrders = orders.filter(o => new Date(o.createdAt) >= todayStart);
  
  // Calculate peak hours
  const hourCounts: Record<number, number> = {};
  orders.forEach(order => {
    const hour = new Date(order.createdAt).getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });
  
  const peakHours = Object.entries(hourCounts)
    .map(([hour, count]) => ({ hour: parseInt(hour), orders: count }))
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 5);
  
  // Calculate stats by status
  const ordersByStatus = {} as Record<OrderStatus, number>;
  Object.values(OrderStatus).forEach(status => {
    ordersByStatus[status] = orders.filter(o => o.status === status).length;
  });
  
  // Calculate stats by type
  const ordersByType = {} as Record<OrderType, number>;
  Object.values(OrderType).forEach(type => {
    ordersByType[type] = orders.filter(o => o.type === type).length;
  });
  
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const todayRevenue = todayOrders.reduce((sum, o) => sum + o.total, 0);
  const refundedAmount = orders
    .filter(o => o.status === OrderStatus.REFUNDED)
    .reduce((sum, o) => sum + o.total, 0);
  
  const completedOrders = orders.filter(o => 
    [OrderStatus.COMPLETED, OrderStatus.DELIVERED].includes(o.status)
  );
  
  const averagePrepTime = completedOrders.length > 0 ?
    completedOrders.reduce((sum, o) => {
      if (o.prepStartedAt && o.readyAt) {
        return sum + (new Date(o.readyAt).getTime() - new Date(o.prepStartedAt).getTime());
      }
      return sum;
    }, 0) / completedOrders.length / 60000 : 0; // Convert to minutes
  
  return {
    totalOrders: orders.length,
    totalRevenue,
    averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
    ordersByStatus,
    ordersByType,
    todayOrders: todayOrders.length,
    todayRevenue,
    pendingOrders: ordersByStatus[OrderStatus.PENDING] || 0,
    preparingOrders: ordersByStatus[OrderStatus.PREPARING] || 0,
    readyOrders: ordersByStatus[OrderStatus.READY] || 0,
    completedOrders: ordersByStatus[OrderStatus.COMPLETED] || 0,
    cancelledOrders: ordersByStatus[OrderStatus.CANCELLED] || 0,
    refundedAmount,
    averagePrepTime,
    peakHours
  };
}

export async function createOrder(data: CreateOrder): Promise<Order> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!cachedOrders) {
    cachedOrders = generateMockOrders(100);
  }
  
  const newOrder: Order = {
    id: `order-${Date.now()}`,
    orderNumber: `#${1000 + cachedOrders.length}`,
    status: OrderStatus.PENDING,
    type: data.type,
    customerId: data.customerId,
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    customerEmail: data.customerEmail,
    tableNumber: data.tableNumber,
    items: data.items.map((item, index) => ({
      id: `item-${Date.now()}-${index}`,
      menuItemId: item.menuItemId,
      menuItemName: `Item ${item.menuItemId}`, // Would be looked up from menu
      quantity: item.quantity,
      unitPrice: 15.99, // Would be looked up from menu
      totalPrice: 15.99 * item.quantity,
      modifiers: [],
      specialInstructions: item.specialInstructions,
      status: 'pending' as const,
      prepTime: 15,
      station: 'grill'
    })),
    subtotal: 0, // Calculate from items
    tax: 0,
    tip: 0,
    discount: 0,
    total: 0,
    paymentStatus: PaymentStatus.PENDING,
    paymentMethod: data.paymentMethod,
    notes: data.notes,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    timeline: [{
      id: `timeline-${Date.now()}`,
      timestamp: new Date().toISOString(),
      event: 'Order Created',
      description: 'New order created',
      user: 'System'
    }],
    source: 'pos',
    deliveryInfo: data.deliveryInfo as any
  };
  
  // Calculate totals
  newOrder.subtotal = newOrder.items.reduce((sum, item) => sum + item.totalPrice, 0);
  newOrder.tax = newOrder.subtotal * 0.08;
  newOrder.total = newOrder.subtotal + newOrder.tax;
  
  cachedOrders.unshift(newOrder);
  return newOrder;
}

export async function updateOrder(id: string, updates: OrderUpdate): Promise<Order | null> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!cachedOrders) {
    cachedOrders = generateMockOrders(100);
  }
  
  const orderIndex = cachedOrders.findIndex(o => o.id === id);
  if (orderIndex === -1) return null;
  
  const order = { ...cachedOrders[orderIndex] };
  
  if (updates.status) {
    order.status = updates.status;
    order.timeline.push({
      id: `timeline-${Date.now()}`,
      timestamp: new Date().toISOString(),
      event: 'Status Updated',
      description: `Order status changed to ${updates.status}`,
      user: 'Staff'
    });
  }
  
  if (updates.paymentStatus) {
    order.paymentStatus = updates.paymentStatus;
  }
  
  if (updates.notes !== undefined) {
    order.notes = updates.notes;
  }
  
  if (updates.estimatedReadyTime) {
    order.estimatedReadyTime = updates.estimatedReadyTime;
  }
  
  order.updatedAt = new Date().toISOString();
  cachedOrders[orderIndex] = order;
  
  return order;
}

export async function cancelOrder(id: string, reason: string): Promise<Order | null> {
  return updateOrder(id, {
    status: OrderStatus.CANCELLED,
    notes: reason
  });
}

export async function processRefund(orderId: string, request: RefundRequest): Promise<Order | null> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const order = await getOrder(orderId);
  if (!order) return null;
  
  return updateOrder(orderId, {
    status: OrderStatus.REFUNDED,
    paymentStatus: PaymentStatus.REFUNDED,
    notes: `Refund processed: ${request.reason}`
  });
}

export async function getOrderSummary(date: string): Promise<OrderSummary> {
  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);
  
  const orders = await getOrders({
    dateRange: {
      start: startDate.toISOString(),
      end: endDate.toISOString()
    }
  });
  
  // Calculate top items
  const itemCounts: Record<string, { name: string; quantity: number; revenue: number }> = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      if (!itemCounts[item.menuItemId]) {
        itemCounts[item.menuItemId] = {
          name: item.menuItemName,
          quantity: 0,
          revenue: 0
        };
      }
      itemCounts[item.menuItemId].quantity += item.quantity;
      itemCounts[item.menuItemId].revenue += item.totalPrice;
    });
  });
  
  const topItems = Object.entries(itemCounts)
    .map(([id, data]) => ({
      itemId: id,
      itemName: data.name,
      quantity: data.quantity,
      revenue: data.revenue
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);
  
  // Calculate hourly distribution
  const hourlyData: Record<number, { orders: number; revenue: number }> = {};
  for (let hour = 0; hour < 24; hour++) {
    hourlyData[hour] = { orders: 0, revenue: 0 };
  }
  
  orders.forEach(order => {
    const hour = new Date(order.createdAt).getHours();
    hourlyData[hour].orders++;
    hourlyData[hour].revenue += order.total;
  });
  
  const hourlyDistribution = Object.entries(hourlyData)
    .map(([hour, data]) => ({
      hour: parseInt(hour),
      orders: data.orders,
      revenue: data.revenue
    }));
  
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  
  return {
    date,
    orderCount: orders.length,
    revenue: totalRevenue,
    averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
    topItems,
    hourlyDistribution
  };
}