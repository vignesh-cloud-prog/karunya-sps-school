'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiActivity, FiUsers, FiMenu, FiX, FiLogOut, FiFileText, FiStar, FiUser, FiSettings, FiInfo } from 'react-icons/fi';

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: FiHome },
  { name: 'Highlights', href: '/admin/highlights', icon: FiStar },
  { name: 'About', href: '/admin/about', icon: FiInfo },
  { name: 'Activities', href: '/admin/activities', icon: FiActivity },
  { name: 'Team', href: '/admin/team', icon: FiUsers },
  { name: 'Reports', href: '/admin/reports', icon: FiFileText },
  { name: 'Settings', href: '/admin/settings', icon: FiSettings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Don't render sidebar for login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Show loading spinner while authentication is being determined
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4B00]"></div>
      </div>
    );
  }

  // If not authenticated, don't render anything - this will be handled by AuthContext redirect
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4B00]"></div>
      </div>
    );
  }

  const userEmail = user.email || 'Admin User';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 mr-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF4B00] md:hidden"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
              </button>
              <div className="flex-shrink-0 flex items-center">
                <Link href="/admin" className="text-2xl font-bold text-[#FF4B00]">
                  Admin Panel
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:flex items-center">
                <div className="flex items-center mr-4">
                  <div className="h-8 w-8 rounded-full bg-[#FF4B00] flex items-center justify-center text-white">
                    <FiUser className="h-4 w-4" />
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 truncate max-w-[150px]">
                    {userEmail}
                  </span>
                </div>
              </div>
              <button
                onClick={logout}
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-[#FF4B00] rounded-md hover:bg-[#FF4B00]/90 flex items-center"
              >
                <FiLogOut className="mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Side Menu and Content */}
      <div className="flex pt-16">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 h-screen sticky top-16">
            <div className="flex flex-col h-full bg-white border-r border-gray-200">
              {/* Menu Items - Scrollable */}
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                          isActive
                            ? 'bg-[#FF4B00] text-white'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon
                          className={`mr-3 flex-shrink-0 h-6 w-6 ${
                            isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                          }`}
                        />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              
              {/* User Profile Section */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#FF4B00] flex items-center justify-center text-white">
                    <FiUser className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 truncate">{userEmail}</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                </div>
                <button 
                  onClick={logout}
                  className="mt-3 w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-[#FF4B00] bg-white border border-[#FF4B00] rounded-md hover:bg-[#FF4B00]/5"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="relative flex flex-col max-w-xs w-full pt-5 pb-4 bg-white h-full">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Close sidebar</span>
                  <FiX className="h-6 w-6 text-white" />
                </button>
              </div>
              
              {/* Mobile Menu Items - Scrollable */}
              <div className="flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                          isActive
                            ? 'bg-[#FF4B00] text-white'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon
                          className={`mr-4 flex-shrink-0 h-6 w-6 ${
                            isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                          }`}
                        />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              
              {/* Mobile User Profile Section */}
              <div className="border-t border-gray-200 p-4 mt-auto">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#FF4B00] flex items-center justify-center text-white">
                    <FiUser className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 truncate">{userEmail}</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                </div>
                <button 
                  onClick={logout}
                  className="mt-3 w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#FF4B00] rounded-md hover:bg-[#FF4B00]/90"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 