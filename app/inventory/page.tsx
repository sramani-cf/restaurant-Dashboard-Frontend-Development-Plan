import { Suspense } from 'react';
import { Metadata } from 'next';
import { InventoryDashboard } from '@/components/inventory/inventory-dashboard';
import { InventoryMetricsCards } from '@/components/inventory/inventory-metrics-cards';
import { InventoryFilters } from '@/components/inventory/inventory-filters';
import { InventoryTable } from '@/components/inventory/inventory-table';
import { QuickActions } from '@/components/inventory/quick-actions';
import { MobileBarcodeFAB } from '@/components/inventory/mobile-barcode-fab';

import { getInventoryItems, getInventoryMetrics } from '@/lib/inventory/data';
import type { InventoryFilters as InventoryFiltersType } from '@/lib/inventory/types';

export const metadata: Metadata = {
  title: 'Inventory Overview | Restaurant Dashboard',
  description: 'Real-time inventory tracking, stock levels, and warehouse management',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Inventory',
  },
  manifest: '/manifest.json',
};

interface InventoryPageProps {
  searchParams: {
    search?: string;
    category?: string;
    supplier?: string;
    location?: string;
    status?: 'active' | 'inactive' | 'discontinued';
    lowStock?: string;
    outOfStock?: string;
    expiring?: string;
    page?: string;
    limit?: string;
    sort?: string;
    view?: 'grid' | 'table' | 'cards';
  };
}

export default async function InventoryPage({ searchParams }: InventoryPageProps) {
  // Parse search parameters into filters
  const filters: InventoryFiltersType = {
    search: searchParams.search,
    categoryId: searchParams.category,
    supplierId: searchParams.supplier,
    locationId: searchParams.location,
    status: searchParams.status,
    lowStock: searchParams.lowStock === 'true',
    outOfStock: searchParams.outOfStock === 'true',
    expiring: searchParams.expiring === 'true',
  };

  // Get initial data - this will be used for SSR, then updated client-side
  const [inventoryResponse, metrics] = await Promise.all([
    getInventoryItems(filters),
    getInventoryMetrics(),
  ]);

  const currentView = (searchParams.view || 'table') as 'grid' | 'table' | 'cards';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Overview</h1>
          <p className="text-sm text-gray-600">Track stock levels, manage items, and monitor warehouse operations</p>
        </div>
        <Suspense fallback={<div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />}>
          <QuickActions />
        </Suspense>
      </div>
      <div className="space-y-6 pb-20 lg:pb-6">

      {/* Metrics Cards */}
      <Suspense fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      }>
        <InventoryMetricsCards initialMetrics={metrics} />
      </Suspense>

      {/* Filters */}
      <Suspense fallback={
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-gray-200 rounded animate-pulse flex-1"></div>
            ))}
          </div>
        </div>
      }>
        <InventoryFilters initialFilters={filters} />
      </Suspense>

      {/* Main Content Area */}
      <div className="bg-white rounded-lg border border-gray-200 min-h-96">
        <Suspense fallback={
          <div className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        }>
          {currentView === 'table' ? (
            <InventoryTable 
              initialData={inventoryResponse} 
              initialFilters={filters}
            />
          ) : currentView === 'grid' ? (
            <InventoryDashboard 
              initialData={inventoryResponse} 
              initialFilters={filters}
              view="grid"
            />
          ) : (
            <InventoryDashboard 
              initialData={inventoryResponse} 
              initialFilters={filters}
              view="cards"
            />
          )}
        </Suspense>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <Suspense fallback={
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-3 animate-pulse">
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          }>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-green-600">+</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Stock received: Chicken Breast</p>
                  <p className="text-xs text-gray-500">50 kg from Premium Meats Co. • 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-red-600">!</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Low stock alert: Ground Beef 80/20</p>
                  <p className="text-xs text-gray-500">Only 2.5 kg remaining • 4 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-orange-600">W</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Waste logged: Tomatoes</p>
                  <p className="text-xs text-gray-500">2.5 kg spoiled • 6 hours ago</p>
                </div>
              </div>
            </div>
          </Suspense>
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      <div className="sm:hidden">
        <Suspense fallback={null}>
          <MobileBarcodeFAB />
        </Suspense>
      </div>

      {/* PWA Features */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Service Worker Registration
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then((registration) => {
                    console.log('SW registered: ', registration);
                  })
                  .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }

            // Install prompt
            let deferredPrompt;
            window.addEventListener('beforeinstallprompt', (e) => {
              e.preventDefault();
              deferredPrompt = e;
              const installPrompt = document.getElementById('pwa-install-prompt');
              if (installPrompt) {
                installPrompt.classList.remove('hidden');
              }
            });

            // Install button click
            const installButton = document.getElementById('pwa-install-button');
            if (installButton) {
              installButton.addEventListener('click', async () => {
                if (deferredPrompt) {
                  deferredPrompt.prompt();
                  const { outcome } = await deferredPrompt.userChoice;
                  console.log('User response to install prompt:', outcome);
                  deferredPrompt = null;
                  const installPrompt = document.getElementById('pwa-install-prompt');
                  if (installPrompt) {
                    installPrompt.classList.add('hidden');
                  }
                }
              });
            }

            // Dismiss button
            const dismissButton = document.getElementById('pwa-dismiss-button');
            if (dismissButton) {
              dismissButton.addEventListener('click', () => {
                const installPrompt = document.getElementById('pwa-install-prompt');
                if (installPrompt) {
                  installPrompt.classList.add('hidden');
                }
              });
            }

            // Offline/Online detection
            function updateOnlineStatus() {
              const offlineIndicator = document.getElementById('offline-indicator');
              if (offlineIndicator) {
                if (navigator.onLine) {
                  offlineIndicator.classList.add('hidden');
                } else {
                  offlineIndicator.classList.remove('hidden');
                }
              }
            }

            window.addEventListener('online', updateOnlineStatus);
            window.addEventListener('offline', updateOnlineStatus);
            updateOnlineStatus();
          `,
        }}
      />
      </div>
    </div>
  );
}