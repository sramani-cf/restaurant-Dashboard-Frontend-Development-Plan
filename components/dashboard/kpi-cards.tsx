'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatPercentage, getChangeColor, getChangeIcon } from '@/lib/dashboard/utils';
import type { DashboardKPIs } from '@/lib/dashboard/data';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  ShoppingCart,
  Utensils,
  Clock,
  Target
} from 'lucide-react';

interface KPICardsProps {
  data?: DashboardKPIs;
  isLoading?: boolean;
}

interface KPICardProps {
  title: string;
  value: string;
  change: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon: React.ReactNode;
  target?: number;
  isLoading?: boolean;
}

function KPICard({ title, value, change, icon, target, isLoading }: KPICardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-16 mb-2" />
          <Skeleton className="h-4 w-20" />
        </CardContent>
      </Card>
    );
  }

  const changeColor = getChangeColor(change.type);
  const changeIcon = getChangeIcon(change.type);
  const isAtTarget = target ? (change.type === 'decrease' ? true : false) : true;

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className="text-gray-400">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {value}
            </div>
            <div className={`flex items-center text-sm ${changeColor}`}>
              <span className="mr-1">{changeIcon}</span>
              <span>{formatPercentage(change.value)} vs last period</span>
            </div>
          </div>
          {target && (
            <div className="text-right">
              <div className="text-xs text-gray-500">Target</div>
              <div className="text-sm font-medium">
                {typeof target === 'number' && target < 100 
                  ? formatPercentage(target) 
                  : formatCurrency(target)
                }
              </div>
              <Badge 
                variant={isAtTarget ? 'success' : 'warning'}
                className="text-xs"
              >
                {isAtTarget ? 'On Track' : 'Off Track'}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function KPICards({ data, isLoading }: KPICardsProps) {
  if (isLoading || !data) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <KPICard
            key={i}
            title=""
            value=""
            change={{ value: 0, type: 'neutral' }}
            icon={<Skeleton className="h-4 w-4" />}
            isLoading
          />
        ))}
      </div>
    );
  }

  const kpiData = [
    {
      title: 'Total Revenue',
      value: formatCurrency(data.totalRevenue.current),
      change: {
        value: data.totalRevenue.change,
        type: data.totalRevenue.changeType
      },
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      title: 'Guest Count',
      value: data.guestCount.current.toLocaleString(),
      change: {
        value: data.guestCount.change,
        type: data.guestCount.changeType
      },
      icon: <Users className="h-4 w-4" />
    },
    {
      title: 'Avg Order Value',
      value: formatCurrency(data.averageOrderValue.current),
      change: {
        value: data.averageOrderValue.change,
        type: data.averageOrderValue.changeType
      },
      icon: <ShoppingCart className="h-4 w-4" />
    },
    {
      title: 'Prime Cost',
      value: formatPercentage(data.primeCost.current),
      change: {
        value: data.primeCost.change,
        type: data.primeCost.changeType
      },
      icon: <Target className="h-4 w-4" />,
      target: data.primeCost.target
    },
    {
      title: 'Labor Cost',
      value: formatPercentage(data.laborCost.current),
      change: {
        value: data.laborCost.change,
        type: data.laborCost.changeType
      },
      icon: <Clock className="h-4 w-4" />,
      target: data.laborCost.target
    },
    {
      title: 'Food Cost',
      value: formatPercentage(data.foodCost.current),
      change: {
        value: data.foodCost.change,
        type: data.foodCost.changeType
      },
      icon: <Utensils className="h-4 w-4" />,
      target: data.foodCost.target
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {kpiData.map((kpi, index) => (
        <KPICard
          key={index}
          title={kpi.title}
          value={kpi.value}
          change={kpi.change}
          icon={kpi.icon}
          target={kpi.target}
        />
      ))}
    </div>
  );
}

// Individual KPI card components for specific use cases
export function RevenueCard({ data, isLoading }: { data?: DashboardKPIs['totalRevenue']; isLoading?: boolean }) {
  if (isLoading || !data) {
    return <KPICard title="" value="" change={{ value: 0, type: 'neutral' }} icon={<Skeleton className="h-4 w-4" />} isLoading />;
  }

  return (
    <KPICard
      title="Total Revenue"
      value={formatCurrency(data.current)}
      change={{
        value: data.change,
        type: data.changeType
      }}
      icon={<DollarSign className="h-4 w-4" />}
    />
  );
}

export function GuestCountCard({ data, isLoading }: { data?: DashboardKPIs['guestCount']; isLoading?: boolean }) {
  if (isLoading || !data) {
    return <KPICard title="" value="" change={{ value: 0, type: 'neutral' }} icon={<Skeleton className="h-4 w-4" />} isLoading />;
  }

  return (
    <KPICard
      title="Guest Count"
      value={data.current.toLocaleString()}
      change={{
        value: data.change,
        type: data.changeType
      }}
      icon={<Users className="h-4 w-4" />}
    />
  );
}

export function AOVCard({ data, isLoading }: { data?: DashboardKPIs['averageOrderValue']; isLoading?: boolean }) {
  if (isLoading || !data) {
    return <KPICard title="" value="" change={{ value: 0, type: 'neutral' }} icon={<Skeleton className="h-4 w-4" />} isLoading />;
  }

  return (
    <KPICard
      title="Average Order Value"
      value={formatCurrency(data.current)}
      change={{
        value: data.change,
        type: data.changeType
      }}
      icon={<ShoppingCart className="h-4 w-4" />}
    />
  );
}

export function PrimeCostCard({ data, isLoading }: { data?: DashboardKPIs['primeCost']; isLoading?: boolean }) {
  if (isLoading || !data) {
    return <KPICard title="" value="" change={{ value: 0, type: 'neutral' }} icon={<Skeleton className="h-4 w-4" />} isLoading />;
  }

  return (
    <KPICard
      title="Prime Cost"
      value={formatPercentage(data.current)}
      change={{
        value: data.change,
        type: data.changeType
      }}
      icon={<Target className="h-4 w-4" />}
      target={data.target}
    />
  );
}