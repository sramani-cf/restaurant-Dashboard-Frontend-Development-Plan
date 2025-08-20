import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function OrderDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Status Bar Skeleton */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Headers */}
          <div className="flex gap-4 border-b">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-24" />
            ))}
          </div>

          {/* Customer Information Card */}
          <Card>
            <div className="p-4 border-b">
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="p-4 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-5 w-48" />
                </div>
              ))}
            </div>
          </Card>

          {/* Order Summary Card */}
          <Card>
            <div className="p-4 border-b">
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="p-4 space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
              <div className="pt-2 border-t">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <Card>
            <div className="p-4 border-b">
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="p-4 space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </Card>

          {/* Order Info Card */}
          <Card>
            <div className="p-4 border-b">
              <Skeleton className="h-6 w-36" />
            </div>
            <div className="p-4 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}