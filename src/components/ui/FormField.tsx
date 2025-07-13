import React from 'react';

export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  minLength?: number;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  error,
  placeholder,
  minLength,
  className = ''
}) => {
  return (
    <div className={`form-group ui-form-field ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        minLength={minLength}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}; 