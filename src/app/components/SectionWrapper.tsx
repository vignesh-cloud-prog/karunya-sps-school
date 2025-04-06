import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className = '',
  gradientFrom = 'from-white',
  gradientTo = 'to-[#FFB800]/10'
}) => {
  return (
    <section className={`py-20 md:py-28 px-4 bg-gradient-to-b ${gradientFrom} ${gradientTo} relative overflow-hidden ${className}`}>
      <div className="absolute inset-0  opacity-5"></div>
      <div className="max-w-7xl mx-auto relative">
        {children}
      </div>
    </section>
  );
}; 