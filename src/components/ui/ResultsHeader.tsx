import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { ViewModeControls, ViewMode } from './ViewModeControls';
import { FilterTabs, FilterOption } from './FilterTabs';

export interface ResultsHeaderProps {
  resultCount: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  filterOptions?: FilterOption[];
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  showMapToggle?: boolean;
  mapEnabled?: boolean;
  onMapToggle?: (enabled: boolean) => void;
  className?: string;
}

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  resultCount,
  viewMode,
  onViewModeChange,
  filterOptions,
  activeFilter,
  onFilterChange,
  showMapToggle = false,
  mapEnabled = false,
  onMapToggle,
  className = ""
}) => {
  return (
    <div className={`ui-results-header bg-white shadow-lg rounded-xl p-4 mb-6 border border-gray-100 ${className}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Results and Filters */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaSearch className="text-gray-400" />
            <span className="text-sm text-gray-600">
              {resultCount} Results
            </span>
          </div>
          
          {filterOptions && activeFilter && onFilterChange && (
            <FilterTabs
              options={filterOptions}
              activeFilter={activeFilter}
              onFilterChange={onFilterChange}
            />
          )}
        </div>

        {/* View Controls */}
        <ViewModeControls
          currentMode={viewMode}
          onModeChange={onViewModeChange}
          showMapToggle={showMapToggle}
          mapEnabled={mapEnabled}
          onMapToggle={onMapToggle}
        />
      </div>
    </div>
  );
}; 