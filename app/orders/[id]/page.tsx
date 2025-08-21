import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getOrder } from '@/lib/orders/data';
import { OrderDetailContent } from './order-detail-content';
import { OrderDetailSkeleton } from './order-detail-skeleton';
import { AppShell } from '@/components/layout';
import { Button } from '@/components/ui/button';

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
    <AppShell
      title={`Order ${order.orderNumber}`}
      description={`${order.type.replace('_', ' ')} • ${order.customerName || 'Guest'}`}
      breadcrumbs={[
        { label: 'Orders', href: '/orders' },
        { label: `Order ${order.orderNumber}` }
      ]}
      actions={
        <>
          <Button variant="secondary">Print</Button>
          <Link href={`/orders/${params.id}/edit`}>
            <Button variant="secondary">Edit</Button>
          </Link>
        </>
      }
    >
      <Suspense fallback={<OrderDetailSkeleton />}>
        <OrderDetailContent order={order} />
      </Suspense>
    </AppShell>
  );
}