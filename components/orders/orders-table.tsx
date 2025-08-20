'use client';

import { useState } from 'react';
import { OrderListItem, OrderStatus } from '@/lib/orders/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Clock, 
  DollarSign, 
  User, 
  Hash,
  ChevronRight,
  MoreVertical
} from 'lucide-react';

interface OrdersTableProps {
  orders: OrderListItem[];
  loading: boolean;
  selectedOrders: string[];
  onSelectOrders: (orders: string[]) => void;
  onStatusUpdate: (orderId: string, status: OrderStatus) => void;
  onCancelOrder: (orderId: string) => void;
  onViewOrder: (orderId: string) => void;
}

export function OrdersTable({
  orders,
  loading,
  selectedOrders,
  onSelectOrders,
  onStatusUpdate,
  onCancelOrder,
  onViewOrder
}: OrdersTableProps) {
  const [sortBy, setSortBy] = useState<'date' | 'total' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return 'yellow';
      case OrderStatus.CONFIRMED: return 'blue';
      case OrderStatus.PREPARING: return 'orange';
      case OrderStatus.READY: return 'green';
      case OrderStatus.COMPLETED: return 'gray';
      case OrderStatus.DELIVERED: return 'green';
      case OrderStatus.CANCELLED: return 'red';
      case OrderStatus.REFUNDED: return 'purple';
      default: return 'gray';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dine_in': return '🍽️';
      case 'takeout': return '🥡';
      case 'delivery': return '🚚';
      case 'pickup': return '🛍️';
      default: return '📦';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      onSelectOrders([]);
    } else {
      onSelectOrders(orders.map(o => o.id));
    }
  };

  const handleSelectOrder = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      onSelectOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      onSelectOrders([...selectedOrders, orderId]);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No orders found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b">
          <tr>
            <th className="p-4 text-left">
              <Checkbox
                checked={selectedOrders.length === orders.length}
                onCheckedChange={handleSelectAll}
              />
            </th>
            <th className="p-4 text-left font-medium">Order</th>
            <th className="p-4 text-left font-medium">Customer</th>
            <th className="p-4 text-left font-medium">Type</th>
            <th className="p-4 text-left font-medium">Items</th>
            <th className="p-4 text-left font-medium">Total</th>
            <th className="p-4 text-left font-medium">Status</th>
            <th className="p-4 text-left font-medium">Time</th>
            <th className="p-4 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {orders.map((order) => (
            <tr 
              key={order.id}
              className="hover:bg-muted/50 cursor-pointer"
              onClick={() => onViewOrder(order.id)}
            >
              <td className="p-4" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedOrders.includes(order.id)}
                  onCheckedChange={() => handleSelectOrder(order.id)}
                />
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{order.orderNumber}</span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{order.customerName || 'Guest'}</p>
                    {order.tableNumber && (
                      <p className="text-sm text-muted-foreground">Table {order.tableNumber}</p>
                    )}
                  </div>
                </div>
              </td>
              <td className="p-4">
                <span className="text-xl" title={order.type}>
                  {getTypeIcon(order.type)}
                </span>
              </td>
              <td className="p-4">
                <span className="text-sm">{order.itemCount} items</span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{order.total.toFixed(2)}</span>
                </div>
              </td>
              <td className="p-4">
                <Badge variant={getStatusColor(order.status) as any}>
                  {order.status.replace('_', ' ')}
                </Badge>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(order.createdAt)}</span>
                </div>
                {order.estimatedReadyTime && (
                  <p className="text-xs text-orange-500 mt-1">
                    Ready: {new Date(order.estimatedReadyTime).toLocaleTimeString()}
                  </p>
                )}
              </td>
              <td className="p-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onViewOrder(order.id)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}