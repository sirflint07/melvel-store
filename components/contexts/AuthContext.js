'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const API_BASE_URL = 'http://localhost:4000/api';

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/check-auth`, {
        credentials: 'include'
      });

      const data = await response.json();
      
      if (data.authenticated) {
        const userResponse = await fetch(`${API_BASE_URL}/users/${data.user.id}`, {
          credentials: 'include'
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user details');
        }

        const userData = await userResponse.json();
        setUser(userData);
        setIsAuthenticated(true);
        setIsVerified(userData.isVerified);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      toast.error('Session validation failed');
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Email verification failed');
      }

      setUser(data.user);
      setIsAuthenticated(true);
      setIsVerified(true);
      toast.success('Email verified successfully!', {
        autoClose: 3000,
        onClose: () => router.push('/')
      });
      return data;
    } catch (error) {
      toast.error(error.message);
      return { error: error.message };
    }
  };

  const signup = async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        

        if (response.status === 400) {
          return { fieldErrors: data };
        }
        throw new Error(data.error || 'Registration failed');
      }

      setIsAuthenticated(true);
      setUser(data.user)

      return data;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Registration failed');
      return { error: error.message };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {

        
        if (response.status === 400) {
          return { fieldErrors: data };
        }
        throw new Error(data.message || 'Login failed');
      }

      await checkAuthStatus();
      toast.success(`Welcome back, ${data.user?.username || ''}!`);
      router.push('/');
      return data;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
      return { error: error.message };
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to terminate session');
      }

      setUser(null);
      setIsAuthenticated(false);
      setIsVerified(false);
      toast.success('Successfully logged out');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(error.message || 'Logout failed');
    }
  };

  const value = {
    user,
    isAuthenticated,
    isVerified,
    loading,
    login,
    logout,
    signup,
    verifyEmail,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}