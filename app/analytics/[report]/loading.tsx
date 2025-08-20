import { ReportSkeleton } from '@/components/analytics/loading-state';

export default function ReportLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ReportSkeleton />
    </div>
  );
}