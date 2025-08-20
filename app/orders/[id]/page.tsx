import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getOrder } from '@/lib/orders/data';
import { OrderDetailContent } from './order-detail-content';
import { OrderDetailSkeleton } from './order-detail-skeleton';
import { PageHeader } from '@/components/ui/page-header';

export default async function OrderDetailPage({
  params
}: {
  params: { id: string }
}) {
  const order = await getOrder(params.id);

  if (!order) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <PageHeader
        title={`Order ${order.orderNumber}`}
        description={`${order.type.replace('_', ' ')} • ${order.customerName || 'Guest'}`}
        backHref="/orders"
        actions={[
          {
            label: 'Print',
            onClick: () => {},
            variant: 'outline'
          },
          {
            label: 'Edit',
            href: `/orders/${params.id}/edit`,
            variant: 'secondary'
          }
        ]}
      />

      <Suspense fallback={<OrderDetailSkeleton />}>
        <OrderDetailContent order={order} />
      </Suspense>
    </div>
  );
}