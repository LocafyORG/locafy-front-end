import React from 'react';

export interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  subtitle,
  children,
  className = ''
}) => {
  return (
    <div className={`ui-info-card bg-white shadow-xl rounded-xl p-6 border border-gray-100 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="text-blue-500 text-xl">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          {subtitle && (
            <p className="text-gray-500 text-sm">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}; 