"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';
import { usePathname } from 'next/navigation';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Set persistence to LOCAL at app startup
  useEffect(() => {
    const setupPersistence = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
        console.log("Firebase auth persistence set to LOCAL");
      } catch (error) {
        console.error("Error setting persistence:", error);
      }
    };
    
    setupPersistence();
  }, []);

  useEffect(() => {
    console.log("Setting up auth listener, current path:", pathname);
    
    // Listen for authentication state changes
    const unsubscriber = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // User is signed in
          console.log("User is signed in:", user.email);
          setUser(user);
        } else {
          // User is signed out
          console.log("User is signed out");
          setUser(null);
          
          // If on admin page and not logged in, redirect to login
          if (pathname && pathname.startsWith('/admin') && pathname !== '/admin/login') {
            console.log("Not authenticated on admin page, redirecting to login");
            window.location.href = '/admin/login';
          }
        }
      } catch (error) {
        console.error("Auth state change error:", error);
      } finally {
        setLoading(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => {
      console.log("Cleaning up auth listener");
      unsubscriber();
    };
  }, [pathname]);

  const logout = async () => {
    try {
      await signOut(auth);
      // Force navigation to login page
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // For debugging
  useEffect(() => {
    console.log("Auth state updated:", {
      isAuthenticated: !!user,
      email: user?.email,
      loading
    });
  }, [user, loading]);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 