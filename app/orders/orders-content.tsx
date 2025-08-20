'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Order,
  OrderStatus,
  OrderType,
  PaymentStatus,
  OrderFilters,
  OrderStats,
  OrderListItem
} from '@/lib/orders/types';
import {
  getOrderListItems,
  getOrderStats,
  updateOrder,
  cancelOrder
} from '@/lib/orders/data';
import { OrdersTable } from '@/components/orders/orders-table';
import { OrderFilters as FiltersComponent } from '@/components/orders/order-filters';
import { OrderStats as StatsComponent } from '@/components/orders/order-stats';
import { OrderQuickActions } from '@/components/orders/order-quick-actions';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  RefreshCw, 
  Download, 
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface OrdersContentProps {
  searchParams: {
    status?: string;
    type?: string;
    search?: string;
    date?: string;
    page?: string;
  };
}

export function OrdersContent({ searchParams }: OrdersContentProps) {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Parse filters from search params
  const filters: OrderFilters = {
    status: searchParams.status ? searchParams.status.split(',') as OrderStatus[] : undefined,
    type: searchParams.type ? searchParams.type.split(',') as OrderType[] : undefined,
    searchTerm: searchParams.search,
    dateRange: searchParams.date ? {
      start: searchParams.date,
      end: searchParams.date
    } : undefined
  };

  // Load orders and stats
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [ordersData, statsData] = await Promise.all([
        getOrderListItems(filters),
        getOrderStats(filters.dateRange)
      ]);
      setOrders(ordersData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  }, [searchParams.status, searchParams.type, searchParams.search, searchParams.date]);

  // Refresh data
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  // Update order status
  const handleStatusUpdate = async (orderId: string, status: OrderStatus) => {
    try {
      await updateOrder(orderId, { status });
      await loadData();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  // Cancel order
  const handleCancelOrder = async (orderId: string) => {
    if (confirm('Are you sure you want to cancel this order?')) {
      try {
        await cancelOrder(orderId, 'Cancelled by staff');
        await loadData();
      } catch (error) {
        console.error('Failed to cancel order:', error);
      }
    }
  };

  // Bulk actions
  const handleBulkAction = async (action: string) => {
    if (selectedOrders.length === 0) return;

    switch (action) {
      case 'confirm':
        for (const orderId of selectedOrders) {
          await updateOrder(orderId, { status: OrderStatus.CONFIRMED });
        }
        break;
      case 'ready':
        for (const orderId of selectedOrders) {
          await updateOrder(orderId, { status: OrderStatus.READY });
        }
        break;
      case 'complete':
        for (const orderId of selectedOrders) {
          await updateOrder(orderId, { status: OrderStatus.COMPLETED });
        }
        break;
      case 'cancel':
        if (confirm(`Cancel ${selectedOrders.length} orders?`)) {
          for (const orderId of selectedOrders) {
            await cancelOrder(orderId, 'Bulk cancelled');
          }
        }
        break;
    }

    setSelectedOrders([]);
    await loadData();
  };

  // Export orders
  const handleExport = () => {
    // Implementation for CSV export
    console.log('Exporting orders...');
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Auto-refresh every 30 seconds for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      loadData();
    }, 30000);

    return () => clearInterval(interval);
  }, [loadData]);

  // Quick filter tabs
  const quickFilters = [
    { 
      label: 'All', 
      value: '', 
      count: stats?.totalOrders || 0 
    },
    { 
      label: 'Pending', 
      value: OrderStatus.PENDING,
      count: stats?.pendingOrders || 0,
      color: 'yellow' 
    },
    { 
      label: 'Preparing', 
      value: OrderStatus.PREPARING,
      count: stats?.preparingOrders || 0,
      color: 'blue' 
    },
    { 
      label: 'Ready', 
      value: OrderStatus.READY,
      count: stats?.readyOrders || 0,
      color: 'green' 
    },
    { 
      label: 'Completed', 
      value: OrderStatus.COMPLETED,
      count: stats?.completedOrders || 0,
      color: 'gray' 
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Orders</p>
                <p className="text-2xl font-bold">{stats.todayOrders}</p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Revenue</p>
                <p className="text-2xl font-bold">${stats.todayRevenue.toFixed(2)}</p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold">${stats.averageOrderValue.toFixed(2)}</p>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <AlertCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Prep Time</p>
                <p className="text-2xl font-bold">{stats.averagePrepTime.toFixed(0)} min</p>
              </div>
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Quick Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {quickFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={searchParams.status === filter.value || (!searchParams.status && !filter.value) ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                const params = new URLSearchParams(searchParams as any);
                if (filter.value) {
                  params.set('status', filter.value);
                } else {
                  params.delete('status');
                }
                router.push(`/orders?${params.toString()}`);
              }}
            >
              {filter.label}
              {filter.count > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {filter.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <Card className="p-4">
          <FiltersComponent
            filters={filters}
            onFiltersChange={(newFilters) => {
              const params = new URLSearchParams();
              if (newFilters.status?.length) {
                params.set('status', newFilters.status.join(','));
              }
              if (newFilters.type?.length) {
                params.set('type', newFilters.type.join(','));
              }
              if (newFilters.searchTerm) {
                params.set('search', newFilters.searchTerm);
              }
              if (newFilters.dateRange) {
                params.set('date', newFilters.dateRange.start);
              }
              router.push(`/orders?${params.toString()}`);
            }}
          />
        </Card>
      )}

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <Card className="p-4 bg-primary/5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              {selectedOrders.length} order(s) selected
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleBulkAction('confirm')}
              >
                Confirm All
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleBulkAction('ready')}
              >
                Mark Ready
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleBulkAction('complete')}
              >
                Complete All
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleBulkAction('cancel')}
              >
                Cancel All
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedOrders([])}
              >
                Clear Selection
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Orders Table */}
      <Card>
        <OrdersTable
          orders={orders}
          loading={loading}
          selectedOrders={selectedOrders}
          onSelectOrders={setSelectedOrders}
          onStatusUpdate={handleStatusUpdate}
          onCancelOrder={handleCancelOrder}
          onViewOrder={(orderId) => router.push(`/orders/${orderId}`)}
        />
      </Card>

      {/* Quick Actions FAB */}
      <OrderQuickActions
        onNewOrder={() => router.push('/orders/new')}
        onRefresh={handleRefresh}
      />
    </div>
  );
}