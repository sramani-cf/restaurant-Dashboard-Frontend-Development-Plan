# Restaurant Dashboard UI Components

A comprehensive set of reusable UI components built specifically for the restaurant dashboard application. All components are TypeScript-first, accessible, and support dark mode.

## Components Overview

### Basic Components

#### Button
- **Variants**: primary, secondary, danger, ghost, outline, link
- **Sizes**: sm, md, lg, icon
- **Features**: Loading states, disabled states, forwardRef support
- **File**: `components/ui/button.tsx`

#### Input
- **Features**: Validation states (error, success), labels, helper text, left/right icons
- **Accessibility**: Proper ARIA attributes, error announcements
- **File**: `components/ui/input.tsx`

#### Badge
- **Variants**: default, secondary, success, warning, error, outline, ghost
- **Specialized**: StatusBadge, PriorityBadge with preset colors
- **Features**: Pulse animation, different sizes
- **File**: `components/ui/badge.tsx`

#### Alert
- **Variants**: default, success, warning, error, info
- **Features**: Dismissible, custom icons, title/description
- **Specialized**: SuccessAlert, WarningAlert, ErrorAlert, InfoAlert
- **File**: `components/ui/alert.tsx`

#### Skeleton
- **Variants**: default, circular, text, card
- **Features**: Multiple lines for text, customizable dimensions
- **Specialized**: SkeletonCard, SkeletonAvatar, SkeletonText, SkeletonTable
- **File**: `components/ui/skeleton.tsx`

#### Tooltip
- **Features**: Multiple positions (top, right, bottom, left), delay configuration
- **Specialized**: InfoTooltip, HelpTooltip
- **Accessibility**: Proper focus management, ARIA attributes
- **File**: `components/ui/tooltip.tsx`

### Layout Components

#### Card
- **Variants**: default, outlined, elevated
- **Components**: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Specialized**: ActionCard, MetricCard
- **Features**: Flexible padding, dividers, custom footers
- **File**: `components/ui/card.tsx`

### Complex Components

#### DataTable
- **Technology**: TanStack Table v8
- **Features**: Sorting, filtering, pagination, search, row selection
- **Customization**: Export functionality, custom toolbar, loading states
- **Accessibility**: Keyboard navigation, screen reader support
- **File**: `components/ui/data-table.tsx`

#### DateRangePicker
- **Technology**: react-day-picker
- **Features**: Date range selection, presets, single date mode
- **Presets**: Today, Yesterday, Last 7 days, Last 30 days, This month, Last month
- **Customization**: Min/max dates, custom format, disabled dates
- **File**: `components/ui/date-range-picker.tsx`

#### Modal
- **Technology**: Headless UI Dialog
- **Variants**: Modal, ConfirmModal, FormModal
- **Features**: Multiple sizes, backdrop blur, animations
- **Accessibility**: Focus management, escape key handling
- **File**: `components/ui/modal.tsx`

### Dashboard-Specific Components

#### StatCard
- **Features**: KPI display with trend indicators, loading states
- **Trend**: Up/down/neutral with colors and icons
- **Variants**: Different colors (primary, success, warning, error)
- **Specialized**: MetricGrid, ComparisonStatCard
- **File**: `components/ui/stat-card.tsx`

#### PageHeader
- **Variants**: PageHeader, DashboardPageHeader, ListPageHeader
- **Features**: Breadcrumbs, badges, back button, actions
- **Customization**: Multiple sizes, statistics display
- **File**: `components/ui/page-header.tsx`

#### Tabs
- **Technology**: Headless UI Tab
- **Variants**: default, pills, underline, minimal
- **Features**: Icons, badges, disabled states, keyboard navigation
- **Specialized**: SimpleTabs, ControlledTabs
- **File**: `components/ui/tabs.tsx`

#### Dropdown
- **Technology**: Headless UI Menu
- **Variants**: Dropdown, ActionDropdown, SelectDropdown
- **Features**: Icons, shortcuts, danger items, dividers
- **Accessibility**: Keyboard navigation, proper focus management
- **File**: `components/ui/dropdown.tsx`

## Usage Examples

### Basic Usage

```tsx
import { Button, Input, Badge, Alert } from '@/components/ui';

// Button with variants
<Button variant="primary" size="lg">Save Changes</Button>
<Button variant="danger" loading>Deleting...</Button>

// Input with validation
<Input 
  label="Email Address"
  placeholder="Enter your email"
  error="Invalid email format"
  leftIcon={<Mail className="h-4 w-4" />}
/>

// Status badges
<StatusBadge status="online" />
<PriorityBadge priority="urgent" pulse />

// Alerts
<Alert variant="success" title="Success!" dismissible>
  Your changes have been saved successfully.
</Alert>
```

### Complex Components

```tsx
import { DataTable, Modal, StatCard, DateRangePicker } from '@/components/ui';

// Data table with all features
<DataTable
  data={tableData}
  columns={columns}
  searchable
  filterable
  exportable
  pagination
  onRowClick={(row) => console.log(row)}
/>

// Stat cards for dashboard
<StatCard
  title="Total Revenue"
  value="$12,345"
  trend={{ value: 12, direction: 'up', period: 'last month' }}
  icon={<DollarSign className="h-4 w-4" />}
  color="success"
/>

// Confirmation modal
<ConfirmModal
  open={isConfirmOpen}
  onClose={() => setIsConfirmOpen(false)}
  onConfirm={handleDelete}
  title="Delete Item"
  message="Are you sure you want to delete this item? This action cannot be undone."
  variant="danger"
/>
```

### Dashboard Layout

```tsx
import { 
  PageHeader, 
  MetricGrid, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Tabs 
} from '@/components/ui';

function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Restaurant Dashboard"
        description="Overview of your restaurant's performance"
        actions={
          <Button variant="primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        }
      />
      
      <MetricGrid metrics={dashboardMetrics} columns={4} />
      
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs items={analyticsTabItems} variant="underline" />
        </CardContent>
      </Card>
    </>
  );
}
```

## Design System Integration

### Colors
- Uses CSS custom properties for consistent theming
- Supports dark mode through CSS variables
- Custom color palette for restaurant branding

### Typography
- Consistent font weights and sizes
- Responsive text scaling
- Proper heading hierarchy

### Spacing
- Tailwind CSS spacing scale
- Consistent padding and margins
- Responsive spacing utilities

### Accessibility
- ARIA attributes on all interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Focus management in modals and dropdowns
- Color contrast compliance

## Dependencies

- **React 19+**: Core framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Headless UI**: Unstyled accessible components
- **TanStack Table v8**: Data table functionality
- **react-day-picker**: Date selection
- **Lucide React**: Icons
- **date-fns**: Date formatting
- **clsx**: Conditional classes
- **tailwind-merge**: Class merging

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Contributing

When adding new components:
1. Follow TypeScript patterns
2. Include proper prop types and interfaces
3. Add forwardRef support where needed
4. Include accessibility features
5. Support dark mode
6. Add to the main index.ts export
7. Include usage examples in documentation

## Demo

See `components/ui/demo.tsx` for a comprehensive showcase of all components in action. This file can be used for testing and development but should be removed in production.