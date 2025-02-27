import React from 'react';
import { Play, Search, Plus, Menu, BellRing } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <div className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center">
          <Play className="text-gray-700 mr-4" size={24} />
          <Search className="text-gray-700" size={24} />
        </div>
        <div className="flex items-center">
          <Plus className="text-gray-700" size={24} />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Device</h1>
          <Menu className="text-gray-700" size={24} />
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-center justify-center p-4">
            <div className="flex items-center">
              <Play className="text-gray-700 mr-2" size={24} />
              <span className="text-lg font-medium">Recent Live View</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-200 rounded-lg p-4 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-sm font-medium">Camera 01</span>
                </div>
              </div>
              <div className="bg-gray-200 rounded-lg p-4 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-sm font-medium">Camera 02</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-200 rounded-lg p-4 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-sm font-medium">Camera 03</span>
                </div>
              </div>
              <div className="bg-gray-200 rounded-lg p-4 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-sm font-medium">Camera 04</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium">Recent Activities</h2>
            <span className="text-sm text-blue-500">View All</span>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center p-2 border-b border-gray-100">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <BellRing size={20} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">Motion Detected</h3>
                  <p className="text-sm text-gray-500">Camera {item} - {new Date().toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Home;