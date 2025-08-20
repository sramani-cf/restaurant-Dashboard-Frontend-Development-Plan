import { LoadingState } from '@/components/analytics/loading-state';

export default function AnalyticsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LoadingState 
        message="Loading Analytics..." 
        type="report" 
        size="lg" 
      />
    </div>
  );
}