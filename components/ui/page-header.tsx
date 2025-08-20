import * as React from 'react';
import { cn } from './utils';
import { Button } from './button';
import { Badge } from './badge';
import { ArrowLeft } from 'lucide-react';

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error';
  };
  breadcrumbs?: {
    label: string;
    href?: string;
    onClick?: () => void;
  }[];
  actions?: React.ReactNode;
  backButton?: {
    onClick: () => void;
    label?: string;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

function PageHeader({
  title,
  description,
  badge,
  breadcrumbs,
  actions,
  backButton,
  className,
  size = 'md',
}: PageHeaderProps) {
  const sizeClasses = {
    sm: {
      container: 'py-4',
      title: 'text-lg',
      description: 'text-sm',
    },
    md: {
      container: 'py-6',
      title: 'text-2xl',
      description: 'text-base',
    },
    lg: {
      container: 'py-8',
      title: 'text-3xl',
      description: 'text-lg',
    },
  };

  return (
    <div className={cn(
      'border-b border-border bg-background',
      sizeClasses[size].container,
      className
    )}>
      <div className="space-y-4">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="mx-1">/</span>}
                {crumb.href || crumb.onClick ? (
                  <button
                    onClick={crumb.onClick}
                    className="hover:text-foreground transition-colors"
                    type="button"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Main header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 min-w-0 flex-1">
            {/* Back button */}
            {backButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={backButton.onClick}
                className="mt-1 flex-shrink-0"
                aria-label={backButton.label || 'Go back'}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}

            <div className="min-w-0 flex-1">
              {/* Title and badge */}
              <div className="flex items-center space-x-3 mb-1">
                <h1 className={cn(
                  'font-bold tracking-tight text-foreground truncate',
                  sizeClasses[size].title
                )}>
                  {title}
                </h1>
                {badge && (
                  <Badge variant={badge.variant} size="sm">
                    {badge.text}
                  </Badge>
                )}
              </div>

              {/* Description */}
              {description && (
                <p className={cn(
                  'text-muted-foreground',
                  sizeClasses[size].description
                )}>
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          {actions && (
            <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Specialized page header variants
export interface DashboardPageHeaderProps {
  title: string;
  subtitle?: string;
  stats?: {
    label: string;
    value: string | number;
  }[];
  actions?: React.ReactNode;
  className?: string;
}

function DashboardPageHeader({
  title,
  subtitle,
  stats,
  actions,
  className,
}: DashboardPageHeaderProps) {
  return (
    <div className={cn('border-b border-border bg-background py-6', className)}>
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted-foreground mt-1">{subtitle}</p>
          )}
          
          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="flex items-center space-x-6 mt-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {actions && (
          <div className="flex items-center space-x-2 flex-shrink-0 ml-6">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

export interface ListPageHeaderProps {
  title: string;
  count?: number;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

function ListPageHeader({
  title,
  count,
  searchPlaceholder = 'Search...',
  onSearch,
  filters,
  actions,
  className,
}: ListPageHeaderProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <div className={cn('border-b border-border bg-background py-6', className)}>
      <div className="space-y-4">
        {/* Title and count */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {title}
              {typeof count === 'number' && (
                <span className="ml-2 text-lg font-normal text-muted-foreground">
                  ({count})
                </span>
              )}
            </h1>
          </div>
          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>

        {/* Search and filters */}
        {(onSearch || filters) && (
          <div className="flex items-center space-x-4">
            {onSearch && (
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>
            )}
            {filters && <div className="flex items-center space-x-2">{filters}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export { PageHeader, DashboardPageHeader, ListPageHeader };