import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  Menu, 
  MenuGroup, 
  MenuItem, 
  MenuTreeNode, 
  ModifierGroup, 
  ModifierOption,
  PricingStrategy,
  ChannelVisibility,
  MenuFilters,
  DragItem,
  DropResult 
} from './types';

// Utility function for merging class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Price calculation utilities
export function calculateItemPrice(
  item: MenuItem,
  channel?: string,
  date?: Date,
  location?: string
): number {
  let effectivePrice = item.basePrice;
  
  // Find applicable pricing strategies
  const applicableStrategies = item.pricingStrategies
    .filter(strategy => isPricingStrategyApplicable(strategy, channel, date, location))
    .sort((a, b) => b.priority - a.priority); // Higher priority first
  
  // Apply the highest priority strategy
  if (applicableStrategies.length > 0) {
    const strategy = applicableStrategies[0];
    const strategyPrice = strategy.prices.find(p => 
      (!p.validFrom || new Date(p.validFrom) <= (date || new Date())) &&
      (!p.validTo || new Date(p.validTo) >= (date || new Date()))
    );
    
    if (strategyPrice) {
      effectivePrice = strategyPrice.amount;
    }
  }
  
  return effectivePrice;
}

export function calculateModifierPrice(
  option: ModifierOption,
  channel?: string,
  date?: Date,
  location?: string
): number {
  let effectivePrice = option.price;
  
  const applicableStrategies = option.pricingStrategies
    .filter(strategy => isPricingStrategyApplicable(strategy, channel, date, location))
    .sort((a, b) => b.priority - a.priority);
  
  if (applicableStrategies.length > 0) {
    const strategy = applicableStrategies[0];
    const strategyPrice = strategy.prices.find(p => 
      (!p.validFrom || new Date(p.validFrom) <= (date || new Date())) &&
      (!p.validTo || new Date(p.validTo) >= (date || new Date()))
    );
    
    if (strategyPrice) {
      effectivePrice = strategyPrice.amount;
    }
  }
  
  return effectivePrice;
}

function isPricingStrategyApplicable(
  strategy: PricingStrategy,
  channel?: string,
  date?: Date,
  location?: string
): boolean {
  const currentDate = date || new Date();
  const currentDay = currentDate.getDay();
  const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
  
  switch (strategy.type) {
    case 'base':
      return true;
      
    case 'time_based':
      if (strategy.conditions?.startTime && strategy.conditions?.endTime) {
        const startTime = parseTimeString(strategy.conditions.startTime);
        const endTime = parseTimeString(strategy.conditions.endTime);
        return currentTime >= startTime && currentTime <= endTime;
      }
      return true;
      
    case 'day_of_week':
      if (strategy.conditions?.daysOfWeek) {
        return strategy.conditions.daysOfWeek.includes(currentDay);
      }
      return true;
      
    case 'location_based':
      if (strategy.conditions?.locationIds && location) {
        return strategy.conditions.locationIds.includes(location);
      }
      return true;
      
    case 'menu_specific':
      if (strategy.conditions?.channelId && channel) {
        return strategy.conditions.channelId === channel;
      }
      return true;
      
    default:
      return true;
  }
}

