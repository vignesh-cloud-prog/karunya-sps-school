'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { getHighlights } from '@/services/highlights';
import { getTeamMembers } from '@/services/team';
import { getReports } from '@/services/reports';
import { getPrograms } from '@/services/programs';
import { FiHome, FiActivity, FiUsers, FiFileText, FiInfo, FiBook } from 'react-icons/fi';
import Link from 'next/link';

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    highlights: 0,
    teamMembers: 0,
    reports: 0,
    programs: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [highlights, teamMembers, reports, programs] = await Promise.all([
          getHighlights(),
          getTeamMembers(),
          getReports(),
          getPrograms()
        ]);
        
        setStats({
          highlights: highlights.length,
          teamMembers: teamMembers.length,
          reports: reports.length,
          programs: programs.length
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4B00]"></div>
      </div>
    );
  }

  if (!user) {
    router.push('/admin/login');
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4B00]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFB800]/10">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <FiHome className="h-6 w-6 text-[#FF4B00]" />
                <span className="ml-2 text-xl font-semibold">Admin Dashboard</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/admin/highlights" className="flex items-center px-1 pt-1 text-gray-900 hover:text-[#FF4B00]">
                  <FiActivity className="h-5 w-5 mr-1" />
                  Highlights
                </Link>
                <Link href="/admin/programs" className="flex items-center px-1 pt-1 text-gray-900 hover:text-[#FF4B00]">
                  <FiBook className="h-5 w-5 mr-1" />
                  Programs
                </Link>
                <Link href="/admin/team" className="flex items-center px-1 pt-1 text-gray-900 hover:text-[#FF4B00]">
                  <FiUsers className="h-5 w-5 mr-1" />
                  Team
                </Link>
                <Link href="/admin/reports" className="flex items-center px-1 pt-1 text-gray-900 hover:text-[#FF4B00]">
                  <FiFileText className="h-5 w-5 mr-1" />
                  Reports
                </Link>
                <Link href="/admin/about" className="flex items-center px-1 pt-1 text-gray-900 hover:text-[#FF4B00]">
                  <FiInfo className="h-5 w-5 mr-1" />
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Highlights Card */}
            <Link href="/admin/highlights" className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#FF4B00]/10 p-3 rounded-md">
                    <FiActivity className="h-6 w-6 text-[#FF4B00]" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Highlights</h3>
                    <p className="text-2xl font-semibold text-[#FF4B00]">{stats.highlights}</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Programs Card */}
            <Link href="/admin/programs" className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#FF4B00]/10 p-3 rounded-md">
                    <FiBook className="h-6 w-6 text-[#FF4B00]" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Programs</h3>
                    <p className="text-2xl font-semibold text-[#FF4B00]">{stats.programs}</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Team Members Card */}
            <Link href="/admin/team" className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#FF4B00]/10 p-3 rounded-md">
                    <FiUsers className="h-6 w-6 text-[#FF4B00]" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
                    <p className="text-2xl font-semibold text-[#FF4B00]">{stats.teamMembers}</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Reports Card */}
            <Link href="/admin/reports" className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#FF4B00]/10 p-3 rounded-md">
                    <FiFileText className="h-6 w-6 text-[#FF4B00]" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Reports</h3>
                    <p className="text-2xl font-semibold text-[#FF4B00]">{stats.reports}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/admin/highlights/new" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <FiActivity className="h-5 w-5 text-[#FF4B00] mr-2" />
                  <span>Add New Highlight</span>
                </div>
              </Link>
              <Link href="/admin/programs" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <FiBook className="h-5 w-5 text-[#FF4B00] mr-2" />
                  <span>Manage Programs</span>
                </div>
              </Link>
              <Link href="/admin/team/new" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <FiUsers className="h-5 w-5 text-[#FF4B00] mr-2" />
                  <span>Add Team Member</span>
                </div>
              </Link>
              <Link href="/admin/reports/new" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <FiFileText className="h-5 w-5 text-[#FF4B00] mr-2" />
                  <span>Add New Report</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 