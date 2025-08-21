'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Package, AlertTriangle, Trash2, DollarSign } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { formatCurrency } from '@/lib/inventory/calculations';
import { getInventoryMetrics } from '@/lib/inventory/data';
import type { InventoryMetrics } from '@/lib/inventory/types';

interface InventoryMetricsCardsProps {
  initialMetrics?: InventoryMetrics;
  className?: string;
}

export function InventoryMetricsCards({ initialMetrics, className }: InventoryMetricsCardsProps) {
  const [metrics, setMetrics] = useState<InventoryMetrics | null>(initialMetrics || null);
  const [loading, setLoading] = useState(!initialMetrics);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getInventoryMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we don't have initial data
    if (!initialMetrics) {
      fetchMetrics();
    }

    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchMetrics, 30 * 1000);
    return () => clearInterval(interval);
  }, [initialMetrics]);

  if (loading || !metrics) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
            <div className="mt-4">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const getStockStatusColor = (lowStock: number, outOfStock: number, total: number) => {
    const criticalItems = outOfStock;
    const warningItems = lowStock - outOfStock;
    
    if (criticalItems > 0) return 'text-red-600';
    if (warningItems > 0) return 'text-orange-600';
    return 'text-green-600';
  };

  const getStockStatusText = (lowStock: number, outOfStock: number, total: number) => {
    if (outOfStock > 0) return `${outOfStock} out of stock`;
    if (lowStock > 0) return `${lowStock} low stock`;
    return 'Stock levels good';
  };

  const getTurnoverTrend = (rate: number) => {
    // Optimal turnover rate for restaurants is typically 4-12 times per year
    if (rate >= 8) return { icon: TrendingUp, color: 'text-green-600', label: 'Excellent' };
    if (rate >= 4) return { icon: TrendingUp, color: 'text-blue-600', label: 'Good' };
    if (rate >= 2) return { icon: TrendingDown, color: 'text-orange-600', label: 'Slow' };
    return { icon: TrendingDown, color: 'text-red-600', label: 'Poor' };
  };

  const getWasteTrend = (wasteValue: number) => {
    // Assuming threshold of $500/week for waste
    if (wasteValue > 1000) return { icon: TrendingUp, color: 'text-red-600', trend: '+15%' };
    if (wasteValue > 500) return { icon: TrendingUp, color: 'text-orange-600', trend: '+5%' };
    return { icon: TrendingDown, color: 'text-green-600', trend: '-8%' };
  };

  const stockStatusColor = getStockStatusColor(metrics.lowStockItems, metrics.outOfStockItems, metrics.totalItems);
  const stockStatusText = getStockStatusText(metrics.lowStockItems, metrics.outOfStockItems, metrics.totalItems);
  const turnoverTrend = getTurnoverTrend(metrics.turnoverRate);
  const wasteTrend = getWasteTrend(metrics.wasteValue);

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {/* Total Inventory Value */}
      <StatCard
        title="Total Value"
        value={formatCurrency(metrics.totalValue)}
        icon={<DollarSign className="h-4 w-4" />}
        subtitle={`${metrics.totalItems} items`}
        trend={{
          value: 2.3,
          direction: 'up',
          period: 'last week'
        }}
        className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200"
      />

      {/* Stock Status */}
      <StatCard
        title="Stock Status"
        value={`${metrics.totalItems - metrics.lowStockItems} of ${metrics.totalItems}`}
        icon={<Package className="h-4 w-4" />}
        subtitle={stockStatusText}
        className="bg-gradient-to-r from-green-50 to-green-100 border-green-200"
      />

      {/* Expiring Items */}
      <StatCard
        title="Expiring Soon"
        value={metrics.expiringItems.toString()}
        icon={<AlertTriangle className="h-4 w-4" />}
        subtitle={`Items expiring in 3 days`}
        className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200"
      />

      {/* Weekly Waste */}
      <StatCard
        title="Weekly Waste"
        value={formatCurrency(metrics.wasteValue)}
        icon={<Trash2 className="h-4 w-4" />}
        subtitle="This week's total"
        trend={{
          value: 8,
          direction: wasteTrend.color.includes('green') ? 'down' : 'up',
          period: 'last week'
        }}
        className="bg-gradient-to-r from-red-50 to-red-100 border-red-200"
      />

      {/* Additional metrics row for larger screens */}
      <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {/* Inventory Turnover */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Turnover Rate</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {metrics.turnoverRate.toFixed(1)}x
                </p>
                <p className="text-sm text-gray-500 ml-1">annually</p>
              </div>
            </div>
            {React.createElement(turnoverTrend.icon, { className: `h-5 w-5 ${turnoverTrend.color}` })}
          </div>
          <div className="mt-2">
            <p className={`text-xs ${turnoverTrend.color}`}>
              {turnoverTrend.label} turnover rate
            </p>
          </div>
        </div>

        {/* Days to Turnover */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Days to Turn</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {Math.round(metrics.averageDaysToTurnover)}
                </p>
                <p className="text-sm text-gray-500 ml-1">days</p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-xs text-gray-500">
              Average inventory cycle
            </p>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-semibold text-orange-600">
                {metrics.lowStockItems}
              </p>
            </div>
            <Package className="h-5 w-5 text-orange-500" />
          </div>
          <div className="mt-2">
            <p className="text-xs text-gray-500">
              Items need reordering
            </p>
          </div>
        </div>

        {/* Out of Stock Items */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-semibold text-red-600">
                {metrics.outOfStockItems}
              </p>
            </div>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <div className="mt-2">
            <p className="text-xs text-gray-500">
              Items unavailable
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}