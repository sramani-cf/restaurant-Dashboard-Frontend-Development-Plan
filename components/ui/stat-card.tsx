import * as React from 'react';
import { cn } from './utils';
import { Card, CardContent } from './card';
import { Skeleton } from './skeleton';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    period?: string;
  };
  loading?: boolean;
  className?: string;
  variant?: 'default' | 'compact';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  onClick?: () => void;
  actions?: React.ReactNode;
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  loading = false,
  className,
  variant = 'default',
  color = 'default',
  onClick,
  actions,
}: StatCardProps) {
  const colorClasses = {
    default: '',
    primary: 'border-primary/20 bg-primary/5',
    success: 'border-green-500/20 bg-green-500/5',
    warning: 'border-yellow-500/20 bg-yellow-500/5',
    error: 'border-destructive/20 bg-destructive/5',
  };

  const trendClasses = {
    up: 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400',
    down: 'text-destructive bg-destructive/10 dark:bg-destructive/10 dark:text-destructive',
    neutral: 'text-muted-foreground bg-muted',
  };

  const getTrendIcon = (direction: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="h-3 w-3" />;
      case 'down':
        return <TrendingDown className="h-3 w-3" />;
      case 'neutral':
        return <Minus className="h-3 w-3" />;
    }
  };

  if (loading) {
    return (
      <Card className={cn(colorClasses[color], className)}>
        <CardContent className={variant === 'compact' ? 'p-4' : 'p-6'}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton height="1rem" width="60%" />
              {icon && <Skeleton variant="circular" width="2rem" height="2rem" />}
            </div>
            <Skeleton height="2rem" width="40%" />
            {subtitle && <Skeleton height="0.875rem" width="50%" />}
            {trend && (
              <div className="flex items-center space-x-1">
                <Skeleton variant="circular" width="1rem" height="1rem" />
                <Skeleton height="0.875rem" width="30%" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        'relative transition-all duration-200',
        colorClasses[color],
        onClick && 'cursor-pointer hover:shadow-md',
        className
      )}
      onClick={onClick}
    >
      <CardContent className={variant === 'compact' ? 'p-4' : 'p-6'}>
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground truncate">
              {title}
            </p>
            <div className="flex items-center space-x-2">
              {icon && (
                <div className={cn(
                  'p-2 rounded-lg',
                  color === 'default' ? 'bg-muted text-muted-foreground' : 'bg-background/50'
                )}>
                  {icon}
                </div>
              )}
              {actions && (
                <div className="flex items-center">
                  {actions}
                </div>
              )}
            </div>
          </div>

          {/* Value */}
          <div>
            <div className={cn(
              'font-bold tracking-tight',
              variant === 'compact' ? 'text-xl' : 'text-2xl lg:text-3xl'
            )}>
              {value}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">
                {subtitle}
              </p>
            )}
          </div>

          {/* Trend */}
          {trend && (
            <div className="flex items-center space-x-1">
              <div className={cn(
                'inline-flex items-center space-x-1 rounded-full px-2 py-0.5 text-xs font-medium',
                trendClasses[trend.direction]
              )}>
                {getTrendIcon(trend.direction)}
                <span>
                  {trend.direction === 'up' ? '+' : trend.direction === 'down' ? '-' : ''}
                  {Math.abs(trend.value)}%
                </span>
              </div>
              {trend.period && (
                <span className="text-xs text-muted-foreground">
                  vs {trend.period}
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Specialized stat card components
export interface MetricGridProps {
  metrics: StatCardProps[];
  loading?: boolean;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

function MetricGrid({
  metrics,
  loading = false,
  className,
  columns = 4,
}: MetricGridProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn(
      'grid gap-4',
      gridClasses[columns],
      className
    )}>
      {metrics.map((metric, index) => (
        <StatCard
          key={index}
          {...metric}
          loading={loading}
        />
      ))}
    </div>
  );
}

export interface ComparisonStatCardProps {
  title: string;
  current: {
    label: string;
    value: string | number;
  };
  previous: {
    label: string;
    value: string | number;
  };
  icon?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

function ComparisonStatCard({
  title,
  current,
  previous,
  icon,
  loading = false,
  className,
}: ComparisonStatCardProps) {
  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton height="1rem" width="60%" />
              {icon && <Skeleton variant="circular" width="2rem" height="2rem" />}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Skeleton height="0.875rem" width="70%" />
                <Skeleton height="1.5rem" width="50%" />
              </div>
              <div className="space-y-1">
                <Skeleton height="0.875rem" width="70%" />
                <Skeleton height="1.5rem" width="50%" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            {icon && (
              <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                {icon}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">{current.label}</p>
              <p className="text-xl font-bold">{current.value}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{previous.label}</p>
              <p className="text-xl font-bold">{previous.value}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { StatCard, MetricGrid, ComparisonStatCard };