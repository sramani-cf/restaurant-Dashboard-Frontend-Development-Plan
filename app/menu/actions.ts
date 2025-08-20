'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { 
  CreateMenu,
  CreateMenuGroup,
  CreateMenuItem,
  CreateModifierGroup,
  CreateModifierOption,
  UpdateMenu,
  UpdateMenuGroup,
  UpdateMenuItem,
  UpdateModifierGroup,
  UpdateModifierOption,
  MenuFilters
} from '@/lib/menu/types';
import {
  getMenus as getMenusData,
  getMenu as getMenuData,
  createMenu as createMenuData,
  updateMenu as updateMenuData,
  deleteMenu as deleteMenuData,
  getMenuGroups as getMenuGroupsData,
  getMenuGroup as getMenuGroupData,
  createMenuGroup as createMenuGroupData,
  updateMenuGroup as updateMenuGroupData,
  deleteMenuGroup as deleteMenuGroupData,
  getMenuItems as getMenuItemsData,
  getMenuItem as getMenuItemData,
  createMenuItem as createMenuItemData,
  updateMenuItem as updateMenuItemData,
  deleteMenuItem as deleteMenuItemData,
  createModifierGroup as createModifierGroupData,
  updateModifierGroup as updateModifierGroupData,
  deleteModifierGroup as deleteModifierGroupData,
  createModifierOption as createModifierOptionData,
  updateModifierOption as updateModifierOptionData,
  deleteModifierOption as deleteModifierOptionData,
  reorderItems as reorderItemsData,
  reorderGroups as reorderGroupsData,
  moveItem as moveItemData,
  bulkUpdateItems as bulkUpdateItemsData,
  bulkDeleteItems as bulkDeleteItemsData,
} from '@/lib/menu/data';

// Action result types
export type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Menu Actions
export async function getMenusAction(params?: {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}): Promise<ActionResult<any>> {
  try {
    const result = await getMenusData(params);
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to fetch menus:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch menus' 
    };
  }
}

export async function getMenuAction(id: string): Promise<ActionResult<any>> {
  try {
    const menu = await getMenuData(id);
    if (!menu) {
      return { success: false, error: 'Menu not found' };
    }
    return { success: true, data: menu };
  } catch (error) {
    console.error('Failed to fetch menu:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch menu' 
    };
  }
}

export async function createMenuAction(data: CreateMenu): Promise<ActionResult<any>> {
  try {
    const menu = await createMenuData(data);
    revalidatePath('/menu');
    return { success: true, data: menu };
  } catch (error) {
    console.error('Failed to create menu:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create menu' 
    };
  }
}

export async function updateMenuAction(
  id: string, 
  data: UpdateMenu
): Promise<ActionResult<any>> {
  try {
    const menu = await updateMenuData(id, data);
    if (!menu) {
      return { success: false, error: 'Menu not found' };
    }
    revalidatePath('/menu');
    revalidatePath(`/menu/${id}`);
    return { success: true, data: menu };
  } catch (error) {
    console.error('Failed to update menu:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update menu' 
    };
  }
}

export async function deleteMenuAction(id: string): Promise<ActionResult<boolean>> {
  try {
    const success = await deleteMenuData(id);
    if (!success) {
      return { success: false, error: 'Menu not found or could not be deleted' };
    }
    revalidatePath('/menu');
    return { success: true, data: true };
  } catch (error) {
    console.error('Failed to delete menu:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete menu' 
    };
  }
}

// Menu Group Actions
export async function getMenuGroupsAction(menuId: string): Promise<ActionResult<any>> {
  try {
    const groups = await getMenuGroupsData(menuId);
    return { success: true, data: groups };
  } catch (error) {
    console.error('Failed to fetch menu groups:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch menu groups' 
    };
  }
}

export async function getMenuGroupAction(id: string): Promise<ActionResult<any>> {
  try {
    const group = await getMenuGroupData(id);
    if (!group) {
      return { success: false, error: 'Menu group not found' };
    }
    return { success: true, data: group };
  } catch (error) {
    console.error('Failed to fetch menu group:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch menu group' 
    };
  }
}

export async function createMenuGroupAction(
  data: CreateMenuGroup
): Promise<ActionResult<any>> {
  try {
    const group = await createMenuGroupData(data);
    revalidatePath('/menu');
    revalidatePath(`/menu/${data.menuId}`);
    return { success: true, data: group };
  } catch (error) {
    console.error('Failed to create menu group:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create menu group' 
    };
  }
}

export async function updateMenuGroupAction(
  id: string,
  data: UpdateMenuGroup
): Promise<ActionResult<any>> {
  try {
    const group = await updateMenuGroupData(id, data);
    if (!group) {
      return { success: false, error: 'Menu group not found' };
    }
    revalidatePath('/menu');
    return { success: true, data: group };
  } catch (error) {
    console.error('Failed to update menu group:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update menu group' 
    };
  }
}

