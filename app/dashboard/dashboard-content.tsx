'use client';

import { useState, useCallback } from 'react';
import { revalidateLiveData, getDashboardData } from '@/lib/dashboard/data';
import { 
  KPICards,
  SalesTrendChart,
  LiveFeeds,
  DateFilter,
  useRealTimeUpdates,
  RealTimeStatus,
  ConnectionStatus
} from '@/components/dashboard';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { formatDateRange } from '@/lib/dashboard/utils';
import type { DateRange } from '@/components/ui/date-range-picker';
import type {
  DashboardKPIs,
  SalesTrendData,
  LiveOrder,
  LiveReservation,
  TopProduct,
  StaffPerformance
} from '@/lib/dashboard/data';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  DollarSign,
  Clock,
  Award,
  AlertTriangle
} from 'lucide-react';

interface DashboardData {
  kpis: DashboardKPIs;
  salesTrend: SalesTrendData[];
  liveOrders: LiveOrder[];
  liveReservations: LiveReservation[];
  topProducts: TopProduct[];
  staffPerformance: StaffPerformance[];
}

interface DashboardContentProps {
  initialData: DashboardData;
  initialDateRange?: DateRange;
}

export function DashboardContent({ initialData, initialDateRange }: DashboardContentProps) {
  const [data, setData] = useState<DashboardData>(initialData);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(initialDateRange);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Real-time updates hook
  const {
    isEnabled: realTimeEnabled,
    isConnected,
    lastUpdate,
    toggle: toggleRealTime,
    forceUpdate,
    config: realTimeConfig,
    updateConfig: updateRealTimeConfig
  } = useRealTimeUpdates({
    interval: 30000, // 30 seconds
    enabled: true,
    onUpdate: useCallback(async () => {
      try {
        setError(null);
        const freshData = await getDashboardData(dateRange);
        setData(freshData);
      } catch (err) {
        console.error('Failed to update dashboard data:', err);
        throw err;
      }
    }, [dateRange]),
    onError: useCallback((err: Error) => {
      setError(err.message);
    }, [])
  });

  // Manual refresh handler
  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const freshData = await getDashboardData(dateRange);
      setData(freshData);
      
      // Also trigger cache revalidation for live data
      await revalidateLiveData();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh data';
      setError(errorMessage);
      console.error('Dashboard refresh failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange]);

  // Date range change handler
  const handleDateRangeChange = useCallback(async (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
    setIsLoading(true);
    setError(null);
    
    try {
      const freshData = await getDashboardData(newDateRange);
      setData(freshData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update data for date range';
      setError(errorMessage);
      console.error('Date range update failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get dashboard title based on date range
  const getDashboardTitle = () => {
    if (dateRange?.from && dateRange?.to) {
      return `Dashboard - ${formatDateRange(dateRange.from, dateRange.to)}`;
    }
    return 'Restaurant Dashboard';
  };

  // Calculate summary stats
  const totalRevenue = data.kpis.totalRevenue.current;
  const totalGuests = data.kpis.guestCount.current;
  const activeOrders = data.liveOrders.filter(order => 
    ['pending', 'preparing', 'ready'].includes(order.status)
  ).length;
  const upcomingReservations = data.liveReservations.filter(reservation => 
    reservation.status === 'confirmed'
  ).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <PageHeader
          title={getDashboardTitle()}
          description="Real-time analytics and operational insights"
          icon={<LayoutDashboard className="h-6 w-6" />}
        />
        
        {/* Quick Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="font-medium">{totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="font-medium">{totalGuests} guests</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-orange-600" />
            <Badge variant="secondary">{activeOrders} active orders</Badge>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <ConnectionStatus
          isConnected={false}
          onRetry={handleRefresh}
          className="border-red-200 bg-red-50"
        />
      )}

      {/* Real-time Status & Date Filter */}
      <div className="grid gap-4 lg:grid-cols-2">
        <DateFilter
          value={dateRange}
          onChange={handleDateRangeChange}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />
        
        <RealTimeStatus
          config={realTimeConfig}
          onConfigChange={updateRealTimeConfig}
          isConnected={isConnected}
          lastUpdate={lastUpdate}
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="space-y-6">
        {/* KPI Cards */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h2>
          <KPICards 
            data={data.kpis} 
            isLoading={isLoading}
          />
        </section>

        {/* Charts and Analytics */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales Analytics</h2>
          <SalesTrendChart 
            data={data.salesTrend} 
            isLoading={isLoading}
            className="w-full"
          />
        </section>

        {/* Live Operations */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Live Operations</h2>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {data.liveOrders.length} orders
              </Badge>
              <Badge variant="outline" className="text-xs">
                {data.liveReservations.length} reservations
              </Badge>
            </div>
          </div>
          <LiveFeeds
            orders={data.liveOrders}
            reservations={data.liveReservations}
            isLoading={isLoading}
            onRefresh={forceUpdate}
          />
        </section>

        {/* Additional Analytics */}
        <section>
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Top Products
              </TabsTrigger>
              <TabsTrigger value="staff" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Staff Performance
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    Top Selling Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.topProducts.map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.category}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{product.quantitySold} sold</div>
                          <div className="text-sm text-gray-500">
                            {product.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="staff" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Staff Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.staffPerformance.map((staff, index) => (
                      <div key={staff.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{staff.name}</div>
                            <div className="text-sm text-gray-500">{staff.role}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {staff.salesAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                          </div>
                          <div className="text-sm text-gray-500">
                            {staff.ordersProcessed} orders • {staff.hoursWorked}h
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}