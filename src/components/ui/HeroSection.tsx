import React from 'react';

export interface HeroSectionProps {
  title: string;
  description?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  backgroundImage,
  children,
  className = ''
}) => {
  return (
    <div 
      className={`ui-hero-section h-screen w-screen bg-no-repeat bg-cover bg-bottom items-center ${className}`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className="*:drop-shadow-xl w-1/4 justify-center items-center text-center">
        <h1 className="text-7xl text-indigo-950 font-extrabold">
          {title}
        </h1>
        {description && (
          <p className="text-2xl text-slate-600">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}; 