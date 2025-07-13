import React from 'react';

export interface PageLayoutProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  header,
  sidebar,
  children,
  className = ''
}) => {
  return (
    <div className={`ui-page-layout min-h-screen bg-gray-50 ${className}`}>
      {header && (
        <div className="bg-white shadow-sm border-b border-gray-200">
          {header}
        </div>
      )}
      
      <div className="flex">
        {sidebar && (
          <div className="w-64 bg-white shadow-sm border-r border-gray-200">
            {sidebar}
          </div>
        )}
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}; 