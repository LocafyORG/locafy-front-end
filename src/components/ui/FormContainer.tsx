import React from 'react';

export interface FormContainerProps {
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  errorMessage?: string | null;
  successMessage?: string | null;
  className?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  title,
  children,
  onSubmit,
  errorMessage,
  successMessage,
  className = ''
}) => {
  return (
    <div className={`form-container ui-form-container ${className}`}>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">{title}</h1>
      
      <form onSubmit={onSubmit} className="space-y-6">
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600 text-sm">{errorMessage}</p>
          </div>
        )}
        
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-green-600 text-sm">{successMessage}</p>
          </div>
        )}
        
        {children}
      </form>
    </div>
  );
}; 