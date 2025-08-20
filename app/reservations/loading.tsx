import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReservationsLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="flex space-x-3">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Navigation Skeleton */}
      <div className="flex space-x-8 border-b">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-6 w-20 mb-4" />
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="p-6">
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-8 w-12 mb-1" />
                <Skeleton className="h-3 w-20" />
              </Card>
            ))}
          </div>

          {/* Table/Grid Skeleton */}
          <Card className="overflow-hidden">
            <div className="p-6 bg-gray-50 border-b">
              <Skeleton className="h-6 w-32 mb-2" />
              <div className="flex space-x-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
            
            <div className="p-6">
              {/* Table Header */}
              <div className="grid grid-cols-7 gap-4 mb-4">
                {Array.from({ length: 7 }).map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full" />
                ))}
              </div>
              
              {/* Table Rows */}
              {Array.from({ length: 8 }).map((_, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-7 gap-4 mb-4">
                  {Array.from({ length: 7 }).map((_, colIndex) => (
                    <div key={colIndex} className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      {colIndex < 3 && <Skeleton className="h-3 w-3/4" />}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-4">
            <Skeleton className="h-5 w-24 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </Card>

          {/* Updates */}
          <Card className="p-4">
            <Skeleton className="h-5 w-20 mb-3" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="p-2 bg-blue-50 rounded">
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="text-center py-8">
            <Skeleton className="h-32 w-full" />
          </div>
        </Card>
      </div>
    </div>
  );
}