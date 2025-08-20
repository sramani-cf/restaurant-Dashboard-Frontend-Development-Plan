import { SettingsSection } from './settings-section';
import { SettingsCard } from './settings-card';

export function PaymentsTab() {
  return (
    <div className="space-y-8 p-6">
      <SettingsSection
        title="Payment Gateways"
        description="Configure payment processing and gateway settings"
      >
        <SettingsCard>
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Payment Configuration</h3>
            <p className="mt-2 text-sm text-gray-500">
              Set up Stripe, Square, and other payment gateways for processing transactions.
            </p>
          </div>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}