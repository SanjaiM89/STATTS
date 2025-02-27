import React, { useState } from 'react';
import { Eye, PlayCircle, Share2, Image, Wifi, Mic, BarChart2 } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import AppCard from '../components/AppCard';

const Applications: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const applications = {
    recently: [
      { id: 1, name: 'Live View', icon: <Eye size={24} className="text-white" /> }
    ],
    personal: [
      { id: 2, name: 'Live View', icon: <Eye size={24} className="text-white" /> },
      { id: 3, name: 'Playback', icon: <PlayCircle size={24} className="text-white" /> },
      { id: 4, name: 'Sharing', icon: <Share2 size={24} className="text-white" /> },
      { id: 5, name: 'Personal Album', icon: <Image size={24} className="text-white" /> }
    ],
    basic: [
      { id: 6, name: 'Device Wi-Fi Configuration', icon: <Wifi size={24} className="text-white" /> },
      { id: 7, name: 'Custom Audio Management', icon: <Mic size={24} className="text-white" /> },
      { id: 8, name: 'Network Data Statistics', icon: <BarChart2 size={24} className="text-white" /> }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <Header title="Applications" />
      
      <div className="p-4">
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Application Name"
              className="w-full p-3 pl-10 bg-white rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Eye size={20} className="text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-4">
          <h2 className="text-lg font-medium mb-4">Recently Used</h2>
          
          <div className="grid grid-cols-3 gap-2">
            {applications.recently.map((app) => (
              <AppCard 
                key={app.id}
                icon={app.icon}
                name={app.name}
              />
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-4">
          <h2 className="text-lg font-medium mb-4">Personal Application</h2>
          
          <div className="grid grid-cols-4 gap-2">
            {applications.personal.map((app) => (
              <AppCard 
                key={app.id}
                icon={app.icon}
                name={app.name}
              />
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Basic Tool</h2>
          
          <div className="grid grid-cols-3 gap-2">
            {applications.basic.map((app) => (
              <AppCard 
                key={app.id}
                icon={app.icon}
                name={app.name}
              />
            ))}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Applications;