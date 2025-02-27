import React from 'react';
import { Settings, Wifi, HelpCircle, FileText, User, Info } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { useAuth } from '../context/AuthContext';

const Account = () => {
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <Header title="Account" showMenu />
      
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
              <User size={32} className="text-gray-500" />
            </div>
            <div>
              <h2 className="text-xl font-medium">{user?.username || 'User'}</h2>
              <p className="text-gray-500">{user?.phoneNumber || '+911234567890'}</p>
            </div>
            <div className="ml-auto">
              <div className="bg-gray-200 p-2 rounded-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                  <rect x="4" y="13" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                  <rect x="13" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                  <rect x="13" y="13" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg overflow-hidden mb-4">
          <div className="divide-y divide-gray-100">
            <div className="p-4 flex items-center">
              <Settings size={20} className="text-gray-500 mr-3" />
              <span>Settings</span>
              <svg className="ml-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            
            <div className="p-4 flex items-center">
              <Wifi size={20} className="text-gray-500 mr-3" />
              <span>Device Wi-Fi Configuration</span>
              <svg className="ml-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-4">
          <h3 className="text-lg font-medium mb-4">Help Center</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-gray-100 mb-2">
                <HelpCircle size={24} className="text-gray-500" />
              </div>
              <span className="text-sm text-center">FAQ</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-gray-100 mb-2">
                <FileText size={24} className="text-gray-500" />
              </div>
              <span className="text-sm text-center">User Manual</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-gray-100 mb-2">
                <FileText size={24} className="text-gray-500" />
              </div>
              <span className="text-sm text-center">User Feedback</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-gray-100 mb-2">
                <FileText size={24} className="text-gray-500" />
              </div>
              <span className="text-sm text-center">Release Notes</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-gray-100 mb-2">
                <Info size={24} className="text-gray-500" />
              </div>
              <span className="text-sm text-center">About</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full bg-white text-gray-700 font-medium p-4 rounded-lg"
        >
          Log Out
        </button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Account;