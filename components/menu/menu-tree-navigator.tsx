'use client';

import { useState, useCallback, useMemo } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Menu as MenuIcon, 
  FolderOpen, 
  Folder, 
  FileText,
  Plus,
  MoreHorizontal,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  GripVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dropdown } from '@/components/ui/dropdown';
import { cn } from '@/lib/menu/utils';
import { MenuTreeNode, Menu, MenuGroup, MenuItem, DragItem } from '@/lib/menu/types';

interface MenuTreeNavigatorProps {
  data: MenuTreeNode[];
  selectedId?: string;
  expandedIds?: string[];
  onSelect?: (node: MenuTreeNode) => void;
  onExpand?: (id: string, expanded: boolean) => void;
  onCreate?: (type: 'menu' | 'group' | 'item', parentId?: string) => void;
  onEdit?: (node: MenuTreeNode) => void;
  onDelete?: (node: MenuTreeNode) => void;
  onToggleVisibility?: (node: MenuTreeNode) => void;
  onDragStart?: (node: MenuTreeNode) => void;
  onDragOver?: (node: MenuTreeNode, position: 'before' | 'after' | 'inside') => void;
  onDrop?: (dragNode: MenuTreeNode, targetNode: MenuTreeNode, position: 'before' | 'after' | 'inside') => void;
  className?: string;
  searchable?: boolean;
  draggable?: boolean;
  showActions?: boolean;
}

