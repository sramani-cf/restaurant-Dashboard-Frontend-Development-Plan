'use client';

import { AlertTriangle, RefreshCw, Home, FileText, HelpCircle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: Error | string;
  type?: 'network' | 'validation' | 'server' | 'not-found' | 'permission' | 'generic';
  showRetry?: boolean;
  showHome?: boolean;
  showSupport?: boolean;
  onRetry?: () => void;
  onHome?: () => void;
  onSupport?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function ErrorState({
  title,
  message,
  error,
  type = 'generic',
  showRetry = true,
  showHome = false,
  showSupport = false,
  onRetry,
  onHome,
  onSupport,
  size = 'md'
}: ErrorStateProps) {
  const sizeClasses = {
    sm: {
      container: 'p-6',
      icon: 'w-8 h-8',
      title: 'text-lg',
      message: 'text-sm',
      button: 'px-3 py-1.5 text-sm'
    },
    md: {
      container: 'p-12',
      icon: 'w-12 h-12',
      title: 'text-xl',
      message: 'text-base',
      button: 'px-4 py-2 text-sm'
    },
    lg: {
      container: 'p-16',
      icon: 'w-16 h-16',
      title: 'text-2xl',
      message: 'text-lg',
      button: 'px-6 py-3 text-base'
    }
  };

  const classes = sizeClasses[size];

  const getErrorConfig = () => {
    switch (type) {
      case 'network':
        return {
          icon: <AlertTriangle className={`${classes.icon} text-orange-500`} />,
          defaultTitle: 'Connection Error',
          defaultMessage: 'Unable to connect to the server. Please check your internet connection.',
          iconBg: 'bg-orange-100'
        };
      case 'validation':
        return {
          icon: <AlertTriangle className={`${classes.icon} text-yellow-500`} />,
          defaultTitle: 'Invalid Data',
          defaultMessage: 'The provided data is invalid. Please check your inputs and try again.',
          iconBg: 'bg-yellow-100'
        };
      case 'server':
        return {
          icon: <AlertTriangle className={`${classes.icon} text-red-500`} />,
          defaultTitle: 'Server Error',
          defaultMessage: 'Something went wrong on our end. Please try again in a few moments.',
          iconBg: 'bg-red-100'
        };
      case 'not-found':
        return {
          icon: <FileText className={`${classes.icon} text-gray-500`} />,
          defaultTitle: 'Report Not Found',
          defaultMessage: 'The requested report could not be found or may have been moved.',
          iconBg: 'bg-gray-100'
        };
      case 'permission':
        return {
          icon: <AlertTriangle className={`${classes.icon} text-purple-500`} />,
          defaultTitle: 'Access Denied',
          defaultMessage: 'You do not have permission to view this report.',
          iconBg: 'bg-purple-100'
        };
      case 'generic':
      default:
        return {
          icon: <AlertTriangle className={`${classes.icon} text-red-500`} />,
          defaultTitle: 'Something went wrong',
          defaultMessage: 'An unexpected error occurred. Please try again.',
          iconBg: 'bg-red-100'
        };
    }
  };

  const config = getErrorConfig();

  const displayTitle = title || config.defaultTitle;
  const displayMessage = message || config.defaultMessage;

  // Extract error details if error object is provided
  const errorDetails = error instanceof Error 
    ? error.message 
    : typeof error === 'string' 
    ? error 
    : null;

  return (
    <div className={`flex flex-col items-center justify-center ${classes.container}`}>
      {/* Error Icon */}
      <div className={`flex items-center justify-center w-16 h-16 rounded-full ${config.iconBg} mb-6`}>
        {config.icon}
      </div>

      {/* Error Title */}
      <h2 className={`font-bold text-gray-900 mb-3 text-center ${classes.title}`}>
        {displayTitle}
      </h2>

      {/* Error Message */}
      <p className={`text-gray-600 text-center max-w-md mb-6 ${classes.message}`}>
        {displayMessage}
      </p>

      {/* Error Details (Development Mode) */}
      {errorDetails && process.env.NODE_ENV === 'development' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md">
          <h4 className="text-sm font-medium text-red-800 mb-2">Error Details:</h4>
          <p className="text-xs text-red-700 font-mono break-all">
            {errorDetails}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            className={`
              inline-flex items-center justify-center ${classes.button} font-medium rounded-md
              text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              transition-colors
            `}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        )}

        {showHome && onHome && (
          <button
            onClick={onHome}
            className={`
              inline-flex items-center justify-center ${classes.button} font-medium rounded-md
              text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              transition-colors
            `}
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </button>
        )}

        {showSupport && onSupport && (
          <button
            onClick={onSupport}
            className={`
              inline-flex items-center justify-center ${classes.button} font-medium rounded-md
              text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              transition-colors
            `}
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Contact Support
          </button>
        )}
      </div>

      {/* Additional Help Text */}
      {type === 'network' && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">Troubleshooting tips:</p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Check your internet connection</li>
            <li>• Try refreshing the page</li>
            <li>• Clear your browser cache</li>
          </ul>
        </div>
      )}

      {type === 'server' && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            If this problem persists, please contact support with the timestamp: {new Date().toISOString()}
          </p>
        </div>
      )}
    </div>
  );
}

// Specialized error states for common scenarios
export function NetworkErrorState({ onRetry, ...props }: Omit<ErrorStateProps, 'type'>) {
  return (
    <ErrorState
      type="network"
      showRetry={true}
      onRetry={onRetry}
      {...props}
    />
  );
}

export function ServerErrorState({ onRetry, onSupport, ...props }: Omit<ErrorStateProps, 'type'>) {
  return (
    <ErrorState
      type="server"
      showRetry={true}
      showSupport={true}
      onRetry={onRetry}
      onSupport={onSupport}
      {...props}
    />
  );
}

export function NotFoundErrorState({ onHome, ...props }: Omit<ErrorStateProps, 'type'>) {
  return (
    <ErrorState
      type="not-found"
      showRetry={false}
      showHome={true}
      onHome={onHome}
      {...props}
    />
  );
}

export function PermissionErrorState({ onHome, onSupport, ...props }: Omit<ErrorStateProps, 'type'>) {
  return (
    <ErrorState
      type="permission"
      showRetry={false}
      showHome={true}
      showSupport={true}
      onHome={onHome}
      onSupport={onSupport}
      {...props}
    />
  );
}

// Inline error component for form validation
export function InlineError({ message }: { message: string }) {
  return (
    <div className="flex items-center mt-2 text-sm text-red-600">
      <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
      {message}
    </div>
  );
}

// Banner error for non-blocking errors
export function ErrorBanner({ 
  message, 
  onDismiss,
  type = 'error'
}: { 
  message: string; 
  onDismiss?: () => void;
  type?: 'error' | 'warning' | 'info';
}) {
  const typeClasses = {
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const iconClasses = {
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500'
  };

  return (
    <div className={`border rounded-md p-4 ${typeClasses[type]}`}>
      <div className="flex items-start">
        <AlertTriangle className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${iconClasses[type]}`} />
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`ml-4 text-sm font-medium hover:underline ${typeClasses[type]}`}
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}