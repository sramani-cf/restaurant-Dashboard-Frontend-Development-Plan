'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import type {
  InventoryItem,
  Supplier,
  PurchaseOrder,
  WasteLog,
  StockCount,
  StockMovement,
  CreateInventoryItem,
  UpdateInventoryItem,
  CreateSupplier,
  UpdateSupplier,
  CreatePurchaseOrder,
  UpdatePurchaseOrder,
  CreateWasteLog,
  CreateStockCount,
  BarcodeLog,
} from '@/lib/inventory/types';

import {
  CreateInventoryItemSchema,
  UpdateInventoryItemSchema,
  CreateSupplierSchema,
  UpdateSupplierSchema,
  CreatePurchaseOrderSchema,
  UpdatePurchaseOrderSchema,
  CreateWasteLogSchema,
  CreateStockCountSchema,
} from '@/lib/inventory/types';

import {
  getInventoryItems,
  getInventoryItem,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getSuppliers,
  getSupplier,
  createSupplier,
  createPurchaseOrder,
  createWasteLog,
  getStockMovements,
  logBarcodeScans,
  lookupItemByBarcode,
} from '@/lib/inventory/data';

// Common error handling
class ActionError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ActionError';
  }
}

// Generic action result type
type ActionResult<T = unknown> = 
  | { success: true; data: T }
  | { success: false; error: string; field?: string };

/**
 * INVENTORY ITEM ACTIONS
 */

export async function createInventoryItemAction(
  data: CreateInventoryItem
): Promise<ActionResult<InventoryItem>> {
  try {
    const validated = CreateInventoryItemSchema.parse(data);
    const item = await createInventoryItem(validated);
    
    revalidatePath('/inventory');
    return { success: true, data: item };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return {
        success: false,
        error: firstError.message,
        field: firstError.path.join('.'),
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create inventory item',
    };
  }
}

export async function updateInventoryItemAction(
  id: string,
  data: UpdateInventoryItem
): Promise<ActionResult<InventoryItem>> {
  try {
    const validated = UpdateInventoryItemSchema.parse(data);
    const item = await updateInventoryItem(id, validated);
    
    revalidatePath('/inventory');
    revalidatePath(`/inventory/${id}`);
    return { success: true, data: item };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return {
        success: false,
        error: firstError.message,
        field: firstError.path.join('.'),
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update inventory item',
    };
  }
}

export async function deleteInventoryItemAction(
  id: string
): Promise<ActionResult<void>> {
  try {
    await deleteInventoryItem(id);
    
    revalidatePath('/inventory');
    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete inventory item',
    };
  }
}

export async function adjustStockAction(
  itemId: string,
  locationId: string,
  quantity: number,
  reason: string,
  notes?: string
): Promise<ActionResult<StockMovement>> {
  try {
    if (quantity === 0) {
      return {
        success: false,
        error: 'Adjustment quantity cannot be zero',
        field: 'quantity',
      };
    }

    const item = await getInventoryItem(itemId);
    if (!item) {
      return {
        success: false,
        error: 'Inventory item not found',
      };
    }

    // Create stock movement record
    const movement: Omit<StockMovement, 'id' | 'createdAt' | 'updatedAt' | 'isActive'> = {
      itemId,
      locationId,
      type: 'adjustment',
      quantity,
      reason,
      notes,
      userId: 'current-user-id', // In real app, get from session
      isApproved: true, // Adjustments are typically auto-approved
    };

    // Update item stock
    const newStock = Math.max(0, item.currentStock + quantity);
    await updateInventoryItem(itemId, { currentStock: newStock });

    // Log the movement (in real app, this would be saved to database)
    const createdMovement = {
      id: Math.random().toString(36).substr(2, 9),
      ...movement,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };

    revalidatePath('/inventory');
    revalidatePath(`/inventory/${itemId}`);
    
    return { success: true, data: createdMovement };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to adjust stock',
    };
  }
}

