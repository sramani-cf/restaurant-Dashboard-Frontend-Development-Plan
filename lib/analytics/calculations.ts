'use server';

import { 
  MenuItemAnalysis, 
  CategoryAnalysis, 
  MenuOverview,
  MenuRecommendation,
  EmployeePerformance,
  LaborOverview,
  CostAnalysis,
  WasteAnalysis,
  CustomerSegment,
  CustomerBehavior,
  MetricValue
} from './types';

// Menu Engineering Calculations
export function calculateMenuItemClassification(
  popularity: number, // percentile (0-100)
  profitability: number // profit margin percentage
): 'star' | 'plow-horse' | 'puzzle' | 'dog' {
  const highPopularity = popularity >= 50;
  const highProfitability = profitability >= 70;

  if (highPopularity && highProfitability) return 'star';
  if (highPopularity && !highProfitability) return 'plow-horse';
  if (!highPopularity && highProfitability) return 'puzzle';
  return 'dog';
}

export function calculateMenuPopularity(
  itemQuantitySold: number,
  allItemsQuantitySold: number[]
): number {
  const sorted = [...allItemsQuantitySold].sort((a, b) => b - a);
  const rank = sorted.findIndex(q => q <= itemQuantitySold);
  return ((allItemsQuantitySold.length - rank) / allItemsQuantitySold.length) * 100;
}

export function calculateMenuContribution(
  itemRevenue: number,
  totalRevenue: number
): number {
  return (itemRevenue / totalRevenue) * 100;
}

export function generateMenuRecommendations(
  items: MenuItemAnalysis[]
): MenuRecommendation[] {
  const recommendations: MenuRecommendation[] = [];

  items.forEach(item => {
    switch (item.classification) {
      case 'star':
        if (item.trends.popularityTrend === 'decreasing') {
          recommendations.push({
            type: 'promote',
            itemId: item.id,
            itemName: item.name,
            reason: 'High-performing item showing declining popularity',
            expectedImpact: 'Maintain star status and revenue contribution',
            priority: 'high'
          });
        }
        break;

      case 'plow-horse':
        recommendations.push({
          type: 'engineer',
          itemId: item.id,
          itemName: item.name,
          reason: 'Popular but low-margin item needs cost optimization',
          expectedImpact: 'Improve profitability while maintaining popularity',
          priority: 'medium'
        });
        break;

      case 'puzzle':
        if (item.metrics.profitability > 80) {
          recommendations.push({
            type: 'promote',
            itemId: item.id,
            itemName: item.name,
            reason: 'High-margin item with low visibility',
            expectedImpact: 'Increase popularity and overall profitability',
            priority: 'high'
          });
        } else {
          recommendations.push({
            type: 'reposition',
            itemId: item.id,
            itemName: item.name,
            reason: 'Moderate-margin item needs better positioning',
            expectedImpact: 'Improve customer awareness and sales',
            priority: 'medium'
          });
        }
        break;

      case 'dog':
        if (item.metrics.profitability < 50 && item.metrics.popularity < 25) {
          recommendations.push({
            type: 'remove',
            itemId: item.id,
            itemName: item.name,
            reason: 'Poor performance on both popularity and profitability',
            expectedImpact: 'Reduce complexity and focus on better items',
            priority: 'high'
          });
        } else {
          recommendations.push({
            type: 'engineer',
            itemId: item.id,
            itemName: item.name,
            reason: 'Underperforming item may benefit from repositioning',
            expectedImpact: 'Potential improvement in either popularity or margin',
            priority: 'low'
          });
        }
        break;
    }
  });

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}

export function calculateCategoryAnalysis(
  items: MenuItemAnalysis[]
): CategoryAnalysis[] {
  const categoryMap = new Map<string, MenuItemAnalysis[]>();

  // Group items by category
  items.forEach(item => {
    if (!categoryMap.has(item.category)) {
      categoryMap.set(item.category, []);
    }
    categoryMap.get(item.category)!.push(item);
  });

  return Array.from(categoryMap.entries()).map(([category, categoryItems]) => {
    const totalRevenue = categoryItems.reduce((sum, item) => sum + item.metrics.revenue, 0);
    const avgPopularity = categoryItems.reduce((sum, item) => sum + item.metrics.popularity, 0) / categoryItems.length;
    const avgProfitability = categoryItems.reduce((sum, item) => sum + item.metrics.profitability, 0) / categoryItems.length;

    const classifications = categoryItems.reduce(
      (acc, item) => {
        acc[item.classification]++;
        return acc;
      },
      { star: 0, 'plow-horse': 0, puzzle: 0, dog: 0 }
    );

    return {
      category,
      itemCount: categoryItems.length,
      totalRevenue,
      averagePopularity: Math.round(avgPopularity * 100) / 100,
      averageProfitability: Math.round(avgProfitability * 100) / 100,
      stars: classifications.star,
      plowHorses: classifications['plow-horse'],
      puzzles: classifications.puzzle,
      dogs: classifications.dog
    };
  });
}

