import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function OrderAnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Date Range and Actions */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-64" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </Card>
        ))}
      </div>

      {/* Tab Headers */}
      <div className="flex gap-4 border-b">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-24" />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <div className="p-4 border-b">
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="p-4">
              <Skeleton className="h-[300px] w-full" />
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <div className="p-4 border-b">
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="p-4">
              <Skeleton className="h-[250px] w-full" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}