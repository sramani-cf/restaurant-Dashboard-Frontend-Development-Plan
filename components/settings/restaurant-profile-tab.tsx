import { Suspense } from 'react';
import { getRestaurantProfile } from '../../lib/settings/data';
import { RestaurantProfileForm } from './restaurant-profile-form';
import { LocationManager } from './location-manager';
import { OperatingHoursForm } from './operating-hours-form';
import { BrandingSettings } from './branding-settings';
import { SettingsSection } from './settings-section';
import { SettingsCard } from './settings-card';
import { Skeleton } from '../ui/skeleton';

function ProfileFormSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}

export async function RestaurantProfileTab() {
  const profile = await getRestaurantProfile();

  if (!profile) {
    return (
      <div className="p-6">
        <SettingsCard
          title="Restaurant Profile"
          description="Set up your restaurant's basic information and branding"
          variant="warning"
        >
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-amber-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-amber-900">
              Restaurant Profile Not Found
            </h3>
            <p className="mt-2 text-sm text-amber-700">
              Please set up your restaurant profile to continue.
            </p>
          </div>
        </SettingsCard>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Basic Information */}
      <SettingsSection
        title="Basic Information"
        description="Core details about your restaurant"
      >
        <SettingsCard>
          <Suspense fallback={<ProfileFormSkeleton />}>
            <RestaurantProfileForm profile={profile} />
          </Suspense>
        </SettingsCard>
      </SettingsSection>

      {/* Locations */}
      <SettingsSection
        title="Locations"
        description="Manage your restaurant locations and their details"
      >
        <SettingsCard>
          <Suspense fallback={<ProfileFormSkeleton />}>
            <LocationManager locations={profile.locations} />
          </Suspense>
        </SettingsCard>
      </SettingsSection>

      {/* Operating Hours */}
      <SettingsSection
        title="Operating Hours"
        description="Set your restaurant's hours of operation"
      >
        <SettingsCard>
          <Suspense fallback={<ProfileFormSkeleton />}>
            <OperatingHoursForm 
              operatingHours={profile.operatingHours}
              restaurantId={profile.id}
            />
          </Suspense>
        </SettingsCard>
      </SettingsSection>

      {/* Branding */}
      <SettingsSection
        title="Branding & Theme"
        description="Customize your restaurant's visual identity"
      >
        <SettingsCard>
          <Suspense fallback={<ProfileFormSkeleton />}>
            <BrandingSettings 
              branding={profile.branding}
              socialMedia={profile.socialMedia}
              restaurantId={profile.id}
            />
          </Suspense>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}