// Labor Analysis Calculations
export function calculateEmployeeEfficiency(
  ordersProcessed: number,
  hoursWorked: number,
  salesGenerated: number
): number {
  const ordersPerHour = ordersProcessed / hoursWorked;
  const salesPerHour = salesGenerated / hoursWorked;
  
  // Normalize to 0-100 scale (this would be calibrated based on restaurant benchmarks)
  const normalizedOrders = Math.min(ordersPerHour / 5, 1) * 50; // Max 5 orders/hour = 50 points
  const normalizedSales = Math.min(salesPerHour / 200, 1) * 50; // Max $200/hour = 50 points
  
  return Math.round(normalizedOrders + normalizedSales);
}

export function categorizeEmployeePerformance(efficiency: number): 'excellent' | 'good' | 'average' | 'needs-improvement' {
  if (efficiency >= 90) return 'excellent';
  if (efficiency >= 75) return 'good';
  if (efficiency >= 60) return 'average';
  return 'needs-improvement';
}

export function calculateLaborCostPercentage(
  totalLaborCost: number,
  totalRevenue: number
): number {
  return (totalLaborCost / totalRevenue) * 100;
}

export function calculateProductivityIndex(
  totalSales: number,
  totalLaborHours: number,
  benchmarkSalesPerHour: number = 150
): number {
  const actualSalesPerHour = totalSales / totalLaborHours;
  return (actualSalesPerHour / benchmarkSalesPerHour) * 100;
}

// Cost Analysis Calculations
export function calculateFoodCostVariance(
  actualCost: number,
  theoreticalCost: number
): { variance: number; variancePercent: number } {
  const variance = actualCost - theoreticalCost;
  const variancePercent = (variance / theoreticalCost) * 100;
  
  return {
    variance: Math.round(variance * 100) / 100,
    variancePercent: Math.round(variancePercent * 100) / 100
  };
}

export function calculateInventoryTurnover(
  costOfGoodsSold: number,
  averageInventoryValue: number
): number {
  return costOfGoodsSold / averageInventoryValue;
}

export function calculateDaysOnHand(
  currentInventoryValue: number,
  dailyCostOfGoods: number
): number {
  return currentInventoryValue / dailyCostOfGoods;
}

export function calculateWastePercentage(
  wasteValue: number,
  totalPurchases: number
): number {
  return (wasteValue / totalPurchases) * 100;
}

// Customer Analytics Calculations
export function calculateCustomerLifetimeValue(
  averageOrderValue: number,
  averageVisitFrequency: number, // visits per year
  averageCustomerLifespan: number // years
): number {
  return averageOrderValue * averageVisitFrequency * averageCustomerLifespan;
}

export function calculateRetentionRate(
  returningCustomers: number,
  totalCustomersAtStart: number
): number {
  return (returningCustomers / totalCustomersAtStart) * 100;
}

export function calculateChurnRate(retentionRate: number): number {
  return 100 - retentionRate;
}

export function segmentCustomersByValue(
  customers: Array<{ id: string; totalSpend: number; visitCount: number }>
): CustomerSegment[] {
  // Sort customers by total spend
  const sortedCustomers = [...customers].sort((a, b) => b.totalSpend - a.totalSpend);
  
  const total = customers.length;
  const segments: CustomerSegment[] = [];

  // High-value customers (top 10%)
  const highValueCount = Math.floor(total * 0.1);
  const highValueCustomers = sortedCustomers.slice(0, highValueCount);
  
  // Medium-value customers (next 30%)
  const mediumValueCount = Math.floor(total * 0.3);
  const mediumValueCustomers = sortedCustomers.slice(highValueCount, highValueCount + mediumValueCount);
  
  // Low-value customers (remaining 60%)
  const lowValueCustomers = sortedCustomers.slice(highValueCount + mediumValueCount);

  if (highValueCustomers.length > 0) {
    segments.push({
      segment: 'High-Value',
      customerCount: highValueCustomers.length,
      percentOfBase: (highValueCustomers.length / total) * 100,
      averageOrderValue: highValueCustomers.reduce((sum, c) => sum + (c.totalSpend / c.visitCount), 0) / highValueCustomers.length,
      visitFrequency: highValueCustomers.reduce((sum, c) => sum + c.visitCount, 0) / highValueCustomers.length,
      totalRevenue: highValueCustomers.reduce((sum, c) => sum + c.totalSpend, 0),
      characteristics: ['High spend per visit', 'Frequent visitors', 'Loyal customers']
    });
  }

  if (mediumValueCustomers.length > 0) {
    segments.push({
      segment: 'Medium-Value',
      customerCount: mediumValueCustomers.length,
      percentOfBase: (mediumValueCustomers.length / total) * 100,
      averageOrderValue: mediumValueCustomers.reduce((sum, c) => sum + (c.totalSpend / c.visitCount), 0) / mediumValueCustomers.length,
      visitFrequency: mediumValueCustomers.reduce((sum, c) => sum + c.visitCount, 0) / mediumValueCustomers.length,
      totalRevenue: mediumValueCustomers.reduce((sum, c) => sum + c.totalSpend, 0),
      characteristics: ['Moderate spend', 'Regular visitors', 'Growth potential']
    });
  }

  if (lowValueCustomers.length > 0) {
    segments.push({
      segment: 'Low-Value',
      customerCount: lowValueCustomers.length,
      percentOfBase: (lowValueCustomers.length / total) * 100,
      averageOrderValue: lowValueCustomers.reduce((sum, c) => sum + (c.totalSpend / c.visitCount), 0) / lowValueCustomers.length,
      visitFrequency: lowValueCustomers.reduce((sum, c) => sum + c.visitCount, 0) / lowValueCustomers.length,
      totalRevenue: lowValueCustomers.reduce((sum, c) => sum + c.totalSpend, 0),
      characteristics: ['Lower spend', 'Infrequent visits', 'Price-sensitive']
    });
  }

  return segments;
}

