'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X, Package, Users, MapPin, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils';
import { getProductCategories, getSuppliers, getLocations } from '@/lib/inventory/data';
import type { InventoryFilters as InventoryFiltersType, ProductCategory, Supplier, Location } from '@/lib/inventory/types';

interface InventoryFiltersProps {
  initialFilters?: InventoryFiltersType;
  onFiltersChange?: (filters: InventoryFiltersType) => void;
  className?: string;
}

export function InventoryFilters({ initialFilters, onFiltersChange, className }: InventoryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<InventoryFiltersType>(initialFilters || {});
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load reference data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, suppliersData, locationsData] = await Promise.all([
          getProductCategories(),
          getSuppliers(),
          getLocations(),
        ]);
        
        setCategories(categoriesData);
        setSuppliers(suppliersData.data);
        setLocations(locationsData);
      } catch (error) {
        console.error('Failed to load filter data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Clear existing filter params
    ['search', 'category', 'supplier', 'location', 'status', 'lowStock', 'outOfStock', 'expiring'].forEach(key => {
      params.delete(key);
    });

    // Add current filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (typeof value === 'boolean') {
          if (value) params.set(key, 'true');
        } else if (key === 'categoryId') {
          params.set('category', value.toString());
        } else if (key === 'supplierId') {
          params.set('supplier', value.toString());
        } else if (key === 'locationId') {
          params.set('location', value.toString());
        } else {
          params.set(key, value.toString());
        }
      }
    });

    router.push(`?${params.toString()}`, { scroll: false });
    onFiltersChange?.(filters);
  }, [filters, router, searchParams, onFiltersChange]);

  const updateFilter = (key: keyof InventoryFiltersType, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const clearFilter = (key: keyof InventoryFiltersType) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const getActiveFiltersCount = () => {
    return Object.entries(filters).filter(([key, value]) => {
      if (key === 'search') return value && value.trim() !== '';
      return value !== undefined && value !== null && value !== '';
    }).length;
  };

  const quickFilters = [
    { key: 'lowStock', label: 'Low Stock', icon: Package, color: 'bg-orange-100 text-orange-800 border-orange-300' },
    { key: 'outOfStock', label: 'Out of Stock', icon: Package, color: 'bg-red-100 text-red-800 border-red-300' },
    { key: 'expiring', label: 'Expiring Soon', icon: Package, color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  ];

  if (loading) {
    return (
      <div className={`bg-white p-4 rounded-lg border border-gray-200 ${className}`}>
        <div className="flex flex-col sm:flex-row gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded animate-pulse flex-1"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="p-4">
        {/* Main filters row */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search items, SKUs, barcodes..."
              value={filters.search || ''}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filters.categoryId || ''}
            onChange={(e) => updateFilter('categoryId', e.target.value || undefined)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Supplier Filter */}
          <select
            value={filters.supplierId || ''}
            onChange={(e) => updateFilter('supplierId', e.target.value || undefined)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Suppliers</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>

          {/* Location Filter */}
          <select
            value={filters.locationId || ''}
            onChange={(e) => updateFilter('locationId', e.target.value || undefined)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>

          {/* Advanced Filters Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filters
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>
        </div>

        {/* Quick Filter Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {quickFilters.map((filter) => {
            const isActive = filters[filter.key as keyof InventoryFiltersType];
            const Icon = filter.icon;
            
            return (
              <button
                key={filter.key}
                onClick={() => updateFilter(filter.key as keyof InventoryFiltersType, !isActive)}
                className={cn(
                  'flex items-center px-3 py-1.5 rounded-full text-sm font-medium border transition-colors',
                  isActive
                    ? filter.color
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                )}
              >
                <Icon className="h-3 w-3 mr-1" />
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Advanced Filters Panel */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={filters.status || ''}
                  onChange={(e) => updateFilter('status', e.target.value as any || undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="discontinued">Discontinued</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange?.[0] || ''}
                    onChange={(e) => {
                      const min = e.target.value ? parseFloat(e.target.value) : undefined;
                      const max = filters.priceRange?.[1];
                      updateFilter('priceRange', min !== undefined || max !== undefined ? [min, max] : undefined);
                    }}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange?.[1] || ''}
                    onChange={(e) => {
                      const max = e.target.value ? parseFloat(e.target.value) : undefined;
                      const min = filters.priceRange?.[0];
                      updateFilter('priceRange', min !== undefined || max !== undefined ? [min, max] : undefined);
                    }}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Tags Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <Input
                  placeholder="Enter tags..."
                  value={filters.tags?.join(', ') || ''}
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                    updateFilter('tags', tags.length > 0 ? tags : undefined);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {getActiveFiltersCount() > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 mr-2">Active filters:</span>
                
                {filters.search && (
                  <Badge variant="secondary" className="flex items-center">
                    Search: "{filters.search}"
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => clearFilter('search')}
                    />
                  </Badge>
                )}

                {filters.categoryId && (
                  <Badge variant="secondary" className="flex items-center">
                    {categories.find(c => c.id === filters.categoryId)?.name}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => clearFilter('categoryId')}
                    />
                  </Badge>
                )}

                {filters.supplierId && (
                  <Badge variant="secondary" className="flex items-center">
                    {suppliers.find(s => s.id === filters.supplierId)?.name}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => clearFilter('supplierId')}
                    />
                  </Badge>
                )}

                {filters.locationId && (
                  <Badge variant="secondary" className="flex items-center">
                    {locations.find(l => l.id === filters.locationId)?.name}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => clearFilter('locationId')}
                    />
                  </Badge>
                )}

                {Object.entries(filters).map(([key, value]) => {
                  if (key === 'lowStock' && value) {
                    return (
                      <Badge key={key} variant="secondary" className="flex items-center">
                        Low Stock
                        <X
                          className="h-3 w-3 ml-1 cursor-pointer"
                          onClick={() => clearFilter(key as keyof InventoryFiltersType)}
                        />
                      </Badge>
                    );
                  }
                  return null;
                })}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                Clear all
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}