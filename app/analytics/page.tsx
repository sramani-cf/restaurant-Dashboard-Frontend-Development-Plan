import { Metadata } from 'next';
import Link from 'next/link';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  Package, 
  TrendingUp,
  ArrowRight,
  Calendar,
  Download
} from 'lucide-react';
import { MetricCard } from '@/components/analytics/metric-card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Analytics Overview - Restaurant Dashboard',
  description: 'Business intelligence overview and quick access to all reports',
};

// Mock data for overview metrics
const overviewMetrics = {
  totalRevenue: {
    current: 47850,
    previous: 42300,
    change: 5550,
    changePercent: 13.1,
    changeType: 'increase' as const,
    unit: '$'
  },
  totalOrders: {
    current: 1247,
    previous: 1089,
    change: 158,
    changePercent: 14.5,
    changeType: 'increase' as const
  },
  avgOrderValue: {
    current: 38.40,
    previous: 38.85,
    change: -0.45,
    changePercent: -1.2,
    changeType: 'decrease' as const,
    unit: '$'
  },
  laborCost: {
    current: 28.5,
    previous: 31.2,
    change: -2.7,
    changePercent: -8.7,
    changeType: 'decrease' as const,
    unit: '%',
    target: 30
  }
};

const reportCards = [
  {
    id: 'sales-summary',
    title: 'Sales Summary',
    description: 'Revenue analysis, order trends, and sales performance metrics',
    icon: BarChart3,
    color: 'bg-blue-500',
    href: '/analytics/sales-summary',
    stats: {
      primaryMetric: '$47.8K',
      primaryLabel: 'Total Revenue',
      secondaryMetric: '+13.1%',
      secondaryLabel: 'vs last period'
    }
  },
  {
    id: 'menu-engineering',
    title: 'Menu Engineering',
    description: 'Menu item performance, profitability analysis, and optimization recommendations',
    icon: ShoppingBag,
    color: 'bg-green-500',
    href: '/analytics/menu-engineering',
    stats: {
      primaryMetric: '8',
      primaryLabel: 'Star Items',
      secondaryMetric: '3',
      secondaryLabel: 'Need attention'
    }
  },
  {
    id: 'labor-analysis',
    title: 'Labor Analysis',
    description: 'Employee performance, labor costs, and scheduling optimization',
    icon: Users,
    color: 'bg-purple-500',
    href: '/analytics/labor-analysis',
    stats: {
      primaryMetric: '28.5%',
      primaryLabel: 'Labor Cost',
      secondaryMetric: 'Below target',
      secondaryLabel: '30% target'
    }
  },
  {
    id: 'inventory-control',
    title: 'Inventory Control',
    description: 'Cost control, waste analysis, and inventory optimization',
    icon: Package,
    color: 'bg-orange-500',
    href: '/analytics/inventory-control',
    stats: {
      primaryMetric: '3.2%',
      primaryLabel: 'Waste Rate',
      secondaryMetric: '$1.2K',
      secondaryLabel: 'Monthly savings'
    }
  },
  {
    id: 'customer-analytics',
    title: 'Customer Analytics',
    description: 'Customer behavior, retention, and loyalty program analysis',
    icon: TrendingUp,
    color: 'bg-pink-500',
    href: '/analytics/customer-analytics',
    stats: {
      primaryMetric: '68%',
      primaryLabel: 'Retention Rate',
      secondaryMetric: '850',
      secondaryLabel: 'Active customers'
    }
  }
];

const quickActions = [
  {
    title: 'Export All Reports',
    description: 'Download comprehensive analytics package',
    icon: Download,
    action: 'export'
  },
  {
    title: 'Schedule Reports',
    description: 'Set up automated report delivery',
    icon: Calendar,
    action: 'schedule'
  }
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Overview</h1>
          <p className="text-lg text-gray-600">Comprehensive business intelligence for your restaurant operations</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="secondary">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
          <Button variant="primary">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Key Metrics Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Revenue"
              metric={overviewMetrics.totalRevenue}
              description="Revenue for the last 30 days"
            />
            <MetricCard
              title="Total Orders"
              metric={overviewMetrics.totalOrders}
              description="Orders completed in period"
            />
            <MetricCard
              title="Average Order Value"
              metric={overviewMetrics.avgOrderValue}
              description="Average value per order"
            />
            <MetricCard
              title="Labor Cost %"
              metric={overviewMetrics.laborCost}
              description="Labor cost percentage of sales"
              showTarget
            />
          </div>
        </div>

        {/* Reports Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Reports</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {reportCards.map((report) => {
              const Icon = report.icon;
              
              return (
                <Link
                  key={report.id}
                  href={report.href}
                  className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${report.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {report.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {report.description}
                  </p>
                  
                  {/* Quick Stats */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          {report.stats.primaryMetric}
                        </div>
                        <div className="text-xs text-gray-500">
                          {report.stats.primaryLabel}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-700">
                          {report.stats.secondaryMetric}
                        </div>
                        <div className="text-xs text-gray-500">
                          {report.stats.secondaryLabel}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              
              return (
                <button
                  key={action.action}
                  className="bg-white rounded-lg border border-gray-200 p-6 text-left hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <Icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Report Activity</h2>
          <div className="space-y-4">
            {[
              {
                report: 'Sales Summary',
                action: 'Generated',
                time: '2 hours ago',
                user: 'System'
              },
              {
                report: 'Menu Engineering',
                action: 'Exported (PDF)',
                time: '5 hours ago',
                user: 'Manager'
              },
              {
                report: 'Labor Analysis',
                action: 'Generated',
                time: '1 day ago',
                user: 'System'
              },
              {
                report: 'Customer Analytics',
                action: 'Viewed',
                time: '2 days ago',
                user: 'Owner'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <span className="font-medium text-gray-900">{activity.report}</span>
                    <span className="text-gray-600"> - {activity.action}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {activity.time} by {activity.user}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}