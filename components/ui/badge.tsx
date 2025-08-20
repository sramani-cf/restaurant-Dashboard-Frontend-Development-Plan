import * as React from 'react';
import { cn } from './utils';

const badgeVariants = {
  variant: {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    success: 'bg-green-500 text-white hover:bg-green-600',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
    error: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'border border-input bg-background text-foreground hover:bg-accent',
    ghost: 'text-foreground hover:bg-accent',
  },
  size: {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm',
  },
} as const;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants.variant;
  size?: keyof typeof badgeVariants.size;
  pulse?: boolean;
}

function Badge({
  className,
  variant = 'default',
  size = 'md',
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        // Base styles
        'inline-flex items-center rounded-full font-semibold transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        // Variant and size styles
        badgeVariants.variant[variant],
        badgeVariants.size[size],
        // Pulse animation
        pulse && 'animate-pulse',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Status-specific badge components for common use cases
export function StatusBadge({ 
  status, 
  className, 
  ...props 
}: { status: 'online' | 'busy' | 'offline' | 'pending' | 'completed' | 'cancelled' } & Omit<BadgeProps, 'variant'>) {
  const variantMap = {
    online: 'success' as const,
    completed: 'success' as const,
    busy: 'warning' as const,
    pending: 'warning' as const,
    offline: 'secondary' as const,
    cancelled: 'error' as const,
  };

  return (
    <Badge 
      variant={variantMap[status]} 
      className={cn('capitalize', className)} 
      {...props}
    >
      <div className="mr-1 h-2 w-2 rounded-full bg-current opacity-75" />
      {status}
    </Badge>
  );
}

// Priority badge for orders, tasks, etc.
export function PriorityBadge({ 
  priority, 
  className, 
  ...props 
}: { priority: 'low' | 'medium' | 'high' | 'urgent' } & Omit<BadgeProps, 'variant'>) {
  const variantMap = {
    low: 'secondary' as const,
    medium: 'default' as const,
    high: 'warning' as const,
    urgent: 'error' as const,
  };

  return (
    <Badge 
      variant={variantMap[priority]} 
      className={cn('capitalize', className)}
      pulse={priority === 'urgent'}
      {...props}
    >
      {priority}
    </Badge>
  );
}

export { Badge, badgeVariants };