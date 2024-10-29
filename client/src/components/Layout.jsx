import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faBoxes,
  faFileInvoice,
  faBars,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// SidebarItem Component
const SidebarItem = ({ icon, title, onClick, isCollapsed }) => {
  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-4 p-4 cursor-pointer text-gray-300 hover:bg-gray-700 transition-all duration-200 rounded-lg"
    >
      <FontAwesomeIcon icon={icon} className="text-xl" />
      {!isCollapsed && (
        <span className="font-medium">{title}</span>
      )}
    </div>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
};

// Sidebar Component
const Sidebar = ({ isCollapsed, toggleCollapse }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={`flex flex-col bg-gray-800 h-full text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`} style={{zIndex: 10}}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && <h1 className="text-xl font-bold">Inventory App</h1>}
        <button 
          onClick={toggleCollapse}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <FontAwesomeIcon 
            icon={isCollapsed ? faAngleRight : faBars} 
            className="text-xl"
          />
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-4 space-y-2 px-2">
        <SidebarItem
          icon={faUsers}
          title="Suppliers"
          isCollapsed={isCollapsed}
          onClick={() => handleNavigation('/suppliers')}
        />
        <SidebarItem
          icon={faBoxes}
          title="Items"
          isCollapsed={isCollapsed}
          onClick={() => handleNavigation('/items')}
        />
        <SidebarItem
          icon={faFileInvoice}
          title="Purchase Orders"
          isCollapsed={isCollapsed}
          onClick={() => handleNavigation('/purchase-orders')}
        />
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  toggleCollapse: PropTypes.func.isRequired,
};

// Layout Component
const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />

      {/* Main Content Area */}
      <div className={`flex-1 p-6 transition-all duration-300 overflow-scroll ${isCollapsed ? 'ml-2' : 'ml-4'}`}>
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
