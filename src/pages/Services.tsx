import React from 'react';
import { Eye, PlayCircle, Share2, Image, Wifi, Mic, BarChart2 } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import AppCard from '../components/AppCard';

const Services: React.FC = () => {
  const services = [
    { id: 1, name: 'Live View', icon: <Eye size={24} className="text-white" /> },
    { id: 2, name: 'Playback', icon: <PlayCircle size={24} className="text-white" /> },
    { id: 3, name: 'Sharing', icon: <Share2 size={24} className="text-white" /> },
    { id: 4, name: 'Personal Album', icon: <Image size={24} className="text-white" /> },
    { id: 5, name: 'Device Wi-Fi Configuration', icon: <Wifi size={24} className="text-white" /> },
    { id: 6, name: 'Custom Audio Management', icon: <Mic size={24} className="text-white" /> },
    { id: 7, name: 'Network Data Statistics', icon: <BarChart2 size={24} className="text-white" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <Header title="Services" showSearch />
      
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 mb-4">
          <h2 className="text-lg font-medium mb-4">Popular Services</h2>
          
          <div className="grid grid-cols-3 gap-2">
            {services.slice(0, 6).map((service) => (
              <AppCard 
                key={service.id}
                icon={service.icon}
                name={service.name}
              />
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 mb-4">
          <h2 className="text-lg font-medium mb-4">Device Management</h2>
          
          <div className="grid grid-cols-3 gap-2">
            {services.slice(4).map((service) => (
              <AppCard 
                key={service.id}
                icon={service.icon}
                name={service.name}
              />
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4">Security Services</h2>
          
          <div className="grid grid-cols-3 gap-2">
            {services.slice(0, 3).map((service) => (
              <AppCard 
                key={service.id}
                icon={service.icon}
                name={service.name}
              />
            ))}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Services;