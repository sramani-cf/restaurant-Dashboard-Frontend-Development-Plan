'use client';

import { Cart, OrderType } from '@/lib/pos/types';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  X,
  Package,
  Users,
  Truck,
  Home
} from 'lucide-react';

interface CartViewProps {
  cart: Cart;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  onSetOrderType: (type: OrderType) => void;
}

export function CartView({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  onSetOrderType
}: CartViewProps) {
  const orderTypeOptions = [
    { value: OrderType.DINE_IN, label: 'Dine In', icon: Users },
    { value: OrderType.TAKEOUT, label: 'Takeout', icon: Package },
    { value: OrderType.DELIVERY, label: 'Delivery', icon: Truck },
    { value: OrderType.PICKUP, label: 'Pickup', icon: Home }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Current Order</h2>
            {cart.items.length > 0 && (
              <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-full text-sm">
                {cart.items.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            )}
          </div>
          {cart.items.length > 0 && (
            <button
              onClick={onClearCart}
              className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4 text-red-400" />
            </button>
          )}
        </div>

        {/* Order Type Selector */}
        <div className="grid grid-cols-4 gap-1 bg-gray-700 rounded-lg p-1">
          {orderTypeOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => onSetOrderType(option.value)}
                className={`flex flex-col items-center gap-1 py-2 rounded transition-colors ${
                  cart.orderType === option.value
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs">{option.label}</span>
              </button>
            );
          })}
        </div>

        {cart.customerId && (
          <div className="mt-2 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded">
            <p className="text-sm text-blue-400">Customer: #{cart.customerId}</p>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto">
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <ShoppingCart className="h-12 w-12 mb-3" />
            <p>Cart is empty</p>
            <p className="text-sm mt-1">Add items to get started</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="bg-gray-700/50 rounded-lg p-3 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.menuItem.name}</h4>
                    {item.modifiers.length > 0 && (
                      <div className="text-xs text-gray-400 mt-1">
                        {item.modifiers.map((mod) => (
                          <div key={mod.modifierId}>
                            {mod.modifierName}: {mod.selectedOptions.map(o => o.name).join(', ')}
                          </div>
                        ))}
                      </div>
                    )}
                    {item.specialInstructions && (
                      <p className="text-xs text-gray-400 mt-1 italic">
                        {item.specialInstructions}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 hover:bg-gray-600 rounded transition-colors"
                  >
                    <X className="h-4 w-4 text-red-400" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-600 rounded transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-600 rounded transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="font-medium">
                    ${item.subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Totals */}
      {cart.items.length > 0 && (
        <div className="border-t border-gray-700 p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Subtotal</span>
            <span>${cart.subtotal.toFixed(2)}</span>
          </div>
          
          {cart.discount && (
            <div className="flex justify-between text-sm">
              <span className="text-green-400">Discount</span>
              <span className="text-green-400">
                -${cart.discount.appliedAmount?.toFixed(2)}
              </span>
            </div>
          )}
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Tax</span>
            <span>${cart.tax.toFixed(2)}</span>
          </div>
          
          {cart.tip && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Tip</span>
              <span>${cart.tip.amount?.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-600">
            <span>Total</span>
            <span className="text-green-400">${cart.total.toFixed(2)}</span>
          </div>
          
          <button
            onClick={onCheckout}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg transition-colors mt-4"
          >
            Checkout ${cart.total.toFixed(2)}
          </button>
        </div>
      )}
    </div>
  );
}