'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } from '@/services/team';
import { TeamMember, TeamFormData } from '@/types/team';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<TeamFormData>({
    name: '',
    position: '',
    description: '',
    image: '',
    imageRef: '',
    order: 0,
  });

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const members = await getTeamMembers();
      setTeamMembers(members);
    } catch {
      setError('Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
    setSuccess('');

    try {
      let imageUrl = formData.image;
      let imageRef = formData.imageRef;

      // Handle image upload if a new image is selected
      if (formData.image && formData.image.startsWith('data:')) {
        const imageFile = await fetch(formData.image).then(res => res.blob());
        const imageName = `team/${uuidv4()}`;
        const storageRef = ref(storage, imageName);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
        imageRef = imageName;
      }

      const memberData = {
        ...formData,
        image: imageUrl,
        imageRef,
      };

      if (editingMember) {
        // Delete old image if a new one is uploaded
        if (formData.image !== editingMember.image && editingMember.imageRef) {
          const oldImageRef = ref(storage, editingMember.imageRef);
          await deleteObject(oldImageRef);
        }

        await updateTeamMember(editingMember.id, memberData);
        setSuccess('Team member updated successfully');
      } else {
        await addTeamMember(memberData);
        setSuccess('Team member added successfully');
      }

      setFormData({
        name: '',
        position: '',
        description: '',
        image: '',
        imageRef: '',
        order: 0,
      });
      setEditingMember(null);
      fetchTeamMembers();
    } catch {
      setError('Failed to add team member');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      description: member.description,
      image: member.image,
      imageRef: member.imageRef,
      order: member.order,
    });
  };

  const handleDelete = async (id: string, imageRef: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      // Delete the image first if it exists
      if (imageRef) {
        const imageRefObj = ref(storage, imageRef);
        await deleteObject(imageRefObj);
      }
      
      // Then delete the team member
      await deleteTeamMember(id);
      setSuccess('Team member deleted successfully');
      fetchTeamMembers();
    } catch {
      setError('Failed to delete team member');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
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
        {/* Team Member Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white shadow-lg rounded-xl p-3 sm:p-4 lg:p-6"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-[#FF4B00] mb-3 sm:mb-4">
            {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4B00] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4B00] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4B00] focus:border-transparent"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4B00] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4B00] focus:border-transparent"
              />
              {formData.image && (
                <div className="mt-2">
                  <Image
                    src={formData.image}
                    alt="Preview"
                    width={128}
                    height={128}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              {editingMember && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingMember(null);
                    setFormData({
                      name: '',
                      position: '',
                      description: '',
                      image: '',
                      imageRef: '',
                      order: 0,
                    });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={formLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-[#FF4B00] rounded-lg hover:bg-[#FF4B00]/90 focus:outline-none focus:ring-2 focus:ring-[#FF4B00] disabled:opacity-50"
              >
                {formLoading ? 'Saving...' : editingMember ? 'Update' : 'Add'} Team Member
              </button>
            </div>
          </form>
        </motion.div>

        {/* Team Members List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white shadow-lg rounded-xl p-3 sm:p-4 lg:p-6"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-[#FF4B00] mb-3 sm:mb-4">Team Members</h2>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No team members added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-start space-x-4">
                    <div className="relative w-full h-48">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.position}</p>
                      <p className="text-sm text-gray-600 mt-1">{member.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(member)}
                        className="text-[#FF4B00] hover:text-[#FF4B00]/80"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id, member.imageRef)}
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
  );
} 