export async function deleteMenuGroupAction(id: string): Promise<ActionResult<boolean>> {
  try {
    const success = await deleteMenuGroupData(id);
    if (!success) {
      return { success: false, error: 'Menu group not found or could not be deleted' };
    }
    revalidatePath('/menu');
    return { success: true, data: true };
  } catch (error) {
    console.error('Failed to delete menu group:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete menu group' 
    };
  }
}

// Menu Item Actions
export async function getMenuItemsAction(params?: {
  page?: number;
  limit?: number;
  menuId?: string;
  groupId?: string;
  filters?: MenuFilters;
}): Promise<ActionResult<any>> {
  try {
    const result = await getMenuItemsData(params);
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to fetch menu items:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch menu items' 
    };
  }
}

export async function getMenuItemAction(id: string): Promise<ActionResult<any>> {
  try {
    const item = await getMenuItemData(id);
    if (!item) {
      return { success: false, error: 'Menu item not found' };
    }
    return { success: true, data: item };
  } catch (error) {
    console.error('Failed to fetch menu item:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch menu item' 
    };
  }
}

export async function createMenuItemAction(
  data: CreateMenuItem
): Promise<ActionResult<any>> {
  try {
    const item = await createMenuItemData(data);
    revalidatePath('/menu');
    return { success: true, data: item };
  } catch (error) {
    console.error('Failed to create menu item:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create menu item' 
    };
  }
}

export async function updateMenuItemAction(
  id: string,
  data: UpdateMenuItem
): Promise<ActionResult<any>> {
  try {
    const item = await updateMenuItemData(id, data);
    if (!item) {
      return { success: false, error: 'Menu item not found' };
    }
    revalidatePath('/menu');
    return { success: true, data: item };
  } catch (error) {
    console.error('Failed to update menu item:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update menu item' 
    };
  }
}

export async function deleteMenuItemAction(id: string): Promise<ActionResult<boolean>> {
  try {
    const success = await deleteMenuItemData(id);
    if (!success) {
      return { success: false, error: 'Menu item not found or could not be deleted' };
    }
    revalidatePath('/menu');
    return { success: true, data: true };
  } catch (error) {
    console.error('Failed to delete menu item:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete menu item' 
    };
  }
}

// Modifier Actions
export async function createModifierGroupAction(
  itemId: string,
  data: CreateModifierGroup
): Promise<ActionResult<any>> {
  try {
    const group = await createModifierGroupData(itemId, data);
    revalidatePath('/menu');
    return { success: true, data: group };
  } catch (error) {
    console.error('Failed to create modifier group:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create modifier group' 
    };
  }
}

export async function updateModifierGroupAction(
  id: string,
  data: UpdateModifierGroup
): Promise<ActionResult<any>> {
  try {
    const group = await updateModifierGroupData(id, data);
    if (!group) {
      return { success: false, error: 'Modifier group not found' };
    }
    revalidatePath('/menu');
    return { success: true, data: group };
  } catch (error) {
    console.error('Failed to update modifier group:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update modifier group' 
    };
  }
}

export async function deleteModifierGroupAction(id: string): Promise<ActionResult<boolean>> {
  try {
    const success = await deleteModifierGroupData(id);
    if (!success) {
      return { success: false, error: 'Modifier group not found or could not be deleted' };
    }
    revalidatePath('/menu');
    return { success: true, data: true };
  } catch (error) {
    console.error('Failed to delete modifier group:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete modifier group' 
    };
  }
}

export async function createModifierOptionAction(
  groupId: string,
  data: CreateModifierOption
): Promise<ActionResult<any>> {
  try {
    const option = await createModifierOptionData(groupId, data);
    revalidatePath('/menu');
    return { success: true, data: option };
  } catch (error) {
    console.error('Failed to create modifier option:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create modifier option' 
    };
  }
}

export async function updateModifierOptionAction(
  id: string,
  data: UpdateModifierOption
): Promise<ActionResult<any>> {
  try {
    const option = await updateModifierOptionData(id, data);
    if (!option) {
      return { success: false, error: 'Modifier option not found' };
    }
    revalidatePath('/menu');
    return { success: true, data: option };
  } catch (error) {
    console.error('Failed to update modifier option:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update modifier option' 
    };
  }
}

export async function deleteModifierOptionAction(id: string): Promise<ActionResult<boolean>> {
  try {
    const success = await deleteModifierOptionData(id);
    if (!success) {
      return { success: false, error: 'Modifier option not found or could not be deleted' };
    }
    revalidatePath('/menu');
    return { success: true, data: true };
  } catch (error) {
    console.error('Failed to delete modifier option:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete modifier option' 
    };
  }
}

