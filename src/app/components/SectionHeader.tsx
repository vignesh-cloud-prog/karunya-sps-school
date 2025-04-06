import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle,
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center text-center mb-12 ${className}`}>
      <h2 className="text-4xl md:text-5xl font-bold text-[#D43A00] mb-4">{title}</h2>
      <div className="w-24 h-1.5 bg-[#FFB800] rounded-full mb-6"></div>
      {subtitle && (
        <p className="text-[#005A8C] text-xl max-w-3xl">{subtitle}</p>
      )}
    </div>
  );
}; 