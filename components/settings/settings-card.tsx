import { ReactNode } from 'react';
import { Card } from '../ui/card';
import { cn } from '../ui/utils';

interface SettingsCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerActions?: ReactNode;
  footer?: ReactNode;
  variant?: 'default' | 'warning' | 'error' | 'success';
}

export function SettingsCard({
  title,
  description,
  children,
  className,
  headerActions,
  footer,
  variant = 'default'
}: SettingsCardProps) {
  const variantStyles = {
    default: 'border-gray-200',
    warning: 'border-amber-200 bg-amber-50',
    error: 'border-red-200 bg-red-50',
    success: 'border-green-200 bg-green-50'
  };

  return (
    <Card className={cn(
      'transition-colors',
      variantStyles[variant],
      className
    )}>
      {(title || description || headerActions) && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              {title && (
                <h3 className={cn(
                  'text-lg font-medium leading-6',
                  variant === 'warning' ? 'text-amber-900' :
                  variant === 'error' ? 'text-red-900' :
                  variant === 'success' ? 'text-green-900' :
                  'text-gray-900'
                )}>
                  {title}
                </h3>
              )}
              {description && (
                <p className={cn(
                  'mt-1 text-sm leading-5',
                  variant === 'warning' ? 'text-amber-700' :
                  variant === 'error' ? 'text-red-700' :
                  variant === 'success' ? 'text-green-700' :
                  'text-gray-500'
                )}>
                  {description}
                </p>
              )}
            </div>
            {headerActions && (
              <div className="ml-4 flex-shrink-0">
                {headerActions}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="px-6 py-4">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          {footer}
        </div>
      )}
    </Card>
  );
}