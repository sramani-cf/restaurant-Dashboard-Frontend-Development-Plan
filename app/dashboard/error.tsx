'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, RefreshCw, Home, BarChart3 } from 'lucide-react';

interface DashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Dashboard error:', error);
  }, [error]);

  const getErrorMessage = () => {
    if (error.message.includes('fetch')) {
      return 'Unable to load dashboard data. Please check your connection and try again.';
    }
    if (error.message.includes('timeout')) {
      return 'Request timed out. The server may be experiencing high load.';
    }
    if (error.message.includes('unauthorized')) {
      return 'You are not authorized to view this dashboard. Please sign in again.';
    }
    return 'An unexpected error occurred while loading the dashboard.';
  };

  const getErrorCode = () => {
    if (error.digest) {
      return error.digest.slice(0, 8).toUpperCase();
    }
    return 'UNKNOWN';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Dashboard Error
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {getErrorMessage()}
              </AlertDescription>
            </Alert>

            <div className="text-center space-y-4">
              <div className="text-sm text-gray-500">
                Error Code: <code className="bg-gray-100 px-2 py-1 rounded font-mono">{getErrorCode()}</code>
              </div>

              <div className="flex flex-col gap-2">
                <Button onClick={reset} className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                
                <Button variant="outline" asChild className="w-full">
                  <a href="/dashboard">
                    <span className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Reload Dashboard
                    </span>
                  </a>
                </Button>
                
                <Button variant="ghost" asChild className="w-full">
                  <a href="/">
                    <span className="flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      Go Home
                    </span>
                  </a>
                </Button>
              </div>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                  Technical Details
                </summary>
                <div className="mt-2 p-3 bg-gray-100 rounded-md">
                  <pre className="text-xs text-gray-800 whitespace-pre-wrap overflow-auto">
                    {error.stack || error.message}
                  </pre>
                </div>
              </details>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}