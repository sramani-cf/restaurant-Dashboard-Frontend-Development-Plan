'use client';

import { OrderStats } from '@/lib/orders/types';
import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart,
  Clock,
  CheckCircle
} from 'lucide-react';

interface OrderStatsComponentProps {
  stats: OrderStats;
}

export function OrderStats({ stats }: OrderStatsComponentProps) {
  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
            <p className="text-sm text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from yesterday
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
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
            <p className="text-sm text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from yesterday
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
            <p className="text-sm text-muted-foreground">Avg Order Value</p>
            <p className="text-2xl font-bold">${stats.averageOrderValue.toFixed(2)}</p>
            <p className="text-sm text-red-600 flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              -3% from yesterday
            </p>
          </div>
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
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
              -2m from yesterday
            </p>
          </div>
          <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
            <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </Card>
    </div>
  );
}