import React from 'react';
import { FaTh, FaBars, FaMap } from 'react-icons/fa';

export type ViewMode = 'grid' | 'list' | 'map';

export interface ViewModeControlsProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  availableModes?: ViewMode[];
  showMapToggle?: boolean;
  mapEnabled?: boolean;
  onMapToggle?: (enabled: boolean) => void;
  className?: string;
}

export const ViewModeControls: React.FC<ViewModeControlsProps> = ({
  currentMode,
  onModeChange,
  availableModes = ['grid', 'list'],
  showMapToggle = false,
  mapEnabled = false,
  onMapToggle,
  className = ''
}) => {
  const getModeIcon = (mode: ViewMode) => {
    switch (mode) {
      case 'grid':
        return <FaTh className="text-sm" />;
      case 'list':
        return <FaBars className="text-sm" />;
      case 'map':
        return <FaMap className="text-sm" />;
      default:
        return null;
    }
  };

  const getModeLabel = (mode: ViewMode) => {
    switch (mode) {
      case 'grid':
        return 'Grid';
      case 'list':
        return 'List';
      case 'map':
        return 'Map';
      default:
        return mode;
    }
  };

  return (
    <div className={`ui-view-mode-controls flex items-center gap-2 ${className}`}>
      {availableModes.map((mode) => (
        <button
          key={mode}
          className={`p-2 rounded-lg transition ${
            currentMode === mode
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
          onClick={() => onModeChange(mode)}
          title={getModeLabel(mode)}
        >
          {getModeIcon(mode)}
        </button>
      ))}
      
      {showMapToggle && onMapToggle && (
        <div className="flex items-center gap-2 ml-4">
          <span className="text-sm text-gray-600">Map View:</span>
          <input
            type="checkbox"
            checked={mapEnabled}
            onChange={(e) => onMapToggle(e.target.checked)}
            className="scale-90"
          />
        </div>
      )}
    </div>
  );
}; 