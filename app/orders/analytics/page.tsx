import { Suspense } from 'react';
import { OrderAnalyticsDashboard } from './order-analytics-dashboard';
import { OrderAnalyticsSkeleton } from './order-analytics-skeleton';
import { PageHeader } from '@/components/ui/page-header';

export default async function OrderAnalyticsPage({
  searchParams
}: {
  searchParams: { 
    dateRange?: string;
    view?: string;
  }
}) {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <PageHeader
        title="Order Analytics"
        description="Comprehensive insights into order patterns and performance"
        backHref="/orders"
        actions={[
          {
            label: 'Export Report',
            onClick: () => {},
            variant: 'outline'
          },
          {
            label: 'Schedule Report',
            onClick: () => {},
            variant: 'secondary'
          }
        ]}
      />

      <Suspense fallback={<OrderAnalyticsSkeleton />}>
        <OrderAnalyticsDashboard searchParams={searchParams} />
      </Suspense>
    </div>
  );
}