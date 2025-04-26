'use client';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({ 
  title, 
  subtitle, 
  centered = true 
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-3">
        <span className="relative inline-block">
          {title}
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#D43A00]"></span>
        </span>
      </h2>
      {subtitle && (
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
} 