import React from 'react';

export interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  size = 'md',
  className = ""
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className={`ui-loading-spinner w-full h-full flex justify-center items-center min-h-screen ${className}`}>
      <div className="flex flex-col items-center gap-4">
        <div className={`animate-spin rounded-full border-b-2 border-blue-500 ${sizeClasses[size]}`}></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}; 