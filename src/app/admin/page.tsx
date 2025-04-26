'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, loading } = useAuth();

  useEffect(() => {
    // For debugging
    console.log("Admin dashboard loaded, user:", user?.email, "loading:", loading);
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4B00]"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will be redirected by AuthContext
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-bold text-[#FF4B00] mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-gray-600">Logged in as: {user.email}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#FF4B00]"
        >
          <h2 className="text-lg font-medium text-gray-700 mb-3">Activities</h2>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-[#FF4B00]">2</p>
            <Link
              href="/admin/activities"
              className="px-4 py-2 bg-[#FF4B00] text-white rounded-lg hover:bg-[#FF4B00]/90 transition-colors"
            >
              Manage
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#FFB800]"
        >
          <h2 className="text-lg font-medium text-gray-700 mb-3">Team Members</h2>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-[#FFB800]">3</p>
            <Link
              href="/admin/team"
              className="px-4 py-2 bg-[#FFB800] text-white rounded-lg hover:bg-[#FFB800]/90 transition-colors"
            >
              Manage
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-lg font-medium text-gray-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/admin/activities"
            className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-[#FF4B00]/10 rounded-lg mr-4">
              <span className="text-2xl text-[#FF4B00]">📋</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Add Activity</h3>
              <p className="text-sm text-gray-500">Create a new school activity</p>
            </div>
          </Link>
          <Link
            href="/admin/team"
            className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-[#FFB800]/10 rounded-lg mr-4">
              <span className="text-2xl text-[#FFB800]">👥</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Add Team Member</h3>
              <p className="text-sm text-gray-500">Add a new staff member</p>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 