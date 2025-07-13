import React from 'react';

export interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconColor?: string;
  className?: string;
}

export const InfoRow: React.FC<InfoRowProps> = ({
  icon,
  label,
  value,
  iconColor = 'text-blue-500',
  className = ''
}) => {
  return (
    <div className={`ui-info-row flex items-center gap-4 p-4 bg-gray-50 rounded-lg ${className}`}>
      <div className={`${iconColor} text-xl`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}; 