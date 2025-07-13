import React from 'react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionButton?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionButton,
  className = ""
}) => {
  return (
    <div className={`ui-empty-state flex flex-col items-center justify-center py-12 ${className}`}>
      {icon && (
        <div className="mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-500 mb-2 text-center">
        {title}
      </h3>
      {description && (
        <p className="text-gray-400 text-center max-w-md mb-4">
          {description}
        </p>
      )}
      {actionButton && (
        <div className="mt-4">
          {actionButton}
        </div>
      )}
    </div>
  );
}; 