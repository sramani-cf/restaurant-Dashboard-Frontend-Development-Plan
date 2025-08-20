import type {
  InventoryItem,
  StockMovement,
  Recipe,
  RecipeIngredient,
  InventoryMetrics,
  WasteLog,
  UnitOfMeasurement,
} from './types';

/**
 * Calculate theoretical stock based on purchases and recorded consumption
 */
export function calculateTheoreticalStock(
  item: InventoryItem,
  movements: StockMovement[]
): number {
  // Start with last counted stock or initial stock
  let theoreticalStock = item.currentStock;
  
  // Apply all movements since last count
  for (const movement of movements) {
    if (movement.itemId === item.id) {
      switch (movement.type) {
        case 'purchase':
        case 'adjustment':
        case 'return':
          theoreticalStock += movement.quantity;
          break;
        case 'sale':
        case 'consumption':
        case 'waste':
        case 'transfer':
          theoreticalStock -= Math.abs(movement.quantity);
          break;
      }
    }
  }
  
  return Math.max(0, theoreticalStock);
}

/**
 * Calculate actual vs theoretical variance
 */
export function calculateStockVariance(
  actualStock: number,
  theoreticalStock: number,
  costPrice: number
): { quantityVariance: number; valueVariance: number; percentageVariance: number } {
  const quantityVariance = actualStock - theoreticalStock;
  const valueVariance = quantityVariance * costPrice;
  const percentageVariance = theoreticalStock > 0 
    ? (quantityVariance / theoreticalStock) * 100 
    : 0;
  
  return {
    quantityVariance,
    valueVariance,
    percentageVariance,
  };
}

/**
 * Calculate reorder quantity based on various factors
 */
export function calculateReorderQuantity(
  item: InventoryItem,
  averageDailyUsage: number,
  leadTimeDays: number = 7,
  safetyStockDays: number = 3
): number {
  // Economic Order Quantity factors
  const demandDuringLeadTime = averageDailyUsage * leadTimeDays;
  const safetyStock = averageDailyUsage * safetyStockDays;
  const reorderPoint = demandDuringLeadTime + safetyStock;
  
  // If manual reorder quantity is set, use that
  if (item.reorderQuantity && item.reorderQuantity > 0) {
    return item.reorderQuantity;
  }
  
  // Calculate economic order quantity (simplified)
  const annualDemand = averageDailyUsage * 365;
  const orderingCost = 50; // Assumed fixed ordering cost
  const holdingCostRate = 0.20; // 20% of item cost per year
  const holdingCost = item.costPrice * holdingCostRate;
  
  const eoq = Math.sqrt((2 * annualDemand * orderingCost) / holdingCost);
  
  // Return the larger of EOQ or minimum order to reach max stock
  const maxStockOrder = item.maximumStock 
    ? item.maximumStock - item.currentStock 
    : eoq;
  
  return Math.max(eoq, maxStockOrder, reorderPoint - item.currentStock);
}

/**
 * Calculate average daily usage from stock movements
 */
export function calculateAverageDailyUsage(
  itemId: string,
  movements: StockMovement[],
  days: number = 30
): number {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  const consumptionMovements = movements.filter(movement =>
    movement.itemId === itemId &&
    movement.createdAt >= cutoffDate &&
    (movement.type === 'consumption' || movement.type === 'sale')
  );
  
  const totalUsage = consumptionMovements.reduce(
    (sum, movement) => sum + Math.abs(movement.quantity),
    0
  );
  
  return days > 0 ? totalUsage / days : 0;
}

/**
 * Calculate inventory turnover rate
 */
export function calculateTurnoverRate(
  item: InventoryItem,
  movements: StockMovement[],
  periodDays: number = 365
): { turnoverRate: number; daysToTurnover: number } {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - periodDays);
  
  const consumptionMovements = movements.filter(movement =>
    movement.itemId === item.id &&
    movement.createdAt >= cutoffDate &&
    (movement.type === 'consumption' || movement.type === 'sale')
  );
  
  const totalUsage = consumptionMovements.reduce(
    (sum, movement) => sum + Math.abs(movement.quantity),
    0
  );
  
  const averageStock = item.currentStock; // Simplified - should be average over period
  const turnoverRate = averageStock > 0 ? totalUsage / averageStock : 0;
  const daysToTurnover = turnoverRate > 0 ? periodDays / turnoverRate : 0;
  
  return { turnoverRate, daysToTurnover };
}

