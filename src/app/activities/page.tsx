"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getActivities } from '../../services/activities';
import { Activity } from '../../types/activities';
import { motion } from 'framer-motion';

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const activitiesPerPage = 6;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activitiesList = await getActivities();
        setActivities(activitiesList);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Filter and sort activities
  const filteredActivities = activities
    .filter(activity => 
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

  // Pagination
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = filteredActivities.slice(indexOfFirstActivity, indexOfLastActivity);
  const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#FFB800]/10">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#FF4B00] mb-4">All Activities</h1>
          <div className="w-24 h-1.5 bg-[#FFB800] rounded-full mb-6"></div>
          <p className="text-[#0077BE] text-xl max-w-3xl">Explore all our activities and events</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#FFB800]/20 focus:border-[#0077BE] focus:ring-2 focus:ring-[#0077BE]/20 outline-none"
            />
          </div>
          <div className="w-full md:w-1/4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#FFB800]/20 focus:border-[#0077BE] focus:ring-2 focus:ring-[#0077BE]/20 outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Activities Grid */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg animate-pulse">
                <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">No activities found matching your search</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-8">
              {currentActivities.map((activity) => (
                <motion.article
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={activity.image || '/placeholder-activity.jpg'}
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
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-[#FFB800]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-[#FF4B00] text-white'
                          : 'border border-[#FFB800]/20 hover:bg-[#FFB800]/10'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-[#FFB800]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal for full description */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="relative h-64 mb-4">
              <Image
                src={selectedActivity.image || '/placeholder-activity.jpg'}
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
    </main>
  );
} 