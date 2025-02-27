import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const [deviceSerial, setDeviceSerial] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState("/images/img11.jpg"); // logo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!deviceSerial || !phoneNumber || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await signup(phoneNumber, password, deviceSerial);
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
              src="{imageSrc}" 
              alt="Colorful abstract" 
              className="w-full h-40 object-cover"
            />
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="deviceSerial" className="block text-sm font-medium text-gray-700 mb-1">
                Device Serial No
              </label>
              <input
                id="deviceSerial"
                type="text"
                value={deviceSerial}
                onChange={(e) => setDeviceSerial(e.target.value)}
                placeholder="Enter 9 digit Serial no"
                className="w-full p-3 bg-gray-100 rounded-md"
                required
                minLength={9}
                maxLength={9}
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