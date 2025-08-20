'use client';

import { useState } from 'react';
import { OrderFilters, OrderStatus, OrderType, PaymentStatus } from '@/lib/orders/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Search, X, Filter } from 'lucide-react';

interface OrderFiltersComponentProps {
  filters: OrderFilters;
  onFiltersChange: (filters: OrderFilters) => void;
}

export function OrderFilters({ filters, onFiltersChange }: OrderFiltersComponentProps) {
  const [localFilters, setLocalFilters] = useState<OrderFilters>(filters);

  const handleStatusToggle = (status: OrderStatus) => {
    const currentStatuses = localFilters.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status];
    
    const updated = { ...localFilters, status: newStatuses.length > 0 ? newStatuses : undefined };
    setLocalFilters(updated);
  };

  const handleTypeToggle = (type: OrderType) => {
    const currentTypes = localFilters.type || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    
    const updated = { ...localFilters, type: newTypes.length > 0 ? newTypes : undefined };
    setLocalFilters(updated);
  };

  const handleSearchChange = (value: string) => {
    const updated = { ...localFilters, searchTerm: value || undefined };
    setLocalFilters(updated);
  };

  const handleDateRangeChange = (range: { start: Date; end: Date } | null) => {
    const updated = {
      ...localFilters,
      dateRange: range ? {
        start: range.start.toISOString(),
        end: range.end.toISOString()
      } : undefined
    };
    setLocalFilters(updated);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(localFilters).length > 0;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search orders by number, customer, email, or phone..."
          value={localFilters.searchTerm || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Status Filters */}
      <div>
        <label className="text-sm font-medium mb-2 block">Order Status</label>
        <div className="flex flex-wrap gap-2">
          {Object.values(OrderStatus).map(status => (
            <Badge
              key={status}
              variant={localFilters.status?.includes(status) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleStatusToggle(status)}
            >
              {status.replace('_', ' ')}
            </Badge>
          ))}
        </div>
      </div>

      {/* Type Filters */}
      <div>
        <label className="text-sm font-medium mb-2 block">Order Type</label>
        <div className="flex flex-wrap gap-2">
          {Object.values(OrderType).map(type => (
            <Badge
              key={type}
              variant={localFilters.type?.includes(type) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleTypeToggle(type)}
            >
              {type.replace('_', ' ')}
            </Badge>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div>
        <label className="text-sm font-medium mb-2 block">Date Range</label>
        <DateRangePicker
          value={localFilters.dateRange ? {
            start: new Date(localFilters.dateRange.start),
            end: new Date(localFilters.dateRange.end)
          } : null}
          onChange={handleDateRangeChange}
        />
      </div>

      {/* Amount Range */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Min Amount</label>
          <Input
            type="number"
            placeholder="0.00"
            value={localFilters.minAmount || ''}
            onChange={(e) => setLocalFilters({
              ...localFilters,
              minAmount: e.target.value ? parseFloat(e.target.value) : undefined
            })}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Max Amount</label>
          <Input
            type="number"
            placeholder="999.99"
            value={localFilters.maxAmount || ''}
            onChange={(e) => setLocalFilters({
              ...localFilters,
              maxAmount: e.target.value ? parseFloat(e.target.value) : undefined
            })}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          disabled={!hasActiveFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
        <Button
          size="sm"
          onClick={handleApplyFilters}
        >
          <Filter className="h-4 w-4 mr-2" />
          Apply Filters
        </Button>
      </div>
    </div>
  );
}