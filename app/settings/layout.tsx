import { Suspense } from 'react';
import { Metadata } from 'next';
import { SettingsNavigation } from '../../components/settings/settings-navigation';
import { SettingsHeader } from '../../components/settings/settings-header';
import { PageHeader } from '../../components/ui/page-header';

export const metadata: Metadata = {
  title: 'Settings | Restaurant Dashboard',
  description: 'Configure your restaurant settings, users, devices, and integrations',
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <PageHeader 
        title="Settings" 
        description="Configure your restaurant settings, users, devices, and integrations"
      />
      
      {/* Settings Header with Actions */}
      <Suspense fallback={<div className="h-16 bg-white border-b" />}>
        <SettingsHeader />
      </Suspense>

      <div className="mx-auto max-w-screen-2xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Settings Navigation */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-6">
              <Suspense fallback={
                <div className="space-y-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              }>
                <SettingsNavigation />
              </Suspense>
            </div>
          </aside>

          {/* Main Settings Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}