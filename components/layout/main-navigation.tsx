'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard,
  ShoppingCart,
  ChefHat,
  Package,
  Users,
  BarChart3,
  Calendar,
  CreditCard,
  Settings,
  Accessibility,
  FileText
} from 'lucide-react';
import { cn } from '@/utils';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const navigationItems: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview and key metrics'
  },
  {
    name: 'Orders',
    href: '/orders',
    icon: ShoppingCart,
    description: 'Manage customer orders'
  },
  {
    name: 'Menu',
    href: '/menu',
    icon: ChefHat,
    description: 'Menu management'
  },
  {
    name: 'Inventory',
    href: '/inventory',
    icon: Package,
    description: 'Stock and supplies'
  },
  {
    name: 'Staff',
    href: '/staff',
    icon: Users,
    description: 'Team management'
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    description: 'Reports and insights'
  },
  {
    name: 'Reservations',
    href: '/reservations',
    icon: Calendar,
    description: 'Table bookings'
  },
  {
    name: 'POS',
    href: '/pos',
    icon: CreditCard,
    description: 'Point of sale'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Application settings'
  },
  {
    name: 'Accessibility',
    href: '/accessibility',
    icon: Accessibility,
    description: 'Accessibility features'
  },
];

interface MainNavigationProps {
  onNavigate?: () => void;
}

export function MainNavigation({ onNavigate }: MainNavigationProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Logo/Brand */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center space-x-2" suppressHydrationWarning>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <ChefHat className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900">Restaurant</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              )}
              aria-current={isActive ? 'page' : undefined}
              suppressHydrationWarning
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 transition-colors',
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 group-hover:text-gray-600'
                )}
              />
              <div className="flex-1">
                <div>{item.name}</div>
                <div className={cn(
                  'text-xs mt-0.5',
                  isActive
                    ? 'text-white/80'
                    : 'text-gray-500'
                )}>
                  {item.description}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          Restaurant Dashboard v1.0
        </div>
      </div>
    </div>
  );
}