'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { PageHeader } from '@/components/ui/page-header';
import { RefreshCw, Home } from 'lucide-react';

interface MenuErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MenuError({ error, reset }: MenuErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Menu page error:', error);
  }, [error]);

  return (
    <div className="container mx-auto p-6">
      <PageHeader 
        title="Menu Management" 
        description="Something went wrong while loading the menu data"
      />
      
      <div className="mt-8 max-w-2xl mx-auto">
        <Alert variant="destructive" className="mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Error Loading Menu</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {error.message || 'An unexpected error occurred while loading the menu management interface.'}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground font-mono">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          </div>
        </Alert>
        
        <div className="flex items-center justify-center space-x-4">
          <Button onClick={reset} variant="default">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/dashboard'} 
            variant="outline"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Troubleshooting Steps:</h4>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Check your internet connection</li>
            <li>Refresh the page to try again</li>
            <li>Clear your browser cache and cookies</li>
            <li>If the problem persists, contact support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}