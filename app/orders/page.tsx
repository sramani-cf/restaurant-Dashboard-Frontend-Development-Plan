import { Suspense } from 'react';
import Link from 'next/link';
import { OrdersContent } from './orders-content';
import { OrdersSkeleton } from './orders-skeleton';
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-sm text-gray-600">View and manage all restaurant orders</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/orders/new">
            <Button variant="primary">New Order</Button>
          </Link>
          <Link href="/orders/export">
            <Button variant="secondary">Export</Button>
          </Link>
        </div>
      </div>
      <Suspense fallback={<OrdersSkeleton />}>
        <OrdersContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}