'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DateRangePicker, type DateRange } from '@/components/ui/date-range-picker';
import { Badge } from '@/components/ui/badge';
import { 
  startOfDay, 
  endOfDay, 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth,
  subDays,
  subWeeks,
  subMonths,
  format,
  isToday,
  isYesterday,
  isThisWeek,
  isThisMonth
} from 'date-fns';
import { Calendar, Clock, TrendingUp, RefreshCw } from 'lucide-react';

interface DateFilterProps {
  value?: DateRange;
  onChange?: (dateRange: DateRange | undefined) => void;
  onRefresh?: () => void;
  isLoading?: boolean;
  className?: string;
}

type PresetKey = 'today' | 'yesterday' | 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth' | 'last7Days' | 'last30Days' | 'last90Days';

interface DatePreset {
  key: PresetKey;
  label: string;
  dateRange: DateRange;
  description: string;
}

function getDatePresets(): DatePreset[] {
  const now = new Date();
  
  return [
    {
      key: 'today',
      label: 'Today',
      dateRange: {
        from: startOfDay(now),
        to: endOfDay(now)
      },
      description: format(now, 'MMM d, yyyy')
    },
    {
      key: 'yesterday',
      label: 'Yesterday',
      dateRange: {
        from: startOfDay(subDays(now, 1)),
        to: endOfDay(subDays(now, 1))
      },
      description: format(subDays(now, 1), 'MMM d, yyyy')
    },
    {
      key: 'last7Days',
      label: 'Last 7 Days',
      dateRange: {
        from: startOfDay(subDays(now, 6)),
        to: endOfDay(now)
      },
      description: `${format(subDays(now, 6), 'MMM d')} - ${format(now, 'MMM d')}`
    },
    {
      key: 'thisWeek',
      label: 'This Week',
      dateRange: {
        from: startOfWeek(now, { weekStartsOn: 1 }),
        to: endOfWeek(now, { weekStartsOn: 1 })
      },
      description: `${format(startOfWeek(now, { weekStartsOn: 1 }), 'MMM d')} - ${format(endOfWeek(now, { weekStartsOn: 1 }), 'MMM d')}`
    },
    {
      key: 'lastWeek',
      label: 'Last Week',
      dateRange: {
        from: startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 }),
        to: endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 })
      },
      description: `${format(startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 }), 'MMM d')} - ${format(endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 }), 'MMM d')}`
    },
    {
      key: 'last30Days',
      label: 'Last 30 Days',
      dateRange: {
        from: startOfDay(subDays(now, 29)),
        to: endOfDay(now)
      },
      description: `${format(subDays(now, 29), 'MMM d')} - ${format(now, 'MMM d')}`
    },
    {
      key: 'thisMonth',
      label: 'This Month',
      dateRange: {
        from: startOfMonth(now),
        to: endOfMonth(now)
      },
      description: format(now, 'MMMM yyyy')
    },
    {
      key: 'lastMonth',
      label: 'Last Month',
      dateRange: {
        from: startOfMonth(subMonths(now, 1)),
        to: endOfMonth(subMonths(now, 1))
      },
      description: format(subMonths(now, 1), 'MMMM yyyy')
    },
    {
      key: 'last90Days',
      label: 'Last 90 Days',
      dateRange: {
        from: startOfDay(subDays(now, 89)),
        to: endOfDay(now)
      },
      description: `${format(subDays(now, 89), 'MMM d')} - ${format(now, 'MMM d')}`
    }
  ];
}

function getActivePreset(dateRange: DateRange | undefined): PresetKey | null {
  if (!dateRange?.from || !dateRange?.to) return null;
  
  const presets = getDatePresets();
  
  for (const preset of presets) {
    if (
      preset.dateRange.from.getTime() === dateRange.from.getTime() &&
      preset.dateRange.to.getTime() === dateRange.to.getTime()
    ) {
      return preset.key;
    }
  }
  
  return null;
}

function formatDateRangeDisplay(dateRange: DateRange | undefined): string {
  if (!dateRange?.from) return 'Select date range';
  
  if (!dateRange.to) {
    return format(dateRange.from, 'MMM d, yyyy');
  }
  
  if (isToday(dateRange.from) && isToday(dateRange.to)) {
    return 'Today';
  }
  
  if (isYesterday(dateRange.from) && isYesterday(dateRange.to)) {
    return 'Yesterday';
  }
  
  if (dateRange.from.getTime() === dateRange.to.getTime()) {
    return format(dateRange.from, 'MMM d, yyyy');
  }
  
  if (dateRange.from.getFullYear() === dateRange.to.getFullYear()) {
    if (dateRange.from.getMonth() === dateRange.to.getMonth()) {
      return `${format(dateRange.from, 'MMM d')} - ${format(dateRange.to, 'd, yyyy')}`;
    }
    return `${format(dateRange.from, 'MMM d')} - ${format(dateRange.to, 'MMM d, yyyy')}`;
  }
  
  return `${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`;
}

