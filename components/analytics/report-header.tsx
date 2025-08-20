'use client';

import { format } from 'date-fns';
import { Calendar, Download, RefreshCw, Settings } from 'lucide-react';
import { DateRange } from '@/lib/analytics/types';

interface ReportHeaderProps {
  title: string;
  description?: string;
  dateRange?: DateRange;
  lastUpdated?: Date;
  isLoading?: boolean;
  onRefresh?: () => void;
  onExport?: () => void;
  onSettings?: () => void;
  actions?: React.ReactNode;
}

export function ReportHeader({
  title,
  description,
  dateRange,
  lastUpdated,
  isLoading = false,
  onRefresh,
  onExport,
  onSettings,
  actions
}: ReportHeaderProps) {
  const formatDateRange = (range: DateRange) => {
    const fromDate = format(range.from, 'MMM d, yyyy');
    const toDate = format(range.to, 'MMM d, yyyy');
    
    if (fromDate === toDate) {
      return fromDate;
    }
    
    return `${fromDate} - ${toDate}`;
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900 truncate">
              {title}
            </h1>
            
            {isLoading && (
              <div className="flex items-center text-sm text-gray-500">
                <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                Generating...
              </div>
            )}
          </div>
          
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
          
          <div className="flex items-center space-x-4 mt-2">
            {dateRange && (
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDateRange(dateRange)}
              </div>
            )}
            
            {lastUpdated && (
              <div className="text-sm text-gray-500">
                Last updated: {format(lastUpdated, 'MMM d, yyyy h:mm a')}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          {actions}
          
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          )}
          
          {onExport && (
            <button
              onClick={onExport}
              disabled={isLoading}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          )}
          
          {onSettings && (
            <button
              onClick={onSettings}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}