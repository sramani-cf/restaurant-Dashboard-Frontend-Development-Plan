import { Suspense } from 'react';
import { OrdersContent } from './orders-content';
import { OrdersSkeleton } from './orders-skeleton';
import { PageHeader } from '@/components/ui/page-header';

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
        actions={[
          {
            label: 'New Order',
            href: '/orders/new',
            variant: 'primary'
          },
          {
            label: 'Export',
            onClick: () => {},
            variant: 'secondary'
          }
        ]}
      />

      <Suspense fallback={<OrdersSkeleton />}>
        <OrdersContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}