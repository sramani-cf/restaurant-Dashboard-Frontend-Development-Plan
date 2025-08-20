import { z } from 'zod';

// Base types for common fields
export const BaseEntitySchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isActive: z.boolean().default(true),
});

// Location for multi-location inventory
export const LocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string().optional(),
  type: z.enum(['main', 'satellite', 'warehouse', 'prep_kitchen']).default('main'),
  isActive: z.boolean().default(true),
});

// Unit of measurement
export const UnitOfMeasurementSchema = z.object({
  id: z.string(),
  name: z.string(),
  abbreviation: z.string(),
  type: z.enum(['weight', 'volume', 'count', 'length', 'area']),
  baseUnit: z.string().optional(), // For conversion
  conversionFactor: z.number().default(1),
});

// Supplier information
export const SupplierContactSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  role: z.string().optional(),
});

export const SupplierSchema = BaseEntitySchema.extend({
  name: z.string(),
  code: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  contacts: z.array(SupplierContactSchema).default([]),
  paymentTerms: z.string().optional(),
  deliveryTerms: z.string().optional(),
  minimumOrderValue: z.number().optional(),
  leadTimeDays: z.number().optional(),
  rating: z.number().min(1).max(5).optional(),
  notes: z.string().optional(),
  taxId: z.string().optional(),
});

// Product categories
export const ProductCategorySchema = BaseEntitySchema.extend({
  name: z.string(),
  description: z.string().optional(),
  parentCategoryId: z.string().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
  sortOrder: z.number().default(0),
});

// Inventory item
export const InventoryItemSchema = BaseEntitySchema.extend({
  name: z.string(),
  description: z.string().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  categoryId: z.string().optional(),
  
  // Units and measurements
  primaryUnit: z.string(), // Unit ID
  secondaryUnit: z.string().optional(), // For conversion
  conversionFactor: z.number().default(1),
  
  // Pricing
  costPrice: z.number().min(0),
  averageCost: z.number().min(0).optional(),
  lastCostPrice: z.number().min(0).optional(),
  sellPrice: z.number().min(0).optional(),
  
  // Stock levels
  currentStock: z.number().min(0).default(0),
  minimumStock: z.number().min(0).default(0),
  maximumStock: z.number().min(0).optional(),
  reorderPoint: z.number().min(0).default(0),
  reorderQuantity: z.number().min(0).optional(),
  
  // Storage information
  storageLocation: z.string().optional(),
  storageTemperature: z.enum(['frozen', 'refrigerated', 'room_temp', 'controlled']).optional(),
  shelfLife: z.number().optional(), // in days
  expirationTracking: z.boolean().default(false),
  
  // Supplier information
  supplierId: z.string(),
  supplierSku: z.string().optional(),
  supplierName: z.string().optional(),
  
  // Tracking
  trackExpiration: z.boolean().default(false),
  trackBatches: z.boolean().default(false),
  trackSerialNumbers: z.boolean().default(false),
  
  // Nutritional and allergen info (for recipe costing)
  allergens: z.array(z.string()).default([]),
  nutritionalInfo: z.object({
    calories: z.number().optional(),
    protein: z.number().optional(),
    carbohydrates: z.number().optional(),
    fat: z.number().optional(),
  }).optional(),
  
  // Recipe relationships
  menuItemIds: z.array(z.string()).default([]), // Items that use this ingredient
  
  // Status and flags
  isPerishable: z.boolean().default(false),
  requiresApproval: z.boolean().default(false),
  isDiscontinued: z.boolean().default(false),
  
  // Location-specific stock
  locationStock: z.array(z.object({
    locationId: z.string(),
    quantity: z.number().min(0),
    reservedQuantity: z.number().min(0).default(0),
    lastUpdated: z.date(),
  })).default([]),
});

