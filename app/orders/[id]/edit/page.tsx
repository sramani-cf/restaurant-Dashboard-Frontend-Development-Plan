import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getOrder } from '@/lib/orders/data';
import { OrderEditForm } from './order-edit-form';
import { OrderDetailSkeleton } from '../order-detail-skeleton';

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-2">
          <a href="/orders" className="hover:text-gray-900">Orders</a> / <a href={`/orders/${params.id}`} className="hover:text-gray-900">Order {order.orderNumber}</a> / Edit
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Order {order.orderNumber}</h1>
          <p className="text-sm text-gray-600">Modify order details, items, and customer information</p>
        </div>
      </div>
      <Suspense fallback={<OrderDetailSkeleton />}>
        <OrderEditForm order={order} />
      </Suspense>
    </div>
  );
}