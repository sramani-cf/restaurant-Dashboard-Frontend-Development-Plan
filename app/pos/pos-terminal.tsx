'use client';

import { useState, useEffect } from 'react';
import { 
  POSSession, 
  Cart, 
  MenuItem, 
  CartItem,
  MenuCategory,
  Customer,
  OrderType,
  Discount,
  Tip
} from '@/lib/pos/types';
import { 
  mockMenuCategories, 
  createEmptyCart, 
  calculateCartTotals,
  defaultPOSConfig 
} from '@/lib/pos/data';
import { MenuGrid } from './components/menu-grid';
import { CartView } from './components/cart-view';
import { CategoryTabs } from './components/category-tabs';
import { QuickKeys } from './components/quick-keys';
import { PaymentScreen } from './components/payment-screen';
import { CustomerLookup } from './components/customer-lookup';
import { DiscountModal } from './components/discount-modal';
import { ModifierModal } from './components/modifier-modal';
import { 
  ShoppingCart, 
  Users, 
  Receipt, 
  Power, 
  Settings,
  Clock,
  Percent,
  Package,
  TrendingUp
} from 'lucide-react';
import { OfflineIndicator } from './components/offline-indicator';
import { offlineStorage, syncManager } from '@/lib/pos/offline-storage';

interface POSTerminalProps {
  session: POSSession;
  onLogout: () => void;
}

