import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  Menu,
  ChefHat,
  Calendar,
  DollarSign,
  Package,
  Bell,
  Home
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
    current: true,
    badge: null
  },
  {
    name: 'Orders',
    href: '/orders',
    icon: ShoppingCart,
    current: false,
    badge: '12'
  },
  {
    name: 'Menu',
    href: '/menu',
    icon: ChefHat,
    current: false,
    badge: null
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    current: false,
    badge: null
  },
  {
    name: 'POS',
    href: '/pos',
    icon: DollarSign,
    current: false,
    badge: null
  }
];

const secondaryNavigation = [
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    current: false
  }
];

function Sidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/" className="flex items-center gap-2" suppressHydrationWarning>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <ChefHat className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-gray-900">RestaurantOS</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`
                        group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors
                        ${item.current
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }
                      `}
                      suppressHydrationWarning
                    >
                      <item.icon
                        className={`h-5 w-5 shrink-0 ${
                          item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                      {item.badge && (
                        <Badge 
                          variant={item.current ? 'default' : 'secondary'}
                          className="ml-auto text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            
            {/* Quick Stats */}
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400 mb-2">
                Quick Stats
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-700">Active Orders</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">8</Badge>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-blue-600" />
                    <span className="text-sm text-blue-700">Today's Revenue</span>
                  </div>
                  <span className="text-xs font-medium text-blue-700">$2,847</span>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-orange-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-orange-600" />
                    <span className="text-sm text-orange-700">Guests Today</span>
                  </div>
                  <span className="text-xs font-medium text-orange-700">147</span>
                </div>
              </div>
            </li>

            {/* Secondary Navigation */}
            <li className="mt-auto">
              <ul role="list" className="-mx-2 space-y-1">
                {secondaryNavigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                      suppressHydrationWarning
                    >
                      <item.icon
                        className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-blue-600"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

function MobileNav() {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:hidden">
      <Button variant="ghost" size="sm" className="-m-2.5 p-2.5">
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-5 w-5" />
      </Button>

      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" suppressHydrationWarning>
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white">
            <ChefHat className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold text-gray-900">RestaurantOS</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <MobileNav />
      
      <div className="lg:pl-64">
        <main className="flex-1">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}

// Generate metadata for the layout
export function generateMetadata() {
  return {
    title: {
      template: '%s | RestaurantOS',
      default: 'Dashboard | RestaurantOS',
    },
    description: 'Restaurant management system with real-time analytics and operations',
  };
}