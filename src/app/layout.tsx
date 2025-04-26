import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import RequireAuth from '@/components/RequireAuth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Karunya SPS School',
  description: 'Karunya SPS School - Empowering Future Leaders',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <RequireAuth>
            {children}
          </RequireAuth>
        </AuthProvider>
      </body>
    </html>
  );
} 