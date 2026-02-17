import React from 'react';

export interface FormButtonProps {
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const FormButton: React.FC<FormButtonProps> = ({
  type = 'submit',
  disabled = false,
  loading = false,
  loadingText = 'Loading...',
  children,
  onClick,
  className = '',
  variant = 'primary'
}) => {
  const baseClasses = 'w-full inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500'
  };

  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`ui-form-button ${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
    >
      {loading ? loadingText : children}
    </button>
  );
}; 