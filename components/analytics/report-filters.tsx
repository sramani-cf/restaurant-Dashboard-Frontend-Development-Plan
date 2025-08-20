'use client';

import { useState } from 'react';
import { Calendar, Filter, X } from 'lucide-react';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from '@/lib/analytics/types';
import { format } from 'date-fns';

interface FilterValue {
  type: 'date' | 'select' | 'multiselect' | 'range';
  value: any;
  label: string;
}

interface ReportFiltersProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  comparisonPeriod?: DateRange;
  onComparisonPeriodChange?: (range?: DateRange) => void;
  additionalFilters?: Array<{
    id: string;
    label: string;
    type: 'select' | 'multiselect';
    options: Array<{ value: string; label: string }>;
    value: any;
    onChange: (value: any) => void;
  }>;
  showComparison?: boolean;
  isLoading?: boolean;
}

export function ReportFilters({
  dateRange,
  onDateRangeChange,
  comparisonPeriod,
  onComparisonPeriodChange,
  additionalFilters = [],
  showComparison = false,
  isLoading = false
}: ReportFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComparisonPicker, setShowComparisonPicker] = useState(!!comparisonPeriod);

  const activeFiltersCount = [
    comparisonPeriod ? 1 : 0,
    ...additionalFilters.map(filter => {
      if (filter.type === 'multiselect') {
        return Array.isArray(filter.value) ? filter.value.length : 0;
      }
      return filter.value ? 1 : 0;
    })
  ].reduce((sum, count) => sum + count, 0);

  const formatDateRange = (range: DateRange) => {
    const fromDate = format(range.from, 'MMM d');
    const toDate = format(range.to, 'MMM d, yyyy');
    
    if (format(range.from, 'yyyy-MM-dd') === format(range.to, 'yyyy-MM-dd')) {
      return format(range.from, 'MMM d, yyyy');
    }
    
    return `${fromDate} - ${toDate}`;
  };

  const toggleComparison = () => {
    if (showComparisonPicker) {
      setShowComparisonPicker(false);
      onComparisonPeriodChange?.(undefined);
    } else {
      setShowComparisonPicker(true);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        {/* Primary Filters Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Date Range Picker */}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <DateRangePicker
                value={dateRange}
                onChange={onDateRangeChange}
                disabled={isLoading}
                placeholder="Select date range"
              />
            </div>

            {/* Comparison Toggle */}
            {showComparison && (
              <button
                onClick={toggleComparison}
                className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  showComparisonPicker
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Compare
              </button>
            )}

            {/* Additional Filters Toggle */}
            {additionalFilters.length > 0 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Active Filters Summary */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <span>{activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active</span>
            </div>
          )}
        </div>

        {/* Comparison Period Picker */}
        {showComparisonPicker && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-blue-900">
                  Compare with:
                </label>
                <DateRangePicker
                  value={comparisonPeriod}
                  onChange={onComparisonPeriodChange}
                  disabled={isLoading}
                  placeholder="Select comparison period"
                />
              </div>
              <button
                onClick={toggleComparison}
                className="text-blue-600 hover:text-blue-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Additional Filters */}
        {isExpanded && additionalFilters.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {additionalFilters.map((filter) => (
                <div key={filter.id} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {filter.label}
                  </label>
                  
                  {filter.type === 'select' && (
                    <select
                      value={filter.value || ''}
                      onChange={(e) => filter.onChange(e.target.value || undefined)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      disabled={isLoading}
                    >
                      <option value="">All</option>
                      {filter.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {filter.type === 'multiselect' && (
                    <div className="space-y-2">
                      <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md bg-white">
                        {filter.options.map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center px-3 py-2 hover:bg-gray-50"
                          >
                            <input
                              type="checkbox"
                              checked={Array.isArray(filter.value) && filter.value.includes(option.value)}
                              onChange={(e) => {
                                const currentValue = Array.isArray(filter.value) ? filter.value : [];
                                if (e.target.checked) {
                                  filter.onChange([...currentValue, option.value]);
                                } else {
                                  filter.onChange(currentValue.filter(v => v !== option.value));
                                }
                              }}
                              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              disabled={isLoading}
                            />
                            <span className="text-sm text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Filter Actions */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => {
                  // Clear all additional filters
                  additionalFilters.forEach(filter => {
                    if (filter.type === 'multiselect') {
                      filter.onChange([]);
                    } else {
                      filter.onChange(undefined);
                    }
                  });
                }}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900"
                disabled={isLoading}
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {(comparisonPeriod || activeFiltersCount > 0) && (
        <div className="px-6 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            
            {comparisonPeriod && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Compare: {formatDateRange(comparisonPeriod)}
                <button
                  onClick={() => {
                    setShowComparisonPicker(false);
                    onComparisonPeriodChange?.(undefined);
                  }}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 text-blue-400 hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {additionalFilters.map((filter) => {
              let displayValue = '';
              if (filter.type === 'multiselect' && Array.isArray(filter.value) && filter.value.length > 0) {
                displayValue = `${filter.label}: ${filter.value.length} selected`;
              } else if (filter.type === 'select' && filter.value) {
                const option = filter.options.find(opt => opt.value === filter.value);
                displayValue = `${filter.label}: ${option?.label || filter.value}`;
              }

              if (!displayValue) return null;

              return (
                <span
                  key={filter.id}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {displayValue}
                  <button
                    onClick={() => {
                      if (filter.type === 'multiselect') {
                        filter.onChange([]);
                      } else {
                        filter.onChange(undefined);
                      }
                    }}
                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}