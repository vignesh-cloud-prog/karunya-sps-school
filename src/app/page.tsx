"use client";

import Highlights from './components/Hero';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles/focus-areas.css';
import { useEffect, useState } from 'react';
import { getTeamMembers } from '@/services/team';
import { getReports } from '@/services/reports';
import { getAboutContent } from '@/services/about';
import { addVolunteer } from '@/services/volunteers';
import { TeamMember } from '@/types/team';
import { Report } from '@/types/reports';
import { AboutContent } from '@/services/about';
import { VolunteerFormData } from '@/types/volunteers';
import ActivitiesSection from './components/ActivitiesSection';
import Navbar from './components/Navbar';
import { getPrograms } from '@/services/programs';
import { Program } from '@/services/programs';

export default function Home() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [volunteerForm, setVolunteerForm] = useState<VolunteerFormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [members, reportsList, about, programsList] = await Promise.all([
          getTeamMembers(),
          getReports(),
          getAboutContent(),
          getPrograms()
        ]);
        setTeamMembers(members);
        setReports(reportsList);
        setAboutContent(about);
        setPrograms(programsList);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const aboutTitle = aboutContent?.title || 'About Us';
  const aboutSubtitle = aboutContent?.subtitle || 'Karunya Special School';
  const aboutDescription1 = aboutContent?.description1 || 'Our NGO believes that all children should be given equal opportunities and see that they grow up in a decent environment and become the proud citizens of the country.';
  const aboutDescription2 = aboutContent?.description2 || 'Karunya Special School strives to rehabilitate the special children by training them to acquire special skill and lead an independent life. Special children include those with autism, mental retardation, down syndrome and slow learners.';
  const aboutImages = aboutContent?.images || ['/planting.jpg', '/about-image.jpg'];

  // Get current academic year
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const academicYear = `${currentYear}-${nextYear}`;

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

  // Handle volunteer form changes
  const handleVolunteerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVolunteerForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle volunteer form submission
  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setFormError('');

    try {
      await addVolunteer(volunteerForm);
      setFormStatus('success');
      // Reset form after successful submission
      setVolunteerForm({
        name: '',
        email: '',
        phone: '',
        location: '',
        message: ''
      });
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting volunteer form:', error);
      setFormStatus('error');
      setFormError('There was an error submitting your application. Please try again later.');
    }
  };

  return (
    <main className="min-h-screen">
              <Navbar />

      <Highlights />

      {/* Consistent section spacing and gradients */}
      <div className="space-y-1"> {/* Add 1px gap between sections for visual separation */}
        {/* About Section */}
        <section id="about" aria-labelledby="about-title" className="py-20 md:py-28 px-4 bg-gradient-to-b from-white to-[#FFB800]/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"></div>
          <div className="max-w-7xl mx-auto relative">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 id="about-title" className="text-4xl md:text-5xl font-bold text-[#FF4B00] mb-4">{aboutContent?.title || 'About Us'}</h2>
              <div className="w-24 h-1.5 bg-[#FFB800] rounded-full mb-6"></div>
              <h3 className="text-3xl md:text-4xl text-[#0077BE]">{aboutContent?.subtitle || 'Karunya Special School'}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={0}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  autoplay={{ 
                    delay: 4000,
                    disableOnInteraction: false 
                  }}
                  loop={true}
                  className="h-full rounded-2xl about-slider"
                >
                  {(aboutContent?.images || ['/planting.jpg', '/about-image.jpg']).map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-full">
                        <Image
                          src={image}
                          alt={`About image ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div>
                <p className="text-gray-800 mb-6 leading-relaxed text-lg">
                  {aboutContent?.description1 || 'Our NGO believes that all children should be given equal opportunities and see that they grow up in a decent environment and become the proud citizens of the country.'}
                </p>
                <p className="text-gray-800 leading-relaxed text-lg">
                  {aboutContent?.description2 || 'Karunya Special School strives to rehabilitate the special children by training them to acquire special skill and lead an independent life. Special children include those with autism, mental retardation, down syndrome and slow learners.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section aria-labelledby="vision-mission-title" className="py-20 md:py-28 px-4 bg-gradient-to-b from-[#FFB800]/10 to-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"></div>
          <div className="max-w-7xl mx-auto relative">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 id="vision-mission-title" className="text-4xl md:text-5xl font-bold text-[#FF4B00] mb-4">Mission & Vision</h2>
              <div className="w-24 h-1.5 bg-[#FFB800] rounded-full mb-6"></div>
            </div>
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

        {/* Focus Areas Section */}
        <section aria-labelledby="focus-areas-title" className="py-20 md:py-28 px-4 bg-gradient-to-b from-[#FFB800]/10 to-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"></div>
          <div className="max-w-7xl mx-auto relative">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 id="focus-areas-title" className="text-4xl md:text-5xl font-bold text-[#FF4B00] mb-4">Our Focus Areas</h2>
              <div className="w-24 h-1.5 bg-[#FFB800] rounded-full mb-6"></div>
              <p className="text-center text-[#0077BE] mb-12 max-w-3xl mx-auto text-xl">
                An integrated approach to build a equitable and empowered society
              </p>
            </div>
            
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

        {/* Programs Section */}
        <section id="programs" aria-labelledby="programs-title" className="py-20 md:py-28 px-4 bg-gradient-to-b from-white to-[#FFB800]/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"></div>
          <div className="max-w-7xl mx-auto relative">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 id="programs-title" className="text-4xl md:text-5xl font-bold text-[#FF4B00] mb-4">Programs</h2>
              <div className="w-24 h-1.5 bg-[#FFB800] rounded-full mb-6"></div>
              <p className="text-[#0077BE] text-xl max-w-3xl">Discover our comprehensive range of programs designed to nurture and develop special abilities</p>
            </div>

            <div className="space-y-8">
              {programs.map((program) => (
                <article key={program.id} className="bg-white rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl group">
                  <div className="grid md:grid-cols-12 gap-0">
                    <div className="relative h-[280px] md:h-[320px] md:col-span-5 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent z-10"></div>
                      <Image
                        src={program.image}
                        alt={program.title}
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
                        Admission Open for {academicYear}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        Admissions are now open for the academic year {academicYear} at Kaurnya Special School. Known for its commitment to providing quality education and specialized care for individuals with diverse learning needs, Kaurnya Special School offers a supportive and inclusive environment.
                      </p>
                      <Link 
                        href="#contact"
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

        {/* Activities Section */}
        <ActivitiesSection />

        {/* Members Section */}
        <section id="members" aria-labelledby="members-title" className="py-20 md:py-28 px-4 bg-gradient-to-b from-white to-[#FFB800]/10 relative overflow-hidden">
          <div className="absolute inset-0  opacity-5"></div>
          <div className="max-w-7xl mx-auto relative">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 id="members-title" className="text-4xl md:text-5xl font-bold text-[#FF4B00] mb-4">Members</h2>
              <div className="w-24 h-1.5 bg-[#FFB800] rounded-full mb-6"></div>
              <h3 className="text-3xl font-bold text-[#0077BE] mb-8">Team Members</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-2xl shadow-md">
                  {member.image ? (
                    <div className="w-24 h-24 rounded-xl flex-shrink-0 overflow-hidden">
                      <Image 
                        src={member.image} 
                        alt={member.name} 
                        width={96} 
                        height={96} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-[#FFB800]/10 rounded-xl flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-gray-600">{member.position}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

        {/* Reports Section */}
        <section id="reports" aria-labelledby="reports-title" className="py-20 md:py-28 px-4 bg-gradient-to-b from-white to-[#FFB800]/10 relative overflow-hidden">
          <div className="absolute inset-0  opacity-5"></div>
          <div className="max-w-7xl mx-auto relative">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 id="reports-title" className="text-4xl md:text-5xl font-bold text-[#FF4B00] mb-4">Reports</h2>
              <div className="w-24 h-1.5 bg-[#FFB800] rounded-full mb-6"></div>
            </div>
            {loading ? (
              <div className="grid md:grid-cols-2 gap-8">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl shadow-lg animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : reports.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No reports available at the moment</p>
              </div>
            ) : (
            <div className="grid md:grid-cols-2 gap-8">
                {reports.map((report) => (
                  <article key={report.id} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-[#FFB800]/20">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                        <h3 className="text-2xl font-bold text-[#0077BE] mb-4">{report.title}</h3>
                        <p className="text-gray-700 mb-6">{report.description}</p>
                    <Link 
                          href={report.fileUrl}
                      className="inline-flex items-center space-x-2 text-[#FF4B00] hover:text-[#0077BE] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Download Report</span>
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
                ))}
            </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section id="support" aria-labelledby="contact-title" className="py-20 md:py-28 px-4 bg-gradient-to-b from-white to-[#FFB800]/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#FFB800]/5"></div>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 relative">
            <div id="donate">
              <h2 className="text-4xl font-bold mb-8 text-[#FF4B00]">DONATE NOW!</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#0077BE] mb-6">Bank Account Details</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Account Number', value: '0618101040229' },
                      { label: 'Bank & Branch', value: 'Canara Bank, Court Road Branch, Udupi' },
                      { label: 'IFSC Code', value: 'CNRB0000618' },
                      { label: 'UPI ID', value: '9742352647@upi' }
                    ].map((detail, index) => (
                      <div key={index} className="flex items-center justify-between group">
                        <div>
                          <p className="text-sm text-gray-600">{detail.label}</p>
                          <p className="text-gray-900 font-medium">{detail.value}</p>
                        </div>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(detail.value);
                            const button = document.getElementById(`copy-button-${index}`);
                            if (button) {
                              button.classList.add('copied');
                              setTimeout(() => {
                                button.classList.remove('copied');
                              }, 2000);
                            }
                          }}
                          id={`copy-button-${index}`}
                          className="p-2 text-[#0077BE] hover:text-[#FF4B00] transition-colors relative"
                          aria-label={`Copy ${detail.label}`}
                        >
                          <svg className="w-5 h-5 copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <svg className="w-5 h-5 absolute inset-0 m-auto check-icon opacity-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="bg-white p-8 rounded-2xl shadow-md">
                    <Image
                      src="/upi-qr.jpeg"
                      alt="BHIM UPI QR Code for Karunya Special School"
                      width={300}
                      height={300}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <p className="italic text-gray-700">
                  <span className="font-semibold text-[#0077BE]">Note:</span> All donations are eligible for tax savings under 80G.
                </p>
              </div>
            </div>
            <div id='volunteer'>
              <h2 className="text-4xl font-bold mb-8 text-[#FF4B00]">VOLUNTEER WITH US</h2>
              <p className="text-xl mb-8 text-gray-800">
                Volunteer with us for making a difference in somebody&apos;s life and also it is a good opportunity for you to give back to the society. For more information, mail us at karunyaspschool@gmail.com
              </p>
              
              {formStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-2">Thank you for your interest!</h3>
                  <p>Your volunteer application has been submitted successfully. We will contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                  <div>
                    <input 
                      type="text" 
                      name="name"
                      value={volunteerForm.name}
                      onChange={handleVolunteerChange}
                      placeholder="Name *" 
                      className="w-full p-4 rounded-xl border border-[#FFB800]/20 focus:border-[#0077BE] focus:ring-2 focus:ring-[#0077BE]/20 outline-none text-gray-900" 
                      required 
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      name="email"
                      value={volunteerForm.email}
                      onChange={handleVolunteerChange}
                      placeholder="Email *" 
                      className="w-full p-4 rounded-xl border border-[#FFB800]/20 focus:border-[#0077BE] focus:ring-2 focus:ring-[#0077BE]/20 outline-none text-gray-900" 
                      required 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="tel" 
                      name="phone"
                      value={volunteerForm.phone}
                      onChange={handleVolunteerChange}
                      placeholder="Phone *" 
                      className="w-full p-4 rounded-xl border border-[#FFB800]/20 focus:border-[#0077BE] focus:ring-2 focus:ring-[#0077BE]/20 outline-none text-gray-900" 
                      required 
                    />
                    <input 
                      type="text" 
                      name="location"
                      value={volunteerForm.location}
                      onChange={handleVolunteerChange}
                      placeholder="Location *" 
                      className="w-full p-4 rounded-xl border border-[#FFB800]/20 focus:border-[#0077BE] focus:ring-2 focus:ring-[#0077BE]/20 outline-none text-gray-900" 
                      required 
                    />
                  </div>
                  <div>
                    <textarea 
                      name="message"
                      value={volunteerForm.message}
                      onChange={handleVolunteerChange}
                      placeholder="Message" 
                      className="w-full p-4 rounded-xl border border-[#FFB800]/20 focus:border-[#0077BE] focus:ring-2 focus:ring-[#0077BE]/20 outline-none h-32 text-gray-900"
                    ></textarea>
                  </div>
                  
                  {formError && (
                    <div className="text-red-600 text-sm">
                      {formError}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-end">
                    <button 
                      type="submit" 
                      disabled={formStatus === 'loading'}
                      className={`bg-[#FF4B00] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#0077BE] transition-colors ${
                        formStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {formStatus === 'loading' ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          PROCESSING...
                        </span>
                      ) : 'GET INVOLVED'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Get in touch Section */}
        <section id='contact' aria-labelledby="contact-info-title" className="py-20 md:py-28 px-4 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"></div>
          <div className="max-w-7xl mx-auto relative">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 id="contact-info-title" className="text-4xl md:text-5xl font-bold text-[#FF4B00] mb-12">Get in touch</h2>
              <div className="w-24 h-1.5 bg-[#FFB800] rounded-full mb-6"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl text-[#0077BE] mb-4"> Address</h3>
                  <p className="text-gray-800">Kadekar- Kudrukere Post, Malpe- 576108</p>
                </div>
                <div>
                  <h3 className="text-2xl text-[#0077BE] mb-4">Email Address</h3>
                  <p className="text-gray-800">karunyaspschool@gmail.com</p>
                </div>
                <div>
                  <h3 className="text-2xl text-[#0077BE] mb-4">Phone Number</h3>
                  <p className="text-gray-800">9742352647</p>
                </div>
                <div>
                  <h3 className="text-2xl text-[#0077BE] mb-4">Follow Us</h3>
                  <div className="flex space-x-6">
                    <Link 
                      href="https://www.facebook.com/karunyaspecialschool" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0077BE] hover:text-[#FF4B00] transition-colors"
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                      </svg>
                    </Link>
                    <Link 
                      href="https://www.instagram.com/karunyaspecialschool" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0077BE] hover:text-[#FF4B00] transition-colors"
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                      </svg>
                    </Link>
                    <Link 
                      href="https://twitter.com/karunyaspecialschool" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0077BE] hover:text-[#FF4B00] transition-colors"
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </Link>
                    <Link 
                      href="https://www.youtube.com/karunyaspecialschool" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0077BE] hover:text-[#FF4B00] transition-colors"
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="h-[400px] relative rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://maps.google.com/maps?ll=13.327433,74.71912&z=15&t=m&hl=en-GB&gl=US&mapclient=embed&q=Kadekar-%20Kudrukere%20Post%2C%20Malpe-%20576108&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Karunya Special School location"
                  className="rounded-2xl"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Copyright */}
      <footer className="bg-white py-6 border-t border-[#FFB800]/20">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>
            © {new Date().getFullYear()} Karunya Special School. Website developed by{' '}
            <Link 
              href="https://www.vigneshnu.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#0077BE] hover:text-[#FF4B00] transition-colors font-medium"
            >
              Vignesh
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
} 