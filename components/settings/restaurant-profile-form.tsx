'use client';

import { useState, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SettingsForm } from './settings-form';
import { updateRestaurantProfileAction } from '../../app/settings/actions';
import type { RestaurantProfile } from '../../lib/settings/types';

interface RestaurantProfileFormProps {
  profile: RestaurantProfile;
}

const initialState = {
  success: false,
  message: '',
  errors: {}
};

export function RestaurantProfileForm({ profile }: RestaurantProfileFormProps) {
  const [state, formAction] = useFormState(updateRestaurantProfileAction, initialState);
  const [isPending, startTransition] = useTransition();
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(profile.cuisine || []);

  const cuisineOptions = [
    'American', 'Italian', 'Mexican', 'Chinese', 'Japanese', 'Thai', 'Indian',
    'French', 'Mediterranean', 'Greek', 'Korean', 'Vietnamese', 'Spanish',
    'BBQ', 'Seafood', 'Steakhouse', 'Pizza', 'Fast Food', 'Fine Dining',
    'Cafe', 'Bakery', 'Dessert', 'Vegetarian', 'Vegan', 'Organic'
  ];

  const handleCuisineToggle = (cuisine: string) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const handleSubmit = (formData: FormData) => {
    // Add selected cuisines to form data
    selectedCuisines.forEach(cuisine => {
      formData.append('cuisine', cuisine);
    });
    
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <SettingsForm
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleSubmit(formData);
      }}
      isSubmitting={isPending}
      isDirty={true}
      errors={state.errors}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Restaurant Name */}
        <div className="lg:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Restaurant Name *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={profile.name}
            placeholder="Enter restaurant name"
            className="w-full"
          />
          {state.errors?.name && (
            <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>
          )}
        </div>

        {/* Description */}
        <div className="lg:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={profile.description}
            placeholder="Brief description of your restaurant"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {state.errors?.description && (
            <p className="mt-1 text-sm text-red-600">{state.errors.description[0]}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={profile.email}
            placeholder="contact@restaurant.com"
          />
          {state.errors?.email && (
            <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            defaultValue={profile.phone}
            placeholder="(555) 123-4567"
          />
          {state.errors?.phone && (
            <p className="mt-1 text-sm text-red-600">{state.errors.phone[0]}</p>
          )}
        </div>

        {/* Website */}
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <Input
            id="website"
            name="website"
            type="url"
            defaultValue={profile.website}
            placeholder="https://www.restaurant.com"
          />
          {state.errors?.website && (
            <p className="mt-1 text-sm text-red-600">{state.errors.website[0]}</p>
          )}
        </div>
      </div>

      {/* Cuisine Types */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Cuisine Types *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {cuisineOptions.map((cuisine) => (
            <label
              key={cuisine}
              className="relative flex items-center p-3 cursor-pointer rounded-lg border border-gray-300 bg-white shadow-sm hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500"
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={selectedCuisines.includes(cuisine)}
                onChange={() => handleCuisineToggle(cuisine)}
              />
              <span className={`text-sm font-medium ${
                selectedCuisines.includes(cuisine)
                  ? 'text-blue-900 bg-blue-50 border-blue-200'
                  : 'text-gray-900'
              } transition-colors rounded-md px-2 py-1 border w-full text-center`}>
                {cuisine}
              </span>
            </label>
          ))}
        </div>
        {selectedCuisines.length === 0 && state.errors?.cuisine && (
          <p className="mt-2 text-sm text-red-600">At least one cuisine type is required</p>
        )}
      </div>

      {/* Social Media Links */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-2">
              Facebook Page
            </label>
            <Input
              id="facebook"
              name="facebook"
              type="url"
              defaultValue={profile.socialMedia?.facebook}
              placeholder="https://facebook.com/yourrestaurant"
            />
          </div>

          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
              Instagram Handle
            </label>
            <Input
              id="instagram"
              name="instagram"
              type="text"
              defaultValue={profile.socialMedia?.instagram}
              placeholder="@yourrestaurant"
            />
          </div>

          <div>
            <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-2">
              Twitter Handle
            </label>
            <Input
              id="twitter"
              name="twitter"
              type="text"
              defaultValue={profile.socialMedia?.twitter}
              placeholder="@yourrestaurant"
            />
          </div>

          <div>
            <label htmlFor="yelp" className="block text-sm font-medium text-gray-700 mb-2">
              Yelp Page
            </label>
            <Input
              id="yelp"
              name="yelp"
              type="url"
              defaultValue={profile.socialMedia?.yelp}
              placeholder="https://yelp.com/biz/your-restaurant"
            />
          </div>
        </div>
      </div>

      {/* Success Message */}
      {state.success && (
        <div className="rounded-md bg-green-50 p-4 border border-green-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                {state.message || 'Restaurant profile updated successfully!'}
              </p>
            </div>
          </div>
        </div>
      )}
    </SettingsForm>
  );
}