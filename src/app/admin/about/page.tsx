'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { AboutContent, getAboutContent, updateAboutContent, uploadAboutImage, deleteAboutImage } from '@/services/about';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiTrash2, FiUpload, FiSave, FiX } from 'react-icons/fi';

export default function AdminAbout() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [authLoading, user, router]);

  // Load about content when user is authenticated
  useEffect(() => {
    const loadAboutContent = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const content = await getAboutContent();
        console.log('Loaded about content:', content);
        setAboutContent(content);
      } catch (err) {
        console.error('Error loading about content:', err);
        setError('Failed to load about content');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user) {
      loadAboutContent();
    }
  }, [user, authLoading]);

  // Handle image preview
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aboutContent) return;

    setError('');
    setSuccess('');
    setFormLoading(true);

    try {
      // Handle new image upload if any
      const updatedImages = [...aboutContent.images];
      
      if (imageFile) {
        const imageUrl = await uploadAboutImage(imageFile);
        updatedImages.push(imageUrl);
      }

      // Update about content
      const contentToUpdate = {
        title: aboutContent.title,
        subtitle: aboutContent.subtitle,
        description1: aboutContent.description1,
        description2: aboutContent.description2,
        images: updatedImages
      };

      await updateAboutContent(contentToUpdate);
      setSuccess('About content updated successfully');
      setImageFile(null);
      setPreviewUrl(null);

      // Refresh about content
      const updatedContent = await getAboutContent();
      console.log('Updated about content:', updatedContent);
      setAboutContent(updatedContent);
    } catch (err) {
      console.error('Error saving about content:', err);
      setError('Failed to save about content');
    } finally {
      setFormLoading(false);
    }
  };

  const handleImageDelete = async (imageUrl: string) => {
    if (!aboutContent || aboutContent.images.length <= 1) {
      setError('Cannot delete the last image. At least one image is required.');
      return;
    }

    try {
      setFormLoading(true);
      
      // Delete image from storage and update content
      await deleteAboutImage(imageUrl);
      setSuccess('Image removed successfully');
      
      // Refresh about content
      const updatedContent = await getAboutContent();
      console.log('After delete - Updated about content:', updatedContent);
      setAboutContent(updatedContent);
    } catch (err) {
      console.error('Error deleting image:', err);
      setError('Failed to delete image');
    } finally {
      setFormLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const clearImageSelection = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  // Show loading spinner only during authentication
  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4B00]"></div>
      </div>
    );
  }

  // If not authenticated, return null (will be redirected)
  if (!user || !aboutContent) {
    return null;
  }

  console.log('Rendering with about content:', aboutContent);

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
              <h1 className="text-2xl sm:text-3xl font-bold text-[#FF4B00]">Manage About Section</h1>
              <p className="mt-1 text-sm text-gray-600">Edit your about section content</p>
            </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* About Content Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white shadow-lg rounded-xl p-3 sm:p-4 lg:p-6"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-[#FF4B00] mb-3 sm:mb-4">
              Edit About Content
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={aboutContent.title}
                  onChange={(e) => setAboutContent({...aboutContent, title: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF4B00] focus:ring-[#FF4B00] sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
                  Subtitle
                </label>
                <input
                  type="text"
                  id="subtitle"
                  value={aboutContent.subtitle}
                  onChange={(e) => setAboutContent({...aboutContent, subtitle: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF4B00] focus:ring-[#FF4B00] sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="description1" className="block text-sm font-medium text-gray-700">
                  First Paragraph
                </label>
                <textarea
                  id="description1"
                  value={aboutContent.description1}
                  onChange={(e) => setAboutContent({...aboutContent, description1: e.target.value})}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF4B00] focus:ring-[#FF4B00] sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="description2" className="block text-sm font-medium text-gray-700">
                  Second Paragraph
                </label>
                <textarea
                  id="description2"
                  value={aboutContent.description2}
                  onChange={(e) => setAboutContent({...aboutContent, description2: e.target.value})}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF4B00] focus:ring-[#FF4B00] sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Add New Image
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <FiUpload className="h-5 w-5 mr-2" />
                      Choose Image
                    </div>
                  </label>
                  {imageFile && (
                    <button
                      type="button"
                      onClick={clearImageSelection}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      <FiX className="h-5 w-5" />
                    </button>
                  )}
                </div>
                {previewUrl && (
                  <div className="mt-2 relative h-40 rounded-lg overflow-hidden">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#FF4B00] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#FF4B00]/90 focus:outline-none focus:ring-2 focus:ring-[#FF4B00] focus:ring-offset-2 disabled:opacity-50"
                >
                  {formLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave className="h-5 w-5 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Images Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white shadow-lg rounded-xl p-3 sm:p-4 lg:p-6"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-[#FF4B00] mb-3 sm:mb-4">
              About Images
            </h2>
            {aboutContent.images && aboutContent.images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aboutContent.images.map((imageUrl, index) => (
                  <div key={index} className="relative group h-48 sm:h-64">
                    <div className="relative w-full h-full rounded-lg overflow-hidden bg-white">
                      <Image
                        src={imageUrl}
                        alt={`About image ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        priority={true}
                      />
                      {/* Delete button positioned in top-right corner */}
                      <div className="absolute top-2 right-2 z-10">
                        <button
                          onClick={() => handleImageDelete(imageUrl)}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg
                            opacity-70 hover:opacity-100 transition-all duration-200
                            flex items-center space-x-1"
                          title="Delete image"
                        >
                          <FiTrash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="text-xs sm:text-sm sm:hidden">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">No images available. Add some images to get started.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 