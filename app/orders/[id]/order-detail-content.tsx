'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Order, OrderStatus, PaymentStatus } from '@/lib/orders/types';
import { updateOrder, cancelOrder, processRefund } from '@/lib/orders/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs } from '@/components/ui/tabs';
import { 
  Clock, 
  DollarSign, 
  User, 
  MapPin, 
  Phone,
  Mail,
  CreditCard,
  Package,
  ChefHat,
  Truck,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Printer,
  RefreshCw,
  MessageSquare,
  Calendar,
  Timer
} from 'lucide-react';

interface OrderDetailContentProps {
  order: Order;
}

export function OrderDetailContent({ order: initialOrder }: OrderDetailContentProps) {
  const router = useRouter();
  const [order, setOrder] = useState(initialOrder);
  const [updating, setUpdating] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // Status colors
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

  const getPaymentStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PENDING: return 'yellow';
      case PaymentStatus.PROCESSING: return 'blue';
      case PaymentStatus.COMPLETED: return 'green';
      case PaymentStatus.FAILED: return 'red';
      case PaymentStatus.REFUNDED: return 'purple';
      case PaymentStatus.PARTIALLY_REFUNDED: return 'orange';
      default: return 'gray';
    }
  };

  // Update order status
  const handleStatusUpdate = async (status: OrderStatus) => {
    setUpdating(true);
    try {
      const updated = await updateOrder(order.id, { status });
      if (updated) {
        setOrder(updated);
      }
    } catch (error) {
      console.error('Failed to update order:', error);
    } finally {
      setUpdating(false);
    }
  };

  // Cancel order
  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    
    setUpdating(true);
    try {
      const updated = await cancelOrder(order.id, 'Cancelled by staff');
      if (updated) {
        setOrder(updated);
      }
    } catch (error) {
      console.error('Failed to cancel order:', error);
    } finally {
      setUpdating(false);
    }
  };

  // Process refund
  const handleRefund = async (amount: number, reason: string) => {
    setUpdating(true);
    try {
      const updated = await processRefund(order.id, {
        orderId: order.id,
        amount,
        reason,
        refundMethod: 'original',
        notes: reason
      });
      if (updated) {
        setOrder(updated);
        setShowRefundModal(false);
      }
    } catch (error) {
      console.error('Failed to process refund:', error);
    } finally {
      setUpdating(false);
    }
  };

  // Calculate times
  const getElapsedTime = (start: string, end?: string) => {
    const startTime = new Date(start).getTime();
    const endTime = end ? new Date(end).getTime() : Date.now();
    const elapsed = Math.floor((endTime - startTime) / 60000); // minutes
    
    if (elapsed < 60) return `${elapsed}m`;
    const hours = Math.floor(elapsed / 60);
    const minutes = elapsed % 60;
    return `${hours}h ${minutes}m`;
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'items', label: 'Items' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'payment', label: 'Payment' },
  ];

  if (order.type === OrderType.DELIVERY) {
    tabs.push({ id: 'delivery', label: 'Delivery' });
  }

  return (
    <div className="space-y-6">
      {/* Status Bar */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant={getStatusColor(order.status) as any} className="text-lg px-3 py-1">
              {order.status.replace('_', ' ')}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Created {getElapsedTime(order.createdAt)} ago</span>
            </div>
            {order.estimatedReadyTime && (
              <div className="flex items-center gap-2 text-sm">
                <Timer className="h-4 w-4 text-orange-500" />
                <span>Est. ready in {getElapsedTime(new Date().toISOString(), order.estimatedReadyTime)}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {order.status === OrderStatus.PENDING && (
              <Button
                size="sm"
                onClick={() => handleStatusUpdate(OrderStatus.CONFIRMED)}
                disabled={updating}
              >
                Confirm Order
              </Button>
            )}
            {order.status === OrderStatus.CONFIRMED && (
              <Button
                size="sm"
                onClick={() => handleStatusUpdate(OrderStatus.PREPARING)}
                disabled={updating}
              >
                Start Preparing
              </Button>
            )}
            {order.status === OrderStatus.PREPARING && (
              <Button
                size="sm"
                onClick={() => handleStatusUpdate(OrderStatus.READY)}
                disabled={updating}
              >
                Mark Ready
              </Button>
            )}
            {order.status === OrderStatus.READY && (
              <Button
                size="sm"
                onClick={() => handleStatusUpdate(
                  order.type === OrderType.DELIVERY ? OrderStatus.DELIVERED : OrderStatus.COMPLETED
                )}
                disabled={updating}
              >
                {order.type === OrderType.DELIVERY ? 'Mark Delivered' : 'Complete Order'}
              </Button>
            )}
            {![OrderStatus.CANCELLED, OrderStatus.REFUNDED, OrderStatus.COMPLETED, OrderStatus.DELIVERED].includes(order.status) && (
              <Button
                size="sm"
                variant="destructive"
                onClick={handleCancel}
                disabled={updating}
              >
                Cancel
              </Button>
            )}
            {[OrderStatus.COMPLETED, OrderStatus.DELIVERED].includes(order.status) && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowRefundModal(true)}
              >
                Process Refund
              </Button>
            )}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview" tabs={tabs}>
            {/* Overview Tab */}
            <div value="overview" className="space-y-6">
              {/* Customer Information */}
              <Card>
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Customer Information</h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{order.customerName || 'Guest Customer'}</span>
                  </div>
                  {order.customerPhone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{order.customerPhone}</span>
                    </div>
                  )}
                  {order.customerEmail && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{order.customerEmail}</span>
                    </div>
                  )}
                  {order.tableNumber && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Table {order.tableNumber}</span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Order Summary */}
              <Card>
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Order Summary</h3>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  {order.tip > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Tip</span>
                      <span>${order.tip.toFixed(2)}</span>
                    </div>
                  )}
                  {order.discount > 0 && (
                    <div className="flex justify-between text-sm text-red-600">
                      <span>Discount</span>
                      <span>-${order.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Items Tab */}
            <div value="items" className="space-y-4">
              <Card>
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Order Items</h3>
                </div>
                <div className="divide-y">
                  {order.items.map((item) => (
                    <div key={item.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.quantity}x</span>
                            <span>{item.menuItemName}</span>
                          </div>
                          {item.modifiers.length > 0 && (
                            <div className="text-sm text-muted-foreground pl-8">
                              {item.modifiers.map(mod => (
                                <div key={mod.id}>• {mod.name}</div>
                              ))}
                            </div>
                          )}
                          {item.specialInstructions && (
                            <div className="text-sm text-muted-foreground pl-8 italic">
                              Note: {item.specialInstructions}
                            </div>
                          )}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground pl-8">
                            <span>Station: {item.station}</span>
                            <span>Prep time: {item.prepTime}m</span>
                            <Badge variant={
                              item.status === 'served' ? 'default' :
                              item.status === 'ready' ? 'success' :
                              item.status === 'preparing' ? 'warning' :
                              'secondary'
                            } className="text-xs">
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${item.totalPrice.toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">
                            ${item.unitPrice.toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Timeline Tab */}
            <div value="timeline" className="space-y-4">
              <Card>
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Order Timeline</h3>
                </div>
                <div className="p-4">
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
                    {order.timeline.map((event, index) => (
                      <div key={event.id} className="relative flex gap-4 pb-8 last:pb-0">
                        <div className="absolute left-4 -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></div>
                        <div className="ml-8 flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium">{event.event}</p>
                            <span className="text-sm text-muted-foreground">
                              {new Date(event.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          {event.user && (
                            <p className="text-sm text-muted-foreground mt-1">by {event.user}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Payment Tab */}
            <div value="payment" className="space-y-4">
              <Card>
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Payment Information</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant={getPaymentStatusColor(order.paymentStatus) as any}>
                      {order.paymentStatus.replace('_', ' ')}
                    </Badge>
                  </div>
                  {order.paymentMethod && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Method</span>
                      <span className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        {order.paymentMethod.replace('_', ' ')}
                      </span>
                    </div>
                  )}
                  {order.paymentDetails && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Transaction ID</span>
                        <span className="font-mono text-sm">{order.paymentDetails.transactionId}</span>
                      </div>
                      {order.paymentDetails.lastFourDigits && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Card</span>
                          <span>
                            {order.paymentDetails.cardBrand} •••• {order.paymentDetails.lastFourDigits}
                          </span>
                        </div>
                      )}
                      {order.paymentDetails.authorizationCode && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Auth Code</span>
                          <span className="font-mono text-sm">{order.paymentDetails.authorizationCode}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </Card>
            </div>

            {/* Delivery Tab */}
            {order.type === OrderType.DELIVERY && order.deliveryInfo && (
              <div value="delivery" className="space-y-4">
                <Card>
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Delivery Information</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Delivery Address</p>
                      <p>{order.deliveryInfo.address}</p>
                      <p>{order.deliveryInfo.city}, {order.deliveryInfo.state} {order.deliveryInfo.zipCode}</p>
                    </div>
                    {order.deliveryInfo.instructions && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Instructions</p>
                        <p>{order.deliveryInfo.instructions}</p>
                      </div>
                    )}
                    {order.deliveryInfo.driverName && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Driver</p>
                        <p>{order.deliveryInfo.driverName}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                        <p>{order.deliveryInfo.estimatedDeliveryTime ? 
                          new Date(order.deliveryInfo.estimatedDeliveryTime).toLocaleString() : 
                          'Not set'}</p>
                      </div>
                      {order.deliveryInfo.actualDeliveryTime && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Actual Delivery</p>
                          <p>{new Date(order.deliveryInfo.actualDeliveryTime).toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span>Delivery Fee</span>
                      <span className="font-medium">${order.deliveryInfo.deliveryFee.toFixed(2)}</span>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <div className="p-4 border-b">
              <h3 className="font-semibold">Quick Actions</h3>
            </div>
            <div className="p-4 space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Order
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push(`/orders/${order.id}/edit`)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Order
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowNotes(!showNotes)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Add Note
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.refresh()}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </Card>

          {/* Order Info */}
          <Card>
            <div className="p-4 border-b">
              <h3 className="font-semibold">Order Information</h3>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono">{order.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Order Number</span>
                <span className="font-medium">{order.orderNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Type</span>
                <Badge variant="outline">{order.type.replace('_', ' ')}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Source</span>
                <span>{order.source}</span>
              </div>
              {order.thirdPartyProvider && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Provider</span>
                  <span>{order.thirdPartyProvider}</span>
                </div>
              )}
              {order.posOrderId && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">POS ID</span>
                  <span className="font-mono text-xs">{order.posOrderId}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Staff Assignment */}
          {order.assignedStaff && order.assignedStaff.length > 0 && (
            <Card>
              <div className="p-4 border-b">
                <h3 className="font-semibold">Assigned Staff</h3>
              </div>
              <div className="p-4 space-y-2">
                {order.assignedStaff.map(staff => (
                  <div key={staff.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{staff.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {staff.role}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Notes */}
          {order.notes && (
            <Card>
              <div className="p-4 border-b">
                <h3 className="font-semibold">Notes</h3>
              </div>
              <div className="p-4">
                <p className="text-sm">{order.notes}</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}