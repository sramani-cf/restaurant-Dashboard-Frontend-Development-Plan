'use client';

import { useState } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  Filter,
  Plus,
  Scan,
  Download,
  Settings,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils';

interface InventoryHeaderProps {
  onMenuToggle?: () => void;
  alertsCount?: number;
}

export function InventoryHeader({ onMenuToggle, alertsCount = 3 }: InventoryHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    onMenuToggle?.();
  };

  return (
    <>
      <div className="flex items-center justify-between h-16">
        {/* Left side - Mobile menu button and search */}
        <div className="flex items-center flex-1">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden mr-2"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>

          {/* Search */}
          <div className="relative flex-1 max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search inventory items, SKUs, suppliers..."
              className="pl-10 pr-4 w-full"
            />
          </div>
        </div>

        {/* Right side - Actions and notifications */}
        <div className="flex items-center space-x-2 ml-4">
          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-1" />
              Add Item
            </Button>
            
            <Button size="sm" variant="outline">
              <Scan className="h-4 w-4 mr-1" />
              Scan
            </Button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {alertsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {alertsCount}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNotifications(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="h-2 w-2 bg-red-500 rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-900">Low Stock Alert</p>
                        <p className="text-xs text-red-700">Ground Beef 80/20 - Only 2.5 kg remaining</p>
                        <p className="text-xs text-red-600 mt-1">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="h-2 w-2 bg-yellow-500 rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-yellow-900">Expiring Soon</p>
                        <p className="text-xs text-yellow-700">Chicken Breast batch expires in 2 days</p>
                        <p className="text-xs text-yellow-600 mt-1">4 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="h-2 w-2 bg-green-500 rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-900">Stock Received</p>
                        <p className="text-xs text-green-700">PO-2024-002 received successfully</p>
                        <p className="text-xs text-green-600 mt-1">6 hours ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <Button variant="ghost" className="w-full text-sm">
                      View All Notifications
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-40 bg-black bg-opacity-25" onClick={toggleMobileMenu} />
          
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-4">
              {/* Mobile Quick Actions */}
              <div className="space-y-2 mb-6">
                <Button className="w-full justify-start" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
                
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Scan className="h-4 w-4 mr-2" />
                  Barcode Scanner
                </Button>
                
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
                
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>

              {/* Additional mobile-specific options can go here */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}