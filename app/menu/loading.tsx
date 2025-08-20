import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/ui/page-header';

export default function MenuLoading() {
  return (
    <div className="container mx-auto p-6">
      {/* Header skeleton */}
      <PageHeader 
        title="Menu Management" 
        description="Loading menu data..."
      />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tree Navigator Skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content Skeleton */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border">
            {/* Toolbar */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-10 w-64" />
                  <Skeleton className="h-10 w-20" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-20" />
                </div>
              </div>
            </div>
            
            {/* Table Skeleton */}
            <div className="p-4">
              {/* Table Header */}
              <div className="grid grid-cols-5 gap-4 pb-3 border-b">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-full" />
                ))}
              </div>
              
              {/* Table Rows */}
              <div className="space-y-3 mt-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="grid grid-cols-5 gap-4 py-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pagination Skeleton */}
            <div className="px-4 py-3 border-t">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-20" />
                  <div className="flex space-x-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-8 w-8" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}