import { Suspense } from 'react';
import { OrderAnalyticsDashboard } from './order-analytics-dashboard';
import { OrderAnalyticsSkeleton } from './order-analytics-skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function OrderAnalyticsPage({
  searchParams
}: {
  searchParams: { 
    dateRange?: string;
    view?: string;
  }
}) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-600 mb-2">
            <Link href="/orders" className="hover:text-gray-900">Orders</Link> / Analytics
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Order Analytics</h1>
          <p className="text-sm text-gray-600">Comprehensive insights into order patterns and performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary">Export Report</Button>
          <Button variant="secondary">Schedule Report</Button>
        </div>
      </div>
      <Suspense fallback={<OrderAnalyticsSkeleton />}>
        <OrderAnalyticsDashboard searchParams={searchParams} />
      </Suspense>
    </div>
  );
}