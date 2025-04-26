'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import SectionHeader from './SectionHeader';

export default function FocusAreasSection() {
  const focusAreas = [
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'CHILDREN RIGHTS',
      description: 'Ensuring the rights and well-being of every child'
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'DISABILITY',
      description: 'Supporting and empowering individuals with disabilities'
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'EDUCATION',
      description: 'Providing quality education and skill development'
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'CHILD PROTECTION',
      description: 'Ensuring safety and well-being of every child'
    }
  ];

  return (
    <section aria-labelledby="focus-areas-title" className="py-20 md:py-28 px-4 bg-gradient-to-b from-[#FFB800]/10 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"></div>
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader 
          title="Our Focus Areas"
          subtitle="An integrated approach to build a equitable and empowered society"
        />
        
        {/* Slider for mobile */}
        <div className="md:hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="pb-12"
          >
            {focusAreas.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-[#FFB800]/20">
                  <div className="mb-6 mx-auto flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4 text-[#0077BE]">{item.title}</h3>
                  <p className="text-gray-800 text-center">{item.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grid for desktop */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {focusAreas.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-[#FFB800]/20">
              <div className="mb-6 mx-auto flex justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-4 text-[#0077BE]">{item.title}</h3>
              <p className="text-gray-800 text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 