import { 
  Menu, 
  MenuGroup, 
  MenuItem, 
  ModifierGroup,
  ModifierOption,
  SalesChannel,
  Allergen,
  MenuResponse,
  MenuItemResponse,
  MenuFilters,
  CreateMenu,
  CreateMenuGroup,
  CreateMenuItem,
  CreateModifierGroup,
  CreateModifierOption,
  UpdateMenu,
  UpdateMenuGroup,
  UpdateMenuItem,
  UpdateModifierGroup,
  UpdateModifierOption
} from './types';

// Mock data for development - replace with actual API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Sample data
const sampleAllergens: Allergen[] = [
  { id: '1', name: 'Gluten', description: 'Contains gluten', severity: 'moderate' },
  { id: '2', name: 'Dairy', description: 'Contains dairy products', severity: 'moderate' },
  { id: '3', name: 'Nuts', description: 'Contains tree nuts', severity: 'severe' },
  { id: '4', name: 'Shellfish', description: 'Contains shellfish', severity: 'severe' },
  { id: '5', name: 'Eggs', description: 'Contains eggs', severity: 'mild' },
];

const sampleChannels: SalesChannel[] = [
  { id: 'dine-in', name: 'Dine In', type: 'dine_in', isActive: true },
  { id: 'takeout', name: 'Takeout', type: 'takeout', isActive: true },
  { id: 'delivery', name: 'Delivery', type: 'delivery', isActive: true },
  { id: 'online', name: 'Online Ordering', type: 'online', isActive: true },
];

let mockMenus: Menu[] = [
  {
    id: '1',
    name: 'Main Menu',
    description: 'Our signature dishes and classics',
    type: 'main',
    sortOrder: 1,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    media: [],
    channelVisibility: [
      { channelId: 'dine-in', isVisible: true },
      { channelId: 'takeout', isVisible: true },
    ],
    locationIds: [],
    groups: [
      {
        id: 'group-1',
        name: 'Appetizers',
        description: 'Start your meal right',
        sortOrder: 1,
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-10'),
        media: [],
        channelVisibility: [],
        menuId: '1',
        items: [
          {
            id: 'item-1',
            name: 'Buffalo Wings',
            description: 'Crispy wings tossed in our signature buffalo sauce',
            basePrice: 12.99,
            sortOrder: 1,
            isActive: true,
            isAvailable: true,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-05'),
            pricingStrategies: [],
            tags: ['spicy', 'popular'],
            allergens: [],
            dietaryRestrictions: [],
            media: [],
            channelVisibility: [],
            modifierGroups: [
              {
                id: 'mod-group-1',
                name: 'Sauce Options',
                description: 'Choose your sauce',
                isRequired: true,
                minSelections: 1,
                maxSelections: 1,
                sortOrder: 1,
                displayType: 'radio',
                isActive: true,
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date('2024-01-01'),
                options: [
                  {
                    id: 'mod-opt-1',
                    name: 'Buffalo',
                    description: 'Classic buffalo sauce',
                    price: 0,
                    sortOrder: 1,
                    isDefault: true,
                    isActive: true,
                    createdAt: new Date('2024-01-01'),
                    updatedAt: new Date('2024-01-01'),
                    pricingStrategies: [],
                    allergens: [],
                    media: [],
                  },
                  {
                    id: 'mod-opt-2',
                    name: 'BBQ',
                    description: 'Sweet and smoky BBQ sauce',
                    price: 0,
                    sortOrder: 2,
                    isDefault: false,
                    isActive: true,
                    createdAt: new Date('2024-01-01'),
                    updatedAt: new Date('2024-01-01'),
                    pricingStrategies: [],
                    allergens: [],
                    media: [],
                  }
                ]
              }
            ]
          }
        ],
        subGroups: []
      }
    ]
  }
];

// API Functions

export async function getMenus(params?: {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}): Promise<MenuResponse> {
  await delay(100);
  
  let filtered = [...mockMenus];
  
  // Apply filters
  if (params?.search) {
    const search = params.search.toLowerCase();
    filtered = filtered.filter(menu => 
      menu.name.toLowerCase().includes(search) ||
      menu.description?.toLowerCase().includes(search)
    );
  }
  
  if (params?.isActive !== undefined) {
    filtered = filtered.filter(menu => menu.isActive === params.isActive);
  }
  
  // Pagination
  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return {
    data: filtered.slice(start, end),
    total: filtered.length,
    page,
    limit,
  };
}

export async function getMenu(id: string): Promise<Menu | null> {
  await delay(100);
  return mockMenus.find(menu => menu.id === id) || null;
}

