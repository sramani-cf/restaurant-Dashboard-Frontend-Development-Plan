import {
  MenuItem,
  MenuCategory,
  Customer,
  PaymentMethod,
  POSConfig,
  OrderType,
  Cart,
  CartItem,
  QuickKey
} from './types';

export const mockMenuCategories: MenuCategory[] = [
  {
    id: 'cat-1',
    name: 'Appetizers',
    description: 'Start your meal right',
    displayOrder: 1,
    isActive: true,
    items: [
      {
        id: 'item-1',
        name: 'Mozzarella Sticks',
        category: 'Appetizers',
        price: 8.99,
        description: 'Golden fried mozzarella with marinara sauce',
        available: true,
        tags: ['vegetarian'],
        calories: 450,
        preparationTime: 8,
        modifiers: [
          {
            id: 'mod-1',
            name: 'Extra Sauce',
            price: 0.50,
            type: 'optional',
            options: [
              { id: 'opt-1', name: 'Marinara', price: 0, available: true },
              { id: 'opt-2', name: 'Ranch', price: 0, available: true },
              { id: 'opt-3', name: 'Blue Cheese', price: 0.50, available: true }
            ]
          }
        ]
      },
      {
        id: 'item-2',
        name: 'Chicken Wings',
        category: 'Appetizers',
        price: 12.99,
        description: 'Choice of buffalo, BBQ, or garlic parmesan',
        available: true,
        tags: ['gluten-free'],
        calories: 680,
        preparationTime: 15,
        modifiers: [
          {
            id: 'mod-2',
            name: 'Sauce Choice',
            price: 0,
            type: 'required',
            minSelections: 1,
            maxSelections: 1,
            options: [
              { id: 'opt-4', name: 'Buffalo', price: 0, available: true },
              { id: 'opt-5', name: 'BBQ', price: 0, available: true },
              { id: 'opt-6', name: 'Garlic Parmesan', price: 0, available: true },
              { id: 'opt-7', name: 'Honey Sriracha', price: 0, available: true }
            ]
          }
        ]
      },
      {
        id: 'item-3',
        name: 'Spinach Artichoke Dip',
        category: 'Appetizers',
        price: 10.99,
        description: 'Creamy blend with tortilla chips',
        available: true,
        tags: ['vegetarian'],
        calories: 520,
        preparationTime: 10
      }
    ]
  },
  {
    id: 'cat-2',
    name: 'Entrees',
    description: 'Main course selections',
    displayOrder: 2,
    isActive: true,
    items: [
      {
        id: 'item-4',
        name: 'Classic Burger',
        category: 'Entrees',
        price: 14.99,
        description: 'Angus beef patty with lettuce, tomato, onion',
        available: true,
        calories: 850,
        preparationTime: 12,
        modifiers: [
          {
            id: 'mod-3',
            name: 'Temperature',
            price: 0,
            type: 'required',
            minSelections: 1,
            maxSelections: 1,
            options: [
              { id: 'opt-8', name: 'Rare', price: 0, available: true },
              { id: 'opt-9', name: 'Medium Rare', price: 0, available: true },
              { id: 'opt-10', name: 'Medium', price: 0, available: true },
              { id: 'opt-11', name: 'Medium Well', price: 0, available: true },
              { id: 'opt-12', name: 'Well Done', price: 0, available: true }
            ]
          },
          {
            id: 'mod-4',
            name: 'Add-ons',
            price: 0,
            type: 'optional',
            maxSelections: 5,
            options: [
              { id: 'opt-13', name: 'Bacon', price: 2.00, available: true },
              { id: 'opt-14', name: 'Extra Cheese', price: 1.50, available: true },
              { id: 'opt-15', name: 'Avocado', price: 2.50, available: true },
              { id: 'opt-16', name: 'Fried Egg', price: 2.00, available: true },
              { id: 'opt-17', name: 'Mushrooms', price: 1.00, available: true }
            ]
          }
        ]
      },
      {
        id: 'item-5',
        name: 'Grilled Salmon',
        category: 'Entrees',
        price: 22.99,
        description: 'Atlantic salmon with lemon butter sauce',
        available: true,
        tags: ['gluten-free'],
        calories: 580,
        preparationTime: 18,
        modifiers: [
          {
            id: 'mod-5',
            name: 'Side Choice',
            price: 0,
            type: 'required',
            minSelections: 2,
            maxSelections: 2,
            options: [
              { id: 'opt-18', name: 'Rice Pilaf', price: 0, available: true },
              { id: 'opt-19', name: 'Mashed Potatoes', price: 0, available: true },
              { id: 'opt-20', name: 'Steamed Vegetables', price: 0, available: true },
              { id: 'opt-21', name: 'French Fries', price: 0, available: true },
              { id: 'opt-22', name: 'Side Salad', price: 2.00, available: true }
            ]
          }
        ]
      },
      {
        id: 'item-6',
        name: 'Chicken Alfredo',
        category: 'Entrees',
        price: 18.99,
        description: 'Fettuccine pasta in creamy alfredo sauce',
        available: true,
        calories: 1120,
        preparationTime: 15
      }
    ]
  },
  {
    id: 'cat-3',
    name: 'Beverages',
    description: 'Drinks and refreshments',
    displayOrder: 3,
    isActive: true,
    items: [
      {
        id: 'item-7',
        name: 'Soft Drink',
        category: 'Beverages',
        price: 3.99,
        description: 'Coca-Cola products',
        available: true,
        modifiers: [
          {
            id: 'mod-6',
            name: 'Size',
            price: 0,
            type: 'required',
            minSelections: 1,
            maxSelections: 1,
            options: [
              { id: 'opt-23', name: 'Small', price: 0, available: true },
              { id: 'opt-24', name: 'Medium', price: 0.50, available: true },
              { id: 'opt-25', name: 'Large', price: 1.00, available: true }
            ]
          }
        ]
      },
      {
        id: 'item-8',
        name: 'Fresh Juice',
        category: 'Beverages',
        price: 5.99,
        description: 'Orange, Apple, or Cranberry',
        available: true,
        calories: 180
      },
      {
        id: 'item-9',
        name: 'Coffee',
        category: 'Beverages',
        price: 2.99,
        description: 'Freshly brewed',
        available: true,
        calories: 5
      }
    ]
  },
  {
    id: 'cat-4',
    name: 'Desserts',
    description: 'Sweet endings',
    displayOrder: 4,
    isActive: true,
    items: [
      {
        id: 'item-10',
        name: 'Chocolate Lava Cake',
        category: 'Desserts',
        price: 7.99,
        description: 'Warm chocolate cake with molten center',
        available: true,
        tags: ['vegetarian'],
        calories: 480,
        preparationTime: 8
      },
      {
        id: 'item-11',
        name: 'New York Cheesecake',
        category: 'Desserts',
        price: 6.99,
        description: 'Classic creamy cheesecake with berry sauce',
        available: true,
        tags: ['vegetarian'],
        calories: 420,
        preparationTime: 2
      }
    ]
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'cust-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '555-0101',
    loyaltyPoints: 1250,
    totalOrders: 45,
    totalSpent: 1875.50,
    createdAt: new Date('2023-01-15')
  },
  {
    id: 'cust-2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@email.com',
    phone: '555-0102',
    loyaltyPoints: 800,
    totalOrders: 28,
    totalSpent: 1120.75,
    createdAt: new Date('2023-03-22')
  },
  {
    id: 'cust-3',
    firstName: 'Robert',
    lastName: 'Johnson',
    phone: '555-0103',
    loyaltyPoints: 350,
    totalOrders: 12,
    totalSpent: 480.25,
    createdAt: new Date('2023-06-10')
  }
];