function parseTimeString(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

// Availability utilities
export function isItemAvailable(
  item: MenuItem,
  channel?: string,
  date?: Date
): boolean {
  if (!item.isActive || !item.isAvailable) {
    return false;
  }
  
  const currentDate = date || new Date();
  
  // Check channel visibility
  if (channel) {
    const channelConfig = item.channelVisibility.find(cv => cv.channelId === channel);
    if (channelConfig && !channelConfig.isVisible) {
      return false;
    }
    
    // Check time-based availability for channel
    if (channelConfig && (channelConfig.availableFrom || channelConfig.availableTo)) {
      const currentTime = formatTime(currentDate);
      if (channelConfig.availableFrom && currentTime < channelConfig.availableFrom) {
        return false;
      }
      if (channelConfig.availableTo && currentTime > channelConfig.availableTo) {
        return false;
      }
    }
    
    // Check day-based availability for channel
    if (channelConfig && channelConfig.daysOfWeek) {
      const currentDay = currentDate.getDay();
      if (!channelConfig.daysOfWeek.includes(currentDay)) {
        return false;
      }
    }
  }
  
  // Check inventory
  if (item.trackInventory && item.stockQuantity !== undefined) {
    return item.stockQuantity > 0;
  }
  
  return true;
}

export function isGroupAvailable(
  group: MenuGroup,
  channel?: string,
  date?: Date
): boolean {
  if (!group.isActive) {
    return false;
  }
  
  const currentDate = date || new Date();
  
  // Check time-based availability
  if (group.availableFrom || group.availableTo) {
    const currentTime = formatTime(currentDate);
    if (group.availableFrom && currentTime < group.availableFrom) {
      return false;
    }
    if (group.availableTo && currentTime > group.availableTo) {
      return false;
    }
  }
  
  // Check day-based availability
  if (group.daysOfWeek) {
    const currentDay = currentDate.getDay();
    if (!group.daysOfWeek.includes(currentDay)) {
      return false;
    }
  }
  
  // Check channel visibility
  if (channel) {
    const channelConfig = group.channelVisibility.find(cv => cv.channelId === channel);
    if (channelConfig && !channelConfig.isVisible) {
      return false;
    }
  }
  
  return true;
}

export function isMenuAvailable(
  menu: Menu,
  channel?: string,
  date?: Date
): boolean {
  if (!menu.isActive) {
    return false;
  }
  
  const currentDate = date || new Date();
  
  // Check date range
  if (menu.validFrom && currentDate < menu.validFrom) {
    return false;
  }
  if (menu.validTo && currentDate > menu.validTo) {
    return false;
  }
  
  // Check time-based availability
  if (menu.availableFrom || menu.availableTo) {
    const currentTime = formatTime(currentDate);
    if (menu.availableFrom && currentTime < menu.availableFrom) {
      return false;
    }
    if (menu.availableTo && currentTime > menu.availableTo) {
      return false;
    }
  }
  
  // Check day-based availability
  if (menu.daysOfWeek) {
    const currentDay = currentDate.getDay();
    if (!menu.daysOfWeek.includes(currentDay)) {
      return false;
    }
  }
  
  // Check channel visibility
  if (channel) {
    const channelConfig = menu.channelVisibility.find(cv => cv.channelId === channel);
    if (channelConfig && !channelConfig.isVisible) {
      return false;
    }
  }
  
  return true;
}

function formatTime(date: Date): string {
  return date.toTimeString().slice(0, 5); // "HH:mm"
}

// Tree structure utilities
export function buildMenuTree(menus: Menu[]): MenuTreeNode[] {
  return menus.map(menu => ({
    id: menu.id,
    type: 'menu' as const,
    name: menu.name,
    description: menu.description,
    isActive: menu.isActive,
    sortOrder: menu.sortOrder,
    children: buildGroupTree(menu.groups, menu.id),
    data: menu
  })).sort((a, b) => a.sortOrder - b.sortOrder);
}

function buildGroupTree(groups: MenuGroup[], parentId?: string): MenuTreeNode[] {
  const rootGroups = groups.filter(group => group.parentGroupId === parentId);
  
  return rootGroups.map(group => ({
    id: group.id,
    type: 'group' as const,
    name: group.name,
    description: group.description,
    isActive: group.isActive,
    sortOrder: group.sortOrder,
    parentId,
    children: [
      ...buildGroupTree(groups, group.id),
      ...group.items.map(item => ({
        id: item.id,
        type: 'item' as const,
        name: item.name,
        description: item.description,
        isActive: item.isActive,
        sortOrder: item.sortOrder,
        parentId: group.id,
        children: [],
        data: item
      }))
    ].sort((a, b) => a.sortOrder - b.sortOrder),
    data: group
  })).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function flattenMenuTree(nodes: MenuTreeNode[]): MenuTreeNode[] {
  const result: MenuTreeNode[] = [];
  
  function flatten(nodes: MenuTreeNode[], depth = 0) {
    nodes.forEach(node => {
      result.push({ ...node, children: [] });
      if (node.children.length > 0) {
        flatten(node.children, depth + 1);
      }
    });
  }
  
  flatten(nodes);
  return result;
}

export function findNodeInTree(
  nodes: MenuTreeNode[], 
  id: string
): MenuTreeNode | null {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }
    
    const found = findNodeInTree(node.children, id);
    if (found) {
      return found;
    }
  }
  
  return null;
}

export function getNodePath(
  nodes: MenuTreeNode[], 
  id: string, 
  path: string[] = []
): string[] | null {
  for (const node of nodes) {
    const currentPath = [...path, node.name];
    
    if (node.id === id) {
      return currentPath;
    }
    
    const foundPath = getNodePath(node.children, id, currentPath);
    if (foundPath) {
      return foundPath;
    }
  }
  
  return null;
}

// Search and filter utilities
export function filterMenuItems(
  items: MenuItem[], 
  filters: MenuFilters,
  channel?: string,
  date?: Date
): MenuItem[] {
  return items.filter(item => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      if (!item.name.toLowerCase().includes(searchTerm) &&
          !item.description?.toLowerCase().includes(searchTerm) &&
          !item.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
        return false;
      }
    }
    
    // Menu/Group filter
    if (filters.menuId && item.menuGroupId) {
      // This would need to be expanded based on how you store menu relationships
      // For now, assuming a simple check
    }
    
    // Active filter
    if (filters.isActive !== undefined && item.isActive !== filters.isActive) {
      return false;
    }
    
    // Availability filter
    if (filters.isAvailable !== undefined) {
      const available = isItemAvailable(item, channel, date);
      if (available !== filters.isAvailable) {
        return false;
      }
    }
    
    // Price range filter
    if (filters.priceRange) {
      const price = calculateItemPrice(item, channel, date);
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false;
      }
    }
    
    // Allergen filter
    if (filters.allergens && filters.allergens.length > 0) {
      const hasAllergen = filters.allergens.some(allergen => 
        item.allergens.includes(allergen)
      );
      if (hasAllergen) {
        return false;
      }
    }
    
    // Dietary restrictions filter
    if (filters.dietaryRestrictions && filters.dietaryRestrictions.length > 0) {
      const hasRestriction = filters.dietaryRestrictions.every(restriction =>
        item.dietaryRestrictions.includes(restriction)
      );
      if (!hasRestriction) {
        return false;
      }
    }
    
    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasTag = filters.tags.some(tag => item.tags.includes(tag));
      if (!hasTag) {
        return false;
      }
    }
    
    return true;
  });
}