export async function createMenu(data: CreateMenu): Promise<Menu> {
  await delay(200);
  
  const newMenu: Menu = {
    ...data,
    id: `menu-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    groups: [],
  };
  
  mockMenus.push(newMenu);
  return newMenu;
}

export async function updateMenu(id: string, data: UpdateMenu): Promise<Menu | null> {
  await delay(200);
  
  const index = mockMenus.findIndex(menu => menu.id === id);
  if (index === -1) return null;
  
  mockMenus[index] = {
    ...mockMenus[index],
    ...data,
    updatedAt: new Date(),
  };
  
  return mockMenus[index];
}

export async function deleteMenu(id: string): Promise<boolean> {
  await delay(200);
  
  const index = mockMenus.findIndex(menu => menu.id === id);
  if (index === -1) return false;
  
  mockMenus.splice(index, 1);
  return true;
}

// Menu Groups
export async function getMenuGroups(menuId: string): Promise<MenuGroup[]> {
  await delay(100);
  
  const menu = mockMenus.find(m => m.id === menuId);
  return menu?.groups || [];
}

export async function getMenuGroup(id: string): Promise<MenuGroup | null> {
  await delay(100);
  
  for (const menu of mockMenus) {
    const group = findGroupRecursive(menu.groups, id);
    if (group) return group;
  }
  
  return null;
}

function findGroupRecursive(groups: MenuGroup[], id: string): MenuGroup | null {
  for (const group of groups) {
    if (group.id === id) return group;
    
    const found = findGroupRecursive(group.subGroups, id);
    if (found) return found;
  }
  return null;
}

export async function createMenuGroup(data: CreateMenuGroup): Promise<MenuGroup> {
  await delay(200);
  
  const newGroup: MenuGroup = {
    ...data,
    id: `group-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [],
    subGroups: [],
  };
  
  // Add to appropriate menu
  const menu = mockMenus.find(m => m.id === data.menuId);
  if (menu) {
    if (data.parentGroupId) {
      const parentGroup = findGroupRecursive(menu.groups, data.parentGroupId);
      if (parentGroup) {
        parentGroup.subGroups.push(newGroup);
      }
    } else {
      menu.groups.push(newGroup);
    }
  }
  
  return newGroup;
}

export async function updateMenuGroup(id: string, data: UpdateMenuGroup): Promise<MenuGroup | null> {
  await delay(200);
  
  for (const menu of mockMenus) {
    const group = findGroupRecursive(menu.groups, id);
    if (group) {
      Object.assign(group, {
        ...data,
        updatedAt: new Date(),
      });
      return group;
    }
  }
  
  return null;
}

export async function deleteMenuGroup(id: string): Promise<boolean> {
  await delay(200);
  
  for (const menu of mockMenus) {
    if (removeGroupRecursive(menu.groups, id)) {
      return true;
    }
  }
  
  return false;
}

function removeGroupRecursive(groups: MenuGroup[], id: string): boolean {
  const index = groups.findIndex(group => group.id === id);
  if (index !== -1) {
    groups.splice(index, 1);
    return true;
  }
  
  for (const group of groups) {
    if (removeGroupRecursive(group.subGroups, id)) {
      return true;
    }
  }
  
  return false;
}

// Menu Items
export async function getMenuItems(params?: {
  page?: number;
  limit?: number;
  menuId?: string;
  groupId?: string;
  filters?: MenuFilters;
}): Promise<MenuItemResponse> {
  await delay(100);
  
  let items: MenuItem[] = [];
  
  // Collect all items
  for (const menu of mockMenus) {
    if (params?.menuId && menu.id !== params.menuId) continue;
    
    collectItemsRecursive(menu.groups, items, params?.groupId);
  }
  
  // Apply filters
  if (params?.filters) {
    items = applyMenuItemFilters(items, params.filters);
  }
  
  // Pagination
  const page = params?.page || 1;
  const limit = params?.limit || 20;
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return {
    data: items.slice(start, end),
    total: items.length,
    page,
    limit,
  };
}

function collectItemsRecursive(
  groups: MenuGroup[], 
  items: MenuItem[], 
  targetGroupId?: string
): void {
  for (const group of groups) {
    if (!targetGroupId || group.id === targetGroupId) {
      items.push(...group.items);
    }
    
    if (!targetGroupId) {
      collectItemsRecursive(group.subGroups, items);
    }
  }
}

function applyMenuItemFilters(items: MenuItem[], filters: MenuFilters): MenuItem[] {
  return items.filter(item => {
    if (filters.search) {
      const search = filters.search.toLowerCase();
      if (!item.name.toLowerCase().includes(search) &&
          !item.description?.toLowerCase().includes(search)) {
        return false;
      }
    }
    
    if (filters.isActive !== undefined && item.isActive !== filters.isActive) {
      return false;
    }
    
    if (filters.isAvailable !== undefined && item.isAvailable !== filters.isAvailable) {
      return false;
    }
    
    if (filters.priceRange) {
      if (item.basePrice < filters.priceRange[0] || item.basePrice > filters.priceRange[1]) {
        return false;
      }
    }
    
    if (filters.allergens?.length) {
      const hasAllergen = filters.allergens.some(allergen => 
        item.allergens.includes(allergen)
      );
      if (hasAllergen) return false;
    }
    
    if (filters.tags?.length) {
      const hasTag = filters.tags.some(tag => item.tags.includes(tag));
      if (!hasTag) return false;
    }
    
    return true;
  });
}

