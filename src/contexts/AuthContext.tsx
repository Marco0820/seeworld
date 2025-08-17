'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface AuthContextType {
  user: GoogleUser | null;
  setUser: (user: GoogleUser | null) => void;
  signIn: () => void;
  signOut: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load Google Sign-In API
    const loadGoogleAPI = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.head.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com',
          callback: handleGoogleSignIn,
        });
      }
    };

    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('googleUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('googleUser');
      }
    }

    if (!window.google) {
      loadGoogleAPI();
    } else {
      initializeGoogleSignIn();
    }
  }, []);

  const handleGoogleSignIn = (response: any) => {
    try {
      const decoded = JSON.parse(atob(response.credential.split('.')[1]));
      const userData: GoogleUser = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      };
      setUser(userData);
      localStorage.setItem('googleUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Google Sign-In error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = () => {
    setIsLoading(true);
    if (window.google) {
      window.google.accounts.id.prompt();
    } else {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('googleUser');
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  const value = {
    user,
    setUser,
    signIn,
    signOut,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
