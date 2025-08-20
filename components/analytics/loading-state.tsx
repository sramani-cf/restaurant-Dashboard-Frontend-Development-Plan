'use client';

import { RefreshCw, BarChart3, TrendingUp } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  type?: 'report' | 'chart' | 'data' | 'export';
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingState({ 
  message = 'Loading...', 
  type = 'report',
  size = 'md'
}: LoadingStateProps) {
  const sizeClasses = {
    sm: {
      container: 'p-6',
      icon: 'w-6 h-6',
      text: 'text-sm',
      subtext: 'text-xs'
    },
    md: {
      container: 'p-12',
      icon: 'w-8 h-8',
      text: 'text-base',
      subtext: 'text-sm'
    },
    lg: {
      container: 'p-16',
      icon: 'w-12 h-12',
      text: 'text-lg',
      subtext: 'text-base'
    }
  };

  const classes = sizeClasses[size];

  const getIcon = () => {
    switch (type) {
      case 'chart':
        return <BarChart3 className={`${classes.icon} text-blue-500 animate-pulse`} />;
      case 'data':
        return <TrendingUp className={`${classes.icon} text-green-500 animate-pulse`} />;
      case 'export':
        return <RefreshCw className={`${classes.icon} text-orange-500 animate-spin`} />;
      case 'report':
      default:
        return <RefreshCw className={`${classes.icon} text-blue-500 animate-spin`} />;
    }
  };

  const getMessage = () => {
    switch (type) {
      case 'chart':
        return 'Generating chart...';
      case 'data':
        return 'Processing data...';
      case 'export':
        return 'Preparing export...';
      case 'report':
      default:
        return 'Generating report...';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${classes.container}`}>
      {getIcon()}
      
      <div className={`mt-4 font-medium text-gray-900 ${classes.text}`}>
        {message || getMessage()}
      </div>
      
      {type === 'report' && (
        <div className={`mt-2 text-gray-600 text-center max-w-md ${classes.subtext}`}>
          This may take a few moments depending on the date range and data volume.
        </div>
      )}

      {type === 'export' && (
        <div className={`mt-2 text-gray-600 text-center max-w-md ${classes.subtext}`}>
          Formatting your data for download...
        </div>
      )}

      {/* Animated Progress Dots */}
      <div className="flex space-x-1 mt-6">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Skeleton components for specific loading states
export function MetricCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="flex items-center space-x-2">
          <div className="h-5 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
}

export function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div 
          className="bg-gray-100 rounded"
          style={{ height: `${height}px` }}
        >
          <div className="h-full flex items-end justify-around p-6">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-t"
                style={{
                  height: `${Math.random() * 60 + 40}%`,
                  width: '12%'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ 
  rows = 5, 
  columns = 4 
}: { 
  rows?: number; 
  columns?: number;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="animate-pulse">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: columns }).map((_, index) => (
              <div key={index} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>

        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="border-b border-gray-100 px-6 py-4 last:border-b-0">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div key={colIndex} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReportSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <MetricCardSkeleton key={index} />
        ))}
      </div>

      {/* Chart */}
      <ChartSkeleton />

      {/* Table */}
      <TableSkeleton />
    </div>
  );
}