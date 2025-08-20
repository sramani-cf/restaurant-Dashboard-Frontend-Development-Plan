'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';
import { ImportExportControls } from './import-export-controls';
import { SettingsValidation } from './settings-validation';

interface SettingsHeaderProps {
  showValidation?: boolean;
}

export function SettingsHeader({ showValidation = true }: SettingsHeaderProps) {
  const [showImportExport, setShowImportExport] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // Listen for form changes across the app
  useEffect(() => {
    const handleFormChange = () => setIsDirty(true);
    const handleFormSave = () => {
      setIsDirty(false);
      setLastSaved(new Date());
    };

    // In a real app, you might use a context or state management library
    window.addEventListener('settings:change', handleFormChange);
    window.addEventListener('settings:save', handleFormSave);

    return () => {
      window.removeEventListener('settings:change', handleFormChange);
      window.removeEventListener('settings:save', handleFormSave);
    };
  }, []);

  const handleValidateSettings = () => {
    setShowValidationModal(true);
  };

  const handleSaveAll = async () => {
    // In a real app, this would save all pending changes
    console.log('Saving all settings...');
    window.dispatchEvent(new CustomEvent('settings:save'));
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Status Indicator */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {isDirty ? (
                  <>
                    <div className="h-2 w-2 bg-amber-400 rounded-full animate-pulse" />
                    <span className="text-sm text-amber-700 font-medium">
                      Unsaved changes
                    </span>
                  </>
                ) : (
                  <>
                    <div className="h-2 w-2 bg-green-400 rounded-full" />
                    <span className="text-sm text-gray-600">
                      All changes saved
                      {lastSaved && (
                        <span className="ml-2 text-gray-500">
                          • Last saved {lastSaved.toLocaleTimeString()}
                        </span>
                      )}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {showValidation && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleValidateSettings}
                >
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Validate
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowImportExport(true)}
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                Import/Export
              </Button>

              {isDirty && (
                <Button
                  size="sm"
                  onClick={handleSaveAll}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 3.75V4.5L21 12l-4.5 7.5V20.25L12 16.5l-4.5 3.75V20.25L3 12l4.5-7.5V3.75L12 7.5l4.5-3.75z"
                    />
                  </svg>
                  Save All
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Import/Export Modal */}
      <Modal
        isOpen={showImportExport}
        onClose={() => setShowImportExport(false)}
        title="Import & Export Settings"
        size="lg"
      >
        <ImportExportControls
          onClose={() => setShowImportExport(false)}
        />
      </Modal>

      {/* Validation Modal */}
      <Modal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        title="Settings Validation"
        size="md"
      >
        <SettingsValidation
          onClose={() => setShowValidationModal(false)}
        />
      </Modal>
    </>
  );
}