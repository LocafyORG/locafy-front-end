import React from 'react';

export interface FilterOption {
  key: string;
  label: string;
  count?: number;
}

export interface FilterTabsProps {
  options: FilterOption[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  showCounts?: boolean;
  className?: string;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  options,
  activeFilter,
  onFilterChange,
  showCounts = false,
  className = ''
}) => {
  return (
    <div className={`ui-filter-tabs flex items-center gap-4 text-sm ${className}`}>
      {options.map((option) => (
        <button
          key={option.key}
          className={`px-3 py-1 rounded-lg font-medium transition ${
            activeFilter === option.key
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => onFilterChange(option.key)}
        >
          {option.label}
          {showCounts && option.count !== undefined && (
            <span className="ml-1 text-xs opacity-75">
              ({option.count})
            </span>
          )}
        </button>
      ))}
    </div>
  );
}; 