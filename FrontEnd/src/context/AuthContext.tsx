import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '../types';

interface AuthContextType extends AuthState {
  login: (phoneNumber: string, password: string) => Promise<boolean>;
  signup: (phoneNumber: string, password: string, deviceSerial: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (phoneNumber: string, password: string): Promise<boolean> => {
    // Simulate API call
    try {
      // In a real app, this would be an API call
      if (password.length < 8) {
        return false;
      }
      
      // Mock successful login
      const user: User = {
        id: 'user_' + Date.now(),
        username: 'vd3qjj',
        phoneNumber,
      };
      
      setAuthState({
        user,
        isAuthenticated: true,
      });
      
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async (phoneNumber: string, password: string, deviceSerial: string): Promise<boolean> => {
    // Simulate API call
    try {
      // In a real app, this would be an API call
      if (password.length < 8 || !deviceSerial) {
        return false;
      }
      
      // Mock successful signup
      const user: User = {
        id: 'user_' + Date.now(),
        username: 'user_' + phoneNumber.substring(phoneNumber.length - 4),
        phoneNumber,
        deviceSerial,
      };
      
      setAuthState({
        user,
        isAuthenticated: true,
      });
      
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};