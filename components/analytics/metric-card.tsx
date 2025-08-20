'use client';

import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';
import { MetricValue } from '@/lib/analytics/types';

interface MetricCardProps {
  title: string;
  metric: MetricValue;
  description?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTarget?: boolean;
  targetLabel?: string;
}

export function MetricCard({
  title,
  metric,
  description,
  className = '',
  size = 'md',
  showTarget = false,
  targetLabel = 'Target'
}: MetricCardProps) {
  const formatValue = (value: number, unit?: string) => {
    if (unit === '$') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: value < 100 ? 2 : 0,
        maximumFractionDigits: 2
      }).format(value);
    }
    
    if (unit === '%') {
      return `${value.toFixed(1)}%`;
    }
    
    // Format large numbers
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    
    return value.toLocaleString();
  };

  const getChangeIcon = (changeType?: 'increase' | 'decrease' | 'neutral') => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="w-4 h-4" />;
      case 'decrease':
        return <TrendingDown className="w-4 h-4" />;
      case 'neutral':
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getChangeColor = (changeType?: 'increase' | 'decrease' | 'neutral') => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600 bg-green-50';
      case 'decrease':
        return 'text-red-600 bg-red-50';
      case 'neutral':
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const sizeClasses = {
    sm: {
      card: 'p-4',
      title: 'text-sm',
      value: 'text-xl',
      change: 'text-xs',
      description: 'text-xs'
    },
    md: {
      card: 'p-6',
      title: 'text-base',
      value: 'text-2xl',
      change: 'text-sm',
      description: 'text-sm'
    },
    lg: {
      card: 'p-8',
      title: 'text-lg',
      value: 'text-3xl',
      change: 'text-base',
      description: 'text-base'
    }
  };

  const classes = sizeClasses[size];

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${classes.card} ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={`font-medium text-gray-900 ${classes.title}`}>
            {title}
          </h3>
          
          <div className="mt-2">
            <p className={`font-bold text-gray-900 ${classes.value}`}>
              {formatValue(metric.current, metric.unit)}
            </p>
          </div>

          {/* Change Indicator */}
          {metric.previous !== undefined && metric.change !== undefined && (
            <div className="mt-2 flex items-center">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium ${classes.change} ${getChangeColor(metric.changeType)}`}>
                {getChangeIcon(metric.changeType)}
                <span className="ml-1">
                  {metric.changePercent !== undefined 
                    ? `${metric.changePercent >= 0 ? '+' : ''}${metric.changePercent.toFixed(1)}%`
                    : formatValue(Math.abs(metric.change), metric.unit)
                  }
                </span>
              </span>
              
              {metric.previous !== undefined && (
                <span className={`ml-2 text-gray-500 ${classes.change}`}>
                  vs {formatValue(metric.previous, metric.unit)}
                </span>
              )}
            </div>
          )}

          {/* Target Indicator */}
          {showTarget && metric.target !== undefined && (
            <div className="mt-2 flex items-center">
              <Target className="w-4 h-4 text-gray-400 mr-1" />
              <span className={`text-gray-600 ${classes.change}`}>
                {targetLabel}: {formatValue(metric.target, metric.unit)}
              </span>
              
              {/* Target vs Current */}
              {metric.target !== metric.current && (
                <span className={`ml-2 ${classes.change} ${
                  metric.current >= metric.target ? 'text-green-600' : 'text-red-600'
                }`}>
                  ({metric.current >= metric.target ? 'Above' : 'Below'} by {formatValue(Math.abs(metric.current - metric.target), metric.unit)})
                </span>
              )}
            </div>
          )}

          {/* Description */}
          {description && (
            <p className={`mt-2 text-gray-600 ${classes.description}`}>
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Progress Bar for Target */}
      {showTarget && metric.target !== undefined && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className={`text-gray-600 ${classes.change}`}>Progress to Target</span>
            <span className={`font-medium ${classes.change} ${
              metric.current >= metric.target ? 'text-green-600' : 'text-gray-900'
            }`}>
              {((metric.current / metric.target) * 100).toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                metric.current >= metric.target ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{
                width: `${Math.min((metric.current / metric.target) * 100, 100)}%`
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Specialized metric cards for common use cases
export function RevenueCard({ metric, className, ...props }: Omit<MetricCardProps, 'title' | 'metric'> & { metric: MetricValue }) {
  return (
    <MetricCard
      title="Total Revenue"
      metric={{ ...metric, unit: '$' }}
      description="Total revenue for the selected period"
      className={className}
      {...props}
    />
  );
}

export function OrdersCard({ metric, className, ...props }: Omit<MetricCardProps, 'title' | 'metric'> & { metric: MetricValue }) {
  return (
    <MetricCard
      title="Total Orders"
      metric={metric}
      description="Number of orders completed"
      className={className}
      {...props}
    />
  );
}

export function AOVCard({ metric, className, ...props }: Omit<MetricCardProps, 'title' | 'metric'> & { metric: MetricValue }) {
  return (
    <MetricCard
      title="Average Order Value"
      metric={{ ...metric, unit: '$' }}
      description="Average value per order"
      className={className}
      {...props}
    />
  );
}

export function LaborCostCard({ metric, className, ...props }: Omit<MetricCardProps, 'title' | 'metric'> & { metric: MetricValue }) {
  return (
    <MetricCard
      title="Labor Cost %"
      metric={{ ...metric, unit: '%' }}
      description="Labor cost as percentage of sales"
      showTarget
      targetLabel="Target"
      className={className}
      {...props}
    />
  );
}