import * as React from 'react';
import { cn } from './utils';

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'circular' | 'text' | 'card';
  width?: string | number;
  height?: string | number;
  lines?: number; // For text variant
  animate?: boolean;
}

function Skeleton({
  className,
  variant = 'default',
  width,
  height,
  lines = 1,
  animate = true,
  style,
  ...props
}: SkeletonProps) {
  const baseClasses = cn(
    'bg-muted',
    animate && 'animate-pulse',
    {
      'rounded-md': variant === 'default' || variant === 'card',
      'rounded-full': variant === 'circular',
      'rounded': variant === 'text',
    },
    className
  );

  const inlineStyles = {
    width: width,
    height: height,
    ...style,
  };

  // For text variant with multiple lines
  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2" {...props}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              i === lines - 1 ? 'w-3/4' : 'w-full' // Last line is shorter
            )}
            style={{
              height: height || '1rem',
              width: i === lines - 1 ? '75%' : width || '100%',
            }}
          />
        ))}
      </div>
    );
  }

  // Default height based on variant
  const getDefaultHeight = () => {
    if (height) return height;
    switch (variant) {
      case 'text':
        return '1rem';
      case 'circular':
        return '2.5rem';
      case 'card':
        return '8rem';
      default:
        return '1.25rem';
    }
  };

  // Default width based on variant
  const getDefaultWidth = () => {
    if (width) return width;
    switch (variant) {
      case 'circular':
        return '2.5rem';
      default:
        return '100%';
    }
  };

  const defaultHeight = getDefaultHeight();
  const defaultWidth = getDefaultWidth();

  return (
    <div
      className={baseClasses}
      style={{
        ...inlineStyles,
        height: inlineStyles.height || defaultHeight,
        width: inlineStyles.width || defaultWidth,
      }}
      {...props}
    />
  );
}

// Predefined skeleton patterns for common use cases
export function SkeletonCard({ className, ...props }: Omit<SkeletonProps, 'variant'>) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      <Skeleton variant="card" height="12rem" />
      <div className="space-y-2">
        <Skeleton height="1.25rem" />
        <Skeleton height="1rem" width="80%" />
      </div>
    </div>
  );
}

export function SkeletonAvatar({ 
  className, 
  size = 'md',
  ...props 
}: Omit<SkeletonProps, 'variant'> & { size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = {
    sm: '2rem',
    md: '2.5rem',
    lg: '3rem',
  };
  
  return (
    <Skeleton
      variant="circular"
      width={sizeMap[size]}
      height={sizeMap[size]}
      className={className}
      {...props}
    />
  );
}

export function SkeletonText({ 
  lines = 3,
  className,
  ...props 
}: Omit<SkeletonProps, 'variant'>) {
  return (
    <Skeleton
      variant="text"
      lines={lines}
      className={className}
      {...props}
    />
  );
}

export function SkeletonTable({ 
  rows = 5,
  columns = 4,
  className,
  ...props 
}: Omit<SkeletonProps, 'variant'> & { rows?: number; columns?: number }) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      {/* Header */}
      <div className="flex space-x-4">
        {Array.from({ length: columns }, (_, i) => (
          <Skeleton key={`header-${i}`} height="1.5rem" className="flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex space-x-4">
          {Array.from({ length: columns }, (_, colIndex) => (
            <Skeleton key={`cell-${rowIndex}-${colIndex}`} height="1.25rem" className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export { Skeleton };