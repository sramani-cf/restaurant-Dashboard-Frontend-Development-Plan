'use client';

import { useState, useCallback } from 'react';
import { 
  Plus, 
  Minus, 
  Edit, 
  Trash2, 
  GripVertical,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { ModifierGroup, ModifierOption, CreateModifierGroup, CreateModifierOption } from '@/lib/menu/types';
import { formatPrice } from '@/lib/menu/utils';

interface ModifierGroupEditorProps {
  modifierGroups: ModifierGroup[];
  onChange: (groups: ModifierGroup[]) => void;
  className?: string;
}

export function ModifierGroupEditor({
  modifierGroups,
  onChange,
  className,
}: ModifierGroupEditorProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [editingGroup, setEditingGroup] = useState<string | null>(null);
  const [editingOption, setEditingOption] = useState<string | null>(null);

  // Toggle group expansion
  const toggleGroup = useCallback((groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  }, []);

  // Add new modifier group
  const addGroup = useCallback(() => {
    const newGroup: ModifierGroup = {
      id: `temp-group-${Date.now()}`,
      name: 'New Modifier Group',
      description: '',
      isRequired: false,
      minSelections: 0,
      maxSelections: 1,
      sortOrder: modifierGroups.length,
      displayType: 'checkbox',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      options: [],
    };
    
    onChange([...modifierGroups, newGroup]);
    setExpandedGroups(prev => [...prev, newGroup.id]);
    setEditingGroup(newGroup.id);
  }, [modifierGroups, onChange]);

  // Update modifier group
  const updateGroup = useCallback((groupId: string, updates: Partial<ModifierGroup>) => {
    const updatedGroups = modifierGroups.map(group =>
      group.id === groupId ? { ...group, ...updates, updatedAt: new Date() } : group
    );
    onChange(updatedGroups);
  }, [modifierGroups, onChange]);

  // Delete modifier group
  const deleteGroup = useCallback((groupId: string) => {
    if (window.confirm('Are you sure you want to delete this modifier group?')) {
      onChange(modifierGroups.filter(group => group.id !== groupId));
      setExpandedGroups(prev => prev.filter(id => id !== groupId));
    }
  }, [modifierGroups, onChange]);

  // Add modifier option
  const addOption = useCallback((groupId: string) => {
    const group = modifierGroups.find(g => g.id === groupId);
    if (!group) return;

    const newOption: ModifierOption = {
      id: `temp-option-${Date.now()}`,
      name: 'New Option',
      description: '',
      price: 0,
      sortOrder: group.options.length,
      isDefault: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      pricingStrategies: [],
      allergens: [],
      media: [],
    };

    updateGroup(groupId, {
      options: [...group.options, newOption],
    });

    setEditingOption(newOption.id);
  }, [modifierGroups, updateGroup]);

  // Update modifier option
  const updateOption = useCallback((groupId: string, optionId: string, updates: Partial<ModifierOption>) => {
    const group = modifierGroups.find(g => g.id === groupId);
    if (!group) return;

    const updatedOptions = group.options.map(option =>
      option.id === optionId ? { ...option, ...updates, updatedAt: new Date() } : option
    );

    updateGroup(groupId, { options: updatedOptions });
  }, [modifierGroups, updateGroup]);

  // Delete modifier option
  const deleteOption = useCallback((groupId: string, optionId: string) => {
    if (window.confirm('Are you sure you want to delete this modifier option?')) {
      const group = modifierGroups.find(g => g.id === groupId);
      if (!group) return;

      updateGroup(groupId, {
        options: group.options.filter(option => option.id !== optionId),
      });
    }
  }, [modifierGroups, updateGroup]);

  // Reorder groups
  const reorderGroups = useCallback((fromIndex: number, toIndex: number) => {
    const newGroups = [...modifierGroups];
    const [movedGroup] = newGroups.splice(fromIndex, 1);
    newGroups.splice(toIndex, 0, movedGroup);
    
    // Update sort orders
    newGroups.forEach((group, index) => {
      group.sortOrder = index;
    });
    
    onChange(newGroups);
  }, [modifierGroups, onChange]);

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Modifier Groups</h3>
        <Button size="sm" onClick={addGroup}>
          <Plus className="h-4 w-4 mr-2" />
          Add Group
        </Button>
      </div>

      {modifierGroups.length === 0 ? (
        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="mb-2">No modifier groups added yet</p>
          <Button variant="outline" onClick={addGroup}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Group
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {modifierGroups.map((group, groupIndex) => (
            <Card key={group.id} className="p-4">
              {/* Group Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 flex-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => toggleGroup(group.id)}
                  >
                    {expandedGroups.includes(group.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                  
                  {editingGroup === group.id ? (
                    <Input
                      value={group.name}
                      onChange={(e) => updateGroup(group.id, { name: e.target.value })}
                      onBlur={() => setEditingGroup(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') setEditingGroup(null);
                      }}
                      className="h-7 text-sm font-medium"
                      autoFocus
                    />
                  ) : (
                    <h4 
                      className="font-medium cursor-pointer hover:text-blue-600"
                      onClick={() => setEditingGroup(group.id)}
                    >
                      {group.name}
                    </h4>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    {group.isRequired && (
                      <Badge variant="default" className="text-xs">Required</Badge>
                    )}
                    <Badge variant="secondary" className="text-xs">
                      {group.options.length} option{group.options.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Switch
                    size="sm"
                    checked={group.isActive}
                    onCheckedChange={(checked) => updateGroup(group.id, { isActive: checked })}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => deleteGroup(group.id)}
                  >
                    <Trash2 className="h-3 w-3 text-red-600" />
                  </Button>
                </div>
              </div>

              {/* Group Details (when expanded) */}
              {expandedGroups.includes(group.id) && (
                <div className="space-y-4 border-t pt-4">
                  {/* Group Settings */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <Input
                        value={group.description || ''}
                        onChange={(e) => updateGroup(group.id, { description: e.target.value })}
                        placeholder="Optional description"
                        className="h-8 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Display Type</label>
                      <select
                        value={group.displayType}
                        onChange={(e) => updateGroup(group.id, { displayType: e.target.value as any })}
                        className="w-full h-8 px-2 text-sm border border-gray-300 rounded-md"
                      >
                        <option value="radio">Radio Buttons</option>
                        <option value="checkbox">Checkboxes</option>
                        <option value="dropdown">Dropdown</option>
                        <option value="quantity">Quantity</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        size="sm"
                        checked={group.isRequired}
                        onCheckedChange={(checked) => updateGroup(group.id, { isRequired: checked })}
                      />
                      <label className="text-sm">Required</label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Min Selections</label>
                      <Input
                        type="number"
                        min="0"
                        value={group.minSelections}
                        onChange={(e) => updateGroup(group.id, { minSelections: parseInt(e.target.value) || 0 })}
                        className="h-8 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Max Selections</label>
                      <Input
                        type="number"
                        min="0"
                        value={group.maxSelections || ''}
                        onChange={(e) => updateGroup(group.id, { maxSelections: parseInt(e.target.value) || undefined })}
                        placeholder="Unlimited"
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>

                  {/* Options */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium">Options</h5>
                      <Button size="sm" onClick={() => addOption(group.id)}>
                        <Plus className="h-3 w-3 mr-1" />
                        Add Option
                      </Button>
                    </div>
                    
                    {group.options.length === 0 ? (
                      <div className="text-center py-4 text-gray-500 border border-dashed border-gray-200 rounded">
                        No options added yet
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {group.options.map((option, optionIndex) => (
                          <div
                            key={option.id}
                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded border"
                          >
                            <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                            
                            <div className="flex-1 grid grid-cols-3 gap-3">
                              <div>
                                {editingOption === option.id ? (
                                  <Input
                                    value={option.name}
                                    onChange={(e) => updateOption(group.id, option.id, { name: e.target.value })}
                                    onBlur={() => setEditingOption(null)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') setEditingOption(null);
                                    }}
                                    className="h-7 text-sm"
                                    autoFocus
                                  />
                                ) : (
                                  <div
                                    className="text-sm font-medium cursor-pointer hover:text-blue-600"
                                    onClick={() => setEditingOption(option.id)}
                                  >
                                    {option.name}
                                  </div>
                                )}
                              </div>
                              
                              <div className="relative">
                                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">$</span>
                                <Input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  value={option.price}
                                  onChange={(e) => updateOption(group.id, option.id, { price: parseFloat(e.target.value) || 0 })}
                                  className="h-7 text-sm pl-6"
                                  placeholder="0.00"
                                />
                              </div>
                              
                              <Input
                                value={option.description || ''}
                                onChange={(e) => updateOption(group.id, option.id, { description: e.target.value })}
                                placeholder="Optional description"
                                className="h-7 text-sm"
                              />
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                <input
                                  type="checkbox"
                                  checked={option.isDefault}
                                  onChange={(e) => updateOption(group.id, option.id, { isDefault: e.target.checked })}
                                  className="rounded text-xs"
                                />
                                <label className="text-xs text-gray-600">Default</label>
                              </div>
                              
                              <Switch
                                size="sm"
                                checked={option.isActive}
                                onCheckedChange={(checked) => updateOption(group.id, option.id, { isActive: checked })}
                              />
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => deleteOption(group.id, option.id)}
                              >
                                <Trash2 className="h-3 w-3 text-red-600" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}