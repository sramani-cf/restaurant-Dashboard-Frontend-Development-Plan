'use client';

import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import type { BrandingSettings as BrandingType, SocialMediaLinks } from '../../lib/settings/types';

interface BrandingSettingsProps {
  branding: BrandingType;
  socialMedia: SocialMediaLinks;
  restaurantId: string;
}

export function BrandingSettings({ branding, socialMedia, restaurantId }: BrandingSettingsProps) {
  const [colors, setColors] = useState(branding);
  const [social, setSocial] = useState(socialMedia);

  return (
    <div className="space-y-8">
      {/* Brand Colors */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Brand Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colors.primaryColor}
                onChange={(e) => setColors(prev => ({ ...prev, primaryColor: e.target.value }))}
                className="h-10 w-20 rounded border border-gray-300"
              />
              <Input
                value={colors.primaryColor}
                onChange={(e) => setColors(prev => ({ ...prev, primaryColor: e.target.value }))}
                placeholder="#000000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colors.secondaryColor}
                onChange={(e) => setColors(prev => ({ ...prev, secondaryColor: e.target.value }))}
                className="h-10 w-20 rounded border border-gray-300"
              />
              <Input
                value={colors.secondaryColor}
                onChange={(e) => setColors(prev => ({ ...prev, secondaryColor: e.target.value }))}
                placeholder="#000000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Accent Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colors.accentColor}
                onChange={(e) => setColors(prev => ({ ...prev, accentColor: e.target.value }))}
                className="h-10 w-20 rounded border border-gray-300"
              />
              <Input
                value={colors.accentColor}
                onChange={(e) => setColors(prev => ({ ...prev, accentColor: e.target.value }))}
                placeholder="#000000"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Theme Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <select
              value={colors.theme}
              onChange={(e) => setColors(prev => ({ ...prev, theme: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Family
            </label>
            <select
              value={colors.fontFamily}
              onChange={(e) => setColors(prev => ({ ...prev, fontFamily: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Lato">Lato</option>
              <option value="Montserrat">Montserrat</option>
            </select>
          </div>
        </div>
      </div>

      {/* Logo Settings */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Logo & Assets</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo Style
            </label>
            <div className="flex gap-4">
              {['light', 'dark', 'color'].map((style) => (
                <label key={style} className="flex items-center">
                  <input
                    type="radio"
                    name="logoStyle"
                    value={style}
                    checked={colors.logoStyle === style}
                    onChange={(e) => setColors(prev => ({ ...prev, logoStyle: e.target.value as any }))}
                    className="mr-2"
                  />
                  <span className="capitalize">{style}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Logo
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <Button variant="outline">
          Reset to Default
        </Button>
        <Button>
          Save Branding
        </Button>
      </div>
    </div>
  );
}