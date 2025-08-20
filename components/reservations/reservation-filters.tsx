'use client';

import React from 'react';
import { ReservationFilters } from '@/lib/reservations/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ReservationFiltersProps {
  filters: ReservationFilters;
  onFiltersChange: (filters: ReservationFilters) => void;
}

export function ReservationFilters({ filters, onFiltersChange }: ReservationFiltersProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          label="Date"
          type="date"
          value={filters.date || ''}
          onChange={(e) => onFiltersChange({ ...filters, date: e.target.value })}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => onFiltersChange({ 
              ...filters, 
              status: e.target.value ? [e.target.value as any] : undefined 
            })}
          >
            <option value="">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="seated">Seated</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="no-show">No Show</option>
          </select>
        </div>

        <Input
          label="Min Party Size"
          type="number"
          min="1"
          value={filters.partySize?.min || ''}
          onChange={(e) => onFiltersChange({
            ...filters,
            partySize: { ...filters.partySize, min: parseInt(e.target.value) || undefined }
          })}
        />

        <Input
          label="Max Party Size"
          type="number"
          min="1"
          value={filters.partySize?.max || ''}
          onChange={(e) => onFiltersChange({
            ...filters,
            partySize: { ...filters.partySize, max: parseInt(e.target.value) || undefined }
          })}
        />
      </div>

      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() => onFiltersChange({})}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}