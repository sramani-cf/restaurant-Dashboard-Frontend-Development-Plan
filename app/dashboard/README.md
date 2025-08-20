# Restaurant Dashboard Module

A comprehensive, real-time dashboard for restaurant management built with Next.js 15, React 19, and TypeScript.

## Features

### 🚀 Core Functionality
- **Real-time KPI Monitoring** - Revenue, guest count, average order value, and cost metrics
- **Interactive Sales Analytics** - Multiple chart types with time range filtering
- **Live Operational Feeds** - Real-time orders and reservations
- **Date Range Filtering** - Flexible date selection with presets
- **Auto-refresh System** - Configurable polling with connection status
- **Responsive Design** - Mobile-first approach with adaptive layouts

### 📊 Key Performance Indicators
- Total Revenue with trend analysis
- Guest Count tracking
- Average Order Value calculations
- Prime Cost monitoring (with targets)
- Labor Cost analysis
- Food Cost tracking

### 📈 Analytics & Charts
- Sales trend visualization (Line, Bar, Area, Composed charts)
- Interactive chart controls
- Multiple time frame views (7D, 30D, 90D)
- Summary statistics

### 🔄 Real-time Features
- Live order tracking with status updates
- Reservation management
- Auto-refresh with configurable intervals
- Connection status monitoring
- Background sync when tab is inactive

## File Structure

```
app/dashboard/
├── page.tsx                 # Main dashboard page (Server Component)
├── dashboard-content.tsx    # Client-side dashboard logic
├── dashboard-skeleton.tsx   # Loading state component
├── layout.tsx              # Dashboard layout with sidebar
├── loading.tsx             # Loading page
└── error.tsx               # Error boundary

components/dashboard/
├── index.ts                # Component exports
├── kpi-cards.tsx           # KPI cards and metrics
├── sales-trend-chart.tsx   # Interactive charts
├── live-feeds.tsx          # Live orders and reservations
├── date-filter.tsx         # Date range filtering
└── real-time-updates.tsx   # Real-time polling system

lib/dashboard/
├── data.ts                 # Server-side data fetching
└── utils.ts                # Utility functions
```

## Component Overview

### KPI Cards (`kpi-cards.tsx`)
Displays key performance indicators with trend analysis:
- Revenue tracking with change indicators
- Guest count monitoring
- Average order value calculations
- Cost metrics with target comparison
- Loading states and error handling

### Sales Trend Chart (`sales-trend-chart.tsx`)
Interactive chart component powered by Recharts:
- Multiple chart types (Line, Bar, Area, Composed)
- Time frame selection (7D, 30D, 90D)
- Custom tooltips and formatting
- Responsive design
- Summary statistics display

### Live Feeds (`live-feeds.tsx`)
Real-time operational data display:
- Live order tracking with status badges
- Reservation management
- Urgency indicators
- Auto-refresh capabilities
- Mobile-optimized combined view

### Date Filter (`date-filter.tsx`)
Comprehensive date range selection:
- Calendar picker integration
- Quick preset buttons
- URL state synchronization
- Custom range validation
- Mobile-friendly controls

### Real-time Updates (`real-time-updates.tsx`)
Polling and sync management:
- Configurable refresh intervals
- Connection status monitoring
- Background sync handling
- Error recovery mechanisms
- User preference persistence

## Data Layer

### Server Functions (`data.ts`)
- **Parallel data fetching** using Promise.all
- **Next.js caching** with unstable_cache
- **Mock data generation** for development
- **Type-safe responses** with TypeScript
- **Error handling** and retry logic

### Cache Strategy
- KPIs: 5-minute cache
- Sales trends: 1-hour cache
- Live data: 30-second cache
- Background revalidation

## Real-time Architecture

### Polling System
```typescript
const {
  isEnabled,
  isConnected, 
  lastUpdate,
  toggle,
  forceUpdate,
  config,
  updateConfig
} = useRealTimeUpdates({
  interval: 30000, // 30 seconds
  enabled: true,
  onUpdate: async () => {
    const data = await getDashboardData(dateRange);
    setData(data);
  },
  onError: (error) => {
    console.error('Update failed:', error);
  }
});
```

### Features
- **Smart polling** - Pauses when tab is inactive
- **Error recovery** - Automatic retry with exponential backoff
- **User controls** - Enable/disable, interval adjustment
- **Status indicators** - Connection state visualization

## Usage Examples

### Basic Dashboard Implementation
```typescript
import { getDashboardData } from '@/lib/dashboard/data';
import { DashboardContent } from './dashboard-content';

export default async function DashboardPage() {
  const data = await getDashboardData();
  
  return (
    <DashboardContent initialData={data} />
  );
}
```

