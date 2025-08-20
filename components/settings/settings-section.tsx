import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SettingsSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export function SettingsSection({
  title,
  description,
  children,
  className,
  actions,
  collapsible = false,
  defaultExpanded = true
}: SettingsSectionProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {(title || description || actions) && (
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900 leading-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="ml-4 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      )}
      
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}