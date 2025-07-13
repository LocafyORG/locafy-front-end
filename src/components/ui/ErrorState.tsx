import React from 'react';

export interface ErrorStateProps {
  icon?: React.ReactNode;
  title?: string;
  error?: string | null;
  onRetry?: () => void;
  retryText?: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  icon,
  title = "Error",
  error,
  onRetry,
  retryText = "Try Again",
  className = ""
}) => {
  return (
    <div className={`ui-error-state w-full h-full flex justify-center items-center min-h-screen ${className}`}>
      <div className="text-center">
        {icon && (
          <div className="mb-4">
            {icon}
          </div>
        )}
        <h1 className="text-xl font-semibold text-red-600 mb-2">{title}</h1>
        {error && (
          <p className="text-gray-600 mt-2 mb-4">{error}</p>
        )}
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
          >
            {retryText}
          </button>
        )}
      </div>
    </div>
  );
}; 