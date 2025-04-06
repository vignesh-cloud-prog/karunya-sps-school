import React from 'react';
import Image from 'next/image';

interface ActivityCardProps {
  date: string;
  image: string;
  title: string;
  description: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  date,
  image,
  title,
  description
}) => {
  return (
    <article className="bg-white rounded-xl overflow-hidden h-full flex flex-col transform hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative h-32 md:h-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <time className="absolute bottom-3 left-4 text-white z-20 flex items-center text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {date}
        </time>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-[#005A8C] mb-2 group-hover:text-[#D43A00] transition-colors line-clamp-1">
          {title}
        </h3>
        <div className="text-gray-800 text-sm leading-relaxed">
          {description.length > 120 ? (
            <>
              <p className="line-clamp-3">{description.slice(0, 120)}...</p>
              <button 
                onClick={() => {
                  const modal = document.createElement('div');
                  modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50';
                  modal.innerHTML = `
                    <div class="bg-white rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
                      <h3 class="text-xl font-bold text-[#005A8C] mb-4">${title}</h3>
                      <p class="text-gray-800 mb-6">${description}</p>
                      <button class="text-[#D43A00] hover:text-[#005A8C] transition-colors font-medium">Close</button>
                    </div>
                  `;
                  document.body.appendChild(modal);
                  modal.querySelector('button')?.addEventListener('click', () => modal.remove());
                  modal.addEventListener('click', (e) => {
                    if (e.target === modal) modal.remove();
                  });
                }}
                className="text-[#D43A00] hover:text-[#005A8C] transition-colors mt-2 text-sm font-medium inline-flex items-center group/btn"
              >
                Read more
                <svg className="w-4 h-4 ml-1 transform transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          ) : (
            <p className="line-clamp-3">{description}</p>
          )}
        </div>
      </div>
    </article>
  );
}; 