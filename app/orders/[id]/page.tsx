import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getOrder } from '@/lib/orders/data';
import { OrderDetailContent } from './order-detail-content';
import { OrderDetailSkeleton } from './order-detail-skeleton';
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-2">
          <Link href="/orders" className="hover:text-gray-900">Orders</Link> / Order {order.orderNumber}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order {order.orderNumber}</h1>
            <p className="text-sm text-gray-600">{order.type.replace('_', ' ')} • {order.customerName || 'Guest'}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="secondary">Print</Button>
            <Link href={`/orders/${params.id}/edit`}>
              <Button variant="secondary">Edit</Button>
            </Link>
          </div>
        </div>
      </div>
      <Suspense fallback={<OrderDetailSkeleton />}>
        <OrderDetailContent order={order} />
      </Suspense>
    </div>
  );
}