import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ReportHeader } from '@/components/analytics/report-header';
import { LoadingState, ReportSkeleton } from '@/components/analytics/loading-state';
import { ErrorState } from '@/components/analytics/error-state';
import { FirstTimeEmptyState } from '@/components/analytics/empty-state';

// Valid report types
const VALID_REPORTS = [
  'sales-summary',
  'menu-engineering',
  'labor-analysis',
  'inventory-control',
  'customer-analytics'
] as const;

type ReportType = typeof VALID_REPORTS[number];

const reportConfig: Record<ReportType, {
  title: string;
  description: string;
  component: React.ComponentType<any>;
}> = {
  'sales-summary': {
    title: 'Sales Summary',
    description: 'Comprehensive revenue and sales performance analysis',
    component: () => <div>Sales Summary Report - Implementation in progress</div>
  },
  'menu-engineering': {
    title: 'Menu Engineering',
    description: 'Menu item performance and profitability optimization',
    component: () => <div>Menu Engineering Report - Implementation in progress</div>
  },
  'labor-analysis': {
    title: 'Labor Analysis',
    description: 'Employee performance and labor cost management',
    component: () => <div>Labor Analysis Report - Implementation in progress</div>
  },
  'inventory-control': {
    title: 'Inventory Control',
    description: 'Cost control and inventory optimization insights',
    component: () => <div>Inventory Control Report - Implementation in progress</div>
  },
  'customer-analytics': {
    title: 'Customer Analytics',
    description: 'Customer behavior and retention analysis',
    component: () => <div>Customer Analytics Report - Implementation in progress</div>
  }
};

interface ReportPageProps {
  params: {
    report: string;
  };
  searchParams: {
    dateFrom?: string;
    dateTo?: string;
    compareFrom?: string;
    compareTo?: string;
  };
}

export async function generateMetadata({ params }: ReportPageProps): Promise<Metadata> {
  const reportType = params.report as ReportType;
  
  if (!VALID_REPORTS.includes(reportType)) {
    return {
      title: 'Report Not Found - Restaurant Dashboard',
    };
  }

  const config = reportConfig[reportType];
  
  return {
    title: `${config.title} - Restaurant Dashboard`,
    description: config.description,
  };
}

export async function generateStaticParams() {
  return VALID_REPORTS.map((report) => ({
    report: report,
  }));
}

// Report Content Component
async function ReportContent({ 
  reportType, 
  searchParams 
}: { 
  reportType: ReportType;
  searchParams: ReportPageProps['searchParams'];
}) {
  const config = reportConfig[reportType];
  const ReportComponent = config.component;

  // Simulate loading delay for demonstration
  await new Promise(resolve => setTimeout(resolve, 1000));

  // For now, show a placeholder since individual report components are not fully implemented
  return (
    <div className="min-h-screen bg-gray-50">
      <ReportHeader
        title={config.title}
        description={config.description}
        dateRange={
          searchParams.dateFrom && searchParams.dateTo
            ? {
                from: new Date(searchParams.dateFrom),
                to: new Date(searchParams.dateTo)
              }
            : undefined
        }
        comparisonPeriod={
          searchParams.compareFrom && searchParams.compareTo
            ? {
                from: new Date(searchParams.compareFrom),
                to: new Date(searchParams.compareTo)
              }
            : undefined
        }
        lastUpdated={new Date()}
        onRefresh={() => {
          console.log('Refresh clicked');
        }}
        onExport={() => {
          console.log('Export clicked');
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Placeholder Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-500 rounded animate-pulse"></div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {config.title} Report
            </h2>
            
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {config.description}. This report is currently being built and will include comprehensive analytics and visualizations.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-medium text-blue-900 mb-3">
                Coming Soon: Full Report Features
              </h3>
              <ul className="text-sm text-blue-800 space-y-2 text-left">
                <li>• Interactive charts and visualizations</li>
                <li>• Detailed metrics and KPI tracking</li>
                <li>• Period-over-period comparisons</li>
                <li>• Data export in multiple formats</li>
                <li>• Actionable insights and recommendations</li>
                <li>• Real-time data integration</li>
              </ul>
            </div>

            {/* Sample Data Display */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Primary Metric', value: '$12,450', change: '+8.3%' },
                { label: 'Secondary Metric', value: '245', change: '+12.1%' },
                { label: 'Efficiency Rating', value: '87%', change: '+2.4%' }
              ].map((metric, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-left">
                  <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-sm text-green-600">{metric.change}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReportPage({ params, searchParams }: ReportPageProps) {
  const reportType = params.report as ReportType;

  // Check if report type is valid
  if (!VALID_REPORTS.includes(reportType)) {
    notFound();
  }

  const config = reportConfig[reportType];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-2">
          <a href="/analytics" className="hover:text-gray-900">Analytics</a> / {config.title}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
          <p className="text-sm text-gray-600">{config.description}</p>
        </div>
      </div>
      <Suspense fallback={<ReportSkeleton />}>
        <ReportContent 
          reportType={reportType} 
          searchParams={searchParams} 
        />
      </Suspense>
    </div>
  );
}