/**
 * Calculate weighted average cost (WAC) for inventory valuation
 */
export function calculateWeightedAverageCost(
  item: InventoryItem,
  movements: StockMovement[]
): number {
  let totalQuantity = 0;
  let totalCost = 0;
  
  // Start with current stock at current cost
  totalQuantity += item.currentStock;
  totalCost += item.currentStock * item.costPrice;
  
  // Add all purchase movements with their costs
  const purchaseMovements = movements.filter(movement =>
    movement.itemId === item.id &&
    movement.type === 'purchase' &&
    movement.unitCost &&
    movement.unitCost > 0
  );
  
  for (const movement of purchaseMovements) {
    totalQuantity += movement.quantity;
    totalCost += movement.quantity * (movement.unitCost || 0);
  }
  
  return totalQuantity > 0 ? totalCost / totalQuantity : item.costPrice;
}

/**
 * Calculate ABC analysis classification
 */
export function calculateABCClassification(
  items: InventoryItem[],
  movements: StockMovement[]
): { itemId: string; classification: 'A' | 'B' | 'C'; annualValue: number }[] {
  const itemValues = items.map(item => {
    const annualUsage = calculateAverageDailyUsage(item.id, movements, 365) * 365;
    const annualValue = annualUsage * item.costPrice;
    
    return {
      itemId: item.id,
      annualValue,
      classification: 'C' as 'A' | 'B' | 'C',
    };
  });
  
  // Sort by annual value descending
  itemValues.sort((a, b) => b.annualValue - a.annualValue);
  
  const totalValue = itemValues.reduce((sum, item) => sum + item.annualValue, 0);
  let cumulativeValue = 0;
  
  // Classify based on cumulative percentage
  for (const item of itemValues) {
    cumulativeValue += item.annualValue;
    const cumulativePercentage = (cumulativeValue / totalValue) * 100;
    
    if (cumulativePercentage <= 80) {
      item.classification = 'A';
    } else if (cumulativePercentage <= 95) {
      item.classification = 'B';
    } else {
      item.classification = 'C';
    }
  }
  
  return itemValues;
}

/**
 * Calculate recipe cost based on current ingredient prices
 */
export function calculateRecipeCost(
  recipe: Recipe,
  ingredients: InventoryItem[]
): { totalCost: number; costPerServing: number; ingredientCosts: RecipeIngredient[] } {
  let totalCost = 0;
  const ingredientCosts: RecipeIngredient[] = [];
  
  for (const recipeIngredient of recipe.ingredients) {
    const inventoryItem = ingredients.find(item => item.id === recipeIngredient.itemId);
    if (inventoryItem) {
      // Convert recipe quantity to item's primary unit if needed
      const convertedQuantity = convertQuantity(
        recipeIngredient.quantity,
        recipeIngredient.unit,
        inventoryItem.primaryUnit
      );
      
      const ingredientCost = convertedQuantity * inventoryItem.costPrice;
      totalCost += ingredientCost;
      
      ingredientCosts.push({
        ...recipeIngredient,
        cost: ingredientCost,
      });
    } else {
      // If ingredient not found, use the cost from recipe
      totalCost += recipeIngredient.cost;
      ingredientCosts.push(recipeIngredient);
    }
  }
  
  const costPerServing = recipe.servings > 0 ? totalCost / recipe.servings : totalCost;
  
  return { totalCost, costPerServing, ingredientCosts };
}

/**
 * Convert quantity between different units of measurement
 */
