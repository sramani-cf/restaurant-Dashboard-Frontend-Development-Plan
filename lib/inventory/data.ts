import type {
  InventoryItem,
  Supplier,
  PurchaseOrder,
  WasteLog,
  StockCount,
  StockMovement,
  InventoryAlert,
  ProductCategory,
  Location,
  UnitOfMeasurement,
  WasteReason,
  Recipe,
  InventoryMetrics,
  InventoryFilters,
  PurchaseOrderFilters,
  WasteLogFilters,
  InventoryResponse,
  SupplierResponse,
  PurchaseOrderResponse,
  BarcodeLog,
  ScanSession,
} from './types';

// Mock data for development - replace with actual API calls
export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Main Kitchen',
    address: '123 Main St, City, State 12345',
    type: 'main',
    isActive: true,
  },
  {
    id: '2',
    name: 'Prep Kitchen',
    address: '456 Prep Ave, City, State 12345',
    type: 'prep_kitchen',
    isActive: true,
  },
  {
    id: '3',
    name: 'Dry Storage',
    address: '789 Storage Rd, City, State 12345',
    type: 'warehouse',
    isActive: true,
  },
];

export const mockUnitsOfMeasurement: UnitOfMeasurement[] = [
  { id: '1', name: 'Kilogram', abbreviation: 'kg', type: 'weight', conversionFactor: 1 },
  { id: '2', name: 'Gram', abbreviation: 'g', type: 'weight', baseUnit: '1', conversionFactor: 0.001 },
  { id: '3', name: 'Pound', abbreviation: 'lb', type: 'weight', baseUnit: '1', conversionFactor: 0.453592 },
  { id: '4', name: 'Liter', abbreviation: 'L', type: 'volume', conversionFactor: 1 },
  { id: '5', name: 'Milliliter', abbreviation: 'ml', type: 'volume', baseUnit: '4', conversionFactor: 0.001 },
  { id: '6', name: 'Piece', abbreviation: 'pcs', type: 'count', conversionFactor: 1 },
];

export const mockCategories: ProductCategory[] = [
  {
    id: '1',
    name: 'Proteins',
    description: 'Meat, poultry, fish, and seafood',
    color: '#ef4444',
    icon: '🥩',
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: '2',
    name: 'Vegetables',
    description: 'Fresh vegetables and herbs',
    color: '#22c55e',
    icon: '🥬',
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: '3',
    name: 'Dairy',
    description: 'Milk, cheese, butter, and dairy products',
    color: '#3b82f6',
    icon: '🧀',
    sortOrder: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: '4',
    name: 'Dry Goods',
    description: 'Flour, rice, pasta, and pantry staples',
    color: '#f59e0b',
    icon: '🌾',
    sortOrder: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: '5',
    name: 'Beverages',
    description: 'Drinks and beverage ingredients',
    color: '#8b5cf6',
    icon: '🥤',
    sortOrder: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
];

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Fresh Foods Distributors',
    code: 'FFD001',
    email: 'orders@freshfoods.com',
    phone: '+1-555-0123',
    website: 'https://freshfoods.com',
    address: {
      street: '123 Distribution Way',
      city: 'Foodtown',
      state: 'CA',
      zipCode: '90210',
      country: 'USA',
    },
    contacts: [
      {
        name: 'John Smith',
        email: 'john.smith@freshfoods.com',
        phone: '+1-555-0124',
        role: 'Sales Representative',
      },
    ],
    paymentTerms: 'Net 30',
    deliveryTerms: 'FOB Destination',
    minimumOrderValue: 500,
    leadTimeDays: 2,
    rating: 4,
    notes: 'Reliable supplier for fresh produce',
    taxId: '12-3456789',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: '2',
    name: 'Premium Meats Co.',
    code: 'PMC001',
    email: 'sales@premiummeats.com',
    phone: '+1-555-0456',
    paymentTerms: 'Net 15',
    leadTimeDays: 1,
    rating: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    contacts: [],
  },
  {
    id: '3',
    name: 'Dairy Delights Inc.',
    code: 'DDI001',
    email: 'orders@dairydelights.com',
    phone: '+1-555-0789',
    paymentTerms: 'Net 30',
    leadTimeDays: 3,
    rating: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    contacts: [],
  },
];

