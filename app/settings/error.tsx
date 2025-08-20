'use client';

import { useEffect } from 'react';
import { Button } from '../../components/ui/button';

interface SettingsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SettingsError({ error, reset }: SettingsErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Settings page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        {/* Error Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        {/* Error Content */}
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Oops! Something went wrong
        </h1>
        
        <p className="text-gray-600 mb-6">
          We encountered an error while loading the settings page. This might be a temporary issue.
        </p>

        {/* Error Details (Development Mode) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="text-left mb-6 p-4 bg-gray-50 rounded-lg">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
              Error Details
            </summary>
            <pre className="text-xs text-red-600 overflow-auto whitespace-pre-wrap break-all">
              {error.message}
              {error.stack && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  {error.stack}
                </div>
              )}
            </pre>
            {error.digest && (
              <div className="mt-2 text-xs text-gray-500">
                Error ID: {error.digest}
              </div>
            )}
          </details>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-red-600 hover:bg-red-700 text-white"
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
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Try Again
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location.href = '/dashboard'}
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
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Go to Dashboard
          </Button>
        </div>

        {/* Support Information */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-500">
          <p>
            If this problem persists, please{' '}
            <a
              href="mailto:support@restaurant-dashboard.com"
              className="text-red-600 hover:text-red-700 underline"
            >
              contact support
            </a>
            {error.digest && ` and include error ID: ${error.digest}`}
          </p>
        </div>
      </div>
    </div>
  );
}