// Sorting utilities
export function sortMenuItems(
  items: MenuItem[], 
  field: string, 
  direction: 'asc' | 'desc' = 'asc',
  channel?: string,
  date?: Date
): MenuItem[] {
  return [...items].sort((a, b) => {
    let aValue: any;
    let bValue: any;
    
    switch (field) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'basePrice':
        aValue = calculateItemPrice(a, channel, date);
        bValue = calculateItemPrice(b, channel, date);
        break;
      case 'sortOrder':
        aValue = a.sortOrder;
        bValue = b.sortOrder;
        break;
      case 'createdAt':
        aValue = a.createdAt.getTime();
        bValue = b.createdAt.getTime();
        break;
      case 'updatedAt':
        aValue = a.updatedAt.getTime();
        bValue = b.updatedAt.getTime();
        break;
      default:
        aValue = a[field as keyof MenuItem];
        bValue = b[field as keyof MenuItem];
    }
    
    if (aValue < bValue) {
      return direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

// Validation utilities
export function validateModifierSelections(
  group: ModifierGroup,
  selectedOptions: { optionId: string; quantity: number }[]
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  let isValid = true;
  
  const totalSelections = selectedOptions.reduce((sum, sel) => sum + sel.quantity, 0);
  
  // Check minimum selections
  if (totalSelections < group.minSelections) {
    errors.push(`Minimum ${group.minSelections} selection(s) required for ${group.name}`);
    isValid = false;
  }
  
  // Check maximum selections
  if (group.maxSelections && totalSelections > group.maxSelections) {
    errors.push(`Maximum ${group.maxSelections} selection(s) allowed for ${group.name}`);
    isValid = false;
  }
  
  // Check individual option max quantities
  selectedOptions.forEach(selection => {
    const option = group.options.find(opt => opt.id === selection.optionId);
    if (option && option.maxQuantity && selection.quantity > option.maxQuantity) {
      errors.push(`Maximum ${option.maxQuantity} of ${option.name} allowed`);
      isValid = false;
    }
  });
  
  // Check if required and no selections
  if (group.isRequired && totalSelections === 0) {
    errors.push(`${group.name} is required`);
    isValid = false;
  }
  
  return { isValid, errors };
}

// Drag and drop utilities
export function canDropItem(
  dragItem: DragItem,
  targetId: string,
  position: 'before' | 'after' | 'inside',
  targetType: 'menu' | 'group' | 'item'
): boolean {
  // Prevent dropping on self
  if (dragItem.id === targetId) {
    return false;
  }
  
  // Business rules for what can be dropped where
  switch (dragItem.type) {
    case 'menu':
      // Menus can only be reordered with other menus
      return targetType === 'menu' && position !== 'inside';
      
    case 'group':
      // Groups can be moved to menus or other groups
      if (targetType === 'menu' && position === 'inside') return true;
      if (targetType === 'group' && position !== 'inside') return true;
      return false;
      
    case 'item':
      // Items can be moved to groups or reordered with other items
      if (targetType === 'group' && position === 'inside') return true;
      if (targetType === 'item' && position !== 'inside') return true;
      return false;
      
    default:
      return false;
  }
}

export function calculateDropResult(
  dragItem: DragItem,
  targetId: string,
  position: 'before' | 'after' | 'inside'
): DropResult {
  return {
    draggedId: dragItem.id,
    targetId,
    position,
    type: position === 'inside' ? 'move' : 'reorder'
  };
}

// Format utilities
export function formatPrice(
  amount: number, 
  currency = 'USD',
  locale = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatPrepTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}

export function formatStockStatus(
  quantity?: number,
  threshold?: number
): { status: 'in_stock' | 'low_stock' | 'out_of_stock'; label: string; variant: 'default' | 'warning' | 'destructive' } {
  if (quantity === undefined) {
    return { status: 'in_stock', label: 'Not tracked', variant: 'default' };
  }
  
  if (quantity === 0) {
    return { status: 'out_of_stock', label: 'Out of stock', variant: 'destructive' };
  }
  
  if (threshold && quantity <= threshold) {
    return { status: 'low_stock', label: `Low stock (${quantity})`, variant: 'warning' };
  }
  
  return { status: 'in_stock', label: `In stock (${quantity})`, variant: 'default' };
}

// Helper function to generate unique IDs (you might want to use a more robust solution)
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Deep clone utility for form state management
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as any;
  if (typeof obj === 'object') {
    const clonedObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
}