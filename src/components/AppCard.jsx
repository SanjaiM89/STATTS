import React from 'react';

const AppCard = ({ icon, name, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center p-2"
      onClick={onClick}
    >
      <div className="w-16 h-16 rounded-2xl bg-red-400 flex items-center justify-center mb-2">
        {icon}
      </div>
      <span className="text-xs text-center text-gray-700 max-w-[80px] truncate">
        {name}
      </span>
    </div>
  );
};

export default AppCard;