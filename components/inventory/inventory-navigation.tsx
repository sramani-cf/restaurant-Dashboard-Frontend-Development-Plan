'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Package, 
  Users, 
  FileText, 
  Trash2, 
  ClipboardList, 
  BarChart3,
  Scan,
  Settings,
  Plus,
  Home,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface InventoryNavigationProps {
  mobile?: boolean;
}

const navigationItems = [
  {
    name: 'Overview',
    href: '/inventory',
    icon: Home,
    description: 'Dashboard and metrics',
  },
  {
    name: 'Items',
    href: '/inventory/items',
    icon: Package,
    description: 'Manage inventory items',
  },
  {
    name: 'Suppliers',
    href: '/inventory/suppliers',
    icon: Users,
    description: 'Supplier management',
  },
  {
    name: 'Purchase Orders',
    href: '/inventory/purchase-orders',
    icon: FileText,
    description: 'Create and track orders',
  },
  {
    name: 'Stock Counts',
    href: '/inventory/counts',
    icon: ClipboardList,
    description: 'Physical inventory counts',
  },
  {
    name: 'Waste Logs',
    href: '/inventory/waste',
    icon: Trash2,
    description: 'Track and analyze waste',
  },
  {
    name: 'Barcode Scanner',
    href: '/inventory/scanner',
    icon: Scan,
    description: 'Mobile scanning interface',
  },
  {
    name: 'Reports',
    href: '/inventory/reports',
    icon: BarChart3,
    description: 'Analytics and insights',
  },
];

const quickActions = [
  {
    name: 'Add Item',
    href: '/inventory/items/new',
    icon: Plus,
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    name: 'Create PO',
    href: '/inventory/purchase-orders/new',
    icon: FileText,
    color: 'bg-green-600 hover:bg-green-700',
  },
  {
    name: 'Start Count',
    href: '/inventory/counts/new',
    icon: ClipboardList,
    color: 'bg-purple-600 hover:bg-purple-700',
  },
];

export function InventoryNavigation({ mobile = false }: InventoryNavigationProps) {
  const pathname = usePathname();

  if (mobile) {
    return (
      <div className="grid grid-cols-4 gap-1 px-2 py-2">
        {navigationItems.slice(0, 4).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-2 px-1 text-xs font-medium rounded-lg transition-colors',
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="truncate max-w-full">{item.name}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {/* Main Navigation */}
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
              isActive
                ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            <Icon
              className={cn(
                'mr-3 flex-shrink-0 h-5 w-5 transition-colors',
                isActive
                  ? 'text-blue-500'
                  : 'text-gray-400 group-hover:text-gray-500'
              )}
            />
            <div className="flex-1">
              <div>{item.name}</div>
              {!isActive && (
                <div className="text-xs text-gray-500 group-hover:text-gray-600">
                  {item.description}
                </div>
              )}
            </div>
            
            {/* Active indicator */}
            {isActive && (
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
            )}
          </Link>
        );
      })}

      {/* Divider */}
      <div className="my-4 border-t border-gray-200"></div>

      {/* Quick Actions */}
      <div className="space-y-1">
        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Quick Actions
        </h3>
        {quickActions.map((action) => {
          const Icon = action.icon;
          
          return (
            <Link
              key={action.name}
              href={action.href}
              className={cn(
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white transition-colors',
                action.color
              )}
            >
              <Icon className="mr-3 flex-shrink-0 h-4 w-4" />
              {action.name}
            </Link>
          );
        })}
      </div>

      {/* Help Section */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="px-3">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-start">
              <TrendingUp className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Need Help?
                </h3>
                <p className="mt-1 text-xs text-blue-600">
                  Check out our inventory management guide
                </p>
                <div className="mt-2">
                  <button className="text-xs font-medium text-blue-600 hover:text-blue-500">
                    View Guide →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}