export async function transferStockAction(
  itemId: string,
  fromLocationId: string,
  toLocationId: string,
  quantity: number,
  notes?: string
): Promise<ActionResult<{ outMovement: StockMovement; inMovement: StockMovement }>> {
  try {
    if (quantity <= 0) {
      return {
        success: false,
        error: 'Transfer quantity must be positive',
        field: 'quantity',
      };
    }

    const item = await getInventoryItem(itemId);
    if (!item) {
      return {
        success: false,
        error: 'Inventory item not found',
      };
    }

    // Check if source location has sufficient stock
    const fromLocationStock = item.locationStock.find(ls => ls.locationId === fromLocationId);
    if (!fromLocationStock || fromLocationStock.quantity < quantity) {
      return {
        success: false,
        error: 'Insufficient stock in source location',
        field: 'quantity',
      };
    }

    // Create transfer out movement
    const outMovement: Omit<StockMovement, 'id' | 'createdAt' | 'updatedAt' | 'isActive'> = {
      itemId,
      locationId: fromLocationId,
      type: 'transfer',
      quantity: -quantity,
      reason: `Transfer to location ${toLocationId}`,
      notes,
      userId: 'current-user-id',
      isApproved: true,
    };

    // Create transfer in movement
    const inMovement: Omit<StockMovement, 'id' | 'createdAt' | 'updatedAt' | 'isActive'> = {
      itemId,
      locationId: toLocationId,
      type: 'transfer',
      quantity: quantity,
      reason: `Transfer from location ${fromLocationId}`,
      notes,
      userId: 'current-user-id',
      isApproved: true,
    };

    // Update location stocks
    const updatedLocationStock = item.locationStock.map(ls => {
      if (ls.locationId === fromLocationId) {
        return { ...ls, quantity: ls.quantity - quantity, lastUpdated: new Date() };
      } else if (ls.locationId === toLocationId) {
        return { ...ls, quantity: ls.quantity + quantity, lastUpdated: new Date() };
      }
      return ls;
    });

    // If toLocation doesn't exist, add it
    if (!updatedLocationStock.find(ls => ls.locationId === toLocationId)) {
      updatedLocationStock.push({
        locationId: toLocationId,
        quantity: quantity,
        reservedQuantity: 0,
        lastUpdated: new Date(),
      });
    }

    await updateInventoryItem(itemId, { locationStock: updatedLocationStock });

    // Create movement records (in real app, save to database)
    const createdOutMovement = {
      id: Math.random().toString(36).substr(2, 9),
      ...outMovement,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };

    const createdInMovement = {
      id: Math.random().toString(36).substr(2, 9),
      ...inMovement,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };

    revalidatePath('/inventory');
    revalidatePath(`/inventory/${itemId}`);
    
    return { 
      success: true, 
      data: { 
        outMovement: createdOutMovement, 
        inMovement: createdInMovement 
      } 
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to transfer stock',
    };
  }
}

/**
 * SUPPLIER ACTIONS
 */

export async function createSupplierAction(
  data: CreateSupplier
): Promise<ActionResult<Supplier>> {
  try {
    const validated = CreateSupplierSchema.parse(data);
    const supplier = await createSupplier(validated);
    
    revalidatePath('/inventory/suppliers');
    return { success: true, data: supplier };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return {
        success: false,
        error: firstError.message,
        field: firstError.path.join('.'),
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create supplier',
    };
  }
}

export async function updateSupplierAction(
  id: string,
  data: UpdateSupplier
): Promise<ActionResult<Supplier>> {
  try {
    const validated = UpdateSupplierSchema.parse(data);
    
    // In real app, implement updateSupplier function
    const supplier = await getSupplier(id);
    if (!supplier) {
      return {
        success: false,
        error: 'Supplier not found',
      };
    }

    const updatedSupplier = { ...supplier, ...validated, updatedAt: new Date() };
    
    revalidatePath('/inventory/suppliers');
    revalidatePath(`/inventory/suppliers/${id}`);
    
    return { success: true, data: updatedSupplier };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return {
        success: false,
        error: firstError.message,
        field: firstError.path.join('.'),
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update supplier',
    };
  }
}

/**
 * PURCHASE ORDER ACTIONS
 */

