import { z } from 'zod';

// Base types for common fields
export const BaseEntitySchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isActive: z.boolean().default(true),
});

// Pricing related types
export const PriceSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  currency: z.string().default('USD'),
  validFrom: z.date().optional(),
  validTo: z.date().optional(),
});

export const PricingStrategySchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['base', 'time_based', 'location_based', 'menu_specific', 'day_of_week']),
  conditions: z.record(z.any()).optional(),
  priority: z.number().default(0),
  prices: z.array(PriceSchema),
});

// Channel visibility types
export const SalesChannelSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['dine_in', 'takeout', 'delivery', 'pos', 'online', 'mobile_app']),
  isActive: z.boolean().default(true),
});

export const ChannelVisibilitySchema = z.object({
  channelId: z.string(),
  isVisible: z.boolean().default(true),
  availableFrom: z.string().optional(), // Time format "HH:mm"
  availableTo: z.string().optional(),   // Time format "HH:mm"
  daysOfWeek: z.array(z.number().min(0).max(6)).optional(), // 0 = Sunday, 6 = Saturday
});

// Nutritional information
export const NutritionalInfoSchema = z.object({
  calories: z.number().optional(),
  protein: z.number().optional(),
  carbohydrates: z.number().optional(),
  fat: z.number().optional(),
  fiber: z.number().optional(),
  sugar: z.number().optional(),
  sodium: z.number().optional(),
  servingSize: z.string().optional(),
  servingUnit: z.string().optional(),
});

// Allergen information
export const AllergenSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
  severity: z.enum(['mild', 'moderate', 'severe']).default('moderate'),
});

// Image/Media types
export const MediaSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  alt: z.string(),
  type: z.enum(['image', 'video']),
  size: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  isPrimary: z.boolean().default(false),
});

// Modifier Option
export const ModifierOptionSchema = BaseEntitySchema.extend({
  name: z.string(),
  description: z.string().optional(),
  price: z.number().default(0),
  pricingStrategies: z.array(PricingStrategySchema).default([]),
  sortOrder: z.number().default(0),
  sku: z.string().optional(),
  isDefault: z.boolean().default(false),
  maxQuantity: z.number().optional(),
  nutritionalInfo: NutritionalInfoSchema.optional(),
  allergens: z.array(z.string()).default([]), // Allergen IDs
  media: z.array(MediaSchema).default([]),
});

// Modifier Group
export const ModifierGroupSchema = BaseEntitySchema.extend({
  name: z.string(),
  description: z.string().optional(),
  isRequired: z.boolean().default(false),
  minSelections: z.number().default(0),
  maxSelections: z.number().optional(),
  sortOrder: z.number().default(0),
  displayType: z.enum(['radio', 'checkbox', 'quantity', 'dropdown']).default('checkbox'),
  options: z.array(ModifierOptionSchema).default([]),
});

// Menu Item
export const MenuItemSchema = BaseEntitySchema.extend({
  name: z.string(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  basePrice: z.number().positive(),
  pricingStrategies: z.array(PricingStrategySchema).default([]),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  sortOrder: z.number().default(0),
  preparationTime: z.number().optional(), // in minutes
  cookingInstructions: z.string().optional(),
  
  // Categorization
  tags: z.array(z.string()).default([]),
  cuisineType: z.string().optional(),
  spiceLevel: z.enum(['none', 'mild', 'medium', 'hot', 'very_hot']).optional(),
  
  // Nutritional and allergen info
  nutritionalInfo: NutritionalInfoSchema.optional(),
  allergens: z.array(z.string()).default([]), // Allergen IDs
  dietaryRestrictions: z.array(z.string()).default([]), // e.g., 'vegetarian', 'vegan', 'gluten-free'
  
  // Media and presentation
  media: z.array(MediaSchema).default([]),
  color: z.string().optional(), // Hex color for visual categorization
  
  // Availability and inventory
  isAvailable: z.boolean().default(true),
  stockQuantity: z.number().optional(),
  lowStockThreshold: z.number().optional(),
  trackInventory: z.boolean().default(false),
  
  // Channel visibility
  channelVisibility: z.array(ChannelVisibilitySchema).default([]),
  
  // Modifiers
  modifierGroups: z.array(ModifierGroupSchema).default([]),
  
  // Relationships
  menuGroupId: z.string().optional(),
  
  // POS Integration
  posId: z.string().optional(),
  posData: z.record(z.any()).optional(),
});

// Menu Group (Categories/Sections)
export const MenuGroupSchema = BaseEntitySchema.extend({
  name: z.string(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  sortOrder: z.number().default(0),
  color: z.string().optional(),
  icon: z.string().optional(),
  media: z.array(MediaSchema).default([]),
  
  // Hierarchy
  parentGroupId: z.string().optional(),
  
  // Availability
  availableFrom: z.string().optional(), // Time format "HH:mm"
  availableTo: z.string().optional(),   // Time format "HH:mm"
  daysOfWeek: z.array(z.number().min(0).max(6)).optional(),
  
  // Channel visibility
  channelVisibility: z.array(ChannelVisibilitySchema).default([]),
  
  // Relationships
  menuId: z.string(),
  items: z.array(MenuItemSchema).default([]),
  subGroups: z.array(z.lazy(() => MenuGroupSchema)).default([]),
});

// Menu
export const MenuSchema = BaseEntitySchema.extend({
  name: z.string(),
  description: z.string().optional(),
  type: z.enum(['main', 'breakfast', 'lunch', 'dinner', 'drinks', 'desserts', 'specials', 'seasonal']),
  sortOrder: z.number().default(0),
  color: z.string().optional(),
  media: z.array(MediaSchema).default([]),
  
  // Availability
  availableFrom: z.string().optional(), // Time format "HH:mm"
  availableTo: z.string().optional(),   // Time format "HH:mm"
  daysOfWeek: z.array(z.number().min(0).max(6)).optional(),
  validFrom: z.date().optional(),
  validTo: z.date().optional(),
  
  // Channel visibility
  channelVisibility: z.array(ChannelVisibilitySchema).default([]),
  
  // Location-specific (for multi-location restaurants)
  locationIds: z.array(z.string()).default([]),
  
  // Content
  groups: z.array(MenuGroupSchema).default([]),
  
  // POS Integration
  posId: z.string().optional(),
  posData: z.record(z.any()).optional(),
});

// Type exports
export type BaseEntity = z.infer<typeof BaseEntitySchema>;
export type Price = z.infer<typeof PriceSchema>;
export type PricingStrategy = z.infer<typeof PricingStrategySchema>;
export type SalesChannel = z.infer<typeof SalesChannelSchema>;
export type ChannelVisibility = z.infer<typeof ChannelVisibilitySchema>;
export type NutritionalInfo = z.infer<typeof NutritionalInfoSchema>;
export type Allergen = z.infer<typeof AllergenSchema>;
export type Media = z.infer<typeof MediaSchema>;
export type ModifierOption = z.infer<typeof ModifierOptionSchema>;
export type ModifierGroup = z.infer<typeof ModifierGroupSchema>;
export type MenuItem = z.infer<typeof MenuItemSchema>;
export type MenuGroup = z.infer<typeof MenuGroupSchema>;
export type Menu = z.infer<typeof MenuSchema>;

// Form schemas for creating/updating
export const CreateMenuSchema = MenuSchema.omit({ id: true, createdAt: true, updatedAt: true, groups: true });
export const UpdateMenuSchema = CreateMenuSchema.partial();

export const CreateMenuGroupSchema = MenuGroupSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true, 
  items: true, 
  subGroups: true 
});
export const UpdateMenuGroupSchema = CreateMenuGroupSchema.partial();

