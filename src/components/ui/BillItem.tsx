import React from 'react';

export interface BillItemProps {
  title: string;
  dueDate: string;
  amount: string;
  status: 'overdue' | 'due-soon' | 'upcoming';
  className?: string;
}

export const BillItem: React.FC<BillItemProps> = ({
  title,
  dueDate,
  amount,
  status,
  className = ''
}) => {
  const statusConfig = {
    overdue: { 
      bgColor: 'bg-red-50', 
      borderColor: 'border-red-500',
      amountColor: 'text-red-600',
      statusColor: 'text-red-500',
      statusText: 'Overdue'
    },
    'due-soon': { 
      bgColor: 'bg-yellow-50', 
      borderColor: 'border-yellow-500',
      amountColor: 'text-yellow-600',
      statusColor: 'text-yellow-500',
      statusText: 'Due soon'
    },
    upcoming: { 
      bgColor: 'bg-gray-50', 
      borderColor: 'border-gray-400',
      amountColor: 'text-gray-600',
      statusColor: 'text-gray-500',
      statusText: 'Upcoming'
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`ui-bill-item flex justify-between items-center p-3 ${config.bgColor} rounded-lg border-l-4 ${config.borderColor} ${className}`}>
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">Due: {dueDate}</p>
      </div>
      <div className="text-right">
        <p className={`text-sm font-bold ${config.amountColor}`}>{amount}</p>
        <p className={`text-xs ${config.statusColor}`}>{config.statusText}</p>
      </div>
    </div>
  );
}; 