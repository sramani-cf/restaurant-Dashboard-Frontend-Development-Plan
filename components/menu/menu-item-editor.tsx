'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  Save, 
  Upload, 
  Plus, 
  Minus, 
  Info,
  DollarSign,
  Clock,
  Package,
  Tag,
  AlertTriangle,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { 
  MenuItem, 
  CreateMenuItem, 
  UpdateMenuItem, 
  ModifierGroup,
  SalesChannel,
  Allergen
} from '@/lib/menu/types';
import { formatPrice, deepClone } from '@/lib/menu/utils';
import { ModifierGroupEditor } from './modifier-group-editor';
import { PricingStrategyEditor } from './pricing-strategy-editor';
import { ChannelVisibilityEditor } from './channel-visibility-editor';

interface MenuItemEditorProps {
  item?: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateMenuItem | UpdateMenuItem) => Promise<void>;
  availableChannels?: SalesChannel[];
  availableAllergens?: Allergen[];
  availableGroups?: { id: string; name: string; menuId: string }[];
  loading?: boolean;
  className?: string;
}

export function MenuItemEditor({
  item,
  isOpen,
  onClose,
  onSave,
  availableChannels = [],
  availableAllergens = [],
  availableGroups = [],
  loading = false,
  className,
}: MenuItemEditorProps) {
  const [formData, setFormData] = useState<CreateMenuItem | UpdateMenuItem>({
    name: '',
    description: '',
    basePrice: 0,
    sortOrder: 0,
    isActive: true,
    isAvailable: true,
    pricingStrategies: [],
    tags: [],
    allergens: [],
    dietaryRestrictions: [],
    media: [],
    channelVisibility: [],
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);

  // Initialize form data when item changes
  useEffect(() => {
    if (item) {
      setFormData(deepClone(item));
    } else {
      setFormData({
        name: '',
        description: '',
        basePrice: 0,
        sortOrder: 0,
        isActive: true,
        isAvailable: true,
        pricingStrategies: [],
        tags: [],
        allergens: [],
        dietaryRestrictions: [],
        media: [],
        channelVisibility: [],
      });
    }
    setIsDirty(false);
    setErrors({});
  }, [item]);

  // Handle form field changes
  const handleChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  // Validation
  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.basePrice || formData.basePrice <= 0) {
      newErrors.basePrice = 'Price must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle save
  const handleSave = useCallback(async () => {
    if (!validate()) return;
    
    try {
      await onSave(formData);
      setIsDirty(false);
    } catch (error) {
      console.error('Failed to save item:', error);
    }
  }, [formData, validate, onSave]);

  // Handle close with confirmation
  const handleClose = useCallback(() => {
    if (isDirty) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirmed) return;
    }
    onClose();
  }, [isDirty, onClose]);

  // Tag management
  const addTag = useCallback((tag: string) => {
    if (tag.trim() && !formData.tags?.includes(tag.trim())) {
      handleChange('tags', [...(formData.tags || []), tag.trim()]);
    }
  }, [formData.tags, handleChange]);

  const removeTag = useCallback((tagToRemove: string) => {
    handleChange('tags', formData.tags?.filter(tag => tag !== tagToRemove) || []);
  }, [formData.tags, handleChange]);

  // Allergen management
  const toggleAllergen = useCallback((allergenId: string) => {
    const allergens = formData.allergens || [];
    if (allergens.includes(allergenId)) {
      handleChange('allergens', allergens.filter(id => id !== allergenId));
    } else {
      handleChange('allergens', [...allergens, allergenId]);
    }
  }, [formData.allergens, handleChange]);

  // Dietary restrictions management
  const toggleDietaryRestriction = useCallback((restriction: string) => {
    const restrictions = formData.dietaryRestrictions || [];
    if (restrictions.includes(restriction)) {
      handleChange('dietaryRestrictions', restrictions.filter(r => r !== restriction));
    } else {
      handleChange('dietaryRestrictions', [...restrictions, restriction]);
    }
  }, [formData.dietaryRestrictions, handleChange]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: <Info className="h-4 w-4" /> },
    { id: 'pricing', label: 'Pricing', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'availability', label: 'Availability', icon: <Clock className="h-4 w-4" /> },
    { id: 'inventory', label: 'Inventory', icon: <Package className="h-4 w-4" /> },
    { id: 'modifiers', label: 'Modifiers', icon: <Plus className="h-4 w-4" /> },
    { id: 'allergens', label: 'Allergens', icon: <AlertTriangle className="h-4 w-4" /> },
    { id: 'media', label: 'Media', icon: <Camera className="h-4 w-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={handleClose}
      />
      
      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-semibold">
              {item ? 'Edit Menu Item' : 'Create Menu Item'}
            </h2>
            {item && (
              <p className="text-sm text-gray-500 mt-1">
                ID: {item.id}
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {isDirty && (
              <Badge variant="secondary" className="text-xs">
                Unsaved changes
              </Badge>
            )}
            <Button
              onClick={handleSave}
              disabled={loading}
              size="sm"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            tabs={tabs}
            className="border-b"
          />

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'basic' && (
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Item Name *
                  </label>
                  <Input
                    value={formData.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter item name"
                    error={errors.name}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Enter item description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Short Description
                  </label>
                  <Input
                    value={formData.shortDescription || ''}
                    onChange={(e) => handleChange('shortDescription', e.target.value)}
                    placeholder="Brief description for POS/receipts"
                  />
                </div>

                {/* SKU and Barcode */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      SKU
                    </label>
                    <Input
                      value={formData.sku || ''}
                      onChange={(e) => handleChange('sku', e.target.value)}
                      placeholder="Product SKU"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Barcode
                    </label>
                    <Input
                      value={formData.barcode || ''}
                      onChange={(e) => handleChange('barcode', e.target.value)}
                      placeholder="Barcode"
                    />
                  </div>
                </div>

                {/* Menu Group */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Menu Group
                  </label>
                  <select
                    value={formData.menuGroupId || ''}
                    onChange={(e) => handleChange('menuGroupId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a group</option>
                    {availableGroups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags?.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="px-2 py-1"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add tag"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addTag(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const input = document.querySelector('input[placeholder="Add tag"]') as HTMLInputElement;
                        if (input?.value) {
                          addTag(input.value);
                          input.value = '';
                        }
                      }}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Status toggles */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Active</label>
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) => handleChange('isActive', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Available</label>
                    <Switch
                      checked={formData.isAvailable}
                      onCheckedChange={(checked) => handleChange('isAvailable', checked)}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-6">
                {/* Base Price */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Base Price *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.basePrice || ''}
                      onChange={(e) => handleChange('basePrice', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="pl-10"
                      error={errors.basePrice}
                    />
                  </div>
                </div>

                {/* Pricing Strategies */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Pricing Strategies
                  </label>
                  <PricingStrategyEditor
                    strategies={formData.pricingStrategies || []}
                    onChange={(strategies) => handleChange('pricingStrategies', strategies)}
                  />
                </div>

                {/* Preparation Time */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Preparation Time (minutes)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      min="0"
                      value={formData.preparationTime || ''}
                      onChange={(e) => handleChange('preparationTime', parseInt(e.target.value) || undefined)}
                      placeholder="15"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Cooking Instructions */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Cooking Instructions
                  </label>
                  <textarea
                    value={formData.cookingInstructions || ''}
                    onChange={(e) => handleChange('cookingInstructions', e.target.value)}
                    placeholder="Special cooking instructions"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {activeTab === 'availability' && (
              <div className="space-y-6">
                <ChannelVisibilityEditor
                  channelVisibility={formData.channelVisibility || []}
                  availableChannels={availableChannels}
                  onChange={(visibility) => handleChange('channelVisibility', visibility)}
                />
              </div>
            )}

            {activeTab === 'inventory' && (
              <div className="space-y-6">
                {/* Track Inventory Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Track Inventory</label>
                    <p className="text-xs text-gray-500">Monitor stock levels for this item</p>
                  </div>
                  <Switch
                    checked={formData.trackInventory}
                    onCheckedChange={(checked) => handleChange('trackInventory', checked)}
                  />
                </div>

                {formData.trackInventory && (
                  <>
                    {/* Stock Quantity */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Current Stock
                      </label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.stockQuantity || ''}
                        onChange={(e) => handleChange('stockQuantity', parseInt(e.target.value) || undefined)}
                        placeholder="0"
                      />
                    </div>

                    {/* Low Stock Threshold */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Low Stock Threshold
                      </label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.lowStockThreshold || ''}
                        onChange={(e) => handleChange('lowStockThreshold', parseInt(e.target.value) || undefined)}
                        placeholder="5"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Get notified when stock falls below this level
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'modifiers' && (
              <div className="space-y-6">
                <ModifierGroupEditor
                  modifierGroups={item?.modifierGroups || []}
                  onChange={(groups) => {
                    // This would update the item's modifier groups
                    // For now, just log as this requires more complex state management
                    console.log('Modifier groups updated:', groups);
                  }}
                />
              </div>
            )}

            {activeTab === 'allergens' && (
              <div className="space-y-6">
                {/* Allergens */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Allergens
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableAllergens.map((allergen) => (
                      <div
                        key={allergen.id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={`allergen-${allergen.id}`}
                          checked={formData.allergens?.includes(allergen.id) || false}
                          onChange={() => toggleAllergen(allergen.id)}
                          className="rounded border-gray-300"
                        />
                        <label
                          htmlFor={`allergen-${allergen.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {allergen.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dietary Restrictions */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Dietary Restrictions
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free', 'keto', 'halal', 'kosher'].map((restriction) => (
                      <div
                        key={restriction}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={`restriction-${restriction}`}
                          checked={formData.dietaryRestrictions?.includes(restriction) || false}
                          onChange={() => toggleDietaryRestriction(restriction)}
                          className="rounded border-gray-300"
                        />
                        <label
                          htmlFor={`restriction-${restriction}`}
                          className="text-sm cursor-pointer capitalize"
                        >
                          {restriction.replace('-', ' ')}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spice Level */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Spice Level
                  </label>
                  <select
                    value={formData.spiceLevel || ''}
                    onChange={(e) => handleChange('spiceLevel', e.target.value || undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Not specified</option>
                    <option value="none">No spice</option>
                    <option value="mild">Mild</option>
                    <option value="medium">Medium</option>
                    <option value="hot">Hot</option>
                    <option value="very_hot">Very Hot</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Item Images
                  </label>
                  
                  {/* Image Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Upload Images
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Drag and drop images here, or click to select files
                    </p>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>

                  {/* Existing Images */}
                  {formData.media && formData.media.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {formData.media.map((media, index) => (
                        <div key={index} className="relative">
                          <img
                            src={media.url}
                            alt={media.alt}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-1 right-1 h-6 w-6 p-0"
                            onClick={() => {
                              const newMedia = [...formData.media];
                              newMedia.splice(index, 1);
                              handleChange('media', newMedia);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}