'use client';

import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
  Area,
  AreaChart
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatNumber, chartColors } from '@/lib/dashboard/utils';
import type { SalesTrendData } from '@/lib/dashboard/data';
import { format, parseISO } from 'date-fns';
import { TrendingUp, BarChart3, Activity, Calendar } from 'lucide-react';

interface SalesTrendChartProps {
  data?: SalesTrendData[];
  isLoading?: boolean;
  className?: string;
}

type ChartType = 'line' | 'bar' | 'area' | 'composed';
type TimeFrame = '7d' | '30d' | '90d';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    color: string;
    dataKey: string;
    name: string;
    value: number;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const date = parseISO(label || '');
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
        <p className="text-sm font-medium text-gray-900 mb-2">
          {format(date, 'MMM d, yyyy')}
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">{entry.name}</span>
            </div>
            <span className="text-sm font-medium">
              {entry.dataKey === 'revenue' || entry.dataKey === 'averageOrderValue' 
                ? formatCurrency(entry.value)
                : formatNumber(entry.value)
              }
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function ChartSkeleton() {
  return (
    <div className="h-80 flex items-center justify-center">
      <div className="space-y-4 w-full">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

export function SalesTrendChart({ data, isLoading, className }: SalesTrendChartProps) {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('30d');

  if (isLoading || !data) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <CardTitle>Sales Trend</CardTitle>
            </div>
            <Skeleton className="h-8 w-32" />
          </div>
        </CardHeader>
        <CardContent>
          <ChartSkeleton />
        </CardContent>
      </Card>
    );
  }

  // Filter data based on timeframe
  const getFilteredData = () => {
    const days = timeFrame === '7d' ? 7 : timeFrame === '30d' ? 30 : 90;
    return data.slice(-days);
  };

  const chartData = getFilteredData();

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => format(parseISO(value), 'MMM d')}
              className="text-sm"
            />
            <YAxis 
              yAxisId="revenue"
              tickFormatter={formatCurrency}
              className="text-sm"
            />
            <YAxis 
              yAxisId="orders"
              orientation="right"
              tickFormatter={formatNumber}
              className="text-sm"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              yAxisId="revenue"
              dataKey="revenue" 
              fill={chartColors.primary}
              name="Revenue"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              yAxisId="orders"
              dataKey="orders" 
              fill={chartColors.secondary}
              name="Orders"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => format(parseISO(value), 'MMM d')}
              className="text-sm"
            />
            <YAxis 
              tickFormatter={formatCurrency}
              className="text-sm"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={chartColors.primary}
              fillOpacity={1}
              fill="url(#revenueGradient)"
              name="Revenue"
              strokeWidth={2}
            />
          </AreaChart>
        );

      case 'composed':
        return (
          <ComposedChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => format(parseISO(value), 'MMM d')}
              className="text-sm"
            />
            <YAxis 
              yAxisId="revenue"
              tickFormatter={formatCurrency}
              className="text-sm"
            />
            <YAxis 
              yAxisId="orders"
              orientation="right"
              tickFormatter={formatNumber}
              className="text-sm"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              yAxisId="revenue"
              dataKey="revenue" 
              fill={chartColors.primary}
              fillOpacity={0.6}
              name="Revenue"
              radius={[2, 2, 0, 0]}
            />
            <Line 
              yAxisId="orders"
              type="monotone" 
              dataKey="orders" 
              stroke={chartColors.secondary}
              strokeWidth={3}
              dot={{ fill: chartColors.secondary, strokeWidth: 2 }}
              name="Orders"
            />
          </ComposedChart>
        );

      default: // line chart
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => format(parseISO(value), 'MMM d')}
              className="text-sm"
            />
            <YAxis 
              yAxisId="revenue"
              tickFormatter={formatCurrency}
              className="text-sm"
            />
            <YAxis 
              yAxisId="orders"
              orientation="right"
              tickFormatter={formatNumber}
              className="text-sm"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              yAxisId="revenue"
              type="monotone" 
              dataKey="revenue" 
              stroke={chartColors.primary}
              strokeWidth={3}
              dot={{ fill: chartColors.primary, strokeWidth: 2 }}
              name="Revenue"
            />
            <Line 
              yAxisId="orders"
              type="monotone" 
              dataKey="orders" 
              stroke={chartColors.secondary}
              strokeWidth={3}
              dot={{ fill: chartColors.secondary, strokeWidth: 2 }}
              name="Orders"
            />
            <Line 
              yAxisId="orders"
              type="monotone" 
              dataKey="guests" 
              stroke={chartColors.tertiary}
              strokeWidth={2}
              dot={{ fill: chartColors.tertiary, strokeWidth: 2 }}
              name="Guests"
            />
          </LineChart>
        );
    }
  };

  // Calculate summary stats
  const totalRevenue = chartData.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = chartData.reduce((sum, day) => sum + day.orders, 0);
  const totalGuests = chartData.reduce((sum, day) => sum + day.guests, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <CardTitle>Sales Trend</CardTitle>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Time Frame Selector */}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {([
                { value: '7d' as const, label: '7D' },
                { value: '30d' as const, label: '30D' },
                { value: '90d' as const, label: '90D' }
              ]).map((option) => (
                <Button
                  key={option.value}
                  variant={timeFrame === option.value ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTimeFrame(option.value)}
                  className="text-xs"
                >
                  {option.label}
                </Button>
              ))}
            </div>

            {/* Chart Type Selector */}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {([
                { value: 'line' as const, icon: Activity, label: 'Line' },
                { value: 'bar' as const, icon: BarChart3, label: 'Bar' },
                { value: 'area' as const, icon: TrendingUp, label: 'Area' },
                { value: 'composed' as const, icon: Activity, label: 'Mixed' }
              ]).map((option) => (
                <Button
                  key={option.value}
                  variant={chartType === option.value ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChartType(option.value)}
                  className="text-xs"
                >
                  <option.icon className="h-3 w-3 mr-1" />
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalRevenue)}
            </div>
            <div className="text-sm text-gray-500">Total Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {formatNumber(totalOrders)}
            </div>
            <div className="text-sm text-gray-500">Orders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {formatNumber(totalGuests)}
            </div>
            <div className="text-sm text-gray-500">Guests</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(avgOrderValue)}
            </div>
            <div className="text-sm text-gray-500">Avg Order</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Simplified version for smaller displays
export function MiniSalesTrendChart({ data, isLoading }: SalesTrendChartProps) {
  if (isLoading || !data) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartSkeleton />
        </CardContent>
      </Card>
    );
  }

  // Show only last 7 days for mini version
  const chartData = data.slice(-7);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Sales Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="miniRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={chartColors.primary}
                fillOpacity={1}
                fill="url(#miniRevenueGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}