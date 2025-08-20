'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  Package, 
  TrendingUp,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { ReportNavItem } from '@/lib/analytics/types';

const navigationItems: ReportNavItem[] = [
  {
    id: 'sales-summary',
    name: 'Sales Summary',
    description: 'Revenue, orders, and sales performance',
    icon: 'BarChart3',
    path: '/analytics/sales-summary',
    category: 'sales'
  },
  {
    id: 'menu-engineering',
    name: 'Menu Engineering',
    description: 'Menu item performance and profitability',
    icon: 'ShoppingBag',
    path: '/analytics/menu-engineering',
    category: 'operations'
  },
  {
    id: 'labor-analysis',
    name: 'Labor Analysis',
    description: 'Employee performance and labor costs',
    icon: 'Users',
    path: '/analytics/labor-analysis',
    category: 'operations'
  },
  {
    id: 'inventory-control',
    name: 'Inventory Control',
    description: 'Cost analysis and waste management',
    icon: 'Package',
    path: '/analytics/inventory-control',
    category: 'operations'
  },
  {
    id: 'customer-analytics',
    name: 'Customer Analytics',
    description: 'Customer behavior and retention',
    icon: 'TrendingUp',
    path: '/analytics/customer-analytics',
    category: 'customer'
  }
];

const categoryConfig = {
  sales: { name: 'Sales Reports', color: 'text-blue-600' },
  operations: { name: 'Operations', color: 'text-green-600' },
  customer: { name: 'Customer Insights', color: 'text-purple-600' },
  financial: { name: 'Financial', color: 'text-orange-600' }
};

const iconMap = {
  BarChart3,
  Users,
  ShoppingBag,
  Package,
  TrendingUp
};

interface ReportNavigationProps {
  compact?: boolean;
  onItemClick?: (item: ReportNavItem) => void;
}

export function ReportNavigation({ compact = false, onItemClick }: ReportNavigationProps) {
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['sales', 'operations', 'customer'])
  );

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const groupedItems = navigationItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ReportNavItem[]>);

  const isActive = (path: string) => pathname === path;

  if (compact) {
    return (
      <nav className="space-y-1">
        {navigationItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.id}
              href={item.path}
              onClick={() => onItemClick?.(item)}
              className={`
                flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                ${active 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="space-y-6">
      <div className="px-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Analytics Reports
        </h2>
      </div>

      {Object.entries(groupedItems).map(([category, items]) => {
        const config = categoryConfig[category as keyof typeof categoryConfig];
        const isExpanded = expandedCategories.has(category);

        return (
          <div key={category} className="space-y-1">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            >
              <span className={`font-semibold ${config.color}`}>
                {config.name}
              </span>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {isExpanded && (
              <div className="space-y-1 ml-2">
                {items.map((item) => {
                  const Icon = iconMap[item.icon as keyof typeof iconMap];
                  const active = isActive(item.path);
                  
                  return (
                    <Link
                      key={item.id}
                      href={item.path}
                      onClick={() => onItemClick?.(item)}
                      className={`
                        group flex items-start px-3 py-2 text-sm rounded-md transition-colors
                        ${active 
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Quick Actions */}
      <div className="px-3 pt-6 border-t border-gray-200">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Quick Actions
        </h3>
        <div className="space-y-1">
          <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
            <BarChart3 className="w-4 h-4 mr-3" />
            Export All Reports
          </button>
          <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
            <Package className="w-4 h-4 mr-3" />
            Schedule Reports
          </button>
        </div>
      </div>
    </nav>
  );
}