export async function getMenuItem(id: string): Promise<MenuItem | null> {
  await delay(100);
  
  for (const menu of mockMenus) {
    const item = findItemRecursive(menu.groups, id);
    if (item) return item;
  }
  
  return null;
}

function findItemRecursive(groups: MenuGroup[], id: string): MenuItem | null {
  for (const group of groups) {
    const item = group.items.find(item => item.id === id);
    if (item) return item;
    
    const found = findItemRecursive(group.subGroups, id);
    if (found) return found;
  }
  return null;
}

export async function createMenuItem(data: CreateMenuItem): Promise<MenuItem> {
  await delay(200);
  
  const newItem: MenuItem = {
    ...data,
    id: `item-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    modifierGroups: [],
  };
  
  // Add to appropriate group
  if (data.menuGroupId) {
    for (const menu of mockMenus) {
      const group = findGroupRecursive(menu.groups, data.menuGroupId);
      if (group) {
        group.items.push(newItem);
        break;
      }
    }
  }
  
  return newItem;
}

export async function updateMenuItem(id: string, data: UpdateMenuItem): Promise<MenuItem | null> {
  await delay(200);
  
  for (const menu of mockMenus) {
    const item = findItemRecursive(menu.groups, id);
    if (item) {
      Object.assign(item, {
        ...data,
        updatedAt: new Date(),
      });
      return item;
    }
  }
  
  return null;
}

export async function deleteMenuItem(id: string): Promise<boolean> {
  await delay(200);
  
  for (const menu of mockMenus) {
    if (removeItemRecursive(menu.groups, id)) {
      return true;
    }
  }
  
  return false;
}

function removeItemRecursive(groups: MenuGroup[], id: string): boolean {
  for (const group of groups) {
    const index = group.items.findIndex(item => item.id === id);
    if (index !== -1) {
      group.items.splice(index, 1);
      return true;
    }
    
    if (removeItemRecursive(group.subGroups, id)) {
      return true;
    }
  }
  
  return false;
}

// Modifier Groups
export async function getModifierGroups(itemId: string): Promise<ModifierGroup[]> {
  await delay(100);
  
  const item = await getMenuItem(itemId);
  return item?.modifierGroups || [];
}

export async function createModifierGroup(
  itemId: string, 
  data: CreateModifierGroup
): Promise<ModifierGroup> {
  await delay(200);
  
  const newGroup: ModifierGroup = {
    ...data,
    id: `mod-group-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    options: [],
  };
  
  // Add to item
  const item = await getMenuItem(itemId);
  if (item) {
    item.modifierGroups.push(newGroup);
  }
  
  return newGroup;
}

export async function updateModifierGroup(
  id: string, 
  data: UpdateModifierGroup
): Promise<ModifierGroup | null> {
  await delay(200);
  
  for (const menu of mockMenus) {
    const group = findModifierGroupRecursive(menu.groups, id);
    if (group) {
      Object.assign(group, {
        ...data,
        updatedAt: new Date(),
      });
      return group;
    }
  }
  
  return null;
}

function findModifierGroupRecursive(
  menuGroups: MenuGroup[], 
  id: string
): ModifierGroup | null {
  for (const group of menuGroups) {
    for (const item of group.items) {
      const modGroup = item.modifierGroups.find(mg => mg.id === id);
      if (modGroup) return modGroup;
    }
    
    const found = findModifierGroupRecursive(group.subGroups, id);
    if (found) return found;
  }
  return null;
}

export async function deleteModifierGroup(id: string): Promise<boolean> {
  await delay(200);
  
  for (const menu of mockMenus) {
    if (removeModifierGroupRecursive(menu.groups, id)) {
      return true;
    }
  }
  
  return false;
}

function removeModifierGroupRecursive(menuGroups: MenuGroup[], id: string): boolean {
  for (const group of menuGroups) {
    for (const item of group.items) {
      const index = item.modifierGroups.findIndex(mg => mg.id === id);
      if (index !== -1) {
        item.modifierGroups.splice(index, 1);
        return true;
      }
    }
    
    if (removeModifierGroupRecursive(group.subGroups, id)) {
      return true;
    }
  }
  return false;
}