### Using Individual Components
```typescript
import { KPICards, SalesTrendChart, LiveFeeds } from '@/components/dashboard';

function MyDashboard({ data, isLoading }) {
  return (
    <div className="space-y-6">
      <KPICards data={data.kpis} isLoading={isLoading} />
      <SalesTrendChart data={data.salesTrend} isLoading={isLoading} />
      <LiveFeeds 
        orders={data.liveOrders}
        reservations={data.liveReservations}
        isLoading={isLoading}
      />
    </div>
  );
}
```

### Real-time Updates
```typescript
import { useRealTimeUpdates, RealTimeStatus } from '@/components/dashboard';

function Dashboard() {
  const realTime = useRealTimeUpdates({
    interval: 30000,
    onUpdate: async () => {
      // Fetch fresh data
      const data = await getDashboardData();
      setData(data);
    }
  });

  return (
    <div>
      <RealTimeStatus 
        config={realTime.config}
        onConfigChange={realTime.updateConfig}
        isConnected={realTime.isConnected}
        lastUpdate={realTime.lastUpdate}
      />
      {/* Dashboard content */}
    </div>
  );
}
```

### Date Filtering
```typescript
import { DateFilter, useDateFilter } from '@/components/dashboard';

function DashboardWithFilter() {
  const { dateRange, setDateRange } = useDateFilter();
  
  const handleDateChange = async (newRange) => {
    setDateRange(newRange);
    const data = await getDashboardData(newRange);
    setData(data);
  };

  return (
    <DateFilter 
      value={dateRange}
      onChange={handleDateChange}
      onRefresh={() => refetchData()}
    />
  );
}
```

## Performance Optimizations

### Server Components
- Initial data fetching on the server
- Reduced client-side JavaScript
- Faster initial page loads

### Parallel Data Fetching
```typescript
const [kpis, salesTrend, liveOrders, liveReservations] = await Promise.all([
  getDashboardKPIs(dateRange),
  getSalesTrendData(30),
  getLiveOrders(),
  getLiveReservations()
]);
```

### Caching Strategy
- Strategic cache durations based on data freshness needs
- Background revalidation for seamless updates
- Tag-based cache invalidation

### Loading States
- Skeleton components for smooth UX
- Progressive loading patterns
- Error boundaries for graceful failures

## Responsive Design

### Breakpoints
- **Mobile**: Single column layout
- **Tablet**: Two-column grid
- **Desktop**: Multi-column responsive grid
- **Large screens**: Optimized spacing and layout

### Mobile Optimizations
- Touch-friendly controls
- Collapsed navigation
- Combined live feeds
- Simplified chart interactions

## Error Handling

### Error Boundaries
- Page-level error boundary
- Component-level error handling
- Graceful degradation
- User-friendly error messages

### Network Resilience
- Automatic retry mechanisms
- Connection status indicators
- Offline state handling
- Cache fallbacks

## Accessibility

### Features
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader support
- High contrast support

### Standards Compliance
- WCAG 2.1 AA compliance
- Semantic HTML structure
- Proper heading hierarchy
- Alternative text for charts

## Integration

### POS System Integration
The dashboard integrates with the POS adapter system:
```typescript
import { usePOSContext } from '@/services/pos';

function Dashboard() {
  const { adapter, isConnected } = usePOSContext();
  
  useEffect(() => {
    if (isConnected) {
      // Sync with POS data
      syncPOSData(adapter);
    }
  }, [adapter, isConnected]);
}
```

### API Integration
- RESTful API endpoints
- GraphQL query support
- WebSocket connections for real-time data
- Error handling and retry logic

## Development

### Running the Dashboard
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm run start
```

### Testing
```bash
npm run test
npm run test:e2e
```

## Customization

### Theming
The dashboard uses CSS variables for theming:
```css
:root {
  --primary: 209 94% 53%;
  --secondary: 156 100% 49%;
  --accent: 43 100% 62%;
}
```

### Chart Colors
Customize chart colors in `lib/dashboard/utils.ts`:
```typescript
export const chartColors = {
  primary: '#3b82f6',
  secondary: '#10b981',
  tertiary: '#f59e0b',
  // ...
};
```

### Data Sources
Replace mock data with real API calls in `lib/dashboard/data.ts`:
```typescript
export async function getDashboardKPIs() {
  const response = await fetch('/api/dashboard/kpis');
  return response.json();
}
```

## Future Enhancements

### Planned Features
- [ ] WebSocket real-time updates
- [ ] Advanced filtering and search
- [ ] Custom dashboard layouts
- [ ] Export functionality
- [ ] Advanced analytics
- [ ] Multi-location support
- [ ] Custom alerts and notifications
- [ ] Integration with more POS systems

### Performance Improvements
- [ ] Virtual scrolling for large lists
- [ ] Chart data virtualization
- [ ] Progressive web app features
- [ ] Service worker caching

This dashboard module provides a solid foundation for restaurant management with room for extensive customization and enhancement based on specific business needs.