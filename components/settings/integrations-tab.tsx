import { SettingsSection } from './settings-section';
import { SettingsCard } from './settings-card';

export function IntegrationsTab() {
  return (
    <div className="space-y-8 p-6">
      <SettingsSection
        title="Third-party Integrations"
        description="Connect with external services and APIs"
      >
        <SettingsCard>
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Integration Hub</h3>
            <p className="mt-2 text-sm text-gray-500">
              Connect accounting software, delivery platforms, marketing tools, and more.
            </p>
          </div>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}