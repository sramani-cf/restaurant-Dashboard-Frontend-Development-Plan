import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getOrder } from '@/lib/orders/data';
import { OrderEditForm } from './order-edit-form';
import { OrderDetailSkeleton } from '../order-detail-skeleton';
import { PageHeader } from '@/components/ui/page-header';

export default async function EditOrderPage({
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
        title={`Edit Order ${order.orderNumber}`}
        description="Modify order details, items, and customer information"
        backHref={`/orders/${params.id}`}
      />

      <Suspense fallback={<OrderDetailSkeleton />}>
        <OrderEditForm order={order} />
      </Suspense>
    </div>
  );
}