export async function createPurchaseOrderAction(
  data: CreatePurchaseOrder
): Promise<ActionResult<PurchaseOrder>> {
  try {
    const validated = CreatePurchaseOrderSchema.parse(data);
    
    // Generate order number if not provided
    if (!validated.orderNumber) {
      validated.orderNumber = `PO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    }

    const po = await createPurchaseOrder(validated);
    
    revalidatePath('/inventory/purchase-orders');
    return { success: true, data: po };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return {
        success: false,
        error: firstError.message,
        field: firstError.path.join('.'),
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create purchase order',
    };
  }
}

export async function approvePurchaseOrderAction(
  id: string,
  approvedBy: string
): Promise<ActionResult<PurchaseOrder>> {
  try {
    // In real app, implement updatePurchaseOrder function
    // For now, we'll simulate the update
    
    revalidatePath('/inventory/purchase-orders');
    revalidatePath(`/inventory/purchase-orders/${id}`);
    
    return { 
      success: true, 
      data: {} as PurchaseOrder // Mock response
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to approve purchase order',
    };
  }
}

export async function receivePurchaseOrderAction(
  id: string,
  receivedItems: Array<{ itemId: string; receivedQuantity: number; batchNumber?: string; expirationDate?: Date }>
): Promise<ActionResult<PurchaseOrder>> {
  try {
    // In real implementation:
    // 1. Update PO status to 'received' or 'partial'
    // 2. Create stock movements for received items
    // 3. Update inventory item stock levels
    // 4. Log barcode scans if applicable

    for (const receivedItem of receivedItems) {
      // Create stock movement for received item
      const movement: Omit<StockMovement, 'id' | 'createdAt' | 'updatedAt' | 'isActive'> = {
        itemId: receivedItem.itemId,
        locationId: 'main', // Default location
        type: 'purchase',
        quantity: receivedItem.receivedQuantity,
        referenceId: id,
        referenceType: 'purchase_order',
        reason: 'Purchase order receipt',
        userId: 'current-user-id',
        batchNumber: receivedItem.batchNumber,
        expirationDate: receivedItem.expirationDate,
        isApproved: true,
      };

      // Update item stock
      const item = await getInventoryItem(receivedItem.itemId);
      if (item) {
        const newStock = item.currentStock + receivedItem.receivedQuantity;
        await updateInventoryItem(receivedItem.itemId, { 
          currentStock: newStock,
          lastCostPrice: item.costPrice // Store previous cost
        });
      }
    }

    revalidatePath('/inventory/purchase-orders');
    revalidatePath(`/inventory/purchase-orders/${id}`);
    revalidatePath('/inventory');
    
    return { 
      success: true, 
      data: {} as PurchaseOrder // Mock response
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to receive purchase order',
    };
  }
}

/**
 * WASTE LOG ACTIONS
 */

export async function createWasteLogAction(
  data: CreateWasteLog
): Promise<ActionResult<WasteLog>> {
  try {
    const validated = CreateWasteLogSchema.parse(data);
    const wasteLog = await createWasteLog(validated);
    
    // Update inventory stock
    const item = await getInventoryItem(validated.itemId);
    if (item) {
      const newStock = Math.max(0, item.currentStock - validated.quantity);
      await updateInventoryItem(validated.itemId, { currentStock: newStock });
    }

    revalidatePath('/inventory/waste');
    revalidatePath('/inventory');
    
    return { success: true, data: wasteLog };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return {
        success: false,
        error: firstError.message,
        field: firstError.path.join('.'),
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create waste log',
    };
  }
}

export async function approveWasteLogAction(
  id: string,
  approvedBy: string
): Promise<ActionResult<WasteLog>> {
  try {
    // In real app, implement updateWasteLog function
    
    revalidatePath('/inventory/waste');
    revalidatePath(`/inventory/waste/${id}`);
    
    return { 
      success: true, 
      data: {} as WasteLog // Mock response
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to approve waste log',
    };
  }
}

/**
 * STOCK COUNT ACTIONS
 */

export async function createStockCountAction(
  data: CreateStockCount
): Promise<ActionResult<StockCount>> {
  try {
    const validated = CreateStockCountSchema.parse(data);
    
    // In real app, implement createStockCount function
    const stockCount: StockCount = {
      id: Math.random().toString(36).substr(2, 9),
      ...validated,
      items: [],
      totalVariance: 0,
      totalVarianceValue: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };
    
    revalidatePath('/inventory/counts');
    return { success: true, data: stockCount };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return {
        success: false,
        error: firstError.message,
        field: firstError.path.join('.'),
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create stock count',
    };
  }
}

export async function updateStockCountItemAction(
  countId: string,
  itemId: string,
  countedQuantity: number,
  notes?: string
): Promise<ActionResult<void>> {
  try {
    // In real implementation:
    // 1. Update the stock count item with counted quantity
    // 2. Calculate variance
    // 3. Update total count variance
    
    revalidatePath('/inventory/counts');
    revalidatePath(`/inventory/counts/${countId}`);
    
    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update stock count item',
    };
  }
}

export async function finalizeStockCountAction(
  countId: string,
  adjustStock: boolean = false
): Promise<ActionResult<StockCount>> {
  try {
    // In real implementation:
    // 1. Mark stock count as completed
    // 2. If adjustStock is true, create stock adjustments for variances
    // 3. Update inventory quantities to match counted quantities
    
    if (adjustStock) {
      // Create stock movements for adjustments
      // Update inventory item quantities
    }
    
    revalidatePath('/inventory/counts');
    revalidatePath(`/inventory/counts/${countId}`);
    revalidatePath('/inventory');
    
    return { 
      success: true, 
      data: {} as StockCount // Mock response
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to finalize stock count',
    };
  }
}

/**
 * BARCODE SCANNING ACTIONS
 */

export async function lookupBarcodeAction(
  barcode: string
): Promise<ActionResult<InventoryItem | null>> {
  try {
    const item = await lookupItemByBarcode(barcode);
    return { success: true, data: item };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to lookup barcode',
    };
  }
}

export async function logBarcodeScanAction(
  scanData: Omit<BarcodeLog, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>
): Promise<ActionResult<void>> {
  try {
    await logBarcodeScans([scanData]);
    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to log barcode scan',
    };
  }
}

export async function batchBarcodeScanAction(
  scans: Array<Omit<BarcodeLog, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>>
): Promise<ActionResult<void>> {
  try {
    await logBarcodeScans(scans);
    revalidatePath('/inventory');
    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to log barcode scans',
    };
  }
}

/**
 * UTILITY ACTIONS
 */

export async function generateReorderReportAction(): Promise<ActionResult<Array<{ item: InventoryItem; recommendedQuantity: number }>>> {
  try {
    const { data: items } = await getInventoryItems({ lowStock: true });
    
    const reorderItems = items
      .filter(item => item.currentStock <= item.reorderPoint)
      .map(item => ({
        item,
        recommendedQuantity: item.reorderQuantity || (item.maximumStock || item.reorderPoint * 2) - item.currentStock,
      }));
    
    return { success: true, data: reorderItems };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate reorder report',
    };
  }
}

export async function bulkUpdateStockAction(
  updates: Array<{ itemId: string; locationId: string; newQuantity: number; reason: string }>
): Promise<ActionResult<void>> {
  try {
    for (const update of updates) {
      const item = await getInventoryItem(update.itemId);
      if (item) {
        const adjustment = update.newQuantity - item.currentStock;
        if (adjustment !== 0) {
          await adjustStockAction(
            update.itemId,
            update.locationId,
            adjustment,
            update.reason,
            'Bulk stock update'
          );
        }
      }
    }
    
    revalidatePath('/inventory');
    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to bulk update stock',
    };
  }
}

// Navigation actions
export async function redirectToInventoryItem(id: string) {
  redirect(`/inventory/${id}`);
}

export async function redirectToSupplier(id: string) {
  redirect(`/inventory/suppliers/${id}`);
}

export async function redirectToPurchaseOrder(id: string) {
  redirect(`/inventory/purchase-orders/${id}`);
}