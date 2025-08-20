'use client';

import { useState, useCallback, useEffect, useMemo, useTransition } from 'react';
import { 
  Plus, 
  RefreshCw, 
  Filter, 
  Search,
  Settings,
  Download,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { MenuTreeNavigator } from './menu-tree-navigator';
import { MenuItemsTable } from './menu-items-table';
import { MenuItemEditor } from './menu-item-editor';
import { 
  Menu, 
  MenuItem, 
  MenuGroup,
  MenuTreeNode, 
  SalesChannel, 
  Allergen, 
  MenuFilters,
  CreateMenuItem,
  UpdateMenuItem
} from '@/lib/menu/types';
import { 
  buildMenuTree, 
  filterMenuItems, 
  isItemAvailable 
} from '@/lib/menu/utils';
import {
  getMenuItems,
  getMenus,
  createMenuItem as createMenuItemData,
  updateMenuItem as updateMenuItemData,
  deleteMenuItem as deleteMenuItemData,
  bulkUpdateItems,
  bulkDeleteItems,
} from '@/lib/menu/data';

interface MenuManagementClientProps {
  initialMenus: Menu[];
  availableChannels: SalesChannel[];
  availableAllergens: Allergen[];
}

export function MenuManagementClient({
  initialMenus,
  availableChannels,
  availableAllergens,
}: MenuManagementClientProps) {
  // State
  const [menus, setMenus] = useState<Menu[]>(initialMenus);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedNode, setSelectedNode] = useState<MenuTreeNode | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<string[]>(
    initialMenus.map(menu => menu.id)
  );
  const [filters, setFilters] = useState<MenuFilters>({});
  const [currentChannel, setCurrentChannel] = useState<string>('dine-in');
  const [showItemEditor, setShowItemEditor] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Build tree structure
  const menuTree = useMemo(() => buildMenuTree(menus), [menus]);

  // Get available menu groups for dropdown
  const availableGroups = useMemo(() => {
    const groups: { id: string; name: string; menuId: string }[] = [];
    
    const collectGroups = (menuGroups: MenuGroup[], menuId: string) => {
      menuGroups.forEach(group => {
        groups.push({ id: group.id, name: group.name, menuId });
        collectGroups(group.subGroups, menuId);
      });
    };
    
    menus.forEach(menu => {
      collectGroups(menu.groups, menu.id);
    });
    
    return groups;
  }, [menus]);

  // Fetch menu items based on current selection and filters
  const fetchMenuItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params: any = {
        page: 1,
        limit: 100,
        filters,
      };
      
      if (selectedNode) {
        if (selectedNode.type === 'menu') {
          params.menuId = selectedNode.id;
        } else if (selectedNode.type === 'group') {
          params.groupId = selectedNode.id;
        }
      }
      
      const result = await getMenuItems(params);
      setMenuItems(result.data);
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
      setError('Failed to load menu items. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedNode, filters]);

  // Fetch menu items when selection or filters change
  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  // Handle node selection in tree
  const handleNodeSelect = useCallback((node: MenuTreeNode) => {
    setSelectedNode(node);
    setSelectedItems([]);
  }, []);

  // Handle node expansion in tree
  const handleNodeExpand = useCallback((id: string, expanded: boolean) => {
    setExpandedNodes(prev => 
      expanded 
        ? [...prev, id]
        : prev.filter(nodeId => nodeId !== id)
    );
  }, []);

  // Handle creating new items
  const handleCreateItem = useCallback(() => {
    setEditingItem(null);
    setShowItemEditor(true);
  }, []);

  // Handle editing item
  const handleEditItem = useCallback((item: MenuItem) => {
    setEditingItem(item);
    setShowItemEditor(true);
  }, []);

  // Handle item click
  const handleItemClick = useCallback((item: MenuItem) => {
    handleEditItem(item);
  }, [handleEditItem]);

  // Handle copying item
  const handleCopyItem = useCallback((item: MenuItem) => {
    const copiedItem = {
      ...item,
      name: `${item.name} (Copy)`,
      id: undefined, // Will be generated
      createdAt: undefined,
      updatedAt: undefined,
    };
    setEditingItem(copiedItem as any);
    setShowItemEditor(true);
  }, []);

  // Handle deleting item
  const handleDeleteItem = useCallback(async (item: MenuItem) => {
    if (!window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      return;
    }

    try {
      await deleteMenuItemData(item.id);
      await fetchMenuItems();
    } catch (error) {
      console.error('Failed to delete item:', error);
      setError('Failed to delete item. Please try again.');
    }
  }, [fetchMenuItems]);

  // Handle toggling item visibility
  const handleToggleItemVisibility = useCallback(async (item: MenuItem) => {
    try {
      await updateMenuItemData(item.id, { isActive: !item.isActive });
      await fetchMenuItems();
    } catch (error) {
      console.error('Failed to update item visibility:', error);
      setError('Failed to update item visibility. Please try again.');
    }
  }, [fetchMenuItems]);

  // Handle saving item
  const handleSaveItem = useCallback(async (data: CreateMenuItem | UpdateMenuItem) => {
    try {
      if (editingItem) {
        // Update existing item
        await updateMenuItemData(editingItem.id, data as UpdateMenuItem);
      } else {
        // Create new item
        await createMenuItemData(data as CreateMenuItem);
      }
      
      setShowItemEditor(false);
      setEditingItem(null);
      await fetchMenuItems();
    } catch (error) {
      console.error('Failed to save item:', error);
      throw new Error('Failed to save item. Please try again.');
    }
  }, [editingItem, fetchMenuItems]);

  // Handle selection change
  const handleSelectionChange = useCallback((selectedIds: string[]) => {
    setSelectedItems(selectedIds);
  }, []);

  // Handle bulk actions
  const handleBulkShow = useCallback(async () => {
    if (selectedItems.length === 0) return;
    
    try {
      await bulkUpdateItems(selectedItems, { isActive: true });
      await fetchMenuItems();
      setSelectedItems([]);
    } catch (error) {
      console.error('Failed to bulk update items:', error);
      setError('Failed to update items. Please try again.');
    }
  }, [selectedItems, fetchMenuItems]);

  const handleBulkHide = useCallback(async () => {
    if (selectedItems.length === 0) return;
    
    try {
      await bulkUpdateItems(selectedItems, { isActive: false });
      await fetchMenuItems();
      setSelectedItems([]);
    } catch (error) {
      console.error('Failed to bulk update items:', error);
      setError('Failed to update items. Please try again.');
    }
  }, [selectedItems, fetchMenuItems]);

  const handleBulkDelete = useCallback(async () => {
    if (selectedItems.length === 0) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedItems.length} item${selectedItems.length !== 1 ? 's' : ''}?`
    );
    
    if (!confirmed) return;
    
    try {
      await bulkDeleteItems(selectedItems);
      await fetchMenuItems();
      setSelectedItems([]);
    } catch (error) {
      console.error('Failed to bulk delete items:', error);
      setError('Failed to delete items. Please try again.');
    }
  }, [selectedItems, fetchMenuItems]);

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setLoading(true);
    try {
      const [menusResult] = await Promise.all([
        getMenus({ page: 1, limit: 50 }),
        fetchMenuItems(),
      ]);
      setMenus(menusResult.data);
    } catch (error) {
      console.error('Failed to refresh data:', error);
      setError('Failed to refresh data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [fetchMenuItems]);

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setError(null)}
            >
              Dismiss
            </Button>
          </div>
        </Alert>
      )}

      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Channel Selector */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Channel:</label>
            <select
              value={currentChannel}
              onChange={(e) => setCurrentChannel(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              {availableChannels.map((channel) => (
                <option key={channel.id} value={channel.id}>
                  {channel.name}
                </option>
              ))}
            </select>
          </div>

          {/* Active Filters */}
          {Object.keys(filters).length > 0 && (
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">
                {Object.keys(filters).length} filter{Object.keys(filters).length !== 1 ? 's' : ''}
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setFilters({})}
              >
                Clear
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <>
              <Badge variant="secondary">
                {selectedItems.length} selected
              </Badge>
              <Button size="sm" variant="outline" onClick={handleBulkShow}>
                Show
              </Button>
              <Button size="sm" variant="outline" onClick={handleBulkHide}>
                Hide
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-red-600"
                onClick={handleBulkDelete}
              >
                Delete
              </Button>
            </>
          )}

          <Button size="sm" variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>

          <Button size="sm" onClick={handleCreateItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tree Navigator */}
        <div className="lg:col-span-1">
          <MenuTreeNavigator
            data={menuTree}
            selectedId={selectedNode?.id}
            expandedIds={expandedNodes}
            onSelect={handleNodeSelect}
            onExpand={handleNodeExpand}
            searchable
            showActions
            className="sticky top-6"
          />
        </div>

        {/* Items Table */}
        <div className="lg:col-span-3">
          <MenuItemsTable
            data={menuItems}
            loading={loading}
            selectedIds={selectedItems}
            filters={filters}
            onItemClick={handleItemClick}
            onEdit={handleEditItem}
            onCopy={handleCopyItem}
            onDelete={handleDeleteItem}
            onToggleVisibility={handleToggleItemVisibility}
            onSelectionChange={handleSelectionChange}
            onFiltersChange={setFilters}
            onCreate={handleCreateItem}
            channel={currentChannel}
            showBulkActions
          />
        </div>
      </div>

      {/* Item Editor */}
      <MenuItemEditor
        item={editingItem}
        isOpen={showItemEditor}
        onClose={() => {
          setShowItemEditor(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        availableChannels={availableChannels}
        availableAllergens={availableAllergens}
        availableGroups={availableGroups}
        loading={isPending}
      />
    </div>
  );
}