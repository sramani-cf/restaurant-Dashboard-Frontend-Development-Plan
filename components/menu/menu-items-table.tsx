'use client';

import { useState, useCallback, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { 
  Edit,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  DollarSign,
  Clock,
  Tag,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dropdown } from '@/components/ui/dropdown';
import { MenuItem, MenuFilters, MENU_SORT_OPTIONS } from '@/lib/menu/types';
import { 
  formatPrice, 
  formatPrepTime, 
  formatStockStatus,
  calculateItemPrice,
  isItemAvailable 
} from '@/lib/menu/utils';
import { cn } from '@/lib/menu/utils';

interface MenuItemsTableProps {
  data: MenuItem[];
  loading?: boolean;
  selectedIds?: string[];
  filters?: MenuFilters;
  onItemClick?: (item: MenuItem) => void;
  onEdit?: (item: MenuItem) => void;
  onCopy?: (item: MenuItem) => void;
  onDelete?: (item: MenuItem) => void;
  onToggleVisibility?: (item: MenuItem) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  onFiltersChange?: (filters: MenuFilters) => void;
  onCreate?: () => void;
  className?: string;
  channel?: string;
  showBulkActions?: boolean;
}

export function MenuItemsTable({
  data,
  loading = false,
  selectedIds = [],
  filters = {},
  onItemClick,
  onEdit,
  onCopy,
  onDelete,
  onToggleVisibility,
  onSelectionChange,
  onFiltersChange,
  onCreate,
  className,
  channel,
  showBulkActions = true,
}: MenuItemsTableProps) {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Calculate derived data for each item
  const enhancedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      effectivePrice: calculateItemPrice(item, channel),
      available: isItemAvailable(item, channel),
      stockStatus: formatStockStatus(item.stockQuantity, item.lowStockThreshold),
    }));
  }, [data, channel]);

  // Table columns
  const columns: ColumnDef<MenuItem & { effectivePrice: number; available: boolean; stockStatus: any }>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          className="rounded border-gray-300"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="rounded border-gray-300"
        />
      ),
      enableSorting: false,
      size: 40,
    },
    {
      accessorKey: 'name',
      header: 'Item',
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-start space-x-3">
            {/* Image placeholder */}
            <div className="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center flex-shrink-0">
              {item.media.length > 0 ? (
                <img
                  src={item.media[0].url}
                  alt={item.media[0].alt}
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <Tag className="h-5 w-5 text-gray-400" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span 
                  className={cn(
                    "font-medium truncate cursor-pointer hover:text-blue-600",
                    !item.isActive && "text-gray-400 line-through"
                  )}
                  onClick={() => onItemClick?.(item)}
                >
                  {item.name}
                </span>
                {!item.isActive && <EyeOff className="h-3 w-3 text-gray-400" />}
              </div>
              
              {item.description && (
                <p className="text-sm text-gray-500 truncate mt-1">
                  {item.description}
                </p>
              )}
              
              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{item.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'effectivePrice',
      header: 'Price',
      cell: ({ row }) => {
        const item = row.original;
        const showStrategyPrice = item.effectivePrice !== item.basePrice;
        
        return (
          <div className="text-right">
            <div className="font-medium">
              {formatPrice(item.effectivePrice)}
            </div>
            {showStrategyPrice && (
              <div className="text-xs text-gray-500 line-through">
                {formatPrice(item.basePrice)}
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'available',
      header: 'Status',
      cell: ({ row }) => {
        const item = row.original;
        
        return (
          <div className="flex flex-col space-y-1">
            {/* Availability Status */}
            <Badge
              variant={item.available ? 'default' : 'destructive'}
              className="w-fit"
            >
              {item.available ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Available
                </>
              ) : (
                <>
                  <XCircle className="h-3 w-3 mr-1" />
                  Unavailable
                </>
              )}
            </Badge>
            
            {/* Stock Status */}
            {item.trackInventory && (
              <Badge
                variant={item.stockStatus.variant}
                className="w-fit text-xs"
              >
                {item.stockStatus.label}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'preparationTime',
      header: 'Prep Time',
      cell: ({ row }) => {
        const prepTime = row.original.preparationTime;
        if (!prepTime) return <span className="text-gray-400">—</span>;
        
        return (
          <div className="flex items-center text-sm">
            <Clock className="h-3 w-3 mr-1" />
            {formatPrepTime(prepTime)}
          </div>
        );
      },
    },
    {
      accessorKey: 'modifierGroups',
      header: 'Modifiers',
      cell: ({ row }) => {
        const modifierCount = row.original.modifierGroups.length;
        if (modifierCount === 0) return <span className="text-gray-400">None</span>;
        
        return (
          <Badge variant="outline" className="text-xs">
            {modifierCount} group{modifierCount !== 1 ? 's' : ''}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'allergens',
      header: 'Allergens',
      cell: ({ row }) => {
        const allergens = row.original.allergens;
        if (allergens.length === 0) return <span className="text-gray-400">None</span>;
        
        return (
          <div className="flex items-center">
            <AlertTriangle className="h-3 w-3 text-orange-500 mr-1" />
            <span className="text-xs">{allergens.length} allergen{allergens.length !== 1 ? 's' : ''}</span>
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const item = row.original;
        
        return (
          <Dropdown
            trigger={
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            }
            items={[
              {
                label: 'Edit',
                icon: <Edit className="h-4 w-4" />,
                onClick: () => onEdit?.(item),
              },
              {
                label: 'Duplicate',
                icon: <Copy className="h-4 w-4" />,
                onClick: () => onCopy?.(item),
              },
              {
                label: item.isActive ? 'Hide' : 'Show',
                icon: item.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />,
                onClick: () => onToggleVisibility?.(item),
              },
              { type: 'separator' },
              {
                label: 'Delete',
                icon: <Trash2 className="h-4 w-4" />,
                onClick: () => onDelete?.(item),
                className: 'text-red-600',
              },
            ]}
          />
        );
      },
      enableSorting: false,
      size: 60,
    },
  ];

  // Handle selection changes
  const handleSelectionChange = useCallback((selection: any) => {
    const selectedRowIds = Object.keys(selection);
    const selectedItemIds = selectedRowIds.map(index => enhancedData[parseInt(index)]?.id).filter(Boolean);
    onSelectionChange?.(selectedItemIds);
  }, [enhancedData, onSelectionChange]);

  // Bulk actions
  const bulkActions = useMemo(() => {
    if (!showBulkActions || selectedIds.length === 0) return null;
    
    return (
      <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 border-b">
        <span className="text-sm font-medium">
          {selectedIds.length} item{selectedIds.length !== 1 ? 's' : ''} selected
        </span>
        
        <div className="flex items-center space-x-1">
          <Button size="sm" variant="outline">
            <Eye className="h-3 w-3 mr-1" />
            Show
          </Button>
          <Button size="sm" variant="outline">
            <EyeOff className="h-3 w-3 mr-1" />
            Hide
          </Button>
          <Button size="sm" variant="outline">
            <DollarSign className="h-3 w-3 mr-1" />
            Update Prices
          </Button>
          <Button size="sm" variant="outline" className="text-red-600">
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    );
  }, [showBulkActions, selectedIds.length]);

  // Custom toolbar
  const toolbar = useMemo(() => (
    <div className="flex items-center space-x-2">
      {onCreate && (
        <Button size="sm" onClick={onCreate}>
          <Plus className="h-3 w-3 mr-1" />
          Add Item
        </Button>
      )}
    </div>
  ), [onCreate]);

  return (
    <div className={cn("bg-white border rounded-lg", className)}>
      {bulkActions}
      
      <DataTable
        columns={columns}
        data={enhancedData}
        loading={loading}
        searchable
        searchPlaceholder="Search menu items..."
        filterable
        exportable
        selectable
        pagination
        pageSize={20}
        onRowClick={onItemClick}
        toolbar={toolbar}
        className="border-none"
      />
    </div>
  );
}