// Stock movement/transaction
export const StockMovementSchema = BaseEntitySchema.extend({
  itemId: z.string(),
  locationId: z.string(),
  type: z.enum([
    'purchase', 'sale', 'adjustment', 'transfer', 'waste', 
    'return', 'production', 'consumption', 'count'
  ]),
  quantity: z.number(),
  unitCost: z.number().optional(),
  totalCost: z.number().optional(),
  referenceId: z.string().optional(), // PO number, order ID, etc.
  referenceType: z.enum(['purchase_order', 'sales_order', 'adjustment', 'transfer', 'waste_log']).optional(),
  reason: z.string().optional(),
  notes: z.string().optional(),
  batchNumber: z.string().optional(),
  expirationDate: z.date().optional(),
  userId: z.string(), // Who performed the action
  approvedBy: z.string().optional(),
  isApproved: z.boolean().default(true),
});

// Purchase Order
export const PurchaseOrderItemSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  itemName: z.string(),
  sku: z.string().optional(),
  quantity: z.number().positive(),
  unitCost: z.number().positive(),
  totalCost: z.number().positive(),
  receivedQuantity: z.number().min(0).default(0),
  notes: z.string().optional(),
});

export const PurchaseOrderSchema = BaseEntitySchema.extend({
  orderNumber: z.string(),
  supplierId: z.string(),
  supplierName: z.string(),
  locationId: z.string(),
  status: z.enum(['draft', 'sent', 'confirmed', 'partial', 'received', 'cancelled']).default('draft'),
  
  // Dates
  orderDate: z.date(),
  expectedDeliveryDate: z.date().optional(),
  actualDeliveryDate: z.date().optional(),
  
  // Financial
  subtotal: z.number().min(0),
  taxAmount: z.number().min(0).default(0),
  shippingCost: z.number().min(0).default(0),
  discount: z.number().min(0).default(0),
  totalAmount: z.number().min(0),
  
  // Items
  items: z.array(PurchaseOrderItemSchema),
  
  // Workflow
  requestedBy: z.string(),
  approvedBy: z.string().optional(),
  receivedBy: z.string().optional(),
  approvalDate: z.date().optional(),
  
  // Additional info
  notes: z.string().optional(),
  terms: z.string().optional(),
  deliveryAddress: z.string().optional(),
  
  // Tracking
  invoiceNumber: z.string().optional(),
  trackingNumber: z.string().optional(),
});

// Waste logging
export const WasteReasonSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  category: z.enum(['expired', 'spoiled', 'damaged', 'overproduction', 'preparation', 'customer_return', 'other']),
  color: z.string().optional(),
});

export const WasteLogSchema = BaseEntitySchema.extend({
  itemId: z.string(),
  itemName: z.string(),
  locationId: z.string(),
  quantity: z.number().positive(),
  unitCost: z.number().positive(),
  totalCost: z.number().positive(),
  reasonId: z.string(),
  reasonName: z.string(),
  description: z.string().optional(),
  batchNumber: z.string().optional(),
  expirationDate: z.date().optional(),
  wasteDate: z.date(),
  reportedBy: z.string(),
  approvedBy: z.string().optional(),
  isApproved: z.boolean().default(false),
  photos: z.array(z.string()).default([]), // Photo URLs
  preventable: z.boolean().default(false),
  actionTaken: z.string().optional(),
});

// Stock count/audit
export const StockCountItemSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  itemName: z.string(),
  expectedQuantity: z.number(),
  countedQuantity: z.number(),
  variance: z.number(),
  varianceValue: z.number(),
  notes: z.string().optional(),
  countedBy: z.string(),
});

export const StockCountSchema = BaseEntitySchema.extend({
  name: z.string(),
  type: z.enum(['full', 'partial', 'spot_check', 'cycle']).default('full'),
  locationId: z.string(),
  status: z.enum(['scheduled', 'in_progress', 'completed', 'cancelled']).default('scheduled'),
  
  // Dates
  scheduledDate: z.date(),
  startDate: z.date().optional(),
  completedDate: z.date().optional(),
  
  // Scope
  categoryIds: z.array(z.string()).default([]),
  itemIds: z.array(z.string()).default([]),
  
  // Results
  items: z.array(StockCountItemSchema).default([]),
  totalVariance: z.number().default(0),
  totalVarianceValue: z.number().default(0),
  
  // People
  assignedTo: z.array(z.string()).default([]),
  supervisedBy: z.string().optional(),
  
  // Settings
  requiresApproval: z.boolean().default(true),
  approvedBy: z.string().optional(),
  approvalDate: z.date().optional(),
  notes: z.string().optional(),
});

