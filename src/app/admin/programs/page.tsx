"use client";

import { useState, useEffect } from 'react';
import { Program, getPrograms, addProgram, updateProgram, deleteProgram, uploadProgramImage } from '@/services/programs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiUpload, FiX } from 'react-icons/fi';

export default function ProgramsAdmin() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    imageRef: '',
    order: 0
  });
  const router = useRouter();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const data = await getPrograms();
      setPrograms(data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl('');
    }
  };

  const clearImageSelection = () => {
    setImageFile(null);
    setPreviewUrl('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let updatedFormData = { ...formData };

      // If there's a new image file, upload it
      if (imageFile) {
        const { url, ref } = await uploadProgramImage(imageFile);
        updatedFormData.image = url;
        updatedFormData.imageRef = ref;
      }

      if (editingProgram) {
        await updateProgram(editingProgram.id, updatedFormData);
      } else {
        await addProgram(updatedFormData);
      }
      
      setFormData({ title: '', description: '', image: '', imageRef: '', order: 0 });
      setEditingProgram(null);
      setImageFile(null);
      setPreviewUrl('');
      fetchPrograms();
    } catch (error) {
      console.error('Error saving program:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    setFormData({
      title: program.title,
      description: program.description,
      image: program.image,
      imageRef: program.imageRef || '',
      order: program.order
    });
    
    // Show the current image in the preview
    if (program.image) {
      setPreviewUrl(program.image);
    }
  };

  const handleDelete = async (id: string, imageRef?: string) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        await deleteProgram(id, imageRef);
        fetchPrograms();
      } catch (error) {
        console.error('Error deleting program:', error);
      }
    }
  };

  const handleCancel = () => {
    setEditingProgram(null);
    setFormData({ title: '', description: '', image: '', imageRef: '', order: 0 });
    setImageFile(null);
    setPreviewUrl('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4B00]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#FF4B00] mb-4">Manage Programs</h1>
          <p className="text-gray-600">Add, edit, or remove programs from the website</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-[#0077BE] mb-6">
              {editingProgram ? 'Edit Program' : 'Add New Program'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#0077BE] focus:border-[#0077BE]"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#0077BE] focus:border-[#0077BE] h-32"
                  required
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Program Image
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
                      {editingProgram && !imageFile ? 'Change Image' : 'Upload Image'}
                    </div>
                  </label>
                  {(imageFile || previewUrl) && (
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
                {editingProgram && !previewUrl && formData.image && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Current image will be kept</p>
                  </div>
                )}
                {!editingProgram && !imageFile && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Please upload an image for the program</p>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
                  Order
                </label>
                <input
                  type="number"
                  id="order"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#0077BE] focus:border-[#0077BE]"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                {editingProgram && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={submitting || (!editingProgram && !imageFile)}
                  className={`px-6 py-2 bg-[#FF4B00] text-white rounded-lg transition-colors ${
                    submitting || (!editingProgram && !imageFile)
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-[#0077BE]'
                  }`}
                >
                  {submitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `${editingProgram ? 'Update' : 'Add'} Program`
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Programs List */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-[#0077BE] mb-6">Programs List</h2>
            <div className="space-y-4">
              {programs.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No programs added yet.</p>
              ) : (
                programs.map((program) => (
                  <div key={program.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={program.image || '/hero-1.jpg'}
                          alt={program.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{program.title}</h3>
                        <p className="text-sm text-gray-500">Order: {program.order}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(program)}
                        className="p-2 text-[#0077BE] hover:text-[#FF4B00]"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(program.id, program.imageRef)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 