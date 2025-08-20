'use client';

import { useState, useEffect } from 'react';
import { 
  OrderStats, 
  OrderSummary, 
  OrderStatus,
  OrderType 
} from '@/lib/orders/types';
import { 
  getOrderStats, 
  getOrderSummary, 
  getOrders 
} from '@/lib/orders/data';
import { Card } from '@/components/ui/card';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Tabs } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  ShoppingCart,
  Clock,
  Users,
  Package,
  Calendar,
  Download,
  Filter,
  ChefHat,
  Truck,
  CreditCard,
  AlertCircle
} from 'lucide-react';

interface OrderAnalyticsDashboardProps {
  searchParams: {
    dateRange?: string;
    view?: string;
  };
}

export function OrderAnalyticsDashboard({ searchParams }: OrderAnalyticsDashboardProps) {
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [dailySummaries, setDailySummaries] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date()
  });

  // Load analytics data
  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      try {
        // Get order stats
        const statsData = await getOrderStats({
          start: dateRange.start.toISOString(),
          end: dateRange.end.toISOString()
        });
        setStats(statsData);

        // Get daily summaries for the date range
        const summaries = [];
        const currentDate = new Date(dateRange.start);
        while (currentDate <= dateRange.end) {
          const summary = await getOrderSummary(currentDate.toISOString().split('T')[0]);
          summaries.push(summary);
          currentDate.setDate(currentDate.getDate() + 1);
        }
        setDailySummaries(summaries);
      } catch (error) {
        console.error('Failed to load analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [dateRange]);

  if (loading || !stats) {
    return <div>Loading analytics...</div>;
  }

  // Prepare chart data
  const revenueChartData = dailySummaries.map(summary => ({
    date: new Date(summary.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: summary.revenue,
    orders: summary.orderCount,
    avgOrderValue: summary.averageOrderValue
  }));

  const statusDistribution = Object.entries(stats.ordersByStatus).map(([status, count]) => ({
    name: status.replace('_', ' '),
    value: count,
    percentage: ((count / stats.totalOrders) * 100).toFixed(1)
  }));

  const typeDistribution = Object.entries(stats.ordersByType).map(([type, count]) => ({
    name: type.replace('_', ' '),
    value: count,
    percentage: ((count / stats.totalOrders) * 100).toFixed(1)
  }));

  const hourlyDistribution = stats.peakHours.map(hour => ({
    hour: `${hour.hour}:00`,
    orders: hour.orders
  }));

  // Top performing items across all days
  const allItems = dailySummaries.flatMap(s => s.topItems);
  const itemPerformance = allItems.reduce((acc, item) => {
    if (!acc[item.itemName]) {
      acc[item.itemName] = { quantity: 0, revenue: 0 };
    }
    acc[item.itemName].quantity += item.quantity;
    acc[item.itemName].revenue += item.revenue;
    return acc;
  }, {} as Record<string, { quantity: number; revenue: number }>);

  const topItemsChart = Object.entries(itemPerformance)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  // Colors for charts
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316'];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'revenue', label: 'Revenue' },
    { id: 'orders', label: 'Orders' },
    { id: 'items', label: 'Items' },
    { id: 'patterns', label: 'Patterns' }
  ];

  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <div className="flex items-center justify-between">
        <DateRangePicker
          value={dateRange}
          onChange={(range) => range && setDateRange(range)}
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% vs last period
              </p>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.3% vs last period
              </p>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <ShoppingCart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Order Value</p>
              <p className="text-2xl font-bold">${stats.averageOrderValue.toFixed(2)}</p>
              <p className="text-sm text-red-600 flex items-center mt-1">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2.1% vs last period
              </p>
            </div>
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Package className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Prep Time</p>
              <p className="text-2xl font-bold">{stats.averagePrepTime.toFixed(0)}m</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingDown className="h-3 w-3 mr-1" />
                -5m vs last period
              </p>
            </div>
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" tabs={tabs}>
        {/* Overview Tab */}
        <div value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card>
              <div className="p-4 border-b">
                <h3 className="font-semibold">Revenue Trend</h3>
              </div>
              <div className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#3B82F6" 
                      fill="#3B82F6" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Order Volume */}
            <Card>
              <div className="p-4 border-b">
                <h3 className="font-semibold">Order Volume</h3>
              </div>
              <div className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="orders" 
                      stroke="#10B981" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Status Distribution */}
            <Card>
              <div className="p-4 border-b">
                <h3 className="font-semibold">Order Status</h3>
              </div>
              <div className="p-4">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ percentage }) => `${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {statusDistribution.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Order Type Distribution */}
            <Card>
              <div className="p-4 border-b">
                <h3 className="font-semibold">Order Types</h3>
              </div>
              <div className="p-4">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={typeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ percentage }) => `${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {typeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {typeDistribution.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Peak Hours */}
            <Card>
              <div className="p-4 border-b">
                <h3 className="font-semibold">Peak Hours</h3>
              </div>
              <div className="p-4">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={hourlyDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>

        {/* Revenue Tab */}
        <div value="revenue" className="space-y-6">
          <Card>
            <div className="p-4 border-b">
              <h3 className="font-semibold">Revenue Analysis</h3>
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name="Revenue ($)"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="avgOrderValue" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Avg Order Value ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Revenue by Category */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <div className="p-4 border-b">
                <h3 className="font-semibold">Revenue by Day of Week</h3>
              </div>
              <div className="p-4">
                {/* Day of week revenue would go here */}
                <div className="space-y-3">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-sm">{day}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${60 + Math.random() * 40}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-20 text-right">
                          ${(1000 + Math.random() * 2000).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-4 border-b">
                <h3 className="font-semibold">Payment Methods</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {[
                    { method: 'Credit Card', amount: 65, icon: CreditCard },
                    { method: 'Cash', amount: 20, icon: DollarSign },
                    { method: 'Digital Wallet', amount: 10, icon: CreditCard },
                    { method: 'Gift Card', amount: 5, icon: CreditCard }
                  ].map((payment) => {
                    const Icon = payment.icon;
                    return (
                      <div key={payment.method} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{payment.method}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${payment.amount}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">
                            {payment.amount}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Items Tab */}
        <div value="items" className="space-y-6">
          <Card>
            <div className="p-4 border-b">
              <h3 className="font-semibold">Top Performing Items</h3>
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={topItemsChart} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3B82F6" name="Revenue ($)" />
                  <Bar dataKey="quantity" fill="#10B981" name="Quantity Sold" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </Tabs>
    </div>
  );
}