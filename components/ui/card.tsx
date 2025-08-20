import * as React from 'react';
import { cn } from './utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg bg-card text-card-foreground',
          {
            'border border-border': variant === 'default' || variant === 'outlined',
            'shadow-sm': variant === 'default',
            'shadow-md': variant === 'elevated',
            'p-0': padding === 'none',
            'p-4': padding === 'sm',
            'p-6': padding === 'md',
            'p-8': padding === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, divider = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-1.5 p-6',
        divider && 'border-b border-border',
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padding = 'md', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        {
          'p-0': padding === 'none',
          'p-4': padding === 'sm',
          'p-6': padding === 'md',
          'p-8': padding === 'lg',
        },
        className
      )}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
  justify?: 'start' | 'center' | 'end' | 'between';
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, divider = false, justify = 'start', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center p-6 pt-0',
        {
          'border-t border-border pt-6': divider,
          'justify-start': justify === 'start',
          'justify-center': justify === 'center',
          'justify-end': justify === 'end',
          'justify-between': justify === 'between',
        },
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

// Specialized card variants for common use cases
export interface ActionCardProps extends CardProps {
  title: string;
  description?: string;
  action: React.ReactNode;
  icon?: React.ReactNode;
}

function ActionCard({
  title,
  description,
  action,
  icon,
  className,
  ...props
}: ActionCardProps) {
  return (
    <Card className={cn('transition-all hover:shadow-md', className)} {...props}>
      <CardHeader>
        <div className="flex items-center space-x-4">
          {icon && (
            <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
          <div className="flex-shrink-0">{action}</div>
        </div>
      </CardHeader>
    </Card>
  );
}

export interface MetricCardProps extends CardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period?: string;
  };
  icon?: React.ReactNode;
  loading?: boolean;
}

function MetricCard({
  label,
  value,
  change,
  icon,
  loading = false,
  className,
  ...props
}: MetricCardProps) {
  return (
    <Card className={className} {...props}>
      <CardContent>
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        <div>
          {loading ? (
            <div className="h-8 w-24 bg-muted rounded animate-pulse" />
          ) : (
            <div className="text-2xl font-bold">{value}</div>
          )}
          {change && !loading && (
            <p
              className={cn(
                'text-xs',
                change.type === 'increase'
                  ? 'text-green-600'
                  : 'text-destructive'
              )}
            >
              {change.type === 'increase' ? '+' : '-'}
              {Math.abs(change.value)}%
              {change.period && ` from ${change.period}`}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  ActionCard,
  MetricCard,
};