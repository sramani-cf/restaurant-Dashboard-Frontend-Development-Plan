import { Suspense } from 'react';
import Link from 'next/link';
import { OrdersContent } from './orders-content';
import { OrdersSkeleton } from './orders-skeleton';
import { AppShell } from '@/components/layout';
import { Button } from '@/components/ui/button';

export default async function OrdersPage({
  searchParams
}: {
  searchParams: { 
    status?: string;
    type?: string;
    search?: string;
    date?: string;
    page?: string;
  }
}) {
  return (
    <AppShell
      title="Order Management"
      description="View and manage all restaurant orders"
      breadcrumbs={[{ label: 'Orders' }]}
      actions={
        <>
          <Link href="/orders/new">
            <Button variant="primary">New Order</Button>
          </Link>
          <Link href="/orders/export">
            <Button variant="secondary">Export</Button>
          </Link>
        </>
      }
    >
      <Suspense fallback={<OrdersSkeleton />}>
        <OrdersContent searchParams={searchParams} />
      </Suspense>
    </AppShell>
  );
}