// Recipe costing
export const RecipeIngredientSchema = z.object({
  itemId: z.string(),
  itemName: z.string(),
  quantity: z.number().positive(),
  unit: z.string(),
  cost: z.number().positive(),
  notes: z.string().optional(),
});

export const RecipeSchema = BaseEntitySchema.extend({
  name: z.string(),
  menuItemId: z.string().optional(),
  servingSize: z.number().positive(),
  servings: z.number().positive().default(1),
  ingredients: z.array(RecipeIngredientSchema),
  totalCost: z.number().min(0),
  costPerServing: z.number().min(0),
  targetCostPercent: z.number().min(0).max(100).optional(),
  instructions: z.string().optional(),
  prepTime: z.number().optional(), // in minutes
  cookTime: z.number().optional(), // in minutes
  notes: z.string().optional(),
});

// Barcode scanning
export const BarcodeLogSchema = BaseEntitySchema.extend({
  barcode: z.string(),
  itemId: z.string().optional(),
  itemName: z.string().optional(),
  scannedBy: z.string(),
  scanDate: z.date(),
  scanType: z.enum(['lookup', 'count', 'receive', 'transfer']),
  quantity: z.number().optional(),
  locationId: z.string(),
  notes: z.string().optional(),
  isSuccessful: z.boolean(),
  errorMessage: z.string().optional(),
});

// Alerts and notifications
export const InventoryAlertSchema = BaseEntitySchema.extend({
  type: z.enum(['low_stock', 'out_of_stock', 'expiring', 'expired', 'reorder_point', 'overstock']),
  itemId: z.string(),
  itemName: z.string(),
  locationId: z.string(),
  severity: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  message: z.string(),
  currentValue: z.number().optional(),
  thresholdValue: z.number().optional(),
  isAcknowledged: z.boolean().default(false),
  acknowledgedBy: z.string().optional(),
  acknowledgedAt: z.date().optional(),
  resolvedAt: z.date().optional(),
  expirationDate: z.date().optional(),
});

// Reports and analytics
export const InventoryReportSchema = z.object({
  type: z.enum(['valuation', 'turnover', 'waste', 'usage', 'forecast', 'abc_analysis']),
  dateFrom: z.date(),
  dateTo: z.date(),
  locationIds: z.array(z.string()).optional(),
  categoryIds: z.array(z.string()).optional(),
  data: z.record(z.any()),
  generatedAt: z.date(),
  generatedBy: z.string(),
});

// Type exports
export type BaseEntity = z.infer<typeof BaseEntitySchema>;
export type Location = z.infer<typeof LocationSchema>;
export type UnitOfMeasurement = z.infer<typeof UnitOfMeasurementSchema>;
export type SupplierContact = z.infer<typeof SupplierContactSchema>;
export type Supplier = z.infer<typeof SupplierSchema>;
export type ProductCategory = z.infer<typeof ProductCategorySchema>;
export type InventoryItem = z.infer<typeof InventoryItemSchema>;
export type StockMovement = z.infer<typeof StockMovementSchema>;
export type PurchaseOrderItem = z.infer<typeof PurchaseOrderItemSchema>;
export type PurchaseOrder = z.infer<typeof PurchaseOrderSchema>;
export type WasteReason = z.infer<typeof WasteReasonSchema>;
export type WasteLog = z.infer<typeof WasteLogSchema>;
export type StockCountItem = z.infer<typeof StockCountItemSchema>;
export type StockCount = z.infer<typeof StockCountSchema>;
export type RecipeIngredient = z.infer<typeof RecipeIngredientSchema>;
export type Recipe = z.infer<typeof RecipeSchema>;
export type BarcodeLog = z.infer<typeof BarcodeLogSchema>;
export type InventoryAlert = z.infer<typeof InventoryAlertSchema>;
export type InventoryReport = z.infer<typeof InventoryReportSchema>;

// Form schemas for creating/updating
export const CreateSupplierSchema = SupplierSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const UpdateSupplierSchema = CreateSupplierSchema.partial();

