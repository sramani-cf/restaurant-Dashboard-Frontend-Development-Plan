import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getOrder } from '@/lib/orders/data';
import { OrderEditForm } from './order-edit-form';
import { OrderDetailSkeleton } from '../order-detail-skeleton';
import { AppShell } from '@/components/layout';

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
    <AppShell
      title={`Edit Order ${order.orderNumber}`}
      description="Modify order details, items, and customer information"
      breadcrumbs={[
        { label: 'Orders', href: '/orders' },
        { label: `Order ${order.orderNumber}`, href: `/orders/${params.id}` },
        { label: 'Edit' }
      ]}
    >
      <Suspense fallback={<OrderDetailSkeleton />}>
        <OrderEditForm order={order} />
      </Suspense>
    </AppShell>
  );
}