'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { getHighlights, addHighlight, deleteHighlight, updateHighlight } from '@/services/highlights';
import { Highlight } from '@/types/highlights';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { uploadImage, deleteImage } from '@/services/activities';

export default function AdminHighlights() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Highlight, 'id'>>({
    image: '',
    title: '',
    description: '',
    tagline: '',
    imageRef: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingHighlight, setEditingHighlight] = useState<Highlight | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [authLoading, user, router]);

  // Load highlights when user is authenticated
  useEffect(() => {
    const loadHighlights = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const highlightsList = await getHighlights();
        setHighlights(highlightsList);
      } catch (err) {
        console.error('Error loading highlights:', err);
        setError('Failed to load highlights');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user) {
      loadHighlights();
    }
  }, [user, authLoading]);

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

        // Delete old image if editing
        if (editingHighlight?.imageRef) {
          await deleteImage(editingHighlight.imageRef);
        }
      }

      const highlightData = {
        ...formData,
        image: imageUrl,
        imageRef,
      };

      if (editingHighlight) {
        await updateHighlight(editingHighlight.id, highlightData);
        setSuccess('Highlight updated successfully');
      } else {
        await addHighlight(highlightData);
        setSuccess('Highlight added successfully');
      }

      // Reset form
      setFormData({
        image: '',
        title: '',
        description: '',
        tagline: '',
        imageRef: ''
      });
      setImageFile(null);
      setEditingHighlight(null);

      // Refresh highlights list
      const highlightsList = await getHighlights();
      setHighlights(highlightsList);
    } catch (err) {
      console.error('Error saving highlight:', err);
      setError('Failed to save highlight');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (highlight: Highlight) => {
    setEditingHighlight(highlight);
    // Create a new object with all fields except id
    setFormData({
      image: highlight.image,
      title: highlight.title,
      description: highlight.description,
      tagline: highlight.tagline,
      imageRef: highlight.imageRef
    });
  };

  const handleDelete = async (id: string, imageRef?: string) => {
    if (!confirm('Are you sure you want to delete this highlight?')) return;

    try {
      if (imageRef) {
        await deleteImage(imageRef);
      }
      await deleteHighlight(id);
      setSuccess('Highlight deleted successfully');
      const highlightsList = await getHighlights();
      setHighlights(highlightsList);
    } catch (err) {
      console.error('Error deleting highlight:', err);
      setError('Failed to delete highlight');
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
              <h1 className="text-2xl sm:text-3xl font-bold text-[#FF4B00]">Manage Highlights</h1>
              <p className="mt-1 text-sm text-gray-600">Add, edit or remove highlights</p>
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
          {/* Highlight Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white shadow-lg rounded-xl p-3 sm:p-4 lg:p-6"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-[#FF4B00] mb-3 sm:mb-4">
              {editingHighlight ? 'Edit Highlight' : 'Add New Highlight'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#FF4B00] file:text-white hover:file:bg-[#FF4B00]/90"
                />
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF4B00] focus:ring-[#FF4B00] sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF4B00] focus:ring-[#FF4B00] sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">
                  Tagline
                </label>
                <input
                  type="text"
                  id="tagline"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF4B00] focus:ring-[#FF4B00] sm:text-sm"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="inline-flex justify-center rounded-md border border-transparent bg-[#FF4B00] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#FF4B00]/90 focus:outline-none focus:ring-2 focus:ring-[#FF4B00] focus:ring-offset-2 disabled:opacity-50"
                >
                  {formLoading ? 'Saving...' : editingHighlight ? 'Update Highlight' : 'Add Highlight'}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Highlights List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white shadow-lg rounded-xl p-3 sm:p-4 lg:p-6"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-[#FF4B00] mb-3 sm:mb-4">Highlights</h2>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : highlights.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No highlights added yet</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {highlights.map((highlight) => (
                  <motion.div
                    key={highlight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="relative w-full h-48">
                        <Image
                          src={highlight.image}
                          alt={highlight.title}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{highlight.title}</h3>
                        <p className="text-sm text-gray-500">{highlight.tagline}</p>
                        <p className="text-sm text-gray-600 mt-1">{highlight.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(highlight)}
                          className="text-[#FF4B00] hover:text-[#FF4B00]/80"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(highlight.id, highlight.imageRef)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 