export const mockPaymentMethods: PaymentMethod[] = [
  { id: 'pay-1', type: 'cash', name: 'Cash' },
  { id: 'pay-2', type: 'card', name: 'Credit Card', processingFee: 0.029 },
  { id: 'pay-3', type: 'card', name: 'Debit Card', processingFee: 0.025 },
  { id: 'pay-4', type: 'mobile', name: 'Apple Pay', processingFee: 0.03 },
  { id: 'pay-5', type: 'mobile', name: 'Google Pay', processingFee: 0.03 },
  { id: 'pay-6', type: 'gift_card', name: 'Gift Card' },
  { id: 'pay-7', type: 'loyalty', name: 'Loyalty Points' }
];

export const mockQuickKeys: QuickKey[] = [
  { id: 'qk-1', label: 'Burger', menuItemId: 'item-4', color: '#ef4444', position: 1 },
  { id: 'qk-2', label: 'Wings', menuItemId: 'item-2', color: '#f97316', position: 2 },
  { id: 'qk-3', label: 'Salmon', menuItemId: 'item-5', color: '#06b6d4', position: 3 },
  { id: 'qk-4', label: 'Soft Drink', menuItemId: 'item-7', color: '#8b5cf6', position: 4 },
  { id: 'qk-5', label: '10% Off', action: 'apply_discount', color: '#10b981', position: 5 },
  { id: 'qk-6', label: 'Appetizers', action: 'open_category', color: '#6366f1', position: 6 }
];

