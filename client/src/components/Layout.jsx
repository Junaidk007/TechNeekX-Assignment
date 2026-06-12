import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faPlus, 
  faQuestionCircle, 
  faCog, 
  faSignOutAlt,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import './Layout.css';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Top Navigation Bar (Shown on small screens) */}
      <div className="mobile-navbar">
        <button className="hamburger-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <span className="mobile-brand">DESKBOARD</span>
      </div>

      {/* Backdrop overlay for mobile sidebar */}
      {sidebarOpen && <div className="sidebar-backdrop" onClick={closeSidebar}></div>}

      {/* 1. Left Side Navigation Drawer in Black */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div>
          <div className="sidebar-brand-wrapper">
            <div className="sidebar-brand">
              <h2>DESKBOARD</h2>
              <p>Event Optimizer Panel</p>
            </div>
            {/* Close Button inside drawer for mobile */}
            <button className="sidebar-close-btn" onClick={closeSidebar}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <nav className="sidebar-menu">
            <span className="sidebar-label">Main Menu</span>
            <NavLink 
              to="/" 
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
              onClick={closeSidebar}
              end
            >
              <FontAwesomeIcon icon={faHome} />
              <span>Home</span>
            </NavLink>
            <NavLink 
              to="/add-event" 
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Add new event</span>
            </NavLink>
          </nav>
        </div>

        <div className="sidebar-footer">
          <span className="sidebar-label">Help & Support</span>
          <div className="sidebar-item" onClick={closeSidebar}>
            <FontAwesomeIcon icon={faQuestionCircle} />
            <span>Help & Center</span>
          </div>
        </div>
      </aside>

      {/* 2. Main Work Content Area in White */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
