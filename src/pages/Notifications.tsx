import React from 'react';
import { BellRing } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';

const Notifications: React.FC = () => {
  const notifications = [
    { id: 1, title: 'Motion Detected', message: 'Camera 01 detected motion', time: '10:30 AM', read: false },
    { id: 2, title: 'Device Offline', message: 'Camera 02 went offline', time: 'Yesterday', read: true },
    { id: 3, title: 'Storage Alert', message: 'Storage is almost full (85%)', time: 'Yesterday', read: true },
    { id: 4, title: 'New Feature Available', message: 'Check out our new AI detection feature', time: '2 days ago', read: true },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <Header title="Notifications" />
      
      <div className="p-4">
        <div className="bg-white rounded-lg overflow-hidden">
          {notifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 ${notification.read ? '' : 'bg-blue-50'}`}
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full mr-3 ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
                      <BellRing size={20} className={notification.read ? 'text-gray-500' : 'text-blue-500'} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-black'}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <BellRing size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No notifications yet</p>
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Notifications;