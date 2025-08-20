'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { validateSettingsAction } from '../../app/settings/actions';

interface SettingsValidationProps {
  onClose?: () => void;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function SettingsValidation({ onClose }: SettingsValidationProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [lastValidated, setLastValidated] = useState<Date | null>(null);

  const runValidation = async () => {
    setIsValidating(true);
    try {
      const result = await validateSettingsAction();
      if (result.success && result.data) {
        setValidationResult(result.data);
        setLastValidated(new Date());
      }
    } catch (error) {
      console.error('Validation error:', error);
    } finally {
      setIsValidating(false);
    }
  };

  // Run validation on component mount
  useEffect(() => {
    runValidation();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Settings Validation</h3>
          <p className="mt-1 text-sm text-gray-500">
            Check your settings for errors and potential issues
          </p>
        </div>
        <Button
          onClick={runValidation}
          disabled={isValidating}
          size="sm"
          variant="outline"
        >
          {isValidating ? 'Validating...' : 'Re-validate'}
        </Button>
      </div>

      {/* Validation Status */}
      {isValidating ? (
        <div className="text-center py-8">
          <svg
            className="animate-spin h-8 w-8 text-blue-600 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-500">
            Validating your settings...
          </p>
        </div>
      ) : validationResult ? (
        <div className="space-y-6">
          {/* Overall Status */}
          <div className={`rounded-lg p-4 ${
            validationResult.isValid 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {validationResult.isValid ? (
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
                ) : (
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${
                  validationResult.isValid ? 'text-green-800' : 'text-red-800'
                }`}>
                  {validationResult.isValid 
                    ? 'Settings validation passed' 
                    : 'Settings validation failed'
                  }
                </h3>
                <p className={`mt-1 text-sm ${
                  validationResult.isValid ? 'text-green-700' : 'text-red-700'
                }`}>
                  {validationResult.isValid
                    ? 'Your restaurant settings are configured correctly.'
                    : `Found ${validationResult.errors.length} error(s) that need attention.`
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Validation Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <div className={`text-2xl font-bold ${
                validationResult.isValid ? 'text-green-600' : 'text-red-600'
              }`}>
                {validationResult.isValid ? '✓' : '✗'}
              </div>
              <div className="text-sm text-gray-500 mt-1">Overall Status</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <div className="text-2xl font-bold text-red-600">
                {validationResult.errors.length}
              </div>
              <div className="text-sm text-gray-500 mt-1">Errors</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <div className="text-2xl font-bold text-amber-600">
                {validationResult.warnings.length}
              </div>
              <div className="text-sm text-gray-500 mt-1">Warnings</div>
            </div>
          </div>

          {/* Errors */}
          {validationResult.errors.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">
                Errors ({validationResult.errors.length})
              </h4>
              <div className="space-y-2">
                {validationResult.errors.map((error, index) => (
                  <div
                    key={index}
                    className="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">
                        {error}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warnings */}
          {validationResult.warnings.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">
                Warnings ({validationResult.warnings.length})
              </h4>
              <div className="space-y-2">
                {validationResult.warnings.map((warning, index) => (
                  <div
                    key={index}
                    className="flex items-start p-3 bg-amber-50 border border-amber-200 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-amber-400 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-amber-800">
                        {warning}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Last Validated */}
          {lastValidated && (
            <div className="text-sm text-gray-500 text-center">
              Last validated: {lastValidated.toLocaleString()}
            </div>
          )}
        </div>
      ) : null}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
        >
          Close
        </Button>
        {validationResult && !validationResult.isValid && (
          <Button
            onClick={() => {
              // In a real app, this might navigate to the first error
              onClose?.();
            }}
            className="bg-red-600 hover:bg-red-700"
          >
            Fix Issues
          </Button>
        )}
      </div>
    </div>
  );
}