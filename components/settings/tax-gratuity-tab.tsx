import { SettingsSection } from './settings-section';
import { SettingsCard } from './settings-card';

export function TaxGratuityTab() {
  return (
    <div className="space-y-8 p-6">
      <SettingsSection
        title="Tax Configuration"
        description="Configure tax rules and calculations"
      >
        <SettingsCard>
          <div className="text-center py-8">
            <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008V18H8.25v-.008zM12 9l3-3m0 0l-3-3m3 3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-base font-medium text-gray-900">Tax Rules</h3>
            <p className="mt-2 text-sm text-gray-500">
              Set up sales tax, VAT, and other tax configurations.
            </p>
          </div>
        </SettingsCard>
      </SettingsSection>

      <SettingsSection
        title="Gratuity & Tips"
        description="Configure tip suggestions and distribution rules"
      >
        <SettingsCard>
          <div className="text-center py-8">
            <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-base font-medium text-gray-900">Tip Configuration</h3>
            <p className="mt-2 text-sm text-gray-500">
              Configure tip percentages, auto-gratuity, and tip pooling.
            </p>
          </div>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}