'use client';

import React from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * Admin Layout component - wraps the admin pages
 * Note: The actual layout is provided by src/app/admin/layout.tsx
 * This is a simple pass-through component for consistency
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  return <>{children}</>;
} 