'use client';

import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from './SectionHeader';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="About Karunya SPS School"
          subtitle="Discover our commitment to excellence in education and holistic development"
        />
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <Image
              src="/images/school-building.jpg"
              alt="Karunya SPS School Building"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
            <p className="text-gray-700 mb-6">
              Founded in 1985, Karunya SPS School has been dedicated to providing quality education that nurtures intellectual, physical, emotional, and spiritual growth. Our journey began with a vision to create an educational institution that would prepare students not just for examinations, but for life.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700 mb-6">
              To provide a stimulating learning environment that encourages students to realize their full potential, develop critical thinking skills, and become responsible global citizens with strong moral values.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700 mb-6">
              To be recognized as a center of excellence in education that inspires and empowers students to become leaders and innovators who contribute positively to society.
            </p>
            
            <Link 
              href="/about" 
              className="inline-block bg-[#FFB800] hover:bg-[#D43A00] text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <div className="w-16 h-16 bg-[#FFB800] rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Specialized Curriculum</h3>
            <p className="text-gray-700">
              Our curriculum is designed to balance academic excellence with co-curricular activities, ensuring the all-round development of each student.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <div className="w-16 h-16 bg-[#FFB800] rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Experienced Faculty</h3>
            <p className="text-gray-700">
              Our team of highly qualified and dedicated teachers mentor students with personalized attention to foster their unique talents and abilities.
            </p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <div className="w-16 h-16 bg-[#FFB800] rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Holistic Development</h3>
            <p className="text-gray-700">
              We emphasize character building, values education, and extracurricular activities to ensure students grow into well-rounded individuals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 