'use client';

import { ReactNode, useState } from 'react';
import { MainNavigation } from './main-navigation';
import { TopHeader } from './top-header';
import { Breadcrumbs } from './breadcrumbs';
import { Menu, X } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  title?: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: ReactNode;
}

export function AppShell({ children, title, description, breadcrumbs, actions }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Mobile close button */}
          <div className="lg:hidden absolute top-4 right-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <MainNavigation onNavigate={() => setSidebarOpen(false)} />
        </div>

        {/* Main content area */}
        <div className="lg:pl-64 flex flex-col min-h-screen">
          {/* Top header */}
          <TopHeader 
            onMenuClick={() => setSidebarOpen(true)}
          />

          {/* Page header */}
          {(title || breadcrumbs) && (
            <div className="bg-white border-b border-gray-200">
              <div className="px-4 sm:px-6 lg:px-8 py-4">
                {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
                
                {title && (
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                      {description && (
                        <p className="mt-1 text-sm text-gray-600">{description}</p>
                      )}
                    </div>
                    
                    {actions && (
                      <div className="flex items-center space-x-3">
                        {actions}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main content */}
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
        </div>
      </div>
  );
}