import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export interface DataTableColumn {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
  icon?: React.ReactNode;
}

export interface DataTableProps {
  columns: DataTableColumn[];
  data: Record<string, unknown>[];
  onRowClick?: (row: Record<string, unknown>, index: number) => void;
  actions?: {
    label: string;
    onClick: (row: Record<string, unknown>, index: number) => void;
    variant?: 'primary' | 'secondary' | 'danger';
  }[];
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  className?: string;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  onRowClick,
  actions = [],
  emptyMessage = 'No data found',
  emptyIcon,
  className = ''
}) => {
  if (data.length === 0) {
    return (
      <div className={`ui-data-table-empty flex flex-col items-center justify-center h-48 text-gray-500 dark:text-gray-400 ${className}`}>
        {emptyIcon && <div className="mb-2">{emptyIcon}</div>}
        <div className="text-lg">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className={`ui-data-table bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden ${className}`}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                <div className="flex items-center gap-2">
                  {column.icon && <span className="text-gray-400 dark:text-gray-500">{column.icon}</span>}
                  {column.label}
                </div>
              </th>
            ))}
            {actions.length > 0 && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, index) => (
            <tr
              key={index}
              className={`hover:bg-blue-50 dark:hover:bg-gray-700 transition cursor-pointer group ${
                onRowClick ? 'cursor-pointer' : ''
              }`}
              onClick={() => onRowClick?.(row, index)}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                  {column.render
                    ? column.render(row[column.key], row)
                    : (row[column.key] as string) || <span className="text-gray-400 dark:text-gray-500">N/A</span>
                  }
                </td>
              ))}
                             {actions.length > 0 && (
                 <td className="px-2 py-3 text-sm text-gray-900 dark:text-gray-100 pr-4">
                   <div className="flex gap-1">
                     {actions.map((action, actionIndex) => (
                       <button
                         key={actionIndex}
                         className={`px-2 py-1 rounded text-xs font-medium transition whitespace-nowrap flex items-center gap-1 ${
                           action.variant === 'danger'
                             ? 'bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-200'
                             : action.variant === 'secondary'
                             ? 'bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                             : 'bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-200'
                         }`}
                         onClick={(e) => {
                           e.stopPropagation();
                           action.onClick(row, index);
                         }}
                       >
                         {action.label === 'Edit' && <FaEdit size={10} />}
                         {action.label === 'Delete' && <FaTrash size={10} />}
                         {action.label}
                       </button>
                     ))}
                   </div>
                 </td>
               )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 