export function convertQuantity(
  quantity: number,
  fromUnit: string,
  toUnit: string,
  unitsOfMeasurement: UnitOfMeasurement[] = []
): number {
  if (fromUnit === toUnit) {
    return quantity;
  }
  
  const fromUnitData = unitsOfMeasurement.find(u => u.id === fromUnit || u.abbreviation === fromUnit);
  const toUnitData = unitsOfMeasurement.find(u => u.id === toUnit || u.abbreviation === toUnit);
  
  if (!fromUnitData || !toUnitData) {
    // If we can't find unit conversion data, return original quantity
    console.warn(`Cannot convert from ${fromUnit} to ${toUnit}: units not found`);
    return quantity;
  }
  
  if (fromUnitData.type !== toUnitData.type) {
    console.warn(`Cannot convert between different unit types: ${fromUnitData.type} to ${toUnitData.type}`);
    return quantity;
  }
  
  // Convert to base unit first, then to target unit
  const baseQuantity = quantity * fromUnitData.conversionFactor;
  const convertedQuantity = baseQuantity / toUnitData.conversionFactor;
  
  return convertedQuantity;
}

/**
 * Calculate shrinkage rate based on waste logs
 */
export function calculateShrinkageRate(
  itemId: string,
  wasteLogs: WasteLog[],
  movements: StockMovement[],
  periodDays: number = 30
): { shrinkageRate: number; shrinkageValue: number } {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - periodDays);
  
  // Calculate total waste for the item
  const itemWasteLogs = wasteLogs.filter(log =>
    log.itemId === itemId &&
    log.createdAt >= cutoffDate
  );
  
  const totalWasteQuantity = itemWasteLogs.reduce(
    (sum, log) => sum + log.quantity,
    0
  );
  
  const totalWasteValue = itemWasteLogs.reduce(
    (sum, log) => sum + log.totalCost,
    0
  );
  
  // Calculate total purchases/receipts in the period
  const purchaseMovements = movements.filter(movement =>
    movement.itemId === itemId &&
    movement.createdAt >= cutoffDate &&
    movement.type === 'purchase'
  );
  
  const totalPurchaseQuantity = purchaseMovements.reduce(
    (sum, movement) => sum + movement.quantity,
    0
  );
  
  const shrinkageRate = totalPurchaseQuantity > 0 
    ? (totalWasteQuantity / totalPurchaseQuantity) * 100
    : 0;
  
  return { shrinkageRate, shrinkageValue: totalWasteValue };
}

/**
 * Calculate food cost percentage
 */
export function calculateFoodCostPercentage(
  totalCostOfGoodsSold: number,
  totalRevenue: number
): number {
  return totalRevenue > 0 ? (totalCostOfGoodsSold / totalRevenue) * 100 : 0;
}

/**
 * Calculate ending inventory value
 */
export function calculateInventoryValue(
  items: InventoryItem[],
  method: 'current_cost' | 'average_cost' | 'fifo' | 'lifo' = 'current_cost'
): number {
  return items.reduce((total, item) => {
    let unitCost = item.costPrice;
    
    if (method === 'average_cost' && item.averageCost) {
      unitCost = item.averageCost;
    } else if (method === 'fifo' && item.lastCostPrice) {
      // Simplified FIFO - would need more complex logic for real FIFO
      unitCost = item.lastCostPrice;
    } else if (method === 'lifo' && item.averageCost) {
      // Simplified LIFO
      unitCost = item.averageCost;
    }
    
    return total + (item.currentStock * unitCost);
  }, 0);
}

/**
 * Predict when item will be out of stock
 */
export function predictStockoutDate(
  item: InventoryItem,
  movements: StockMovement[]
): Date | null {
  const averageDailyUsage = calculateAverageDailyUsage(item.id, movements);
  
  if (averageDailyUsage <= 0 || item.currentStock <= 0) {
    return null;
  }
  
  const daysUntilStockout = item.currentStock / averageDailyUsage;
  const stockoutDate = new Date();
  stockoutDate.setDate(stockoutDate.getDate() + Math.floor(daysUntilStockout));
  
  return stockoutDate;
}

