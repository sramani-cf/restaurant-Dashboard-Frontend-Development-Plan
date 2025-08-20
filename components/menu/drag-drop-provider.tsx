'use client';

import { createContext, useContext, useCallback, useState, ReactNode } from 'react';
import { DragItem, DropResult, MenuTreeNode } from '@/lib/menu/types';
import { canDropItem, calculateDropResult } from '@/lib/menu/utils';

interface DragDropContextValue {
  draggedItem: DragItem | null;
  dragOver: { nodeId: string; position: 'before' | 'after' | 'inside' } | null;
  isDragging: boolean;
  
  // Actions
  startDrag: (item: DragItem) => void;
  endDrag: () => void;
  setDragOver: (nodeId: string, position: 'before' | 'after' | 'inside') => void;
  clearDragOver: () => void;
  canDrop: (targetId: string, position: 'before' | 'after' | 'inside', targetType: 'menu' | 'group' | 'item') => boolean;
  onDrop: (targetId: string, position: 'before' | 'after' | 'inside') => DropResult | null;
}

const DragDropContext = createContext<DragDropContextValue | null>(null);

interface DragDropProviderProps {
  children: ReactNode;
  onDropComplete?: (result: DropResult) => void;
}

export function DragDropProvider({ children, onDropComplete }: DragDropProviderProps) {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [dragOver, setDragOverState] = useState<{ nodeId: string; position: 'before' | 'after' | 'inside' } | null>(null);

  const startDrag = useCallback((item: DragItem) => {
    setDraggedItem(item);
  }, []);

  const endDrag = useCallback(() => {
    setDraggedItem(null);
    setDragOverState(null);
  }, []);

  const setDragOver = useCallback((nodeId: string, position: 'before' | 'after' | 'inside') => {
    setDragOverState({ nodeId, position });
  }, []);

  const clearDragOver = useCallback(() => {
    setDragOverState(null);
  }, []);

  const canDrop = useCallback((
    targetId: string, 
    position: 'before' | 'after' | 'inside', 
    targetType: 'menu' | 'group' | 'item'
  ): boolean => {
    if (!draggedItem) return false;
    return canDropItem(draggedItem, targetId, position, targetType);
  }, [draggedItem]);

  const onDrop = useCallback((
    targetId: string, 
    position: 'before' | 'after' | 'inside'
  ): DropResult | null => {
    if (!draggedItem) return null;

    const result = calculateDropResult(draggedItem, targetId, position);
    
    // Call the completion handler
    onDropComplete?.(result);
    
    // Clear drag state
    endDrag();
    
    return result;
  }, [draggedItem, onDropComplete, endDrag]);

  const value: DragDropContextValue = {
    draggedItem,
    dragOver,
    isDragging: draggedItem !== null,
    startDrag,
    endDrag,
    setDragOver,
    clearDragOver,
    canDrop,
    onDrop,
  };

  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  );
}

export function useDragDrop(): DragDropContextValue {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
}

// Hook for draggable items
export function useDraggable(item: DragItem) {
  const { startDrag, endDrag, isDragging, draggedItem } = useDragDrop();
  
  const isDraggedItem = draggedItem?.id === item.id;
  
  const dragHandlers = {
    draggable: true,
    onDragStart: (e: React.DragEvent) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', item.id);
      startDrag(item);
    },
    onDragEnd: () => {
      endDrag();
    },
  };
  
  return {
    isDraggedItem,
    isDragging,
    dragHandlers,
  };
}

// Hook for drop targets
export function useDropTarget(
  targetId: string,
  targetType: 'menu' | 'group' | 'item',
  position: 'before' | 'after' | 'inside'
) {
  const { 
    draggedItem, 
    dragOver, 
    setDragOver, 
    clearDragOver, 
    canDrop, 
    onDrop 
  } = useDragDrop();
  
  const canDropHere = draggedItem ? canDrop(targetId, position, targetType) : false;
  const isDraggedOver = dragOver?.nodeId === targetId && dragOver?.position === position;
  
  const dropHandlers = {
    onDragOver: (e: React.DragEvent) => {
      if (!canDropHere) return;
      
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setDragOver(targetId, position);
    },
    onDragLeave: (e: React.DragEvent) => {
      // Only clear if we're leaving the element entirely
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        clearDragOver();
      }
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      
      if (!canDropHere) return;
      
      onDrop(targetId, position);
    },
  };
  
  return {
    canDropHere,
    isDraggedOver,
    dropHandlers,
  };
}

// Visual feedback component for drop zones
interface DropZoneProps {
  targetId: string;
  targetType: 'menu' | 'group' | 'item';
  position: 'before' | 'after' | 'inside';
  className?: string;
  children?: ReactNode;
}

export function DropZone({ 
  targetId, 
  targetType, 
  position, 
  className = '',
  children 
}: DropZoneProps) {
  const { canDropHere, isDraggedOver, dropHandlers } = useDropTarget(
    targetId, 
    targetType, 
    position
  );
  
  if (!canDropHere) return children ? <>{children}</> : null;
  
  const dropZoneClasses = [
    'transition-all duration-200',
    position === 'inside' 
      ? 'border-2 border-dashed border-transparent' 
      : 'h-1 border-t-2 border-transparent',
    isDraggedOver && (
      position === 'inside'
        ? 'border-blue-500 bg-blue-50'
        : 'border-blue-500'
    ),
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div 
      className={dropZoneClasses}
      {...dropHandlers}
    >
      {children}
    </div>
  );
}

// Drag preview component (optional)
interface DragPreviewProps {
  children: ReactNode;
}

export function DragPreview({ children }: DragPreviewProps) {
  const { isDragging } = useDragDrop();
  
  if (!isDragging) return null;
  
  return (
    <div className="fixed top-0 left-0 pointer-events-none z-50 opacity-75">
      {children}
    </div>
  );
}