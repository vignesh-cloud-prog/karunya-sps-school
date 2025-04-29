"use client";

import React, { useEffect, useState } from 'react';
import { getVolunteers, updateVolunteerStatus, deleteVolunteer, updateVolunteerNotes } from '@/services/volunteers';
import { Volunteer } from '@/types/volunteers';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const router = useRouter();

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    contacted: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  const fetchVolunteersData = async () => {
    setLoading(true);
    try {
      const data = await getVolunteers(statusFilter === 'all' ? undefined : statusFilter);
      setVolunteers(data);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      alert('Failed to fetch volunteer applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteersData();
  }, [statusFilter]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateVolunteerStatus(id, status);
      alert(`Volunteer status updated to ${status}`);
      
      // Update local state
      setVolunteers(prev => 
        prev.map(volunteer => 
          volunteer.id === id ? { ...volunteer, status: status as any } : volunteer
        )
      );
    } catch (error) {
      console.error('Error updating volunteer status:', error);
      alert('Failed to update volunteer status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteVolunteer(id);
      alert('Volunteer application deleted successfully');
      
      // Remove from local state
      setVolunteers(prev => prev.filter(volunteer => volunteer.id !== id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting volunteer:', error);
      alert('Failed to delete volunteer application');
    }
  };

  const openDeleteModal = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsDeleteModalOpen(true);
  };

  const openDetailsModal = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
    setNotes(volunteer.notes || '');
    setIsDetailsModalOpen(true);
  };

  const sendEmail = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const callPhone = (phone: string) => {
    window.open(`tel:${phone}`, '_blank');
  };

  const saveNotes = async () => {
    if (!selectedVolunteer) return;
    
    setSavingNotes(true);
    try {
      await updateVolunteerNotes(selectedVolunteer.id, notes);
      
      // Update local state
      setVolunteers(prev => 
        prev.map(volunteer => 
          volunteer.id === selectedVolunteer.id ? { ...volunteer, notes } : volunteer
        )
      );
      
      // Update selected volunteer state
      setSelectedVolunteer({
        ...selectedVolunteer,
        notes
      });
      
      alert('Notes saved successfully');
    } catch (error) {
      console.error('Error saving notes:', error);
      alert('Failed to save notes');
    } finally {
      setSavingNotes(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Volunteer Applications</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="block w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#FF4B00] focus:border-[#FF4B00] sm:text-sm"
        >
          <option value="all">All Applications</option>
          <option value="pending">Pending</option>
          <option value="contacted">Contacted</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      
      <div className="bg-white shadow overflow-hidden rounded-lg">
        {loading ? (
          <div className="py-12 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4B00]"></div>
          </div>
        ) : volunteers.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No volunteer applications found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name & Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied On
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {volunteers.map((volunteer) => (
                  <tr key={volunteer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{volunteer.name}</div>
                      <div className="text-sm text-gray-500">{volunteer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {volunteer.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {volunteer.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[volunteer.status]}`}>
                        {volunteer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {volunteer.createdAt && format(new Date(volunteer.createdAt), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-3">
                        <select
                          value={volunteer.status}
                          onChange={(e) => handleStatusChange(volunteer.id, e.target.value)}
                          className="block w-28 py-1 px-2 text-xs border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#FF4B00] focus:border-[#FF4B00]"
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        <button
                          onClick={() => openDetailsModal(volunteer)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View details"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => sendEmail(volunteer.email)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Send email"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => callPhone(volunteer.phone)}
                          className="text-green-600 hover:text-green-900"
                          title="Call phone"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => openDeleteModal(volunteer)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete application"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedVolunteer && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Confirm Deletion</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete the application from {selectedVolunteer.name}? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedVolunteer.id)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4B00] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Volunteer Details Modal */}
      {isDetailsModalOpen && selectedVolunteer && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Volunteer Details</h3>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[selectedVolunteer.status]}`}>
                    {selectedVolunteer.status}
                  </span>
                </div>
                
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Email</label>
                      <div className="mt-1 flex items-center">
                        <p className="text-sm text-gray-900 mr-2">{selectedVolunteer.email}</p>
                        <button
                          onClick={() => sendEmail(selectedVolunteer.email)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Send email"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Phone</label>
                      <div className="mt-1 flex items-center">
                        <p className="text-sm text-gray-900 mr-2">{selectedVolunteer.phone}</p>
                        <button
                          onClick={() => callPhone(selectedVolunteer.phone)}
                          className="text-green-600 hover:text-green-900"
                          title="Call phone"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Location</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedVolunteer.location}</p>
                  </div>
                  
                  {selectedVolunteer.experience && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Experience</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedVolunteer.experience}</p>
                    </div>
                  )}
                  
                  {selectedVolunteer.availability && selectedVolunteer.availability.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Availability</label>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {selectedVolunteer.availability.map(item => (
                          <span key={item} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedVolunteer.interests && selectedVolunteer.interests.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Areas of Interest</label>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {selectedVolunteer.interests.map(item => (
                          <span key={item} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Message</label>
                    <div className="mt-1 p-2 border border-gray-200 rounded-md">
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">
                        {selectedVolunteer.message || "No additional message provided."}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Applied On</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedVolunteer.createdAt && 
                        format(new Date(selectedVolunteer.createdAt), 'PPP p')}
                    </p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-500">Internal Notes</label>
                      <button
                        onClick={saveNotes}
                        disabled={savingNotes}
                        className="text-sm px-3 py-1 bg-[#FF4B00] text-white rounded-md hover:bg-[#e44400] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4B00] disabled:opacity-50"
                      >
                        {savingNotes ? 'Saving...' : 'Save Notes'}
                      </button>
                    </div>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add notes about this volunteer (only visible to admins)"
                      rows={3}
                      className="shadow-sm focus:ring-[#FF4B00] focus:border-[#FF4B00] block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => sendEmail(selectedVolunteer.email)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Email Volunteer
                </button>
                <button
                  type="button"
                  onClick={() => callPhone(selectedVolunteer.phone)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Call Volunteer
                </button>
                <select
                  value={selectedVolunteer.status}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleStatusChange(selectedVolunteer.id, value);
                    setSelectedVolunteer(prev => 
                      prev ? { ...prev, status: value as any } : null
                    );
                  }}
                  className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-3 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#FF4B00] focus:border-[#FF4B00] sm:text-sm"
                >
                  <option value="pending">Mark as Pending</option>
                  <option value="contacted">Mark as Contacted</option>
                  <option value="approved">Mark as Approved</option>
                  <option value="rejected">Mark as Rejected</option>
                </select>
                <button
                  type="button"
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4B00] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 