/**
 * Calculate optimal stock levels based on service level and demand variability
 */
export function calculateOptimalStockLevels(
  item: InventoryItem,
  movements: StockMovement[],
  serviceLevel: number = 0.95, // 95% service level
  leadTimeDays: number = 7
): {
  reorderPoint: number;
  safetyStock: number;
  maximumStock: number;
} {
  const averageDailyUsage = calculateAverageDailyUsage(item.id, movements);
  const demandDuringLeadTime = averageDailyUsage * leadTimeDays;
  
  // Calculate demand variability (standard deviation)
  const usageHistory = movements
    .filter(m => m.itemId === item.id && (m.type === 'consumption' || m.type === 'sale'))
    .map(m => Math.abs(m.quantity));
  
  const averageUsage = usageHistory.reduce((sum, usage) => sum + usage, 0) / usageHistory.length;
  const variance = usageHistory.reduce((sum, usage) => sum + Math.pow(usage - averageUsage, 2), 0) / usageHistory.length;
  const standardDeviation = Math.sqrt(variance);
  
  // Z-score for 95% service level
  const zScore = 1.65;
  const safetyStock = zScore * standardDeviation * Math.sqrt(leadTimeDays);
  
  const reorderPoint = demandDuringLeadTime + safetyStock;
  
  // Calculate maximum stock (order point + order quantity)
  const orderQuantity = calculateReorderQuantity(item, averageDailyUsage, leadTimeDays);
  const maximumStock = reorderPoint + orderQuantity;
  
  return {
    reorderPoint: Math.max(0, reorderPoint),
    safetyStock: Math.max(0, safetyStock),
    maximumStock: Math.max(0, maximumStock),
  };
}

/**
 * Calculate carrying cost for inventory
 */
export function calculateCarryingCost(
  inventoryValue: number,
  carryingCostRate: number = 0.25 // 25% annually
): number {
  return inventoryValue * carryingCostRate;
}

/**
 * Calculate metrics for inventory dashboard
 */
export function calculateInventoryMetrics(
  items: InventoryItem[],
  movements: StockMovement[],
  wasteLogs: WasteLog[]
): InventoryMetrics {
  const totalValue = calculateInventoryValue(items);
  const totalItems = items.length;
  const lowStockItems = items.filter(item => item.currentStock <= item.minimumStock).length;
  const outOfStockItems = items.filter(item => item.currentStock <= 0).length;
  
  // Calculate expiring items (items that expire in next 3 days)
  const expiringItems = items.filter(item => {
    if (!item.expirationTracking || !item.shelfLife) return false;
    
    // This is simplified - in reality, you'd check batch expiration dates
    const avgShelfLife = item.shelfLife;
    return avgShelfLife <= 3;
  }).length;
  
  // Calculate waste value for current period
  const thisWeekStart = new Date();
  thisWeekStart.setDate(thisWeekStart.getDate() - 7);
  
  const wasteValue = wasteLogs
    .filter(log => log.createdAt >= thisWeekStart)
    .reduce((sum, log) => sum + log.totalCost, 0);
  
  // Calculate average turnover rate
  const turnoverRates = items.map(item => {
    const { turnoverRate } = calculateTurnoverRate(item, movements);
    return turnoverRate;
  });
  
  const averageTurnoverRate = turnoverRates.length > 0
    ? turnoverRates.reduce((sum, rate) => sum + rate, 0) / turnoverRates.length
    : 0;
  
  const averageDaysToTurnover = averageTurnoverRate > 0 ? 365 / averageTurnoverRate : 0;
  
  return {
    totalValue,
    totalItems,
    lowStockItems,
    outOfStockItems,
    expiringItems,
    wasteValue,
    turnoverRate: averageTurnoverRate,
    averageDaysToTurnover,
  };
}

/**
 * Helper function to format currency values
 */
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Helper function to format percentages
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Helper function to format quantities with units
 */
export function formatQuantity(quantity: number, unit: string): string {
  return `${quantity.toFixed(2)} ${unit}`;
}