'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InventoryErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function InventoryError({ error, reset }: InventoryErrorProps) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Inventory Error:', error);
  }, [error]);

  const isNetworkError = error.message.includes('fetch') || error.message.includes('network');
  const isAuthError = error.message.includes('unauthorized') || error.message.includes('forbidden');
  const isDataError = error.message.includes('validation') || error.message.includes('schema');

  const getErrorType = () => {
    if (isNetworkError) return 'Network Error';
    if (isAuthError) return 'Authentication Error';
    if (isDataError) return 'Data Error';
    return 'System Error';
  };

  const getErrorMessage = () => {
    if (isNetworkError) {
      return 'Unable to connect to the server. Please check your internet connection and try again.';
    }
    if (isAuthError) {
      return 'You do not have permission to access this resource. Please contact your administrator.';
    }
    if (isDataError) {
      return 'There was an issue with the data format. Please refresh the page or contact support.';
    }
    return 'An unexpected error occurred. Our team has been notified and is working to resolve this issue.';
  };

  const getErrorSuggestions = () => {
    const suggestions = [];
    
    if (isNetworkError) {
      suggestions.push('Check your internet connection');
      suggestions.push('Try refreshing the page');
      suggestions.push('Check if the server is running');
    } else if (isAuthError) {
      suggestions.push('Log out and log back in');
      suggestions.push('Contact your administrator');
      suggestions.push('Check your account permissions');
    } else if (isDataError) {
      suggestions.push('Refresh the page');
      suggestions.push('Clear your browser cache');
      suggestions.push('Try a different browser');
    } else {
      suggestions.push('Try refreshing the page');
      suggestions.push('Clear your browser cache');
      suggestions.push('Contact support if the issue persists');
    }
    
    return suggestions;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          {getErrorType()}
        </h1>

        {/* Error Message */}
        <p className="text-gray-600 mb-6">
          {getErrorMessage()}
        </p>

        {/* Error Details (Development) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left">
            <summary className="text-sm text-gray-500 cursor-pointer mb-2">
              Technical Details
            </summary>
            <div className="bg-gray-100 rounded-md p-3 text-xs font-mono text-gray-700 overflow-auto max-h-32">
              <p><strong>Message:</strong> {error.message}</p>
              {error.digest && <p><strong>Digest:</strong> {error.digest}</p>}
              {error.stack && (
                <div className="mt-2">
                  <strong>Stack:</strong>
                  <pre className="whitespace-pre-wrap mt-1">{error.stack}</pre>
                </div>
              )}
            </div>
          </details>
        )}

        {/* Error Suggestions */}
        <div className="text-left mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Try these solutions:</h3>
          <ul className="space-y-2">
            {getErrorSuggestions().map((suggestion, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3" />
                {suggestion}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={reset}
            className="w-full flex items-center justify-center"
            variant="default"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>

          <div className="flex space-x-3">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="flex-1 flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>

            <Button
              onClick={() => window.location.href = '/dashboard'}
              variant="outline"
              className="flex-1 flex items-center justify-center"
            >
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            If this problem continues, please contact our support team with the error details above.
          </p>
          {process.env.NODE_ENV === 'production' && error.digest && (
            <p className="text-xs text-gray-400 mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Offline Support */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Check if we're offline
              if (!navigator.onLine) {
                const offlineMessage = document.createElement('div');
                offlineMessage.className = 'mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md';
                offlineMessage.innerHTML = \`
                  <div class="flex items-center">
                    <svg class="h-5 w-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                    <p class="text-sm text-yellow-800">
                      You appear to be offline. This may be the cause of the error.
                    </p>
                  </div>
                \`;
                document.currentScript.parentNode.insertBefore(offlineMessage, document.currentScript);
              }
            `,
          }}
        />
      </div>
    </div>
  );
}