import { Suspense } from 'react';
import { AppShell } from '@/components/layout';
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
    <AppShell
      title="Order Analytics"
      description="Comprehensive insights into order patterns and performance"
      breadcrumbs={[
        { label: 'Orders', href: '/orders' },
        { label: 'Analytics' }
      ]}
      actions={
        <>
          <Button variant="secondary">Export Report</Button>
          <Button variant="secondary">Schedule Report</Button>
        </>
      }
    >
      <Suspense fallback={<OrderAnalyticsSkeleton />}>
        <OrderAnalyticsDashboard searchParams={searchParams} />
      </Suspense>
    </AppShell>
  );
}