export const CreateInventoryItemSchema = InventoryItemSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  averageCost: true,
  lastCostPrice: true,
  locationStock: true 
});
export const UpdateInventoryItemSchema = CreateInventoryItemSchema.partial();

export const CreatePurchaseOrderSchema = PurchaseOrderSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});
export const UpdatePurchaseOrderSchema = CreatePurchaseOrderSchema.partial();

export const CreateWasteLogSchema = WasteLogSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  totalCost: true 
});
export const UpdateWasteLogSchema = CreateWasteLogSchema.partial();

export const CreateStockCountSchema = StockCountSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  items: true,
  totalVariance: true,
  totalVarianceValue: true 
});
export const UpdateStockCountSchema = CreateStockCountSchema.partial();

// Form types
export type CreateSupplier = z.infer<typeof CreateSupplierSchema>;
export type UpdateSupplier = z.infer<typeof UpdateSupplierSchema>;
export type CreateInventoryItem = z.infer<typeof CreateInventoryItemSchema>;
export type UpdateInventoryItem = z.infer<typeof UpdateInventoryItemSchema>;
export type CreatePurchaseOrder = z.infer<typeof CreatePurchaseOrderSchema>;
export type UpdatePurchaseOrder = z.infer<typeof UpdatePurchaseOrderSchema>;
export type CreateWasteLog = z.infer<typeof CreateWasteLogSchema>;
export type UpdateWasteLog = z.infer<typeof UpdateWasteLogSchema>;
export type CreateStockCount = z.infer<typeof CreateStockCountSchema>;
export type UpdateStockCount = z.infer<typeof UpdateStockCountSchema>;

// Filter and search types
export interface InventoryFilters {
  search?: string;
  categoryId?: string;
  supplierId?: string;
  locationId?: string;
  lowStock?: boolean;
  outOfStock?: boolean;
  expiring?: boolean;
  priceRange?: [number, number];
  tags?: string[];
  status?: 'active' | 'inactive' | 'discontinued';
}

export interface PurchaseOrderFilters {
  search?: string;
  supplierId?: string;
  status?: PurchaseOrder['status'];
  dateRange?: [Date, Date];
  locationId?: string;
}

export interface WasteLogFilters {
  search?: string;
  categoryId?: string;
  reasonId?: string;
  dateRange?: [Date, Date];
  locationId?: string;
  preventable?: boolean;
}

// Sort options
export interface InventorySortOption {
  field: string;
  direction: 'asc' | 'desc';
  label: string;
}

export const INVENTORY_SORT_OPTIONS: InventorySortOption[] = [
  { field: 'name', direction: 'asc', label: 'Name (A-Z)' },
  { field: 'name', direction: 'desc', label: 'Name (Z-A)' },
  { field: 'currentStock', direction: 'asc', label: 'Stock Level (Low to High)' },
  { field: 'currentStock', direction: 'desc', label: 'Stock Level (High to Low)' },
  { field: 'costPrice', direction: 'asc', label: 'Cost (Low to High)' },
  { field: 'costPrice', direction: 'desc', label: 'Cost (High to Low)' },
  { field: 'updatedAt', direction: 'desc', label: 'Recently Updated' },
];

// API Response types
export interface InventoryResponse {
  data: InventoryItem[];
  total: number;
  page: number;
  limit: number;
}

export interface SupplierResponse {
  data: Supplier[];
  total: number;
  page: number;
  limit: number;
}

export interface PurchaseOrderResponse {
  data: PurchaseOrder[];
  total: number;
  page: number;
  limit: number;
}

// Dashboard metrics
export interface InventoryMetrics {
  totalValue: number;
  totalItems: number;
  lowStockItems: number;
  outOfStockItems: number;
  expiringItems: number;
  wasteValue: number;
  turnoverRate: number;
  averageDaysToTurnover: number;
}

// Mobile scanning types
export interface ScanResult {
  barcode: string;
  format: string;
  item?: InventoryItem;
  success: boolean;
  timestamp: Date;
}

export interface ScanSession {
  id: string;
  type: 'count' | 'receive' | 'transfer';
  locationId: string;
  startTime: Date;
  endTime?: Date;
  scans: ScanResult[];
  userId: string;
  isActive: boolean;
}