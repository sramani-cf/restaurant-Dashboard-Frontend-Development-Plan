import { Metadata } from 'next';
import { ReportNavigation } from '@/components/analytics/report-navigation';

export const metadata: Metadata = {
  title: 'Analytics - Restaurant Dashboard',
  description: 'Comprehensive business intelligence and reporting for your restaurant',
};

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-80 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col min-h-0">
            {/* Header */}
            <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 bg-white">
              <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
              <p className="text-sm text-gray-600 mt-1">
                Business intelligence and reporting
              </p>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6">
              <ReportNavigation />
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 border-t border-gray-200 p-4">
              <div className="text-xs text-gray-500">
                <p>© 2024 Restaurant Dashboard</p>
                <p className="mt-1">Advanced Analytics Suite</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Mobile Navigation - Hidden on larger screens */}
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold text-gray-900">Analytics</h1>
              {/* Mobile menu button would go here */}
            </div>
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}