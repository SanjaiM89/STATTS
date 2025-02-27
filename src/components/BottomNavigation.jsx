import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Heart, Grid, Bell, User } from 'lucide-react';

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 px-4">
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          `flex flex-col items-center ${isActive ? 'text-red-500' : 'text-gray-400'}`
        }
      >
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </NavLink>
      
      <NavLink 
        to="/services" 
        className={({ isActive }) => 
          `flex flex-col items-center ${isActive ? 'text-red-500' : 'text-gray-400'}`
        }
      >
        <Heart size={24} />
        <span className="text-xs mt-1">Services</span>
      </NavLink>
      
      <NavLink 
        to="/applications" 
        className={({ isActive }) => 
          `flex flex-col items-center ${isActive ? 'text-red-500' : 'text-gray-400'}`
        }
      >
        <Grid size={24} />
        <span className="text-xs mt-1">Applications</span>
      </NavLink>
      
      <NavLink 
        to="/notifications" 
        className={({ isActive }) => 
          `flex flex-col items-center ${isActive ? 'text-red-500' : 'text-gray-400'}`
        }
      >
        <Bell size={24} />
        <span className="text-xs mt-1">Notifications</span>
      </NavLink>
      
      <NavLink 
        to="/account" 
        className={({ isActive }) => 
          `flex flex-col items-center ${isActive ? 'text-red-500' : 'text-gray-400'}`
        }
      >
        <User size={24} />
        <span className="text-xs mt-1">Account</span>
      </NavLink>
    </div>
  );
};

export default BottomNavigation;