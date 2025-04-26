'use client';

import SectionHeader from './SectionHeader';

export default function MissionVisionSection() {
  return (
    <section aria-labelledby="vision-mission-title" className="py-20 md:py-28 px-4 bg-gradient-to-b from-[#FFB800]/10 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"></div>
      <div className="max-w-7xl mx-auto relative">
        <SectionHeader title="Mission & Vision" />
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-[#FFB800]/20">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0077BE] mb-6 flex items-center">
              <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              OUR VISION
            </h3>
            <p className="text-gray-800 leading-relaxed text-lg">
              To see that all children get equal opportunities in their lives so that the society is equipped with healthy citizens and therefore be more productive in their lives. To incorporate more programs for the children in future to enrich their lives.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-[#FFB800]/20">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0077BE] mb-6 flex items-center">
              <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
              </svg>
              OUR MISSION
            </h3>
            <p className="text-gray-800 leading-relaxed text-lg">
              In order to fulfill our vision we have been serving the children with mentally disabled, autism and other ailments. We are providing them the atmosphere such that they learn and participate in the society equipped with necessary knowledge and cultural activities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 