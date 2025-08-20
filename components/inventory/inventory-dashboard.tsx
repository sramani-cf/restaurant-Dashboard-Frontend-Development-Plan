'use client';

import { useState, useEffect } from 'react';
import { InventoryItemCard } from './inventory-item-card';
import { getInventoryItems } from '@/lib/inventory/data';
import type { InventoryItem, InventoryFilters, InventoryResponse } from '@/lib/inventory/types';

interface InventoryDashboardProps {
  initialData?: InventoryResponse;
  initialFilters?: InventoryFilters;
  view?: 'grid' | 'cards';
  onItemSelect?: (item: InventoryItem) => void;
  className?: string;
}

export function InventoryDashboard({ 
  initialData, 
  initialFilters, 
  view = 'grid',
  onItemSelect, 
  className 
}: InventoryDashboardProps) {
  const [data, setData] = useState<InventoryResponse>(
    initialData || { data: [], total: 0, page: 1, limit: 50 }
  );
  const [loading, setLoading] = useState(!initialData);

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

  if (loading) {
    return (
      <div className={className}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.data.length === 0) {
    return (
      <div className={`${className} flex items-center justify-center min-h-96`}>
        <div className="text-center">
          <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-xl">📦</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your filters or add new inventory items.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div 
        className={
          view === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6'
            : 'space-y-4 p-6'
        }
      >
        {data.data.map((item) => (
          <InventoryItemCard
            key={item.id}
            item={item}
            onClick={() => onItemSelect?.(item)}
            compact={view === 'cards'}
          />
        ))}
      </div>

      {/* Load More */}
      {data.total > data.data.length && (
        <div className="p-6 text-center">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Load more items ({data.total - data.data.length} remaining)
          </button>
        </div>
      )}
    </div>
  );
}