'use client';

import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from './SectionHeader';

export default function ProgramsSection() {
  const programs = [
    {
      image: '/education.jpeg',
      alt: 'Students participating in yoga class',
      title: 'Education for Specially Aided Children',
      description: 'Karunya Special School strives to rehabilitate the special children by training them to acquire special skill and lead an independent life. We are providing them the atmosphere such that they learn and participate in the society equipped with necessary knowledge and cultural activities.'
    },
    {
      image: '/birthday.jpg',
      alt: 'Birthday celebration at school',
      title: 'Birthday Celebration',
      description: 'Karunya special school celebrated well wisher\'s birthday. Students, teachers, and staff, a vibrant tapestry of well-wishers, surrounded the guest of honor. Cake slices, shared with warmth and smiles, cemented the joyous occasion.'
    },
    {
      image: '/skating.jpg',
      alt: 'Students learning skating',
      title: 'Skating Class',
      description: 'Wheels whiz, laughter rings - Karunya\'s rink celebrates joy on blades. Skates empower each child\'s journey, from wobbly starts to graceful turns. Inclusion rolls forward, one joyful stride at a time.'
    },
    {
      image: '/exercise.jpg',
      alt: 'Students doing exercise',
      title: 'Exercise for Students',
      description: 'Sunlight streams as Karunya starts to move. Gentle stretches wake young minds and bodies. Music lifts spirits, laughter fills the air. Exercises designed with care, build strength and smiles, side-by-side. Each move, a victory, celebrated with pride.'
    },
    {
      image: '/cycling.jpg',
      alt: 'Students learning cycling',
      title: 'Cycling',
      description: 'Two wheels and endless smiles! Karunya kids cycle free, joy in every turn. Inclusion rolls, spirits high, sunshine paints their laughter\'s sky.'
    }
  ];

  return (
    <section id="programs" aria-labelledby="programs-title" className="py-20 md:py-28 px-4 bg-gradient-to-b from-white to-[#FFB800]/10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"></div>
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader 
          title="Programs" 
          subtitle="Discover our comprehensive range of programs designed to nurture and develop special abilities"
        />

        <div className="space-y-8">
          {programs.map((program, index) => (
            <article key={index} className="bg-white rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl group">
              <div className="grid md:grid-cols-12 gap-0">
                <div className="relative h-[280px] md:h-[320px] md:col-span-5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent z-10"></div>
                  <Image
                    src={program.image}
                    alt={program.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                  />
                </div>
                <div className="p-6 md:p-8 md:col-span-7 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0077BE] mb-4 group-hover:text-[#FF4B00] transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {program.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
          
          {/* Admissions */}
          <article className="bg-white rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl group">
            <div className="grid md:grid-cols-12 gap-0">
              <div className="relative h-[280px] md:h-[320px] md:col-span-5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent z-10"></div>
                <Image
                  src="/school-front.jpg"
                  alt="Karunya Special School building"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </div>
              <div className="p-6 md:p-8 md:col-span-7 flex flex-col justify-center">
                <div className="flex flex-col">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0077BE] mb-4 group-hover:text-[#FF4B00] transition-colors">
                    Admission Open for 2024-25
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Admissions are now open for the academic year 2024-25 at Kaurnya Special School. Known for its commitment to providing quality education and specialized care for individuals with diverse learning needs, Kaurnya Special School offers a supportive and inclusive environment.
                  </p>
                  <Link 
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-[#FF4B00] text-white rounded-lg font-semibold hover:bg-[#0077BE] transition-all duration-300 group-hover:translate-x-2 w-fit"
                  >
                    Apply Now
                    <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
} 