import { Suspense } from 'react';
import { getDashboardData, revalidateLiveData } from '@/lib/dashboard/data';
import { DashboardContent } from './dashboard-content';
import { DashboardSkeleton } from './dashboard-skeleton';

// This is a server component that fetches initial data
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { from?: string; to?: string };
}) {
  // Parse date range from search params
  const dateRange = searchParams.from && searchParams.to ? {
    from: new Date(searchParams.from),
    to: new Date(searchParams.to)
  } : undefined;

  // Fetch initial dashboard data with parallel requests
  const dashboardData = await getDashboardData(dateRange);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent 
            initialData={dashboardData}
            initialDateRange={dateRange}
          />
        </Suspense>
      </div>
    </div>
  );
}

// Generate metadata for the page
export function generateMetadata() {
  return {
    title: 'Dashboard - Restaurant Management',
    description: 'Real-time restaurant analytics, sales trends, and operational insights',
  };
}