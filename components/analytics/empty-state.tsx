'use client';

import { FileText, BarChart3, Calendar, Filter, Plus, Search, TrendingUp } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  type?: 'no-data' | 'no-results' | 'first-time' | 'filtered' | 'date-range';
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showIllustration?: boolean;
}

export function EmptyState({
  title,
  message,
  type = 'no-data',
  icon,
  actions,
  size = 'md',
  showIllustration = true
}: EmptyStateProps) {
  const sizeClasses = {
    sm: {
      container: 'p-6',
      icon: 'w-12 h-12',
      title: 'text-lg',
      message: 'text-sm',
      illustration: 'w-32 h-32'
    },
    md: {
      container: 'p-12',
      icon: 'w-16 h-16',
      title: 'text-xl',
      message: 'text-base',
      illustration: 'w-48 h-48'
    },
    lg: {
      container: 'p-16',
      icon: 'w-20 h-20',
      title: 'text-2xl',
      message: 'text-lg',
      illustration: 'w-64 h-64'
    }
  };

  const classes = sizeClasses[size];

  const getEmptyStateConfig = () => {
    switch (type) {
      case 'no-results':
        return {
          icon: <Search className={`${classes.icon} text-gray-400`} />,
          defaultTitle: 'No results found',
          defaultMessage: 'Try adjusting your search or filter criteria to find what you\'re looking for.',
          iconBg: 'bg-gray-100'
        };
      case 'first-time':
        return {
          icon: <TrendingUp className={`${classes.icon} text-blue-500`} />,
          defaultTitle: 'Welcome to Analytics',
          defaultMessage: 'Start generating reports to see your business insights here.',
          iconBg: 'bg-blue-100'
        };
      case 'filtered':
        return {
          icon: <Filter className={`${classes.icon} text-orange-500`} />,
          defaultTitle: 'No data matches your filters',
          defaultMessage: 'Try expanding your filter criteria or selecting a different date range.',
          iconBg: 'bg-orange-100'
        };
      case 'date-range':
        return {
          icon: <Calendar className={`${classes.icon} text-purple-500`} />,
          defaultTitle: 'No data for this period',
          defaultMessage: 'There is no data available for the selected date range. Try selecting a different period.',
          iconBg: 'bg-purple-100'
        };
      case 'no-data':
      default:
        return {
          icon: <BarChart3 className={`${classes.icon} text-gray-400`} />,
          defaultTitle: 'No data available',
          defaultMessage: 'There is no data to display at this time.',
          iconBg: 'bg-gray-100'
        };
    }
  };

  const config = getEmptyStateConfig();
  const displayIcon = icon || config.icon;
  const displayTitle = title || config.defaultTitle;
  const displayMessage = message || config.defaultMessage;

  // Simple illustration component
  const EmptyStateIllustration = () => (
    <svg 
      className={`${classes.illustration} text-gray-300 mb-6`}
      fill="currentColor"
      viewBox="0 0 200 200"
    >
      {/* Chart bars */}
      <rect x="30" y="120" width="20" height="60" rx="2" opacity="0.3" />
      <rect x="60" y="100" width="20" height="80" rx="2" opacity="0.5" />
      <rect x="90" y="140" width="20" height="40" rx="2" opacity="0.3" />
      <rect x="120" y="80" width="20" height="100" rx="2" opacity="0.7" />
      <rect x="150" y="110" width="20" height="70" rx="2" opacity="0.4" />
      
      {/* Axes */}
      <line x1="20" y1="190" x2="180" y2="190" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <line x1="20" y1="190" x2="20" y2="50" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      
      {/* Dots for empty state */}
      <circle cx="100" cy="100" r="3" opacity="0.2" />
      <circle cx="110" cy="110" r="2" opacity="0.15" />
      <circle cx="90" cy="90" r="2" opacity="0.15" />
    </svg>
  );

  return (
    <div className={`flex flex-col items-center justify-center text-center ${classes.container}`}>
      {/* Illustration */}
      {showIllustration && <EmptyStateIllustration />}
      
      {/* Icon */}
      {!showIllustration && (
        <div className={`flex items-center justify-center w-16 h-16 rounded-full ${config.iconBg} mb-6`}>
          {displayIcon}
        </div>
      )}

      {/* Title */}
      <h3 className={`font-semibold text-gray-900 mb-2 ${classes.title}`}>
        {displayTitle}
      </h3>

      {/* Message */}
      <p className={`text-gray-600 max-w-md mb-6 ${classes.message}`}>
        {displayMessage}
      </p>

      {/* Actions */}
      {actions && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {actions}
        </div>
      )}

      {/* Default actions based on type */}
      {!actions && type === 'filtered' && (
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
          <Filter className="w-4 h-4 mr-2" />
          Clear Filters
        </button>
      )}

      {!actions && type === 'first-time' && (
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Generate First Report
        </button>
      )}
    </div>
  );
}

// Specialized empty states for common scenarios
export function NoDataEmptyState({ onRetry, ...props }: Omit<EmptyStateProps, 'type'> & { onRetry?: () => void }) {
  return (
    <EmptyState
      type="no-data"
      actions={
        onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Refresh Data
          </button>
        )
      }
      {...props}
    />
  );
}

export function NoResultsEmptyState({ 
  onClearFilters,
  onExpandSearch,
  ...props 
}: Omit<EmptyStateProps, 'type'> & { 
  onClearFilters?: () => void;
  onExpandSearch?: () => void;
}) {
  return (
    <EmptyState
      type="no-results"
      actions={
        <div className="flex flex-col sm:flex-row gap-2">
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </button>
          )}
          {onExpandSearch && (
            <button
              onClick={onExpandSearch}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
            >
              <Search className="w-4 h-4 mr-2" />
              Expand Search
            </button>
          )}
        </div>
      }
      {...props}
    />
  );
}

export function DateRangeEmptyState({ 
  onChangeDateRange,
  suggestedRanges = [],
  ...props 
}: Omit<EmptyStateProps, 'type'> & { 
  onChangeDateRange?: (range: string) => void;
  suggestedRanges?: Array<{ label: string; value: string }>;
}) {
  return (
    <EmptyState
      type="date-range"
      actions={
        <div className="flex flex-col items-center gap-4">
          {onChangeDateRange && suggestedRanges.length > 0 && (
            <>
              <p className="text-sm text-gray-600">Try these date ranges:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => onChangeDateRange(range.value)}
                    className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </>
          )}
          {onChangeDateRange && (
            <button
              onClick={() => onChangeDateRange('last-30-days')}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
            >
              <Calendar className="w-4 h-4 mr-2" />
              View Last 30 Days
            </button>
          )}
        </div>
      }
      {...props}
    />
  );
}

export function FirstTimeEmptyState({ 
  onGenerateReport,
  reportType = 'Sales Summary',
  ...props 
}: Omit<EmptyStateProps, 'type'> & { 
  onGenerateReport?: () => void;
  reportType?: string;
}) {
  return (
    <EmptyState
      type="first-time"
      title={`Welcome to ${reportType}`}
      message="Generate your first report to start seeing valuable business insights and analytics."
      actions={
        onGenerateReport && (
          <button
            onClick={onGenerateReport}
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Generate Report
          </button>
        )
      }
      {...props}
    />
  );
}