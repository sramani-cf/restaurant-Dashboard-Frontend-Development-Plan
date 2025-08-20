'use client';

import { ReactNode, FormEvent, useState } from 'react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface SettingsFormProps {
  children: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  className?: string;
  isSubmitting?: boolean;
  isDirty?: boolean;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
  showActions?: boolean;
  actionsClassName?: string;
  errors?: Record<string, string[]>;
}

export function SettingsForm({
  children,
  onSubmit,
  className,
  isSubmitting = false,
  isDirty = false,
  submitText = 'Save Changes',
  cancelText = 'Cancel',
  onCancel,
  showActions = true,
  actionsClassName,
  errors
}: SettingsFormProps) {
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasAttemptedSubmit(true);
    
    if (onSubmit) {
      await onSubmit(event);
    }
    
    // Dispatch custom event for settings header
    window.dispatchEvent(new CustomEvent('settings:save'));
  };

  const handleInputChange = () => {
    // Dispatch custom event for settings header
    window.dispatchEvent(new CustomEvent('settings:change'));
  };

  const hasErrors = errors && Object.keys(errors).length > 0;

  return (
    <form 
      onSubmit={handleSubmit}
      onChange={handleInputChange}
      className={cn('space-y-6', className)}
    >
      {/* Global Error Messages */}
      {hasErrors && hasAttemptedSubmit && (
        <div className="rounded-md bg-red-50 p-4 border border-red-200">
          <div className="flex">
            <div className="flex-shrink-0">
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
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                There were errors with your submission
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc list-inside space-y-1">
                  {Object.entries(errors).map(([field, fieldErrors]) =>
                    fieldErrors.map((error, index) => (
                      <li key={`${field}-${index}`}>
                        <span className="font-medium capitalize">{field.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span> {error}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Content */}
      {children}

      {/* Form Actions */}
      {showActions && (
        <div className={cn(
          'flex items-center justify-end gap-3 pt-6 border-t border-gray-200',
          actionsClassName
        )}>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {cancelText}
            </Button>
          )}
          
          <Button
            type="submit"
            disabled={isSubmitting || (!isDirty && !hasAttemptedSubmit)}
            className={cn(
              'relative',
              isSubmitting && 'cursor-not-allowed'
            )}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Saving...
              </>
            ) : (
              <>
                {isDirty && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-600 rounded-full" />
                )}
                {submitText}
              </>
            )}
          </Button>
        </div>
      )}
    </form>
  );
}