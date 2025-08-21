import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string; code?: string };
}) {
  const error = searchParams.error;
  const code = searchParams.code;

  const getErrorMessage = (error?: string) => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Invalid email or password. Please try again.';
      case 'OAuthSignin':
      case 'OAuthCallback':
      case 'OAuthCreateAccount':
      case 'EmailCreateAccount':
        return 'There was an error with the authentication provider.';
      case 'Callback':
        return 'There was an error during the authentication callback.';
      case 'OAuthAccountNotLinked':
        return 'This account is not linked. Please sign in with your original method.';
      case 'EmailSignin':
        return 'There was an error sending the email. Please try again.';
      case 'SessionRequired':
        return 'You must be signed in to access this page.';
      case 'AccessDenied':
        return 'Access denied. You do not have permission to access this resource.';
      case 'Verification':
        return 'The verification token has expired or is invalid.';
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      default:
        return 'An unexpected authentication error occurred.';
    }
  };

  const getErrorTitle = (error?: string) => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Authentication Failed';
      case 'AccessDenied':
        return 'Access Denied';
      case 'SessionRequired':
        return 'Sign In Required';
      case 'Configuration':
        return 'Server Error';
      default:
        return 'Authentication Error';
    }
  };

  const getSuggestions = (error?: string) => {
    switch (error) {
      case 'CredentialsSignin':
        return [
          'Double-check your email and password',
          'Make sure Caps Lock is off',
          'Try resetting your password',
          'Contact support if the problem persists',
        ];
      case 'AccessDenied':
        return [
          'Contact your administrator for access',
          'Verify your account permissions',
          'Try signing in with a different account',
        ];
      case 'SessionRequired':
        return [
          'Sign in to continue',
          'Clear your browser cookies and try again',
          'Make sure cookies are enabled',
        ];
      default:
        return [
          'Try signing in again',
          'Clear your browser cache and cookies',
          'Try a different browser',
          'Contact support if the issue persists',
        ];
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        {/* Error Title */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {getErrorTitle(error)}
          </h2>
          <p className="mt-2 text-gray-600">
            {getErrorMessage(error)}
          </p>
        </div>

        {/* Error Details (Development) */}
        {process.env.NODE_ENV === 'development' && (error || code) && (
          <div className="bg-gray-100 rounded-md p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Debug Information (Development Only)
            </h3>
            <div className="text-xs text-gray-700 space-y-1">
              {error && <p><strong>Error:</strong> {error}</p>}
              {code && <p><strong>Code:</strong> {code}</p>}
            </div>
          </div>
        )}

        {/* Suggestions */}
        <div className="bg-blue-50 rounded-md p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-3">
            What you can try:
          </h3>
          <ul className="space-y-2">
            {getSuggestions(error).map((suggestion, index) => (
              <li key={index} className="text-sm text-blue-700 flex items-start">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3" />
                {suggestion}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/auth/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Try Again
          </Link>

          <div className="flex space-x-3">
            <Link
              href="/auth/forgot-password"
              className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Reset Password
            </Link>

            <Link
              href="/"
              className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Go Home
            </Link>
          </div>
        </div>

        {/* Support Contact */}
        <div className="text-center text-xs text-gray-500">
          Need help? Contact{' '}
          <a href="mailto:support@restaurant.com" className="text-primary hover:text-primary/90">
            support@restaurant.com
          </a>
        </div>
      </div>
    </div>
  );
}