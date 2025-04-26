'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { Activity, getActivities } from '@/services/activities';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';

export default function ActivitiesSection() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Activities</h2>
            <div className="flex justify-center">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (activities.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Activities</h2>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <p className="text-gray-600">No activities available at the moment. Please check back later.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="activities" aria-labelledby="activities-title" className="py-20 md:py-28 px-4 bg-gradient-to-b from-white to-[#FFB800]/10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 id="activities-title" className="text-4xl md:text-5xl font-bold text-[#FF4B00] mb-4">Our Activities</h2>
          <div className="w-24 h-1.5 bg-[#FFB800] rounded-full mb-6"></div>
        </div>
        <div className="relative pb-16">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            pagination={{ 
              clickable: true,
              el: '.activities-pagination',
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active'
            }}
            autoplay={{ 
              delay: 3000,
              disableOnInteraction: false 
            }}
            loop={true}
            className="activities-slider"
          >
            {activities.map((activity) => (
              <SwiperSlide key={activity.id}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{activity.date}</p>
                    <p className="text-gray-700 mb-4">
                      {activity.description.length > 120
                        ? `${activity.description.substring(0, 120)}...`
                        : activity.description}
                    </p>
                    {activity.description.length > 120 && (
                      <button
                        onClick={() => setSelectedActivity(activity)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Read more
                      </button>
                    )}
                  </div>
                </motion.article>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="activities-pagination flex justify-center items-center mt-8" />
        </div>
      </div>

      {/* Modal for full description */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="relative h-64 mb-4">
              <Image
                src={selectedActivity.image}
                alt={selectedActivity.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2">{selectedActivity.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{selectedActivity.date}</p>
            <p className="text-gray-700 mb-4">{selectedActivity.description}</p>
            <button
              onClick={() => setSelectedActivity(null)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
} 