export function DateFilter({ value, onChange, onRefresh, isLoading, className }: DateFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialize from URL params if available
  useEffect(() => {
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    
    if (fromParam && toParam && !value) {
      const from = new Date(fromParam);
      const to = new Date(toParam);
      
      if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
        onChange?.({ from, to });
      }
    }
  }, [searchParams, value, onChange]);
  
  // Update URL when date range changes
  const updateURL = (dateRange: DateRange | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (dateRange?.from && dateRange?.to) {
      params.set('from', dateRange.from.toISOString());
      params.set('to', dateRange.to.toISOString());
    } else {
      params.delete('from');
      params.delete('to');
    }
    
    router.push(`?${params.toString()}`, { scroll: false });
  };
  
  const handleDateRangeChange = (dateRange: DateRange | undefined) => {
    onChange?.(dateRange);
    updateURL(dateRange);
    setIsOpen(false);
  };
  
  const handlePresetClick = (preset: DatePreset) => {
    handleDateRangeChange(preset.dateRange);
  };
  
  const clearFilter = () => {
    handleDateRangeChange(undefined);
  };
  
  const presets = getDatePresets();
  const activePreset = getActivePreset(value);
  
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Date Range:</span>
            </div>
            
            <div className="flex items-center gap-2">
              <DateRangePicker
                value={value}
                onChange={handleDateRangeChange}
                placeholder="Select date range"
                className="w-auto"
              />
              
              {value && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilter}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {onRefresh && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            )}
          </div>
        </div>
        
        {/* Current Selection Display */}
        {value && (
          <div className="mt-3 flex items-center gap-2">
            <Clock className="h-3 w-3 text-blue-500" />
            <span className="text-sm text-blue-600 font-medium">
              {formatDateRangeDisplay(value)}
            </span>
            {activePreset && (
              <Badge variant="secondary" className="text-xs">
                {presets.find(p => p.key === activePreset)?.label}
              </Badge>
            )}
          </div>
        )}
        
        {/* Quick Presets */}
        <div className="mt-4">
          <div className="text-xs font-medium text-gray-500 mb-2">Quick Select:</div>
          <div className="flex flex-wrap gap-2">
            {presets.slice(0, 6).map((preset) => (
              <Button
                key={preset.key}
                variant={activePreset === preset.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePresetClick(preset)}
                className="text-xs"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Extended Presets (collapsed by default) */}
        {isOpen && (
          <div className="mt-2">
            <div className="flex flex-wrap gap-2">
              {presets.slice(6).map((preset) => (
                <Button
                  key={preset.key}
                  variant={activePreset === preset.key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handlePresetClick(preset)}
                  className="text-xs"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {presets.length > 6 && (
          <div className="mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-xs text-gray-500"
            >
              {isOpen ? 'Show Less' : 'More Options'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Compact version for mobile or sidebar
export function CompactDateFilter({ value, onChange, onRefresh, isLoading }: DateFilterProps) {
  const presets = getDatePresets();
  const activePreset = getActivePreset(value);
  
  return (
    <div className="flex items-center gap-2">
      <DateRangePicker
        value={value}
        onChange={onChange}
        placeholder="Date range"
        className="w-auto"
      />
      
      {/* Common presets as badges */}
      <div className="flex gap-1">
        {presets.slice(0, 3).map((preset) => (
          <Button
            key={preset.key}
            variant={activePreset === preset.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChange?.(preset.dateRange)}
            className="text-xs px-2"
          >
            {preset.key === 'today' ? 'Today' : 
             preset.key === 'yesterday' ? 'Yesterday' : 
             preset.key === 'last7Days' ? '7D' : preset.label}
          </Button>
        ))}
      </div>
      
      {onRefresh && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
          className="p-1"
        >
          <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      )}
    </div>
  );
}

// Hook for managing date filter state
export function useDateFilter(defaultRange?: DateRange) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(defaultRange);
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    
    if (fromParam && toParam) {
      const from = new Date(fromParam);
      const to = new Date(toParam);
      
      if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
        setDateRange({ from, to });
      }
    }
  }, [searchParams]);
  
  return {
    dateRange,
    setDateRange,
    hasFilter: !!dateRange?.from && !!dateRange?.to
  };
}