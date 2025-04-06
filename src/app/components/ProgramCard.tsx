import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProgramCardProps {
  image: string;
  alt: string;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  image,
  alt,
  title,
  description,
  link,
  linkText
}) => {
  return (
    <article className="bg-white rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl group">
      <div className="grid md:grid-cols-12 gap-0">
        <div className="relative h-[280px] md:h-[320px] md:col-span-5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent z-10"></div>
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 40vw"
            priority
          />
        </div>
        <div className="p-6 md:p-8 md:col-span-7 flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[#005A8C] mb-4 group-hover:text-[#D43A00] transition-colors">
            {title}
          </h3>
          <p className="text-gray-800 leading-relaxed">
            {description}
          </p>
          {link && linkText && (
            <Link 
              href={link}
              className="inline-flex items-center px-6 py-3 bg-[#FF4B00] text-white rounded-lg font-semibold hover:bg-[#0077BE] transition-all duration-300 group-hover:translate-x-2 w-fit mt-6"
            >
              {linkText}
              <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}; 