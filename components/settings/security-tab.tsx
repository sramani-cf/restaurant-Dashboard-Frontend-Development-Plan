import { SettingsSection } from './settings-section';
import { SettingsCard } from './settings-card';

export function SecurityTab() {
  return (
    <div className="space-y-8 p-6">
      <SettingsSection
        title="Password Policy"
        description="Configure password requirements and security settings"
      >
        <SettingsCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Password Length
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="6">6 characters</option>
                <option value="8" selected>8 characters</option>
                <option value="10">10 characters</option>
                <option value="12">12 characters</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password Complexity
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="low">Low</option>
                <option value="medium" selected>Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    id="require-uppercase"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="require-uppercase" className="ml-2 block text-sm text-gray-900">
                    Require uppercase letters
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="require-numbers"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="require-numbers" className="ml-2 block text-sm text-gray-900">
                    Require numbers
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="require-special"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="require-special" className="ml-2 block text-sm text-gray-900">
                    Require special characters
                  </label>
                </div>
              </div>
            </div>
          </div>
        </SettingsCard>
      </SettingsSection>

      <SettingsSection
        title="Two-Factor Authentication"
        description="Enhance security with 2FA requirements"
      >
        <SettingsCard>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Require 2FA for all users
                </h3>
                <p className="text-sm text-gray-500">
                  All users must enable two-factor authentication
                </p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
          </div>
        </SettingsCard>
      </SettingsSection>

      <SettingsSection
        title="Session Management"
        description="Configure user session timeouts and limits"
      >
        <SettingsCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                min="5"
                max="480"
                defaultValue="30"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Concurrent Sessions
              </label>
              <input
                type="number"
                min="1"
                max="10"
                defaultValue="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}