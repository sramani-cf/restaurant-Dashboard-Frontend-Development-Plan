'use client';

import { useState, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { exportSettingsAction, importSettingsAction } from '../../app/settings/actions';

interface ImportExportControlsProps {
  onClose?: () => void;
}

const initialState = {
  success: false,
  message: '',
  errors: {}
};

export function ImportExportControls({ onClose }: ImportExportControlsProps) {
  const [exportState, exportAction] = useFormState(exportSettingsAction, initialState);
  const [importState, importAction] = useFormState(importSettingsAction, initialState);
  const [isExporting, startExportTransition] = useTransition();
  const [isImporting, startImportTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');

  const settingSections = [
    { id: 'restaurant', label: 'Restaurant Profile', description: 'Basic restaurant information and branding' },
    { id: 'users', label: 'Users & Roles', description: 'User accounts and role definitions' },
    { id: 'devices', label: 'Devices', description: 'POS terminals and hardware configuration' },
    { id: 'payments', label: 'Payment Configuration', description: 'Payment gateways and processing settings' },
    { id: 'integrations', label: 'Integrations', description: 'Third-party service connections' },
    { id: 'taxes', label: 'Tax Configuration', description: 'Tax rules and calculations' },
    { id: 'gratuity', label: 'Gratuity Settings', description: 'Tip configuration and distribution' },
    { id: 'security', label: 'Security Settings', description: 'Access control and data protection' }
  ];

  const handleExport = (formData: FormData) => {
    startExportTransition(() => {
      exportAction(formData);
    });
  };

  const handleImport = (formData: FormData) => {
    startImportTransition(() => {
      importAction(formData);
    });
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('export')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'export'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Export Settings
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'import'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Import Settings
          </button>
        </nav>
      </div>

      {/* Export Tab */}
      {activeTab === 'export' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Export Settings</h3>
            <p className="mt-1 text-sm text-gray-500">
              Download your restaurant settings as a backup file.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleExport(formData);
            }}
            className="space-y-6"
          >
            {/* Section Selection */}
            <div>
              <label className="text-base font-medium text-gray-900">
                Select sections to export
              </label>
              <p className="text-sm text-gray-500">Choose which settings to include in the export.</p>
              <div className="mt-3 space-y-2">
                {settingSections.map((section) => (
                  <div key={section.id} className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id={`export-${section.id}`}
                        name="sections"
                        value={section.id}
                        type="checkbox"
                        defaultChecked
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={`export-${section.id}`} className="font-medium text-gray-700">
                        {section.label}
                      </label>
                      <p className="text-gray-500">{section.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div>
              <label className="text-base font-medium text-gray-900">
                Export options
              </label>
              <div className="mt-3 space-y-3">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="includeCredentials"
                      name="includeCredentials"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="includeCredentials" className="font-medium text-gray-700">
                      Include sensitive credentials
                    </label>
                    <p className="text-gray-500">Export API keys, passwords, and other sensitive data</p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="encryptSensitiveData"
                      name="encryptSensitiveData"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="encryptSensitiveData" className="font-medium text-gray-700">
                      Encrypt sensitive data
                    </label>
                    <p className="text-gray-500">Protect sensitive information with encryption</p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="compression"
                      name="compression"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="compression" className="font-medium text-gray-700">
                      Compress export file
                    </label>
                    <p className="text-gray-500">Reduce file size with compression</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Format Selection */}
            <div>
              <label htmlFor="format" className="block text-sm font-medium text-gray-700">
                Export format
              </label>
              <select
                id="format"
                name="format"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              >
                <option value="json">JSON (recommended)</option>
                <option value="yaml">YAML</option>
                <option value="csv">CSV (limited)</option>
              </select>
            </div>

            {/* Export Results */}
            {exportState.success && exportState.data?.downloadUrl && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Export completed</h3>
                    <div className="mt-2">
                      <Button
                        as="a"
                        href={exportState.data.downloadUrl}
                        download
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Download Settings Backup
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isExporting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isExporting ? 'Exporting...' : 'Export Settings'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Import Tab */}
      {activeTab === 'import' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Import Settings</h3>
            <p className="mt-1 text-sm text-gray-500">
              Restore settings from a previously exported backup file.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleImport(formData);
            }}
            className="space-y-6"
          >
            {/* File Upload */}
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                Settings backup file
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file"
                        name="file"
                        type="file"
                        accept=".json,.yaml,.yml"
                        className="sr-only"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">JSON, YAML up to 10MB</p>
                </div>
              </div>
            </div>

            {/* Import Options */}
            <div>
              <label className="text-base font-medium text-gray-900">
                Import options
              </label>
              <div className="mt-3 space-y-3">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="overwrite"
                      name="overwrite"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="overwrite" className="font-medium text-gray-700">
                      Overwrite existing settings
                    </label>
                    <p className="text-gray-500">Replace current settings with imported values</p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="createBackup"
                      name="createBackup"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="createBackup" className="font-medium text-gray-700">
                      Create backup before import
                    </label>
                    <p className="text-gray-500">Automatically backup current settings first</p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="validateIntegrity"
                      name="validateIntegrity"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="validateIntegrity" className="font-medium text-gray-700">
                      Validate file integrity
                    </label>
                    <p className="text-gray-500">Check file for corruption or tampering</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Import Results */}
            {importState.success && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      {importState.message || 'Settings imported successfully'}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {importState.errors && Object.keys(importState.errors).length > 0 && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Import failed</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{importState.message || 'There was an error importing the settings file.'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isImporting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isImporting ? 'Importing...' : 'Import Settings'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}