export function POSTerminal({ session, onLogout }: POSTerminalProps) {
  const [cart, setCart] = useState<Cart>(createEmptyCart());
  const [categories] = useState<MenuCategory[]>(mockMenuCategories);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>(categories[0]);
  const [showPayment, setShowPayment] = useState(false);
  const [showCustomerLookup, setShowCustomerLookup] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [selectedItemForModifiers, setSelectedItemForModifiers] = useState<MenuItem | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Initialize offline storage and sync manager
    offlineStorage.init().then(() => {
      syncManager.start();
    });

    return () => {
      clearInterval(timer);
      syncManager.stop();
    };
  }, []);

  const handleAddToCart = (menuItem: MenuItem) => {
    // Check if item has required modifiers
    if (menuItem.modifiers?.some(m => m.type === 'required')) {
      setSelectedItemForModifiers(menuItem);
      return;
    }

    addItemToCart(menuItem, []);
  };

  const addItemToCart = (menuItem: MenuItem, selectedModifiers: any[]) => {
    const existingItemIndex = cart.items.findIndex(
      item => item.menuItem.id === menuItem.id && 
      JSON.stringify(item.modifiers) === JSON.stringify(selectedModifiers)
    );

    if (existingItemIndex >= 0) {
      // Increase quantity of existing item
      const updatedItems = [...cart.items];
      updatedItems[existingItemIndex].quantity += 1;
      const subtotal = updatedItems[existingItemIndex].menuItem.price * updatedItems[existingItemIndex].quantity;
      updatedItems[existingItemIndex].subtotal = subtotal;
      updatedItems[existingItemIndex].total = subtotal * (1 + defaultPOSConfig.taxRate);
      
      const updatedCart = calculateCartTotals({ ...cart, items: updatedItems }, defaultPOSConfig.taxRate);
      setCart(updatedCart);
    } else {
      // Add new item
      const subtotal = menuItem.price + selectedModifiers.reduce((sum, mod) => sum + mod.totalPrice, 0);
      const newItem: CartItem = {
        id: `cart-item-${Date.now()}`,
        menuItem,
        quantity: 1,
        modifiers: selectedModifiers,
        subtotal,
        tax: subtotal * defaultPOSConfig.taxRate,
        total: subtotal * (1 + defaultPOSConfig.taxRate)
      };
      
      const updatedCart = calculateCartTotals(
        { ...cart, items: [...cart.items, newItem] },
        defaultPOSConfig.taxRate
      );
      setCart(updatedCart);
    }
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }

    const updatedItems = cart.items.map(item => {
      if (item.id === itemId) {
        const basePrice = item.menuItem.price + item.modifiers.reduce((sum, mod) => sum + mod.totalPrice, 0);
        const subtotal = basePrice * quantity;
        return {
          ...item,
          quantity,
          subtotal,
          tax: subtotal * defaultPOSConfig.taxRate,
          total: subtotal * (1 + defaultPOSConfig.taxRate)
        };
      }
      return item;
    });

    const updatedCart = calculateCartTotals({ ...cart, items: updatedItems }, defaultPOSConfig.taxRate);
    setCart(updatedCart);
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedItems = cart.items.filter(item => item.id !== itemId);
    const updatedCart = calculateCartTotals({ ...cart, items: updatedItems }, defaultPOSConfig.taxRate);
    setCart(updatedCart);
  };

  const handleClearCart = () => {
    setCart(createEmptyCart());
  };

  const handleSetCustomer = (customer: Customer) => {
    setCart({ ...cart, customerId: customer.id });
    setShowCustomerLookup(false);
  };

  const handleApplyDiscount = (discount: Discount) => {
    const updatedCart = calculateCartTotals({ ...cart, discount }, defaultPOSConfig.taxRate);
    setCart(updatedCart);
    setShowDiscount(false);
  };

  const handleSetTip = (tip: Tip) => {
    const updatedCart = calculateCartTotals({ ...cart, tip }, defaultPOSConfig.taxRate);
    setCart(updatedCart);
  };

  const handleSetOrderType = (orderType: OrderType) => {
    setCart({ ...cart, orderType });
  };

  const handlePaymentComplete = (transaction: any) => {
    // Reset cart after successful payment
    setCart(createEmptyCart());
    setShowPayment(false);
    // In a real app, would create order and print receipt
  };

  const handleQuickKey = (quickKey: any) => {
    if (quickKey.menuItemId) {
      const menuItem = categories
        .flatMap(cat => cat.items)
        .find(item => item.id === quickKey.menuItemId);
      if (menuItem) {
        handleAddToCart(menuItem);
      }
    } else if (quickKey.action === 'apply_discount') {
      setShowDiscount(true);
    } else if (quickKey.action === 'open_category') {
      const category = categories.find(cat => cat.name === quickKey.label);
      if (category) {
        setSelectedCategory(category);
      }
    }
  };

  if (showPayment) {
    return (
      <PaymentScreen
        cart={cart}
        onBack={() => setShowPayment(false)}
        onComplete={handlePaymentComplete}
        onSetTip={handleSetTip}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Left Side - Menu */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">POS Terminal</h1>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">{session.employeeName}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">{session.terminalId}</span>
            </div>
            <div className="flex items-center gap-4">
              <OfflineIndicator />
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Power className="h-5 w-5 text-red-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Keys */}
        <div className="px-4 py-3 bg-gray-800/50">
          <QuickKeys 
            quickKeys={defaultPOSConfig.quickKeys} 
            onQuickKey={handleQuickKey}
          />
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Menu Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <MenuGrid
            items={selectedCategory.items}
            onAddItem={handleAddToCart}
          />
        </div>

        {/* Bottom Actions */}
        <div className="bg-gray-800 border-t border-gray-700 px-4 py-3">
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => setShowCustomerLookup(true)}
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg transition-colors"
            >
              <Users className="h-5 w-5" />
              <span>Customer</span>
            </button>
            <button
              onClick={() => setShowDiscount(true)}
              disabled={cart.items.length === 0}
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 py-3 rounded-lg transition-colors"
            >
              <Percent className="h-5 w-5" />
              <span>Discount</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg transition-colors">
              <Package className="h-5 w-5" />
              <span>Orders</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg transition-colors">
              <TrendingUp className="h-5 w-5" />
              <span>Reports</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Cart */}
      <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
        <CartView
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onCheckout={() => setShowPayment(true)}
          onSetOrderType={handleSetOrderType}
        />
      </div>

      {/* Modals */}
      {showCustomerLookup && (
        <CustomerLookup
          onClose={() => setShowCustomerLookup(false)}
          onSelectCustomer={handleSetCustomer}
        />
      )}

      {showDiscount && (
        <DiscountModal
          onClose={() => setShowDiscount(false)}
          onApplyDiscount={handleApplyDiscount}
          currentSubtotal={cart.subtotal}
        />
      )}

      {selectedItemForModifiers && (
        <ModifierModal
          menuItem={selectedItemForModifiers}
          onClose={() => setSelectedItemForModifiers(null)}
          onConfirm={(modifiers) => {
            addItemToCart(selectedItemForModifiers, modifiers);
            setSelectedItemForModifiers(null);
          }}
        />
      )}
    </div>
  );
}