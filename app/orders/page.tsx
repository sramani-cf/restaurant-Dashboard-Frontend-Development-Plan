import { Suspense } from 'react';
import Link from 'next/link';
import { OrdersContent } from './orders-content';
import { OrdersSkeleton } from './orders-skeleton';
import { PageHeader } from '@/components/ui/page-header';
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
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <PageHeader
        title="Order Management"
        description="View and manage all restaurant orders"
        actions={
          <div className="flex space-x-2">
            <Link href="/orders/new">
              <Button variant="primary">New Order</Button>
            </Link>
            <Link href="/orders/export">
              <Button variant="secondary">Export</Button>
            </Link>
          </div>
        }
      />

      <Suspense fallback={<OrdersSkeleton />}>
        <OrdersContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}