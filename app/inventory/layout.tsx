import type { Metadata } from 'next';
import { Suspense } from 'react';
import { InventoryNavigation } from '@/components/inventory/inventory-navigation';
import { InventoryHeader } from '@/components/inventory/inventory-header';
import { InventoryAlerts } from '@/components/inventory/inventory-alerts';

export const metadata: Metadata = {
  title: 'Inventory Management | Restaurant Dashboard',
  description: 'Comprehensive inventory control system for restaurant operations',
};

interface InventoryLayoutProps {
  children: React.ReactNode;
}

export default function InventoryLayout({ children }: InventoryLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-first design with responsive navigation */}
      <div className="lg:flex">
        {/* Sidebar Navigation - Hidden on mobile, shown on large screens */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-gray-900">Inventory</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <Suspense fallback={<div>Loading navigation...</div>}>
                <InventoryNavigation />
              </Suspense>
            </nav>
          </div>
        </div>

        {/* Main content area */}
        <div className="lg:pl-64 flex flex-col flex-1">
          {/* Top Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8">
              <Suspense fallback={<div className="h-16" />}>
                <InventoryHeader />
              </Suspense>
            </div>
          </header>

          {/* Alerts Banner */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8">
              <Suspense fallback={null}>
                <InventoryAlerts />
              </Suspense>
            </div>
          </div>

          {/* Page Content */}
          <main className="flex-1">
            <div className="py-6">
              <div className="px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Navigation - Bottom tab bar on small screens */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <Suspense fallback={<div className="h-16" />}>
          <InventoryNavigation mobile />
        </Suspense>
      </div>

      {/* PWA Support - Add to home screen prompt */}
      <div id="pwa-install-prompt" className="hidden">
        <div className="fixed bottom-20 left-4 right-4 bg-blue-600 text-white rounded-lg p-4 shadow-lg z-40">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Install Inventory App</h3>
              <p className="text-sm text-blue-100">
                Get quick access and offline capability
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                id="pwa-install-button"
                className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded text-sm font-medium"
              >
                Install
              </button>
              <button
                id="pwa-dismiss-button"
                className="text-blue-100 hover:text-white px-3 py-1 text-sm"
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Offline indicator */}
      <div
        id="offline-indicator"
        className="hidden fixed top-4 left-4 right-4 bg-yellow-500 text-white text-center py-2 px-4 rounded-lg shadow-lg z-50"
      >
        <div className="flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          You're offline. Some features may not be available.
        </div>
      </div>
    </div>
  );
}