// Drag and Drop Actions
export async function reorderItemsAction(
  groupId: string,
  itemIds: string[]
): Promise<ActionResult<boolean>> {
  try {
    const success = await reorderItemsData(groupId, itemIds);
    if (!success) {
      return { success: false, error: 'Failed to reorder items' };
    }
    revalidatePath('/menu');
    return { success: true, data: true };
  } catch (error) {
    console.error('Failed to reorder items:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to reorder items' 
    };
  }
}

export async function reorderGroupsAction(
  menuId: string,
  groupIds: string[]
): Promise<ActionResult<boolean>> {
  try {
    const success = await reorderGroupsData(menuId, groupIds);
    if (!success) {
      return { success: false, error: 'Failed to reorder groups' };
    }
    revalidatePath('/menu');
    return { success: true, data: true };
  } catch (error) {
    console.error('Failed to reorder groups:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to reorder groups' 
    };
  }
}

export async function moveItemAction(
  itemId: string,
  targetGroupId: string
): Promise<ActionResult<boolean>> {
  try {
    const success = await moveItemData(itemId, targetGroupId);
    if (!success) {
      return { success: false, error: 'Failed to move item' };
    }
    revalidatePath('/menu');
    return { success: true, data: true };
  } catch (error) {
    console.error('Failed to move item:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to move item' 
    };
  }
}

// Bulk Actions
export async function bulkUpdateItemsAction(
  itemIds: string[],
  updates: Partial<UpdateMenuItem>
): Promise<ActionResult<any>> {
  try {
    const items = await bulkUpdateItemsData(itemIds, updates);
    revalidatePath('/menu');
    return { success: true, data: items };
  } catch (error) {
    console.error('Failed to bulk update items:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to bulk update items' 
    };
  }
}

export async function bulkDeleteItemsAction(
  itemIds: string[]
): Promise<ActionResult<boolean>> {
  try {
    const success = await bulkDeleteItemsData(itemIds);
    if (!success) {
      return { success: false, error: 'Failed to delete some items' };
    }
    revalidatePath('/menu');
    return { success: true, data: true };
  } catch (error) {
    console.error('Failed to bulk delete items:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to bulk delete items' 
    };
  }
}

// Form Actions (for form submissions with automatic redirect)
export async function createMenuFormAction(formData: FormData) {
  try {
    const data: CreateMenu = {
      name: formData.get('name') as string,
      description: formData.get('description') as string || undefined,
      type: formData.get('type') as any,
      sortOrder: parseInt(formData.get('sortOrder') as string) || 0,
      isActive: formData.get('isActive') === 'true',
      media: [],
      channelVisibility: [],
      locationIds: [],
    };

    const result = await createMenuAction(data);
    
    if (result.success && result.data) {
      redirect(`/menu/${result.data.id}`);
    } else {
      throw new Error(result.error || 'Failed to create menu');
    }
  } catch (error) {
    console.error('Form action error:', error);
    throw error;
  }
}

export async function updateMenuFormAction(id: string, formData: FormData) {
  try {
    const data: UpdateMenu = {
      name: formData.get('name') as string,
      description: formData.get('description') as string || undefined,
      type: formData.get('type') as any,
      sortOrder: parseInt(formData.get('sortOrder') as string) || 0,
      isActive: formData.get('isActive') === 'true',
    };

    const result = await updateMenuAction(id, data);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to update menu');
    }

    redirect(`/menu/${id}`);
  } catch (error) {
    console.error('Form action error:', error);
    throw error;
  }
}

export async function createMenuGroupFormAction(formData: FormData) {
  try {
    const data: CreateMenuGroup = {
      name: formData.get('name') as string,
      description: formData.get('description') as string || undefined,
      sortOrder: parseInt(formData.get('sortOrder') as string) || 0,
      isActive: formData.get('isActive') === 'true',
      menuId: formData.get('menuId') as string,
      parentGroupId: formData.get('parentGroupId') as string || undefined,
      media: [],
      channelVisibility: [],
    };

    const result = await createMenuGroupAction(data);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to create menu group');
    }

    redirect(`/menu/${data.menuId}`);
  } catch (error) {
    console.error('Form action error:', error);
    throw error;
  }
}

export async function createMenuItemFormAction(formData: FormData) {
  try {
    const data: CreateMenuItem = {
      name: formData.get('name') as string,
      description: formData.get('description') as string || undefined,
      basePrice: parseFloat(formData.get('basePrice') as string),
      sortOrder: parseInt(formData.get('sortOrder') as string) || 0,
      isActive: formData.get('isActive') === 'true',
      isAvailable: formData.get('isAvailable') === 'true',
      menuGroupId: formData.get('menuGroupId') as string || undefined,
      pricingStrategies: [],
      tags: [],
      allergens: [],
      dietaryRestrictions: [],
      media: [],
      channelVisibility: [],
    };

    const result = await createMenuItemAction(data);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to create menu item');
    }

    revalidatePath('/menu');
  } catch (error) {
    console.error('Form action error:', error);
    throw error;
  }
}