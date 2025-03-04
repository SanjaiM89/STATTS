import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
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

  const login = async (phoneNumber, password) => {
    // Simulate API call
    try {
      // In a real app, this would be an API call
      if (password.length < 8) {
        return false;
      }
      
      // Mock successful login
      const user = {
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

  const signup = async (phoneNumber, password, name) => {
    // Simulate API call
    try {
      // In a real app, this would be an API call
      if (password.length < 8 || !name) {
        return false;
      }
      
      // Mock successful signup
      const user = {
        id: 'user_' + Date.now(),
        username: 'user_' + phoneNumber.substring(phoneNumber.length - 4),
        phoneNumber,
        deviceSerial: name, // Using deviceSerial field to store name
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