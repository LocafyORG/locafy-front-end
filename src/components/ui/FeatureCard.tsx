import React from 'react';

export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className = ''
}) => {
  return (
    <div className={`ui-feature-card *:drop-shadow-xl w-[480px] text-center flex-grow-0 items-center ${className}`}>
      <span 
        className={`bg-[url(${icon})] h-[80px] w-[80px] bg-contain`} 
      />
      <h3 className="text-amber-300 text-5xl font-bold">{title}</h3>
      <p className="text-amber-100 text-2xl">{description}</p>
    </div>
  );
}; 