import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div
      onClick={toggleDarkMode}
      style={{
        position: 'relative',
        width: '48px',
        height: '24px',
        backgroundColor: isDarkMode ? '#495057' : '#e9ecef',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        border: '1px solid #6c757d'
      }}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div
        style={{
          position: 'absolute',
          top: '2px',
          left: isDarkMode ? '26px' : '2px',
          width: '18px',
          height: '18px',
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          transition: 'left 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      >
        {isDarkMode ? <Moon size={12} color="#495057" /> : <Sun size={12} color="#ffc107" />}
      </div>
    </div>
  );
};
