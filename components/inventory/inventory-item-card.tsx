'use client';

import { useState } from 'react';
import { 
  Package, 
  AlertTriangle, 
  Clock, 
  MoreHorizontal,
  Edit,
  Move,
  Plus,
  Minus,
  Scan,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dropdown } from '@/components/ui/dropdown';
import { formatCurrency, formatQuantity } from '@/lib/inventory/calculations';
import { cn } from '@/utils';
import type { InventoryItem } from '@/lib/inventory/types';

interface InventoryItemCardProps {
  item: InventoryItem;
  onClick?: () => void;
  compact?: boolean;
  className?: string;
}

export function InventoryItemCard({ item, onClick, compact = false, className }: InventoryItemCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getStockStatus = () => {
    if (item.currentStock <= 0) {
      return { 
        status: 'out-of-stock', 
        color: 'bg-red-100 text-red-800 border-red-300', 
        label: 'Out of Stock',
        icon: AlertTriangle,
        iconColor: 'text-red-500'
      };
    }
    if (item.currentStock <= item.minimumStock) {
      return { 
        status: 'low-stock', 
        color: 'bg-orange-100 text-orange-800 border-orange-300', 
        label: 'Low Stock',
        icon: AlertTriangle,
        iconColor: 'text-orange-500'
      };
    }
    if (item.maximumStock && item.currentStock >= item.maximumStock) {
      return { 
        status: 'overstock', 
        color: 'bg-purple-100 text-purple-800 border-purple-300', 
        label: 'Overstock',
        icon: Package,
        iconColor: 'text-purple-500'
      };
    }
    return { 
      status: 'normal', 
      color: 'bg-green-100 text-green-800 border-green-300', 
      label: 'In Stock',
      icon: Package,
      iconColor: 'text-green-500'
    };
  };

  const getStockLevel = () => {
    if (item.maximumStock) {
      return (item.currentStock / item.maximumStock) * 100;
    }
    if (item.minimumStock > 0) {
      return Math.min((item.currentStock / (item.minimumStock * 2)) * 100, 100);
    }
    return 50; // Default if no thresholds set
  };

  const isExpiringSoon = () => {
    // In a real implementation, you'd check actual expiration dates
    return item.isPerishable && item.shelfLife && item.shelfLife <= 3;
  };

  const stockStatus = getStockStatus();
  const stockLevel = getStockLevel();
  const StatusIcon = stockStatus.icon;

  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md group',
        compact ? 'p-4' : 'p-6',
        onClick && 'cursor-pointer hover:border-blue-300',
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
                {item.name}
              </h3>
              {item.description && !compact && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
            
            {/* Actions Dropdown */}
            <Dropdown
              trigger={
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    'opacity-0 group-hover:opacity-100 transition-opacity',
                    isHovered && 'opacity-100'
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              }
              items={[
                {
                  icon: Eye,
                  label: 'View Details',
                  onClick: () => console.log('View details:', item.id)
                },
                {
                  icon: Edit,
                  label: 'Edit Item',
                  onClick: () => console.log('Edit item:', item.id)
                },
                {
                  icon: Move,
                  label: 'Transfer Stock',
                  onClick: () => console.log('Transfer stock:', item.id)
                },
                {
                  icon: Scan,
                  label: 'Scan Barcode',
                  onClick: () => console.log('Scan barcode:', item.id)
                }
              ]}
            />
          </div>

          {/* SKU and Supplier */}
          <div className="flex items-center space-x-2 mt-2">
            {item.sku && (
              <Badge variant="secondary" className="text-xs">
                {item.sku}
              </Badge>
            )}
            {item.supplierName && (
              <span className="text-xs text-gray-500 truncate">
                {item.supplierName}
              </span>
            )}
          </div>
        </div>

        {/* Item Image Placeholder */}
        <div className="ml-3 flex-shrink-0">
          <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Package className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Stock Information */}
      <div className="space-y-3">
        {/* Current Stock */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <StatusIcon className={cn('h-4 w-4', stockStatus.iconColor)} />
            <span className="text-sm font-medium text-gray-900">
              {formatQuantity(item.currentStock, 'units')}
            </span>
          </div>
          
          <Badge 
            variant="secondary" 
            className={cn('text-xs border', stockStatus.color)}
          >
            {stockStatus.label}
          </Badge>
        </div>

        {/* Stock Level Bar */}
        <div className="space-y-1">
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
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>Min: {formatQuantity(item.minimumStock, 'units')}</span>
            {item.maximumStock && (
              <span>Max: {formatQuantity(item.maximumStock, 'units')}</span>
            )}
          </div>
        </div>

        {/* Price and Alerts */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-900">
              {formatCurrency(item.costPrice)}
            </div>
            {item.averageCost && item.averageCost !== item.costPrice && (
              <div className="text-xs text-gray-500">
                Avg: {formatCurrency(item.averageCost)}
              </div>
            )}
          </div>

          {/* Alerts */}
          <div className="flex items-center space-x-1">
            {isExpiringSoon() && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300 text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Expiring
              </Badge>
            )}
            {item.isPerishable && (
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" title="Perishable item" />
            )}
          </div>
        </div>

        {/* Quick Actions */}
        {!compact && (
          <div className={cn(
            'flex items-center space-x-2 pt-3 border-t border-gray-100 transition-opacity',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Quick adjust stock:', item.id);
              }}
            >
              <Plus className="h-3 w-3 mr-1" />
              Adjust
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Quick transfer:', item.id);
              }}
            >
              <Move className="h-3 w-3 mr-1" />
              Transfer
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="w-8 h-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Quick scan:', item.id);
              }}
            >
              <Scan className="h-3 w-3" />
            </Button>
          </div>
        )}

        {/* Mobile Quick Actions */}
        {compact && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              Updated {new Date(item.updatedAt).toLocaleDateString()}
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                size="sm"
                variant="ghost"
                className="w-6 h-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Mobile adjust:', item.id);
                }}
              >
                <Plus className="h-3 w-3" />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                className="w-6 h-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Mobile transfer:', item.id);
                }}
              >
                <Move className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for touch interactions on mobile */}
      {isHovered && (
        <div className="absolute inset-0 bg-blue-50 bg-opacity-50 rounded-lg pointer-events-none sm:hidden" />
      )}
    </div>
  );
}