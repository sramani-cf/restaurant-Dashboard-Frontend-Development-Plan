// Export all UI components from this directory

// Core utility
export { cn, focusRing, disabledStyles, transitions } from './utils';

// Basic components
export { Button, buttonVariants, type ButtonProps } from './button';
export { Input, type InputProps } from './input';
export { Badge, StatusBadge, PriorityBadge, badgeVariants, type BadgeProps } from './badge';
export { Alert, SuccessAlert, WarningAlert, ErrorAlert, InfoAlert, alertVariants, type AlertProps } from './alert';
export { Skeleton, SkeletonCard, SkeletonAvatar, SkeletonText, SkeletonTable, type SkeletonProps } from './skeleton';
export { Tooltip, InfoTooltip, HelpTooltip, type TooltipProps } from './tooltip';

// Layout components
export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  ActionCard,
  MetricCard,
  type CardProps,
  type CardHeaderProps,
  type CardContentProps,
  type CardFooterProps,
  type ActionCardProps,
  type MetricCardProps
} from './card';

// Complex components
export { DataTable, type DataTableProps } from './data-table';
export { DateRangePicker, type DateRangePickerProps, type DateRange } from './date-range-picker';
export { Modal, ConfirmModal, FormModal, type ModalProps, type ConfirmModalProps, type FormModalProps } from './modal';

// Dashboard-specific components
export { 
  StatCard, 
  MetricGrid, 
  ComparisonStatCard,
  type StatCardProps,
  type MetricGridProps,
  type ComparisonStatCardProps
} from './stat-card';

export { 
  PageHeader, 
  DashboardPageHeader, 
  ListPageHeader,
  type PageHeaderProps,
  type DashboardPageHeaderProps,
  type ListPageHeaderProps
} from './page-header';

export { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps
} from './simple-tabs';

export { 
  Dropdown, 
  ActionDropdown, 
  SelectDropdown,
  type DropdownProps,
  type DropdownItem,
  type ActionDropdownProps,
  type SelectDropdownProps
} from './dropdown';

// Additional components
export { ScrollArea } from './scroll-area';
export { Switch } from './switch';