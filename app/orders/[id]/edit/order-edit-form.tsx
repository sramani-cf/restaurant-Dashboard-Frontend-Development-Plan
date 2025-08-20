'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Order, OrderItem, OrderType, OrderStatus } from '@/lib/orders/types';
import { updateOrder } from '@/lib/orders/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  X, 
  Plus, 
  Minus,
  Trash2,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Package,
  DollarSign,
  Percent
} from 'lucide-react';

interface OrderEditFormProps {
  order: Order;
}

export function OrderEditForm({ order: initialOrder }: OrderEditFormProps) {
  const router = useRouter();
  const [order, setOrder] = useState(initialOrder);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update customer info
  const updateCustomerField = (field: string, value: string) => {
    setOrder(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Update item quantity
  const updateItemQuantity = (itemId: string, delta: number) => {
    setOrder(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: item.unitPrice * newQuantity
          };
        }
        return item;
      })
    }));
  };

  // Remove item
  const removeItem = (itemId: string) => {
    setOrder(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  // Update special instructions
  const updateItemInstructions = (itemId: string, instructions: string) => {
    setOrder(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? { ...item, specialInstructions: instructions } : item
      )
    }));
  };

  // Calculate totals
  const recalculateTotals = () => {
    const subtotal = order.items.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = subtotal * 0.08; // 8% tax rate
    const total = subtotal + tax + order.tip - order.discount;

    setOrder(prev => ({
      ...prev,
      subtotal,
      tax,
      total
    }));
  };

  // Save changes
  const handleSave = async () => {
    // Validate
    const newErrors: Record<string, string> = {};
    
    if (!order.customerName && order.type !== OrderType.TAKEOUT) {
      newErrors.customerName = 'Customer name is required';
    }
    
    if (order.items.length === 0) {
      newErrors.items = 'Order must have at least one item';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    try {
      // Recalculate before saving
      recalculateTotals();
      
      await updateOrder(order.id, {
        items: order.items.map(item => ({
          id: item.id,
          quantity: item.quantity,
          specialInstructions: item.specialInstructions
        })),
        notes: order.notes
      });
      
      router.push(`/orders/${order.id}`);
    } catch (error) {
      console.error('Failed to save order:', error);
      setErrors({ save: 'Failed to save changes' });
    } finally {
      setSaving(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    if (confirm('Discard unsaved changes?')) {
      router.push(`/orders/${order.id}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-lg px-3 py-1">
              {order.status.replace('_', ' ')}
            </Badge>
            <span className="text-muted-foreground">
              Order Type: {order.type.replace('_', ' ')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={saving}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </Card>

      {errors.save && (
        <Card className="p-4 border-red-200 bg-red-50">
          <p className="text-red-600">{errors.save}</p>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <Card>
            <div className="p-4 border-b">
              <h3 className="font-semibold">Customer Information</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <User className="h-4 w-4" />
                  Customer Name
                </label>
                <Input
                  value={order.customerName || ''}
                  onChange={(e) => updateCustomerField('customerName', e.target.value)}
                  placeholder="Enter customer name"
                  className={errors.customerName ? 'border-red-500' : ''}
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </label>
                  <Input
                    value={order.customerPhone || ''}
                    onChange={(e) => updateCustomerField('customerPhone', e.target.value)}
                    placeholder="555-0000"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={order.customerEmail || ''}
                    onChange={(e) => updateCustomerField('customerEmail', e.target.value)}
                    placeholder="customer@email.com"
                  />
                </div>
              </div>

              {order.type === OrderType.DINE_IN && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <MapPin className="h-4 w-4" />
                    Table Number
                  </label>
                  <Input
                    value={order.tableNumber || ''}
                    onChange={(e) => updateCustomerField('tableNumber', e.target.value)}
                    placeholder="T1"
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Order Items */}
          <Card>
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Order Items</h3>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
            <div className="divide-y">
              {order.items.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No items in this order</p>
                  <Button className="mt-4" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Item
                  </Button>
                </div>
              ) : (
                order.items.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{item.menuItemName}</span>
                          <Badge variant="outline" className="text-xs">
                            {item.status}
                          </Badge>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mb-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateItemQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateItemQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm text-muted-foreground ml-2">
                            @ ${item.unitPrice.toFixed(2)} each
                          </span>
                        </div>

                        {/* Modifiers */}
                        {item.modifiers.length > 0 && (
                          <div className="text-sm text-muted-foreground mb-2">
                            {item.modifiers.map(mod => (
                              <div key={mod.id}>• {mod.name} (+${mod.price.toFixed(2)})</div>
                            ))}
                          </div>
                        )}

                        {/* Special Instructions */}
                        <div>
                          <label className="text-sm text-muted-foreground">
                            Special Instructions
                          </label>
                          <Input
                            className="mt-1"
                            value={item.specialInstructions || ''}
                            onChange={(e) => updateItemInstructions(item.id, e.target.value)}
                            placeholder="Add notes for the kitchen..."
                          />
                        </div>
                      </div>

                      <div className="text-right ml-4">
                        <div className="font-medium mb-2">
                          ${item.totalPrice.toFixed(2)}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {errors.items && (
                <div className="p-4">
                  <p className="text-red-500 text-sm">{errors.items}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Order Notes */}
          <Card>
            <div className="p-4 border-b">
              <h3 className="font-semibold">Order Notes</h3>
            </div>
            <div className="p-4">
              <textarea
                className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
                value={order.notes || ''}
                onChange={(e) => setOrder(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add any special instructions or notes for this order..."
              />
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <Card>
            <div className="p-4 border-b">
              <h3 className="font-semibold">Pricing & Totals</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (8%)</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                
                {/* Tip */}
                <div>
                  <label className="flex items-center gap-2 text-sm mb-1">
                    <DollarSign className="h-3 w-3" />
                    Tip
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={order.tip}
                    onChange={(e) => setOrder(prev => ({
                      ...prev,
                      tip: parseFloat(e.target.value) || 0
                    }))}
                  />
                </div>

                {/* Discount */}
                <div>
                  <label className="flex items-center gap-2 text-sm mb-1">
                    <Percent className="h-3 w-3" />
                    Discount
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={order.discount}
                    onChange={(e) => setOrder(prev => ({
                      ...prev,
                      discount: parseFloat(e.target.value) || 0
                    }))}
                  />
                </div>

                <div className="pt-2 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-lg">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={recalculateTotals}
                >
                  Recalculate Totals
                </Button>
              </div>
            </div>
          </Card>

          {/* Payment Status */}
          <Card>
            <div className="p-4 border-b">
              <h3 className="font-semibold">Payment Information</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="outline">
                  {order.paymentStatus.replace('_', ' ')}
                </Badge>
              </div>
              {order.paymentMethod && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Method</span>
                  <span className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    {order.paymentMethod.replace('_', ' ')}
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <div className="p-4 border-b">
              <h3 className="font-semibold">Quick Actions</h3>
            </div>
            <div className="p-4 space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push(`/orders/${order.id}`)}
              >
                View Order Details
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.print()}
              >
                Print Order
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700"
                onClick={() => {
                  if (confirm('Cancel this order?')) {
                    // Cancel order logic
                  }
                }}
              >
                Cancel Order
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}