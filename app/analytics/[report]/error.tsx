'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorState } from '@/components/analytics/error-state';

export default function ReportError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Report error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <ErrorState
        title="Report Generation Failed"
        message="We encountered an error while generating your report. This might be due to data processing issues or temporary service disruption."
        error={error}
        type="server"
        size="lg"
        showRetry={true}
        showHome={true}
        showSupport={true}
        onRetry={reset}
        onHome={() => router.push('/analytics')}
        onSupport={() => {
          // In a real app, this would open a support ticket or contact form
          console.log('Contact support clicked');
        }}
      />
    </div>
  );
}