export const CreateMenuItemSchema = MenuItemSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  modifierGroups: true 
});
export const UpdateMenuItemSchema = CreateMenuItemSchema.partial();

export const CreateModifierGroupSchema = ModifierGroupSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  options: true 
});
export const UpdateModifierGroupSchema = CreateModifierGroupSchema.partial();

export const CreateModifierOptionSchema = ModifierOptionSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});
export const UpdateModifierOptionSchema = CreateModifierOptionSchema.partial();

// Form types
export type CreateMenu = z.infer<typeof CreateMenuSchema>;
export type UpdateMenu = z.infer<typeof UpdateMenuSchema>;
export type CreateMenuGroup = z.infer<typeof CreateMenuGroupSchema>;
export type UpdateMenuGroup = z.infer<typeof UpdateMenuGroupSchema>;
export type CreateMenuItem = z.infer<typeof CreateMenuItemSchema>;
export type UpdateMenuItem = z.infer<typeof UpdateMenuItemSchema>;
export type CreateModifierGroup = z.infer<typeof CreateModifierGroupSchema>;
export type UpdateModifierGroup = z.infer<typeof UpdateModifierGroupSchema>;
export type CreateModifierOption = z.infer<typeof CreateModifierOptionSchema>;
export type UpdateModifierOption = z.infer<typeof UpdateModifierOptionSchema>;

// Tree structure types for UI
export interface MenuTreeNode {
  id: string;
  type: 'menu' | 'group' | 'item';
  name: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
  parentId?: string;
  children: MenuTreeNode[];
  data: Menu | MenuGroup | MenuItem;
}

// Filter and search types
export interface MenuFilters {
  search?: string;
  menuId?: string;
  groupId?: string;
  isActive?: boolean;
  isAvailable?: boolean;
  channel?: string;
  priceRange?: [number, number];
  allergens?: string[];
  dietaryRestrictions?: string[];
  tags?: string[];
}

// Sort options
export interface MenuSortOption {
  field: string;
  direction: 'asc' | 'desc';
  label: string;
}

export const MENU_SORT_OPTIONS: MenuSortOption[] = [
  { field: 'name', direction: 'asc', label: 'Name (A-Z)' },
  { field: 'name', direction: 'desc', label: 'Name (Z-A)' },
  { field: 'basePrice', direction: 'asc', label: 'Price (Low to High)' },
  { field: 'basePrice', direction: 'desc', label: 'Price (High to Low)' },
  { field: 'sortOrder', direction: 'asc', label: 'Menu Order' },
  { field: 'createdAt', direction: 'desc', label: 'Recently Added' },
  { field: 'updatedAt', direction: 'desc', label: 'Recently Modified' },
];

// API Response types
export interface MenuResponse {
  data: Menu[];
  total: number;
  page: number;
  limit: number;
}

export interface MenuItemResponse {
  data: MenuItem[];
  total: number;
  page: number;
  limit: number;
}

// Drag and drop types
export interface DragItem {
  id: string;
  type: 'menu' | 'group' | 'item';
  data: Menu | MenuGroup | MenuItem;
}

export interface DropResult {
  draggedId: string;
  targetId: string;
  position: 'before' | 'after' | 'inside';
  type: 'reorder' | 'move';
}