export const mockWasteReasons: WasteReason[] = [
  {
    id: '1',
    name: 'Expired',
    description: 'Product reached expiration date',
    category: 'expired',
    color: '#ef4444',
  },
  {
    id: '2',
    name: 'Spoiled',
    description: 'Product spoiled before expiration',
    category: 'spoiled',
    color: '#f97316',
  },
  {
    id: '3',
    name: 'Damaged in Transit',
    description: 'Product damaged during delivery',
    category: 'damaged',
    color: '#eab308',
  },
  {
    id: '4',
    name: 'Overproduction',
    description: 'Prepared too much food',
    category: 'overproduction',
    color: '#06b6d4',
  },
  {
    id: '5',
    name: 'Preparation Error',
    description: 'Mistake during food preparation',
    category: 'preparation',
    color: '#8b5cf6',
  },
];

// Mock inventory items
export const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Chicken Breast',
    description: 'Fresh boneless chicken breast',
    sku: 'CHKBRST001',
    barcode: '1234567890123',
    categoryId: '1',
    primaryUnit: '1', // kg
    costPrice: 8.50,
    averageCost: 8.75,
    sellPrice: 15.00,
    currentStock: 25.5,
    minimumStock: 10.0,
    reorderPoint: 15.0,
    reorderQuantity: 50.0,
    storageLocation: 'Walk-in Cooler A',
    storageTemperature: 'refrigerated',
    shelfLife: 5,
    expirationTracking: true,
    supplierId: '2',
    supplierName: 'Premium Meats Co.',
    supplierSku: 'PM-CHKB-001',
    trackExpiration: true,
    trackBatches: true,
    allergens: [],
    menuItemIds: ['burger-1', 'salad-1'],
    isPerishable: true,
    locationStock: [
      {
        locationId: '1',
        quantity: 25.5,
        reservedQuantity: 5.0,
        lastUpdated: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: '2',
    name: 'Tomatoes',
    description: 'Fresh Roma tomatoes',
    sku: 'TOM001',
    categoryId: '2',
    primaryUnit: '1', // kg
    costPrice: 3.25,
    currentStock: 15.8,
    minimumStock: 5.0,
    reorderPoint: 8.0,
    supplierId: '1',
    supplierName: 'Fresh Foods Distributors',
    isPerishable: true,
    trackExpiration: true,
    shelfLife: 7,
    storageTemperature: 'room_temp',
    menuItemIds: ['burger-1', 'salad-1', 'pizza-1'],
    locationStock: [
      {
        locationId: '1',
        quantity: 15.8,
        reservedQuantity: 2.0,
        lastUpdated: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    allergens: [],
  },
  {
    id: '3',
    name: 'Mozzarella Cheese',
    description: 'Whole milk mozzarella cheese',
    sku: 'MOZZ001',
    categoryId: '3',
    primaryUnit: '1', // kg
    costPrice: 12.00,
    currentStock: 8.2,
    minimumStock: 3.0,
    reorderPoint: 5.0,
    supplierId: '3',
    supplierName: 'Dairy Delights Inc.',
    isPerishable: true,
    trackExpiration: true,
    shelfLife: 14,
    storageTemperature: 'refrigerated',
    allergens: ['dairy'],
    menuItemIds: ['pizza-1', 'lasagna-1'],
    locationStock: [
      {
        locationId: '1',
        quantity: 8.2,
        reservedQuantity: 1.5,
        lastUpdated: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: '4',
    name: 'All-Purpose Flour',
    description: '50lb bag of all-purpose flour',
    sku: 'FLOUR001',
    categoryId: '4',
    primaryUnit: '1', // kg
    costPrice: 18.50,
    currentStock: 125.0,
    minimumStock: 50.0,
    reorderPoint: 75.0,
    supplierId: '1',
    supplierName: 'Fresh Foods Distributors',
    isPerishable: false,
    trackExpiration: false,
    storageTemperature: 'room_temp',
    allergens: ['gluten'],
    menuItemIds: ['pizza-1', 'bread-1'],
    locationStock: [
      {
        locationId: '3',
        quantity: 125.0,
        reservedQuantity: 10.0,
        lastUpdated: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: '5',
    name: 'Ground Beef 80/20',
    description: 'Fresh ground beef 80% lean',
    sku: 'BEEF001',
    categoryId: '1',
    primaryUnit: '1', // kg
    costPrice: 7.50,
    currentStock: 2.5, // Low stock alert
    minimumStock: 10.0,
    reorderPoint: 15.0,
    supplierId: '2',
    supplierName: 'Premium Meats Co.',
    isPerishable: true,
    trackExpiration: true,
    shelfLife: 3,
    storageTemperature: 'refrigerated',
    allergens: [],
    menuItemIds: ['burger-1', 'tacos-1'],
    locationStock: [
      {
        locationId: '1',
        quantity: 2.5,
        reservedQuantity: 1.0,
        lastUpdated: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
];

// Data access functions
export async function getInventoryItems(filters?: InventoryFilters): Promise<InventoryResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredItems = [...mockInventoryItems];
  
  if (filters) {
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.sku?.toLowerCase().includes(searchTerm) ||
        item.description?.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.categoryId) {
      filteredItems = filteredItems.filter(item => item.categoryId === filters.categoryId);
    }
    
    if (filters.supplierId) {
      filteredItems = filteredItems.filter(item => item.supplierId === filters.supplierId);
    }
    
    if (filters.lowStock) {
      filteredItems = filteredItems.filter(item => item.currentStock <= item.minimumStock);
    }
    
    if (filters.outOfStock) {
      filteredItems = filteredItems.filter(item => item.currentStock <= 0);
    }
    
    if (filters.status) {
      if (filters.status === 'active') {
        filteredItems = filteredItems.filter(item => item.isActive);
      } else if (filters.status === 'inactive') {
        filteredItems = filteredItems.filter(item => !item.isActive);
      } else if (filters.status === 'discontinued') {
        filteredItems = filteredItems.filter(item => item.isDiscontinued);
      }
    }
  }
  
  return {
    data: filteredItems,
    total: filteredItems.length,
    page: 1,
    limit: 50,
  };
}

export async function getInventoryItem(id: string): Promise<InventoryItem | null> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockInventoryItems.find(item => item.id === id) || null;
}

export async function getSuppliers(): Promise<SupplierResponse> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return {
    data: mockSuppliers,
    total: mockSuppliers.length,
    page: 1,
    limit: 50,
  };
}

export async function getSupplier(id: string): Promise<Supplier | null> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockSuppliers.find(supplier => supplier.id === id) || null;
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockCategories;
}

export async function getLocations(): Promise<Location[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockLocations;
}

export async function getUnitsOfMeasurement(): Promise<UnitOfMeasurement[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockUnitsOfMeasurement;
}

export async function getWasteReasons(): Promise<WasteReason[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockWasteReasons;
}

// Purchase Orders
export async function getPurchaseOrders(filters?: PurchaseOrderFilters): Promise<PurchaseOrderResponse> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const mockPOs: PurchaseOrder[] = [
    {
      id: '1',
      orderNumber: 'PO-2024-001',
      supplierId: '1',
      supplierName: 'Fresh Foods Distributors',
      locationId: '1',
      status: 'confirmed',
      orderDate: new Date('2024-01-15'),
      expectedDeliveryDate: new Date('2024-01-17'),
      subtotal: 450.00,
      taxAmount: 36.00,
      totalAmount: 486.00,
      items: [
        {
          id: '1',
          itemId: '2',
          itemName: 'Tomatoes',
          quantity: 20,
          unitCost: 3.25,
          totalCost: 65.00,
          receivedQuantity: 20,
        },
        {
          id: '2',
          itemId: '4',
          itemName: 'All-Purpose Flour',
          quantity: 5,
          unitCost: 18.50,
          totalCost: 92.50,
          receivedQuantity: 5,
        },
      ],
      requestedBy: 'user-1',
      approvedBy: 'manager-1',
      approvalDate: new Date('2024-01-15'),
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-17'),
      isActive: true,
    },
    {
      id: '2',
      orderNumber: 'PO-2024-002',
      supplierId: '2',
      supplierName: 'Premium Meats Co.',
      locationId: '1',
      status: 'draft',
      orderDate: new Date(),
      expectedDeliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      subtotal: 425.00,
      taxAmount: 34.00,
      totalAmount: 459.00,
      items: [
        {
          id: '3',
          itemId: '1',
          itemName: 'Chicken Breast',
          quantity: 50,
          unitCost: 8.50,
          totalCost: 425.00,
          receivedQuantity: 0,
        },
      ],
      requestedBy: 'user-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
  ];
  
  return {
    data: mockPOs,
    total: mockPOs.length,
    page: 1,
    limit: 50,
  };
}

// Waste Logs
export async function getWasteLogs(filters?: WasteLogFilters): Promise<WasteLog[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const mockWasteLogs: WasteLog[] = [
    {
      id: '1',
      itemId: '2',
      itemName: 'Tomatoes',
      locationId: '1',
      quantity: 2.5,
      unitCost: 3.25,
      totalCost: 8.13,
      reasonId: '2',
      reasonName: 'Spoiled',
      description: 'Tomatoes showed signs of overripening',
      wasteDate: new Date(),
      reportedBy: 'user-1',
      isApproved: true,
      approvedBy: 'manager-1',
      preventable: true,
      actionTaken: 'Adjusted storage temperature',
      photos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
  ];
  
  return mockWasteLogs;
}

// Stock Movements
export async function getStockMovements(itemId?: string): Promise<StockMovement[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const mockMovements: StockMovement[] = [
    {
      id: '1',
      itemId: '1',
      locationId: '1',
      type: 'purchase',
      quantity: 50,
      unitCost: 8.50,
      totalCost: 425.00,
      referenceId: 'PO-2024-002',
      referenceType: 'purchase_order',
      reason: 'Purchase order receipt',
      userId: 'user-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: '2',
      itemId: '1',
      locationId: '1',
      type: 'consumption',
      quantity: -5,
      referenceId: 'order-123',
      referenceType: 'sales_order',
      reason: 'Menu item preparation',
      userId: 'kitchen-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
  ];
  
  return itemId 
    ? mockMovements.filter(movement => movement.itemId === itemId)
    : mockMovements;
}

// Inventory Alerts
export async function getInventoryAlerts(): Promise<InventoryAlert[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const mockAlerts: InventoryAlert[] = [
    {
      id: '1',
      type: 'low_stock',
      itemId: '5',
      itemName: 'Ground Beef 80/20',
      locationId: '1',
      severity: 'high',
      message: 'Ground Beef 80/20 is below minimum stock level (2.5 kg remaining)',
      currentValue: 2.5,
      thresholdValue: 10.0,
      isAcknowledged: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: '2',
      type: 'expiring',
      itemId: '1',
      itemName: 'Chicken Breast',
      locationId: '1',
      severity: 'medium',
      message: 'Chicken Breast batch expires in 2 days',
      expirationDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      isAcknowledged: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
  ];
  
  return mockAlerts;
}

// Inventory Metrics
export async function getInventoryMetrics(): Promise<InventoryMetrics> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const items = mockInventoryItems;
  const totalValue = items.reduce((sum, item) => sum + (item.currentStock * item.costPrice), 0);
  const lowStockItems = items.filter(item => item.currentStock <= item.minimumStock).length;
  const outOfStockItems = items.filter(item => item.currentStock <= 0).length;
  
  return {
    totalValue,
    totalItems: items.length,
    lowStockItems,
    outOfStockItems,
    expiringItems: 5, // Mock value
    wasteValue: 847.23, // Mock value for this week
    turnoverRate: 12.5, // Mock annual turnover
    averageDaysToTurnover: 29, // Mock average
  };
}

// Barcode functions
export async function lookupItemByBarcode(barcode: string): Promise<InventoryItem | null> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate barcode scanning delay
  return mockInventoryItems.find(item => item.barcode === barcode) || null;
}

export async function logBarcodeScans(logs: Omit<BarcodeLog, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>[]): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300));
  // In real implementation, this would save to database
  console.log('Barcode scans logged:', logs);
}

// Stock Count functions
export async function getStockCounts(): Promise<StockCount[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const mockStockCounts: StockCount[] = [
    {
      id: '1',
      name: 'Weekly Inventory Count - Week 3',
      type: 'full',
      locationId: '1',
      status: 'completed',
      scheduledDate: new Date('2024-01-21'),
      startDate: new Date('2024-01-21T08:00:00'),
      completedDate: new Date('2024-01-21T12:30:00'),
      items: [
        {
          id: '1',
          itemId: '1',
          itemName: 'Chicken Breast',
          expectedQuantity: 25.5,
          countedQuantity: 24.8,
          variance: -0.7,
          varianceValue: -5.95,
          countedBy: 'user-1',
        },
        {
          id: '2',
          itemId: '2',
          itemName: 'Tomatoes',
          expectedQuantity: 15.8,
          countedQuantity: 16.2,
          variance: 0.4,
          varianceValue: 1.30,
          countedBy: 'user-1',
        },
      ],
      totalVariance: -0.3,
      totalVarianceValue: -4.65,
      assignedTo: ['user-1'],
      supervisedBy: 'manager-1',
      requiresApproval: true,
      approvedBy: 'manager-1',
      approvalDate: new Date('2024-01-21T13:00:00'),
      createdAt: new Date('2024-01-21'),
      updatedAt: new Date('2024-01-21T13:00:00'),
      isActive: true,
    },
  ];
  
  return mockStockCounts;
}

// Recipe costing
export async function getRecipes(): Promise<Recipe[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const mockRecipes: Recipe[] = [
    {
      id: '1',
      name: 'Classic Burger',
      menuItemId: 'burger-1',
      servingSize: 1,
      servings: 1,
      ingredients: [
        {
          itemId: '5',
          itemName: 'Ground Beef 80/20',
          quantity: 0.15, // 150g
          unit: 'kg',
          cost: 1.13,
        },
        {
          itemId: '2',
          itemName: 'Tomatoes',
          quantity: 0.05, // 50g
          unit: 'kg',
          cost: 0.16,
        },
      ],
      totalCost: 1.29,
      costPerServing: 1.29,
      targetCostPercent: 25,
      instructions: '1. Form burger patty\n2. Grill to medium\n3. Add toppings',
      prepTime: 5,
      cookTime: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
  ];
  
  return mockRecipes;
}

// CRUD Operations for various entities
export async function createInventoryItem(item: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<InventoryItem> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newItem: InventoryItem = {
    ...item,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  // In real implementation, save to database
  return newItem;
}

export async function updateInventoryItem(id: string, updates: Partial<InventoryItem>): Promise<InventoryItem> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const item = mockInventoryItems.find(i => i.id === id);
  if (!item) {
    throw new Error('Item not found');
  }
  
  const updatedItem: InventoryItem = {
    ...item,
    ...updates,
    updatedAt: new Date(),
  };
  
  return updatedItem;
}

export async function deleteInventoryItem(id: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300));
  // In real implementation, soft delete in database
}

// Similar CRUD operations would be implemented for suppliers, purchase orders, etc.
export async function createSupplier(supplier: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>): Promise<Supplier> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newSupplier: Supplier = {
    ...supplier,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  return newSupplier;
}

export async function createPurchaseOrder(po: Omit<PurchaseOrder, 'id' | 'createdAt' | 'updatedAt'>): Promise<PurchaseOrder> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newPO: PurchaseOrder = {
    ...po,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  return newPO;
}

export async function createWasteLog(waste: Omit<WasteLog, 'id' | 'createdAt' | 'updatedAt' | 'totalCost'>): Promise<WasteLog> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newWaste: WasteLog = {
    ...waste,
    id: Math.random().toString(36).substr(2, 9),
    totalCost: waste.quantity * waste.unitCost,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  return newWaste;
}

// Export all mock data for use in components
export {
  mockInventoryItems,
  mockSuppliers,
  mockCategories,
  mockLocations,
  mockUnitsOfMeasurement,
  mockWasteReasons,
};