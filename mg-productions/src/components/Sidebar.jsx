// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';
import { MdFavorite, MdDarkMode } from 'react-icons/md';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`fixed inset-0 bg-gray-800 z-50 md:relative md:flex md:flex-col md:w-48 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
      <div className="flex items-center justify-center h-16 bg-gray-900 gap-16 ">
        <span className="text-white font-bold uppercase ">M G Productions</span>
        <div className="text-gray-50 md:hidden" onClick={toggleSidebar}>
          <IoIosCloseCircleOutline />
        </div>
      </div>
      <nav className="flex-1 px-2 py-4">
        <Link to="/">
          <div className="flex items-center px-4 py-2 mx-1 text-gray-100 hover:bg-gray-700 rounded-full tooltip tooltip-right" data-tip="Home">
            <FaHome />
            <span className="mx-4">Home</span>
          </div>
        </Link>
        <Link to="/search">
          <div className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-full tooltip tooltip-right" data-tip="Search">
            <FaSearch />
            <span className="mx-4">Search</span>
          </div>
        </Link>
        <Link to="/favorite">
          <div className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-full tooltip tooltip-right" data-tip="Favorites">
            <MdFavorite />
            <span className="mx-4">Favorites</span>
          </div>
        </Link>
        <div className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-full tooltip tooltip-right" data-tip="Mode">
          <MdDarkMode />
          <span className="mx-4">Light Mode</span>
        </div>
        <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-full tooltip tooltip-right" data-tip="Settings">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Settings
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
