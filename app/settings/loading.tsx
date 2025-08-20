import { Skeleton } from '../../components/ui/skeleton';

export default function SettingsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-96" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-16" />
            </div>
          </div>
        </div>
      </div>

      {/* Settings Header Skeleton */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-5 w-40" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 pb-6 sm:px-6 lg:px-8 mt-6">
        <div className="flex gap-8">
          {/* Navigation Skeleton */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-6">
              <nav className="space-y-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <main className="flex-1 min-w-0">
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg">
              <div className="p-6">
                {/* Tab Headers */}
                <div className="flex space-x-8 border-b border-gray-200 mb-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-20 mb-4" />
                  ))}
                </div>

                {/* Content Area */}
                <div className="space-y-6">
                  {/* Form Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </div>

                  {/* Card Sections */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-4 w-4 rounded-full" />
                          </div>
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                          <div className="flex justify-between items-center pt-2">
                            <Skeleton className="h-3 w-12" />
                            <Skeleton className="h-6 w-16" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Table Section */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-9 w-24" />
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      {/* Table Header */}
                      <div className="bg-gray-50 border-b border-gray-200">
                        <div className="grid grid-cols-5 gap-4 p-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-4 w-full" />
                          ))}
                        </div>
                      </div>
                      
                      {/* Table Rows */}
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="border-b border-gray-200 last:border-b-0">
                          <div className="grid grid-cols-5 gap-4 p-4">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <div key={j} className="flex items-center">
                                {j === 0 ? (
                                  <div className="flex items-center gap-3">
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                    <Skeleton className="h-4 w-24" />
                                  </div>
                                ) : (
                                  <Skeleton className="h-4 w-full" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                    <Skeleton className="h-10 w-20" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}