// Utility functions for metric calculations
export function calculateMetricValue(
  current: number,
  previous?: number,
  target?: number,
  unit?: string
): MetricValue {
  const result: MetricValue = {
    current,
    unit
  };

  if (previous !== undefined) {
    result.previous = previous;
    result.change = current - previous;
    result.changePercent = previous !== 0 ? ((current - previous) / previous) * 100 : 0;
    
    if (Math.abs(result.changePercent) < 2) {
      result.changeType = 'neutral';
    } else {
      result.changeType = result.change > 0 ? 'increase' : 'decrease';
    }
  }

  if (target !== undefined) {
    result.target = target;
  }

  return result;
}

export function calculatePercentileRank(value: number, dataset: number[]): number {
  const sorted = [...dataset].sort((a, b) => a - b);
  const rank = sorted.filter(v => v <= value).length;
  return (rank / dataset.length) * 100;
}

export function calculateMovingAverage(data: number[], window: number): number[] {
  if (window > data.length) return data;
  
  const result: number[] = [];
  
  for (let i = 0; i <= data.length - window; i++) {
    const sum = data.slice(i, i + window).reduce((acc, val) => acc + val, 0);
    result.push(sum / window);
  }
  
  return result;
}

export function calculateTrend(values: number[]): 'increasing' | 'decreasing' | 'stable' {
  if (values.length < 2) return 'stable';
  
  let increases = 0;
  let decreases = 0;
  
  for (let i = 1; i < values.length; i++) {
    const change = values[i] - values[i - 1];
    const changePercent = Math.abs(change / values[i - 1]) * 100;
    
    if (changePercent > 5) { // Only consider significant changes
      if (change > 0) increases++;
      else decreases++;
    }
  }
  
  if (increases > decreases) return 'increasing';
  if (decreases > increases) return 'decreasing';
  return 'stable';
}

// ABC Analysis for inventory
export function performABCAnalysis<T extends { value: number }>(
  items: T[],
  aThreshold: number = 80,
  bThreshold: number = 95
): Array<T & { category: 'A' | 'B' | 'C' }> {
  // Sort by value descending
  const sorted = [...items].sort((a, b) => b.value - a.value);
  
  // Calculate cumulative percentages
  const totalValue = sorted.reduce((sum, item) => sum + item.value, 0);
  let cumulativeValue = 0;
  
  return sorted.map(item => {
    cumulativeValue += item.value;
    const cumulativePercent = (cumulativeValue / totalValue) * 100;
    
    let category: 'A' | 'B' | 'C';
    if (cumulativePercent <= aThreshold) {
      category = 'A';
    } else if (cumulativePercent <= bThreshold) {
      category = 'B';
    } else {
      category = 'C';
    }
    
    return { ...item, category };
  });
}

// Statistical functions
export function calculateStandardDeviation(values: number[]): number {
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const squaredDiffs = values.map(value => Math.pow(value - mean, 2));
  const avgSquaredDiff = squaredDiffs.reduce((sum, value) => sum + value, 0) / values.length;
  return Math.sqrt(avgSquaredDiff);
}

export function calculateCorrelation(x: number[], y: number[]): number {
  if (x.length !== y.length) throw new Error('Arrays must have the same length');
  
  const n = x.length;
  const sumX = x.reduce((sum, val) => sum + val, 0);
  const sumY = y.reduce((sum, val) => sum + val, 0);
  const sumXY = x.reduce((sum, val, i) => sum + val * y[i], 0);
  const sumXX = x.reduce((sum, val) => sum + val * val, 0);
  const sumYY = y.reduce((sum, val) => sum + val * val, 0);
  
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));
  
  return denominator === 0 ? 0 : numerator / denominator;
}