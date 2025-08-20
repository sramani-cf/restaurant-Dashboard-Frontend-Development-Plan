'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/components/analytics/error-state';

export default function AnalyticsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Analytics error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <ErrorState
        title="Analytics Error"
        message="Failed to load the analytics system. This might be a temporary issue."
        error={error}
        type="server"
        size="lg"
        showRetry={true}
        showSupport={true}
        onRetry={reset}
        onSupport={() => {
          // In a real app, this would open a support ticket or contact form
          console.log('Contact support clicked');
        }}
      />
    </div>
  );
}