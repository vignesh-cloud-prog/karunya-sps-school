"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getHighlights, Highlight } from '../../services/highlights';

const Highlights = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const highlights = await getHighlights();
        // Filter out any highlights with empty image URLs or provide a default
        const validHighlights = highlights.map(highlight => ({
          ...highlight,
          image: highlight.image || '/hero-1.jpg' // Use an existing image as fallback
        }));
        setSlides(validHighlights.length > 0 ? validHighlights : defaultSlides);
      } catch (error) {
        console.error('Error fetching highlights:', error);
        setSlides(defaultSlides);
      } finally {
        setLoading(false);
      }
    };
    fetchHighlights();
  }, []);

  // Default slides to use if no highlights are found or there's an error
  const defaultSlides = [
    {
      id: '1',
      image: '/hero-1.jpg',
      title: 'Karunya Special School',
      description: 'We provide Education for Specially Aided Children in and around Malpe',
      tagline: 'dare to be DIFFERENT'
    },
    {
      id: '2',
      image: '/hero-2.jpeg',
      title: 'Education for Specially Aided Children',
      description: 'Creating a nurturing environment for children with special needs to learn and grow',
      tagline: 'Empowering Every Child'
    },
    {
      id: '3',
      image: '/hero-3.jpeg',
      title: 'Building Future Together',
      description: 'Supporting children with autism, down syndrome, and special learning needs',
      tagline: 'Making Dreams Possible'
    }
  ];

  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (loading) {
    return (
      <section aria-label="Hero Slider" className="relative h-[600px] md:h-[700px] flex items-center justify-center bg-gradient-to-b from-primary-yellow/5 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4B00]"></div>
      </section>
    );
  }

  return (
    <section aria-label="Hero Slider" className="relative h-[600px] md:h-[700px] overflow-hidden bg-gradient-to-b from-primary-yellow/5 to-white">
      {/* Slider */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.image && (
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            )}
            {/* Light Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-yellow/10 to-white/90" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary-orange animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-primary-blue max-w-2xl mx-auto animate-fade-in-up">
                  {slide.description}
                </p>
                <p className="text-xl md:text-2xl font-semibold text-primary-orange animate-fade-in-up delay-200">
                  {slide.tagline}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index
                ? 'bg-primary-orange scale-125'
                : 'bg-primary-blue/30 hover:bg-primary-blue/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg 
            className="w-6 h-6 text-primary-blue" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Highlights; 