// Modifier Options
export async function createModifierOption(
  groupId: string,
  data: CreateModifierOption
): Promise<ModifierOption> {
  await delay(200);
  
  const newOption: ModifierOption = {
    ...data,
    id: `mod-opt-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  // Add to group
  const group = await getModifierGroup(groupId);
  if (group) {
    group.options.push(newOption);
  }
  
  return newOption;
}

export async function getModifierGroup(id: string): Promise<ModifierGroup | null> {
  await delay(100);
  
  for (const menu of mockMenus) {
    const group = findModifierGroupRecursive(menu.groups, id);
    if (group) return group;
  }
  
  return null;
}

export async function updateModifierOption(
  id: string,
  data: UpdateModifierOption
): Promise<ModifierOption | null> {
  await delay(200);
  
  for (const menu of mockMenus) {
    const option = findModifierOptionRecursive(menu.groups, id);
    if (option) {
      Object.assign(option, {
        ...data,
        updatedAt: new Date(),
      });
      return option;
    }
  }
  
  return null;
}

function findModifierOptionRecursive(
  menuGroups: MenuGroup[], 
  id: string
): ModifierOption | null {
  for (const group of menuGroups) {
    for (const item of group.items) {
      for (const modGroup of item.modifierGroups) {
        const option = modGroup.options.find(opt => opt.id === id);
        if (option) return option;
      }
    }
    
    const found = findModifierOptionRecursive(group.subGroups, id);
    if (found) return found;
  }
  return null;
}

export async function deleteModifierOption(id: string): Promise<boolean> {
  await delay(200);
  
  for (const menu of mockMenus) {
    if (removeModifierOptionRecursive(menu.groups, id)) {
      return true;
    }
  }
  
  return false;
}

function removeModifierOptionRecursive(menuGroups: MenuGroup[], id: string): boolean {
  for (const group of menuGroups) {
    for (const item of group.items) {
      for (const modGroup of item.modifierGroups) {
        const index = modGroup.options.findIndex(opt => opt.id === id);
        if (index !== -1) {
          modGroup.options.splice(index, 1);
          return true;
        }
      }
    }
    
    if (removeModifierOptionRecursive(group.subGroups, id)) {
      return true;
    }
  }
  return false;
}

// Utility functions
export async function getSalesChannels(): Promise<SalesChannel[]> {
  await delay(50);
  return [...sampleChannels];
}

export async function getAllergens(): Promise<Allergen[]> {
  await delay(50);
  return [...sampleAllergens];
}

export async function reorderItems(
  groupId: string, 
  itemIds: string[]
): Promise<boolean> {
  await delay(200);
  
  const group = await getMenuGroup(groupId);
  if (!group) return false;
  
  // Update sort orders based on new position
  group.items.sort((a, b) => {
    const aIndex = itemIds.indexOf(a.id);
    const bIndex = itemIds.indexOf(b.id);
    return aIndex - bIndex;
  });
  
  group.items.forEach((item, index) => {
    item.sortOrder = index + 1;
    item.updatedAt = new Date();
  });
  
  return true;
}

export async function reorderGroups(
  menuId: string, 
  groupIds: string[]
): Promise<boolean> {
  await delay(200);
  
  const menu = await getMenu(menuId);
  if (!menu) return false;
  
  // Update sort orders based on new position
  menu.groups.sort((a, b) => {
    const aIndex = groupIds.indexOf(a.id);
    const bIndex = groupIds.indexOf(b.id);
    return aIndex - bIndex;
  });
  
  menu.groups.forEach((group, index) => {
    group.sortOrder = index + 1;
    group.updatedAt = new Date();
  });
  
  return true;
}

export async function moveItem(
  itemId: string, 
  targetGroupId: string
): Promise<boolean> {
  await delay(200);
  
  // Find and remove item from current location
  let item: MenuItem | null = null;
  for (const menu of mockMenus) {
    if (removeItemRecursive(menu.groups, itemId)) {
      item = await getMenuItem(itemId);
      break;
    }
  }
  
  if (!item) return false;
  
  // Add to new group
  const targetGroup = await getMenuGroup(targetGroupId);
  if (!targetGroup) return false;
  
  item.menuGroupId = targetGroupId;
  item.updatedAt = new Date();
  targetGroup.items.push(item);
  
  return true;
}

// Bulk operations
export async function bulkUpdateItems(
  itemIds: string[],
  updates: Partial<UpdateMenuItem>
): Promise<MenuItem[]> {
  await delay(300);
  
  const updatedItems: MenuItem[] = [];
  
  for (const itemId of itemIds) {
    const item = await updateMenuItem(itemId, updates);
    if (item) {
      updatedItems.push(item);
    }
  }
  
  return updatedItems;
}

export async function bulkDeleteItems(itemIds: string[]): Promise<boolean> {
  await delay(300);
  
  let allDeleted = true;
  
  for (const itemId of itemIds) {
    const deleted = await deleteMenuItem(itemId);
    if (!deleted) {
      allDeleted = false;
    }
  }
  
  return allDeleted;
}