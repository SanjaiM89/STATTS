import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!name || !phoneNumber || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await signup(phoneNumber, password, name);
      if (success) {
        navigate('/');
      } else {
        setError('Failed to create account');
      }
    } catch (err) {
      setError('An error occurred during sign up');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md">
          {/* Banner Image */}
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
              alt="Colorful abstract" 
              className="w-full h-40 object-cover"
            />
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 bg-gray-100 rounded-md"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Enter your Mobile Number
              </label>
              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+911234567890"
                className="w-full p-3 bg-gray-100 rounded-md"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter 8 digit Pass"
                className="w-full p-3 bg-gray-100 rounded-md"
                required
                minLength={8}
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-800 text-white p-3 rounded-md hover:bg-gray-700 transition-colors"
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
            
            <div className="text-center mt-4">
              <Link to="/signin" className="text-gray-600 hover:underline">
                Already have an account? Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
      
      <div className="p-4 text-center text-gray-500 text-sm">
        © 2025 ALL RIGHTS RESERVED
      </div>
    </div>
  );
};

export default SignUp;