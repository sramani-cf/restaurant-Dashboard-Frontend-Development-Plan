'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ReservationsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ReservationsError({ error, reset }: ReservationsErrorProps) {
  const getErrorMessage = () => {
    if (error.message.includes('Failed to fetch')) {
      return {
        title: 'Connection Error',
        description: 'Unable to connect to the reservation system. Please check your internet connection and try again.',
        icon: '🌐'
      };
    }
    
    if (error.message.includes('unauthorized') || error.message.includes('403')) {
      return {
        title: 'Access Denied',
        description: 'You do not have permission to access the reservation system. Please contact your administrator.',
        icon: '🔒'
      };
    }
    
    if (error.message.includes('timeout')) {
      return {
        title: 'Request Timeout',
        description: 'The request took too long to complete. The server might be busy. Please try again.',
        icon: '⏰'
      };
    }
    
    return {
      title: 'Something went wrong',
      description: 'An unexpected error occurred while loading the reservation system. Our team has been notified.',
      icon: '⚠️'
    };
  };

  const errorInfo = getErrorMessage();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card className="p-8 text-center">
          <div className="text-6xl mb-6">{errorInfo.icon}</div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {errorInfo.title}
          </h1>
          
          <p className="text-gray-600 mb-8">
            {errorInfo.description}
          </p>

          <div className="space-y-4">
            <Button 
              onClick={reset}
              className="w-full"
            >
              Try Again
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/dashboard'}
              className="w-full"
            >
              Back to Dashboard
            </Button>
          </div>

          {/* Technical Details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Technical Details
              </summary>
              <div className="mt-4 p-4 bg-gray-100 rounded text-xs font-mono text-gray-700 whitespace-pre-wrap">
                <div className="mb-2">
                  <strong>Error:</strong> {error.message}
                </div>
                {error.digest && (
                  <div className="mb-2">
                    <strong>Digest:</strong> {error.digest}
                  </div>
                )}
                {error.stack && (
                  <div>
                    <strong>Stack:</strong>
                    {error.stack}
                  </div>
                )}
              </div>
            </details>
          )}

          {/* Help Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Need help? Contact our support team:
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a 
                href="mailto:support@restaurant-dashboard.com" 
                className="text-blue-600 hover:text-blue-800"
              >
                📧 Email Support
              </a>
              <a 
                href="tel:+1-555-123-4567" 
                className="text-blue-600 hover:text-blue-800"
              >
                📞 Call Support
              </a>
            </div>
          </div>
        </Card>

        {/* Status Information */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>System Status: Monitoring</span>
          </div>
        </div>
      </div>
    </div>
  );
}