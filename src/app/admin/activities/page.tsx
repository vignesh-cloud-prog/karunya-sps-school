'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Activity, ActivityFormData, addActivity, getActivities, updateActivity, deleteActivity, uploadImage, deleteImage } from '@/services/activities';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { format } from 'date-fns';

export default function AdminActivities() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState<ActivityFormData>({
    title: '',
    description: '',
    date: '',
    image: '',
    imageRef: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesPerPage] = useState(8);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [previewURL, setPreviewURL] = useState<string>('');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [authLoading, user, router]);

  // Load activities when user is authenticated
  useEffect(() => {
    const loadActivities = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const activitiesList = await getActivities();
        setActivities(activitiesList);
      } catch (err) {
        console.error('Error loading activities:', err);
        setError('Failed to load activities');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user) {
      loadActivities();
    }
  }, [user, authLoading]);

  // Filter and sort activities
  const filteredActivities = activities
    .filter(activity => 
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortField === 'title') {
        return sortDirection === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      }
      return 0;
    });

  // Pagination
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = filteredActivities.slice(indexOfFirstActivity, indexOfLastActivity);
  const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);

  const openModal = (activity?: Activity) => {
    if (activity) {
      setEditingActivity(activity);
      setFormData({
        title: activity.title,
        description: activity.description,
        date: activity.date,
        image: activity.image,
        imageRef: activity.imageRef,
      });
      setPreviewURL(activity.image || '/placeholder-activity.jpg');
    } else {
      // Reset form for new activity
      setEditingActivity(null);
      setFormData({
        title: '',
        description: '',
        date: '',
        image: '',
        imageRef: '',
      });
      setPreviewURL('');
      setImageFile(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setFormLoading(true);

    try {
      let imageUrl = formData.image;
      let imageRef = formData.imageRef;

      if (imageFile) {
        const { url, ref } = await uploadImage(imageFile);
        imageUrl = url;
        imageRef = ref;

        // Delete old image if editing and image changed
        if (editingActivity?.imageRef && editingActivity.image !== imageUrl) {
          await deleteImage(editingActivity.imageRef);
        }
      }

      const activityData = {
        ...formData,
        image: imageUrl,
        imageRef,
      };

      if (editingActivity) {
        await updateActivity(editingActivity.id, activityData);
        setSuccess('Activity updated successfully');
      } else {
        await addActivity(activityData);
        setSuccess('Activity added successfully');
      }

      // Reset form and close modal after successful submission
      closeModal();

      // Refresh activities list
      const activitiesList = await getActivities();
      setActivities(activitiesList);
    } catch (err) {
      console.error('Error saving activity:', err);
      setError('Failed to save activity');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string, imageRef: string) => {
    if (!confirm('Are you sure you want to delete this activity?')) return;

    try {
      if (imageRef) {
        await deleteImage(imageRef);
      }
      await deleteActivity(id);
      setSuccess('Activity deleted successfully');
      
      // If on the last page and deleting the last item, go to previous page
      if (currentPage > 1 && currentActivities.length === 1) {
        setCurrentPage(currentPage - 1);
      }
      
      // Refresh activities list
      const activitiesList = await getActivities();
      setActivities(activitiesList);
    } catch (err) {
      console.error('Error deleting activity:', err);
      setError('Failed to delete activity');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    }
  };

  // Handle sort toggle
  const handleSort = (field: 'title' | 'date') => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  // Show loading spinner only during authentication
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4B00]"></div>
      </div>
    );
  }

  // If not authenticated, return null (will be redirected)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFB800]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#FF4B00]">Manage Activities</h1>
              <p className="mt-1 text-sm text-gray-600">Add, edit or remove school activities</p>
            </div>
            <button
              onClick={() => openModal()}
              className="px-4 py-2 bg-[#FF4B00] text-white rounded-lg hover:bg-[#e64400] transition-colors flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Add Activity</span>
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-3 sm:mb-4 bg-red-50 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-3 sm:mb-4 bg-green-50 border border-green-400 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg relative"
              role="alert"
            >
              <span className="block sm:inline">{success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search and filter */}
        <div className="mb-6 bg-white rounded-xl shadow p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                id="search"
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 focus:ring-[#FF4B00] focus:border-[#FF4B00]"
              />
            </div>
            <div className="w-full md:w-48">
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                id="sort"
                value={`${sortField}-${sortDirection}`}
                onChange={(e) => {
                  const [field, direction] = e.target.value.split('-');
                  setSortField(field as 'date' | 'title');
                  setSortDirection(direction as 'asc' | 'desc');
                }}
                className="w-full p-2 rounded-lg border border-gray-300 focus:ring-[#FF4B00] focus:border-[#FF4B00]"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Activities Table */}
        <div className="bg-white shadow rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#FF4B00]"></div>
            </div>
          ) : activities.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No activities found. Create your first activity using the "Add Activity" button.</p>
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No matching activities found. Try adjusting your search.</p>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="hidden sm:grid sm:grid-cols-12 gap-4 p-4 bg-gray-50 border-b">
                <div 
                  className="sm:col-span-2 font-medium text-gray-700 cursor-pointer flex items-center"
                  onClick={() => handleSort('date')}
                >
                  <span>Date</span>
                  {sortField === 'date' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
                <div className="sm:col-span-2 font-medium text-gray-700">Image</div>
                <div 
                  className="sm:col-span-2 font-medium text-gray-700 cursor-pointer flex items-center"
                  onClick={() => handleSort('title')}
                >
                  <span>Title</span>
                  {sortField === 'title' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
                <div className="sm:col-span-3 font-medium text-gray-700">Description</div>
                <div className="sm:col-span-3 font-medium text-gray-700 text-center">Actions</div>
              </div>

              {/* Table Body - Desktop */}
              <div className="hidden sm:block">
                {currentActivities.map((activity) => (
                  <div key={activity.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50">
                    <div className="col-span-2 text-gray-700">{formatDate(activity.date)}</div>
                    <div className="col-span-2">
                      <div className="relative h-16 w-24 rounded overflow-hidden">
                        <Image
                          src={activity.image || '/placeholder-activity.jpg'}
                          alt={activity.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="col-span-2 font-medium text-gray-900">{activity.title}</div>
                    <div className="col-span-3 text-gray-700 truncate">
                      {activity.description.length > 80
                        ? `${activity.description.substring(0, 80)}...`
                        : activity.description}
                    </div>
                    <div className="col-span-3 flex justify-center space-x-2">
                      <button
                        onClick={() => openModal(activity)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(activity.id, activity.imageRef)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Card View */}
              <div className="sm:hidden">
                {currentActivities.map((activity) => (
                  <div key={activity.id} className="p-4 border-b">
                    <div className="flex items-start gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                        <Image
                          src={activity.image || '/placeholder-activity.jpg'}
                          alt={activity.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{activity.title}</h3>
                        <span className="text-sm text-gray-600">{formatDate(activity.date)}</span>
                        <p className="text-sm text-gray-700 line-clamp-2 mt-1">{activity.description}</p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-3">
                      <button
                        onClick={() => openModal(activity)}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(activity.id, activity.imageRef)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-wrap justify-center py-4 gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded ${
                        currentPage === page
                          ? 'bg-[#FF4B00] text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Activity Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingActivity ? 'Edit Activity' : 'Add New Activity'}
                  </h2>
                  <button 
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {error && (
                  <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF4B00] focus:border-[#FF4B00]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF4B00] focus:border-[#FF4B00]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF4B00] focus:border-[#FF4B00]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                      Image {editingActivity ? '' : <span className="text-red-500">*</span>}
                    </label>
                    {previewURL && (
                      <div className="mb-3 relative h-40 rounded-md overflow-hidden border border-gray-300">
                        <Image
                          src={previewURL}
                          alt="Activity preview"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 400px"
                          priority
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF4B00] focus:border-[#FF4B00]"
                      required={!editingActivity && !previewURL}
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      {editingActivity ? "Upload a new image to replace the current one (optional)" : "Upload an image for the activity"}
                    </p>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4B00]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF4B00] hover:bg-[#e64400] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4B00] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        'Save Activity'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}