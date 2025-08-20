import Link from 'next/link';
import { NotFoundErrorState } from '@/components/analytics/error-state';

export default function ReportNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <NotFoundErrorState
        title="Report Not Found"
        message="The report you're looking for doesn't exist or may have been moved. Please check the URL or browse available reports."
        size="lg"
        onHome={() => {
          // This would be handled by the Link component below
        }}
      />
      
      {/* Alternative navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-4">
          <Link 
            href="/analytics"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Analytics
          </Link>
          <Link 
            href="/dashboard"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}