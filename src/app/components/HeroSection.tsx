'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-white min-h-screen flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 bg-[url('/images/pattern-bg.png')] opacity-5"></div>
      
      <div className="container mx-auto px-4 z-10 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              <span className="text-[#D43A00]">Excellence</span> in Education
              <span className="block mt-2">Shaping Future Leaders</span>
            </h1>
            
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              At Karunya SPS School, we provide a transformative educational experience that nurtures academic excellence, character development, and life skills in a supportive environment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/admissions" 
                className="inline-block bg-[#D43A00] hover:bg-[#FFB800] text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Apply Now
              </Link>
              
              <Link 
                href="/virtual-tour" 
                className="inline-block bg-white border-2 border-[#D43A00] text-[#D43A00] hover:bg-gray-50 font-bold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Virtual Tour
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-bold text-[#D43A00]">35+</span>
                <span className="text-gray-700">Years of Excellence</span>
              </div>
              
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-bold text-[#D43A00]">95%</span>
                <span className="text-gray-700">Success Rate</span>
              </div>
              
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-bold text-[#D43A00]">50+</span>
                <span className="text-gray-700">Expert Faculty</span>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative">
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/hero-students.jpg"
                alt="Students at Karunya SPS School"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center space-x-4 p-2">
                <div className="w-12 h-12 bg-[#FFB800] rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">CBSE Affiliated</h3>
                  <p className="text-sm text-gray-600">Quality Education Assured</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-8 -right-8 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center space-x-4 p-2">
                <div className="w-12 h-12 bg-[#D43A00] rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Safe Environment</h3>
                  <p className="text-sm text-gray-600">Student Safety First</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 