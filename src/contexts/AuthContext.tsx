'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  provider: 'google' | 'facebook' | 'email';
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  signIn: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);
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

    // Load Facebook SDK
    const loadFacebookSDK = () => {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      script.onload = initializeFacebookSDK;
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

    const initializeFacebookSDK = () => {
      if (window.FB) {
        window.FB.init({
          appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || 'your-facebook-app-id',
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
      }
    };

    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('user');
      }
    }

    if (!window.google) {
      loadGoogleAPI();
    } else {
      initializeGoogleSignIn();
    }

    if (!window.FB) {
      loadFacebookSDK();
    } else {
      initializeFacebookSDK();
    }
  }, []);

  const handleGoogleSignIn = (response: { credential: string }) => {
    try {
      const decoded = JSON.parse(atob(response.credential.split('.')[1]));
      const userData: User = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        provider: 'google'
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Google Sign-In error:', error);
      throw new Error('Google authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      if (window.google) {
        // Set up a one-time callback for this specific sign-in attempt
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com',
          callback: (response: { credential: string }) => {
            try {
              handleGoogleSignIn(response);
              resolve();
            } catch (error) {
              reject(error);
            }
          },
        });
        window.google.accounts.id.prompt();
      } else {
        setIsLoading(false);
        reject(new Error('Google Sign-In not available'));
      }
    });
  };

  const signInWithFacebook = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      if (window.FB) {
        window.FB.login((response: any) => {
          if (response.authResponse) {
            // Get user info from Facebook
            window.FB.api('/me', { fields: 'name,email,picture' }, (userInfo: any) => {
              try {
                const userData: User = {
                  id: userInfo.id,
                  name: userInfo.name,
                  email: userInfo.email || '',
                  picture: userInfo.picture?.data?.url || '',
                  provider: 'facebook'
                };
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                setIsLoading(false);
                resolve();
              } catch (error) {
                setIsLoading(false);
                reject(new Error('Failed to get Facebook user info'));
              }
            });
          } else {
            setIsLoading(false);
            reject(new Error('Facebook login was cancelled'));
          }
        }, { scope: 'email' });
      } else {
        setIsLoading(false);
        reject(new Error('Facebook SDK not available'));
      }
    });
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
    if (user?.provider === 'facebook' && window.FB) {
      window.FB.logout();
    }
    if (user?.provider === 'google' && window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    setUser,
    signIn,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};