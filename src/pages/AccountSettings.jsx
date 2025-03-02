import React, { useState } from 'react';
import { ArrowLeft, Edit, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AccountSettings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [storagePath, setStoragePath] = useState('/home/user/camera_footage');

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditUserInfo = () => {
    // This would open a form to edit user info in a real app
    alert('Edit user info functionality would open here');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center p-4 bg-white">
        <button onClick={handleGoBack} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-medium">Account Settings</h1>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-lg p-4 mb-4">
          <h2 className="text-lg font-medium mb-4">User Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Name</label>
              <div className="flex items-center justify-between">
                <p className="font-medium">{user?.deviceSerial || 'User Name'}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
              <p className="font-medium">{user?.phoneNumber || '+911234567890'}</p>
            </div>
            
            <div>
              <label className="block text-sm text-gray-500 mb-1">Username</label>
              <p className="font-medium">{user?.username || 'username'}</p>
            </div>
            
            <button 
              onClick={handleEditUserInfo}
              className="flex items-center text-blue-500"
            >
              <Edit size={16} className="mr-1" />
              <span>Edit User Info</span>
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-4">
          <h2 className="text-lg font-medium mb-4">Storage Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Footage Storage Path</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={storagePath}
                  onChange={(e) => setStoragePath(e.target.value)}
                  placeholder="/path/to/storage"
                  className="flex-1 p-2 bg-gray-100 rounded-md"
                />
                <button className="ml-2 p-2 bg-gray-200 rounded-md">
                  <FolderOpen size={20} />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Default: /home/user/camera_footage</p>
            </div>
            
            <div>
              <label className="block text-sm text-gray-500 mb-1">Storage Usage</label>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">45% used</span>
                <span className="text-xs text-gray-500">10.5 GB / 25 GB</span>
              </div>
            </div>
            
            <button className="w-full bg-blue-500 text-white p-2 rounded-md">
              Save Storage Settings
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Security</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Two-Factor Authentication</span>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input type="checkbox" id="toggle" className="sr-only" />
                <label htmlFor="toggle" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
            
            <button className="text-blue-500">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;