export const defaultPOSConfig: POSConfig = {
  terminalId: 'pos-001',
  terminalName: 'Front Counter',
  defaultOrderType: OrderType.DINE_IN,
  requireCustomerInfo: false,
  printReceipt: true,
  emailReceipt: false,
  tipSuggestions: [15, 18, 20, 25],
  taxRate: 0.08875,
  quickKeys: mockQuickKeys,
  paymentMethods: mockPaymentMethods,
  offlineMode: false,
  syncInterval: 30000,
  printerSettings: {
    printerName: 'Star TSP100',
    printerType: 'thermal',
    paperWidth: 80,
    autoCut: true,
    copies: 1
  }
};

export function createEmptyCart(): Cart {
  return {
    id: `cart-${Date.now()}`,
    items: [],
    subtotal: 0,
    tax: 0,
    discount: null,
    tip: null,
    total: 0,
    orderType: OrderType.DINE_IN,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

export function calculateCartTotals(cart: Cart, taxRate: number): Cart {
  const subtotal = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
  const discountAmount = cart.discount 
    ? cart.discount.type === 'percentage' 
      ? subtotal * (cart.discount.value / 100)
      : cart.discount.value
    : 0;
  
  const taxableAmount = subtotal - discountAmount;
  const tax = taxableAmount * taxRate;
  
  const tipAmount = cart.tip
    ? cart.tip.type === 'percentage'
      ? (subtotal - discountAmount) * (cart.tip.value / 100)
      : cart.tip.value
    : 0;
  
  const total = subtotal - discountAmount + tax + tipAmount;
  
  return {
    ...cart,
    subtotal,
    tax,
    total,
    discount: cart.discount ? { ...cart.discount, appliedAmount: discountAmount } : null,
    tip: cart.tip ? { ...cart.tip, amount: tipAmount } : null,
    updatedAt: new Date()
  };
}

export async function searchCustomers(query: string): Promise<Customer[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const searchTerm = query.toLowerCase();
  return mockCustomers.filter(customer => 
    customer.firstName.toLowerCase().includes(searchTerm) ||
    customer.lastName.toLowerCase().includes(searchTerm) ||
    customer.phone.includes(searchTerm) ||
    (customer.email && customer.email.toLowerCase().includes(searchTerm))
  );
}

export async function processPayment(cart: Cart, paymentMethod: PaymentMethod, amount: number): Promise<any> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    success: true,
    transactionId: `txn-${Date.now()}`,
    referenceNumber: Math.random().toString(36).substring(7).toUpperCase(),
    processedAmount: amount,
    timestamp: new Date()
  };
}