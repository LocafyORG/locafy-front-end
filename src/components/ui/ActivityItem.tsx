import React from 'react';

export interface ActivityItemProps {
  title: string;
  description: string;
  timeAgo: string;
  status: 'success' | 'warning' | 'info' | 'error';
  className?: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  title,
  description,
  timeAgo,
  status,
  className = ''
}) => {
  const statusConfig = {
    success: { bgColor: 'bg-green-50', dotColor: 'bg-green-500' },
    warning: { bgColor: 'bg-yellow-50', dotColor: 'bg-yellow-500' },
    info: { bgColor: 'bg-blue-50', dotColor: 'bg-blue-500' },
    error: { bgColor: 'bg-red-50', dotColor: 'bg-red-500' }
  };

  const config = statusConfig[status];

  return (
    <div className={`ui-activity-item flex items-center gap-3 p-3 ${config.bgColor} rounded-lg ${className}`}>
      <div className={`w-2 h-2 ${config.dotColor} rounded-full`}></div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <span className="text-xs text-gray-500">{timeAgo}</span>
    </div>
  );
}; 