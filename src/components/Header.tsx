import React from 'react';
import { ArrowLeft, Search, Plus, Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showPlus?: boolean;
  showMenu?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack = false, 
  showSearch = false,
  showPlus = false,
  showMenu = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // If no title is provided, use the current path
  const displayTitle = title || location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.substring(2);

  return (
    <div className="flex items-center justify-between p-4 bg-white">
      <div className="flex items-center">
        {showBack && (
          <button 
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        {title && <h1 className="text-xl font-medium">{displayTitle}</h1>}
      </div>
      
      <div className="flex items-center space-x-4">
        {showSearch && (
          <button>
            <Search size={24} />
          </button>
        )}
        
        {showPlus && (
          <button>
            <Plus size={24} />
          </button>
        )}
        
        {showMenu && (
          <button>
            <Menu size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;