'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Skip if still loading or on login page
    if (loading || pathname === '/admin/login') {
      return;
    }

    // If not authenticated and trying to access admin pages, redirect to login
    if (!user && pathname?.startsWith('/admin')) {
      console.log('RequireAuth: Unauthorized access attempted, redirecting to login');
      router.replace('/admin/login');
    }
  }, [user, loading, pathname, router]);

  // If on admin page (not login) and loading auth state, show loading spinner
  if (loading && pathname !== '/admin/login' && pathname?.startsWith('/admin')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4B00]"></div>
      </div>
    );
  }

  // If authenticated or not on a protected route, render children
  return <>{children}</>;
} 