export function MenuTreeNavigator({
  data,
  selectedId,
  expandedIds = [],
  onSelect,
  onExpand,
  onCreate,
  onEdit,
  onDelete,
  onToggleVisibility,
  onDragStart,
  onDragOver,
  onDrop,
  className,
  searchable = true,
  draggable = false,
  showActions = true,
}: MenuTreeNavigatorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedNode, setDraggedNode] = useState<MenuTreeNode | null>(null);
  const [dragOverNode, setDragOverNode] = useState<{ node: MenuTreeNode; position: 'before' | 'after' | 'inside' } | null>(null);

  // Filter nodes based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    const filterNodes = (nodes: MenuTreeNode[]): MenuTreeNode[] => {
      return nodes.reduce((acc, node) => {
        const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            node.description?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const filteredChildren = filterNodes(node.children);
        
        if (matchesSearch || filteredChildren.length > 0) {
          acc.push({
            ...node,
            children: filteredChildren
          });
        }
        
        return acc;
      }, [] as MenuTreeNode[]);
    };
    
    return filterNodes(data);
  }, [data, searchTerm]);

  const handleExpand = useCallback((id: string) => {
    const isExpanded = expandedIds.includes(id);
    onExpand?.(id, !isExpanded);
  }, [expandedIds, onExpand]);

  const handleDragStart = useCallback((e: React.DragEvent, node: MenuTreeNode) => {
    if (!draggable) return;
    
    setDraggedNode(node);
    onDragStart?.(node);
    
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', node.id);
  }, [draggable, onDragStart]);

  const handleDragOver = useCallback((e: React.DragEvent, node: MenuTreeNode, position: 'before' | 'after' | 'inside') => {
    if (!draggable || !draggedNode) return;
    
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    setDragOverNode({ node, position });
    onDragOver?.(node, position);
  }, [draggable, draggedNode, onDragOver]);

  const handleDrop = useCallback((e: React.DragEvent, node: MenuTreeNode, position: 'before' | 'after' | 'inside') => {
    if (!draggable || !draggedNode) return;
    
    e.preventDefault();
    
    setDragOverNode(null);
    onDrop?.(draggedNode, node, position);
    setDraggedNode(null);
  }, [draggable, draggedNode, onDrop]);

  const getNodeIcon = (node: MenuTreeNode, isExpanded: boolean) => {
    switch (node.type) {
      case 'menu':
        return <MenuIcon className="h-4 w-4" />;
      case 'group':
        return isExpanded ? <FolderOpen className="h-4 w-4" /> : <Folder className="h-4 w-4" />;
      case 'item':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const renderNode = (node: MenuTreeNode, depth = 0) => {
    const isExpanded = expandedIds.includes(node.id);
    const isSelected = selectedId === node.id;
    const hasChildren = node.children.length > 0;
    const isDraggedOver = dragOverNode?.node.id === node.id;

    return (
      <div key={node.id} className={cn("select-none", isDraggedOver && "opacity-50")}>
        <div
          className={cn(
            "flex items-center group hover:bg-gray-50 rounded px-2 py-1 cursor-pointer",
            isSelected && "bg-blue-50 border-r-2 border-blue-500",
            isDraggedOver && "bg-blue-100"
          )}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => onSelect?.(node)}
          draggable={draggable}
          onDragStart={(e) => handleDragStart(e, node)}
          onDragOver={(e) => handleDragOver(e, node, 'inside')}
          onDrop={(e) => handleDrop(e, node, 'inside')}
        >
          {/* Drag handle */}
          {draggable && showActions && (
            <GripVertical className="h-3 w-3 text-gray-400 mr-1 opacity-0 group-hover:opacity-100" />
          )}

          {/* Expand/collapse button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={(e) => {
              e.stopPropagation();
              handleExpand(node.id);
            }}
            disabled={!hasChildren}
          >
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )
            ) : (
              <div className="h-3 w-3" />
            )}
          </Button>

          {/* Node icon */}
          <div className="flex items-center text-gray-500 mr-2">
            {getNodeIcon(node, isExpanded)}
          </div>

          {/* Node name and info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <span className={cn(
                "text-sm truncate",
                !node.isActive && "text-gray-400 line-through"
              )}>
                {node.name}
              </span>
              {!node.isActive && (
                <EyeOff className="h-3 w-3 text-gray-400 ml-1" />
              )}
            </div>
            
            {/* Item-specific info */}
            {node.type === 'item' && (
              <div className="flex items-center space-x-1 mt-1">
                {(node.data as MenuItem).basePrice && (
                  <Badge variant="secondary" className="text-xs">
                    ${(node.data as MenuItem).basePrice.toFixed(2)}
                  </Badge>
                )}
                {!(node.data as MenuItem).isAvailable && (
                  <Badge variant="destructive" className="text-xs">
                    Unavailable
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Actions dropdown */}
          {showActions && (
            <div className="opacity-0 group-hover:opacity-100">
              <Dropdown
                trigger={
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                }
                items={[
                  {
                    label: 'Edit',
                    icon: <Edit className="h-3 w-3" />,
                    onClick: () => onEdit?.(node),
                  },
                  {
                    label: node.isActive ? 'Hide' : 'Show',
                    icon: node.isActive ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />,
                    onClick: () => onToggleVisibility?.(node),
                  },
                  { type: 'separator' },
                  ...(node.type !== 'item' ? [
                    {
                      label: `Add ${node.type === 'menu' ? 'Group' : 'Item'}`,
                      icon: <Plus className="h-3 w-3" />,
                      onClick: () => onCreate?.(node.type === 'menu' ? 'group' : 'item', node.id),
                    },
                  ] : []),
                  { type: 'separator' },
                  {
                    label: 'Delete',
                    icon: <Trash2 className="h-3 w-3" />,
                    onClick: () => onDelete?.(node),
                    className: 'text-red-600',
                  },
                ]}
              />
            </div>
          )}
        </div>

        {/* Drop zones for before/after positioning */}
        {draggable && draggedNode && draggedNode.id !== node.id && (
          <>
            <div
              className="h-1 bg-blue-500 opacity-0 hover:opacity-100"
              style={{ marginLeft: `${depth * 16 + 8}px` }}
              onDragOver={(e) => handleDragOver(e, node, 'before')}
              onDrop={(e) => handleDrop(e, node, 'before')}
            />
          </>
        )}

        {/* Children */}
        {isExpanded && hasChildren && (
          <div className="ml-2">
            {node.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}

        {/* Drop zone after */}
        {draggable && draggedNode && draggedNode.id !== node.id && (
          <div
            className="h-1 bg-blue-500 opacity-0 hover:opacity-100"
            style={{ marginLeft: `${depth * 16 + 8}px` }}
            onDragOver={(e) => handleDragOver(e, node, 'after')}
            onDrop={(e) => handleDrop(e, node, 'after')}
          />
        )}
      </div>
    );
  };

  return (
    <div className={cn("bg-white border rounded-lg", className)}>
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">Menu Structure</h3>
          {showActions && onCreate && (
            <Button
              size="sm"
              onClick={() => onCreate('menu')}
              className="h-8"
            >
              <Plus className="h-3 w-3 mr-1" />
              Menu
            </Button>
          )}
        </div>

        {/* Search */}
        {searchable && (
          <Input
            placeholder="Search menus..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8"
          />
        )}
      </div>

      {/* Tree */}
      <div className="p-2 max-h-96 overflow-y-auto">
        {filteredData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 'No matching items found' : 'No menus created yet'}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredData.map((node) => renderNode(node))}
          </div>
        )}
      </div>
    </div>
  );
}