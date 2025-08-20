'use client';

import { useState, useEffect } from 'react';
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Package, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Scan,
  Move,
  Plus,
  Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dropdown } from '@/components/ui/dropdown';
import { formatCurrency, formatQuantity } from '@/lib/inventory/calculations';
import { getInventoryItems } from '@/lib/inventory/data';
import type { InventoryItem, InventoryFilters, InventoryResponse } from '@/lib/inventory/types';
import { cn } from '@/lib/utils';

interface InventoryTableProps {
  initialData?: InventoryResponse;
  initialFilters?: InventoryFilters;
  onItemSelect?: (item: InventoryItem) => void;
  className?: string;
}

export function InventoryTable({ initialData, initialFilters, onItemSelect, className }: InventoryTableProps) {
  const [data, setData] = useState<InventoryResponse>(initialData || { data: [], total: 0, page: 1, limit: 50 });
  const [loading, setLoading] = useState(!initialData);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Refetch data when filters change
  useEffect(() => {
    const fetchData = async () => {
      if (!initialData) {
        setLoading(true);
        try {
          const response = await getInventoryItems(initialFilters);
          setData(response);
        } catch (error) {
          console.error('Failed to fetch inventory data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [initialFilters, initialData]);

  const getStockStatus = (item: InventoryItem) => {
    if (item.currentStock <= 0) {
      return { status: 'out-of-stock', color: 'bg-red-100 text-red-800 border-red-300', label: 'Out of Stock' };
    }
    if (item.currentStock <= item.minimumStock) {
      return { status: 'low-stock', color: 'bg-orange-100 text-orange-800 border-orange-300', label: 'Low Stock' };
    }
    if (item.maximumStock && item.currentStock >= item.maximumStock) {
      return { status: 'overstock', color: 'bg-purple-100 text-purple-800 border-purple-300', label: 'Overstock' };
    }
    return { status: 'normal', color: 'bg-green-100 text-green-800 border-green-300', label: 'In Stock' };
  };

  const getStockLevel = (item: InventoryItem) => {
    if (item.maximumStock) {
      return (item.currentStock / item.maximumStock) * 100;
    }
    if (item.minimumStock > 0) {
      return Math.min((item.currentStock / (item.minimumStock * 2)) * 100, 100);
    }
    return 50; // Default if no thresholds set
  };

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.size === data.data.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(data.data.map(item => item.id)));
    }
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium text-gray-900">Inventory Items</h3>
            <Badge variant="secondary">{data.total} items</Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            {selectedItems.size > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedItems.size} selected
                </span>
                <Button size="sm" variant="outline">
                  <Move className="h-4 w-4 mr-1" />
                  Transfer
                </Button>
                <Button size="sm" variant="outline">
                  <Package className="h-4 w-4 mr-1" />
                  Adjust Stock
                </Button>
              </div>
            )}
            
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Item
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedItems.size === data.data.length && data.data.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Item</span>
                  {sortConfig?.key === 'name' && (
                    sortConfig.direction === 'asc' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU / Barcode
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('currentStock')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Stock Level</span>
                  {sortConfig?.key === 'currentStock' && (
                    sortConfig.direction === 'asc' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('costPrice')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Cost Price</span>
                  {sortConfig?.key === 'costPrice' && (
                    sortConfig.direction === 'asc' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.data.map((item) => {
              const stockStatus = getStockStatus(item);
              const stockLevel = getStockLevel(item);
              
              return (
                <tr
                  key={item.id}
                  className={cn(
                    'hover:bg-gray-50 transition-colors',
                    selectedItems.has(item.id) && 'bg-blue-50'
                  )}
                  onClick={() => onItemSelect?.(item)}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSelectItem(item.id);
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600">
                          {item.name}
                        </div>
                        {item.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {item.description}
                          </div>
                        )}
                        <div className="flex items-center mt-1 space-x-2">
                          {item.supplierName && (
                            <span className="text-xs text-gray-500">{item.supplierName}</span>
                          )}
                          {item.isPerishable && (
                            <Badge variant="secondary" className="text-xs">Perishable</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>
                      {item.sku && <div className="font-medium">{item.sku}</div>}
                      {item.barcode && (
                        <div className="text-xs text-gray-500 font-mono">{item.barcode}</div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {formatQuantity(item.currentStock, 'units')}
                        </span>
                        {item.currentStock <= item.minimumStock && (
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                        )}
                      </div>
                      
                      {/* Stock level bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={cn(
                            'h-2 rounded-full transition-all',
                            stockLevel <= 25 ? 'bg-red-500' : 
                            stockLevel <= 50 ? 'bg-orange-500' : 'bg-green-500'
                          )}
                          style={{ width: `${Math.max(5, Math.min(100, stockLevel))}%` }}
                        />
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Min: {formatQuantity(item.minimumStock, 'units')}
                        {item.maximumStock && ` | Max: ${formatQuantity(item.maximumStock, 'units')}`}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{formatCurrency(item.costPrice)}</div>
                      {item.averageCost && item.averageCost !== item.costPrice && (
                        <div className="text-xs text-gray-500">
                          Avg: {formatCurrency(item.averageCost)}
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <Badge 
                      variant="secondary" 
                      className={cn('text-xs border', stockStatus.color)}
                    >
                      {stockStatus.label}
                    </Badge>
                  </td>
                  
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </td>
                  
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      }
                      items={[
                        {
                          icon: Edit,
                          label: 'Edit Item',
                          onClick: () => console.log('Edit item:', item.id)
                        },
                        {
                          icon: Scan,
                          label: 'Scan Barcode',
                          onClick: () => console.log('Scan barcode:', item.id)
                        },
                        {
                          icon: Move,
                          label: 'Transfer Stock',
                          onClick: () => console.log('Transfer stock:', item.id)
                        },
                        {
                          icon: Plus,
                          label: 'Adjust Stock',
                          onClick: () => console.log('Adjust stock:', item.id)
                        },
                        {
                          type: 'separator'
                        },
                        {
                          icon: Trash2,
                          label: 'Delete Item',
                          onClick: () => console.log('Delete item:', item.id),
                          className: 'text-red-600'
                        }
                      ]}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {data.data.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-sm font-medium text-gray-900 mb-2">No inventory items</h3>
          <p className="text-sm text-gray-500 mb-4">
            Get started by adding your first inventory item.
          </p>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Item
          </Button>
        </div>
      )}

      {/* Pagination */}
      {data.total > data.limit && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((data.page - 1) * data.limit) + 1} to {Math.min(data.page * data.limit, data.total)} of {data.total} items
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={data.page === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-700">
                Page {data.page} of {Math.ceil(data.total / data.limit)}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={data.page >= Math.ceil(data.total / data.limit)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}